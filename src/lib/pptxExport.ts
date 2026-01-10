import PptxGenJS from "pptxgenjs";
import { Presentation, Slide, Block, SlideTransition } from "@/types/presentation";

// Convert HSL string to hex color for PPTX
function hslToHex(hsl: string): string {
  // Parse HSL values from string like "hsl(125 50% 40%)" or "hsl(125, 50%, 40%)"
  const match = hsl.match(/hsl\(?\s*(\d+)\s*[,\s]+\s*(\d+)%?\s*[,\s]+\s*(\d+)%?\s*\)?/i);
  if (!match) return "333333"; // Default dark gray

  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Get background color from slide
function getBackgroundColor(slide: Slide): string {
  if (slide.background.type === "solid") {
    return hslToHex(slide.background.value);
  }
  // For gradients, extract the first color
  if (slide.background.type === "gradient") {
    const match = slide.background.value.match(/hsl\([^)]+\)/);
    if (match) {
      return hslToHex(match[0]);
    }
  }
  return "FFFFFF";
}

// Determine if background is dark
function isDarkBackground(slide: Slide): boolean {
  if (slide.background.type === "solid") {
    // Check if it contains low lightness values
    return slide.background.value.includes("10%") || 
           slide.background.value.includes("20%") ||
           slide.background.value.includes("225");
  }
  if (slide.background.type === "gradient") {
    return slide.background.value.includes("225");
  }
  return false;
}

// Map transition to PPTX transition type - returns an object matching pptxgenjs slide transition
function getTransitionType(transition?: SlideTransition): { type: string; speed?: number } | undefined {
  if (!transition || transition === "none") return undefined;
  
  const transitionMap: Record<string, { type: string; speed: number }> = {
    fade: { type: "fade", speed: 1 },
    slide: { type: "push", speed: 1 },
    zoom: { type: "zoom", speed: 1 },
    flip: { type: "flip", speed: 1 },
  };
  
  return transitionMap[transition];
}

