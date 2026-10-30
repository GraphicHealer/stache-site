---
title: MCP connections
description: Let ChatGPT, Claude, and other assistants answer "where is my soldering iron?"
---

Stache can expose your inventory to AI assistants over **MCP** (Model Context Protocol). Off by default — you create each connection yourself in **Settings → MCP connections**, and every connection is individually revocable.

## How it works

Each connection gets:

- its own URL — `/mcp/<slug>`
- its own **bearer token** (separate from the URL slug — revoke either independently)
- a scope: **read** or **read-write**

Write-capable connections get `add_item` (file an item — resolves the area by id, label, or name) and `update_item` (fields and status — same undo semantics as the UI). Read-only connections simply don't have the write tools registered.

## What assistants can do

Eight tools in total: search, list areas, get contents, item details, move items, resolve a label, add item, update item. Enough for "where is my soldering iron," filing receipts, or logging things by voice.

Writes through MCP are attributed (`actor = mcp:<slug>`) and undoable like everything else.

:::caution
MCP sees **shared items only** — private items are never exposed, regardless of connection scope.
:::

## Exposing externally

To reach an assistant over the internet, front Stache with HTTPS (see the note on the [Docker](/docs/getting-started/docker/) page) and set `STACHE_BASE_URL` so generated links carry the public origin.
