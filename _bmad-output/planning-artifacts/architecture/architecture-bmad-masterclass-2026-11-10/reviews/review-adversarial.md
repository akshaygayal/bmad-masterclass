---
title: 'Adversarial review: Architecture Spine (Requirements Interpretation Alignment)'
reviewed: ARCHITECTURE-SPINE.md (status draft, 2026-11-10)
mandate: 'Construct two units one level down that each obey every AD to the letter yet build incompatibly; each pair is a hole to close with a new or tightened AD. Plus targeted attacks: privacy leakage, concurrency, immutability bypass, demo isolation/impersonation, cookie scoping, one-time link display.'
date: '2026-11-10'
verdict: 'Revise before epics. 3 critical, 6 high, 8 medium, 6 low.'
---

# Adversarial Review: Architecture Spine

**Verdict: revise before epics.** The spine is unusually strong on intent (single projection, DB guards, transactional commands, leak test). But it leaves three things unstated: **which session an object belongs to**, **who owns the cookie and the counts**, and **how the deletion path coexists with the immutability triggers**. Those gaps let two fully compliant units build a system that leaks across sessions, leaks response type before reveal, or can't reset its own demo.

Counts: **Critical 3 · High 6 · Medium 8 · Low 6.**

Labels: "Unit A / Unit B" are hypothetical, independently built stories that each follow every AD literally. Findings are derived from the spine text; nothing was executed. The PRD's FR wording is used as the yardstick.

---

## Critical

