---
name: 'Requirements Interpretation Alignment (working title)'
description: 'Calm, precise light-mode workplace UI for comparing three independent interpretations of a user story.'
status: final
created: '2026-11-10'
updated: '2026-11-10'
sources:
  - planning-artifacts/prds/prd-bmad-masterclass-2026-11-10/prd.md
  - planning-artifacts/briefs/brief-bmad-masterclass-2026-11-10-k1/brief.md
colors:
  canvas: '#F4F6F7'
  surface: '#FFFFFF'
  surface-subtle: '#F7F9FA'
  border: '#D5DBDF'
  border-strong: '#7A858D'
  text: '#1C2328'
  text-muted: '#4D5861'
  accent: '#0B6B57'
  accent-hover: '#09584A'
  accent-subtle: '#E6F2EF'
  on-accent: '#FFFFFF'
  attention: '#8A4B0F'
  attention-subtle: '#FBEFE3'
  error: '#A61B1B'
  demo: '#5C4400'
  demo-subtle: '#FFF4D6'
  focus: '#1D4ED8'
  scrim: '#1C2328'
typography:
  family-ui:
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  page-title:
    fontSize: '24px'
    fontWeight: 600
    lineHeight: '32px'
  section-title:
    fontSize: '18px'
    fontWeight: 600
    lineHeight: '26px'
  question:
    fontSize: '16px'
    fontWeight: 600
    lineHeight: '24px'
  body:
    fontSize: '15px'
    fontWeight: 400
    lineHeight: '24px'
  answer:
    fontSize: '15px'
    fontWeight: 400
    lineHeight: '24px'
  label:
    fontSize: '13px'
    fontWeight: 600
    lineHeight: '18px'
  meta:
    fontSize: '13px'
    fontWeight: 400
    lineHeight: '18px'
rounded:
  sm: '4px'
  md: '8px'
  lg: '10px'
  full: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
  reading-measure: '68ch'
  panel-min: '600px'
  panel-max: '760px'
  column-min: '200px'
components:
  button-primary:
    background: '{colors.accent}'
    text: '{colors.on-accent}'
    hover: '{colors.accent-hover}'
    radius: '{rounded.sm}'
    paddingY: '{spacing.2}'
    paddingX: '{spacing.4}'
    type: '{typography.label}'
  button-secondary:
    background: '{colors.surface}'
    text: '{colors.text}'
    border: '{colors.border-strong}'
    radius: '{rounded.sm}'
  question-card:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.lg}'
    padding: '{spacing.5}'
  state-label:
    text: '{colors.text-muted}'
    type: '{typography.label}'
  answer-block:
    background: '{colors.surface-subtle}'
    border: '{colors.border}'
    radius: '{rounded.md}'
    padding: '{spacing.3}'
    type: '{typography.answer}'
  answer-not-submitted:
    background: '{colors.surface}'
    border: '{colors.border-strong}'
    borderStyle: 'dashed'
    text: '{colors.text-muted}'
  answer-cant-answer:
    background: '{colors.surface}'
    border: '{colors.border}'
    text: '{colors.text-muted}'
  status-pill:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.full}'
    type: '{typography.meta}'
  classification-aligned:
    background: '{colors.accent-subtle}'
    text: '{colors.accent}'
    radius: '{rounded.full}'
  classification-conflict:
    background: '{colors.attention-subtle}'
    text: '{colors.attention}'
    radius: '{rounded.full}'
  incomplete-flag:
    text: '{colors.attention}'
    type: '{typography.label}'
  review-panel:
    background: '{colors.surface}'
    border: '{colors.border}'
    widthMin: '{spacing.panel-min}'
    widthMax: '{spacing.panel-max}'
  dialog:
    background: '{colors.surface}'
    radius: '{rounded.lg}'
    scrim: '{colors.scrim}'
  demo-banner:
    background: '{colors.demo-subtle}'
    text: '{colors.demo}'
    type: '{typography.label}'
  focus-ring:
    color: '{colors.focus}'
    width: '2px'
    offset: '2px'
---

## Brand & Style

Reference mockups applying these tokens: [S3 workspace](mockups/mockup-a-s3-workspace.html) · [S3a review panel](mockups/mockup-b-s3a-review-panel.html). This spec wins on any conflict.


A calm, precise workplace tool that product managers, engineering managers and QA leads would trust with a real decision. It is a working product, not a document viewer or a developer console.

The foundation is a soft neutral canvas with white question cards and one restrained accent. From editorial design it borrows typographic discipline: clear hierarchy, generous line height and a comfortable reading measure for answers, because the core task is reading three interpretations side by side.

It has no decoration, gradients, gamification or dashboard furniture. **Light mode only** for the MVP.

## Colors

- **`{colors.canvas}` / `{colors.surface}`:** the workspace background and the cards and panels on it. Separation comes from borders (`{colors.border}`), not shadows.
- **`{colors.text}` / `{colors.text-muted}`:** primary text and secondary metadata. Both meet AA on surface and canvas.
- **`{colors.accent}`:** the only action colour (primary buttons, the selected classification, links). It is also the tint for the *Aligned* label. It is never used to mean "correct" or "approved".
- **`{colors.attention}`:** marks *Conflict* and the *Incomplete: no follow-up owner* flag. This is deliberately amber-brown, not red: a conflict is information to discuss, not an error.
- **`{colors.error}`:** only for form validation messages (for example, a missing required field).
- **`{colors.demo}` / `{colors.demo-subtle}`:** used only in the demo banner and role switcher. Never seen in normal sessions.
- **`{colors.focus}`:** the focus ring, kept distinct from the accent so focus never looks like selection.
- **`{colors.border-strong}`:** dashed outlines for *Not submitted*, and secondary button borders. It meets 3:1 non-text contrast.

