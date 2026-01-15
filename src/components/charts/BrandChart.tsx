/**
 * BrandChart Component
 * 
 * A reusable charting component using Billboard.js for rendering
 * various chart types with Rhosonics brand styling.
 */

import { useRef, useEffect, useImperativeHandle, forwardRef, useId } from "react";
import bb, { bar, line, area, pie } from "billboard.js";
import "billboard.js/dist/billboard.css";
import { cleanReactId, MULTI_SERIES_CHART_TYPES } from "@/lib/constants";

export interface DataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface ChartColors {
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

export interface BrandChartRef {
  replay: () => void;
}

interface BrandChartProps {
  chartType?: string;
  data: DataPoint[];
  colors?: ChartColors;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showAxisTitles?: boolean;
  isLightBg?: boolean;
  height?: number;
  animationDuration?: number;
}

export const BrandChart = forwardRef<BrandChartRef, BrandChartProps>(({
  chartType = "bar",
  data,
  colors = {},
  xAxisLabel,
  yAxisLabel,
  showAxisTitles = false,
  isLightBg = false,
  height = 300,
  animationDuration = 600,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const rawId = useId();
  const uniqueId = cleanReactId(rawId);

  const primaryColor = colors.primary || "hsl(125, 50%, 40%)";
  const secondaryColor = colors.secondary || "hsl(85, 60%, 45%)";
  const tertiaryColor = colors.tertiary || "hsl(42, 40%, 40%)";

  const isMultiSeries = MULTI_SERIES_CHART_TYPES.has(chartType);

  useImperativeHandle(ref, () => ({
    replay: () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        createChart();
      }
    },
  }));

  const createChart = () => {
    if (!containerRef.current || !data.length) return;

    const categories = data.map(d => d.name);
    
    let columns: any[];
    let chartConfig: any;

    if (isMultiSeries) {
      columns = [
        ["Series 1", ...data.map(d => d.value)],
        ["Series 2", ...data.map(d => d.value2 || 0)],
      ];
      if (data.some(d => d.value3 !== undefined)) {
        columns.push(["Series 3", ...data.map(d => d.value3 || 0)]);
      }
    } else {
      columns = [["value", ...data.map(d => d.value)]];
    }

    const getChartType = () => {
      switch (chartType) {
        case "bar":
        case "grouped-bar":
          return bar();
        case "line":
        case "multi-line":
          return line();
        case "area":
        case "stacked-area":
          return area();
        case "pie":
        case "donut":
          return pie();
        default:
          return bar();
      }
    };

    chartConfig = {
      bindto: containerRef.current,
      data: {
        columns,
        type: getChartType(),
        colors: isMultiSeries
          ? { "Series 1": primaryColor, "Series 2": secondaryColor, "Series 3": tertiaryColor }
          : { value: primaryColor },
      },
      axis: {
        x: {
          type: "category",
          categories,
          tick: {
            text: {
              show: true,
            },
          },
          label: showAxisTitles && xAxisLabel ? { text: xAxisLabel, position: "outer-center" } : undefined,
        },
        y: {
          label: showAxisTitles && yAxisLabel ? { text: yAxisLabel, position: "outer-middle" } : undefined,
          tick: {
            format: (d: number) => d.toLocaleString(),
          },
        },
      },
      bar: {
        width: { ratio: 0.6 },
      },
      legend: {
        show: isMultiSeries,
      },
      transition: {
        duration: animationDuration,
      },
      size: {
        height,
      },
      grid: {
        y: {
          show: true,
        },
      },
    };

    // Apply theme-specific styling
    if (!isLightBg) {
      chartConfig.color = {
        pattern: [primaryColor, secondaryColor, tertiaryColor],
      };
    }

    chartRef.current = bb.generate(chartConfig);
  };

  useEffect(() => {
    createChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, chartType, colors, height, isLightBg]);

  // Apply dark/light theme CSS variables
  useEffect(() => {
    if (containerRef.current) {
      const textColor = isLightBg ? "#374151" : "#e5e7eb";
      const gridColor = isLightBg ? "#e5e7eb" : "#374151";
      
      containerRef.current.style.setProperty("--bb-text-color", textColor);
      containerRef.current.style.setProperty("--bb-grid-color", gridColor);
    }
  }, [isLightBg]);

  return (
    <div
      ref={containerRef}
      id={`brand-chart-${uniqueId}`}
      className="w-full h-full brand-chart"
      style={{
        ["--bb-text-color" as any]: isLightBg ? "#374151" : "#e5e7eb",
        ["--bb-grid-color" as any]: isLightBg ? "#e5e7eb" : "#374151",
      }}
    />
  );
});

BrandChart.displayName = "BrandChart";

export default BrandChart;
