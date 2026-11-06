---
title: MCP connections
description: Connect AI assistants to Stache using the Model Context Protocol.
---

Stache can make your inventory available to AI assistants through **MCP** (Model Context Protocol). This lets an assistant answer questions such as "Where is my soldering iron?" or, if you grant write access, help file an item.

MCP is off until you create a connection. Stache has two kinds:

- **My personal connections** - yours. A personal connection can see the shared inventory *plus your own private items*. Anyone in the household can create one.
- **Household connections** - shared integrations managed by an admin. These see *shared items only* - never anyone's private items.

Both live in **Settings → Connections & Integrations**.

Each connection can be revoked independently, at any time.

<picture>
  <source srcset="/shots/mcp-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots/mcp.webp" alt="Settings → Connections & Integrations showing a household connection with its MCP URL" width="300" />
</picture>

## Create a personal connection

1. Open **Settings → Connections & Integrations → My personal connections**.
2. Name the connection (for example, "Claude" or "ChatGPT").
3. Choose the access level - **Read only** or **Read + write**.
4. Stache shows the connection's **endpoint URL** and a **bearer token**. The token is shown once - store it like a password.
5. Configure your AI client with the endpoint and token (copyable snippets are provided for Claude Desktop, Claude Code, ChatGPT, Cursor, and VS Code).

A personal connection can see everything you can: shared items and your private items. It can never see another household member's private items - even if you are an admin, the connection is not.

## What a connection can do

Read-only connections can search and inspect inventory. Read-write connections can also file, move, and update items.

The available tools cover searching items, listing areas, viewing area contents, getting item details, moving items, resolving a QR label, adding an item, and updating an item.

Changes made through MCP are recorded with an actor such as `mcp:<name>`. They follow the same history and undo behavior as changes made in the Stache interface.

## Shared integrations

The admin-managed **Household connections** are for integrations that belong to the whole household - Home Assistant, external scripts, or a shared assistant. They always see shared items only, regardless of who created them.

Create a separate connection for each assistant or service so access can be revoked independently.

:::caution
Treat the endpoint URL and token as credentials. Revoke a connection the moment you stop trusting the client holding it.
:::
