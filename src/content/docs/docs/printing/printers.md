---
title: Printer types
description: Zebra/ZPL, Zebra legacy, CUPS, DYMO Connect, and browser printing - setup and options for each.
---

Add a printer from **Labels → Add printer**. Every type shares the same core fields:

- **Name** — shows in the printer picker and the default-printer dropdown.
- **Label size** — width × height in mm, used to lay out the label.
- **dpi** — the printer's resolution (203, 300, 600).
- **Margins** — four-sided inset in mm (top, left, right, bottom). Content shrinks inside the margin box, so each edge's value pushes its own side in. Defaults to 1mm all around; 0 prints edge-to-edge (where hardware allows).

Everything below lists what's different per type.

<img src="/shots-docs/print-add.webp" alt="The add-printer form showing the type picker and connection fields" width="300" />

## Zebra / ZPL (network)

Talks raw ZPL over TCP port 9100 — the same language Zebra printers print natively.

- **Host / port** — the printer's IP (usually `9100`).
- **Read values** — probes the printer and fills label size and dpi automatically.
- **Calibrate** — sends `~JC` (media calibration) then probes; use after loading different stock. Feeds ~1 label to measure the gap.
- **Preview** — rendered by a real ZPL engine locally; the exact image the printer receives.

Use **Zebra legacy** for older firmware (e.g., GX420d) whose probe response differs — same controls, same output.

:::tip[Print too far off-center?]
Don't fight `~JC` or host calibration quirks — set margins to shift content instead (e.g., left 2mm moves everything right). Negative values pull the other way.
:::

<img src="/shots-docs/print-margins.webp" alt="The printer edit form showing label size, dpi, and the four-sided margin fields" width="300" />

## CUPS queue

Prints through `lp` — works for USB and networked printers the CUPS server can see. The container ships `cups-client`; point it at your server with the host field.

- **Queue** — the CUPS queue name (`lpstat -p` to list).
- **CUPS server** — optional, e.g. `localhost:631`.
- **Media: Label** renders a single PNG at your label size and dpi and prints it directly.
- **Media: Sheet** renders full Letter/A4 pages of cells — see [Sheet printing](/docs/printing/sheets/).

## DYMO Connect

Prints via the **official DYMO Connect Framework** — a local web service installed with DYMO Connect (Windows/Mac) that browsers can talk to.

:::caution[Requirement]
DYMO Connect must be **installed and running on the computer you're browsing Stache from** — the server itself never sees the printer. Printing from another device without DYMO Connect won't work.
:::

- **Name** — the DYMO printer's name exactly as it appears in DYMO Connect (e.g. `LabelWriter 450`).
- **Read values** — client-side probe: verifies the service is up, the printer exists and is connected, and reads the loaded media size when reported.
- **Errors are specific** — the integration distinguishes "DYMO Connect isn't running", "printer not found", and "not connected", so a failed print tells you which.
- **Preview** — DYMO's own renderer, pixel-true.

## Print from this PC (built-in)

Always present, can't be deleted — opens a dedicated print page and your browser's print dialog. Use it for regular page printers, a test print, or as a fallback.

- **Media: Label** — one label per page at your set size.
- **Media: Sheet** — die-cut sheet layouts, same engine as CUPS sheets.
- Has the same margins and label-size settings as every other type.

:::tip[Browser scaling]
Pick "Actual size" / 100% scale in the print dialog — the page is sized in real mm and any fit-to-page scaling will shrink labels.
:::
