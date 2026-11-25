#!/usr/bin/env python3
"""Translates a Hugo Markdown page with Google Cloud Translation (API v2).

Usage:
  python translate_md.py SOURCE            -> translates into the 11 languages and overwrites the translations
     SOURCE = content/<path>.md  or  layouts/shortcodes/<name>-en.html  (English file)
     options: --langs fr,de  (subset)  --export FOLDER (copies en.* and <lang>.* into FOLDER)
              --dry-run  --model nmt
  python translate_md.py SOURCE.md TARGET.md --to fr [--from en] [--lang fr] [--model nmt]   (single language)
  Default: Google Translation LLM model (best quality, higher cost).
  --model nmt: older classic model, cheaper.

Environment variables:
  GOOGLE_TRANSLATE_API_KEY  API key (required)
  GOOGLE_CLOUD_PROJECT      Google Cloud project ID (required with the LLM model, or use --project)

Single-language options:
  --to    Google language code (fr, de, ja, zh-CN...)
  --lang  Hugo language code written in "lang:" (default = --to; e.g. zh-hans)
  --dry-run  no call to Google (formatting test)

Not translated: code blocks, `code`, Hugo shortcodes, {#...} anchors, URLs,
HTML tags, <... class="notranslate"> / translate="no" elements (content included).
Front matter: title, linkTitle, description, summary, topics translated;
lang updated; canonical rewritten to the language version.
Internal links (/xxx/ and https://safekit.eviden.com/xxx/): prefixed with /<lang>/;
target pages not yet translated are listed at the end of the run.
Headings: the {#...} anchor is never sent to Google, it is put back at the end of the heading.
Chinese / Japanese: 。 restored after `code`, Chinese-Latin spacing, valid Markdown bold.
Warnings: glossary not found, lost numbers, lost sentence endings.
Glossary (glossary.json next to the script): never-translated terms + per-language fixes.
xxx-en shortcodes: replaced by xxx-<lang> if layouts/shortcodes/xxx-<lang>.* exists.
"""
VERSION = "2026-11-25.1"   # script version, printed and written into the translated page

import argparse, html, json, os, re, sys, time, unicodedata, urllib.error, urllib.parse, urllib.request
from pathlib import Path

API = "https://translation.googleapis.com/language/translate/v2"
FM_KEYS = ("title", "linkTitle", "description", "summary", "topics")

# typographic quotes per language, for front matter values between straight quotes
FM_QUOTES = {"fr": ("«\u00a0", "\u00a0»"), "es": ("«", "»"), "it": ("«", "»"), "pt": ("“", "”"), "de": ("„", "“"),
             "nl": ("‘", "’"), "ja": ("「", "」"), "zh": ("“", "”"), "ko": ("‘", "’"), "ar": ("«", "»")}

_ABBR = r"(?<!\bvs)(?<!\bVs)(?<!\be\.g)(?<!\bi\.e)(?<!\betc)(?<!\bMr)(?<!\bDr)"   # "vs.", "e.g.": not a sentence end
_SENT_SRC = re.compile(_ABBR + r"[.!?](?=\s|$)")
_SENT_OUT = re.compile(r"[。！？]|[.!?](?=\s|$)")

def _sent_index(text, pos, rx):
    return len(rx.findall(re.sub(r"<[^>]*>", lambda m: " " * len(m.group(0)), text[:pos])))

def displaced_marker(src, out):
    """True if Google put a protected expression (span data-k) in a different sentence than in the source,
    or doubled it with an adjacent plain-text copy ("SafeKit <span>SafeKit</span>"): a neighbouring word is then often lost."""
    ks = re.findall(r'data-k="(\d+)"', src)
    if not ks:
        return False
    plain_src, plain_out = re.sub(r"<[^>]*>", " ", src), re.sub(r"<[^>]*>", " ", out)
    for word in {m.group(1).strip() for m in re.finditer(r'<span[^>]*data-k="\d+"[^>]*>([^<]+)</span>', out)}:
        if re.search(r"[A-Za-z]", word):   # Latin name in addition to the marker: plain-text copy + moved marker
            rx = r"(?<![A-Za-z0-9])" + re.escape(word) + r"(?![A-Za-z0-9])"
            if len(re.findall(rx, plain_out)) > len(re.findall(rx, plain_src)):
                return True
    n_src = len(_SENT_SRC.findall(re.sub(r"<[^>]*>", "", src).strip()))
    n_out = len(_SENT_OUT.findall(re.sub(r"<[^>]*>", "", out).strip()))
    if n_src < 2 or n_src != n_out:
        return False
    for k in set(ks):
        ps = [_sent_index(src, m.start(), _SENT_SRC) for m in re.finditer(r'data-k="%s"' % k, src)]
        po = [_sent_index(out, m.start(), _SENT_OUT) for m in re.finditer(r'data-k="%s"' % k, out)]
        if sorted(ps) != sorted(po):
            return True
    return False

def split_sentences(text):
    """Splits a source segment into sentences, never inside a tag or an <a>...</a> link."""
    parts, start, depth = [], 0, 0
    for m in re.finditer(r"<a\b[^>]*>|</a>|<[^>]*>|" + _ABBR + r"[.!?](?:</(?:b|strong|em|i)>)*(?=\s+\S)", text):
        g = m.group(0)
        if g.startswith("<a"):
            depth += 1
        elif g == "</a>":
            depth = max(0, depth - 1)
        elif not g.startswith("<") and depth == 0:
            parts.append(text[start:m.end()])
            start = m.end()
    parts.append(text[start:])
    return [x.strip() for x in parts if x.strip()]


def cjk_bold_pairs(text):
    """CJK bold extended by Google, respecting ** pairing (a closing ** is never taken as an opening one):
    "**虚拟 IP。SafeKit**" -> "**虚拟 IP**。SafeKit" ; "**在此期间，状态为 ✅ ALONE（节点 1）**" -> "在此期间，状态为 **✅ ALONE（节点 1）**"."""
    out = []
    for line in text.split("\n"):
        parts = line.split("**")
        if len(parts) % 2 == 0:   # odd number of **: leave everything unchanged
            out.append(line)
            continue
        for i in range(1, len(parts), 2):
            m = re.match(r"^(.+?)([。！？])(\S.*)$", parts[i])
            if m:
                parts[i], parts[i + 1] = m.group(1), m.group(2) + m.group(3) + parts[i + 1]
            m = re.match(r"^([^✅❌]+?)\s*([✅❌].*)$", parts[i])
            if m and m.group(1).strip():
                parts[i - 1], parts[i] = parts[i - 1] + m.group(1).rstrip() + " ", m.group(2)
        out.append("**".join(parts))
    return "\n".join(out)


def link_quotes(t):
    """Quotes added by Google around a link text (quoted article title), often mismatched:
    "l’article [intitulé Microsoft NLB … »](url)", "[„ Microsoft NLB …“](url)", "《 [Microsoft NLB …》](url)" -> "[Microsoft NLB …](url)".
    Applied only if the source line contains no quotes."""
    Q = "\"“”«»„「」《》『』"
    t = re.sub(r"[%s]\s*\[" % Q, "[", t)                     # opening quote before the link
    t = re.sub(r"(?<=\s)'\s*\[", "[", t)
    t = re.sub(r"\[\s*(?:intitulé|intitolato|titulado|intitulado|met de titel|بعنوان)\s+", "[", t)
    t = re.sub(r"\[\s*[%s']\s*" % Q, "[", t)                 # quotes at the start / end of the link text
    t = re.sub(r"\s*[%s']\s*\]\(" % Q, "](", t)
    t = re.sub(r"(\]\([^)\s]*\))\s?[%s]" % Q, r"\1", t)     # closing quote after the link
    return t


def fm_quotes(t, delim, lang):
    """Front matter value: a quote identical to the delimiter breaks the YAML/TOML
    (Hugo: "value is not allowed in this context", e.g. clúster "plug-and-play").
    Pairs -> typographic quotes of the language; single quote -> escaped."""
    if delim == "'":
        return t.replace("'", "’")
    o, c = FM_QUOTES.get(lang.split("-")[0], ("“", "”"))
    t = re.sub(r'"\s*([^"]+?)\s*"', lambda m: o + m.group(1) + c, t)
    return t.replace('"', '\\"')

MODEL = None  # None = classic model (NMT); otherwise path of the Translation LLM model

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
        time.sleep(PAUSE)   # spreads requests to spare the per-minute quota
    return out

