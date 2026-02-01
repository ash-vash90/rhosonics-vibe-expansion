# Rhosonics Brand System: AI Implementation Guide

> **Single source of truth for AI agents implementing the Rhosonics brand.**
> Read this document completely before making any design or code decisions.

---

## Quick Reference Card

| Element | Rule | Example |
|---------|------|---------|
| Logo font | Unbounded ONLY for wordmark | `font-logo tracking-wide` |
| UI text | Instrument Sans, sentence case | `font-ui` |
| Data/labels | JetBrains Mono, ALL-CAPS | `font-data uppercase` |
| Primary color | Use semantic tokens | `text-primary`, `bg-primary` |
| Black | Never #000, use Obsidian | `bg-rho-obsidian` |
| Icons | Import from `@/lib/icons` | `import { Activity } from "@/lib/icons"` |
| Logo ratio | Icon = Text × 1.35 | 24px text → 32px icon |

---

## 0. Design Process (Refactoring UI Principles)

Before implementing any design, internalize these process principles:

### Feature-First Development

Start with functionality, not layout. Design the actual feature before worrying about where it goes.

1. **Build the feature in isolation** — Design a dropdown menu, profile card, or metric tile without thinking about the page
2. **Let the design dictate layout** — Once complete, find the right place for it
3. **Avoid layout-first thinking** — "We need a sidebar" is backwards; "We need navigation" leads to better solutions

### Grayscale Validation Test

Before shipping any design, convert it to grayscale. If the hierarchy is unclear:
- Fix spacing and typography first
- Adjust font weights and sizes
- Add more white space between elements
- **Never rely on color to establish hierarchy**

```tsx
// Mentally convert to grayscale to test
// ❌ WRONG: Relies on color for hierarchy
<div className="text-primary text-lg">Primary item</div>
<div className="text-muted-foreground text-lg">Secondary item</div>

// ✅ CORRECT: Hierarchy works without color
<div className="text-foreground text-lg font-semibold">Primary item</div>
<div className="text-muted-foreground text-sm">Secondary item</div>
```

### Emphasize by De-emphasizing

The primary way to make something stand out is to make other things stand back.

| Goal | Approach |
|------|----------|
| Highlight a button | Reduce contrast of surrounding elements |
| Make a title prominent | Use smaller, lighter supporting text |
| Draw attention to a metric | Soften the label and background |

```tsx
// ❌ WRONG: Everything competing for attention
<div className="bg-primary p-4">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-lg font-semibold text-white">Description</p>
  <Button size="lg" variant="secondary">Action</Button>
</div>

// ✅ CORRECT: Hero element stands out, others recede
<div className="bg-card p-6">
  <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">CATEGORY</span>
  <h2 className="text-2xl font-semibold text-foreground mt-1">Title</h2>
  <p className="text-sm text-muted-foreground mt-2">Description with lower contrast</p>
  <Button className="mt-4" variant="default">Action</Button>
</div>
```

### Iterative Building Philosophy

**Be a pessimist when building. Be an optimist when polishing.**

1. **Ignore details early** — Get the structure right first
2. **Work in passes** — Layout → Content → Typography → Color → Polish
3. **Hold back until the end** — That shadow, that gradient, that animation? Save for last
4. **Don't polish a turd** — If the layout is wrong, no amount of polish will save it

### Labels as a Last Resort

Data should be self-explanatory before adding labels:

| ❌ Labeled | ✅ Self-Explanatory |
|-----------|-------------------|
| `Name: John Smith` | `John Smith` (in a name field context) |
| `Email: john@example.com` | `john@example.com` (format implies type) |
| `Phone: (555) 123-4567` | `(555) 123-4567` (format implies type) |
| `Price: $24.95` | `$24.95` (currency symbol implies type) |

When labels are necessary, make them secondary:

```tsx
// ❌ Labels competing with values
<div className="flex gap-2">
  <span className="font-semibold">Density:</span>
  <span className="font-semibold">1.54 g/mL</span>
</div>

// ✅ Labels recede, values dominate
<div className="flex flex-col">
  <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">DENSITY</span>
  <span className="font-data text-2xl text-foreground">1.54 G/ML</span>
</div>
```

---

## 1. Brand Identity & Positioning

### Core Promise
**"Laboratory precision for industrial conditions"**

