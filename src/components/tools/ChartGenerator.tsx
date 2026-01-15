import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy, Download, Loader2, BarChart3, Plus, Trash2, Palette, FileDown, Film, RotateCcw, Search, CheckCircle2, XCircle } from "@/lib/icons";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import GIF from "gif.js";
import gifWorkerUrl from "gif.js/dist/gif.worker.js?url";
import { BrandChart, BrandChartRef, DataPoint } from "./BrandChart";

const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "horizontal-bar", label: "Horizontal Bar" },
  { value: "grouped-bar", label: "Grouped Bar (Multi-Series)" },
  { value: "stacked-bar", label: "Stacked Bar" },
  { value: "line", label: "Line Chart" },
  { value: "multi-line", label: "Multi-Line (Multi-Series)" },
  { value: "area", label: "Area Chart" },
  { value: "stacked-area", label: "Stacked Area" },
  { value: "composed", label: "Composed (Bar + Line)" },
  { value: "radar", label: "Radar Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "scatter", label: "Scatter Plot" },
];

// Brand colors only
const BRAND_COLORS = [
  { value: "primary", label: "Brand Green", color: "hsl(125, 50%, 40%)" },
  { value: "lime", label: "Lime Accent", color: "hsl(90, 60%, 45%)" },
  { value: "amber", label: "Earth Amber", color: "hsl(45, 70%, 48%)" },
  { value: "ochre", label: "Earth Ochre", color: "hsl(45, 40%, 38%)" },
  { value: "slate", label: "Slate", color: "hsl(215, 20%, 45%)" },
  { value: "dark-green", label: "Dark Green", color: "hsl(125, 50%, 25%)" },
];

// Gradient backgrounds only
const BACKGROUND_GRADIENTS = [
  { value: "obsidian", label: "Obsidian", gradient: "linear-gradient(180deg, hsl(225, 25%, 18%) 0%, hsl(226, 33%, 10%) 100%)" },
  { value: "slate-dark", label: "Slate Dark", gradient: "linear-gradient(180deg, hsl(217, 33%, 20%) 0%, hsl(222, 47%, 11%) 100%)" },
  { value: "ore", label: "Ore", gradient: "linear-gradient(180deg, hsl(215, 25%, 27%) 0%, hsl(226, 33%, 10%) 100%)" },
  { value: "metal-light", label: "Metal Light", gradient: "linear-gradient(135deg, hsl(210, 40%, 98%) 0%, hsl(214, 32%, 91%) 100%)" },
  { value: "field", label: "Field", gradient: "linear-gradient(180deg, hsl(40, 30%, 85%) 0%, hsl(40, 25%, 92%) 100%)" },
  { value: "eco", label: "Eco Surface", gradient: "linear-gradient(180deg, hsl(125, 43%, 95%) 0%, hsl(125, 40%, 90%) 100%)" },
];

const ASPECT_RATIOS = [
  { value: "16:9", label: "16:9 (Wide)", height: 280 },
  { value: "4:3", label: "4:3 (Standard)", height: 320 },
  { value: "1:1", label: "1:1 (Square)", height: 400 },
  { value: "3:4", label: "3:4 (Portrait)", height: 480 },
  { value: "21:9", label: "21:9 (Ultrawide)", height: 220 },
];

const PNG_SCALES = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 4, label: "4x" },
];

// Smart animation presets - curated to prevent ugly charts
const ANIMATION_PRESETS = [
  { 
    value: "none", 
    label: "None",
    duration: 0,
  },
  { 
    value: "smooth", 
    label: "Smooth Rise",
    duration: 800,
  },
  { 
    value: "bouncy", 
    label: "Bouncy",
    duration: 1200,
  },
  { 
    value: "cascade", 
    label: "Cascade",
    duration: 600,
  },
  { 
    value: "dramatic", 
    label: "Dramatic",
    duration: 1500,
  },
];

interface DependencyResults {
  hasBillboard: boolean;
  hasD3: boolean;
  hasInstrumentSans: boolean;
  hasJetBrainsMono: boolean;
}

