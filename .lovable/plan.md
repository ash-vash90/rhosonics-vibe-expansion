
## Reverse-engineer Claude design → Brand Position

I unpacked both bundles (they're a custom format wrapping the real HTML/CSS in base64+gzip script tags). The tokens already match the project (`--rho-green 125 50% 40%`, slate scale, JetBrains Mono for data, Instrument Sans for UI, chamfer clip-paths). What's different is the **section grammar** — that's what this plan extracts and applies.

### The seven design moves to copy

1. **Section eyebrow with a leading 24px green hairline** — `before { content: ""; width: 24px; height: 1px; background: green }` + green uppercase mono label. Replaces the current `DotEyebrowHeader` (which uses a dot + numeric tag).
2. **Section title scale** — `clamp(32px, 4vw, 48px)`, weight 700, `letter-spacing: -0.02em`, `max-width: 22ch`, balanced.
3. **Instrument panel** — dark obsidian card with `clip-path: var(--chamfer-lg)`, a 1px header rule, a tiny `LIVE • dot pulse` chip, two big tabular-num readouts in JetBrains Mono with smaller uppercase unit suffixes, and a waveform/grid backdrop. The signature element.
4. **Dark proof grid** — 3 columns separated by vertical hairlines on the obsidian band, mono numerals 32px, `+` and unit suffixes in slate-400/green.
5. **Tabbed switcher (ICP pattern)** — full-width bordered cells with `tab-num + tab-name + tab-sub`, active tab gets a 2px green underline anchored to `bottom: -1px` of the container border (the underline visually "consumes" the border).
6. **Outcome chip in cards** — small `outcome-num` (large mono) + `outcome-lbl` block at the bottom of any evidence card. Same pattern works for the operator-quote callouts.
7. **Hero gradient stack** — radial green wash + 80px grid masked by a radial ellipse + low-opacity SVG turbulence noise. Becomes the standard "chapter banner" treatment.

### Phase 1 — Build the shared kit (under `src/components/brand/system/`)

New, reusable primitives that the rest of the brand pages will adopt later:

```
src/components/brand/system/
  SectionEyebrow.tsx      ← green 24px line + uppercase mono label
  SectionTitle.tsx        ← 22ch, clamp scale, balanced
  InstrumentPanel.tsx     ← dark card chrome: title row, LIVE chip, slot
  InstrumentReadout.tsx   ← label + big mono value + unit + delta
  WaveformBackdrop.tsx    ← grid + animated green path (uses existing GSAP loader)
  DarkProofGrid.tsx       ← 3-col hairline-divided stat strip on obsidian
  TabbedSwitcher.tsx      ← borderless ICP-style tabs, green-underline active
  OutcomeChip.tsx         ← outcome-num + outcome-lbl block
  ChapterBanner.tsx       ← hero treatment: radial wash + grid mask + noise
```

These reuse existing tokens only — no new colors. Chamfer is restricted to large surfaces (per brand rule v2).

### Phase 2 — Re-skin PositioningPage with the new kit

| Current | After |
|---|---|
| `PageBanner` + `HeroChipRow` | `ChapterBanner` with split layout: left = title + chip row, right = `InstrumentPanel` showing live "Brand telemetry" (5 values, 5 principles, 5 industries counters as readouts, with a waveform under) |
| `DotEyebrowHeader` (5 instances) | `SectionEyebrow` + `SectionTitle` pair — drop the numeric tag, the `SectionDivider label="01.x"` between sections already carries the chapter number |
| `FoundationStats` (light card) | `DarkProofGrid` on an obsidian band so it sits visually under the Foundation prose (matches the homepage's hero-proof rhythm) |
| `ValueOperatingRules` (5-up gap-px grid) | Keep grid but adopt the `TabbedSwitcher` chrome: full-width bordered cells, mono `01–05` numerals, hover background, green underline on hover row |
| `DesignPrinciples` (obsidian panel) | Wrap in `InstrumentPanel` — gains the LIVE/title bar header, hairline rules, and a faint waveform watermark across the bottom |
| `IndustriesICP` (5 thumbs) | Convert to actual `TabbedSwitcher` — five industry tabs, active tab reveals a two-column body (left: `IndustryThumb` + headline + ICP slots, right: outcome chips) |
| `OperatorQuoteCard` | Replace the placeholder metric blocks with `OutcomeChip` components for visual consistency |
| `ApplyFoundationCTA` | Re-skin with a small `InstrumentPanel` on the right showing "Next: 02 Voice / 03 Logo" as live readouts |

`PositioningPage.tsx` stays the same orchestration — only the components inside swap. Foundation/ValueOperatingRules/DesignPrinciples/IndustriesICP get their headers and chrome replaced; their data and copy don't change.

### Phase 3 — Roadmap (not built in this PR)

Once the kit is proven on 01 Brand Position, the same primitives roll into:
- 02 Voice — `SectionEyebrow` + `InstrumentPanel` wrapping the lexicon/rewrite tables
- 03 Logo & 04 Typography — `ChapterBanner` + `DarkProofGrid` for the scale numbers
- 05 Color — `TabbedSwitcher` for the role-based palette grouping
- 09 Tools — already has telemetry chrome; align to the new primitives

I'll list this as future work, not implement it in this round.

### Constraints honored

- No new colors; green stays the only saturated hue.
- Chamfers only on `InstrumentPanel`, `ChapterBanner`, `DarkProofGrid` (large surfaces).
- No glassmorphism; obsidian + hairlines only.
- All-caps reserved for JetBrains Mono data labels — never on Instrument Sans body.
- Telemetry chrome (`TelemetryEyebrow`, `DataWatermark`, `CornerBrackets`) stays banned on 01 — the `InstrumentPanel` is the chapter's evidence anchor instead.

### Open question (not blocking)

The hero-right `InstrumentPanel` on Brand Position could either show **abstract brand telemetry** (5 values counter, 5 principles, etc.) or **real product telemetry** (a paused SDM ECO readout). I'll default to abstract brand telemetry so it reads as a meta-statement about the brand system itself; flag in the closing message if you'd prefer the product readout.
