import os
import re
from datetime import datetime
from xml.dom import minidom
from xml.etree import ElementTree as ET
import sys
from pathlib import Path

# Directory where this script is located
SCRIPT_DIR = Path(__file__).resolve().parent

# Candidates for BASE_DIR based on where 'content/' actually resides
# 1. Local execution: project_root/safekit-hugo/content
# 2. GitHub / Root execution (script inside scripts/): parent/content
candidates = [
    SCRIPT_DIR / "safekit-hugo",
    SCRIPT_DIR.parent,
]

BASE_DIR = None

# Find the first valid base directory containing a 'content' folder
for path in candidates:
    if (path / "content").is_dir():
        BASE_DIR = path
        break

if BASE_DIR is None:
    print("Error: Unable to locate project root ('content/' directory not found).", file=sys.stderr)
    print(f"Searched candidates relative to: {SCRIPT_DIR}", file=sys.stderr)
    sys.exit(1)
    
BASE_URL = "https://safekit-dev.eviden.com"

# Shortcodes à ignorer et supprimer complètement (ainsi que leurs H2)
EXCLUDED_SHORTCODES = ("insert-safekit-4-buttons", "insert-safekit-hub")

# Pattern générique pour capturer les codes langues (ex: -fr, .en, _zh-hans)
# en excluant explicitement "-ha"
LANG_FILENAME_PATTERN = re.compile(
    r"[-_\.](?!ha\b)([a-z]{2}(?:-[a-z]{2,4})?)\.md$", re.IGNORECASE
)


def extract_language(md_content, filename):
    """
    Détermine la langue du fichier Markdown :
    1. Depuis le front matter YAML/TOML (lang: "fr" ou lang = "de")
    2. Depuis le nom de fichier (ex: guide-fr.md -> fr)
    3. Exclut explicitement -ha.md
    4. "en" par défaut si non trouvé
    """
    lang_match = re.search(
        r'^lang\s*[:=]\s*["\']?([a-z]{2}(?:-[a-z]{2,4})?)["\']?',
        md_content,
        re.MULTILINE | re.IGNORECASE,
    )
    if lang_match:
        return lang_match.group(1).lower()

    # Exclusion explicite du suffixe technique -ha
    if re.search(r"[-_\.]ha\.md$", filename, re.IGNORECASE):
        return "en"

    suffix_match = LANG_FILENAME_PATTERN.search(filename)
    if suffix_match:
        return suffix_match.group(1).lower()

    return "en"


# Matches a nested {{ $.Page.RenderString ... }} call found INSIDE an
# already-loaded shortcode template — either the simple string form
# (no dynamic args) or the printf-wrapped form used when the nested
# shortcode needs parameters forwarded from its parent.
NESTED_RENDERSTRING_PATTERN = re.compile(
    r'\{\{\s*\$\.Page\.RenderString\s*'
    r'(?:"((?:[^"\\]|\\.)*)"'
    r'|\(printf\s+"((?:[^"\\]|\\.)*)"\s*((?:\(\.Get\s+"[^"]+"\)\s*)*)\))'
    r'\s*\}\}'
)


