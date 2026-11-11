---
review: tech-verification
target: ARCHITECTURE-SPINE.md (+ .memlog.md)
date: 2026-11-10
mandate: "Verify every committed decision was web-researched or reality-checked rather than asserted from training data; flag anything possibly out of date and unconfirmed."
verdict: PASS WITH CHANGES (1 high, 4 medium, 5 low)
budget_used: ~15 tool calls, 8 sources (npm registry, nextjs.org x4, neon.com, vercel.com, orm.drizzle.team) + package tarball inspection
---

# Tech Verification Review

## Verdict

**Pass with changes.** The database and hosting decisions (AD-14) were researched, and they hold up against current official docs. The main gap is in AD-4 (no caching). It was written against the *previous* Next.js caching model and never checked against the **live `create-next-app` defaults**. New App Router apps now start with **Cache Components and Partial Prefetching turned on**, and Partial Prefetching caches cookie-derived session UI in the browser. That conflicts with AD-4 as written. Several version statements are also already stale: TypeScript is listed as 5.x, the memlog lists Next 16.2/16.3, and Drizzle v1 is not mentioned.

Status key: **Confirmed** = checked against a source in this pass. **Outdated** = the source contradicts the spine. **Unverified** = not checked in this pass (out of budget). The confidence is stated for each.

## Findings by severity

### HIGH

**H1 — AD-4 does not account for the Next 16 starter defaults (Cache Components + Partial Prefetching).** *Outdated / unconfirmed.*
- Source: nextjs.org/docs/app/getting-started/caching (lastUpdated 2026-10-06). It says: "New App Router apps created with the recommended `create-next-app` defaults already have Cache Components and Partial Prefetching enabled." With Partial Prefetching, "the router prefetches each route's App Shell by default. The App Shell includes … session data derived from `cookies()` and `headers()`", and "an App Shell that reads `cookies()` or `headers()` is session-specific, cached per session on the client". It also says "reading `cookies()` … doesn't opt-in the whole route into dynamic rendering, the way the previous rendering model did". `'use cache: private'` results "live only" in the browser.
- Why it matters:
  - AD-4 says "no client-side store of session data beyond the current render". It also assumes that reading the cookie (in `resolveActor`) makes the route dynamic. Under the default starter, both assumptions are false.
  - Prefetched shells holding actor-specific output would sit in the client router cache. After a cookie change (another role link opened in the same browser, or a demo actor switch), a stale shell for the old actor could appear on a client transition. This is exactly what AD-4 and AD-13 exist to prevent.
  - Route segment `dynamic`/`fetchCache`/`revalidate` belong to the "Previous Model" guide (nextjs.org/docs/app/guides/caching-without-cache-components, lastUpdated 2026-08-18). `export const dynamic = 'force-dynamic'` is therefore not the lever under Cache Components. Its compatibility was not re-fetched in this pass, so treat it as unverified.
- Suggested correction (make AD-4 explicit; choose one option):
  - **(A, recommended for simplicity)** Scaffold with `cacheComponents: false` and Partial Prefetching off, using the previous model. Session segments use `export const dynamic = 'force-dynamic'`. `resolveActor` awaits `cookies()`. Ban `unstable_cache` and `fetch` `force-cache` in `src/server/**` and `app/s/**` with a lint rule. Links to session routes use `prefetch={false}`. Leave `staleTimes.dynamic` at its default of 0 and assert it in config. Mutations call `refresh()` or `revalidatePath()` for the current route.
  - **(B)** Keep Cache Components, with these rules:
    - Ban every `'use cache'` variant (`'use cache'`, `'use cache: private'`, `'use cache: remote'`) under `src/server/**` and `app/s/**`, enforced by lint.
    - Put all session reads behind `<Suspense>` with `cookies()` or `connection()`.
    - Use `prefetch={false}` on every link to session routes.
    - Document the App Shell behaviour.
  - Either way, add an AD-12 test: a client-side navigation after a role or cookie change must not show the previous actor's data. Replace "confirmed at scaffold time" with the named mechanism.

