import jsPDF from 'jspdf';

interface Section {
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    title: "Brand Foundation",
    content: [
      "Our palette comes from the places we work: control room panels, active measurement indicators, field sites. Forty years of deployment informed these choices.",
      "",
      "We speak to engineers. JetBrains Mono for data. Instrument Sans for everything else. Unbounded for the logo only.",
      "",
      "Our reader skips to the specification table. We put it first."
    ]
  },
  {
    title: "Color Palette",
    content: [
      "PRIMARY COLORS",
      "• Rhosonics Green: #33993c — Primary brand identifier",
      "• Lime Accent: #73B82E — Gradients only",
      "• Obsidian: #111522 — Dark surfaces",
      "",
      "EARTH TONES",
      "• Earth Ochre: #a69359 — Field accent",
      "• Earth Sand: #d9d0b8 — Surface",
      "• Earth Clay: #7a6b4e — Deep accent",
      "",
      "ECO TINTS",
      "• Eco Surface: #ecf8ed — Card backgrounds",
      "• Eco Border: #d9f2db — Structure elements"
    ]
  },
  {
    title: "Typography",
    content: [
      "FONT STACK",
      "• Logo: Unbounded 500",
      "• Display/Headings: Instrument Sans 700",
      "• Body: Instrument Sans 400",
      "• Data/Labels: JetBrains Mono 500",
      "",
      "TYPE SCALE",
      "• 5xl: 48px — Display Hero",
      "• 4xl: 36px — Section Title",
      "• 3xl: 30px — Page Heading",
      "• 2xl: 24px — Card Title",
      "• xl: 20px — Subheading",
      "• lg: 18px — Large Body",
      "• base: 16px — Body Copy",
      "• sm: 14px — Caption",
      "• xs: 12px — Labels"
    ]
  },
  {
    title: "Spacing System",
    content: [
      "4px increments. Consistency over creativity.",
      "",
      "SCALE",
      "• 1 (4px): Tight inline spacing",
      "• 2 (8px): Icon gaps, button padding",
      "• 3 (12px): Small component gaps",
      "• 4 (16px): Standard padding",
      "• 6 (24px): Card padding, section gaps",
      "• 8 (32px): Large component spacing",
      "• 12 (48px): Section margins",
      "• 16 (64px): Major section breaks"
    ]
  },
  {
    title: "Voice & Tone",
    content: [
      "Our reader skips to the specification table. We put it first.",
      "",
      "VOICE PILLARS",
      "• Direct — Lead with the point",
      "• Technical — Use precise terminology",
      "• Confident — We measure, we know, we deliver",
      "• Practical — Focus on ROI and operational benefits",
      "",
      "PREFERRED TERMINOLOGY",
      "• \"Ultrasonic measurement\" not \"cutting-edge technology\"",
      "• \"System\" not \"solution\"",
      "• \"Use\" not \"leverage\" or \"utilize\"",
      "• \"Reduces X by Y%\" not \"game-changing\""
    ]
  },
  {
    title: "Motion Design",
    content: [
      "If it moves, there should be a reason.",
      "",
      "TIMING",
      "• 200ms: Quick feedback (hovers, state changes)",
      "• 300ms: Standard transitions (modals, accordions)",
      "• 500ms: Emphasis (brand reveals, loading)",
      "",
      "EASING",
      "• ease-out: Default for entrances",
      "• ease-in-out: Continuous loops",
      "• linear: Data updates"
    ]
  },
  {
    title: "Do's & Don'ts",
    content: [
      "Mistakes we've witnessed. Guardrails we've installed.",
      "",
      "ALWAYS",
      "• Maintain minimum clear space around logo",
      "• Use high contrast for data displays",
      "• Include units with all measurements",
      "• Test designs in both light and dark contexts",
      "",
      "NEVER",
      "• Add drop shadows or glows to the logo",
      "• Use decorative or script fonts",
      "• Apply gradient to body text",
      "• Use Lime Accent as a standalone color"
    ]
  }
];

export const exportDesignSystemPDF = () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Cover page
  pdf.setFillColor(17, 21, 34); // Obsidian
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Logo area (simplified representation)
  pdf.setDrawColor(51, 153, 60); // Rhosonics Green
  pdf.setLineWidth(2);
  pdf.circle(pageWidth / 2, 80, 25, 'S');
  pdf.circle(pageWidth / 2, 80, 18, 'S');
  pdf.circle(pageWidth / 2, 80, 11, 'S');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RHOSONICS', pageWidth / 2, 130, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(148, 163, 184); // Slate 400
  pdf.text('DESIGN SYSTEM', pageWidth / 2, 142, { align: 'center' });

  pdf.setFontSize(10);
  pdf.text('ULTRASONIC MEASUREMENT SOLUTIONS', pageWidth / 2, 155, { align: 'center' });

  // Version info
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139);
  pdf.text(`Generated ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

  // Content pages
  sections.forEach((section, sectionIndex) => {
    pdf.addPage();

    // Header bar
    pdf.setFillColor(17, 21, 34);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    
    pdf.setTextColor(51, 153, 60);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RHOSONICS', margin, 16);
    
    pdf.setTextColor(148, 163, 184);
    pdf.setFont('helvetica', 'normal');
    pdf.text('DESIGN SYSTEM', margin + 30, 16);

    // Section title
    pdf.setTextColor(17, 21, 34);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(section.title, margin, 45);

    // Section number
    pdf.setTextColor(51, 153, 60);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${String(sectionIndex + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`, pageWidth - margin, 45, { align: 'right' });

    // Divider
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 50, pageWidth - margin, 50);

    // Content
    let y = 62;
    pdf.setTextColor(71, 85, 105);
    pdf.setFontSize(10);

    section.content.forEach(line => {
      if (line === '') {
        y += 4;
      } else if (line.startsWith('•')) {
        pdf.setFont('helvetica', 'normal');
        const splitLines = pdf.splitTextToSize(line, contentWidth - 10);
        splitLines.forEach((splitLine: string) => {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = 40;
          }
          pdf.text(splitLine, margin + 5, y);
          y += 5;
        });
      } else if (line === line.toUpperCase() && line.length > 2) {
        // Heading
        y += 3;
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(17, 21, 34);
        pdf.text(line, margin, y);
        pdf.setTextColor(71, 85, 105);
        pdf.setFont('helvetica', 'normal');
        y += 7;
      } else {
        const splitLines = pdf.splitTextToSize(line, contentWidth);
        splitLines.forEach((splitLine: string) => {
          if (y > pageHeight - 30) {
            pdf.addPage();
            y = 40;
          }
          pdf.text(splitLine, margin, y);
          y += 5;
        });
      }
    });

    // Footer
    pdf.setTextColor(148, 163, 184);
    pdf.setFontSize(8);
    pdf.text('www.rhosonics.com', margin, pageHeight - 15);
    pdf.text(`${sectionIndex + 2}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
  });

  pdf.save('rhosonics-design-system.pdf');
};
