#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Mise à jour des fichiers Markdown traduits avec les traductions de 🔍 Explore SafeKit
extraites depuis les shortcodes insert-safekit-hub-<lang>.html"""

import re
import sys
import io
from pathlib import Path

# Force UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Extrait les traductions depuis les shortcodes hub
def extract_hub_translations():
    translations = {}
    shortcodes_dir = Path('layouts/shortcodes')
    
    langs = ['en', 'fr', 'de', 'es', 'it', 'ja', 'ko', 'nl', 'pt-br', 'pt-pt', 'zh-hans', 'ar']
    
    for lang in langs:
        hub_file = shortcodes_dir / f'insert-safekit-hub-{lang}.html'
        if hub_file.exists():
            content = hub_file.read_text(encoding='utf-8')
            # Cherche ## 🔍 <titre> {#hub}
            match = re.search(r'^## 🔍 (.+?) \{#hub\}', content, re.MULTILINE)
            if match:
                translations[lang] = f"🔍 {match.group(1)}"
                print(f'  {lang:8} : {translations[lang]}')
    
    return translations

# Fonction pour détecter la langue d'un fichier
def detect_lang(file_path):
    content = file_path.read_text(encoding='utf-8')
    
    # Cherche lang: dans le front matter
    match = re.search(r'^lang\s*[:=]\s*["\']?([a-z]{2}(?:-[a-z]{2,4})?)["\']?', content, re.MULTILINE | re.IGNORECASE)
    if match:
        return match.group(1).lower()
    
    # Détecte depuis le chemin
    path_str = str(file_path)
    if '/fr/' in path_str:
        return 'fr'
    elif '/de/' in path_str:
        return 'de'
    elif '/es/' in path_str:
        return 'es'
    elif '/it/' in path_str:
        return 'it'
    elif '/ja/' in path_str:
        return 'ja'
    elif '/ko/' in path_str:
        return 'ko'
    elif '/nl/' in path_str:
        return 'nl'
    elif '/pt-br/' in path_str:
        return 'pt-br'
    elif '/pt-pt/' in path_str:
        return 'pt-pt'
    elif '/zh-hans/' in path_str:
        return 'zh-hans'
    elif '/ar/' in path_str:
        return 'ar'
    else:
        return 'en'

print("=" * 70)
print("Extraction des traductions depuis les shortcodes hub")
print("=" * 70)

translations = extract_hub_translations()

if not translations:
    print("\n⚠  Aucune traduction trouvée dans les shortcodes hub!")
    sys.exit(1)

print("\n" + "=" * 70)
print("Mise à jour des fichiers Markdown traduits")
print("=" * 70)

content_dir = Path('content')
updated = 0
no_change = 0

# Cherche tous les fichiers .md avec le nouveau texte (🔍 Explore SafeKit ou traductions)
for md_file in sorted(content_dir.glob('**/*.md')):
    content = md_file.read_text(encoding='utf-8')
    
    # Skip si pas de "🔍 " du tout
    if '🔍 ' not in content:
        continue
    
    lang = detect_lang(md_file)
    expected_text = translations.get(lang, translations.get('en', '🔍 Explore SafeKit'))
    
    # Check si le texte attendu est déjà présent
    if expected_text in content:
        # Texte déjà correct
        no_change += 1
        continue
    
    # Cherche tout autre texte 🔍 ... qui ne serait pas le bon
    pattern = r'🔍 [^,\n"]+'
    matches = re.findall(pattern, content)
    
    if matches and any(m != expected_text for m in matches):
        # Remplace tous les 🔍 ... par le bon texte
        new_content = re.sub(pattern, expected_text, content)
        md_file.write_text(new_content, encoding='utf-8')
        rel_path = str(md_file.relative_to(content_dir))
        print(f'✓ {rel_path:<60} ({lang})')
        updated += 1

print("\n" + "=" * 70)
print(f"Fichiers mis à jour: {updated}")
print(f"Fichiers déjà corrects: {no_change}")
print("=" * 70)
