# Review: Reconcile spine against PRD, UX and checklist

- **Spine:** `ARCHITECTURE-SPINE.md` (draft, 2026-11-10)
- **Inputs:** final PRD (FR-1..FR-24, NFR-1..NFR-5), EXPERIENCE.md, DESIGN.md (skimmed), `.memlog.md`
- **Reviewer stance:** reconciliation and good-spine checklist. No files other than this review were edited.

## Verdict

**Revise before epics.** The privacy, irreversibility and transaction core (AD-1, AD-3 to AD-8, AD-12 to AD-14) is strong and traces cleanly to the PRD. Three gaps would let builders diverge or break a requirement:
1. Perspective assignment after creation conflicts with one-time tokens.
2. The DB guards block the demo cascade delete.
3. Participant names are missing from the data model.

There are no critical findings.

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 3 |
| Medium | 13 |
| Low | 9 |

---

## 1. Coverage: requirements and UX behaviours

Legend: **Y** = governed (AD, convention or map) · **P** = partial · **N** = not governed. The finding ID is given where one applies.

### PRD FRs and NFRs

| Item | Gov. | Where | Note |
|---|---|---|---|
| FR-1 Create session, title required, one facilitator | P | AD-2 (exactly one facilitator grant), AD-5 `createSession` | Does `createSession` also set the facilitator's cookie before S3? Not stated (M3). |
| FR-2 Assign perspectives; ≤1 each; one person ≠ two perspectives; lock after response | **P** | AD-2 unique `(session_id, perspective)`, AD-6 "no `grant.perspective` change" | Assigning or reassigning after creation is undefined, and tokens can only be issued in `createSession` (H1). The duplicate-person rule needs names (H3). Assign races with submit (M1). |
| FR-3 Distinct access; no-role actors see nothing | P | AD-1, AD-2, AD-13 | The denial response is unspecified (M2). |
| FR-4 Add question, Hidden, author recorded | P | AD-5 `addQuestion`, ER "authors" | Q-number and follow-up flag are undecided (M8). |
| FR-5 Optional prompts | Y (UI only) | — | Static UI; no architectural concern. |
| FR-6 Remove only Hidden + 0 responses, facilitator only | Y | AD-5, AD-6 | Conflicts with demo cascade (H2). |
| FR-7 Edit wording, author only, Hidden + 0 responses | Y | AD-5 (`NOT_AUTHOR`, `HAS_RESPONSES`), AD-6 | — |
| FR-8 Submit answer or Can't answer; empty rejected; no withdraw; ≤1 per question | P | AD-5, AD-10, ER "one per perspective" | The uniqueness constraint and the response key (perspective vs grant) are not stated (L4, H1). |
| FR-9 Edit or switch type while Hidden | Y | AD-5, AD-6 | — |
| FR-10 Data-access privacy | Y | AD-3 (status-only view), AD-4, AD-12 canary | — |
| FR-11 Status only, no type | Y | AD-3, AD-12 (type indicator in canary) | — |
| FR-12 Reveal, incl. zero-submission; facilitator only; one-way | Y | AD-5 conditional write, AD-6 | — |
| FR-13 Lock on reveal | Y | AD-6 | — |
| FR-14 Coverage | Y | AD-8 `coverage.ts` | — |
| FR-15 Classify revealed; min evidence; never automatic; records recorder | P | AD-8 | No `classified_by` column; "only when Revealed" is checked by the app only (M9, L3). |
| FR-16 Correct while unresolved; Open→Aligned clears; no return to NYR; no history | Y / P | AD-7 trigger, AD-8 | "No return to NYR" is app-only (L3). |
| FR-17 Resolution only for Conflict/Unanswered; Resolved final | Y | AD-7 | Open is implicitly derived. Acceptable. |
| FR-18 Keep open, follow-up owner, incomplete flag | P | AD-8 `follow_up_owner` | Type (free text or FK) and `setFollowUpOwner` preconditions are undecided (M9). |
| FR-19 Record resolution; no defaults; as reported + recorder | Y / P | AD-7 | "Recorded by: {name}" needs a facilitator name (H3). |
| FR-20 Summary view + copy | Y | AD-3 (same projection), map | Demo label in copied text is unspecified (L5). |
| FR-21 Labelled fictional demo | Y | AD-9 banner iff `is_demo`, fixture | — |
| FR-22 Same rules in demo | Y | AD-9, AD-12 (demo in canary) | — |
| FR-23 Repeatable demo | P | AD-9 `resetDemo` | Same session id or new? Actor after reset? (M12) |
| FR-24 Switch only in demo | Y | AD-9 `NOT_DEMO`, AD-13 | — |
| NFR-1 Privacy tests on every interface | P | AD-1 registry, AD-12 | Registry completeness is not enforced (M11). |
| NFR-2 Core-rule tests | Y | AD-12 | — |
| NFR-3 No real data | Y | AD-9 fixture | — |
| NFR-4 WCAG 2.2 AA target | P | AD-12 axe, map | Focus and live-region handling across server re-renders is not governed (M10). |
| NFR-5 Desktop browser | Y | Stack | — |

