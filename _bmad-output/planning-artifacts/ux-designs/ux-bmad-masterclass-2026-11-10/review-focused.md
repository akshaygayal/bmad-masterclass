---
title: 'Focused UX review: Requirements Interpretation Alignment'
reviewed: '2026-11-10'
inputs:
  - DESIGN.md (draft)
  - EXPERIENCE.md (draft)
  - prds/prd-bmad-masterclass-2026-11-10/prd.md (final)
  - briefs/brief-bmad-masterclass-2026-11-10-k1/brief.md (approved; skimmed for scope)
---

# Focused UX review

Scope: three lenses (PRD/brief consistency, accessibility, privacy and role clarity). This review lists only findings that add information. Contrast ratios marked "computed" were computed in this review with the WCAG relative-luminance formula. They are design checks, not a conformance claim.

**Verdicts:** Lens 1 — pass with gaps · Lens 2 — pass with gaps · Lens 3 — pass with gaps.

Already well covered, so no finding is raised for these: minimum-evidence disabling with a stated reason, resolution finality ("Locked by resolution"), no return to *Not yet reviewed*, no withdrawal, no session deletion, the zero-submission reveal dialog and copy, the Not submitted slot never collapsing, "as reported" / "Recorded by" wording, the pre-reveal privacy rule listing every surface, per-question reveal confirmation, and demo banner scoping.

## Lens 1 — PRD & brief consistency

**C1 (high) — FR-7 "Edit question wording" has no UX.** EXPERIENCE.md, Component Patterns and State Patterns: no card offers an *Edit question* action, and no state row says when it is available. The PRD says that "The author can edit a question's wording only while the question is Hidden and has no submitted responses", and that the author may be a participant.
*Fix:* add an author-only *Edit question* action to Hidden cards with zero submissions (any role), and add a rejection message for when a response arrives first.

**C2 (high) — The classification save model is undefined, and the Open→Aligned clearing (FR-16) has no UX.** EXPERIENCE.md, Classification control: "A radio group of Aligned · Conflict · Unanswered". The announcement "Classified Conflict." implies that a selection saves immediately. FR-16 says that changing an Open Conflict or Unanswered question to Aligned "clears its Open resolution status and follow-up owner" with no history kept, but the UX never tells the facilitator this. With native radios, pressing arrow keys selects the next option. If selections save immediately, arrowing from Conflict past Aligned would silently erase the follow-up owner.
*Fix:* make classification an explicit *Save classification* action, not save-on-select. When the change would clear a follow-up owner, show the inline warning "Changing to Aligned removes the follow-up owner {name}". Also say what happens to the follow-up owner on a Conflict↔Unanswered change.

**C3 (medium) — FR-2 assignment rules have no UX.** EXPERIENCE.md, S2: "assign Product / Development / QA; the facilitator may take one perspective". The UX does not cover:
- leaving a perspective unassigned;
- preventing one person from holding two perspectives;
- changing an assignment after creation;
- the lock "once its participant has submitted any response".

*Fix:* state that perspectives may stay unassigned (shown as Not submitted). Add the duplicate-person validation error. Either specify where assignments are changed and shown as locked, or state explicitly that assignment happens only at creation in the MVP (and confirm that with the PM).

**C4 (medium) — "No bulk reveal" vs the PRD.** EXPERIENCE.md, Interaction Primitives: "No bulk reveal". PRD §4.4 description: "reveals questions one at a time or several together". FR-12's consequences do not require bulk reveal, so it is unclear whether the UX narrows scope.
*Fix:* record that "several together" is met by successive per-question reveals, or confirm with the PM. Don't leave it silent.