def resolve_nested_renderstring_calls(template, args):
    """Resolve {{ $.Page.RenderString ... }} calls found inside an
    already-loaded shortcode template into plain "{{%  name key="val"  %}}"
    syntax, so the next expansion pass picks them up normally.

    Since Hugo 0.100, $.Page.RenderString does render shortcodes found in
    the string it's given — see build_nested_shortcode_call in
    extract_inserts.py — so a NESTED shortcode (one shortcode calling
    another) is written as either:
      {{ $.Page.RenderString "{{%  name  %}}" }}                     (no args)
      {{ $.Page.RenderString (printf "{{%%  name key=%q  %%}}" (.Get "key")) }}

    Neither form matches expand_file()'s top-level pattern (which only
    handles a plain quoted-string RenderString argument, or a direct
    {{%  %}}/{{<  >}} call) — the printf form in particular doesn't even
    start with a quote, so it was passed through completely untouched.

    The printf form's (.Get "key") arguments can only be resolved here,
    using the PARENT shortcode's own already-resolved `args` dict (the
    nested call's own text never carries the actual value, only the key
    name) — by the time a left-over RenderString call would reach a later
    top-level pass, that context is gone.
    """
    def replacer(m):
        plain_str, fmt_str, get_args_raw = m.group(1), m.group(2), m.group(3)

        if plain_str is not None:
            # e.g. "{{%  insert-safekit-usage-en  %}}" — no args, just
            # unescape and unwrap back to a plain shortcode call.
            return plain_str.replace('\\"', '"').replace('\\\\', '\\')

        # printf form: unescape, then substitute "%%" -> "%" and each
        # "%q" slot -> the matching (.Get "key")'s resolved value (in the
        # order the .Get calls appear), mirroring Go's printf/%q handling.
        resolved = fmt_str.replace('\\"', '"').replace('\\\\', '\\')
        resolved = resolved.replace('%%', '\x00PERCENT\x00')
        for key in re.findall(r'\.Get\s+"([^"]+)"', get_args_raw or ""):
            val = args.get(key, "")
            quoted = '"' + val.replace('\\', '\\\\').replace('"', '\\"') + '"'
            resolved = resolved.replace('%q', quoted, 1)
        return resolved.replace('\x00PERCENT\x00', '%')

    return NESTED_RENDERSTRING_PATTERN.sub(replacer, template)


def expand_shortcode(match, shortcodes_dir):
    """Déplie un shortcode ou le supprime s'il fait partie de EXCLUDED_SHORTCODES."""
    full_match = match.group(0)

    from_render_string = match.group(1) is not None
    content = match.group(1) if from_render_string else match.group(2)
    if not content:
        return ""

    if from_render_string:
        content = content.replace('\\"', '"').replace("\\\\", "\\").strip()
        wrapped = re.match(r"^\{\{[\%<]\s*(.*?)\s*[\%>]\}\}$", content)
        if wrapped:
            content = wrapped.group(1)
    else:
        content = content.strip()
        # NOTE: "%", "<", ">" are the Hugo shortcode delimiter chars that
        # can be left over at the edges after the outer regex match; '"'
        # must NOT be stripped here — when the content ends exactly at a
        # parameter's closing quote (e.g. a single-param nested call like
        # `insert-safekit-mirror-en app="Firebird"`, with no trailing
        # whitespace before the outer %}}), stripping it corrupts the
        # value into an unterminated quote, so args ends up empty and
        # every {{ .Get "..." }} in the nested template is left blank.
        content = re.sub(r'^[\%<>\s]+|[\%<>\s]+$', "", content).strip()

    parts = content.split()
    if not parts:
        return ""

    shortcode_name = parts[0]

    if any(shortcode_name.startswith(prefix) for prefix in EXCLUDED_SHORTCODES):
        return ""

    args = dict(re.findall(r'(\w+)="([^"]+)"', content))

    sc_file_html = os.path.join(shortcodes_dir, f"{shortcode_name}.html")
    sc_file_md = os.path.join(shortcodes_dir, f"{shortcode_name}.md")

    file_path = None
    if os.path.exists(sc_file_html):
        file_path = sc_file_html
    elif os.path.exists(sc_file_md):
        file_path = sc_file_md
    else:
        return full_match

    with open(file_path, "r", encoding="utf-8") as f:
        template = f.read()

    template = re.sub(r"\{\{/\*.*?\*/\}\}", "", template, flags=re.DOTALL)
    template = re.sub(r"<!--\s*(BEGIN|END)\s+INSERT:.*?-->", "", template)

    # Resolve any nested $.Page.RenderString(...) shortcode calls using
    # THIS shortcode's own resolved args, before they'd otherwise be lost.
    template = resolve_nested_renderstring_calls(template, args)

    for key, val in args.items():
        template = re.sub(
            r'\{\{\s*\.Get\s+"' + key + r'"\s*\}\}',
            lambda m, v=val: v,
            template,
        )

    template = re.sub(r'\{\{\s*\.Get\s+"[^"]+"\s*\}\}', "", template)

    return template


