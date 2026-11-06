---
title: API
description: Bearer-token REST API for integrations, scripts, and other apps.
---

Stache exposes a versioned REST API at `/api/v1` for integrations - Home
Assistant services, scripts, and other clients. Interactive reference:
**[Swagger UI](/api/)** (opens in a new page). It's a read-only reference -
Stache doesn't send CORS headers in production, so browsers on this page
can't call your instance; scripts and Home Assistant talk to it directly.

## Authenticate

Create a token in **Settings → Connections & Integrations → API tokens** (name + scope `read` or
`read-write`, revocable). Send it as a bearer header on every request:

```
Authorization: Bearer <token>
```

**Token security:**

- API tokens are separate from browser sessions - they never log anyone in.
- Each token has a scope (`read` or `read-write`), can be revoked
  independently, and only ever sees **shared items** - private items are
  never exposed to the REST API, full stop.
- Tokens are shown once at creation and stored hashed - Stache can't
  recover a lost token.
- Treat tokens like passwords: store them somewhere safe, and prefer
  `read` scope when the integration doesn't need to write. A leaked
  read-write token should be revoked immediately.

## What's covered

| Area | Endpoints |
|---|---|
| Areas | `GET /api/v1/areas`, `GET /api/v1/areas/{id}` |
| Items | `GET /api/v1/items` (search via `?q=`), `GET /api/v1/items/{id}`, `POST /api/v1/items`, `PATCH /api/v1/items/{id}`, `POST /api/v1/items/{id}/move` |
| Labels | `GET /api/v1/labels/{code}` |

Full request/response schemas live in the [interactive reference](/api/)
or the raw spec at [`/api/openapi.yaml`](/api/openapi.yaml).

## Notes

- Writes record the same undoable events as the app - undo works in
  Stache as usual.
- `POST /items` resolves areas by `area_id`, `area_label` (QR code), or
  `area_name` (find-or-create); attach photos as multipart files or pass
  `photo_url` for the server to fetch.
- The session-authenticated endpoints used by the web UI are internal -
  they aren't part of this public surface and can change without notice.
