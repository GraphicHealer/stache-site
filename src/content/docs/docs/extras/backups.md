---
title: Backups and restore
description: Protect your inventory by backing up the Stache data directory, and learn how to restore it.
---

Your Stache data is stored together under `/data`: the SQLite database, item photos, downloaded AI models, and scheduled backups. A complete backup of this directory contains the information needed to move or restore your inventory.

<picture>
  <source srcset="/shots-docs/settings-backup-light.webp" media="(prefers-color-scheme: light)" />
  <img src="/shots-docs/settings-backup.webp" alt="Settings → Data & Backups showing the backup download and automatic backup options" width="300" />
</picture>

## Download a backup from the app

Open **Settings → Data & Backups → Backups** and tap **Download backup**. You get one zip with the database, photos, and a readable manifest, restorable on a fresh install. Tick **Encrypt the backup** first to protect it with a passphrase.

**Quick DB snapshot** downloads the database only. It is fast, but it is not a full backup because it leaves out photos.

## Back up the data directory

The exact host location depends on how you installed Stache:

| Installation | What to back up |
|---|---|
| Docker | The persistent Docker volume mounted at `/data`. |
| Home Assistant add-on | The add-on's data directory, included in Home Assistant backups. |
| Unraid | `/mnt/user/appdata/stache`. |

For a Docker named volume called `stache_data`, create an archive with:

```sh
docker run --rm -v stache_data:/data -v "$PWD":/backup alpine tar czf /backup/stache.tar.gz -C /data .
```

Change the volume name if your Compose project uses a different one. Keep backups somewhere other than the same disk as the live data.

## Schedule backups in Stache

Stache can create backups automatically. Open **Settings → Data & Backups → Automatic backups**, tick **Back up automatically**, and tap **Save schedule**. The schedule is off until you turn it on.

Scheduled backups are stored under `/data/backups`. Each backup contains a `manifest.json` and a `payload.zip`.

:::caution[Scheduled backups are not encrypted]
Scheduled backup files are **not encrypted**. Protect the backups directory as carefully as the live inventory data. If you need an encrypted copy, use the manual encrypted backup download in the same Settings screen.
:::

## Export selected information

**Settings → Data & Backups → Export / Import** provides JSON and CSV export downloads. These are useful when you need a portable copy of inventory information, but they are not a replacement for a complete backup of the database and photos.

## Restore a backup

Open **Settings → Data & Backups → Restore**, tap **Restore from zip…**, and choose a backup zip. This replaces the whole inventory with the backup, and Stache restarts itself to finish.

Behind the scenes, a restore is staged in `/data/restore-pending/`. Stache checks for a staged backup before opening the database, replaces the current data with the restored data, and restarts.

You can also restore manually by stopping Stache and replacing the contents of its persistent data directory with the contents of your backup. Keep a separate copy of the current data until you have confirmed the restored instance is working.

## Move Stache to another host

1. Stop Stache on the old host.
2. Make a complete backup of its data directory.
3. Copy the backup to the new host.
4. Configure the new installation to mount the restored data at `/data`.
5. Start Stache and confirm that your items and photos are present.

See [Configuration](/docs/reference/configuration/) for data directory settings.
