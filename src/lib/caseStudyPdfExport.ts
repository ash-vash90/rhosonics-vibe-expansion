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

  try {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;
      
      onProgress?.(10 + Math.floor((i / pages.length) * 70));

      // Store original styles
      const originalStyle = page.getAttribute('style') || '';
      const originalClass = page.getAttribute('class') || '';
      
      // Force exact A4 dimensions for capture
      page.style.width = `${a4WidthPx}px`;
      page.style.height = `${a4HeightPx}px`;
      page.style.maxWidth = `${a4WidthPx}px`;
      page.style.aspectRatio = 'auto';
      page.style.transform = 'none';
      page.style.boxShadow = 'none';
      
      // Wait for any reflows
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the page as canvas with high quality
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: a4WidthPx,
        height: a4HeightPx,
        windowWidth: a4WidthPx,
        windowHeight: a4HeightPx,
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedPage = clonedDoc.querySelector(`article:nth-of-type(${i + 1})`) as HTMLElement;
          if (clonedPage) {
            clonedPage.style.width = `${a4WidthPx}px`;
            clonedPage.style.height = `${a4HeightPx}px`;
            clonedPage.style.maxWidth = `${a4WidthPx}px`;
            clonedPage.style.aspectRatio = 'auto';
            clonedPage.style.overflow = 'hidden';
          }
        }
      });

      // Restore original styles
      page.setAttribute('style', originalStyle);
      page.setAttribute('class', originalClass);

      // Convert to image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Add new page for pages after the first
      if (i > 0) {
        pdf.addPage();
      }

      // Add image to fill the entire A4 page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      onProgress?.(10 + Math.floor(((i + 1) / pages.length) * 80));
    }

    onProgress?.(95);

    // Generate filename
    const filename = `Rhosonics_Case_Study_${companyName.replace(/\s+/g, '_')}.pdf`;
    
    // Download
    pdf.save(filename);

    onProgress?.(100);
  } catch (error) {
    console.error('Error exporting case study PDF:', error);
    throw error;
  }
};

export default exportCaseStudyAsPDF;
