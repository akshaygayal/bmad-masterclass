---
title: 'Product Brief: Requirements Interpretation Alignment (working title)'
status: approved
approved: '2026-11-10'
approved_by: 'AkshayGayal'
created: '2026-11-10'
updated: '2026-11-10'
supersedes: 'K5 brief (planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10/)'
---

# Product Brief: Requirements Interpretation Alignment (working title)

> **Evidence status.** No customer interviews or validation were conducted.
> - **[R]** researched finding; numbers refer to the source table in `planning-artifacts/research/market-alternatives-for-five-team-workflow-prob-2026-11-10/research.md`
> - **[FH]** the author's firsthand experience: problem discovery only, a small number of organisations, not generalised
> - **[H]** hypothesis
> - **[U]** unknown
>
> Research on requirements problems does not show that the proposed mechanism works. Existing tools and free team practices may already be sufficient. This brief makes **no** claim of reduced rework, fewer defects or faster delivery.

## Executive Summary

Product, Development and QA can read the same user story and expect different behaviour. Even with refinement, those differences may stay unspoken until development or testing. This product proposes a small step **before refinement**:
- The facilitator asks a few concrete behavioural questions about a story.
- Each role answers independently, without seeing the others.
- The answers are revealed side by side.
- People judge which differences are real conflicts.
- An authorised decision owner resolves each one, or leaves it open with a named owner.

The team keeps a short, traceable record of what conflicted, what was decided and by whom.

The problem is well documented in general [R]. Whether this mechanism helps is not, and a well-run Three Amigos or Example Mapping session may already be enough. The MVP is deliberately small: fixed Product, Development and QA perspectives; genuinely enforced answer privacy until reveal; fictional demo data; no AI or integrations.

## The Problem

Before implementation starts, Product, Development and QA may hold different interpretations of the same requirement. These can stay unspoken or unresolved until development or testing, when addressing them can mean rework. That sequence matches the author's experience [FH]; how common it is elsewhere is unknown [U].
- **[R]** In a survey of 228 organisations in 10 countries, the most cited requirements problem was incomplete or hidden requirements (48%). Communication flaws within the project team were cited by 27%. Respondents linked these problems to time overrun and post-implementation rework [7] (perceptions; 2014/15 data).
- **[R]** A study of seven large-scale agile companies reports widespread requirements challenges [48] (qualitative).
- **[R]** Neither source measures interpretation differences between PO, Dev and QA specifically. Applying them here is an inference.
- **[FH]** Gaps surfaced at different stages, including development and testing, and QA raised most of them. Causes were mixed: incomplete acceptance criteria, differing interpretations, and requirements that changed later. As a tech lead, the author helped resolve disagreements without holding final decision authority.

**Problem scope**
- **In:** conflicting interpretations of the same requirement before implementation.
- **Secondary [H]:** missing acceptance criteria, surfaced when nobody can answer a concrete question.
- **Out:** legitimate requirement changes arising later from new information.

**[U]** How often consequential interpretation differences occur per team, what they cost, and whether good refinement already catches them.

## Who This Serves

- **Facilitator (primary user).** Whoever runs refinement for a story: a Product Owner, QA lead or tech lead. They frame questions, choose when to reveal, and drive resolution.
- **Participants: Product, Development and QA.** Each gives an independent interpretation and can raise questions the facilitator missed. In the author's experience QA raised most gaps [FH], so question creation shouldn't rest on one person.
- **Decision owner: a role, not a separate user type.** Whoever is authorised to settle a disagreement, for example a PO or business stakeholder. The facilitator is **not** assumed to be the decision owner. Helping resolve a disagreement is not the same as holding the authority to decide [FH].
- **Not users in the MVP:** managers consuming reports, leadership, external stakeholders.

## Desired Outcome

For one story, the team leaves with **a visible, traceable record of where interpretations conflicted, how each conflict was resolved, and who decided**, with unresolved items left explicitly open and owned.

It is **not** an acceptance-criteria editor and **not** a "story is ready" certification. **Agreement does not guarantee correctness**: the record shows what was decided, not that it was right.

## The Solution

A lightweight step that runs before refinement and **complements** existing practice. It does not replace refinement meetings, the issue tracker or the team's source of truth. Screens, permissions, states and technology are deliberately not specified here.

1. **Ask.** The facilitator picks a story and writes a few concrete behavioural questions, for example *"A customer cancels on day 20 of a 30-day plan: what do they get back?"* (fictional). Optional prompts help: boundaries, failures, permissions, exclusions.
2. **Answer independently.** Each perspective answers without seeing the others. A newly raised question stays unresolved until others answer it.
3. **Reveal.** When the facilitator chooses, submitted answers appear side by side. Missing participants show as **"Not submitted"**, and a partial reveal never implies every perspective was considered.
4. **Review.** People, not the product, judge which differences are genuine behavioural conflicts, which are just different wording, and which questions nobody could answer.
5. **Resolve.** The decision owner settles each conflict, or leaves it **open with a named follow-up owner**. Nobody is forced to record a decision that hasn't been made. Resolution can happen in existing refinement or asynchronously.
6. **Keep the record.** A concise summary, referenceable from existing tools. It supports the core value; there's no evidence anyone will consult it repeatedly, and it is not a documentation system.