def rebuild_topics_from_h2(md_content, filename=""):
    """
    Extrait tous les titres ## et <h2> présents dans le corps du document
    après expansion/suppression des shortcodes et régénère la ligne "topics:".

    Retourne (nouveau_contenu, nombre_de_h2_trouvés).
    """
    hugo_anchor_pattern = re.compile(r"\s*\{[#:][^\}]+\}\s*")
    extracted_h2s = []

    # 1. Extraction des H2 Markdown : ^## Titre
    for match in re.finditer(r"^##\s+(.+)$", md_content, re.MULTILINE):
        text = match.group(1)
        text = hugo_anchor_pattern.sub("", text)
        text = re.sub(r"\s+", " ", text).strip()
        if text and text not in extracted_h2s:
            extracted_h2s.append(text)

    # 2. Extraction des H2 HTML : <h2...>Titre</h2>
    for match in re.finditer(r"<h2[^>]*>(.*?)</h2>", md_content, re.DOTALL | re.IGNORECASE):
        text = re.sub(r"<[^>]+>", "", match.group(1))
        text = hugo_anchor_pattern.sub("", text)
        text = re.sub(r"\s+", " ", text).strip()
        if text and text not in extracted_h2s:
            extracted_h2s.append(text)

    # Regex corrigée (évite les conflits d'échappement)
    topics_line_pattern = re.compile(r'^topics:\s*[\'"].*?[\'"][ \t]*\r?\n', re.MULTILINE)

    if extracted_h2s:
        safe_h2s = [h2.replace('"', '\\"') for h2 in extracted_h2s]
        new_topics_str = f'topics: "{", ".join(safe_h2s)}"\n'

        if topics_line_pattern.search(md_content):
            new_content = topics_line_pattern.sub(new_topics_str, md_content)
        else:
            new_content = re.sub(r"^(---\s*\r?\n)", r"\1" + new_topics_str, md_content, count=1)
        return new_content, len(extracted_h2s)
    else:
        return topics_line_pattern.sub("", md_content), 0


def fix_links(md_content):
    """Transforme [texte](/chemin/) en [texte](https://safekit-dev.eviden.com/chemin/)"""
    def replace_link(match):
        prefix = match.group(1)
        wrapper = match.group(2)
        url = match.group(3)

        if url.startswith(("http://", "https://", "mailto:", "#")):
            return match.group(0)

        if not url.startswith("/"):
            url = "/" + url

        full_url = f"{BASE_URL}{url}"

        if wrapper == "<":
            return f"{prefix}<{full_url}>)"
        return f"{prefix}{full_url})"

    link_pattern = r"(\[[^\]]*\]\()\s*(<?)(/[^>\)]+)(>?)\)"
    return re.sub(link_pattern, replace_link, md_content)


def expand_file(input_file, output_file, shortcodes_dir):
    with open(input_file, "r", encoding="utf-8") as f:
        md_content = f.read()

    filename = os.path.basename(input_file)
    lang = extract_language(md_content, filename)

    # 1. Dépliage des shortcodes et suppression des EXCLUDED_SHORTCODES
    pattern = r'\{\{\s*\$\.Page\.RenderString\s+"((?:[^"\\]|\\.)*)"\s*\}\}|\{\{[\%<]\s*(.*?)\s*[\%>]\}\}'
    max_depth = 5
    for _ in range(max_depth):
        new_content = re.sub(
            pattern, lambda m: expand_shortcode(m, shortcodes_dir), md_content
        )
        if new_content == md_content:
            break
        md_content = new_content

    # 2. Régénération intégrale des topics à partir des H2 restants
    md_content, h2_count = rebuild_topics_from_h2(md_content, filename=filename)

    # 3. Nettoyage des liens et des sauts de ligne excessifs
    md_content = fix_links(md_content)
    md_content = re.sub(r"\n{3,}", "\n\n", md_content)

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(md_content)

    return lang, h2_count


def generate_language_sitemap(urls, output_path):
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    today = datetime.now().strftime("%Y-%m-%d")

    for url in sorted(urls):
        url_elem = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url_elem, "loc")
        loc.text = url
        lastmod = ET.SubElement(url_elem, "lastmod")
        lastmod.text = today

    xml_str = ET.tostring(urlset, encoding="utf-8")
    parsed_xml = minidom.parseString(xml_str)
    pretty_xml = parsed_xml.toprettyxml(indent="  ", encoding="utf-8")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(pretty_xml)


