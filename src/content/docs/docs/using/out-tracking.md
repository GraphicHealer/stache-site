---
title: Tracking items that are out or lent
description: Keep track of items that have left their usual storage place and return them with one tap.
---

Some things do not stay in their storage area. You might take a drill to a job, lend a tool to a neighbor, or use an item somewhere else in the house. Stache tracks those changes without turning them into a stream of overdue alerts.

## Understand item statuses

Items are marked **Home** by default. When an item leaves its usual place, you can change its status:

| Status | Meaning |
|---|---|
| Home | The item is in its usual storage location. |
| Out | You have taken it away from its usual place. |
| Lent | Someone else has the item. |
| Unaccounted | The item has been out for 30 days or more without being seen. |
| Gone | The item is no longer expected to come back. Gone items are hidden from normal views. |

When you mark an item as Out or Lent, Stache remembers its home area. Choose **Put back** when it returns and Stache moves it back to that area automatically.

## See what is currently out

The **Out** page lists items marked Out or Lent, their usual storage area, and how long they have been away. It is intentionally a quiet list rather than a set of overdue warnings.

<picture>
  <source srcset="/shots/out-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots/out.webp" alt="The Out page listing items that are away or lent" width="300" />
</picture>

## Set up optional reminders

If you want reminders, open **Settings → AI & Automation → Out reminders** and configure a digest. Stache can send one combined webhook message to services such as ntfy, Discord, or Home Assistant. You can choose a daily time or trigger the digest externally.

Reminders are grouped rather than sent as separate messages for every item. You can snooze reminders for individual items.

The digest and inbox can also include low-stock items and warranties that are approaching their expiration date. These are surfaced as useful reminders, not urgent alerts.

## Connect Home Assistant

The [Stache HACS integration](/docs/extras/ha-sensors/) provides sensors for items out, unaccounted items, low stock, and warranties that are expiring. You can use those sensors in your own Home Assistant dashboards and automations.
