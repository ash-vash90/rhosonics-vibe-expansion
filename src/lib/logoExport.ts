// Logo SVG generation and export utilities
import { WORDMARK_PATHS, getWordmarkScale, getWordmarkDimensions } from "@/assets/brand/rhosonics-wordmark-paths";

// Brand gradient colors
const GRADIENT_START = "#73B82E";
const GRADIENT_END = "#33993C";
const OBSIDIAN_START = "#1e293b";
const OBSIDIAN_END = "#0f172a";

// Wave paths for the logo icon (3 waves total, 15px even gaps)
const WAVE_PATHS = [
  // Wave 1 - Innermost (propagation point, fills corner) - R20
  "M 80 80 L 80 60 A 20 20 0 0 0 60 80 L 80 80 Z",
  // Wave 2 - Middle - outer R49, inner R35 (14px thick)
  "M 80 45 L 80 31 A 49 49 0 0 0 31 80 L 45 80 A 35 35 0 0 1 80 45 Z",
  // Wave 3 - Outermost - outer R80, inner R64 (16px thick)
  "M 80 16 L 80 0 A 80 80 0 0 0 0 80 L 16 80 A 64 64 0 0 1 80 16 Z",
];

// Logo lockup layout types
export type LogoLayout = "horizontal" | "vertical" | "icon-only";

// Logo lockup configurations
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
  // Horizontal lockups
  {
    id: "gradient-dark-text",
    name: "Gradient + Dark Text",
    description: "Primary lockup for light backgrounds",
    iconFill: "gradient",
    textColor: "#1e293b",
    hasText: true,
    layout: "horizontal",
  },
  {
    id: "gradient-white-text",
    name: "Gradient + White Text",
    description: "For dark backgrounds",
    iconFill: "gradient",
    textColor: "#ffffff",
    hasText: true,
    layout: "horizontal",
  },
  {
    id: "white-white-text",
    name: "White + White Text",
    description: "Monochrome for brand backgrounds",
    iconFill: "white",
    textColor: "#ffffff",
    hasText: true,
    layout: "horizontal",
  },
  // Vertical/stacked lockups
  {
    id: "vertical-gradient-dark",
    name: "Stacked Gradient + Dark",
    description: "Vertical lockup for light backgrounds",
    iconFill: "gradient",
    textColor: "#1e293b",
    hasText: true,
    layout: "vertical",
  },
  {
    id: "vertical-gradient-white",
    name: "Stacked Gradient + White",
    description: "Vertical lockup for dark backgrounds",
    iconFill: "gradient",
    textColor: "#ffffff",
    hasText: true,
    layout: "vertical",
  },
  {
    id: "vertical-white-white",
    name: "Stacked White + White",
    description: "Vertical monochrome for brand",
    iconFill: "white",
    textColor: "#ffffff",
    hasText: true,
    layout: "vertical",
  },
  // Icon-only variants
  {
    id: "gradient-icon-only",
    name: "Gradient Icon",
    description: "Icon mark only, transparent",
    iconFill: "gradient",
    textColor: "",
    hasText: false,
    layout: "icon-only",
  },
  {
    id: "gradient-icon-white-bg",
    name: "Gradient Icon on White",
    description: "Icon on white background",
    iconFill: "gradient",
    textColor: "",
    background: "#ffffff",
    backgroundType: "white",
    hasText: false,
    layout: "icon-only",
  },
  {
    id: "white-icon-only",
    name: "White Icon",
    description: "White mark, transparent",
    iconFill: "white",
    textColor: "",
    hasText: false,
    layout: "icon-only",
  },
  {
    id: "white-icon-primary-bg",
    name: "White Icon on Primary",
    description: "For brand applications",
    iconFill: "white",
    textColor: "",
    background: `linear-gradient(135deg, ${GRADIENT_START}, ${GRADIENT_END})`,
    backgroundType: "primary",
    hasText: false,
    layout: "icon-only",
  },
  {
    id: "white-icon-obsidian-bg",
    name: "White Icon on Obsidian",
    description: "Premium dark applications",
    iconFill: "white",
    textColor: "",
    background: `linear-gradient(135deg, ${OBSIDIAN_START}, ${OBSIDIAN_END})`,
    backgroundType: "obsidian",
    hasText: false,
    layout: "icon-only",
  },
];

