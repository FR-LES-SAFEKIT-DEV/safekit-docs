---
description: Traduire une page Markdown avec Google Cloud Translation
---
Traduis le fichier Markdown indiqué en lançant dans le terminal :
python scripts/translate_md.py <source.md> <cible.md> --to <langue> --from en

- Langues : zh-CN pour zh-hans, fr, de, ja…
- Le fichier cible va dans le dossier content/ de la langue cible, avec le même nom.
- Ne traduis jamais toi-même le texte : utilise uniquement le script.
- Après exécution, relis le fichier produit et signale toute syntaxe Markdown
  ou tout shortcode Hugo cassé, sans réécrire la traduction.