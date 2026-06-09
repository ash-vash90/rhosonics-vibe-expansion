# Phase 1 — ImpactBar, FactFile, Rhythm Doc

Three deliverables, all in `src/components/brand/`, reusing existing tokens. No new section variants, no new colors.

## 1. `ImpactBar` component

**File:** `src/components/brand/ImpactBar.tsx`

Case-study header strip. 3–4 ROI stats in a single horizontal band, JetBrains Mono numerals, Instrument Sans labels. Two surfaces only: `obsidian` (dark) or `eco` (sustainability outcomes).

```text
┌────────────────────────────────────────────────────────────────┐
│  ±0.05%        18 MO         12,400 hrs       2.3 GWh/yr       │
│  SOLIDS ACC    PAYBACK       RECLAIMED        ENERGY SAVED     │
│  src · plant   src · finance src · ops        src · sustain    │
└────────────────────────────────────────────────────────────────┘
```

Props: `surface: "obsidian" | "eco"`, `stats: { value, label, source? }[]` (3–4), optional `eyebrow`.

Composition: a thin wrapper over `StatCallout` rendered inside a full-bleed band. Source citation is mandatory per `stat-callout-spec` — types enforce it as optional but lint-warn at runtime in dev if missing.

## 2. `FactFile` component

**File:** `src/components/brand/FactFile.tsx`

Standardized 4-cell metadata strip for case/application pages. Mono caps, separated by hairline dividers (no borders — separation via background per `separation-principle`). Sits directly under page hero, above ImpactBar.

```text
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ INDUSTRY    │ MEDIUM      │ TECHNOLOGY  │ SITE        │
│ Mining      │ Cu Tailings │ SDM-Eco     │ Chile, 2024 │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

Props: `items: { label, value }[]` (typically 4). Renders as `dl` for semantics. Responsive: 4 cols desktop → 2 cols tablet → 2 cols mobile (never stack to 1 — preserves "fact file" density).

## 3. Section rhythm documentation

**File:** edit `src/components/brand/PatternsShowcase.tsx` (or wherever the rhythm guide lives — to be confirmed during build) to add a new sub-section formalizing the **Data / Power / Action** rotation:

- **Data mode** = `default` + `tinted` + `eco` (calm, evidence-dense)
- **Power mode** = `dark` (statement, sparing use)
- **Action mode** = `split` + `fullBleedMock` (interactive/product)

Rule: never two consecutive sections from the same mode. Existing `assertSectionRhythm` already prevents same-*variant* adjacency; this layer adds the higher-order mode grouping.

## Out of scope (later phases)

- StickySubNav, command-palette search → Phase 2
- Macro photography spec, CaseStudyTriad, impact-first hero → Phase 3
- Hero type-scale audit → Phase 4

## Technical notes

- Both components are pure presentational, no business logic, no new tokens.
- ImpactBar uses existing `bg-rho-obsidian` / `bg-[hsl(var(--eco-surface))]`, full-bleed via the same `-mx-... px-...` pattern from `SectionVariants`.
- FactFile uses `slate-100` cell backgrounds with `gap-px` on a slate-200 grid container to fake hairlines without borders.
- No edits to `SectionVariants.tsx` — current six variants cover the need.
- Components ship unused; they'll be wired into pages in follow-up requests so this phase stays reviewable in isolation.
