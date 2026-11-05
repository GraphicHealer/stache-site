---
title: API
description: Bearer-token REST API for integrations, scripts, and other apps.
---

Stache exposes a versioned REST API at `/api/v1` for integrations - Home
Assistant services, scripts, and other clients. Interactive reference:
**[Swagger UI](/api/)** (opens in a new page - it can even talk to your
local instance while you read).

## Authenticate

Create a token in **Settings → API tokens** (name + scope `read` or
`read-write`, revocable). Send it as a bearer header on every request:

```
Authorization: Bearer <token>
```

Tokens see **shared items only** - private items are never exposed. A
`read` scope token gets 403 on writes.

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
