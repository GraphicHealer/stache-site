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
npm run dev       # local dev server
npm run build     # static build -> dist/
npm run preview   # serve the production build
```

## Layout

| What | Where |
|------|-------|
| Landing page | `src/pages/index.astro` |
| Landing styles | `src/styles/landing.css` |
| Phone frame / feature section | `src/components/` |
| Docs content | `src/content/docs/docs/**` (the doubled `docs` is intentional — it puts pages under `/docs/`) |
| Phone screenshots | `public/shots/*.webp` — real captures from a seeded demo instance |
| Photo credits data | `src/data/credits.json` → rendered at `/credits/` |
| Deploy workflow | `.github/workflows/deploy.yml` |

## Configuration

`astro.config.mjs` reads two env vars (set in `deploy.yml`):

- `SITE_URL` (default `https://stacheit.app`)
- `BASE_PATH` (default `/`)

The custom domain is set in repo Settings → Pages; keep `SITE_URL` in sync.

## Regenerating screenshots

`tools/shots.mjs` captures real screens from a seeded demo instance at a phone viewport and writes `public/shots/*.webp`. See the comment at the top of the file.

## Credits

Demo photos are CC0 / CC-BY / public-domain images from Wikimedia Commons — see `src/data/credits.json` and the site's `/credits/` page.
