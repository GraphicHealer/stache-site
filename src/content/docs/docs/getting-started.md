---
title: Choose an installation
description: Pick the Stache installation that fits the server you already use.
---

Stache is a single application container. It includes its own SQLite database, so there is no separate database service to install or maintain.

Choose the route that fits your setup:

| If you use… | Choose… | Why |
|---|---|---|
| Docker on Linux, a NAS, or a small server | [Docker](/docs/getting-started/docker/) | The most flexible and broadly supported option |
| Home Assistant OS or Supervised | [Home Assistant](/docs/getting-started/home-assistant/) | Install and manage Stache as an add-on |
| Unraid | [Unraid](/docs/getting-started/unraid/) | Keep the app and its data in an appdata folder |

## Before you install

- Decide where Stache's persistent data will live. The data directory contains the database, photos, and downloaded model files.
- Plan how you'll access Stache. HTTPS is recommended, especially if you want to use the live camera, clipboard features, and install the app as a PWA from another device.
- Make a backup plan for the persistent data directory before you start storing irreplaceable information.

## After installation

1. Open Stache and create the first account. The first account becomes the household administrator.
2. Open **Labels** and create a small batch of QR labels.
3. Attach a label to a bin or shelf and claim it as an area.
4. Photograph an item and file it into that area.

The [first-bin walkthrough](/docs/getting-started/first-steps/) takes you through that process. You can add names and other details later; don't let cataloging slow down getting started.
