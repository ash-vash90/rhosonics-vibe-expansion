# Competitor research → Rhosonics enhancements

I deep-researched FLSmidth, Metso, and Vaisala. Below is what each does well, mapped against your brand constraints (no chamfers, no glass, 4px rounded, HSL tokens, alternating section rhythm, industrial precision, evidence over claims). Then a concrete adoption plan.

## What each site does best

**FLSmidth** — Emotional cinematic heroes, organic "wave" section dividers, ROI-first impact bars on case studies, "Fact File" metadata tables (Commodity/Tech/Application), brand-anchored logo block, blue+cyan two-tier accent system.

**Metso** — Massive typographic heroes, three-mode section rhythm (Data / Power / Action), sticky contextual sub-nav on long pages, hyper-real 3D product renders with ghosted cutaways, single high-contrast color reserved for sustainability (Metso Plus green), hover hotspots on equipment.

**Vaisala** — Closest peer. Macro-photography that treats sensors as jewelry, "Impact" heroes (show the *result* of measurement, not the factory), standardized Challenge/Solution/Impact case framework, dramatic type hierarchy (72pt+ heroes, 16pt body), search-first nav for deep catalogs, atmospheric isometric process diagrams.

## What to ADOPT (fits Rhosonics)

1. **Impact-Bar case study headers (FLS)** — Move ROI numbers (% solids accuracy, $ saved, hours reclaimed) to the top of every case study in a high-contrast obsidian or eco-surface band. Already partially in `StatCallout` — extend into a dedicated case-study header pattern.
2. **Fact File metadata table (FLS)** — Standardized 4-cell strip on every case/application page: Industry · Medium · Technology · Site. JetBrains Mono, all-caps. Reinforces "evidence over claims."
3. **Three-mode section rhythm (Metso)** — Maps cleanly onto your existing six variants. Formalize Data (default/tinted) / Power (dark) / Action (split/full-bleed) as a documented rotation rule in the brand system page.
4. **Sticky contextual sub-nav (Metso)** — On long pages (Applications, About, Visual System) add a secondary horizontal sticky bar with section anchors. Helps the dense brand system feel navigable.
5. **Sustainability color-coding (Metso)** — You already have `eco-surface`. Tighten the rule: eco-surface appears *only* on sustainability/SDM-Eco content. Audit pages and remove any decorative use.
6. **Macro product photography treatment (Vaisala)** — New imagery grade: extreme close-up of SDM sensor housing, brushed metal, droplet on probe. Treated as "instrument-as-jewelry." Use in `ProductPreviewCard` heroes.
7. **Impact hero (Vaisala)** — On Applications and case study pages, lead with the *outcome* (clean tailings discharge, accurate density readout, recovered concentrate) rather than the device. The device appears second.
8. **Challenge / Solution / Evidence triad (Vaisala)** — Standardize all case studies on this 3-part structure. Aligns with the existing 10-section case study spec — collapse to this triad at the summary level.
9. **Dramatic type hierarchy (Vaisala)** — Audit hero scales. Push H1 to clamp(3rem, 6vw, 5.5rem) on hero, keep body at 16-18px. Currently some hero sections under-scale.
10. **Search-first navigation (Vaisala)** — Add a `/` keyboard shortcut + command-palette style search across the brand system (sections, tokens, components). High utility for a 100+ section system.

## What to REJECT

- **FLS organic wave dividers** — Conflicts with industrial precision principle. Your sharp horizontal-line dividers (`section-divider-technical-spec`) are correct. Do not adopt curves.
- **Metso chamfered/beveled corners** — Already banned in `removed-sections-log-v2`. Keep 4px rounded.
- **Metso full-bleed black "Power Mode" without restraint** — Your dark variant exists; don't over-use. Adjacent-variant rule already prevents this.
- **FLS blue-square logo anchor** — Your logo identity (135% ratio, 3-element wave) is already distinctive; don't add a container.
- **Vaisala coral + lime-yellow dual accents** — Conflicts with single-green accent rule. Keep `rho-green` as the only action color.

## Implementation phases (separate later requests)

**Phase 1 — Patterns (highest ROI, lowest risk)**
- `ImpactBar` component (case-study header with 3-4 ROI stats, obsidian or eco surface, JetBrains Mono numerals)
- `FactFile` component (4-cell metadata strip, mono caps)
- Document Data/Power/Action rotation in `SectionRhythmGuide`

**Phase 2 — Navigation & wayfinding**
- `StickySubNav` for long pages (Applications, About, VisualSystem)
- Command-palette search (`/` shortcut) over brand system anchors

**Phase 3 — Imagery & storytelling**
- Macro-photography treatment spec (new entry in `imagery-system-spec`)
- `CaseStudyTriad` summary component (Challenge / Solution / Evidence)
- Impact-first hero pattern documented in `PageBanner` variants

**Phase 4 — Type scale audit**
- Push hero H1 scale on home + landing pages
- Verify body stays 16-18px throughout

## Technical notes

- All new components live under `src/components/brand/` and reuse existing tokens (`rho-obsidian`, `eco-surface`, `slate-100`, `rho-green`).
- New surface variants extend `SectionVariants.tsx` only if a current variant cannot express the pattern.
- ImpactBar and FactFile are pure presentational — no business logic.
- Sticky sub-nav uses `IntersectionObserver` for active-section state (no scroll listeners).
- Macro imagery is a sourcing/spec change, not a code change — added to imagery memory.

---

Want me to start with Phase 1 (ImpactBar + FactFile + rhythm doc), or pick specific items from any phase?
