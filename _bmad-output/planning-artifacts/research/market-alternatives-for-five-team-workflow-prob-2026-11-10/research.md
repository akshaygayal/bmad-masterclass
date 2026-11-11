---
title: 'market research: Alternatives and substitutes for five team-workflow problem areas (Pass 1)'
type: 'market'
topic: 'Alternatives and substitutes for five team-workflow problem areas (Pass 1)'
decision: 'Which of five opportunity hypotheses (K1, K2a, K2b, K5, K6) survive initial desk validation and warrant targeted Pass 2 research before the evidence-based portfolio MVP comparison'
source: 'native run'
status: complete
preset: 'custom (subagents=normal, sources<=6, depth=1)'
validation: 'normal'
created: '2026-11-10'
updated: '2026-11-10'
claims_verified: 4
claims_unverified: 17
claims_overturned: 2
---

# market research: Alternatives and substitutes for five team-workflow problem areas (Pass 1)

**Decision this research serves:** Which of five opportunity hypotheses survive initial desk validation and warrant targeted Pass 2 research. **This is a breadth-first scan: one round, at most 6 sources per dimension.** It does not select an MVP, and absence of evidence here is never proof of absence.

**Evidence labels** (protocol §8.1a): VMC = vendor marketing claim · DOC = documented feature · OBS = directly observed functionality · IUR = independent user report · IEO = independently evaluated outcome · REG = official regulatory text · INF = inference · UNR = unresolved (search scope recorded in the digests). "(snippet)" = taken from a search-result summary; the page itself was not opened; low confidence.

## Executive summary

