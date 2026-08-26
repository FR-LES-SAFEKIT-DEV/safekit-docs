# SafeKit documentation

Documentation website for SafeKit, built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages.

Website: https://safekit-dev.eviden.com/

## Local development

Install Hugo Extended `0.128.0`, then run from the repository root:

```powershell
hugo server --disableFastRender
```

Open http://localhost:1313/ in a browser.

To generate the complete Markdown files in `public/`, run the exporter after the Hugo build:

```powershell
python scripts/expand_all_shortcodes.py
```

GitHub Actions runs this script automatically during deployment.

## Content

Documentation is stored in `content/` and organized by language and topic.
