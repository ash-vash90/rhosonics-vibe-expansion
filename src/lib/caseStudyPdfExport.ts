/**
 * Export a case study as a PDF document
 * High-quality raster approach with consistent font loading
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

// Higher scale for better text quality (3x gives ~300 DPI effective resolution)
const CAPTURE_SCALE = 3;

// Google Font URLs used by the app (must match index.html)
const GOOGLE_FONT_URLS = [
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
];

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

  // Add Google Font links directly to ensure fonts load in the iframe context
  GOOGLE_FONT_URLS.forEach((url) => {
    const link = frameDoc.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    frameDoc.head.appendChild(link);
  });

  // Copy styles (Tailwind output + any component styles) into the iframe.
  document.head
    .querySelectorAll('style, link[rel="stylesheet"]')
    .forEach((node) => {
      // Skip Google Font links we already added
      if (node instanceof HTMLLinkElement && node.href.includes("fonts.googleapis.com")) {
        return;
      }
      frameDoc.head.appendChild(node.cloneNode(true));
    });

  // Ensure predictable baseline styling.
  frameDoc.documentElement.style.margin = "0";
  frameDoc.documentElement.style.padding = "0";
  frameDoc.body.style.margin = "0";
  frameDoc.body.style.padding = "0";
  frameDoc.body.style.background = "#ffffff";

  // Force consistent font rendering
  frameDoc.body.style.textRendering = "geometricPrecision";
  (frameDoc.body.style as unknown as Record<string, string>).webkitFontSmoothing = "antialiased";

  // Used by CSS toggles (e.g. show pdf-only / hide no-pdf).
  frameDoc.body.classList.add("pdf-exporting");

  return { iframe, frameDoc };
};

const waitForFontsToLoad = async (frameDoc: Document, timeoutMs = 5000): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fonts = (frameDoc as any).fonts as FontFaceSet | undefined;
  if (!fonts) return;

  try {
    // Wait for fonts.ready with a timeout
    await Promise.race([
      fonts.ready,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Font loading timeout")), timeoutMs)
      ),
    ]);

    // Explicitly load the fonts we need to ensure they're available
    const fontFamilies = ["Unbounded", "Instrument Sans", "JetBrains Mono"];
    const loadPromises = fontFamilies.flatMap((family) => [
      fonts.load(`400 16px "${family}"`).catch(() => undefined),
      fonts.load(`500 16px "${family}"`).catch(() => undefined),
      fonts.load(`600 16px "${family}"`).catch(() => undefined),
      fonts.load(`700 16px "${family}"`).catch(() => undefined),
    ]);

    await Promise.all(loadPromises);
  } catch (e) {
    console.warn("Font loading warning:", e);
  }
};

const waitForFrameAssets = async (frameDoc: Document) => {
  // Wait for fonts to fully load first
  await waitForFontsToLoad(frameDoc);

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

  // Give the browser multiple frames to finalize layout after font/image loading
  await new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTimeout(resolve, 50))
      )
    )
  );
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

    onProgress?.(15);

    await waitForFrameAssets(frameDoc);

    onProgress?.(25);

    const pages = wrapper.querySelectorAll("article");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      onProgress?.(30 + Math.floor((i / pages.length) * 55));

      const canvas = await html2canvas(page, {
        scale: CAPTURE_SCALE,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: A4_PX.width,
        height: A4_PX.height,
        windowWidth: A4_PX.width,
        windowHeight: A4_PX.height,
        // Improve image quality
        imageTimeout: 15000,
        // Remove any scaling transforms that might affect rendering
        onclone: (clonedDoc) => {
          clonedDoc.body.style.transform = "none";
          clonedDoc.body.style.transformOrigin = "top left";
        },
      });

      // Use higher quality JPEG for smaller file size while maintaining quality
      // or PNG for best quality
      const imgData = canvas.toDataURL("image/png", 1.0);

      if (i > 0) pdf.addPage();

      // Fit image to A4 at full page (since we captured at exact A4 ratio)
      pdf.addImage(imgData, "PNG", 0, 0, A4_MM.width, A4_MM.height, undefined, "FAST");

      onProgress?.(30 + Math.floor(((i + 1) / pages.length) * 60));
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