// Add block content to slide
function addBlockToSlide(
  pptxSlide: PptxGenJS.Slide,
  block: Block,
  yPosition: number,
  isDark: boolean
): number {
  const textColor = isDark ? "FFFFFF" : "1a1a2e";
  const mutedColor = isDark ? "CCCCCC" : "666666";
  const primaryColor = "2E8B57"; // Rhosonics green
  
  const baseX = 0.5;
  const maxWidth = 9;
  let blockHeight = 0.5;

  switch (block.type) {
    case "heading":
      pptxSlide.addText(block.content.text || "", {
        x: baseX,
        y: yPosition,
        w: maxWidth,
        h: 0.8,
        fontSize: block.content.level === 1 ? 36 : block.content.level === 2 ? 28 : 22,
        fontFace: "Arial",
        color: textColor,
        bold: true,
        align: block.style?.alignment || "left",
      });
      blockHeight = 1;
      break;

    case "subheading":
      pptxSlide.addText(block.content.text || "", {
        x: baseX,
        y: yPosition,
        w: maxWidth,
        h: 0.6,
        fontSize: 22,
        fontFace: "Arial",
        color: mutedColor,
        align: block.style?.alignment || "left",
      });
      blockHeight = 0.8;
      break;

    case "paragraph":
      pptxSlide.addText(block.content.text || "", {
        x: baseX,
        y: yPosition,
        w: maxWidth,
        h: 0.8,
        fontSize: 16,
        fontFace: "Arial",
        color: mutedColor,
        align: "left",
      });
      blockHeight = 1;
      break;

    case "bullet-list":
      if (block.content.items) {
        const bulletText = block.content.items.map(item => ({
          text: item,
          options: { bullet: { type: "bullet" as const }, color: textColor },
        }));
        pptxSlide.addText(bulletText, {
          x: baseX,
          y: yPosition,
          w: maxWidth,
          h: block.content.items.length * 0.4,
          fontSize: 16,
          fontFace: "Arial",
        });
        blockHeight = block.content.items.length * 0.4 + 0.3;
      }
      break;

    case "stat-card":
      if (block.content.stat) {
        pptxSlide.addText(block.content.stat.value, {
          x: baseX,
          y: yPosition,
          w: maxWidth,
          h: 0.8,
          fontSize: 48,
          fontFace: "Arial",
          color: primaryColor,
          bold: true,
          align: "center",
        });
        pptxSlide.addText(block.content.stat.label, {
          x: baseX,
          y: yPosition + 0.8,
          w: maxWidth,
          h: 0.4,
          fontSize: 18,
          fontFace: "Arial",
          color: mutedColor,
          align: "center",
        });
        blockHeight = 1.5;
      }
      break;

    case "stat-grid":
      if (block.content.stats) {
        const statsPerRow = Math.min(block.content.stats.length, 3);
        const statWidth = maxWidth / statsPerRow;
        block.content.stats.forEach((stat, i) => {
          const xPos = baseX + (i % statsPerRow) * statWidth;
          const row = Math.floor(i / statsPerRow);
          pptxSlide.addText(stat.value, {
            x: xPos,
            y: yPosition + row * 1.2,
            w: statWidth,
            h: 0.6,
            fontSize: 32,
            fontFace: "Arial",
            color: primaryColor,
            bold: true,
            align: "center",
          });
          pptxSlide.addText(stat.label, {
            x: xPos,
            y: yPosition + 0.6 + row * 1.2,
            w: statWidth,
            h: 0.3,
            fontSize: 14,
            fontFace: "Arial",
            color: mutedColor,
            align: "center",
          });
        });
        blockHeight = Math.ceil(block.content.stats.length / 3) * 1.4;
      }
      break;

    case "quote":
      if (block.content.quote) {
        pptxSlide.addShape("rect", {
          x: baseX,
          y: yPosition,
          w: 0.1,
          h: 1,
          fill: { color: primaryColor },
        });
        pptxSlide.addText(`"${block.content.quote.text}"`, {
          x: baseX + 0.3,
          y: yPosition,
          w: maxWidth - 0.3,
          h: 0.8,
          fontSize: 18,
          fontFace: "Arial",
          color: textColor,
          italic: true,
        });
        pptxSlide.addText(`— ${block.content.quote.author}${block.content.quote.role ? `, ${block.content.quote.role}` : ""}`, {
          x: baseX + 0.3,
          y: yPosition + 0.8,
          w: maxWidth - 0.3,
          h: 0.3,
          fontSize: 12,
          fontFace: "Arial",
          color: mutedColor,
        });
        blockHeight = 1.3;
      }
      break;

    case "spec-table":
      if (block.content.specs) {
        const tableData = block.content.specs.map(spec => [
          { text: spec.label, options: { color: mutedColor, bold: true } },
          { text: spec.value, options: { color: textColor, align: "right" as const } },
        ]);
        pptxSlide.addTable(tableData, {
          x: baseX + 1.5,
          y: yPosition,
          w: 6,
          colW: [3, 3],
          fontSize: 14,
          fontFace: "Arial",
          border: { type: "solid", pt: 0.5, color: isDark ? "444444" : "CCCCCC" },
          fill: { color: isDark ? "222233" : "F8F8F8" },
        });
        blockHeight = block.content.specs.length * 0.4 + 0.3;
      }
      break;

    case "callout":
      if (block.content.callout) {
        const calloutColors: Record<string, string> = {
          info: "3B82F6",
          warning: "F59E0B",
          success: "22C55E",
          error: "EF4444",
        };
        const calloutColor = calloutColors[block.content.callout.type] || calloutColors.info;
        
        pptxSlide.addShape("rect", {
          x: baseX,
          y: yPosition,
          w: maxWidth,
          h: 0.8,
          fill: { color: calloutColor, transparency: 90 },
        });
        pptxSlide.addShape("rect", {
          x: baseX,
          y: yPosition,
          w: 0.1,
          h: 0.8,
          fill: { color: calloutColor },
        });
        if (block.content.callout.title) {
          pptxSlide.addText(block.content.callout.title, {
            x: baseX + 0.3,
            y: yPosition + 0.1,
            w: maxWidth - 0.5,
            h: 0.25,
            fontSize: 14,
            fontFace: "Arial",
            color: textColor,
            bold: true,
          });
        }
        pptxSlide.addText(block.content.callout.text, {
          x: baseX + 0.3,
          y: yPosition + (block.content.callout.title ? 0.35 : 0.15),
          w: maxWidth - 0.5,
          h: 0.35,
          fontSize: 12,
          fontFace: "Arial",
          color: mutedColor,
        });
        blockHeight = 1;
      }
      break;

    case "cta":
      if (block.content.cta) {
        pptxSlide.addText(block.content.cta.text, {
          x: baseX,
          y: yPosition,
          w: maxWidth,
          h: 0.5,
          fontSize: 18,
          fontFace: "Arial",
          color: textColor,
          align: "center",
        });
        pptxSlide.addShape("roundRect", {
          x: 3.5,
          y: yPosition + 0.6,
          w: 3,
          h: 0.5,
          fill: { color: primaryColor },
        });
        pptxSlide.addText(block.content.cta.buttonLabel, {
          x: 3.5,
          y: yPosition + 0.6,
          w: 3,
          h: 0.5,
          fontSize: 14,
          fontFace: "Arial",
          color: "FFFFFF",
          bold: true,
          align: "center",
          valign: "middle",
        });
        blockHeight = 1.3;
      }
      break;

    case "divider":
      pptxSlide.addShape("line", {
        x: baseX + 2,
        y: yPosition + 0.2,
        w: 5,
        h: 0,
        line: { color: isDark ? "444444" : "CCCCCC", width: 1 },
      });
      blockHeight = 0.5;
      break;

    case "image":
      if (block.content.imageUrl) {
        // For base64 images or URLs
        try {
          pptxSlide.addImage({
            data: block.content.imageUrl.startsWith("data:") ? block.content.imageUrl : undefined,
            path: !block.content.imageUrl.startsWith("data:") ? block.content.imageUrl : undefined,
            x: baseX + 1,
            y: yPosition,
            w: 7,
            h: 3,
          });
          blockHeight = 3.2;
        } catch {
          // If image fails, show placeholder text
          pptxSlide.addText("[Image]", {
            x: baseX,
            y: yPosition,
            w: maxWidth,
            h: 0.5,
            fontSize: 14,
            fontFace: "Arial",
            color: mutedColor,
            align: "center",
          });
          blockHeight = 0.6;
        }
      }
      break;

    default:
      blockHeight = 0.3;
  }

  return blockHeight;
}

