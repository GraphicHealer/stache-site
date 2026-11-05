# Screenshot retake requests

These are the only screenshots I recommend refreshing before the documentation overhaul is considered visually current. The existing item, browse, and settings captures are usable; no broad screenshot rebuild is necessary.

## Retake

### 1. `public/shots-docs/labels.webp`

**Why:** The current capture shows QR codes whose destination begins with `http://localhost:8181`. That address only works on the machine running the demo and is not useful when someone scans a label from the published documentation.

**Capture:** The Labels page with a small batch of generated labels, the label preview, and the normal print controls visible. Configure the disposable demo with its public demo URL (or another URL that is safe and intentionally usable in a published screenshot) before generating the QR codes.

### 2. `public/shots-docs/print-printers.webp`

**Why:** The current capture shows a printer at `192.168.1.40` and a QR destination using `localhost:8080`. The private-network address exposes environment-specific setup details, and the localhost QR destination is not useful to readers.

**Capture:** The Labels page framed around the Printers section, showing at least one configured printer, the label preview, and the default-printer control. Use a clearly fictional/demo printer address if an address is needed (for example, a TEST-NET address such as `192.0.2.40`), and use the same safe demo base URL as the Labels screenshot.

**Capture workflow note:** `tools/shots.mjs` currently captures `labels.webp` under `public/shots-docs/`, but it does not currently generate `print-printers.webp`. Add a separate capture entry for the Labels page and scroll it to the Printers section (or use a dedicated capture helper) so this image can be regenerated consistently. Keep the output filename unchanged because the printing guide already references it.

## Leave as-is

- `public/shots-docs/item.webp` — clearly demonstrates an item page and its actions.
- `public/shots-docs/browse.webp` — clearly demonstrates browsing areas and containers.
- `public/shots-docs/settings.webp` — demonstrates the household settings page using the disposable demo account.
- The existing landing-page screenshots under `public/shots/` do not need a blanket retake for this documentation pass.

## Before committing regenerated images

- Use only the disposable seeded demo instance, never real household inventory.
- Check that QR codes do not point to `localhost`, a private home-network address, or a temporary tunnel.
- Remove real hostnames, private IP addresses, personal names, and real account details from the demo data.
- Review the full-size captures and confirm the intended section is visible without loading or error states.
- Keep the existing filenames and update the capture script so future rebuilds reproduce both documentation images.
