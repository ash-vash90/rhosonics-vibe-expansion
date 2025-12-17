import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import bb, { bar, line, area, radar, pie, scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";

export interface DataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface BrandChartProps {
  chartType: string;
  data: DataPoint[];
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  xAxisLabel?: string;
  yAxisLabel?: string;
  showAxisTitles?: boolean;
  isLightBg?: boolean;
  animationDuration?: number;
  height?: number;
}

export interface BrandChartRef {
  getChart: () => any;
  export: (mimeType: string) => Promise<string>;
  replay: () => void;
}

export const BrandChart = forwardRef<BrandChartRef, BrandChartProps>(({
  chartType,
  data,
  colors,
  xAxisLabel,
  yAxisLabel,
  showAxisTitles = true,
  isLightBg = false,
  animationDuration = 800,
  height = 320,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const textColor = isLightBg ? "hsl(226, 33%, 10%)" : "hsl(210, 40%, 96%)";
  const gridColor = isLightBg ? "hsl(214, 32%, 85%)" : "hsl(215, 19%, 25%)";
  const axisColor = isLightBg ? "hsl(215, 19%, 35%)" : "hsl(215, 19%, 55%)";

  const isMultiSeries = ["grouped-bar", "stacked-bar", "multi-line", "stacked-area", "composed", "radar"].includes(chartType);

  const buildConfig = useCallback(() => {
    const categories = data.map(d => d.name);
    const values = data.map(d => d.value);
    const values2 = data.map(d => d.value2 ?? 0);
    const values3 = data.map(d => d.value3 ?? 0);

    // Build columns based on chart type
    const columns: (string | number)[][] = [["Series 1", ...values]];
    if (isMultiSeries) {
      columns.push(["Series 2", ...values2]);
      columns.push(["Series 3", ...values3]);
    }

    // Determine chart type configuration
    let typeConfig: any = {};
    let dataConfig: any = {
      columns,
      colors: {
        "Series 1": colors.primary,
        "Series 2": colors.secondary,
        "Series 3": colors.tertiary,
      },
    };

    switch (chartType) {
      case "bar":
      case "grouped-bar":
        typeConfig = { type: bar() };
        break;
      case "horizontal-bar":
        typeConfig = { type: bar() };
        break;
      case "stacked-bar":
        typeConfig = { type: bar() };
        dataConfig.groups = [["Series 1", "Series 2", "Series 3"]];
        break;
      case "line":
      case "multi-line":
        typeConfig = { type: line() };
        break;
      case "area":
        typeConfig = { type: area() };
        break;
      case "stacked-area":
        typeConfig = { type: area() };
        dataConfig.groups = [["Series 1", "Series 2", "Series 3"]];
        break;
      case "composed":
        typeConfig = { type: bar() };
        dataConfig.types = {
          "Series 1": bar(),
          "Series 2": line(),
        };
        break;
      case "radar":
        typeConfig = { type: radar() };
        break;
      case "pie":
        typeConfig = { type: pie() };
        dataConfig.columns = data.map(d => [d.name, d.value]);
        dataConfig.colors = {};
        const pieColors = [colors.primary, colors.secondary, colors.tertiary, "hsl(90, 60%, 45%)", "hsl(45, 40%, 38%)", "hsl(125, 50%, 25%)"];
        data.forEach((d, i) => {
          dataConfig.colors[d.name] = pieColors[i % pieColors.length];
        });
        break;
      case "scatter":
        typeConfig = { type: scatter() };
        dataConfig.columns = [
          ["x", ...data.map(d => d.value)],
          ["y", ...data.map(d => d.value2 ?? 0)],
        ];
        dataConfig.xs = { y: "x" };
        dataConfig.colors = { y: colors.primary };
        break;
      default:
        typeConfig = { type: bar() };
    }

    const config: any = {
      bindto: containerRef.current,
      data: {
        ...typeConfig,
        ...dataConfig,
      },
      axis: {
        rotated: chartType === "horizontal-bar",
        x: {
          type: "category",
          categories,
          tick: {
            outer: false,
          },
          label: showAxisTitles && xAxisLabel ? {
            text: xAxisLabel,
            position: "outer-center",
          } : undefined,
        },
        y: {
          tick: {
            outer: false,
          },
          label: showAxisTitles && yAxisLabel ? {
            text: yAxisLabel,
            position: "outer-middle",
          } : undefined,
        },
      },
      grid: {
        x: { show: true },
        y: { show: true },
      },
      legend: {
        show: isMultiSeries || chartType === "pie",
      },
      tooltip: {
        grouped: true,
      },
      transition: {
        duration: animationDuration,
      },
      bar: {
        radius: { ratio: 0.15 },
        width: { ratio: 0.6 },
      },
      point: {
        r: 4,
      },
      radar: {
        axis: {
          max: Math.max(...values, ...values2, ...values3) * 1.2,
        },
        level: {
          depth: 4,
        },
      },
      pie: {
        label: {
          show: true,
          format: (_value: number, ratio: number) => `${(ratio * 100).toFixed(0)}%`,
        },
      },
      size: {
        height,
      },
      padding: {
        top: 20,
        right: 30,
        bottom: showAxisTitles && xAxisLabel ? 50 : 30,
        left: showAxisTitles && yAxisLabel ? 60 : 40,
      },
      onrendered: function() {
        // Apply custom styles after render
        applyBrandStyles();
      },
    };

    // Remove axis config for pie and radar
    if (chartType === "pie") {
      delete config.axis;
    }

    return config;
  }, [chartType, data, colors, xAxisLabel, yAxisLabel, showAxisTitles, isMultiSeries, animationDuration, height]);

  const applyBrandStyles = useCallback(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    // Style axis ticks and labels
    svg.querySelectorAll(".bb-axis text, .bb-axis-x text, .bb-axis-y text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
    });

    // Style axis label text (x and y axis titles)
    svg.querySelectorAll(".bb-axis-x-label, .bb-axis-y-label").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
      (el as SVGTextElement).style.fontWeight = "500";
    });

    // Style legend
    svg.querySelectorAll(".bb-legend-item text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'Instrument Sans', sans-serif";
      (el as SVGTextElement).style.fontSize = "12px";
      (el as SVGTextElement).style.fill = axisColor;
    });

    // Style grid lines
    svg.querySelectorAll(".bb-grid line").forEach((el) => {
      (el as SVGLineElement).style.stroke = gridColor;
      (el as SVGLineElement).style.strokeDasharray = "3 3";
    });

    // Style axis lines
    svg.querySelectorAll(".bb-axis path.domain").forEach((el) => {
      (el as SVGPathElement).style.stroke = axisColor;
    });

    // Style radar polygon grid
    svg.querySelectorAll(".bb-levels polygon, .bb-levels line").forEach((el) => {
      (el as SVGElement).style.stroke = gridColor;
    });

    // Style radar axis text
    svg.querySelectorAll(".bb-axis-radar text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
    });
  }, [axisColor, gridColor, textColor]);

  const initChart = useCallback(() => {
    if (!containerRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const config = buildConfig();
    chartRef.current = bb.generate(config);
  }, [buildConfig]);

  useEffect(() => {
    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [initChart]);

  // Re-apply styles when theme changes
  useEffect(() => {
    applyBrandStyles();
  }, [isLightBg, applyBrandStyles]);

  const exportChart = useCallback((mimeType: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!chartRef.current) {
        reject(new Error("Chart not initialized"));
        return;
      }

      chartRef.current.export(mimeType, (dataUrl: string) => {
        if (dataUrl) {
          resolve(dataUrl);
        } else {
          reject(new Error("Export failed"));
        }
      });
    });
  }, []);

  const replay = useCallback(() => {
    if (chartRef.current) {
      const config = buildConfig();
      chartRef.current.load({
        columns: config.data.columns,
        colors: config.data.colors,
        groups: config.data.groups,
        types: config.data.types,
        xs: config.data.xs,
      });
    }
  }, [buildConfig]);

  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
    export: exportChart,
    replay,
  }), [exportChart, replay]);

  return (
    <div 
      ref={containerRef} 
      className="bb-chart-container w-full"
      style={{ minHeight: height }}
    />
  );
});

BrandChart.displayName = "BrandChart";
