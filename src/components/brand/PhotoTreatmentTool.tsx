import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Download, RotateCcw, ZoomIn, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorAnalysis {
  avgHue: number;
  avgSaturation: number;
  avgLightness: number;
  warmth: "warm" | "neutral" | "cool";
  contrastRatio: number;
  dominantTone: string;
}

interface TreatmentPreset {
  saturation: number;
  contrast: number;
  brightness: number;
  label: string;
  reasoning: string;
}

function analyzeImage(canvas: HTMLCanvasElement): ColorAnalysis {
  const ctx = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const step = 8;
  let totalH = 0, totalS = 0, totalL = 0;
  let minL = 1, maxL = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    totalH += h * 360;
    totalS += s;
    totalL += l;
    if (l < minL) minL = l;
    if (l > maxL) maxL = l;
    count++;
  }

  const avgHue = totalH / count;
  const avgSaturation = totalS / count;
  const avgLightness = totalL / count;
  const contrastRatio = maxL - minL;

  let warmth: "warm" | "neutral" | "cool";
  if ((avgHue >= 0 && avgHue <= 70) || avgHue >= 300) warmth = "warm";
  else if (avgHue >= 170 && avgHue <= 270) warmth = "cool";
  else warmth = "neutral";

  let dominantTone: string;
  if (avgHue < 30 || avgHue >= 330) dominantTone = "Red/Orange";
  else if (avgHue < 70) dominantTone = "Yellow/Earth";
  else if (avgHue < 160) dominantTone = "Green";
  else if (avgHue < 250) dominantTone = "Blue/Cyan";
  else dominantTone = "Purple/Magenta";

  return { avgHue, avgSaturation, avgLightness, warmth, contrastRatio, dominantTone };
}

function generatePreset(analysis: ColorAnalysis): TreatmentPreset {
  let saturation: number, contrast: number, brightness: number, label: string, reasoning: string;

  if (analysis.warmth === "warm") {
    saturation = 0.90; contrast = 1.06; brightness = 0.98;
    label = "Warm → Industrial Cool";
    reasoning = `Warm ${analysis.dominantTone.toLowerCase()} tones detected (avg hue ${Math.round(analysis.avgHue)}°). Gentle desaturation to cool the mood, light contrast lift.`;
  } else if (analysis.warmth === "cool") {
    saturation = 0.93; contrast = 1.04; brightness = 0.99;
    label = "Cool → Cinematic Brand";
    reasoning = `Cool ${analysis.dominantTone.toLowerCase()} tones detected (avg hue ${Math.round(analysis.avgHue)}°). Minimal desaturation to preserve cool character with subtle contrast.`;
  } else {
    saturation = 0.92; contrast = 1.05; brightness = 0.98;
    label = "Neutral → Brand Standard";
    reasoning = `Neutral tones detected (avg hue ${Math.round(analysis.avgHue)}°). Light desaturation and contrast for standard brand treatment.`;
  }

  if (analysis.avgSaturation < 0.25) {
    saturation = Math.min(saturation + 0.05, 0.98);
    reasoning += " Source is already low-saturation — reducing desaturation to avoid washing out.";
  }
  if (analysis.contrastRatio < 0.4) {
    contrast = Math.min(contrast + 0.04, 1.12);
    reasoning += " Low native contrast — slight boost to compensate.";
  }

  return { saturation, contrast, brightness, label, reasoning };
}

