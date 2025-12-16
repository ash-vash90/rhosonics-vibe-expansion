import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Loader2, BarChart3, Plus, Trash2 } from "lucide-react";
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

const BRAND_COLORS = [
  "hsl(142, 71%, 32%)",
  "hsl(45, 70%, 48%)",
  "hsl(215, 20%, 45%)",
  "hsl(142, 71%, 25%)",
  "hsl(45, 40%, 35%)",
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
        backgroundColor: "#0a0f14",
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

  const renderChart = () => {
    const commonProps = {
      data: dataPoints,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    const axisStyle = {
      fontSize: 11,
      fontFamily: "JetBrains Mono, monospace",
      fill: "hsl(215, 19%, 45%)",
    };

    const gridProps = {
      stroke: "hsl(215, 19%, 25%)",
      strokeDasharray: "3 3",
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} label={xAxisLabel ? { value: xAxisLabel, position: "bottom", style: axisStyle } : undefined} />
            <YAxis tick={axisStyle} label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "left", style: axisStyle } : undefined} />
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
            <Bar dataKey="value" fill={BRAND_COLORS[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "horizontal-bar":
        return (
          <BarChart {...commonProps} layout="vertical">
            <CartesianGrid {...gridProps} />
            <XAxis type="number" tick={axisStyle} />
            <YAxis dataKey="name" type="category" tick={axisStyle} width={100} />
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
            <Bar dataKey="value" fill={BRAND_COLORS[0]} radius={[0, 4, 4, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
            <Line type="monotone" dataKey="value" stroke={BRAND_COLORS[0]} strokeWidth={2} dot={{ fill: BRAND_COLORS[0], r: 4 }} />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
            <Area type="monotone" dataKey="value" fill={BRAND_COLORS[0]} fillOpacity={0.3} stroke={BRAND_COLORS[0]} strokeWidth={2} />
          </AreaChart>
        );
      case "radar":
        return (
          <RadarChart {...commonProps} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke="hsl(215, 19%, 25%)" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "JetBrains Mono", fill: "hsl(215, 19%, 45%)" }} />
            <PolarRadiusAxis tick={axisStyle} />
            <Radar dataKey="value" stroke={BRAND_COLORS[0]} fill={BRAND_COLORS[0]} fillOpacity={0.3} />
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
              labelLine={{ stroke: "hsl(215, 19%, 45%)" }}
            >
              {dataPoints.map((_, index) => (
                <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
          </PieChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisStyle} />
            <YAxis tick={axisStyle} />
            <Tooltip contentStyle={{ background: "hsl(213, 32%, 8%)", border: "1px solid hsl(215, 19%, 25%)", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
            <Bar dataKey="value" fill={BRAND_COLORS[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-tech mb-2 block text-slate-400">Chart Title *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Energy Consumption Comparison"
            className="bg-slate-800/50 border-slate-700"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-slate-400">Chart Type</label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHART_TYPES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="label-tech mb-2 block text-slate-400">X-Axis Label</label>
          <Input
            value={xAxisLabel}
            onChange={(e) => setXAxisLabel(e.target.value)}
            placeholder="e.g., Technology"
            className="bg-slate-800/50 border-slate-700"
          />
        </div>
        <div>
          <label className="label-tech mb-2 block text-slate-400">Y-Axis Label</label>
          <Input
            value={yAxisLabel}
            onChange={(e) => setYAxisLabel(e.target.value)}
            placeholder="e.g., kWh/year"
            className="bg-slate-800/50 border-slate-700"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label-tech mb-2 block text-slate-400">Description (optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of what this chart shows"
            className="bg-slate-800/50 border-slate-700 font-ui"
          />
        </div>
      </div>

      {/* Data Points */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label-tech text-slate-400">Data Points</label>
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
                className="flex-1 bg-slate-800/50 border-slate-700"
              />
              <Input
                type="number"
                value={point.value}
                onChange={(e) => updateDataPoint(index, "value", e.target.value)}
                placeholder="Value"
                className="w-24 bg-slate-800/50 border-slate-700"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDataPoint(index)}
                disabled={dataPoints.length <= 1}
              >
                <Trash2 className="w-4 h-4 text-slate-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="label-tech text-slate-400">Live Preview</label>
          <Button variant="ghost" size="sm" onClick={handleDownloadPng}>
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>
        <div
          ref={chartRef}
          className="p-6 bg-rho-obsidian border border-slate-700 rounded-lg"
        >
          {title && (
            <h3 className="font-ui text-lg text-slate-100 mb-1">{title}</h3>
          )}
          {description && (
            <p className="font-mono text-xs text-slate-500 mb-4">{description}</p>
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
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Code...
          </>
        ) : (
          <>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Recharts Code
          </>
        )}
      </Button>

      {/* Code Output */}
      {code && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label-tech text-slate-400">Generated Code</label>
            <Button variant="ghost" size="sm" onClick={handleCopyCode}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          </div>
          <pre className="p-4 bg-slate-900 border border-slate-700 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-slate-300">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ChartGenerator;