def generate_sitemap_index(sitemap_urls, output_path):
    sitemapindex = ET.Element(
        "sitemapindex", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    )
    today = datetime.now().strftime("%Y-%m-%d")

    for sitemap_url in sorted(sitemap_urls):
        sitemap_elem = ET.SubElement(sitemapindex, "sitemap")
        loc = ET.SubElement(sitemap_elem, "loc")
        loc.text = sitemap_url
        lastmod = ET.SubElement(sitemap_elem, "lastmod")
        lastmod.text = today

    xml_str = ET.tostring(sitemapindex, encoding="utf-8")
    parsed_xml = minidom.parseString(xml_str)
    pretty_xml = parsed_xml.toprettyxml(indent="  ", encoding="utf-8")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(pretty_xml)


def process_content_directory():
    if os.path.exists(os.path.join(BASE_DIR, "safekit-hugo")):
        project_dir = os.path.join(BASE_DIR, "safekit-hugo")
    elif os.path.exists(os.path.join(BASE_DIR, "content")):
        project_dir = BASE_DIR
    else:
        project_dir = BASE_DIR

    content_dir = os.path.join(project_dir, "content")
    public_dir = os.path.join(project_dir, "public")
    shortcodes_dir = os.path.join(project_dir, "layouts", "shortcodes")

    count = 0
    urls_by_lang = {}

    print(f"\n--- DÉBUT DU TRAITEMENT DES FICHIERS MARKDOWN ---")

    for root, _, files in os.walk(content_dir):
        for file in files:
            if file.endswith(".md"):
                input_file = os.path.join(root, file)
                rel_path = os.path.relpath(input_file, content_dir)

                # Nettoyage dynamique du suffixe de langue (ex: -fr.md -> .md) en excluant -ha.md
                clean_rel_path = LANG_FILENAME_PATTERN.sub(".md", rel_path)

                if os.path.basename(clean_rel_path) in ("_index.md", "index.md"):
                    rel_dir = os.path.dirname(clean_rel_path)
                    output_rel_path = (
                        os.path.join(rel_dir, "index.md") if rel_dir else "index.md"
                    )
                else:
                    base_name = os.path.splitext(clean_rel_path)[0]
                    output_rel_path = os.path.join(base_name, "index.md")

                output_file = os.path.join(public_dir, output_rel_path)

                lang, h2_count = expand_file(input_file, output_file, shortcodes_dir)
                count += 1

                url_path = output_rel_path.replace("\\", "/")
                md_url = f"{BASE_URL}/{url_path}"
                urls_by_lang.setdefault(lang, []).append(md_url)

                topics_note = f"{h2_count} H2 trouvés" if h2_count else "aucun H2"
                print(f"[OK] ({lang}) public/{output_rel_path} ({topics_note})")

    # Génération dynamique des sitemaps par langue
    index_sitemap_urls = []
    for lang, urls in urls_by_lang.items():
        lang_sitemap_filename = f"sitemap-md-{lang}.xml"
        lang_sitemap_path = os.path.join(public_dir, lang_sitemap_filename)

        generate_language_sitemap(urls, lang_sitemap_path)

        lang_sitemap_url = f"{BASE_URL}/{lang_sitemap_filename}"
        index_sitemap_urls.append(lang_sitemap_url)
        print(f"[SITEMAP LANG] Généré : {lang_sitemap_url} ({len(urls)} URLs)")

    master_sitemap_path = os.path.join(public_dir, "sitemap-md.xml")
    generate_sitemap_index(index_sitemap_urls, master_sitemap_path)
    print(
        f"[SITEMAP INDEX] Généré : {BASE_URL}/sitemap-md.xml ({len(index_sitemap_urls)} sitemaps référencés)"
    )

    print(f"\nTerminé : {count} fichier(s) Markdown généré(s) dans {public_dir}")


if __name__ == "__main__":
    process_content_directory()