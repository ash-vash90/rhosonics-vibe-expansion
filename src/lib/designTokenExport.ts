/**
 * Design Token Export Utilities
 * 
 * Generates brand tokens in multiple formats:
 * - Tokens Studio JSON (for Figma plugin)
 * - Style Dictionary JSON (for multi-platform pipelines)
 * - Figma-ready SVG asset pack (zipped)
 */

// ═══════════════════════════════════════════════════════════════
// BRAND TOKEN SOURCE OF TRUTH
// ═══════════════════════════════════════════════════════════════

import { colorToken, colorValues, contrastRatio, type ColorToken } from './brandTokens';

const BRAND_COLORS = {
  green: { ...colorToken('rho-green'), description: 'Primary brand green' },
  lime: { ...colorToken('rho-green-accent'), description: 'Gradient accent' },
  obsidian: { ...colorToken('rho-obsidian'), description: 'Dark foundation' },
  white: { ...colorToken('white'), description: 'Light foreground' },
};
const scale = (prefix: string) => Object.fromEntries(Object.keys(colorValues)
  .filter(key => key.startsWith(prefix + '-'))
  .map(key => [key.slice(prefix.length + 1), colorToken(key as ColorToken)]));
const PRIMARY_SCALE = scale('primary');
const SLATE_SCALE = scale('slate');
const MINERAL_COLORS = Object.fromEntries(Object.entries(scale('mineral')).map(([key, value]) => [key, { ...value, description: 'Field context' }]));
const STATE_COLORS = Object.fromEntries(['info', 'warning', 'success', 'error'].map(key => [key, colorToken(key as ColorToken)]));
const ALL_COLORS = Object.fromEntries(Object.keys(colorValues).map(key => [key, colorToken(key as ColorToken)]));

const TYPOGRAPHY = {
  logo: {
    primary: { family: "Primetime", weight: 300, fallback: "sans-serif", role: "Logo wordmark" },
    alternate: { family: "Unbounded", weight: 600, fallback: "sans-serif", role: "Logo alternate" },
  },
  body: {
    primary: { family: "Instrument Sans", weights: [400, 500, 600, 700], fallback: "sans-serif", role: "UI / body text" },
    alternate: { family: "Work Sans", weights: [400, 500, 600, 700], fallback: "sans-serif", role: "Body alternate (90% scale)" },
  },
  data: {
    primary: { family: "JetBrains Mono", weight: 500, fallback: "monospace", role: "Data / technical readout" },
  },
} as const;

const SPACING = {
  "0": "0px",
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
  "20": "80px",
  "24": "96px",
} as const;

