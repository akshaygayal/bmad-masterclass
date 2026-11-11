---
title: 'Story 1.1 — Deployable project foundation from the starter template'
type: 'chore'
created: '2026-11-10'
status: 'done'
baseline_commit: '43cca9bfda54718d89e02f4db723ce8f2dc565cb'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/_bmad-output/implementation-artifacts/epic-1-context.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-bmad-masterclass-2026-11-10/DESIGN.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** There is no application yet. Every later story needs one agreed, deployable baseline: stack, safeguards, CI and test harnesses. Without it, each story would re-decide these.

**Approach:** Scaffold a Next.js 16.4.x app in `alignment-app/` and wire in the guardrails from the architecture spine: caching off, lint bans, nonce CSP, Drizzle with a `pg` pool, the interface registry, design tokens, test harnesses, CI and a controlled migration workflow. Ship S1 as the only page.

## Boundaries & Constraints

**Always:**
- The app lives in `alignment-app/` and uses npm; Node ≥ 22.
- Versions are pinned in the lockfile.
- `cacheComponents: false`, and Partial Prefetching off.
- Drizzle `node-postgres` adapter over a `pg` Pool registered with `attachDatabasePool`. The pooled `DATABASE_URL` is for the app; `DATABASE_URL_UNPOOLED` is for migrations.
- Production migrations run only through a manual `workflow_dispatch` job or `npm run db:migrate:prod`, never in a Vercel build (user decision, 2026-11-10).
- No third-party scripts, fonts or analytics (Inter via `next/font`).
- Light-mode tokens from DESIGN.md.
- Report check results honestly. Tooling being set up is not the same as privacy, concurrency or accessibility tests passing.

**Never:**
- No session, grant, question or response tables or logic. No access links, no demo behaviour (Stories 1.2+).
- No UI framework, no Edge runtime, no Docker requirement.
- No commits, pushes, merges or deploys without the user's approval.
- Never write secrets into files or chat. Commit `.env.example` only.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Banned cache API | Source containing `'use cache'`, an `unstable_cache` import, or `cache: 'force-cache'` in `app/` or `src/server/` | Lint error | Fails lint and CI |
| Misplaced server action | `'use server'` module outside `app/` | Lint error | Fails lint and CI |
| Layer breach | `app/**` imports `@/server/db` | Lint error | Fails lint and CI |
| Unregistered interface | A `page.tsx` or `route.ts` (or an exported server action) not listed in `interfaces.ts` | Registry test fails, naming the path | Fails CI |
| Stale registry entry | A registry entry with no file | Registry test fails | Fails CI |
| Any page response | GET `/` | CSP with a per-request nonce, `frame-ancestors 'none'`, `Referrer-Policy: strict-origin-when-cross-origin` | Header test fails if any are missing |
| No database configured | `DATABASE_URL` unset in the integration test | Clear skip/fail message naming the variable | No crash with a stack dump |

</frozen-after-approval>

## Code Map

- Repository root: `CLAUDE.md`, `_bmad/`, `_bmad-output/` (planning only). No application code exists; the work is greenfield. Do not modify `_bmad*`.
- `alignment-app/` -- new Next.js app (all files below are relative to it unless stated).
- `.github/workflows/` (repo root) -- CI and migration workflows, using `working-directory: alignment-app`.
- Local tooling available: Node 24.10, npm 11.6, Homebrew Postgres 16.14. Not installed: gh, vercel CLI, docker.

## Tasks & Acceptance

