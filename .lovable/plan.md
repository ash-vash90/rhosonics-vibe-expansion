# Brand System — Definitive Structure (approved 2026-06-10)

Synthesised from Bang & Olufsen, IBM Design Language, Herman Miller and Klarna. Goal: a public-credential brand book that reads as a precision-instrument spec, not a marketing deck.

## Canonical IA (10 chapters + Tools appendix)

```
00  Introduction         /                — directory, governance, changelog
01  Brand Position       /position        — purpose, principles, audience, what we are / are not
02  Voice & Tone         /voice           — principles, lexicon (use/avoid), before/after rewrites, funnel rule
03  Logo                 /logo            — construction, clearspace, misuse, co-brand, downloads
04  Color                /color           — palette, families, pairings, accessibility
05  Typography           /typography      — roles, scale (UI + data), micro-specs, misuse
06  Iconography          /iconography     — UI icons + pictograms (two-tier, shared DNA)
07  Imagery              /imagery         — photo categories with proportion ratios, technical/cutaway
08  Data Visualization   /data-viz        — billboard.js governance, honesty rules
09  Applications & Proof /applications + /proof — industries, interface kit, case studies, social
10  Resources            /resources       — downloads, contacts, versioning
APP Tools                /tools           — consolidated interactive utilities (kept per user)
```

Old routes (`/about`, `/positioning`, `/principles`, `/visual-system`, `/logo-assets`, `/social-media`, `/review`) redirect to their new home.

## Per-chapter required primitives

Every chapter ends with the same two blocks:

- **Decision Questions** — Socratic governance (IBM). 3–5 questions any execution must answer.
- **Additional Don'ts** — catch-all rules (HM). Short, numeric, testable.

## Phase 2A — Structural skeleton (this commit)

1. Routes renamed, redirects in place, new pages stubbed.
2. Navigation rebuilt around the 10 chapters.
3. CommandPalette entries updated.
4. BrandLayout simplified — CursorFollower and HeroParticles removed.
5. Voice chapter re-enabled with LexiconTable and RewriteTable primitives.
6. Tools chapter consolidates: PhotoTreatmentTool · IconPicker · ExportSection · DownloadableAssets · design-token exports.
7. Kill list executed (see below).

## Phase 2B — Content authorship (next)

- Full Lexicon + Rewrite content authored to the Klarna model.
- Position chapter merged narrative authored.
- DataViz chapter authored with billboard.js examples and honesty rules.
- Resources chapter content authored.
- Photography proportion ratios codified in Imagery.
- Decision Questions and Additional Don'ts populated on every chapter.

## Phase 3 — Visual pass

After structure and content are right.

## Kill list executed in Phase 2A

Pages: `ReviewPage`, `SocialMediaPage`, `AboutPage` (folded into Position).
Components: `AboutThisSystem`, `AboutSystemRefreshed`, `PatternsShowcase`, `BeforeAfterSlider`, `CursorFollower`, `HeroParticles`, `SectionRhythmGuide`, `HeroTypeScaleAudit`, `ChapterProgress`, `QuickNav`, `SectionBridge`, `StickySubNav`.

Single nav system retained: left rail (Navigation) + ⌘K (CommandPalette). All other nav layers removed.

## Tools chapter scope (per user)

All interactive utilities live here:
- Photo Treatment Tool
- Icon Library (picker)
- Color Token + Tailwind exports
- Design Token (Tokens Studio / Style Dictionary) downloads
- HTML / Figma asset-pack export
- Logo file downloads (SVG/PNG variants)
