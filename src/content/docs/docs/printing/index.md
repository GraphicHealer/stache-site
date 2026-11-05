---
title: Printing labels
description: Choose a printer, configure label stock, preview the result, and print QR labels for your areas.
---

Only **areas** receive QR labels in Stache. The **Labels** page brings the printing workflow together: create codes, configure printers, preview labels, and print them.

## Choose a printer

Stache supports several printer types. Choose the one that matches the printer and computer you have available.

| Printer type | Best for | Connection |
|---|---|---|
| Zebra / ZPL | Dedicated label printers | Network connection, usually TCP port 9100 |
| Zebra legacy | Older Zebra firmware, such as some GX420d models | Network connection |
| CUPS queue | USB or network printers managed by CUPS on a Linux host | CUPS queue |
| DYMO Connect | DYMO LabelWriter printers | DYMO Connect on the computer running the browser |
| Print from this PC | Any printer available to your computer | Browser print dialog |

See [Printer types](/docs/printing/printers/) for setup instructions and the settings each type supports.

<picture>
  <source srcset="/shots-docs/print-printers-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/print-printers.webp" alt="The Labels page showing configured printers, the label preview, and the default-printer picker" width="300" />
</picture>

## Choose rolls or sheets

- **Label stock** is used with a dedicated label printer and may be continuous or die-cut. Set the loaded label width and height in millimeters.
- **Sheet stock** uses die-cut sticker sheets in an ordinary page printer. Stache lays out labels at their actual size on Letter or A4 paper. It includes common presets and supports custom saved layouts.

See [Sheet printing](/docs/printing/sheets/) for presets, custom layouts, and page margins.

## Check the preview

For Zebra and DYMO printers, Stache renders the preview through the actual print pipeline: the ZPL or label XML that will be sent to the printer. CUPS and browser printing use the same layout measurements rendered in the browser.

The Zebra preview includes a **Show generated ZPL** option. Use it to inspect or copy the raw printer commands when troubleshooting or testing with an external ZPL viewer.

## Set a default printer

Choose a printer from the **Default printer** dropdown on the Labels page. Stache preselects it in print dialogs throughout the application, including when printing from an individual area.