This is not a tagline—it's a design constraint. Every decision must deliver:
- **Precision**: Accurate, reliable, measurable
- **Industrial**: Durable, practical, real-world tested

### Target Audience
Senior engineers and technical decision-makers who:
- Skip marketing copy, go straight to specifications
- Value evidence over claims
- Make purchasing decisions based on ROI and reliability
- Work in harsh industrial environments (mining, dredging, wastewater)

### Four Core Values

These values anchor ALL brand decisions. Reference them when uncertain.

| # | Value | Icon | Meaning | Design Implication |
|---|-------|------|---------|-------------------|
| 01 | **Built on Partnership** | `Users` | Trust, collaboration, long-term | Consistent patterns, stable interfaces |
| 02 | **Engineered for Challenge** | `Wrench` | Resilience, practical solutions | Robust components, clear hierarchy |
| 03 | **Expertise in Practice** | `BookOpen` | Knowledge, clarity, education | Readable typography, helpful callouts |
| 04 | **Progress That Matters** | `TrendingUp` | Measurable impact, sustainability | Data visualization, metric prominence |

**Source file:** `src/data/brand-values.ts`

### Decision Heuristic

When facing a design choice, ask:
1. Does this add clarity or noise?
2. Would an engineer trust this?
3. Does this work in harsh conditions (low bandwidth, sunlight, gloves)?
4. Is this measurable/provable?

If uncertain, choose the more restrained option.

---

## 2. Typography System

### Critical Rules

| Font | Purpose | Case | Weight | Tailwind |
|------|---------|------|--------|----------|
| **Unbounded** | Logo wordmark ONLY | Title | 500 | `font-logo` |
| **Instrument Sans** | All UI text (90%) | Sentence | 400-700 | `font-ui` |
| **JetBrains Mono** | Data, metrics, labels | ALL-CAPS | 500 | `font-data` |

### ⛔ Typography Violations

```tsx
// ❌ WRONG: Unbounded for heading
<h1 className="font-logo text-4xl">Welcome</h1>

// ❌ WRONG: Instrument Sans in all-caps
<span className="font-ui uppercase">STATUS</span>

// ❌ WRONG: JetBrains Mono in sentence case
<span className="font-data">Flow Rate</span>

// ✅ CORRECT: Each font in its role
<h1 className="font-ui text-4xl font-semibold">Welcome</h1>
<span className="font-data text-xs uppercase tracking-wider">STATUS</span>
```

### Type Scale

| Role | Size | Font | Class Example |
|------|------|------|---------------|
| Display Hero | 48px | Instrument Sans | `text-5xl font-ui font-bold` |
| Section Title | 36px | Instrument Sans | `text-4xl font-ui font-semibold` |
| Card Title | 24px | Instrument Sans | `text-2xl font-ui font-semibold` |
| Body | 16px | Instrument Sans | `text-base font-ui` |
| Caption | 14px | Instrument Sans | `text-sm font-ui text-muted-foreground` |
| Data Label | 12px | JetBrains Mono | `text-xs font-data uppercase tracking-wider` |
| Metric Value | 32px+ | JetBrains Mono | `text-3xl font-data uppercase` |

### Line Height (Proportional to Line Length)

Line height should increase with line length for optimal readability:

| Context | Line Length | Line Height | Tailwind |
|---------|-------------|-------------|----------|
| Headers, labels | Short (<30 chars) | 1.25 | `leading-tight` |
| Cards, captions | Medium (30-60 chars) | 1.5 | `leading-normal` |
| Body paragraphs | Long (60+ chars) | 1.75-2 | `leading-relaxed` |

```tsx
// ❌ WRONG: Same line height for all contexts
<h1 className="text-4xl leading-relaxed">Short Title</h1>
<p className="text-base leading-tight max-w-prose">Long paragraph text...</p>

// ✅ CORRECT: Line height matches line length
<h1 className="text-4xl leading-tight">Short Title</h1>
<p className="text-base leading-relaxed max-w-prose">Long paragraph text...</p>
```

### Line Length Constraints

Optimal reading experience requires constrained line lengths:

| Context | Optimal | Maximum | Tailwind |
|---------|---------|---------|----------|
| Body text | 55-65 chars | 75 chars | `max-w-prose` (65ch) |
| Short paragraphs | 40-50 chars | 55 chars | `max-w-md` |
| Wide layouts | 65-75 chars | 85 chars | `max-w-2xl` |

