

# Make Photo Treatment Expressive and Image-Aware

## The Problems

1. **Treatment goes the wrong direction** -- the current filter desaturates (saturate 0.6 = 40% less color), making images drab. The goal should be to add vibrancy and brand character, not drain life out.

2. **One-size-fits-all values** -- Both slider instances use identical `desaturation={0.45}` / `contrast={1.2}` / `brightness={0.95}`. A warm mining photo and a cool wastewater photo need very different treatments.

3. **Text doesn't match** -- The surrounding copy says "Desaturated 40-60%" and "Pull warmth out" which reinforces the drab approach. Needs rewriting to reflect the actual brand intent: industrial mood with selective color enhancement.

---

## The Fix

### 1. Rethink the filter approach in BeforeAfterSlider

Replace `saturate(0.6)` (desaturating) with a treatment that:
- **Keeps or slightly boosts saturation** (saturate 1.1-1.3) for richness
- **Shifts hue toward cool tones** via the overlay (already exists, just needs tuning)
- **Adds the green accent more boldly** as the signature brand touch
- **Adjusts contrast per-image** rather than blanket values

Rename the `desaturation` prop to `saturation` to make intent clear (values > 1 = more saturated).

### 2. Per-image treatment presets

Give each BeforeAfterSlider different values tuned to the source image:

| Image | Saturation | Contrast | Brightness | Reasoning |
|-------|-----------|----------|------------|-----------|
| Mining (treatmentBefore) | 1.15 | 1.25 | 0.93 | Warm earth tones -- boost slightly, let contrast create drama |
| Wastewater (fieldWastewater) | 1.05 | 1.15 | 0.96 | Already cool-toned -- gentle touch, preserve blues |

### 3. Strengthen the green accent overlay

- Increase the green radial gradient opacity from 0.22 to ~0.28
- Use `mix-blend-soft-light` instead of `mix-blend-color` for a more natural color grade feel
- Add a subtle vignette (dark edges) for cinematic weight

### 4. Rewrite the treatment descriptions

**Current text (wrong direction):**
- "Desaturated 40-60%"
- "Pull warmth out of earth tones"
- "Reduce saturation by 40-60%"

**New text (correct direction):**
- "Controlled saturation with cool color grade"
- "Shift warmth toward industrial cool tones via overlay"
- "Saturation adjusted per source image (+5% to +15%)"

Update the 4-step process labels:
- Step 01: "Desaturate" becomes **"Color Grade"** -- Adjust saturation per source. Warm images get cooled; cool images get subtle boosting.
- Step 02: "Cool Shift" stays but description updated -- this is where the mood comes from
- Step 03: "Contrast" stays -- dramatic shadows, industrial weight
- Step 04: "Green Accent" becomes **"Brand Accent"** -- Bolder green overlay as signature touch

### 5. Update the spec cards

The three spec tiles at the bottom need new values:
- SATURATION: "+5% to +15%" (was "-40% to -60%")
- CONTRAST: "+15% to +25%" (stays)
- GREEN ACCENT: increase description to note it's more prominent now

---

## Technical Changes

### Files to modify

**`src/components/brand/BeforeAfterSlider.tsx`**
- Rename `desaturation` prop to `saturation` (default 1.1)
- Update filter string to use new saturation values
- Change green overlay to `mix-blend-soft-light` and increase opacity
- Add subtle vignette overlay
- Update the specs indicator text at bottom-right

**`src/components/brand/ImageryGuidelines.tsx`**
- Update both BeforeAfterSlider instances with per-image tuned values
- Rewrite "Raw Capture" vs "Brand Treatment" bullet points
- Rewrite the 4-step Color Grading Process text
- Update the three spec tiles (SATURATION, CONTRAST, GREEN ACCENT)
- Update the descriptive text under the sliders ("Warm earth tones -> desaturated" becomes something like "Warm earth tones -> cool industrial grade")
- Update subtitle text "same settings, consistent results" to "per-image tuning, consistent mood"

