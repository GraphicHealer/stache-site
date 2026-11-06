---
title: Security and access
description: Understand household accounts, private items, external connections, and secure access to your Stache server.
---

Stache is self-hosted: you control the machine and storage that hold your inventory. You are also responsible for protecting the host, network access, backups, and any external connections you enable.

## Household accounts

The first account created during setup becomes the household administrator. Public signup is closed after that; logged-in household members create additional accounts from **Settings → Household & Account**.

Use individual accounts instead of sharing one login. This makes item history attributable to the person who made a change.

## Shared and private items

Items are shared with the household by default. You can mark an item private so that only its owner can see it.

Private items are excluded from external MCP access and are not sent to a configured remote AI provider. See [Household members and privacy](/docs/using/household/) for details.

## Protect external connections

MCP connections and webhooks are optional. Treat their URLs, tokens, and credentials like passwords:

- Create a separate connection for each assistant or service.
- Use read-only access unless a connection genuinely needs to make changes.
- Store bearer tokens securely and revoke or rotate them if they are exposed.
- Use HTTPS when connecting from outside your trusted local network.

MCP connections operate on shared inventory, not private items. Changes made through supported write tools can be undone in Stache.

## Use HTTPS and configure reverse proxies carefully

Use HTTPS when accessing Stache from other devices, especially when connecting over the internet. Browsers restrict camera access, clipboard access, and installable PWA behavior on insecure origins. A plain HTTP LAN address may therefore fall back to file selection for photos.

When Stache is behind a reverse proxy, configure its public base URL. Only enable proxy trust when requests actually pass through a reverse proxy you control. See [Configuration](/docs/reference/configuration/) for the relevant environment variables.

## Protect the data directory

The persistent data directory contains the SQLite database, photos, and downloaded models. Restrict host-level access to it and include it in your backup plan. Anyone with unrestricted access to the host or its storage may be able to access the inventory data.

Scheduled backup files are not encrypted, so protect them as carefully as the live data. See [Backups and restore](/docs/extras/backups/).