// Generate full lockup SVG using optical scaling conventions
// Icon 80px = text 55px (ratio 0.69) per size bands table
// Uses path-outlined wordmark for guaranteed typography
export const generateLockupSVG = (variant: LogoVariant): string => {
  const iconSize = 80;
  const textHeight = 55; // Per size bands: 80px icon = 55px text (0.69 ratio)
  const gap = 20;
  
  // Get wordmark dimensions scaled to target height
  const wordmarkDims = getWordmarkDimensions(textHeight);
  const wordmarkScale = getWordmarkScale(textHeight);
  
  const padding = variant.background ? 32 : 16;
  
  const totalWidth = iconSize + (variant.hasText ? gap + wordmarkDims.width : 0) + (padding * 2);
  const totalHeight = iconSize + (padding * 2);
  
  const gradientId = `grad-${variant.id}`;
  
  let gradientDef = "";
  if (variant.iconFill === "gradient") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GRADIENT_START}"/>
      <stop offset="100%" stop-color="${GRADIENT_END}"/>
    </linearGradient>`;
  } else if (variant.iconFill === "white") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>`;
  }
  
  let bgGradientDef = "";
  let bgRect = "";
  if (variant.background) {
    if (variant.backgroundType === "primary") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    } else if (variant.backgroundType === "obsidian") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    } else if (variant.backgroundType === "white") {
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="#ffffff" rx="8"/>`;
    }
  }
  
  const iconFill = `url(#${gradientId})`;
  
  const iconGroup = `<g transform="translate(${padding}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${iconFill}"/>`).join("\n    ")}
  </g>`;
  
  // Position wordmark: after icon + gap, vertically centered
  const wordmarkX = padding + iconSize + gap;
  const wordmarkY = padding + (iconSize - textHeight) / 2; // Vertically center with icon
  
  // Use path-outlined wordmark (no font dependency)
  const textGroup = variant.hasText 
    ? `<g transform="translate(${wordmarkX}, ${wordmarkY}) scale(${wordmarkScale})">
        <path d="${WORDMARK_PATHS.fullPath}" fill="${variant.textColor}"/>
      </g>` 
    : "";
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <defs>
    ${gradientDef}
    ${bgGradientDef}
  </defs>
  ${bgRect}
  ${iconGroup}
  ${textGroup}
</svg>`;
};

// Generate vertical/stacked lockup SVG
export const generateVerticalLockupSVG = (variant: LogoVariant): string => {
  const iconSize = 80;
  const textHeight = 32; // Smaller text for stacked layout
  const gap = 16;
  
  // Get wordmark dimensions scaled to target height
  const wordmarkDims = getWordmarkDimensions(textHeight);
  const wordmarkScale = getWordmarkScale(textHeight);
  
  const padding = variant.background ? 32 : 16;
  
  const totalWidth = Math.max(iconSize, wordmarkDims.width) + (padding * 2);
  const totalHeight = iconSize + gap + textHeight + (padding * 2);
  
  const gradientId = `grad-${variant.id}`;
  
  let gradientDef = "";
  if (variant.iconFill === "gradient") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GRADIENT_START}"/>
      <stop offset="100%" stop-color="${GRADIENT_END}"/>
    </linearGradient>`;
  } else if (variant.iconFill === "white") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>`;
  }
  
  let bgGradientDef = "";
  let bgRect = "";
  if (variant.background) {
    if (variant.backgroundType === "primary") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    } else if (variant.backgroundType === "obsidian") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    } else if (variant.backgroundType === "white") {
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="#ffffff" rx="8"/>`;
    }
  }
  
  const iconFill = `url(#${gradientId})`;
  
  // Center icon horizontally
  const iconX = padding + (Math.max(iconSize, wordmarkDims.width) - iconSize) / 2;
  
  const iconGroup = `<g transform="translate(${iconX}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${iconFill}"/>`).join("\n    ")}
  </g>`;
  
  // Center wordmark horizontally below icon
  const wordmarkX = padding + (Math.max(iconSize, wordmarkDims.width) - wordmarkDims.width) / 2;
  const wordmarkY = padding + iconSize + gap;
  
  const textGroup = variant.hasText 
    ? `<g transform="translate(${wordmarkX}, ${wordmarkY}) scale(${wordmarkScale})">
        <path d="${WORDMARK_PATHS.fullPath}" fill="${variant.textColor}"/>
      </g>` 
    : "";
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <defs>
    ${gradientDef}
    ${bgGradientDef}
  </defs>
  ${bgRect}
  ${iconGroup}
  ${textGroup}
</svg>`;
};

// Generate icon-only SVG (always square aspect ratio)
export const generateIconOnlySVG = (variant: LogoVariant): string => {
  const iconSize = 80;
  const padding = variant.background ? 24 : 0;
  const totalSize = iconSize + (padding * 2); // Square aspect ratio
  
  const gradientId = `grad-${variant.id}`;
  
  let gradientDef = "";
  if (variant.iconFill === "gradient") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GRADIENT_START}"/>
      <stop offset="100%" stop-color="${GRADIENT_END}"/>
    </linearGradient>`;
  } else if (variant.iconFill === "white") {
    gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>`;
  }
  
  let bgGradientDef = "";
  let bgRect = "";
  if (variant.background) {
    if (variant.backgroundType === "primary") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="url(#bg-${variant.id})" rx="12"/>`;
    } else if (variant.backgroundType === "obsidian") {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="url(#bg-${variant.id})" rx="12"/>`;
    } else if (variant.backgroundType === "white") {
      bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="#ffffff" rx="12"/>`;
    }
  }
  
  const fill = `url(#${gradientId})`;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="${totalSize}" height="${totalSize}">
  <defs>
    ${gradientDef}
    ${bgGradientDef}
  </defs>
  ${bgRect}
  <g transform="translate(${padding}, ${padding})">
    ${WAVE_PATHS.map(d => `<path d="${d}" fill="${fill}"/>`).join("\n    ")}
  </g>
</svg>`;
};

// Download SVG as file
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

// Convert SVG to PNG and download
// No font preloading needed - wordmark uses path outlines
export const downloadPNG = async (svg: string, filename: string, scale = 2) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not create blob"));
          return;
        }
        
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${filename}@${scale}x.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
        resolve();
      }, "image/png");
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };
    
    img.src = url;
  });
};
