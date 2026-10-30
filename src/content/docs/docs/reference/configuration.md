---
title: Configuration
description: Environment variables and where everything lives.
---

Almost everything is configured in the app's **Settings** page — AI provider, printers, MCP connections, digest webhooks, backup schedule. The environment variables below are the few things needed at the container level.

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8080` | Web port |
| `HOST` | `0.0.0.0` | Bind address |
| `DATA_DIR` | `/data` | SQLite db + photos + AI model cache |
| `DB_PATH` | `$DATA_DIR/stache.db` | SQLite file location |
| `TZ` | `UTC` | Digest schedule timezone |
| `BETTER_AUTH_SECRET` | auto-generated | Session secret (persisted in the DB's settings) |
| `STACHE_NO_ML` | unset | `1` disables CLIP embeddings / photo similarity |
| `STACHE_SETUP_TOKEN` | unset | If set, the first sign-up requires this token |
| `STACHE_BASE_URL` | unset | Public origin for auth callbacks and label/digest links when behind a proxy |
| `STACHE_TRUSTED_ORIGINS` | unset | Comma-separated extra origins allowed to call the auth API |
| `STACHE_TRUST_PROXY` | unset | `1` to trust `X-Forwarded-*` headers from your reverse proxy |

## Layout of `/data`

| What | Where |
|------|-------|
| SQLite database | `/data/stache.db` |
| Photos + thumbnails | `/data/photos/` |
| AI model cache | `/data/models/` |
| Scheduled backups | `/data/backups/` |

The container runs as a non-root `node` user; the entrypoint makes sure `/data` stays writable. (Home Assistant mounts add-on data root-owned — this is why the entrypoint exists.)

## Behind a reverse proxy

```sh
STACHE_BASE_URL=https://stache.example.com
STACHE_TRUST_PROXY=1
# extra origins, only if you serve the app from multiple hosts:
# STACHE_TRUSTED_ORIGINS=https://stache.lan,https://stache.example.com
```

HTTPS also unlocks the live camera viewfinder, clipboard buttons, and full PWA offline — see the note on the [Docker](/stache-site/docs/getting-started/docker/) page.
