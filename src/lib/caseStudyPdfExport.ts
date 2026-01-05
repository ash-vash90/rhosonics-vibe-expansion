/**
 * Export a case study as a PDF document
 */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CaseStudyExportOptions {
  companyName: string;
  onProgress?: (progress: number) => void;
}

const A4_MM = {
  width: 210,
  height: 297,
} as const;

// A4 dimensions in pixels at 96 DPI (for consistent capture)
const A4_PX = {
  width: 794, // 210mm at 96 DPI
  height: 1123, // 297mm at 96 DPI
} as const;

const createOffscreenExportFrame = (options: {
  viewportWidthPx: number;
  viewportHeightPx: number;
}) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;

  iframe.style.position = "fixed";
  iframe.style.left = "-100000px";
  iframe.style.top = "0";
  iframe.style.width = `${options.viewportWidthPx}px`;
  iframe.style.height = `${options.viewportHeightPx}px`;
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const frameDoc = iframe.contentDocument;
  if (!frameDoc) {
    iframe.remove();
    throw new Error("Could not create offscreen export frame");
  }

  // Build a minimal document; base tag ensures Vite asset URLs resolve.
  frameDoc.open();
  frameDoc.write(`<!doctype html><html><head><meta charset="utf-8" /><base href="${document.baseURI}" /></head><body></body></html>`);
  frameDoc.close();

  // Copy styles (Tailwind output + any component styles) into the iframe.
  document.head
    .querySelectorAll('style, link[rel="stylesheet"]')
    .forEach((node) => frameDoc.head.appendChild(node.cloneNode(true)));

  // Ensure predictable baseline styling.
  frameDoc.documentElement.style.margin = "0";
  frameDoc.documentElement.style.padding = "0";
  frameDoc.body.style.margin = "0";
  frameDoc.body.style.padding = "0";
  frameDoc.body.style.background = "#ffffff";

  // Used by CSS toggles (e.g. show pdf-only / hide no-pdf).
  frameDoc.body.classList.add("pdf-exporting");

  return { iframe, frameDoc };
};

const waitForFrameAssets = async (frameDoc: Document) => {
  // Ensure fonts are ready before capture (prevents subtle reflow)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (frameDoc as any).fonts?.ready?.catch?.(() => undefined);

  // Wait for all images to resolve (important when cloning into a new document)
  const images = Array.from(frameDoc.images);
  await Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
    )
  );

  // Give the browser a tick to finalize layout.
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};

export const exportCaseStudyAsPDF = async (options: CaseStudyExportOptions): Promise<void> => {
  const { companyName, onProgress } = options;

  // Find the document container with the A4 pages
  const sourceContainer = document.querySelector(".case-study-document");
  const sourcePages = sourceContainer?.querySelectorAll("article") ?? document.querySelectorAll(".case-study-document article");

  if (!sourcePages.length) {
    throw new Error("Could not find case study pages");
  }

  onProgress?.(5);

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Render/capture from an offscreen A4 viewport so layout never depends on the user's viewport.
  const { iframe, frameDoc } = createOffscreenExportFrame({
    viewportWidthPx: A4_PX.width,
    viewportHeightPx: A4_PX.height,
  });

  try {
    const wrapper = frameDoc.createElement("div");
    wrapper.className = "case-study-document";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "0";
    wrapper.style.padding = "0";
    wrapper.style.margin = "0";
    wrapper.style.alignItems = "flex-start";

    frameDoc.body.appendChild(wrapper);

    // Clone pages into the offscreen document and enforce exact A4 pixel sizing.
    Array.from(sourcePages).forEach((page) => {
      const cloned = page.cloneNode(true) as HTMLElement;
      cloned.style.width = `${A4_PX.width}px`;
      cloned.style.height = `${A4_PX.height}px`;
      cloned.style.maxWidth = `${A4_PX.width}px`;
      cloned.style.minHeight = `${A4_PX.height}px`;
      cloned.style.aspectRatio = "auto";
      cloned.style.transform = "none";
      cloned.style.boxShadow = "none";
      cloned.style.borderRadius = "0";
      cloned.style.overflow = "hidden";

      wrapper.appendChild(cloned);
    });

    await waitForFrameAssets(frameDoc);

    const pages = wrapper.querySelectorAll("article");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      onProgress?.(10 + Math.floor((i / pages.length) * 70));

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: A4_PX.width,
        height: A4_PX.height,
        windowWidth: A4_PX.width,
        windowHeight: A4_PX.height,
      });

      const imgData = canvas.toDataURL("image/png");

      if (i > 0) pdf.addPage();

      // Fit image to A4 WITHOUT distortion (never stretch)
      const imgAspect = canvas.width / canvas.height;
      let renderW = A4_MM.width;
      let renderH = renderW / imgAspect;
      if (renderH > A4_MM.height) {
        renderH = A4_MM.height;
        renderW = renderH * imgAspect;
      }
      const x = (A4_MM.width - renderW) / 2;
      const y = (A4_MM.height - renderH) / 2;

      pdf.addImage(imgData, "PNG", x, y, renderW, renderH, undefined, "FAST");

      onProgress?.(10 + Math.floor(((i + 1) / pages.length) * 80));
    }

    onProgress?.(95);

    const filename = `Rhosonics_Case_Study_${companyName.replace(/\s+/g, "_")}.pdf`;
    pdf.save(filename);

    onProgress?.(100);
  } catch (error) {
    console.error("Error exporting case study PDF:", error);
    throw error;
  } finally {
    iframe.remove();
  }
};

export default exportCaseStudyAsPDF;