```tsx
// ❌ WRONG: Unconstrained paragraph width
<p className="text-base w-full">
  Long paragraph that spans the entire container width...
</p>

// ✅ CORRECT: Constrained for readability
<p className="text-base leading-relaxed max-w-prose">
  Long paragraph with optimal line length for comfortable reading...
</p>
```

### Logo Wordmark Typography

When rendering "RHOSONICS" as text:
- Font: Unbounded 500
- Letter-spacing: `tracking-wide` (0.025em)
- For exports: Use path-outlined SVG from `src/assets/brand/rhosonics-wordmark-paths.ts`

---

## 3. Color System

### Color Categories

Colors are organized into three categories with strict separation:

#### Foundations (Always Available)
These are constant, structural colors.

| Token | Usage | Hex | Tailwind |
|-------|-------|-----|----------|
| Slate 50-900 | Software UI neutrals | Scale | `text-slate-600`, `bg-slate-100` |
| Obsidian | Dark surfaces, hardware | #111522 | `bg-rho-obsidian` |

#### Signals (Intentional Communication)
These colors carry meaning. Never decorative.

| Token | Usage | Hex | Tailwind |
|-------|-------|-----|----------|
| Primary Green | CTAs, success, actions | #33993C | `bg-primary`, `text-primary` |
| Lime Accent | Gradients ONLY | #73B82E | `--rho-green-accent` (never standalone) |
| Warning | Cautions, alerts | HSL 38 92% 50% | `bg-warning`, `text-warning` |
| Error | Failures, destructive | #DC2626 | `bg-error`, `text-error` |
| Success | Confirmations | Same as Primary | `bg-success` |
| Info | Guidance | Slate-600 | `text-slate-600` (never blue) |

#### Context (Situational)
Reserved for specific environmental contexts.

| Token | Usage | When to Use |
|-------|-------|-------------|
| Mineral palette | Field photography overlays | Only in imagery/environmental contexts |
| Eco tints | Sustainability metrics | Only when showing environmental impact data |

### Primary Green Scale (50-900)

For UI states, hover effects, and tints:

| Level | HSL | Usage | Tailwind |
|-------|-----|-------|----------|
| 50 | 125 50% 97% | Subtle backgrounds | `bg-primary/5` |
| 100 | 125 45% 93% | Hover backgrounds | `bg-primary/10` |
| 200 | 125 42% 85% | Active backgrounds | `bg-primary/20` |
| 300 | 125 45% 72% | Borders, outlines | `border-primary/40` |
| 400 | 125 48% 55% | Muted accent text | `text-primary/70` |
| 500 | 125 50% 40% | **Primary (default)** | `bg-primary` |
| 600 | 125 52% 35% | Hover state | `hover:bg-primary/90` |
| 700 | 125 55% 28% | Active/pressed | `active:bg-primary/80` |
| 800 | 125 58% 20% | Dark accent | — |
| 900 | 125 60% 12% | Darkest variant | — |

```tsx
// ✅ Button with proper state colors
<Button className="bg-primary hover:bg-primary/90 active:bg-primary/80">
  Primary Action
</Button>

// ✅ Subtle hover background
<div className="hover:bg-primary/10 transition-colors p-4 rounded-lg">
  Interactive card
</div>
```

### Dark Background Color Rules

When using Obsidian or dark surfaces, reduce saturation of accent colors:

| Context | Light Background | Dark Background |
|---------|-----------------|-----------------|
| Primary Green | Full saturation | Reduce 10-20% |
| Accent highlights | Standard opacity | Reduce opacity 20% |
| Borders | Slate-200 | Slate-700/50 |

```tsx
// ❌ WRONG: Full saturation on dark
<div className="bg-rho-obsidian">
  <span className="text-primary">Bright green on dark</span>
</div>

// ✅ CORRECT: Reduced intensity on dark
<div className="bg-rho-obsidian">
  <span className="text-primary/80">Balanced green on dark</span>
</div>
```

### ⛔ Color Violations

