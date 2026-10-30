---
title: Getting started
description: Three ways to run Stache — pick the one that matches your setup.
---

Stache is one self-contained app: the database, photo storage, and AI models are
all built into a single container — nothing else to install alongside it. There
are **three ways to run it**, and none of them is required over the others. Pick
whichever fits the machine you have.

## On this page

1. [Pick an install path](#pick-an-install-path) — Docker, Home Assistant, or Unraid
2. [Open the app and create your account](#open-the-app)
3. [Print labels and file your first item](#your-first-bin)

## Pick an install path

| Path | Best if | Effort |
| ---- | ------- | ------ |
| **[Docker](/docs/getting-started/docker/)** | Any machine that can run containers — NAS, mini PC, VPS, Raspberry Pi | Copy one compose file, `docker compose up -d` |
| **[Home Assistant add-on](/docs/getting-started/home-assistant/)** | You already run Home Assistant OS or Supervised | One click from the add-on store |
| **[Unraid](/docs/getting-started/unraid/)** | Your storage box runs Unraid | Install from Community Applications |

**Not sure?** If you don't already run Home Assistant, the Docker route is the
standard one and takes about two minutes. The Home Assistant add-on is the
easiest path *if* you have Home Assistant — but Stache is a standalone app and
doesn't need it.

## Open the app

Once it's running:

1. Visit `http://<your-host>:8080` — or the **Web UI** button if you installed
   the add-on.
2. Create the first account. It becomes the household admin; you can add
   everyone else later in Settings.

## Your first bin

Print a batch of QR labels, stick one on a bin, and file something — the whole
loop takes about two minutes: **[Your first bin](/docs/getting-started/first-steps/)**.

After that, the sidebar covers everything else: adding items, labels &amp; areas,
finding things, out/lent tracking, and household members.
