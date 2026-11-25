# SafeKit documentation

Documentation website for SafeKit, built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages.

Website: https://safekit-dev.eviden.com/

## Local development

Install Hugo Extended `0.165.0`, then run from the repository root:

```powershell
hugo server --disableFastRender
```

Open http://localhost:1313/ in a browser.

To generate the complete Markdown files in `public/` and `resources`, run the exporter after the Hugo build:

```powershell
python scripts/expand_all_shortcodes.py
```

GitHub Actions runs this script automatically during deployment.

## Content

Documentation is stored in `content/` and organized by language and topic.

Social sharing metadata uses the default `params.socialImage` from `config.toml`.
Set `socialImage` in a page's front matter to override it with an absolute URL
or a site-root-relative image path. The default image is a square SafeKit icon,
so Twitter cards use the `summary` layout.
The home and product pages also describe SafeKit with `SoftwareApplication`
structured data in every language.

The HTML head and language sitemaps advertise the same available, indexable
translations using `hreflang`. English is also the `x-default` where available.
Pages excluded from the sitemap, marked `noindex`, or redirected are excluded
from these groups, as are pages whose canonical URL does not match their
permalink and the non-English and non-French `best-practises` section pages
excluded by the sitemap. Groups with fewer than two eligible pages are omitted.