**Execution:**
- [x] `alignment-app/` -- scaffold with `npx create-next-app@16.4.x` (TS, App Router, ESLint, `src/` dir off, `@/*` alias), then pin exact versions -- the starter decision (AD stack).
- [x] `package.json` -- `engines.node >=22`; scripts `lint`, `typecheck`, `test` (Vitest), `test:e2e` (Playwright), `db:migrate` (drizzle-kit migrate), `db:migrate:prod` (with a guard requiring `DATABASE_URL_UNPOOLED` and an explicit confirm flag) -- one entry point per check.
- [x] `next.config.ts` -- `cacheComponents: false`; Partial Prefetching off -- AD-4.
- [x] `eslint.config.mjs` -- `no-restricted-syntax` and `no-restricted-imports` bans for the three cache APIs, `'use server'` outside `app/`, and `@/server/db` from `app/` -- AD-4, AD-21, layering.
- [x] `proxy.ts` -- generate a per-request nonce; set CSP (`default-src 'self'`; `script-src 'self' 'nonce-…' 'strict-dynamic'`; `style-src 'self' 'nonce-…'`; `frame-ancestors 'none'`), `Referrer-Policy`, `X-Content-Type-Options` -- AD-11.
- [x] `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `src/ui/tokens.css` -- Inter via `next/font`; all DESIGN.md tokens as CSS custom properties; S1 with "Create alignment session" and "Open demo" as inert buttons (disabled, explained by visible text), using CSS Modules -- UX-DR1, UX-DR22.
- [x] `src/server/db/client.ts`, `src/server/db/schema.ts` (empty), `drizzle.config.ts`, `src/server/db/migrations/` -- the `pg` Pool plus `attachDatabasePool` plus Drizzle, and an initial empty custom migration so migrate runs end to end -- AD-14.
- [x] `src/server/interfaces.ts` -- registry listing `/` (S1) -- AD-21.
- [x] `tests/unit/registry.test.ts` -- scan `app/` for pages, route handlers and `'use server'` exports, and diff against the registry in both directions.
- [x] `tests/unit/lint-rules.test.ts` -- run ESLint programmatically on fixture snippets for each banned pattern, and assert each produces an error.
- [x] `tests/integration/db.test.ts` -- connect via the client, run migrations against a test database, run `select 1`.
- [x] `tests/e2e/smoke.spec.ts`, `tests/e2e/headers.spec.ts`, `tests/e2e/a11y.spec.ts` -- S1 renders; headers present with a nonce that differs across requests; no axe violations on S1 at WCAG 2.2 AA tags; no third-party request observed.
- [x] `vitest.config.ts`, `playwright.config.ts` (runs against `next build && next start`) -- harnesses.
- [x] `.env.example`, `.gitignore` -- the four variable names, documented, with no values; `.env*.local` ignored.
- [x] `../.github/workflows/ci.yml` -- on push and PR: npm ci, lint, typecheck, unit, Postgres 16 service, migrate, integration, build, Playwright (Chromium) with axe.
- [x] `../.github/workflows/migrate-production.yml` -- `workflow_dispatch` only; uses the `DATABASE_URL_UNPOOLED` repository secret; runs `db:migrate:prod`.
- [x] `../.github/dependabot.yml` -- weekly npm updates for `/alignment-app`, plus GitHub Actions.
- [x] `alignment-app/README.md` -- local setup (Homebrew Postgres, `.env.local`), scripts, and the deploy and migration procedure.

**Acceptance Criteria:**
- Given a fresh clone with local Postgres running and `.env.local` set, when `npm ci && npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e` runs in `alignment-app/`, then each step exits 0.
- Given the lockfile, when inspected, then Next.js resolves to 16.4.x and exact versions are pinned.
- Given the CI workflow, when a push or PR runs, then all checks execute against a Postgres 16 service container (verifiable only after push, which awaits user approval).
- Given Vercel and Neon are configured by the user, when `main` deploys, then S1 is reachable and the production headers match the header test (verifiable only after user setup).

## Design Notes

- **Nonce CSP** requires dynamic rendering. S1 opts in to dynamic rendering, which matches AD-4's direction for session routes anyway.
- **Postgres 16** keeps local, CI and (when the user creates the project) Neon on the same major version.
- **The migration guard script** refuses to run unless `DATABASE_URL_UNPOOLED` is set **and** `--yes-production` is passed, so it can't be run by accident.

## Verification

**Commands (run in `alignment-app/`):**
- `npm run lint` -- expected: exit 0.
- `npm run typecheck` -- expected: exit 0.
- `npm test` -- expected: unit tests (registry, lint rules) and integration tests (DB) pass.
- `npm run build` -- expected: exit 0.
- `npm run test:e2e` -- expected: smoke, headers and a11y specs pass.

**Pending external setup:** CI run (needs a push), Vercel deploy and production header check (needs Vercel + Neon), branch protection (GitHub settings).

## Implementation Notes

- Scaffolded with `create-next-app@16.4.6`; it defaulted to `cacheComponents: true, partialPrefetching: true`, both now explicitly `false`. All direct dependencies pinned to exact versions; `@types/node` held at 22 to match `engines`.
- `@/*` maps to `./src/*` (not the scaffold's `./*`) so imports read `@/server/db`, matching the I/O matrix. Lint also bans `**/src/server/db/**` relative imports from `app/`.
- Root layout sets `dynamic = 'force-dynamic'` (plus `connection()` on S1) so every route, including the 404 page, gets the nonce.
- CSP omits `upgrade-insecure-requests` (would interfere with http e2e on 127.0.0.1); Vercel serves HTTPS anyway.
- Added `test:unit` / `test:integration` scripts so CI can migrate between them; `npm test` runs both. Integration test skips locally without `DATABASE_URL`, fails under `CI`.
- Lockfile was regenerated once to include all `@rolldown/binding-*` optional packages (npm optional-deps bug), so `npm ci` works on Linux CI.
- Local verification used a throwaway Postgres 16.14 cluster on 127.0.0.1:54329 (the Homebrew cluster requires a password that was not available).

- (orchestrator, step-03 verification) Added a lint ban on inline (function-level) `'use server'` in `app/`: Next.js exposes inline actions as endpoints, but the registry scan only sees module-level `'use server'` files, so inline actions would escape AD-21. Covered by 2 new lint-rule fixtures.
- (orchestrator, step-03 matrix audit) Added a registry fixture test proving `discoverInterfaces` detects unregistered pages, route handlers (including route groups) and exported server actions, and ignores non-action exports. Previously only the current registry state was asserted.
- (orchestrator) Independent verification on a throwaway Postgres 16.14 (TCP 127.0.0.1:54330): npm ci, lint, typecheck, db:migrate, npm test (24/24), build, test:e2e (8/8) all exit 0; the migration guard refuses without the variable and without `--yes-production`.

## Spec Change Log

## Review Triage Log

| # | Layer | Finding | Verdict | Evidence / route |
|---|---|---|---|---|
| 1 | verification-gap | Production migration guard untested | medium | Pre-verified; no test exercises either refusal path → patch |
| 2 | blind, edge | pg Pool has no `error` listener | medium | `client.ts` creates a Pool with no `pool.on('error')`; pg emits `error` on idle-client failure → unhandled → crash → patch |
| 3 | blind, edge | Migrate workflow: mistyped confirm shows "skipped" green; runs from any ref; repo-wide secret | medium | Job-level `if` skips rather than fails; no ref check; no environment → patch (step-level fail, main only, `environment: production`) |
| 4 | blind | Migration docs contradict each other (before merge vs before/after deploy; current vs previous version) | low | Wording conflicts between README, workflow and `0000_init.sql` → patch (single rule) |
| 5 | blind | Integration test migrates whatever `DATABASE_URL` points at | medium | `.env.local` loaded and `migrate()` called with no target guard → patch (local host or CI only) |
| 6 | edge | `spawnSync` failure exits 1 with no reason | low | `result.error` ignored; direct correction → patch |
| 7 | edge | `drizzle.config.ts` URL check only for `migrate` | low | `check`/`push`/`studio` get an empty URL and an opaque error; direct correction → patch |
| 8 | blind, edge | AD-4 lint gaps: `revalidate`, `fetchCache`, `dynamic='force-static'`, `next.revalidate` | medium | Not matched by any selector; would allow cached pages → patch |
| 9 | edge | `force-cache` as a template literal bypasses lint | low | Real but unlikely in practice, and the fix adds selector complexity → rejected |
| 10 | edge | `app/` dynamic `import()`/`require()` of the db layer bypasses the layering ban | low | `no-restricted-imports` ignores `ImportExpression`; trivial selector → patch |
| 11 | blind, edge | Registry: `route.tsx`/`.jsx` missed; metadata routes missed | medium | Live endpoints would escape AD-21 registration → patch |
| 12 | blind, edge | Registry: `export *` in action modules ignored; `export default function foo` keyed as `foo` | medium | Re-exported actions escape registration → patch (fail loudly; key `default`) |
| 13 | blind, edge | Registry: private `_folders` and intercepting `(.)` segments mis-handled | low | Fails loudly (false positive, never a silent escape); unlikely; adds branches → rejected |
| 14 | blind | CI lacks a migration/schema drift check | medium | Nothing runs `drizzle-kit check` → patch |
| 15 | blind | README lists `DATABASE_URL_UNPOOLED` as a repo secret | low | Merged into #3 (environment-scoped secret) → patch |
| 16 | blind | CSP dev branch (`'unsafe-eval'`) and matcher exclusions untested | low | Dev branch: trivial unit test → patch. Matcher exclusions: rejected (low, needs a dev-server harness) |
| 17 | blind | `style-src` blocks React `style={{}}`; no `report-uri`; console-text matching; unused `x-nonce` | low | Inline-style limit → patch (README guardrail). `report-uri` → deferred (observability deferred by architecture). Console matching works today → rejected. `x-nonce` is the documented Next.js pattern for components that need the nonce → false |
| 18 | blind | No HSTS, Permissions-Policy or COOP | low | Not required by AD-11 or the spec intent; Vercel sets HSTS on its domains → deferred |
| 19 | blind | `package-lock.json` missing from diff | false | Excluded from the review diff on purpose; the file exists in the tree and will be committed |
| 20 | blind | CI runs twice per PR; Node version hardcoded | low | Direct corrections → patch |
| 21 | blind | Playwright `retries: 1` can hide flakiness | low | Reports uploaded on failure only; unlikely to matter at this scale → rejected |
| 22 | edge | `reuseExistingServer` may test a stale server; `E2E_SKIP_BUILD='0'` skips the build | low | Direct corrections → patch |
| 23 | edge | `nonceOf(undefined)` throws a TypeError | low | The test still fails loudly when the header is missing → rejected |
