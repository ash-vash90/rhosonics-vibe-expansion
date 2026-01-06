import { useState } from "react";
import { BarChart3, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "./ImageUploader";
import { ChartBuilderData } from "@/types/visualCaseStudy";

interface ChartSectionProps {
  chartImage: string | null;
  chartData?: ChartBuilderData;
  onChartImageChange: (value: string | null) => void;
  onChartDataChange: (value: ChartBuilderData | undefined) => void;
}

export const ChartSection = ({
  chartImage,
  chartData,
  onChartImageChange,
  onChartDataChange,
}: ChartSectionProps) => {
  const [mode, setMode] = useState<"generate" | "upload">(chartData ? "generate" : "upload");

  const handleTypeChange = (type: ChartBuilderData["type"]) => {
    onChartDataChange({
      type,
      title: chartData?.title || "Technology Comparison",
      dataPoints: chartData?.dataPoints || [
        { name: "Sample 1", value: 75 },
        { name: "Sample 2", value: 82 },
        { name: "Sample 3", value: 68 },
      ],
      colors: chartData?.colors || {
        primary: "#33993c",
        secondary: "#73B82E",
      },
      labels: chartData?.labels,
      background: chartData?.background || "dark",
    });
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
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="grouped-bar">Grouped Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chart Title */}
          <div className="space-y-2">
            <Label>Chart Title</Label>
            <Input
              value={chartData?.title || ""}
              onChange={(e) => chartData && onChartDataChange({ ...chartData, title: e.target.value })}
              placeholder="e.g., Technology Comparison"
            />
          </div>

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

          {/* Data Points */}
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

        <TabsContent value="upload" className="mt-4">
          <ImageUploader
            value={chartImage}
            onChange={onChartImageChange}
            aspectRatio="16/9"
            label="Upload chart image"
            className="min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Upload an existing chart image. For best results, use a 16:9 aspect ratio.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
