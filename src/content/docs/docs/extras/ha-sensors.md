---
title: Home Assistant sensors
description: Items out, unaccounted, low stock, and warranty expiring — as HA sensors.
---

The [stache-ha](https://github.com/GraphicHealer/stache-ha) HACS integration exposes your inventory to Home Assistant for dashboards and automations.

## Install

[![Add Stache integration via HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=GraphicHealer&repository=stache-ha&category=integration)

1. Click the badge (or add `https://github.com/GraphicHealer/stache-ha` as a HACS custom repository, category: **Integration**).
2. Install **Stache** from HACS, restart Home Assistant.
3. **Settings → Devices & Services → Add Integration → Stache**.

## Configure

The integration needs the sensor URL from Stache:

1. In Stache, go to **Settings → Out reminders**, enable it if it's off, and press **Copy sensor URL**.
2. Paste the whole URL into the setup dialog — the integration splits out the host and token itself.

You can also enter the Stache URL and webhook token as two fields.

## Sensors

| Sensor | State | Attributes |
|--------|-------|------------|
| Items out | Count of things marked out/lent | Item names, area paths, days out |
| Unaccounted | Count of items nobody has seen lately | — |
| Low stock | Count of items at/below their restock point | Names, quantity, threshold |
| Warranty expiring | Count of warranties ending within 30 days | Names, end dates |

Polls every 2 minutes. All shared household items are included; private items are never exposed.

## Without the integration

**Settings** in Stache also shows a ready-made REST sensor URL and a digest trigger URL, so you can wire sensors or automations yourself — no HACS needed.