const RADII = {
  none: "0",
  sm: "0.125rem",
  default: "0.375rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

// ═══════════════════════════════════════════════════════════════
// TOKENS STUDIO FORMAT (Figma Plugin)
// ═══════════════════════════════════════════════════════════════

export function buildTokensStudioJSON(): string {
  const tokens = {
    "Rhosonics/Brand": {
      color: {
        tokens: Object.fromEntries(Object.entries(ALL_COLORS).map(([key, value]) => [key, { value: value.hex, type: "color" }])),
        brand: {
          green: { value: BRAND_COLORS.green.hex, type: "color", description: BRAND_COLORS.green.description },
          lime: { value: BRAND_COLORS.lime.hex, type: "color", description: BRAND_COLORS.lime.description },
          obsidian: { value: BRAND_COLORS.obsidian.hex, type: "color", description: BRAND_COLORS.obsidian.description },
        },
        primary: Object.fromEntries(
          Object.entries(PRIMARY_SCALE).map(([k, v]) => [k, { value: v.hex, type: "color" }])
        ),
        slate: Object.fromEntries(
          Object.entries(SLATE_SCALE).map(([k, v]) => [k, { value: v.hex, type: "color" }])
        ),
        mineral: Object.fromEntries(
          Object.entries(MINERAL_COLORS).map(([k, v]) => [k, { value: v.hex, type: "color", description: v.description }])
        ),
        state: Object.fromEntries(
          Object.entries(STATE_COLORS).map(([k, v]) => [k, { value: v.hex, type: "color" }])
        ),
        semantic: {
          background: { value: "{color.slate.50}", type: "color" },
          foreground: { value: "{color.brand.obsidian}", type: "color" },
          primary: { value: "{color.brand.green}", type: "color" },
          action: { value: "{color.tokens.action}", type: "color" },
          "action-hover": { value: "{color.tokens.action-hover}", type: "color" },
          "primary-foreground": { value: "#FFFFFF", type: "color" },
          muted: { value: "{color.slate.100}", type: "color" },
          "muted-foreground": { value: "{color.slate.600}", type: "color" },
          border: { value: "{color.slate.200}", type: "color" },
        },
      },
      fontFamilies: {
        logo: { value: TYPOGRAPHY.logo.primary.family, type: "fontFamilies" },
        "logo-alt": { value: TYPOGRAPHY.logo.alternate.family, type: "fontFamilies" },
        ui: { value: TYPOGRAPHY.body.primary.family, type: "fontFamilies" },
        "ui-alt": { value: TYPOGRAPHY.body.alternate.family, type: "fontFamilies" },
        data: { value: TYPOGRAPHY.data.primary.family, type: "fontFamilies" },
      },
      fontWeights: {
        regular: { value: "400", type: "fontWeights" },
        medium: { value: "500", type: "fontWeights" },
        semibold: { value: "600", type: "fontWeights" },
        bold: { value: "700", type: "fontWeights" },
      },
      spacing: Object.fromEntries(
        Object.entries(SPACING).map(([k, v]) => [k, { value: v, type: "spacing" }])
      ),
      borderRadius: Object.fromEntries(
        Object.entries(RADII).map(([k, v]) => [k, { value: v, type: "borderRadius" }])
      ),
    },
    "$themes": [
      { id: "light", name: "Rhosonics Light", selectedTokenSets: { "Rhosonics/Brand": "enabled" } },
    ],
    "$metadata": {
      tokenSetOrder: ["Rhosonics/Brand"],
    },
  };

  return JSON.stringify(tokens, null, 2);
}

// ═══════════════════════════════════════════════════════════════
// STYLE DICTIONARY FORMAT
// ═══════════════════════════════════════════════════════════════

export function buildStyleDictionaryJSON(): string {
  const dictionary = {
    color: {
        tokens: Object.fromEntries(Object.entries(ALL_COLORS).map(([key, value]) => [key, { value: value.hex, type: "color" }])),
      brand: {
        green: { value: BRAND_COLORS.green.hex, comment: BRAND_COLORS.green.description },
        lime: { value: BRAND_COLORS.lime.hex, comment: BRAND_COLORS.lime.description },
        obsidian: { value: BRAND_COLORS.obsidian.hex, comment: BRAND_COLORS.obsidian.description },
      },
      primary: Object.fromEntries(
        Object.entries(PRIMARY_SCALE).map(([k, v]) => [k, { value: v.hex }])
      ),
      slate: Object.fromEntries(
        Object.entries(SLATE_SCALE).map(([k, v]) => [k, { value: v.hex }])
      ),
      mineral: Object.fromEntries(
        Object.entries(MINERAL_COLORS).map(([k, v]) => [k, { value: v.hex, comment: v.description }])
      ),
      state: Object.fromEntries(
        Object.entries(STATE_COLORS).map(([k, v]) => [k, { value: v.hex }])
      ),
    },
    font: {
      family: {
        logo: { value: TYPOGRAPHY.logo.primary.family, comment: TYPOGRAPHY.logo.primary.role },
        "logo-alt": { value: TYPOGRAPHY.logo.alternate.family, comment: TYPOGRAPHY.logo.alternate.role },
        ui: { value: TYPOGRAPHY.body.primary.family, comment: TYPOGRAPHY.body.primary.role },
        "ui-alt": { value: TYPOGRAPHY.body.alternate.family, comment: TYPOGRAPHY.body.alternate.role },
        data: { value: TYPOGRAPHY.data.primary.family, comment: TYPOGRAPHY.data.primary.role },
      },
    },
    size: {
      spacing: Object.fromEntries(
        Object.entries(SPACING).map(([k, v]) => [k, { value: v }])
      ),
      radius: Object.fromEntries(
        Object.entries(RADII).map(([k, v]) => [k, { value: v }])
      ),
    },
  };

  return JSON.stringify(dictionary, null, 2);
}

// ═══════════════════════════════════════════════════════════════
// FIGMA ASSET PACK (Color swatches + type specimens as SVGs)
// ═══════════════════════════════════════════════════════════════

function buildColorSwatchSVG(): string {
  const swatches = [
    { label: "Green", hex: BRAND_COLORS.green.hex, hsl: BRAND_COLORS.green.hsl },
    { label: "Lime", hex: BRAND_COLORS.lime.hex, hsl: BRAND_COLORS.lime.hsl },
    { label: "Obsidian", hex: BRAND_COLORS.obsidian.hex, hsl: BRAND_COLORS.obsidian.hsl },
    ...Object.entries(PRIMARY_SCALE).map(([k, v]) => ({ label: `Primary ${k}`, hex: v.hex, hsl: v.hsl })),
    ...Object.entries(MINERAL_COLORS).map(([k, v]) => ({ label: `Mineral ${k}`, hex: v.hex, hsl: v.hsl })),
  ];

  const cols = 5;
  const cellW = 160;
  const cellH = 120;
  const gap = 16;
  const rows = Math.ceil(swatches.length / cols);
  const width = cols * (cellW + gap) - gap + 80;
  const height = rows * (cellH + gap) - gap + 120;

  const cells = swatches.map((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 40 + col * (cellW + gap);
    const y = 80 + row * (cellH + gap);
    const textColor = contrastRatio(s.hex, BRAND_COLORS.obsidian.hex) >= 4.5 ? BRAND_COLORS.obsidian.hex : BRAND_COLORS.white.hex;
    return `<g>
      <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="8" fill="${s.hex}" stroke="#E2E5E9" stroke-width="1"/>
      <text x="${x + 12}" y="${y + cellH - 32}" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="${textColor}">${s.label}</text>
      <text x="${x + 12}" y="${y + cellH - 16}" font-family="monospace" font-size="10" fill="${textColor}">${s.hex}</text>
    </g>`;
  }).join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <text x="40" y="48" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#14171F">Rhosonics Color Palette</text>
  ${cells}
</svg>`;
}

function buildTypographySpecimenSVG(): string {
  const width = 800;
  const height = 520;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#FFFFFF"/>
  <text x="40" y="52" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#14171F">Rhosonics Typography</text>
  
  <text x="40" y="100" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#4E5562" letter-spacing="2">LOGO</text>
  <text x="40" y="140" font-family="sans-serif" font-size="36" font-weight="300" fill="#14171F">Primetime — RHOSONICS</text>
  <text x="40" y="168" font-family="monospace" font-size="11" fill="#5E6573">font-weight: 300 · Role: Logo wordmark</text>
  
  <text x="40" y="216" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#4E5562" letter-spacing="2">UI / BODY</text>
  <text x="40" y="252" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="#14171F">Instrument Sans — The quick brown fox</text>
  <text x="40" y="278" font-family="monospace" font-size="11" fill="#5E6573">weights: 400, 500, 600, 700 · Role: UI / body text</text>
  
  <text x="40" y="326" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#4E5562" letter-spacing="2">DATA</text>
  <text x="40" y="362" font-family="monospace" font-size="24" font-weight="500" fill="#14171F">JetBrains Mono — 0123456789</text>
  <text x="40" y="388" font-family="monospace" font-size="11" fill="#5E6573">weight: 500 · Role: Data / technical readout</text>

  <text x="40" y="436" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#4E5562" letter-spacing="2">ALTERNATES</text>
  <text x="40" y="468" font-family="sans-serif" font-size="20" font-weight="600" fill="#14171F">Unbounded (Logo alt) · Work Sans (Body alt, 90% scale)</text>
  <text x="40" y="494" font-family="monospace" font-size="11" fill="#5E6573">Use FontSelector in guidelines to preview alternates</text>
</svg>`;
}

// ═══════════════════════════════════════════════════════════════
// DOWNLOAD HELPERS
// ═══════════════════════════════════════════════════════════════

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadTokensStudioJSON() {
  downloadFile(buildTokensStudioJSON(), "rhosonics-tokens-studio.json", "application/json");
}

export function downloadStyleDictionaryJSON() {
  downloadFile(buildStyleDictionaryJSON(), "rhosonics-style-dictionary.json", "application/json");
}

export function downloadColorSwatchSVG() {
  downloadFile(buildColorSwatchSVG(), "rhosonics-color-swatches.svg", "image/svg+xml");
}

export function downloadTypographySpecimenSVG() {
  downloadFile(buildTypographySpecimenSVG(), "rhosonics-typography-specimen.svg", "image/svg+xml");
}

export async function downloadFigmaAssetPack() {
  const files = [
    { name: "rhosonics-color-swatches.svg", content: buildColorSwatchSVG() },
    { name: "rhosonics-typography-specimen.svg", content: buildTypographySpecimenSVG() },
    { name: "rhosonics-tokens-studio.json", content: buildTokensStudioJSON() },
    { name: "rhosonics-style-dictionary.json", content: buildStyleDictionaryJSON() },
    { name: "README.md", content: ASSET_PACK_README },
  ];

  // Without a zip library, download each file individually
  for (const file of files) {
    const mimeType = file.name.endsWith(".svg") ? "image/svg+xml" :
                     file.name.endsWith(".json") ? "application/json" : "text/markdown";
    downloadFile(file.content, file.name, mimeType);
    // Small delay between downloads to avoid browser blocking
    await new Promise(r => setTimeout(r, 200));
  }
}

const ASSET_PACK_README = `# Rhosonics Figma Asset Pack

## Contents

- \`rhosonics-tokens-studio.json\` — Import via **Tokens Studio for Figma** plugin
- \`rhosonics-style-dictionary.json\` — Use with Style Dictionary CLI for multi-platform output
- \`rhosonics-color-swatches.svg\` — Drag into Figma as a reference frame
- \`rhosonics-typography-specimen.svg\` — Type specimens for reference

## Tokens Studio Setup

1. Install the **Tokens Studio for Figma** plugin
2. Open plugin → Settings → Add new → Local storage
3. Import \`rhosonics-tokens-studio.json\`
4. Apply token set "Rhosonics/Brand" to your file

## Style Dictionary Setup

\`\`\`bash
npx style-dictionary build --config sd.config.json
\`\`\`

Create \`sd.config.json\`:
\`\`\`json
{
  "source": ["rhosonics-style-dictionary.json"],
  "platforms": {
    "css": { "transformGroup": "css", "buildPath": "build/", "files": [{ "destination": "variables.css", "format": "css/variables" }] },
    "ios": { "transformGroup": "ios-swift", "buildPath": "build/", "files": [{ "destination": "StyleDictionary.swift", "format": "ios-swift/class.swift" }] }
  }
}
\`\`\`
`;
