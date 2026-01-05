/**
 * Hybrid Vector PDF Export for Case Studies
 * - Text rendered as vectors via jsPDF for pixel-perfect alignment
 * - Images/charts rendered as raster for visual fidelity
 */
import jsPDF from "jspdf";

// Brand colors in RGB
const COLORS = {
  obsidian: [17, 21, 34] as [number, number, number],
  green: [51, 153, 60] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  slate100: [241, 245, 249] as [number, number, number],
  slate400: [148, 163, 184] as [number, number, number],
  slate500: [100, 116, 139] as [number, number, number],
  slate700: [51, 65, 85] as [number, number, number],
  ecoSurface: [240, 253, 244] as [number, number, number],
};

// A4 dimensions in mm
const A4 = { width: 210, height: 297 };

// Header/footer heights
const HEADER_HEIGHT = 12;
const FOOTER_HEIGHT = 8;

interface CaseStudy {
  id: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  chartImage?: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  specs: { label: string; value: string }[];
  primaryStat: { value: string; label: string };
}

interface VectorExportOptions {
  study: CaseStudy;
  onProgress?: (progress: number) => void;
}

// Helper to load image as base64
const loadImageAsBase64 = async (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Helper to wrap text within a given width
const wrapText = (
  pdf: jsPDF,
  text: string,
  maxWidth: number
): string[] => {
  return pdf.splitTextToSize(text, maxWidth);
};

// Draw the header bar
const drawHeader = (
  pdf: jsPDF,
  rightText: string,
  showTagline: boolean = true
) => {
  // Background
  pdf.setFillColor(...COLORS.obsidian);
  pdf.rect(0, 0, A4.width, HEADER_HEIGHT, "F");

  // Logo text (using Helvetica Bold as fallback for Unbounded)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.white);
  pdf.text("Rhosonics", 12, 7.5);

  if (showTagline) {
    // Tagline
    pdf.setFont("courier", "normal");
    pdf.setFontSize(5);
    pdf.setTextColor(...COLORS.slate400);
    pdf.text("ULTRASONIC MEASUREMENT SOLUTIONS", 12, 10.5);
  }

  // Right side label
  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.green);
  pdf.text(rightText, A4.width - 12, 7.5, { align: "right" });
};

// Draw the footer bar
const drawFooter = (pdf: jsPDF, leftText: string, pageNum: number, totalPages: number) => {
  const y = A4.height - FOOTER_HEIGHT;

  // Background
  pdf.setFillColor(...COLORS.slate100);
  pdf.rect(0, y, A4.width, FOOTER_HEIGHT, "F");

  // Left text
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate500);
  pdf.text(leftText, 12, y + 5);

  // Page number
  pdf.text(`Page ${pageNum} of ${totalPages}`, A4.width - 12, y + 5, { align: "right" });
};

