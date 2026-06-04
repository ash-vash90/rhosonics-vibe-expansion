# Customer.io-Inspired System Patterns

A reusable layer of primitives — not a re-skin — so any page can adopt the rhythm without us touching every component. All work stays inside existing brand guardrails (4px scale, brand-restricted palette, Primetime/Instrument Sans, no chamfers everywhere, evidence voice).

## What we keep from us
- Primetime + Instrument Sans + JetBrains Mono. No serif display.
- Obsidian / Slate / Rho Green palette only (brand-restricted icon set).
- Industrial precision, 4px rounded corners, no pill buttons, no glass.
- "Evidence over claims" voice — no marketing softness on copy.

## What we take from Customer.io
1. **Big, calm display headlines** with generous whitespace above the fold and at section boundaries (we already do this in hero; extend to section openers).
2. **Section rhythm variation** — every section visually contrasts the previous one.
3. **Custom multicoloured-but-restricted icon family** for solutions/capabilities.
4. **Eco-tinted product-preview cards** that frame an HMI/UI mockup inside a soft surface.
5. **Big stat callouts** for proof (percentage + label pattern).
6. **Marquee proof strip** (logos already on most pages — formalize the pattern).
7. **Pinned visual side, scrolling copy side** for capability deep-dives.

---

## Deliverables

### 1. Section rhythm primitives — `src/components/brand/sections/`
Standardize the variants `ScrollSection` already hints at, expand to six. Each is a thin wrapper enforcing background, padding rhythm, and edge bleed.

- `SectionDefault` — white, standard density
- `SectionTinted` — `slate-50` surface (exists)
- `SectionEco` — `eco-surface` light green band
- `SectionDark` — obsidian (exists)
- `SectionSplit` — 60/40 asymmetric two-column with optional sticky-left
- `SectionFullBleedMock` — full-width product image / HMI on tinted surface

Authoring rule: pages compose by alternating variants. We add a lint-style helper `assertSectionRhythm()` in dev only that warns if two adjacent sections share the same variant.

### 2. Brand-restricted icon family — `src/components/brand/icons/SolutionIcon.tsx`
Customer.io uses chunky illustrative SVG glyphs sitting on a soft background. We do the same with our palette:
- 96×96 SVG, 4px-grid geometry, 2px strokes
- Two-tone fill: Obsidian outline + Rho Green or Mineral Bronze accent surface
- Sit on a 4px-rounded `slate-100` or `eco-surface` tile, no border
- Eight starter glyphs covering our existing solution categories (Density, Concentration, Calibration, Sustainability, Massflow, Integration, Telemetry, Compliance)

Authoring helper `<SolutionIcon name="density" accent="green" />` so any page can drop one in.

### 3. Product-preview card — `src/components/brand/ProductPreviewCard.tsx`
The customer.io "screenshot framed in a soft tinted band" pattern, rebuilt for our HMI mocks:
- `eco-surface` or `slate-100` background
- HMI rendered inside at 4px corner radius with a subtle elevated shadow (Elevation L3)
- Optional dotted-line annotation overlay (we have terrain-grain assets we can reuse)
- Caption slot below using JetBrains Mono label

### 4. Stat callout — `src/components/brand/StatCallout.tsx`
For case-study + applications proof:
- Massive JetBrains Mono number (display-lg), all-caps
- Single short label below in Instrument Sans
- Optional inline source citation (Voice principle: evidence)
- Composable row/grid; pair naturally with `ProductPreviewCard`

### 5. Pinned-visual capability section — `src/components/brand/PinnedCapability.tsx`
Customer.io's "Meet your AI Agent" three-headline pattern, our version:
- Sticky-positioned visual column (HMI mock or technical diagram)
- Right column: 3 stacked H3 + paragraph blocks revealed on scroll via existing `ScrollReveal`
- Used for capability deep-dives on Applications / Positioning

### 6. Marquee proof strip — `src/components/brand/ProofMarquee.tsx`
Formalize the logo/spec strip we already use ad hoc:
- Continuous CSS marquee, pauses on hover
- Optional "case study" badge per item linking out
- Greyscale logos that tint Rho Green on hover

### 7. Pages updated to demonstrate the rhythm
Light edits only — slot the new primitives in, don't redesign content:
- `HomePage.tsx` — show full rhythm (default → eco → split → dark → full-bleed → marquee)
- `ApplicationsPage.tsx` — adopt `SolutionIcon` + `StatCallout`
- `PositioningPage.tsx` — adopt `PinnedCapability`
- `AboutThisSystem.tsx` info/success/warning boxes — unchanged (recently styled)

### 8. Memory updates
- New: `mem://brand/section-rhythm-spec` — six variants + alternation rule
- New: `mem://brand/solution-icon-family-spec` — geometry, palette, accent rules
- New: `mem://brand/stat-callout-spec` — pattern + citation requirement
- Update: `mem://brand/visual-system-layout-patterns-spec` — add pinned-capability + product-preview patterns
- Update Core in `mem://index.md` — add "Section rhythm: alternate variants; never adjacent duplicates"

---

## Technical Notes

- All new components are presentational only — no backend touched.
- Icons authored as inline SVG in TS (tree-shakable, no asset pipeline change).
- Marquee uses CSS `@keyframes` (no GSAP needed) to keep main-thread idle.
- `PinnedCapability` uses CSS `position: sticky` first; falls back to existing `ScrollReveal` for the right column.
- Colors via existing HSL tokens only; no new palette entries.
- No new dependencies. No MagicUI imports — we own the primitives.

## Out of scope
- No font changes. No button shape changes. No new colour tokens.
- No copy rewrites (voice/tone stays).
- No backend, auth, or data work.

## Build order
1. Tokens/primitives (sections, marquee) — non-visual scaffold
2. `SolutionIcon` family + eight glyphs
3. `ProductPreviewCard` + `StatCallout`
4. `PinnedCapability`
5. Roll into `HomePage` to validate full rhythm
6. Selective roll into Applications / Positioning
7. Memory updates
