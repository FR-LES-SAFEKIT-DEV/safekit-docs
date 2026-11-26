"""Apply the meta descriptions listed in descriptions-update.md to the Hugo pages.

Usage (from the repository root):
    python scripts/apply_descriptions.py descriptions-update.md          # dry run
    python scripts/apply_descriptions.py descriptions-update.md --write  # apply

For each page section "### <path>" and each line "- <lang>: <description>":
  en  -> content/<path>
  xx  -> content/<xx>/<path>
Only the "description:" line of the front matter is replaced (inserted after
"title:" if missing). Line endings (CRLF/LF) and every other line are kept.
"""
import re, sys, pathlib

LANGS = {"en", "fr", "de", "es", "it", "nl", "pt-br", "pt-pt", "ja", "ko", "zh-hans", "ar"}

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

def update(path, desc, write):
    raw = path.read_bytes().decode("utf-8")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.split(nl)
    if not lines or lines[0].strip() != "---":
        return "no front matter"
    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        return "front matter not closed"
    new = f'description: "{desc}"'
    idx = next((i for i in range(1, end) if re.match(r"^description\s*:", lines[i])), None)
    if idx is None:
        t = next((i for i in range(1, end) if re.match(r"^title\s*:", lines[i])), 0)
        lines.insert(t + 1, new); status = "inserted"
    elif lines[idx] == new:
        return "unchanged"
    else:
        lines[idx] = new; status = "updated"
    if write:
        path.write_bytes(nl.join(lines).encode("utf-8"))
    return status

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    write = "--write" in sys.argv
    data = parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    root = pathlib.Path("content")
    stats, missing = {}, []
    for page, per_lang in data.items():
        for lang, desc in per_lang.items():
            assert lang in LANGS and '"' not in desc and "\\" not in desc, (page, lang)
            f = root / page if lang == "en" else root / lang / page
            if not f.exists():
                missing.append(str(f)); continue
            s = update(f, desc, write)
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
