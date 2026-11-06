---
title: Finding things
description: Find an item by words, a photo, its barcode, or the label on its container.
---

Stache gives you several ways to find something, even when you do not remember its exact name.

## Search by words

Enter anything you remember about the item. Stache searches names, descriptions, and tags. Search supports both exact and fuzzy matching, so a spelling mistake or an incomplete name can still find a match.

You can narrow results by area or tag. Selecting an area also searches its nested areas, so a search of the garage can include items stored in its shelves and bins.

<picture>
  <source srcset="/shots/search-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots/search.webp" alt="Search results for drill showing a matching item and its storage location" width="300" />
</picture>

## Search with a photo

Choose or take a photo and Stache looks for items with a similar appearance. This feature uses CLIP, a model that converts images into searchable representations called embeddings. The processing runs locally on the Stache host; the photo is not sent to an external image-search service.

CLIP loads the first time it is needed. In the documented setup, memory use is roughly 200 MB while idle and 450–550 MB after the model has loaded. If your host has limited memory, set `STACHE_ML_LEVEL=0` (or the older `STACHE_NO_ML=1`) to disable machine-learning features. Ordinary inventory features continue to work.

## Look up a product barcode

On the **Find** page, tap **Scan a barcode** and point the camera at a product barcode. Stache shows every item with that barcode, or `No matches for "…"` if you don't own one yet.

A handheld barcode scanner works too. Stache recognizes scanner input from devices that behave like a keyboard and send Enter after the code, including Zebra handheld scanners, and runs the same barcode search.

Items get their barcode when you photograph it: if a photo contains a barcode, the item page offers to attach it (see [Adding items](/docs/using/adding-items/)).

Stache checks the code against the free Open*Facts databases. If no product information is found, you can still save the item normally. A failed lookup does not prevent you from filing it.

## Browse a container

If you remember where you put something but not what you called it, scan the QR label on its shelf, drawer, or bin, from the **Scan** camera (tap the **Open** chip) or your phone's own camera. Stache opens that area and shows its contents, including items in nested areas.

This is often the quickest way to find something when you know its storage location.
