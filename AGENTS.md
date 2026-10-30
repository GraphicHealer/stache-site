# stache-site

Marketing + docs site for [Stache](https://github.com/GraphicHealer/Stache)
(main repo: `~/Documents/Stache`, HA integration: `~/Documents/stache-ha`).

## Stack

- **Astro + Starlight** — static output in `dist/`, zero-JS landing page,
  Pagefind search on docs for free. Dark-first design; brand colors come from
  the app icon: bg `#111318`, accent `#f2b233`.
- `npm run dev` / `npm run build` / `npm run preview`. Node 22.
- Deploy: `.github/workflows/deploy.yml` → GitHub Pages on push to `main`.

## Layout & conventions

- Landing page is a **custom Astro page** (`src/pages/index.astro` +
  `src/styles/landing.css`), not Starlight. Scroll animations are a tiny
  IntersectionObserver + CSS (`.reveal`), honoring `prefers-reduced-motion`.
- Docs live in `src/content/docs/docs/**` — the doubled `docs/` dir is what
  puts pages under `/docs/…` URLs. Sidebar is explicit slugs in
  `astro.config.mjs`.
- `BASE_URL` in Astro has **no trailing slash** — normalize before building
  asset URLs (see `index.astro`).
- Phone screenshots in `public/shots/*.webp` are **real captures** of a seeded
  demo Stache instance, not mockups — regenerate with `tools/shots.mjs`
  (playwright-core + system chromium). Demo instance used
  `ghcr.io/graphichealer/stache` on :8181 with seeded areas/items; seed data +
  stock photos live under `/tmp/stache-seed/` (ephemeral).
- Demo photos are Wikimedia Commons CC0/CC-BY/PD images — keep
  `src/data/credits.json` (rendered at `/credits/`) in sync if you swap them.
- Docs copy: plain-language landing page; technical is OK in docs. Content was
  ported from the main repo's README/AGENTS.md/unraid.md — update when the app
  changes.
- GitHub repo: `GraphicHealer/stache-site`. Pages URL:
  `https://stacheit.app`.