```tsx
// ❌ WRONG: Pure black
<div className="bg-black text-white">

// ❌ WRONG: Lime accent standalone
<button className="bg-rho-green-accent">

// ❌ WRONG: Blue for info
<div className="bg-blue-500 text-white">Info</div>

// ❌ WRONG: Mineral color for UI
<nav className="bg-mineral-surface">

// ❌ WRONG: Direct color values
<div className="bg-[#33993C]">

// ✅ CORRECT: Semantic tokens
<div className="bg-rho-obsidian text-foreground">
<button className="bg-primary text-primary-foreground">
<div className="bg-slate-100 text-slate-600">Info</div>
<div className="bg-background text-foreground">
```

### Gradient Usage

Gradients add depth, never decoration:

```tsx
// Brand gradient (logo, premium CTAs)
className="bg-gradient-to-br from-rho-green via-primary to-rho-green-accent"

// Subtle surface gradient
className="bg-gradient-to-b from-background to-muted/50"
```

Never apply gradients to:
- Body text
- Small UI elements
- Data visualizations (unless representing a range)

---

## 4. Shadow & Elevation System

### Light Source Principle

All shadows originate from a **top-left light source** (consistent across all components):
- Shadows fall to the bottom-right
- Larger blur = higher elevation
- Increased spread = softer, more ambient light

### 5-Level Elevation Scale

| Level | Name | Usage | Tailwind / CSS |
|-------|------|-------|----------------|
| 0 | **None** | Flat elements, inline content | (no shadow) |
| 1 | **Card** | Cards, dropdowns, raised surfaces | `shadow-card` |
| 2 | **Elevated** | Hover states, floating elements | `shadow-elevated` |
| 3 | **Modal** | Dialogs, overlays, popovers | `shadow-lg` + custom |
| 4 | **Glow** | Hero elements, premium focus states | Custom glow effect |

```tsx
// Level 1: Card
<div className="shadow-card bg-card rounded-lg p-6">
  Standard card content
</div>

// Level 2: Elevated (hover)
<div className="shadow-card hover:shadow-elevated transition-shadow">
  Interactive card with hover elevation
</div>

// Level 3: Modal
<Dialog className="shadow-lg">
  <DialogContent className="bg-background">
    Modal content
  </DialogContent>
</Dialog>

// Level 4: Glow (hero/premium)
<div className="shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]">
  Premium hero element with brand glow
</div>
```

### Shadows vs Borders

| Use Shadows When | Use Borders When |
|------------------|------------------|
| Element is elevated/floating | Element is at same level |
| Interactive feedback needed | Static separation |
| Depth communicates hierarchy | Structure needs reinforcement |
| Premium/hero elements | Dense UI with many elements |

```tsx
// ❌ WRONG: Border on elevated element
<div className="border-2 shadow-lg">Competing signals</div>

// ✅ CORRECT: Shadow alone for elevation
<div className="shadow-elevated">Elevated card</div>

// ✅ CORRECT: Border alone for structure
<div className="border border-border">Grid cell</div>
```

### Colored Shadows

For brand elements, use colored shadows derived from the element's color:

```tsx
// Primary button with colored shadow
<Button className="bg-primary shadow-[0_4px_14px_0_hsl(var(--primary)/0.25)]">
  Premium CTA
</Button>

// Hero element with brand glow
<div className="shadow-[0_0_60px_-15px_hsl(var(--rho-green)/0.4)]">
  Featured content
</div>
```

---

## 5. Logo Usage

### The 135% Rule

**Icon size = Text size × 1.35** (always)

| Text Size | Icon Size | Example Classes |
|-----------|-----------|-----------------|
| 16px (base) | 22px | `text-base` → `w-5 h-5` |
| 20px (xl) | 27px | `text-xl` → `w-7 h-7` |
| 24px (2xl) | 32px | `text-2xl` → `w-8 h-8` |
| 32px (3xl) | 43px | `text-3xl` → `w-11 h-11` |

For hero sections, use 140% ratio for extra impact.

### Logo Component

```tsx
import { RhosonicsLogo } from "@/components/RhosonicsLogo";

// Variants
<RhosonicsLogo variant="gradient" />  // Primary, on light backgrounds
<RhosonicsLogo variant="white" />     // On dark backgrounds
<RhosonicsLogo variant="dark" />      // Monochrome dark

// With animation (hero only)
<RhosonicsLogo variant="gradient" animated />
```

### ⛔ Logo Violations

