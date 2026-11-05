---
title: AI suggestions
description: Let Stache suggest names and details for photos while keeping you in control of what gets saved.
---

Stache's built-in image recognition is enabled by default. When you add a photo, it can suggest a name, description, and tags in the background. These are suggestions, not automatic edits: **you decide what becomes part of the item's saved information**.

You can use the built-in models without configuring an outside AI service.

## What recognition can do

- Suggest names, descriptions, and tags for new item photos.
- Read text in images, such as product labels, serial numbers, and receipts.
- Suggest splitting a photo of several objects into separate items for you to review.
- Create local image representations (CLIP embeddings) that make search-by-photo possible.

Recognition runs in the background. You can continue adding and organizing items while it works. If a recognition attempt fails, the item appears in the Review queue, where you can retry it.

## Choose a built-in model

Open **Settings → AI suggestions** to select a local model. Stache downloads the model into `/data/models` the first time it is needed. After the download, it runs on the Stache host without sending photos to an outside provider.

| Model | Download size (approx.) | What to expect |
|---|---:|---|
| Florence-2 | 400 MB | Lightweight and fast; supports captioning, text reading, and object detection for defined tasks. |
| LFM2.5-VL 450M | 700 MB | Default model. It can use item names as context, helping suggestions follow your naming style. |
| Moondream2 | 2 GB | Larger model intended for hosts with more available memory. |

Changing models removes the old model shortly after the replacement is ready. The Settings model picker takes precedence over the starting level set with an environment variable.

## Connect an external provider

You can also connect an OpenAI-compatible `/chat/completions` endpoint that supports image input. Examples include Ollama, LM Studio, and hosted providers. This is optional; it can be useful if you already run a model that gives you better results.

Configure the provider in **Settings → AI suggestions**. If the provider runs on the Docker host rather than inside the Stache container, the supplied Compose example maps `host.docker.internal` to the host. For example, an Ollama endpoint may be reachable at `http://host.docker.internal:11434/v1`.

:::caution[Photos sent to remote providers]
A remote provider receives the photos it processes, so those photos leave your Stache server. Private items are never sent to a configured remote AI provider.
:::

## Turn recognition off

To disable machine-learning features, use **Settings → AI suggestions**, or set `STACHE_ML_LEVEL=0`. The older `STACHE_NO_ML=1` setting is also supported. Items, areas, labels, and ordinary text search continue to work.

## Understand memory use

The application uses roughly 200 MB while idle in the documented setup. CLIP loads when it is first needed and can bring memory use to approximately 450–550 MB. The selected recognition model adds its own memory requirements.

If Stache runs on a small server, choose a lighter model or disable machine learning. Filing and organizing items do not depend on recognition being available.
