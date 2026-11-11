#!/usr/bin/env python3
"""Traduit une page Markdown Hugo avec Google Cloud Translation (API v2).

Usage :
  python translate_md.py SOURCE            -> traduit dans les 11 langues et écrase les traductions
     SOURCE = content/<chemin>.md  ou  layouts/shortcodes/<nom>-en.html  (fichier anglais)
     options : --langs fr,de  (sous-ensemble)  --export DOSSIER (copie en.* et <lang>.* dans DOSSIER)
               --dry-run  --model nmt
  python translate_md.py SOURCE.md CIBLE.md --to fr [--from en] [--lang fr] [--model nmt]   (une seule langue)
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
VERSION = "2026-11-11.5"   # version du script, affichée et écrite dans la page traduite

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
    r"|https?://[^\s)>\]\x00]+)")                                   # URL nues (jamais la sentinelle : "[https://site](/)" -> "https://site /A")
LINK = re.compile(r"(!?)\[((?:[^\[\]]|\[[^\]]*\])*)\]\((<[^>]*>|[^)\s]+)((?:\s+\"[^\"]*\")?)\)")
BOLD = re.compile(r"\*\*(.+?)\*\*")
S = "\x00"  # sentinelle interne

GLOSSARY = {"keep": [], "replace": {}}
APOS = False  # apostrophe typographique ’ (fr, it...)
NATIVE = False  # ja/zh/ko : Google voit la traduction imposée (particules ajoutées naturellement)
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
        KEEP_RE = re.compile(r"(?<![\w#.-])(?<!/[a-z0-9-]/)(%s)(?![\w-]|/[a-z0-9-]*/|\.\w)" % "|".join(alts))
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
            if w.lower() in ("vs", "vs."):   # "vs" et "vs." : même expression
                words.append(r"vs\.?")
                continue
            if w.lower() in keep_lower:   # le mot peut être entouré d'un <span ...notranslate...>
                words.append(r"(?:<span[^>]*>\s*%s\s*</span>|%s)" % (re.escape(w), re.escape(w)))
            else:
                words.append(re.escape(w))
        TERMS.append((re.compile(r"(?<![\w/.-])" + r"\s+".join(words) + r"(?![\w/-]|\.\w)", re.I), target))
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
        self.terms = set()
        self.titles = []     # infobulles de liens à traduire à part : [(n, texte)]
        self.title_tr = {}
        self.bold_terms = set()   # termes imposés formant à eux seuls un passage en gras
        self.shown = {}      # texte montré à Google pour une expression imposée   # jetons issus des expressions imposées
    def add(self, v):
        self.store.append(v); return len(self.store) - 1

def go_templates(text):
    """Positions des expressions Go Template {{ ... }} (imbrication comprise : printf "{{%% x %%}}")."""
    out, i = [], 0
    while True:
        a = text.find("{{", i)
        if a < 0:
            return out
        depth, j = 0, a
        while j < len(text) - 1:
            if text.startswith("{{", j):
                depth += 1; j += 2; continue
            if text.startswith("}}", j):
                depth -= 1; j += 2
                if depth == 0:
                    break
                continue
            j += 1
        if depth != 0:
            return out
        out.append((a, j))
        i = j

def protect_templates(text, ctx):
    parts, last = [], 0
    for a, b in go_templates(text):
        if a < last:
            continue
        # nom de fichier construit : {{ .Get "mod" }}.safe -> un seul bloc (sinon "{{ .Get "mod" }} .safe" ou ".safe" perdu)
        ext = re.match(r"\.[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*", text[b:])
        if ext and not re.match(r"\.\s", text[b:]):
            b += ext.end()
        parts.append(text[last:a]); parts.append(f"{S}P{ctx.add(text[a:b])}{S}"); last = b
    parts.append(text[last:])
    return "".join(parts)

def encode(text, ctx):
    ctx.src = text
    ctx.all_src = getattr(ctx, "all_src", "") + "\n" + text   # toutes les cellules d'une ligne de tableau
    text = protect_templates(text, ctx)   # {{ .Get "app" }}, {{< shortcode >}}... jamais traduits
    def link(m):
        title = re.match(r'\s+"([^"]*)"', m.group(4)) if m.group(4) else None
        n = ctx.add((m.group(1), ctx.link_fix(m.group(3)), title.group(1) if title else None, m.group(2)))
        out = f"{S}A{n}{S}{m.group(2)}{S}/A{S}"
        if title and (m.group(1) == "!" or " " not in title.group(1).strip()):
            return out   # image ou titre technique ("w:512") : titre conservé tel quel
        if title:   # infobulle : traduite dans une requête séparée (sinon Google mélange texte et infobulle)
            ctx.titles.append((n, title.group(1)))
        return out
    text = LINK.sub(link, text)
    # liens HTML bruts : <a href="/page/"> -> <a href="/fr/page/">
    text = re.sub(r'(<a\b[^>]*?\bhref=")([^"]+)(")', lambda m: m.group(1) + ctx.link_fix(m.group(2)) + m.group(3), text)
    text = re.sub(r"`[^`]+`", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)   # code d'abord
    text = re.sub(r"<code>([^<`]+)</code>", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)   # <code>farm</code> : un seul bloc
    # durées / heures (9:43, 3:21:35) : jamais traduites ("7 時 40 分", "٨:٤٧")
    # sauf "9:00 AM" / "5:00 PM" : Google doit les convertir ("9 h", "17 h", "午後 5:00")
    text = re.sub(r"(?<![\w:.=/])\d{1,2}(?::\d{2}){1,2}(?![\w:])(?!\s?[AaPp]\.?[Mm]\b)", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # emojis (🛠️, 📘, ⬇️...) : protégés, sinon Google en supprime parfois ("**🛠️[commencez" -> "**请[从")
    text = re.sub("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u25A0-\u25FF\u2600-\u27BF\u2B00-\u2BFF\u2139\u22EF][\uFE0F\u200D\U0001F000-\U0001FAFF\u2600-\u27BF]*",
                  lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # identifiants (VM1, SRV2...) : jamais traduits ("VM1" -> "الجهاز الظاهري 1", "máquina virtual 1")
    text = re.sub(r"(?<![\w/.-])(?<!\x00P)[A-Za-z]{2,}[0-9]+(?![\w-])", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # chemins (C:/safekit/..., /opt/safekit/...) : jamais traduits ni coupés ("**C:/…/generic ab**")
    text = re.sub(r"(?<![\w/:.])(?:[A-Za-z]:[/\\]|/(?:opt|etc|var|usr|home|tmp|root|srv|mnt)/)[^\s*<>\"'`()]*[^\s*<>\"'`().,;:!?]",
                  lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # noms de fichiers (mirror.safe, farm.safe, setup.exe...) : protégés en entier, sinon "mirror" seul est protégé
    text = re.sub(r"(?<![\w/.-])[\w-]+\.(?:safe|exe|msi|ps1|sh|cmd|bat|xml|conf|cfg|ini|txt|log|json|ya?ml|dll|vhdx?)\b(?![\w/-])", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
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
            ctx.shown[n] = re.sub(r"<[^>]+>", "", m.group(0)).strip()   # Google voit le terme anglais
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
    text = re.sub(f"{S}T(\\d+){S}", r'<span class="tt" data-t="\1">', text)
    text = text.replace(f"{S}/T{S}", "</span>")
    text = text.replace(f"{S}/A{S}", "</a>")
    def span(m):
        # Google voit le vrai mot (mirror, `start_prim`...) et non un numéro,
        # sinon il invente un nom autour ("集群编号为", "方案SafeKit"...)
        tok = ctx.store[int(m.group(1))]
        if int(m.group(1)) in ctx.shown:   # expression imposée : on montre l'anglais, pas la traduction
            shown = html.escape(re.sub(r"<[^>]+>", "", tok).strip() if NATIVE else ctx.shown[int(m.group(1))], quote=False)
            return f'<span class="notranslate" translate="no" data-k="{m.group(1)}">{shown}</span>'
        if re.fullmatch(r"<br\s*/?>", tok, re.I):
            return f'<br data-k="{m.group(1)}">'   # vrai saut de ligne pour Google (sinon il voit "0", "2"... et les déplace)
        if tok.startswith("`"):
            shown = tok.strip("`")
        elif tok.startswith("{{"):
            g = re.search(r'\.Get\s+"(\w+)"', tok)
            shown = g.group(1).capitalize() if g else ""   # {{ .Get "app" }} -> "App" (nom propre)
            sfx = re.search(r"\}\}([.\w-]+)$", tok)
            if sfx:
                shown = (g.group(1) if g else "file") + sfx.group(1)   # {{ .Get "mod" }}.safe -> "mod.safe"
        elif tok.startswith("{"):
            shown = ""
        else:
            shown = re.sub(r"<[^>]+>", "", tok).strip()
        shown = html.escape(shown, quote=False) or m.group(1)
        return f'<span class="notranslate" translate="no" data-k="{m.group(1)}">{shown}</span>'
    for m in re.finditer(f"<b>{S}P(\\d+){S}</b>", text):   # gras = exactement un terme imposé
        ctx.bold_terms.add(int(m.group(1)))
    return re.sub(f"{S}P(\\d+){S}", span, text)

def decode(text, ctx):
    st = ctx.store
    text = re.sub(r'<span[^>]*data-k="(\d+)"[^>]*>.*?</span>', lambda m: f"{S}P{m.group(1)}{S}", text)
    text = re.sub(r'\s*<br[^>]*data-k="(\d+)"[^>]*>\s*', lambda m: f" {S}P{m.group(1)}{S} ", text)
    seen = set()
    def once(m):   # Google recopie parfois un nom protégé ("SafeKit 提供健康探测 SafeKit") : chaque marqueur est unique
        if m.group(1) in seen:
            return ""
        seen.add(m.group(1))
        return m.group(0)
    text = re.sub(f"{S}P(\\d+){S}", once, text)
    # emoji protégé recopié en clair par Google ("[forcez le 🖼️](…) … primaire 🖼️") : la copie disparaît
    for i in {int(x) for x in re.findall(f"{S}P(\\d+){S}", text)}:
        tok = st[i] if isinstance(st[i], str) else ""
        if re.fullmatch("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u25A0-\u25FF\u2600-\u27BF\u2B00-\u2BFF\u2139\u22EF][\uFE0F\u200D\U0001F000-\U0001FAFF\u2600-\u27BF]*", tok):
            base = re.escape(tok.rstrip("\uFE0F"))
            parts = re.split(f"({S}P\\d+{S})", text)
            text = "".join(p if p.startswith(S) else re.sub(r"\s?" + base + "\uFE0F?", "", p) for p in parts)
    if True:   # nom protégé recopié en clair par Google en plus du marqueur ("SafeKit 提供健康探测 SafeKit")
        plain = lambda i: re.sub(r"<[^>]+>", "", st[i]).strip()
        made = [plain(i) for i in range(len(st)) if isinstance(st[i], str)]
        for t in {x for x in made if (KEEP_RE and KEEP_RE.fullmatch(x)) or re.fullmatch(r"[A-Za-z]{2,}[0-9]+", x)}:
            n, seen_t = made.count(t), [0]
            pat = f"{S}P(\\d+){S}|(?<![A-Za-z0-9_#.-])" + re.escape(t) + r"(?![A-Za-z0-9_-])"   # collé au japonais : "SafeKit堅牢"
            total = sum(1 for mm in re.finditer(pat, text) if mm.group(1) is None or plain(int(mm.group(1))) == t)
            if total <= n:
                continue
            # 1) alignement phrase par phrase avec la source : une copie en clair dans une phrase
            #    où la source n'a pas le nom est supprimée ("ℹ️ VM1 无需配置虚拟 IP 地址。VM1 将…")
            src = re.sub(r"<[^>]+>|\*\*", "", getattr(ctx, "src", "") or "")
            ssent = [x for x in re.split(r"(?<=[.!?])\s+(?=\S)", src.strip()) if x]
            cuts = [0] + [mm.end() for mm in re.finditer(r"[。！？]|[.!?](?=\s|$)", text) if mm.end() < len(text.rstrip())] + [len(text)]
            if len(ssent) > 1 and len(cuts) - 1 == len(ssent):
                rx_src = re.compile(r"(?<![A-Za-z0-9_#.-])" + re.escape(t) + r"(?![A-Za-z0-9_-])")
                out = []
                for k in range(len(ssent)):
                    seg = text[cuts[k]:cuts[k + 1]]
                    allow = len(rx_src.findall(ssent[k]))
                    occ = [mm for mm in re.finditer(pat, seg) if mm.group(1) is None or plain(int(mm.group(1))) == t]
                    extra = len(occ) - allow
                    for mm in reversed([x for x in occ if x.group(1) is None]):
                        if extra <= 0:
                            break
                        seg = seg[:mm.start()] + seg[mm.end():]
                        extra -= 1
                    out.append(seg)
                # marqueur placé par Google dans une phrase où la source n'a pas le nom, alors qu'une autre phrase
                # n'a que la copie en clair : le marqueur prend la place de la copie ("ℹ️ VM1 无需…。将在" -> "ℹ️ 无需…。VM1 将在")
                occ_of = lambda sg: [mm for mm in re.finditer(pat, sg) if mm.group(1) is None or plain(int(mm.group(1))) == t]
                for k in range(len(out)):
                    allow_k = len(rx_src.findall(ssent[k]))
                    mk = [mm for mm in occ_of(out[k]) if mm.group(1) is not None]
                    if len(occ_of(out[k])) <= allow_k or not mk:
                        continue
                    for j in range(len(out)):
                        pj = [mm for mm in occ_of(out[j]) if mm.group(1) is None]
                        if j != k and pj and len([mm for mm in occ_of(out[j]) if mm.group(1) is not None]) < len(rx_src.findall(ssent[j])):
                            m0, p0 = mk[0], pj[0]
                            out[j] = out[j][:p0.start()] + m0.group(0) + out[j][p0.end():]
                            out[k] = re.sub(r"\s{2,}", " ", out[k][:m0.start()] + out[k][m0.end():])
                            break
                text = "".join(out)
                total = sum(1 for mm in re.finditer(pat, text) if mm.group(1) is None or plain(int(mm.group(1))) == t)
                if total <= n:
                    continue
            # 2) on supprime d'abord les occurrences en clair (jamais un marqueur : "**Docker**" -> "****") ;
            # si un marqueur suit dans la même phrase, il prend la place du texte en clair
            # ("SafeKit 提供健康探测 SafeKit" -> "SafeKit 提供健康探测")
            for _ in range(total - n):
                occ = [mm for mm in re.finditer(pat, text) if mm.group(1) is None or plain(int(mm.group(1))) == t]
                pl = [mm for mm in occ if mm.group(1) is None]
                if not pl:
                    break
                alone = lambda mm: re.search(r"<b>\s*$", text[:mm.start()]) and re.match(r"\s*</b>", text[mm.end():])
                adj = next((p for p in pl for mm in occ if mm.group(1) is not None
                            and re.fullmatch(r"[\s<>/b]*", text[p.end():mm.start()] if mm.start() > p.end() else text[mm.end():p.start()])), None)
                pair = next(((p, mm) for p in pl for mm in occ if mm.group(1) is not None and mm.start() > p.end() and not alone(mm)
                             and not re.search(r"[。！？]|[.!?](?:\s|$)", text[p.end():mm.start()])), None)
                start = next((p for p in pl if re.search(r"(?:^|[。！？]|[.!?:]\s)\s*(?:<b>\s*)?$", text[:p.start()])), None)
                lone = [mm for mm in occ if mm.group(1) is not None and alone(mm)]
                if adj:   # "SafeKit **SafeKit**、" : le texte en clair collé au marqueur disparaît
                    text = text[:adj.start()] + text[adj.end():]
                elif pair:   # "SafeKit 提供健康探测 SafeKit" : le marqueur prend la place du texte en clair
                    p, nxt = pair
                    text = text[:p.start()] + nxt.group(0) + text[p.end():nxt.start()] + text[nxt.end():]
                elif start and lone and lone[-1].start() > start.end():   # sujet en début de phrase gardé, "**SafeKit**" déplacé ailleurs supprimé
                    mm = lone[-1]
                    text = text[:start.start()] + "<b>" + mm.group(0) + "</b>" + text[start.end():mm.start()] + text[mm.end():]
                    text = re.sub(r"<b>\s*</b>", "", text)
                else:   # sinon : la dernière occurrence en clair
                    p = pl[-1]
                    text = text[:p.start()] + text[p.end():]
            text = re.sub(r"(?<=\S)  +(?=\S)", " ", text)
            text = re.sub(r"([，。、；：！？])\s+", r"\1", text)
            text = re.sub(r"<b>\s+", "<b>", text)
    text = re.sub(f"({S}P\\d+{S})\\s*/\\s*(?={S}P\\d+{S})", r"\1/", text)   # "Windows / Hyper-V" -> "Windows/Hyper-V"
    text = re.sub(f"([)\\]）]|\\w)/\\s+(?={S}P\\d+{S})", r"\1/", text)   # "(SQL)/ SafeKit", "Suite/ SafeKit" -> ".../SafeKit"
    text = re.sub(f"({S}P\\d+{S}) +-(?=\\w)", r"\1-", text)
    def dedup(m):   # premier mot d'un nom protégé répété juste avant lui : "SQL SQL Server" -> "SQL Server"
        tok = re.sub(r"<[^>]+>", "", st[int(m.group(3))]).strip()
        if tok == m.group(1) or (" " in tok and tok.split(" ")[0] == m.group(1)) or tok.startswith(m.group(1) + "-"):   # "Hyper Hyper-V"
            return m.group(2)   # aussi "SafeKit SafeKit" -> "SafeKit"
        return m.group(0)
    # (avec ou sans gras entre les deux : "ADB <b>ADB SafeGate</b>")
    text = re.sub(f"(?<![\\w-])([A-Za-z][\\w-]*)\\s+((?:<b>\\s*)?{S}P(\\d+){S})", dedup, text)
    text = re.sub(r"<b>\s*([。，、；：！？.,;:!?]+)\s*", r"\1<b>", text)
    # source "**terme imposé**" : si Google étend le gras à la phrase, on le ramène au terme seul
    for n in ctx.bold_terms:
        tk = f"{S}P{n}{S}"
        text = re.sub(r"<b>((?:(?!</?b>).)*?)%s((?:(?!</?b>).)*?)</b>" % re.escape(tk),
                      lambda m: (m.group(1) + f"<b>{tk}</b>" + m.group(2)) if (m.group(1).strip() or m.group(2).strip()) else m.group(0), text, flags=re.S)
    text = re.sub(r"\s*<b>\s*(.*?)\s*</b>\s*", lambda m: f" **{m.group(1)}** ", text)
    text = re.sub(r"<i>\s*(.*?)\s*</i>", r"*\1*", text)
    def link(m):
        bang, dest, title, orig = st[int(m.group(1))]
        label = m.group(2).strip()
        if not re.search(r"[.!?。！？]\s*$", re.sub(r"<[^>]+>|\x00P\d+\x00", "", orig)):
            label = re.sub(r"\s*[.。]$", "", label)   # point ajouté par Google en fin de lien
        if title is not None:
            t = ctx.title_tr.get(int(m.group(1)), title).replace('"', "”")
            dest = f'{dest} "{t}"'
        return f"{bang}[{label}]({dest})"
    text = re.sub(r'<a id="(\d+)">(.*?)</a>', link, text)
    text = html.unescape(text)
    # point perdu par Google après du `code` en fin de phrase : "`start_prim` Ces commandes"
    def code_dot(m):
        tok = st[int(m.group(1))]
        return f"{S}P{m.group(1)}{S}." if tok.startswith("`") else m.group(0)
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
        if CJK and re.match(r"\s*[のをにはがでとへもや的和是在与及或、後前后之时時中上下]", rest):
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
            if st[n].startswith(("{{", "`")):
                return "a"   # `.safe` : code = latin -> espace avec le chinois/japonais   # {{ .Get "app" }} = nom de produit latin -> espace avec le chinois/japonais
            v = re.sub(r"<[^>]+>", "", st[n]).strip("`") or "a"
            if re.match("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u2600-\u27BF\u2B00-\u2BFF\u2139]", v):
                return "a"   # emoji : espace avec le chinois/japonais, comme dans la source ("💡 要开始")
            return v[-1] if end else v[0]
        latin = lambda c: bool(re.match(r"[A-Za-z0-9`%]", c))
        # espace entre chinois/japonais et latin, chiffres, `code`, termes protégés
        # (pas d'espace si le jeton commence / finit lui-même par un caractère CJK : "farm 集群的")
        text = re.sub(f"([{CJK_CHAR}])(?=[A-Za-z0-9`])", r"\1 ", text)
        text = re.sub(f"([{CJK_CHAR}])(?=\\.[A-Za-z])", r"\1 ", text)   # 可能な.BIN -> 可能な .BIN
        text = re.sub(f"([{CJK_CHAR}])(?={S}P(\\d+){S})", lambda m: m.group(1) + (" " if latin(vis(int(m.group(2)), False)) else ""), text)
        text = re.sub(f"([A-Za-z0-9`%])(?=[{CJK_CHAR}])", r"\1 ", text)
        text = re.sub(f"({S}P(\\d+){S})(?=[{CJK_CHAR}])", lambda m: m.group(1) + (" " if latin(vis(int(m.group(2)), True)) else ""), text)
        cjk = lambda c: bool(re.match(f"[{CJK_CHAR}]", c))
        text = re.sub(f"([A-Za-z0-9`%])(?={S}P(\\d+){S})", lambda m: m.group(1) + (" " if cjk(vis(int(m.group(2)), False)) else ""), text)
        text = re.sub(f"({S}P(\\d+){S})(?=[A-Za-z0-9`])", lambda m: m.group(1) + (" " if cjk(vis(int(m.group(2)), True)) else ""), text)
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
    for _ in range(4):   # jetons imbriqués (balise HTML contenant {{ .Get }})
        if not re.search(f"{S}P\\d+{S}", text):
            break
        text = re.sub(f"{S}P(\\d+){S}", restore, text)
    text = re.sub(r"(<a\b[^>]*>)\s+", r"\1", text)      # "<a ...> texte </a>" -> "<a ...>texte</a>"
    text = re.sub(r"\s+(</a>)", r"\1", text)
    # "A/B" collé dans la source (SAN/vSAN, BIS/BVMS, Kubernetes/K3s) : jamais "SAN /vSAN" ni "SAN/ vSAN"
    src_plain = re.sub(r"\]\([^)]*\)|https?://\S+|<[^>]+>", " ", getattr(ctx, "all_src", ""))
    for a, b in set(re.findall(r"(?<![\w/:.-])([A-Za-z0-9][\w.-]*)/([A-Za-z0-9][\w.-]*)(?![\w/])", src_plain)):
        text = re.sub(r"(?<![\w/-])(%s) *\/ *(%s)(?![\w/])" % (re.escape(a), re.escape(b)), r"\1/\2", text)
    for pat, repl in GRAMMAR:   # accords autour des expressions imposées (ex. "une cluster" -> "un cluster")
        text = re.sub(pat, repl, text)
    for wrong, right in GLOSSARY.get("_rep", {}).items():  # corrections du glossaire
        if ctx.apos:
            wrong, right = wrong.replace("'", "’"), right.replace("'", "’")
        text = text.replace(wrong, right)
    # nettoyage des espaces ajoutés autour du gras / des parenthèses
    text = re.sub(r"\*\*([^*\n]+?)([,;])\*\*", r"**\1**\2", text)   # "**Load-Balancing,**" -> "**Load-Balancing**,"
    text = re.sub(r"\*\* +([,.;)\]])", r"**\1", text)
    text = re.sub(r"([(\[]) +\*\*", r"\1**", text)
    text = re.sub(r"\( +", "(", text)
    text = re.sub(r" +\)", ")", text)
    text = re.sub(r"\s+(\\\))", r"\1", text)   # infobulle "\(mirror.safe \)" -> "\(mirror.safe\)"
    text = re.sub(r"(\\\()\s+", r"\1", text)
    text = re.sub(r" +([,.](?:\s|$|\]))", r"\1", text)   # aussi "cluster mirror .](" (texte d'image)
    text = re.sub(r"([A-Za-zÀ-ÿ][’'])\s+(\*\*|\[)", r"\1\2", text)   # l' **adresse -> l'**adresse
    if ctx.apos:   # élision suivie d'une espace autour d'une expression imposée : "l’ architecture" -> "l’architecture"
        text = re.sub(r"(?<![\w’'])([lLdDjJmMnNsStTcC]|[Qq]u|[Uu]n|[Dd]ell|[Nn]ell|[Aa]ll|[Ss]ull|[Dd]all|[Qq]uell|[Ll]orsqu|[Pp]uisqu)([’'])\s+(?=[A-Za-zÀ-ÿ])", r"\1\2", text)
    text = re.sub(r"\*\*([;:!?])", r"** \1", text) if ctx.apos else text  # espace avant ; : ! ?
    if CJK:
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)
        text = re.sub(r"([，。、；：！？])[ ]+(?=[`A-Za-z0-9<\[])", r"\1", text)   # 崩溃， `stop_prim`
        text = re.sub(r"(?<=[A-Za-z0-9])/ +(?=[A-Za-z])", "/", text)           # / Direct -> /Direct
        # gras étendu par Google sur la phrase suivante : "**虚拟 IP。SafeKit**" -> "**虚拟 IP**。SafeKit"
        text = re.sub(r"\*\*([^*\n]+?)([。！？])([^*\n]+?)\*\*", r"**\1**\2\3", text)
        text = cjk_bold(text)
        text = re.sub(r"→\*\*", "→ **", text)
        text = re.sub(f"([{CJK_CHAR}]) +(?=[{CJK_CHAR}])", r"\1", text)
        text = re.sub(f"([{CJK_CHAR}]):\\s*(?=\\S)", r"\1：", text)   # "アーキテクチャ: 共有" -> "アーキテクチャ：共有"   # "管理することで ネットワーク"
        # espacements de la source autour des liens : "🎬 [texte](url) (2:00)"
        text = re.sub(r"([^\w\s%s%s\[(（*!])\[" % (CJK_CHAR, CJK_PUNCT), r"\1 [", text)   # 🎬[ -> 🎬 [ (jamais "![image]")
        text = re.sub(r"(\]\([^)\s]*\))(?=[(（]\d)", r"\1 ", text)                  # ](url)(2:00) -> ](url) (2:00)
        # durées / numéros entre parenthèses : demi-chasse comme la source — "（9:43）" -> " (9:43)"
        text = re.sub(r"\s*（(\d[\d:.,]*)）", r" (\1)", text)
        text = re.sub(r"([，。、；：！？])[ ]+(?=[%s])" % CJK_CHAR, r"\1", text)          # ： 免费 -> ：免费
        # états : parenthèses pleine chasse, sans espaces — jamais dans une URL de lien
        parts = re.split(r"(\]\(<[^>]*>\)|\]\([^)\s]*\))", text)
        text = "".join(p if i % 2 else re.sub(r"\s*[（(](Ready|NotReady)[)）]\s*", r"（\1）", p) for i, p in enumerate(parts))
    text = re.sub(r"  +", " ", text)
    text = re.sub(r"(?<!\.)\.\.(?!\.)", ".", text)   # ".." -> "." (pas "...")
    # gras Markdown invalide : espace avant le ** fermant ("ALSTEF **,") ou après le ** ouvrant ("** les")
    text = re.sub(r"(^|\s)\*\* +(?=\S)", r"\1**", text)
    text = re.sub(r"(\S) +\*\*(?=[\s,.;:!?)\]。，、；：！？]|$)", r"\1**", text)
    if NATIVE:
        text = native_terms(text, ctx)
    if CJK:   # mot katakana doublé ("シェアードナッシングナッシング", "リモートサイトサイト") -> une seule fois
        text = re.sub(r"(?!アクティブアクティブ)([\u30a1-\u30fc]{3,})\1", r"\1", text)   # aussi "ナッシングナッシングクラスタリング"
    if CJK:   # après restauration : deux termes protégés collés ("Siveillance虚拟机级 HA架构")
        text = re.sub(f"([A-Za-z0-9])(?=[{CJK_CHAR}])", r"\1 ", text)
        text = re.sub(f"([{CJK_CHAR}])(?=[A-Za-z0-9])", r"\1 ", text)
    if CJK:   # gras étendu par Google sur plusieurs phrases ("**これにより…。…は クライアントの IP アドレス**") : on garde la fin
        def shrink(m):
            body = m.group(1)
            if not re.search("[。！？](?=.)", body):
                return m.group(0)
            cut = max(body.rfind(c) for c in "。！？、，")
            head, tail = body[:cut + 1], body[cut + 1:]
            k = tail.rfind("は")   # japonais : sujet "ロードバランサーは" hors du gras
            if 0 <= k < len(tail) - 2:
                head, tail = head + tail[:k + 1], tail[k + 1:]
            p = max((tail.rfind(w) + len(w), w) for w in ("根据", "基于", "按照", "通过"))[0]   # chinois : "负载均衡器会根据" hors du gras
            if 2 < p < len(tail) - 2:
                head, tail = head + tail[:p], tail[p:]
            return f"{head}**{tail.strip()}**" if tail.strip() else m.group(0)
        text = re.sub(r"\*\*([^*\n]+?)\*\*", shrink, text)
    # guillemet ouvrant laissé hors du gras : '" **Texte"**' -> '**"Texte"**'
    text = re.sub(r'(["“«„「])\s*\*\*([^*\n]+?)(["”»“」])\*\*', r"**\1\2\3**", text)
    # guillemets ajoutés par Google à cheval sur le gras : '**"shared disk** "' -> '**"shared disk"**'
    text = re.sub(r'\*\*(["“«„])([^*\n"“”»]+?)\*\*\s?(["”»“])(?=\s|$|[,.;:])', r"**\1\2\3**", text)
    # tiret cadratin avalé par le gras fermant : "**con disco compartido—** difieren" -> "**con disco compartido** — difieren"
    text = re.sub(r"(?<=[^\s*])\s*([—–])\*\*(?=\s)", r"** \1", text)
    # puce collée au texte ("•应用级 HA") ou remplacée par le point médian japonais ("<br> ・高可用性")
    text = re.sub(r"(^|\s)・(?=\S)", r"\1• ", text)
    text = re.sub(r"•(?=[^\s•])", "• ", text)
    if not CJK:   # puce en minuscule après une expression imposée ("• clustering matériel complexe") -> majuscule
        text = re.sub(r"(•\s+)([a-zà-ÿ])", lambda m: m.group(1) + m.group(2).upper(), text)
    # parenthèse ouvrante perdue autour d'un sigle protégé dans un texte de lien : "[복구 시간 목표 RTO) 약 1분]" -> "[복구 시간 목표(RTO) 약 1분]"
    text = re.sub(r"(\[[^\]()]*?)\s+([A-Z][A-Z0-9/]{1,})\)(?=[^\]()]*\])", lambda m: m.group(1) + ("" if re.search(f"[\uac00-\ud7a3{CJK_CHAR}]$", m.group(1)) else " ") + "(" + m.group(2) + ")", text)
    # espaces parasites entre guillemets droits/chinois/allemands et `code` ou **gras** : '" `stop` "' -> '"`stop`"' (pas « » en français)
    text = re.sub(r'(["“„「])[ \t]+(`[^`\n]+`|\*\*[^*\n]+\*\*)[ \t]*(["”“」])', r"\1\2\3", text)
    text = re.sub(r'(["“„「])[ \t]*(`[^`\n]+`|\*\*[^*\n]+\*\*)[ \t]+(["”“」])', r"\1\2\3", text)
    # virgule avalée dans le texte du lien : "([synchron,](url) um" -> "([synchron](url), um"
    text = re.sub(r"(?<!!)\[([^\[\]]*?)\s*,\s*\]\((<[^>]*>|[^)\s]+)\)", r"[\1](\2),", text)
    text = re.sub(r"<code>\s+", "<code>", text)
    text = re.sub(r"\s+</code>", "</code>", text)
    return text.strip()

def native_terms(text, ctx):
    """ja/zh/ko, après restauration des expressions imposées :
    - doublon : "ネットワークネットワーク負荷分散" -> "ネットワーク負荷分散"
    - gras étendu : "**SafeKit は…負荷分散**" -> "SafeKit は…**負荷分散**" (si la source mettait le terme seul en gras)
    - particule d'objet perdue avant un verbe : "**負荷分散**簡素化し" -> "**負荷分散**を簡素化し" ; "분산** 간소화하고" -> "분산**을 간소화하고"
    """
    for n in ctx.terms:
        tr = re.sub(r"<[^>]+>", "", ctx.store[n]).strip()
        if len(tr) < 3:
            continue
        last = re.split(r"\s+", tr)[-1]
        if len(last) >= 2 and last != tr:   # dernier mot répété : "mirror クラスタークラスター" -> "mirror クラスター"
            text = re.sub("(" + re.escape(tr) + r"(?:\*\*)?)\s*" + re.escape(last), r"\1", text, flags=re.I)   # aussi "クラスター**クラスター"
        kat = re.search(r"[\u30a0-\u30ff]{3,}$|[가-힣]{2,}$|[\u4e00-\u9fff]{2}$", tr)   # "高可用性クラスタークラスター" -> "高可用性クラスター"
        if kat and kat.group(0) != tr:
            text = re.sub("(" + re.escape(tr) + r"(?:\*\*)?)\s*" + re.escape(kat.group(0)), r"\1", text)
        for k in range(len(tr) - 1, 1, -1):   # préfixe du terme répété juste avant lui
            text = text.replace(tr[:k] + tr, tr)
            text = text.replace(tr[:k] + "**" + tr, "**" + tr)
        if n in ctx.bold_terms:
            esc = re.escape(tr)
            text = re.sub(r"\*\*([^*\n]*?)%s([^*\n]*?)\*\*" % esc,
                          lambda m: m.group(1) + f"**{tr}**" + m.group(2) if (m.group(1).strip() or m.group(2).strip()) else m.group(0), text)
        esc = re.escape(tr)
        # japonais : nom + verbe en する sans particule
        text = re.sub(r"(%s(?:\*\*)?)(?=[\u4e00-\u9fff]{2,}(?:し|する|します|され|させ))" % esc, r"\1を", text) if re.search("[\u3040-\u30ff]", text) else text
        # coréen : nom + verbe en 하다 sans particule
        if re.match("[\uac00-\ud7a3]", tr[-1]):
            obj = "을" if (ord(tr[-1]) - 0xAC00) % 28 else "를"
            text = re.sub(r"(%s(?:\*\*)?)(?= [\uac00-\ud7a3]+(?:하고|하여|합니다|하는|한다|해서|하며|하기))" % esc, r"\1" + obj, text)
    return text

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
        # ponctuation de phrase en tête ou en fin de gras : "透明 **。它…**" -> "透明。**它…**"
        m1 = re.match(r"\s*([。！？、，；：]+)\s*", parts[k])
        if m1 and parts[k][m1.end():].strip():
            parts[k - 1] = parts[k - 1].rstrip() + m1.group(1)
            parts[k] = parts[k][m1.end():]
        m2 = re.search(r"\s*([。！？、，；]+)\s*$", parts[k])
        if m2 and parts[k][:m2.start()].strip():
            parts[k + 1] = m2.group(1) + parts[k + 1].lstrip()
            parts[k] = parts[k][:m2.start()]
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

# suffixe de langue = un code du site uniquement ("insert-vm-vs-app-ha-en" : "ha" n'est pas une langue)
SHORTCODE = re.compile(r"(\{\{[<%%]%%?\s*/?\s*)([\w-]+)-(%s)(?=[\s%%>\"])" % "|".join(
    sorted(["ar", "de", "en", "es", "fr", "it", "ja", "ko", "nl", "pt-br", "pt-pt", "zh-hans"], key=len, reverse=True)), re.I)

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
    global CJK, NATIVE
    NATIVE = lang.split("-")[0] in ("zh", "ja", "ko")
    APOS = lang.split("-")[0] in ("fr", "it", "pt")
    CJK = lang.split("-")[0] in ("zh", "ja")
    load_glossary(a.glossary, lang)
    raw = open(a.source, encoding="utf-8", newline="").read()
    eol = "\r\n" if "\r\n" in raw else "\n"          # fins de ligne d'origine (CRLF Windows conservé)
    lines = raw.replace("\r\n", "\n").split("\n")
    missing = set()
    link_fix = make_link_fixer(a.target, lang, missing, a.host)
    sc_missing = set()
    sc_fix = make_shortcode_fixer(a.target, a.src, lang, sc_missing)

    jobs, rows, in_code, fm_end = [], [], False, -1
    if lines and lines[0].strip() in ("---", "+++"):
        for j in range(1, len(lines)):
            if lines[j].strip() == lines[0].strip():
                fm_end = j; break
    # lignes de tableau Markdown (en-tête + séparateur ---|--- + lignes suivantes jusqu'à une ligne vide) :
    # une ligne à 2 colonnes n'a qu'un seul "|" ("Champ | Réponse") -> sinon traduite comme une phrase
    # et Google supprime le "|" ("Volumen de datos recomendado: unos pocos terabytes")
    table_lines = set()
    for j, l in enumerate(lines):
        if j > fm_end and "|" in l and "-" in l and re.fullmatch(r"\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*", l):
            if j > 0 and "|" in lines[j - 1]:
                table_lines.add(j - 1)
            k = j + 1
            while k < len(lines) and lines[k].strip() and "|" in lines[k]:
                table_lines.add(k); k += 1
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
                val = m.group(3)
                if re.match(r"\s*topics\b", m.group(1)) and ", " in val:
                    # liste de titres "A, B, C" : un titre par ligne pour Google (sinon il fusionne
                    # ou perd des éléments : "SafeKit SafeKit クラスター…"), puis réassemblés
                    ctx.list_sep = "、" if CJK else ("، " if lang.startswith("ar") else ", ")
                    val = "<br>".join(x.strip() for x in val.split(", "))
                jobs.append((i, m.group(1) + m.group(2), encode(val, ctx), m.group(2), ctx))
            continue
        if i <= fm_end:
            continue
        s = line.strip()
        if s.startswith(("```", "~~~")):
            in_code = not in_code; continue
        # bloc de code indenté (commande dans une liste : 8 espaces ou tabulation) : jamais traduit
        if re.match(r"^(?: {8,}|\t)\S", line) and not re.match(r"^\s*(?:[*+-]|\d+\.)\s", line):
            continue
        # bloc de code indenté de 4 espaces hors liste, précédé d'une ligne vide (ex. "    /var/lib/libvirt/...")
        if re.match(r"^ {4}\S", line) and not re.match(r"^\s*(?:[*+-]|\d+\.)\s", line) and i > 0 and not lines[i - 1].strip() \
                and not any(re.match(r"^\s*(?:[*+-]|\d+\.)\s", lines[j]) for j in range(max(0, i - 6), i)):
            continue
        if not in_code:
            line = lines[i] = sc_fix(line)
            # paramètres de shortcode pointant vers une page du site : destination="/confirmation-safekit/" -> "/fr/confirmation-safekit/"
            line = lines[i] = re.sub(r'(\{\{[<%][^\n]*?\b\w+=")(/[\w\-/]*/(?:#[\w\-]+)?)(")',
                                     lambda x: x.group(1) + link_fix(x.group(2)) + x.group(3), line)
            # paramètres de shortcode imposés par langue (glossaire "shortcode_params") :
            # preferredLanguage="English US" -> "French", "ZH-HANS"...
            for pname, values in GLOSSARY.get("shortcode_params", {}).items():
                if lang in values:
                    line = lines[i] = re.sub(r'(\{\{[<%%][^\n]*?\b%s=")[^"]*(")' % re.escape(pname),
                                             lambda x, v=values[lang]: x.group(1) + v + x.group(2), line)
            s = line.strip()
        if in_code or not s or (re.fullmatch(r"\|?[\s:|-]+\|?", s) and "-" in s):
            continue
        if s.startswith("{{") and not re.sub(r"\s", "", "".join(
                s[p:q] for p, q in zip([0] + [b for _, b in go_templates(s)], [a for a, _ in go_templates(s)] + [len(s)]))):
            continue   # ligne composée uniquement d'expressions Go Template / shortcodes
        if "|" in s and (s.startswith("|") or s.count("|") >= 2 or i in table_lines):
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
            body = m.group(2)
            trail = body[len(body.rstrip()):]   # "  " en fin de ligne = saut de ligne Markdown, à conserver
            lead = m.group(1)
            # HTML brut "<p><strong>texte</strong></p>" : les balises d'ouverture / fermeture restent hors
            # de la requête (sinon Google voit "0texte1" et peut perdre des mots : "感谢您联系我们" -> "您联系我们")
            # (balise ouvrante pouvant contenir {{ .Get "guide" }} ; texte pouvant contenir ">" : "… {{ .Get "app" }} >")
            hm = re.match(r"^((?:<[a-zA-Z](?:[^<>{]|\{\{[^}]*\}\})*>\s*)+)((?:[^<]|</?(?:code|b|strong|em|i)>)*?\S(?:[^<]|</?(?:code|b|strong|em|i)>)*?)((?:\s*</[a-zA-Z][^<>]*>)+)$", body.rstrip())
            if hm and re.search(r"\s>$", hm.group(2)):   # flèche finale "… >" du bouton : hors traduction (sinon déplacée : "{{ app }} ></a> のための…")
                hm = type("M", (), {"group": lambda self, k, _g=(hm.group(0), hm.group(1), hm.group(2)[:-1].rstrip(), " >" + hm.group(3)): _g[k]})()
            if hm:
                lead += re.sub(r'(<a\b[^>]*?\bhref=")([^"]+)(")', lambda x: x.group(1) + link_fix(x.group(2)) + x.group(3), hm.group(1))
                trail = hm.group(3) + trail
                body = hm.group(2)
            jobs.append((i, lead, encode(body.rstrip(), ctx), trail, ctx))

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
        row_lost += len(set(re.findall(r'(?:data-k="|<a id=")(\d+)', "".join(e for _, _, e, _ in rc))) - set(re.findall(r'(?:data-k="|<a id=")(\d+)', t)))
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
    # infobulles des liens : traduites à part, puis réinjectées au décodage
    seen, tjobs = set(), []
    for j in jobs:
        c = j[4]
        if id(c) in seen:
            continue
        seen.add(id(c))
        for n, ttl in c.titles:
            tc = Ctx(link_fix)
            tjobs.append((c, n, ttl, tc, encode(ttl, tc)))
    if tjobs:
        for (c, n, ttl, tc, _), r in zip(tjobs, translate([x[4] for x in tjobs])):
            d = decode(r, tc)
            if not re.search(r"[.!?]\s*$", ttl):
                d = re.sub(r"\s*[.。]$", "", d)
            c.title_tr[n] = d
    tables, lost, numbers, punct, bold = {}, 0, [], [], []
    for (idx, before, enc, after, ctx), t in zip(jobs, out):
        if not getattr(ctx, "row", False):
            lost += len(set(re.findall(r'(?:data-k="|<a id=")(\d+)', enc)) - set(re.findall(r'(?:data-k="|<a id=")(\d+)', t)))
        strip = lambda x: re.sub(r"<[^>]+>", " ", re.sub(r'<span[^>]*data-k="\d+"[^>]*>.*?</span>|<a id="\d+">', " ", x))
        # nombres souvent écrits en toutes lettres : "0 data loss", "2-node", "3rd", "layer 2", "Test 1"
        src_nums = re.sub(r"\b0\b|\b[1-9](?=-\w|st\b|nd\b|rd\b|th\b)|(?i:\b(?:layer|test)\s+)\d\b", " ", strip(enc))
        miss = [n for n in set(re.findall(r"\d+", src_nums)) if n not in re.findall(r"\d+", strip(t))]
        if CJK:  # "layer 2" -> "二层", "2-node" -> "双节点" : pas une perte
            cn = {"1": "一单", "2": "二两双", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九", "10": "十"}
            miss = [n for n in miss if not any(c in t for c in cn.get(n, "-"))]
        if CJK:
            # la phrase source se termine par un point, la traduction non
            end_src = re.search(r"(?<!\.\.)[.!?]$", re.sub(r"<[^>]+>|\s", "", enc))
            end_out = re.search(r"[。！？.!?]$", re.sub(r"\*|\s", "", t))
            if end_src and not end_out:
                punct.append(idx[0] if isinstance(idx, tuple) else idx)
        if miss:
            numbers.append((idx[0] if isinstance(idx, tuple) else idx, miss))
        t = decode(t, ctx)
        if getattr(ctx, "list_sep", None):
            t = re.sub(r"\s*<br\s*/?>\s*", ctx.list_sep, t)
        # pas de point final ajouté quand la source n'en a pas ("[Lire le guide](/x/)。")
        src_vis = re.sub(r"<[^>]+>", "", enc).strip()
        if src_vis and not re.search(r"[.!?。！？]$", src_vis):
            t = re.sub(r"(?<!\.)[.。](?=(?:\*\*)?\s*$)", "", t)   # aussi "**safekitinstall.**"
        # ponctuation finale de la source perdue par Google (élément de liste "[lien](/x/)," ou phrase d'introduction "… :")
        # source finissant par "..." (ex. `<Failover>...`) : pas un point de fin de phrase
        end = src_vis[-1:] if src_vis and not re.search(r"(?:\.\.\.|…)`?$", src_vis) else ""
        if end in ",:." and not re.search(r"[,:;.!?、，：；،。！？…]\s*(?:\*\*)?\s*$", t) and t.strip():
            if end == ":":
                add = "：" if CJK else (" :" if lang == "fr" else ":")
            elif end == ".":
                add = "。" if CJK else "."
            else:
                add = "" if CJK or lang == "ko" else ("،" if lang == "ar" else ",")
            if add:
                t = re.sub(r"\s*$", "", t) + add + re.search(r"\s*$", t).group(0)
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
            src_line = lines[idx]
            if "<" in src_line and not re.search(r">\s|\s<", src_line.strip()):
                # HTML brut sans espaces entre balises : "<p> <strong> texte </strong> </p>" -> "<p><strong>texte</strong></p>"
                t = re.sub(r"(<[a-zA-Z][^<>]*>)\s+", r"\1", t)
                t = re.sub(r"\s+(</[a-zA-Z]+>)", r"\1", t)
                t = re.sub(r"(</[a-zA-Z]+>)\s+(?=<)", r"\1", t)
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
    elif lines and lines[0].lstrip().startswith("{{"):
        # gabarit de shortcode sans front matter : trace dans un commentaire Go (invisible sur le site)
        sig = (f'{{{{/* translation: translate_md {VERSION} | glossaire {GLOSSARY.get("version", "?")} | '
               f'{"Translation LLM" if MODEL else "NMT"} | {len(TERMS)} expressions */}}}}')
        had = lines[0].startswith("{{/* translation:")
        lines = [sig] + (lines[1:] if had else lines)
        shift = 0 if had else 1
    else:
        shift = 0
    Path(a.target).parent.mkdir(parents=True, exist_ok=True)
    open(a.target, "w", encoding="utf-8", newline="").write(eol.join(lines))
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

ALL_LANGS = ["ar", "de", "es", "fr", "it", "ja", "ko", "nl", "pt-br", "pt-pt", "zh-hans"]

def batch_targets(src):
    """Chemins cibles des 11 langues, déduits du fichier anglais (règles du site Hugo)."""
    if src.parent.name == "shortcodes":
        if not re.search(r"-en$", src.stem):
            sys.exit(f"Shortcode source attendu en -en.html : {src.name}")
        return {l: src.with_name(re.sub(r"-en$", f"-{l}", src.stem) + src.suffix) for l in ALL_LANGS}
    content = next((p for p in src.parents if p.name == "content"), None)
    if content is None:
        sys.exit(f"Fichier hors de content/ ou layouts/shortcodes/ : {src}")
    rel = src.relative_to(content)
    if rel.parts[0] in LANGS:
        sys.exit(f"La source doit être la page anglaise (content/{rel.as_posix()} est déjà une traduction).")
    return {l: content / l / rel for l in ALL_LANGS}

def batch():
    """Mode « tout-en-un » : 11 langues + résumé (copie seulement avec --export)."""
    import shutil, subprocess
    ap = argparse.ArgumentParser(description="Traduit un fichier anglais dans les 11 langues du site.")
    ap.add_argument("source")
    ap.add_argument("--langs", default=",".join(ALL_LANGS))
    ap.add_argument("--export", default=None, help="dossier où copier en.* et <lang>.* (aucune copie par défaut)")
    a, extra = ap.parse_known_args()
    src = Path(a.source).resolve()
    if not src.exists():
        sys.exit(f"Fichier introuvable : {src}")
    targets = batch_targets(src)
    langs = [l.strip() for l in a.langs.split(",") if l.strip()]
    print(f"translate_md.py version {VERSION} - {src.name} -> {len(langs)} langue(s)")
    summary = []
    for lang in langs:
        tgt = targets[lang]
        cmd = [sys.executable, str(Path(__file__).resolve()), str(src), str(tgt), "--to", lang] + extra
        # sortie du sous-processus en UTF-8 (console Windows cp1252) et sans tampon (progression visible)
        env = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONUNBUFFERED="1")
        idx = langs.index(lang) + 1
        for attempt in (1, 2, 3):
            print(f"[{idx}/{len(langs)}] {lang} : traduction en cours..." + (f" (essai {attempt})" if attempt > 1 else ""), flush=True)
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
                                 encoding="utf-8", errors="replace", env=env)
            lines = []
            for line in p.stdout:   # affichage en direct : limite de débit, nouvelles tentatives...
                line = line.rstrip("\n")
                lines.append(line)
                if line.startswith(("Limite de débit", "Quota Google", "Traceback", "ATTENTION")) or "Error" in line:
                    print(f"      {line}", flush=True)
            p.wait()
            if p.returncode == 0:
                break
            quota = any("Quota Google" in x or "RateLimit" in x for x in lines)
            wait = 120 if quota else 30
            print(f"[{lang}] échec (essai {attempt}/3) : {(lines[-1] if lines else '').strip()[:200]}", flush=True)
            if attempt < 3:
                print(f"      nouvel essai de {lang} dans {wait} s", flush=True)
                time.sleep(wait)
        r = subprocess.CompletedProcess(cmd, p.returncode, "\n".join(lines), "")
        out = r.stdout.splitlines()
        seg = next((x for x in out if "segments traduits" in x), "ÉCHEC")
        warn, keep = [], False
        for x in out:
            if x.startswith(("ATTENTION", "A vérifier", "Shortcodes laissés", "Liens localisés")):
                keep = True; warn.append(x.strip())
            elif keep and x.startswith("   "):
                warn.append("  " + x.strip())
            else:
                keep = False
        summary.append((lang, r.returncode == 0, re.sub(r" ->.*", "", seg), warn))
        print(f"      {lang} : {re.sub(r' ->.*', '', seg)}" + (f" - {len(warn)} avertissement(s)" if warn else ""), flush=True)
    if a.export:
        exp = Path(a.export)
        exp.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, exp / f"en{src.suffix}")
        for lang, ok, _, _ in summary:
            if ok and targets[lang].exists():
                shutil.copyfile(targets[lang], exp / f"{lang}{src.suffix}")
        print(f"Copié dans {exp} : en{src.suffix} + {sum(1 for s in summary if s[1])} traduction(s)")
    gpath = Path(__file__).with_name("glossary.json")
    gver = json.load(open(gpath, encoding="utf-8")).get("version", "?") if gpath.exists() else "introuvable"
    rep = ["===== RESUME =====",
           f"Fichier : {src.name}  ({time.strftime('%Y-%m-%d %H:%M')})",
           f"Script {VERSION} | glossaire {gver}"]
    for lang, ok, seg, warn in summary:
        rep.append(f"{lang:8} {'OK ' if ok else 'ÉCHEC'} {seg}")
        rep += [f"         {w}" for w in warn]
    print("\n" + "\n".join(rep))
    if a.export:   # le résumé accompagne les fichiers copiés (lisible pour la vérification)
        (Path(a.export) / "RESUME.txt").write_text("\n".join(rep) + "\n", encoding="utf-8")
        print(f"Résumé copié dans {Path(a.export) / 'RESUME.txt'}")
    if not all(s[1] for s in summary):
        sys.exit(1)

if __name__ == "__main__":
    for stream in (sys.stdout, sys.stderr):   # console Windows : jamais de plantage sur un caractère non affichable
        try:
            stream.reconfigure(errors="replace", line_buffering=True)
        except Exception:
            pass
    if "--to" not in sys.argv:   # sans --to : les 11 langues
        batch()
    else:
        main()
