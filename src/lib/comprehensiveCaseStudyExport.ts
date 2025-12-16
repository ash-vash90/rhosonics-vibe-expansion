import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import type { ComprehensiveCaseStudy } from "@/types/caseStudy";

// Rhosonics Brand Colors
const BRAND = {
  green: { r: 51, g: 153, b: 60 },
  lime: { r: 115, g: 184, b: 46 },
  obsidian: { r: 17, g: 21, b: 34 },
  gray: { r: 100, g: 100, b: 100 },
  lightGray: { r: 240, g: 240, b: 240 },
};

const LOGO_SVG_WHITE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <path d="M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z" fill="#ffffff"/>
  <path d="M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z" fill="#ffffff"/>
  <path d="M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z" fill="#ffffff"/>
</svg>`;

const svgToDataUrl = (svg: string): string => {
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
};

const drawHeader = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFillColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(0, 28, pageWidth, 3, "F");
  
  try {
    doc.addImage(svgToDataUrl(LOGO_SVG_WHITE), "SVG", 15, 4, 20, 20);
  } catch (e) {}
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RHOSONICS", 40, 16);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.text("ULTRASONIC MEASUREMENT SOLUTIONS", 40, 23);
};

const drawFooter = (doc: jsPDF, pageNum: number, totalPages: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);
  doc.setFontSize(8);
  doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
  doc.text("www.rhosonics.com", 20, pageHeight - 12);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth / 2, pageHeight - 12, { align: "center" });
  doc.text(new Date().toLocaleDateString(), pageWidth - 20, pageHeight - 12, { align: "right" });
};

export const exportComprehensiveCaseStudyToPDF = (cs: ComprehensiveCaseStudy) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let currentPage = 1;
  
  const addNewPage = () => {
    doc.addPage();
    currentPage++;
    drawHeader(doc);
    return 45;
  };
  
  const checkPageBreak = (y: number, needed: number = 40) => {
    if (y > pageHeight - needed) {
      return addNewPage();
    }
    return y;
  };

  // Page 1: Cover
  drawHeader(doc);
  let y = 50;
  
  // Case Study badge
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.roundedRect(margin, y, 45, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("CASE STUDY", margin + 4, y + 5.5);
  y += 20;

  // Title
  const title = `${cs.executiveSnapshot.customerName} – ${cs.executiveSnapshot.site}`;
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 12 + 8;

  // Subtitle
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
  doc.text(cs.executiveSnapshot.application, margin, y);
  y += 20;

  // Executive Snapshot Box
  doc.setFillColor(BRAND.lightGray.r, BRAND.lightGray.g, BRAND.lightGray.b);
  doc.roundedRect(margin, y, contentWidth, 80, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.text("EXECUTIVE SNAPSHOT", margin + 8, y + 12);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.setFontSize(9);
  
  const snapshotItems = [
    `Customer: ${cs.executiveSnapshot.customerName}`,
    `Site: ${cs.executiveSnapshot.site}, ${cs.executiveSnapshot.country}`,
    `Application: ${cs.executiveSnapshot.application}`,
    `Challenge: ${cs.executiveSnapshot.measurementChallenge}`,
    `Solution: ${cs.executiveSnapshot.solutionDeployed}`,
    `Status: ${cs.executiveSnapshot.status.replace("_", " ").toUpperCase()}`,
  ];
  
  let sy = y + 22;
  snapshotItems.forEach((item) => {
    const lines = doc.splitTextToSize(item, contentWidth - 16);
    doc.text(lines, margin + 8, sy);
    sy += lines.length * 5 + 2;
  });
  y += 90;

  // Key Outcomes
  if (cs.executiveSnapshot.keyOutcomes.some(o => o)) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
    doc.text("KEY OUTCOMES", margin, y);
    y += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
    doc.setFontSize(9);
    cs.executiveSnapshot.keyOutcomes.filter(o => o).forEach((outcome) => {
      doc.text(`• ${outcome}`, margin + 4, y);
      y += 6;
    });
  }

  // Page 2: Process Context & Problem
  y = addNewPage();
  
  // Process Context
  doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.text("PROCESS CONTEXT", margin + 8, y + 10);
  y += 22;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (cs.processContext.measurementLocation) {
    const lines = doc.splitTextToSize(cs.processContext.measurementLocation, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 8;
  }
  if (cs.processContext.whyItMatters) {
    const lines = doc.splitTextToSize(cs.processContext.whyItMatters, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 8;
  }
  if (cs.processContext.consequencesOfError) {
    const lines = doc.splitTextToSize(cs.processContext.consequencesOfError, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 15;
  }

  y = checkPageBreak(y, 60);
  
  // The Real Problem
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("THE REAL PROBLEM", margin + 8, y + 10);
  y += 22;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (cs.realProblem.statusQuoIssue) {
    const lines = doc.splitTextToSize(cs.realProblem.statusQuoIssue, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 8;
  }
  if (cs.realProblem.processInstability) {
    const lines = doc.splitTextToSize(cs.realProblem.processInstability, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 8;
  }
  if (cs.realProblem.maintenanceBurden) {
    const lines = doc.splitTextToSize(cs.realProblem.maintenanceBurden, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 15;
  }

  // Page 3: Success Criteria & Solution
  y = addNewPage();
  
  // Success Criteria
  doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.text("SUCCESS CRITERIA", margin + 8, y + 10);
  y += 22;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (cs.successCriteria.definition) {
    const lines = doc.splitTextToSize(cs.successCriteria.definition, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 10;
  }
  
  // Targets box
  if (cs.successCriteria.targets.some(t => t)) {
    doc.setFillColor(BRAND.lightGray.r, BRAND.lightGray.g, BRAND.lightGray.b);
    doc.roundedRect(margin, y, contentWidth, 30, 2, 2, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Targets:", margin + 5, y + 10);
    doc.setFont("helvetica", "normal");
    let tx = margin + 5;
    let ty = y + 20;
    cs.successCriteria.targets.filter(t => t).forEach((target) => {
      doc.text(`✓ ${target}`, tx, ty);
      tx += 80;
      if (tx > pageWidth - margin - 80) { tx = margin + 5; ty += 8; }
    });
    y += 40;
  }

  y = checkPageBreak(y, 80);
  
  // Solution Architecture
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SOLUTION ARCHITECTURE", margin + 8, y + 10);
  y += 22;
  
  // Specs grid
  const specs = [
    ["Product", cs.solutionArchitecture.product.replace("_", " ")],
    ["Installation", cs.solutionArchitecture.installationType.replace("_", " ")],
    ["Pipe Size", cs.solutionArchitecture.pipeSize],
    ["Material", cs.solutionArchitecture.pipeMaterial],
    ["Range", cs.solutionArchitecture.measurementRange],
  ].filter(s => s[1]);
  
  doc.setFontSize(9);
  let col = 0;
  specs.forEach(([label, value]) => {
    const x = margin + (col % 3) * 57;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
    doc.text(label, x, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
    doc.text(value, x, y + 6);
    col++;
    if (col % 3 === 0) y += 18;
  });
  if (col % 3 !== 0) y += 18;

  // Page 4: Commissioning & Results
  y = addNewPage();
  
  // Commissioning
  doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.text("COMMISSIONING & VALIDATION", margin + 8, y + 10);
  y += 22;
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  if (cs.commissioning.testDuration) {
    doc.text(`Test Duration: ${cs.commissioning.testDuration}`, margin, y);
    y += 8;
  }
  if (cs.commissioning.calibrationApproach) {
    doc.text(`Calibration: ${cs.commissioning.calibrationApproach}`, margin, y);
    y += 8;
  }
  if (cs.commissioning.comparisonMethods.length > 0) {
    doc.text(`Compared against: ${cs.commissioning.comparisonMethods.join(", ")}`, margin, y);
    y += 8;
  }
  if (cs.commissioning.edgeCasesTested.length > 0) {
    doc.text(`Edge cases tested: ${cs.commissioning.edgeCasesTested.join(", ")}`, margin, y);
    y += 8;
  }
  y += 15;

  y = checkPageBreak(y, 80);
  
  // Results - Technical
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICAL RESULTS", margin + 8, y + 10);
  y += 22;
  
  const results = [
    ["Precision", cs.technicalResults.accuracy],
    ["Stability", cs.technicalResults.stability],
    ["Response Time", cs.technicalResults.responseTime],
    ["Repeatability", cs.technicalResults.repeatability],
  ].filter(r => r[1]);
  
  doc.setFontSize(9);
  results.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
    doc.text(value || "", margin + 35, y);
    y += 8;
  });
  y += 10;

  // Results - Business Impact
  if (cs.businessImpact.impacts.some(i => i)) {
    doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
    doc.rect(margin, y, 3, 14, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
    doc.text("BUSINESS IMPACT", margin + 8, y + 10);
    y += 22;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    cs.businessImpact.impacts.filter(i => i).forEach((impact) => {
      doc.text(`✓ ${impact}`, margin, y);
      y += 7;
    });
  }

  // Page 5: Customer Voice & Insights
  y = addNewPage();
  
  // Customer Voice
  if (cs.customerVoice.quote) {
    doc.setFillColor(BRAND.lightGray.r, BRAND.lightGray.g, BRAND.lightGray.b);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, "F");
    doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
    doc.rect(margin, y, 4, 50, "F");
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
    const quoteLines = doc.splitTextToSize(`"${cs.customerVoice.quote}"`, contentWidth - 20);
    doc.text(quoteLines, margin + 12, y + 15);
    
    if (cs.customerVoice.name) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(BRAND.gray.r, BRAND.gray.g, BRAND.gray.b);
      doc.text(`— ${cs.customerVoice.name}, ${cs.customerVoice.role}, ${cs.customerVoice.company}`, margin + 12, y + 42);
    }
    y += 60;
  }

  y = checkPageBreak(y, 60);
  
  // Why This Worked
  doc.setFillColor(BRAND.lime.r, BRAND.lime.g, BRAND.lime.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.obsidian.r, BRAND.obsidian.g, BRAND.obsidian.b);
  doc.text("WHY THIS WORKED", margin + 8, y + 10);
  y += 22;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  if (cs.whyThisWorked.fitExplanation) {
    const lines = doc.splitTextToSize(cs.whyThisWorked.fitExplanation, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 10;
  }

  y = checkPageBreak(y, 60);
  
  // What's Next
  doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
  doc.rect(margin, y, 3, 14, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("WHAT'S NEXT", margin + 8, y + 10);
  y += 22;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  if (cs.whatsNext.futureIntent) {
    const lines = doc.splitTextToSize(cs.whatsNext.futureIntent, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 10;
  }
  
  if (cs.whatsNext.callToAction) {
    doc.setFillColor(BRAND.green.r, BRAND.green.g, BRAND.green.b);
    doc.roundedRect(margin, y, contentWidth, 12, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(cs.whatsNext.callToAction, margin + 8, y + 8);
  }

  // Add footers to all pages
  const totalPages = currentPage;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(doc, i, totalPages);
  }

  const filename = `rhosonics-case-study-${cs.executiveSnapshot.customerName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
};

