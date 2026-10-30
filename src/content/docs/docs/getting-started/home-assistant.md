---
title: Install on Home Assistant
description: Install Stache as a Home Assistant add-on — the easiest way to run it.
---

Running Home Assistant OS or Supervised? This is the easiest way to run Stache — the add-on handles the container, storage, and updates for you.

## Add the repository

Click this badge to add the Stache repository to your add-on store:

[![Add repository to Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGraphicHealer%2FStache)

Or do it manually: **Settings → Add-ons → Add-on Store → ⋯ (top right) → Repositories**, and paste:

```
https://github.com/GraphicHealer/Stache
```

## Install and start

1. Find **Stache** in the add-on store and install it.
2. Start the add-on. First start takes a minute while it sets up its data folder.
3. Open **Web UI** (or visit `http://<your-ha-host>:8080`).
4. Create the first account — this becomes the household admin.
5. Go to **Labels** and print your first batch of QR labels.

All data (the database, photos, and any AI models you enable) lives in the add-on's data folder and survives updates and restarts.

:::tip[Camera over HTTP]
The live camera viewfinder needs a secure context (HTTPS or `localhost`). Through Home Assistant **ingress** you're covered — but if you open the app directly at `http://<ip>:8080`, photo capture falls back to the file picker. Everything else works either way.
:::

## Sensors inside Home Assistant

Want your inventory in Home Assistant itself — items out, unaccounted, low stock, expiring warranties? There's a HACS integration for that: **[Home Assistant sensors](/docs/extras/ha-sensors/)**.
