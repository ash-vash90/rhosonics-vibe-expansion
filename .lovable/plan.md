

# Logo Update: Add Wave Propagation Point

## Overview
Update all versions of the Rhosonics logo to include a wave propagation point (a small filled circle in the bottom-right corner) that serves as the visual origin from which the wave arcs emanate.

## Visual Change
The reference image shows a small dot/circle at coordinates approximately (80, 80) - the bottom-right corner of the viewBox - representing the source point of the wave propagation.

```text
Current:                    Updated:
    ╱╲                         ╱╲
   ╱  ╲                       ╱  ╲
  ╱    ╲                     ╱    ╲
 ╱      ╲                   ╱      ╲
╱        ╲                 ╱        ●  ← propagation point
```

## Files to Modify

### 1. `src/components/RhosonicsLogo.tsx`
Add a filled circle element after the three arc paths:
- Position: centered at (80, 80) with slight offset to fit within viewBox
- Size: approximately 8-10px diameter (proportional to 80x80 viewBox)
- Fill: same gradient as arcs (brand gradient, white, or dark variant)

### 2. `src/components/AnimatedLogo.tsx`
Add the propagation point with animation support:
- Add a ref for the circle element
- Include in the wave animation sequence (animate first, before arcs)
- Apply same gradient fill as arcs
- For `withGlow` variant, the dot should pulse/glow as the origin of energy

### 3. `src/lib/logoExport.ts`
Update the `ARC_PATHS` array or add a separate constant for the propagation point:
- Add circle SVG element to all export functions (`generateLockupSVG`, `generateVerticalLockupSVG`, `generateIconOnlySVG`)
- Ensure consistent positioning across all layouts

## Technical Details

### Propagation Point Geometry
- **Circle center**: (73, 73) - slightly inset from corner to not clip at edge
- **Radius**: 7px (creates ~14px diameter, optically balanced with arc stroke widths)
- **ViewBox**: remains 0 0 80 80 (no change needed)

### Animation Sequence (AnimatedLogo)
1. Propagation point appears first (scale from 0 + fade in)
2. Arc 1 (innermost) emanates from point
3. Arc 2 (middle) follows
4. Arc 3 (outermost) completes the wave
5. With glow: point maintains subtle pulse after wave completes

### Color Consistency
All variants will apply the same fill logic:
- `gradient`: brand gradient (`#73B82E` to `#33993c`)
- `white`: white gradient
- `dark`: brand gradient (same as default)

## What Stays the Same
- All existing animations (wave propagation, glow effects, scale/opacity transitions)
- Color schemes and gradient definitions
- ViewBox dimensions (80x80)
- Component API and props
- Logo ratios and positioning in layouts (140% hero, 150% UI)

