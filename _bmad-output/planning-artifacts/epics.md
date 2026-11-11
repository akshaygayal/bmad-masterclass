---
status: final
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - planning-artifacts/prds/prd-bmad-masterclass-2026-11-10/prd.md
  - planning-artifacts/prds/prd-bmad-masterclass-2026-11-10/addendum.md
  - planning-artifacts/ux-designs/ux-bmad-masterclass-2026-11-10/DESIGN.md
  - planning-artifacts/ux-designs/ux-bmad-masterclass-2026-11-10/EXPERIENCE.md
  - planning-artifacts/ux-designs/ux-bmad-masterclass-2026-11-10/mockups/mockup-a-s3-workspace.html
  - planning-artifacts/ux-designs/ux-bmad-masterclass-2026-11-10/mockups/mockup-b-s3a-review-panel.html
  - planning-artifacts/architecture/architecture-bmad-masterclass-2026-11-10/ARCHITECTURE-SPINE.md
---

# Requirements Interpretation Alignment (working title): Epic Breakdown

## Overview

This document breaks down the requirements from the final PRD, the final UX contract (DESIGN.md + EXPERIENCE.md) and the final architecture spine into implementable epics and stories. **Nothing here is implemented or verified yet.** Customer validation was not conducted.

## Requirements Inventory

### Functional Requirements

- FR1: A person can create an alignment session from a story title (required) and description, and becomes its sole facilitator.
- FR2: The facilitator assigns at most one participant to each of Product, Development and QA. No person holds two perspectives; the facilitator holds zero or one. Perspectives may stay unassigned. An assignment is locked once that participant has responded.
- FR3: Each participant and the facilitator reach the session under a distinct role-tied identity. An actor with no role sees nothing.
- FR4: The facilitator or any participant can add a question at any time. It starts Hidden, and its author is recorded.
- FR5: Optional question prompts (boundaries, failures, permissions, exclusions); a question can be saved without them.
- FR6: Only the facilitator can remove a question, and only while it is Hidden with no submitted responses. Revealed questions can never be removed.
- FR7: The author can edit question wording only while it is Hidden with no responses; otherwise the user adds a follow-up question.
- FR8: A participant submits a substantive answer (non-empty) or Can't answer (optional reason), stored distinctly. One response per participant per question; no withdrawal.
- FR9: A participant can edit their own response, including switching type, while Hidden; editing after reveal is rejected.
- FR10: Before reveal, only the author can access a response's content, through any supported interface (including a facilitator who holds a perspective). Enforced at data access.
- FR11: Before reveal, the facilitator and participants see only Submitted / Not submitted per perspective, never content or response type.
- FR12: Only the facilitator reveals, per question, including partial and zero-submission reveals. Reveal is irreversible and affects only that question.
- FR13: Reveal locks the question: no creating or editing responses, including for a perspective that is Not submitted.
- FR14: Every revealed question shows response coverage (count of 3, naming any Not submitted).
- FR15: The facilitator classifies a revealed question as Aligned, Conflict or Unanswered (default Not yet reviewed). Never automatic. Aligned/Conflict require ≥2 substantive answers. Can't answer is never auto-Unanswered. The recorder is stored.
- FR16: Classification can be corrected only while unresolved. Resolved questions can't be reclassified. Open Conflict/Unanswered → Aligned clears the follow-up owner. No return to Not yet reviewed. No history kept.
- FR17: Resolution status applies only to Conflict/Unanswered (default Open). Resolved is final: it can't be edited, deleted or reopened; follow-up questions are used instead.
- FR18: Open items can have a named follow-up owner; a missing owner is flagged incomplete in the session and summary; Open items are never shown as ready or resolved.
- FR19: Marking Resolved requires a statement, decision owner name and role "as reported", and records the recorder separately. Nothing implies the decision owner confirmed anything in the app; no default to the facilitator.
- FR20: Decision summary, viewable and copyable as plain text or Markdown, with all fields. Hidden questions show state plus Submitted/Not submitted only. Incomplete and Not yet reviewed items are marked.
- FR21: A labelled fictional demo; all data fictional.
- FR22: The demo applies all rules unchanged (FR-1–FR-20).
- FR23: The demo resets to a defined starting dataset (UJ-1 cast; partial reveal, conflict, late question, open item).
- FR24: Role switching only in the isolated demo; no impersonation in normal sessions; demo and normal data separated.

### NonFunctional Requirements

