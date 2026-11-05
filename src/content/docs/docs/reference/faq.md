---
title: Troubleshooting and FAQ
description: Answers to common questions and practical first checks when Stache is not behaving as expected.
---

## Installation and storage

### Why SQLite instead of Postgres or MySQL?

Stache uses an embedded SQLite database so it can run as one application without a separate database service. The database, photos, and model files live together under `/data`, which makes deployment and backup straightforward.

### Where is my inventory stored?

In the persistent data directory mounted at `/data`. It contains the database, photos, downloaded AI models, and scheduled backups. Make sure the volume or appdata mapping is persistent before adding inventory.

### Can I move Stache to another host?

Stop the application, make a complete backup of its data directory, move that data to the new host, and mount it at the same location. Keep a copy of the original until you have confirmed the new instance works.

## Browser and mobile

### Does the camera work over `http://<lan-ip>:8080`?

Not fully. Browsers require a secure context for live camera access. HTTPS and localhost qualify; a plain HTTP LAN address generally does not. In that case, photo capture falls back to the file picker. Use HTTPS or Home Assistant ingress for the full experience.

### Is there a mobile app?

Stache is a progressive web app. Open it in your phone's browser and use the browser's **Add to Home Screen** option. Offline actions can be queued locally and synchronized when the server is reachable again. Features that require an external service or network lookup need connectivity.

### Why is a feature unavailable on my phone?

Check that you are using the HTTPS address, not a plain HTTP LAN address. Camera, clipboard, and installable/offline PWA capabilities depend on the browser's secure-context rules.

## AI and performance

### Do I need to configure AI?

No. Built-in recognition is available by default and makes suggestions in the background. You decide whether to accept or edit them; it does not silently replace item details. You can turn AI off in Settings or set `STACHE_ML_LEVEL=0`.

### How much memory does Stache use?

The application idles at roughly 200 MB in the documented setup. Photo-similarity and recognition models load on demand and increase memory use; the warm footprint depends on the selected model and workload. Set `STACHE_ML_LEVEL=0` on constrained hosts if needed.

## Accounts and privacy

### Can anyone sign up?

The first account is created during initial setup. After that, household accounts are created by logged-in members from **Settings → Household**.

### What can an MCP connection see?

MCP connections can access shared household items. Private items are excluded. Each connection has its own URL and bearer token, and can be configured as read-only or read-write.

## Troubleshooting checklist

1. **Check the app is running.** For Docker, use `docker ps` and `docker logs <container-name>`. In Home Assistant, open the add-on's **Log** tab.
2. **Check the health endpoint.** From a machine that can reach Stache, open `http://<host>:8080/api/health` (adjust the host and port).
3. **Check persistent storage.** Confirm the configured data directory is mounted and writable. Do not remove or recreate the volume as a troubleshooting shortcut; it contains your inventory.
4. **Check proxy settings.** If Stache is behind a reverse proxy, verify `STACHE_BASE_URL` and only enable `STACHE_TRUST_PROXY=1` when requests pass through that trusted proxy.
5. **Check available memory and model settings.** On small hosts, disable ML temporarily with `STACHE_ML_LEVEL=0` to see whether model memory is involved.

If the problem persists, collect the Stache version, deployment type, relevant logs, and steps to reproduce it. Remove bearer tokens, passwords, and private inventory details before sharing logs in the [GitHub issue tracker](https://github.com/GraphicHealer/Stache/issues).
