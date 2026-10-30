---
title: Out & lent tracking
description: Mark things out or lent, get quiet reminders — never nagging badges.
---

Things leave. Stache keeps a light touch on them so you remember where they went.

## Statuses

Every item is **home** by default. It can also be:

- **out** — it's with you / out of its spot (the drill at a job)
- **lent** — someone else has it
- **unaccounted** — nobody's seen it in a while (items out 30+ days display this way)
- **gone** — it's not coming back (hidden from normal views)

**Put back** is one tap — the item's home area is remembered, so there's no "move it back" step.

## The Out page

**Out** shows everything currently out or lent — item, home area, how many days. No badges, no red overdue states. It's a quiet list, not an alarm.

## Reminders (optional)

If you want a nudge, enable **Settings → Out reminders**: one bundled digest POST to any webhook — ntfy, Discord, Home Assistant — daily at a time you pick, or triggered externally. It's one message for everything, snoozable per item, never per-item pings.

Low stock and expiring warranties also fold into the digest and the inbox — surfaced quietly, never alerted.

## Home Assistant

The [HACS integration](/docs/extras/ha-sensors/) exposes items-out, unaccounted, low-stock, and warranty-expiring as sensors for real automations.