### MEDIUM

**M1 — TypeScript "5.x" is outdated.** *Outdated.*
- Source: npm registry (fetched 2026-11-10). `typescript` latest is **7.0.2** (2026-07-08). `next@16.4.6` does not declare a TypeScript peer range.
- Correction: change the Stack entry to "TypeScript: pin at scaffold to the version `create-next-app@16.4.x` installs. Confirm Next 16 type-checking and ESLint/typescript-eslint support before adopting 7.x." Neither the TS 7 compatibility with Next nor the typescript-eslint support was checked in this pass.

**M2 — The Next.js version note in the memlog is stale.** *Outdated.*
- Source: npm registry. `next` latest is **16.4.6**, published 2026-11-09. The memlog says "16.2.10 Jul 2026; 16.3 likely stable". The Next.js blog also lists a July 2026 formal security-release process.
- Correction: update the memlog to "16.4.x current (16.4.6, 2026-11-09)". Pin the latest 16.4 patch at scaffold and track security releases. A frequent-patch cadence is real, so add Dependabot or Renovate to AD-12/CI.

**M3 — Drizzle v1 is not acknowledged.** *Partly confirmed.*
- Source: npm registry. `drizzle-orm` latest stable is **0.45.4** (2026-10-08) and `drizzle-kit` is **0.31.11**. **`1.0.0-rc.5`** is tagged on both.
- Confirmed (by inspecting the package type definitions):
  - the `drizzle-orm/node-postgres` adapter exists;
  - `PgSelect.for(strength, config?)` exists, which gives `SELECT … FOR UPDATE`;
  - `db.transaction(tx => …)` exists;
  - `pgView` exists;
  - `pg` peer is `>=8` (`pg` is at 8.23.1).
- Custom SQL migrations exist via `drizzle-kit generate --custom` (orm.drizzle.team/docs/kit-custom-migrations). The docs do not explicitly mention triggers or functions, but these work as raw DDL. Folder or format changes for migrations in v1 were not checked.
- Correction: add to the Stack: "Drizzle 0.45.x stable unless 1.0 is GA at scaffold. Triggers, functions and the `response_status` view are written as `generate --custom` SQL migrations, and DB guard tests (AD-12 §2) prove they applied."

