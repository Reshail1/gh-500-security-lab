# gh500-security-lab

A small TypeScript/Express API for practicing GitHub security workflows. Node.js 20+ and npm are required.

## Setup

```sh
npm ci
cp .env.example .env
npm run lint
npm test
npm run build
node --env-file=.env dist/server.js
```

The API listens on port 3000 by default. Set `PORT` in `.env` to change it. `.env` is ignored by Git; `.env.example` contains only a sample port.

## Endpoints

| Method | Path | Example result |
| --- | --- | --- |
| GET | `/health` | `{"status":"ok"}` |
| GET | `/users/1` | `{"id":"1","name":"Ada Lovelace"}` |
| POST | `/feedback` | Send `{"message":"Great API!"}`; returns `201` with an ID and trimmed message |

`GET /users/:id` returns `404` for an unknown ID. Feedback messages must contain 1–500 non-whitespace characters; invalid input returns `400`. The users are sample data, and feedback is stored only in memory until the process stops. There is no database or authentication.

## Security practice

[`security-lab/unsafe-query.ts`](security-lab/unsafe-query.ts) is an **intentionally insecure**, standalone SQL construction example for GH-500 practice. It is excluded from the build and never used by the API. Its string interpolation permits SQL injection; a parameterized query would be the safe replacement. Do not copy it into application code. No real credentials or secrets are included.

## GitHub Actions

CI runs `npm ci`, lint, tests, and build on pull requests and pushes to `main`.

To publish if GitHub CLI is available and authenticated:

```sh
gh repo create gh500-security-lab --public --source=. --remote=origin --push
```
