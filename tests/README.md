# SSR smoke tests

Both suites run against a live server (`http://localhost:8080` by default).
Point them elsewhere with `SMOKE_BASE_URL` / a CLI argument to test preview or production.

| Command | What it checks |
| --- | --- |
| `bun run test:ssr` | Fetches every route: 200 + HTML, no SSR error page, head metadata (title + description), crawler-visible server-rendered content (`<h1>` and real text), all legacy redirects (status + `Location` + followed destination), and a 404 for unknown paths. |
| `bun run test:hydration` | Loads every route in headless Chromium: hydration mismatch warnings, console/page errors, visible content, interactive navigation, redirect landing pages, and client-side navigation without a full reload. |

```bash
bun run test:ssr
SMOKE_BASE_URL=https://brand.rhosonics.com bun run test:ssr

python3 tests/hydration_smoke.py                     # localhost
python3 tests/hydration_smoke.py https://brand.rhosonics.com
```

Route lists live in `tests/routes.ts` (SSR) and at the top of `tests/hydration_smoke.py`.
Add new routes to both.
