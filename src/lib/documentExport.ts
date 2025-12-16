import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

// Rhosonics Brand Colors
const BRAND = {
  green: { r: 51, g: 153, b: 60 },      // #33993c
  lime: { r: 115, g: 184, b: 46 },       // #73B82E
  obsidian: { r: 17, g: 21, b: 34 },     // #111522
  gray: { r: 100, g: 100, b: 100 },
  lightGray: { r: 240, g: 240, b: 240 },
};

interface CaseStudyData {
  title: string;
  description: string;
  industry: string;
  stat: string;
  statLabel: string;
  metrics: { label: string; value: string }[];
}

interface TemplateData {
  templateType: string;
  content: string;
}

// Draw branded header
const drawBrandedHeader = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header background bar
  doc.setFillColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.rect(0, 0, pageWidth, 28, "F");
  
  // Accent line
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(0, 28, pageWidth, 3, "F");
  
  // Logo text (RHOSONICS)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RHOSONICS", 20, 18);
  
  // Tagline
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.text("ULTRASONIC MEASUREMENT SOLUTIONS", 78, 18);
};

// Draw branded footer
const drawBrandedFooter = (doc: jsPDF, pageNum: number = 1) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Footer line
  doc.setDrawColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
  
  // Footer text
  doc.setFontSize(8);
  doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
  doc.text("www.rhosonics.com", 20, pageHeight - 12);
  doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 12, { align: "center" });
  doc.text(new Date().toLocaleDateString(), pageWidth - 20, pageHeight - 12, { align: "right" });
};

// PDF Export for Case Study
export const exportCaseStudyToPDF = (caseStudy: CaseStudyData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  // Draw branded header
  drawBrandedHeader(doc);
  
  let y = 45;

  // Document type label
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.roundedRect(margin, y, 45, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("CASE STUDY", margin + 4, y + 5.5);
  y += 18;

  // Title
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(caseStudy.title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 10 + 8;

  // Industry Tag
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
  doc.text(`INDUSTRY: ${caseStudy.industry.toUpperCase()}`, margin, y);
  y += 15;

  // Primary Stat Box
  doc.setFillColor(BRAND.lightGray.r, BRAND.lightGray.g, BRAND.lightGray.b);
  doc.roundedRect(margin, y, contentWidth, 35, 3, 3, "F");
  
  // Stat value
  doc.setTextColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text(caseStudy.stat, margin + 10, y + 22);
  
  // Stat label
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  const statLabelX = margin + 10 + doc.getTextWidth(caseStudy.stat) + 10;
  doc.text(caseStudy.statLabel, statLabelX, y + 22);
  y += 50;

  // Description
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(caseStudy.description, contentWidth);
  doc.text(descLines, margin, y);
  y += descLines.length * 6 + 20;

  // Metrics Section
  if (caseStudy.metrics.length > 0) {
    // Section header with accent
    doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
    doc.rect(margin, y, 3, 14, "F");
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
    doc.text("KEY METRICS", margin + 8, y + 10);
    y += 22;

    // Metrics grid
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    caseStudy.metrics.forEach((metric) => {
      doc.setTextColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
      doc.setFont("helvetica", "bold");
      doc.text(`${metric.value}`, margin + 5, y);
      doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
      doc.setFont("helvetica", "normal");
      doc.text(` — ${metric.label}`, margin + 5 + doc.getTextWidth(metric.value + " "), y);
      y += 10;
    });
  }

  // Draw branded footer
  drawBrandedFooter(doc);

  doc.save(`rhosonics-case-study-${caseStudy.industry}.pdf`);
};

// Word Export for Case Study
export const exportCaseStudyToWord = async (caseStudy: CaseStudyData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: caseStudy.title,
                bold: true,
                size: 40,
              }),
            ],
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `INDUSTRY: ${caseStudy.industry.toUpperCase()}`,
                size: 20,
                color: "666666",
              }),
            ],
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: caseStudy.stat,
                bold: true,
                size: 72,
                color: "228B22",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: caseStudy.statLabel,
                size: 24,
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: caseStudy.description,
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Key Metrics",
                bold: true,
                size: 28,
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          ...caseStudy.metrics.map(
            (metric) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${metric.label}: `,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: metric.value,
                    size: 22,
                  }),
                ],
                spacing: { after: 100 },
              })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated by Rhosonics Brand Tools • ${new Date().toLocaleDateString()}`,
                size: 16,
                color: "999999",
              }),
            ],
            spacing: { before: 600 },
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `case-study-${caseStudy.industry}.docx`);
};

// PDF Export for Template
export const exportTemplateToPDF = (data: TemplateData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  // Draw branded header
  drawBrandedHeader(doc);
  
  let y = 45;

  // Document type label
  doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  const labelText = formatTemplateType(data.templateType).toUpperCase();
  const labelWidth = doc.getTextWidth(labelText) * 0.35 + 12;
  doc.roundedRect(margin, y, Math.max(labelWidth, 50), 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(labelText, margin + 4, y + 5.5);
  y += 20;

  // Title
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(formatTemplateType(data.templateType), margin, y);
  y += 15;

  // Divider line
  doc.setDrawColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  y += 12;

  // Content
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(data.content, contentWidth);
  
  let pageNum = 1;
  lines.forEach((line: string) => {
    if (y > doc.internal.pageSize.getHeight() - 30) {
      drawBrandedFooter(doc, pageNum);
      doc.addPage();
      pageNum++;
      drawBrandedHeader(doc);
      y = 45;
    }
    doc.text(line, margin, y);
    y += 6;
  });

  // Draw branded footer
  drawBrandedFooter(doc, pageNum);

  doc.save(`rhosonics-${data.templateType}-template.pdf`);
};

// Word Export for Template
export const exportTemplateToWord = async (data: TemplateData) => {
  const paragraphs = data.content.split("\n").filter(Boolean).map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: formatTemplateType(data.templateType),
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.TITLE,
            spacing: { after: 400 },
          }),
          ...paragraphs,
          new Paragraph({
            children: [
              new TextRun({
                text: `Generated by Rhosonics Brand Tools • ${new Date().toLocaleDateString()}`,
                size: 16,
                color: "999999",
              }),
            ],
            spacing: { before: 600 },
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.templateType}-template.docx`);
};

function formatTemplateType(type: string): string {
  const labels: Record<string, string> = {
    datasheet: "Product Datasheet",
    specification: "Technical Specification",
    sales_email: "Sales Email",
    support: "Support Response",
    linkedin: "LinkedIn Post",
    press_release: "Press Release",
  };
  return labels[type] || type;
}
