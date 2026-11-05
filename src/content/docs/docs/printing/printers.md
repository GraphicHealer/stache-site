---
title: Printer setup
description: Configure Zebra/ZPL, legacy Zebra, CUPS, DYMO Connect, and browser printing.
---

Add a printer from **Labels → Add printer**. Each printer has a name, label dimensions, resolution, and margins. The connection fields depend on the printer type.

## Settings shared by printers

- **Name** appears in the printer picker and the default-printer dropdown.
- **Label size** is the width and height of the label in millimeters.
- **DPI** is the printer resolution, usually 203, 300, or 600.
- **Margins** set the inset at the top, left, right, and bottom, in millimeters. Each edge is adjusted independently. The default is 1 mm on every side; 0 prints edge-to-edge where the printer allows it.

<picture>
  <source srcset="/shots-docs/print-add-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/print-add.webp" alt="The add-printer form showing the type picker and connection fields" width="300" />
</picture>

## Zebra / ZPL over the network

This option sends raw ZPL to a Zebra printer over TCP port 9100.

- **Host / port** identifies the printer by IP address and port. The port is usually `9100`.
- **Read values** probes the printer and fills in the label size and DPI when the device reports them.
- **Calibrate** sends `~JC` for media calibration, then probes the printer again. Use this after loading different stock. The printer feeds approximately one label while measuring the gap.
- **Preview** is rendered by a ZPL engine, so it shows the command output that is sent to the hardware.

Choose **Zebra legacy** for older firmware, such as some GX420d models, whose probe response differs. It uses the same general controls and output.

:::tip[Adjusting label alignment]
If content is off-center, adjust the four margin values rather than repeatedly running media calibration. Increasing the left margin moves the printed content to the right; negative values move it in the opposite direction.
:::

<picture>
  <source srcset="/shots-docs/print-margins-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/print-margins.webp" alt="The printer edit form showing label size, DPI, and four-sided margin fields" width="300" />
</picture>

## CUPS queue

CUPS printing uses the `lp` command and works with USB and network printers visible to the CUPS server. The Stache container includes `cups-client`; set the CUPS server host if the queue is managed elsewhere.

- **Queue** is the CUPS queue name. Run `lpstat -p` on the CUPS host to list queues.
- **CUPS server** is optional; for example, `localhost:631`.
- **Media: Label** renders one PNG at the label dimensions and DPI, then sends it to the queue.
- **Media: Sheet** renders full Letter or A4 pages containing multiple labels. See [Sheet printing](/docs/printing/sheets/).

## DYMO Connect

DYMO printing uses the official DYMO Connect Framework, a local web service installed with DYMO Connect for Windows or macOS.

:::caution[DYMO Connect must run on the browsing computer]
Install and run DYMO Connect on the computer you use to open Stache. The Stache server does not connect to the DYMO printer directly. Printing from another device will not work unless DYMO Connect is installed and running there too.
:::

- **Name** must match the printer name shown in DYMO Connect, such as `LabelWriter 450`.
- **Read values** checks that the local service is running, the printer exists and is connected, and the loaded media size is available.
- Error messages distinguish a stopped DYMO service, a missing printer, and a printer that is not connected.
- **Preview** uses DYMO's own renderer.

## Print from this PC

This built-in option is always available and cannot be deleted. It opens a dedicated print page and your browser's print dialog. Use it for regular page printers, test prints, or as a fallback.

- **Media: Label** prints one label per page at the configured size.
- **Media: Sheet** prints die-cut sheet layouts using the same layout engine as CUPS sheet printing.
- Label dimensions and margins work like the other printer types.

:::tip[Browser print scaling]
Choose **Actual size** or **100%** in the print dialog. The page is already sized in real millimeters; fit-to-page scaling can shrink the labels.
:::
