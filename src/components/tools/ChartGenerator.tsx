import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy, Download, Loader2, BarChart3, Plus, Trash2, Palette, FileDown, Film, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { buildChartExportSvg, svgToPngDataUrl } from "@/lib/chartExport";
import GIF from "gif.js";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  ScatterChart,
  Scatter,
  ZAxis,
  Label,
} from "recharts";

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
    easing: "linear",
    staggerDelay: 0,
  },
  { 
    value: "smooth", 
    label: "Smooth Rise",
    duration: 800,
    easing: "ease-out",
    staggerDelay: 100,
  },
  { 
    value: "bouncy", 
    label: "Bouncy",
    duration: 1200,
    easing: "ease-in-out",
    staggerDelay: 150,
  },
  { 
    value: "cascade", 
    label: "Cascade",
    duration: 600,
    easing: "ease-out",
    staggerDelay: 200,
  },
  { 
    value: "dramatic", 
    label: "Dramatic",
    duration: 1500,
    easing: "ease-in-out",
    staggerDelay: 250,
  },
];

interface DataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
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
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { name: "Item 1", value: 100, value2: 80, value3: 60 },
    { name: "Item 2", value: 80, value2: 90, value3: 70 },
    { name: "Item 3", value: 60, value2: 70, value3: 85 },
  ]);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const isMultiSeries = ["grouped-bar", "stacked-bar", "multi-line", "stacked-area", "composed", "radar"].includes(chartType);
  const isLightBg = ["metal-light", "field", "eco"].includes(bgGradient);
  const chartHeight = ASPECT_RATIOS.find(r => r.value === aspectRatio)?.height || 320;
  const currentAnimation = ANIMATION_PRESETS.find(a => a.value === animationPreset) || ANIMATION_PRESETS[0];

  useEffect(() => {
    // Warm-load Rhosonics data font so SVG text renders consistently.
    document.fonts?.load?.("500 12px 'JetBrains Mono'");
  }, []);

  const replayAnimation = useCallback(() => {
    setAnimationKey(k => k + 1);
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

  const getChartSvg = () => {
    const root = chartRef.current;
    if (!root) return null;
    return (root.querySelector("svg.recharts-surface") || root.querySelector("svg")) as SVGSVGElement | null;
  };

  const handleDownloadSvg = async () => {
    const svgEl = getChartSvg();
    if (!svgEl) {
      toast.error("Chart SVG not found");
      return;
    }

    try {
      await document.fonts?.load?.("500 12px 'JetBrains Mono'");
      await document.fonts?.ready;

      const { svg } = buildChartExportSvg(svgEl, {
        backgroundGradient: getGradientValue(bgGradient),
        padding: exportPadding,
        chamfer: useChamfer,
        includeFontCss: true,
      });

      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-chart.svg`;
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
      toast.success("Chart downloaded as SVG");
    } catch {
      toast.error("Failed to download SVG");
    }
  };

  const handleDownloadPng = async () => {
    const svgEl = getChartSvg();
    if (!svgEl) {
      toast.error("Chart SVG not found");
      return;
    }

    try {
      await document.fonts?.load?.("500 12px 'JetBrains Mono'");
      await document.fonts?.ready;

      const built = buildChartExportSvg(svgEl, {
        backgroundGradient: getGradientValue(bgGradient),
        padding: exportPadding,
        chamfer: useChamfer,
        includeFontCss: true,
      });

      const dataUrl = await svgToPngDataUrl({
        svg: built.svg,
        width: built.width,
        height: built.height,
        scale: pngScale,
      });

      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-chart.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Chart downloaded as PNG");
    } catch {
      toast.error("Failed to download chart");
    }
  };

  const handleDownloadGif = async () => {
    if (animationPreset === "none") {
      toast.error("Select an animation preset first");
      return;
    }

    const svgEl = getChartSvg();
    if (!svgEl || !chartRef.current) {
      toast.error("Chart not found");
      return;
    }

    setIsExportingGif(true);
    setGifProgress(0);

    try {
      await document.fonts?.load?.("500 12px 'JetBrains Mono'");
      await document.fonts?.ready;

      const rect = chartRef.current.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      const gif = new GIF({
        workers: 2,
        quality: 10,
        width,
        height,
        workerScript: "https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js",
      });

      const totalDuration = currentAnimation.duration + (currentAnimation.staggerDelay * Math.max(dataPoints.length, 3));
      const frameCount = Math.min(30, Math.ceil(totalDuration / 50));
      const frameDelay = Math.ceil(totalDuration / frameCount);

      // Reset animation
      replayAnimation();

      // Capture frames over the animation duration
      for (let i = 0; i <= frameCount; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 50 : frameDelay));

        const built = buildChartExportSvg(svgEl, {
          backgroundGradient: getGradientValue(bgGradient),
          padding: 0,
          chamfer: useChamfer,
          includeFontCss: true,
        });

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        const img = new Image();
        const blob = new Blob([built.svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        await new Promise<void>((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve();
          };
          img.src = url;
        });

        gif.addFrame(canvas, { delay: i === frameCount ? 1500 : frameDelay, copy: true });
        
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
        link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-chart.gif`;
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

  const textColor = isLightBg ? "hsl(226, 33%, 10%)" : "hsl(210, 40%, 96%)";
  const gridColor = isLightBg ? "hsl(214, 32%, 85%)" : "hsl(215, 19%, 25%)";
  const axisColor = isLightBg ? "hsl(215, 19%, 35%)" : "hsl(215, 19%, 55%)";

  const axisStyle = {
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    fill: axisColor,
  };

  const gridProps = {
    stroke: gridColor,
    strokeDasharray: "3 3",
  };

  const tooltipStyle = {
    background: isLightBg ? "hsl(0, 0%, 100%)" : "hsl(226, 33%, 10%)",
    border: `1px solid ${gridColor}`,
    borderRadius: 8,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: textColor,
  };

  const legendStyle = {
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: 12,
    color: axisColor,
  };

  const axisTitleStyle = {
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    fill: axisColor,
    fontWeight: 500,
  };

  const renderChart = () => {
    const hasAxisTitles = showAxisTitles && (xAxisLabel || yAxisLabel);
    const commonProps = {
      data: dataPoints,
      margin: { 
        top: 20, 
        right: 30, 
        left: hasAxisTitles && yAxisLabel ? 50 : 20, 
        bottom: hasAxisTitles && xAxisLabel ? 40 : 20 
      },
    };

    const color1 = getColorValue(primaryColor);
    const color2 = getColorValue(secondaryColor);
    const color3 = getColorValue(tertiaryColor);

    // Animation props for elements
    const getAnimProps = (seriesIndex: number = 0) => ({
      isAnimationActive: animationPreset !== "none",
      animationBegin: currentAnimation.staggerDelay * seriesIndex,
      animationDuration: currentAnimation.duration,
      animationEasing: currentAnimation.easing as "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear",
    });

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={color1} radius={[4, 4, 0, 0]} name="Value" {...getAnimProps(0)} />
          </BarChart>
        );
      case "horizontal-bar":
        return (
          <BarChart {...commonProps} layout="vertical" key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis type="number" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis dataKey="name" type="category" tick={axisStyle} width={80}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={color1} radius={[0, 4, 4, 0]} name="Value" {...getAnimProps(0)} />
          </BarChart>
        );
      case "grouped-bar":
        return (
          <BarChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Bar dataKey="value" fill={color1} radius={[4, 4, 0, 0]} name="Series 1" {...getAnimProps(0)} />
            <Bar dataKey="value2" fill={color2} radius={[4, 4, 0, 0]} name="Series 2" {...getAnimProps(1)} />
            <Bar dataKey="value3" fill={color3} radius={[4, 4, 0, 0]} name="Series 3" {...getAnimProps(2)} />
          </BarChart>
        );
      case "stacked-bar":
        return (
          <BarChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Bar dataKey="value" stackId="a" fill={color1} name="Series 1" {...getAnimProps(0)} />
            <Bar dataKey="value2" stackId="a" fill={color2} name="Series 2" {...getAnimProps(1)} />
            <Bar dataKey="value3" stackId="a" fill={color3} radius={[4, 4, 0, 0]} name="Series 3" {...getAnimProps(2)} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="value" stroke={color1} strokeWidth={2} dot={{ fill: color1, r: 4 }} name="Value" {...getAnimProps(0)} />
          </LineChart>
        );
      case "multi-line":
        return (
          <LineChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Line type="monotone" dataKey="value" stroke={color1} strokeWidth={2} dot={{ fill: color1, r: 4 }} name="Series 1" {...getAnimProps(0)} />
            <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={{ fill: color2, r: 4 }} name="Series 2" {...getAnimProps(1)} />
            <Line type="monotone" dataKey="value3" stroke={color3} strokeWidth={2} dot={{ fill: color3, r: 4 }} name="Series 3" {...getAnimProps(2)} />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" fill={color1} fillOpacity={0.3} stroke={color1} strokeWidth={2} name="Value" {...getAnimProps(0)} />
          </AreaChart>
        );
      case "stacked-area":
        return (
          <AreaChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Area type="monotone" dataKey="value" stackId="1" fill={color1} fillOpacity={0.6} stroke={color1} strokeWidth={2} name="Series 1" {...getAnimProps(0)} />
            <Area type="monotone" dataKey="value2" stackId="1" fill={color2} fillOpacity={0.6} stroke={color2} strokeWidth={2} name="Series 2" {...getAnimProps(1)} />
            <Area type="monotone" dataKey="value3" stackId="1" fill={color3} fillOpacity={0.6} stroke={color3} strokeWidth={2} name="Series 3" {...getAnimProps(2)} />
          </AreaChart>
        );
      case "composed":
        return (
          <ComposedChart {...commonProps} key={animationKey}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Bar dataKey="value" fill={color1} radius={[4, 4, 0, 0]} name="Bar Series" {...getAnimProps(0)} />
            <Line type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} dot={{ fill: color2, r: 4 }} name="Line Series" {...getAnimProps(1)} />
          </ComposedChart>
        );
      case "radar":
        return (
          <RadarChart {...commonProps} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: axisColor }} />
            <PolarRadiusAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={legendStyle} />
            <Radar dataKey="value" stroke={color1} fill={color1} fillOpacity={0.3} name="Series 1" />
            <Radar dataKey="value2" stroke={color2} fill={color2} fillOpacity={0.3} name="Series 2" />
          </RadarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={dataPoints}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: axisColor }}
            >
              {dataPoints.map((_, index) => (
                <Cell key={`cell-${index}`} fill={[color1, color2, color3, getColorValue("lime"), getColorValue("ochre"), getColorValue("dark-green")][index % 6]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        );
      case "scatter":
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="value" type="number" tick={axisStyle} name="X">
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis dataKey="value2" type="number" tick={axisStyle} name="Y">
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <ZAxis dataKey="value3" range={[60, 400]} name="Size" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Data" data={dataPoints} fill={color1} />
          </ScatterChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle}>
              {showAxisTitles && xAxisLabel && <Label value={xAxisLabel} position="bottom" offset={20} style={axisTitleStyle} />}
            </XAxis>
            <YAxis tick={axisStyle}>
              {showAxisTitles && yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={-10} style={axisTitleStyle} />}
            </YAxis>
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={color1} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-tech mb-2 block text-foreground/70">Chart Title *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Energy Consumption Comparison"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-foreground/70">Chart Type</label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
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
          <label className="label-tech mb-2 block text-foreground/70">X-Axis Label</label>
          <Input
            value={xAxisLabel}
            onChange={(e) => setXAxisLabel(e.target.value)}
            placeholder="e.g., Technology"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-foreground/70">Y-Axis Label</label>
          <Input
            value={yAxisLabel}
            onChange={(e) => setYAxisLabel(e.target.value)}
            placeholder="e.g., kWh/year"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Axis & Layout Settings */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-between md:col-span-1">
            <label className="label-tech text-foreground/70">Show Axis Titles</label>
            <Switch checked={showAxisTitles} onCheckedChange={setShowAxisTitles} />
          </div>
          <div>
            <label className="label-tech mb-2 block text-foreground/70">Aspect Ratio</label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
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
            <label className="label-tech mb-2 block text-foreground/70">Animation</label>
            <Select value={animationPreset} onValueChange={setAnimationPreset}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
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
            <label className="label-tech mb-2 block text-foreground/70">PNG Export Scale</label>
            <Select value={String(pngScale)} onValueChange={(v) => setPngScale(Number(v))}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
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
      <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="label-tech text-foreground/70">Brand Colors</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-data text-muted-foreground mb-1 block">Primary</label>
            <Select value={primaryColor} onValueChange={setPrimaryColor}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(primaryColor) }} />
                  <SelectValue />
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
                  <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(secondaryColor) }} />
                      <SelectValue />
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
                  <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getColorValue(tertiaryColor) }} />
                      <SelectValue />
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
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-tech mb-2 block text-foreground/70">Background Gradient</label>
            <Select value={bgGradient} onValueChange={setBgGradient}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 rounded border border-border" style={{ background: getGradientValue(bgGradient) }} />
                  <SelectValue />
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
            <label className="label-tech mb-2 block text-foreground/70">Export Padding (px)</label>
            <Input
              type="number"
              min={0}
              max={80}
              value={exportPadding}
              onChange={(e) => setExportPadding(Number(e.target.value || 0))}
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-data focus:border-primary focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center justify-between md:pt-7">
            <label className="label-tech text-foreground/70">Use Chamfer Corners</label>
            <Switch checked={useChamfer} onCheckedChange={setUseChamfer} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label-tech mb-2 block text-foreground/70">Description (optional)</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of what this chart shows"
          className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Data Points */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label-tech text-foreground/70">
            Data Points {isMultiSeries && "(Multi-Series)"}
          </label>
          <Button variant="outline" size="sm" onClick={addDataPoint}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {dataPoints.map((point, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={point.name}
                onChange={(e) => updateDataPoint(index, "name", e.target.value)}
                placeholder="Label"
                className="flex-1 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
              <Input
                type="number"
                value={point.value}
                onChange={(e) => updateDataPoint(index, "value", e.target.value)}
                placeholder="Val 1"
                className="w-20 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
              {isMultiSeries && (
                <>
                  <Input
                    type="number"
                    value={point.value2 || 0}
                    onChange={(e) => updateDataPoint(index, "value2", e.target.value)}
                    placeholder="Val 2"
                    className="w-20 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                  <Input
                    type="number"
                    value={point.value3 || 0}
                    onChange={(e) => updateDataPoint(index, "value3", e.target.value)}
                    placeholder="Val 3"
                    className="w-20 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDataPoint(index)}
                disabled={dataPoints.length <= 1}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <label className="label-tech text-primary">Live Preview</label>
            {animationPreset !== "none" && (
              <Button variant="ghost" size="sm" onClick={replayAnimation} className="h-7 px-2">
                <RotateCcw className="w-3 h-3 mr-1" />
                Replay
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadSvg}>
              <FileDown className="w-4 h-4 mr-2" />
              SVG
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPng}>
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            {animationPreset !== "none" && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadGif}
                disabled={isExportingGif}
                className="min-w-[80px]"
              >
                {isExportingGif ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {gifProgress}%
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 mr-2" />
                    GIF
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <div
          ref={chartRef}
          className={`p-6 border border-border ${useChamfer ? "" : "rounded-lg"}`}
          style={{ 
            background: getGradientValue(bgGradient),
            clipPath: useChamfer ? "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" : undefined,
          }}
        >
          {title && (
            <h3 className="font-ui text-lg mb-1" style={{ color: textColor }}>{title}</h3>
          )}
          {description && (
            <p className="font-data text-xs mb-4" style={{ color: axisColor }}>{description}</p>
          )}
          <div style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Generate Code */}
      <Button
        onClick={handleGenerateCode}
        disabled={isLoading || !title.trim()}
        className="w-full h-12 text-base font-ui"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating Code...
          </>
        ) : (
          <>
            <BarChart3 className="w-5 h-5 mr-2" />
            Generate Recharts Code
          </>
        )}
      </Button>

      {/* Code Output */}
      {code && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="label-tech text-primary">Generated Code</label>
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          </div>
          <pre className="p-4 bg-muted/50 border border-border rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-foreground">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;
