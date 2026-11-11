# PRD Quality Review — Requirements Interpretation Alignment (working title)

Reviewed: `prd.md` (draft, 2026-11-10). `.memlog.md` was consulted only to check the Assumptions Index. No `addendum.md` exists in this workspace (see Mechanical notes). The PRD was not edited.

Context taken as given: solo portfolio MVP; no customer validation by design; technology and architecture deliberately absent; success signals deliberately replace business metrics.

## Overall verdict
This is a disciplined, honest PRD. Its central rules (independent pre-reveal answers, per-question reveal and lock, human-only classification, reported attribution, Resolved is final) are stated as decisions, carry testable consequences and trace back to a fictional but concrete journey. Evidence claims are scoped carefully throughout. The risks are a few definition-level gaps that downstream work would copy. The glossary definitions of **Aligned** and **Conflict** overlap. "Response type", the term the privacy rule depends on, is not in the Glossary. The approved Open→Aligned reclassification can make an open issue vanish without a trace. A small number of FR consequences contradict each other or cannot be tested as written (FR-2 vs Glossary, FR-8 vs FR-11, FR-20's two bullets, the undefined demo starting dataset). None of these needs a redesign, but each should be fixed before epics.

## Decision-readiness — strong
Decisions are stated as decisions, and what was given up is named. FR-17 says "**Resolved is final in the MVP** … This is an intentional MVP constraint, not a claim that business decisions never change". FR-16 says "No history of classification changes is kept in the MVP, and the product does not claim to provide a historical audit trail". FR-7 names its alternative: "The intended alternative is a follow-up question (FR-4)". The Evidence status banner states the strongest objection up front: "existing practices (Three Amigos, Example Mapping, the issue tracker's own features) may already be sufficient". The three Open Questions (§8) really are open, each has an owner or a deferral target, and none disguises a decision. A sceptical reader will find their objections acknowledged rather than dodged.

### Findings
- **low** Open→Aligned trade-off is decided but its cost goes unstated (§4.5 FR-16, bullet 2). The rule clears "its Open resolution status and follow-up owner, because the follow-up no longer applies", which is an approved decision. Nowhere does the PRD say what was given up: participants get no signal that an open issue was closed by reclassification rather than by resolution. *Fix:* add one sentence naming the trade-off, or see the Check 5 finding for a mitigation.

## Substance over theater — strong
There is no persona theater. The roles (facilitator, three perspectives, decision owner as non-user) each drive specific FRs. §2.1 openly says that Product and QA have "no separately approved job statements" and labels the assumed jobs [H]. The NFRs are product-specific and testable (NFR-1 names the attack surface; NFR-2 lists specific edge cases). NFR-4 avoids the usual accessibility overclaim ("No claim of formal certification or full conformance"). The Vision could not be swapped into another PRD. There is no differentiation or innovation section, which is correct given the evidence.

### Findings
- **low** "A small step" is an unlabelled claim (§1 Vision). "This product adds a small step **before refinement**" asserts low effort, which SS-10 ("Does the preparation feel worth it?") treats as unknown. *Fix:* tag [H] or drop "small".

## Strategic coherence — strong
The thesis is clear. Making each perspective commit to concrete behavioural answers independently, before refinement, surfaces interpretation differences that would otherwise stay unspoken; the product stays honest about who decided and what is still open. Every feature group serves that arc. §4.3 and §4.4 protect independence, §4.5 keeps judgement human, §4.6 and §4.7 keep attribution and open items honest, and §4.8 exists because this is a portfolio piece. The primary success signals (SS-1 to SS-4) verify rule enforcement rather than the thesis. For a portfolio MVP with no users that is the right target, and thesis-level learning is held back as untargeted questions (SS-5 to SS-10). The counter-signals (SS-C1 to SS-C3) are thoughtful and tie to specific signals or FRs. The MVP is problem-solving in kind, and its scope logic matches.

### Findings
- **low** SS-3 and UJ-2 give different demo durations (§7 SS-3 vs §2.3 UJ-2). UJ-2 says "in under three minutes" and SS-3 says "a 2–3-minute walkthrough". *Fix:* pick one bound.

## Done-ness clarity — adequate
Most FRs carry crisp, rejectable consequences, for example FR-6 ("Removing a Revealed question is rejected"), FR-12 ("A question with zero submissions can be revealed; it shows 0/3 submitted") and FR-15 ("**Minimum evidence:** setting Aligned or Conflict is rejected when the question has fewer than two substantive answers"). Story writers can work from these directly. The gaps sit in a few consequences that contradict others or depend on undefined facts.

### Findings
- **high** The Aligned and Conflict definitions are not mutually exclusive (§3 Interpretation classification, FR-15). Aligned is "at least two substantive answers describe the same behaviour" and Conflict is "at least two substantive answers describe materially different behaviours". With three substantive answers where Product and Development agree and QA differs, both definitions are satisfied. The minimum-evidence rule (≥2 substantive answers) has been folded into the definitions themselves. Classification is a human judgement, but these definitions are what the facilitator, UX copy and the decision summary rely on, and as written a real conflict could legitimately be labelled Aligned. *Fix:* define Aligned as "all substantive answers describe the same behaviour (at least two required)" and Conflict as "any two substantive answers describe materially different behaviours (at least two required)". Keep the ≥2 rule as a separate constraint in FR-15.
- **medium** The rule for an unassigned perspective contradicts itself (§3 Perspective vs FR-2). The Glossary says each perspective "is held by exactly one participant per alignment session". FR-2 says "Each perspective holds at most one participant". This leaves undefined whether a session can run, collect responses or reveal with a perspective unassigned. *Fix:* choose one. If "at most", say that an unassigned perspective shows as Not submitted.
- **medium** "One person cannot hold two perspectives" cannot be tested without a defined identity model (FR-2 bullet 1, FR-3). The access mechanism is deferred (§8 Q3), and FR-3 only guarantees "a distinct identity tied to their role". If access is per role (for example, per-perspective links), the application cannot know two roles belong to one person. *Fix:* restate as "the same identity cannot be assigned two perspectives", or move the constraint into Open Question 3 as an architecture input.
- **medium** Withdrawing a response is unspecified (FR-8, FR-9). FR-9 allows switching between a substantive answer and Can't answer, but not going back to Not submitted. FR-2 (assignment lock), FR-6 (removal) and FR-7 (wording edit) are all gated on "submitted", so whether a withdrawal un-gates them matters. *Fix:* state "A submitted response cannot be withdrawn to Not submitted", or define the effect of withdrawal on FR-2, FR-6 and FR-7.
- **medium** The demo starting dataset is undefined (FR-23, SS-3). "After a reset, the demo dataset is identical to its defined starting state", but that state is never defined. UJ-2 implies a pre-reveal state with responses already present, and SS-3 requires "the full UJ-1 journey" to run from reset. That journey includes session creation, assignment and answering, which a preloaded pre-reveal dataset would skip. *Fix:* name the starting state (for example, "Brightleaf session with Q1–Q3 answered as in UJ-1 step 3, Q4 not yet added") and align SS-3 with it.
- **medium** "Every supported interface" is open-ended (FR-10, FR-11, NFR-1, SS-2). The privacy guarantee is only as strong as this list, and the PRD never says the list must be enumerated. *Fix:* require architecture to enumerate the supported interfaces, and make NFR-1 cover each one on the list.
- **low** Several consequences cannot be verified. FR-15 "after human discussion" and the FR-12 description's "one at a time or several together" (bulk reveal has no consequence). *Fix:* drop "after human discussion" from the FR text, and add a bulk-reveal consequence or remove "several together".
- **low** Some edit paths are unspecified. Can a follow-up owner be changed or cleared (FR-18)? Does a Conflict↔Unanswered change while Open keep the follow-up owner (FR-16)? Does FR-19 reject a missing decision-owner role, given the statement requires "name and role" but the consequence checks only "decision owner"? *Fix:* add one consequence for each.
- **low** FR-17 and FR-21 have no statement sentence, only consequences. *Fix:* add a one-line capability statement to each so stories can quote it.

## Scope honesty — strong
§5 Non-Goals does real work. "Not a tool that certifies a story as 'ready'" and "Agreement recorded in the product does not mean the agreed behaviour is correct" both block plausible misreadings. §6.2 lists exclusions that could otherwise be silently assumed: audit trail, notifications, decision-owner sign-in. The open-items density is low (3 non-blocking questions, 0 assumptions), which fits a PRD that is going on to downstream phases. Growth directions in §1 are framed conditionally ("These are not commitments"). No scope creep was found: every FR maps to §6.1, and the demo environment (FR-21 to FR-24) is justified by the portfolio purpose and listed in scope.

### Findings
- **low** Session lifecycle is silent. Nothing covers deleting, archiving or closing an alignment session, or data retention. If deletion exists it is another path that removes Resolved records (see Check 4). *Fix:* add to §6.2 "Alignment session deletion and archival", or specify it.

## Downstream usability — adequate
IDs are contiguous and unique (UJ-1–2, FR-1–24, NFR-1–5, SS-1–10, SS-C1–C3). Every feature says which UJ steps it realizes, and every SS names the FRs it validates. This is better traceability than most PRDs have. The Glossary is strong and states its own discipline rule ("no synonyms elsewhere"). It fails that rule for the very term the privacy requirement turns on, and a few working terms used across FRs are undefined.

### Findings
- **medium** "Response type" is used but not defined (FR-11, FR-22, NFR-1, SS-2, §6.1). "Neither response content nor response type (substantive answer vs Can't answer) is disclosed before reveal". The Glossary folds the type into **Response status**. This is the load-bearing privacy term, and architecture and test design will key on it. *Fix:* add "**Response type.** Whether a submitted response is a Substantive answer or Can't answer. Never disclosed to anyone but the author before reveal". Alternatively, rewrite the four uses in terms of response status.
- **low** Other terms are undefined: "partial reveal" (UJ-1 step 4, §6.1), "zero-submission reveal" (FR-12, NFR-2, §6.1), "resolution statement" (§3, FR-19, FR-20), "role" and "actor" (FR-3, FR-10, NFR-1), "demo user" (FR-22), "minimum evidence" (defined inline in FR-15 only), "ready" (FR-18). *Fix:* add the ones that architecture or UX will model (resolution statement, role, minimum evidence). Inline wording is fine for the rest.
- **low** "State" is overloaded. **Question state** (Hidden/Revealed) is a defined term, but FR-16 ("The current state shows the new classification") and the Glossary's **Decision summary** ("the alignment session's current state") use "state" for the whole session. *Fix:* use "current view" or "current record" for the session-level meaning.

## Shape fit — strong
A solo portfolio product with a real multi-role interaction justifies two UJs with named protagonists. UJ-1 carries the multi-role rules and UJ-2 carries the portfolio demo. The PRD is not over-formalised: there is no persona catalogue and no market section. It is chain-top, so downstream usability matters, and the PRD invests in traceability accordingly. Excluding technology is consistent and explicit (§0, NFR-5, §8 Q3).

## Explicit checks 1-6

### 1. Hidden response content and response type cannot leak before reveal — PASS, with two consequence-level gaps
Evidence for pass:
- FR-10 covers content for every non-author, including "a facilitator who holds a perspective", and is "enforced by the application's data access, not only by what is displayed".
- FR-11 covers content and type: "Neither response content nor response type … is disclosed before reveal, through any supported interface". The Glossary's Response status entry repeats the rule ("whether a submission is a substantive answer or Can't answer is not shown").
- FR-22 covers type in the demo ("cannot access another perspective's response content or response type"). NFR-1 tests both in normal sessions and the demo, and SS-2 verifies it.
- Coverage (FR-14) and classification (FR-15) apply only to Revealed questions, so neither can leak type. The rejection messages for FR-2, FR-6 and FR-7 disclose only "submitted", which FR-11 already allows.

Gaps:
- **medium** FR-8 bullet 2 is unscoped: "Can't answer is stored and displayed distinctly from a substantive answer and from Not submitted". Read literally for all viewers, it contradicts FR-11 before reveal. *Fix:* append "to its author, and to everyone after reveal".
- **medium** FR-20 states only the content rule: "No hidden response content ever appears in the summary". Type is protected only by implication ("state only"), and bullet 1 ("For each question it shows: question text, state, classification, coverage…") conflicts with bullet 2 ("Hidden questions appear with their state only"). It is unclear whether a Hidden question's text and Submitted/Not submitted status appear. *Fix:* "Hidden questions show question text, state and Submitted/Not submitted per perspective only. Neither hidden response content nor response type ever appears in the summary or its copied text".

### 2. Demo role switching is isolated from normal sessions — PASS, with gaps
Evidence: FR-24 says "Role switching is available only inside the demo environment" and "Users of normal alignment sessions cannot switch roles or act as another participant". The data separation runs both ways ("demo actions never affect normal sessions, and normal sessions never appear in the demo"). The Glossary repeats "Role switching exists **only** here", NFR-2 tests "attempted impersonation outside the demo", and FR-22 keeps the visibility rules per acting role.

Gaps:
- **medium** The demo's sharing and reset authority is unspecified (FR-23, FR-24). It is unclear whether the demo is one shared instance (so that one visitor's reset or reveal changes what another visitor sees) or one instance per visitor, and who can reset it. For a public portfolio demo this decides whether "isolated" also means isolated between demo visitors. *Fix:* state "each demo visitor gets their own demo instance", or accept the shared instance explicitly.
- **low** FR-22 applies "FR-4 to FR-20". This excludes FR-1 to FR-3, so the PRD does not say whether a demo user can create sessions or reassign perspectives. *Fix:* state which setup actions are available in the demo.