### EXPERIENCE.md behaviours

| Behaviour | Gov. | Note |
|---|---|---|
| Explicit *Save classification* | Y | Implicit: only a command can save. |
| Open→Aligned warning + clearing | Y / P | AD-8 clears the owner. The warning is UI-only. Acceptable. |
| Conflict↔Unanswered keeps owner | Y | AD-8 |
| No return to Not yet reviewed | Y / P | AD-8 (app); no DB guard (L3) |
| Edit-question eligibility (author, Hidden, 0 submissions) | Y | AD-5, AD-6; author is a grant id |
| Assignment lock after first response | **P** | AD-6 locks `grant.perspective`, which is the wrong thing to lock. The real lock is "who holds the perspective" (H1). |
| Unassigned perspectives | **N** | Is there a grant row? Can a perspective be assigned later from the S3 header? (H1) |
| Zero-submission reveal | Y | AD-5, AD-8 min evidence |
| Can't answer reason (private pre-reveal) | Y | AD-12 canary seeds reasons |
| Role indicator "You: Facilitator · Product" | Y | `Actor` has `isFacilitator` and `perspective` |
| Demo role switcher, one segment per person (Maya combined) | Y / P | AD-2 combined grant, AD-9. The names come from the fixture, but the schema has no name column (H3). |
| Role switch closes panels, discards drafts, refetches as new actor, announces | P | AD-4 full navigation ensures the refetch. Carrying the announcement across navigation is not designed (M10). The draft prompt is client UI. |
| Conflicting-action messages | P | AD-5 error codes. The code list is open-ended ("e.g.") with no mapping table (L2). |
| Copy as Markdown / plain text | Y | AD-3 |
| Summary content (labels for NYR and Incomplete in both formats) | Y / P | AD-3. Label rules are UI. Acceptable. |
| Access denied without details | **P** | Not specified (M2). |
| One-time link warning | Y | AD-2. No UX surface hosts it, though (M3). |
| Fonts (Inter, no CDN) | Y | AD-11, Stack |

---

## 2. Contradictions

| ID | Sev. | Spine vs input | Detail |
|---|---|---|---|
| H1 | High | AD-2 (tokens "returned only in the `createSession` response") and AD-6 vs PRD FR-2 / EXPERIENCE S2 ("facilitator can change an assignment from the S3 header until … submitted"; "a perspective may stay unassigned") | Assigning an unassigned perspective later, or reassigning to someone else, needs a new token. AD-2 forbids issuing one outside `createSession`. Reassignment without rotating the token leaves the previous holder's bearer link valid, so a person who was removed keeps access as that perspective. AD-6 guards `grant.perspective` changes, which is not what reassignment does. |
| H2 | High | AD-6 (no question delete once responses exist or revealed) and AD-7 (trigger rejects `DELETE` on `resolution`) vs AD-9 (`resetDemo` and cleanup delete demo sessions "cascade") | This is internal to the spine. The cascade will fail on any demo that has played through reveal or resolution. Builders will diverge on the workaround (`session_replication_role`, an exemption for `is_demo`, a privileged role). AD-7 even claims "the only deletion path is demo cleanup", but the trigger does not allow it. |
| M3 | Medium | AD-2 one-time link display vs EXPERIENCE IA ("S3 reached from S2 on creation"; "no link mechanism … no placeholder step appears in the UI") | The spine requires a link-display step that no UX surface defines, and it does not say whether `createSession` signs the facilitator in. |
| L7 | Low | AD-13 `STALE_ROLE` copy and AD-2 warning copy | New user-facing copy that is not in EXPERIENCE.md. It is justified, but it should be fed back into the UX spec. |

No contradictions were found with the PRD's privacy, irreversibility or demo-isolation requirements.

---

## 3. Good-spine checklist

### 3.1 Real divergence points fixed?
Mostly. The spine fixes the hard ones: projection, transactions, DB guards, write-once resolution, the error envelope, the layering, the driver, and caching. Still open where epics will collide:
- the assignment and grant lifecycle (H1);
- the participant and person data (H3);
- question numbering and the follow-up flag (M8);
- `follow_up_owner` type and classifier columns (M9);
- UI state across re-renders (M10);
- demo creation and reset identity (M12);
- the styling and component approach (M13).

### 3.2 Is every AD Rule enforceable and does it prevent its divergence?

