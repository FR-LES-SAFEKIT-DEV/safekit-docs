#!/usr/bin/env python3
"""Traduit une page Markdown Hugo avec Google Cloud Translation (API v2).

Usage :
  python translate_md.py SOURCE.md CIBLE.md --to fr [--from en] [--lang fr] [--model nmt]
  Par défaut : modèle Translation LLM de Google (meilleure qualité, coût plus élevé).
  --model nmt : ancien modèle classique, moins cher.

Clé API : variable d'environnement GOOGLE_TRANSLATE_API_KEY
  --to    code langue Google (fr, de, ja, zh-CN...)
  --lang  code langue Hugo écrit dans "lang:" (par défaut = --to ; ex. zh-hans)
  --dry-run  aucun appel à Google (test de la mise en forme)

Non traduits : blocs de code, `code`, shortcodes Hugo, ancres {#...}, URL,
balises HTML, éléments <... class="notranslate"> / translate="no" (contenu compris).
Front matter : title, linkTitle, description, summary, topics traduits ;
lang mis à jour ; canonical réécrit vers la version de la langue.
Liens internes (/xxx/ et https://safekit.eviden.com/xxx/) : préfixés par /<lang>/ ;
les pages cibles pas encore traduites sont listées en fin d'exécution.
Titres : l'ancre {#...} n'est jamais envoyée à Google, elle est remise en fin de titre.
Chinois / japonais : 。 rétabli après du `code`, espaces chinois-latin, gras Markdown valide.
Avertissements : glossaire introuvable, nombres disparus, fins de phrase perdues.
Glossaire (glossary.json à côté du script) : termes jamais traduits + corrections par langue.
Shortcodes xxx-en : remplacés par xxx-<lang> si layouts/shortcodes/xxx-<lang>.* existe.
"""
VERSION = "2026-11-05.8"   # version du script, affichée et écrite dans la page traduite

import argparse, html, json, os, re, sys, time, unicodedata, urllib.error, urllib.parse, urllib.request
from pathlib import Path

API = "https://translation.googleapis.com/language/translate/v2"
FM_KEYS = ("title", "linkTitle", "description", "summary", "topics")

MODEL = None  # None = modèle classique (NMT) ; sinon chemin du modèle Translation LLM

def google(texts, src, dst, key):
    out = []
    for i in range(0, len(texts), 50):
        chunk = texts[i:i + 50]
        data = [("q", t) for t in chunk] + [("target", dst), ("format", "html"), ("key", key)]
        if MODEL:
            data.append(("model", MODEL))
        if src:
            data.append(("source", src))
        res = call_api(data)
        out += [t["translatedText"] for t in res["data"]["translations"]]
        time.sleep(PAUSE)   # étale les requêtes pour ménager le quota par minute
    return out

PAUSE = 1.0
def call_api(data, attempts=6):
    """Appel avec nouvelles tentatives si Google limite le débit (403 rateLimit, 429) ou erreur serveur (5xx)."""
    delay = 15
    for n in range(1, attempts + 1):
        try:
            req = urllib.request.Request(API, data=urllib.parse.urlencode(data).encode())
            with urllib.request.urlopen(req) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", "replace")
            limited = e.code == 429 or (e.code == 403 and "RateLimit" in body) or e.code >= 500
            if not limited or n == attempts:
                if e.code == 403 and "RateLimit" in body:
                    sys.exit("Quota Google dépassé (userRateLimitExceeded) après plusieurs essais. "
                             "Réessayez plus tard, ou utilisez --model nmt (quota séparé).")
                raise
            print(f"Limite de débit Google ({e.code}) : nouvel essai dans {delay} s ({n}/{attempts - 1})")
            time.sleep(delay)
            delay = min(delay * 2, 120)

# Éléments recopiés tels quels (le contenu d'un élément notranslate compris)
PROTECT = re.compile(
    r"(<(\w+)[^>]*(?:notranslate|translate=\"no\")[^>]*>.*?</\2>"   # <span class="notranslate">farm</span>
    r"|\{\{[<%].*?[%>]\}\}"                                         # shortcodes Hugo
    r"|\{[#.][^}]*\}"                                               # {#ancre} {.classe}
    r"|`[^`]+`"                                                     # code en ligne
    r"|</?[A-Za-z][^>]*>"                                           # balises HTML
    r"|https?://[^\s)>\]]+)")                                       # URL nues
