import { useState } from "react";
import { BarChart3, Upload, Sparkles, Loader2, ArrowRight, TrendingUp, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "./ImageUploader";
import { TimeSeriesDataInput } from "./TimeSeriesDataInput";
import { ChartBuilderData } from "@/types/visualCaseStudy";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChartSectionProps {
  chartImage: string | null;
  chartData?: ChartBuilderData;
  onChartImageChange: (value: string | null) => void;
  onChartDataChange: (value: ChartBuilderData | undefined) => void;
}

const CHART_TYPES = [
  { value: "bar", label: "Bar Chart", icon: "📊" },
  { value: "grouped-bar", label: "Grouped Bar", icon: "📊" },
  { value: "line", label: "Line Chart", icon: "📈" },
  { value: "area", label: "Area Chart", icon: "📉" },
  { value: "pie", label: "Pie Chart", icon: "🥧" },
  { value: "timeseries", label: "Time Series", icon: "⏱️" },
  { value: "timeseries-comparison", label: "Time Series Comparison", icon: "⚖️" },
] as const;

export const ChartSection = ({
  chartImage,
  chartData,
  onChartImageChange,
  onChartDataChange,
}: ChartSectionProps) => {
  const [mode, setMode] = useState<"generate" | "upload">(chartData ? "generate" : "upload");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();

  const isTimeSeries = chartData?.type === "timeseries" || chartData?.type === "timeseries-comparison";
  const isMultiSeries = chartData?.type === "grouped-bar" || chartData?.type === "timeseries-comparison";

  const handleTypeChange = (type: ChartBuilderData["type"]) => {
    const isTimeSeriesType = type === "timeseries" || type === "timeseries-comparison";
    const isMulti = type === "grouped-bar" || type === "timeseries-comparison";
    
    onChartDataChange({
      type,
      title: chartData?.title || (isTimeSeriesType ? "Density Measurement Comparison" : "Technology Comparison"),
      dataPoints: chartData?.dataPoints || (isTimeSeriesType 
        ? generateSampleTimeSeriesData(isMulti)
        : [
            { name: "Sample 1", value: 75 },
            { name: "Sample 2", value: 82 },
            { name: "Sample 3", value: 68 },
          ]
      ),
      colors: chartData?.colors || {
        primary: "#33993c",
        secondary: "#D4C84A",
      },
      labels: chartData?.labels || (isMulti ? {
        series1: "Rhosonics SDM ECO",
        series2: "Nuclear Density Meter",
        yAxis: "Density (SG)",
      } : undefined),
      background: chartData?.background || "dark",
      dualAxis: isTimeSeriesType && isMulti,
      showDataPoints: false,
      lineSmoothing: true,
    });
  };

  const generateSampleTimeSeriesData = (multiSeries: boolean) => {
    const now = new Date();
    const points = [];
    for (let i = 0; i < 30; i++) {
      const time = new Date(now.getTime() - (30 - i) * 60000 * 30);
      const baseValue = 1.5 + Math.sin(i * 0.3) * 0.3;
      const point: any = {
        name: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: Math.round((baseValue + (Math.random() - 0.5) * 0.2) * 100) / 100,
        timestamp: time.toISOString().slice(0, 16),
      };
      if (multiSeries) {
        point.value2 = Math.round((baseValue + 0.1 + (Math.random() - 0.5) * 0.1) * 100) / 100;
      }
      points.push(point);
    }
    return points;
  };

  const handleDataPointChange = (index: number, field: "name" | "value" | "value2" | "value3", value: string | number) => {
    if (!chartData) return;
    const newDataPoints = [...chartData.dataPoints];
    newDataPoints[index] = {
      ...newDataPoints[index],
      [field]: field === "name" ? value : Number(value),
    };
    onChartDataChange({ ...chartData, dataPoints: newDataPoints });
  };

  const addDataPoint = () => {
    if (!chartData) return;
    onChartDataChange({
      ...chartData,
      dataPoints: [...chartData.dataPoints, { name: `Sample ${chartData.dataPoints.length + 1}`, value: 50 }],
    });
  };

  const removeDataPoint = (index: number) => {
    if (!chartData || chartData.dataPoints.length <= 1) return;
    onChartDataChange({
      ...chartData,
      dataPoints: chartData.dataPoints.filter((_, i) => i !== index),
    });
  };

  const analyzeAndConvert = async () => {
    if (!chartImage) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-chart-image", {
        body: { imageBase64: chartImage },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Determine if this is a time-series chart
      const isTimeSeriesChart = data.type === "line" && data.dataPoints?.length > 10;
      const hasMultipleSeries = data.dataPoints?.some((p: any) => p.value2 !== undefined);

      const extractedData: ChartBuilderData = {
        type: isTimeSeriesChart 
          ? (hasMultipleSeries ? "timeseries-comparison" : "timeseries")
          : (data.type || "bar"),
        title: data.title || "Extracted Chart",
        dataPoints: data.dataPoints || [],
        colors: {
          primary: "#33993c",
          secondary: "#D4C84A",
        },
        labels: data.labels || (hasMultipleSeries ? {
          series1: "Rhosonics SDM ECO",
          series2: "Reference Measurement",
          yAxis: "Value",
        } : undefined),
        background: "dark",
        dualAxis: hasMultipleSeries,
        lineSmoothing: true,
      };

      onChartDataChange(extractedData);
      onChartImageChange(null);
      setMode("generate");

      toast({
        title: "Chart Analyzed",
        description: `Extracted ${extractedData.dataPoints.length} data points as a ${extractedData.type} chart.`,
      });
    } catch (err) {
      console.error("Chart analysis failed:", err);
      toast({
        title: "Analysis Failed",
        description: err instanceof Error ? err.message : "Could not analyze the chart image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "generate" | "upload")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Generate Chart
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4 mt-4">
          {/* Chart Type */}
          <div className="space-y-2">
            <Label>Chart Type</Label>
            <Select
              value={chartData?.type || "bar"}
              onValueChange={(v) => handleTypeChange(v as ChartBuilderData["type"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {CHART_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isTimeSeries && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Time series mode: Optimized for continuous measurements over time
              </p>
            )}
          </div>

          {/* Chart Title */}
          <div className="space-y-2">
            <Label>Chart Title</Label>
            <Input
              value={chartData?.title || ""}
              onChange={(e) => chartData && onChartDataChange({ ...chartData, title: e.target.value })}
              placeholder="e.g., 24-Hour Density Comparison"
            />
          </div>

          {/* Series Labels for multi-series charts */}
          {isMultiSeries && (
            <div className="space-y-2">
              <Label>Series Labels</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: chartData?.colors.primary }} />
                    <Input
                      value={chartData?.labels?.series1 || ""}
                      onChange={(e) => chartData && onChartDataChange({
                        ...chartData,
                        labels: { ...chartData.labels, series1: e.target.value }
                      })}
                      placeholder="Series 1 name"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: chartData?.colors.secondary }} />
                    <Input
                      value={chartData?.labels?.series2 || ""}
                      onChange={(e) => chartData && onChartDataChange({
                        ...chartData,
                        labels: { ...chartData.labels, series2: e.target.value }
                      })}
                      placeholder="Series 2 name"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Background */}
          <div className="space-y-2">
            <Label>Background</Label>
            <Select
              value={chartData?.background || "dark"}
              onValueChange={(v) => chartData && onChartDataChange({ ...chartData, background: v as "light" | "dark" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark (Obsidian)</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Options Toggle */}
          {isTimeSeries && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs gap-1"
            >
              <Settings2 className="w-3 h-3" />
              {showAdvanced ? "Hide" : "Show"} Advanced Options
            </Button>
          )}

          {/* Advanced Options */}
          {showAdvanced && isTimeSeries && (
            <div className="space-y-3 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Dual Y-Axis</Label>
                <Switch
                  checked={chartData?.dualAxis || false}
                  onCheckedChange={(checked) => chartData && onChartDataChange({
                    ...chartData,
                    dualAxis: checked
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Data Points</Label>
                <Switch
                  checked={chartData?.showDataPoints || false}
                  onCheckedChange={(checked) => chartData && onChartDataChange({
                    ...chartData,
                    showDataPoints: checked
                  })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Smooth Lines</Label>
                <Switch
                  checked={chartData?.lineSmoothing !== false}
                  onCheckedChange={(checked) => chartData && onChartDataChange({
                    ...chartData,
                    lineSmoothing: checked
                  })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Y-Axis Label</Label>
                <Input
                  value={chartData?.labels?.yAxis || ""}
                  onChange={(e) => chartData && onChartDataChange({
                    ...chartData,
                    labels: { ...chartData.labels, yAxis: e.target.value }
                  })}
                  placeholder="e.g., Density (SG)"
                  className="h-8"
                />
              </div>
            </div>
          )}

          {/* Data Points - different UI for time-series vs regular */}
          {isTimeSeries ? (
            <TimeSeriesDataInput
              dataPoints={chartData?.dataPoints || []}
              onDataPointsChange={(points) => chartData && onChartDataChange({
                ...chartData,
                dataPoints: points
              })}
              seriesCount={isMultiSeries ? 2 : 1}
            />
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Data Points</Label>
                <Button variant="ghost" size="sm" onClick={addDataPoint}>
                  + Add Point
                </Button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {chartData?.dataPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={point.name}
                      onChange={(e) => handleDataPointChange(i, "name", e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={point.value}
                      onChange={(e) => handleDataPointChange(i, "value", e.target.value)}
                      placeholder="Value"
                      className="w-20"
                    />
                    {chartData.type === "grouped-bar" && (
                      <>
                        <Input
                          type="number"
                          value={point.value2 || ""}
                          onChange={(e) => handleDataPointChange(i, "value2", e.target.value)}
                          placeholder="V2"
                          className="w-16"
                        />
                        <Input
                          type="number"
                          value={point.value3 || ""}
                          onChange={(e) => handleDataPointChange(i, "value3", e.target.value)}
                          placeholder="V3"
                          className="w-16"
                        />
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeDataPoint(i)}
                      disabled={chartData.dataPoints.length <= 1}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!chartData && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleTypeChange("bar")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Initialize Chart
            </Button>
          )}
        </TabsContent>

        <TabsContent value="upload" className="mt-4 space-y-4">
          <ImageUploader
            value={chartImage}
            onChange={onChartImageChange}
            aspectRatio="16/9"
            label="Upload chart image"
            className="min-h-[120px]"
          />
          
          {chartImage && (
            <Button
              variant="default"
              className="w-full gap-2"
              onClick={analyzeAndConvert}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Chart...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  AI Convert to Billboard.js
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
          
          <p className="text-xs text-muted-foreground">
            {chartImage 
              ? "Click above to extract data and convert to a branded Billboard.js chart. Works with time-series comparisons!"
              : "Upload an existing chart image. AI can analyze complex time-series charts and recreate them with Rhosonics branding."
            }
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
