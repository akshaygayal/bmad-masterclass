# Reconciliation: PRD vs approved brief inputs

- **PRD checked:** `prd.md` (status: draft, 4,415 words)
- **Inputs:** `brief.md` (approved 2026-11-10), `addendum.md`, the brief's `.memlog.md`, the PRD's `.memlog.md`
- **Date:** 2026-11-10
- **Method:** I read every file in full and compared them by hand. None of the files was edited. Line references point to `prd.md` unless another file is named.

## Verdict

The PRD is faithful on the core mechanics. These include enforced privacy, partial reveal and "Not submitted", human-only classification, open-with-owner, the separation between facilitator and decision owner, the demo running under the same rules, "not a KM system" and "agreement ≠ correctness". The out-of-scope list is carried over completely (§6.2 L338–350).

The weaknesses are in the evidence and positioning layer. The selective-use hypothesis, the effort/cost risk, the excluded problem scope and the "no differentiation / not novel" framing were all dropped or thinned. There is also one unlogged future direction and one broken file reference.

---

## 1. Missing, contradicted or weakened

Severity: **H** = conflicts with an approved decision or loses an explicit caveat · **M** = meaningful weakening · **L** = minor or editorial.

| # | Sev | Item | Source | PRD state |
|---|---|---|---|---|
| 1.1 | H | **Selective-use hypothesis [H]** is missing. The brief says the product is used selectively, for stories with consequential business rules, exceptions, boundaries or permissions, or when the facilitator spots an ambiguous scenario, and not for every story. That rests only on broad FH, with no claim it would have prevented past problems. | brief L73; brief memlog L25, L29 | **Missing.** §9 (L384) says "selective use stays labelled [H] where it appears", but it appears nowhere. Open Question 2 (L379) only keeps the [U] about how facilitators choose stories. The hypothesis itself and its "no prevention claim" caveat are lost. |
| 1.2 | H | **Cost and central risk** is weakened. The brief says the product adds preparation for everyone and *may add effort rather than save it*. It also says a team with good Three Amigos or Example Mapping may get most of the value for free. The brief memlog says to "keep challenging effort vs Three Amigos/Example Mapping (serious adoption risk)". | brief L75; brief memlog L26 | **Weakened.** The Evidence status (L12) keeps "existing practices may already be sufficient" and drops the time-saved claim, but no "may add effort" statement exists. Only SS-10 ("does the preparation feel worth it?") hints at it. |
| 1.3 | M | **Differentiation caveats** are missing: "No differentiation is proven"; "the individual mechanisms are not novel"; a DIY form plus spreadsheet can reproduce the mechanism; the nearest researched technique showed no clear effect [45]; any advantage comes from workflow design, not technology, and can be replicated. | brief L79–92; addendum A1 L16; brief memlog L9, L34 | **Missing.** The PRD has no alternatives section and does not cite [45]. The general line "research … does not show this mechanism works" (L12) survives. |
| 1.4 | M | **Problem scope exclusions** are missing. The **Out** item ("legitimate requirement changes arising later from new information") is gone. So is the **secondary [H]** that missing acceptance criteria surface when nobody can answer a question, and the memlog's "no claims of preventing all ambiguity/rework/defects". | brief L42–45; brief memlog L11 | **Missing.** The Unanswered classification exists, but it is not framed as a secondary hypothesis, and the later-change exclusion never appears. |
| 1.5 | M | **Facilitator ≠ decision owner** is only implied. Brief success signal A6: "The facilitator is not automatically the decision owner." | brief L53, L102 | **Partial.** FR-19 (L265) requires a decision owner to be entered and shown separately from the recorder. However, no testable consequence says the decision-owner field never defaults to, or is pre-filled with, the facilitator. Nothing flags the case where the facilitator names themselves. A6 has no direct FR consequence. |
| 1.6 | M | **Vision directions** are contradicted. The brief memlog limits future directions to exactly two (perspectives beyond PO/Dev/QA, and tracker referencing), says they are not a roadmap, and excludes everything else. | brief L150–152; brief memlog L43 | **Contradicted.** §6.2 L350 adds "Decision-owner sign-in or confirmation (a possible future direction only, if validated)". This is a third future direction with no logged decision. §1 (L38) on its own matches the brief. |
| 1.7 | L | **Record value caveat** is weakened. The brief says there is "no evidence anyone will consult it repeatedly; the record supports the core value". | brief L71; brief memlog L31–32 | **Weakened.** "Not a documentation or KM system" is kept (§5 L321, §6.2 L344), and SS-9 asks the question. The explicit "no evidence of repeated consultation" and "record supports, core value is exposing differences" statements are dropped. |
| 1.8 | L | **The [FH] label definition** is narrowed. The brief defines it as "problem discovery only, a small number of organisations, not generalised". | brief L15 | **Weakened.** The PRD (L12) says only "not generalised". |
| 1.9 | L | **JTBD wording** risks reading as a rework claim. D3 says "…avoid preventable rework" (L45). | brief L19; brief memlog L21, L26 | **Risk.** It is labelled as a hypothesis job statement, but the JTBD are not in the approved brief. Calling them "approved hypotheses from discovery" (L43) cannot be traced to these inputs. |
| 1.10 | L | **Demo outline** has drifted. The addendum outline shows one agreement, *two* conflicts and one question nobody could answer. | addendum L37–42 | **Deviation.** UJ-1/UJ-2 show two Aligned, *one* Conflict and one Unanswered. The outline was an input, not a decision, so this is low severity. |
| 1.11 | L | **Broken reference.** §0 (L24) says supporting detail is in `addendum.md`, and the PRD memlog L10 says edge cases and support material go to an addendum. | PRD memlog L10 | **Missing file.** The PRD folder contains only `prd.md` and `.memlog.md`. |

