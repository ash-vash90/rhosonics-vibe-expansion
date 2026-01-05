/**
 * Export the current page as a PDF document
 */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportAsPDF = async (
  onProgress?: (progress: number) => void
): Promise<void> => {
  const mainContent = document.querySelector('main');
  if (!mainContent) {
    throw new Error('Could not find main content');
  }

  onProgress?.(10);

  // Hide elements that shouldn't be in the PDF
  const excludedElements = document.querySelectorAll('[data-export-exclude]');
  excludedElements.forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });

  try {
    onProgress?.(20);

    // Capture the content as canvas
    const canvas = await html2canvas(mainContent as HTMLElement, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FAFAF8', // Match background
      logging: false,
    });

    onProgress?.(60);

    // Calculate PDF dimensions (A4)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add header
    pdf.setFillColor(28, 31, 30); // Obsidian
    pdf.rect(0, 0, 210, 20, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RHOSONICS', 15, 10);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('ULTRASONIC MEASUREMENT SOLUTIONS', 15, 15);
    pdf.setFontSize(8);
    pdf.text('Brand Guidelines', 195, 12, { align: 'right' });

    onProgress?.(70);

    // Calculate how many pages we need
    const contentStartY = 25;
    const footerHeight = 15;
    const usableHeight = pageHeight - contentStartY - footerHeight;
    const scaledImgHeight = imgHeight;
    const totalPages = Math.ceil(scaledImgHeight / usableHeight);

    // Add image across pages
    let heightLeft = imgHeight;
    let position = contentStartY;
    let currentPage = 1;

    // Add first page content
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);

    // Add footer to first page
    addFooter(pdf, currentPage, totalPages);

    heightLeft -= usableHeight;

    // Add remaining pages
    while (heightLeft > 0) {
      pdf.addPage();
      currentPage++;
      position = contentStartY - (currentPage - 1) * usableHeight;
      
      // Add header to each page
      pdf.setFillColor(28, 31, 30);
      pdf.rect(0, 0, 210, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('RHOSONICS', 15, 10);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      pdf.text('ULTRASONIC MEASUREMENT SOLUTIONS', 15, 15);
      
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      addFooter(pdf, currentPage, totalPages);
      
      heightLeft -= usableHeight;
    }

    onProgress?.(90);

    // Download
    pdf.save('rhosonics-brand-guidelines.pdf');

    onProgress?.(100);
  } finally {
    // Restore hidden elements
    excludedElements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
  }
};

const addFooter = (pdf: jsPDF, currentPage: number, totalPages: number): void => {
  const pageHeight = 297;
  
  pdf.setFillColor(28, 31, 30);
  pdf.rect(0, pageHeight - 10, 210, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7);
  pdf.text('www.rhosonics.com', 15, pageHeight - 4);
  pdf.text(`${currentPage} / ${totalPages}`, 195, pageHeight - 4, { align: 'right' });
};
