# alignment-app

Requirements Interpretation Alignment (working title). Next.js 16.4 (App Router), TypeScript, Drizzle ORM over `pg`, deployed on Vercel (Node runtime, Fluid compute) with Neon Postgres.

Story 1.1 sets up the foundation only: the S1 start page with inert buttons, the security headers, lint guardrails, the interface registry, the database client, test harnesses, CI and the migration workflow. Sessions, access links and the demo come in Story 1.2 and later.

## Requirements

- Node 22 or newer (`.nvmrc` pins 22), npm.
- PostgreSQL 16 (Homebrew: `brew install postgresql@16 && brew services start postgresql@16`).

No Docker needed.

## Local setup

```sh
cd alignment-app
npm ci
createdb alignment_dev            # add -U/-h flags to match your local setup
cp .env.example .env.local        # then fill in the values
npm run db:migrate
npm run dev                       # http://localhost:3000
```

`.env.local` (gitignored, never commit it):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Pooled connection used by the app at runtime. Locally, your Postgres 16 database. |
| `DATABASE_URL_UNPOOLED` | Direct connection used only for migrations. Locally, the same value as `DATABASE_URL`. |
| `SESSION_SECRET` | HMAC key for access cookies (from Story 1.2). `openssl rand -base64 32`. |
| `APP_ORIGIN` | Public origin for access links, e.g. `http://localhost:3000`. |

The integration tests run migrations against the database in `DATABASE_URL`, and refuse to run unless its host is `localhost`, `127.0.0.1` or `::1` (or `CI` is set). Use a separate database for them (for example `alignment_test`) if you want to keep dev data apart. If `DATABASE_URL` is unset, they are skipped locally with a message naming the variable; in CI they fail instead.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server. |
| `npm run lint` | ESLint, including the cache, `'use server'` and layering bans. Zero warnings allowed. |
| `npm run typecheck` | Generates Next route types, then `tsc --noEmit`. |
| `npm test` | Vitest: unit tests (registry, lint rules) and integration tests (database). |
| `npm run test:unit` / `npm run test:integration` | The two halves separately (CI runs them around the migrate step). |
| `npm run build` / `npm start` | Production build and server. |
| `npm run test:e2e` | Playwright (Chromium) against `next build && next start` on port 3100: smoke, headers, axe. Set `E2E_SKIP_BUILD=1` to reuse an existing build. First run: `npx playwright install chromium`. |
| `npm run db:generate` | Generate a migration from `src/server/db/schema.ts` (`-- --custom --name=x` for hand-written SQL). |
| `npm run db:migrate` | Apply migrations using `DATABASE_URL_UNPOOLED`. |
| `npm run db:migrate:prod` | Production migration. Guarded; see below. |

## Guardrails

- **No caching (AD-4):** `cacheComponents: false`, `partialPrefetching: false`, every route renders dynamically. Lint fails on `'use cache'`, `unstable_cache`, `cache: 'force-cache'`, `next: { revalidate }`, and exported `revalidate` / `fetchCache` / `dynamic = 'force-static' | 'error'` segment config in `app/` and `src/`.
- **Layering:** `'use server'` is allowed only under `app/`. `app/` must not import `@/server/db` (static, dynamic `import()` or `require()`). `@/*` maps to `src/*`.
- **Interface registry (AD-21):** every page, route handler and exported server action in `app/` must be listed in `src/server/interfaces.ts`. `tests/unit/registry.test.ts` fails on missing or stale entries.
- **Security headers (AD-11):** `proxy.ts` sets a per-request nonce CSP, `Referrer-Policy: strict-origin-when-cross-origin` and `X-Content-Type-Options: nosniff`.
- **Database (AD-14):** one `pg` Pool per instance, registered with `attachDatabasePool`, in `src/server/db/client.ts`. The pooled connection runs in PgBouncer transaction mode in production: no session-level `SET`, advisory locks, SQL `PREPARE` or `LISTEN` (use `SET LOCAL`).
- No third-party scripts, fonts or analytics. Inter is self-hosted via `next/font`.
- No inline `style` attributes: the CSP `style-src` has no `'unsafe-inline'` or `'unsafe-hashes'`, so the browser blocks them. Use CSS Modules.

## CI

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`: `npm ci`, lint, typecheck, unit tests, migrations against a Postgres 16 service container, `drizzle-kit check`, integration tests, build, and Playwright with axe. It uses no production secrets. Dependabot (`.github/dependabot.yml`) opens weekly npm and GitHub Actions updates.

Branch protection on `main` (require the CI check to pass) must be enabled in the GitHub repository settings.

## Deploy and migration procedure

Vercel builds run `next build` only. **Migrations never run in a Vercel build.**

The rule: migrations are merged to `main`, then applied once via the manual **Migrate production** workflow (runs from `main` only, in the `production` GitHub Environment). Each migration must be backward compatible with the version deployed before it (expand first, contract in a later release), because the new code and the new schema do not go live at the same instant.

1. One-time setup (by the project owner): create the Vercel project with root directory `alignment-app`, add the Neon integration (Postgres 16), and set `DATABASE_URL` (pooled), `DATABASE_URL_UNPOOLED`, `SESSION_SECRET` and `APP_ORIGIN` in Vercel. In GitHub, create a `production` Environment (optionally with required reviewers) and add `DATABASE_URL_UNPOOLED` as a secret of that environment, not as a repository secret.
2. Write the migration backward compatible with the version deployed before it, and merge it to `main` with the code that uses it.
3. Apply it once: GitHub Actions → **Migrate production** → Run workflow on `main`, typing `migrate production` to confirm. The job fails if the confirmation is wrong or the branch is not `main`.
   - Fallback, by hand: `DATABASE_URL_UNPOOLED='<direct Neon URL>' npm run db:migrate:prod -- --yes-production`. The script refuses to run unless the variable is exported in the shell (it ignores `.env.local`) and the flag is passed.
4. Check that `/` loads and its response headers match `tests/e2e/headers.spec.ts`.