PAUSE = 1.0
def call_api(data, attempts=6):
    """Call with retries if Google rate-limits (403 rateLimit, 429) or on server error (5xx)."""
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
                    sys.exit("Google quota exceeded (userRateLimitExceeded) after several attempts. "
                             "Try again later, or use --model nmt (separate quota).")
                raise
            print(f"Google rate limit ({e.code}): retrying in {delay} s ({n}/{attempts - 1})")
            time.sleep(delay)
            delay = min(delay * 2, 120)

# Elements copied as is (including the content of a notranslate element)
PROTECT = re.compile(
    r"(<(\w+)[^>]*(?:notranslate|translate=\"no\")[^>]*>.*?</\2>"   # <span class="notranslate">farm</span>
    r"|\{\{[<%].*?[%>]\}\}"                                         # Hugo shortcodes
    r"|\{[#.][^}]*\}"                                               # {#anchor} {.class}
    r"|`[^`]+`"                                                     # inline code
    r"|</?[A-Za-z][^>]*>"                                           # HTML tags
    r"|https?://[^\s)>\]\x00]+)")                                   # bare URLs (never the sentinel: "[https://site](/)" -> "https://site /A")
LINK = re.compile(r"(!?)\[((?:[^\[\]]|\[[^\]]*\])*)\]\((<[^>]*>|[^)\s]+)((?:\s+\"[^\"]*\")?)\)")
BOLD = re.compile(r"\*\*(.+?)\*\*")
S = "\x00"  # internal sentinel

GLOSSARY = {"keep": [], "replace": {}}
APOS = False  # typographic apostrophe ’ (fr, it...)
FRSP = False  # space before ; : ! ? (fr only)
NATIVE = False  # ja/zh/ko: Google sees the imposed translation (particles added naturally)
CJK = False   # Chinese / Japanese: full-width punctuation, Chinese-Latin spacing
CJK_CHAR = "\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff"
CJK_PUNCT = "。，、；：？！）」』】"
KEEP_RE = None
TERMS = []    # [(source regex, rendering in the target language)]
GRAMMAR = []  # [(regex, replacement)] grammar agreement rules of the target language

def load_glossary(path, lang):
    """glossary.json: {"keep": [never-translated terms], "replace": {"fr": {"Google text": "fix"}}}"""
    global KEEP_RE
    if path and Path(path).exists():
        GLOSSARY.update(json.load(open(path, encoding="utf-8")))
        print(f"Glossary loaded: version {GLOSSARY.get('version', 'unknown')}, "
              f"{len(GLOSSARY.get('keep', []))} protected terms ({path})")
    else:
        print(f"WARNING: glossary not found ({path}) -> mirror, farm... will be translated.")
    terms = sorted(GLOSSARY.get("keep", []), key=len, reverse=True)
    if terms:
        # lowercase word (mirror, farm): any case; otherwise exact case (Floating IP)
        alts = [("(?i:%s)" % re.escape(t)) if t.islower() else re.escape(t) for t in terms]
        KEEP_RE = re.compile(r"(?<![\w#.-])(?<!/[a-z0-9-]/)(%s)(?![\w-]|/[a-z0-9-]*/|\.\w)" % "|".join(alts))
    GLOSSARY["_rep"] = GLOSSARY.get("replace", {}).get(lang, {})
    # "terms": expressions with an imposed translation, e.g. "farm cluster" -> "cluster farm" (fr)
    keep_lower = {k.lower() for k in GLOSSARY.get("keep", [])}
    TERMS.clear()
    for en, per_lang in sorted(GLOSSARY.get("terms", {}).items(), key=lambda x: -len(x[0])):
        target = per_lang.get(lang) or per_lang.get(lang.split("-")[0])
        if not target:
            continue
        words = []
        for w in en.split():
            if w.lower() in ("vs", "vs."):   # "vs" and "vs.": same expression
                words.append(r"vs\.?")
                continue
            if w.lower() in keep_lower:   # the word may be wrapped in a <span ...notranslate...>
                words.append(r"(?:<span[^>]*>\s*%s\s*</span>|%s)" % (re.escape(w), re.escape(w)))
            else:
                words.append(re.escape(w))
        TERMS.append((re.compile(r"(?<![^\W_]|[/.-])" + r"\s+".join(words) + r"(?![^\W_]|[/-]|\.\w)", re.I), target))  # "_heartbeat timeout_" (italics) recognized
    GRAMMAR.clear()
    g = GLOSSARY.get("grammar", {})
    # base language rules ("pt") then variant-specific rules ("pt-br")
    base = lang.split("-")[0]
    for pat, repl in (g.get(base, []) if base != lang else []) + g.get(lang, []):
        GRAMMAR.append((re.compile(pat), repl))
    if TERMS:
        print(f"Imposed expressions for '{lang}': {len(TERMS)}"
              + (f", {len(GRAMMAR)} grammar rules" if GRAMMAR else ""))

class Ctx:
    def __init__(self, link_fix):
        self.store, self.link_fix = [], link_fix
        self.apos = APOS
        self.dot_after = set()
        self.terms = set()
        self.titles = []     # link tooltips translated separately: [(n, text)]
        self.title_tr = {}
        self.bold_terms = set()   # imposed terms forming a whole bold passage on their own
        self.shown = {}      # text shown to Google for an imposed expression   # tokens coming from imposed expressions
    def add(self, v):
        self.store.append(v); return len(self.store) - 1

def go_templates(text):
    """Positions of Go Template {{ ... }} expressions (nesting included: printf "{{%% x %%}}")."""
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
        # built file name: {{ .Get "mod" }}.safe -> a single block (otherwise "{{ .Get "mod" }} .safe" or ".safe" lost)
        ext = re.match(r"\.[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)*", text[b:])
        if ext and not re.match(r"\.\s", text[b:]):
            b += ext.end()
        parts.append(text[last:a]); parts.append(f"{S}P{ctx.add(text[a:b])}{S}"); last = b
    parts.append(text[last:])
    return "".join(parts)