**Checked and confirmed present (no gap):**
- Evidence status: no validation; no rework, defect, speed or time-saved claims; alternatives may suffice; mechanism unproven (L12).
- Partial reveal and Not submitted (FR-12, FR-14).
- Silence never shown as agreement (FR-15 minimum evidence; UJ-1 L82).
- Human-only conflict judgement (FR-15, §5 L319).
- Open-with-owner and no forced decisions (FR-18, FR-19, SS-C3).
- Demo runs under the same rules (FR-22).
- Not a KM system (§5).
- Not an AC editor and not a readiness certification (§5 L318, FR-18).
- Agreement ≠ correctness (§5 L322).
- Complements refinement (§1 L36, §5 L316).
- Full out-of-scope list (§6.2).
- Fixed three perspectives, no configurable roles.
- Participants can raise questions with no hard limit (FR-4).
- Success signals A1–A7 and the quality bar (NFR-2, SS-1–3).
- Learning signals B as [U] with no targets (SS-5–10).
- Excluded business metrics (§7 L354).
- Brief open questions 1–4 resolved per the brief memlog L50 (FR-10/11, FR-15/19, FR-4/12, OQ-1).

**Tone:** the PRD is honest and consistently states that it complements refinement. The "lightweight" intent survives only as "small step" (L30). Because of 1.1–1.3, the PRD reads as more confident about the product's place than the brief does.

---

## 2. Scope beyond the brief without a logged decision

| # | Item | PRD location | Notes |
|---|---|---|---|
| 2.1 | Decision-owner sign-in or confirmation listed as a possible future direction | §6.2 L350 | Not in the brief's Vision. It conflicts with the brief memlog L43, which allows only directions 1 and 2. The PRD memlog L12 rules out in-app confirmation for the MVP but logs no future direction. |
| 2.2 | Reclassification of an Open item to **Not yet reviewed** (as well as to Aligned) clears its Open status and follow-up owner | FR-16 L245 | The PRD memlog L27 approves only the "Open Conflict/Unanswered → Aligned" case. The Not-yet-reviewed path is an unlogged extension. |
| 2.3 | "One person cannot hold two perspectives in the same alignment session" | FR-2 L138 | Reasonable and implied by "three fixed perspectives", but not explicitly logged. Low. |
| 2.4 | Counter-signals SS-C1–C3 | §7 L370–373 | Consistent with the brief's spirit. They are logged only as drafted (PRD memlog L25, change), with no explicit approval line. Low. |
| 2.5 | JTBD section labelled "approved" | §2.1 L43 | Sourced from brainstorm inputs listed in the brief memlog L7, not from the approved brief. Approval of these job statements cannot be traced. Low. |

