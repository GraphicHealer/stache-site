---
title: MCP connections
description: Connect AI assistants to shared Stache inventory data using the Model Context Protocol.
---

Stache can make your inventory available to AI assistants through **MCP** (Model Context Protocol). This lets an assistant answer questions such as "Where is my soldering iron?" or, if you grant write access, help file an item.

MCP is off until you create a connection. Manage connections in **Settings → MCP connections**. Each connection can be revoked independently.

## Create a connection

Each connection has its own:

- **URL**, using the `/mcp/<slug>` path.
- **Bearer token**, separate from the URL slug. You can revoke the token independently.
- **Access scope**, either read-only or read-write.

Treat the URL and token as credentials. Only share them with the assistant or service that should have access.

## Choose what the assistant can do

Read-only connections can search and inspect shared inventory information. Read-write connections also register tools for adding and updating items.

The available tools cover searching items, listing areas, viewing area contents, getting item details, moving items, resolving a QR label, adding an item, and updating an item. For example, an assistant can find an item's storage area, file an item into a known area, or update its status.

Changes made through MCP are recorded with an actor such as `mcp:<slug>`. They follow the same history and undo behavior as changes made in the Stache interface.

## Understand privacy boundaries

:::caution
MCP connections can access **shared items only**. Private items are never exposed, regardless of whether a connection is read-only or read-write.
:::

Create a separate connection for each assistant or service. If a connection is no longer needed, revoke it in **Settings → MCP connections**.

## Make Stache reachable outside your network

An assistant hosted outside your home network needs a route to your Stache server. Put Stache behind an HTTPS reverse proxy and configure `STACHE_BASE_URL` to its public address so generated links use the correct origin.

See the [Docker installation guide](/docs/getting-started/docker/) for reverse-proxy and HTTPS notes, and [Configuration](/docs/reference/configuration/) for the related environment variables.
