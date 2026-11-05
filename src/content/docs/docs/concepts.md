---
title: How Stache works
description: Learn the basic ideas behind Stache before you install it or start organizing your things.
---

Stache is a home inventory that helps you remember **what you own and where you put it**. Take a photo of something, place it in an area such as a shelf or bin, and find it later by searching or scanning that area's QR label.

You do not need to build a detailed catalog before Stache becomes useful. A photo and a place are enough to get started. Names, quantities, tags, and purchase information can be added whenever you need them.

## The four building blocks

### Items are the things you keep track of

An item represents something you own or want to remember. Every item has at least one photo. A name, description, quantity, tags, and purchase details are optional. You can keep several photos on one item, connect related items, and record details such as a serial number or warranty date.

### Areas describe where things belong

An area is any place where you store things: a room, closet, shelf, drawer, or storage bin. Areas can be nested. For example, a garage can contain a shelving unit, which contains a shelf, which contains a bin.

### QR labels identify areas

Labels are QR codes that you attach to areas. Scan a label to open that area in Stache and see what is stored there. Labels are not permanently tied to a physical bin; you can reassign them when your storage changes.

Only areas receive QR labels. Individual items are found through their area, search, or photos.

### Search helps you find things again

Search can match names, descriptions, and tags. You can also search with a photo, scan a product barcode, or scan the QR label on a container to browse its contents.

## What happens when you add something?

1. Open an area by scanning its label or browsing to it.
2. Take a photo of the item.
3. Save it. Stache files it in the current area.
4. Add a name or other details now, or return to them later.

Built-in recognition can suggest names, descriptions, and tags in the background. Suggestions are optional: review them before they become part of the item's details.

## Where your information lives

Stache is self-hosted. Its database, photos, and downloaded AI models are stored together in its persistent data directory. The application includes its own SQLite database, so you do not need to install a separate database server.

You can run Stache with Docker, as a Home Assistant add-on, or on Unraid. Choose the installation that matches the system you already use.

## Continue

- [Choose an installation](/docs/getting-started/)
- [Create your first bin](/docs/getting-started/first-steps/)
- [Learn how to add items](/docs/using/adding-items/)
