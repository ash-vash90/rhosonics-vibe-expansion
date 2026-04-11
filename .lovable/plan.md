

# Plan: Restructure Brand Guidelines Navigation and Home Page

## Problem
1. Home page shows hero + full AboutPage content below, creating infinite scroll that negates the multi-page architecture
2. Interactive tools (Photo Treatment, Icon Picker, Export/Downloads) are scattered across content sections instead of being grouped logically
3. Some sections don't flow naturally next to each other

## Changes

### 1. Home Page: Hero + Section Directory (no scroll)
**File: `src/App.tsx`** and **`src/components/brand/BrandLayout.tsx`**
- Remove the `index` route pointing to `AboutPage` -- home (`/`) renders only the hero
- Replace the "SCROLL" button with a grid of navigation cards linking to each section (00-11), styled as a branded directory
- The hero becomes a full-viewport landing with section links below it (or overlaid), not a gateway to infinite content

### 2. Create a dedicated Tools & Downloads page
**New file: `src/pages/brand/ToolsPage.tsx`** (route: `/tools`, nav section 12)
- Move **ExportSection** here from Visual System page
- Move **PhotoTreatmentTool** here from Imagery page
- Move **IconPicker** here from Icon Guidelines (keep icon guidelines content, remove the interactive picker)
- Add **DownloadableAssets** / **LogoDownloadButtons** if not already surfaced
- This becomes the "toolbox" page -- all interactive utilities in one place

### 3. Clean up section content after tool removal
- **VisualSystemPage.tsx**: Remove ExportSection, page ends after Elevation & Depth
- **ImageryGuidelines.tsx**: Remove PhotoTreatmentTool and BeforeAfterSlider tool instances; keep the imagery rules and examples
- **IconGuidelines.tsx**: Remove IconPicker component; keep icon usage rules and specifications

### 4. Update Navigation
**File: `src/components/brand/Navigation.tsx`**
- Add section `12 / TOOLS` with route `/tools` and items for each tool
- Reorder if needed to group logically: Story (00-02) -> Visual System (03-06) -> Content (07-08) -> Practice (09-11) -> Tools (12)

### 5. Update App.tsx routes
- Add `<Route path="tools" element={<ToolsPage />} />`
- Change index route to render a new `HomePage` component (hero + directory grid) instead of `AboutPage`

## Files Modified
- `src/components/brand/BrandLayout.tsx` -- hero section gets directory grid instead of scroll CTA
- `src/App.tsx` -- new route for tools, index route change
- `src/pages/brand/ToolsPage.tsx` -- **new** dedicated tools page
- `src/pages/brand/VisualSystemPage.tsx` -- remove ExportSection
- `src/components/brand/ImageryGuidelines.tsx` -- remove PhotoTreatmentTool and interactive sliders
- `src/components/brand/IconGuidelines.tsx` -- remove IconPicker
- `src/components/brand/Navigation.tsx` -- add Tools section, verify grouping

## Technical Notes
- The home directory grid will use the existing nav section data structure to auto-generate cards
- Tools page uses the same lazy-loading pattern as all other pages
- No database or backend changes needed

