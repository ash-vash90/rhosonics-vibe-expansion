## What to update on the site, based on the video

The video tells one factual story that is missing (or wrong) on the site, and reinforces things already covered. I'll only edit where the video adds verifiable substance, not where it's marketing colour.

### Findings

1. **`OriginStory.tsx` is factually wrong and currently orphaned** (not rendered anywhere). It claims Rhosonics started by measuring **beer density** for a local brewer. The video says the company started in 1992 in a small Netherlands workshop building the **Rhosonics Model 8000 ultrasonic process analyzer**. This needs correcting before it ever ships.
2. **`/position` has no heritage chapter.** The video makes 1992 → Model 8000 → today's SDM ECO portfolio a central message. That is a foundation-level fact, not marketing — it belongs in the Brand Position chapter.
3. **Industries section header is stale.** The intro still reads *"Five industries, ten ICP slots…"* — we now show four industries and no ICP role lists. Needs to match the rewritten brief format.
4. **Foundation (Vision, Mission, Values) is already aligned** with the video's message. Per project memory it's canonical and must not be paraphrased. No change.
5. **Industries copy is already aligned** with the video's measurement-focused framing (slurry density, chemical concentrations, mineral/semi/flatpanel/chemicals). No content change needed — only the section intro.
6. **"People, craftsmanship, global service"** is the emotional through-line of the video. Per the *Brand pages ≠ landing pages* rule, /position should not grow a marketing pillar grid for this. Skip on the brand-system page; this content belongs on a future public About page, not here.

### Changes

**1. Rewrite `src/components/brand/OriginStory.tsx`**
   - Drop the beer/brewery story, the `earth-ochre` decoration, the `bg-workshop-grid`, and the hover/colour chrome.
   - Rebuild in the same system-kit voice as `Foundation.tsx`: small sticky label column ("Heritage") + a single restrained statement + a three-step milestone strip.
   - Statement (working draft, evidence-only, no superlatives):
     *"Rhosonics began in 1992 in a small Netherlands workshop, with the **Model 8000** ultrasonic process analyzer. The portfolio has changed — the discipline hasn't: inline ultrasonic measurement on streams that other techniques struggle with."*
   - Milestone strip (three cells, hairline-divided, no decorative icons competing with text):
     - `1992 — Origin` · *Netherlands workshop. First device built by hand.*
     - `Model 8000 — Ultrasonic process analyzer.` *The product the company was founded to build.*
     - `Today — SDM ECO portfolio.* *Slurry density and chemical concentration, deployed worldwide.*
   - Year/labels in JetBrains Mono uppercase (data label rule). All prose in Instrument Sans. No green except a single hairline accent.

**2. Mount it as chapter 01.5 on `src/pages/brand/PositioningPage.tsx`**
   - Insert between Industries and the ApplyFoundationCTA closer.
   - `SectionDivider label="01.5"` → `ScrollSection id="heritage"` (variant: alternate from Industries' `tinted` → default).
   - Add a `SectionHeader2` above it: eyebrow `Heritage · 01.5`, title `Where this started`, intro one line about why heritage matters as positioning (continuity of method, not nostalgia).
   - Lazy-load `OriginStory` like the other sections.

**3. Fix stale Industries intro on `PositioningPage.tsx`**
   - Replace *"Five industries, ten ICP slots. Pick a tab — the active panel shows the operator profile and the outcome shape the brand is built around."*
   - With: *"Four industries, two product lines. Each panel describes the measurement context and where Rhosonics sits in it."*

### Out of scope (deliberately)

- No edits to Foundation, Values, Design Principles, or `brand-values.ts` — already canonical and consistent with the video.
- No new "People / craftsmanship / global service" pillars on /position — that's landing-page content; if you want it, it should land on a public About page (separate task).
- No video embed. You asked to use the content, not the player.

### Technical notes

- `OriginStory.tsx` will be rewritten in full (small file, ~60 lines) to match `Foundation.tsx` patterns (system kit, design tokens, no hardcoded colours, no glassmorphism, no fake industrial chrome).
- `PositioningPage.tsx` gets one new `lazy()` import, one new `SectionDivider`, one new `ScrollSection`, and one one-line copy edit.
- No data layer or schema changes. No new assets.
