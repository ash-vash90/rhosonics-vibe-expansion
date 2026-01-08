import { useEffect, useRef, useCallback } from "react";
import bb, { line } from "billboard.js";
import "billboard.js/dist/billboard.min.css";
import { ChartBuilderData } from "@/types/visualCaseStudy";

interface TimeSeriesChartPreviewProps {
  data: ChartBuilderData;
  height?: number;
  printMode?: boolean;
}

export const TimeSeriesChartPreview = ({ 
  data, 
  height = 280,
  printMode = false 
}: TimeSeriesChartPreviewProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ReturnType<typeof bb.generate> | null>(null);

  const isMultiSeries = data.type === "timeseries-comparison";
  const isDark = data.background === "dark";

  const initChart = useCallback(() => {
    if (!chartRef.current || data.dataPoints.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const xLabels = data.dataPoints.map(p => p.timestamp || p.name);
    const series1 = data.dataPoints.map(p => p.value);
    const series2 = isMultiSeries ? data.dataPoints.map(p => p.value2 ?? null) : null;

    const series1Name = data.labels?.series1 || "SDM ECO";
    const series2Name = data.labels?.series2 || "Reference";

    const columns: [string, ...(number | string | null)[]][] = [
      ["x", ...xLabels],
      [series1Name, ...series1],
    ];

    if (isMultiSeries && series2) {
      columns.push([series2Name, ...series2]);
    }

    const types: Record<string, ReturnType<typeof line>> = {
      [series1Name]: line(),
    };
    if (isMultiSeries) {
      types[series2Name] = line();
    }

    const colors: Record<string, string> = {
      [series1Name]: data.colors.primary,
    };
    if (isMultiSeries && data.colors.secondary) {
      colors[series2Name] = data.colors.secondary;
    }

    // Calculate Y axis range from data
    const allValues = [...series1, ...(series2 || [])].filter((v): v is number => v !== null);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const padding = (maxValue - minValue) * 0.1;

    chartInstance.current = bb.generate({
      bindto: chartRef.current,
      data: {
        x: "x",
        columns,
        types,
        colors,
      },
      axis: {
        x: {
          type: "category",
          tick: {
            culling: {
              max: 8,
            },
            rotate: 45,
            multiline: false,
          },
          label: data.labels?.xAxis ? {
            text: data.labels.xAxis,
            position: "outer-center",
          } : undefined,
        },
        y: {
          min: minValue - padding,
          max: maxValue + padding,
          padding: { top: 10, bottom: 10 },
          tick: {
            format: (v: number) => v.toFixed(2),
          },
          label: data.labels?.yAxis ? {
            text: data.labels.yAxis,
            position: "outer-middle",
          } : undefined,
        },
        ...(data.dualAxis && isMultiSeries ? {
          y2: {
            show: true,
            min: minValue - padding,
            max: maxValue + padding,
            padding: { top: 10, bottom: 10 },
            tick: {
              format: (v: number) => v.toFixed(2),
            },
            label: data.labels?.yAxis2 ? {
              text: data.labels.yAxis2,
              position: "outer-middle",
            } : undefined,
          },
        } : {}),
      },
      point: {
        show: data.showDataPoints || false,
        r: 2,
        focus: {
          expand: {
            enabled: true,
            r: 4,
          },
        },
      },
      line: {
        connectNull: true,
      },
      spline: data.lineSmoothing !== false ? {
        interpolation: {
          type: "monotone-x",
        },
      } : undefined,
      grid: {
        y: {
          show: true,
        },
      },
      legend: {
        position: "bottom",
        padding: 12,
      },
      tooltip: {
        format: {
          title: (x) => `${x}`,
          value: (value: number) => value?.toFixed(3) || "",
        },
        contents: function(dataItems, defaultTitleFormat, _defaultValueFormat, color) {
          const title = defaultTitleFormat(dataItems[0].x);
          const bgColor = isDark ? "hsl(226, 33%, 10%)" : "hsl(0, 0%, 98%)";
          const borderColor = isDark ? "hsl(225, 20%, 25%)" : "hsl(0, 0%, 85%)";
          const textColor = isDark ? "#f1f5f9" : "#1e293b";
          const mutedColor = isDark ? "#94a3b8" : "#64748b";
          
          let html = `<div style="background: ${bgColor}; border: 1px solid ${borderColor}; border-radius: 8px; padding: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: ${textColor}; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">`;
          html += `<div style="margin-bottom: 8px; color: ${mutedColor}; font-size: 10px;">${title}</div>`;
          
          dataItems.forEach((d) => {
            if (d.value !== null && d.value !== undefined) {
              const colorValue = typeof color === 'function' ? color(d) : color;
              html += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">`;
              html += `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${colorValue};"></span>`;
              html += `<span style="flex: 1;">${d.name}</span>`;
              html += `<span style="font-weight: 600; color: ${colorValue};">${d.value.toFixed(3)}</span>`;
              html += `</div>`;
            }
          });
          
          html += `</div>`;
          return html;
        },
      },
      padding: {
        top: 10,
        right: data.dualAxis ? 50 : 20,
        bottom: 40,
        left: 50,
      },
      transition: {
        duration: printMode ? 0 : 500,
      },
      onrendered: function() {
        const svg = chartRef.current?.querySelector('svg');
        if (svg) {
          const textColor = isDark ? "#64748b" : "#475569";
          svg.querySelectorAll('.bb-axis text, .bb-axis-x-label, .bb-axis-y-label').forEach((el) => {
            (el as SVGElement).style.fontFamily = "'JetBrains Mono', monospace";
            (el as SVGElement).style.fontSize = "10px";
            (el as SVGElement).style.fill = textColor;
          });
          svg.querySelectorAll('.bb-legend-item text').forEach((el) => {
            (el as SVGElement).style.fontFamily = "'Instrument Sans', sans-serif";
            (el as SVGElement).style.fontSize = "11px";
            (el as SVGElement).style.fill = isDark ? "#e2e8f0" : "#1e293b";
          });
          // Style grid lines
          svg.querySelectorAll('.bb-grid line').forEach((el) => {
            (el as SVGElement).style.stroke = isDark ? "#334155" : "#e2e8f0";
          });
        }
      },
    });
  }, [data, isDark, isMultiSeries, printMode]);

  useEffect(() => {
    initChart();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [initChart]);

  const bgClass = isDark 
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
    : "bg-gradient-to-br from-white via-slate-50 to-white";

  return (
    <div className={`rounded-lg overflow-hidden ${bgClass}`}>
      <div 
        ref={chartRef} 
        style={{ height: `${height}px` }}
        className="w-full"
      />
    </div>
  );
};

export default TimeSeriesChartPreview;
