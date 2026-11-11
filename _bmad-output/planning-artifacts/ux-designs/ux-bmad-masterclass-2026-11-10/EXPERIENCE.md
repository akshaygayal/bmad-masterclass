---
title: 'Experience: Requirements Interpretation Alignment (working title)'
status: final
amended: '2026-11-10 (access-link presentation, after architecture AD-2/AD-16)'
created: '2026-11-10'
updated: '2026-11-10'
sources:
  - planning-artifacts/prds/prd-bmad-masterclass-2026-11-10/prd.md (final)
  - planning-artifacts/prds/prd-bmad-masterclass-2026-11-10/addendum.md
  - planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10-k1/brief.md (approved)
  - planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10-k1/addendum.md
---

# Experience: Requirements Interpretation Alignment

The PRD's Glossary terms are used verbatim; FR numbers refer to the final PRD. Visual tokens are referenced from [DESIGN.md](DESIGN.md) as `{path.to.token}`. This file adds no product scope.

**Reference mockups** (fictional data; **this spec wins on any conflict**): [S3 workspace: Maya as facilitator + Product](mockups/mockup-a-s3-workspace.html) · [S3a review panel: conflict, open, final resolution](mockups/mockup-b-s3a-review-panel.html).

## Foundation

- **Form factor:** desktop browser application (PRD NFR-5). Target viewport 1280 × 800; minimum supported width 1024px.
- **UI system:** none mandated. Architecture may pick a component library; this spec defines behaviour, and DESIGN.md defines appearance.
- **Theme:** light mode only.
- **Accessibility target:** WCAG 2.2 AA as the design and testing target. Conformance is not claimed unless verified (PRD NFR-4).
- **Participant access (resolved by architecture AD-2, AD-16, AD-17):** each assigned perspective and the facilitator get a private **access link**, which is a bearer credential. The UX presents each link **once** at issuance (see *Access links panel*). Lost links can't be recovered. Privacy holds per link, not per person (PRD addendum §E).

## Information Architecture

| Surface | Purpose | Reached from |
|---|---|---|
| **S1 Start** | *Create alignment session* · *Open demo*. No session list, no dashboard. | Application entry |
| **S2 Create alignment session** | Story title (required) and description; assign Product / Development / QA; the facilitator may take one perspective. Assignment rules (FR-2): a perspective may stay unassigned (its responses show Not submitted); one person cannot hold two perspectives (rejected inline); the facilitator can change an assignment from the S3 header until that perspective's participant has submitted any response, after which the assignment shows as locked. | S1 |
| **S2 completion: Access links panel** | Shown on S2 immediately after *Create alignment session* succeeds: the one-time links, then *Continue to session*. | S2 |
| **S3 Alignment session workspace** | The single role-aware screen: story header (with a "You: Facilitator · Product"-style role indicator) + question cards + *Add question* + link to the decision summary. | S2 on creation; a participant's or facilitator's own access |
| **S3a Review panel** | Right-side panel for one Revealed question: comparison, coverage, classification, resolution. | *Review* / *View* on a Revealed card |
| **S4 Decision summary** | Read-only summary with copy actions. | Link in the S3 header |
| **Demo layer** | Banner, role switcher and reset, over S3/S3a/S4 inside the isolated demo environment only. | S1 *Open demo* |
| **Dialogs** | Reveal confirmation · Record final resolution · Remove question. | Card or panel actions |
| **Access denied** | A full-page message with no session details. | Any request without a role |

Navigation is deliberately flat: there are no menus or sidebars beyond the S3 header (story title, link to the summary).

## Voice and Tone