export async function exportToPptx(presentation: Presentation): Promise<void> {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.title = presentation.name;
  pptx.author = "Rhosonics Brand System";
  pptx.subject = "Presentation";
  
  // Set 16:9 layout
  pptx.defineLayout({ name: "WIDESCREEN", width: 10, height: 5.625 });
  pptx.layout = "WIDESCREEN";

  // Process each slide
  for (const slide of presentation.slides) {
    const pptxSlide = pptx.addSlide();
    
    // Set background
    const bgColor = getBackgroundColor(slide);
    pptxSlide.background = { color: bgColor };
    
    // Set transition if available
    const transition = getTransitionType(slide.transition as SlideTransition);
    if (transition) {
      (pptxSlide as any).transition = transition;
    }
    
    // Determine text colors based on background
    const isDark = isDarkBackground(slide);
    
    // Add blocks
    let yPosition = 0.5;
    for (const block of slide.blocks) {
      const blockHeight = addBlockToSlide(pptxSlide, block, yPosition, isDark);
      yPosition += blockHeight + 0.2; // Add spacing between blocks
    }
    
    // Add slide notes if present
    if (slide.notes) {
      pptxSlide.addNotes(slide.notes);
    }
  }

  // Save the file
  await pptx.writeFile({ fileName: `${presentation.name}.pptx` });
}