### 3. Response status, interpretation classification and resolution status stay distinct — PASS
Evidence: the Glossary defines the three with disjoint value sets (Substantive answer / Can't answer / Not submitted; Not yet reviewed / Aligned / Conflict / Unanswered; Open / Resolved), plus Question state (Hidden / Revealed) as a fourth axis. The FRs keep them separate. FR-15 explicitly blocks the most tempting blur: "Can't answer responses never automatically produce Unanswered". UJ-1 step 6 reinforces this ("That's her judgement, not an automatic result"). FR-17 confines resolution status to Conflict and Unanswered. FR-20 lists state, classification, coverage and resolution status as separate fields. No synonyms were found for any status value.

Minor:
- **low** "Response type" is a fourth term that sits inside Response status without a Glossary entry. It is covered under Downstream usability.
- **low** The Vision's lower-case "Every conflict or unanswered question ends either **Resolved** … or **Open**" mixes classification and resolution vocabulary informally. It also overstates: questions can stay Hidden or Not yet reviewed indefinitely and never reach either outcome. *Fix:* "Every question classified Conflict or Unanswered is either Resolved … or Open …".

### 4. Resolved decisions cannot be silently changed — PASS
Every path traced:
- Reclassification. FR-16: "Changing the classification of a Resolved question is rejected. A recorded resolution is never silently cleared, overwritten or invalidated". The Glossary's Resolution status entry says the same.
- Editing, deleting or reopening a resolution. FR-17: "cannot be edited, deleted or reopened, and stays visible unchanged".
- Question removal. FR-6 allows removal only while the question is Hidden and has no submissions. A Resolved question must be Revealed, so it can never be removed.
- Question wording. FR-7 allows edits only while the question is Hidden and has no responses.
- Response edits. FR-9 and FR-13 lock responses on reveal.
- Perspective reassignment. FR-2 locks the assignment once the participant submits any response. A perspective with no submissions can still be reassigned after a resolution. The newcomer cannot submit to locked questions (FR-13), so the resolution and its coverage are unaffected.
- Demo reset. FR-23 restores the dataset, which is intended and confined to the demo.

Residual: **low** Session deletion is unspecified (see Scope honesty). If it exists, it removes Resolved records wholesale.

### 5. Open issues and missing follow-up owners are represented honestly — PASS, with one real weakness
Evidence: FR-17 makes Open the default for Conflict and Unanswered. FR-18 flags an Open question with no follow-up owner as "**incomplete** in the alignment session and in the decision summary" and says Open is "never displayed as ready or resolved". FR-20 marks both incomplete Open items and Not yet reviewed questions. FR-19 blocks Resolved without a decision owner, and UJ-1 step 7 says "Maya can't mark it resolved on an assumption". SS-C3 explicitly refuses to optimise the resolution rate, and SS-C2 refuses to push for completion.

Weakness:
- **medium** An open issue can disappear without trace (FR-16 bullet 2 combined with bullet 3). An Open Conflict reclassified to Aligned loses its Open status and follow-up owner, and no history is kept. The decision summary then shows only "Aligned". Combined with the overlapping Aligned definition (Done-ness, **high**), a real conflict can be closed this way without anyone seeing that it was ever Open. The rule itself is an approved decision (`.memlog.md`), and it is honest that no audit trail exists. The concern is visibility, not the rule. *Fix:* keep the rule but show a "reclassified from Conflict/Unanswered" marker on the question and in the summary. Alternatively, list this case in NFR-2's edge cases and name it as an accepted trade-off in FR-16.

### 6. No implied customer validation, commercial traction or proven differentiation — PASS
Evidence: the Evidence status banner ("No customer interviews or validation were conducted … does **not** claim reduced rework …", plus "existing practices … may already be sufficient"). §2.1 says "approved hypotheses from discovery, not validated customer findings". §2.3 says "All people, companies and stories below are **fictional** … Nothing here is a customer observation". The §1 growth directions are conditional ("**If** teams find it worth repeating … These are not commitments"). §7 says "No adoption, ROI, time-saved, defect or rework targets are set, because none is evidenced", and SS-5 to SS-10 are marked [U] with no targets. SS-3 adds "without presenting fictional results as customer outcomes". FR-21 labels every demo screen. There is no differentiation or competitive section. SS-7 openly questions whether the product beats normal refinement.

Minor wording:
- **low** UJ-1 Climax says "The team sees a real behavioural conflict, not a vague feeling of disagreement". It is inside a fictional journey, but if lifted into a portfolio write-up it reads as an outcome claim. *Fix:* "a concrete behavioural conflict".
- **low** "This product adds a small step" (§1) is an unlabelled effort claim (see Substance).

## Mechanical notes
- **Broken cross-reference (medium for traceability).** §0 says "Supporting detail and options considered are in `addendum.md`". No `addendum.md` exists in the PRD workspace; only the brief's addendum exists. Create it, or retarget the sentence at the brief's addendum.
- **Assumptions Index roundtrip:** no inline `[ASSUMPTION]` tags remain, and §9 says so. `.memlog.md` records A1–A8, Resolved finality and Open→Aligned as user-approved decisions, so the roundtrip is consistent. §9 refers to decisions "recorded in `.memlog.md`", a hidden working file that downstream readers may not open. Consider recording the key decisions in the PRD or the addendum.
- **Evidence label [R]** is defined in the banner but never used in the body. Either cite the research where it applies (for example, the Three Amigos / Example Mapping alternatives) or drop the label.
- **Heading levels:** UJ-1 and UJ-2 are `###`, the same level as their parent §2.3. They should be `####`.
- **ID continuity:** all ID series are contiguous and every cross-reference resolves (FR-4, FR-16, FR-19 references; SS→FR mappings; NFR-2 → SS-1). Minor: SS-C3 "Counterbalances FR-19" points at an FR, while SS-C1 and SS-C2 point at SSs. This is acceptable but inconsistent.
- **Glossary vs FR-20:** the Glossary says the decision summary is "copyable or exportable", but FR-20 specifies copy only (plain text or Markdown). Align them by dropping "exportable" or adding an export consequence.
- **Required sections** for the agreed stakes are all present.
