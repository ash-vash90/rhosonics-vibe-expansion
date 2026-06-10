# Phase 3 Plan — Re-root on the Finalized Brand Foundation

The current system carries four old values ("Partnership / Challenge / Expertise / Progress") and a half-defined mission. The uploaded document is now canonical and supersedes both. Everything downstream — copy, structure, type, colour, chrome — gets re-aligned to it. This phase is structural and editorial, not a visual reskin.

## 1. New canonical foundation (single source of truth)

Replace `src/data/brand-values.ts` with:

**Vision** — Leading the way in what can be measured, controlled, and optimized.
**Mission** — Advanced measurement solutions for more efficient, automated, and sustainable operations.

**External values (5, in this order):**
1. Expertise — deep science + field experience, translated into accessible solutions.
2. Collaboration — work with customers to resolve unique measurement, process and control challenges.
3. Innovation — novel solutions; continuous improvement of products and processes.
4. Quality — verified at every stage, from design to on-site measurement.
5. Sustainability — reduce environmental impact: efficiency, lower energy, fewer hazardous chemicals.

Internal value statements are kept in the same file but flagged `internal: true` and never rendered on public pages.

Every existing mapping (`VOICE_VALUE_MAPPING`, `PRINCIPLE_VALUE_MAPPING`, `VISUAL_LAYER_VALUE_MAPPING`, `COLOR_VALUE_MAPPING`, `IMAGERY_VALUE_MAPPING`, `INDUSTRY_VALUE_MAPPING`) is rewritten against the new 5-value set. `ValueBadge` and any consumer keeps working because the API stays the same.

## 2. Memory updates

Update `mem://index.md` Core block and the relevant detail files so the new rules survive future sessions:

- Replace the 4-value system with the 5-value system; archive `core-values-system-v5`.
- Update `industrial-precision-aesthetic`, `color-system-governance`, `voice-tone-spec`, `design-principles` to reference the new values verbatim.
- Flip the chamfer rule: **chamfers permitted on large elements only** (hero panels, full-bleed cards, page banners, large CTAs). Forbidden on body cards, buttons under a defined size, inline chips, form controls. Add a precise size threshold (proposed: min 320px on shortest side).
- Tighten colour rule: **colour is for emphasis only; the page must remain legible in greyscale.** Green is reserved for measurement, affordance, and Sustainability surfaces.
- Tighten eyebrow rule: `TelemetryEyebrow` permitted only on the homepage directory and the Tools appendix. Remove it everywhere else; `PageBanner` number is the section marker.
- Add: "Every element deliberately planned — if a component has no job, delete it."

## 3. Content rewrite, chapter by chapter

Each chapter's opening copy and any value/mission references are rewritten against the new foundation. This is the bulk of the work.

- **01 Brand Position** — collapse `MissionVision`, `OriginStory`, `BrandEthos`, and `BrandPositioning` into a single linear narrative: Vision → Mission → 5 Values → Who we serve → What we refuse. Delete the "Senior Engineer / Lab in the Field" persona block; it was design-team language, not brand language. Delete the inline stat strip ("40+ Years…") unless verifiable — move verified numbers to Proof.
- **02 Voice & Tone** — re-anchor the four voice pillars to the new values (Expertise→Direct/Educational, Collaboration→Partnership, Innovation→Evidence, Quality+Sustainability→Evidence). Refresh `LexiconTable` and `RewriteTable` with phrasing pulled from the new statements ("translate field insight", "verify at every stage", "reduce environmental impact").
- **03 Logo, 04 Colour, 05 Typography, 06 Iconography** — re-justify each rule against the new values in one short line per chapter. No new content, just re-rooting.
- **07 Imagery** — image budget categories renamed to mirror the values: Expertise (instrument/macro), Collaboration (people + site), Innovation (R&D, prototypes), Quality (verification, calibration), Sustainability (eco context). Ratios adjusted accordingly.
- **08 Data Viz** — frame as the visible evidence of Quality and Sustainability. No new charts; just a one-paragraph chapter intro and one worked example.
- **09 Applications & Proof** — every case study and proof point gets tagged with the value(s) it demonstrates. `SustainabilityAggregate` keeps its place. `LogoWallProof` stays. Cull anything decorative.
- **10 Resources** — unchanged structurally; copy refreshed.
- **Tools appendix** — unchanged in scope.

