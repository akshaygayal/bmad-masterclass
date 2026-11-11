# Addendum — PRD: Requirements Interpretation Alignment

Supporting detail and options considered. Not part of the PRD requirements.

## A. Options considered

**Decision attribution** (chosen: a)

| Option | Description | Why not chosen |
|---|---|---|
| **a** | The facilitator records "decision owner (as reported)" and "recorded by". | Chosen: never claims more than the application knows. |
| b | The decision owner confirms the decision through their own access. | Adds a fifth identity and a confirmation flow; out of MVP scope (FR-19, §6.2). |
| c | The decision owner must be a participant. | Contradicts the separation of facilitator, participant and decision owner. |

**Questions added after reveal** (chosen: i)
- **(i) Per-question reveal.** Every question has its own Hidden → Revealed lifecycle (FR-4, FR-12, FR-13). One rule covers all questions.
- (ii) Freeze questions at the first reveal. Simpler, but awkward for an obvious follow-up question.

**Non-response before reveal** (chosen: partial reveal)
- Not chosen: blocking reveal until all perspectives respond, and deadline-triggered reveal. Notifications and deadlines are out of scope.

## B. Demo dataset note

The brief addendum's demo outline suggested two conflicts. UJ-1 and FR-23 define one conflict (Q2), one Aligned question with partial coverage (Q3), one Aligned question with full coverage (Q1) and one Unanswered late question (Q4). The exact demo content can be adjusted during UX or epics without changing any requirement.

## C. Accepted MVP trade-offs (logged decisions)
- **No history.** Reclassifying an Open item to Aligned leaves no trace of its earlier status (FR-16).
- **Resolved is final.** Corrections are made through follow-up questions (FR-17).
- **Decision owner not authenticated.** Attribution is as reported by the facilitator (FR-19).

## D. Review artefacts
- `review-rubric.md`: quality-rubric review (2026-11-10).
- `reconcile-brief.md`: reconciliation against the approved brief and its addendum (2026-11-10).

## E. Acknowledged MVP trade-off: bearer access links (added 2026-11-10, after architecture)

- **What it is.** Access is granted through bearer role links (architecture AD-2, AD-16). Each link is a credential: **whoever holds it acts with its permissions**. The system does not verify real-world identity.
- **What follows from it.**
  - The **facilitator receives every participant's access link** when it's issued, so they could act as any participant. That includes reading that participant's own hidden answers and submitting as them.
  - Anyone who obtains a link (from the sharing channel, browser history, or the host's request logs) can do the same.
  - One person holding two links can't be detected.
- **What the system actually enforces.** FR-10 and FR-11 privacy is enforced **per credential, not per verified human**. One link's holder can't see another link's hidden answers through the application. The product does **not** guarantee that the person behind a perspective is who the team thinks it is.
- **Status.** This is an **acknowledged MVP trade-off and adoption risk, not a solved security problem**. Teams needing identity assurance would need accounts or verified sign-in, which is out of MVP scope (§6.2).
- **Traceability:** architecture `ARCHITECTURE-SPINE.md` AD-2 (identity limitation, residual exposure) and AD-16 (grant lifecycle).
