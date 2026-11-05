---
title: Printing labels
description: Every printer type, style, and setting - pick the right one and print your first label.
---

Only **areas** get QR labels in Stache, but there are several ways to get them onto sticker stock. The **Labels** page is where everything print-related lives: minting codes, configuring printers, previewing, and printing.

## Pick a printer type

| Type | Best for | How it connects |
|------|----------|-----------------|
| **Zebra / ZPL** | Dedicated label printers | Network (`IP:9100`, raw ZPL) |
| **Zebra legacy** | Older Zebra firmware (GX420d etc.) | Same, uses `^HH` probe commands |
| **CUPS queue** | Networked or USB printers on Linux hosts | `lp` command inside the container |
| **DYMO Connect** | DYMO LabelWriters | DYMO Connect installed on the computer you're browsing from |
| **Print from this PC** | Any printer your OS can see | Browser's print dialog |

See **[Printer types](/docs/printing/printers/)** for setup details per type.

<img src="/shots-docs/print-printers.webp" alt="The Labels page showing configured printers, the label preview, and the default-printer picker" width="300" />

## Label or sheet?

- **Label stock** — continuous/die-cut rolls in a dedicated label printer. Set the loaded size in mm.
- **Sheet** — die-cut sticker sheets (Avery-style) on a regular page printer, laid out at true size on Letter or A4. Presets included; **[custom sheets](/docs/printing/sheets/)** can be built and saved.

## The preview

Zebra and DYMO printers render the preview through the **actual print pipeline** — the same ZPL or label XML sent to the hardware — so what you see is what prints, margins and all. CUPS/PC previews use the same layout math drawn in the browser.

A **"Show generated ZPL"** toggle under the Zebra preview shows the raw command payload — handy for testing in external ZPL viewers.

## Default printer

The **Default printer** dropdown on the Labels page preselects that printer in every print dialog - bin pages included.
