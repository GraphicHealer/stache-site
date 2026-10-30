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

Copy the template from the repository onto your flash drive's user-template folder, then install from the Docker tab:

1. Copy `unraid/my-stache.xml` to `/boot/config/plugins/dockerMan/templates-user/my-stache.xml`
   (e.g. `cp my-stache.xml /boot/config/plugins/dockerMan/templates-user/` over SSH, or drop it on the `flash` share at `config/plugins/dockerMan/templates-user/`).
   Keep the `my-` prefix — dockerMan treats user templates without it badly.
2. **Docker** tab → **Add Container** → the **Template** dropdown now lists **Stache**. Pick it, adjust the port/appdata if needed, Apply.
3. Open the WebUI on port 8080.

Alternatively, fill the fields by hand in **Add Container**:

- **Repository:** `ghcr.io/graphichealer/stache:latest`
- **Network:** bridge
- **Port:** `8080`
- **Path:** `/mnt/user/appdata/stache` → `/data` (RW)
- **Variable:** `TZ` (your timezone)
- **Extra Parameters:** `--add-host=host.docker.internal:host-gateway` (lets the optional AI provider URL reach services on the Unraid host, e.g. Ollama at `http://host.docker.internal:11434/v1`)

## Notes

- The container runs as a non-root user; the entrypoint makes sure `/data` is writable before dropping privileges.
- Same plain-HTTP caveat as everywhere: the live camera viewfinder wants HTTPS — see the note on the [Docker](/stache-site/docs/getting-started/docker/) page.
