# web

A single server-rendered page that fetches `/todos` from the `api` service over
the Zerops internal network and renders the list. Depends on
[`@fxck/contracts`](https://github.com/fxck/contracts) as a git dependency and
uses `validateTodo` to guard the fetched payload.

## Endpoints

- `GET /` → HTML page listing the todos (or an error notice if the api is down).
- `GET /health` → `{ "ok": true }`.

## Configuration

- `API_URL` — base URL of the api service. On Zerops this is
  `http://apidev:3000` (internal hostname). Defaults to the same if unset.

## Scripts

- `npm start` — run the server (`node src/index.js`).
- `npm run typecheck` — `tsc --noEmit`.
- `npm test` — `node --test`.

## Deploy (Zerops)

Deployed to the `webdev` service via direct `zcli push`.
