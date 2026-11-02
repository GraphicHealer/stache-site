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

**Built-in (local)** — pick a model in **Settings → AI suggestions**; it downloads into `/data/models` on first use (with live progress) and runs offline after that. Nothing leaves your network. Three levels:

| Model | Size | Notes |
|-------|------|-------|
| Florence-2 | ~400 MB | Light and fast — fixed-task captioning/OCR/detection |
| LFM2.5-VL 450M | ~700 MB | **Default.** Reads your item names as context, so suggestions match your naming style |
| Moondream2 | ~2 GB | Biggest, best quality — for hosts with headroom |

Switching models deletes the old one shortly after the new one is ready. `STACHE_ML_LEVEL` sets the starting level (`0`–`3`); the Settings picker overrides it and persists.

**Remote** — any OpenAI-compatible `/chat/completions` endpoint with a vision model: Ollama, LM Studio, or a hosted provider. This is an upgrade path, not a requirement — handy if you already run a stronger model. Photos a remote provider processes do leave your server, but **private items are never sent**.

Configure in **Settings → AI suggestions**. The compose file already maps `host.docker.internal` to your Docker host, so a service running outside the container (e.g. Ollama at `http://host.docker.internal:11434/v1`) is reachable at that address.

## Turning it off

Prefer no AI at all? Turn it off in **Settings → AI suggestions**, or set `STACHE_ML_LEVEL=0` (`STACHE_NO_ML=1` works too) to disable ML entirely on constrained hosts — everything else keeps working.

## Resource notes

- CLIP (photo similarity) loads lazily on first embed — ~200 MB idle becomes ~450–550 MB warm.
- AI is non-blocking: filing works with no models loaded, and failures land in the Review queue for a one-tap retry.