// Draw Page 1 - Cover & Introduction
const drawPage1 = async (
  pdf: jsPDF,
  study: CaseStudy,
  heroImageData: string
) => {
  // Header
  drawHeader(pdf, "CASE STUDY", true);

  // Hero image area (with gradient overlay simulated by darkening)
  const heroY = HEADER_HEIGHT;
  const heroHeight = 70;

  // Draw hero image
  try {
    pdf.addImage(heroImageData, "JPEG", 0, heroY, A4.width, heroHeight);
  } catch (e) {
    // Fallback: draw placeholder
    pdf.setFillColor(100, 100, 100);
    pdf.rect(0, heroY, A4.width, heroHeight, "F");
  }

  // Gradient overlay (dark bottom) - use semi-transparent rectangle
  // jsPDF GState requires proper typing, so we skip opacity for now and use solid overlay
  pdf.setFillColor(...COLORS.obsidian);
  pdf.rect(0, heroY + heroHeight - 25, A4.width, 25, "F");

  // Industry & Product tags
  const tagY = heroY + heroHeight - 22;
  pdf.setFillColor(...COLORS.green);
  pdf.roundedRect(12, tagY, 35, 5, 1, 1, "F");
  pdf.setFont("courier", "bold");
  pdf.setFontSize(5);
  pdf.setTextColor(...COLORS.white);
  pdf.text(study.industry.toUpperCase(), 14, tagY + 3.5);

  pdf.setFillColor(255, 255, 255, 50);
  pdf.roundedRect(50, tagY, 40, 5, 1, 1, "F");
  pdf.setTextColor(...COLORS.white);
  pdf.text(study.product.toUpperCase(), 52, tagY + 3.5);

  // Company name
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(...COLORS.white);
  pdf.text(study.company, 12, heroY + heroHeight - 10);

  // Location
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(255, 255, 255, 200);
  pdf.text(`📍 ${study.location}`, 12, heroY + heroHeight - 4);

  // Content area
  const contentY = heroY + heroHeight + 8;
  const contentWidth = A4.width - 24;
  const colWidth = (contentWidth - 8) / 2;

  // Tagline with left border
  pdf.setDrawColor(...COLORS.green);
  pdf.setLineWidth(0.8);
  pdf.line(12, contentY, 12, contentY + 10);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.green);
  const taglineLines = wrapText(pdf, study.tagline, contentWidth - 8);
  pdf.text(taglineLines, 16, contentY + 4);

  // Two-column layout
  const twoColY = contentY + 20;

  // Left column - Challenge
  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate500);
  pdf.text("THE CHALLENGE", 12, twoColY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(...COLORS.slate700);
  const challengeLines = wrapText(pdf, study.challenge, colWidth);
  pdf.text(challengeLines.slice(0, 8), 12, twoColY + 6);

  // Solution
  const solutionY = twoColY + 45;
  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate500);
  pdf.text("OUR SOLUTION", 12, solutionY);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(...COLORS.slate700);
  const solutionLines = wrapText(pdf, study.solution, colWidth);
  pdf.text(solutionLines.slice(0, 8), 12, solutionY + 6);

  // Right column - Primary Stat
  const rightColX = 12 + colWidth + 8;

  // Stat card
  pdf.setFillColor(...COLORS.obsidian);
  pdf.roundedRect(rightColX, twoColY, colWidth, 30, 2, 2, "F");

  pdf.setFont("courier", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(...COLORS.green);
  pdf.text(study.primaryStat.value, rightColX + colWidth / 2, twoColY + 15, { align: "center" });

  pdf.setFont("courier", "normal");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate400);
  pdf.text(study.primaryStat.label.toUpperCase(), rightColX + colWidth / 2, twoColY + 23, { align: "center" });

  // Specifications
  const specsY = twoColY + 38;
  pdf.setFillColor(...COLORS.slate100);
  pdf.roundedRect(rightColX, specsY, colWidth, 45, 2, 2, "F");

  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate500);
  pdf.text("⚙ SPECIFICATIONS", rightColX + 4, specsY + 6);

  study.specs.forEach((spec, i) => {
    const specY = specsY + 14 + i * 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.slate500);
    pdf.text(spec.label, rightColX + 4, specY);

    pdf.setFont("courier", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.slate700);
    pdf.text(spec.value, rightColX + colWidth - 4, specY, { align: "right" });

    if (i < study.specs.length - 1) {
      pdf.setDrawColor(...COLORS.slate400);
      pdf.setLineWidth(0.1);
      pdf.line(rightColX + 4, specY + 3, rightColX + colWidth - 4, specY + 3);
    }
  });

  // Footer
  drawFooter(pdf, "www.rhosonics.com", 1, 2);
};

