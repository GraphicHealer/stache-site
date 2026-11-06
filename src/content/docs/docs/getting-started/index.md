---
title: Choose an installation
description: Choose the Stache installation that fits the server or home platform you already use.
---

Stache is a self-contained application. Its database, photo storage, and AI models are included, so you do not need to install a separate database server or companion service.

There are three supported ways to run Stache. Choose the one that best matches the system you already have.

## Choose an installation

| Installation | Best choice when | What setup involves |
|---|---|---|
| [Docker](/docs/getting-started/docker/) | You have a NAS, mini PC, Linux server, VPS, or another machine that runs containers. | Start one container with Docker Compose. |
| [Home Assistant add-on](/docs/getting-started/home-assistant/) | You already run Home Assistant OS or Supervised. | Add the Stache repository and install the add-on. |
| [Unraid](/docs/getting-started/unraid/) | Your server runs Unraid. | Install the Community Applications package when available, or use the provided Docker template. |

If you do not already use Home Assistant or Unraid, Docker is the general-purpose option. Stache is a standalone app; Home Assistant is not required.

## Open Stache

After installation:

1. Open `http://<your-host>:8080`, replacing `<your-host>` with the address of the machine running Stache. If you installed the Home Assistant add-on, you can also use its **Web UI** button.
2. Create the first account. This account becomes the household administrator.
3. Add other household members later from **Settings → Household & Account**.

For the full camera experience, access Stache over HTTPS or through Home Assistant ingress. A plain HTTP LAN address still works, but the live camera viewfinder falls back to the browser's file picker.

## Create your first bin

Print a batch of QR labels, attach one to a bin, and file an item. The complete walkthrough takes about two minutes: [Your first bin](/docs/getting-started/first-steps/).

After that, use the sidebar to learn how to add items, organize areas, find things, track items that are out, and manage household members.