**M4 — AD-11's strict CSP (`default-src 'self'`) will break Next.js hydration as written.** *Unverified in this pass, high confidence.*
- Next.js emits inline bootstrap and RSC-payload scripts, which need nonces or `'unsafe-inline'`. A nonce-based CSP requires dynamic rendering, which fits option A of H1 but conflicts with static shells under Cache Components.
- Correction: AD-11 should specify a nonce-based CSP set in `proxy.ts` (Next 16's replacement for middleware), with `script-src 'self' 'nonce-…' 'strict-dynamic'`. Verify it against nextjs.org/docs/app/guides/content-security-policy at scaffold.

### LOW

- **L1 — AD-14 / Neon pooling.** *Confirmed.* Source: neon.com/docs/connect/connection-pooling (last updated 2026-10-19).
  - PgBouncer runs in transaction mode, and multi-statement transactions work.
  - Unsupported: `SET`/`RESET`, `LISTEN`/`NOTIFY`, SQL-level `PREPARE`, and session advisory locks. Use the direct connection for migrations.
  - Nuance: **protocol-level prepared statements are supported** (PgBouncer ≥1.22, max 1000 per connection). The spine's "no named prepared statements" is more conservative than needed. That is fine, but reword it to "no SQL-level PREPARE; protocol-level is allowed."
  - `SELECT … FOR UPDATE` is not named explicitly, but it is transaction-scoped and not on the unsupported list.
- **L2 — Vercel Fluid compute and `attachDatabasePool`.** *Confirmed.*
  - vercel.com/docs/fluid-compute (last updated 2026-08-24) says "As of April 23, 2025, fluid compute is enabled by default for new projects". It is available on Hobby (300s default and max duration) and supports Node.js.
  - `@vercel/functions@3.11.1` (2026-11-09) exports `attachDatabasePool(dbPool)`. `experimental_attachDatabasePool` is deprecated.
  - `next@16.4.6` requires Node `>=20.9.0`.
- **L3 — Server actions CSRF and cookies.** *Confirmed.* Source: nextjs.org/docs/app/guides/data-security (lastUpdated 2026-10-06).
  - Server actions are POST-only and compare Origin against Host/X-Forwarded-Host. Every action must re-authorise, which matches AD-1.
  - Cookies cannot be set during render, only in actions or route handlers, which matches AD-2.
  - Route handlers do **not** get the Origin check. `GET /access/{token}` changes state (sets a cookie) on a GET that SameSite=Lax allows on top-level navigation. An attacker could therefore force a victim's browser into the attacker's grant for the attacker's session. The impact is low because cookies are per session.
  - Suggestion: note this in AD-2's residual-exposure list.
- **L4 — Inter via next/font.** *Confirmed.* Source: nextjs.org/docs/app/getting-started/fonts (lastUpdated 2026-05-27). The docs say "Fonts are included as static assets and served from the same domain … no requests are sent to Google by the browser". Name the mechanism in the spine (`next/font/google` Inter, variable font). Builds need network access to Google at build time.
- **L5 — Test tooling versions and the CI service container.** *Confirmed versions; CI unverified.*
  - npm registry versions: `vitest` **5.1.0** (2026-11-02, a new major), `@playwright/test` **1.65.0** (2026-11-05), `@axe-core/playwright` **4.14.0** (2026-10-15). All are current and maintained. `next` declares an optional `@playwright/test ^1.51.1` peer.
  - The GitHub Actions Postgres service container was not re-checked in this pass. It is a long-standing documented feature, so the risk is low.
  - Separately, the spine's `Cache-Control: private, no-store` on pages may be overridden by Next's own header for dynamic routes. Verify the emitted header in an e2e test rather than assuming it.

## Per-check summary

| # | Check | Status | Source (date) |
|---|---|---|---|
| 1a | Next.js 16 current patch | **Outdated in memlog**: 16.4.6 | registry.npmjs.org/next (2026-11-09) |
| 1b | AD-4 caching approach vs Next 16 | **Unconfirmed, conflicts with starter defaults** (H1) | nextjs.org/docs/app/getting-started/caching (2026-10-06); …/guides/caching-without-cache-components (2026-08-18) |
| 2 | Fluid default, Hobby, Node; `attachDatabasePool` | **Confirmed** | vercel.com/docs/fluid-compute (2026-08-24); @vercel/functions 3.11.1 tarball |
| 3 | Neon pooled txns, FOR UPDATE, prepared stmts, direct for migrations | **Confirmed** (with nuance, L1) | neon.com/docs/connect/connection-pooling (2026-10-19) |
| 4 | Drizzle node-postgres, txn + `.for('update')`, custom SQL migrations | **Confirmed**; v1 RC unaddressed (M3) | drizzle-orm 0.45.4 type defs; orm.drizzle.team/docs/kit-custom-migrations |
| 5 | next/font self-hosts Inter | **Confirmed** | nextjs.org/docs/app/getting-started/fonts (2026-05-27) |
| 6 | Vitest / Playwright / axe current; GHA Postgres | **Confirmed** (versions); GHA **unverified** | npm registry (Oct–Nov 2026) |
| 7 | Cookies in actions and handlers; built-in CSRF | **Confirmed** (L3 residual) | nextjs.org/docs/app/guides/data-security (2026-10-06) |
| — | TypeScript version | **Outdated** (M1) | registry.npmjs.org/typescript (7.0.2) |
| — | Strict CSP compatibility | **Unverified**, likely wrong as written (M4) | (not fetched; Next CSP guide) |