LINK = re.compile(r"(!?)\[((?:[^\[\]]|\[[^\]]*\])*)\]\((<[^>]*>|[^)\s]+)((?:\s+\"[^\"]*\")?)\)")
BOLD = re.compile(r"\*\*(.+?)\*\*")
S = "\x00"  # sentinelle interne

GLOSSARY = {"keep": [], "replace": {}}
APOS = False  # apostrophe typographique ’ (fr, it...)
CJK = False   # chinois / japonais : ponctuation pleine chasse, espaces chinois-latin
CJK_CHAR = "\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff"
CJK_PUNCT = "。，、；：？！）」』】"
KEEP_RE = None
TERMS = []    # [(regex source, rendu dans la langue cible)]
GRAMMAR = []  # [(regex, remplacement)] accords grammaticaux de la langue cible

def load_glossary(path, lang):
    """glossary.json : {"keep": [termes jamais traduits], "replace": {"fr": {"texte Google": "correction"}}}"""
    global KEEP_RE
    if path and Path(path).exists():
        GLOSSARY.update(json.load(open(path, encoding="utf-8")))
        print(f"Glossaire chargé : version {GLOSSARY.get('version', 'inconnue')}, "
              f"{len(GLOSSARY.get('keep', []))} termes protégés ({path})")
    else:
        print(f"ATTENTION : glossaire introuvable ({path}) -> mirror, farm... seront traduits.")
    terms = sorted(GLOSSARY.get("keep", []), key=len, reverse=True)
    if terms:
        # mot en minuscules (mirror, farm) : toute casse ; sinon casse exacte (Floating IP)
        alts = [("(?i:%s)" % re.escape(t)) if t.islower() else re.escape(t) for t in terms]
        KEEP_RE = re.compile(r"(?<![\w/#.-])(%s)(?![\w/-])" % "|".join(alts))
    GLOSSARY["_rep"] = GLOSSARY.get("replace", {}).get(lang, {})
    # "terms" : expressions traduites d'office, ex. "farm cluster" -> "cluster farm" (fr)
    keep_lower = {k.lower() for k in GLOSSARY.get("keep", [])}
    TERMS.clear()
    for en, per_lang in sorted(GLOSSARY.get("terms", {}).items(), key=lambda x: -len(x[0])):
        target = per_lang.get(lang) or per_lang.get(lang.split("-")[0])
        if not target:
            continue
        words = []
        for w in en.split():
            if w.lower() in keep_lower:   # le mot peut être entouré d'un <span ...notranslate...>
                words.append(r"(?:<span[^>]*>\s*%s\s*</span>|%s)" % (re.escape(w), re.escape(w)))
            else:
                words.append(re.escape(w))
        TERMS.append((re.compile(r"(?<![\w-])" + r"\s+".join(words) + r"(?![\w-])", re.I), target))
    GRAMMAR.clear()
    g = GLOSSARY.get("grammar", {})
    for pat, repl in g.get(lang) or g.get(lang.split("-")[0]) or []:
        GRAMMAR.append((re.compile(pat), repl))
    if TERMS:
        print(f"Expressions imposées pour '{lang}' : {len(TERMS)}"
              + (f", {len(GRAMMAR)} règles d'accord" if GRAMMAR else ""))

class Ctx:
    def __init__(self, link_fix):
        self.store, self.link_fix = [], link_fix
        self.apos = APOS
        self.dot_after = set()
        self.terms = set()   # jetons issus des expressions imposées
    def add(self, v):
        self.store.append(v); return len(self.store) - 1

