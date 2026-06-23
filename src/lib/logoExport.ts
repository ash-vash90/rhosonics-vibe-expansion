// Logo SVG generation and export utilities
// The wordmark is rendered with the real Primetime font, embedded as a
// base64 @font-face inside the SVG so canvas/PNG export renders true glyphs.

// Brand gradient colors
const GRADIENT_START = "#7DC42E";
const GRADIENT_MID = "#4CAF50";
const GRADIENT_END = "#2D8636";
const OBSIDIAN_START = "#1e293b";
const OBSIDIAN_END = "#0f172a";

// Wave paths for the logo icon (3 waves, viewBox 0 0 80 80)
const WAVE_PATHS = [
  "M 80 80 L 80 61 A 19 19 0 0 0 61 80 L 80 80 Z",
  "M 80 47 L 80 30 A 50 50 0 0 0 30 80 L 47 80 A 33 33 0 0 1 80 47 Z",
  "M 80 15 L 80 0 A 80 80 0 0 0 0 80 L 15 80 A 65 65 0 0 1 80 15 Z",
];

const WORDMARK_TEXT = "RHOSONICS";
const FONT_FAMILY = "Primetime";
const FONT_URL = "/fonts/primetime-light.woff2";
// Empirically: Primetime cap-height is ~0.70 of font-size
const CAP_HEIGHT_RATIO = 0.70;

// ---- Font embedding ----------------------------------------------------

let cachedFontDataUrl: string | null = null;
let cachedFontPromise: Promise<string> | null = null;

const fetchFontAsDataUrl = async (): Promise<string> => {
  if (cachedFontDataUrl) return cachedFontDataUrl;
  if (cachedFontPromise) return cachedFontPromise;
  cachedFontPromise = (async () => {
    const res = await fetch(FONT_URL);
    const buf = await res.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    cachedFontDataUrl = `data:font/woff2;base64,${b64}`;
    return cachedFontDataUrl;
  })();
  return cachedFontPromise;
};

const buildFontFaceStyle = (fontDataUrl: string) =>
  `<style type="text/css"><![CDATA[
    @font-face {
      font-family: '${FONT_FAMILY}';
      font-style: normal;
      font-weight: 300;
      src: url('${fontDataUrl}') format('woff2');
    }
  ]]></style>`;

// Measure wordmark width by inserting a temporary off-screen SVG and reading
// getBBox. Requires the Primetime font to be loaded in the document, which
// index.css already ensures.
const measureWordmark = async (fontSize: number): Promise<number> => {
  // Ensure the font is loaded in the page before measuring.
  if ((document as Document & { fonts?: FontFaceSet }).fonts) {
    try {
      await (document as Document & { fonts: FontFaceSet }).fonts.load(`300 ${fontSize}px ${FONT_FAMILY}`);
    } catch {
      /* ignore */
    }
  }
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("style", "position:absolute;left:-9999px;top:-9999px;visibility:hidden");
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("font-family", FONT_FAMILY);
  text.setAttribute("font-weight", "300");
  text.setAttribute("font-size", String(fontSize));
  text.textContent = WORDMARK_TEXT;
  svg.appendChild(text);
  document.body.appendChild(svg);
  const width = text.getBBox().width;
  document.body.removeChild(svg);
  return width;
};

// ---- Variant definitions -----------------------------------------------

export type LogoLayout = "horizontal" | "vertical" | "icon-only";

export interface LogoVariant {
  id: string;
  name: string;
  description: string;
  iconFill: string | "gradient" | "white";
  textColor: string;
  background?: string;
  backgroundType?: "primary" | "obsidian" | "white";
  hasText: boolean;
  layout: LogoLayout;
}