Plain, precise and neutral. The product describes what people said; it never judges correctness or claims verification.
- **Never** use "agreed", "approved", "confirmed by" or "verified" for outcomes.
- **Partial alignment:** "Aligned · 2 of 3 substantive answers" + "Product and Development describe the same behaviour. QA: Not submitted." In the classification line, "{n} of 3" always counts **substantive answers** out of three perspectives.
- **Coverage line (canonical submission count):** "Coverage: {n} of 3 submitted" + breakdown, e.g. "Coverage: 3 of 3 submitted (0 substantive, 3 Can't answer)" or "Coverage: 2 of 3 submitted · QA: Not submitted". "Submitted" and "substantive answers" are never used interchangeably.
- **Aligned helper:** "Same behaviour described. Not a judgement of correctness."
- **Attribution:** "Decision owner (as reported): {name}, {role}" · "Recorded by: {name} (facilitator)".
- **Final resolution dialog:** title "Record final resolution?"; body "This decision cannot be edited or reopened in this version. To revisit it, add a follow-up question."
- **Reveal dialog:** title "Reveal Q{n}?"; body "This shows all submitted answers to this question and locks it. No one can add or edit answers afterwards. Other questions are not affected." When anyone is missing, add: "{Perspective} has not submitted and won't be able to after reveal." For zero submissions, add: "No one has submitted. This question will show 0 of 3 and can only be classified Unanswered."
- **Incomplete:** "Incomplete: no follow-up owner."
- **Disabled classification reason:** "Needs at least 2 substantive answers ({n} available)."
- **Access denied:** "You don't have access to this alignment session."
- **One-time links warning:** "These access links are shown only once. Save them now. If lost, they cannot be recovered."
- **Link note:** "Anyone with this link can act as {Perspective}. Share it only with {name}."
- **Reassignment notice:** "{Old name}'s link for {Perspective} no longer works. Share the new link below with {new name}."
- **Demo banner:** "Fictional demo · all people, companies and data are invented."

## Component Patterns

- **Access links panel** (FR-1–FR-3; AD-2):
  - Shown once on S2, right after a successful create. One row per issued link: the role ("Facilitator · Product, Maya Chen", "Development, Arjun Rao", "QA, Lena Novak"), the full link in a read-only field, and *Copy link*.
  - Unassigned perspectives show "Not assigned. You can assign later from the session header."
  - The warning sits at the top as a persistent callout (⚠ icon + text), not a dismissible toast.
  - *Continue to session* is always enabled; leaving is never blocked. When fewer links have been copied than issued, a confirmation asks first: "You haven't copied every link. They can't be shown again. Continue anyway?" [Go back] [Continue].
  - After leaving, the links can never be shown again. Reloading the page doesn't bring them back.
  - The facilitator is already signed in to the session in this browser (no need to open their own link here).
- **Assign or replace a participant** (FR-2; AD-16): from the S3 header's perspective list, the facilitator chooses *Assign…* (unassigned) or *Replace…* (assigned, and only while that perspective has no responses; otherwise the control shows "Locked: {Perspective} has responded").
  - A dialog collects the display name (required, unique in the session). Replace adds: "{Old name}'s current link will stop working immediately."
  - On confirm, the dialog shows the **new link once**: the same row layout, *Copy link*, the one-time warning and, for a replacement, the reassignment notice. *Done* closes it, and the link can't be shown again.
- **Question card** (FR-4–FR-14): one per question, in creation order. A late question appears at the end with "Follow-up question · added by {name}" meta. Its actions vary by role and state (see State Patterns).
- **Edit question** (FR-7): visible only to the question's author, only on a Hidden question with 0 submissions. It opens the wording inline. If a response arrives or the question is revealed before saving, the save is rejected with: "This question can no longer be edited because a response has been submitted. Add a follow-up question instead."
- **Response editor** (FR-8, FR-9): for the viewer's own perspective on a Hidden question.
  - Choose **Answer** (textarea; an empty answer is rejected) or **Can't answer** (optional reason).
  - Switching between Answer and Can't answer is allowed any time while the question is Hidden.
  - *Submit* saves; afterwards the card shows the submitted response with *Edit*.
  - There is no withdraw action.