// Draw Page 2 - Results & Data
const drawPage2 = async (
  pdf: jsPDF,
  study: CaseStudy,
  chartImageData: string | null
) => {
  // Header
  drawHeader(pdf, `${study.company.toUpperCase()} — RESULTS`, false);

  const contentY = HEADER_HEIGHT + 8;
  const contentWidth = A4.width - 24;

  // Results section
  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate500);
  pdf.text("✓ KEY RESULTS", 12, contentY);

  // Results grid (2 columns)
  const resultColWidth = (contentWidth - 6) / 2;
  study.results.forEach((result, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 12 + col * (resultColWidth + 6);
    const y = contentY + 8 + row * 14;

    // Result box
    pdf.setFillColor(...COLORS.ecoSurface);
    pdf.roundedRect(x, y, resultColWidth, 12, 1, 1, "F");

    // Number circle
    pdf.setFillColor(...COLORS.green);
    pdf.circle(x + 4, y + 6, 3, "F");
    pdf.setFont("courier", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.white);
    pdf.text(String(i + 1), x + 4, y + 7, { align: "center" });

    // Result text
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.slate700);
    const resultLines = wrapText(pdf, result, resultColWidth - 14);
    pdf.text(resultLines[0] || "", x + 10, y + 5);
    if (resultLines[1]) {
      pdf.text(resultLines[1], x + 10, y + 9);
    }
  });

  // Chart section
  const chartY = contentY + 8 + Math.ceil(study.results.length / 2) * 14 + 8;

  if (chartImageData) {
    pdf.setFont("courier", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.slate500);
    pdf.text(study.id === "weir-minerals" ? "TECHNOLOGY COMPARISON" : "MEASUREMENT DATA", 12, chartY);

    try {
      pdf.addImage(chartImageData, "JPEG", 12, chartY + 4, contentWidth, 50);
    } catch (e) {
      // Placeholder if chart fails
      pdf.setFillColor(...COLORS.slate100);
      pdf.rect(12, chartY + 4, contentWidth, 50, "F");
    }
  }

  // Quote section
  if (study.quote) {
    const quoteY = chartImageData ? chartY + 60 : chartY;

    // Quote box with left border
    pdf.setFillColor(...COLORS.ecoSurface);
    pdf.roundedRect(12, quoteY, contentWidth, 30, 2, 2, "F");
    pdf.setDrawColor(...COLORS.green);
    pdf.setLineWidth(1);
    pdf.line(12, quoteY, 12, quoteY + 30);

    // Quote icon placeholder
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(...COLORS.green);
    pdf.text('"', 16, quoteY + 8);

    // Quote text
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(7);
    pdf.setTextColor(...COLORS.slate700);
    const quoteLines = wrapText(pdf, `"${study.quote.text}"`, contentWidth - 16);
    pdf.text(quoteLines.slice(0, 3), 16, quoteY + 10);

    // Author
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(6);
    pdf.setTextColor(...COLORS.slate700);
    pdf.text(study.quote.author, 16, quoteY + 24);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(5);
    pdf.setTextColor(...COLORS.slate500);
    pdf.text(study.quote.role, 16, quoteY + 27);
  }

  // Contact CTA
  const ctaY = A4.height - FOOTER_HEIGHT - 25;
  pdf.setFillColor(...COLORS.obsidian);
  pdf.roundedRect(12, ctaY, contentWidth, 20, 2, 2, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...COLORS.white);
  pdf.text("Ready to optimize your process?", 16, ctaY + 7);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate400);
  pdf.text("Contact our team to discuss your measurement challenges.", 16, ctaY + 12);

  // Contact details
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6);
  pdf.setTextColor(...COLORS.slate400);
  pdf.text("+31 341 37 00 73", A4.width - 16, ctaY + 6, { align: "right" });
  pdf.text("info@rhosonics.com", A4.width - 16, ctaY + 10, { align: "right" });
  pdf.text("www.rhosonics.com", A4.width - 16, ctaY + 14, { align: "right" });

  // Footer
  drawFooter(pdf, "Hoge Eng West 30, 3882 TR Putten, Netherlands", 2, 2);
};

export const exportCaseStudyAsVectorPDF = async (
  options: VectorExportOptions
): Promise<void> => {
  const { study, onProgress } = options;

  onProgress?.(5);

  // Create PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  onProgress?.(10);

  // Load images
  let heroImageData = "";
  let chartImageData: string | null = null;

  try {
    heroImageData = await loadImageAsBase64(study.heroImage);
    onProgress?.(30);
  } catch (e) {
    console.warn("Failed to load hero image:", e);
  }

  if (study.chartImage) {
    try {
      chartImageData = await loadImageAsBase64(study.chartImage);
      onProgress?.(50);
    } catch (e) {
      console.warn("Failed to load chart image:", e);
    }
  } else {
    onProgress?.(50);
  }

  // Draw Page 1
  await drawPage1(pdf, study, heroImageData);
  onProgress?.(70);

  // Add Page 2
  pdf.addPage();
  await drawPage2(pdf, study, chartImageData);
  onProgress?.(90);

  // Save
  const filename = `Rhosonics_Case_Study_${study.company.replace(/\s+/g, "_")}_Vector.pdf`;
  pdf.save(filename);

  onProgress?.(100);
};

export default exportCaseStudyAsVectorPDF;
