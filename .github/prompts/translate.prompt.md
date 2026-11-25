---
mode: agent
description: Translate a SafeKit page into the 11 site languages with translate_md.py
tools: ['runCommands', 'terminal']
---
# SafeKit website translation

File to translate: ${input:file:content/<path>.md}

## Single rule
To translate a file, run ONLY this command in the PowerShell terminal,
from the repository root (safekit-docs folder):

    python scripts/translate_md.py <English file>

- <English file> = content/<path>.md  or  layouts/shortcodes/<name>-en.html
  (relative path with "/", no backslashes or escaping: e.g. content/_index.md)
- The script translates into all 11 languages, overwrites the existing translations and prints a RESUME.
- If I ask to "export", "copy to OneDrive" or "for review"
  (in French: « export », « exporte », « copier dans OneDrive », « pour vérification »), add:
  --export "$env:OneDriveCommercial\Documents\safekit-traductions"
- If I ask for specific languages only, add: --langs fr,ja

## Forbidden
- Never create temporary files or convert an .html file to .md.
- Never translate, fix or edit a translated file yourself.
- Never run the script one language at a time with --to.
- Never hard-code a personal path (C:\Users\...) in a command or a file.

## Report
Copy the RESUME block printed at the end exactly as it is (script and glossary versions,
segments and warnings per language). If an error occurs, copy the full error message.