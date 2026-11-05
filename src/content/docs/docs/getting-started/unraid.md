---
title: Install on Unraid
description: Run Stache in one Docker container with persistent storage in your Unraid appdata share.
---

Stache runs as a single container on Unraid. It does not need a separate database or companion container. The SQLite database, photos, and AI model cache are stored in one appdata directory:

`/mnt/user/appdata/stache`

Back up that directory to protect your inventory.

## Install Stache

### Community Applications

If Stache is listed in Community Applications:

1. Open the **Apps** tab and search for **Stache**.
2. Select it and follow the installation prompts.
3. Open the WebUI on port 8080.
4. Create the first household account.
5. Open **Labels** to print your first batch of QR labels.

### Install from the Docker template

If you are installing manually, first download the template to Unraid's user-template folder. Connect to Unraid over SSH and run:

```sh
wget -O /boot/config/plugins/dockerMan/templates-user/my-stache.xml \
  https://raw.githubusercontent.com/GraphicHealer/Stache/main/unraid/my-stache.xml
```

You can also copy `unraid/my-stache.xml` from the Stache repository to the `config/plugins/dockerMan/templates-user/` directory on the Unraid `flash` share. Keep the `my-` prefix in the filename; dockerMan expects that prefix for user templates.

Then:

1. Open the **Docker** tab and select **Add Container**.
2. Open the **Template** dropdown and choose **Stache**.
3. Adjust the host port or appdata path if needed, then select **Apply**.
4. Open the WebUI on the configured port.

### Configure the container manually

If you prefer to create the container without the template, use these values in **Add Container**:

- **Repository:** `ghcr.io/graphichealer/stache:latest`
- **Network:** `bridge`
- **Port:** `8080`
- **Path:** `/mnt/user/appdata/stache` mapped to `/data` with read/write access
- **Variable:** `TZ`, set to your local time zone
- **Extra Parameters:** `--add-host=host.docker.internal:host-gateway`. This allows an optional AI provider running on the Unraid host, such as Ollama at `http://host.docker.internal:11434/v1`, to be reached from the container.

## Container settings

| Setting | Default | Notes |
|---|---|---|
| WebUI port | `8080` | You can change the host port; no other Stache setting depends on it. |
| `/data` path | `/mnt/user/appdata/stache` | Contains the database, photos, and models. Back up this directory. |
| `TZ` | `UTC` | Sets the time zone used for digest scheduling. |
| `BETTER_AUTH_SECRET` | Auto-generated | Optional. When left blank, the secret is persisted in the database settings. |
| `STACHE_ML_LEVEL` | `2` | `0` disables machine learning, `1` selects Florence-2, `2` selects LFM2.5-VL (default), and `3` selects Moondream2. |
| `STACHE_BASE_URL` | Unset | Set the public HTTPS URL when Stache is behind a reverse proxy. This enables secure cookies and correct label/webhook links. |
| `STACHE_TRUST_PROXY` | Unset | Set to `1` behind a trusted reverse proxy so Stache can use forwarded client information. |

See [Configuration reference](/docs/reference/configuration/) for the full list of environment variables.

## Updates, permissions, and memory

- **Permissions:** The container runs as a non-root user. Its entrypoint prepares `/data` so it is writable before the application drops privileges.
- **Memory:** The application uses roughly 200 MB while idle and around 450–550 MB once the models are warm. Set `STACHE_ML_LEVEL=0` to disable machine learning on a constrained host.
- **Updates:** Use Unraid's normal container update process. Version-tagged images, such as `ghcr.io/graphichealer/stache:0.5.0`, are available if you prefer to pin a specific release.
- **HTTPS:** As with other installations, the live camera viewfinder requires HTTPS or another secure browser context. See the [Docker installation guide](/docs/getting-started/docker/) for the plain-HTTP explanation.