- **Status row** (FR-11): three status pills, Product · Development · QA, each Submitted or Not submitted. Visible to the facilitator and participants on Hidden questions. Shows nothing else.
- **Facilitator zone:** a separate, headed area of the card ("Facilitator") holding *Reveal…*, *Remove* (only when eligible), and on Revealed cards *Review*. When the facilitator also holds a perspective, the participant zone ("Your answer, as Product") sits above it, clearly divided.
- **Review panel** (FR-14–FR-19): header (Q number, question text, close); comparison (columns or stacked; see Responsive); coverage line; classification radio group; resolution section (Conflict/Unanswered only). Participants see the same panel read-only.
- **Classification control** (FR-15, FR-16):
  - A radio group of Aligned · Conflict · Unanswered, plus an explicit **Save classification** button. Selecting a radio never saves by itself, so moving through options with arrow keys changes nothing.
  - When fewer than 2 substantive answers exist, Aligned and Conflict use `aria-disabled` (still focusable, not selectable), and the reason ("Needs at least 2 substantive answers ({n} available)") is shown as visible text before the group and linked with `aria-describedby`.
  - **Changing Open Conflict/Unanswered to Aligned:** before saving, a warning names what will be cleared: "Saving as Aligned removes the open follow-up and its owner (Maya Chen). This isn't kept as history." The facilitator must confirm.
  - **Conflict ↔ Unanswered:** the Open status and follow-up owner are kept.
  - Editable while unresolved; read-only with "Locked by resolution" once Resolved.
  - No *Not yet reviewed* option once a classification is set.
- **Resolution section** (FR-17–FR-19):
  - Two choices: **Keep open** (follow-up owner field) or **Record final resolution** (statement, decision owner name, decision owner role; all required; no defaults).
  - "Recorded by" is shown automatically as the current facilitator.
  - *Record final resolution* opens the confirmation dialog.
- **Decision summary** (FR-20):
  - One block per question, starting with the question number and **question text**.
  - *Not yet reviewed* questions and Open questions marked **⚠ Incomplete: no follow-up owner** are labelled in the view and in **both** copy formats.
  - Revealed questions show state, classification, coverage in words and, where applicable, the resolution and attribution or the open follow-up.
  - Hidden questions show state and Submitted/Not submitted only.
  - *Copy as Markdown* / *Copy as plain text*.
- **Demo banner and role switcher** (FR-21–FR-24):
  - Segmented control with one segment per fictional person, matching normal use: **Maya Chen (Facilitator · Product)** · **Arjun Rao (Development)** · **Lena Novak (QA)**, with "Acting as: …" text. Maya's view shows both zones, exactly as in a normal session.
  - *Reset demo* restores the starting dataset after a confirmation.

## State Patterns

**Question card by question state and viewer**

| State | Participant (own perspective) | Facilitator | Facilitator + perspective |
|---|---|---|---|
| **Hidden, 0 submitted** | Response editor; status row all Not submitted | Status row "0 of 3 submitted"; *Reveal…*; *Remove*; *Edit question* if author | Participant zone (editor) + facilitator zone (as left) |
| **Hidden, ≥1 submitted, own not submitted** | Response editor; status row | Status row; *Reveal…* (no Remove, no Edit question) | Participant zone (editor) + facilitator zone |
| **Hidden, ≥1 submitted, own submitted** | Own response + *Edit*; status row | Status row; *Reveal…* | Own response + *Edit*; facilitator zone |
| **Revealed · Not yet reviewed** | "Revealed · Locked"; all answers; coverage; *View* | Same + *Review* | Same as facilitator; own editor gone (locked) |
| **Revealed · Aligned** | Classification label + coverage words | Same + *Review* (correctable) | Same |
| **Revealed · Conflict/Unanswered · Open** | Label + "Open · Follow-up: {name}" or ⚠ Incomplete | Same + *Review* | Same |
| **Revealed · Conflict/Unanswered · Resolved** | Resolved record (final) | Same; *View* only | Same |

**Answer slots after reveal:** substantive (full text) · Can't answer (label + reason) · Not submitted (dashed, labelled). A Not submitted slot never collapses or disappears.

