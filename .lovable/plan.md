

## Fix Primetime Letter Spacing

### Problem
The Primetime wordmark spacing looks off compared to the official logo because:
1. **Hero section**: Each letter of "RHOSONICS" is wrapped in an individual `<span className="inline-block">` for GSAP character animation. `inline-block` elements lose the font's native kerning pairs, making spacing uneven.
2. **CSS base rule**: The Primetime override in `index.css` sets `letter-spacing: 0.02em`, but the actual Primetime font appears to need tighter spacing (closer to `0em` or slightly negative) based on the official logo reference.
3. **Tailwind `tracking-wide` conflicts**: Several components (MasterLockup, Footer, Navigation) apply `tracking-wide` (0.025em) unconditionally, overriding or compounding the CSS setting. These need to be conditional — `tracking-wide` for Unbounded, `tracking-normal` (or tighter) for Primetime.

### Changes

**1. `src/index.css` — Adjust Primetime base letter-spacing**
- Change `letter-spacing: 0.02em` to `letter-spacing: -0.01em` (or `0em`) for the `.logo-primetime .font-logo` rule. We can fine-tune the exact value after seeing the result, but the reference logo shows tight natural spacing.

**2. `src/pages/Index.tsx` — Fix hero wordmark kerning**
- The `inline-block` span-per-character approach breaks kerning. Two options:
  - **Option A**: Remove per-character spans when Primetime is active and animate the whole word instead (simplest, preserves kerning).
  - **Option B**: Keep spans but add manual kerning values per letter pair for Primetime (fragile, not recommended).
- Recommended: Option A — render as a single `<span>` for Primetime, per-character spans only for Unbounded (which has uniform geometric spacing anyway).
- Also: the hero already conditionally applies `tracking-normal` for Primetime, but the CSS base override and `inline-block` issue are the real culprits.

**3. `src/components/brand/MasterLockup.tsx` — Conditional tracking**
- Line 49: `tracking-wide` is hardcoded. Make it conditional: `tracking-wide` for Unbounded, `tracking-normal` for Primetime (import `useFontMode`).

**4. `src/pages/Index.tsx` footer** — Conditional tracking
- Line 702: `tracking-wide` hardcoded on footer lockup wordmark. Same conditional fix.

**5. Other `font-logo` + `tracking-wide` instances**
- Search all components using `font-logo` with `tracking-wide` and make tracking conditional on the active logo font. Key files: Navigation.tsx, Newsletter.tsx, any other lockup references.

### Summary
The root cause is twofold: `inline-block` per character kills kerning, and `tracking-wide` / `0.02em` adds spacing that Primetime doesn't need. Fix both, and the wordmark will match the official logo.