export const ChartGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [showAxisTitles, setShowAxisTitles] = useState(true);
  const [aspectRatio, setAspectRatio] = useState("4:3");
  const [pngScale, setPngScale] = useState(2);
  const [animationPreset, setAnimationPreset] = useState("smooth");
  const [animationKey, setAnimationKey] = useState(0);
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const [primaryColor, setPrimaryColor] = useState("primary");
  const [secondaryColor, setSecondaryColor] = useState("amber");
  const [tertiaryColor, setTertiaryColor] = useState("slate");
  const [bgGradient, setBgGradient] = useState("obsidian");
  const [useChamfer, setUseChamfer] = useState(false);
  const [exportPadding, setExportPadding] = useState(24);
  
  // Page dependency detection state
  const [targetPageUrl, setTargetPageUrl] = useState("");
  const [isCheckingPage, setIsCheckingPage] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DependencyResults | null>(null);
  
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { name: "Item 1", value: 100, value2: 80, value3: 60 },
    { name: "Item 2", value: 80, value2: 90, value3: 70 },
    { name: "Item 3", value: 60, value2: 70, value3: 85 },
  ]);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const brandChartRef = useRef<BrandChartRef>(null);

  const isMultiSeries = ["grouped-bar", "stacked-bar", "multi-line", "stacked-area", "composed", "radar"].includes(chartType);
  const isLightBg = ["metal-light", "field", "eco"].includes(bgGradient);
  const chartHeight = ASPECT_RATIOS.find(r => r.value === aspectRatio)?.height || 320;
  const currentAnimation = ANIMATION_PRESETS.find(a => a.value === animationPreset) || ANIMATION_PRESETS[0];

  const textColor = isLightBg ? "hsl(226, 33%, 10%)" : "hsl(210, 40%, 96%)";
  const axisColor = isLightBg ? "hsl(215, 19%, 35%)" : "hsl(215, 19%, 55%)";

  useEffect(() => {
    // Warm-load Rhosonics data font
    document.fonts?.load?.("500 12px 'JetBrains Mono'");
  }, []);

  const replayAnimation = useCallback(() => {
    setAnimationKey(k => k + 1);
    // Trigger chart replay
    setTimeout(() => {
      brandChartRef.current?.replay();
    }, 50);
  }, []);

  const getColorValue = (colorKey: string) => {
    return BRAND_COLORS.find(c => c.value === colorKey)?.color || BRAND_COLORS[0].color;
  };

  const getGradientValue = (gradientKey: string) => {
    return BACKGROUND_GRADIENTS.find(g => g.value === gradientKey)?.gradient || BACKGROUND_GRADIENTS[0].gradient;
  };

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { name: `Item ${dataPoints.length + 1}`, value: 50, value2: 40, value3: 30 }]);
  };

  const removeDataPoint = (index: number) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  const updateDataPoint = (index: number, field: keyof DataPoint, value: string | number) => {
    const updated = [...dataPoints];
    updated[index] = { ...updated[index], [field]: field === "name" ? value : Number(value) };
    setDataPoints(updated);
  };

  const handleCheckPage = async () => {
    if (!targetPageUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setIsCheckingPage(true);
    setDetectionResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("check-page-dependencies", {
        body: { url: targetPageUrl },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setDetectionResults(data);
      toast.success("Page analyzed");
    } catch (error: any) {
      console.error("Page check error:", error);
      toast.error(error.message || "Failed to analyze page");
    } finally {
      setIsCheckingPage(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!title.trim()) {
      toast.error("Please enter a chart title");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-brand-chart", {
        body: {
          chartConfig: {
            title,
            description,
            chartType,
            xAxisLabel,
            yAxisLabel,
            data: dataPoints,
            colors: {
              primary: getColorValue(primaryColor),
              secondary: getColorValue(secondaryColor),
              tertiary: getColorValue(tertiaryColor),
            },
            background: getGradientValue(bgGradient),
            useChamfer,
            dependencies: detectionResults || {
              hasBillboard: false,
              hasD3: false,
              hasInstrumentSans: false,
              hasJetBrainsMono: false,
            },
          },
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setCode(data.code);
      toast.success("Chart code generated");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate chart code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleDownloadSvg = async () => {
    if (!brandChartRef.current) {
      toast.error("Chart not ready");
      return;
    }

    try {
      const dataUrl = await brandChartRef.current.export("image/svg+xml");
      
      // Convert data URL to blob and download
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-") || "chart"}-chart.svg`;
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
      toast.success("Chart downloaded as SVG");
    } catch (err) {
      console.error("SVG export error:", err);
      toast.error("Failed to download SVG");
    }
  };

  const handleDownloadPng = async () => {
    if (!chartContainerRef.current) {
      toast.error("Chart not ready");
      return;
    }

    try {
      await document.fonts?.load?.("500 12px 'JetBrains Mono'");
      await document.fonts?.ready;

      const canvas = await html2canvas(chartContainerRef.current, {
        backgroundColor: null,
        scale: pngScale,
        logging: false,
        useCORS: true,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-") || "chart"}-chart.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Chart downloaded as PNG");
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("Failed to download chart");
    }
  };

  const handleDownloadGif = async () => {
    if (animationPreset === "none") {
      toast.error("Select an animation preset first");
      return;
    }

    if (!chartContainerRef.current) {
      toast.error("Chart not found");
      return;
    }

    setIsExportingGif(true);
    setGifProgress(0);

    try {
      const rect = chartContainerRef.current.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      const gif = new GIF({
        workers: 2,
        quality: 10,
        width,
        height,
        workerScript: gifWorkerUrl,
      });

      const totalDuration = currentAnimation.duration + 300;
      const frameCount = Math.min(30, Math.ceil(totalDuration / 50));
      const frameDelay = Math.ceil(totalDuration / frameCount);

      // Reset animation
      replayAnimation();

      // Wait a moment for the animation to start
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture frames using html2canvas
      for (let i = 0; i <= frameCount; i++) {
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, frameDelay));
        }

        try {
          const canvas = await html2canvas(chartContainerRef.current, {
            backgroundColor: null,
            scale: 1,
            logging: false,
            useCORS: true,
            allowTaint: true,
            width,
            height,
          });

          gif.addFrame(canvas, { delay: i === frameCount ? 1500 : frameDelay, copy: true });
        } catch (frameError) {
          console.warn("Frame capture error:", frameError);
        }
        
        // Update progress for frame capture phase (0-50%)
        setGifProgress(Math.round((i / frameCount) * 50));
      }

      gif.on("progress", (p: number) => {
        // Encoding phase (50-100%)
        setGifProgress(50 + Math.round(p * 50));
      });

      gif.on("finished", (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${title.toLowerCase().replace(/\s+/g, "-") || "chart"}-chart.gif`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsExportingGif(false);
        setGifProgress(0);
        toast.success("GIF exported successfully");
      });

      gif.render();
    } catch (error) {
      console.error("GIF export error:", error);
      setIsExportingGif(false);
      setGifProgress(0);
      toast.error("Failed to export GIF");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="label-tech mb-2 block text-foreground/70 text-xs sm:text-sm">Chart Title *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Energy Consumption Comparison"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[44px]"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-foreground/70 text-xs sm:text-sm">Chart Type</label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[44px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border max-h-[300px]">
              {CHART_TYPES.map((opt) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="text-foreground focus:bg-primary/20"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="label-tech mb-2 block text-foreground/70 text-xs sm:text-sm">X-Axis Label</label>
          <Input
            value={xAxisLabel}
            onChange={(e) => setXAxisLabel(e.target.value)}
            placeholder="e.g., Technology"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[44px]"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-foreground/70 text-xs sm:text-sm">Y-Axis Label</label>
          <Input
            value={yAxisLabel}
            onChange={(e) => setYAxisLabel(e.target.value)}
            placeholder="e.g., kWh/year"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[44px]"
          />
        </div>
      </div>

      {/* Axis & Layout Settings */}
      <div className="p-3 sm:p-4 bg-muted/30 rounded-lg border border-border">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center justify-between col-span-2 sm:col-span-1">
            <label className="label-tech text-foreground/70 text-xs">Axis Titles</label>
            <Switch checked={showAxisTitles} onCheckedChange={setShowAxisTitles} />
          </div>
          <div>
            <label className="label-tech mb-1.5 sm:mb-2 block text-foreground/70 text-xs">Aspect Ratio</label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px] text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {ASPECT_RATIOS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="label-tech mb-1.5 sm:mb-2 block text-foreground/70 text-xs">Animation</label>
            <Select value={animationPreset} onValueChange={setAnimationPreset}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px] text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {ANIMATION_PRESETS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="label-tech mb-1.5 sm:mb-2 block text-foreground/70 text-xs">PNG Scale</label>
            <Select value={String(pngScale)} onValueChange={(v) => setPngScale(Number(v))}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px] text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {PNG_SCALES.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)} className="text-foreground focus:bg-primary/20">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Brand Colors */}
      <div className="p-3 sm:p-4 bg-muted/30 rounded-lg border border-border space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 mb-1 sm:mb-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="label-tech text-foreground/70 text-xs sm:text-sm">Brand Colors</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="text-xs font-data text-muted-foreground mb-1 block">Primary</label>
            <Select value={primaryColor} onValueChange={setPrimaryColor}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(primaryColor) }} />
                  <span className="text-xs sm:text-sm truncate"><SelectValue /></span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {BRAND_COLORS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.color }} />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isMultiSeries && (
            <>
              <div>
                <label className="text-xs font-data text-muted-foreground mb-1 block">Secondary</label>
                <Select value={secondaryColor} onValueChange={setSecondaryColor}>
                  <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px]">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(secondaryColor) }} />
                      <span className="text-xs sm:text-sm truncate"><SelectValue /></span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {BRAND_COLORS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.color }} />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-data text-muted-foreground mb-1 block">Tertiary</label>
                <Select value={tertiaryColor} onValueChange={setTertiaryColor}>
                  <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px]">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(tertiaryColor) }} />
                      <span className="text-xs sm:text-sm truncate"><SelectValue /></span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {BRAND_COLORS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.color }} />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Background & Style */}
      <div className="p-3 sm:p-4 bg-muted/30 rounded-lg border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="label-tech mb-1.5 sm:mb-2 block text-foreground/70 text-xs">Background</label>
            <Select value={bgGradient} onValueChange={setBgGradient}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 min-h-[40px]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 rounded border border-border" style={{ background: getGradientValue(bgGradient) }} />
                  <span className="text-xs sm:text-sm truncate"><SelectValue /></span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {BACKGROUND_GRADIENTS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 rounded border border-border" style={{ background: opt.gradient }} />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="label-tech mb-1.5 sm:mb-2 block text-foreground/70 text-xs">Padding (px)</label>
            <Input
              type="number"
              min={0}
              max={80}
              value={exportPadding}
              onChange={(e) => setExportPadding(Number(e.target.value || 0))}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-data focus:border-primary focus:ring-primary/20 min-h-[40px]"
            />
          </div>

          <div className="flex items-center justify-between sm:pt-6">
            <label className="label-tech text-foreground/70 text-xs">Chamfer</label>
            <Switch checked={useChamfer} onCheckedChange={setUseChamfer} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label-tech mb-2 block text-foreground/70 text-xs sm:text-sm">Description (optional)</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of what this chart shows"
          className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary focus:ring-primary/20 min-h-[80px]"
        />
      </div>

      {/* Data Points */}
      <div>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <label className="label-tech text-foreground/70 text-xs sm:text-sm">
            Data Points {isMultiSeries && "(Multi-Series)"}
          </label>
          <Button variant="outline" size="sm" onClick={addDataPoint} className="touch-manipulation min-h-[36px]">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {dataPoints.map((point, index) => (
            <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border space-y-2">
              {/* Label row */}
              <div className="flex gap-2 items-center">
                <Input
                  value={point.name}
                  onChange={(e) => updateDataPoint(index, "name", e.target.value)}
                  placeholder="Label"
                  className="flex-1 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[40px] text-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDataPoint(index)}
                  disabled={dataPoints.length <= 1}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 touch-manipulation h-10 w-10 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {/* Values row */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1 block">Value 1</label>
                  <Input
                    type="number"
                    value={point.value}
                    onChange={(e) => updateDataPoint(index, "value", e.target.value)}
                    className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[36px] text-sm"
                  />
                </div>
                {isMultiSeries && (
                  <>
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-1 block">Value 2</label>
                      <Input
                        type="number"
                        value={point.value2 || 0}
                        onChange={(e) => updateDataPoint(index, "value2", e.target.value)}
                        className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[36px] text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground mb-1 block">Value 3</label>
                      <Input
                        type="number"
                        value={point.value3 || 0}
                        onChange={(e) => updateDataPoint(index, "value3", e.target.value)}
                        className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[36px] text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <label className="label-tech text-primary text-xs sm:text-sm">Live Preview</label>
            {animationPreset !== "none" && (
              <Button variant="ghost" size="sm" onClick={replayAnimation} className="h-7 px-2 touch-manipulation">
                <RotateCcw className="w-3 h-3 mr-1" />
                Replay
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
            <Button variant="outline" size="sm" onClick={handleDownloadSvg} className="touch-manipulation min-h-[36px] text-xs px-2 sm:px-3">
              <FileDown className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">SVG</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPng} className="touch-manipulation min-h-[36px] text-xs px-2 sm:px-3">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">PNG</span>
            </Button>
            {animationPreset !== "none" && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadGif}
                disabled={isExportingGif}
                className="touch-manipulation min-h-[36px] min-w-[60px] sm:min-w-[80px] text-xs px-2 sm:px-3"
              >
                {isExportingGif ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin sm:mr-2" />
                    <span className="text-xs">{gifProgress}%</span>
                  </>
                ) : (
                  <>
                    <Film className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="hidden sm:inline">GIF</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <div
          ref={chartContainerRef}
          className={`border border-border ${useChamfer ? "" : "rounded-lg"} overflow-hidden`}
          style={{ 
            background: getGradientValue(bgGradient),
            clipPath: useChamfer ? "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" : undefined,
            padding: `${exportPadding}px`,
          }}
        >
          {title && (
            <h3 className="font-ui text-base sm:text-lg mb-1" style={{ color: textColor }}>{title}</h3>
          )}
          {description && (
            <p className="font-data text-[10px] sm:text-xs mb-3 sm:mb-4" style={{ color: axisColor }}>{description}</p>
          )}
          <BrandChart
            key={animationKey}
            ref={brandChartRef}
            chartType={chartType}
            data={dataPoints}
            colors={{
              primary: getColorValue(primaryColor),
              secondary: getColorValue(secondaryColor),
              tertiary: getColorValue(tertiaryColor),
            }}
            xAxisLabel={xAxisLabel}
            yAxisLabel={yAxisLabel}
            showAxisTitles={showAxisTitles}
            isLightBg={isLightBg}
            animationDuration={currentAnimation.duration}
            height={chartHeight}
          />
        </div>
      </div>

      {/* Page Dependency Detection */}
      <div className="space-y-3">
        <div className="p-3 sm:p-4 bg-muted/30 rounded-lg border border-border space-y-3">
          <div>
            <label className="text-sm font-ui text-foreground block mb-2">Target Page URL (optional)</label>
            <div className="flex gap-2">
              <Input
                value={targetPageUrl}
                onChange={(e) => setTargetPageUrl(e.target.value)}
                placeholder="https://example.com/page-where-chart-goes"
                className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-[44px] flex-1"
              />
              <Button
                onClick={handleCheckPage}
                disabled={isCheckingPage || !targetPageUrl.trim()}
                variant="outline"
                className="min-h-[44px] px-4"
              >
                {isCheckingPage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Check what dependencies exist on your target page to generate minimal code
            </p>
          </div>
          
          {/* Detection Results */}
          {detectionResults && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                {detectionResults.hasBillboard ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-foreground">Billboard.js</span>
              </div>
              <div className="flex items-center gap-2">
                {detectionResults.hasD3 ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-foreground">D3.js</span>
              </div>
              <div className="flex items-center gap-2">
                {detectionResults.hasInstrumentSans ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-foreground">Instrument Sans</span>
              </div>
              <div className="flex items-center gap-2">
                {detectionResults.hasJetBrainsMono ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-xs text-foreground">JetBrains Mono</span>
              </div>
            </div>
          )}
          
          {!detectionResults && !targetPageUrl.trim() && (
            <p className="text-xs text-muted-foreground italic">
              Skip URL check to generate full code with all dependencies
            </p>
          )}
        </div>
        
        <Button
          onClick={handleGenerateCode}
          disabled={isLoading || !title.trim()}
          className="w-full h-11 sm:h-12 text-sm sm:text-base font-ui touch-manipulation"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
              Generating Code...
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Generate Billboard.js Code
            </>
          )}
        </Button>
        {!title.trim() && (
          <p className="text-xs text-muted-foreground text-center">Enter a chart title above to enable code generation</p>
        )}
      </div>

      {/* Code Output */}
      {code && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="label-tech text-primary text-xs sm:text-sm">Generated Code</label>
            <Button variant="outline" size="sm" onClick={handleCopyCode} className="touch-manipulation min-h-[36px]">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="p-3 sm:p-4 bg-muted/50 border border-border rounded-lg overflow-x-auto">
            <code className="text-xs sm:text-sm font-mono text-foreground">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;
