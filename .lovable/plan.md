

# Content Strategy Enhancements from Article Analysis

Apply the 7 principles from the winning content programs article to strengthen the brand guidelines content.

---

## Changes Overview

### 1. About Page: Add Goals & Governance Section
Add a new "Brand Governance" sub-section to `AboutThisSystem.tsx` covering:
- **Clear goals**: What this system should achieve (consistent output, faster decisions, reduced back-and-forth)
- **Ownership**: Who maintains the brand system, how to propose changes
- **Exception handling**: What to do when guidelines don't cover a scenario

### 2. Voice Page: Add Buyer Persona
Add an "Audience Profile" block to `VoiceTone.tsx` before the Voice Pillars, explicitly naming the primary reader:
- **Primary persona**: Senior Process Engineer, 15+ years experience, skeptical of marketing claims, evaluates on spec sheets not brochures
- **Secondary persona**: Operations Manager, ROI-focused, needs data to justify procurement
- This grounds all voice guidance in a real person rather than abstract rules

### 3. Positioning Page: Strengthen Differentiation
Add an explicit "Why Not Competitors" callout to `BrandPositioning.tsx`:
- A concise comparison: "Non-nuclear since 2009" vs nuclear alternatives
- Falsifiable claims only (matching the existing voice principles)
- Positioned after the brand pillars, before Core Values

### 4. Cross-Page Navigation Links
Add a reusable `SectionCrossLink` component that links related sections:
- Color page references Applications for real-world usage
- Voice page links to Positioning for brand promise context
- Typography links to Visual System for hierarchy rationale
- Rendered as a subtle "See also" strip at the bottom of relevant sections

---

## Files to Create/Modify

| Action | File | Change |
|--------|------|--------|
| Create | `src/components/brand/SectionCrossLink.tsx` | Reusable cross-reference link component |
| Modify | `src/components/brand/AboutThisSystem.tsx` | Add governance section (goals, ownership, exceptions) |
| Modify | `src/components/brand/VoiceTone.tsx` | Add buyer persona block before Voice Pillars |
| Modify | `src/components/brand/BrandPositioning.tsx` | Add differentiation callout after pillars |
| Modify | `src/pages/brand/ColorPage.tsx` | Add cross-link to Applications |
| Modify | `src/pages/brand/VoicePage.tsx` | Add cross-link to Positioning |
| Modify | `src/pages/brand/TypographyPage.tsx` | Add cross-link to Visual System |

