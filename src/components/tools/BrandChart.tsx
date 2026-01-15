import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import bb, { bar, line, area, radar, pie, scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";
import { MULTI_SERIES_CHART_TYPES } from "@/lib/constants";

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

  const gridColor = isLightBg ? "hsl(214, 32%, 85%)" : "hsl(215, 19%, 25%)";
  const axisColor = isLightBg ? "hsl(215, 19%, 35%)" : "hsl(215, 19%, 55%)";
  const tooltipBg = isLightBg ? "hsl(0, 0%, 100%)" : "hsl(226, 33%, 10%)";
  const tooltipBorder = isLightBg ? "hsl(214, 32%, 85%)" : "hsl(215, 19%, 25%)";
  const tooltipText = isLightBg ? "hsl(226, 33%, 10%)" : "hsl(210, 40%, 96%)";

  const isMultiSeries = MULTI_SERIES_CHART_TYPES.has(chartType);

  const buildColumns = useCallback((multiplier: number = 1) => {
    const values = data.map(d => Math.round(d.value * multiplier));
    const values2 = data.map(d => Math.round((d.value2 ?? 0) * multiplier));
    const values3 = data.map(d => Math.round((d.value3 ?? 0) * multiplier));

    const columns: (string | number)[][] = [["Series 1", ...values]];
    if (isMultiSeries) {
      columns.push(["Series 2", ...values2]);
      columns.push(["Series 3", ...values3]);
    }
    return columns;
  }, [data, isMultiSeries]);

  const applyBrandStyles = useCallback(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector("svg");
    if (!svg) return;

    svg.querySelectorAll(".bb-axis text, .bb-axis-x text, .bb-axis-y text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
    });

    svg.querySelectorAll(".bb-axis-x-label, .bb-axis-y-label").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
      (el as SVGTextElement).style.fontWeight = "500";
    });

    svg.querySelectorAll(".bb-legend-item text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'Instrument Sans', sans-serif";
      (el as SVGTextElement).style.fontSize = "12px";
      (el as SVGTextElement).style.fill = axisColor;
    });

    svg.querySelectorAll(".bb-grid line").forEach((el) => {
      (el as SVGLineElement).style.stroke = gridColor;
      (el as SVGLineElement).style.strokeDasharray = "3 3";
    });

    svg.querySelectorAll(".bb-axis path.domain").forEach((el) => {
      (el as SVGPathElement).style.stroke = axisColor;
    });

    svg.querySelectorAll(".bb-levels polygon, .bb-levels line").forEach((el) => {
      (el as SVGElement).style.stroke = gridColor;
    });

    svg.querySelectorAll(".bb-axis-radar text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = axisColor;
    });
  }, [axisColor, gridColor]);

  const buildConfig = useCallback((animate: boolean = true) => {
    const categories = data.map(d => d.name);
    const columns = buildColumns(animate ? 0 : 1);
    const maxValue = Math.max(...data.map(d => d.value), ...data.map(d => d.value2 ?? 0), ...data.map(d => d.value3 ?? 0));

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
        dataConfig.columns = data.map(d => [d.name, animate ? 0 : d.value]);
        dataConfig.colors = {};
        const pieColors = [colors.primary, colors.secondary, colors.tertiary, "hsl(90, 60%, 45%)", "hsl(45, 40%, 38%)", "hsl(125, 50%, 25%)"];
        data.forEach((d, i) => {
          dataConfig.colors[d.name] = pieColors[i % pieColors.length];
        });
        break;
      case "scatter":
        typeConfig = { type: scatter() };
        dataConfig.columns = [
          ["x", ...data.map(d => animate ? 0 : d.value)],
          ["y", ...data.map(d => animate ? 0 : (d.value2 ?? 0))],
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
          tick: { outer: false },
          label: showAxisTitles && xAxisLabel ? { text: xAxisLabel, position: "outer-center" } : undefined,
        },
        y: {
          tick: { outer: false },
          label: showAxisTitles && yAxisLabel ? { text: yAxisLabel, position: "outer-middle" } : undefined,
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
        contents: function(d: any[], _defaultTitleFormat: any, _defaultValueFormat: any, color: any) {
          let html = `<div style="background:${tooltipBg};border:1px solid ${tooltipBorder};border-radius:8px;padding:8px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;color:${tooltipText};box-shadow:0 4px 12px rgba(0,0,0,0.2);">`;
          if (d[0] && d[0].x !== undefined) {
            html += `<div style="font-weight:600;margin-bottom:4px;border-bottom:1px solid ${tooltipBorder};padding-bottom:4px;">${categories[d[0].x] || d[0].x}</div>`;
          }
          d.forEach((item: any) => {
            if (item && item.value !== undefined) {
              html += `<div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${color(item)};"></span>
                <span>${item.id}: ${item.value}</span>
              </div>`;
            }
          });
          html += '</div>';
          return html;
        },
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
          max: maxValue * 1.2,
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
        applyBrandStyles();
      },
    };

    if (chartType === "pie") {
      delete config.axis;
    }

    return config;
  }, [chartType, data, colors, xAxisLabel, yAxisLabel, showAxisTitles, isMultiSeries, animationDuration, height, buildColumns, tooltipBg, tooltipBorder, tooltipText, applyBrandStyles]);

  const animateToFinalValues = useCallback(() => {
    if (!chartRef.current) return;

    if (chartType === "pie") {
      chartRef.current.load({
        columns: data.map(d => [d.name, d.value]),
      });
    } else if (chartType === "scatter") {
      chartRef.current.load({
        columns: [
          ["x", ...data.map(d => d.value)],
          ["y", ...data.map(d => d.value2 ?? 0)],
        ],
      });
    } else {
      chartRef.current.load({
        columns: buildColumns(1),
      });
    }
  }, [buildColumns, chartType, data]);

  const initChart = useCallback(() => {
    if (!containerRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const shouldAnimate = animationDuration > 0;
    const config = buildConfig(shouldAnimate);
    chartRef.current = bb.generate(config);

    if (shouldAnimate) {
      setTimeout(() => {
        animateToFinalValues();
      }, 50);
    }
  }, [buildConfig, animationDuration, animateToFinalValues]);

  useEffect(() => {
    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [initChart]);

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
    if (!chartRef.current || animationDuration === 0) return;

    if (chartType === "pie") {
      chartRef.current.load({
        columns: data.map(d => [d.name, 0]),
      });
    } else if (chartType === "scatter") {
      chartRef.current.load({
        columns: [
          ["x", ...data.map(() => 0)],
          ["y", ...data.map(() => 0)],
        ],
      });
    } else {
      chartRef.current.load({
        columns: buildColumns(0),
      });
    }

    setTimeout(() => {
      animateToFinalValues();
    }, 100);
  }, [buildColumns, chartType, data, animationDuration, animateToFinalValues]);

  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
    export: exportChart,
    replay,
  }), [exportChart, replay]);

  return (
    <div 
      ref={containerRef} 
      className={`bb-chart-container w-full ${isLightBg ? 'bb-theme-light' : 'bb-theme-dark'}`}
      style={{ minHeight: height }}
    />
  );
});

BrandChart.displayName = "BrandChart";