export const logoVariants: LogoVariant[] = [
  { id: "gradient-dark-text", name: "Gradient + Dark Text", description: "Primary lockup for light backgrounds", iconFill: "gradient", textColor: "#1e293b", hasText: true, layout: "horizontal" },
  { id: "gradient-white-text", name: "Gradient + White Text", description: "For dark backgrounds", iconFill: "gradient", textColor: "#ffffff", hasText: true, layout: "horizontal" },
  { id: "white-white-text", name: "White + White Text", description: "Monochrome for brand backgrounds", iconFill: "white", textColor: "#ffffff", hasText: true, layout: "horizontal" },
  { id: "vertical-gradient-dark", name: "Stacked Gradient + Dark", description: "Vertical lockup for light backgrounds", iconFill: "gradient", textColor: "#1e293b", hasText: true, layout: "vertical" },
  { id: "vertical-gradient-white", name: "Stacked Gradient + White", description: "Vertical lockup for dark backgrounds", iconFill: "gradient", textColor: "#ffffff", hasText: true, layout: "vertical" },
  { id: "vertical-white-white", name: "Stacked White + White", description: "Vertical monochrome for brand", iconFill: "white", textColor: "#ffffff", hasText: true, layout: "vertical" },
  { id: "gradient-icon-only", name: "Gradient Icon", description: "Icon mark only, transparent", iconFill: "gradient", textColor: "", hasText: false, layout: "icon-only" },
  { id: "gradient-icon-white-bg", name: "Gradient Icon on White", description: "Icon on white background", iconFill: "gradient", textColor: "", background: "#ffffff", backgroundType: "white", hasText: false, layout: "icon-only" },
  { id: "white-icon-only", name: "White Icon", description: "White mark, transparent", iconFill: "white", textColor: "", hasText: false, layout: "icon-only" },
  { id: "white-icon-primary-bg", name: "White Icon on Primary", description: "For brand applications", iconFill: "white", textColor: "", background: `linear-gradient(135deg, ${GRADIENT_START}, ${GRADIENT_END})`, backgroundType: "primary", hasText: false, layout: "icon-only" },
  { id: "white-icon-obsidian-bg", name: "White Icon on Obsidian", description: "Premium dark applications", iconFill: "white", textColor: "", background: `linear-gradient(135deg, ${OBSIDIAN_START}, ${OBSIDIAN_END})`, backgroundType: "obsidian", hasText: false, layout: "icon-only" },
];

// ---- SVG building helpers ----------------------------------------------

const iconGradientDef = (variant: LogoVariant, gradId: string): string => {
  if (variant.iconFill === "gradient") {
    return `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GRADIENT_START}"/>
      <stop offset="50%" stop-color="${GRADIENT_MID}"/>
      <stop offset="100%" stop-color="${GRADIENT_END}"/>
    </linearGradient>`;
  }
  if (variant.iconFill === "white") {
    return `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>`;
  }
  return "";
};

const backgroundDefAndRect = (variant: LogoVariant, w: number, h: number, radius: number) => {
  if (!variant.background) return { def: "", rect: "" };
  const bgId = `bg-${variant.id}`;
  if (variant.backgroundType === "primary") {
    return {
      def: `<linearGradient id="${bgId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`,
      rect: `<rect width="${w}" height="${h}" fill="url(#${bgId})" rx="${radius}"/>`,
    };
  }
  if (variant.backgroundType === "obsidian") {
    return {
      def: `<linearGradient id="${bgId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`,
      rect: `<rect width="${w}" height="${h}" fill="url(#${bgId})" rx="${radius}"/>`,
    };
  }
  if (variant.backgroundType === "white") {
    return { def: "", rect: `<rect width="${w}" height="${h}" fill="#ffffff" rx="${radius}"/>` };
  }
  return { def: "", rect: "" };
};

// ---- Public SVG generators (async because fonts must be embedded) -------

