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
  
  // Find all A4 article elements (the pages)
  const pages = document.querySelectorAll('article');
  if (!pages.length) {
    throw new Error('Could not find case study pages');
  }

  onProgress?.(5);

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  try {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;
      
      onProgress?.(10 + (i * 40));

      // Capture the page as canvas
      const canvas = await html2canvas(page, {
        scale: 2, // Higher quality for print
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: page.offsetWidth,
        height: page.offsetHeight,
      });

      onProgress?.(30 + (i * 40));

      // Convert to image
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Calculate dimensions to fit A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add new page for pages after the first
      if (i > 0) {
        pdf.addPage();
      }

      // Add image centered on page
      const yOffset = (pdfHeight - imgHeight) / 2;
      pdf.addImage(
        imgData, 
        'JPEG', 
        0, 
        yOffset > 0 ? yOffset : 0, 
        imgWidth, 
        imgHeight > pdfHeight ? pdfHeight : imgHeight
      );

      onProgress?.(50 + (i * 25));
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
