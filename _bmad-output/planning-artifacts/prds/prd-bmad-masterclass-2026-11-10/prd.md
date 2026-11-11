---
title: 'PRD: Requirements Interpretation Alignment (working title)'
status: final
created: '2026-11-10'
updated: '2026-11-10'
source_brief: 'planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10-k1/brief.md (approved 2026-11-10)'
---

# PRD: Requirements Interpretation Alignment (working title)
*Working title. Naming is deferred and does not block requirements.*

> **Evidence status.** No customer interviews or validation were conducted. This PRD specifies a proposed product. It does **not** claim reduced rework, fewer defects, faster delivery or time saved. Research on requirements problems does not show that this mechanism works, and existing practices (Three Amigos, Example Mapping, the issue tracker's own features) may already be sufficient. Labels where evidence is cited: **[R]** researched (source numbers refer to `planning-artifacts/research/market-alternatives-for-five-team-workflow-prob-2026-11-10/research.md`), **[FH]** the author's firsthand experience (problem discovery only, a small number of organisations, not generalised), **[H]** hypothesis, **[U]** unknown.

## 0. Document Purpose

This PRD turns the approved product brief (`planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10-k1/brief.md`, approved 2026-11-10) into testable requirements for a solo-built portfolio MVP. It is written for the author as PM and engineer, and for the downstream BMAD phases (UX, architecture, epics and stories).

Structure:
- Journeys come first (§2.3) and drive the requirements.
- Glossary terms (§3) are used verbatim throughout.
- Features (§4) nest globally numbered FRs with testable consequences.
- Scope, non-goals, success signals and open questions follow.

Supporting detail and options considered are in this PRD's `addendum.md` and the brief's addendum. Technology and architecture are deliberately absent.

## 1. Vision

Product, Development and QA can read the same user story and expect different behaviour. Even with refinement, those differences may stay unspoken until development or testing [FH; prevalence elsewhere U].

This product adds a small step **before refinement**:
- Each perspective answers a few concrete behavioural questions independently.
- Each question is revealed under the facilitator's control.
- People judge whether answers conflict.
- Every conflict or unanswered question ends either **Resolved**, with a decision owner as reported, or **Open**, with a named follow-up owner.

The product complements the team's refinement and source of truth; it does not replace them.

**Problem scope.**
- **In:** conflicting interpretations of the same requirement before implementation.
- **Secondary [H]:** missing acceptance criteria surfaced when nobody can answer a concrete question.
- **Out:** legitimate requirement changes that arise later from new information.

[R] The problem is documented in general: incomplete or hidden requirements were the most cited requirements problem among 228 organisations, with perceived effects including rework [7]; a seven-company study reports widespread requirements challenges [48]. Neither source measures PO, Dev and QA interpretation differences specifically, so applying them here is an inference.

Any growth beyond the MVP depends on evidence from real use. **If** teams find it worth repeating, possible directions are perspectives beyond Product, Development and QA, and easier referencing of decision summaries from issue-tracker tickets. These are not commitments. **If** learning signals are negative, the product is reconsidered or parked, not expanded.

### 1.1 Hypotheses, Risks and Alternatives
- **Used selectively [H].** For stories with consequential business rules, exceptions, boundaries or permissions, or when the facilitator spots a specific ambiguous scenario while preparing. This rests only on the author's broad experience [FH]. There is no claim the workflow would have prevented past problems.
- **Cost [H].** It adds preparation for the facilitator and every participant, and **may add effort rather than save it**.
- **Central adoption risk.** A team that already runs good Three Amigos or Example Mapping sessions may get most of the value for free [4][46].
- **No differentiation is proven.**
  - The individual mechanisms are not novel. Planning poker already hides answers until reveal, for estimates [43].
  - A do-it-yourself form plus spreadsheet can reproduce independent capture [H].
  - The nearest researched technique (perspective-based reading) showed no clear positive effect [45].
  - Any advantage comes from workflow design, not technology, and could be replicated by teams or incumbents (for example, the issue tracker's readiness agent [1][42]).
- **The decision summary supports the core value.** There is no evidence anyone will consult it repeatedly [U].

## 2. Target User

### 2.1 Jobs To Be Done
These are approved hypotheses from discovery, not validated customer findings:
- **Facilitator** (from the tech-lead job T3): *When Product, Development and QA interpret a requirement differently, I want to help establish a shared understanding and clarify who has decision authority, so the team can proceed without repeatedly revisiting the same disagreement.*
- **Development participant** (from job D3): *When I'm about to commit to a story, I want to understand its expected behaviour and surface missing or ambiguous requirements, so I can build what's intended and avoid preventable rework.*
- **Product and QA participants:** no separately approved job statements exist. Their jobs are assumed to mirror D3 from their own viewpoint [H].

### 2.2 Non-Users (MVP)
Managers consuming reports, leadership, external stakeholders, and decision owners as application users. A decision owner is recorded as reported by the facilitator; they do not use the application.

### 2.3 Key User Journeys

All people, companies and stories below are **fictional** and are used only to make behaviour concrete. Nothing here is a customer observation.

#### UJ-1. Maya aligns her team on a refund story before refinement

**Cast (fictional):** a subscription company, "Brightleaf".
- **Maya Chen**, Product Owner. She is the **facilitator** for this story and also answers as the **Product** perspective.
- **Arjun Rao**, developer. Answers as the **Development** perspective.
- **Lena Novak**, QA engineer. Answers as the **QA** perspective.
- **Daniel Okafor**, Head of Billing. He is the **decision owner** for refund policy and is **not** a participant in the session.

**Entry state:** Maya has the story "Customers can cancel a subscription and receive a refund" in the team's issue tracker. Refinement is on Thursday.

**Path**
1. **Maya creates an alignment session** for the story. She enters the title and description manually. Using the optional prompts (boundaries, failures, permissions, exclusions), she writes three questions:
   - **Q1** "A monthly customer cancels on day 1. What happens to their payment?"
   - **Q2** "A monthly customer cancels on day 20 of 30. What refund do they get?"
   - **Q3** "Cancellation fails because the payment provider is down. What does the customer see?"

   She assigns herself to Product, Arjun to Development and Lena to QA. Each gets their own access to the session as their perspective.
2. **Participants answer independently.**
   - Arjun answers Q1–Q3 and submits. The next morning he edits his Q2 answer. That's allowed, because Q2 is still hidden.
   - Lena answers Q1 and Q2 but hasn't answered Q3 yet.
   - Maya answers all three as Product.
   - Before any reveal, each of them sees **only their own answers**.
3. **Maya checks progress as facilitator.** She sees each question's **response status**: Q1 and Q2 have a response from all three perspectives; Q3 has Product ✓, Development ✓, QA *Not submitted*. She **cannot** see Arjun's or Lena's answer content, even though she's also a participant. *Edge case:* if Arjun tried to open Lena's answer through any supported part of the application before reveal, he'd be refused.
4. **Maya reveals in Thursday's refinement.** She reveals Q1, Q2 and Q3. Revealing Q3 is a **partial reveal**, and it shows "QA: *Not submitted*". Each revealed question is now **locked**: no edits, and no late submissions (so QA stays *Not submitted* on Q3).
5. **The team reviews the revealed answers together.** Every question starts as *Not yet reviewed*, and Maya records an **interpretation classification** for each:
   - **Q1:** all three describe the same behaviour. Classified ***Aligned***.
   - **Q2:** Product says pro-rated to the day; Development says no refund; QA says full refund. Classified ***Conflict***.
   - **Q3:** Product and Development use different words but describe the same behaviour (an error message plus a retry). Classified ***Aligned***, with **response coverage** shown as 2 of 3 (QA *Not submitted*). Nothing implies QA agreed.
6. **A late question.** While discussing Q2, Lena asks: *"What if the customer cancels during the free trial?"* She adds it as **Q4**. Q4 starts **hidden**, while Q1–Q3 stay revealed. Over the next day all three respond independently; each gives a ***Can't answer*** response with the reason *"trial rules are owned by Billing"*. Maya reveals Q4, reviews it with the team and classifies it ***Unanswered***. That's her judgement, not an automatic result of the Can't answer responses.
7. **Resolution.**
   - **Q2:** after refinement, Maya asks Daniel outside the application. He says the refund is pro-rated to the day. Maya records the resolution, with **decision owner (as reported): Daniel Okafor, Head of Billing** and **recorded by: Maya Chen (facilitator)**. The application does not claim that Daniel confirmed anything in it.
   - **Q4:** Daniel hasn't replied yet, so its **resolution status** is **open**, with **follow-up owner: Maya Chen**. Maya can't mark it resolved on an assumption.

**Climax:** at the reveal, three different answers to Q2 appear side by side before any code exists. The team can now discuss a specific difference in expected behaviour, which they judge to be a genuine conflict, rather than a vague sense of disagreement.

**Resolution:** Maya copies the **decision summary** into the ticket.

> **Q1** Aligned · coverage 3/3.
> **Q2** Conflict → **Resolved**: "Pro-rated refund to the day". Decision owner (as reported): Daniel Okafor. Recorded by: Maya Chen · coverage 3/3.
> **Q3** Aligned · coverage 2/3 (QA: *Not submitted*).
> **Q4** Unanswered → **Open**. Follow-up owner: Maya Chen · coverage 3/3 (all *Can't answer*).

#### UJ-2. Akshay demonstrates the workflow alone in under three minutes

The portfolio author opens the **clearly labelled demo** with a known fictional dataset (the Brightleaf story above). He switches between the fictional Product, Development and QA participants and the facilitator. The **same visibility, reveal and locking rules** apply: while acting as Development, he cannot see QA's hidden answers. He reveals, classifies, records Daniel's reported decision, leaves Q4 open and shows the summary. Every screen in the demo is visibly marked as fictional demo data.

## 3. Glossary

Use these terms exactly; no synonyms elsewhere in this PRD or downstream.

- **Alignment session.** One story's alignment workflow. It has one facilitator, three perspectives and any number of questions.
- **Story.** The requirement under discussion, entered manually (title plus description). The source of truth stays in the team's own tools.
- **Facilitator.** The person who creates the alignment session, assigns perspectives, reveals questions, records classifications and resolutions, and removes eligible questions. They may also hold one perspective.
- **Perspective.** One of exactly three fixed viewpoints: **Product**, **Development**, **QA**. Each is held by at most one participant per alignment session; an unassigned perspective has no participant, and its responses show as Not submitted.
- **Participant.** A person holding a perspective in an alignment session.
- **Decision owner.** The person authorised to settle a conflict or unanswered question. A role recorded as stated by the facilitator; not an application user and not authenticated.
- **Question.** A concrete behavioural question about the story. Added by the facilitator or any participant. Each question has its own lifecycle.
- **Question state.** **Hidden** (accepting responses; content visible only to each response's author) → **Revealed** (all submitted responses visible; locked). One-way.
- **Response.** One participant's reply to one question.
- **Response status.** Per perspective per question: **Substantive answer**, **Can't answer** (optional reason), or **Not submitted**. Can't answer counts as a submission. **Before reveal**, response status is displayed only as **Submitted** or **Not submitted**; whether a submission is a substantive answer or Can't answer is not shown.
- **Response type.** Whether a submitted response is a substantive answer or Can't answer. Never disclosed to anyone but the author before reveal.
- **Response coverage.** For a question, how many of the three perspectives submitted (substantive answer or Can't answer), and which are Not submitted.
- **Lock.** On reveal, a question's responses can no longer be created or edited.
- **Interpretation classification.** The facilitator's human judgement of a revealed question: **Not yet reviewed** (default) · **Aligned** (at least two substantive answers, and **all** substantive answers describe the same behaviour, including different wording) · **Conflict** (at least two substantive answers describe materially different behaviours; any material difference means Conflict, not Aligned) · **Unanswered** (the expected behaviour cannot be established from the available input).
- **Resolution status.** Applies only to questions classified **Conflict** or **Unanswered**: **Open** (should have a follow-up owner; flagged **incomplete** if it doesn't) or **Resolved** (requires a resolution statement, a decision owner as reported, and the recorder). Once Resolved, the question's classification cannot change.
- **Follow-up owner.** The named person responsible for progressing an open question.
- **Recorder.** The facilitator who entered a classification or resolution.
- **Decision summary.** A read-only, copyable or exportable rendering of the alignment session's current state.
- **Demo environment.** A clearly labelled, isolated environment preloaded with a fictional dataset, in which a single user may switch between the fictional facilitator and participants. It runs under the same rules as normal use. Role switching exists **only** here.

## 4. Features

### 4.1 Alignment session setup
**Description:** A facilitator creates an alignment session for a manually entered story and assigns the three perspectives. Each participant reaches the session as their own perspective. Realizes UJ-1 step 1.

#### FR-1: Create an alignment session
A person can create an alignment session by entering a story title and description, and becomes its facilitator.
**Consequences (testable):**
- Creating an alignment session without a story title is rejected.
- The creator is recorded as facilitator. An alignment session has exactly one facilitator.

#### FR-2: Assign perspectives
The facilitator can assign one participant to each of Product, Development and QA.
**Consequences (testable):**
- Each perspective holds at most one participant; a perspective may remain unassigned. One person, as identified by the access mechanism (FR-3), cannot hold two perspectives in the same alignment session.
- The facilitator may hold zero or one perspective.
- A perspective's assignment cannot be changed once its participant has submitted any response. No existing response is silently reassigned.

#### FR-3: Distinct participant access
Each participant and the facilitator reach the alignment session under a distinct identity tied to their role.
**Consequences (testable):**
- The application can determine, for every request, whether the actor is the facilitator, which perspective they hold, or neither.
- An actor with no role in the alignment session cannot view any of its content.

**Out of Scope:** organisation management, invitation emails, enterprise permissions. The access mechanism is chosen in architecture.

### 4.2 Questions
**Description:** Questions can be added at any time and always start hidden. Optional prompts help the author write concrete behavioural questions. Realizes UJ-1 steps 1 and 6.

#### FR-4: Add a question
The facilitator or any participant can add a question at any time.
**Consequences (testable):**
- A new question's state is Hidden, regardless of other questions' states.
- The author of each question is recorded.

#### FR-5: Optional question prompts
When adding a question, the author can view optional prompts covering boundaries, failures, permissions and exclusions.
**Consequences (testable):**
- A question can be saved without using any prompt.

#### FR-6: Remove a question
The facilitator can remove a question only while it is Hidden **and** has no submitted responses.
**Consequences (testable):**
- Removing a question with one or more submitted responses is rejected.
- Removing a Revealed question is rejected.
- Participants cannot remove questions.

#### FR-7: Edit question wording
The author can edit a question's wording only while the question is Hidden **and** has no submitted responses.
**Consequences (testable):**
- Editing a question after any response has been submitted, or after reveal, is rejected.
- The intended alternative is a follow-up question (FR-4).

### 4.3 Independent responses
**Description:** Each participant responds without seeing anyone else's response. The facilitator sees response status, never content, before reveal. Realizes UJ-1 steps 2–3.

#### FR-8: Submit a response
A participant can submit, for a Hidden question, either a substantive answer or a Can't answer response with an optional reason.
**Consequences (testable):**
- An empty substantive answer is rejected.
- Can't answer is stored distinctly from a substantive answer and from Not submitted. Before reveal, the distinction is shown only to the response's author (FR-11); after reveal, to everyone.
- A submitted response cannot be withdrawn back to Not submitted in the MVP; before reveal it can be edited or switched between types (FR-9).
- A participant has at most one response per question.

#### FR-9: Edit own response before reveal
A participant can view and edit their own response while its question is Hidden.
**Consequences (testable):**
- Editing a response to a Revealed question is rejected.
- Switching between a substantive answer and Can't answer before reveal is allowed.

#### FR-10: Enforced pre-reveal privacy
Before a question is revealed, no actor other than the response's author can access that response's content through the application or any supported interface.
**Consequences (testable):**
- The facilitator, including a facilitator who holds a perspective, cannot retrieve another participant's response content to a Hidden question.
- A participant cannot retrieve another participant's response content to a Hidden question.
- This is enforced by the application's data access, not only by what is displayed. Requests for hidden content are refused.

#### FR-11: Response status visibility before reveal
The facilitator and participants can see, for each Hidden question, which perspectives are Submitted and which are Not submitted.
**Consequences (testable):**
- Before reveal, status shows only Submitted or Not submitted per perspective.
- Neither response content nor response type (substantive answer vs Can't answer) is disclosed before reveal, through any supported interface.

### 4.4 Reveal and locking
**Description:** The facilitator reveals questions one at a time or several together. A reveal locks that question. Realizes UJ-1 steps 4 and 6.

#### FR-12: Reveal a question
The facilitator can reveal any Hidden question, including when one or more perspectives are Not submitted.
**Consequences (testable):**
- After reveal, all submitted responses to that question are visible to the facilitator and all participants.
- Perspectives without a response display as Not submitted.
- Revealing one question does not change any other question's state.
- Only the facilitator can reveal. Reveal cannot be undone.
- A question with zero submissions can be revealed; it shows 0/3 submitted and all three perspectives as Not submitted.

#### FR-13: Lock on reveal
Revealing a question locks it.
**Consequences (testable):**
- No response can be created or edited for a Revealed question, including by a perspective shown as Not submitted.

#### FR-14: Response coverage display
Every Revealed question displays its response coverage.
**Consequences (testable):**
- Coverage states the number of submitting perspectives out of three and names any Not submitted perspective.

### 4.5 Review and classification
**Description:** After human discussion, the facilitator records one interpretation classification per Revealed question. The application never classifies automatically. Realizes UJ-1 step 5.

#### FR-15: Classify a revealed question
The facilitator can set a Revealed question's classification to Aligned, Conflict or Unanswered after human discussion. Its default is Not yet reviewed.
**Consequences (testable):**
- Hidden questions cannot be classified.
- The application never sets or suggests a classification automatically. Whether answers describe the same or different behaviour is a human judgement.
- **Minimum evidence:** setting Aligned or Conflict is rejected when the question has fewer than two substantive answers (including a zero-submission reveal).
- Aligned means every substantive answer describes the same behaviour; if any two describe materially different behaviours, the question is Conflict (human judgement).
- Aligned or Conflict can be set when a perspective is Not submitted or Can't answer, provided the minimum evidence is met. Coverage remains displayed alongside every classification.
- Unanswered can be set regardless of the number of substantive answers. Can't answer responses never automatically produce Unanswered.
- The classification records the recorder.

#### FR-16: Correct a classification while unresolved
The facilitator can change a question's classification only while it has no recorded resolution.
**Consequences (testable):**
- Changing the classification of a Resolved question is rejected. A recorded resolution is never silently cleared, overwritten or invalidated.
- Changing an unresolved (Open) Conflict or Unanswered question to Aligned clears its Open resolution status and follow-up owner, because the follow-up no longer applies. The current state shows the new classification.
- A classified question cannot be returned to Not yet reviewed.
- No history of classification changes is kept in the MVP, and the product does not claim to provide a historical audit trail. An Open item reclassified to Aligned therefore leaves no trace of its earlier status (accepted MVP trade-off).

### 4.6 Resolution and attribution
**Description:** Conflict and Unanswered questions are either resolved with a reported decision owner or left open with a follow-up owner. Realizes UJ-1 step 7.

#### FR-17: Resolution status applies only to Conflict and Unanswered
**Consequences (testable):**
- A question classified Conflict or Unanswered has resolution status Open by default.
- Questions classified Aligned or Not yet reviewed have no resolution status.
- No classification change can delete or invalidate a recorded resolution (see FR-16).
- **Resolved is final in the MVP.** A recorded resolution cannot be edited, deleted or reopened, and stays visible unchanged. A later clarification or changed business decision is handled by adding a follow-up question (FR-4), which goes through the normal independent-response and reveal workflow. This is an intentional MVP constraint, not a claim that business decisions never change.

#### FR-18: Keep a question open
The facilitator can keep a Conflict or Unanswered question Open and name a follow-up owner.
**Consequences (testable):**
- An Open question without a follow-up owner is visibly flagged **incomplete** in the alignment session and in the decision summary.
- An Open question is never displayed as ready or resolved, with or without a follow-up owner.

#### FR-19: Record a resolution
The facilitator can mark a Conflict or Unanswered question Resolved only by entering a resolution statement and a decision owner's name and role, as reported by the facilitator.
**Consequences (testable):**
- Marking Resolved without a resolution statement or decision owner is rejected.
- The record shows the decision owner labelled "as reported" and the recorder separately.
- The decision-owner field has no default and is never pre-filled with the facilitator. The facilitator appears as decision owner only if explicitly entered as such.
- No wording, label or state implies the decision owner used or confirmed the decision in the application.

### 4.7 Decision summary
**Description:** A concise, read-only rendering of the alignment session that can be copied or exported for reference in existing tools. Realizes UJ-1 resolution.

#### FR-20: View and copy the decision summary
The facilitator and participants can view the decision summary and copy it as plain text or Markdown.
**Consequences (testable):**
- For each Revealed question it shows: question text, state, classification, coverage (naming any Not submitted perspective), and, where applicable, resolution status, resolution statement, decision owner (as reported), recorder and follow-up owner.
- Hidden questions appear with their state and Submitted / Not submitted per perspective only. Neither the content nor the response type of a hidden response ever appears in the summary.
- Open questions without a follow-up owner and questions still Not yet reviewed are visibly marked.

**Out of Scope:** document management, versioning, integrations.

### 4.8 Demo environment
**Description:** A clearly labelled, isolated demo environment with a known fictional dataset that one person can walk through by switching between the fictional facilitator and participants. Realizes UJ-2.

#### FR-21: Labelled fictional demo
**Consequences (testable):**
- Every demo screen and the demo decision summary are visibly labelled as fictional demo data.
- Demo data is fictional and contains no real people or organisations.

#### FR-22: Same rules in the demo environment
The demo environment applies FR-1 to FR-20 unchanged, within its preloaded fictional data. Role switching (FR-24) is the only addition.
**Consequences (testable):**
- While acting as one perspective, the demo user cannot access another perspective's response content or response type for a Hidden question.
- Reveal, locking, minimum-evidence and resolution rules behave identically to normal use.

#### FR-23: Repeatable demo
The demo environment can be reset to its known starting dataset.
**Consequences (testable):**
- After a reset, the demo dataset is identical to its defined starting state: the UJ-1 cast and story, with questions prepared to demonstrate a partial reveal, a conflict, a late question and an open item.
- Resets never affect normal alignment sessions. Who may reset, and whether demo visitors share one instance, is decided in architecture.

#### FR-24: Demo isolation and no impersonation
Role switching is available only inside the demo environment.
**Consequences (testable):**
- Users of normal alignment sessions cannot switch roles or act as another participant.
- Demo data and normal alignment sessions are kept separate: demo actions never affect normal sessions, and normal sessions never appear in the demo.

### 4.9 Cross-cutting NFRs
- **NFR-1 Privacy enforcement:** FR-10 and FR-11 are verified by automated tests that attempt to retrieve hidden content or response type as each other role, through every interface the application exposes (to be enumerated in architecture), in both normal sessions and the demo environment.
- **NFR-2 Test coverage of core rules:** each FR's testable consequences have automated tests, including edge cases: zero-submission reveal, one substantive answer, all Can't answer, a late question, an open question with and without a follow-up owner, a rejected reclassification of a Resolved question, and attempted impersonation outside the demo.
- **NFR-3 Data:** the MVP stores no real customer, candidate or employee data; demo data is fictional.
- **NFR-4 Accessibility:** WCAG 2.2 AA is the design and testing target. No claim of formal certification or full conformance is made unless actually verified.
- **NFR-5 Form factor:** a desktop browser application. Technology choices are deferred to architecture.

## 5. Non-Goals (Explicit)
- Not a replacement for refinement meetings, the issue tracker or the team's source of truth.
- Not a Jira replacement, a generic survey tool, or an enterprise collaboration suite.
- Not an acceptance-criteria editor, and not a tool that certifies a story as "ready".
- Never decides automatically whether answers agree or conflict. That is always a human judgement.
- Does not verify a decision owner's authority, and never implies a decision owner confirmed anything in the application.
- Not a documentation or knowledge-management system.
- Agreement recorded in the product does not mean the agreed behaviour is correct.

## 6. MVP Scope

### 6.1 In Scope
- Manually entered story and questions, with optional prompts (FR-1, FR-4, FR-5).
- Three fixed perspectives, plus a facilitator who may hold one of them (FR-2).
- Distinct role-based access for each participant and the facilitator (FR-3).
- Independent responses: substantive answer or Can't answer, editable until reveal (FR-8, FR-9).
- Enforced pre-reveal privacy of content and response type (FR-10, FR-11).
- Per-question reveal, including partial and zero-submission reveals, with locking and coverage (FR-12 to FR-14).
- Human classification with minimum-evidence rules (FR-15, FR-16).
- Resolved items with decision owner as reported and recorder; Open items with follow-up owner and an incomplete flag (FR-17 to FR-19).
- A decision summary copyable as plain text or Markdown (FR-20).
- An isolated, labelled, resettable fictional demo environment under the same rules (FR-21 to FR-24).

### 6.2 Out of Scope for MVP
- Issue-tracker integrations.
- AI or automated semantic comparison.
- Notifications and deadlines.
- Analytics and dashboards.
- Multiple teams or organisations.
- Documentation or knowledge management.
- Acceptance-criteria editing.
- Configurable roles.
- Complex authentication, invitations, organisation management or enterprise permissions.
- Post-reveal editing, version history and audit trails.
- Voting, comments or approval workflows.
- Decision-owner sign-in or confirmation.
- Deleting alignment sessions (avoids any path that removes recorded resolutions).
- Withdrawing a submitted response.

## 7. Success Signals

This PRD uses **success signals**, not business metrics. No adoption, ROI, time-saved, defect or rework targets are set, because none is evidenced.

**Primary: verifiable in this project**
- **SS-1** Every FR's testable consequences pass automated tests, including the edge cases in NFR-2. Validates FR-1 to FR-24.
- **SS-2** Hidden content and response type cannot be retrieved by any other role through any supported interface, in normal sessions or the demo environment. Validates FR-10, FR-11, FR-22, FR-24.
- **SS-3** The full UJ-1 journey runs end to end in the demo environment from its reset state, and a 2–3-minute walkthrough (UJ-2) demonstrates it without presenting fictional results as customer outcomes. Validates FR-21 to FR-23.
- **SS-4** The WCAG 2.2 AA design and testing target is checked on the core journey, and any known gaps are documented (NFR-4).

**Secondary: future learning, only if real teams use it later [U]; observations with no targets**
- **SS-5** Do participants complete independent responses?
- **SS-6** Does the reveal surface differences participants consider consequential?
- **SS-7** Does it surface anything beyond what normal refinement would?
- **SS-8** Do teams use it again on later stories?
- **SS-9** Is the decision summary consulted?
- **SS-10** Does the preparation feel worth it?

**Counter-signals (do not optimise)**
- **SS-C1 Number of conflicts surfaced.** Optimising it would reward vague or leading questions. A session with no conflicts is a valid outcome. Counterbalances SS-6.
- **SS-C2 Response completion pressure.** Partial reveal and Not submitted exist so that missing input stays honest. The product should not pressure people into low-effort answers to raise coverage. Counterbalances SS-5.
- **SS-C3 Resolution rate.** Open with a named owner is a legitimate end state. The product must not nudge facilitators to mark items Resolved without an authorised decision. Counterbalances FR-19.

## 8. Open Questions

All are **non-blocking** for UX, architecture or epics.
1. **Product name.** Deferred. Owner: author. Revisit before the public portfolio write-up.
2. **How a facilitator chooses which stories warrant a session** [U]. This is product learning, not a requirement. Revisit only if real teams use the product (SS-5 to SS-10).
3. **Participant access mechanism.** Deferred to architecture, within FR-3's constraints and the scope exclusions.

## 9. Assumptions Index

No unconfirmed `[ASSUMPTION]` tags remain. Earlier assumptions (A1–A8, plus Resolved finality and Open-to-Aligned reclassification) were confirmed by the user and are recorded as decisions in `.memlog.md`. Product-level hypotheses (jobs to be done, selective use, future learning signals) stay labelled **[H]** or **[U]** where they appear.