| AD | Assessment |
|---|---|
| AD-1 | Enforceable. Add an import-lint rule (`app/` must not import `db`). It needs an exception list for session-less interfaces (S1, S2, `createSession`, `createDemo`, `/access`) (L1). Registry completeness is not enforced, so an unregistered route escapes the canary test (M11). |
| AD-2 | Enforceable, except for later issuance (H1) and unspecified cookie lifetime and naming (M4). |
| AD-3 | Strong. The status-only view is a structural guarantee. |
| AD-4 | Enforceable. "APIs confirmed at scaffold" is fine. |
| AD-5 | Enforceable, but lock targets are inconsistent: `assignPerspective` locks the session row while `submitResponse` locks the question row, so the "no response once assigned or changed" invariant can race (M1). The `DomainError` set is open-ended (L2). |
| AD-6 | Enforceable. It blocks AD-9 (H2) and is missing guards for classification-only-when-Revealed and no-return-to-NYR (L3), plus response uniqueness (L4). |
| AD-7 | Enforceable. It conflicts with AD-9 (H2). |
| AD-8 | Enforceable. |
| AD-9 | Enforceable once H2 is fixed. Reset identity and repeated *Open demo* behaviour are undecided (M12). |
| AD-10 | Enforceable. |
| AD-11 | "Request logging redacts `/access/*`" **cannot be enforced** for Vercel's own platform request logs, which record the path (M5). "Strict CSP `default-src 'self'`" breaks Next.js inline bootstrap scripts unless a nonce strategy is decided (M6). |
| AD-12 | Good. Completeness of the registry is needed (M11). |
| AD-13 | Enforceable and well reasoned. |
| AD-14 | Enforceable and well sourced. |

### 3.3 Could anything under Deferred let units diverge?
- **Rate limiting.** Combined with "every *Open demo* creates a new session" (M12), an unbounded number of demo rows can fill the Neon free-plan storage (1 GB). Defer it, but make *Open demo* reuse the visitor's live demo.
- **Observability, backups, previews, performance.** Safe to defer.
- **Link re-issuance.** Safe only if H1 is resolved. Otherwise "deferred" silently drops the S3-header reassignment in FR-2 and EXPERIENCE.
- **Exact versions.** Safe.

### 3.4 Dimensions the altitude owns

| Dimension | Status |
|---|---|
| Paradigm and layering | Decided |
| Data model ownership | Persistence owns the schema (decided). Columns are **partially** decided: names, numbering, follow-up flag, `classified_by`, `follow_up_owner` type and the response key are missing (H3, M8, M9, L4). |
| Deployment and environments | Local, CI and prod are listed. **Ordering is ambiguous:** CI runs migrations "before deployment", but Vercel Git integration deploys on push independently (M7). |
| Infra and provider | Decided (Vercel + Neon free tiers, Node runtime, pooled and unpooled connections). |
| Migrations | Partial: `drizzle-kit` in CI with the unpooled URL. No policy on where the prod migration secret lives, or on backward-compatible ordering (M7). |
| Secrets | Partial: the env var names are fixed. Location (Vercel env vs GitHub Actions secrets) and `SESSION_SECRET` rotation are unstated (M7, L9). |
| Demo cleanup | Decided (opportunistic, older than 24h, on `createDemo`), subject to H2. |
| Monitoring | Explicitly deferred (Vercel logs). Acceptable. |
| Security headers and CSP | Decided, with the issues in M5 and M6. |
| Styling, component library, icons | **Open.** EXPERIENCE explicitly delegates this to architecture (M13). |
| Session and cookie lifetime | **Open** (M4). |

---

## 4. Scope creep

None material. The following go beyond the PRD but are justified by NFR-1, NFR-2, FR-23 or FR-3 delegating the decision to architecture:
- per-visitor demo;
- interface registry;
- concurrency tests;
- `STALE_ROLE`;
- one-time link display.

Minor items:
- New user copy (L7).
- The memlog promises a "portfolio architecture explainer" deliverable that is not listed in `companions` (L6). That is a missing deliverable, not creep.

---

## 5. Findings and fixes

### High
- **H1. AD-2, AD-5 `assignPerspective`, AD-6: grant lifecycle for assignment after creation.** Add an AD with these rules:
  - An unassigned perspective has no grant row.
  - `assignPerspective` (allowed only while that perspective has no responses) creates a new grant with a new token, shown once with the AD-2 warning, and **revokes** any previous grant for that perspective.
  - Responses are keyed by `(question_id, perspective)` and also record `author_grant_id`.
  - Replace the AD-6 guard with "no revoke or replace of a perspective's grant once that perspective has a response".
  - Alternative: drop post-creation assignment and amend EXPERIENCE S2 and the PRD FR-2 reading.
