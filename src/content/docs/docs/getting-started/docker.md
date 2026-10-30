---
title: Install with Docker
description: Run Stache with Docker Compose — one container, no database service.
---

Stache is a single container. The embedded SQLite database, photos, and AI model cache all live in one `data` volume — there's no database service to run alongside it.

## Requirements

- Docker with the Compose plugin (`docker compose version`)

## Compose file

```yaml
services:
  app:
    image: ghcr.io/graphichealer/stache:latest
    restart: unless-stopped
    environment:
      PORT: 8080
      DATA_DIR: /data
      TZ: ${TZ:-UTC}   # digest "time" setting uses this timezone
    volumes:
      - data:/data   # SQLite db + photos + model cache all live here
    ports:
      - "8080:8080"
    # Lets the AI provider URL reach services on the Docker host
    # (e.g. Ollama at http://host.docker.internal:11434/v1).
    extra_hosts:
      - "host.docker.internal:host-gateway"

volumes:
  data:
```

## Start

```sh
docker compose pull
docker compose up -d
```

Open `http://<host>:8080`, create the first household account, then head to **Labels** to print your first batch.

Verify it's healthy:

```sh
curl localhost:8080/api/health
```

## Memory

The app idles around **200 MB**. Photo-similarity search (CLIP) loads lazily on the first photo upload or search — once warm the app sits around **450–550 MB**. On very small hosts, set `STACHE_NO_ML=1` to disable embeddings entirely; everything else keeps working.

## One caveat on plain HTTP

The live camera viewfinder, clipboard copy buttons, and offline PWA features need a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) — `localhost` counts, `http://192.168.x.x` does not. Over `http://<lan-ip>:8080` the app still works (photo capture falls back to the file picker), but for the full experience front it with HTTPS: a reverse proxy like Caddy or Nginx Proxy Manager, a Tailscale cert, or your Home Assistant ingress URL.

If you do proxy it, also set `STACHE_BASE_URL` (and `STACHE_TRUST_PROXY=1` so client IPs survive the hop) — see [Configuration](/docs/reference/configuration/).

## Updating

```sh
docker compose pull && docker compose up -d
```

Migrations apply automatically at boot.

## Backups

Everything lives in the `data` volume — backing up Stache is backing up that one folder. See [Backups](/docs/extras/backups/) for the built-in scheduler.
