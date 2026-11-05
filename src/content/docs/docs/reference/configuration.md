---
title: Configuration reference
description: Environment variables, persistent storage locations, and reverse-proxy settings.
---

Most day-to-day options are configured inside Stache under **Settings**. This includes AI providers, printers, MCP connections, digest webhooks, and the backup schedule.

The environment variables below control how the application starts and connects to its storage or network environment.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Port used by the web application. |
| `HOST` | `0.0.0.0` | Network address the application listens on inside the container. |
| `DATA_DIR` | `/data` | Directory containing the database, photos, and model cache. |
| `DB_PATH` | `$DATA_DIR/stache.db` | Path to the SQLite database file. |
| `TZ` | `UTC` | Time zone used for digest scheduling. |
| `BETTER_AUTH_SECRET` | Auto-generated | Secret used for authentication sessions. When omitted, it is generated and persisted in the database settings. |
| `STACHE_ML_LEVEL` | `2` | Local ML setting: `0` off, `1` Florence-2, `2` LFM2.5-VL (default), `3` Moondream2. |
| `STACHE_NO_ML` | Unset | Legacy alias; setting it to `1` is equivalent to `STACHE_ML_LEVEL=0`. |
| `STACHE_SETUP_TOKEN` | Unset | If configured, the first account signup must provide this token. |
| `STACHE_BASE_URL` | Unset | Public URL used for authentication callbacks and generated label or digest links when behind a proxy. |
| `STACHE_TRUSTED_ORIGINS` | Unset | Comma-separated list of additional origins allowed to call the authentication API. |
| `STACHE_TRUST_PROXY` | Unset | Set to `1` when requests arrive through a trusted reverse proxy and forwarded headers should be used. |

## What's stored in `/data`?

| Data | Location |
|---|---|
| SQLite database | `/data/stache.db` |
| Original photos and thumbnails | `/data/photos/` |
| Downloaded AI models | `/data/models/` |
| Scheduled backups | `/data/backups/` |

Mount this directory on persistent storage. If the container is removed and the directory was not persisted, the inventory stored inside it may be lost.

The container runs as the non-root `node` user. Its entrypoint prepares `/data` so the application can write to it before running as that user. This also accommodates Home Assistant's add-on data directory, which may initially be owned by root.

## Run behind a reverse proxy

If you publish Stache through a reverse proxy, set its public URL and tell Stache to trust the proxy's forwarded headers:

```sh
STACHE_BASE_URL=https://stache.example.com
STACHE_TRUST_PROXY=1
```

If the application is available from more than one origin, list the additional trusted origins as a comma-separated value:

```sh
STACHE_TRUSTED_ORIGINS=https://stache.lan,https://stache.example.com
```

Only enable proxy trust when requests actually pass through a proxy you control.

HTTPS also enables browser features that are restricted on insecure origins, including the live camera viewfinder, clipboard buttons, and full progressive-web-app offline behavior. See the [Docker installation guide](/docs/getting-started/docker/) for more about the browser's secure-context requirement.
