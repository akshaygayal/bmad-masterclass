# Addendum — K1 Product Brief

Detail that belongs downstream (PRD/UX) or doesn't fit the 1–2 page brief. Not part of the brief itself.

## A1. Critical evaluation of the proposed core workflow (2026-11-10)

Workflow under evaluation: independent interpretations → controlled reveal → comparison → resolution with decision ownership. **All four steps are proposed mechanisms, not approved features.** Everything below is hypothesis [H] unless cited.

| Step | What it could add over a normal refinement discussion | Weakness / risk | Lightest viable form |
|---|---|---|---|
| **Independent interpretations** | Avoids anchoring on the first or most senior voice (the logic planning poker applies to estimates [43]); lets quieter people and distributed teams contribute asynchronously | Adds a step before the meeting; low effort only if questions are few and answers short | 3–5 concrete questions per story; one-line expected-outcome answers |
| **Controlled reveal** | Makes divergence visible at a single moment: the demo's "aha" | If everyone agrees, the reveal shows nothing; the value depends on question quality | Facilitator reveals when ready; missing answers are shown explicitly |
| **Comparison** | Turns vague disagreement into discrete items per question | Free-text answers aren't automatically comparable without AI (excluded); needs structure or human judgement | Side-by-side per question; facilitator marks match / conflict / nobody knows |
| **Resolution with decision ownership** | A traceable record of what was decided and by whom, which refinement rarely captures [H; FH T3] | Can become bureaucratic; the decision owner may be absent | Each conflict: decided (by whom) / needs input (owner) / out of scope |

**Is it enough beyond refinement?** Only if (a) the independence step surfaces conflicts a live discussion would have smoothed over, and/or (b) the decision record has value later. Neither is evidenced. The nearest researched mechanism shows no clear positive effect [45]. The honest framing is: *makes interpretation differences visible early and records decisions*.

**Decisions (user, 2026-11-10):**
- **Non-response:** option 1, partial reveal with "Not submitted" flagged; no deadlines or notifications in the MVP.
- **Question creation:** option 3, lightweight. An optional facilitator prompt set, plus participants may raise missed questions with **no hard per-person limit** (sensible defaults instead). A newly raised question is unresolved, not a conflict.
- **Comparison:** human review only; different wording ≠ conflict; unreviewed or needs-clarification allowed; the state model is deferred to the PRD.

**Non-response.** Options considered:
- reveal with partial answers, and flag the missing role (proposed default);
- require all answers before reveal (blocks on one absent person);
- set a deadline that triggers a reveal.

Silence must never display as agreement.

**Question creation without one person's assumptions.** Options, from lightest:
- (1) facilitator seeds questions, and each participant may add **one** "question we missed" alongside their answers, revealed with the rest;
- (2) a short prompt list of consequence types (boundary values, error and failure cases, permissions, out of scope) to help whoever writes questions;
- (3) full collaborative authoring.

The user prefers to avoid assuming (3).

**2–3-minute demo without invented outcomes.**
- One fictional story; three role views.
- The reveal shows one agreement, two conflicts and one question nobody could answer.
- Resolution with a decision owner who is not the facilitator; one item left open with an owner.
- The final record.
- Narration describes what becomes visible, never results achieved.

## A2. Detail moved out of the brief at finalisation (2026-11-10)

Moved to keep the brief within ~2 pages; inputs for the PRD. Wording unchanged in substance.

**Information the workflow needs** (information, not interface or technology):
1. The story under discussion (fictional in demos).
2. Concrete questions about expected behaviour. They come from the facilitator, optionally guided by prompts (boundaries, failures, permissions, exclusions), and from participants who spot something missed. A newly raised question is **unresolved**, not a disagreement, until others have answered it.
3. Each role's answer, given before seeing others'.
4. Who did not answer, shown as **"Not submitted"**. A partial reveal never reads as agreement or implies every perspective was considered.
5. Where answers appear to conflict, and questions nobody could answer. People judge whether answers conflict; different wording is not automatically a behavioural conflict; the product does not determine semantic agreement; a comparison may stay unreviewed or need clarification. Detailed states are for the PRD.
6. For each confirmed conflict: the resolution and its decision owner, or an open owner if unresolved.

**Hypothetical shortfalls of live refinement** (not firsthand observations): anchoring on the first or most senior voice; quieter participants not raising a different reading; participants in different time zones unable to meet; decisions not recorded with who made them.

**Intended record readers [H]:** developers checking agreed behaviour during implementation; QA preparing or running tests; the facilitator or decision owner during later clarification.

**Pre-squash draft** retained at `.brief-draft-v1-presquash.md` for traceability.
