---
title: Finding things
description: Search by words, by barcode, or by photo — or just scan the bin.
---

Finding something is the whole point, so there are four ways in.

## Text search

Type what you remember. The search is exact **and** fuzzy — typos and half-remembered names still match names, descriptions, and tags. Filter by area (covers the whole subtree) or by tag.

## Photo search

Drop in a photo and Stache finds items that look like it — powered by local CLIP embeddings computed on your own hardware, nothing leaves the machine.

:::note
CLIP loads lazily on first use and pushes memory from ~200 MB idle to ~450–550 MB warm. On small hosts you can turn it off with `STACHE_NO_ML=1`; everything else keeps working.
:::

## Barcode

Scan a product barcode (camera, or a wedge scanner like a Zebra handheld — rapid keystrokes ending in Enter). Stache detects the code and does a free-tier lookup against Open*Facts databases; a miss just means "no info found" — it never blocks filing.

## Scan the bin

Sometimes the fastest answer: scan the label on a shelf or bin and look at its contents — every nested level included.