def encode(text, ctx):
    ctx.src = text
    ctx.all_src = getattr(ctx, "all_src", "") + "\n" + text   # all cells of a table row
    text = protect_templates(text, ctx)   # {{ .Get "app" }}, {{< shortcode >}}... never translated
    def link(m):
        title = re.match(r'\s+"([^"]*)"', m.group(4)) if m.group(4) else None
        n = ctx.add((m.group(1), ctx.link_fix(m.group(3)), title.group(1) if title else None, m.group(2)))
        out = f"{S}A{n}{S}{m.group(2)}{S}/A{S}"
        if title and (m.group(1) == "!" or " " not in title.group(1).strip()):
            return out   # image or technical title ("w:512"): title kept as is
        if title:   # tooltip: translated in a separate request (otherwise Google mixes text and tooltip)
            ctx.titles.append((n, title.group(1)))
        return out
    text = LINK.sub(link, text)
    # raw HTML links: <a href="/page/"> -> <a href="/fr/page/">
    text = re.sub(r'(<a\b[^>]*?\bhref=")([^"]+)(")', lambda m: m.group(1) + ctx.link_fix(m.group(2)) + m.group(3), text)
    text = re.sub(r"`[^`]+`", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)   # code first
    text = re.sub(r"<code>([^<`]+)</code>", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)   # <code>farm</code>: a single block
    # durations / times (9:43, 3:21:35): never translated ("7 時 40 分", "٨:٤٧")
    # except "9:00 AM" / "5:00 PM": Google must convert them ("9 h", "17 h", "午後 5:00")
    text = re.sub(r"(?<![\w:.=/])\d{1,2}(?::\d{2}){1,2}(?![\w:])(?!\s?[AaPp]\.?[Mm]\b)", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # emojis (🛠️, 📘, ⬇️...): protected, otherwise Google sometimes drops them ("**🛠️[commencez" -> "**请[从")
    text = re.sub("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u25A0-\u25FF\u2600-\u27BF\u2B00-\u2BFF\u2139\u22EF][\uFE0F\u200D\U0001F000-\U0001FAFF\u2600-\u27BF]*",
                  lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # identifiers (VM1, SRV2...): never translated ("VM1" -> "الجهاز الظاهري 1", "máquina virtual 1")
    text = re.sub(r"(?<![\w/.-])(?<!\x00P)[A-Za-z]{2,}[0-9]+(?![\w-])", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # paths (C:/safekit/..., /opt/safekit/...): never translated or split ("**C:/…/generic ab**")
    text = re.sub(r"(?<![\w/:.])(?:[A-Za-z]:[/\\]|/(?:opt|etc|var|usr|home|tmp|root|srv|mnt)/)[^\s*<>\"'`()]*[^\s*<>\"'`().,;:!?]",
                  lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # "(Windows)" / "(Linux)" alone in parentheses: protected (otherwise "kvm.safe (</a> Linux": parenthesis lost)
    text = re.sub(r"\((?:Windows|Linux)\)", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    # file names (mirror.safe, farm.safe, setup.exe...): protected as a whole, otherwise only "mirror" is protected
    text = re.sub(r"(?<![\w/.-])[\w-]+\.(?:safe|exe|msi|ps1|sh|cmd|bat|xml|conf|cfg|ini|txt|log|json|ya?ml|dll|vhdx?)\b(?![\w/-])", lambda m: f"{S}P{ctx.add(m.group(0))}{S}", text)
    for rx, target in TERMS:
        def term(m, target=target):
            out = target
            # puts the original <span class="notranslate ..."> back around the protected word
            for sp, word in re.findall(r"(<span[^>]*>)\s*(\w+)\s*</span>", m.group(0)):
                def wrap(w, sp=sp):
                    return f"{sp}{w.group(0)}</span>"
                out = re.sub(r"(?<!\w)%s(?!\w)" % re.escape(word), wrap, out, count=1, flags=re.I)
            n = ctx.add(out)
            ctx.terms.add(n)
            ctx.shown[n] = re.sub(r"<[^>]+>", "", m.group(0)).strip()   # Google sees the English term
            return f"{S}P{n}{S}"
        text = rx.sub(term, text)
    def unlink(t):   # link inside a notranslate element: put back as Markdown as is ("<span notranslate>[farm](/fr/...)</span>")
        def back(m):
            bang, url, title, label = ctx.store[int(m.group(1))]
            return f'{bang}[{label}]({url}' + (f' "{title}"' if title else "") + ")"
        return re.sub(f"{S}A(\\d+){S}(.*?){S}/A{S}", back, t)
    text = PROTECT.sub(lambda m: f"{S}P{ctx.add(unlink(m.group(0)))}{S}", text)
    for m in re.finditer(f"{S}P(\\d+){S}\\.(?=\\s|$)", text):   # `code`. -> sentence ended
        if ctx.store[int(m.group(1))].startswith("`"):
            ctx.dot_after.add(int(m.group(1)))
    if KEEP_RE:  # glossary terms never to translate (mirror, farm...)
        parts = re.split(f"({S}P\\d+{S})", text)
        text = "".join(p if re.fullmatch(f"{S}P\\d+{S}", p) else KEEP_RE.sub(lambda m: f"{S}P{ctx.add(m.group(0))}{S}", p) for p in parts)
    text = html.escape(text, quote=False)
    text = BOLD.sub(r"<b>\1</b>", text)
    text = re.sub(r"(?<![\w*])_([^_\n]+?)_(?!\w)", r"<i>\1</i>", text)       # _italics_
    text = re.sub(f"{S}A(\\d+){S}", r'<a id="\1">', text)
    text = re.sub(f"{S}T(\\d+){S}", r'<span class="tt" data-t="\1">', text)
    text = text.replace(f"{S}/T{S}", "</span>")
    text = text.replace(f"{S}/A{S}", "</a>")
    def span(m):
        # Google sees the real word (mirror, `start_prim`...) and not a number,
        # otherwise it invents a name around it ("集群编号为", "方案SafeKit"...)
        tok = ctx.store[int(m.group(1))]
        if int(m.group(1)) in ctx.shown:   # imposed expression: show the English, not the translation
            shown = html.escape(re.sub(r"<[^>]+>", "", tok).strip() if NATIVE else ctx.shown[int(m.group(1))], quote=False)
            return f'<span class="notranslate" translate="no" data-k="{m.group(1)}">{shown}</span>'
        if re.fullmatch(r"<br\s*/?>", tok, re.I):
            return f'<br data-k="{m.group(1)}">'   # real line break for Google (otherwise it sees "0", "2"... and moves them)
        if tok.startswith("`"):
            shown = tok.strip("`")
        elif tok.startswith("{{"):
            g = re.search(r'\.Get\s+"(\w+)"', tok)
            shown = g.group(1).capitalize() if g else ""   # {{ .Get "app" }} -> "App" (proper noun)
            sfx = re.search(r"\}\}([.\w-]+)$", tok)
            if sfx:
                shown = (g.group(1) if g else "file") + sfx.group(1)   # {{ .Get "mod" }}.safe -> "mod.safe"
        elif tok.startswith("{"):
            shown = ""
        else:
            shown = re.sub(r"<[^>]+>", "", tok).strip()
        shown = html.escape(shown, quote=False) or m.group(1)
        return f'<span class="notranslate" translate="no" data-k="{m.group(1)}">{shown}</span>'
    for m in re.finditer(f"<b>{S}P(\\d+){S}</b>", text):   # bold = exactly one imposed term
        ctx.bold_terms.add(int(m.group(1)))
    return re.sub(f"{S}P(\\d+){S}", span, text)

def decode(text, ctx):
    st = ctx.store
    text = re.sub(r'<span[^>]*data-k="(\d+)"[^>]*>.*?</span>', lambda m: f"{S}P{m.group(1)}{S}", text)
    text = re.sub(r'\s*<br[^>]*data-k="(\d+)"[^>]*>\s*', lambda m: f" {S}P{m.group(1)}{S} ", text)
    seen = set()
    def once(m):   # Google sometimes copies a protected name ("SafeKit 提供健康探测 SafeKit"): each marker is unique
        if m.group(1) in seen:
            return ""
        seen.add(m.group(1))
        return m.group(0)
    text = re.sub(f"{S}P(\\d+){S}", once, text)
    # protected emoji copied as plain text by Google ("[forcez le 🖼️](…) … primaire 🖼️"): the copy is removed
    for i in {int(x) for x in re.findall(f"{S}P(\\d+){S}", text)}:
        tok = st[i] if isinstance(st[i], str) else ""
        if re.fullmatch("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u25A0-\u25FF\u2600-\u27BF\u2B00-\u2BFF\u2139\u22EF][\uFE0F\u200D\U0001F000-\U0001FAFF\u2600-\u27BF]*", tok):
            base = re.escape(tok.rstrip("\uFE0F"))
            parts = re.split(f"({S}P\\d+{S})", text)
            text = "".join(p if p.startswith(S) else re.sub(r"\s?" + base + "\uFE0F?", "", p) for p in parts)
    if True:   # protected name copied as plain text by Google in addition to the marker ("SafeKit 提供健康探测 SafeKit")
        plain = lambda i: re.sub(r"<[^>]+>", "", st[i]).strip()
        made = [plain(i) for i in range(len(st)) if isinstance(st[i], str)]
        for t in {x for x in made if (KEEP_RE and KEEP_RE.fullmatch(x)) or re.fullmatch(r"[A-Za-z]{2,}[0-9]+", x)}:
            n, seen_t = made.count(t), [0]
            # name included in a source word ("SANless" -> "sans SAN", "sin SAN"): the plain-text copy is legitimate
            n += len(re.findall(r"(?<![A-Za-z0-9_#.-])" + re.escape(t) + r"(?=[a-z])", getattr(ctx, "src", "") or ""))
            pat = f"{S}P(\\d+){S}|(?<![A-Za-z0-9_#.-])" + re.escape(t) + r"(?![A-Za-z0-9_-])"   # attached to Japanese: "SafeKit堅牢"
            total = sum(1 for mm in re.finditer(pat, text) if mm.group(1) is None or plain(int(mm.group(1))) == t)
            if total <= n:
                continue
            # 1) sentence-by-sentence alignment with the source: a plain-text copy in a sentence
            #    where the source does not have the name is removed ("ℹ️ VM1 无需配置虚拟 IP 地址。VM1 将…")
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
                # marker put by Google in a sentence where the source does not have the name, while another sentence
                # only has the plain-text copy: the marker replaces the copy ("ℹ️ VM1 无需…。将在" -> "ℹ️ 无需…。VM1 将在")
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
            # 2) plain-text occurrences are removed first (never a marker: "**Docker**" -> "****");
            # if a marker follows in the same sentence, it replaces the plain text
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
                if adj:   # "SafeKit **SafeKit**、": the plain text next to the marker is removed
                    text = text[:adj.start()] + text[adj.end():]
                elif pair:   # "SafeKit 提供健康探测 SafeKit": the marker replaces the plain text
                    p, nxt = pair
                    text = text[:p.start()] + nxt.group(0) + text[p.end():nxt.start()] + text[nxt.end():]
                elif start and lone and lone[-1].start() > start.end():   # subject at sentence start kept, "**SafeKit**" moved elsewhere removed
                    mm = lone[-1]
                    text = text[:start.start()] + "<b>" + mm.group(0) + "</b>" + text[start.end():mm.start()] + text[mm.end():]
                    text = re.sub(r"<b>\s*</b>", "", text)
                else:   # otherwise: the last plain-text occurrence
                    p = pl[-1]
                    text = text[:p.start()] + text[p.end():]
            text = re.sub(r"(?<=\S)  +(?=\S)", " ", text)
            text = re.sub(r"([，。、；：！？])\s+", r"\1", text)
            text = re.sub(r"<b>\s+", "<b>", text)
    text = re.sub(f"({S}P\\d+{S})\\s*/\\s*(?={S}P\\d+{S})", r"\1/", text)   # "Windows / Hyper-V" -> "Windows/Hyper-V"
    text = re.sub(f"([)\\]）]|\\w)/\\s+(?={S}P\\d+{S})", r"\1/", text)   # "(SQL)/ SafeKit", "Suite/ SafeKit" -> ".../SafeKit"
    text = re.sub(f"({S}P\\d+{S}) +-(?=\\w)", r"\1-", text)
    def dedup(m):   # first word of a protected name repeated just before it: "SQL SQL Server" -> "SQL Server"
        tok = re.sub(r"<[^>]+>", "", st[int(m.group(3))]).strip()
        if tok == m.group(1) or (" " in tok and tok.split(" ")[0] == m.group(1)) or tok.startswith(m.group(1) + "-"):   # "Hyper Hyper-V"
            return m.group(2)   # also "SafeKit SafeKit" -> "SafeKit"
        return m.group(0)
    # (with or without bold in between: "ADB <b>ADB SafeGate</b>")
    text = re.sub(f"(?<![\\w-])([A-Za-z][\\w-]*)\\s+((?:<b>\\s*)?{S}P(\\d+){S})", dedup, text)
    text = re.sub(r"<b>\s*([。，、；：！？.,;:!?]+)\s*", r"\1<b>", text)
    # source "**imposed term**": if Google extends the bold to the sentence, it is reduced to the term alone
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
            label = re.sub(r"\s*[.。]$", "", label)   # period added by Google at the end of a link
        if title is not None:
            t = ctx.title_tr.get(int(m.group(1)), title).replace('"', "”")
            dest = f'{dest} "{t}"'
        return f"{bang}[{label}]({dest})"
    text = re.sub(r'<a id="(\d+)">(.*?)</a>', link, text)
    text = html.unescape(text)
    # period lost by Google after `code` at the end of a sentence: "`start_prim` Ces commandes"
    def code_dot(m):
        tok = st[int(m.group(1))]
        return f"{S}P{m.group(1)}{S}." if tok.startswith("`") else m.group(0)
    # period lost after a `code` that ended a sentence in the source
    stop = "。" if CJK else "."
    def src_dot(m):
        n = int(m.group(1))
        if n not in ctx.dot_after:
            return m.group(0)
        # outside Chinese/Japanese: only if the sentence really ends there
        # (end of text or capital letter after) — not "Gibt `HTTP 200 OK` zurück."
        rest = text[m.end():]
        if not CJK and not re.match(r"\s*$|\s+[A-ZÀ-ÖØ-Þ]", rest):
            return m.group(0)
        if CJK and re.match(r"\s*[のをにはがでとへもや的和是在与及或、後前后之时時中上下]", rest):
            return m.group(0)
        return f"{S}P{n}{S}{stop}"
    text = re.sub(f"{S}P(\\d+){S}(?!\\s*[{S}.。，,;；:：!！?？)）\\]*])", src_dot, text)
    if CJK:
        tok = f"{S}P\\d+{S}"
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)                 # space before 。，
        text = re.sub(r"([（「『【])\s+", r"\1", text)                      # （ x -> （x
        text = re.sub(r"([，。、；！？])[ ]+(?![*\s])", r"\1", text)           # 例如， Floating -> 例如，Floating
        # space between Chinese/Japanese and Latin, digits, `code`, protected terms
        def vis(n, end):   # first / last visible character of a protected token
            if st[n].startswith(("{{", "`")):
                return "a"   # `.safe`: code = Latin -> space with Chinese/Japanese   # {{ .Get "app" }} = Latin product name -> space with Chinese/Japanese
            v = re.sub(r"<[^>]+>", "", st[n]).strip("`") or "a"
            if re.match("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2300-\u23FF\u2600-\u27BF\u2B00-\u2BFF\u2139]", v):
                return "a"   # emoji: space with Chinese/Japanese, as in the source ("💡 要开始")
            return v[-1] if end else v[0]
        latin = lambda c: bool(re.match(r"[A-Za-z0-9`%]", c))
        # space between Chinese/Japanese and Latin, digits, `code`, protected terms
        # (no space if the token itself starts / ends with a CJK character: "farm 集群的")
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
            # capital letter only if the expression starts the sentence / cell
            at_start = not re.sub(r"[\s*\[(]", "", text[:m.start()])
            if at_start:   # never force lowercase ("ARP المجاني" must stay "ARP")
                tok = re.sub(r"^((?:<[^>]+>)*)(\w)", lambda x: x.group(1) + x.group(2).upper(), tok, count=1)
        return tok
    for _ in range(4):   # nested tokens (HTML tag containing {{ .Get }})
        if not re.search(f"{S}P\\d+{S}", text):
            break
        text = re.sub(f"{S}P(\\d+){S}", restore, text)
    text = re.sub(r"(<a\b[^>]*>)\s+", r"\1", text)      # "<a ...> text </a>" -> "<a ...>text</a>"
    text = re.sub(r"\s+(</a>)", r"\1", text)
    # "A/B" without spaces in the source (SAN/vSAN, BIS/BVMS, Kubernetes/K3s): never "SAN /vSAN" or "SAN/ vSAN"
    src_plain = re.sub(r"\]\([^)]*\)|https?://\S+|<[^>]+>", " ", getattr(ctx, "all_src", ""))
    for a, b in set(re.findall(r"(?<![\w/:.-])([A-Za-z0-9][\w.-]*)/([A-Za-z0-9][\w.-]*)(?![\w/])", src_plain)):
        text = re.sub(r"(?<![\w/-])(%s) *\/ *(%s)(?![\w/])" % (re.escape(a), re.escape(b)), r"\1/\2", text)
    if CJK:
        # two adjacent protected expressions ("SafeKit<span>シェアードナッシング</span>"): Latin/CJK space before the rules
        text = re.sub(f"(?<=[A-Za-z0-9])(?=[{CJK_CHAR}])", " ", text)
        # end of the expression repeated by Google ("シェアードナッシングナッシング", "…アーキテクチャナッシングアーキテクチャ")
        for n in ctx.terms:
            tr = re.sub(r"<[^>]+>", "", st[n]).strip() if isinstance(st[n], str) else ""
            for k in range(1, len(tr) - 2):
                text = text.replace(tr + tr[k:], tr)
    # link targets masked during grammar rules (a rule must never change a URL:
    # "](</nl/architectures/active-active-cluster-…/>)" became "actief-actief-cluster-…")
    _urls = []
    def _mask(m):   # only the path is masked: "](<…>)" stays visible for the rules that depend on it
        _urls.append(m.group(2)); return "%s\x00U%d\x00%s" % (m.group(1), len(_urls) - 1, m.group(3))
    text = re.sub(r"(\]\(<?)((?:/|https?:)[^<>()\s]*)(>?\))", _mask, text)   # not the "](#…)" anchors
    for pat, repl in GRAMMAR:   # agreement around imposed expressions (e.g. "une cluster" -> "un cluster")
        text = re.sub(pat, repl, text)
    text = re.sub(r"\x00U(\d+)\x00", lambda m: _urls[int(m.group(1))], text)
    for wrong, right in GLOSSARY.get("_rep", {}).items():  # glossary fixes
        if ctx.apos:
            wrong, right = wrong.replace("'", "’"), right.replace("'", "’")
        text = text.replace(wrong, right)
    # cleanup of spaces added around bold / parentheses
    text = re.sub(r"\*\*([^*\n]+?)([,;])\*\*", r"**\1**\2", text)   # "**Load-Balancing,**" -> "**Load-Balancing**,"
    text = re.sub(r"\*\* +([,.;)\]])", r"**\1", text)
    text = re.sub(r"([(\[]) +\*\*", r"\1**", text)
    text = re.sub(r"\( +", "(", text)
    text = re.sub(r" +\)", ")", text)
    text = re.sub(r"\s+(\\\))", r"\1", text)   # tooltip "\(mirror.safe \)" -> "\(mirror.safe\)"
    text = re.sub(r"(\\\()\s+", r"\1", text)
    text = re.sub(r" +([,.](?:\s|$|\]))", r"\1", text)   # also "cluster mirror .](" (image text)
    text = re.sub(r"([A-Za-zÀ-ÿ][’'])\s+(\*\*|\[)", r"\1\2", text)   # l' **adresse -> l'**adresse
    if ctx.apos:   # elision followed by a space around an imposed expression: "l’ architecture" -> "l’architecture"
        text = re.sub(r"(?<![\w’'])([lLdDjJmMnNsStTcC]|[Qq]u|[Uu]n|[Dd]ell|[Nn]ell|[Aa]ll|[Ss]ull|[Dd]all|[Qq]uell|[Ll]orsqu|[Pp]uisqu)([’'])\s+(?=[A-Za-zÀ-ÿ])", r"\1\2", text)
    text = re.sub(r"\*\*([;:!?])", r"** \1", text) if (ctx.apos and FRSP) else text  # space before ; : ! ? (fr only)
    if CJK:
        text = re.sub(f"\\s+([{CJK_PUNCT}])", r"\1", text)
        text = re.sub(r"([，。、；：！？])[ ]+(?=[`A-Za-z0-9<\[])", r"\1", text)   # 崩溃， `stop_prim`
        text = re.sub(r"(?<=[A-Za-z0-9])/ +(?=[A-Za-z])", "/", text)           # / Direct -> /Direct
        # bold extended by Google to the next sentence: "**虚拟 IP。SafeKit**" -> "**虚拟 IP**。SafeKit"
        text = cjk_bold_pairs(text)
        text = cjk_bold(text)
        text = re.sub(r"→\*\*", "→ **", text)
        text = re.sub(f"([{CJK_CHAR}]) +(?=[{CJK_CHAR}])", r"\1", text)
        text = re.sub(f"([{CJK_CHAR}]):\\s*(?=\\S)", r"\1：", text)   # "アーキテクチャ: 共有" -> "アーキテクチャ：共有"   # "管理することで ネットワーク"
        # source spacing around links: "🎬 [text](url) (2:00)"
        text = re.sub(r"([^\w\s%s%s\[(（*!])\[" % (CJK_CHAR, CJK_PUNCT), r"\1 [", text)   # 🎬[ -> 🎬 [ (never "![image]")
        text = re.sub(r"(\]\([^)\s]*\))(?=[(（]\d)", r"\1 ", text)                  # ](url)(2:00) -> ](url) (2:00)
        # durations / numbers in parentheses: half-width as in the source — "（9:43）" -> " (9:43)"
        text = re.sub(r"\s*（(\d[\d:.,]*)）", r" (\1)", text)
        text = re.sub(r"([，。、；：！？])[ ]+(?=[%s])" % CJK_CHAR, r"\1", text)          # ： 免费 -> ：免费
        # states: full-width parentheses, no spaces — never inside a link URL
        parts = re.split(r"(\]\(<[^>]*>\)|\]\([^)\s]*\))", text)
        text = "".join(p if i % 2 else re.sub(r"\s*[（(](Ready|NotReady)[)）]\s*", r"（\1）", p) for i, p in enumerate(parts))
    text = re.sub(r"  +", " ", text)
    text = re.sub(r'(<span[^>]*translate="no"[^>]*>)\s+(?=\[)', r"\1", text)   # "<span notranslate> [farm](...)" -> without space
    text = re.sub(r"\((Windows|Linux)\) \*", r"(\1)*", text)   # "mirror.safe (Linux) *" -> "(Linux)*"
    text = re.sub(r"(?<!\.)\.\.(?!\.)", ".", text)   # ".." -> "." (not "...")
    # invalid Markdown bold: space before the closing ** ("ALSTEF **,") or after the opening ** ("** les")
    text = re.sub(r"(^|\s)\*\* +(?=\S)", r"\1**", text)
    text = re.sub(r"(\S) +\*\*(?=[\s,.;:!?)\]。，、；：！？]|$)", r"\1**", text)
    if NATIVE:
        text = native_terms(text, ctx)
    if CJK:   # doubled katakana word ("シェアードナッシングナッシング", "リモートサイトサイト") -> only once
        text = re.sub(r"(?!アクティブアクティブ)([\u30a1-\u30fc]{3,})\1", r"\1", text)   # also "ナッシングナッシングクラスタリング"
    if CJK:   # after restoration: two adjacent protected terms ("Siveillance虚拟机级 HA架构")
        text = re.sub(f"([A-Za-z0-9])(?=[{CJK_CHAR}])", r"\1 ", text)
        text = re.sub(f"([{CJK_CHAR}])(?=[A-Za-z0-9])", r"\1 ", text)
    if CJK:   # bold extended by Google over several sentences ("**これにより…。…は クライアントの IP アドレス**"): the end is kept
        def shrink(m):
            body = m.group(1)
            if not re.search("[。！？](?=.)", body):
                return m.group(0)
            cut = max(body.rfind(c) for c in "。！？、，")
            head, tail = body[:cut + 1], body[cut + 1:]
            k = tail.rfind("は")   # Japanese: subject "ロードバランサーは" outside the bold
            if 0 <= k < len(tail) - 2:
                head, tail = head + tail[:k + 1], tail[k + 1:]
            p = max((tail.rfind(w) + len(w), w) for w in ("根据", "基于", "按照", "通过"))[0]   # Chinese: "负载均衡器会根据" outside the bold
            if 2 < p < len(tail) - 2:
                head, tail = head + tail[:p], tail[p:]
            return f"{head}**{tail.strip()}**" if tail.strip() else m.group(0)
        text = re.sub(r"\*\*([^*\n]+?)\*\*", shrink, text)
    # opening quote left outside the bold: '" **Text"**' -> '**"Text"**'
    text = re.sub(r'(["“«„「])\s*\*\*([^*\n]+?)(["”»“」])\*\*', r"**\1\2\3**", text)
    # quotes added by Google straddling the bold: '**"shared disk** "' -> '**"shared disk"**'
    text = re.sub(r'\*\*(["“«„])([^*\n"“”»]+?)\*\*\s?(["”»“])(?=\s|$|[,.;:])', r"**\1\2\3**", text)
    # em dash swallowed by the closing bold: "**con disco compartido—** difieren" -> "**con disco compartido** — difieren"
    text = re.sub(r"(?<=[^\s*])\s*([—–])\*\*(?=\s)", r"** \1", text)
    # bullet attached to the text ("•应用级 HA") or replaced by the Japanese middle dot ("<br> ・高可用性")
    text = re.sub(r"(^|\s)・(?=\S)", r"\1• ", text)
    text = re.sub(r"•(?=[^\s•])", "• ", text)
    # Spanish question/exclamation mark outside the link: "• ¿ [Qué son…]" -> "• [¿Qué son…]"
    text = re.sub(r"([¿¡])\s*\[", r"[\1", text)
    if not CJK:   # lowercase bullet after an imposed expression ("• clustering matériel complexe", "• [heartbeat, …](…)") -> capital letter
        text = re.sub(r"(•\s+\[?[¿¡]?)([a-zà-ÿ])", lambda m: m.group(1) + m.group(2).upper(), text)
    # opening parenthesis lost around a protected acronym in a link text: "[복구 시간 목표 RTO) 약 1분]" -> "[복구 시간 목표(RTO) 약 1분]"
    text = re.sub(r"(\[[^\]()]*?)\s+([A-Z][A-Z0-9/]{1,})\)(?=[^\]()]*\])", lambda m: m.group(1) + ("" if re.search(f"[\uac00-\ud7a3{CJK_CHAR}]$", m.group(1)) else " ") + "(" + m.group(2) + ")", text)
    # stray spaces between straight/Chinese/German quotes and `code` or **bold**: '" `stop` "' -> '"`stop`"' (not « » in French)
    text = re.sub(r'(["“„「])[ \t]+(`[^`\n]+`|\*\*[^*\n]+\*\*)[ \t]*(["”“」])', r"\1\2\3", text)
    text = re.sub(r'(["“„「])[ \t]*(`[^`\n]+`|\*\*[^*\n]+\*\*)[ \t]+(["”“」])', r"\1\2\3", text)
    # comma swallowed into the link text: "([synchron,](url) um" -> "([synchron](url), um"
    text = re.sub(r"(?<!!)\[([^\[\]]*?)\s*,\s*\]\((<[^>]*>|[^)\s]+)\)", r"[\1](\2),", text)
    text = re.sub(r"<code>\s+", "<code>", text)
    text = re.sub(r"\s+</code>", "</code>", text)
    return text.strip()

def native_terms(text, ctx):
    """ja/zh/ko, after restoring imposed expressions:
    - duplicate: "ネットワークネットワーク負荷分散" -> "ネットワーク負荷分散"
    - extended bold: "**SafeKit は…負荷分散**" -> "SafeKit は…**負荷分散**" (if the source had only the term in bold)
    - object particle lost before a verb: "**負荷分散**簡素化し" -> "**負荷分散**を簡素化し"; "분산** 간소화하고" -> "분산**을 간소화하고"
    """
    for n in ctx.terms:
        tr = re.sub(r"<[^>]+>", "", ctx.store[n]).strip()
        if len(tr) < 3:
            continue
        last = re.split(r"\s+", tr)[-1]
        if len(last) >= 2 and last != tr:   # last word repeated: "mirror クラスタークラスター" -> "mirror クラスター"
            text = re.sub("(" + re.escape(tr) + r"(?:\*\*)?)\s*" + re.escape(last), r"\1", text, flags=re.I)   # also "クラスター**クラスター"
        kat = re.search(r"[\u30a0-\u30ff]{3,}$|[가-힣]{2,}$|[\u4e00-\u9fff]{2}$", tr)   # "高可用性クラスタークラスター" -> "高可用性クラスター"
        if kat and kat.group(0) != tr:
            text = re.sub("(" + re.escape(tr) + r"(?:\*\*)?)\s*" + re.escape(kat.group(0)), r"\1", text)
        for k in range(len(tr) - 1, 1, -1):   # prefix of the term repeated just before it
            text = text.replace(tr[:k] + tr, tr)
            text = text.replace(tr[:k] + "**" + tr, "**" + tr)
        if n in ctx.bold_terms:
            esc = re.escape(tr)
            text = re.sub(r"\*\*([^*\n]*?)%s([^*\n]*?)\*\*" % esc,
                          lambda m: m.group(1) + f"**{tr}**" + m.group(2) if (m.group(1).strip() or m.group(2).strip()) else m.group(0), text)
        esc = re.escape(tr)
        # Japanese: noun + する verb without particle
        text = re.sub(r"(%s(?:\*\*)?)(?=[\u4e00-\u9fff]{2,}(?:し|する|します|され|させ))" % esc, r"\1を", text) if re.search("[\u3040-\u30ff]", text) else text
        # Korean: noun + 하다 verb without particle
        if re.match("[\uac00-\ud7a3]", tr[-1]):
            obj = "을" if (ord(tr[-1]) - 0xAC00) % 28 else "를"
            text = re.sub(r"(%s(?:\*\*)?)(?= (?!작동|동작|실행되|발생)[\uac00-\ud7a3]+(?:하고|하여|합니다|하는|한다|해서|하며|하기))" % esc, r"\1" + obj, text)
    return text

def _kind(c):
    """'s' space/start, 'p' punctuation, 'c' CJK character, 'l' Latin/digit"""
    if not c or c.isspace():
        return "s"
    if unicodedata.category(c)[0] in "PS":
        return "p"
    return "c" if re.match(f"[{CJK_CHAR}]", c) else "l"

def cjk_bold(text):
    """Spaces around **bold** in Chinese/Japanese: none between CJK characters,
    one space next to Latin text, and a space only where Markdown needs one
    (e.g. '**主节点（PRIM）：** 返回' otherwise the bold is not rendered)."""
    parts = text.split("**")
    if len(parts) < 3 or len(parts) % 2 == 0:
        return text
    for k in range(1, len(parts), 2):
        # sentence punctuation at the start or end of bold: "透明 **。它…**" -> "透明。**它…**"
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
    """/xxx/ -> /<lang>/xxx/ (same URL name in all languages).
    Absolute links to the site (https://<host>/xxx/) are handled the same way.
    Pages not yet translated are reported (the link is localized anyway)."""
    root = next((p for p in Path(target).resolve().parents if p.name == "content"), None)
    langs = set(LANGS) | {lang}
    if root is not None:  # language folders present in content/ (ar, de, ..., zh-hans)
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

# language suffix = a site code only ("insert-vm-vs-app-ha-en": "ha" is not a language)
SHORTCODE = re.compile(r"(\{\{[<%%]%%?\s*/?\s*)([\w-]+)-(%s)(?=[\s%%>\"])" % "|".join(
    sorted(["ar", "de", "en", "es", "fr", "it", "ja", "ko", "nl", "pt-br", "pt-pt", "zh-hans"], key=len, reverse=True)), re.I)

def make_shortcode_fixer(target, src, lang, missing):
    """insert-xxx-en -> insert-xxx-<lang> if layouts/shortcodes/insert-xxx-<lang>.* exists."""
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
    """Automatic Hugo anchor (GitHub style) computed from the English heading."""
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
                    help="llm (default) = Translation LLM, more recent; nmt = classic model, cheaper")
    ap.add_argument("--project", default=os.environ.get("GOOGLE_CLOUD_PROJECT"))
    ap.add_argument("--region", default="us-central1")
    a = ap.parse_args()
    if a.model == "llm" and not a.project and not a.dry_run:
        sys.exit("Environment variable GOOGLE_CLOUD_PROJECT is missing (or use --project).")
    print(f"translate_md.py version {VERSION}")
    lang = (a.lang or a.to).lower()
    # Hugo codes -> Google codes
    a.to = {"zh-hans": "zh-CN", "zh-hant": "zh-TW", "pt-br": "pt-BR", "pt-pt": "pt-PT"}.get(a.to.lower(), a.to)
    key = os.environ.get("GOOGLE_TRANSLATE_API_KEY")
    if not key and not a.dry_run:
        sys.exit("Environment variable GOOGLE_TRANSLATE_API_KEY is missing.")
    global APOS, FRSP
    global CJK, NATIVE
    NATIVE = lang.split("-")[0] in ("zh", "ja", "ko")
    APOS = lang.split("-")[0] in ("fr", "it", "pt")
    FRSP = lang.split("-")[0] == "fr"
    CJK = lang.split("-")[0] in ("zh", "ja")
    load_glossary(a.glossary, lang)
    raw = open(a.source, encoding="utf-8", newline="").read()
    eol = "\r\n" if "\r\n" in raw else "\n"          # original line endings (Windows CRLF kept)
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
    # Markdown table rows (header + ---|--- separator + following rows up to an empty line):
    # a 2-column row has only one "|" ("Field | Answer") -> otherwise translated as a sentence
    # and Google removes the "|" ("Volumen de datos recomendado: unos pocos terabytes")
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
                    # "A, B, C" list of titles: one title per line for Google (otherwise it merges
                    # or loses items: "SafeKit SafeKit クラスター…"), then joined again
                    ctx.list_sep = "、" if CJK else ("، " if lang.startswith("ar") else ", ")
                    val = "<br>".join(x.strip() for x in val.split(", "))
                jobs.append((i, m.group(1) + m.group(2), encode(val, ctx), m.group(2), ctx))
            continue
        if i <= fm_end:
            continue
        s = line.strip()
        if s.startswith(("```", "~~~")):
            in_code = not in_code; continue
        # indented code block (command in a list: 8 spaces or tab): never translated
        if re.match(r"^(?: {8,}|\t)\S", line) and not re.match(r"^\s*(?:[*+-]|\d+\.)\s", line):
            continue
        # code block indented by 4 spaces outside a list, preceded by an empty line (e.g. "    /var/lib/libvirt/...")
        if re.match(r"^ {4}\S", line) and not re.match(r"^\s*(?:[*+-]|\d+\.)\s", line) and i > 0 and not lines[i - 1].strip() \
                and not any(re.match(r"^\s*(?:[*+-]|\d+\.)\s", lines[j]) for j in range(max(0, i - 6), i)):
            continue
        if not in_code:
            line = lines[i] = sc_fix(line)
            # shortcode parameters pointing to a site page: destination="/confirmation-safekit/" -> "/fr/confirmation-safekit/"
            line = lines[i] = re.sub(r'(\{\{[<%][^\n]*?\b\w+=")(/[\w\-/]*/(?:#[\w\-]+)?)(")',
                                     lambda x: x.group(1) + link_fix(x.group(2)) + x.group(3), line)
            # shortcode parameters imposed per language (glossary "shortcode_params"):
            # preferredLanguage="English US" -> "French", "ZH-HANS"...
            for pname, values in GLOSSARY.get("shortcode_params", {}).items():
                if lang in values:
                    line = lines[i] = re.sub(r'(\{\{[<%%][^\n]*?\b%s=")[^"]*(")' % re.escape(pname),
                                             lambda x, v=values[lang]: x.group(1) + v + x.group(2), line)
            # shortcode parameter values displayed as is (glossary "shortcode_values"):
            # app="Windows or Linux" -> app="Windows ou Linux"
            for pval, values in GLOSSARY.get("shortcode_values", {}).items():
                if lang in values:
                    line = lines[i] = re.sub(r'(\{\{[<%%][^\n]*?\b\w+=")%s(")' % re.escape(pval),
                                             lambda x, v=values[lang]: x.group(1) + v + x.group(2), line)
            s = line.strip()
        if in_code or not s or (re.fullmatch(r"\|?[\s:|-]+\|?", s) and "-" in s):
            continue
        if s.startswith("{{") and not re.sub(r"\s", "", "".join(
                s[p:q] for p, q in zip([0] + [b for _, b in go_templates(s)], [a for a, _ in go_templates(s)] + [len(s)]))):
            continue   # line made only of Go Template expressions / shortcodes
        if "|" in s and (s.startswith("|") or s.count("|") >= 2 or i in table_lines):
            # the whole table row is sent in a single request (full context);
            # cells are separated by <td> tags that Google keeps
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
            # the anchor is never sent to Google: it is put back at the end of the heading
            am = re.match(r"^(.*?)\s*((?:\{[#.][^}]*\}\s*)+)$", h.group(2))
            title, anchor = (am.group(1), " " + am.group(2).strip()) if am else (h.group(2), "")
            if "{#" not in anchor:   # heading without explicit anchor: the English anchor is frozen
                anchor = f" {{#{anchorize(title)}}}" + anchor
            if title.strip():
                ctx = Ctx(link_fix)
                jobs.append((i, h.group(1), encode(title, ctx), anchor, ctx))
            continue
        m = PREFIX.match(line)
        if m.group(2).strip():
            ctx = Ctx(link_fix)
            body = m.group(2)
            trail = body[len(body.rstrip()):]   # "  " at end of line = Markdown line break, to keep
            lead = m.group(1)
            # raw HTML "<p><strong>text</strong></p>": opening / closing tags stay outside
            # the request (otherwise Google sees "0text1" and may lose words: "感谢您联系我们" -> "您联系我们")
            # (opening tag may contain {{ .Get "guide" }}; text may contain ">": "… {{ .Get "app" }} >")
            hm = re.match(r"^((?:<[a-zA-Z](?:[^<>{]|\{\{[^}]*\}\})*>\s*)+)((?:[^<]|</?(?:code|b|strong|em|i)>)*?\S(?:[^<]|</?(?:code|b|strong|em|i)>)*?)((?:\s*</[a-zA-Z][^<>]*>)+)$", body.rstrip())
            if hm and re.search(r"\s>$", hm.group(2)):   # final "… >" arrow of the button: not translated (otherwise moved: "{{ app }} ></a> のための…")
                hm = type("M", (), {"group": lambda self, k, _g=(hm.group(0), hm.group(1), hm.group(2)[:-1].rstrip(), " >" + hm.group(3)): _g[k]})()
            if hm:
                lead += re.sub(r'(<a\b[^>]*?\bhref=")([^"]+)(")', lambda x: x.group(1) + link_fix(x.group(2)) + x.group(3), hm.group(1))
                trail = hm.group(3) + trail
                body = hm.group(2)
            jobs.append((i, lead, encode(body.rstrip(), ctx), trail, ctx))

    global MODEL
    if a.model == "llm":
        MODEL = f"projects/{a.project}/locations/{a.region}/models/general/translation-llm"
        print(f"Model: Translation LLM ({a.project}, {a.region})")
    else:
        print("Model: classic (NMT)")
    translate = (lambda texts: [MOCK(x) for x in texts]) if a.dry_run else (lambda texts: google(texts, a.src, a.to, key))
    raw_pairs = []   # text sent / raw Google response (diagnostics, see SAFEKIT_RAW_DIR)
    _translate = translate
    def translate(texts):
        res = _translate(texts)
        raw_pairs.extend(zip(texts, res))
        # protected expression moved by Google to another sentence, replacing a word that disappears
        # ("如果发生硬件或<span>Microsoft</span>故障": "软件" lost): the segment is retranslated sentence by sentence
        bad = [k for k, (t, r) in enumerate(zip(texts, res)) if displaced_marker(t, r)]
        if bad:
            print(f"{len(bad)} segment(s) retranslated sentence by sentence (protected expression moved by Google)")
            for k in bad:
                parts = split_sentences(texts[k])
                if len(parts) < 2:
                    continue
                tr = _translate(parts)
                raw_pairs.extend(zip(parts, tr))
                res[k] = ("" if CJK else " ").join(x.strip() for x in tr)
        return res
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
        else:  # Google merged or lost a cell: translate cell by cell
            for c, lead, e, trail in rc:
                retry.append(((i, c), lead, e, trail, ctx))
    if retry:
        print(f"{len(retry)} cell(s) retranslated one by one (row structure changed by Google)")
        jobs += retry
        out += translate([r[2] for r in retry])
    # link tooltips: translated separately, then reinjected at decoding
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
        # numbers often written out in words: "0 data loss", "2-node", "3rd", "layer 2", "Test 1"
        src_nums = re.sub(r"\b0\b|\b[1-9](?=-\w|st\b|nd\b|rd\b|th\b)|(?i:\b(?:layer|test)\s+)\d\b", " ", strip(enc))
        miss = [n for n in set(re.findall(r"\d+", src_nums)) if n not in re.findall(r"\d+", strip(t))]
        if CJK:  # "layer 2" -> "二层", "2-node" -> "双节点": not a loss
            cn = {"1": "一单", "2": "二两双", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九", "10": "十"}
            miss = [n for n in miss if not any(c in t for c in cn.get(n, "-"))]
        if CJK:
            # the source sentence ends with a period, the translation does not
            end_src = re.search(r"(?<!\.\.)[.!?]$", re.sub(r"<[^>]+>|\s", "", enc))
            end_out = re.search(r"[。！？.!?]$", re.sub(r"\*|\s", "", t))
            if end_src and not end_out:
                punct.append(idx[0] if isinstance(idx, tuple) else idx)
        if miss:
            numbers.append((idx[0] if isinstance(idx, tuple) else idx, miss))
        t = decode(t, ctx)
        if getattr(ctx, "list_sep", None):
            # no final period on a title of the list ("…SafeKit.، 🔍" / "…。、🔍")
            t = re.sub(r"[.。]\s*(?=<br\s*/?>)", "", t)
            t = re.sub(r"\s*<br\s*/?>\s*", ctx.list_sep, t)
        # no final period added when the source has none ("[Lire le guide](/x/)。")
        src_vis = re.sub(r"<[^>]+>", "", enc).strip()
        if src_vis and not re.search(r"[.!?。！？]$", src_vis):
            t = re.sub(r"(?<!\.)[.。](?=(?:\*\*)?\s*$)", "", t)   # also "**safekitinstall.**"
        elif re.search(r"</a>\s*$", enc) and re.search(r"\]\([^)]*\)[.。]\s*$", t):
            # image / link at end of line without period in the source ("![…errors.](x.jpg "w:512")"): no "." after ")"
            t = re.sub(r"(\))[.。](?=\s*$)", r"\1", t)
        # final source punctuation lost by Google (list item "[link](/x/)," or introductory sentence "… :")
        # source ending with "..." (e.g. `<Failover>...`): not a sentence-ending period
        end = src_vis[-1:] if src_vis and not re.search(r"(?:\.\.\.|…)`?$", src_vis) else ""
        if end == "." and re.search(r"</a>\s*$", enc):   # period INSIDE the link / image text, not after
            end = "#"   # (not "": "" in ",:." is True in Python -> comma added)
        if end in ",:." and not re.search(r"[,:;.!?、，：；،。！？…]\s*(?:\*\*)?\s*$", t) and t.strip():
            if end == ":":
                add = "：" if CJK else (" :" if lang == "fr" else ":")
            elif end == ".":
                add = "。" if CJK else "."
            else:
                add = "" if CJK or lang == "ko" else ("،" if lang == "ar" else ",")
            if add:
                t = re.sub(r"\s*$", "", t) + add + re.search(r"\s*$", t).group(0)
        if CJK:  # bold moved by Google: straddling two sentences or splitting a word
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
                # raw HTML without spaces between tags: "<p> <strong> text </strong> </p>" -> "<p><strong>text</strong></p>"
                t = re.sub(r"(<[a-zA-Z][^<>]*>)\s+", r"\1", t)
                t = re.sub(r"\s+(</[a-zA-Z]+>)", r"\1", t)
                t = re.sub(r"(</[a-zA-Z]+>)\s+(?=<)", r"\1", t)
            if before.lstrip().startswith("#") and not CJK:   # heading: initial capital letter
                t = re.sub(r"^((?:[*_\[(]|<[^>]+>)*)([a-zà-öø-ÿ])", lambda x: x.group(1) + x.group(2).upper(), t, count=1)
            if idx < fm_end and after in ('"', "'"):
                t = fm_quotes(t, after, lang)
            if "](" in t and not re.search(r"[\"“”«»„「」《》『』]", src_line):
                t = link_quotes(t)
            lines[idx] = before + t + after
    for row, cells in tables.items():
        lines[row] = "|".join(cells)
    # trace in the front matter (ignored by Hugo, useful to check which version translated)
    if fm_end > 0:
        sig = (f'translation: "translate_md {VERSION} | glossary {GLOSSARY.get("version", "?")} | '
               f'{"Translation LLM" if MODEL else "NMT"} | {len(TERMS)} expressions"')
        had = any(l.startswith("translation:") for l in lines[:fm_end])
        lines = [l for l in lines[:fm_end] if not l.startswith("translation:")] + [sig] + lines[fm_end:]
        shift = 0 if had else 1   # reported line numbers follow the written file
    elif lines and lines[0].lstrip().startswith("{{"):
        # shortcode template without front matter: trace in a Go comment (invisible on the site)
        sig = (f'{{{{/* translation: translate_md {VERSION} | glossary {GLOSSARY.get("version", "?")} | '
               f'{"Translation LLM" if MODEL else "NMT"} | {len(TERMS)} expressions */}}}}')
        had = lines[0].startswith("{{/* translation:")
        lines = [sig] + (lines[1:] if had else lines)
        shift = 0 if had else 1
    else:
        shift = 0
    Path(a.target).parent.mkdir(parents=True, exist_ok=True)
    open(a.target, "w", encoding="utf-8", newline="").write(eol.join(lines))
    raw_dir = os.environ.get("SAFEKIT_RAW_DIR")
    if raw_dir and raw_pairs:   # raw Google responses, next to the export (diagnostics of lost texts)
        try:
            Path(raw_dir).mkdir(parents=True, exist_ok=True)
            json.dump([{"in": i, "out": o} for i, o in raw_pairs],
                      open(Path(raw_dir) / f"{lang}.raw.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        except OSError:
            pass
    lost += row_lost
    n_cells = sum(1 for j in jobs if getattr(j[4], "row", False))
    print(f"{len(jobs) - n_cells + len(rows)} segments translated"
          f" (including {len(rows)} table rows) -> {a.target}")
    if lost:
        print(f"WARNING: {lost} protected element(s) lost by Google, to check.")
    if numbers:
        print("WARNING: number(s) lost in translation, lines to check:")
        for ln, miss in numbers:
            print(f"   line {ln + 1 + shift}: {', '.join(sorted(miss))}")
    empty = [n for n, l in enumerate(lines) if re.search(r"(?<!!)\[\s*\]\(", l)]
    if empty:
        print("WARNING: link with empty label [](...) (link text lost), lines:",
              ", ".join(str(n + 1) for n in empty))
    if bold:
        print("To check: bold (**) misplaced by Google, lines:",
              ", ".join(str(n + 1 + shift) for n in sorted(set(bold))))
    if punct:
        print("To check: sentence end (。) possibly lost, lines:",
              ", ".join(str(n + 1 + shift) for n in sorted(set(punct))))
    if sc_missing:
        print("Shortcodes left in source version (translated version not found):")
        for n in sorted(sc_missing):
            print("  ", n)
    if missing:
        print("Localized links to pages not yet translated (to create):")
        for p in sorted(missing):
            print("  ", p)

ALL_LANGS = ["ar", "de", "es", "fr", "it", "ja", "ko", "nl", "pt-br", "pt-pt", "zh-hans"]

def batch_targets(src):
    """Target paths of the 11 languages, derived from the English file (Hugo site rules)."""
    if src.parent.name == "shortcodes":
        if not re.search(r"-en$", src.stem):
            sys.exit(f"Source shortcode expected as -en.html: {src.name}")
        return {l: src.with_name(re.sub(r"-en$", f"-{l}", src.stem) + src.suffix) for l in ALL_LANGS}
    content = next((p for p in src.parents if p.name == "content"), None)
    if content is None:
        sys.exit(f"File outside content/ or layouts/shortcodes/: {src}")
    rel = src.relative_to(content)
    if rel.parts[0] in LANGS:
        sys.exit(f"The source must be the English page (content/{rel.as_posix()} is already a translation).")
    return {l: content / l / rel for l in ALL_LANGS}

def batch():
    """All-in-one mode: 11 languages + summary (copy only with --export)."""
    import shutil, subprocess
    ap = argparse.ArgumentParser(description="Translates an English file into the 11 site languages.")
    ap.add_argument("source")
    ap.add_argument("--langs", default=",".join(ALL_LANGS))
    ap.add_argument("--export", default=None, help="folder where en.* and <lang>.* are copied (no copy by default)")
    a, extra = ap.parse_known_args()
    src = Path(a.source).resolve()
    if not src.exists():
        sys.exit(f"File not found: {src}")
    targets = batch_targets(src)
    langs = [l.strip() for l in a.langs.split(",") if l.strip()]
    print(f"translate_md.py version {VERSION} - {src.name} -> {len(langs)} language(s)")
    summary = []
    for lang in langs:
        tgt = targets[lang]
        cmd = [sys.executable, str(Path(__file__).resolve()), str(src), str(tgt), "--to", lang] + extra
        # subprocess output in UTF-8 (Windows cp1252 console) and unbuffered (visible progress)
        env = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONUNBUFFERED="1")
        if a.export:   # raw Google responses copied into the export (<lang>.raw.json)
            env["SAFEKIT_RAW_DIR"] = str(Path(a.export).resolve())
        idx = langs.index(lang) + 1
        for attempt in (1, 2, 3):
            print(f"[{idx}/{len(langs)}] {lang}: translating..." + (f" (attempt {attempt})" if attempt > 1 else ""), flush=True)
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
                                 encoding="utf-8", errors="replace", env=env)
            lines = []
            for line in p.stdout:   # live display: rate limit, retries...
                line = line.rstrip("\n")
                lines.append(line)
                if line.startswith(("Google rate limit", "Google quota", "Traceback", "WARNING")) or "Error" in line:
                    print(f"      {line}", flush=True)
            p.wait()
            if p.returncode == 0:
                break
            quota = any("Google quota" in x or "RateLimit" in x for x in lines)
            wait = 120 if quota else 30
            print(f"[{lang}] failed (attempt {attempt}/3): {(lines[-1] if lines else '').strip()[:200]}", flush=True)
            if attempt < 3:
                print(f"      retrying {lang} in {wait} s", flush=True)
                time.sleep(wait)
        r = subprocess.CompletedProcess(cmd, p.returncode, "\n".join(lines), "")
        out = r.stdout.splitlines()
        seg = next((x for x in out if "segments translated" in x), "FAILED")
        warn, keep = [], False
        for x in out:
            if x.startswith(("WARNING", "To check", "Shortcodes left", "Localized links")):
                keep = True; warn.append(x.strip())
            elif keep and x.startswith("   "):
                warn.append("  " + x.strip())
            else:
                keep = False
        summary.append((lang, r.returncode == 0, re.sub(r" ->.*", "", seg), warn))
        print(f"      {lang} : {re.sub(r' ->.*', '', seg)}" + (f" - {len(warn)} warning(s)" if warn else ""), flush=True)
    if a.export:
        exp = Path(a.export)
        exp.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, exp / f"en{src.suffix}")
        for lang, ok, _, _ in summary:
            if ok and targets[lang].exists():
                shutil.copyfile(targets[lang], exp / f"{lang}{src.suffix}")
        print(f"Copied to {exp}: en{src.suffix} + {sum(1 for s in summary if s[1])} translation(s)")
    gpath = Path(__file__).with_name("glossary.json")
    gver = json.load(open(gpath, encoding="utf-8")).get("version", "?") if gpath.exists() else "not found"
    rep = ["===== RESUME =====",
           f"File: {src.name}  ({time.strftime('%Y-%m-%d %H:%M')})",
           f"Script {VERSION} | glossary {gver}"]
    for lang, ok, seg, warn in summary:
        rep.append(f"{lang:8} {'OK    ' if ok else 'FAILED'} {seg}")
        rep += [f"         {w}" for w in warn]
    print("\n" + "\n".join(rep))
    if a.export:   # the summary goes with the copied files (readable for review)
        (Path(a.export) / "RESUME.txt").write_text("\n".join(rep) + "\n", encoding="utf-8")
        print(f"Summary copied to {Path(a.export) / 'RESUME.txt'}")
    if not all(s[1] for s in summary):
        sys.exit(1)

if __name__ == "__main__":
    for stream in (sys.stdout, sys.stderr):   # Windows console: never crash on an unprintable character
        try:
            stream.reconfigure(errors="replace", line_buffering=True)
        except Exception:
            pass
    if "--to" not in sys.argv:   # without --to: the 11 languages
        batch()
    else:
        main()
