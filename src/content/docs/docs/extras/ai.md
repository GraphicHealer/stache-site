---
title: AI suggestions
description: Optional, offline-capable AI that suggests — never overwrites.
---

AI is **off by default** and Stache is fully usable without it. When enabled, it works in the background and only ever *suggests* — nothing is written to your item's real fields without your confirmation.

## What it does

- **Suggests names, descriptions, and tags** for new photos
- **Reads text** in photos (labels, serials, receipts)
- **Split pile** — breaks a photo of many things into separate items you approve
- **Visual similarity** — CLIP embeddings power search-by-photo (in-process, local)

## Providers

**Built-in (local)** — bundled Florence-2, runs offline after a one-time ~700 MB download into `/data` on first use. Nothing leaves your network.

**Remote** — any OpenAI-compatible `/chat/completions` endpoint with a vision model:

- Ollama: `http://host.docker.internal:11434/v1`
- LM Studio, or a hosted provider

The compose file already maps `host.docker.internal` to your Docker host, so a service running outside the container is reachable at that address.

Configure in **Settings → AI suggestions**.

## Resource notes

- CLIP (photo similarity) loads lazily on first embed — ~200 MB idle becomes ~450–550 MB warm.
- On constrained hosts, `STACHE_NO_ML=1` disables ML entirely; everything else keeps working.
- AI is non-blocking: filing works with no models loaded, and failures land in the Review queue for a one-tap retry.
