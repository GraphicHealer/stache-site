---
title: Install on Unraid
description: Run Stache on Unraid — single container, single appdata folder.
---

Stache is a single container — no database service, no companion containers. Everything (SQLite database, photos, AI model cache) lives in one appdata folder, so backups are just backing up `/mnt/user/appdata/stache`.

## Install

### Community Applications (once listed)

1. **Apps** tab, search **Stache**, install.
2. Open **WebUI** (port 8080), create the first household account.
3. Go to **Labels** to print your first QR batch.

### Manual install

Fetch the template straight into Unraid's user-template folder over SSH:

```sh
wget -O /boot/config/plugins/dockerMan/templates-user/my-stache.xml \
  https://raw.githubusercontent.com/GraphicHealer/Stache/main/unraid/my-stache.xml
```

Or drop `unraid/my-stache.xml` on the `flash` share at `config/plugins/dockerMan/templates-user/` by hand. Either way, keep the `my-` prefix — dockerMan treats user templates without it badly.

Then:

1. **Docker** tab → **Add Container** → the **Template** dropdown now lists **Stache**. Pick it, adjust the port/appdata if needed, Apply.
2. Open the WebUI on port 8080.

Alternatively, fill the fields by hand in **Add Container**:

- **Repository:** `ghcr.io/graphichealer/stache:latest`
- **Network:** bridge
- **Port:** `8080`
- **Path:** `/mnt/user/appdata/stache` → `/data` (RW)
- **Variable:** `TZ` (your timezone)
- **Extra Parameters:** `--add-host=host.docker.internal:host-gateway` (lets the optional AI provider URL reach services on the Unraid host, e.g. Ollama at `http://host.docker.internal:11434/v1`)

## Configuration

| Setting | Default | Notes |
|---------|---------|-------|
| WebUI port | `8080` | Remap freely — nothing else depends on it |
| `/data` path | `/mnt/user/appdata/stache` | DB + photos + models. Back this up |
| `TZ` | `UTC` | Digest "time of day" uses this |
| `BETTER_AUTH_SECRET` | auto | Optional; persisted in the db if blank |
| `STACHE_ML_LEVEL` | `2` | `0` disables ML, `1` Florence-2, `2` LFM2.5-VL (default), `3` Moondream2 |
| `STACHE_BASE_URL` | unset | Public `https://` URL behind a reverse proxy — enables Secure cookies and fixes label/webhook links |
| `STACHE_TRUST_PROXY` | unset | `1` behind a reverse proxy so real client IPs are trusted |

The full variable list lives on the [Configuration](/docs/reference/configuration/) page.

## Notes

- The container runs as a non-root user; the entrypoint makes sure `/data` is writable before dropping privileges.
- **Memory:** ~200 MB idle, ~450–550 MB once the AI models are warm. `STACHE_ML_LEVEL=0` skips them entirely.
- **Updates:** Unraid's normal container update flow. Tagged releases (`ghcr.io/graphichealer/stache:0.5.0` etc.) exist if you prefer pinning.
- Same plain-HTTP caveat as everywhere: the live camera viewfinder wants HTTPS — see the note on the [Docker](/docs/getting-started/docker/) page.
