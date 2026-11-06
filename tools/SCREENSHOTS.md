# Documentation screenshot workflow

This guide is for contributors and coding assistants maintaining the Stache website. The screenshots in the site are **real captures of the running application**, not hand-drawn mockups. Keep the existing capture scripts and seeded-demo workflow; update them only when the application routes or UI genuinely change.

## What creates the screenshots

- `tools/shots.mjs` — the general capture script: landing-page and docs screenshots from a seeded instance.
- `tools/seed-items.mjs` — seeds demo items with real Wikimedia photos (drill, tape, lantern, brushes, yarn, headphones, bottles, board game) plus an out item, a lent item, a trashed item, and an MCP connection.
- `tools/seed-print.mjs` + `tools/shots-print.mjs` — the print-UI pipeline: seeds a disposable instance (accounts, labels, a configured Zebra printer, a saved sheet preset), then captures the Labels/print screens into `public/shots-docs/` (`labels`, `print-printers`, `print-margins`, `print-add`, `print-sheets`).

### Dark and light captures

Every capture runs twice — dark (canonical `name.webp`) and light
(`name-light.webp`). Docs embed them via `<picture>`:

```html
<picture>
  <source srcset="/shots-docs/x-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/x.webp" alt="…" width="300" />
</picture>
```

Both sign in to a seeded Stache instance using Playwright, visit routes at a phone-sized viewport, and save WebP images.

- `public/shots/` contains screenshots used by the marketing/landing page.
- `public/shots-docs/` contains screenshots used by documentation pages.
- The scripts use an iPhone 15 Pro viewport (393 × 852, device scale factor 3) in both dark and light color schemes.
- Screenshots are saved at WebP quality 82.

### Safe demo URLs in captures

**Hosted demo:** `https://demo.stacheit.app` is a disposable demo instance seeded with these accounts. To capture it directly, set `STACHE_URL=https://demo.stacheit.app`; the scripts then skip the proxy below. Live secrets on screen (webhook `?token=` URLs, per-connection MCP URLs) are blurred automatically by `tools/shots.mjs`.

**Local instance:** the scripts route a **safe public demo origin** (`https://demo.stacheit.app`, override with `STACHE_DEMO_ORIGIN`) to the local instance via Playwright `route.fetch`/`fulfill`, so the banner and QR payloads in captures show a real, user-owned demo domain — never localhost, private IPs, or temporary tunnels. For sign-in to work, temporarily add the demo origin to the instance's `STACHE_TRUSTED_ORIGINS` (`.env`) and `docker compose up -d` to recreate; revert afterwards. Printer addresses should use TEST-NET ranges (e.g., `192.0.2.x`).

The route lists and filenames are defined in the script. **Do not rename or remove a screenshot without searching the site for references to it.**

## Prepare a safe demo instance

Never point the script at a household's real inventory. Use a disposable, seeded demo instance with sample accounts, areas, labels, items with photos, an out/lent item, and an item in the trash.

The script connects to an already-running demo app; it does not create or seed the demo records itself. Its defaults expect:

| Variable | Default | Purpose |
|---|---|---|
| `STACHE_URL` | `http://localhost:8181` | Demo app URL |
| `STACHE_EMAIL` | `dali@stache.local` | Demo account email |
| `STACHE_PASS` | `demo-password-123` | Demo account password |
| `AREA_ID` | empty | ID of a labeled area |
| `ITEM_ID` | empty | ID of an item with a photo |
| `CHROMIUM` | `/usr/bin/chromium-browser` | Chromium executable |

The script comments include an example of starting a demo Compose project. Seed the data through the app/API or use an existing disposable seeded environment. Keep the IDs and credentials aligned with that environment.

## Install capture dependencies

From the site repository, install the dependencies declared by the project:

```sh
npm install
```

The project already declares `playwright-core` as a development dependency and `sharp` as a dependency. Install Chromium separately. If its executable is not at `/usr/bin/chromium-browser`, set `CHROMIUM` to the correct path. There is no need to install either Node package separately or add a second copy to `package.json`.

## Capture screenshots

Set the environment variables for the demo instance, then run:

```sh
STACHE_URL=http://localhost:8181 \
STACHE_EMAIL=dali@stache.local \
STACHE_PASS='demo-password-123' \
AREA_ID='<seeded-area-id>' \
ITEM_ID='<seeded-item-id>' \
CHROMIUM=/usr/bin/chromium \
node tools/shots.mjs
```

The example overrides the default Chromium path with `/usr/bin/chromium`. Change it to match the executable installed on your system.

The script writes screenshots into the two existing public directories. It currently captures:

**Landing page:** item, labels, area, search, MCP (Settings → Connections & Integrations), and out.

**Documentation:** labels, item, browse, settings, settings-household, settings-backup (Data & Backups), and settings-out (AI & Automation → Out reminders).

`tools/shots-print.mjs` captures labels plus the Settings → Printers screens (`print-printers`, `print-margins`, `print-add`, `print-sheets`).

Some routes depend on valid `AREA_ID` and `ITEM_ID` values. If those values are missing or invalid, the script skips the affected route.

## When to retake a screenshot

Retake screenshots when a documented screen changes in a way readers would notice, a route or interaction changes, a screenshot is visibly stale, or a new guide needs a visual example.

1. Update the application to the version being documented.
2. Rebuild or reseed the disposable demo so it contains the sample records the routes need.
3. Check that the login credentials, area ID, and item ID still work.
4. Run `tools/shots.mjs`.
5. Review every changed WebP at full size. Confirm it shows the intended screen, has no personal data, and does not show loading/error states.
6. Search the docs and landing page for the image filenames. Update alt text and surrounding instructions if the UI changed.
7. Commit the image changes with the documentation update.

Do not create screenshots by editing UI elements into an image or by substituting a mockup for a real app capture. If a screen cannot be captured because the demo data or route is missing, fix the demo setup or explain the limitation rather than fabricating a screen.

## Validation checklist

- [ ] Captures came from a disposable demo instance, never a real household.
- [ ] All expected files exist under `public/shots/` and `public/shots-docs/`.
- [ ] Images show the intended screen at a useful state.
- [ ] No credentials, tokens, private names, addresses, or real inventory appear.
- [ ] Markdown image paths and alt text match the final filenames.
- [ ] `npm run build` succeeds after the captures and docs are updated.
