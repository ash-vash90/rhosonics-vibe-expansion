/**
 * Export a case study as a PDF document
 */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CaseStudyExportOptions {
  companyName: string;
  onProgress?: (progress: number) => void;
}

export const exportCaseStudyAsPDF = async (
  options: CaseStudyExportOptions
): Promise<void> => {
  const { companyName, onProgress } = options;
  
  // Find the document container with the A4 pages
  const documentContainer = document.querySelector('.case-study-document');
  const pages = documentContainer?.querySelectorAll('article') || document.querySelectorAll('article');
  
  if (!pages.length) {
    throw new Error('Could not find case study pages');
  }

  onProgress?.(5);

  // A4 dimensions in mm
  const pdfWidth = 210;
  const pdfHeight = 297;
  
  // A4 dimensions in pixels at 96 DPI (for consistent capture)
  const a4WidthPx = 794; // 210mm at 96 DPI
  const a4HeightPx = 1123; // 297mm at 96 DPI

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Add a body class during export so components can adjust (if needed)
  document.body.classList.add("pdf-exporting");

  try {
    // Ensure fonts are ready before capture
    // (prevents subtle reflow between capture + PDF render)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (document as any).fonts?.ready?.catch?.(() => undefined);

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      onProgress?.(10 + Math.floor((i / pages.length) * 70));

      // Store + enforce exact A4 pixel dimensions so layout is consistent regardless of viewport
      const originalStyle = page.getAttribute("style");

      try {
        page.style.width = `${a4WidthPx}px`;
        page.style.height = `${a4HeightPx}px`;
        page.style.maxWidth = `${a4WidthPx}px`;
        page.style.minHeight = `${a4HeightPx}px`;
        page.style.aspectRatio = "auto";
        page.style.transform = "none";
        page.style.boxShadow = "none";
        page.style.borderRadius = "0";

        // Wait for layout
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          width: a4WidthPx,
          height: a4HeightPx,
          windowWidth: a4WidthPx,
          windowHeight: a4HeightPx,
          onclone: (clonedDoc) => {
            clonedDoc.body.classList.add("pdf-exporting");
            const clonedPages = clonedDoc.querySelectorAll(".case-study-document article");
            clonedPages.forEach((p) => {
              const el = p as HTMLElement;
              el.style.width = `${a4WidthPx}px`;
              el.style.height = `${a4HeightPx}px`;
              el.style.maxWidth = `${a4WidthPx}px`;
              el.style.minHeight = `${a4HeightPx}px`;
              el.style.aspectRatio = "auto";
              el.style.overflow = "hidden";
              el.style.boxShadow = "none";
              el.style.borderRadius = "0";
            });
          },
        });

        // Convert to image
        const imgData = canvas.toDataURL("image/png");

        // Add new page for pages after the first
        if (i > 0) pdf.addPage();

        // Fit image to A4 WITHOUT distortion (never stretch)
        const imgAspect = canvas.width / canvas.height;
        let renderW = pdfWidth;
        let renderH = renderW / imgAspect;
        if (renderH > pdfHeight) {
          renderH = pdfHeight;
          renderW = renderH * imgAspect;
        }
        const x = (pdfWidth - renderW) / 2;
        const y = (pdfHeight - renderH) / 2;

        pdf.addImage(imgData, "PNG", x, y, renderW, renderH, undefined, "FAST");

        onProgress?.(10 + Math.floor(((i + 1) / pages.length) * 80));
      } finally {
        // Restore original styles
        if (originalStyle === null) page.removeAttribute("style");
        else page.setAttribute("style", originalStyle);
      }
    }

    onProgress?.(95);

    // Generate filename
    const filename = `Rhosonics_Case_Study_${companyName.replace(/\s+/g, "_")}.pdf`;

    // Download
    pdf.save(filename);

    onProgress?.(100);
  } catch (error) {
    console.error("Error exporting case study PDF:", error);
    throw error;
  } finally {
    document.body.classList.remove("pdf-exporting");
  }
};

export default exportCaseStudyAsPDF;