**Known limitation:** a facilitator who also holds a perspective sees their own Hidden answers on screen. If they screen-share before reveal, those answers are visible to the audience. This is user behaviour, not an application leak.

**Pre-reveal privacy (FR-10, FR-11):** for Hidden questions, nothing in any surface (card, panel, summary, page title, tooltip, screen-reader text, URL or copy output) carries another participant's content or response type. Only Submitted / Not submitted.

**Conflicting actions:** if a question is revealed (or a response submitted) while someone is editing, their save is rejected with a plain message, e.g. "Q2 was revealed by the facilitator, so your change wasn't saved. Answers are locked after reveal." Nothing is silently merged.

**Other states:** empty session ("No questions yet" + *Add question* with optional prompts); access denied; copy confirmation ("Copied", announced politely); validation errors inline beneath the field, in `{colors.error}` with text.

## Interaction Primitives

- **Per-question reveal only.** *Reveal…* → dialog → *Reveal Q{n}*. No bulk reveal (UX decision). The PRD §4.4 description's "several together" is met by successive per-question reveals, and no FR requires bulk reveal. The card updates in place; other cards are unaffected.
- **Irreversible actions** (reveal, record final resolution, reset demo) always go through a confirmation dialog. Remove question is confirmed too.
- **Dialogs:** focus moves to the dialog heading; Tab is trapped inside; Esc and *Cancel* close without changes and return focus to the triggering control. The confirm button is never the default focus for irreversible actions.
- **Focus after an action whose trigger disappears:**
  - **Reveal:** the revealed card's heading.
  - **Remove question:** the next card's heading (or *Add question* if none).
  - **Submit response:** the submitted-response region's *Edit* button.
  - **Record final resolution:** the Resolved record heading in the panel.
  - **Save classification:** the classification label.
  - **Reset demo:** the page heading.
- **Review panel:**
  - **At viewport widths of 1100 CSS px and above**, it is a **non-modal labelled region** beside the list. Focus moves to its heading on open. Tab moves through the panel, then continues to the card after the triggering card. Esc or *Close* returns focus to the card's *Review* button.
  - **Opening another question's Review** replaces the panel content and moves focus to the new heading.
  - **Below 1100 CSS px** (including 200% zoom on a 1280px screen), the panel opens **full-width as an overlay**: focus is contained, Esc closes, and focus returns to *Review*.
  - Only one panel is open at a time.
- **Add question:** available to everyone at any time; optional prompts expand inline; a new card appears Hidden at the end, and focus moves to it.
- **Copy:** copies the full summary in the chosen format; "Copied" appears inline and is announced.
- **Copy link:** copies one access link; the row shows "Copied" (announced). Copy state is tracked only to drive the leave confirmation.
- **Access-link focus:** on reaching the Access links panel, focus moves to its heading. After *Done* in an assign or replace dialog, focus returns to that perspective's row in the S3 header.
- **Role switching (demo only):**
  - Switching first closes any open panel or dialog.
  - If there's an unsaved draft, the user chooses *Discard and switch* or *Cancel*. Drafts never carry over.
  - The view is then re-fetched **as the new actor** (no client-cached content from the previous actor is reused), and "Now acting as Arjun Rao (Development, fictional)" is announced.
  - These steps are covered by the privacy tests (PRD NFR-1).

## Accessibility Floor

Target WCAG 2.2 AA (not a conformance claim).
- **Keyboard:** every action is reachable and operable by keyboard, with a logical order: header → cards in order → card actions → panel.
- **Focus:** visible focus at all times (`{components.focus-ring}`). Focus is never obscured by the panel or banner (WCAG 2.4.11).
- **Not colour alone:** every state has text plus an icon.
- **Screen readers:**
  - State changes are announced via a polite live region ("Q2 revealed. 3 of 3 submitted." · "Classification saved: Conflict." · "Final resolution recorded.").
  - Status pills read as "Product: Submitted".
