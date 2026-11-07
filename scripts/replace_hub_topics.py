#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Remplace 🔍 SafeKit High Availability Navigation Hub par 🔍 Explore SafeKit
dans tous les topics: des fichiers Markdown, selon la langue détectée."""

import re
import sys
import io
from pathlib import Path

# Force UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Dictionnaire des traductions pour chaque langue
translations = {
    'en': 'Explore SafeKit',
    'fr': 'Explorez SafeKit',
    'de': 'SafeKit entdecken',
    'es': 'Explora SafeKit',
    'it': 'Esplora SafeKit',
    'ja': 'SafeKit を探索する',
    'ko': 'SafeKit 살펴보기',
    'nl': 'Ontdek SafeKit',
    'pt-br': 'Explore o SafeKit',
    'pt-pt': 'Explore o SafeKit',
    'zh-hans': '探索 SafeKit',
    'ar': 'استكشف SafeKit',
}

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

content_dir = Path('content')
updated = 0
not_found = 0

print("=" * 70)
print("Remplacement de 🔍 SafeKit High Availability Navigation Hub")
print("par 🔍 Explore SafeKit (traduit selon la langue)")
print("=" * 70)

# Cherche tous les fichiers .md avec l'ancien texte
for md_file in sorted(content_dir.glob('**/*.md')):
    content = md_file.read_text(encoding='utf-8')
    
    if 'SafeKit High Availability Navigation Hub' not in content:
        continue
    
    lang = detect_lang(md_file)
    new_text = f"🔍 {translations.get(lang, translations['en'])}"
    old_text = "🔍 SafeKit High Availability Navigation Hub"
    
    # Remplace dans les topics:
    # Format: topics: "..."
    new_content = content.replace(
        f'🔍 SafeKit High Availability Navigation Hub',
        new_text
    )
    
    if new_content != content:
        md_file.write_text(new_content, encoding='utf-8')
        rel_path = str(md_file.relative_to(content_dir))
        print(f'✓ {rel_path:<60} ({lang})')
        updated += 1
    else:
        rel_path = str(md_file.relative_to(content_dir))
        print(f'✗ {rel_path:<60} ({lang}) - texte non trouvé')
        not_found += 1

print("\n" + "=" * 70)
print(f"Fichiers mis à jour: {updated}")
print(f"Fichiers non modifiés: {not_found}")
print("=" * 70)
