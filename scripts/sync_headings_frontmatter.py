"""Synchronize Markdown H1/H2 headings with title/topics front matter.

Usage (from the repository root):
    python scripts/sync_headings_frontmatter.py                  # apply
    python scripts/sync_headings_frontmatter.py --dry-run        # simulate

The first H1 becomes title. All H2 headings become the comma-separated topics
string used by the site's front matter. Pages without an H1 keep their title.
"""
import argparse
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
FRONT_MATTER_FIELD = re.compile(r"^(title|topics)\s*:")
HEADING = re.compile(r"^[ \t]{0,3}(#{1,6})(?:[ \t]+|$)(.*?)\s*$")
FENCE = re.compile(r"^[ \t]{0,3}(`{3,}|~{3,})")


def yaml_string(value):
    return json.dumps(value, ensure_ascii=False)


def clean_heading(value):
    value = re.sub(r"\s*\{#[^}]+\}\s*$", "", value)
    value = re.sub(r"\s+#+\s*$", "", value)
    value = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", value)
    value = re.sub(r"`+([^`]+)`+", r"\1", value)
    value = re.sub(r"(?<!\\)(?:\*\*|__|~~|\*|_)", "", value)
    value = re.sub(r"<[^>]*>", "", value)
    return html.unescape(value).strip()


def extract_headings(lines):
    headings = {1: [], 2: []}
    fence_char = None
    fence_size = 0

    for line in lines:
        fence = FENCE.match(line)
        if fence:
            marker = fence.group(1)
            if fence_char is None:
                fence_char, fence_size = marker[0], len(marker)
            elif marker[0] == fence_char and len(marker) >= fence_size:
                fence_char, fence_size = None, 0
            continue
        if fence_char is not None:
            continue

        match = HEADING.match(line)
        if match and len(match.group(1)) in headings:
            text = clean_heading(match.group(2))
            if text:
                headings[len(match.group(1))].append(text)

    return headings


def update_file(path, write):
    raw = path.read_bytes().decode("utf-8")
    has_bom = raw.startswith("\ufeff")
    text = raw[1:] if has_bom else raw
    newline = "\r\n" if "\r\n" in text else "\n"
    lines = text.splitlines(keepends=True)

    def line_text(line):
        return line.rstrip("\r\n")

    if not lines or line_text(lines[0]).strip() != "---":
        return "no front matter", False, False

    end = next(
        (i for i in range(1, len(lines)) if line_text(lines[i]).strip() == "---"),
        None,
    )
    if end is None:
        return "unclosed front matter", False, False

    headings = extract_headings([line_text(line) for line in lines[end + 1 :]])
    title = headings[1][0] if headings[1] else None
    topics = ", ".join(headings[2])

    fields = {}
    for i in range(1, end):
        match = FRONT_MATTER_FIELD.match(line_text(lines[i]))
        if match and match.group(1) not in fields:
            fields[match.group(1)] = i

    replacements = {}
    if title is not None:
        replacements["title"] = f"title: {yaml_string(title)}"
    if headings[2]:
        replacements["topics"] = f"topics: {yaml_string(topics)}"

    changed = False
    updated = list(lines)
    insertions = []
    for field, value in replacements.items():
        if field in fields:
            index = fields[field]
            ending = "\r\n" if updated[index].endswith("\r\n") else (
                "\n" if updated[index].endswith("\n") else ""
            )
            if line_text(updated[index]) != value:
                updated[index] = value + ending
                changed = True
        else:
            insertions.append(value)
            changed = True

    if insertions:
        insert_at = fields.get("title", end - 1) + 1
        updated[insert_at:insert_at] = [value + newline for value in insertions]

    if changed and write:
        output = "".join(updated)
        if has_bom:
            output = "\ufeff" + output
        path.write_bytes(output.encode("utf-8"))

    return ("updated" if changed else "unchanged"), not headings[1], not headings[2]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="show changes without writing")
    mode.add_argument("--write", action="store_true", help="apply changes (default)")
    args = parser.parse_args()
    write = not args.dry_run

    stats = {}
    missing_h1 = []
    missing_h2 = []
    errors = []

    for path in sorted(CONTENT.rglob("*.md")):
        status, no_h1, no_h2 = update_file(path, write)
        stats[status] = stats.get(status, 0) + 1
        if no_h1:
            missing_h1.append(path.relative_to(ROOT))
        if no_h2:
            missing_h2.append(path.relative_to(ROOT))
        if status in {"no front matter", "unclosed front matter"}:
            errors.append((path.relative_to(ROOT), status))

    print(("APPLIED" if write else "DRY RUN") + f": {sum(stats.values())} files")
    for status, count in sorted(stats.items()):
        print(f"  {status}: {count}")
    print(f"  pages without H1 (title kept): {len(missing_h1)}")
    print(f"  pages without H2 (topics kept): {len(missing_h2)}")
    for path, error in errors:
        print(f"  {error}: {path}")


if __name__ == "__main__":
    main()