export const exportComprehensiveCaseStudyToWord = async (cs: ComprehensiveCaseStudy) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: "CASE STUDY", bold: true, size: 20, color: "33993c" })],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `${cs.executiveSnapshot.customerName} – ${cs.executiveSnapshot.site}`, bold: true, size: 48 })],
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [new TextRun({ text: cs.executiveSnapshot.application, size: 28, color: "666666" })],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "EXECUTIVE SNAPSHOT", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          ...([
            `Customer: ${cs.executiveSnapshot.customerName}`,
            `Site: ${cs.executiveSnapshot.site}, ${cs.executiveSnapshot.country}`,
            `Application: ${cs.executiveSnapshot.application}`,
            `Challenge: ${cs.executiveSnapshot.measurementChallenge}`,
            `Solution: ${cs.executiveSnapshot.solutionDeployed}`,
          ].map(item => new Paragraph({ children: [new TextRun({ text: `• ${item}`, size: 22 })], spacing: { after: 100 } }))),
          new Paragraph({
            children: [new TextRun({ text: "PROCESS CONTEXT", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({ children: [new TextRun({ text: cs.processContext.measurementLocation || "", size: 22 })], spacing: { after: 200 } }),
          new Paragraph({ children: [new TextRun({ text: cs.processContext.whyItMatters || "", size: 22 })], spacing: { after: 200 } }),
          new Paragraph({
            children: [new TextRun({ text: "THE REAL PROBLEM", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({ children: [new TextRun({ text: cs.realProblem.statusQuoIssue || "", size: 22 })], spacing: { after: 200 } }),
          new Paragraph({
            children: [new TextRun({ text: "SUCCESS CRITERIA", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({ children: [new TextRun({ text: cs.successCriteria.definition || "", size: 22 })], spacing: { after: 200 } }),
          new Paragraph({
            children: [new TextRun({ text: "SOLUTION ARCHITECTURE", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({ children: [new TextRun({ text: `Product: ${cs.solutionArchitecture.product.replace("_", " ")}`, size: 22 })], spacing: { after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: `Pipe Size: ${cs.solutionArchitecture.pipeSize}`, size: 22 })], spacing: { after: 100 } }),
          new Paragraph({ children: [new TextRun({ text: `Range: ${cs.solutionArchitecture.measurementRange}`, size: 22 })], spacing: { after: 200 } }),
          new Paragraph({
            children: [new TextRun({ text: "RESULTS", bold: true, size: 24, color: "33993c" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          ...(cs.technicalResults.accuracy ? [new Paragraph({ children: [new TextRun({ text: `Precision: ${cs.technicalResults.accuracy}`, size: 22, bold: true })], spacing: { after: 100 } })] : []),
          ...(cs.businessImpact.impacts.filter(i => i).map(impact => new Paragraph({ children: [new TextRun({ text: `✓ ${impact}`, size: 22 })], spacing: { after: 100 } }))),
          ...(cs.customerVoice.quote ? [
            new Paragraph({
              children: [new TextRun({ text: "CUSTOMER VOICE", bold: true, size: 24, color: "33993c" })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({ children: [new TextRun({ text: `"${cs.customerVoice.quote}"`, italics: true, size: 24 })], spacing: { after: 100 } }),
            new Paragraph({ children: [new TextRun({ text: `— ${cs.customerVoice.name}, ${cs.customerVoice.role}`, size: 20, color: "666666" })], spacing: { after: 200 } }),
          ] : []),
          new Paragraph({
            children: [new TextRun({ text: `Generated by Rhosonics Brand Tools • ${new Date().toLocaleDateString()}`, size: 16, color: "999999" })],
            spacing: { before: 600 },
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `case-study-${cs.executiveSnapshot.customerName.toLowerCase().replace(/\s+/g, "-")}.docx`);
};
