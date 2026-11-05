---
title: Install with Docker
description: Run Stache with Docker Compose using one container and one persistent data volume.
---

Docker is the general-purpose way to run Stache. The application, SQLite database, photos, and AI model cache are all stored together. You do not need a separate database container.

## What you need

- Docker Engine installed on the host.
- The Docker Compose plugin. Confirm it is available with `docker compose version`.

## Create the Compose file

Create a directory for Stache and save the following as `compose.yml`:

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

The named `data` volume is important: it keeps your inventory when the container is updated or recreated. The `TZ` setting controls the time zone used for scheduled digests.

## Start Stache

From the directory containing `compose.yml`, run:

```sh
docker compose pull
docker compose up -d
```

Open `http://<host>:8080`, replacing `<host>` with the address of your Docker machine. Create the first household account, then open **Labels** to print your first batch of QR labels.

You can check that the application is responding with:

```sh
curl localhost:8080/api/health
```

## Plan for memory use

The application uses roughly **200 MB** while idle in the documented setup. Photo-similarity search (CLIP) loads lazily when first needed; once warm, memory use is around **450–550 MB**. The selected built-in AI model uses additional memory and downloads into the persistent data volume.

On a very small host, set `STACHE_ML_LEVEL=0` to disable machine learning entirely. The older `STACHE_NO_ML=1` setting is also supported. Adding items, organizing areas, and ordinary text search continue to work.

## Understand the plain HTTP limitation

The live camera viewfinder, clipboard copy buttons, and offline PWA features require a [secure browser context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). Localhost qualifies, but a plain LAN address such as `http://192.168.x.x` does not.

Stache still works over `http://<lan-ip>:8080`; photo capture falls back to the browser's file picker. For the full experience, put Stache behind HTTPS using a reverse proxy such as Caddy or Nginx Proxy Manager, a Tailscale certificate, or your Home Assistant ingress URL.

If you use a reverse proxy, also set `STACHE_BASE_URL` and `STACHE_TRUST_PROXY=1` so Stache can generate correct public links and use the forwarded client information. See [Configuration](/docs/reference/configuration/).

## Update Stache

From the directory containing your Compose file, run:

```sh
docker compose pull
docker compose up -d
```

Database migrations are applied automatically when the application starts.

## Back up your inventory

The database, photos, and model cache are all stored in the `data` volume. Back up that persistent volume to protect your inventory. See [Backups and restore](/docs/extras/backups/) for the archive command and built-in backup options.