**Used selectively [H]:** for stories with consequential business rules, exceptions, boundaries or permissions, or when the facilitator spots a specific ambiguous scenario while preparing. This rests only on the author's broad experience [FH], with no claim that the workflow would have prevented past problems. **[U]** How reliably facilitators can spot which stories qualify.

**Cost and central risk.** It adds preparation for the facilitator and every participant, and may add effort rather than save it. A team that already runs good Three Amigos or Example Mapping [4][46] may get most of the value for free. **[U]** Whether the preparation is justified, and for whom.

## Alternatives & Differentiation

**No differentiation is proven.**
- **Strongest alternative:** a well-run Three Amigos or Example Mapping session, with Jira or a shared document. Example Mapping already has cards for unanswered questions [4] [R], and a case study reports improved shared understanding under some conditions [46] [R]. Live conversation handles nuance better and costs nothing extra [H].
- **Other alternatives:**
  - Jira's readiness agent checks ticket text against a definition of ready, not roles' interpretations [1][42] [R].
  - Planning-poker apps hide answers until reveal, but only for estimates [43] [R].
  - **A do-it-yourself version** (a private form plus a spreadsheet) can reproduce independent capture [H]. **The individual mechanisms are not novel.**

**Where it might add value [H, unvalidated]**
- Each role's reading is captured *before* any group discussion. Whether that helps is untested; the nearest researched technique showed no clear effect [45] [R].
- Gaps that tend to stay implicit become visible: "Not submitted", "nobody could answer", "open, with an owner".
- The record separates who facilitated from who decided.
- One coherent workflow instead of a meeting, a form, a spreadsheet and a ticket comment stitched together.

Any advantage comes from **workflow design, not technology**. It can be replicated, and incumbents could add it.

## Success Signals

**A. Verifiable within this project.** The MVP runs the full journey on clearly labelled fictional data, and behaves correctly in these cases (to be refined into testable acceptance criteria in the PRD):
1. Answers stay hidden from other participants until reveal.
2. Partial reveal is possible, with "Not submitted" shown.
3. People, not the product, classify conflicts versus different wording.
4. Unanswered questions stay visible and never count as agreement.
5. Unresolved issues can stay open with a named follow-up owner.
6. The facilitator is not automatically the decision owner.
7. The record accurately separates resolved from open issues and shows who decided.

**Quality bar:**
- Automated tests cover each behaviour, including edge cases: no submissions, one submission, a late question, an open issue.
- The demo runs repeatably from a known fictional dataset.
- A polished 2–3-minute demonstration shows the core interaction without presenting fictional results as customer outcomes.

**B. To learn only if real teams use it later [U]; observations, no targets.**
- Do participants complete their answers?
- Does the reveal surface differences they consider consequential?
- Does it reveal anything beyond normal refinement?
- Do teams use it again?
- Is the record consulted?
- Does the preparation feel worth it?

**Not used as success measures:** adoption targets, customer results, ROI, time saved, defect or rework reduction, delivery speed.

## Scope

**Goal:** the smallest credible end-to-end workflow that shows real product behaviour, not an enterprise platform. Technology, authentication, storage, screens and detailed permissions are left to the PRD and architecture.

**In scope:**
- Manually entered story and questions, with optional prompts.
- Three fixed perspectives (Product, Development, QA), distinct from facilitator and decision owner.
- Participants can raise missed questions.
- **Genuinely enforced separation:** before reveal, no participant can access another's answers through the application or its supported interfaces.
- Controlled and partial reveal.
- Human review.
- Resolutions with decision owner, and open items with follow-up owner.
- A minimal copyable or exportable decision summary.
- A clearly labelled, repeatable fictional demo that runs under the **same** visibility and reveal rules.

**Out of scope:**
- Issue-tracker integrations.
- AI or automated semantic comparison.
- Notifications and deadlines.
- Analytics and dashboards.
- Multiple teams or organisations.
- Documentation or knowledge-management features.
- Acceptance-criteria editing.
- Configurable roles.
- Complex authentication, invitations, organisation management or enterprise permissions.

## Vision

This is deliberately small, and any growth depends on evidence from real use that doesn't exist yet.

**If** teams find the workflow useful enough to repeat, two possible directions follow. These are not commitments:
- Perspectives beyond Product, Development and QA.
- Easier referencing of decision summaries from issue-tracker tickets.

**If** the learning signals are negative, the response is to **reconsider or park the product, not expand it**.

## Open Questions for the PRD

These are flagged, not resolved:
1. **Can the facilitator see answers before reveal?** The facilitator may also be a participant (for example the PO), so seeing others' answers early would undermine independence.
2. **Who performs human review and records outcomes?** The facilitator alone, the group, or the decision owner? If the decision owner isn't one of the three participants, how is their decision captured, and is it recorded by someone else on their behalf?
3. **How do late-raised questions reveal?** Do answers to questions raised after the first reveal follow the same hidden-until-reveal rule?
4. **Product name.** "Readiness" and "alignment" language both risk implying a verdict; a final name is open.

_Supporting detail (information needs, hypothetical refinement shortfalls, mechanism evaluation, demo outline) is in [addendum.md](addendum.md)._
