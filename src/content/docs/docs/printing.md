---
title: Printing labels
description: Choose a printer, create QR labels, and print them at the right size.
---

Stache can print QR labels on dedicated label printers, through a CUPS print server, with DYMO Connect, or on ordinary paper printers. You can also print labels on die-cut Letter or A4 sheets.

## The quick route

1. Open **Labels** in Stache.
2. Select unclaimed labels or use **Add N** to create a batch.
3. Choose **Print**, select a printer, and check the preview.
4. Print the labels and attach them to the areas you want to identify.

A label is just an identifier until you claim it. You can print a batch ahead of time and assign labels as you organize.

<img src="/shots-docs/labels.webp" alt="Stache's label page with QR labels ready to print" width="300" />

## Choose a printer

- **Zebra / ZPL network printer:** sends ZPL directly to a printer over TCP, usually port 9100. Use this for compatible Zebra devices.
- **CUPS:** sends jobs to a queue visible to the Stache host. Useful for USB printers or printers managed by a print server.
- **DYMO Connect:** uses the DYMO Connect Framework running on the computer that has the printer attached.
- **Print from this PC:** opens the browser's print dialog. This works with ordinary printers and is also a useful fallback.

See [Printer setup](/docs/printing/printers/) for connection fields, calibration, and printer-specific notes.

## Label sheets

For Avery-style die-cut stock or custom layouts, choose **Sheet** media on a CUPS or PC printer. Stache includes common presets and lets you define and save your own grid.

See [Sheet printing](/docs/printing/sheets/) for supported presets, measurements, and print scaling.

## Getting a good result

- Confirm the label width, height, and printer DPI before printing a large batch.
- Check the preview and print one test label before committing to a full sheet or roll.
- For browser printing, choose **Actual size** or **100%**. Fit-to-page scaling can make labels too small.
- Keep the QR code clear and unobstructed. Put labels somewhere they can be scanned without unpacking the container.
