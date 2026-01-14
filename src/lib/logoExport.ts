// Logo SVG generation and export utilities

// Brand gradient colors
const GRADIENT_START = "#73B82E";
const GRADIENT_END = "#33993c";
const OBSIDIAN_START = "#1e293b";
const OBSIDIAN_END = "#0f172a";

// Arc paths for the logo icon
const ARC_PATHS = [
  "M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z",
  "M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z",
  "M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z",
];


// Logo lockup configurations
export interface LogoVariant {
  id: string;
  name: string;
  description: string;
  iconFill: string | "gradient" | "white";
  textColor: string;
  background?: string;
  hasText: boolean;
}

export const logoVariants: LogoVariant[] = [
  {
    id: "gradient-dark-text",
    name: "Gradient + Dark Text",
    description: "Primary lockup for light backgrounds",
    iconFill: "gradient",
    textColor: "#1e293b",
    hasText: true,
  },
  {
    id: "gradient-white-text",
    name: "Gradient + White Text",
    description: "For dark backgrounds",
    iconFill: "gradient",
    textColor: "#ffffff",
    hasText: true,
  },
  {
    id: "white-white-text",
    name: "White + White Text",
    description: "Monochrome for brand backgrounds",
    iconFill: "white",
    textColor: "#ffffff",
    hasText: true,
  },
  {
    id: "gradient-icon-only",
    name: "Gradient Icon",
    description: "Icon mark only",
    iconFill: "gradient",
    textColor: "",
    hasText: false,
  },
  {
    id: "white-icon-gradient-bg",
    name: "White Icon on Gradient",
    description: "For brand applications",
    iconFill: "white",
    textColor: "",
    background: `linear-gradient(135deg, ${GRADIENT_START}, ${GRADIENT_END})`,
    hasText: false,
  },
  {
    id: "white-icon-obsidian-bg",
    name: "White Icon on Obsidian",
    description: "Premium dark applications",
    iconFill: "white",
    textColor: "",
    background: `linear-gradient(135deg, ${OBSIDIAN_START}, ${OBSIDIAN_END})`,
    hasText: false,
  },
];

// Generate full lockup SVG using optical scaling conventions
// Icon 80px = text cap-height ~52-56px (65-75% of icon height)
export const generateLockupSVG = (variant: LogoVariant): string => {
  const iconSize = 80;
  const textSize = 28; // Optical scaling: ~35% of icon for proper visual balance
  const gap = 12;
  const textWidth = variant.hasText ? 180 : 0;
  const padding = variant.background ? 32 : 0;
  
  const totalWidth = iconSize + (variant.hasText ? gap + textWidth : 0) + (padding * 2);
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
    if (variant.background.includes(GRADIENT_START)) {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    } else {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalWidth}" height="${totalHeight}" fill="url(#bg-${variant.id})" rx="8"/>`;
    }
  }
  
  const fill = `url(#${gradientId})`;
  
  const iconGroup = `<g transform="translate(${padding}, ${padding})">
    ${ARC_PATHS.map(d => `<path d="${d}" fill="${fill}"/>`).join("\n    ")}
  </g>`;
  
  // Unbounded font for wordmark, vertically centered with icon
  const textY = padding + (iconSize / 2) + (textSize * 0.35); // Optical vertical centering
  const textGroup = variant.hasText 
    ? `<text x="${padding + iconSize + gap}" y="${textY}" font-family="Unbounded, sans-serif" font-size="${textSize}" font-weight="600" letter-spacing="0.02em" fill="${variant.textColor}">RHOSONICS</text>` 
    : "";
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <defs>
    <style>@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600&amp;display=swap');</style>
    ${gradientDef}
    ${bgGradientDef}
  </defs>
  ${bgRect}
  ${iconGroup}
  ${textGroup}
</svg>`;
};

// Generate icon-only SVG
export const generateIconOnlySVG = (variant: LogoVariant): string => {
  const iconSize = 80;
  const padding = variant.background ? 24 : 0;
  const totalSize = iconSize + (padding * 2);
  
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
    if (variant.background.includes(GRADIENT_START)) {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${GRADIENT_START}"/>
        <stop offset="100%" stop-color="${GRADIENT_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="url(#bg-${variant.id})" rx="12"/>`;
    } else {
      bgGradientDef = `<linearGradient id="bg-${variant.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${OBSIDIAN_START}"/>
        <stop offset="100%" stop-color="${OBSIDIAN_END}"/>
      </linearGradient>`;
      bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="url(#bg-${variant.id})" rx="12"/>`;
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
    ${ARC_PATHS.map(d => `<path d="${d}" fill="${fill}"/>`).join("\n    ")}
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
