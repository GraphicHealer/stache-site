---
title: Sheet printing
description: Die-cut label sheets on regular page printers - presets, custom layouts, and margins.
---

**Sheet** media (on CUPS and PC printers) lays labels out on full Letter/A4 pages at true size — for Avery-style die-cut sticker sheets and plain paper you cut yourself.

## Presets

The picker on the printer form covers common stocks — Avery 5160/5161/5163/5167/5120 and L7651 — on both Letter and A4. Pick one and the preview shows the real cell grid.

<img src="/shots-docs/print-sheets.webp" alt="The PC print settings showing sheet media selected with the Avery preset picker and margins" width="300" />

## Custom sheets

Choose **Custom…** to define your own layout:

- **cell w / h** — the sticker's own size in mm
- **cols / rows** — how many across and down
- **gap x / y** — space between cells
- **top / side margins** — the sheet's dead zone before the grid starts
- **Page** — Letter or A4

A **live preview** draws the grid as you type — cell count, per-cell size, and whether the layout fits the page.

:::tip[Save your sheets]
**Save preset** stores a custom spec by name — saved sheets appear in the picker for *every* sheet-capable printer, CUPS and PC alike. Built-in presets can't be removed; yours can.
:::

## Margins inside each cell

Printer margins apply **per label**, not per page — every cell's content insets by your margin values, the same way ZPL's label home works on dedicated printers. The sheet spec's own top/side margins position the grid on the page; your printer margins inset each sticker inside it.

## How printing works

- **CUPS sheet** — renders each page as a PNG at 300dpi and `lp`s it.
- **PC sheet** — opens a dedicated print page sized exactly to the sheet; use 100% scale in the browser dialog.
