---
title: Security and access
description: Understand household accounts, private items, external connections, and secure access.
---

Stache is designed to be self-hosted. You control the machine and storage that hold your inventory. That also means you are responsible for protecting the host, network access, backups, and any external connections you enable.

## Accounts

The first account created during initial setup becomes the household administrator. Public signup is not left open for subsequent accounts; logged-in household members create accounts from **Settings → Household**.

Use individual accounts rather than sharing one login. This keeps item history attributable to the person who made a change.

## Shared and private items

Items are shared with the household by default. An item can be marked private so that only its owner can see it. Private items are excluded from external MCP access and are not sent to a configured remote AI provider.

See [Household members](/docs/using/household/) for the user-facing behavior.

## External connections

MCP connections and webhooks are optional. Treat their credentials like passwords:

- Give each connection only the access it needs.
- Use read-only access unless an integration genuinely needs to make changes.
- Store bearer tokens securely and rotate them if they are exposed.
- Use HTTPS when connecting from outside your trusted local network.

MCP tools operate on shared inventory, not private items. Changes made through supported write tools can be undone in Stache.

## HTTPS and reverse proxies

Use HTTPS when accessing Stache from other devices. Browsers restrict camera access, clipboard access, and installable PWA behavior on insecure origins; plain HTTP on a LAN IP may therefore fall back to file selection for photos.

When Stache is behind a reverse proxy, configure its public base URL and only enable proxy trust when requests actually pass through a trusted proxy. See [Configuration](/docs/reference/configuration/) for the relevant variables.

## Protect the data directory

The persistent data directory contains the SQLite database, photos, and downloaded models. Restrict host-level access to it and include it in your backup plan. Anyone with unrestricted access to the host or its storage may be able to access the inventory data.

For recovery planning, see [Backups and restore](/docs/extras/backups/).
