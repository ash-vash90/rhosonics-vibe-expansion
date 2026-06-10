## What's wrong on /position today

1. **Vision + Mission are oversized** — rendered as 7xl / 5xl headlines stacked vertically. They read as decoration, not as a statement you can absorb.
2. **Principles don't ladder up to the values** — `BrandPrinciples` lists "Precision before decoration / Expression with intent / Engineered, not styled / Consistency enables flexibility". None of those are Expertise, Collaboration, Innovation, Quality, or Sustainability. They're a design-team artefact pretending to be brand strategy.
3. **Origin Story is orphaned** — "started measuring beer density in 1992" sits on the foundation chapter with no thread tying it to vision, mission, values, or what we do today. It's nostalgia, not positioning.
4. **Governance block is filler** — "Before it ships, can the work answer…" and "The catch-all rules" are IBM/Herman-Miller-style ceremony copied wholesale. They don't help anyone make a decision and they undermine the seriousness of the page above them.

## The fix

Rebuild `/position` as a single, tight foundation chapter. Four sections, in this order, nothing else:

### 01.1 — Vision & Mission, side by side
Replace the stacked giant-type Foundation block with a two-column statement:

```text
┌──────────────────────────┬──────────────────────────┐
│ VISION                   │ MISSION                  │
│ Leading the way in what  │ Advanced measurement     │
│ can be measured,         │ solutions for more       │
│ controlled, and          │ efficient, automated,    │
│ optimized.               │ and sustainable          │
│                          │ operations.              │
│ — the horizon            │ — what we do today       │
└──────────────────────────┴──────────────────────────┘
```

- Type size around `text-2xl md:text-3xl` (serious, readable, not theatrical).
- Equal weight, equal column. Dramatic typography is reserved for chapter theses elsewhere — not for the foundation statements themselves.
- One short qualifier line under each so the relationship (long horizon / present commitment) is explicit.
- Stacks on mobile.

### 01.2 — The five values
Keep the values list from the current `Foundation` component (numbered, icon + title + description, divided rows). This part already works. It stays as-is below the Vision/Mission pair.

### 01.3 — How the values show up in our work
Replace `BrandPrinciples` entirely. New block, one row per value, each value paired with the operational behaviour it demands:

| Value | What it demands of the work |
| --- | --- |
| Expertise | Evidence over claims. Cite the measurement, name the engineer. |
| Collaboration | Speak with partners, not at customers. Co-authored language. |
| Innovation | Show the novel mechanism, not the marketing word "innovative". |
| Quality | Every number is verifiable. Every spec traces to a test. |
| Sustainability | Quantify the saving (energy, chemicals, nuclear avoidance). |

This is the only "principles" surface on the page, and every row maps 1:1 to a canonical value. No standalone "design principles" detached from the foundation.

### 01.4 — Remove Origin Story from this page
Cut `OriginStory` from `/position` entirely. The beer-density 1992 story belongs on an About / Company page (or inside a Proof anecdote), not on the foundation chapter. The agent will leave `OriginStory.tsx` in the codebase, unrouted, so it can be re-placed later if you want it on a different page.

### 01.5 — Delete the governance filler
Remove the `DecisionQuestions` and `AdditionalDonts` blocks from `/position`. They are removed only from this page; the components remain available for chapters where a real governance test exists. If those blocks turn out to be filler everywhere, that's a separate pass — flag it after seeing the rebuilt page.

## Files touched

- `src/pages/brand/PositioningPage.tsx` — rewrite section composition; remove `BrandPrinciples`, `OriginStory`, `DecisionQuestions`, `AdditionalDonts` from this page.
- `src/components/brand/Foundation.tsx` — restructure: Vision/Mission become a two-column pair at calmer scale; values list preserved.
- New: `src/components/brand/ValueOperatingRules.tsx` — the "how values show up in the work" table (section 01.3).

No data changes. `src/data/brand-values.ts` stays the single source of truth.

## Out of scope (flag for later)

- Whether `DecisionQuestions` / `AdditionalDonts` should be removed from every other chapter too.
- Where Origin Story belongs (new About page, Proof sidebar, or cut entirely).
- A full visual pass on the rest of the chapters — this plan only fixes `/position`.