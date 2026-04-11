

# Plan: Inject 2026 Web Design Trends into Brand Guidelines

## Context

The video "Steal These 2026 Web Design Trends" by Chris Misterek (Self-Made Web Designer) covers 9 trends. I'll integrate the relevant ones into the existing brand guidelines — not as a separate trends page, but woven into the sections where they naturally belong.

## Relevant Trends & Where They Land

| # | Trend | Rhosonics Relevance | Target Section |
|---|-------|---------------------|----------------|
| 1 | Performance-First Design | Core to industrial HMI/field devices | **Design Process** (DesignProcess.tsx) — add as 5th principle |
| 2 | Bento Grid Layouts | Already used in Applications/Interface Kit | **Visual System** (VisualSystemOverview.tsx) — document as approved layout pattern |
| 3 | Glassmorphism Done Right | **Anti-pattern** for Rhosonics (legibility in high-glare) | **Design Process** — add to "Don't" callout |
| 4 | CSS Scroll-Driven Animations | Already using GSAP scroll triggers | **Motion Design** (MotionDesign.tsx) — add note about CSS-native progressive enhancement |
| 5 | AI-Generated Layouts | Not directly relevant to brand guidelines | Skip |
| 6 | Organic Shapes & Soft Gradients | Relevant — soft gradients already used, organic shapes need guardrails | **Visual System** — add gradient/shape guidance |
| 7 | Unified Platform Design | Relevant to SDM ECO interface philosophy | **Applications** — add principle to InterfaceKit or SDMEcoInterface |
| 8 | Dark Mode as First-Class | Already implemented but under-documented | **Color** page or **Visual System** — document dark mode as a design requirement, not afterthought |
| 9 | Motion Narrative (Scroll as Storytelling) | Core to brand site's own scroll-reveal approach | **Motion Design** — add scroll narrative principle with dos/don'ts |

## Implementation Details

### 1. DesignProcess.tsx — Add "Performance-First Design" principle
- Add a 5th principle card: icon `Gauge`, title "Performance Before Polish", description about designing with asset weight and load time in mind from the start
- Add a "Don't" callout explicitly calling out glassmorphism/frosted glass as an anti-pattern (legibility in sunlight, HMI performance)

### 2. VisualSystemOverview.tsx — Document layout patterns and gradient guidance
- Add a "Layout Patterns" subsection documenting bento grids as an approved modular layout approach
- Add "Gradient & Shape Language" guidance: soft gradients yes, organic blob shapes no (conflicts with "Engineered, not styled" principle) — keep shapes geometric/angular

### 3. MotionDesign.tsx — Scroll narrative + CSS-native note
- Add a "Scroll as Narrative" section: document the principle of progressive content reveal (Problem → Solution → Proof → Action)
- Add a technical note encouraging CSS `scroll-driven-animations` as a progressive enhancement layer alongside GSAP

### 4. Dark mode documentation
- Add a subsection to the Color page or Visual System noting dark mode is a first-class design decision, not a bolt-on — document the `prefers-color-scheme` approach and that all components must maintain hierarchy in both modes

### 5. agents.md — Update governance doc
- Add a "2026 Design Trends Integration" section summarizing the adopted trends and explicitly noting glassmorphism as a forbidden pattern
- Add performance-first as a design process step

## Files Modified
- `src/components/brand/DesignProcess.tsx` — add performance principle + glassmorphism anti-pattern
- `src/components/brand/VisualSystemOverview.tsx` — add layout patterns + gradient guidance
- `src/components/brand/MotionDesign.tsx` — add scroll narrative section
- `src/pages/brand/ColorPage.tsx` or `src/components/brand/ColorMatrix.tsx` — add dark mode documentation
- `agents.md` — update governance with new rules

