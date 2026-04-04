

# Split Single-Page Layout into Multi-Page Navigation

Currently all 11 sections live on one massive scrolling page. This plan splits them into separate routes while preserving the sidebar navigation, hero, and shared layout.

---

## Page Structure

Each nav section becomes its own route. Sections with sub-items stay grouped on one page (scroll anchors within that page).

| Route | Section(s) | Components |
|-------|-----------|------------|
| `/` | Hero + overview/landing | Hero only (or Hero + About) |
| `/about` | 00 — About, Design Process | AboutThisSystem, DesignProcess |
| `/positioning` | 01 — Brand Positioning | BrandPositioning |
| `/principles` | 02 — Brand Principles | BrandPrinciples |
| `/visual-system` | 03 — Visual System, Elevation | VisualSystemOverview, ElevationSystem |
| `/color` | 04 — Color Roles | ColorMatrix |
| `/typography` | 05 — Typography, Constraints, Spacing | TypographyScale, TypographyConstraints, SpacingSystem |
| `/logo-assets` | 06 — Logo & Assets, Icons | LogoAssets, IconGuidelines |
| `/voice` | 07 — Voice & Tone | VoiceTone |
| `/imagery` | 08 — Imagery, Motion | ImageryGuidelines, MotionDesign |
| `/applications` | 09 — Applications, SDM, Components, Empty States | IndustryApplications, SDMEcoInterface, EcoComponents, InterfaceKit, EmptyStates |
| `/proof` | 10 — Proof & Examples | TechComparison, CaseStudies |

---

## Implementation Steps

### 1. Create a shared layout component (`src/components/brand/BrandLayout.tsx`)
- Contains the hero (compact version on inner pages, full on `/`), Navigation sidebar, footer, FontSelector
- Uses `<Outlet />` from react-router-dom to render child page content
- The sidebar and top bar persist across all pages without remounting

### 2. Create individual page files (`src/pages/brand/`)
- One file per route (e.g., `AboutPage.tsx`, `PositioningPage.tsx`, etc.)
- Each page renders its section header(s) + lazy-loaded components with ErrorBoundary/Suspense
- Reuses existing `SectionHeader`, `ScrollSection`, `SectionDivider` components
- Sub-sections within a page use scroll anchors as they do today

### 3. Update routing (`src/App.tsx`)
- Add a parent route with `BrandLayout` as the element
- Nest all section routes under it
- Keep `/newsletter` and `*` (NotFound) as separate top-level routes

### 4. Update Navigation (`src/components/brand/Navigation.tsx`)
- Change from `scrollToSection(id)` to `navigate('/route#anchor')` using react-router
- Nav items link to routes instead of scroll targets
- Active state detection switches from IntersectionObserver to route matching (with scroll-spy still active within a page for sub-sections)
- Remove the GSAP scroll-trigger show/hide on desktop nav (it's always visible on inner pages)

### 5. Simplify `src/pages/Index.tsx`
- Becomes just the hero/landing page content
- Most section code moves to the individual page files
- Shared utilities (`SectionHeader`, `SectionDivider`, `SectionLoader`) extract to a shared file

---

## File Changes Summary

| Action | File |
|--------|------|
| Create | `src/components/brand/BrandLayout.tsx` — shared layout with nav + outlet |
| Create | `src/components/brand/SectionUtils.tsx` — SectionHeader, SectionDivider, SectionLoader |
| Create | `src/pages/brand/AboutPage.tsx` |
| Create | `src/pages/brand/PositioningPage.tsx` |
| Create | `src/pages/brand/PrinciplesPage.tsx` |
| Create | `src/pages/brand/VisualSystemPage.tsx` |
| Create | `src/pages/brand/ColorPage.tsx` |
| Create | `src/pages/brand/TypographyPage.tsx` |
| Create | `src/pages/brand/LogoAssetsPage.tsx` |
| Create | `src/pages/brand/VoicePage.tsx` |
| Create | `src/pages/brand/ImageryPage.tsx` |
| Create | `src/pages/brand/ApplicationsPage.tsx` |
| Create | `src/pages/brand/ProofPage.tsx` |
| Modify | `src/App.tsx` — nested routes under BrandLayout |
| Modify | `src/pages/Index.tsx` — strip to hero + landing only |
| Modify | `src/components/brand/Navigation.tsx` — route-based links + active state |