Already logged, so not counted as scope creep: WCAG 2.2 AA (A7), desktop browser (A8), Markdown copy (A6), demo reset and isolation (FR-23/24, PRD memlog L24), Can't answer, minimum evidence, incomplete flag, Resolved finality.

---

## 3. Reflection of the PRD decision log in prd.md

There are 17 `(decision)` lines in the PRD `.memlog.md`.

**Result: 15 yes · 2 partial · 0 no**

| Memlog line | Decision (short) | In prd.md |
|---|---|---|
| L6 | Create intent; architecture and tech out of bounds | Yes (§0 L24, NFR-5) |
| L7 | No new research | Yes (process only; no new sources cited) |
| L10 | Journey-led; ~5–8 pages; edge cases and support material to an addendum | **Partial.** Journey-led, yes. The addendum it refers to does not exist (L24). At ~4,400 words the PRD is around the top of the length guideline. |
| L11 | Edit until reveal; per-question reveal and lock; no post-reveal edits, versions or audit; facilitator sees status only | Yes (FR-9–13, §6.2) |
| L12 | Attribution option (a): decision owner as reported plus recorder; no implied confirmation; no voting, comments or approval | Yes (FR-19, §5, §6.2) |
| L13 | Late questions follow the full lifecycle and start hidden | Yes (FR-4, FR-12, UJ-1 step 6) |
| L15 | UJ-1 and UJ-2 approved | Yes |
| L16 | Explicit Can't answer, distinct from other statuses | Yes (FR-8, Glossary) |
| L17 | Classify with a perspective missing; coverage always shown | Yes (FR-14, FR-15) |
| L18 | Revealed questions locked; follow-up questions get their own lifecycle | Yes (FR-13, FR-7) |
| L19 | Anyone adds questions; only the facilitator removes, and only Hidden questions with zero responses | Yes (FR-4, FR-6) |
| L20 | Labels; Can't answer does not automatically mean Unanswered; three distinct concepts | Yes (Glossary, FR-15) |
| L22 | A1 assignment lock; A2 wording edit; A3/A4 status Submitted/Not submitted only | Yes (FR-2, FR-7, FR-11) |
| L23 | A5 correction while unresolved; A6 Markdown; A7 WCAG; A8 desktop | Yes (FR-16, FR-20, NFR-4, NFR-5) |
| L24 | Zero-submission reveal; minimum evidence; incomplete flag; demo isolation; resolution consistency | Yes (FR-12, FR-15, FR-18, FR-24, FR-16/17) |
| L26 | Resolved is final in the MVP | Yes (FR-17) |
| L27 | Open → Aligned clears Open status and owner; not after resolution | **Partial.** Reflected, but broadened to include → Not yet reviewed without a logged decision (FR-16 L245; see 2.2). |

The assumption lines L8 (stakes and length) and L9 (initial user direction) were superseded by decisions L10–L13 and are reflected through them.

---

## Suggested fixes (for the author; not applied)

1. Add the selective-use [H] and the cost/effort risk to §1 or a short "Evidence and risks" note (1.1, 1.2).
2. Add a two-line alternatives caveat: no proven differentiation, mechanisms not novel, [45] showed no clear effect (1.3).
3. Add the problem-scope exclusion for later legitimate changes and the secondary [H] (1.4).
4. Add an FR-19 consequence: the decision owner is never defaulted to or pre-filled with the facilitator (1.5).
5. Remove the decision-owner sign-in future direction from §6.2, or log a decision for it (1.6, 2.1).
6. Log, or remove, "→ Not yet reviewed" in FR-16 (2.2).
7. Create `addendum.md`, or remove the reference in §0 (1.11).