**C5 (medium) — The *Remove* eligibility in the state table is inconsistent.** EXPERIENCE.md, State Patterns. The Facilitator column shows "*Remove* if no responses" in the "Hidden, own not submitted" row, but the "Hidden, 0 submitted" row (the only eligible case) lists only "*Reveal…*". "Own" rows also mean nothing to a facilitator who holds no perspective.
*Fix:* give the facilitator column rows by submission count (0 vs ≥1). Show *Remove* (and the author's *Edit question*) only when 0 have submitted.

**C6 (medium) — Decision summary markings required by FR-20 are not explicit.** EXPERIENCE.md, Decision summary: "state, classification, coverage in words and, where applicable, the resolution and attribution or the open follow-up". Three things are missing: question text; a visible marking for *Not yet reviewed*; and the "Incomplete: no follow-up owner" flag in the summary and in both copy formats.
*Fix:* list question text, the Not yet reviewed marker and the Incomplete flag for the summary and for the Markdown/plain-text output.

**C7 (medium) — "Substantive answers" count vs response coverage.** EXPERIENCE.md, Voice and Tone: "Aligned · 2 of 3 substantive answers". PRD Glossary: coverage counts submissions *including* Can't answer. In UJ-1 Q4 these differ (coverage 3/3, 0 substantive). Two counts that look alike could be built or rendered as one.
*Fix:* always show the coverage line ("3 of 3 submitted · …") as the canonical count. If the substantive count is kept, label it separately and never put it in place of coverage.

**C8 (low) — The "Follow-up question" label has no trigger rule.** EXPERIENCE.md, Question card: "A late question appears at the end with 'Follow-up question · added by {name}'". There is no rule for what makes a question "late" (after the first reveal? after creation?). The label also collides with **follow-up owner** (resolution status).
*Fix:* show "Added by {name}" on every card, or define the trigger (for example, "added after any reveal") and use "Late question".

**C9 (low) — Glossary drift.** The UI choice "Answer" for **Substantive answer**, "Can't answer" without "(optional reason)" in some places, and "Review panel"/"Facilitator zone" are acceptable UI labels. "Locked by resolution" introduces a second meaning of **Lock** (the Glossary uses Lock only for responses after reveal).
*Fix:* use "Classification fixed: resolved" (or similar) instead of "Locked by resolution".

**C10 (low) — Concurrency rejections are unspecified (FR-6, FR-13).** The UX gives no message for these cases:
- the question is revealed while a participant has an unsaved edit open;
- a remove or edit request arrives after someone has submitted.

*Fix:* add inline messages: "Q{n} was revealed; your unsaved change was not submitted" and "This question now has responses and can't be removed/edited."

**Scope expansion:** none found. The "0 of 3 submitted" aggregate, read-only *View* for participants, and the *Reset demo* confirmation stay within the PRD.

## Lens 2 — Accessibility (WCAG 2.2 AA target)

**A1 (high) — Reflow and 200% zoom (1.4.10, 1.4.4) conflict with the layout.** EXPERIENCE.md, Responsive: "1024px minimum width" and "Below 1024px: not optimised". DESIGN.md: panel width `600px`–`760px`, and "The card list narrows but stays visible". At 200% zoom on the 1280 × 800 target, the viewport is 640 CSS px, so a 600px side panel leaves about 40px for cards. The stated AA target requires reflow down to 320 CSS px without two-dimensional scrolling.
*Fix:* below about 1100 CSS px, make the panel full-width (an overlay that replaces the list, with the same focus rules). Define this behaviour rather than "not optimised".

**A2 (medium) — Focus destination is undefined when the trigger disappears.** EXPERIENCE.md, Dialogs: "focus returns to the triggering control". After *Reveal Q{n}*, the *Reveal…* button no longer exists (the card becomes Revealed). Likewise, after *Remove* the card is gone, after *Submit* the editor is replaced, and after *Record final resolution* the resolution form is replaced.
*Fix:* specify the targets:
- after reveal, the card's state label/heading;
- after remove, the next card (or *Add question*);
- after submit, the submitted response's *Edit*;
- after resolution, the Resolved record heading.

**A3 (medium) — Review panel modality and Tab behaviour are unspecified.** EXPERIENCE.md, Interaction Primitives: "focus moves to its heading; Esc or Close returns focus". The spec doesn't say whether the panel is modal (focus trapped, list inert) or non-modal (what Tab does at its end, and whether opening another card's *Review* replaces it while focus is inside).
*Fix:* declare it non-modal `complementary`/`region`, labelled "Review Q{n}". Tab order runs card list → panel → back. Opening another *Review* replaces the content and moves focus to the new heading.

