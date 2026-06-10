# 01 Brand Position — customer.io section patterns, Rhosonics-translated

## What I'm borrowing from customer.io

| customer.io move | Why it works | How I translate it |
|---|---|---|
| KPI stat strip (99.98% · 100B+ · 24/5 · 99% with thin vertical rules) | Anchors the page in concrete numbers, fast | Foundation stat strip — 5 values · 5 principles · 5 industries · 10 ICP slots |
| Small dot-eyebrow tag ("● Platform philosophy") above a display headline | Quiet sectioning without heavy numbered chrome | Replace the inner SectionHeader number-block with a green-dot eyebrow + display H2 + subtitle |
| Hero confirmation chips ("✓ 14-day free trial · ✓ No credit card · ✓ Cancel anytime") | Adds proof + scannability under the hero | Hero chip row: "✓ 5 values · ✓ 5 principles · ✓ 5 industries · ✓ Active v2026" |
| Capabilities card grid (image thumb + title + sentence) | Concrete, click-through, visually rich | Industries cards get a per-industry abstract obsidian thumbnail (SVG, green-only) + scope + ICPs + "Read brief →" |
| Big case-study quote card (portrait + logo + two metric callouts + pull quote) | Editorial weight, evidence-first | "Voice of operator" scaffolded card under Industries — quote slot + 2 metric slots + named role placeholder, clearly marked pending |
| Floating geometric accents (orange squares + arrow scribble) | Adds craft + motion hint to flat hero | Three small chamfered green squares + a hand-drawn green arrow SVG behind the PageBanner watermark — green only, no orange |
| Closing CTA band ("Supercharge your messaging") with two pill CTAs | Always points readers to the next thing | New "Now apply the foundation." closer above TelemetryFooter, two pill CTAs → 02 Voice & 03 Logo |

## Final page order

```text
PageBanner (01)
  └─ floating green accent squares + green arrow SVG behind watermark
  └─ hero confirmation chip row (4 chips, green checks)

01.1 Foundation
  └─ Vision (obsidian, chamfered) + Mission (light, green rail)   [unchanged]
  └─ NEW: 4-tile KPI stat strip (5 values · 5 principles · 5 industries · 10 ICP slots)

01.2 Values & Operating Rules                                     [unchanged 5-up grid]

01.3 Design Principles                                            [unchanged obsidian panel]

01.4 Industries & ICPs
  └─ Industry cards get an abstract obsidian SVG thumbnail per industry
  └─ NEW: scaffolded "Voice of operator" pull-quote card after the grid

01.5 NEW closer band — "Now apply the foundation."
  └─ Two pill CTAs → 02 Voice & Tone · 03 Logo
  └─ Chip row: "● 11 chapters remaining"

TelemetryFooter                                                   [unchanged]
```

Inside every 01.x section, the existing `SectionHeader` (number + bold title + subtitle + divider) is replaced by a lighter `DotEyebrowHeader`:

```text
●  Foundation                       ← green dot + JetBrains Mono label
Vision sets the horizon.            ← display H2, Instrument Sans semibold
The Mission is the work…            ← subtitle paragraph
```

The "01.1 / 01.2 / 01.3 / 01.4" chapter numbers stay, but as a small mono tag *next to* the eyebrow label, not as a giant numbered header.

## Files

**New**
- `src/components/brand/DotEyebrowHeader.tsx` — green-dot eyebrow + display H2 + subtitle; replaces inline `SectionHeader` calls on this page only
- `src/components/brand/FoundationStats.tsx` — 4-tile KPI strip with thin vertical dividers, mono numerals
- `src/components/brand/IndustryThumb.tsx` — small obsidian SVG illustration per industry id (5 abstract marks: concentrator, wafer, dredge hull, clarifier, paste-fill); green stroke only
- `src/components/brand/OperatorQuoteCard.tsx` — scaffolded case-study-style quote card (quote slot + 2 metric callouts + named role placeholder + "pending" tag)
- `src/components/brand/HeroChipRow.tsx` — confirmation chips row with green check icon
- `src/components/brand/ApplyFoundationCTA.tsx` — closer band with display headline + 2 pill CTAs + chapter-progress chip

**Edited**
- `src/pages/brand/PositioningPage.tsx` — swap SectionHeader for DotEyebrowHeader, insert chip row + FoundationStats + OperatorQuoteCard + ApplyFoundationCTA, plus floating accent SVG behind PageBanner
- `src/components/brand/IndustriesICP.tsx` — add `IndustryThumb` as card header, append `OperatorQuoteCard` below the grid

**Untouched**
- `Foundation.tsx`, `ValueOperatingRules.tsx`, `DesignPrinciples.tsx`, `PageBanner.tsx`, `SectionUtils.tsx`, `TelemetryFooter`

## Brand-rule guardrails

- Green (`hsl(var(--primary))`) is the only saturated colour. customer.io's orange/violet accents → green-only.
- No glassmorphism. Chamfers only on the large Vision panel, the obsidian Principles panel, and the closer band — everywhere else stays 4px rounded.
- No all-caps Instrument Sans. Eyebrow labels use JetBrains Mono uppercase.
- Confirmation chips use check icon from `@/lib/icons` (Lucide `Check`), not a custom shape.
- All copy stays canonical: Vision/Mission/value names/principle imperatives from `src/data/brand-values.ts`. New copy is only the new chip/stat labels and the closer headline.
- Floating accent squares behind PageBanner are decorative — set `aria-hidden`, never carry meaning.
- "Voice of operator" card is explicitly marked pending so it isn't mistaken for shipped content.

## Technical notes

- `DotEyebrowHeader` is page-local; it does not replace the global `SectionHeader` used on other brand chapters.
- `IndustryThumb` SVGs are inlined React components (no external image fetch), 16:9 aspect, `currentColor` stroke so they pick up `text-primary`.
- Closer band uses `bg-foreground text-background` with the same shadow token as the principles panel so it rhymes visually with 01.3.
- KPI strip uses CSS grid with `divide-x divide-border` for the thin rules — matches customer.io's stat bar without adding box-borders.
- All new sections register a `ScrollSection` variant that respects the no-adjacent-duplicate rhythm rule (default → tinted → default → tinted → dark closer).