Never:
- Rotate the logo
- Add shadows or glows
- Stretch or distort
- Use below 40px
- Change gradient colors
- Place on busy backgrounds without contrast
- Animate outside of hero contexts

### Clear Space

Maintain padding equal to the height of the "R" character on all sides.

### Approved Lockup

```tsx
// Standard lockup
<div className="flex items-center gap-3">
  <RhosonicsLogo className="w-8 h-8" variant="gradient" />
  <span className="font-logo text-2xl tracking-wide text-foreground">
    RHOSONICS
  </span>
</div>
```

---

## 6. Spacing System

### Base Unit: 4px

All spacing should be multiples of 4px using Tailwind's spacing scale.

| Tailwind | Pixels | Usage |
|----------|--------|-------|
| `1` | 4px | Tight inline spacing |
| `2` | 8px | Icon gaps, button inline padding |
| `3` | 12px | Small component padding |
| `4` | 16px | Standard padding, input fields |
| `6` | 24px | Card padding, component gaps |
| `8` | 32px | Large component spacing |
| `12` | 48px | Section padding (mobile) |
| `16` | 64px | Section breaks (desktop) |
| `24` | 96px | Major section dividers |

### Separation Without Borders

Use spacing, background shifts, and subtle depth instead of borders when possible:

| ❌ Border Approach | ✅ Spacing Approach |
|-------------------|---------------------|
| `border-b border-border` | `pb-4 mb-4` (double spacing) |
| `divide-y` on list | Increased gap + subtle bg shift |
| `border border-border` | `shadow-card` or `bg-muted/50` |

```tsx
// ❌ WRONG: Border-heavy separation
<div className="border-b border-border py-4">Item 1</div>
<div className="border-b border-border py-4">Item 2</div>
<div className="border-b border-border py-4">Item 3</div>

// ✅ CORRECT: Spacing creates separation
<div className="space-y-6">
  <div className="pb-6">Item 1</div>
  <div className="pb-6">Item 2</div>
  <div>Item 3</div>
</div>

// ✅ ALTERNATIVE: Background shift for grouping
<div className="bg-muted/30 rounded-lg p-4">
  <div className="space-y-3">
    <div>Related item 1</div>
    <div>Related item 2</div>
  </div>
</div>
```

### When Borders ARE Appropriate

| Context | Reason |
|---------|--------|
| Form inputs | User expectation, accessibility |
| Table cells | Dense data requires structure |
| Dense dashboards | Many items need explicit boundaries |
| Interactive drag handles | Visual affordance |

### Grid System

- 12-column grid
- 24px gutters (`gap-6`)
- Max content width: 1400px (`max-w-7xl`)
- Container padding: 32px (`px-8`)

```tsx
<div className="container mx-auto px-8">
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-4">...</div>
    <div className="col-span-8">...</div>
  </div>
</div>
```

### Border Radius

| Token | Pixels | Usage |
|-------|--------|-------|
| `rounded-sm` | 2px | Subtle rounding, tags |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards, panels |
| `rounded-full` | 50% | Avatars, pills |

---

## 7. Icon System

### Principles

1. **Engineered, not illustrated** — Technical precision over artistic expression
2. **Self-explanatory** — If it needs a label to be understood, it has failed
3. **Supportive** — Icons support text, never compete with it

### Import Path

Always import from the centralized icon library:

```tsx
// ✅ CORRECT
import { Activity, Settings, ChevronRight } from "@/lib/icons";

// ❌ WRONG
import { Activity } from "lucide-react";
```

**Source file:** `src/lib/icons.ts`

### Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 16px | `w-4 h-4` |
| Button icons | 16px | `w-4 h-4` |
| Navigation | 20px | `w-5 h-5` |
| Feature icons | 24px | `w-6 h-6` |
| Hero elements | 32px | `w-8 h-8` |
| Decorative/Large | 48px+ | `w-12 h-12` |

### Icon Color & Weight Balance

Icons should visually balance with adjacent text:

| Adjacent Text Weight | Icon Treatment |
|---------------------|----------------|
| Regular (400) | Default stroke, `text-muted-foreground` |
| Medium (500) | Default stroke, `text-foreground` |
| Semibold (600) | Default stroke, `text-foreground` |
| Bold (700) | Consider filled icon variant if available |