**A4 (medium) — Disabled classification options hide the reason from keyboard and screen-reader users.** EXPERIENCE.md: "Aligned and Conflict are disabled with the reason". Native disabled radios are skipped by the keyboard, and their description is often not read.
*Fix:* use `aria-disabled="true"` (still focusable) with the reason linked via `aria-describedby`, or put the reason as visible text before the group.

**A5 (low) — Focus ring vs the selected accent differ only by hue.** Computed: focus `#1D4ED8` vs accent `#0B6B57` = 1.04:1. DESIGN.md says the ring is "kept distinct from the accent so focus never looks like selection", but for some colour-vision deficiencies a blue ring next to a green selected state can look the same.
*Fix:* keep the 2px offset (white gap) everywhere, and make selection use a fill/check shape rather than an outline.

**A6 (low) — Live-region scope for remote changes.** EXPERIENCE.md lists announcements only for the user's own actions. It is unclear whether status changes made by others (someone submits, the facilitator reveals while a participant is on the page) are announced, or how often.
*Fix:* if updates appear without a refresh, announce only reveal events to participants. Batch or skip status-pill changes.

**A7 (low) — Comparison semantics in column mode.** Stacked mode says "each headed". Column mode doesn't state its heading structure or DOM order.
*Fix:* give each column a perspective heading (h3), with DOM order Product → Development → QA in both layouts.

**A8 (low) — Page titles (2.4.2) and copy failure.** No per-surface `<title>` is defined, and no message is defined for a clipboard error.
*Fix:* define titles ("{Story title} · Alignment session", "Decision summary · {Story title}"). These are privacy-safe because they never contain answer content. Add a "Couldn't copy — select the text below" fallback.

**A9 (low) — Access mechanism and 3.3.8 (Accessible Authentication).** This is deferred to architecture but should be noted there.
*Fix:* add a note in the Foundation section: "Access mechanism must not require a cognitive function test (WCAG 3.3.8)."

Contrast checks (computed): attention/surface 6.79, text-muted/canvas 6.72, accent/canvas 5.95, error/canvas 6.93 all pass. border-strong/canvas is 3.48, which passes 3:1 only narrowly. Do not place inputs on darker tints.

## Lens 3 — Privacy & role clarity

