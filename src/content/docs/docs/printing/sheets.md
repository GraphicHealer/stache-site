---
title: Printing on label sheets
description: Print die-cut sticker sheets on a regular printer using built-in or custom layouts.
---

**Sheet** media lays labels out on full Letter or A4 pages at their actual size. Use it with Avery-style die-cut sticker sheets or plain paper that you cut yourself. Sheet printing is available for CUPS and **Print from this PC** printers.

## Choose a preset

The printer form includes common sheet layouts, including Avery 5160, 5161, 5163, 5167, 5120, and L7651, for Letter and A4 paper. Choose a preset and check the preview to confirm the cell grid matches your stock.

<picture>
  <source srcset="/shots-docs/print-sheets-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/print-sheets.webp" alt="The PC print settings showing sheet media, the Avery preset picker, and margins" width="300" />
</picture>

## Create a custom sheet layout

Choose **Custom…** to describe your sticker sheet:

- **Cell width / height** sets the size of each sticker in millimeters.
- **Columns / rows** sets how many stickers fit across and down the page.
- **Horizontal / vertical gap** sets the spacing between stickers.
- **Top / side margins** sets the unused space between the paper edge and the label grid.
- **Page** selects Letter or A4.

The live preview updates as you edit the values. It shows the cell grid, each label's dimensions, and whether the layout fits on the selected page.

:::tip[Save a custom preset]
Choose **Save preset** and give the layout a name. Your custom presets appear in the picker for every sheet-capable printer, including CUPS and Print from this PC. Built-in presets cannot be removed; custom presets can.
:::

## Understand the two kinds of margins

There are two separate measurements:

- **Sheet margins** position the entire grid on the paper. They define the top and side dead zones before the first row and column.
- **Printer margins** inset the printed content inside each individual sticker. These work per label, not per page, and follow the same rules as margins on a dedicated Zebra printer.

Adjust the sheet margins to position the grid on the physical page. Adjust printer margins to position the QR code and text within each sticker.

## How sheet printing works

- **CUPS sheet printing** renders each page as a PNG at 300 DPI, then sends it to the CUPS queue.
- **PC sheet printing** opens a dedicated print page sized to the selected sheet. Choose 100% or Actual size in the browser print dialog to avoid scaling.