- NFR1: Privacy enforcement verified by automated tests attempting to retrieve hidden content or response type as every other role, through every exposed interface, in normal and demo sessions.
- NFR2: Automated tests for every FR consequence, including edge cases (zero submissions, one substantive, all Can't answer, late question, open with and without owner, rejected reclassification of a Resolved question, impersonation outside the demo).
- NFR3: No real customer, candidate or employee data; demo data fictional.
- NFR4: WCAG 2.2 AA design and testing target; no conformance claim unless verified.
- NFR5: Desktop browser application.

### Additional Requirements

From the architecture spine (AD-1 to AD-21):
- **Starter:** scaffold with `create-next-app@16.4.x` (TypeScript, App Router). Pin the installed versions. Set `cacheComponents: false` and disable Partial Prefetching immediately (AD-4). **This affects Epic 1 Story 1.**
- **Persistence:** Neon Postgres via Drizzle `node-postgres` adapter + `pg` Pool with `attachDatabasePool`, on the Node runtime with Fluid compute. Pooled URL for the app, unpooled for migrations (AD-14).
- **Schema** with core columns (Conventions table). SQL views `response_status` (status-only) and revealed-only responses (AD-3). Triggers and constraints for the state machine (AD-6), write-once `resolution` (AD-7), and the `delete_demo_session` function with `SET LOCAL` guard (AD-19). All as custom SQL migrations.
- **Access:** 256-bit tokens, SHA-256 hash only. `GET /access/{token}` → HMAC cookie `rg_<sessionId>` (Path, HttpOnly, Secure, Lax, 30d) → 303. Uniform denial. `cookie.ts` is the sole owner (AD-1, AD-2, AD-17).
- **Grant lifecycle:** assign/replace issues a one-time link and revokes the old grant; locked once responded. Unique display names (AD-16).
- **Domain commands:** one transaction each. Lock order session → question → grant (AD-18). Check order: authorise → session match → state → content (AD-15). Typed `DomainError` codes. `expected_grant_id` → `STALE_ROLE` (AD-13). Expected classification/owner → `STALE_QUESTION` (AD-5).
- **Visibility projection and view-model types only to the UI; coverage computed from projection** (AD-3, AD-8, AD-20).
- **No caching or prefetching of session data:** `force-dynamic`, `prefetch={false}`, lint bans, `Cache-Control: private, no-store`, `location.replace` on demo switch and reset (AD-4).
- **Nonce-based CSP in `proxy.ts`;** referrer policies; no third-party scripts or analytics; Inter via `next/font` (AD-11).
- **Interface registry** `src/server/interfaces.ts` with a completeness test; `'use server'` only in `app/` (AD-1, AD-21).
- **Demo:** `POST /demo` creates or reuses a per-visitor demo from a versioned fixture; tokenless demo grants; hashed owner key; switch and reset rules; 24h opportunistic cleanup (AD-9).
- **Tests:** domain unit; integration against real Postgres; database guard tests; canary and differential leak tests; concurrency tests; Playwright e2e (demo path, keyboard, back/forward after switch, headers); axe-core (AD-12).
- **CI and deploy:** GitHub Actions with a Postgres service container on every push and PR; branch protection; Vercel deploy from `main`; migrations in the Vercel build only when `VERCEL_ENV=production`; backward-compatible migrations; Dependabot or Renovate.
- **Environment:** `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `SESSION_SECRET`, `APP_ORIGIN` (Vercel env vars).
- **Styling:** CSS Modules + CSS custom properties from DESIGN.md tokens; inline SVG icons.
- **UI state across re-renders:** `?review=<questionId>`; command results return a focus target and announcement; one-shot flash cookie for "Now acting as".

### UX Design Requirements

- UX-DR1: DESIGN.md tokens (colors, typography, rounded, spacing) implemented as CSS custom properties. Light mode only. Inter via `next/font`. The contrast pairs as specified (`border-strong` for control boundaries).
- UX-DR2: Question card component: state label + icon (Hidden / Revealed · Locked), question text, status row or answers + coverage, classification/resolution summary, actions. Follow-up meta ("Follow-up question · added by {name}").
- UX-DR3: Two-zone card when the facilitator holds a perspective: "Your answer, as {Perspective}" (participant zone) above "Facilitator" (facilitator zone), visually and structurally separated.
- UX-DR4: Status pill (pre-reveal): "{Perspective}: Submitted" (check) / "Not submitted" (dash). No other variant before reveal.
- UX-DR5: Answer block variants after reveal: substantive (full text, no truncation), Can't answer (label + icon + optional reason), Not submitted (dashed, labelled, never collapsed).
- UX-DR6: Response editor: Answer (textarea, non-empty) or Can't answer (+ optional reason); switch types while Hidden; Submit → submitted view with Edit; no withdraw.
- UX-DR7: Classification labels: Aligned (check, accent tint), Conflict (diamond, attention tint), Unanswered (question icon), Not yet reviewed (outline). Coverage always beside the label. Partial wording "Aligned · 2 of 3 substantive answers" + "Product and Development describe the same behaviour. QA: Not submitted." Aligned helper: "Same behaviour described. Not a judgement of correctness." Coverage line "Coverage: {n} of 3 submitted" + breakdown.
- UX-DR8: Review panel S3a: a non-modal labelled region ≥1100 CSS px, a full-width overlay below that (focus contained). Panel width clamp(600px, 60vw, 760px). Three columns only if inner width ≥ 680px, otherwise stacked. Opening another Review replaces the content. `?review=` in the URL.
- UX-DR9: Classification control: radio group + explicit Save classification. Aligned/Conflict `aria-disabled` with visible reason linked by `aria-describedby`. Warning dialog when Aligned clears the follow-up owner. Read-only "Locked by resolution" once Resolved.
- UX-DR10: Resolution section: Keep open (follow-up owner, "⚠ Incomplete: no follow-up owner" when empty) or Record final resolution (statement, decision owner name, role; required; no defaults; "Recorded by" automatic). Resolved record: "Resolved (final)" + statement + "Decision owner (as reported)" + "Recorded by".
- UX-DR11: Dialogs: Reveal Q{n} (partial and zero-submission variants), Record final resolution ("Record final resolution?" / "This decision cannot be edited or reopened in this version. To revisit it, add a follow-up question."), Remove question, Reset demo, Aligned clears owner, leave the links panel uncopied. Focus to heading, trapped, Esc cancels, confirm never the default focus.
- UX-DR12: Focus targets after actions: reveal → card heading; remove → next card heading or Add question; submit → Edit button; record resolution → Resolved record heading; save classification → label; reset → page heading; links panel → heading; assign/replace Done → perspective row.
- UX-DR13: Live-region announcements for state changes (reveal, classification saved, final resolution recorded, copied, now acting as…). Screen-reader text never contains hidden content or type.
- UX-DR14: S1 Start (Create alignment session, Open demo). S2 Create alignment session (title, description, assign perspectives with inline duplicate-person rejection).
- UX-DR15: S2 Access links panel: one-time links per issued grant, persistent warning "These access links are shown only once. Save them now. If lost, they cannot be recovered.", Copy link per row, unassigned note, non-blocking leave confirmation when not all copied, never re-shown; facilitator already signed in.
- UX-DR16: S3 header: story title, "You: {roles}" indicator, decision summary link, perspective list with Assign… / Replace… (only before responses; "Locked: {Perspective} has responded") and a dialog showing the new link once, with a revocation notice.
- UX-DR17: S3 workspace list: cards in creation order; empty state "No questions yet" + Add question with optional prompts; Edit question for the author when eligible; conflicting-action messages (e.g. "Q2 was revealed by the facilitator, so your change wasn't saved…").
- UX-DR18: S4 Decision summary: per question, number + text, state, classification, coverage in words, resolution/attribution or open follow-up, incomplete and Not yet reviewed markers. Hidden questions show status only. Copy as Markdown / Copy as plain text, with "Copied".
- UX-DR19: Access denied page: "You don't have access to this alignment session." No details.
- UX-DR20: Demo layer: persistent banner "Fictional demo · all people, companies and data are invented"; role switcher with one segment per person (Maya Chen: Facilitator · Product; Arjun Rao: Development; Lena Novak: QA); "Acting as …"; Reset demo (with confirmation). Switching closes panels and dialogs, discards drafts after confirmation, and does a full reload as the new actor.
- UX-DR21: Accessibility floor: full keyboard operability; focus never obscured (2.4.11); 2px focus ring in the focus colour; targets ≥ 24×24 (2.5.8); 200% resize and reflow without loss (overlay panel below 1100px); persistent labels; errors tied to fields; reduced motion respected.
- UX-DR22: Desktop layout: designed at 1280×800, minimum 1024px; workspace column ≈760px max; no horizontal scrolling.

### FR Coverage Map

- FR1: Epic 1 (Story 1.2): create session, sole facilitator
- FR2: Epic 1 (1.2, assignment at creation); Epic 3 (3.3, later assign/replace)
- FR3: Epic 1 (1.2): distinct role access, uniform denial; Epic 3 (3.3): revocation
- FR4: Epic 1 (1.3): add questions; Epic 3 (3.1): follow-up questions
- FR5: Epic 1 (1.3): optional prompts
- FR6: Epic 3 (3.2): remove rules
- FR7: Epic 3 (3.2): edit rules
- FR8, FR9: Epic 1 (1.4): submit and edit responses
- FR10, FR11: Epic 1 (1.4): enforced privacy and status-only view; re-verified in 1.5, 2.1, 2.5, 4.1, 4.2
- FR12, FR13: Epic 1 (1.5): per-question reveal and lock
- FR14: Epic 1 (1.5): coverage; Epic 2 (2.1, 2.2): coverage in review and classification
- FR15: Epic 2 (2.2): classification
- FR16: Epic 2 (2.2, 2.3, 2.4): correction rules
- FR17: Epic 2 (2.3, 2.4): resolution status, finality
- FR18: Epic 2 (2.3): follow-up owner, incomplete flag
- FR19: Epic 2 (2.4): reported attribution
- FR20: Epic 2 (2.5): decision summary
- FR21–FR24: Epic 4 (4.1–4.4): demo
- NFR1: 1.4 (canary + differential), 1.5, 2.1, 2.5, 3.2, 3.3, 4.1, 4.2
- NFR2: every story's negative/edge ACs; concurrency in 1.3, 1.5, 2.4, 3.2, 3.3, 4.3
- NFR3: 1.1, 4.1
- NFR4: 1.1 (tooling), 1.3–1.5, 2.1, 2.2, 2.4, 4.2, 4.4
- NFR5: 1.1
- UX-DR coverage: DR1 1.1 · DR2 1.3, 3.1 · DR3 1.4 · DR4 1.4 · DR5 1.5 · DR6 1.4 · DR7 1.5, 2.2 · DR8 2.1 · DR9 2.2, 2.3 · DR10 2.3, 2.4 · DR11 1.2, 1.5, 2.3, 2.4, 3.2, 4.3 · DR12 1.2–1.5, 2.1–2.4, 3.2, 3.3 · DR13 1.4, 1.5, 2.2, 2.4, 2.5, 4.2 · DR14 1.1, 1.2 · DR15 1.2, 3.3 · DR16 1.2 (role indicator), 3.3 · DR17 1.3, 1.5, 3.1, 3.2 · DR18 2.5 · DR19 1.2 · DR20 4.1, 4.2, 4.4 · DR21 1.4, 2.1, 4.4 · DR22 1.1, 2.1
- AD coverage: AD-1 1.2–1.4 · AD-2 1.2, 3.3 · AD-3 1.4, 1.5, 2.1, 2.5 · AD-4 1.1, 1.4, 4.2 · AD-5 all commands · AD-6 1.4, 1.5, 2.2, 3.2, 3.3, 4.1 · AD-7 2.4, 4.3 · AD-8 1.5, 2.2, 2.3 · AD-9 4.1–4.3 · AD-10 1.4 (no withdraw) · AD-11 1.1, 1.2 · AD-12 throughout · AD-13 1.4, 4.2 · AD-14 1.1 · AD-15 1.3–1.5, 2.2, 2.4, 3.2 · AD-16 1.2, 3.3 · AD-17 1.2, 3.3, 4.2 · AD-18 1.3, 1.5, 2.4, 3.2, 3.3, 4.3 · AD-19 4.3 · AD-20 1.4, 1.5, 2.1, 2.5 · AD-21 1.1, 1.2

## Epic List

### Epic 1: Independent answers with private, per-question reveal
A facilitator creates a session and saves one-time links. Participants answer privately. Everyone sees only Submitted / Not submitted until per-question reveal, which locks the question and shows coverage.
**FRs covered:** FR1, FR2 (creation), FR3, FR4, FR5, FR8–FR14 · **Stories:** 5

### Epic 2: Compare, classify and record decisions
The team compares revealed answers, classifies them under the minimum-evidence rule, and records final resolutions (as reported) or open items with owners; a copyable decision summary results.
**FRs covered:** FR14 (review), FR15–FR20 · **Stories:** 5

### Epic 3: Adjust questions and participants during an alignment
Follow-up questions after reveal; edit and remove only when permitted; assign or replace participants with new one-time links and revocation.
**FRs covered:** FR2 (later), FR4 (follow-up), FR6, FR7 · **Stories:** 3

### Epic 4: Self-guided fictional demo
Isolated per-visitor demo with role switching under the same rules, reset and cleanup, and a polished 2–3 minute walkthrough.
**FRs covered:** FR21–FR24 · **Stories:** 4

**Approved implementation priority order** (user, 2026-11-10). This is a priority order only; it doesn't change story dependencies or MVP scope:
1. Epic 1: establish the core workflow and prove hidden-answer privacy.
2. Epic 2: compare, classify, resolve and copy decisions.
3. Story 3.1: follow-up questions.
4. Epic 4: complete the repeatable fictional portfolio demo.
5. Stories 3.2 and 3.3: complete the remaining MVP functionality (required for the completed MVP).

## Epic 1: Independent answers with private, per-question reveal

A facilitator creates an alignment session and saves one-time access links for Product, Development and QA. Each participant answers privately. Before reveal, everyone sees only Submitted / Not submitted. The facilitator reveals questions one at a time (including partial and zero-submission reveals), which locks each question and shows its coverage. This is the core slice proving independent answers, server-enforced privacy and per-question reveal.

### Story 1.1: Deployable project foundation from the starter template

As the solo developer,
I want a working, deployable baseline with the shared safeguards in place,
So that every later story builds on the agreed stack, security headers and test infrastructure instead of re-deciding them.

**Refs:** NFR-3, NFR-4, NFR-5; AD-4, AD-11, AD-12 (tooling only), AD-14, AD-21; UX-DR1, UX-DR22. **Scope note:** sets up tooling and infrastructure only. It does **not** claim that any privacy, concurrency or accessibility test has passed; those belong to the stories that implement the behaviour.

**Acceptance Criteria:**

**Given** an empty repository
**When** the project is scaffolded with `create-next-app@16.4.x` (TypeScript, App Router)
**Then** installed versions are pinned in the lockfile, and the Node version is set to 22 LTS or newer
**And** `next.config` sets `cacheComponents: false`, with Partial Prefetching disabled.

**Given** the codebase
**When** lint runs
**Then** it fails on any `'use cache'`, `unstable_cache` or `force-cache` usage in `app/` or `src/server/`, on any `'use server'` module outside `app/`, and on any import of `src/server/db` from `app/`.

**Given** any response from the app
**When** headers are inspected in an automated test
**Then** a nonce-based CSP from `proxy.ts` (`script-src 'self' 'nonce-…' 'strict-dynamic'`, `frame-ancestors 'none'`) and `Referrer-Policy: strict-origin-when-cross-origin` are present
**And** no third-party script, font or analytics request is made (Inter is loaded via `next/font`).

**Given** the repository
**When** a commit is pushed or a PR is opened
**Then** GitHub Actions runs lint, type-check, unit and integration tests against a Postgres service container, with migrations applied first
**And** branch protection requires CI to pass before merging to `main`, and Dependabot or Renovate is configured.

**Given** the Drizzle `node-postgres` adapter over a `pg` Pool registered with `attachDatabasePool`
**When** the app runs locally, in CI and on Vercel (Node runtime, Fluid compute)
**Then** it connects using `DATABASE_URL` (pooled), and migrations use `DATABASE_URL_UNPOOLED`
**And** production migrations run only via a controlled, single-run step (a manual `workflow_dispatch` job or `npm run db:migrate:prod`), never automatically in Vercel builds (amended 2026-11-10 by user instruction).

**Given** `src/server/interfaces.ts` exists (initially listing S1 only)
**When** the registry-completeness test runs
**Then** it fails if any page, route handler or exported server action is missing from the registry, or a registry entry no longer exists.

**Given** DESIGN.md tokens
**When** the global stylesheet loads
**Then** all colour, typography, radius and spacing tokens exist as CSS custom properties (light mode only), and a CSS Modules convention is in place
**And** S1 renders "Create alignment session" and "Open demo" (the latter not yet functional), and is deployed and reachable on Vercel.

**Given** the test harnesses
**When** they run
**Then** Vitest (unit and integration), Playwright, and @axe-core/playwright each execute at least one smoke test.

### Story 1.2: Create an alignment session and save the one-time access links

As a facilitator,
I want to create an alignment session for a story and receive a private link for each perspective,
So that each participant can reach the session as their own role without accounts.

**Refs:** FR-1, FR-2 (assignment at creation), FR-3; AD-1, AD-2, AD-5, AD-15, AD-16, AD-17; UX-DR11 (leave confirmation), UX-DR12, UX-DR14, UX-DR15, UX-DR19, UX-DR21; PRD addendum §E. **Creates:** `alignment_session` and `access_grant` (unique `(session_id, perspective)`, one facilitator grant per session; Story 3.3 later converts these to partial indexes over non-revoked grants).

**Acceptance Criteria:**

**Given** S2
**When** the facilitator submits a story title (required), a description, and names for zero to three perspectives (optionally taking one perspective themselves)
**Then** a session is created with exactly one active facilitator grant (combined with a perspective if one was taken) and one grant per assigned perspective
**And** an empty title, or the same display name for two perspectives (case-insensitive), is rejected inline (`DUPLICATE_PERSON`).

**Given** a successful create
**When** the Access links panel renders
**Then** each issued grant shows its role, name and full link `{APP_ORIGIN}/access/{token}` (256-bit random) with a Copy link button, and unassigned perspectives show "Not assigned…"
**And** the persistent warning "These access links are shown only once. Save them now. If lost, they cannot be recovered." is shown
**And** only the SHA-256 hash of each token is stored.

**Given** the Access links panel
**When** the facilitator chooses Continue to session without copying every link
**Then** a confirmation dialog appears ("You haven't copied every link…"), with focus moved to its heading and confirm not the default focus
**And** once the panel is left, or the page reloaded, the links can never be displayed again.

**Given** session creation
**When** it completes
**Then** the facilitator's browser holds the `rg_<sessionId>` cookie (HttpOnly, Secure, SameSite=Lax, `Path=/s/<sessionId>`, Max-Age 30 days, HMAC of `{grantId, sessionId}`), set only via `access/cookie.ts`
**And** the create response does not redirect and sends `Cache-Control: no-store`.

**Given** a valid access link
**When** it is opened
**Then** `GET /access/{token}` sets that grant's cookie and responds `303` to `/s/{sessionId}`, with `Referrer-Policy: no-referrer`, `Cache-Control: no-store` and `X-Robots-Tag: noindex`.

**Given** an unknown token, a missing or invalid cookie, an unknown session id, or a cookie for a different session
**When** any session URL is requested
**Then** the same access-denied response ("You don't have access to this alignment session.") is returned with an identical status code and no session details.

**Given** the S3 header for any actor
**When** it renders
**Then** it shows the story title and a "You: {roles}" indicator (e.g. "Facilitator · Product").

**Given** these new interfaces
**When** the registry test runs
**Then** `/new`, the create action, `/access/[token]` and `/s/[sessionId]` are registered
**And** the server logs contain no token values (verified by an integration test that captures log output).

### Story 1.3: Add questions to an alignment session

As a facilitator or participant,
I want to add concrete behavioural questions to the session,
So that each perspective can answer them independently.

**Refs:** FR-4, FR-5; AD-1, AD-5, AD-15, AD-18; UX-DR2, UX-DR17, UX-DR21. **Creates:** `question` (id, session_id, number, text, author_grant_id, state default `hidden`, revealed_at).

**Acceptance Criteria:**

**Given** an actor with a role in the session
**When** they add a question with non-empty text
**Then** it is created with state Hidden, the next per-session number (assigned under the session-row lock) and the author recorded
**And** the new card appears last in S3, and focus moves to it.

**Given** the add-question form
**When** the author expands the optional prompts (boundaries, failures, permissions, exclusions)
**Then** the prompts are shown, and a question can be saved without using them.

**Given** an empty session
**When** S3 renders
**Then** the empty state "No questions yet" with Add question is shown.

**Given** an actor without a role, or a request targeting another session's id
**When** they try to add a question
**Then** the request fails with the uniform denial or `NO_ACCESS`, and no question is created (integration test).

**Given** two concurrent add-question commands
**When** both commit
**Then** they receive distinct, consecutive numbers (concurrency test).

**Given** a Hidden question card
**When** rendered
**Then** it shows "Q{n} · Hidden · answers stay private until revealed" with the closed-eye icon and text, never colour alone.

### Story 1.4: Answer questions independently with enforced privacy

As a participant,
I want to submit and edit my own answer (or say I can't answer) without anyone seeing it before reveal,
So that my interpretation is captured independently of the others.

**Refs:** FR-8, FR-9, FR-10, FR-11; NFR-1, NFR-2, NFR-4; AD-1, AD-3, AD-4, AD-5, AD-6 (response guards), AD-13, AD-15, AD-20; UX-DR3, UX-DR4, UX-DR6, UX-DR12, UX-DR13, UX-DR21. **Creates:** `response` (composite FK `(author_grant_id, perspective)`, `unique(question_id, perspective)`), the `response_status` view (status-only), and triggers blocking response insert/update on revealed questions and response deletes.

**Acceptance Criteria:**

**Given** a participant holding a perspective and a Hidden question
**When** they submit a non-empty answer, or Can't answer with an optional reason
**Then** one response is stored for that perspective, with type `answer` or `cant_answer`
**And** an empty substantive answer is rejected
**And** after submit, focus moves to the Edit button.

**Given** their own submitted response on a Hidden question
**When** they edit it, including switching between answer and Can't answer
**Then** the change is saved; there is no withdraw action.

**Given** a facilitator who also holds Product
**When** S3 renders a Hidden question
**Then** "Your answer, as Product" (participant zone) and "Facilitator" (status row) are visually and structurally separate zones.

**Given** any non-author actor, including a facilitator who holds another perspective
**When** a Hidden question is rendered or any registered interface is called
**Then** they receive only "{Perspective}: Submitted / Not submitted" per perspective, from the status-only view
**And** no response content, reason or response type appears in HTML, RSC payload, server-action results, errors, page title or screen-reader text.

**Given** canary strings seeded as hidden answer content and as Can't-answer reasons
**When** the canary leak test calls every registered interface as every non-author actor
**Then** no canary or response-type indicator appears in any output (test must pass).

**Given** two fixtures differing only in a hidden response's type, content and length
**When** each non-author actor renders S3
**Then** the outputs are byte-identical (differential leak test must pass).

**Given** a tab rendered for Development while the browser's cookie has since changed to QA
**When** that tab submits a response
**Then** the command returns `STALE_ROLE` ("Your access in this browser has changed. Reload to continue."), and no response is written.

**Given** a direct SQL attempt to delete a response
**When** executed in a database guard test
**Then** it is rejected.

**Given** session pages
**When** fetched
**Then** they render dynamically with `Cache-Control: private, no-store`, and links to session routes use `prefetch={false}` (e2e header assertion).

**Given** the response editor and status pills
**When** checked with axe and keyboard-only navigation
**Then** there are no axe violations at the WCAG 2.2 AA rule set, every control is keyboard-operable with a visible focus ring, and targets are at least 24×24px.

### Story 1.5: Reveal a question and lock its answers

As a facilitator,
I want to reveal one question at a time, even if someone hasn't answered,
So that the team sees all submitted interpretations side by side at the right moment.

**Refs:** FR-12, FR-13, FR-14; NFR-1, NFR-2, NFR-4; AD-3, AD-5, AD-6, AD-8 (coverage), AD-15, AD-18, AD-20; UX-DR5, UX-DR7 (coverage line), UX-DR11 (reveal dialogs), UX-DR12, UX-DR13. **Creates:** the revealed-only responses view, and the trigger forbidding a change from revealed back to hidden.

**Acceptance Criteria:**

**Given** a Hidden question
**When** the facilitator chooses Reveal… and confirms
**Then** that question becomes Revealed, `revealed_at` is set, and no other question changes state
**And** the dialog names any Not-submitted perspective ("QA has not submitted and won't be able to after reveal"), or for zero submissions states it will show 0 of 3 and can only be classified Unanswered
**And** focus moves into the dialog heading (confirm not the default focus), then after reveal to the revealed card's heading, with "Q{n} revealed. {n} of 3 submitted." announced.

**Given** a participant (not the facilitator)
**When** they attempt to reveal through any interface
**Then** `NOT_FACILITATOR` is returned, and nothing changes.

**Given** a Revealed question
**When** any actor views it
**Then** all submitted responses are shown in full (substantive text, Can't answer label + reason), Not submitted perspectives show a dashed, labelled slot, and "Revealed · Locked" is shown with a lock icon
**And** the coverage line reads "Coverage: {n} of 3 submitted", with the breakdown and names of any Not-submitted perspective, computed from projection output only.

**Given** a Revealed question
**When** any actor tries to submit, edit or newly answer it (including a Not-submitted perspective)
**Then** `QUESTION_REVEALED` is returned
**And** a direct SQL insert or update of its responses, or a state change back to hidden, is rejected by database guards.

**Given** reveal and submit are executed concurrently on the same question
**When** both run
**Then** exactly one ordering wins: either the submission is included and locked, or it is rejected with `QUESTION_REVEALED` (concurrency test).

**Given** a user editing their answer when the question is revealed
**When** they save
**Then** the save is rejected with "Q{n} was revealed by the facilitator, so your change wasn't saved. Answers are locked after reveal."

**Given** a revealed question with zero submissions
**When** displayed
**Then** it shows 0 of 3 submitted, with all three perspectives Not submitted.

## Epic 2: Compare, classify and record decisions

The team compares revealed answers side by side and records a human classification, subject to the minimum-evidence rule. Each Conflict or Unanswered item ends either as a **final** resolution (decision owner as reported, plus recorder) or **open** with a named follow-up owner, flagged incomplete if none is named. A copyable decision summary is the traceable outcome.

### Story 2.1: Compare revealed answers in the review panel

As a facilitator or participant,
I want to open a focused panel showing all three interpretations of a revealed question,
So that the team can compare them readably during discussion.

**Refs:** FR-14; NFR-4; AD-3, AD-4, AD-20; UX-DR8, UX-DR12, UX-DR21, UX-DR22.

**Acceptance Criteria:**

**Given** a Revealed question
**When** the facilitator chooses Review (or a participant chooses View)
**Then** the panel opens with the question, the answers by perspective, and the coverage line; `?review=<questionId>` is set in the URL; and focus moves to the panel heading.

**Given** a viewport of at least 1100 CSS px
**When** the panel opens
**Then** it is a non-modal labelled region beside the list, clamp(600px, 60vw, 760px) wide; Tab moves through the panel then on to the next card; and Esc or Close returns focus to the Review button.

**Given** a panel inner width under 680px, or a viewport under 1100 CSS px (including 200% zoom on a 1280px screen)
**When** the panel opens
**Then** the answers stack vertically, headed by perspective, with no horizontal scroll, and below 1100px the panel is a full-width overlay with contained focus.

**Given** the panel is open for Q2
**When** Review is chosen on Q3
**Then** the panel content is replaced, and focus moves to the new heading.

**Given** a Hidden question
**When** `?review=<hiddenQuestionId>` is requested
**Then** no panel content beyond the question text and status is rendered (leak test covers this interface).

**Given** the panel at 1280px and 1024px
**When** checked with axe and keyboard-only
**Then** there are no axe violations, and focus is never obscured.

### Story 2.2: Classify a revealed question with an explicit save

As a facilitator,
I want to record whether the answers are Aligned, in Conflict or Unanswered after the team discusses them,
So that the outcome is a human judgement with the evidence visible.

**Refs:** FR-15, FR-16; NFR-2; AD-5, AD-6, AD-8, AD-15; UX-DR7, UX-DR9, UX-DR12, UX-DR13 (the owner-clearing warning arrives with the follow-up owner in Story 2.3). **Adds:** `classification` (default `not_yet_reviewed`), `classified_by_grant_id`, and guards (no classification on hidden questions, no return to `not_yet_reviewed`).

**Acceptance Criteria:**

**Given** a Revealed question in the panel
**When** the facilitator selects an option
**Then** nothing is saved until Save classification is chosen; arrow-key movement alone changes nothing.

**Given** fewer than 2 substantive answers
**When** the panel renders
**Then** Aligned and Conflict are `aria-disabled` (focusable, not selectable), with the visible reason "Needs at least 2 substantive answers ({n} available)" linked via `aria-describedby`
**And** a forced save of Aligned or Conflict is rejected with `INSUFFICIENT_EVIDENCE`.

**Given** a Hidden question
**When** a classify command is sent
**Then** it fails with `QUESTION_HIDDEN` **before** any evidence count is evaluated (check order per AD-15)
**And** a direct SQL update of the classification on a hidden question is rejected.

**Given** a saved classification
**When** viewed
**Then** the label shows with its icon and text (Aligned / Conflict / Unanswered), the coverage line remains visible, and partial Aligned reads "Aligned · 2 of 3 substantive answers", plus "Product and Development describe the same behaviour. QA: Not submitted."; the recorder is stored
**And** Can't answer responses never set Unanswered automatically, and the application never pre-selects a classification.

**Given** a participant
**When** they send a classify command
**Then** `NOT_FACILITATOR` is returned.

**Given** a classified, unresolved question
**When** the facilitator changes it between Aligned, Conflict and Unanswered
**Then** the change is saved, and no option returns it to Not yet reviewed.

**Given** the classification shown to the user differs from the stored one (changed in another tab)
**When** they save
**Then** `STALE_QUESTION` is returned, and nothing changes.

### Story 2.3: Keep an item open with a named follow-up owner

As a facilitator,
I want to leave a Conflict or Unanswered item open and name who follows it up,
So that unresolved questions are visible and owned rather than silently dropped.

**Refs:** FR-16, FR-17, FR-18; AD-5, AD-8; UX-DR9, UX-DR10, UX-DR11. **Adds:** `follow_up_owner` (free text). Resolution status is derived, never stored.

**Acceptance Criteria:**

**Given** a question classified Conflict or Unanswered with no resolution
**When** viewed
**Then** its derived resolution status is Open
**And** without a follow-up owner it shows "⚠ Incomplete: no follow-up owner" on the card and in the panel, and is never shown as ready or resolved.

**Given** an Open item
**When** the facilitator enters a follow-up owner and saves
**Then** it shows "Open · Follow-up: {name}".

**Given** an item classified Aligned or Not yet reviewed
**When** a set-follow-up-owner command is sent
**Then** it is rejected, and no owner is stored.

**Given** an Open Conflict with a follow-up owner
**When** the facilitator saves Aligned
**Then** a warning names the owner to be cleared ("Saving as Aligned removes the open follow-up and its owner ({name})…") and must be confirmed; on confirm, the owner is cleared.

**Given** an Open item changed between Conflict and Unanswered
**When** saved
**Then** the follow-up owner is kept.

**Given** the owner shown to the user differs from the stored one
**When** they save
**Then** `STALE_QUESTION` is returned.

### Story 2.4: Record a final resolution with reported attribution

As a facilitator,
I want to record the authorised decision for a Conflict or Unanswered item,
So that the team keeps a traceable, unchangeable record of what was decided and by whom.

**Refs:** FR-17, FR-19; NFR-2; AD-5, AD-7, AD-15, AD-18; UX-DR10, UX-DR11, UX-DR12, UX-DR13. **Creates:** `resolution` (PK `question_id`; statement, decision_owner_name, decision_owner_role, recorded_by_grant_id, recorded_by_name, created_at), an insert-only trigger, and a trigger freezing classification and follow-up owner once resolved.

**Acceptance Criteria:**

**Given** an unresolved Conflict or Unanswered question
**When** the facilitator chooses Record final resolution and enters a statement, decision owner name and role
**Then** the dialog "Record final resolution?" / "This decision cannot be edited or reopened in this version. To revisit it, add a follow-up question." appears (confirm not the default focus); on confirm, the resolution is stored with the recorder captured automatically
**And** the record shows "Resolved (final)", the statement, "Decision owner (as reported): {name}, {role}" and "Recorded by: {name} (facilitator)", and focus moves to the record heading.

**Given** the resolution form
**When** it opens
**Then** the decision-owner fields are empty (never pre-filled with the facilitator), and a missing statement, name or role is rejected inline.

**Given** a Resolved question
**When** any actor attempts to edit or delete the resolution, change its classification, or change its follow-up owner, through the app or direct SQL
**Then** the attempt is rejected (`ALREADY_RESOLVED`, or a database trigger error in guard tests)
**And** the classification control shows "Locked by resolution".

**Given** a question that is Hidden, Aligned or Not yet reviewed
**When** a record-resolution command is sent
**Then** it is rejected by both the application and the database.

**Given** two concurrent record-resolution commands for the same question
**When** both run
**Then** exactly one succeeds, and the other returns `ALREADY_RESOLVED` (concurrency test).

**Given** classify and record-resolution run concurrently
**When** both execute
**Then** the outcome is consistent: a classification change after the resolution is rejected (concurrency test).

**Given** no wording in the UI
**When** reviewed
**Then** no label uses "agreed", "approved", "confirmed by" or "verified".

### Story 2.5: View and copy the decision summary

As a facilitator or participant,
I want a concise summary of every question's outcome that I can copy into our tracker,
So that the decisions and open items are referenceable from the team's existing tools.

**Refs:** FR-20; NFR-1; AD-3, AD-4, AD-20; UX-DR13, UX-DR18.

**Acceptance Criteria:**

**Given** a session with questions in mixed states
**When** S4 renders
**Then** each question shows its number and text, state, classification, coverage in words (naming any Not-submitted perspective), and, where applicable, the resolution statement, decision owner (as reported), recorder, or the open follow-up owner
**And** Not yet reviewed items and Open items without an owner are visibly marked.

**Given** a Hidden question
**When** shown in the summary or the copied output
**Then** only its state and Submitted / Not submitted per perspective appear (canary and differential leak tests cover S4 and both copy outputs).

**Given** S4
**When** the user chooses Copy as Markdown or Copy as plain text
**Then** the full summary, including all markers, is copied in that format, and "Copied" is shown and announced.

**Given** an actor without a role
**When** requesting S4
**Then** the uniform access-denied response is returned.

## Epic 3: Adjust questions and participants during an alignment

Teams adapt as discussion unfolds. Anyone can add a follow-up question after others are revealed, and it starts hidden. Authors can edit, and facilitators can remove, questions only when permitted. Facilitators can assign or replace a participant before that perspective has answered, issuing a new one-time link and revoking the old one.

### Story 3.1: Add a follow-up question after questions are revealed

As a facilitator or participant,
I want to add a question after others have been revealed,
So that a new question raised in discussion is answered independently too.

**Refs:** FR-4 (follow-up), FR-12; AD-5, AD-18; UX-DR2, UX-DR17. **Adds:** `question.is_follow_up`.

**Acceptance Criteria:**

**Given** a session where at least one question is Revealed
**When** an actor adds a question
**Then** it is created Hidden with `is_follow_up = true`, and its card shows "Follow-up question · added by {name}"
**And** previously revealed questions are unaffected.

**Given** a session with no revealed questions
**When** a question is added
**Then** `is_follow_up` is false.

**Given** a follow-up question
**When** answered, revealed and classified
**Then** it follows exactly the same rules as any other question (covered by reusing the Story 1.4 and 1.5 test suites with follow-up fixtures).

### Story 3.2: Edit or remove a question only while permitted

As a question author or facilitator,
I want to fix a question's wording or remove it before anyone has answered,
So that mistakes can be corrected without altering what people responded to.

**Refs:** FR-6, FR-7; NFR-2; AD-5, AD-6, AD-15, AD-18; UX-DR11, UX-DR12, UX-DR17. **Adds:** guards for question text updates and deletes.

**Acceptance Criteria:**

**Given** a Hidden question with zero responses
**When** its author edits the wording
**Then** it is saved; the Edit question action is visible only to the author and only in this state.

**Given** a question with at least one response, or a Revealed question
**When** an edit is attempted
**Then** it is rejected with "This question can no longer be edited because a response has been submitted. Add a follow-up question instead." (or `QUESTION_REVEALED`), and direct SQL updates are rejected.

**Given** a Hidden question with zero responses
**When** the facilitator removes it via the confirmation dialog
**Then** it is deleted, and focus moves to the next card's heading (or Add question).

**Given** a question with responses, a Revealed question, or a participant actor
**When** removal is attempted
**Then** it is rejected (`HAS_RESPONSES`, `QUESTION_REVEALED`, `NOT_FACILITATOR`), and direct SQL deletes are rejected.

**Given** removal and submit are executed concurrently
**When** both run
**Then** exactly one wins (concurrency test).

**Given** a non-author or non-facilitator
**When** viewing a card
**Then** no Edit or Remove action is shown to them, and the response status shown to them reveals no response types.

### Story 3.3: Assign or replace a participant with a new one-time link

As a facilitator,
I want to assign an unassigned perspective, or replace an assignee before they've answered,
So that the right person can take part, and an old link stops working.

**Refs:** FR-2, FR-3; NFR-1, NFR-2; AD-2, AD-6, AD-16, AD-17, AD-18; UX-DR12, UX-DR15, UX-DR16; PRD addendum §E. **Adds:** `access_grant.revoked_at` (converting the Story 1.2 uniqueness constraints to partial indexes over non-revoked grants), revoked grants added to the uniform-denial cases, and the guard on grant replacement once a perspective has responded.

**Acceptance Criteria:**

**Given** an unassigned perspective
**When** the facilitator chooses Assign… and enters a unique display name
**Then** a new grant and token are created, and the dialog shows the new link once with Copy link and the one-time warning; after Done it can't be shown again, and focus returns to that perspective's row.

**Given** an assigned perspective with no responses
**When** the facilitator chooses Replace… and confirms "{Old name}'s current link will stop working immediately."
**Then** the old grant gets `revoked_at`, a new grant and link are issued and shown once, and the reassignment notice is displayed.

**Given** a revoked grant
**When** its link or cookie is used
**Then** the uniform access-denied response is returned.

**Given** a perspective that has any response
**When** Replace is attempted (UI or command)
**Then** it is unavailable ("Locked: {Perspective} has responded") and rejected, and direct SQL replacement is rejected.

**Given** replace and submit for the same perspective are executed concurrently
**When** both run
**Then** exactly one wins under the session-then-question lock order (concurrency test).

**Given** a participant
**When** an assign or replace command is sent
**Then** `NOT_FACILITATOR` is returned.

**Given** a display name already used in the session
**When** assignment is attempted
**Then** `DUPLICATE_PERSON` is returned.

## Epic 4: Self-guided fictional demo

A portfolio visitor opens a clearly labelled, isolated demo of their own, switches between the fictional people under the same rules as real sessions, resets it, and walks through the full journey in about 2–3 minutes. Role switching never exists in real sessions.

### Story 4.1: Open a per-visitor fictional demo

As a portfolio visitor,
I want to open a demo preloaded with the fictional Brightleaf story,
So that I can explore the workflow without links or affecting anyone else.

**Refs:** FR-21, FR-22, FR-23; NFR-3; AD-4, AD-9, AD-17; UX-DR20. **Adds:** `alignment_session.is_demo` (immutable after insert, guarded), `demo_owner_key_hash`, and nullable `token_hash` for demo grants.

**Acceptance Criteria:**

**Given** S1
**When** the visitor chooses Open demo (a `POST /demo` form submission; GET never creates)
**Then** a new demo session is cloned in one transaction from the versioned fixture: the UJ-1 cast (Maya: Facilitator · Product; Arjun; Lena; Daniel as decision owner, not a user), and the FR-23 starting questions and responses
**And** the visitor gets a hashed-key `demo_owner` cookie and Maya's grant cookie, and lands on S3.

**Given** a visitor with a live demo
**When** they choose Open demo again
**Then** their existing demo is reused.

**Given** demo grants
**When** inspected
**Then** they have no token, and `/access/{anything}` never grants demo access.

**Given** any demo screen and the demo summary
**When** rendered
**Then** the banner "Fictional demo · all people, companies and data are invented" is visible; it never appears for normal sessions.

**Given** an attempt to set `is_demo` on a normal session, or to change it on a demo session
**When** executed via SQL
**Then** it is rejected.

**Given** all Epic 1–3 behaviour
**When** exercised inside a demo session
**Then** the same rules apply (privacy, reveal, lock, classification, resolution), and the canary leak test includes demo sessions.

### Story 4.2: Switch between fictional people under the same rules

As a portfolio visitor,
I want to act as Maya, Arjun or Lena,
So that I can see what each person can and cannot see.

**Refs:** FR-22, FR-24; NFR-1; AD-4, AD-9, AD-13, AD-17; UX-DR13, UX-DR20, UX-DR21.

**Acceptance Criteria:**

**Given** a demo session owned by the visitor
**When** they choose another person in the role switcher
**Then** open panels and dialogs close; any unsaved draft prompts "Discard and switch" or "Cancel"; the grant cookie is rewritten via `access/cookie.ts` to that person's grant in the same demo; and the page reloads with `location.replace`
**And** "Now acting as {name} ({roles}, fictional)" is announced after the reload, via the one-shot flash cookie.

**Given** acting as Arjun
**When** S3 renders a Hidden question that Maya answered
**Then** only Maya's Submitted status is visible, with no content or type.

**Given** a switch followed by client navigation and browser back/forward
**When** pages display
**Then** no previous person's private data appears (Playwright test).

**Given** a normal session, or a demo owned by someone else
**When** a switch command is sent
**Then** it returns `NOT_DEMO` (or the uniform denial), and no cookie changes (impersonation test).

**Given** a tab rendered as Maya after switching to Lena in another tab
**When** the old tab submits
**Then** `STALE_ROLE` is returned.

### Story 4.3: Reset the demo and clean up old demos

As a portfolio visitor,
I want to reset the demo to its starting point,
So that I can rerun the walkthrough, while old demos don't accumulate.

**Refs:** FR-23, FR-24; NFR-2; AD-6, AD-7, AD-9, AD-19. **Creates:** the `delete_demo_session(id)` SQL function with `SET LOCAL app.demo_delete`, and delete-guard exceptions limited to that setting.

**Acceptance Criteria:**

**Given** the visitor's demo
**When** they choose Reset demo and confirm
**Then** the demo is deleted via `delete_demo_session` and re-cloned as a new session id with the starting dataset; the cookie points to Maya's grant; the browser navigates with `location.replace`; and focus moves to the page heading.

**Given** the reset demo
**When** compared with the fixture
**Then** its data is identical to the defined starting state.

**Given** a call to create a demo
**When** demo sessions older than 24h exist
**Then** they are deleted via `delete_demo_session` under each session's lock, and normal sessions are never touched.

**Given** `delete_demo_session` called with a normal session's id, or a direct delete of a resolution, response or answered question outside that function
**When** executed in database guard tests
**Then** it is rejected.

**Given** reset and an action executed concurrently on the same demo
**When** both run
**Then** the outcome is consistent: either the action commits before the delete, or it fails with the uniform denial or `NOT_FOUND` (concurrency test).

### Story 4.4: Polished 2–3 minute demo walkthrough

As the portfolio author,
I want the demo's starting data and flow tuned to the agreed walkthrough,
So that I can demonstrate the core interaction convincingly without presenting fictional results as real outcomes.

**Refs:** FR-21, FR-23; NFR-4; UX-DR11–13, UX-DR20, UX-DR21; EXPERIENCE.md UJ-2.

**Acceptance Criteria:**

**Given** a reset demo
**When** the UJ-2 path runs:
1. Maya's own answers are visible;
2. Arjun can't see Maya's answers or types;
3. the facilitator zone shows Q3 with QA Not submitted and Q4 Hidden as a follow-up question;
4. reveal Q2 shows three different answers;
5. reveal Q3 gives Aligned · 2 of 3;
6. Q2 is recorded as Conflict with a final resolution (as reported / recorded by);
7. reveal Q4 gives Unanswered, kept open with an owner;
8. the summary is copied;

**Then** a Playwright test completes the full path, and a keyboard-only variant completes the same path.

**Given** S3, S3a, S4 and the dialogs in the demo
**When** axe runs at 1280×800 and 1024px
**Then** there are no violations at the WCAG 2.2 AA rule set (not a conformance claim).

**Given** the demo content
**When** reviewed
**Then** every screen is labelled fictional, the copy never claims customer outcomes, and the walkthrough completes in about 2–3 minutes at a natural pace (author rehearsal check).