```tsx
// ❌ WRONG: Icon overwhelms light text
<div className="flex items-center gap-2">
  <AlertCircle className="w-5 h-5 text-foreground" />
  <span className="text-sm text-muted-foreground">Info message</span>
</div>

// ✅ CORRECT: Icon matches text weight
<div className="flex items-center gap-2">
  <AlertCircle className="w-4 h-4 text-muted-foreground" />
  <span className="text-sm text-muted-foreground">Info message</span>
</div>
```

### Stroke Weight

Always use the default 2px stroke. Never modify stroke width.

### Icon + Text Alignment

```tsx
// Standard button with icon
<button className="inline-flex items-center gap-2">
  <ArrowRight className="w-4 h-4" />
  <span>Continue</span>
</button>

// Icon-only button (must have aria-label)
<button aria-label="Settings">
  <Settings className="w-5 h-5" />
</button>
```

---

## 8. Voice & Tone

### Four Pillars

| Pillar | Meaning | Example |
|--------|---------|---------|
| **Direct** | Lead with the point, no preamble | "Measures density to ±0.1%" not "Our advanced technology enables..." |
| **Educational** | Explain how and why | Include the mechanism, not just the benefit |
| **Evidence-Based** | Show the data | Cite specific metrics, case studies, test results |
| **Partnership-First** | Long-term focus | "We work with you" not "We sell to you" |

### Terminology Replacements

| ❌ Avoid | ✅ Use Instead |
|----------|---------------|
| Cutting-edge | Ultrasonic measurement |
| Revolutionary | Proven / Field-tested |
| Solution | System / Sensor / Instrument |
| Best-in-class | [Cite specific metric] |
| Innovative | Engineered / Designed for |
| Seamless | Integrated / Compatible |
| Leverage | Use |
| Utilize | Use |
| Synergy | Collaboration |

### Writing Formulas

**Headlines:** `[Specific Benefit] + [Measurable Proof]`
> "Reduce reagent costs by 15-30% with real-time density monitoring"

**Descriptions:** `[What it does] + [How it works] + [Why it matters]`
> "The SDM Eco measures slurry density using ultrasonic technology, providing continuous readings that enable precise dosing control."

**CTAs:** `[Action] + [Outcome]`
> "Download specifications" not "Learn more"

---

## 9. Component Patterns

### Buttons

```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button variant="default">Save changes</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Industrial/Premium
<Button variant="obsidian">Request quote</Button>
<Button variant="gradient">Get started</Button>

// Hero CTA (large)
<Button variant="gradient" size="lg">
  <span>Explore the system</span>
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
```

### Metric Tiles

Use the MetricTile component for displaying key statistics:

```tsx
import { MetricTile } from "@/components/ui/metric-tile";

<MetricTile
  value="±0.1"
  unit="%"
  label="Measurement accuracy"
  variant="obsidian"
/>
```

Variants: `obsidian`, `primary`, `outline`, `glass`

**Critical:** Always show units. Values use JetBrains Mono, labels use Instrument Sans.

### Callouts

Use the BrandCallout component for contextual guidance:

```tsx
import { BrandCallout } from "@/components/brand/BrandCallout";

// Information/guidance
<BrandCallout variant="info" title="Font loading">
  Always load fonts from the local /public/fonts directory.
</BrandCallout>

// Warning/avoid
<BrandCallout variant="avoid" title="Never use">
  Do not use Space Grotesk anywhere in the brand system.
</BrandCallout>

// Best practice
<BrandCallout variant="best" title="Recommended">
  Use semantic color tokens instead of direct hex values.
</BrandCallout>

// Error/critical
<BrandCallout variant="error" title="Breaking change">
  This will cause rendering issues in older browsers.
</BrandCallout>
```

### Empty States

First impressions matter. Every empty state needs four components:

| Component | Purpose | Example |
|-----------|---------|---------|
| **Icon** | Visual anchor, relevant to content type | `FileText` for documents |
| **Title** | What's missing | "No documents yet" |
| **Description** | Why empty or how to fix | "Upload your first document to get started" |
| **Action** | Clear next step | `<Button>Upload document</Button>` |