export const generateLockupSVG = async (variant: LogoVariant): Promise<string> => {
  const iconSize = 80;
  const capHeight = 55;
  const fontSize = capHeight / CAP_HEIGHT_RATIO; // ~78.6
  const gap = 20;
  const padding = variant.background ? 32 : 16;

  const fontDataUrl = variant.hasText ? await fetchFontAsDataUrl() : "";
  const wordmarkWidth = variant.hasText ? await measureWordmark(fontSize) : 0;

  const totalWidth = iconSize + (variant.hasText ? gap + wordmarkWidth : 0) + padding * 2;
  const totalHeight = iconSize + padding * 2;

  const gradId = `grad-${variant.id}`;
  const iconGrad = iconGradientDef(variant, gradId);
  const bg = backgroundDefAndRect(variant, totalWidth, totalHeight, 8);
  const fontFace = variant.hasText ? buildFontFaceStyle(fontDataUrl) : "";
  const iconFill = `url(#${gradId})`;

  const iconGroup = `<g transform="translate(${padding}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${iconFill}"/>`).join("\n    ")}
  </g>`;

  // Vertically center the cap-height block with the icon
  const textX = padding + iconSize + gap;
  const textY = padding + (iconSize - capHeight) / 2 + capHeight;
  const textGroup = variant.hasText
    ? `<text x="${textX}" y="${textY}" font-family="${FONT_FAMILY}, sans-serif" font-weight="300" font-size="${fontSize}" fill="${variant.textColor}">${WORDMARK_TEXT}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <defs>
    ${fontFace}
    ${iconGrad}
    ${bg.def}
  </defs>
  ${bg.rect}
  ${iconGroup}
  ${textGroup}
</svg>`;
};

export const generateVerticalLockupSVG = async (variant: LogoVariant): Promise<string> => {
  const iconSize = 80;
  const capHeight = 32;
  const fontSize = capHeight / CAP_HEIGHT_RATIO; // ~45.7
  const gap = 20;
  const padding = variant.background ? 32 : 16;

  const fontDataUrl = variant.hasText ? await fetchFontAsDataUrl() : "";
  const wordmarkWidth = variant.hasText ? await measureWordmark(fontSize) : 0;

  const blockWidth = Math.max(iconSize, wordmarkWidth);
  const totalWidth = blockWidth + padding * 2;
  const totalHeight = iconSize + gap + capHeight + padding * 2;

  const gradId = `grad-${variant.id}`;
  const iconGrad = iconGradientDef(variant, gradId);
  const bg = backgroundDefAndRect(variant, totalWidth, totalHeight, 8);
  const fontFace = variant.hasText ? buildFontFaceStyle(fontDataUrl) : "";
  const iconFill = `url(#${gradId})`;

  const iconX = padding + (blockWidth - iconSize) / 2;
  const iconGroup = `<g transform="translate(${iconX}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${iconFill}"/>`).join("\n    ")}
  </g>`;

  const textX = padding + blockWidth / 2;
  const textY = padding + iconSize + gap + capHeight;
  const textGroup = variant.hasText
    ? `<text x="${textX}" y="${textY}" text-anchor="middle" font-family="${FONT_FAMILY}, sans-serif" font-weight="300" font-size="${fontSize}" fill="${variant.textColor}">${WORDMARK_TEXT}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <defs>
    ${fontFace}
    ${iconGrad}
    ${bg.def}
  </defs>
  ${bg.rect}
  ${iconGroup}
  ${textGroup}
</svg>`;
};

export const generateIconOnlySVG = async (variant: LogoVariant): Promise<string> => {
  const iconSize = 80;
  const padding = variant.background ? 24 : 0;
  const totalSize = iconSize + padding * 2;

  const gradId = `grad-${variant.id}`;
  const iconGrad = iconGradientDef(variant, gradId);
  const bg = backgroundDefAndRect(variant, totalSize, totalSize, 12);
  const fill = `url(#${gradId})`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="${totalSize}" height="${totalSize}">
  <defs>
    ${iconGrad}
    ${bg.def}
  </defs>
  ${bg.rect}
  <g transform="translate(${padding}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${fill}"/>`).join("\n    ")}
  </g>
</svg>`;
};

// ---- Download helpers ---------------------------------------------------

export const downloadSVG = (svg: string, filename: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadPNG = async (svg: string, filename: string, scale = 2) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    // Decode as UTF-8 data URI so embedded base64 fonts survive intact.
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Could not get canvas context")); return; }
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error("Could not create blob")); return; }
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${filename}@${scale}x.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        resolve();
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = dataUrl;
  });
};