- **None of the five hypotheses is ruled out yet. All five face existing alternatives, and some are strong.** Desk research can't settle the two most important disqualifiers (E1 buyer, E2 organisational cause). They need conversations.
- **K1 Requirement clarity — the incumbent risk is concrete.** Jira's own AI agent already scores stories for readiness against a definition of ready [1], and Marketplace apps add DoR gates [3]. A "check the ticket text" concept (D3A) looks largely covered. **No product implementing independent interpretation comparison (D3B) was found** [6], but that rests on one query and is **unresolved**, not a confirmed gap.
- **K2a Performance expectations — substitutes are free or bundled.** About 20 companies publish engineering ladders [8], and Lattice ships career-track templates including Software Engineer [11]. The problem evidence is old (Gallup 2015, about half of employees strongly know what's expected [9]). Nothing separated unclear criteria from forced distribution or budget as the cause.
- **K2b Goal alignment — mixed signals.** HR suites document cascading [16]. Microsoft retired its embedded OKR app, Viva Goals, on 2025-12-31 with no stated reason [18]. Influential practitioners argue *against* cascading itself [19][21]. Software that reinforces cascading may be solving the wrong problem (inference).
- **K5 Knowledge readiness — the strongest independent problem evidence.** A peer-reviewed Microsoft study reports onboarding of 6+ months and an informal, criteria-free "independence" checkpoint [25]. AI codebase-understanding tools are a crowded category [30][31][32][34]. **No product assessing readiness through a representative task was found**; the closest practice is reverse shadowing in outsourcing transitions, vendor-sourced [28][29].
- **K6 Interview evidence — the structure is already in the ATS.** Greenhouse documents interview kits and scorecards [35]. Structured interviews have the highest mean validity in a 2022 meta-analysis (via summary) [37]. Any tool that records or evaluates candidates touches NYC LL144 [38] and EU AI Act high-risk wording [39], which increases complexity.
- **Pass 2 (below) corrects and extends this summary:** K5 multi-org evidence is weak; the "6+ months" figure was cited, not measured; EU high-risk timing moved to 2 Dec 2027; Viva Goals had a stated reason. Read the Pass 2 section before relying on this summary.
- **Biggest caveat (Pass 1):** of 17 load-bearing claims, only 1 was independently cross-checked (K1, [1], existence only). Many of the 41 sources are search snippets. Treat everything as Pass 1 orientation.

## K1 — Requirement clarity before commitment

**Existing products and platform features.** Atlassian documents a Rovo "readiness checker" agent. It scores Jira work items on completeness, clarity, auditability and estimation, and automation rules can run it on status change or creation [1] (DOC, existence corroborated by a third-party Community article during the lead spot-check). Community users report copying it, adding their own DoR criteria, and gating tickets with automation. They also report that it can't edit custom fields where acceptance criteria often live [2] (IUR, snippet). Several Marketplace apps provide DoR/DoD checklists, transition validators and readiness scores [3] (VMC, snippet). **All of these evaluate the ticket's text and fields, not whether roles understand it the same way** (INF from [1][3]).

**Non-software substitutes.** Example Mapping is documented by Cucumber as a pre-development conversation using story, rule, example and question cards [4] (DOC). Cucumber cites no effectiveness evidence [4]. Evidence for BDD and Three Amigos is mainly practitioner self-report [5] (IEO, self-report, snippet).

**Interpretation comparison (D3B).** The only near match is Visual Paradigm's "role swap" story-writing technique: write the story from another role, then compare. It's a practice with no evidence [6] (DOC). **UNR** for any product: one query, recorded in the digest.

**Problem persistence.** NaPiRE surveyed 228 companies in 10 countries on requirements-engineering problems [7] (IEO). Its specific problem rankings could not be read this run (UNR).

## K2a — Performance expectations (ME vs EE, promotion criteria)

**Non-software substitutes.** A practitioner compilation lists about 20 public engineering career ladders (e.g. Dropbox, CircleCI, Spotify, FT) as spreadsheets, GitHub repos or apps [8] (IUR; list dated 2020-03, currency unchecked). Ladder structures vary: impact tiers, multi-axis grids, dual tracks [8]. One career-coaching platform describes Google separating promotion from ratings, with managers setting per-report expectations for a top rating each quarter [14] (IUR, secondary).

**Products.** Lattice documents Grow "Track Templates" with competencies, levels and expectations, including Software Engineer and Engineering Manager templates [11] (DOC). The doc doesn't say whether tracks feed review ratings. A calibration vendor claims calibration reduces rating gender gaps [12] (VMC, snippet).

**Problem persistence.** Gallup (2015; 550 orgs, 2.2M employees) reports about half of employees strongly agree they know what's expected of them [9] (IEO; old; commercial survey firm; method not disclosed in the article). A training vendor reports 1 in 3 employees surprised by review feedback [10] (VMC, snippet). Forum posts describe "moving goalposts" [15] (IUR, snippet). **UNR:** no source separated unclear criteria from forced distribution or budget as the cause. **UNR:** no independent evidence that transparent ladders or calibration reduce surprises. One rating-scale design study is set in teaching evaluations [13] (IEO, snippet).

## K2b — Goal alignment / OKR cascading

**Products.** Lattice help docs describe optional cascading with parent/child alignment and progress roll-up, controlled by admins [16] (DOC, snippet). An older Lattice blog announced moving away from parent/child goals, which conflicts with the docs [17] (VMC; historical or unresolved). **Microsoft's official docs state Viva Goals retired on 2025-12-31, with no new features after 2024-12-05 and no named replacement** [18] (DOC, primary). The reason is **UNR**.

**Practitioner positions.** Sull & Sull (MIT SMR, 2018) argue that transparent goals can align without "a time-intensive process of cascading goals". They give no outcome data, and the first author disclosed a past advisory role with BetterWorks [19] (IUR, opinion). OKR vendors and consultants publish "align, don't cascade" positions [21] (VMC, snippet).

**Problem persistence.** A former CTO writes that pushing OKRs down to individuals makes them vague box-ticking [20] (IUR, 2023). A Teamblind thread title expresses the same frustration [22] (IUR, title only). Older surveys report low employee line-of-sight to company goals [19][24] (IUR, secondary, dated). **UNR:** no controlled evidence that cascading itself changes outcomes. Cross-sectional studies link alignment to performance only indirectly, via goal clarity and engagement [23] (IEO, snippet).

## K5 — Knowledge readiness (onboarding and transitions)

**Problem persistence — independent.** In a peer-reviewed study at Microsoft (32 developers, 15 managers, surveys of 189 and 37), interviewees describe onboarding taking more than six months. "Independence" is an informal manager checkpoint with no formal criteria. Mentors or buddies helped 14 of 18 developers who had one. Poor documentation frustrated developers [25] (IEO; single company; survey response rates of 11.6% and 4.9%). Remote onboarding at Microsoft highlighted social connection as the top challenge [26] (IEO, abstract). OSS newcomer research lists finding a starting point among the best-evidenced barriers [27] (IEO, snippet; OSS context). **UNR:** no source separates missing project or domain knowledge from normal learning time [25].

**Products.** Swimm documents AI codebase understanding with IDE plugins and auto-updated docs, and no readiness assessment [30] (DOC). Zencoder, Amazon Q positioning and many 2026 hackathon "repo onboarding" tools market AI onboarding [31][32][34] (VMC). **No independent evaluation of these tools was found** (UNR).

**Practices and services.** Ju et al. identify Simple-Complex, Priority-First and Exploration-Based task assignment [25]. Staffing content proposes first-commit and first-PR milestones [33] (VMC, snippet). Outsourcing and captive transition providers describe shadowing → reverse shadowing → sign-off thresholds (e.g. 95% of incidents handled independently) [28][29] (VMC). **This is the closest published analogue to demonstrated readiness, and it's vendor-sourced. No product formally assessing developer readiness through a representative task was found** (UNR, limited scope).

## K6 — Interview evidence

**Products.** Greenhouse documents interview kits with focus attributes, sample questions and a scorecard: free-text takeaways, optional attributes, and a four-option recommendation [35] (DOC, updated 2026-09). **Nothing in the doc checks that feedback cites job-relevant evidence** (INF). Interview-intelligence tools such as Metaview are described as drafting scorecards from transcripts [36] (VMC, snippet). **UNR:** products supporting practical-work assessment (debugging, incident investigation). No query was run.

**Research evidence.** Sackett et al. (2022), via SIOP's summary, put structured interviews at the highest mean operational validity (r = .42), with job knowledge tests at .40, work samples at .33 and cognitive ability at .31. There is wide spread and caveats on range-restriction corrections [37] (IEO, secondary summary).

**Regulation.** NYC Local Law 144 requires a bias audit within one year before using an automated employment decision tool, public results and candidate notice; enforcement began 2023-07-05 [38] (REG, official). EU AI Act Annex III 4(a) lists AI used to "evaluate candidates" as high-risk [39] (REG text via an unofficial mirror). Whether a given tool is in scope depends on definitions not retrieved (UNR; not legal advice).

**Problem persistence.** An interviewer-written list of feedback antipatterns (vague, unrelated to the role) [40] (IUR, 2020, historical). A candidate-side thread on feedback about topics never discussed [41] (IUR, snippet). **UNR:** recent interviewer-authored reports.

## Cross-dimension insights

1. **The incumbent platform is the main competitor in three of five areas.** The issue tracker (K1 [1]), the HR suite (K2a [11], K2b [16]) and the ATS (K6 [35]) already host the workflow. Pass 2 should ask what these platforms *don't* do, not only which standalone tools exist (supports backlog C-L3.b).
2. **The evidence pattern is consistent: structure and templates exist, evidence-linking and comparing understanding don't (so far).** Tools check that a ticket is filled in [1][3], that a scorecard is submitted [35], or that a goal links to a parent [16]. **None found checks that people share an understanding (K1 D3B), that feedback cites evidence (K6 I1B), or that readiness is demonstrated (K5 D5B).** This rests on limited searches and is a hypothesis for Pass 2, not a finding.
3. **AI is the crowded direction.** AI readiness scoring [1], AI codebase onboarding [30]–[32][34] and AI scorecard drafting [36] all exist. AI-assisted candidate evaluation also carries regulatory weight [38][39]. That fits the brainstorm's "AI not assumed" stance (inference).
4. **Independent outcome evidence is scarce everywhere except K6.** Only structured interviewing has meta-analytic support [37]. K1, K2a and K2b practices rest on originator claims or correlational data.

## Contrary evidence

The red-team pass was not run (off by plan). The material challenges to the brainstorm's assumptions are listed in the chat summary and in insights 1–3 above.

## Recommendations (Pass 1 → Pass 2 only; no MVP selection)

- **Keep all five hypotheses open for Pass 2, weighted by uncertainty** (see proposed scope in the session summary). Confidence basis: low to medium, single-source.
- **K1:** test whether interpretation comparison exists anywhere (products, perspective-based reading research) before treating it as differentiation. Feeds the brief's alternatives section.
- **K6:** retrieve official regulatory definitions before any concept involving recording or automated evaluation. Feeds PRD constraints.
- **K2b:** treat "improve cascading" as suspect framing. Any K2b concept should be checked against the "align, don't cascade" position [19][21].
- **K5:** the problem evidence is the strongest of the five [25]. The open question is differentiation from AI onboarding tools and from transition-service practices [28].

## Open questions

- Does any product implement independent interpretation comparison (K1) or evidence-linked interview feedback (K6)? → targeted product-doc search plus 1–2 competitive teardowns.
- NaPiRE problem rankings and effects (K1) → read the full text.
- What causes rating disputes: criteria, distribution or budget (K2a)? → interviews; desk research is unlikely to answer this.
- Why was Viva Goals retired (K2b)? → news and analyst coverage.
- Is missing domain knowledge separable from normal learning time (K5)? → GSD knowledge-transfer literature.
- AEDT definition (6 RCNY §5-300), official AI Act text and any 2025–26 amendments (K6) → official sources.
- Buyer and budget questions (E1) for all five → interviews only.

## Pass 2 (Deepen) — 2026-11-10

**Scope (user-approved):** K1, K5 and K6 in depth (~75 min each, research agents capped at 10 sources and ~20 tool calls); K2a and K2b light verification (4 lead searches); stricter verification for claims that could change the decision. **This pass corrects several Pass 1 statements; corrections are marked.** Documented capability is not treated as demonstrated effectiveness, and "not found" stays Unresolved unless the search was comprehensive. **None of the Pass 2 product searches was comprehensive.**

### K1 — Requirement clarity before commitment

- **New evidence.**
  - Jira readiness checker teardown, from Atlassian's own pages [42][1]: it checks a single ticket's text and fields against a definition of ready and outputs per-criterion scores or Pass/Warnings/Fail, which automation can write to a field. **Atlassian's pages disagree on the criteria. None documents how to configure them, any role-based comparison, plan tier, pricing or limitations** (DOC; all one publisher, no independent check).
  - Problem prevalence across organisations is now stronger. NaPiRE's full text: incomplete or hidden requirements are the most cited RE problem (48% of 228 organisations), with effects including time overrun (~10%) and post-implementation rework (~9%). These are respondents' perceptions [7] (IEO). A separate 7-company case study confirms RE challenges are widespread in large-scale agile, qualitatively only [48] (IEO, snippet).
  - Perspective-based reading (PBR), the nearest researched mechanism, has weak support. A 2009 meta-analysis found "no clear positive effect": better than ad-hoc reading, worse than checklists, with researcher-bias indicators. It measures defects found, not shared understanding [45] (IEO; the re-analysis of the same data is not independent).
  - Research on detecting ambiguity from divergent reader interpretations exists [44] (IEO, snippet). A longitudinal Example Mapping case study reports improved shared understanding under some conditions and proposes a measurement instrument [46] (IEO, snippet). One study warns that "understandable" is not the same as "understood correctly" [49] (IEO, snippet).
- **Confirmed / corrected / weakened.**
  - Confirmed: Rovo checks ticket text, not interpretations.
  - Strengthened: late-gap prevalence (from "unread" to 48% cited, perception-based).
  - **Weakened:** any reliance on PBR as support for D3B.
- **Alternatives that matter most.** The Jira readiness agent [1][42]. Marketplace refinement apps, including private-then-reveal planning poker, which uses the same structure as D3B but only for size estimates [43]. Example Mapping and Three Amigos as free practices [4][46].
- **Unknown.**
  - Whether any product does PO/Dev/QA interpretation comparison. Azure DevOps, Linear, RM suites and BDD tools were not searched; **Unresolved, not comprehensive**.
  - Any evidence that comparing interpretations reduces rework.
  - Rovo's plan and pricing.
- **Needs interviews.** Is late-discovered ambiguity frequent and costly enough to act on (QS-L1.5, L2.4)? Would the three roles each spend time writing interpretations, or does a facilitated conversation already do the job (QS-L3.15)? Who owns the problem and budget: PO, EM or QA lead (QS-L1.4)?
- **Provisional status: supports further validation, narrowed.** Park the text-checking concept (D3A), which the incumbent covers. D3B stays open with an explicit risk that it may work better as a free practice than as a product.

### K5 — Knowledge readiness

- **New evidence.**
  - A 2025 systematic literature review of 32 studies on onboarding solutions found **no solution that explicitly measures newcomer readiness**. Evaluations were mostly lab-based, and existing solutions cover 18 of 58 known barriers [50] (IEO).
  - An academic code-tour system (LACY; n = 7, one company) tests comprehension with quizzes and names "starter implementation tasks… beyond quizzes" as future work [52] (IEO, very small sample).
  - A 35-study review of outsourcing transitions reports that domain knowledge needs months to years of scaffolded learning tasks [51] (IEO; abstract only).
  - Products checked track **consumption, not demonstrated ability**: Swimm Playlists' resume tracking and "mark as read" [53] (DOC). GitKraken/CodeSee, DeepWiki, Sourcegraph and Greptile from snippets only; GitHub Copilot not checked. Hackathon or community prototypes claim readiness reports and starter tasks, with no adoption or effectiveness evidence [32].
  - Good-first-issue research across 816 projects shows starter tasks in open source are often unsuitable [54] (IEO, snippet). Ramp-up metrics exist but are noisy for individuals [55] (single company).
- **Confirmed / corrected / weakened.**
  - **CORRECTED:** "onboarding takes 6+ months" is *cited from prior work* by Ju et al., not measured by them [25].
  - Confirmed: managers judge "independence" informally (10 managers), at one company.
  - **Multi-organisation problem evidence remains weak.** Single-company studies plus review abstracts only. **Pass 1's ✅ was wrong and is corrected.**
  - Reverse shadowing sign-off: still vendor-only.
- **Alternatives that matter most.** Informal manager judgement. Graduated starter tasks and mentors [25]. Documentation and tour tools that track progress [53]. Reverse shadowing in transitions (vendor) [28]. Emerging AI "onboarding quest" prototypes [32], which are a signal of builder interest and a future competitive threat, not evidence of demand.
- **Unknown.**
  - Commercial products outside the code-understanding category, such as LMS or skills-assessment tools (not searched).
  - Any independent effectiveness evidence for a readiness practice.
  - Separation of missing domain knowledge from normal learning time.
  - ITIL/ISO transition acceptance criteria.
- **Needs interviews.** How do teams actually decide someone is ready (QS-L2.7)? Is a wrong readiness call costly, and to whom (QS-L2.13)? Who would own or buy this: EM, delivery lead or transition manager (QS-L1.11, L1.12)? How often do transitions or onboardings happen per team (E6)?
- **Provisional status: supports further validation.** This has the clearest documented gap of the five (research literature plus products checked). That is **not** evidence of demand or willingness to pay, and cross-organisation problem evidence still depends on interviews.

### K6 — Interview evidence

- **New evidence.**
  - Greenhouse Notetaker docs (updated 2026-11-04) describe a **non-blocking reminder when AI notes are added without the interviewer's own assessment**, and transcript timestamps in summaries. There is no documented link from attribute ratings to evidence [56] (DOC).
  - Metaview auto-fills only the factual sections and leaves the evaluation blank [57] (DOC).
  - Ashby offers a per-interview "feedback required" setting; per-rating comments are unconfirmed (DOC, snippet). Lever and Workable were not checked.
  - **Regulation.**
    - NYC DCWP's official FAQ limits Local Law 144 to tools using ML, statistical modelling, data analytics or AI that produce a prediction or classification and substantially assist or replace discretion [58] (REG). By that wording, a non-AI evidence form appears outside scope (INF). The verbatim statute and rule definitions were not retrieved.
    - **The EU AI Omnibus entered into force on 27 July 2026. Annex III high-risk obligations, which include recruitment, now apply from 2 December 2027** [59] (REG, official Commission page; independent check: Council press release [63]).
    - GDPR text was not retrieved (Unresolved). Interview notes are very likely personal data, so a non-AI tool still carries privacy and employment-law obligations (unverified belief; to confirm).
  - Structured-interview validity (.42, unstructured .19) is confirmed by two independent secondary sources [37][60] (IEO; primary not opened).
- **Confirmed / corrected / weakened.**
  - Confirmed: ATS scorecards lack an evidence check (still not comprehensive).
  - **CORRECTED:** EU high-risk timing (Pass 1 [39] → [59]).
  - **Weakened differentiation:** the incumbent ATS is already adding nudges next to D1B's mechanism [56] (bundling risk, C-L3.b).
- **Alternatives that matter most.** ATS scorecards and kits [35][56]. Interview-intelligence tools [57]. Structured-interview practice and calibration as free practices [37].
- **Unknown.**
  - Lever, Workable and Ashby per-rating requirements.
  - Exact AI Act definitions (Art. 3(1), Art. 6(3), Annex III) and GDPR text.
  - Anchored-rating research (Campion, Levashina).
  - Whether interviewers or TA leads see unsupported feedback as costly.
- **Needs interviews.** Do interviewers or hiring managers see evidence quality as a real problem (QS-L2.8, L2.14)? Would TA or HR, who hold the ATS budget, adopt something outside the ATS (QS-L1.14)? What privacy constraints apply to interview notes in their organisation?
- **Provisional status: supports further validation, with constraints.** Any concept should stay non-AI, or be scoped carefully, and be checked against GDPR. The incumbent bundling risk is real.

### K2a — Performance expectations (light)

- **New evidence.** Fresher Gallup data, via secondary reports, puts the share of US workers who clearly know what's expected at 46% at year-end 2024, down from 56% in 2020 [61] (IEO; same publisher as [9], general workforce, not engineer-specific). Culture Amp lists career paths and competencies as a "Develop" add-on [64] (VMC). Whether frameworks link to ratings is Unresolved.
- **Corrected / weakened:** [9] superseded by fresher data from the same publisher. Still no independent corroboration.
- **Unknown / needs interviews.** The cause of rating disputes (criteria vs distribution vs budget, QS-L4.10). Whether managers would accept visible criteria (QS-L1.9, L1.10). Who owns the budget.
- **Provisional status: hold for interviews.** Its decisive disqualifiers (E2, E5) are not desk-answerable. Free and bundled substitutes are strong.

### K2b — Goal alignment (light)

- **New evidence.** Third-party coverage of Microsoft's December 2024 announcement reports Microsoft saying it was "unable to reach the scale and impact needed to continue further investment" in Viva Goals [62] (vendor statement via independent outlets). Lattice's current help centre documents cascading as a live, admin-enabled feature; the 2018 blog is historical [16] (DOC; same publisher, not independent).
- **CORRECTED:** Pass 1 said Viva Goals' retirement reason was absent. A stated reason exists. It is Microsoft's own framing; no further cause is inferred.
- **Unknown / needs interviews.** Whether goals are cascaded or self-set in practice. Whether people can trace their goals to priorities. Whether goal tools are used beyond mandatory steps (QS-L3.12). Who would sponsor change (QS-L1.7).
- **Provisional status: desk evidence leans toward parking.** The practice itself is contested [19][21], an embedded tool from a major vendor was withdrawn citing insufficient scale [62], and HR suites already offer cascading [16]. **Interviews could overturn this. It is not a final decision.**

### Pass 2 cross-dimension update

- **The "structure exists; evidence and understanding checks don't" pattern holds** in K1, K5 and K6 at Pass 2 depth. In K5 it is backed by a systematic review. In K1 and K6 it rests on non-comprehensive product searches.
- **Incumbents are moving towards these gaps.** Greenhouse's evidence nudge [56], Atlassian's readiness agent [42] and AI onboarding prototypes [32] all point the same way: a gap found today may be absorbed by a platform. This raises C-L3.b risk for any standalone product (inference).
- **No finding here establishes willingness to pay** for any opportunity.

## Source appendix

| # | Claim/finding it supports | Publisher | Pub date | Accessed | Confidence |
|---|---|---|---|---|---|
| [1] | Rovo readiness checker scores Jira items vs. definition of ready | [Atlassian](https://www.atlassian.com/software/rovo/use-cases/agent-readiness-checker) | undated | 2026-11-10 | medium |
| [2] | Users gate tickets with readiness agent; custom-field limitation | [Atlassian Community (user posts)](https://community.atlassian.com/forums/Jira-questions/Jira-Automation-Rovo-agents-to-enforce-agile-quality-what-should/qaq-p/3264527) | undated | 2026-11-10 | low |
| [3] | Marketplace DoR/DoD checklist and gate apps | [Atlassian Marketplace](https://marketplace.atlassian.com/apps/949313977) | undated | 2026-11-10 | low |
| [4] | Example Mapping practice; no effectiveness evidence cited | [Cucumber](https://www.cucumber.io/docs/bdd/example-mapping) | 2026-11 | 2026-11-10 | high |
| [5] | BDD evidence mainly practitioner self-report | [SciTePress](https://www.scitepress.org/PublishedPapers/2025/133556) | 2025 | 2026-11-10 | low |
| [6] | Role-swap story writing; no product for interpretation comparison found | [Visual Paradigm](https://skills.visual-paradigm.com/?p=1107) | 2026-02 | 2026-11-10 | medium |
| [7] | NaPiRE: RE problems across 228 companies, 10 countries | [arXiv / Empirical Software Engineering](https://arxiv.org/abs/1611.10288) | 2016-11 | 2026-11-10 | high (study exists) |
| [8] | ~20 public engineering career ladders; structures | [swyx.io](https://swyx.io/career-ladders) | 2020-03 | 2026-11-10 | medium |
| [9] | ~Half of employees strongly know what's expected | [Gallup](https://www.gallup.com/workplace/236567/obsolete-annual-reviews-gallup-advice.aspx) | 2015-09 | 2026-11-10 | medium |
| [10] | 1 in 3 surprised by review feedback (vendor survey) | [Crucial Learning](https://cruciallearning.com/press/is-it-time-for-a-redo-on-performance-reviews/) | undated | 2026-11-10 | low |
| [11] | Lattice Grow track templates incl. Software Engineer | [Lattice Help Center](https://help.lattice.com/hc/en-us/articles/4402717644183) | 2026-09 | 2026-11-10 | high (documented) |
| [12] | Calibration narrows gender gap (vendor claim) | [Confirm](https://www.confirm.com/calibration-outcomes) | undated | 2026-11-10 | low |
| [13] | Rating-scale design affects gender gaps (teaching context) | [UCLA CIRTL](https://cirtl.ceils.ucla.edu/2019/02/28/scaling-down-inequality-rating-scales-gender-bias-and-the-architecture-of-evaluation/) | 2019-02 | 2026-11-10 | low |
| [14] | Google promotion separate from ratings; per-report expectations | [Taro](https://www.jointaro.com/topic/google/performance-review/) | undated | 2026-11-10 | low |
| [15] | "Moving goalposts" forum reports | [Fishbowl](https://www.fishbowlapp.com/post/hi-all-after-some-advice-on-what-i-should-do-im-an-engineer-at-a-large-defencemanufacturing-company-and-im-feeling-pretty-nlz2-5) | undated | 2026-11-10 | low |
| [16] | Lattice cascading goals, roll-up, admin controls | [Lattice Help Center](https://help.lattice.com/hc/en-us/articles/360061289693) | undated | 2026-11-10 | low |
| [17] | Lattice blog: moving away from parent/child goals | [Lattice](https://lattice.com/blog/some-improvements-to-lattice-goals) | undated | 2026-11-10 | low |
| [18] | Viva Goals retired 2025-12-31, no replacement named | [Microsoft Learn](https://learn.microsoft.com/viva/goals/goals-retirement) | 2024-12 (upd. 2025-08) | 2026-11-10 | high |
| [19] | Transparency instead of cascading; old line-of-sight surveys | [MIT Sloan Management Review](https://sloanreview.mit.edu/article/with-goals-fast-beats-smart) | 2018-06 | 2026-11-10 | medium |
| [20] | Individual OKRs become vague box-ticking | [Engineering Calm](https://www.engineeringcalm.com/p/okrs-more-like-r-u-ok) | 2023-08 | 2026-11-10 | medium |
| [21] | "Align, don't cascade" vendor positions | [Tability](https://www.tability.io/odt/articles/how-we-align-okrs-because-cascading-sucks) | undated | 2026-11-10 | low |
| [22] | OKR frustration thread (title only) | [Teamblind](https://www.teamblind.com/post/i-hate-this-okr-shit-so-confusing-waste-of-time-lad5xoyh) | undated | 2026-11-10 | low |
| [23] | Alignment → performance only indirectly (cross-sectional) | [DOAJ / Sustainability](https://doaj.org/article/05cdfe21a9094a6daff1126935e9b6c0) | 2020 | 2026-11-10 | low |
| [24] | 49% understood company goal steps (2002 survey) | [EHS Today](https://www.ehstoday.com/archive/article/21909632/less-than-half-of-us-workers-know-their-organizations-goals) | ~2002 | 2026-11-10 | low |
| [25] | Onboarding 6+ months; informal independence checkpoint; task strategies | [arXiv / ICSE 2021 (Ju et al.)](https://arxiv.org/abs/2103.05055) | 2021-03 | 2026-11-10 | high |
| [26] | Remote onboarding: social connection top challenge | [arXiv / ICSE SEIP 2021 (Rodeghero et al.)](https://arxiv.org/abs/2011.08130) | 2021-03 | 2026-11-10 | medium |
| [27] | OSS newcomer barriers incl. finding a start | [IFIP DL (Steinmacher et al.)](https://dl.ifip.org/hal-01373086v1) | ~2014 | 2026-11-10 | low |
| [28] | Shadowing → reverse shadowing → sign-off thresholds | [ANSR](https://ansr.com/blog/2026-outsourcing-to-captive-transition/) | 2026-02 | 2026-11-10 | low (thresholds) |
| [29] | Reverse shadowing certification by error threshold | [Trupeer](https://www.trupeer.ai/fr/glossary/reverse-shadowing) | undated | 2026-11-10 | low |
| [30] | Swimm AI codebase understanding; no readiness assessment | [Swimm docs](https://docs.swimm.io/) | undated (© 2026) | 2026-11-10 | medium |
| [31] | Zencoder markets AI onboarding | [Zencoder](https://zencoder.ai/blog/onboarding-efficiency-ai) | undated | 2026-11-10 | low |
| [32] | Many 2026 hackathon repo-onboarding tools | [lablab.ai](https://lablab.ai/ai-hackathons/ibm-bob-2-hackathon/tribyte/codesensei-ai-developer-onboarding-copilot) | 2026 | 2026-11-10 | low |
| [33] | First-commit/PR milestones as readiness proxies | [Proxify](https://proxify.io/knowledge-base/onboarding/how-to-create-a-developer-onboarding-checklist) | undated | 2026-11-10 | low |
| [34] | Amazon Q positioned for faster onboarding | [ClickUp blog](https://clickup.com/blog/onboard-developers-faster-using-amazon-q/) | undated | 2026-11-10 | low |
| [35] | Greenhouse interview kits and scorecard fields | [Greenhouse Support](https://support.greenhouse.io/hc/en-us/articles/115002226826) | 2026-09 | 2026-11-10 | high |
| [36] | Metaview drafts scorecards from transcripts | [Metaview](https://www.metaview.ai/resources/blog/greenhouse-autofill) | undated | 2026-11-10 | low |
| [37] | Structured interview validity .42 (Sackett et al. 2022, via summary) | [SIOP TIP](https://www.siop.org/tip-article/is-cognitive-ability-the-best-predictor-of-job-performance) | undated (paper 2022) | 2026-11-10 | medium |
| [38] | NYC LL144 bias audit, notice, enforcement 2023-07-05 | [NYC DCWP](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) | 2023-06 | 2026-11-10 | high |
| [39] | EU AI Act Annex III 4(a) recruitment AI high-risk | [artificialintelligenceact.eu (unofficial mirror)](https://artificialintelligenceact.eu/annex/3/) | undated | 2026-11-10 | medium |
| [40] | Interviewer feedback antipatterns | [DEV Community](https://dev.to/isnotajoke/interview-feedback-antipatterns-5e3j) | 2020-10 | 2026-11-10 | medium |
| [41] | Candidate reports feedback on topics never discussed | [Reddit r/leetcode (mirror)](https://redlib.hbubli.cc/r/leetcode/comments/1khfaak/disappointed_after_4_rounds_unclear_rejection/mr6k0u0) | ~2025 | 2026-11-10 | low |
| [42] | Rovo out-of-the-box agents incl. Readiness Checker; no role comparison documented | [Atlassian Support](https://support.atlassian.com/rovo/docs/atlassian-agents/) | undated (2026) | 2026-11-10 | medium |
| [43] | Planning-poker refinement app (private then reveal) | [Atlassian Marketplace — Agile Toolbox](https://marketplace.atlassian.com/apps/1228751/agile-toolbox-planning-poker-retrospectives-refinement) | undated | 2026-11-10 | medium |
| [44] | Ambiguity detected from divergent reader interpretations (Yang et al. 2011) | [University of Limerick repository](https://researchrepository.ul.ie/articles/journal_contribution/Analysing_anaphoric_ambiguity_in_natural_language_requirements/19850605) | 2011 | 2026-11-10 | low |
| [45] | PBR meta-analysis: no clear positive effect | [EBSE Durham (Ciolkowski, ESEM 2009)](https://ebse.webspace.durham.ac.uk/?p=130) | 2009 | 2026-11-10 | medium |
| [46] | Example Mapping longitudinal case studies; shared-understanding instrument | [Utrecht University (RE'21)](https://webspace.science.uu.nl/~dalpi001/papers/bere-dalp-2021-re.pdf) | 2021 | 2026-11-10 | low |
| [48] | RE challenges in large-scale agile across 7 companies | [Chalmers (Kasauli et al., JSS)](https://research.chalmers.se/en/publication/522021) | 2020/21 | 2026-11-10 | medium |
| [49] | "Understandable" ≠ "understood correctly" | [arXiv 2609.07340](https://arxiv.org/pdf/2609.07340) | 2026 | 2026-11-10 | low |
| [50] | Onboarding SLR: no readiness-measuring solution | [arXiv (Santos et al., IST 2025)](https://arxiv.org/html/2408.15989v1) | 2024/2025 | 2026-11-10 | medium-high |
| [51] | Transition KT: months–years of scaffolded learning tasks (35 studies) | [ITU Copenhagen (Krancher 2020)](https://researcher.itu.dk/en/publications/knowledge-transfer-in-the-transition-phase-review-of-the-literatu/) | 2020 | 2026-11-10 | medium |
| [52] | LACY code tours + quizzes; starter tasks as future work | [arXiv 2603.25391](https://arxiv.org/html/2603.25391) | 2026-03 | 2026-11-10 | medium |
| [53] | Swimm Playlists: resume tracking, mark as read | [Swimm docs](https://docs.swimm.io/features/swimm-playlists) | undated (© 2026) | 2026-11-10 | high |
| [54] | Good first issues often unsuitable (816 projects) | [arXiv 2604.27532](https://arxiv.org/abs/2604.27532) | 2026 | 2026-11-10 | medium |
| [55] | Ramp-up proxies noisy at individual level | [Google Research](https://research.google/pubs/developer-productivity-for-humans-part-5-onboarding-and-ramp-up/) | undated | 2026-11-10 | low |
| [56] | Greenhouse Notetaker: non-blocking assessment reminder; timestamps | [Greenhouse Support](https://support.greenhouse.io/hc/en-us/articles/50523570982939-Use-Greenhouse-Notetaker-to-record-and-summarize-interviews) | 2026-11 | 2026-11-10 | high |
| [57] | Metaview fills factual sections, leaves evaluation blank | [Metaview Support](https://support.metaview.ai/greenhouse-browser-extension) | undated | 2026-11-10 | medium |
| [58] | LL144 scope per official FAQ | [NYC DCWP FAQ](https://www.nyc.gov/site/dca/businesses/faq-automated-employment-decision-tools.page) | undated | 2026-11-10 | high |
| [59] | AI Omnibus in force 27 Jul 2026; Annex III from 2 Dec 2027 | [European Commission](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force) | 2026-07 | 2026-11-10 | high |
| [60] | Sackett et al. 2022 validity figures (second secondary source) | [HumRRO](https://www.humrro.org/?p=5963) | undated | 2026-11-10 | medium |
| [61] | Gallup: 46% clearly know what's expected (year-end 2024) | [Fortune](https://fortune.com/2025/03/20/half-of-employees-feel-lost-at-work-layoffs/) | 2025-03 | 2026-11-10 | medium |
| [62] | Microsoft's stated reason for Viva Goals retirement | [Office 365 IT Pros](https://office365itpros.com/2024/12/09/viva-goals-retirement/) | 2024-12 | 2026-11-10 | medium |
| [63] | Council final approval of AI Omnibus (independent check for [59]) | [Council of the EU](https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/) | 2026-06 | 2026-11-10 | high |
| [64] | Culture Amp Develop add-on: career paths, competencies | [Culture Amp](https://cultureamp.com/platform/plans-and-pricing) | undated | 2026-11-10 | low |

## Staleness map

Computed with `recon_kit.py staleness`, using windows feature = 6 months, behaviour = 24 months, regulatory = 12 months (protocol §8.1b).

| Claim | Class | Pub. | Re-check by | Stale now? | Note |
|---|---|---|---|---|---|
| [1] Rovo readiness checker | feature | 2026-11 | 2027-05 | no | |
| [3] Marketplace DoR apps | feature | 2026-11 | 2027-05 | no | snippet only |
| [11] Lattice track templates | feature | 2026-09 | 2027-03 | no | |
| [16] Lattice cascading goals | feature | 2026-11 | 2027-05 | no | conflicts with [17] |
| [30] Swimm capabilities | feature | 2026-11 | 2027-05 | no | |
| [35] Greenhouse scorecards | feature | 2026-09 | 2027-03 | no | |
| [18] Viva Goals retirement | feature | 2025-08 | 2026-02 | yes | A historical fact, so it doesn't decay; the *reason* is still unresolved |
| [9] Gallup expectations | behaviour | 2015-09 | 2017-09 | yes | Persistent-pattern claim allowed with limitation; a recent independent source is needed |
| [25] Microsoft onboarding study | behaviour | 2021-03 | 2023-03 | yes | Persistent pattern; limitation: one company, pre-AI-assistant era |
| [37] Structured interview validity | behaviour | 2022 | 2024-01 | yes | Meta-analytic finding; stable, but read via summary only |
| [38] NYC LL144 | regulatory | 2023-06 | 2024-06 | yes | **Re-check the current official text in Pass 2** |
| [39] EU AI Act Annex III | regulatory | 2024-07 | 2025-07 | yes | **Unofficial mirror; check EUR-Lex and any 2025–26 amendments in Pass 2** |

Earliest re-check date: 2017-09 ([9]). Six claims are past their window. The regulatory items matter most.

**Ledger:** 17 load-bearing claims tracked: 1 verified ([1], existence only), 16 unverified (single source). Counted with `recon_kit.py tally`.
