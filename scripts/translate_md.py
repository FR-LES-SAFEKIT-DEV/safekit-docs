#!/usr/bin/env python3
"""Traduit une page Markdown Hugo avec Google Cloud Translation (API v2).

Usage :
  python translate_md.py SOURCE.md CIBLE.md --to fr [--from en] [--lang fr]

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
import argparse, html, json, os, re, sys, unicodedata, urllib.parse, urllib.request
from pathlib import Path

API = "https://translation.googleapis.com/language/translate/v2"
FM_KEYS = ("title", "linkTitle", "description", "summary", "topics")

def google(texts, src, dst, key):
    out = []
    for i in range(0, len(texts), 50):
        chunk = texts[i:i + 50]
        data = [("q", t) for t in chunk] + [("target", dst), ("format", "html"), ("key", key)]
        if src:
            data.append(("source", src))
        req = urllib.request.Request(API, data=urllib.parse.urlencode(data).encode())
        with urllib.request.urlopen(req) as r:
            res = json.load(r)
        out += [t["translatedText"] for t in res["data"]["translations"]]
    return out

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

def load_glossary(path, lang):
    """glossary.json : {"keep": [termes jamais traduits], "replace": {"fr": {"texte Google": "correction"}}}"""
    global KEEP_RE
    if path and Path(path).exists():
        GLOSSARY.update(json.load(open(path, encoding="utf-8")))
        print(f"Glossaire chargé : {len(GLOSSARY.get('keep', []))} termes protégés ({path})")
    else:
        print(f"ATTENTION : glossaire introuvable ({path}) -> mirror, farm... seront traduits.")
    terms = sorted(GLOSSARY.get("keep", []), key=len, reverse=True)
    if terms:
        KEEP_RE = re.compile(r"(?<![\w/#.-])(%s)(?![\w/-])" % "|".join(re.escape(t) for t in terms), re.I)
    GLOSSARY["_rep"] = GLOSSARY.get("replace", {}).get(lang, {})

class Ctx:
    def __init__(self, link_fix):
        self.store, self.link_fix = [], link_fix
        self.apos = APOS
        self.dot_after = set()
    def add(self, v):
        self.store.append(v); return len(self.store) - 1

def encode(text, ctx):
    def link(m):
        n = ctx.add((m.group(1), ctx.link_fix(m.group(3)) + m.group(4)))
        return f"{S}A{n}{S}{m.group(2)}{S}/A{S}"
    text = LINK.sub(link, text)
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
        return f"{S}P{n}{S}{stop}" if n in ctx.dot_after else m.group(0)
    text = re.sub(f"{S}P(\\d+){S}(?![{S}.。，,;；:：!！?？)）\\]*])", src_dot, text)
    if CJK:
        tok = f"{S}P\\d+{S}"
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)                 # espace avant 。，
        text = re.sub(r"([（「『【])\s+", r"\1", text)                      # （ x -> （x
        # espace entre chinois/japonais et latin, chiffres, `code`, termes protégés
        text = re.sub(f"([{CJK_CHAR}])(?=[A-Za-z0-9`]|{tok})", r"\1 ", text)
        text = re.sub(f"([A-Za-z0-9`%]|{tok})(?=[{CJK_CHAR}])", r"\1 ", text)
    text = text.replace("'", "’") if ctx.apos else text
    text = re.sub(f"{S}P(\\d+){S}", lambda m: st[int(m.group(1))], text)
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
        text = cjk_bold(text)
    text = re.sub(r"  +", " ", text)
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
    a = ap.parse_args()
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

    jobs, in_code, fm_end = [], False, -1
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
            cells = line.split("|")
            for c in range(len(cells)):
                if cells[c].strip():
                    ctx = Ctx(link_fix)
                    lead = cells[c][:len(cells[c]) - len(cells[c].lstrip())]
                    trail = cells[c][len(cells[c].rstrip()):]
                    jobs.append(((i, c), lead, encode(cells[c].strip(), ctx), trail, ctx))
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

    out = [MOCK(j[2]) for j in jobs] if a.dry_run else google([j[2] for j in jobs], a.src, a.to, key)
    tables, lost, numbers, punct = {}, 0, [], []
    for (idx, before, enc, after, ctx), t in zip(jobs, out):
        lost += len(ctx.store) - len(set(re.findall(r'(?:data-k="|<a id=")(\d+)', t)))
        strip = lambda x: re.sub(r"<[^>]+>", " ", re.sub(r'<span[^>]*data-k="\d+"[^>]*>.*?</span>|<a id="\d+">', " ", x))
        miss = [n for n in set(re.findall(r"\d+", strip(enc))) if n not in re.findall(r"\d+", strip(t))]
        if CJK:
            n_src = len(re.findall(r"[.!?](?:\s|$)", re.sub(r"<[^>]+>", "", enc)))
            n_out = len(re.findall(r"[。！？]", t))
            if n_out < n_src:
                punct.append(idx[0] if isinstance(idx, tuple) else idx)
        if miss:
            numbers.append((idx[0] if isinstance(idx, tuple) else idx, miss))
        t = decode(t, ctx)
        if isinstance(idx, tuple):
            row, c = idx
            tables.setdefault(row, lines[row].split("|"))[c] = before + t + after
        else:
            lines[idx] = before + t + after
    for row, cells in tables.items():
        lines[row] = "|".join(cells)
    Path(a.target).parent.mkdir(parents=True, exist_ok=True)
    open(a.target, "w", encoding="utf-8").write("\n".join(lines))
    print(f"{len(jobs)} segments traduits -> {a.target}")
    if lost:
        print(f"ATTENTION : {lost} élément(s) protégé(s) perdu(s) par Google, à vérifier.")
    if numbers:
        print("ATTENTION : nombre(s) disparu(s) à la traduction, lignes à vérifier :")
        for ln, miss in numbers:
            print(f"   ligne {ln + 1} : {', '.join(sorted(miss))}")
    if punct:
        print("A vérifier : fin de phrase (。) possiblement perdue, lignes :",
              ", ".join(str(n + 1) for n in sorted(set(punct))))
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
