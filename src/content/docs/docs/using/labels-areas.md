---
title: Labels & areas
description: Areas are containers — rooms, shelves, bins — and QR labels point at them.
---

In Stache, an **area** is a container: a room, a closet, a shelf, a bin, a drawer. Areas nest as deep as you like — a bin on a shelf in a closet in the garage.

Only areas get QR labels. Items are just photos with optional names — there's no per-item labeling step.

## How labels work

Labels are random codes like `ST-K7QX9M2T`, minted on the **Labels** page in batches of whatever size you need. They're meaningless until assigned, so nothing goes to waste.

- **Claim a label** — scan an unclaimed QR (or open it from Labels). Give the area a name and optionally a photo. It's now a scannable container.
- **Use a label** — scan it anytime to open the area: see what's inside, set it as the current filing target, or stocktake it.
- **More than one code** — codes and bins are separate things. Assign extra codes to the same area (spares, a code on each face of a crate), unassign ones you want back, and delete unclaimed codes you won't use. The first code assigned becomes the area's primary — reprints always print that one. Asking a code-less bin to print a QR mints and assigns one automatically.

## Editing an area

Tap the pencil on an area's header to edit it. Besides the name there are two optional fields:

- **Category** — a grouping like "Christmas" or "Electronics". It prints as the third line on the area's label.
- **Tags** — free-form, searchable, not printed. Same idea as item tags, but for containers.

## Printing

**Labels** handles everything: mint codes (**Add N**), see what's unclaimed (with printed badges), and print. Select codes and hit **Print** — pick a printer and copies. The **Claimed labels** button renders a reprint sheet of every code currently in use.

Stache prints to Zebra/ZPL and older Zebra firmware over the network, CUPS queues, DYMO LabelWriters (via DYMO Connect), plain browser printing to any OS printer, and die-cut sheet layouts on Letter/A4 — with four-sided margins, exact previews, and saved custom sheet presets. See **[Printing labels](/docs/printing/)** for setup.

<img src="/shots-docs/browse.webp" alt="The Areas browse view showing labeled containers" width="300" />

## Moving things around

- **Move an item** to a different area anytime — it's an undoable event like everything else.
- **Multi-select** on Browse or inside a bin: tap cards to select them (there's a select-all too), and the sticky selection bar offers **Move into…** for nesting areas, or **Move…** for relocating items in bulk. Browse can also print labels for the selected areas straight from the bar.
- **Nest an area** under another (a bin into a closet) from the selection bar, by scanning the parent before claiming, or by editing the area later.
- Areas track item counts across their whole subtree, so a closet page shows everything inside it at every depth.

## Stocktake

Open an area and run a stocktake: tick off what you see, get a review step at the end (counts + optional mark-missing). Progress persists if you get interrupted.