- **H2. AD-6 and AD-7 vs AD-9: guards block demo cascade delete.** Specify that the delete guards on `question`, `response` and `resolution` allow `DELETE` only when the owning `alignment_session.is_demo = true`. Add DB guard tests: a normal-session delete is rejected; demo reset and cleanup succeed after a resolution exists.
- **H3. Structural Seed and Conventions: participant names absent.** Add `display_name` to `access_grant`. It is required for the facilitator and for each assigned perspective, and is used by "Recorded by", "added by", the demo switcher and "Acting as". Define the FR-2 duplicate-person rule at S2: normalised name comparison rejects the same name on two perspectives; the facilitator holding a perspective uses one combined grant. List the core columns per table.

### Medium
- **M1. AD-5: assign vs submit lock mismatch.** Make `submitResponse` also lock the perspective's grant row (or take a session row `FOR SHARE`), with a consistent lock order (session → grant → question). Add a concurrency test.
- **M2. AD-1 / AD-2: access-denied behaviour.** Use one uniform response (status code and the "You don't have access to this alignment session." page) for an unknown session, a missing or invalid cookie, a revoked grant, and an unknown token. No story title in metadata. Include it in the canary test.
- **M3. AD-2 vs EXPERIENCE IA: link-display surface.** Define a post-create links step: each link with copy, the warning, and an explicit continue to S3. State that `createSession` sets the facilitator cookie. Record this as a UX addendum.
- **M4. AD-2 / AD-13: cookie lifetime and naming.** Fix a cookie name per session, a persistent `Max-Age` (choose a value), and the behaviour when cookies are cleared (use the saved link).
- **M5. AD-11 / Conventions Logging: unenforceable redaction.** Either document Vercel's platform request logs as an owner-only residual exposure, or carry the token in a URL fragment exchanged by POST.
- **M6. AD-11: CSP vs Next.js inline scripts.** Decide on a nonce-based CSP issued in Next 16 `proxy`/middleware (pages are already dynamic per AD-4), and add a header test.
- **M7. Structural Seed / Environments: deploy and migrate ordering and secret location.** Either disable Vercel Git auto-deploy and deploy from Actions after `drizzle-kit migrate`, or run migrate in the Vercel build. Name where `DATABASE_URL_UNPOOLED` and `SESSION_SECRET` live per environment. Require additive (backward-compatible) migrations.
- **M8. Conventions / Seed: Q-number and "Follow-up question".** Store a per-session sequential `number` (decide whether numbers are reused after a removal) and how follow-up status is determined (a stored flag, or added after the session's first reveal). The FR-23 fixture's pre-existing follow-up Q4 depends on this.
- **M9. AD-8: follow-up owner and recorder columns.** `follow_up_owner` is free-text; `setFollowUpOwner` is allowed only for an unresolved Conflict or Unanswered question; add `classified_by_grant_id` (FR-15 "records the recorder").
- **M10. AD-4: UI state across server re-render and full navigation.** Put the open panel in the URL (`?review={questionId}`). Return post-mutation focus targets and live-region announcements from action results. Pass a one-shot "Now acting as…" announcement across the demo-switch navigation.
- **M11. AD-1 / AD-12: registry completeness.** Add a test that enumerates `app/` routes and exported server actions and fails on any entry missing from `interfaces.ts`.
- **M12. AD-9: demo identity.** Decide:
  - whether reset keeps the session URL or redirects to a new one;
  - which actor applies after reset (Maya);
  - that *Open demo* reuses the visitor's live demo when `demo_owner_key` matches;
  - that demo creation is a POST/server action, never a GET, to avoid prefetch.
- **M13. Stack / `src/ui`: styling, components and icons undecided.** Choose a convention (for example, CSS Modules with DESIGN tokens as CSS custom properties, plus a bundled, self-hosted icon set) or name the first UI story as the place that fixes it.

### Low
- **L1. AD-1.** List the exceptions for session-less interfaces.
- **L2. AD-5 / `errors.ts`.** Close the `DomainErrorCode` enum and add a code → EXPERIENCE copy table, including `TITLE_REQUIRED`, `EMPTY_ANSWER`, `MISSING_RESOLUTION_FIELDS` and `QUESTION_HIDDEN`.
- **L3. AD-6.** Add DB guards for classification-only-when-Revealed and no return to `not_yet_reviewed`.
- **L4. AD-6 / Seed.** State `UNIQUE (question_id, perspective)` on `response` and a check constraint for a non-empty answer.
- **L5. FR-21.** Decide whether the demo summary's copied text carries the fictional-demo label.
- **L6. `.memlog.md`.** Mark the "BLOCKING" questions as resolved, and list or schedule the portfolio explainer in `companions`.
- **L7.** Feed the new copy (`STALE_ROLE`, the link warning) back into EXPERIENCE.md.
- **L8.** Free-tier operational notes: Neon auto-suspend cold start, storage headroom.
- **L9.** Decide `SESSION_SECRET` rotation, or accept the risk that a rotation invalidates all cookies, which forces re-opening links.