```tsx
// ❌ WRONG: Minimal empty state
<div className="text-center text-muted-foreground">
  No data
</div>

// ✅ CORRECT: Complete empty state
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <FileText className="w-8 h-8 text-muted-foreground" />
  </div>
  <h3 className="font-ui text-lg font-semibold text-foreground">
    No documents yet
  </h3>
  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
    Upload your first document to start organizing your project files.
  </p>
  <Button className="mt-6" variant="default">
    <Upload className="w-4 h-4 mr-2" />
    Upload document
  </Button>
</div>
```

### Badges & Labels

```tsx
// Technical label (JetBrains Mono, uppercase)
<span className="font-data text-xs uppercase tracking-wider text-muted-foreground">
  DENSITY
</span>

// Status badge
<Badge variant="outline" className="font-data uppercase">
  Active
</Badge>
```

### Cards

```tsx
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="font-ui text-xl font-semibold">
      Card title
    </CardTitle>
    <CardDescription className="text-muted-foreground">
      Supporting text
    </CardDescription>
  </CardHeader>
  <CardContent>
    ...
  </CardContent>
</Card>
```

---

## 10. Motion Design

### Timing Scale

| Duration | Usage | CSS |
|----------|-------|-----|
| 200ms | Micro-interactions (hover, focus) | `duration-200` |
| 300ms | State transitions | `duration-300` |
| 500ms | Emphasis, entry animations | `duration-500` |

### Easing Functions

| Type | Usage | CSS |
|------|-------|-----|
| Linear | Data updates, mechanical motion | `ease-linear` |
| Ease-out | UI transitions, natural deceleration | `ease-out` |

### Signature Animations

**Boot Sequence:** Wave propagation from bottom-right corner
- Used for logo animation on page load
- Staggered reveal: Wave 1 → Wave 2 → Wave 3
- Implementation: See `RhosonicsLogo` with `animated` prop

**Value Counters:** Smooth numeric transitions
- Used for metric displays
- Duration: 500ms
- Easing: ease-out

### Reduced Motion

Always respect user preferences:

```tsx
// In CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// In React/Framer Motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## 11. SDM Eco Interface (HMI)

### Display Specifications

- Resolution: 800×480 pixels (5:3 aspect ratio)
- Touch targets: Minimum 48px × 48px
- Viewing distance: Arm's length in industrial environments
- Conditions: Direct sunlight, gloved operation

### Typography Requirements

| Element | Font | Weight | Case |
|---------|------|--------|------|
| UI labels | Instrument Sans | 500-600 | Sentence |
| Data values | JetBrains Mono | 500 | ALL-CAPS |
| Metric units | JetBrains Mono | 500 | ALL-CAPS |

**Never use light/thin weights** — readability is critical.

### Layout Zones

```
┌─────────────────────────────────────────────────────┐
│  Header: Status indicators, time, connectivity      │  48px
├─────────────────────────────────────────────────────┤
│                                                     │
│  Primary Display: Main metric, large numerals       │  280px
│                                                     │
├─────────────────────────────────────────────────────┤
│  Secondary: Supporting metrics, trend indicators    │  104px
├─────────────────────────────────────────────────────┤
│  Navigation: Mode selection, settings access        │  48px
└─────────────────────────────────────────────────────┘
```

### Color Usage (HMI)

- Background: Obsidian (#111522)
- Primary data: White (#FFFFFF)
- Secondary data: Slate-400
- Accents: Primary Green (sparingly)
- Alerts: Warning/Error colors

---

## 12. Imagery Guidelines

### Two Visual Styles

#### Real & Gritty
- Authentic field photography
- Shows wear, scale, and environmental context
- People in actual work situations (PPE, industrial settings)
- No stock photography aesthetics

#### Abstract & Precise
- Technical visualization
- Data representation
- Brand color accents (green gradients)
- Clean, geometric compositions

### Image Treatment Process

1. **Desaturate** — Reduce saturation 20-40%
2. **Cool shift** — Push shadows toward blue
3. **Increase contrast** — Enhance definition
4. **Add green accent** — Subtle brand color overlay or accent lighting

### ⛔ Imagery Violations

Never use:
- Generic stock photography
- AI-generated people
- Overly saturated colors
- Staged/artificial industrial scenes
- Images without clear subject hierarchy

### Image Components

```tsx
import { ResponsiveImage } from "@/components/ui/responsive-image";

<ResponsiveImage
  src={fieldImage}
  alt="SDM Eco installation at mining site"
  sizes="(max-width: 768px) 100vw, 50vw"
  className="rounded-lg"
