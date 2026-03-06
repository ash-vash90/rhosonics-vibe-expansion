

## Plan: R&D Newsletter Email Template Page

### What we're building
A new `/newsletter` route with a page that renders the February 2026 R&D Newsletter as a polished, email-ready HTML template. This gives you a visual preview of exactly how the email should look when sent.

### Content structure (from the PDF)
The newsletter contains these sections:
1. **Header** — "R&D Newsletter — February 2026" with intro paragraph
2. **Samsung Accuracy Push** — ±0.4% → ±0.04% H2O2 story
3. **Reducing Production Risks** — MUA3 boards testing
4. **Massflow** — PLC integration, Cross Meter interface
5. **New Initiatives** — Oyster Project, Unified Sensor Design, Conductivity sensor
6. **Honest Challenges** — Test engineer hire, titration equipment
7. **What's Coming in March** — Samsung field testing, aMPC, Respect the Flow
8. **Closing** — Team acknowledgment

### Implementation

1. **Create `src/pages/Newsletter.tsx`**
   - Single-column email template layout (max-width ~600px, centered)
   - White background with Rhosonics brand colors (green `#33993C`, obsidian `#111522`)
   - Sections separated by subtle dividers
   - Uses the project's font classes (`font-ui`, `font-data`)
   - Each major heading styled as a bold section header with a green left border accent
   - Key stats (±0.04%, 10×, 40 boards) highlighted in green metric callouts
   - Footer with "Reach out to Stefan" CTA

2. **Add route in `src/App.tsx`**
   - Add `/newsletter` route pointing to the new page

### Design approach
- Styled to look like a real email template (inline-style-friendly structure)
- Uses the existing Rhosonics brand system (colors, typography, spacing)
- Clean, professional, scannable layout appropriate for internal company communication