### C1. No rule binds a target object to the actor's session (cross-session reveal/classify/resolve; demo touches normal sessions)
- **Location:** AD-1, AD-5, AD-13 (also AD-9 isolation claim).
- **Unit A:** `resolveActor()` reads the credential cookie and returns `Actor { grantId, sessionId, isFacilitator … }`. This is compliant.
- **Unit B:** `revealQuestion(questionId)` locks `question WHERE id=$1`, re-resolves the grant, checks `actor.isFacilitator` and `state='hidden'`, then writes. This is compliant with AD-5's six steps.
- **Failure:** nothing requires `question.session_id = actor.sessionId`. Anyone can create a session at `/new` (and so becomes a facilitator), or open a demo (and so becomes a demo facilitator). That person can then reveal, classify, set follow-up owners, record resolutions on, or remove the questions of **any normal session** whose question id they learn. Every participant sees question ids in their HTML, and UUIDv7 ids are also time-ordered. A read query keyed on the URL's `sessionId` and the actor's role, rather than `actor.sessionId`, leaks across sessions the same way. It also breaks FR-10 and FR-24 ("demo actions never affect normal sessions"). AD-1 says "no session id from the client is trusted", but the URL `sessionId` *is* client-supplied, and the spine never says what to do with it.
- **Also undefined:** with "one credential cookie per session", which cookie does `resolveActor()` read when a server action carries only a `questionId`?
- **Fix (tighten AD-1 + AD-5):**
  - `resolveActor(sessionId)` takes a server-derived session id. For pages this is the route param. For commands it is the `session_id` of the target row, which the command loads itself. It reads **only that session's cookie** and fails if `grant.session_id ≠ sessionId`.
  - In AD-5 step 3, add: assert `target.session_id = actor.sessionId`. A mismatch returns the same result as no access (`NO_ACCESS`), so the call is not an existence oracle.
  - Commands accept only question ids (plus the demo switch's target grant id). They never accept a response id, perspective or grant id: the target response is always `(questionId, actor.perspective)`.
  - Leak and integration tests add a "valid actor of another session" and a "demo actor" against normal-session ids.

### C2. Classification is not gated on Revealed, so it becomes a response-type oracle
- **Location:** AD-5, AD-6, AD-8.
- **Unit A:** `classifyQuestion` locks the row, checks `isFacilitator`, then applies AD-8 ("Aligned and Conflict require ≥2 responses of type `answer`, counted inside the transaction") and returns `INSUFFICIENT_EVIDENCE` on failure. This is compliant. AD-8 and AD-6 never say "Revealed only", and AD-6's guards don't cover classification.
- **Unit B:** the UI maps `INSUFFICIENT_EVIDENCE` to "Needs at least 2 substantive answers ({n} available)". This is compliant.
- **Failure:** on a **Hidden** question, the facilitator tries Aligned. Success or `INSUFFICIENT_EVIDENCE`, plus `{n}`, tells them how many responses are substantive versus Can't answer before reveal. That violates FR-11 and the Glossary's "response type never disclosed". A successful classify also persists a classification on a Hidden question. The same oracle exists if a correct "revealed" check simply runs *after* the evidence check.
- **Fix:**
  - AD-5 sets the precondition order for every command: authorise → session match (C1) → state → content-dependent checks. No content- or type-dependent check, count or error may run before `state='revealed'` is confirmed.
  - AD-6 adds a DB CHECK or trigger: `classification <> 'not_yet_reviewed'` requires `state='revealed'`.
  - Concurrency tests add "classify Hidden question" with mixed response types and assert one constant error code.

### C3. The demo's delete path collides with the immutability triggers, so reset and cleanup always fail
- **Location:** AD-6, AD-7 vs AD-9 / AD-10.
- **Unit A (db):** per AD-7, a trigger rejects **every** `DELETE` on `resolution`. Per AD-6, a trigger rejects deleting a question once any response exists or it is revealed.
- **Unit B (demo):** per AD-9, `resetDemo` and cleanup `DELETE alignment_session … (cascade)`.
- **Failure:** the FR-23 fixture *always* contains responses, so the cascade into `question` is rejected for every demo session ever created. After UJ-2 a resolution also exists, which blocks the cascade into `resolution` too. Reset never works. If cleanup runs inside `createDemo`'s transaction, `createDemo` fails for **everyone** as soon as one demo is older than 24h. That breaks FR-23 and SS-3. "The only deletion path is demo cleanup" is stated, but nothing implements an exception.
- **Fix (AD-6, AD-7, AD-9):**
  - All demo deletion goes through one DB function, `delete_demo_session(id)`. It verifies `is_demo = true`, runs `SET LOCAL app.demo_delete = '<id>'` (allowed under AD-14), and deletes.
  - Each delete-blocking trigger permits a delete only when that setting equals the row's session id. Don't rely on a parent-row lookup: the parent is already gone during a cascade. Denormalise `session_id` on children if needed.
  - AD-12 guard tests cover both sides: the demo delete succeeds, and the same SQL on a normal session is rejected.

---

## High

### H1. Credential cookie shape and writer are unspecified, and the demo layer can't legally write it
- **Location:** AD-2 ("scoped by session"), AD-13 ("one cookie per session"), AD-9 (`switchDemoActor` "sets the actor cookie"), layer table (Demo → domain and db only, not access).
- **Unit A (access):** sets one cookie `grant` with `Path=/s/{sessionId}`.
- **Unit B (demo):** may not import `access`, so it signs its own cookie `g_{sessionId}` with `Path=/`.
- **Failure:** `resolveActor` can't find the demo cookie, or finds two candidates. Signing logic is duplicated (two owners). `Path=/` per-session cookies pile up with every demo and are sent on every request. Lifetime is undefined.
- **Fix (AD-2/AD-13):**
  - Cookie name is `rg_<sessionId>`, with `Path=/s/<sessionId>`, HttpOnly, Secure, SameSite=Lax and a fixed Max-Age.
  - The value is HMAC(`SESSION_SECRET`) of `{grantId, sessionId}`.
  - `access/cookie.ts` is the **only** reader and writer.
  - Demo commands return a target grant id. The interface layer calls `access.setGrantCookie`, or the layer table allows demo → access for that one function.
  - `demo_owner_key` uses the same treatment: per demo session, path-scoped, stored hashed.

### H2. Late assignment and reassignment have no token path and no revocation, and response ownership is ambiguous
- **Location:** AD-2 (tokens "returned only in the `createSession` response"), AD-6 (grant.perspective guard), ER seed, FR-2, EXPERIENCE S2 (assignments changeable from the S3 header).
- **Unit A:** `assignPerspective` assigns QA to someone new by updating the old grant's perspective to null and inserting a new grant. It can't return a token, because AD-2 forbids that outside `createSession`. The new participant has no link.
- **Unit B:** stores `response.grant_id` only and derives perspective by join, while visibility reads `response.perspective`.
- **Failure:** the replaced participant's cookie and link still resolve. They become an actor with no role who can still read the session, which breaks FR-3. With grant-only keys, a perspective change silently re-labels existing responses (FR-2: "no existing response is silently reassigned"). With both columns stored independently, the two values drift.
- **Fix (AD-2/AD-6):**
  - Grants are never deleted. Reassignment sets `revoked_at` on the old grant and inserts a new grant. `resolveActor` rejects revoked grants. `unique(session_id, perspective) WHERE revoked_at IS NULL`.
  - `assignPerspective` returns the new token once, under the same rules as `createSession`.
  - `response` stores `(grant_id, perspective)` with a composite FK to `access_grant(id, perspective)` using `ON UPDATE RESTRICT`, and `unique(question_id, perspective)`.
  - CHECK: `is_facilitator OR perspective IS NOT NULL`.

### H3. Assign and submit lock different rows, so reassignment can race past a response
- **Location:** AD-5 step 2 (lock "the question row, or the session row for session-level commands"), AD-6.
- **Unit A:** `assignPerspective` locks the session row and checks "no responses for this perspective". Its AD-6 trigger runs the same check.
- **Unit B:** `submitResponse` locks the question row only.
- **Failure:** under READ COMMITTED neither transaction sees the other's uncommitted write. The perspective is reassigned *and* a response is committed under the old holder. The same gap exists between `resetDemo` (session lock) and question commands. Those have no defined outcome when the row disappears (see M4).
- **Fix (AD-5): a global lock order.**
  - Every command first takes `alignment_session … FOR SHARE`, or `FOR UPDATE` for session-level commands (`assignPerspective`, `addQuestion`, `resetDemo`, `switchDemoActor`).
  - Then it takes the target `question … FOR UPDATE`, and only then reads the grant.
  - AD-12 concurrency tests add assign vs submit and reset vs submit/reveal.

### H4. `coverage.ts` is a second owner of response reads, so the substantive count reaches Hidden payloads
- **Location:** AD-3 ("all reads of responses go through `visibility.ts`") vs AD-8 (`coverage.ts` is "the only source of counts" and returns `substantive`).
- **Unit A:** `coverage.ts` counts by `response_type` straight from `response` and returns `{submitted, substantive, notSubmitted}`.
- **Unit B:** the Hidden question card passes the coverage object to a client component.
- **Failure:** `substantive` is serialised into the RSC payload for a Hidden question, which leaks response type (FR-11). Both units follow their own AD literally.
- **Fix (AD-3/AD-8):**
  - `coverage.ts` consumes only `visibility.ts` output.
  - The projection types are a discriminated union: `HiddenQuestionView` has no `substantive` or type field.
  - Only projection types may cross into `src/ui` or client components.
  - Command-internal evidence counts (C2) run only after the revealed check.

### H5. The interface registry isn't enforced to be complete, so unregistered server actions are public endpoints
- **Location:** AD-1, AD-12.3.
- **Unit A:** registers its page and actions.
- **Unit B:** adds a `'use server'` helper (`getOwnResponseForEdit(questionId)`) for a form and doesn't list it.
- **Failure:** Next.js exposes every exported `'use server'` function as a callable endpoint. The canary test only iterates the registry, so the leak surface goes untested.
- **Fix (AD-1/AD-12):**
  - A CI test enumerates every `'use server'` export, every `route.ts` and every `page.tsx`, and fails on any entry missing from `interfaces.ts`.
  - `'use server'` modules live only under `app/` and export only registered wrappers.

### H6. The facilitator holds every participant's bearer link, so they can read hidden answers and act as anyone
- **Location:** AD-2 (one-time display to the facilitator; "possession is the trust model") vs FR-10 ("the facilitator … cannot retrieve another participant's response content"), FR-24 ("cannot … act as another participant").
- **Attack:** the facilitator opens Arjun's link in a private window and reads or edits Development's hidden answers. Nothing in the application can detect this. AD-2 documents "one person, two links" generally, but not that the **facilitator structurally receives all of them**.
- **Failure:** FR-10 and FR-24 as written are not met; they hold per credential, not per person. The leak test (per actor) passes anyway, so SS-2 would be over-claimed.
- **Fix (no new feature):** state this explicitly in AD-2 as an accepted MVP limitation. FR-10 and FR-24 are enforced **per credential**; the facilitator, as distributor of links, is trusted not to use them. Record the PRD reconciliation in `.memlog.md` and keep SS-2 wording honest. **This needs the user's decision.** The only technical closures, such as participant-claimed links, are new features and are out of this review's scope.

---

## Medium

### M1. Resolution status and `follow_up_owner` have two possible owners
- **Location:** AD-7, AD-8.
- **Unit A:** derives Resolved from the existence of a `resolution` row.
- **Unit B:** adds `question.resolution_status`, and `setFollowUpOwner` keeps working after resolution.
- **Failure:** the summary shows "Resolved" with a live "Follow-up: X", or the two status sources disagree. FR-17 and FR-18 say Open is never shown alongside resolved.
- **Fix:**
  - Resolution status is derived only, in one domain function: `Open | Resolved | n/a`, with `incomplete = Open ∧ follow_up_owner IS NULL`. It is never stored.
  - `setFollowUpOwner` requires `state=revealed`, classification ∈ {conflict, unanswered} and no resolution; otherwise it returns `ALREADY_RESOLVED`.
  - A DB trigger freezes `follow_up_owner` once a resolution exists.

### M2. Some immutability rules exist only at application level, so they can be bypassed
- **Location:** AD-6, AD-7, AD-8, AD-9, AD-10.
- **Gaps:**
  - Inserting a `resolution` doesn't verify at DB level that the question is revealed and classified conflict/unanswered.
  - `classification` → `not_yet_reviewed` is blocked only in the app.
  - `is_demo` is mutable: `UPDATE … SET is_demo=true` makes a **normal** session eligible for cleanup deletion.
  - `response` `DELETE` is unguarded (AD-10 only says there is no command).
  - "Recorded by" is rendered from a grant name that can change later.
- **Fix (AD-6/AD-7):** add triggers for each case:
  - resolution insert preconditions;
  - no transition back to `not_yet_reviewed`;
  - `is_demo` immutable after insert;
  - `response` DELETE allowed only via C3's demo path.
  - Also snapshot `recorded_by_name` into `resolution` at insert, and `classified_by_grant_id` on question (FR-15).

### M3. Lost updates on facilitator-entered fields across tabs
- **Location:** AD-5, AD-13 (`expected_grant_id` checks the role, not the state).
- **Attack:**
  - Tab A shows the warning "Saving as Aligned removes … owner (Maya Chen)". Meanwhile tab B sets the owner to "Arjun Rao". Tab A confirms, and Arjun is cleared without ever being shown.
  - Or tab A sets a follow-up owner on a question that tab B already changed to Aligned.
- **Fix (AD-5):** `classifyQuestion` and `setFollowUpOwner` carry `expected_classification` and `expected_follow_up_owner`. Inside the lock, a mismatch returns a new `STALE_QUESTION` code (reload message, same pattern as `STALE_ROLE`).

### M4. Demo reset and cleanup vs in-flight actions and stale tabs are undefined
- **Location:** AD-5 error set, AD-9, AD-13.
- **Unit A:** `resetDemo` re-clones with new ids.
- **Unit B:** the UI reloads the same URL after reset.
- **Failure:** the cookie points to a deleted grant. Commands that lose the race find 0 locked rows and have no `DomainError` code, so a raw error reaches the UI (against the conventions). A visitor active when the 24h cleanup runs is deleted mid-walkthrough.
- **Fix (AD-5/AD-9):**
  - Add `NOT_FOUND`, rendered as the access-denied page.
  - `resetDemo` re-points the credential cookie to the clone's facilitator grant and full-navigates to the clone's URL. Either keep the session id or return the new one; pick one and state it.
  - Cleanup uses `last_activity_at` or `created_at` with reset refreshing it, and takes the session row lock (H3).

### M5. The leak test can't detect response-type indicators or length channels
- **Location:** AD-12.3 ("any response-type indicator" has no operational definition).
- **Attack:** a CSS class like `pill--cant`, a `data-` attribute, a different DOM size, or a different status ordering. None of these contain a canary string.
- **Fix (AD-12.3): add a differential test.** For every registry interface × every non-author actor, render two fixtures that differ only in a hidden response's type, content and length. Outputs (HTML, RSC payload, action results, both copy formats) must be **byte-identical** after normalising ids, nonces and timestamps.

### M6. The one-time token display can be lost or leaked by a compliant implementation
- **Location:** AD-2.
- **Unit A:** `createSession` sets the facilitator cookie and calls `redirect('/s/{id}')`, the idiomatic server-action pattern. The tokens never render, and the session is unrecoverable by design.
- **Unit B:** puts tokens in a URL fragment or `sessionStorage` to survive navigation. AD-2 bans only query strings.
- **Fix (AD-2):**
  - `createSession` returns the tokens in the action result and does **not** redirect. It sets the facilitator cookie.
  - The UI navigates to S3 only on explicit user action.
  - Tokens never appear in any URL other than the shareable `/access/{token}` itself (no path, query or fragment), and never in web storage.
  - Links are built from a configured origin, not the request Host header.
  - The same rules apply to `assignPerspective` (H2).

### M7. Demo grants and the code-defined fixture can carry real access tokens
- **Location:** AD-9 ("versioned, code-defined fixture"), AD-2.
- **Unit A:** the fixture includes grant rows with fixed token hashes, because AD-2 says every grant has one.
- **Failure:** the plain tokens are in the public repo, and `/access/{token}` matches many clones (or breaks a unique index). Anyone can enter other visitors' demos.
- **Fix (AD-9):**
  - Demo grants have `token_hash NULL` (relax AD-2 for `is_demo`).
  - `/access` rejects demo grants.
  - Demo actors are reachable only via `createDemo` and `switchDemoActor`.
  - `demo_owner_key` is stored hashed and compared in constant time.

### M8. After a role change, back/forward can show the previous actor's hidden content
- **Location:** AD-4 (full navigation on a demo switch; "no client-side store").
- **Failure:** the Next.js client router cache, or the browser back-forward cache, can restore the previous actor's page after a demo switch or a role-link swap in the same browser. That page includes the other actor's own hidden answers. EXPERIENCE puts the switch under the NFR-1 privacy tests.
- **Fix (AD-4/AD-13):**
  - Role changes use `location.replace`.
  - Every session page embeds the rendered `grantId` and, on `pageshow`/hydration, compares it against a no-store `whoami` check. On mismatch it forces a reload.
  - The scaffold confirms the router cache stale time is 0 for dynamic pages.
  - Playwright adds switch → back.

---

## Low

- **L1. Question numbering shape.**
  - The problem: one unit numbers questions by position (removal renumbers, so earlier copies of "Q3" are wrong), while another stores `number = max+1` without a session lock, so duplicates can appear.
  - Fix: a stored `question.number`, assigned under the session row lock (H3) and never reused.
- **L2. Revealed-content reads rely on a code flag.**
  - Fix: content for non-authors comes only from a `revealed_response` view that joins `question.state='revealed'` in SQL, mirroring `response_status`.
- **L3. Anonymous interfaces contradict AD-1.**
  - `createSession`, `createDemo`, `/access`, S1 and the access-denied page have no actor.
  - Fix: the registry marks them `anonymous`, and the leak test includes the anonymous actor and an actor from another session.
- **L4. Error and log hygiene.**
  - Trigger `RAISE` messages carry a code only, never `NEW.*` values.
  - Logged errors exclude DB `DETAIL` and action arguments.
- **L5. Link-preview unfurls.**
  - The problem: AD-2 accepts preview bots fetching links. A bot following the 303 renders S3 with a role, and its unfurl caches the story and question text, because AD-3 puts these in titles and metadata.
  - Fix: no `og:`/description metadata. Session page titles are generic, or use the story title only, never question text.
- **L6. Login CSRF via cross-site `/access/{token}`.**
  - The problem: a participant can make a teammate's browser adopt the participant's own grant for the same session (SameSite=Lax allows top-level GET), so the teammate answers under the wrong perspective.
  - Mitigated by the role indicator and `STALE_ROLE`. Document it in AD-2's residual exposure.

---

## Concurrency matrix (after fixes)

| Pair | Lock path | Outcome |
|---|---|---|
| reveal vs submit/edit | question FOR UPDATE + AD-6 trigger | one wins; loser gets `QUESTION_REVEALED` |
| remove/edit-question vs submit | question FOR UPDATE + trigger | one wins; `HAS_RESPONSES` |
| assign vs submit | **session lock first (H3)** + composite FK (H2) | one wins |
| double `recordResolution` | question lock + unique | `ALREADY_RESOLVED` |
| classify vs resolve | question lock + AD-7 trigger + M2 insert trigger | serialised |
| classify/follow-up across tabs | **expected-state (M3)** | `STALE_QUESTION` |
| reset/cleanup vs any demo action | **session FOR UPDATE (H3)**, `NOT_FOUND` (M4) | defined |
| switch vs submit in another tab | AD-13 `expected_grant_id` | `STALE_ROLE` |