## 4. Structural / component cuts and demotions

Driven by "every element deliberately planned":

- **Delete** `BrandEthos.tsx` (persona + aesthetic blocks are internal language).
- **Delete** the values-bridge and stat strip inside `MissionVision.tsx`; replace with a single new `Foundation.tsx` component holding Vision, Mission, and the 5 values in one deliberate composition.
- **Demote** `TelemetryEyebrow`, `DataWatermark`, `CornerBrackets` to the surfaces named in §2. Remove from all chapter shells. `TelemetryFooter` stays (it carries governance metadata).
- **Audit and remove** every section currently using a chamfer on a small element; re-style those to the standard 4px rounded corner. Re-introduce chamfers on the page banner and on the new `Foundation.tsx` hero panel.
- **Audit eyebrows** across all `/src/pages/brand/*` and `/src/components/brand/*`; delete any `font-data uppercase tracking` row that is not a `PageBanner` number or a Tools-page meta row.

## 5. Type and colour pass (rules only, not a reskin)

- **Dramatic typography** — define a single "Statement" type role at hero scale (proposed: 72–96px desktop, Instrument Sans, tight leading), used exactly once per chapter for the Vision, Mission, or chapter thesis. Codify in `hero-type-scale` memory.
- **Colour-for-emphasis test** — add a CI-style note in `color-visual-constraints`: every screen must pass a greyscale read-through. Green is the only saturated colour permitted on public pages and only for measurement values, affordances, and Sustainability surfaces.

## 6. Acceptance checks before Phase 4 (visual pass)

1. `brand-values.ts` exports exactly 5 external values + vision + mission, in the order above.
2. Every page references the new foundation verbatim where it appears.
3. No `TelemetryEyebrow` outside HomePage and ToolsPage.
4. No chamfers on elements under the size threshold.
5. Greyscale screenshot of each chapter is still legible and hierarchical.
6. `BrandEthos`, the persona block, and the unverifiable stat strip no longer render anywhere.

## Technical section (for the implementer)

- `src/data/brand-values.ts`: rewrite `BRAND_VALUES`, keep the `BrandValue` interface, add `Vision` and `Mission` exports, add `internal` value list separately. Rebuild every `*_VALUE_MAPPING` const so consumers keep compiling.
- New file: `src/components/brand/Foundation.tsx` — one component for Vision + Mission + 5 values, used on `PositioningPage` and linked from `HomePage`.
- `MissionVision.tsx`, `BrandEthos.tsx`: delete after migrating any salvageable copy into `Foundation.tsx` or Proof.
- `PositioningPage.tsx`: swap `MissionVision` + `OriginStory` blocks for `<Foundation />` + a trimmed origin paragraph.
- Sweep with `rg "TelemetryEyebrow|CornerBrackets|DataWatermark|clip-chamfer"` and remove or re-scope each hit per §2 and §4.
- Tailwind: add a `chamfer-lg` utility threshold guard in comments; no token changes needed.
- Memory writes: update `mem://index.md`, add `mem://brand/foundation-spec-v1`, update `mem://brand/core-values-system-v5` → `v6` (5 values), update chamfer + eyebrow + colour memos.

## Open questions before I implement

1. **Value ordering** — is Expertise → Collaboration → Innovation → Quality → Sustainability the order you want everywhere, or should Sustainability lead on eco-facing surfaces?
2. **Internal vs external values** — confirm internal statements are never shown on the public brand site (only referenced in an internal appendix or omitted entirely).
3. **Persona / "Lab in the Field"** — confirm I can delete these as design-team artefacts.
4. **Chamfer threshold** — is 320px on the shortest side the right floor, or would you rather express it as "page banner, hero, full-bleed only" with no numeric rule?
