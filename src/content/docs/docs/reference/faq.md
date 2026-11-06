---
title: Troubleshooting and FAQ
description: Answers to common questions and a practical checklist for diagnosing problems.
---

Use this page for quick answers and first troubleshooting steps. If you cannot resolve an issue, collect the Stache version, installation type, relevant logs, and the steps that reproduce the problem before opening an issue.

## Installation and storage

### Does Stache need a separate database server?

No. Stache uses SQLite, an embedded database. The application, database, photos, and model files are kept together, so you do not need to install or maintain PostgreSQL or MySQL.

### Where is my inventory stored?

Your persistent data directory is mounted at `/data` inside the container. It contains the SQLite database, photos, downloaded AI models, and scheduled backups. Make sure the volume or appdata mapping is persistent before you add inventory.

### Can I move Stache to another host?

Yes. Stop the application, make a complete backup of its data directory, move the data to the new host, and mount it at `/data`. Keep the original copy until you have confirmed the new instance works. See [Backups and restore](/docs/extras/backups/).

## Browser and mobile

### Why does the camera not open at my LAN address?

Browsers require a secure context for live camera access. HTTPS and localhost qualify; a plain HTTP address such as `http://192.168.1.20:8080` generally does not. Stache still works, but photo capture falls back to the file picker. Use HTTPS or Home Assistant ingress for the full camera experience.

### Is there a mobile app?

Stache is a progressive web app (PWA). Open it in your phone's browser and use the browser's **Add to Home Screen** option. This installs a home-screen shortcut with an app-like experience.

Some offline actions can be queued locally and synchronized when the server is reachable again. Features that require an external service or network lookup still need connectivity.

### Why is a feature unavailable on my phone?

First, check that you opened Stache over HTTPS rather than a plain HTTP LAN address. Camera, clipboard, and installable/offline PWA features depend on the browser's secure-context rules. Also check that your browser supports the feature and has permission to use it.

## AI and performance

### Do I have to configure an AI provider?

No. Built-in recognition is available by default and suggests names, descriptions, and tags in the background. You decide whether to accept or edit suggestions; they do not silently replace item details. You can turn AI off in Settings or set `STACHE_ML_LEVEL=0`.

### How much memory does Stache use?

The application uses roughly 200 MB while idle in the documented setup. Photo similarity and recognition models load on demand and increase memory use. The final footprint depends on the selected model and workload. On a constrained host, set `STACHE_ML_LEVEL=0` to disable machine learning.

## Accounts and privacy

### Can anyone create an account?

The first account is created during initial setup. After that, a logged-in household member creates additional accounts from **Settings → Household & Account**. Public registration is not left open.

### What can an MCP connection see?

MCP connections can access shared household items. Private items are excluded. Each connection has its own URL and bearer token, and can be configured as read-only or read-write.

## Troubleshooting checklist

Try these checks before changing or deleting anything:

1. **Confirm the application is running.** For Docker, run `docker ps` and `docker logs <container-name>`. In Home Assistant, open the add-on's **Log** tab.
2. **Check the health endpoint.** From a machine that can reach Stache, open `http://<host>:8080/api/health`. Replace the host and port with the values for your installation.
3. **Check persistent storage.** Confirm the configured data directory is mounted and writable. Do not remove or recreate the volume as a troubleshooting shortcut; it contains your inventory.
4. **Check reverse-proxy settings.** If Stache is behind a proxy, verify `STACHE_BASE_URL` and only set `STACHE_TRUST_PROXY=1` when requests pass through a proxy you control.
5. **Check memory and model settings.** On a small host, temporarily set `STACHE_ML_LEVEL=0` to see whether model memory is involved.

If the issue continues, open an issue in the [Stache GitHub repository](https://github.com/GraphicHealer/Stache/issues). Include the Stache version, installation type, relevant logs, and steps to reproduce the problem. Remove bearer tokens, passwords, and private inventory details before sharing logs.