/** Canvas-based unsharp mask sharpening */
function applyUnsharpMask(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const src = imageData.data;
  const copy = new Uint8ClampedArray(src);

  const stride = w * 4;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < stride - 4; x += 4) {
      const idx = y * stride + x;
      for (let c = 0; c < 3; c++) {
        const i = idx + c;
        const blurred = (
          copy[i - stride - 4] + copy[i - stride] * 2 + copy[i - stride + 4] +
          copy[i - 4] * 2 + copy[i] * 4 + copy[i + 4] * 2 +
          copy[i + stride - 4] + copy[i + stride] * 2 + copy[i + stride + 4]
        ) / 16;
        src[i] = Math.min(255, Math.max(0, copy[i] + amount * (copy[i] - blurred)));
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function renderTreated(img: HTMLImageElement, preset: TreatmentPreset, maxDim?: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const scale = maxDim ? Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight, 1) : 1;
  canvas.width = img.naturalWidth * scale;
  canvas.height = img.naturalHeight * scale;
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width, h = canvas.height;

  ctx.filter = `saturate(${preset.saturation}) contrast(${preset.contrast}) brightness(${preset.brightness})`;
  ctx.drawImage(img, 0, 0, w, h);
  ctx.filter = "none";

  // Green accent — very subtle, preserve all shadow detail
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = 0.12;
  const grd1 = ctx.createRadialGradient(w * 0.3, h * 0.6, 0, w * 0.3, h * 0.6, w * 0.55);
  grd1.addColorStop(0, "rgba(51,153,60,0.15)"); grd1.addColorStop(1, "transparent");
  ctx.fillStyle = grd1; ctx.fillRect(0, 0, w, h);

  const grd2 = ctx.createRadialGradient(w * 0.7, h * 0.4, 0, w * 0.7, h * 0.4, w * 0.45);
  grd2.addColorStop(0, "rgba(51,153,60,0.10)"); grd2.addColorStop(1, "transparent");
  ctx.fillStyle = grd2; ctx.fillRect(0, 0, w, h);

  // Cool tone — screen blend preserves blacks
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = 0.04;
  const coolGrd = ctx.createLinearGradient(0, 0, 0, h);
  coolGrd.addColorStop(0, "rgba(40,60,80,1)"); coolGrd.addColorStop(1, "rgba(35,65,70,1)");
  ctx.fillStyle = coolGrd; ctx.fillRect(0, 0, w, h);

  // Very subtle vignette — barely visible to avoid darkening edges
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 1;
  const vigGrd = ctx.createRadialGradient(w / 2, h / 2, w * 0.45, w / 2, h / 2, w * 0.85);
  vigGrd.addColorStop(0, "rgba(255,255,255,1)"); vigGrd.addColorStop(1, "rgba(240,240,242,1)");
  ctx.fillStyle = vigGrd; ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = "source-over";
  return canvas;
}

const PhotoTreatmentTool = () => {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [treatedDataUrl, setTreatedDataUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ColorAnalysis | null>(null);
  const [preset, setPreset] = useState<TreatmentPreset | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [upscaling, setUpscaling] = useState<number | null>(null); // 2 or 4 when in progress

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSourceDataUrl(dataUrl);

      const img = new Image();
      img.onload = () => {
        imgRef.current = img;

        // Analyze via temp canvas
        const c = document.createElement("canvas");
        const maxDim = 800;
        const scale = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight, 1);
        c.width = img.naturalWidth * scale;
        c.height = img.naturalHeight * scale;
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);

        const result = analyzeImage(c);
        const p = generatePreset(result);
        setAnalysis(result);
        setPreset(p);

        // Render treated preview
        const treated = renderTreated(img, p, 800);
        setTreatedDataUrl(treated.toDataURL("image/png"));
        setIsAnalyzing(false);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(() => {
    if (!imgRef.current || !preset) return;
    const fullCanvas = renderTreated(imgRef.current, preset);
    const link = document.createElement("a");
    link.download = `treated-${fileName || "image"}.png`;
    link.href = fullCanvas.toDataURL("image/png");
    link.click();
  }, [preset, fileName]);

  const handleUpscaleDownload = useCallback(async (scale: 2 | 4) => {
    if (!imgRef.current || !preset) return;
    setUpscaling(scale);

    try {
      // Render at full resolution then scale up with sharpening
      const fullCanvas = renderTreated(imgRef.current, preset);
      const w = fullCanvas.width * scale;
      const h = fullCanvas.height * scale;

      const upCanvas = document.createElement("canvas");
      upCanvas.width = w;
      upCanvas.height = h;
      const ctx = upCanvas.getContext("2d")!;

      // Use high-quality interpolation for upscale
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(fullCanvas, 0, 0, w, h);

      // Apply unsharp mask for sharpening
      applyUnsharpMask(ctx, w, h, scale === 4 ? 1.2 : 0.8);

      const link = document.createElement("a");
      link.download = `treated-${scale}x-${fileName || "image"}.png`;
      link.href = upCanvas.toDataURL("image/png");
      link.click();

      toast({ title: `${scale}× download ready`, description: `${w}×${h}px with sharpening applied` });
    } catch (e) {
      console.error("Upscale error:", e);
      toast({
        title: "Upscale failed",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setUpscaling(null);
    }
  }, [preset, fileName, toast]);

  const handleReset = useCallback(() => {
    setSourceDataUrl(null);
    setTreatedDataUrl(null);
    setAnalysis(null);
    setPreset(null);
    setSliderPosition(50);
    setFileName("");
    imgRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // Slider interaction
  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderMove(e.clientX);
  }, [handleSliderMove]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDragging, handleSliderMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  }, [handleSliderMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleSliderMove(e.touches[0].clientX);
  }, [isDragging, handleSliderMove]);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 bg-card border-b border-border">
        <h4 className="font-ui font-bold text-foreground mb-1">Photo Treatment Tool</h4>
        <p className="text-muted-foreground text-sm">
          Upload an image to analyze its colors and apply the correct brand treatment automatically.
        </p>
      </div>

      {!sourceDataUrl ? (
        <div className="p-8 md:p-12">
          <label className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-7 h-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <span className="font-ui font-semibold text-foreground block mb-1">Drop an image or click to upload</span>
              <span className="text-sm text-muted-foreground">JPG, PNG, or WebP</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : isAnalyzing ? (
        <div className="p-12 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-ui text-muted-foreground">Analyzing image colors…</span>
        </div>
      ) : (
        <div className="space-y-0">
          {/* Before/After slider */}
          <div
            ref={containerRef}
            className="relative aspect-video cursor-ew-resize select-none touch-manipulation bg-muted"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* Treated (full) */}
            {treatedDataUrl && (
              <img src={treatedDataUrl} alt="Treated" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            )}

            {/* Original (clipped) */}
            {sourceDataUrl && (
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <img src={sourceDataUrl} alt="Original" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
              </div>
            )}

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform ${isDragging ? "scale-110" : "hover:scale-105"}`}>
                <div className="flex items-center gap-0.5">
                  <svg className="w-3 h-3 text-slate-700 -mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-3 h-3 text-slate-700 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div
              className="absolute top-3 left-3 px-3 py-1 bg-warning-surface border border-warning-border rounded text-xs font-data text-warning transition-opacity"
              style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
            >
              ORIGINAL
            </div>
            <div
              className="absolute top-3 right-3 px-3 py-1 bg-success-surface border border-success-border rounded text-xs font-data text-success transition-opacity"
              style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
            >
              TREATED
            </div>
          </div>

          {/* Analysis results + actions */}
          <div className="p-4 md:p-6 space-y-5">
            {preset && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded text-sm font-data text-primary">
                  {preset.label}
                </span>
                <span className="text-sm text-muted-foreground">{fileName}</span>
              </div>
            )}

            {analysis && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="label-tech-sm text-primary block mb-1">WARMTH</span>
                  <span className="font-data text-lg text-foreground capitalize">{analysis.warmth}</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Avg hue {Math.round(analysis.avgHue)}°</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="label-tech-sm text-primary block mb-1">SATURATION</span>
                  <span className="font-data text-lg text-foreground">{Math.round(analysis.avgSaturation * 100)}%</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Source average</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="label-tech-sm text-primary block mb-1">CONTRAST</span>
                  <span className="font-data text-lg text-foreground">{Math.round(analysis.contrastRatio * 100)}%</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Luminance range</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="label-tech-sm text-primary block mb-1">DOMINANT</span>
                  <span className="font-data text-lg text-foreground">{analysis.dominantTone}</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Tone family</p>
                </div>
              </div>
            )}

            {preset && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <span className="label-tech-sm text-primary block mb-2">APPLIED TREATMENT</span>
                <div className="flex gap-6 flex-wrap text-sm mb-3">
                  <span className="font-data text-foreground">
                    SAT {preset.saturation > 1 ? "+" : ""}{Math.round((preset.saturation - 1) * 100)}%
                  </span>
                  <span className="font-data text-foreground">
                    CON +{Math.round((preset.contrast - 1) * 100)}%
                  </span>
                  <span className="font-data text-foreground">
                    BRI {preset.brightness > 1 ? "+" : ""}{Math.round((preset.brightness - 1) * 100)}%
                  </span>
                  <span className="font-data text-foreground">
                    + BRAND ACCENT + VIGNETTE
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{preset.reasoning}</p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded font-ui text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download 1x
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-card text-foreground rounded font-ui text-sm font-medium hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Image
                </button>
              </div>

              {/* AI Upscale Downloads */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpscaleDownload(2)}
                  disabled={upscaling !== null}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/30 bg-primary/5 text-primary rounded font-ui text-sm font-medium hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {upscaling === 2 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ZoomIn className="w-4 h-4" />
                  )}
                  {upscaling === 2 ? "Upscaling…" : "Download 2× (AI Upscale)"}
                </button>
                <button
                  onClick={() => handleUpscaleDownload(4)}
                  disabled={upscaling !== null}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/30 bg-primary/5 text-primary rounded font-ui text-sm font-medium hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {upscaling === 4 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ZoomIn className="w-4 h-4" />
                  )}
                  {upscaling === 4 ? "Upscaling…" : "Download 4× (AI Upscale)"}
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                AI upscaling enhances resolution and sharpness while preserving the brand treatment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTreatmentTool;
