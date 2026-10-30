---
title: Household members
description: Shared inventory by default, per-item private toggle.
---

Stache is built for a household: the inventory is **shared by default**, and everyone with an account sees the same bins.

## Accounts

The first signup is open — that person becomes admin. After that, accounts are created by logged-in members (Settings → Household): you create the account and hand over the credentials. There's no public registration to leave open on the internet.

## Private items

Any item can be marked **private** — visible only to its owner. Everything else is shared with the household.

Private items are also excluded from what external connections can see (MCP tools only ever see shared items).

## Audit trail

Every change is an event with an actor — who filed it, who moved it, who marked it out — visible in each item's history. Undo respects ordering: if a newer change exists on the same thing, Stache tells you to undo that first.
