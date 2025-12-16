export type ChartExportBuildOptions = {
  backgroundGradient: string;
  padding: number;
  chamfer: boolean;
  chamferSize?: number;
  /** Inline font rules (no external imports) for consistent rendering */
  includeFontCss?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function parseLinearGradient(css: string): {
  angle: string;
  stops: Array<{ color: string; offset: string }>;
} {
  const angleMatch = css.match(/linear-gradient\(([^,]+),/);
  const angle = angleMatch?.[1]?.trim() || "180deg";

  const stopMatches = [...css.matchAll(/(hsl\([^)]*\))\s*([0-9.]+%)/g)];
  if (stopMatches.length > 0) {
    return {
      angle,
      stops: stopMatches.map((m) => ({ color: m[1], offset: m[2] })),
    };
  }

  const colors = css.match(/hsl\([^)]*\)/g) || [];
  const stops = (colors.length ? colors : ["hsl(226, 33%, 10%)", "hsl(225, 25%, 18%)"]).slice(0, 2);
  return {
    angle,
    stops: [
      { color: stops[0], offset: "0%" },
      { color: stops[1] || stops[0], offset: "100%" },
    ],
  };
}

function gradientVector(angle: string): { x1: number; y1: number; x2: number; y2: number } {
  // Our presets use 180deg (top->bottom) and 135deg (diagonal). Handle those exactly.
  if (angle === "135deg") return { x1: 0, y1: 0, x2: 1, y2: 1 };
  return { x1: 0, y1: 0, x2: 0, y2: 1 };
}

function getSvgInner(svgEl: SVGSVGElement) {
  const serialized = new XMLSerializer().serializeToString(svgEl);
  return serialized.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

function getRenderedSvgSize(svgEl: SVGSVGElement): { width: number; height: number } {
  const rect = svgEl.getBoundingClientRect();
  // Recharts uses layout sizes; bounding box is the most reliable.
  return {
    width: Math.max(1, Math.round(rect.width)),
    height: Math.max(1, Math.round(rect.height)),
  };
}

export function buildChartExportSvg(
  svgEl: SVGSVGElement,
  opts: ChartExportBuildOptions
): { svg: string; width: number; height: number } {
  const padding = clamp(Math.round(opts.padding ?? 0), 0, 128);
  const chamferSize = clamp(Math.round(opts.chamferSize ?? 16), 0, 64);

  const base = getRenderedSvgSize(svgEl);
  const width = base.width + padding * 2;
  const height = base.height + padding * 2;

  const { angle, stops } = parseLinearGradient(opts.backgroundGradient);
  const v = gradientVector(angle);

  const inner = getSvgInner(svgEl);

  const clipId = "rhoClip";
  const bgId = "rhoBg";

  const clipPolygon = `${chamferSize} 0 ${width} 0 ${width} ${height - chamferSize} ${width - chamferSize} ${height} 0 ${height} 0 ${chamferSize}`;

  const fontCss = opts.includeFontCss
    ? `
      text, tspan {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 500;
      }
    `
    : "";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="${bgId}" gradientUnits="objectBoundingBox" x1="${v.x1}" y1="${v.y1}" x2="${v.x2}" y2="${v.y2}">
      ${stops
        .map((s) => `<stop offset="${s.offset}" stop-color="${s.color}" />`)
        .join("\n      ")}
    </linearGradient>
    ${opts.chamfer ? `<clipPath id="${clipId}"><polygon points="${clipPolygon}" /></clipPath>` : ""}
  </defs>
  <style><![CDATA[
    ${fontCss}
  ]]></style>
  ${opts.chamfer ? `<g clip-path="url(#${clipId})">` : ""}
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#${bgId})" />
    <g transform="translate(${padding} ${padding})">
      ${inner}
    </g>
  ${opts.chamfer ? `</g>` : ""}
</svg>`;

  return { svg, width, height };
}

export async function svgToPngDataUrl(params: {
  svg: string;
  width: number;
  height: number;
  scale?: number;
}): Promise<string> {
  const scale = clamp(params.scale ?? 2, 1, 4);

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(params.width * scale);
  canvas.height = Math.round(params.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  const blob = new Blob([params.svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      // Same-origin blob; safe.
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("Failed to render SVG"));
      i.src = url;
    });

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}
