# Traduction du site SafeKit

## Règle unique
Pour traduire un fichier, exécute UNIQUEMENT cette commande, depuis C:\mypython\hugo\safekit-docs :

    python scripts/translate_md.py <fichier anglais>

- <fichier anglais> = content/<chemin>.md  ou  layouts/shortcodes/<nom>-en.html
- Le script traduit dans les 11 langues, écrase les traductions et affiche un RESUME.
- Si je demande de « copier dans OneDrive » ou « pour vérification », ajoute :
  --export "C:\Users\A452255.WW930\OneDrive - ATOS\Documents\safekit-traductions"
- Si je demande seulement certaines langues, ajoute : --langs fr,ja

## Interdits
- Ne jamais créer de fichier temporaire ni convertir un .html en .md.
- Ne jamais traduire, corriger ou modifier un fichier traduit toi-même.
- Ne jamais lancer le script langue par langue avec --to.

## Compte rendu
Recopie-moi tel quel le bloc RESUME affiché à la fin (version du script et du glossaire,
segments et avertissements par langue). En cas d'erreur, recopie le message complet.