---
name: Design Principles v3
description: Five decision-tool principles derived from values and vision/mission, modelled on Apple HIG structure
type: design
---

# Brand Design Principles (v3 — canonical)

Five principles, one per canonical value. Derived from the canonical
Vision and Mission. Modelled on Apple's HIG: one-word name, bold
imperative, one-sentence essence, 2–3 review-time tests. Decision
tools, not style rules. Source of truth: `BRAND_PRINCIPLES` in
`src/data/brand-values.ts`. Rendered by
`src/components/brand/DesignPrinciples.tsx` on `/position`.

| # | Principle | Imperative | Value |
| - | --------- | ---------- | ----- |
| 01 | Purpose     | Measure what matters.            | Expertise |
| 02 | Evidence    | Show the number, name the method. | Quality |
| 03 | Partnership | Solve it with them, not at them.  | Collaboration |
| 04 | Mechanism   | Show what's novel. Don't claim it. | Innovation |
| 05 | Footprint   | Quantify the saving.             | Sustainability |

Rules:
- Never paraphrase the imperatives — they're verbatim brand surface.
- New value? Add the matching principle in the same migration.
- Supersedes v2's four "precision/expression/engineered/consistency"
  principles, which were aesthetic stand-ins and didn't ground in the
  canonical values. Do not reintroduce them.
