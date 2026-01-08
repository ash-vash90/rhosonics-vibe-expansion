import { useState } from "react";
import { Upload, FileSpreadsheet, Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DataPoint {
  name: string;
  value: number;
  value2?: number;
  timestamp?: string;
}

interface TimeSeriesDataInputProps {
  dataPoints: DataPoint[];
  onDataPointsChange: (points: DataPoint[]) => void;
  seriesCount: number;
}

export const TimeSeriesDataInput = ({
  dataPoints,
  onDataPointsChange,
  seriesCount,
}: TimeSeriesDataInputProps) => {
  const [csvInput, setCsvInput] = useState("");
  const [showCsvInput, setShowCsvInput] = useState(false);
  const { toast } = useToast();

  const parseCSV = (csv: string): DataPoint[] => {
    const lines = csv.trim().split("\n");
    const points: DataPoint[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Skip header row if detected
      if (i === 0 && (line.toLowerCase().includes("time") || line.toLowerCase().includes("date"))) {
        continue;
      }

      const parts = line.split(/[,\t;]/).map(p => p.trim());
      
      if (parts.length >= 2) {
        const point: DataPoint = {
          name: parts[0],
          value: parseFloat(parts[1]) || 0,
          timestamp: parts[0],
        };
        
        if (seriesCount >= 2 && parts.length >= 3) {
          point.value2 = parseFloat(parts[2]) || 0;
        }
        
        points.push(point);
      }
    }

    return points;
  };

  const handleCsvImport = () => {
    const parsed = parseCSV(csvInput);
    if (parsed.length === 0) {
      toast({
        title: "No data found",
        description: "Could not parse any data points from the input.",
        variant: "destructive",
      });
      return;
    }

    onDataPointsChange(parsed);
    setShowCsvInput(false);
    setCsvInput("");
    toast({
      title: "Data imported",
      description: `Imported ${parsed.length} data points.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      
      if (parsed.length === 0) {
        toast({
          title: "No data found",
          description: "Could not parse any data points from the file.",
          variant: "destructive",
        });
        return;
      }

      onDataPointsChange(parsed);
      toast({
        title: "File imported",
        description: `Imported ${parsed.length} data points from ${file.name}.`,
      });
    };
    reader.readAsText(file);
  };

  const addDataPoint = () => {
    const newPoint: DataPoint = {
      name: `Point ${dataPoints.length + 1}`,
      value: 1.5,
      timestamp: new Date().toISOString().slice(0, 16),
    };
    if (seriesCount >= 2) {
      newPoint.value2 = 1.5;
    }
    onDataPointsChange([...dataPoints, newPoint]);
  };

  const updatePoint = (index: number, field: keyof DataPoint, value: string | number) => {
    const updated = [...dataPoints];
    if (field === "name" || field === "timestamp") {
      updated[index] = { ...updated[index], [field]: value as string };
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) };
    }
    onDataPointsChange(updated);
  };

  const removePoint = (index: number) => {
    onDataPointsChange(dataPoints.filter((_, i) => i !== index));
  };

  const generateSampleData = () => {
    const now = new Date();
    const points: DataPoint[] = [];
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(now.getTime() - (50 - i) * 60000 * 30); // 30 min intervals
      const baseValue = 1.5 + Math.sin(i * 0.3) * 0.3;
      const point: DataPoint = {
        name: time.toLocaleTimeString(),
        value: Math.round((baseValue + (Math.random() - 0.5) * 0.2) * 100) / 100,
        timestamp: time.toISOString().slice(0, 16),
      };
      
      if (seriesCount >= 2) {
        point.value2 = Math.round((baseValue + 0.1 + (Math.random() - 0.5) * 0.1) * 100) / 100;
      }
      
      points.push(point);
    }
    
    onDataPointsChange(points);
    toast({
      title: "Sample data generated",
      description: "Added 50 sample time-series data points.",
    });
  };

  const exportCSV = () => {
    const headers = seriesCount >= 2 
      ? "Timestamp,Series 1,Series 2" 
      : "Timestamp,Value";
    
    const rows = dataPoints.map(p => {
      const parts = [p.timestamp || p.name, p.value];
      if (seriesCount >= 2) parts.push(p.value2 || 0);
      return parts.join(",");
    });
    
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chart-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Data Points ({dataPoints.length})</Label>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={generateSampleData} className="h-7 text-xs">
            Sample Data
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowCsvInput(!showCsvInput)} className="h-7 text-xs gap-1">
            <FileSpreadsheet className="w-3 h-3" />
            CSV
          </Button>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".csv,.txt,.tsv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
              <span>
                <Upload className="w-3 h-3" />
                File
              </span>
            </Button>
          </label>
        </div>
      </div>

      {showCsvInput && (
        <div className="space-y-2 p-3 bg-muted/50 rounded-md">
          <Label className="text-xs text-muted-foreground">
            Paste CSV data (Timestamp, Value1{seriesCount >= 2 ? ", Value2" : ""})
          </Label>
          <Textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder={`10:00 AM, 1.52${seriesCount >= 2 ? ", 1.65" : ""}\n10:30 AM, 1.48${seriesCount >= 2 ? ", 1.62" : ""}\n11:00 AM, 1.55${seriesCount >= 2 ? ", 1.68" : ""}`}
            className="min-h-[100px] font-mono text-xs"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCsvImport} className="h-7">
              Import
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowCsvInput(false)} className="h-7">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Data points table */}
      <div className="max-h-[200px] overflow-y-auto space-y-1">
        {dataPoints.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            No data points. Add manually, paste CSV, or upload a file.
          </p>
        ) : (
          <>
            <div className="grid gap-2 text-xs text-muted-foreground px-1" style={{
              gridTemplateColumns: seriesCount >= 2 ? "1fr 60px 60px 28px" : "1fr 80px 28px"
            }}>
              <span>Time/Label</span>
              <span>Series 1</span>
              {seriesCount >= 2 && <span>Series 2</span>}
              <span></span>
            </div>
            {dataPoints.slice(0, 20).map((point, i) => (
              <div key={i} className="grid gap-2 items-center" style={{
                gridTemplateColumns: seriesCount >= 2 ? "1fr 60px 60px 28px" : "1fr 80px 28px"
              }}>
                <Input
                  value={point.timestamp || point.name}
                  onChange={(e) => updatePoint(i, "timestamp", e.target.value)}
                  className="h-7 text-xs"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={point.value}
                  onChange={(e) => updatePoint(i, "value", e.target.value)}
                  className="h-7 text-xs"
                />
                {seriesCount >= 2 && (
                  <Input
                    type="number"
                    step="0.01"
                    value={point.value2 || 0}
                    onChange={(e) => updatePoint(i, "value2", e.target.value)}
                    className="h-7 text-xs"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removePoint(i)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
            {dataPoints.length > 20 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Showing first 20 of {dataPoints.length} points
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={addDataPoint} className="h-7 text-xs gap-1">
          <Plus className="w-3 h-3" />
          Add Point
        </Button>
        {dataPoints.length > 0 && (
          <Button variant="ghost" size="sm" onClick={exportCSV} className="h-7 text-xs gap-1">
            <Download className="w-3 h-3" />
            Export CSV
          </Button>
        )}
      </div>
    </div>
  );
};
