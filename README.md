# stache-site

Marketing site + documentation for [Stache](https://github.com/GraphicHealer/Stache) — the self-hosted, photo-first home inventory app.

Built with **Astro + Starlight**. Deployed to GitHub Pages via Actions.

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
