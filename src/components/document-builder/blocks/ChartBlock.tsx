import { useRef, useState, useCallback } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { BrandChart, DataPoint } from "@/components/charts/BrandChart";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, RefreshCw, ImagePlus, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChartBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

const CHART_COLORS = {
  primary: "hsl(125, 50%, 40%)",   // Rhosonics Green
  secondary: "hsl(85, 60%, 45%)",  // Lime
  tertiary: "hsl(42, 40%, 40%)",   // Earth tone
};

export function ChartBlock({ 
  content, 
  style, 
  isEditing, 
  isDark, 
  onUpdate,
  onEndEdit,
}: ChartBlockProps) {
  const chartRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const chart = content.chart || { 
    type: "bar", 
    title: "Chart Title", 
    data: [
      { label: "A", value: 30 },
      { label: "B", value: 50 },
      { label: "C", value: 20 },
    ] 
  };

  // Convert chart data to BrandChart format
  const chartData: DataPoint[] = chart.data.map(item => ({
    name: item.label,
    value: item.value,
  }));

  // Map presentation chart types to BrandChart types
  const getBrandChartType = (type: string): string => {
    switch (type) {
      case "bar": return "bar";
      case "line": return "line";
      case "area": return "area";
      case "donut": return "pie";
      case "gauge": return "pie";
      default: return "bar";
    }
  };

  const handleReplay = () => {
    chartRef.current?.replay();
  };

  const handleUpdateData = (index: number, field: "label" | "value", value: string | number) => {
    const newData = [...chart.data];
    newData[index] = { ...newData[index], [field]: field === "value" ? Number(value) : value };
    onUpdate({ chart: { ...chart, data: newData } });
  };

  const handleAddDataPoint = () => {
    const newData = [...chart.data, { label: `Item ${chart.data.length + 1}`, value: 10 }];
    onUpdate({ chart: { ...chart, data: newData } });
  };

  const handleRemoveDataPoint = (index: number) => {
    if (chart.data.length <= 1) return;
    const newData = chart.data.filter((_, i) => i !== index);
    onUpdate({ chart: { ...chart, data: newData } });
  };

  const uploadBackgroundImage = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `chart-bg-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `case-studies/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Failed to upload image");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        onUpdate({ 
          chart: { 
            ...chart, 
            backgroundImage: urlData.publicUrl,
          } 
        });
        toast.success("Background image added");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }, [chart, onUpdate]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadBackgroundImage(file);
    }
    e.target.value = "";
  }, [uploadBackgroundImage]);

  const handleRemoveBackground = () => {
    onUpdate({ chart: { ...chart, backgroundImage: undefined } });
    toast.success("Background removed");
  };

  if (isEditing) {
    return (
      <div 
        className={cn(
          "p-4 rounded-lg space-y-4",
          isDark ? "bg-white/5" : "bg-slate-50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chart Type & Title */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className={cn(
              "block text-xs font-ui mb-1",
              isDark ? "text-white/60" : "text-slate-500"
            )}>
              Title
            </label>
            <Input
              value={chart.title}
              onChange={(e) => onUpdate({ chart: { ...chart, title: e.target.value } })}
              className={cn(
                "font-ui",
                isDark && "bg-white/10 border-white/20 text-white"
              )}
              placeholder="Chart title"
            />
          </div>
          <div className="w-32">
            <label className={cn(
              "block text-xs font-ui mb-1",
              isDark ? "text-white/60" : "text-slate-500"
            )}>
              Type
            </label>
            <Select
              value={chart.type}
              onValueChange={(value: "bar" | "line" | "area" | "donut" | "gauge") => 
                onUpdate({ chart: { ...chart, type: value } })
              }
            >
              <SelectTrigger className={cn(
                isDark && "bg-white/10 border-white/20 text-white"
              )}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="donut">Donut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Y-Axis Label */}
        <div>
          <label className={cn(
            "block text-xs font-ui mb-1",
            isDark ? "text-white/60" : "text-slate-500"
          )}>
            Y-Axis Label (optional)
          </label>
          <Input
            value={chart.yAxisLabel || ""}
            onChange={(e) => onUpdate({ chart: { ...chart, yAxisLabel: e.target.value } })}
            className={cn(
              "font-ui",
              isDark && "bg-white/10 border-white/20 text-white"
            )}
            placeholder="e.g., Percentage (%)"
          />
        </div>

        {/* Background Image */}
        <div>
          <label className={cn(
            "block text-xs font-ui mb-1",
            isDark ? "text-white/60" : "text-slate-500"
          )}>
            Background Image (optional)
          </label>
          {chart.backgroundImage ? (
            <div className="flex items-center gap-2">
              <div className="relative w-20 h-12 rounded overflow-hidden border border-slate-200">
                <img 
                  src={chart.backgroundImage} 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRemoveBackground}
                className={cn(isDark && "border-white/20 text-white hover:bg-white/10")}
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={cn(isDark && "border-white/20 text-white hover:bg-white/10")}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <ImagePlus className="w-4 h-4 mr-1" />
              )}
              {isUploading ? "Uploading..." : "Add Background"}
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Data Points */}
        <div>
          <label className={cn(
            "block text-xs font-ui mb-2",
            isDark ? "text-white/60" : "text-slate-500"
          )}>
            Data Points
          </label>
          <div className="space-y-2">
            {chart.data.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={item.label}
                  onChange={(e) => handleUpdateData(index, "label", e.target.value)}
                  className={cn(
                    "flex-1 font-ui",
                    isDark && "bg-white/10 border-white/20 text-white"
                  )}
                  placeholder="Label"
                />
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleUpdateData(index, "value", e.target.value)}
                  className={cn(
                    "w-24 font-data",
                    isDark && "bg-white/10 border-white/20 text-white"
                  )}
                  placeholder="Value"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveDataPoint(index)}
                  disabled={chart.data.length <= 1}
                  className={cn(
                    "h-8 w-8",
                    isDark ? "text-white/60 hover:text-white hover:bg-white/10" : ""
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddDataPoint}
            className={cn(
              "mt-2",
              isDark && "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Data Point
          </Button>
        </div>

        {/* Preview */}
        <div 
          className={cn(
            "rounded-lg p-4 border relative overflow-hidden",
            isDark ? "bg-slate-800/50 border-white/10" : "bg-white border-slate-200"
          )}
        >
          {chart.backgroundImage && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${chart.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-3">
              <span className={cn(
                "text-xs font-ui",
                isDark ? "text-white/60" : "text-slate-500"
              )}>
                Preview
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReplay}
                className={cn(
                  "h-7",
                  isDark && "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Replay
              </Button>
            </div>
            <BrandChart
              ref={chartRef}
              chartType={getBrandChartType(chart.type)}
              data={chartData}
              colors={CHART_COLORS}
              yAxisLabel={chart.yAxisLabel}
              showAxisTitles={!!chart.yAxisLabel}
              isLightBg={!isDark}
              height={200}
              animationDuration={600}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm" onClick={onEndEdit}>
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden relative",
        style?.alignment === "center" && "mx-auto max-w-2xl",
        style?.alignment === "right" && "ml-auto max-w-2xl"
      )}
    >
      {chart.backgroundImage && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${chart.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="relative z-10">
        {chart.title && (
          <h4 className={cn(
            "font-ui text-lg font-semibold mb-4",
            isDark ? "text-white" : "text-slate-800"
          )}>
            {chart.title}
          </h4>
        )}
        <BrandChart
          ref={chartRef}
          chartType={getBrandChartType(chart.type)}
          data={chartData}
          colors={CHART_COLORS}
          yAxisLabel={chart.yAxisLabel}
          showAxisTitles={!!chart.yAxisLabel}
          isLightBg={!isDark}
          height={280}
          animationDuration={600}
        />
      </div>
    </div>
  );
}
