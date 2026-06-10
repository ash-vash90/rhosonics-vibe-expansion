# Brand System — Definitive Structure (approved 2026-06-10)

Synthesised from Bang & Olufsen, IBM Design Language, Herman Miller and Klarna. Goal: a public-credential brand book that reads as a precision-instrument spec, not a marketing deck.

## Canonical IA (10 chapters + Tools appendix)

```
00  Introduction                                /
01  Brand Position                              /position
02  Voice & Tone                                /voice
03  Logo                                        /logo
04  Color                                       /color
05  Typography                                  /typography
06  Iconography                                 /iconography
07  Imagery                                     /imagery
08  Data Visualization                          /data-viz
09  Applications & Proof   /applications · /proof   (09.A · 09.B)
10  Resources                                   /resources
APP Tools                                       /tools
```

## Per-chapter required primitives

Every chapter ends with:
- **Decision Questions** — Socratic governance (IBM). 3–5 testable questions.
- **Additional Don'ts** — catch-all rules (HM). Short, numeric, testable.
- **SectionCrossLink** — two related chapters.
- **TelemetryFooter** — Section · Scope · Owner · Status.

## Phase 2A — Structural skeleton ✅ DONE

Routes, redirects, kill list, voice primitives, tools consolidation.

## Phase 2B — Content authorship ✅ DONE

- Chapter numbers aligned to IA (Logo 03, Imagery 07, Proof 09.B).
- HomePage rebuilt around 10-chapter directory.
- Decision Questions + Additional Don'ts added to every remaining chapter (03, 04, 05, 07, 09.A, 09.B).
- Imagery proportion ratios codified (IMG.A 40 · IMG.B 30 · IMG.C 20 · IMG.D 10).
- Logo duplication removed (IconGuidelines now only lives in /iconography).
- Proof duplication removed (ResourceLibraryGrid now only lives in /resources).
- DataViz, Voice, Resources, Iconography authored in 2A; remain authoritative.

## Phase 2C — Planning checkpoint (next, BEFORE Phase 3)

Decide before any visual pass:
1. **Section variant rhythm** — confirm the default → tinted → default cadence is the rule across every chapter, no exceptions.
2. **Hero treatment** — does every chapter open with PageBanner only, or do select chapters keep an embedded primitive (Proof has ImpactFirstHero)?
3. **Telemetry chrome budget** — TelemetryEyebrow allowed where; DataWatermark and CornerBrackets restricted to which surfaces.
4. **Density target** — desktop reading width, max chars per measure, vertical rhythm baseline.
5. **Motion budget** — keep MotionDesign as a referenced component or fold its rules into Voice/Imagery as needed.
6. **Component pruning** — final pass on surviving components vs. what 2A/2B actually use.
7. **Public-credential framing** — Introduction copy that names the audience (engineers, partners, prospects) and the contract (what they can do with the system).

## Phase 3 — Visual pass

After 2C is resolved.

## Kill list executed in 2A (reference)

Pages: ReviewPage, SocialMediaPage, AboutPage, PrinciplesPage, VisualSystemPage.
Components: AboutThisSystem, AboutSystemRefreshed, PatternsShowcase, BeforeAfterSlider, CursorFollower, HeroParticles, SectionRhythmGuide, HeroTypeScaleAudit, ChapterProgress, QuickNav, SectionBridge, StickySubNav.

Single nav system retained: left rail (Navigation) + ⌘K (CommandPalette).

## Tools chapter scope (per user)

PhotoTreatmentTool · IconPicker · ExportSection · DownloadableAssets · design-token exports · logo file downloads.
