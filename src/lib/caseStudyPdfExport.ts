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

// Timeout helper that RESOLVES (not rejects) to avoid skipping font loads
const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T | undefined> =>
  Promise.race([
    p,
    new Promise<undefined>((res) => setTimeout(() => res(undefined), ms)),
  ]);

// Layout settle using iframe's rAF + micro delay for paint queue flush
const settleLayout = async (frameDoc: Document): Promise<void> => {
  const win = frameDoc.defaultView ?? window;
  const raf = (cb: FrameRequestCallback) => win.requestAnimationFrame(cb);

  // Force reflow
  void frameDoc.body.offsetHeight;

  // 2x rAF in iframe's rendering loop
  await new Promise<void>((res) => raf(() => res()));
  await new Promise<void>((res) => raf(() => res()));

  // Micro delay to let paint queue flush
  await new Promise<void>((res) => setTimeout(res, 0));
};

// Blank canvas detection via sampled pixel check
function looksBlank(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext("2d");
  if (!ctx) return true;

  const w = Math.min(200, canvas.width);
  const h = Math.min(200, canvas.height);
  const data = ctx.getImageData(0, 0, w, h).data;

  const step = 40; // sample every 10th pixel (4 bytes per pixel)
  for (let i = 0; i < data.length; i += step) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (!(a === 255 && r === 255 && g === 255 && b === 255)) return false;
  }
  return true;
}

const BLEED = 2; // CSS px

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
  const fonts = frameDoc.fonts;
  if (!fonts) return;

  const fontsToLoad = [
    '700 18px "Unbounded"',
    '700 36px "Instrument Sans"',
    '600 20px "Instrument Sans"',
    '600 14px "Instrument Sans"',
    '500 14px "Instrument Sans"',
    '400 14px "Instrument Sans"',
    '400 12px "Instrument Sans"',
    '400 36px "JetBrains Mono"',
    '400 12px "JetBrains Mono"',
    '500 12px "JetBrains Mono"',
  ];

  await withTimeout(
    Promise.all(fontsToLoad.map((f) => fonts.load(f).catch(() => undefined))),
    timeoutMs
  );

  await withTimeout(fonts.ready, timeoutMs);
};

const waitForFrameAssets = async (frameDoc: Document): Promise<void> => {
  await waitForFontsToLoad(frameDoc);
  await settleLayout(frameDoc);

  const images = Array.from(frameDoc.images);
  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      }
      if (img.decode) await img.decode().catch(() => {});
    })
  );

  await settleLayout(frameDoc);
};

async function capturePageWithFallback(
  page: HTMLElement,
  scale: number,
  captureWidth: number,
  captureHeight: number,
  offsetX: number,
  offsetY: number
): Promise<HTMLCanvasElement> {
  const baseOptions = {
    scale,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    width: captureWidth,
    height: captureHeight,
    x: offsetX,
    y: offsetY,
    windowWidth: A4_PX.width,
    windowHeight: A4_PX.height,
    imageTimeout: 15000,
    onclone: (clonedDoc: Document) => {
      clonedDoc.documentElement.classList.add("pdf-exporting");

      clonedDoc.querySelectorAll("p, li, td, th, span").forEach((el) => {
        const cs = clonedDoc.defaultView?.getComputedStyle(el);
        if (!cs) return;

        const ls = cs.letterSpacing;
        if (ls !== "normal") {
          const px = parseFloat(ls);
          if (!Number.isNaN(px) && Math.abs(px - Math.round(px)) > 1e-3) {
            (el as HTMLElement).style.letterSpacing = "0px";
          }
        }
      });
    },
  } satisfies Parameters<typeof html2canvas>[1];

  try {
    const canvas = await html2canvas(page, {
      ...baseOptions,
      foreignObjectRendering: true,
      allowTaint: false,
    });

    if (looksBlank(canvas)) throw new Error("Blank canvas fallback");

    return canvas;
  } catch {
    return await html2canvas(page, {
      ...baseOptions,
      foreignObjectRendering: false,
      allowTaint: true,
    });
  }
}

export const exportCaseStudyAsPDF = async (options: CaseStudyExportOptions): Promise<void> => {
  const { companyName, onProgress } = options;

  // Find the document container with the A4 pages
  const sourceContainer = document.querySelector(".case-study-document");
  const sourcePages =
    sourceContainer?.querySelectorAll("article") ??
    document.querySelectorAll(".case-study-document article");

  if (!sourcePages.length) {
    throw new Error("Could not find case study pages");
  }

  onProgress?.(5);

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

    // Wrap asset loading with a hard timeout to prevent indefinite hangs
    await withTimeout(waitForFrameAssets(frameDoc), 10000);

    onProgress?.(25);

    const pages = wrapper.querySelectorAll("article");
    let pdf: jsPDF | null = null;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      onProgress?.(30 + Math.floor((i / pages.length) * 55));

      // Capture with bleed margin for edge clipping prevention
      const rawCanvas = await capturePageWithFallback(
        page,
        CAPTURE_SCALE,
        A4_PX.width + BLEED * 2,
        A4_PX.height + BLEED * 2,
        -BLEED,
        -BLEED
      );

      // Crop the bleed margin back out
      const bleedPx = BLEED * CAPTURE_SCALE;
      const cropped = document.createElement("canvas");
      cropped.width = rawCanvas.width - bleedPx * 2;
      cropped.height = rawCanvas.height - bleedPx * 2;

      const ctx = cropped.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(
        rawCanvas,
        bleedPx,
        bleedPx,
        cropped.width,
        cropped.height,
        0,
        0,
        cropped.width,
        cropped.height
      );

      // Free memory from raw canvas
      rawCanvas.width = 0;
      rawCanvas.height = 0;

      const w = cropped.width;
      const h = cropped.height;

      if (i === 0) {
        // Create PDF with exact canvas pixel dimensions (1:1 embedding, no resampling)
        pdf = new jsPDF({
          unit: "px",
          format: [w, h],
          orientation: "portrait",
          hotfixes: ["px_scaling"],
        });
      } else {
        pdf!.addPage([w, h], "portrait");
      }

      // Use dataURL for compatibility, no "FAST" compression
      const imgData = cropped.toDataURL("image/png", 1.0);
      pdf!.addImage(imgData, "PNG", 0, 0, w, h);

      // Free memory
      cropped.width = 0;
      cropped.height = 0;

      onProgress?.(30 + Math.floor(((i + 1) / pages.length) * 60));
    }

    onProgress?.(95);

    if (!pdf) throw new Error("No pages found to export");

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

