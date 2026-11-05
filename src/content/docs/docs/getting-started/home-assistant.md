---
title: Install on Home Assistant
description: Run Stache as a Home Assistant add-on and manage it alongside your other add-ons.
---

If you run Home Assistant OS or Home Assistant Supervised, you can install Stache as an add-on. Home Assistant manages the container and its data directory, and you can start and update Stache from the add-on interface.

## Add the Stache repository

Select the button below to add the Stache repository to your Home Assistant add-on store:

[![Add repository to Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FGraphicHealer%2FStache)

You can also add it manually:

1. In Home Assistant, open **Settings → Add-ons → Add-on Store**.
2. Open the three-dot menu in the top-right corner and choose **Repositories**.
3. Add this repository URL:

```
https://github.com/GraphicHealer/Stache
```

## Install and start the add-on

1. Find **Stache** in the add-on store and select **Install**.
2. Start the add-on. On the first start, it may take a minute to prepare its data directory.
3. Select **Web UI**, or open `http://<your-ha-host>:8080`.
4. Create the first account. It becomes the household administrator.
5. Open **Labels** to create and print your first batch of QR labels.

The add-on's data directory stores the database, photos, and any AI models you enable. Home Assistant keeps this data across add-on updates and restarts.

:::tip[Using the camera]
The live camera viewfinder requires a secure browser context. Home Assistant **ingress** provides this. If you open Stache directly at `http://<ip>:8080`, photo capture falls back to the browser's file picker. Other parts of the application continue to work.
:::

## Connect inventory data to Home Assistant

The add-on runs Stache; it does not automatically create inventory sensors in Home Assistant. To use counts for items out, unaccounted items, low stock, and expiring warranties in Home Assistant dashboards or automations, install the separate [Stache HACS integration](/docs/extras/ha-sensors/).
