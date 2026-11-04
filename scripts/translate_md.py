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
Shortcodes xxx-en : remplacés par xxx-<lang> si layouts/shortcodes/xxx-<lang>.* existe.
"""
import argparse, html, json, os, re, sys, urllib.parse, urllib.request
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

class Ctx:
    def __init__(self, link_fix):
        self.store, self.link_fix = [], link_fix
    def add(self, v):
        self.store.append(v); return len(self.store) - 1

def encode(text, ctx):
    def link(m):
        n = ctx.add((m.group(1), ctx.link_fix(m.group(3)) + m.group(4)))
        return f"{S}A{n}{S}{m.group(2)}{S}/A{S}"
    text = LINK.sub(link, text)
    text = PROTECT.sub(lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    text = html.escape(text, quote=False)
    text = BOLD.sub(r"<b>\1</b>", text)
    text = re.sub(f"{S}A(\\d+){S}", r'<a id="\1">', text)
    text = text.replace(f"{S}/A{S}", "</a>")
    return re.sub(f"{S}P(\\d+){S}", r'<span class="notranslate">\1</span>', text)

def decode(text, ctx):
    st = ctx.store
    text = re.sub(r'<span class="notranslate">\s*(\d+)\s*</span>', lambda m: f"{S}P{m.group(1)}{S}", text)
    text = re.sub(r"\s*<b>\s*(.*?)\s*</b>\s*", lambda m: f" **{m.group(1)}** ", text)
    def link(m):
        bang, dest = st[int(m.group(1))]
        return f"{bang}[{m.group(2).strip()}]({dest})"
    text = re.sub(r'<a id="(\d+)">(.*?)</a>', link, text)
    text = html.unescape(text)
    text = re.sub(f"{S}P(\\d+){S}", lambda m: st[int(m.group(1))], text)
    # nettoyage des espaces ajoutés autour du gras / des parenthèses
    text = re.sub(r"\*\* +([,.;)\]])", r"**\1", text)
    text = re.sub(r"([(\[]) +\*\*", r"\1**", text)
    text = re.sub(r"\( +", "(", text)
    text = re.sub(r" +\)", ")", text)
    text = re.sub(r" +([,.](?:\s|$))", r"\1", text)
    text = re.sub(r"  +", " ", text)
    return text.strip()

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
    ap.add_argument("--lang"); ap.add_argument("--host", default="safekit.eviden.com"); ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    lang = (a.lang or a.to).lower()
    # codes Hugo -> codes Google
    a.to = {"zh-hans": "zh-CN", "zh-hant": "zh-TW", "pt-br": "pt-BR", "pt-pt": "pt-PT"}.get(a.to.lower(), a.to)
    key = os.environ.get("GOOGLE_TRANSLATE_API_KEY")
    if not key and not a.dry_run:
        sys.exit("Variable GOOGLE_TRANSLATE_API_KEY absente.")
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
        if h and not re.search(r"\{#[^}]+\}\s*$", h.group(2)):
            # titre sans ancre explicite : on fige l'ancre anglaise
            line = lines[i] = f"{h.group(1)}{h.group(2)} {{#{anchorize(h.group(2))}}}"
        m = PREFIX.match(line)
        if m.group(2).strip():
            ctx = Ctx(link_fix)
            jobs.append((i, m.group(1), encode(m.group(2), ctx), "", ctx))

    out = [MOCK(j[2]) for j in jobs] if a.dry_run else google([j[2] for j in jobs], a.src, a.to, key)
    tables, lost = {}, 0
    for (idx, before, _, after, ctx), t in zip(jobs, out):
        lost += len(ctx.store) - len(set(re.findall(r'(?:notranslate">\s*|<a id=")(\d+)', t)))
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