def encode(text, ctx):
    def link(m):
        n = ctx.add((m.group(1), ctx.link_fix(m.group(3)) + m.group(4)))
        return f"{S}A{n}{S}{m.group(2)}{S}/A{S}"
    text = LINK.sub(link, text)
    # liens HTML bruts : <a href="/page/"> -> <a href="/fr/page/">
    text = re.sub(r'(<a\b[^>]*?\bhref=")([^"]+)(")', lambda m: m.group(1) + ctx.link_fix(m.group(2)) + m.group(3), text)
    for rx, target in TERMS:
        def term(m, target=target):
            out = target
            # remet le <span class="notranslate ..."> d'origine autour du mot protégé
            for sp, word in re.findall(r"(<span[^>]*>)\s*(\w+)\s*</span>", m.group(0)):
                def wrap(w, sp=sp):
                    return f"{sp}{w.group(0)}</span>"
                out = re.sub(r"(?<!\w)%s(?!\w)" % re.escape(word), wrap, out, count=1, flags=re.I)
            n = ctx.add(out)
            ctx.terms.add(n)
            return f"{S}P{n}{S}"
        text = rx.sub(term, text)
    text = PROTECT.sub(lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    for m in re.finditer(f"{S}P(\\d+){S}\\.(?=\\s|$)", text):   # `code`. -> phrase terminée
        if ctx.store[int(m.group(1))].startswith("`"):
            ctx.dot_after.add(int(m.group(1)))
    if KEEP_RE:  # termes du glossaire à ne jamais traduire (mirror, farm...)
        parts = re.split(f"({S}P\\d+{S})", text)
        text = "".join(p if re.fullmatch(f"{S}P\\d+{S}", p) else KEEP_RE.sub(lambda m: f"{S}P{ctx.add(m.group(0))}{S}", p) for p in parts)
    text = html.escape(text, quote=False)
    text = BOLD.sub(r"<b>\1</b>", text)
    text = re.sub(r"(?<![\w*])_([^_\n]+?)_(?!\w)", r"<i>\1</i>", text)       # _italique_
    text = re.sub(f"{S}A(\\d+){S}", r'<a id="\1">', text)
    text = text.replace(f"{S}/A{S}", "</a>")
    def span(m):
        # Google voit le vrai mot (mirror, `start_prim`...) et non un numéro,
        # sinon il invente un nom autour ("集群编号为", "方案SafeKit"...)
        tok = ctx.store[int(m.group(1))]
        if tok.startswith("`"):
            shown = tok.strip("`")
        elif tok.startswith("{"):
            shown = ""
        else:
            shown = re.sub(r"<[^>]+>", "", tok).strip()
        shown = html.escape(shown, quote=False) or m.group(1)
        return f'<span class="notranslate" translate="no" data-k="{m.group(1)}">{shown}</span>'
    return re.sub(f"{S}P(\\d+){S}", span, text)

def decode(text, ctx):
    st = ctx.store
    text = re.sub(r'<span[^>]*data-k="(\d+)"[^>]*>.*?</span>', lambda m: f"{S}P{m.group(1)}{S}", text)
    text = re.sub(r"<b>\s*([。，、；：！？.,;:!?]+)\s*", r"\1<b>", text)   # "<b>。SafeKit</b>" -> "。<b>SafeKit</b>"
    text = re.sub(r"\s*<b>\s*(.*?)\s*</b>\s*", lambda m: f" **{m.group(1)}** ", text)
    text = re.sub(r"<i>\s*(.*?)\s*</i>", r"*\1*", text)
    def link(m):
        bang, dest = st[int(m.group(1))]
        return f"{bang}[{m.group(2).strip()}]({dest})"
    text = re.sub(r'<a id="(\d+)">(.*?)</a>', link, text)
    text = html.unescape(text)
    # point perdu par Google après du `code` en fin de phrase : "`start_prim` Ces commandes"
    def code_dot(m):
        tok = st[int(m.group(1))]
        return f"{S}P{m.group(1)}{S}." if tok.startswith("`") else m.group(0)
    text = re.sub(f"{S}P(\\d+){S}(?=\\s+[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ’'])", code_dot, text)
    # point perdu après un `code` qui terminait une phrase dans la source
    stop = "。" if CJK else "."
    def src_dot(m):
        n = int(m.group(1))
        if n not in ctx.dot_after:
            return m.group(0)
        # hors chinois/japonais : seulement si la phrase s'arrête vraiment là
        # (fin de texte ou majuscule après) — pas "Gibt `HTTP 200 OK` zurück."
        rest = text[m.end():]
        if not CJK and not re.match(r"\s*$|\s+[A-ZÀ-ÖØ-Þ]", rest):
            return m.group(0)
        return f"{S}P{n}{S}{stop}"
    text = re.sub(f"{S}P(\\d+){S}(?!\\s*[{S}.。，,;；:：!！?？)）\\]*])", src_dot, text)
    if CJK:
        tok = f"{S}P\\d+{S}"
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)                 # espace avant 。，
        text = re.sub(r"([（「『【])\s+", r"\1", text)                      # （ x -> （x
        text = re.sub(r"([，。、；！？])[ ]+(?![*\s])", r"\1", text)           # 例如， Floating -> 例如，Floating
        # espace entre chinois/japonais et latin, chiffres, `code`, termes protégés
        def vis(n, end):   # premier / dernier caractère visible d'un jeton protégé
            v = re.sub(r"<[^>]+>", "", st[n]).strip("`") or "a"
            return v[-1] if end else v[0]
        latin = lambda c: bool(re.match(r"[A-Za-z0-9`%]", c))
        # espace entre chinois/japonais et latin, chiffres, `code`, termes protégés
        # (pas d'espace si le jeton commence / finit lui-même par un caractère CJK : "farm 集群的")
        text = re.sub(f"([{CJK_CHAR}])(?=[A-Za-z0-9`])", r"\1 ", text)
        text = re.sub(f"([{CJK_CHAR}])(?={S}P(\\d+){S})", lambda m: m.group(1) + (" " if latin(vis(int(m.group(2)), False)) else ""), text)
        text = re.sub(f"([A-Za-z0-9`%])(?=[{CJK_CHAR}])", r"\1 ", text)
        text = re.sub(f"({S}P(\\d+){S})(?=[{CJK_CHAR}])", lambda m: m.group(1) + (" " if latin(vis(int(m.group(2)), True)) else ""), text)
    text = text.replace("'", "’") if ctx.apos else text
    def restore(m):
        n = int(m.group(1))
        tok = st[n]
        if n in ctx.terms:
            # majuscule seulement si l'expression ouvre la phrase / la cellule
            at_start = not re.sub(r"[\s*\[(]", "", text[:m.start()])
            if at_start:   # jamais de minuscule forcée ("ARP المجاني" doit rester "ARP")
                tok = re.sub(r"^((?:<[^>]+>)*)(\w)", lambda x: x.group(1) + x.group(2).upper(), tok, count=1)
        return tok
    text = re.sub(f"{S}P(\\d+){S}", restore, text)
    text = re.sub(r"(<a\b[^>]*>)\s+", r"\1", text)      # "<a ...> texte </a>" -> "<a ...>texte</a>"
    text = re.sub(r"\s+(</a>)", r"\1", text)
    for pat, repl in GRAMMAR:   # accords autour des expressions imposées (ex. "une cluster" -> "un cluster")
        text = re.sub(pat, repl, text)
    for wrong, right in GLOSSARY.get("_rep", {}).items():  # corrections du glossaire
        if ctx.apos:
            wrong, right = wrong.replace("'", "’"), right.replace("'", "’")
        text = text.replace(wrong, right)
    # nettoyage des espaces ajoutés autour du gras / des parenthèses
    text = re.sub(r"\*\* +([,.;)\]])", r"**\1", text)
    text = re.sub(r"([(\[]) +\*\*", r"\1**", text)
    text = re.sub(r"\( +", "(", text)
    text = re.sub(r" +\)", ")", text)
    text = re.sub(r" +([,.](?:\s|$))", r"\1", text)
    text = re.sub(r"([A-Za-zÀ-ÿ][’'])\s+(\*\*|\[)", r"\1\2", text)   # l' **adresse -> l'**adresse
    text = re.sub(r"\*\*([;:!?])", r"** \1", text) if ctx.apos else text  # espace avant ; : ! ?
    if CJK:
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)
        text = re.sub(r"([，。、；：！？])[ ]+(?=[`A-Za-z0-9<\[])", r"\1", text)   # 崩溃， `stop_prim`
        text = re.sub(r"(?<=[A-Za-z0-9])/ +(?=[A-Za-z])", "/", text)           # / Direct -> /Direct
        # gras étendu par Google sur la phrase suivante : "**虚拟 IP。SafeKit**" -> "**虚拟 IP**。SafeKit"
        text = re.sub(r"\*\*([^*\n]+?)([。！？])([^*\n]+?)\*\*", r"**\1**\2\3", text)
        text = cjk_bold(text)
    text = re.sub(r"  +", " ", text)
    text = re.sub(r"(?<!\.)\.\.(?!\.)", ".", text)   # ".." -> "." (pas "...")
    return text.strip()

