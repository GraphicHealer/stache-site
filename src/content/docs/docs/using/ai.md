---
title: AI suggestions
description: Built-in recognition that suggests names, tags, and details — never overwrites.
---

AI recognition is **on by default** — no setup needed. New photos get suggested names, descriptions, and tags in the background. It only ever *suggests*: nothing lands in an item's real fields without your confirmation.

## What it does

- **Suggests names, descriptions, and tags** for new photos
- **Reads text** in photos (labels, serials, receipts)
- **Split pile** — breaks a photo of many things into separate items you approve
- **Visual similarity** — CLIP embeddings power search-by-photo (in-process, local)

## Providers

**Built-in (local)** — bundled Florence-2, runs offline after a one-time ~400 MB download into `/data` on first use. Nothing leaves your network.

**Remote** — any OpenAI-compatible `/chat/completions` endpoint with a vision model: Ollama, LM Studio, or a hosted provider. This is an upgrade path, not a requirement — handy if you already run a stronger model. Photos a remote provider processes do leave your server, but **private items are never sent**.

Configure in **Settings → AI suggestions**. The compose file already maps `host.docker.internal` to your Docker host, so a service running outside the container (e.g. Ollama at `http://host.docker.internal:11434/v1`) is reachable at that address.

## Turning it off

Prefer no AI at all? Turn it off in **Settings → AI suggestions**, or set `STACHE_NO_ML=1` to disable ML entirely on constrained hosts — everything else keeps working.

## Resource notes

- CLIP (photo similarity) loads lazily on first embed — ~200 MB idle becomes ~450–550 MB warm.
- AI is non-blocking: filing works with no models loaded, and failures land in the Review queue for a one-tap retry.
