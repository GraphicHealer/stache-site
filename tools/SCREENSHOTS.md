# Documentation screenshot workflow

This guide is for contributors and coding assistants maintaining the Stache website. The screenshots in the site are **real captures of the running application**, not hand-drawn mockups. Keep the existing capture script and seeded-demo workflow; update them only when the application routes or UI genuinely change.

## What creates the screenshots

Run `tools/shots.mjs` from the root of `stache-site`. It signs in to a seeded Stache instance using Playwright, visits a known set of routes at a phone-sized viewport, and saves WebP images.

- `public/shots/` contains screenshots used by the marketing/landing page.
- `public/shots-docs/` contains screenshots used by documentation pages.
- The script uses a 390 × 844 viewport, device scale factor 2, and dark color scheme.
- Screenshots are saved at WebP quality 82.

The route lists and filenames are defined in the script. **Do not rename or remove a screenshot without searching the site for references to it.**

## Prepare a safe demo instance

Never point the script at a household's real inventory. Use a disposable, seeded demo instance with sample accounts, areas, labels, items with photos, an out/lent item, and an item in the trash.

The script's defaults expect:

| Variable | Default | Purpose |
|---|---|---|
| `STACHE_URL` | `http://localhost:8181` | Demo app URL |
| `STACHE_EMAIL` | `demo@stache.local` | Demo account email |
| `STACHE_PASS` | `demo-password-123` | Demo account password |
| `AREA_ID` | empty | ID of a labeled area |
| `ITEM_ID` | empty | ID of an item with a photo |
| `CHROMIUM` | `/usr/bin/chromium-browser` | Chromium executable |

The current script expects the demo app to be reachable at `STACHE_URL`. Its comments show one example of starting a demo Compose project, but the exact seed data can be created through the app/API or supplied by an existing disposable seeded environment. Keep the IDs and credentials aligned with that environment.

## Install capture dependencies

From the site repository:

```sh
npm install
npm install --no-save playwright-core sharp
```

Install Chromium on the machine and set `CHROMIUM` if its executable is not at the script's default path. The project does not need to add Playwright as a permanent runtime dependency just to build the static site.

## Capture screenshots

Set the environment variables for the demo instance, then run:

```sh
STACHE_URL=http://localhost:8181 \
STACHE_EMAIL=demo@stache.local \
STACHE_PASS='demo-password-123' \
AREA_ID='<seeded-area-id>' \
ITEM_ID='<seeded-item-id>' \
CHROMIUM=/usr/bin/chromium \
node tools/shots.mjs
```

The script writes the screenshots directly into the two existing public directories. It currently captures:

**Landing page:** item, labels, area, search, settings/MCP, out, and trash.

**Documentation:** labels, item, browse, and settings.

Some routes depend on valid `AREA_ID` and `ITEM_ID` values. If those are missing, the script skips the route rather than producing a useful capture.

## When to retake a screenshot

Retake screenshots when a documented screen changes in a way readers would notice, a route or interaction changes, a screenshot is visibly stale, or a new guide needs a visual example.

A sensible refresh process:

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
