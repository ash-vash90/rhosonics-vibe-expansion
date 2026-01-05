import { useEffect, useRef, useState } from "react";
import bb, { line } from "billboard.js";
import "billboard.js/dist/billboard.min.css";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simulated test data based on the Weir Minerals case study
// Time points represent test duration, density values in g/l
const generateTestData = () => {
  const timePoints = Array.from({ length: 20 }, (_, i) => i * 5);
  
  // SDM ECO - Most accurate, follows actual density closely
  const sdmEco = [1520, 1545, 1580, 1620, 1655, 1690, 1720, 1745, 1760, 1775, 
                   1780, 1770, 1755, 1730, 1695, 1660, 1625, 1590, 1555, 1530];
  
  // Coriolis - Good accuracy, slight lag
  const coriolis = [1515, 1538, 1572, 1612, 1648, 1685, 1718, 1742, 1758, 1772,
                    1778, 1768, 1752, 1728, 1692, 1658, 1622, 1588, 1552, 1528];
  
  // Nuclear - Less accurate, more noise
  const nuclear = [1535, 1560, 1595, 1640, 1670, 1710, 1735, 1765, 1780, 1790,
                   1795, 1785, 1765, 1745, 1705, 1675, 1640, 1605, 1570, 1545];
  
  // Lab samples (reference points at specific intervals)
  const labSamples = [1522, null, null, null, 1658, null, null, null, null, 1778,
                      null, null, null, null, 1698, null, null, null, null, 1532];
  
  return { timePoints, sdmEco, coriolis, nuclear, labSamples };
};

export const TechnologyComparisonChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ReturnType<typeof bb.generate> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const initChart = (animate = true) => {
    if (!chartRef.current) return;
    
    const data = generateTestData();
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const columns: [string, ...(number | null)[]][] = [
      ["time", ...data.timePoints],
      ["SDM ECO", ...(animate ? data.sdmEco.map(() => 1400) : data.sdmEco)],
      ["Coriolis", ...(animate ? data.coriolis.map(() => 1400) : data.coriolis)],
      ["Nuclear", ...(animate ? data.nuclear.map(() => 1400) : data.nuclear)],
      ["Lab Samples", ...data.labSamples],
    ];

    chartInstance.current = bb.generate({
      bindto: chartRef.current,
      data: {
        x: "time",
        columns,
        types: {
          "SDM ECO": line(),
          "Coriolis": line(),
          "Nuclear": line(),
          "Lab Samples": "scatter",
        },
        colors: {
          "SDM ECO": "#33993c",
          "Coriolis": "#6b7280",
          "Nuclear": "#dc2626",
          "Lab Samples": "#f59e0b",
        },
      },
      point: {
        show: true,
        r: function(d) {
          return d.id === "Lab Samples" ? 6 : 0;
        },
        focus: {
          expand: {
            enabled: true,
            r: 5,
          },
        },
      },
      line: {
        classes: ["line-sdm", "line-coriolis", "line-nuclear"],
      },
      axis: {
        x: {
          label: {
            text: "Time (minutes)",
            position: "outer-center",
          },
          tick: {
            values: [0, 20, 40, 60, 80, 100],
          },
          padding: { left: 0, right: 5 },
        },
        y: {
          label: {
            text: "Density (g/l)",
            position: "outer-middle",
          },
          min: 1400,
          max: 1850,
          padding: { top: 20, bottom: 20 },
        },
      },
      grid: {
        y: {
          show: true,
        },
      },
      legend: {
        position: "bottom",
        padding: 16,
      },
      tooltip: {
        format: {
          title: (x) => `Time: ${x} min`,
          value: (value: number | null) => {
            if (value === null) return "";
            return `${value} g/l`;
          },
        },
        contents: function(data, defaultTitleFormat, _defaultValueFormat, color) {
          const title = defaultTitleFormat(data[0].x);
          let html = `<div style="background: hsl(226, 33%, 10%); border: 1px solid hsl(225, 20%, 25%); border-radius: 8px; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #f1f5f9;">`;
          html += `<div style="margin-bottom: 8px; color: #94a3b8; font-size: 10px;">${title}</div>`;
          
          data.forEach((d) => {
            if (d.value !== null) {
              const colorValue = typeof color === 'function' ? color(d) : color;
              html += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">`;
              html += `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${colorValue};"></span>`;
              html += `<span style="flex: 1;">${d.name}</span>`;
              html += `<span style="font-weight: 600; color: #33993c;">${d.value} g/l</span>`;
              html += `</div>`;
            }
          });
          
          html += `</div>`;
          return html;
        },
      },
      padding: {
        top: 20,
        right: 30,
        bottom: 10,
        left: 50,
      },
      transition: {
        duration: animate ? 0 : 300,
      },
      onrendered: function() {
        // Apply custom font styling
        const svg = chartRef.current?.querySelector('svg');
        if (svg) {
          svg.querySelectorAll('.bb-axis text, .bb-axis-x-label, .bb-axis-y-label').forEach((el) => {
            (el as SVGElement).style.fontFamily = "'JetBrains Mono', monospace";
            (el as SVGElement).style.fontSize = "11px";
            (el as SVGElement).style.fill = "#64748b";
          });
          svg.querySelectorAll('.bb-legend-item text').forEach((el) => {
            (el as SVGElement).style.fontFamily = "'Instrument Sans', sans-serif";
            (el as SVGElement).style.fontSize = "12px";
          });
        }
      },
    });

    // Animate to real values
    if (animate) {
      setIsAnimating(true);
      setTimeout(() => {
        chartInstance.current?.load({
          columns: [
            ["SDM ECO", ...data.sdmEco],
            ["Coriolis", ...data.coriolis],
            ["Nuclear", ...data.nuclear],
          ],
        });
        setIsAnimating(false);
      }, 100);
    }
  };

  useEffect(() => {
    initChart(true);
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleReplay = () => {
    initChart(true);
  };

  return (
    <div className="card-obsidian p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-ui font-semibold text-lg text-slate-100">
            Technology Performance Comparison
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Density measurements over test duration vs. lab sample reference
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReplay}
          disabled={isAnimating}
          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
          Replay
        </Button>
      </div>
      
      {/* Chart container */}
      <div 
        ref={chartRef} 
        className="w-full h-[320px] [&_.bb-axis-y-label]:fill-slate-400 [&_.bb-grid_line]:stroke-slate-700"
      />
      
      {/* Legend explanation */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-slate-300">SDM ECO</span>
            <span className="label-tech-sm text-primary">Best Match</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span className="text-slate-300">Coriolis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-slate-300">Nuclear</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-300">Lab Samples</span>
            <span className="label-tech-sm text-slate-500">Reference</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyComparisonChart;
