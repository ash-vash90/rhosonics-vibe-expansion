

# Plan: Comprehensive Agents.md Update with Refactoring UI Principles

## Overview

Update the `agents.md` file to bridge the gaps identified from the Refactoring UI analysis, transforming it from a ~700 line reference document into a ~900+ line comprehensive guide that includes both brand rules AND design process principles.

## Changes Summary

### New Sections to Add

**Section 0: Design Process (Refactoring UI Principles)** - NEW
- Feature-first development workflow
- Grayscale validation test before shipping
- Iterative building approach ("pessimist when building, optimist when polishing")
- Emphasize by de-emphasizing technique
- Labels as a last resort principle

### Sections to Expand

**Section 2: Typography System** - EXPANDED
- Add line height proportions table (tight/normal/relaxed based on line length)
- Add line length constraints (45-75 characters optimal, max-width classes)
- Add code examples for both principles

**Section 3: Color System** - EXPANDED
- Add full Primary Green 50-900 scale for UI states
- Add dark background color rules (reduce saturation)
- Add opacity-based hover/active state examples

**Section 4: Shadow & Elevation System** - NEW SECTION
- 5-level shadow scale (none → card → elevated → modal → glow)
- Light source principles (top-left)
- Shadows vs borders usage guidance
- Code examples with Tailwind classes

**Section 6: Spacing System** - EXPANDED
- Add "Separation Without Borders" principle
- When to use borders vs spacing vs background shifts
- Code examples showing the transformation

**Section 7: Icon System** - EXPANDED
- Add icon color & weight balance rules
- Icons should match text visual weight

**Section 9: Component Patterns** - EXPANDED
- Add Empty States pattern with full anatomy
- Good vs bad empty state examples
- Four-part structure: Icon, Title, Description, Action

**Section 13: Critical Constraints** - EXPANDED
- Add shadows & depth violations
- Add layout violations (center-aligned paragraphs, inconsistent spacing)
- Add process violations (skipping grayscale test)

**Section 15: Implementation Checklist** - EXPANDED
- Add design process checkpoints
- Add color & depth verification
- Add component quality checks

## File Changes

| File | Action | Size Change |
|------|--------|-------------|
| `agents.md` | Update | ~700 → ~900 lines |

## Detailed Section Content

### Section 0: Design Process

```markdown
## 0. Design Process (Refactoring UI Principles)

### Feature-First Development
Start with functionality, not layout. Design the actual feature before worrying about where it goes.

### Grayscale Validation Test
Before shipping any design, convert to grayscale. If hierarchy is unclear, fix spacing and typography - don't rely on color to save it.

### Emphasize by De-emphasizing
The primary way to make something stand out is to make other things stand back.
```

### Shadow/Elevation Scale

| Level | Name | Usage |
|-------|------|-------|
| 0 | None | Flat elements |
| 1 | Card | Cards, dropdowns |
| 2 | Elevated | Hover states, raised elements |
| 3 | Modal | Dialogs, overlays |
| 4 | Glow | Hero elements, premium focus |

### Primary Green Scale (50-900)

| Level | HSL | Usage |
|-------|-----|-------|
| 50 | 125 50% 97% | Subtle backgrounds |
| 100 | 125 45% 93% | Hover backgrounds |
| 200 | 125 42% 85% | Active backgrounds |
| 300 | 125 45% 72% | Borders |
| 400 | 125 48% 55% | Muted accents |
| 500 | 125 50% 40% | Primary (default) |
| 600 | 125 52% 35% | Hover state |
| 700 | 125 55% 28% | Active/pressed |
| 800 | 125 58% 20% | Dark accents |
| 900 | 125 60% 12% | Darkest variant |

### Line Height Rules

| Context | Line Height | Tailwind |
|---------|-------------|----------|
| Short lines (labels, headers) | 1.25 | `leading-tight` |
| Medium lines (cards, captions) | 1.5 | `leading-normal` |
| Long lines (paragraphs) | 1.75-2 | `leading-relaxed` |

### Line Length Constraints

| Context | Max Width | Tailwind |
|---------|-----------|----------|
| Body text | 65ch | `max-w-prose` |
| Short paragraphs | 45ch | `max-w-md` |
| Wide content | 75ch | `max-w-2xl` |

### Empty States Pattern

Four components:
1. Icon - Relevant to missing content
2. Title - What's missing
3. Description - Why empty or how to fix
4. Action - Clear next step

## Technical Notes

- All additions follow the existing Markdown structure
- Code examples use consistent fencing (```tsx)
- Tables follow existing alignment patterns
- Adds cross-references to Refactoring UI as source

## Benefits

1. **Process guidance** - AI agents now know HOW to design, not just what colors to use
2. **Hierarchy techniques** - Explicit methods for establishing visual hierarchy
3. **Complete color system** - Full shade scales enable proper hover/active states
4. **Depth system** - Consistent shadow usage across all components
5. **Better empty states** - First-impression UI gets proper attention