def _kind(c):
    """'s' espace/début, 'p' ponctuation, 'c' caractère CJK, 'l' latin/chiffre"""
    if not c or c.isspace():
        return "s"
    if unicodedata.category(c)[0] in "PS":
        return "p"
    return "c" if re.match(f"[{CJK_CHAR}]", c) else "l"

def cjk_bold(text):
    """Espaces autour de **gras** en chinois/japonais : aucun entre caractères CJK,
    un espace avec du latin, et un espace seulement là où Markdown en a besoin
    (ex. '**主节点（PRIM）：** 返回' sinon le gras ne s'affiche pas)."""
    parts = text.split("**")
    if len(parts) < 3 or len(parts) % 2 == 0:
        return text
    for k in range(1, len(parts), 2):
        inner = parts[k].strip()
        if not inner:
            continue
        before, after = parts[k - 1].rstrip(), parts[k + 1].lstrip()
        b, a, i0, i1 = _kind(before[-1:]), _kind(after[:1]), _kind(inner[0]), _kind(inner[-1])
        sp_b = b != "s" and ((i0 == "p" and b in "lc") or "l" in (b, i0) and b != "p" and i0 != "p")
        sp_a = a != "s" and ((i1 == "p" and a in "lc") or "l" in (a, i1) and a != "p" and i1 != "p")
        parts[k - 1] = before + (" " if sp_b else "") if before else parts[k - 1]
        parts[k] = inner
        parts[k + 1] = (" " if sp_a else "") + after if after else parts[k + 1]
    return "**".join(parts)

