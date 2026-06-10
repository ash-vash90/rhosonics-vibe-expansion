## What Apple does, and why it works

Apple's HIG principles (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) share one structure:

- **One-word name** (a virtue, not a feature)
- **A bold imperative** ("Make something meaningful.")
- **One sentence of essence** — what it actually means
- **2–3 supporting clauses** — how to apply it in practice

They are *decision tools*, not style rules. They tell a designer what to weigh when two options compete. That's the bar.

## The translation rule

Rhosonics' foundation is not a generic product company — it's measurement. Vision and mission both point at one thing: **making the physical world legible, controllable, and lighter on the planet**. The five values (Expertise, Collaboration, Innovation, Quality, Sustainability) are *what we are*. The principles should be *what the work has to do* to prove it.

So each principle:
- maps to one canonical value (no orphans, no overlaps),
- carries the vision/mission's measurement-first worldview,
- gives a concrete test a designer/writer can apply at review time.

## The five principles

```text
01  PURPOSE         →  Expertise
    Measure what matters.
02  EVIDENCE        →  Quality
    Show the number, name the method.
03  PARTNERSHIP     →  Collaboration
    Solve it with them, not at them.
04  MECHANISM       →  Innovation
    Show what's novel. Don't claim it.
05  FOOTPRINT       →  Sustainability
    Quantify the saving.
```

Five, not eight. One per value. Apple can afford eight because they design for everyone; we design for senior engineers and operators, and a shorter list is sharper.

### 01 — Purpose · *Measure what matters.*
**Essence.** Every element exists to make something measurable, controllable, or optimizable. If it doesn't, cut it.
**Apply.**
- Lead with the measurement, not the marketing.
- Name the quantity (g/cm³, kg/h, %solids) before the brand.
- If a section can't answer "what does this help measure?", it doesn't ship.

### 02 — Evidence · *Show the number, name the method.*
**Essence.** Claims are cheap. Verified numbers, cited methods, and named engineers are not.
**Apply.**
- Every metric carries a source line (method, site, date).
- No round-number marketing claims (no "10× better", no "best-in-class").
- Prefer a graph with axes over an adjective.

### 03 — Partnership · *Solve it with them, not at them.*
**Essence.** Our work is co-authored with operators in the field. The brand should sound and look like that — never one-sided.
**Apply.**
- Speak with partners by name; quote them verbatim where possible.
- Case studies are joint stories, not testimonials.
- Replace "we deliver" with "we built this with…".

### 04 — Mechanism · *Show what's novel. Don't claim it.*
**Essence.** "Innovative" is the word people use when they can't explain the mechanism. Explain the mechanism.
**Apply.**
- Diagram the physics or the data path before naming the product.
- Banned words: *innovative*, *revolutionary*, *next-gen*, *cutting-edge*.
- If a feature is new, say what changed and why it matters.

### 05 — Footprint · *Quantify the saving.*
**Essence.** Sustainability is a number — kWh saved, m³ water avoided, kg of hazardous chemicals removed, nuclear sources retired. If we can't quantify it, we don't claim it.
**Apply.**
- Green saturation (the only saturated colour) is reserved for measured savings.
- Every eco claim cites the baseline it improves on.
- No vague green language ("eco-friendly", "greener future"). Numbers or silence.

## What goes on the page

`/position` becomes a 3-act chapter, no more footers stacked at the bottom:

1. **Foundation** (existing hero) — Vision + Mission, side by side.
2. **Values & Operating Rules** (existing) — the canonical five values, each paired with its operating rule.
3. **Design Principles** (NEW) — the five principles above, in a single sectioned list. Each row:
   - mono index (`01`–`05`)
   - the one-word principle name
   - the bold imperative ("Measure what matters.")
   - the essence sentence
   - 2–3 "Apply" bullets
   - a small tag showing which value it grounds in (e.g. `→ Expertise`)

Greyscale by default; green used only on the index numbers and the value tags, per the colour-for-emphasis rule. Standard 4px corners — these are content rows, not hero surfaces, so no chamfers.

## Technical notes

- New file: `src/components/brand/DesignPrinciples.tsx` — pure presentational, reads from a new `BRAND_PRINCIPLES` array.
- New export in `src/data/brand-values.ts`: `BRAND_PRINCIPLES`, typed, with `id`, `num`, `name`, `imperative`, `essence`, `apply: string[]`, `valueId` (FK to `BrandValue.id`).
- Wire into `src/pages/brand/PositioningPage.tsx` as a third lazy section under `ValueOperatingRules`. No extra footer, no extra cross-link block (the global `BrandLayout` footer is the only footer).
- A memory file (`mem://brand/design-principles-v3`) will be saved alongside the code so future work can't drift back to vague aesthetic principles. Updates the existing `design-principles-v2` reference in the index.

## Out of scope

- No changes to the values list, vision, or mission strings — those are canonical.
- No changes to other pages (`/voice`, `/proof`, etc.) in this pass. The principles will *eventually* be cited from those pages, but that's a follow-up once these five are approved.
- No new colours, fonts, or layout tokens.
