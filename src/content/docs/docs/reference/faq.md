---
title: FAQ
description: Common questions about running and using Stache.
---

## Why SQLite and not Postgres/MySQL?

Portability. Embedded SQLite means a single container with no database service — the whole app state is one folder, which is what makes it work as a Home Assistant add-on, on Unraid, or on a Pi. Backup is copying a directory.

## Does the camera work over `http://<lan-ip>:8080`?

Partially. Browsers only allow the live viewfinder in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) — `localhost` and HTTPS count, `http://192.168.x.x` doesn't. Over plain HTTP, photo capture falls back to the file picker and everything else still works. For the full experience use HTTPS, the HA ingress URL, or `localhost`.

## How much RAM does it need?

~200 MB idle. Photo similarity (CLIP) loads lazily on first use and brings it to ~450–550 MB warm. `STACHE_NO_ML=1` disables embeddings on tiny hosts; everything else keeps working.

## Do I need the AI stuff?

No — it's off by default. Filing, searching, labels, out-tracking all work with no models downloaded. AI is a layer that *suggests* names/tags/descriptions; you confirm everything. See [AI suggestions](/docs/extras/ai/).

## Is there a mobile app?

Stache is a PWA — open it on your phone and "Add to Home Screen." It works offline too: photos and scans queue locally and sync when you're back in signal.

## How do backups work?

Everything lives in `/data` — copy it and you're backed up. There's also an optional built-in scheduler. See [Backups](/docs/extras/backups/).

## Can other people sign up?

Only the first account is open signup. After that, accounts are created by logged-in members (Settings → Household) — there's no public registration to accidentally expose.

## What can an MCP connection see?

Shared items only — private items are never exposed. Connections are individually revocable and can be read-only. See [MCP connections](/docs/extras/mcp/).

## Something's broken — where are the logs?

`docker logs` on the container (or the add-on's Log tab in Home Assistant). Issues go to the [GitHub tracker](https://github.com/GraphicHealer/Stache/issues).
