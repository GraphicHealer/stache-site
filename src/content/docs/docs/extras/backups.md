---
title: Backups
description: Everything lives in one folder — and there's a built-in scheduler too.
---

Stache keeps **everything** in one place: the SQLite database, all photos, and the AI model cache live under `/data`. The simplest backup in the world is copying that folder.

## The dead-simple way

- **Docker:** back up the `data` volume (`docker run --rm -v stache_data:/data -v $PWD:/backup alpine tar czf /backup/stache.tar.gz -C /data .`)
- **Home Assistant add-on:** the add-on data folder is covered by HA's own backup system
- **Unraid:** back up `/mnt/user/appdata/stache`

## Built-in scheduler (opt-in)

Stache can write scheduled backups itself — **Settings → Backup**. It produces a bundle (a plaintext `manifest.json` plus a `payload.zip`, optionally encrypted) into `/data/backups`. The interval is gated by the `backup_schedule` setting — it's off until you opt in.

## Restore

Place a backup where the app can stage it (`/data/restore-pending/`) and Stache swaps it in before the database opens, then restarts. Because it's a plain swap of a self-contained data dir, a manual restore is also just "replace the volume contents."
