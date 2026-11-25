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

Indexable pages receive page-specific JSON-LD: `TechArticle` for individual
quick-install and best-practises pages, `CollectionPage` for section indexes,
`ContactPage` for contact forms, and `WebPage` otherwise. Set `schemaType` in
front matter to override the default with `WebPage`, `CollectionPage`,
`ContactPage`, `Article`, or `TechArticle`. Home, product, and individual
solution pages link to the same SafeKit software entity. Pages marked
`noindex`, redirects, and 404 pages do not receive this structured data.
Every page JSON-LD identifies Eviden as its organizational author.
The `image` front matter field sets the page's JSON-LD image independently of
`socialImage`. Prefer a representative image visible on the page; the SafeKit
icon is used where no suitable image was found and may be ignored by Google.

The HTML head and language sitemaps advertise the same available, indexable
translations using `hreflang`. English is also the `x-default` where available.
Pages excluded from the sitemap, marked `noindex`, or redirected are excluded
from these groups, as are pages whose canonical URL does not match their
permalink and the non-English and non-French `best-practises` section pages
excluded by the sitemap. Groups with fewer than two eligible pages are omitted.