**P1 (medium) — Role switching in the demo can carry state across roles.** EXPERIENCE.md, Role switching: "switching re-renders as that actor under the same rules". It doesn't say what happens to:
- an unsaved draft in the editor (Product's draft text still in the DOM or form state when acting as Development);
- an open panel or dialog;
- cached client data for the previous role.

FR-22 says the demo user "cannot access another perspective's response content or response type for a Hidden question".
*Fix:* on switch, close dialogs and the panel, discard or confirm unsaved drafts, and refetch all data as the new role (no client cache reused across roles). NFR-1 tests should cover this.

**P2 (medium) — In the demo, the split between "Facilitator (Maya)" and "Product (Maya)" does not match normal use.** EXPERIENCE.md, Demo role switcher: "Facilitator (Maya Chen) · Product (Maya Chen)". In a normal session Maya is a single actor with both zones (State Patterns, "Facilitator + perspective"). Two segments imply a facilitator view without the Product zone, which is not "the same rules" (FR-22). It also leaves unclear whether Maya's Product answers are visible in the Facilitator segment.
*Fix:* use one segment, "Maya Chen — Facilitator + Product", that renders the combined view, or state that the Facilitator segment shows exactly the combined view.

**P3 (medium) — There is no "you are" indicator in normal sessions.** Only the demo has "Acting as: …". A participant-only or facilitator-only user sees no header statement of their role, and the "Facilitator" zone heading appears only on cards.
*Fix:* add to the S3 header "You: Facilitator · Product" (or "You: QA"), shown as text, in normal sessions as well.

**P4 (low) — A facilitator who holds a perspective may display their own Hidden answers while screen-sharing.** In UJ-1 Maya reveals during refinement, presumably sharing her screen. Her own "Your answer, as Product" content for still-Hidden questions (for example Q4) is visible to the room, which can anchor others' independent answers. This is not an FR-10 breach (she is the author), but it undermines independence.
*Fix:* collapse the author's own Hidden response by default behind "Show my answer" when the viewer is also the facilitator.

**P5 (low) — The *Remove* action and the "0 of 3" count are acceptable disclosures, but they should be pinned.** The presence of *Remove* reveals that "no one has submitted", which is status-level information and allowed.
*Fix:* add one line to the Pre-reveal privacy section: "Counts and action availability may reflect Submitted/Not submitted only; never response type." This stops implementations from, for example, disabling *Remove* only for substantive answers.

**P6 (low) — Shared demo reset.** Whether demo visitors share an instance is deferred (FR-23). The UX gives a reset confirmation but nothing for a visitor whose demo is reset by someone else.
*Fix:* note it as an architecture dependency. If the instance is shared, show "The demo was reset" and re-render.

The privacy rule list in EXPERIENCE.md (card, panel, summary, page title, tooltip, screen-reader text, URL, copy output) is complete. The live-region example ("Q2 revealed. 3 of 3 submitted.") occurs only after reveal and is safe.

## Summary

| ID | Lens | Severity | Location | Issue |
|---|---|---|---|---|
| C1 | PRD | high | EXPERIENCE · Component/State Patterns | FR-7 edit question wording missing |
| C2 | PRD/A11y | high | EXPERIENCE · Classification control | Save-on-select + silent Open→Aligned clearing |
| A1 | A11y | high | EXPERIENCE · Responsive; DESIGN · Layout | Reflow/200% zoom breaks side panel |
| C3 | PRD | medium | EXPERIENCE · S2 | FR-2 unassigned/duplicate/lock rules missing |
| C4 | PRD | medium | EXPERIENCE · Interaction Primitives | "No bulk reveal" vs PRD "several together" |
| C5 | PRD | medium | EXPERIENCE · State Patterns | *Remove* eligibility rows inconsistent |
| C6 | PRD | medium | EXPERIENCE · Decision summary | FR-20 markers/question text not explicit |
| C7 | PRD | medium | EXPERIENCE · Voice and Tone | Substantive count vs coverage ambiguity |
| A2 | A11y | medium | EXPERIENCE · Interaction Primitives | Focus target when trigger disappears |
| A3 | A11y | medium | EXPERIENCE · Review panel | Panel modality/Tab order undefined |
| A4 | A11y | medium | EXPERIENCE · Classification control | Disabled radios hide reason |
| P1 | Privacy | medium | EXPERIENCE · Role switching | Drafts/cache/panel persist across role switch |
| P2 | Privacy | medium | EXPERIENCE · Demo role switcher | Facilitator/Product split ≠ normal rules |
| P3 | Role | medium | EXPERIENCE · Information Architecture/S3 | No role indicator in normal sessions |
| C8 | PRD | low | EXPERIENCE · Question card | "Follow-up question" trigger/term collision |
| C9 | PRD | low | EXPERIENCE · Classification control | "Locked by resolution" overloads Lock |
| C10 | PRD | low | EXPERIENCE · State Patterns | Concurrency rejection messages |
| A5 | A11y | low | DESIGN · Colors | Focus vs accent hue-only |
| A6 | A11y | low | EXPERIENCE · Accessibility Floor | Remote-change announcements |
| A7 | A11y | low | EXPERIENCE · Responsive | Column heading/DOM order |
| A8 | A11y | low | EXPERIENCE · Other states | Page titles; copy failure |
| A9 | A11y | low | EXPERIENCE · Foundation | 3.3.8 note for access mechanism |
| P4 | Privacy | low | EXPERIENCE · State Patterns | Own hidden answers on shared screen |
| P5 | Privacy | low | EXPERIENCE · Pre-reveal privacy | Pin status-only rule for counts/actions |
| P6 | Privacy | low | EXPERIENCE · Demo | Shared-instance reset notice |

**Counts:** critical 0 · high 3 · medium 11 · low 11.