PREFIX = re.compile(r"^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*)*)(.*)$")

LANGS = {"ar", "de", "en", "es", "fr", "it", "ja", "ko", "nl", "pt-br", "pt-pt", "zh-hans"}

def make_link_fixer(target, lang, missing, host):
    """/xxx/ -> /<lang>/xxx/ (même nom d'URL dans toutes les langues).
    Les liens absolus vers le site (https://<host>/xxx/) sont traités de la même façon.
    Les pages pas encore traduites sont signalées (le lien est quand même localisé)."""
    root = next((p for p in Path(target).resolve().parents if p.name == "content"), None)
    langs = set(LANGS) | {lang}
    if root is not None:  # dossiers de langue présents dans content/ (ar, de, ..., zh-hans)
        langs |= {d.name.lower() for d in root.iterdir() if d.is_dir() and re.fullmatch(r"[a-z]{2}(-[a-z]+)?", d.name.lower())}
    def fix(dest):
        angle = dest.startswith("<")
        raw = dest[1:-1] if angle else dest
        base = ""
        m = re.match(r"^(https?://%s)(/.*)?$" % re.escape(host), raw) if host else None
        if m:
            base, raw = m.group(1), m.group(2) or "/"
        path, _, frag = raw.partition("#")
        first = path.strip("/").split("/")[0].lower()
        if not path.startswith("/") or path.startswith("//") or path.startswith("/wp-content/") \
                or first in langs or re.search(r"\.\w{2,4}$", path):
            return dest
        new = base + f"/{lang}{path}" + (f"#{frag}" if frag else "")
        if root is not None and path.strip("/"):
            p = path.strip("/")
            cands = [root / lang / f"{p}.md", root / lang / p / "index.md", root / lang / p / "_index.md",
                     root / f"{p}.{lang}.md", root / p / f"index.{lang}.md", root / p / f"_index.{lang}.md"]
            if not any(c.exists() for c in cands):
                missing.add(f"/{lang}{path}")
        return f"<{new}>" if angle else new
    return fix

SHORTCODE = re.compile(r"(\{\{[<%]\s*/?\s*)([\w-]+?)-([A-Za-z]{2}(?:-[A-Za-z]+)?)(?=[\s%>])")

