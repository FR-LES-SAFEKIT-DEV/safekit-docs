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

To update `title`, `topics`, and `hashpart` in content front matter using the
expanded Markdown headings, run `python scripts/sync_headings_frontmatter.py`.
Add `--dry-run` to preview changes. Expansion uses a temporary directory, does
not modify `public/`, and follows the exporter's shortcode exclusions, including
the SafeKit hub and four-buttons shortcodes.

## Content

Documentation is stored in `content/` and organized by language and topic.

Social sharing metadata uses the default `params.socialImage` from `config.toml`.
Set `socialImage` in a page's front matter to override it with an absolute URL
or a site-root-relative image path. The default image is a square SafeKit icon,
so Twitter cards use the `summary` layout.
The home and product pages also describe SafeKit with `SoftwareApplication`
structured data in every language.

Indexable pages receive page-specific JSON-LD: `Article` for individual
use-cases pages, `TechArticle` for individual quick-install, best-practises,
architectures, and solutions pages, `CollectionPage` for section indexes,
`ContactPage` for contact forms, and `WebPage` otherwise. Set `schemaType` in
front matter to override the default with `WebPage`, `CollectionPage`,
`ContactPage`, `Article`, `TechArticle`, or `Course`. Pages link to the same
SafeKit software and website entities and identify Eviden as their
organizational author. The page's `about` field references SafeKit by its
`@id`; the complete software entity is declared on the home, product, and
trial pages.
Pages marked `noindex`, redirects, and 404 pages do not receive this structured
data.

Optional front matter fields `schemaApplications`, `schemaSector`, and
`schemaMentions` identify applications, sectors, and organizations discussed
on the page. `schemaFaq` holds questions and answers already visible on the
page; keep it synchronized with the content. `schemaTrial` and
`schemaDownloads` describe the free trial and its visible download links.
Section `ItemList` entries and quick-install module downloads are derived from
links visible in the page content.
The `image` front matter field sets the page's JSON-LD image independently of
`socialImage`. Prefer a representative image visible on the page; the SafeKit
icon is used where no suitable image was found and may be ignored by Google.

The HTML head and language sitemaps advertise the same available, indexable
translations using `hreflang`. English is also the `x-default` where available.
Pages excluded from the sitemap, marked `noindex`, or redirected are excluded
from these groups, as are pages whose canonical URL does not match their
permalink. Groups with fewer than two eligible pages are omitted.
