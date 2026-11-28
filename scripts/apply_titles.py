"""Apply the page titles (H1) listed in titles-update.md to the Hugo pages.

Usage (from the repository root):
    python scripts/apply_titles.py titles-update.md --dry-run  # preview only
    python scripts/apply_titles.py titles-update.md            # apply (default)

For each page section "### <path>" and each line "- <lang>: <title>":
  en  -> content/<path>
  xx  -> content/<xx>/<path>
Two things change in each file, nothing else:
  1. the "title:" line of the front matter  -> title: "<title>"
  2. the first Markdown H1 of the body ("# ...") outside code blocks: its text is
     replaced and its {#anchor} is regenerated from the new ENGLISH title, the
     same anchor in every language (Hugo "github" style: lower case, HTML tags
     and punctuation removed, each space -> "-"). An H1 without anchor gets one.
     If the old H1 wrapped the word farm/mirror in a <span class="notranslate ...">
     tag, the same tag is put around that word in the new H1.
Pages without a Markdown H1 only get the title line. Line endings are kept.
"""
import re, sys, pathlib

LANGS = {"en", "fr", "de", "es", "it", "nl", "pt-br", "pt-pt", "ja", "ko", "zh-hans", "ar"}
SPAN = re.compile(r'<span class="notranslate (\w+)-term" translate="no">([^<]*)</span>')

def parse(md):
    data, page = {}, None
    for line in md.splitlines():
        m = re.match(r"^### (\S+\.md)\s*$", line)
        if m:
            page = m.group(1); data[page] = {}; continue
        m = re.match(r"^- (en|fr|de|es|it|nl|pt-br|pt-pt|ja|ko|zh-hans|ar): (.+?)\s*$", line)
        if m and page:
            data[page][m.group(1)] = m.group(2)
    return data

def wrap_terms(old_h1, new_text):
    for kind, word in SPAN.findall(old_h1):
        pat = re.compile(r"(?<![\w-])(" + re.escape(word) + r")(?![\w.-])", re.I)
        tag = f'<span class="notranslate {kind}-term" translate="no">' + r"\1" + "</span>"
        new_text = pat.sub(tag, new_text, count=1)
    return new_text

def update(path, title, anc, write):
    raw = path.read_bytes().decode("utf-8")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.split(nl)
    if not lines or lines[0].strip() != "---":
        return ["no front matter"]
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        return ["front matter not closed"]
    res = []
    new_t = f'title: "{title}"'
    idx = next((i for i in range(1, end) if re.match(r"^title\s*:", lines[i])), None)
    if idx is None:
        lines.insert(1, new_t); end += 1; res.append("title inserted")
    elif lines[idx] == new_t:
        res.append("title unchanged")
    else:
        lines[idx] = new_t; res.append("title updated")
    fence = False
    for i in range(end + 1, len(lines)):
        s = lines[i]
        if re.match(r"^\s*(```|~~~)", s):
            fence = not fence; continue
        if fence:
            continue
        m = re.match(r"^# (.+?)(\s*\{#[^}]*\})?\s*$", s)
        if m:
            new_h = "# " + wrap_terms(m.group(1), title) + " {#" + anc + "}"
            if new_h == s:
                res.append("h1 unchanged")
            else:
                lines[i] = new_h; res.append("h1 updated")
            break
    else:
        res.append("no h1")
    if write and any(r.endswith(("updated", "inserted")) for r in res):
        path.write_bytes(nl.join(lines).encode("utf-8"))
    return res

def anchor(en_title):
    t = re.sub(r"<[^>]+>", "", en_title).lower()
    t = re.sub(r"[^\w\- ]", "", t)
    return t.replace(" ", "-")

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    write = "--dry-run" not in sys.argv
    data = parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    root = pathlib.Path("content")
    stats, missing = {}, []
    for page, per_lang in data.items():
        assert "en" in per_lang, (page, "no en title")
        anc = anchor(per_lang["en"])
        for lang, title in per_lang.items():
            assert lang in LANGS and '"' not in title and "\\" not in title, (page, lang)
            f = root / page if lang == "en" else root / lang / page
            if not f.exists():
                missing.append(str(f)); continue
            for s in update(f, title, anc, write):
                stats[s] = stats.get(s, 0) + 1
    print(("APPLIED" if write else "DRY RUN") + f": {len(data)} pages")
    for k, v in sorted(stats.items()):
        print(f"  {k}: {v}")
    if missing:
        print(f"  missing files: {len(missing)}")
        for m in missing:
            print("    " + m)

if __name__ == "__main__":
    main()