def make_shortcode_fixer(target, src, lang, missing):
    """insert-xxx-en -> insert-xxx-<lang> si layouts/shortcodes/insert-xxx-<lang>.* existe."""
    content = next((p for p in Path(target).resolve().parents if p.name == "content"), None)
    site = content.parent if content else None
    dirs = []
    if site:
        dirs = [site / "layouts" / "shortcodes"] + list((site / "themes").glob("*/layouts/shortcodes"))
    def exists(name):
        return any(list(d.glob(name + ".*")) for d in dirs)
    def fix(line):
        def rep(m):
            if m.group(3).lower() != src.lower():
                return m.group(0)
            new = f"{m.group(2)}-{lang}"
            if site is None or exists(new):
                return m.group(1) + new
            missing.add(new)
            return m.group(0)
        return SHORTCODE.sub(rep, line)
    return fix

def anchorize(title):
    """Ancre automatique Hugo (style GitHub) calculée sur le titre anglais."""
    t = LINK.sub(lambda m: m.group(2), title)
    t = re.sub(r"<[^>]+>|[*_`]", "", t).strip().lower()
    t = re.sub(r"[^\w\- ]", "", t)
    return t.replace(" ", "-")

MOCK = lambda t: t

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source"); ap.add_argument("target")
    ap.add_argument("--to", required=True); ap.add_argument("--from", dest="src", default="en")
    ap.add_argument("--lang"); ap.add_argument("--host", default="safekit.eviden.com"); ap.add_argument("--glossary", default=str(Path(__file__).with_name("glossary.json"))); ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--model", choices=["nmt", "llm"], default="llm",
                    help="llm (défaut) = Translation LLM, plus récent ; nmt = modèle classique, moins cher")
    ap.add_argument("--project", default=os.environ.get("GOOGLE_CLOUD_PROJECT", "safekit-michele-481515"))
    ap.add_argument("--region", default="us-central1")
    a = ap.parse_args()
    print(f"translate_md.py version {VERSION}")
    lang = (a.lang or a.to).lower()
    # codes Hugo -> codes Google
    a.to = {"zh-hans": "zh-CN", "zh-hant": "zh-TW", "pt-br": "pt-BR", "pt-pt": "pt-PT"}.get(a.to.lower(), a.to)
    key = os.environ.get("GOOGLE_TRANSLATE_API_KEY")
    if not key and not a.dry_run:
        sys.exit("Variable GOOGLE_TRANSLATE_API_KEY absente.")
    global APOS
    global CJK
    APOS = lang.split("-")[0] in ("fr", "it", "pt")
    CJK = lang.split("-")[0] in ("zh", "ja")
    load_glossary(a.glossary, lang)
    lines = open(a.source, encoding="utf-8").read().split("\n")
    missing = set()
    link_fix = make_link_fixer(a.target, lang, missing, a.host)
    sc_missing = set()
    sc_fix = make_shortcode_fixer(a.target, a.src, lang, sc_missing)

    jobs, rows, in_code, fm_end = [], [], False, -1
    if lines and lines[0].strip() in ("---", "+++"):
        for j in range(1, len(lines)):
            if lines[j].strip() == lines[0].strip():
                fm_end = j; break
    for i, line in enumerate(lines):
        if 0 < i < fm_end:
            m = re.match(r'^(\s*lang\s*[:=]\s*)(["\']?).*?\2\s*$', line)
            if m:
                lines[i] = f"{m.group(1)}{m.group(2)}{lang}{m.group(2)}"; continue
            m = re.match(r'^(\s*canonical\s*[:=]\s*["\']?)(https?://[^/"\']+)(/[^"\']*)(.*)$', line)
            if m and not m.group(3).startswith(f"/{lang}/"):
                lines[i] = f"{m.group(1)}{m.group(2)}/{lang}{m.group(3)}{m.group(4)}"; continue
            m = re.match(r'^(\s*(?:%s)\s*[:=]\s*)(["\']?)(.+?)\2\s*$' % "|".join(FM_KEYS), line)
            if m:
                ctx = Ctx(link_fix)
                ctx.apos = APOS and m.group(2) != "'"
                jobs.append((i, m.group(1) + m.group(2), encode(m.group(3), ctx), m.group(2), ctx))
            continue
        if i <= fm_end:
            continue
        s = line.strip()
        if s.startswith(("```", "~~~")):
            in_code = not in_code; continue
        if not in_code:
            line = lines[i] = sc_fix(line)
            s = line.strip()
        if in_code or not s or (re.fullmatch(r"\|?[\s:|-]+\|?", s) and "-" in s):
            continue
        if re.fullmatch(r"(\{\{[<%].*?[%>]\}\}\s*)+", s):
            continue
        if "|" in s and (s.startswith("|") or s.count("|") >= 2):
            # la ligne entière du tableau part en une seule requête (contexte complet) ;
            # les cellules sont séparées par des balises <td> que Google conserve
            cells = line.split("|")
            ctx = Ctx(link_fix)
            ctx.row = True
            row_cells = []
            for c in range(len(cells)):
                if cells[c].strip():
                    lead = cells[c][:len(cells[c]) - len(cells[c].lstrip())]
                    trail = cells[c][len(cells[c].rstrip()):]
                    row_cells.append((c, lead, encode(cells[c].strip(), ctx), trail))
            if row_cells:
                rows.append((i, row_cells, ctx))
            continue
        h = re.match(r"^(#{1,6}\s+)(.*?)\s*$", line)
        if h:
            # l'ancre n'est jamais envoyée à Google : elle est remise en fin de titre
            am = re.match(r"^(.*?)\s*((?:\{[#.][^}]*\}\s*)+)$", h.group(2))
            title, anchor = (am.group(1), " " + am.group(2).strip()) if am else (h.group(2), "")
            if "{#" not in anchor:   # titre sans ancre explicite : on fige l'ancre anglaise
                anchor = f" {{#{anchorize(title)}}}" + anchor
            if title.strip():
                ctx = Ctx(link_fix)
                jobs.append((i, h.group(1), encode(title, ctx), anchor, ctx))
            continue
        m = PREFIX.match(line)
        if m.group(2).strip():
            ctx = Ctx(link_fix)
            jobs.append((i, m.group(1), encode(m.group(2), ctx), "", ctx))

    global MODEL
    if a.model == "llm":
        MODEL = f"projects/{a.project}/locations/{a.region}/models/general/translation-llm"
        print(f"Modèle : Translation LLM ({a.project}, {a.region})")
    else:
        print("Modèle : classique (NMT)")
    translate = (lambda texts: [MOCK(x) for x in texts]) if a.dry_run else (lambda texts: google(texts, a.src, a.to, key))
    row_html = ["<table><tr>" + "".join(f"<td>{e}</td>" for _, _, e, _ in rc) + "</tr></table>" for _, rc, _ in rows]
    res = translate([j[2] for j in jobs] + row_html)
    out, row_out = res[:len(jobs)], res[len(jobs):]
    retry, row_lost = [], 0
    for (i, rc, ctx), t in zip(rows, row_out):
        tds = re.findall(r"<td[^>]*>(.*?)</td>", t, re.S)
        row_lost += len(ctx.store) - len(set(re.findall(r'(?:data-k="|<a id=")(\d+)', t)))
        if len(tds) == len(rc):
            for (c, lead, e, trail), td in zip(rc, tds):
                jobs.append(((i, c), lead, e, trail, ctx)); out.append(td.strip())
        else:  # Google a fusionné ou perdu une cellule : on traduit cellule par cellule
            for c, lead, e, trail in rc:
                retry.append(((i, c), lead, e, trail, ctx))
    if retry:
        print(f"{len(retry)} cellule(s) retraduite(s) une par une (structure de ligne modifiée par Google)")
        jobs += retry
        out += translate([r[2] for r in retry])
    tables, lost, numbers, punct, bold = {}, 0, [], [], []
    for (idx, before, enc, after, ctx), t in zip(jobs, out):
        if not getattr(ctx, "row", False):
            lost += len(ctx.store) - len(set(re.findall(r'(?:data-k="|<a id=")(\d+)', t)))
        strip = lambda x: re.sub(r"<[^>]+>", " ", re.sub(r'<span[^>]*data-k="\d+"[^>]*>.*?</span>|<a id="\d+">', " ", x))
        miss = [n for n in set(re.findall(r"\d+", strip(enc))) if n not in re.findall(r"\d+", strip(t))]
        if CJK:  # "layer 2" -> "二层", "2-node" -> "双节点" : pas une perte
            cn = {"1": "一单", "2": "二两双", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九", "10": "十"}
            miss = [n for n in miss if not any(c in t for c in cn.get(n, "-"))]
        if CJK:
            # la phrase source se termine par un point, la traduction non
            end_src = re.search(r"[.!?]$", re.sub(r"<[^>]+>|\s", "", enc))
            end_out = re.search(r"[。！？.!?]$", re.sub(r"\*|\s", "", t))
            if end_src and not end_out:
                punct.append(idx[0] if isinstance(idx, tuple) else idx)
        if miss:
            numbers.append((idx[0] if isinstance(idx, tuple) else idx, miss))
        t = decode(t, ctx)
        if CJK:  # gras déplacé par Google : à cheval sur deux phrases ou coupant un mot
            parts = t.split("**")
            bad = len(parts) % 2 == 0 or any(
                re.search("。.", parts[k]) or (k and re.search(f"[{CJK_CHAR}]$", parts[k - 1]) and re.match(f"[{CJK_CHAR}]", parts[k]) and re.match("[\u30a0-\u30ff]", parts[k - 1][-1]) and re.match("[\u30a0-\u30ff]", parts[k][0]))
                for k in range(1, len(parts), 2))
            if bad:
                bold.append(idx[0] if isinstance(idx, tuple) else idx)
        if isinstance(idx, tuple):
            row, c = idx
            tables.setdefault(row, lines[row].split("|"))[c] = before + t + after
        else:
            if before.lstrip().startswith("#") and not CJK:   # titre : majuscule initiale
                t = re.sub(r"^((?:[*_\[(]|<[^>]+>)*)([a-zà-öø-ÿ])", lambda x: x.group(1) + x.group(2).upper(), t, count=1)
            lines[idx] = before + t + after
    for row, cells in tables.items():
        lines[row] = "|".join(cells)
    # trace dans le front matter (ignorée par Hugo, utile pour vérifier quelle version a traduit)
    if fm_end > 0:
        sig = (f'translation: "translate_md {VERSION} | glossaire {GLOSSARY.get("version", "?")} | '
               f'{"Translation LLM" if MODEL else "NMT"} | {len(TERMS)} expressions"')
        had = any(l.startswith("translation:") for l in lines[:fm_end])
        lines = [l for l in lines[:fm_end] if not l.startswith("translation:")] + [sig] + lines[fm_end:]
        shift = 0 if had else 1   # les numéros de ligne signalés suivent le fichier écrit
    else:
        shift = 0
    Path(a.target).parent.mkdir(parents=True, exist_ok=True)
    open(a.target, "w", encoding="utf-8").write("\n".join(lines))
    lost += row_lost
    n_cells = sum(1 for j in jobs if getattr(j[4], "row", False))
    print(f"{len(jobs) - n_cells + len(rows)} segments traduits"
          f" (dont {len(rows)} lignes de tableau) -> {a.target}")
    if lost:
        print(f"ATTENTION : {lost} élément(s) protégé(s) perdu(s) par Google, à vérifier.")
    if numbers:
        print("ATTENTION : nombre(s) disparu(s) à la traduction, lignes à vérifier :")
        for ln, miss in numbers:
            print(f"   ligne {ln + 1 + shift} : {', '.join(sorted(miss))}")
    if bold:
        print("A vérifier : gras (**) mal placé par Google, lignes :",
              ", ".join(str(n + 1 + shift) for n in sorted(set(bold))))
    if punct:
        print("A vérifier : fin de phrase (。) possiblement perdue, lignes :",
              ", ".join(str(n + 1 + shift) for n in sorted(set(punct))))
    if sc_missing:
        print("Shortcodes laissés en version source (version traduite introuvable) :")
        for n in sorted(sc_missing):
            print("  ", n)
    if missing:
        print("Liens localisés vers des pages pas encore traduites (à créer) :")
        for p in sorted(missing):
            print("  ", p)

if __name__ == "__main__":
    main()