- **Targets:** interactive targets at least 24 × 24px (WCAG 2.5.8).
- **Text:** long answers wrap fully and resize to 200% without loss of content; no truncation in comparison.
- **Forms:** labels are visible and persistent; required fields are marked in text; errors are tied to fields and announced.
- **Motion:** no essential motion; panel transitions are short or disabled under reduced-motion settings.

## Responsive & Platform

- **Desktop only:** 1024px minimum width; designed at 1280 × 800.
- **Panel width:** `{spacing.panel-min}`–`{spacing.panel-max}` (about 60% of the viewport, clamped). At 1280px it is 760px wide, so three columns fit. At 1024px it is about 614px, so answers stack.
- **Below 1100 CSS px viewport** (including high zoom), the review panel becomes a full-width overlay so the card list never shrinks to an unusable width (WCAG 1.4.10 reflow).
- **Comparison layout rule:** use three columns only when each column can be at least `{spacing.column-min}` inside the panel; otherwise stack the answers (Product, Development, QA), each headed, at the reading measure. **There is never horizontal scrolling.**
- **Below 1024px:** not optimised; content stays usable by stacking, with no dedicated mobile design.

## Inspiration & Anti-patterns

- **Aim:** calm, scannable, credible to PMs, EMs and QA leads; a polished working product.
- **Avoid:** dashboards and charts, gradients, playful or gamified cues, badge clutter, dense console styling, all-caps or monospace labels, colour-only meaning, green-as-correct.

## Key Flows

### UJ-1 (PRD): Maya aligns her team on a refund story before refinement
Fictional cast: Maya Chen (facilitator + Product), Arjun Rao (Development), Lena Novak (QA), Daniel Okafor (decision owner, not a user).
1. **S2:** Maya enters the story and assigns herself Product, Arjun Development and Lena QA. Each now has distinct access.
2. **S3, as participants:** each answers Q1–Q3 in their own editor. Arjun edits Q2 while it's Hidden. Lena leaves Q3 unanswered. Status pills show only Submitted / Not submitted.
3. **S3, Maya as facilitator:** the facilitator zone shows Q3 with "QA: Not submitted". Maya cannot see Arjun's or Lena's answers or response types.
4. **Reveal Q2** → dialog → **three different answers side by side** *(climax)*.
5. **Reveal Q3** → the dialog warns that QA hasn't submitted → *Review* → Aligned · "2 of 3 substantive answers · Product and Development describe the same behaviour. QA: Not submitted."
6. **Q2** → *Review* → Conflict → *Record final resolution*: "Pro-rated to the day"; Decision owner (as reported) Daniel Okafor, Head of Billing; Recorded by Maya Chen → dialog "Record final resolution?" → Resolved (final).
7. **Q4** (follow-up question added by Lena after the Q2 reveal): all three gave Can't answer → reveal → Unanswered → *Keep open*, follow-up owner Maya Chen.
8. **S4:** decision summary → *Copy as Markdown*.

### UJ-2 (PRD): Akshay demonstrates the workflow alone (~2:40)
Starting state (FR-23 reset): Q1–Q3 answered (QA missing on Q3); Q4 pre-existing as a follow-up question, Hidden, with three Can't answer responses; nothing revealed.

| Time | Acting as | Beat |
|---|---|---|
| 0:00 | — | Banner; story; cast. |
| 0:15 | Maya (Facilitator · Product) | Own answers in "Your answer, as Product"; others "Submitted" only. |
| 0:30 | Arjun (Development) | Maya's answers and types not visible. |
| 0:45 | Maya (Facilitator · Product) | Facilitator zone: Q3 QA Not submitted; Q4 Hidden, 3 submitted. |
| 1:00 | Maya | **Reveal Q2 → conflict visible.** |
| 1:20 | Maya | Reveal Q3 (partial) → Aligned · 2 of 3. |
| 1:40 | Maya | Q2 → Conflict → Record final resolution (as reported / recorded by). |
| 2:05 | Maya | Reveal Q4 → Unanswered → Keep open (follow-up owner). |
| 2:25 | Any | Summary → copy. |

Every screen shows the fictional-demo banner; nothing in the demo affects normal sessions.