**Rule:** colour never carries meaning alone. Every state also has a text label and an icon or shape.

**Contrast (computed 2026-11-10 with the WCAG formula; design intent, not a conformance claim):**
- Text pairs are all ≥ 4.5:1: text/surface 15.9 · text-muted/surface 7.3 · on-accent/accent 6.5 · accent/accent-subtle 5.6 · attention/attention-subtle 6.0 · error/surface 7.5 · demo/demo-subtle 8.4.
- Focus/surface is 6.7. `{colors.border-strong}`/surface is 3.8, meeting the 3:1 non-text minimum.
- `{colors.border}` (1.4:1) is decorative only, for card edges. **Form inputs and any boundary needed to identify a control use `{colors.border-strong}`.**

## Typography

One family (`{typography.family-ui.fontFamily}`) for everything; hierarchy comes from size and weight, not from mixed typefaces.
- `{typography.page-title}`: story title.
- `{typography.section-title}`: panel and summary headings.
- `{typography.question}`: question text on cards and in the panel.
- `{typography.answer}`: answers; 24px line height, limited to `{spacing.reading-measure}` when stacked.
- `{typography.label}`: state, classification and perspective labels. Sentence case, not all caps.
- `{typography.meta}`: coverage lines, recorder lines, status pills.

## Layout & Spacing

- **Spacing:** a 4px scale (`{spacing.1}`–`{spacing.10}`). Cards use `{spacing.5}` padding; stacks of cards use `{spacing.4}` gaps.
- **Viewport:** the target desktop viewport is **1280 × 800**; the minimum supported width is **1024px**.
- **Workspace (S3):** a single centred column of question cards (max ≈ 760px) under the story header.
- **Review panel (S3a):** opens as a right-side panel about 60% of the viewport wide, clamped to `{spacing.panel-min}`–`{spacing.panel-max}` (760px at 1280). The card list narrows but stays visible. **Below 1100 CSS px viewport** (including high zoom), the panel becomes a full-width overlay.
- **Comparison layout:** three answer columns (Product · Development · QA) **only when each column can be at least `{spacing.column-min}` wide inside the panel after padding and gaps** (panel inner width ≥ 680px), so there is never horizontal scrolling. Below that, answers **stack** vertically, each headed by its perspective, at the reading measure.
- **Decision summary (S4):** a single reading column at the reading measure.

## Elevation & Depth

Flat by default: cards and pills use borders only. Two raised layers exist:
- the **review panel**, with a subtle left shadow;
- the **dialog**, with a stronger shadow over a scrim at ~40% opacity of `{colors.scrim}`.

## Shapes

- `{rounded.lg}`: cards and dialogs.
- `{rounded.md}`: answer blocks.
- `{rounded.sm}`: buttons and inputs.
- `{rounded.full}`: status pills and classification labels only.

Rounded enough to feel calm; never bubbly.

## Components

- **Question card:** state label + icon at the top ("Hidden" with a closed-eye icon · "Revealed · Locked" with a lock icon), then the question text, the status row (Hidden) or the answers + coverage line (Revealed), then the classification and resolution summary, then actions. When one person holds both roles, the card shows two visually separated zones: **"Your answer, as Product"** on `{colors.surface-subtle}`, and **"Facilitator"** with a divider and its own heading.
- **Status pill (pre-reveal):** perspective name + "Submitted" (check icon) or "Not submitted" (dash icon). No other variants exist before reveal.
- **Answer block:**
  - *substantive*: text in full;
  - *Can't answer*: a "Can't answer" label + icon, with the optional reason in muted text;
  - *Not submitted*: a dashed outline, the "Not submitted" label, and no fill.
- **Classification label:** *Aligned* (check icon, accent tint) · *Conflict* (diamond icon, attention tint) · *Unanswered* (question icon, neutral) · *Not yet reviewed* (neutral outline). Coverage is always shown beside it.
- **Resolved record:** the "Resolved (final)" label with a lock icon, then the resolution statement, then two meta lines: "Decision owner (as reported): …" and "Recorded by: … (facilitator)".
- **Incomplete flag:** a ⚠ icon + "Incomplete: no follow-up owner" in `{colors.attention}`.
- **Buttons:** primary (one per context), secondary, and text-style. The irreversible actions (*Reveal*, *Record final resolution*) are primary buttons inside their confirmation dialogs, never one-click on the card.
- **Demo banner:** a full-width strip above the app header, always visible in the demo: "Fictional demo · all people, companies and data are invented", plus the role switcher and *Reset demo*.

## Do's and Don'ts

- **Do** pair every colour state with text and an icon.
- **Do** keep full answers visible in comparison, with no truncation.
- **Do** label partial coverage in words.
- **Don't** use green or check marks to suggest correctness or approval.
- **Don't** use red for Conflict.
- **Don't** add dashboards, charts, gradients, illustrations or decorative badges.
- **Don't** use all-caps labels or monospace styling.
- **Don't** show the demo banner, demo colours or the role switcher outside the demo environment.
