

# Plan: Create Comprehensive AI Agent Brand Guidelines Document

## Overview

Create an `agents.md` file that provides super detailed guidance for AI agents to correctly implement the Rhosonics brand system. This document will serve as a single source of truth for any AI working on this codebase.

## Document Structure

The document will be organized into the following sections:

### 1. Brand Identity & Positioning
- Core brand promise: "Laboratory precision for industrial conditions"
- Target audience: Senior engineers who skip to specifications
- Four core values with their mappings (Partnership, Challenge, Expertise, Progress)
- Decision heuristic for brand choices

### 2. Typography System
**Critical rules:**
- **Unbounded**: Logo wordmark ONLY. Never for headings, body, or buttons
- **Instrument Sans**: Primary UI font (90% of text). Never in ALL-CAPS. Sentence case only
- **JetBrains Mono**: Data/metrics font. MUST be ALL-CAPS for labels and technical strings

**Type scale:**
- Display Hero: 48px
- Section Title: 36px  
- Card Title: 24px
- Body: 16px
- Caption: 14px
- Labels: 12px (JetBrains Mono, uppercase)

**Tailwind classes:**
- `font-logo` - Unbounded (logo only)
- `font-ui` - Instrument Sans
- `font-data` - JetBrains Mono

### 3. Color System

**Foundations (constant):**
- Slate scale (50-900): Software UI neutrals
- Obsidian (#111522): Hardware/dark UI surfaces

**Signals (intentional):**
- Primary Green (#33993C): Actions, CTAs, success
- Lime Accent (#73B82E): Gradients only, never standalone
- Warning Amber (HSL 38 92% 50%): Cautions
- Error Red (#DC2626): Failures
- Info: Use Slate-600, never blue

**Context (situational):**
- Mineral palette: Field environments only, never for UI
- Eco tints: Sustainability metrics only

**Critical rules:**
- Never use pure black (#000) - use Obsidian
- State colors communicate status only, never decoration
- Mineral colors never substitute for Slate
- Gradients add depth, never decoration

### 4. Logo Usage

**135% Rule:**
- Icon = Text size × 1.35 (always)
- Example: 24px text → 32px icon

**Constraints:**
- Never rotate, distort, or add effects
- Minimum size: 40px digital, 10mm print
- Clear space: Height of 'R' on all sides
- Approved variants only: gradient, white, obsidian

**Logo wordmark:**
- Use path-outlined SVG from `src/assets/brand/rhosonics-wordmark-paths.ts` for exports
- Tracking: 0.025em (`tracking-wide`)

### 5. Spacing System

**Base unit: 4px increments**
- 4px (1): Tight inline spacing
- 8px (2): Icon gaps, button padding
- 16px (4): Standard padding
- 24px (6): Card padding
- 32px (8): Large component spacing
- 64px (16): Section breaks

**Grid:** 12-column with 24px gutters

**Border radius:**
- sm: 2px
- md: 6px
- lg: 8px
- full: 50%

### 6. Icon System

**Principles:**
- Engineered, not illustrated
- If it needs explanation, it has failed
- Icons support text, never compete

**Sizes:**
- 16px: Button icons
- 20px: Navigation
- 24px: Feature icons
- 32px: Hero elements

**Stroke weight:** Always 2px

**Import from:** `@/lib/icons` (not directly from lucide-react)

### 7. Voice & Tone

**Four pillars:**
1. Direct: Lead with the point
2. Educational: Explain how and why
3. Evidence-Based: Show the data
4. Partnership-First: Long-term relationships

**Terminology replacements:**
- "Cutting-edge" → "Ultrasonic measurement"
- "Revolutionary" → "Proven"
- "Solution" → "System / Sensor"
- "Best-in-class" → [Cite specific metric]

### 8. Component Patterns

**Buttons:**
- Primary: `variant="default"`
- Industrial: `variant="obsidian"`, `variant="gradient"`
- Hero CTA: `variant="gradient" size="lg"`

**Metric Tiles:**
- Variants: obsidian, primary, outline, glass
- Always show units
- Use JetBrains Mono for values

**Callouts:**
- info: Guidance (slate)
- avoid: Warnings (amber)
- best: Recommendations (green)
- error: Critical issues (red)

**Badges:**
- JetBrains Mono, uppercase
- Short labels only
- Color indicates function

### 9. Motion Design

**Timing scale:**
- 200ms: Micro-interactions
- 300ms: Transitions
- 500ms: Emphasis

**Easing:**
- Linear: Data/mechanical
- Ease-out: UI/natural deceleration

**Signature animations:**
- Boot sequence: Wave propagation from bottom-right
- Value counters: Smooth numeric transitions

### 10. SDM Eco Interface (HMI)

**Display specs:**
- 800×480 resolution (5:3 aspect ratio)
- 48px+ touch targets
- No thin text (medium/semibold only)

**Typography split:**
- Instrument Sans: UI labels (sentence case)
- JetBrains Mono: Data values (ALL-CAPS)

### 11. Imagery Guidelines

**Two styles:**
- Real & Gritty: Field photography showing wear and scale
- Abstract & Precise: Technical visualization with brand accents

**Treatment process:**
1. Desaturate
2. Cool shift
3. Increase contrast
4. Add green accent

**Prohibited:** Generic stock imagery, AI-generated people

### 12. Critical Constraints (Never Do List)

- Never use Space Grotesk font
- Never use Unbounded for anything except logo wordmark
- Never use pure black (#000)
- Never use Lime Accent as standalone color
- Never add shadows/glows to logo
- Never use gradients on body text
- Never use ALL-CAPS for Instrument Sans
- Never use sentence case for JetBrains Mono labels
- Never substitute Mineral for Slate in UI

## File Location

`agents.md` in the project root directory

## Technical Details

- Markdown format for easy reading
- Code examples with proper Tailwind classes
- Reference to actual source files
- Clear hierarchy with headers and lists
- Practical examples for each rule

