"""Synchronize Markdown H1/H2 headings with title/topics front matter.

Usage (from the repository root):
    python scripts/sync_headings_frontmatter.py                  # apply
    python scripts/sync_headings_frontmatter.py --dry-run        # simulate

The first H1 becomes title. H2 headings become comma-separated topics and a
matching comma-separated hashpart line immediately below topics. Commas in H2
titles are replaced by spaces so the topics separator remains unambiguous.
Pages without an H1 keep their title.
"""
import argparse
import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
FRONT_MATTER_FIELD = re.compile(r"^(title|topics|haspart|hashpart)\s*:")
HEADING = re.compile(r"^[ \t]{0,3}(#{1,6})(?:[ \t]+|$)(.*?)\s*$")
FENCE = re.compile(r"^[ \t]{0,3}(`{3,}|~{3,})")
EXPLICIT_ID = re.compile(r"\s*\{#([^\s}]+)[^}]*\}\s*$")


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


def clean_topic(value):
    return re.sub(r"\s+", " ", value.replace(",", " ")).strip()


def auto_hashpart(value):
    slug = []
    for char in value.lower():
        if char.isspace():
            slug.append("-")
        elif char.isalnum() or char in "-_":
            slug.append(char)
    return "".join(slug).strip("-")


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
            raw_heading = match.group(2)
            text = clean_heading(raw_heading)
            if text:
                if len(match.group(1)) == 1:
                    headings[1].append(text)
                else:
                    explicit_id = EXPLICIT_ID.search(raw_heading)
                    hashpart = explicit_id.group(1) if explicit_id else auto_hashpart(text)
                    headings[2].append((text, hashpart))

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
    topics = ", ".join(clean_topic(topic) for topic, _ in headings[2])
    hashparts = ", ".join(hashpart for _, hashpart in headings[2])

    fields = {}
    for i in range(1, end):
        match = FRONT_MATTER_FIELD.match(line_text(lines[i]))
        if match:
            field = match.group(1)
            field = "hashpart" if field in {"haspart", "hashpart"} else field
            if field not in fields:
                fields[field] = i

    replacements = {}
    if title is not None:
        replacements["title"] = f"title: {yaml_string(title)}"
    if headings[2]:
        replacements["topics"] = f"topics: {yaml_string(topics)}"
        replacements["hashpart"] = f"hashpart: {yaml_string(hashparts)}"

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
        insert_at = fields.get("topics", fields.get("title", end - 1)) + 1
        updated[insert_at:insert_at] = [value + newline for value in insertions]

    updated_end = next(
        (i for i in range(1, len(updated)) if line_text(updated[i]).strip() == "---"),
        None,
    )
    updated_fields = {}
    if updated_end is not None:
        for i in range(1, updated_end):
            match = FRONT_MATTER_FIELD.match(line_text(updated[i]))
            if match:
                field = match.group(1)
                field = "hashpart" if field in {"haspart", "hashpart"} else field
                updated_fields.setdefault(field, i)

    if "topics" in updated_fields and "hashpart" in updated_fields:
        topics_index = updated_fields["topics"]
        hashpart_index = updated_fields["hashpart"]
        if hashpart_index != topics_index + 1:
            hashpart_line = updated.pop(hashpart_index)
            if hashpart_index < topics_index:
                topics_index -= 1
            updated.insert(topics_index + 1, hashpart_line)
            changed = True

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