/>
```

---

## 13. Critical Constraints (Never Do List)

### Typography
- ❌ Never use Space Grotesk font
- ❌ Never use Unbounded for anything except logo wordmark
- ❌ Never use ALL-CAPS with Instrument Sans
- ❌ Never use sentence case with JetBrains Mono labels
- ❌ Never use gradients on body text
- ❌ Never use line heights below 1.25 for multi-line text
- ❌ Never exceed 75 characters per line for body text

### Color
- ❌ Never use pure black (#000000)
- ❌ Never use Lime Accent as standalone color (gradients only)
- ❌ Never use blue for info states
- ❌ Never substitute Mineral colors for Slate in UI
- ❌ Never use direct hex values in components (use tokens)
- ❌ Never use full-saturation accents on dark backgrounds

### Shadows & Depth
- ❌ Never combine borders AND shadows on same element (pick one)
- ❌ Never use shadows on inline elements
- ❌ Never use inconsistent shadow directions
- ❌ Never skip elevation levels (card → modal, not card → glow)

### Layout
- ❌ Never center-align body paragraphs (left-align only)
- ❌ Never use inconsistent spacing within component groups
- ❌ Never mix 4px-based and non-4px-based spacing

### Process
- ❌ Never ship without grayscale hierarchy validation
- ❌ Never add decorative elements before structure is solid
- ❌ Never use labels when data format is self-explanatory

### Logo
- ❌ Never rotate the logo
- ❌ Never add shadows or glows
- ❌ Never stretch or distort
- ❌ Never use below 40px
- ❌ Never change gradient colors
- ❌ Never animate outside hero contexts

### General
- ❌ Never use decorative gradients
- ❌ Never prioritize aesthetics over clarity
- ❌ Never use marketing superlatives (cutting-edge, revolutionary)
- ❌ Never show AI-generated people
- ❌ Never use stock photography aesthetics

---

## 14. File Reference Map

| Purpose | File Path |
|---------|-----------|
| Core values data | `src/data/brand-values.ts` |
| Icon exports | `src/lib/icons.ts` |
| Constants | `src/lib/constants.ts` |
| CSS variables | `src/index.css` |
| Tailwind config | `tailwind.config.ts` |
| Logo component | `src/components/RhosonicsLogo.tsx` |
| Wordmark paths | `src/assets/brand/rhosonics-wordmark-paths.ts` |
| Button component | `src/components/ui/button.tsx` |
| Metric tile | `src/components/ui/metric-tile.tsx` |
| Callout | `src/components/brand/BrandCallout.tsx` |
| Value badge | `src/components/brand/ValueBadge.tsx` |

---

## 15. Implementation Checklist

Before submitting any design/code change, verify:

### Design Process
- [ ] Started with feature, not layout
- [ ] Tested hierarchy in grayscale (mentally or via filter)
- [ ] De-emphasized secondary elements to highlight primary
- [ ] Removed labels where data format is self-explanatory
- [ ] Polished only after structure was solid

### Typography
- [ ] Typography uses correct font for context (UI vs Data vs Logo)
- [ ] Line height proportional to line length
- [ ] Body text constrained to 45-75 characters
- [ ] No thin weights used in HMI contexts

### Color & Depth
- [ ] Colors use semantic tokens, not direct values
- [ ] No pure black (#000) anywhere
- [ ] Accent colors reduced on dark backgrounds
- [ ] Shadow levels used appropriately (card → elevated → modal)
- [ ] No competing borders + shadows on same element

### Components
- [ ] Icons imported from `@/lib/icons`
- [ ] Icon color/weight matches adjacent text
- [ ] Empty states have all 4 components (icon, title, description, action)
- [ ] Logo follows 135% ratio rule

### Layout & Spacing
- [ ] Spacing uses 4px increments
- [ ] Separation uses space/background before borders
- [ ] Body paragraphs are left-aligned

### Motion & Accessibility
- [ ] Motion respects reduced-motion preferences
- [ ] Touch targets minimum 48px for HMI

### Content
- [ ] Copy follows voice guidelines (direct, evidence-based)
- [ ] No forbidden terminology used
- [ ] Images follow treatment guidelines

---

*Last updated: 2026-02-01*
*Source: Rhosonics Brand Guidelines System + Refactoring UI Principles*
