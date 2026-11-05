<p align="center">
  <img src="public/favicon.svg" alt="Stache logo" width="128">
</p>
<h1 align="center">stache-site</h1>
<p align="center">
  Marketing site + documentation for <a href="https://github.com/GraphicHealer/Stache">Stache</a> — the self-hosted, photo-first home inventory app.<br>
  Live at <a href="https://stacheit.app">stacheit.app</a>. Built with Astro + Starlight, deployed to GitHub Pages.
</p>
<p align="center">
  <a href="AI-DECLARATION.md"><img src="https://img.shields.io/badge/AI--DECLARATION-pair-blue" alt="AI-DECLARATION: pair"></a>
</p>
<p align="center">
  <a href="https://github.com/GraphicHealer/stache-site/actions/workflows/deploy.yml"><img src="https://github.com/GraphicHealer/stache-site/actions/workflows/deploy.yml/badge.svg" alt="Deploy"></a>
</p>

## Commands

```sh
npm install
npm run dev       # local development server
npm run build     # static production build -> dist/
npm run preview   # serve the production build
npm run check:links
```

## Layout

| What | Where |
|------|-------|
| Landing page | `src/pages/index.astro` |
| Landing styles | `src/styles/landing.css` |
| Phone frame / feature section | `src/components/` |
| Docs content | `src/content/docs/docs/**` (the doubled `docs` is intentional — it puts pages under `/docs/`) |
| Phone screenshots | `public/shots/*.webp` |
| Documentation screenshots | `public/shots-docs/*.webp` |
| Screenshot capture script | `tools/shots.mjs` |
| Screenshot contributor guide | `tools/SCREENSHOTS.md` |
| Photo credits data | `src/data/credits.json` → rendered at `/credits/` |
| Deploy workflow | `.github/workflows/deploy.yml` |

## Screenshots

The site uses real captures from a seeded Stache demo instance. To refresh them, use the existing Playwright script:

```sh
node tools/shots.mjs
```

Prepare a disposable demo instance first and set its URL, demo credentials, area ID, item ID, and Chromium executable as needed. **Never capture from a real household.** The full setup, environment variables, capture list, and review checklist are documented in [tools/SCREENSHOTS.md](tools/SCREENSHOTS.md).

## Configuration

`astro.config.mjs` reads two environment variables (set in `deploy.yml`):

- `SITE_URL` (default `https://stacheit.app`)
- `BASE_PATH` (default `/`)

The custom domain is set in repository Settings → Pages; keep `SITE_URL` in sync.

## Credits

Demo photos are CC0 / CC-BY / public-domain images from Wikimedia Commons — see `src/data/credits.json` and the site's `/credits/` page.

## License

[AGPL-3.0](LICENSE) — forks must stay open source, with attribution.
