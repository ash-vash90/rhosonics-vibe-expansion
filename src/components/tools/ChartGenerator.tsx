import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Loader2, BarChart3, Plus, Trash2, Palette } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
} from "recharts";

const CHART_TYPES = [
  { value: "bar", label: "Bar Chart" },
  { value: "horizontal-bar", label: "Horizontal Bar" },
  { value: "line", label: "Line Chart" },
  { value: "area", label: "Area Chart" },
  { value: "radar", label: "Radar Chart" },
  { value: "pie", label: "Pie Chart" },
];

const PRESET_COLORS = [
  { value: "#22c55e", label: "Brand Green" },
  { value: "#c9a227", label: "Earth Amber" },
  { value: "#64748b", label: "Slate" },
  { value: "#1d4ed8", label: "Blue" },
  { value: "#dc2626", label: "Red" },
  { value: "#9333ea", label: "Purple" },
  { value: "#f97316", label: "Orange" },
  { value: "#06b6d4", label: "Cyan" },
];

const BACKGROUND_PRESETS = [
  { value: "#0a0f14", label: "Obsidian (Dark)" },
  { value: "#111827", label: "Slate Dark" },
  { value: "#1f2937", label: "Gray Dark" },
  { value: "#ffffff", label: "White" },
  { value: "#f8fafc", label: "Slate Light" },
  { value: "#f3f4f6", label: "Gray Light" },
  { value: "transparent", label: "Transparent" },
];

interface DataPoint {
  name: string;
  value: number;
}

export const ChartGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [lineColor, setLineColor] = useState("#22c55e");
  const [bgColor, setBgColor] = useState("#0a0f14");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { name: "Item 1", value: 100 },
    { name: "Item 2", value: 80 },
    { name: "Item 3", value: 60 },
  ]);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { name: `Item ${dataPoints.length + 1}`, value: 50 }]);
  };

  const removeDataPoint = (index: number) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  const updateDataPoint = (index: number, field: "name" | "value", value: string | number) => {
    const updated = [...dataPoints];
    updated[index] = { ...updated[index], [field]: field === "value" ? Number(value) : value };
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
            lineColor,
            bgColor,
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

  const handleDownloadPng = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: bgColor === "transparent" ? null : bgColor,
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-chart.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Chart downloaded as PNG");
    } catch (error) {
      toast.error("Failed to download chart");
    }
  };

  // Determine if we need light or dark text based on background
  const isLightBg = bgColor === "#ffffff" || bgColor === "#f8fafc" || bgColor === "#f3f4f6";
  const textColor = isLightBg ? "#1f2937" : "#f1f5f9";
  const gridColor = isLightBg ? "#e5e7eb" : "hsl(215, 19%, 25%)";
  const axisColor = isLightBg ? "#6b7280" : "hsl(215, 19%, 45%)";

  const renderChart = () => {
    const commonProps = {
      data: dataPoints,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    const axisStyle = {
      fontSize: 11,
      fontFamily: "JetBrains Mono, monospace",
      fill: axisColor,
    };

    const gridProps = {
      stroke: gridColor,
      strokeDasharray: "3 3",
    };

    const tooltipStyle = {
      background: isLightBg ? "#ffffff" : "hsl(213, 32%, 8%)",
      border: `1px solid ${gridColor}`,
      borderRadius: 8,
      fontFamily: "JetBrains Mono",
      color: textColor,
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} label={xAxisLabel ? { value: xAxisLabel, position: "bottom", style: axisStyle } : undefined} />
            <YAxis tick={axisStyle} label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "left", style: axisStyle } : undefined} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={lineColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "horizontal-bar":
        return (
          <BarChart {...commonProps} layout="vertical">
            <CartesianGrid {...gridProps} />
            <XAxis type="number" tick={axisStyle} />
            <YAxis dataKey="name" type="category" tick={axisStyle} width={100} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={lineColor} radius={[0, 4, 4, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={{ fill: lineColor, r: 4 }} />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" fill={lineColor} fillOpacity={0.3} stroke={lineColor} strokeWidth={2} />
          </AreaChart>
        );
      case "radar":
        return (
          <RadarChart {...commonProps} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: axisColor }} />
            <PolarRadiusAxis tick={axisStyle} />
            <Radar dataKey="value" stroke={lineColor} fill={lineColor} fillOpacity={0.3} />
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
                <Cell key={`cell-${index}`} fill={index === 0 ? lineColor : PRESET_COLORS[index % PRESET_COLORS.length].value} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill={lineColor} radius={[4, 4, 0, 0]} />
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
            <SelectContent className="bg-popover border-border">
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

      {/* Color Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
        <div>
          <label className="label-tech mb-2 flex items-center gap-2 text-foreground/70">
            <Palette className="w-4 h-4" />
            Line / Bar Color
          </label>
          <div className="flex gap-2">
            <Select value={lineColor} onValueChange={setLineColor}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: lineColor }} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {PRESET_COLORS.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="text-foreground focus:bg-primary/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: opt.value }} />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer border-border"
            />
          </div>
        </div>
        <div>
          <label className="label-tech mb-2 flex items-center gap-2 text-foreground/70">
            <Palette className="w-4 h-4" />
            Background Color
          </label>
          <div className="flex gap-2">
            <Select value={bgColor} onValueChange={setBgColor}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: bgColor === "transparent" ? "transparent" : bgColor }} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {BACKGROUND_PRESETS.map((opt) => (
                  <SelectItem 
                    key={opt.value} 
                    value={opt.value}
                    className="text-foreground focus:bg-primary/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: opt.value === "transparent" ? "transparent" : opt.value }} />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="color"
              value={bgColor === "transparent" ? "#ffffff" : bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer border-border"
            />
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
          <label className="label-tech text-foreground/70">Data Points</label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addDataPoint}
          >
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
                placeholder="Value"
                className="w-24 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
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
          <label className="label-tech text-primary">Live Preview</label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPng}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>
        <div
          ref={chartRef}
          className="p-6 rounded-lg border border-border"
          style={{ backgroundColor: bgColor === "transparent" ? "transparent" : bgColor }}
        >
          {title && (
            <h3 className="font-ui text-lg mb-1" style={{ color: textColor }}>{title}</h3>
          )}
          {description && (
            <p className="font-mono text-xs mb-4" style={{ color: axisColor }}>{description}</p>
          )}
          <div className="h-[300px]">
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyCode}
            >
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
