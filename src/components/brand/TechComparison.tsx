import { useEffect, useRef, useState, useCallback } from "react";
import { Zap, Leaf, Clock, DollarSign } from "@/lib/icons";

// Brand color palette for charts - matches design tokens
const chartColors = {
  // Primary brand colors
  primary: "hsl(125, 50%, 40%)",      // --rho-green
  accent: "hsl(90, 60%, 45%)",        // --rho-green-accent

  // Slate scale for secondary data
  slate700: "hsl(215, 25%, 27%)",
  slate600: "hsl(215, 19%, 30%)",
  slate500: "hsl(215, 19%, 35%)",
  slate400: "hsl(215, 20%, 42%)",
  slate300: "hsl(213, 27%, 70%)",

  // Signal colors
  warning: "hsl(45, 80%, 50%)",       // Amber
  error: "hsl(0, 70%, 50%)",          // Red
  success: "hsl(125, 50%, 40%)",      // Green (same as primary)

  // Mineral tones
  mineralBronze: "hsl(55, 20%, 38%)",
};

// Common chart configuration
const chartConfig = {
  padding: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
  },
  transition: {
    duration: 900,
  },
};

const highlights = [
  { icon: Zap, label: "Energy Use", value: "85%", desc: "less than nuclear" },
  { icon: Leaf, label: "Zero", value: "Radiation", desc: "No licensing required" },
  { icon: Clock, label: "Uptime", value: "99.7%", desc: "Across 120+ installations" },
  { icon: DollarSign, label: "TCO", value: "65%", desc: "lower vs nuclear" },
];

const comparisonData = [
  { name: "SDM ECO", energy: 15, accuracy: 98, maintenance: 5, cost: 35 },
  { name: "Nuclear", energy: 85, accuracy: 95, maintenance: 60, cost: 100 },
  { name: "Coriolis", energy: 45, accuracy: 92, maintenance: 40, cost: 75 },
  { name: "Ultrasonic", energy: 25, accuracy: 88, maintenance: 25, cost: 45 },
];

type BillboardModule = typeof import("billboard.js");

// Shared billboard.js load promise so multiple cards don't fetch the library twice
let billboardPromise: Promise<BillboardModule> | null = null;
const loadBillboard = () => {
  if (!billboardPromise) {
    billboardPromise = import("billboard.js").then((mod) => {
      // Load CSS once
      import("billboard.js/dist/billboard.css");
      return mod;
    });
  }
  return billboardPromise;
};

interface ChartCardProps {
  title: string;
  subtitle: string;
  buildChart: (mod: BillboardModule, el: HTMLDivElement) => unknown;
}

/**
 * LazyChartCard
 * Renders a chart card that only initialises billboard.js when it scrolls into
 * view. billboard.js' built-in transition handles the animate-in — no extra
 * animation library or custom keyframes required.
 */
const LazyChartCard = ({ title, subtitle, buildChart }: ChartCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !chartRef.current) return;

    let mounted = true;

    const initChart = async () => {
      try {
        const bb = await loadBillboard();
        if (!mounted || !chartRef.current) return;

        instanceRef.current = buildChart(bb.default, chartRef.current);
        if (mounted) setLoaded(true);
      } catch (error) {
        console.error("Chart failed to initialize", error);
      }
    };

    initChart();

    return () => {
      mounted = false;
      try {
        (instanceRef.current as { destroy?: () => void } | undefined)?.destroy?.();
      } catch {
        // ignore
      }
      instanceRef.current = null;
    };
  }, [isVisible, buildChart]);

  return (
    <div
      ref={cardRef}
      className="bg-card border border-border rounded-lg p-6 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-1">
        {title}
      </span>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      <div className="relative h-64">
        <div ref={chartRef} className="h-full" />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
            <div className="animate-pulse">Loading chart...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TechComparison = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const buildLineChart = useCallback((bb: typeof import("billboard.js").default, el: HTMLDivElement) => {
    const { spline } = bb;
    return bb.generate({
      data: {
        columns: [
          ["Density", 1.42, 1.44, 1.43, 1.45, 1.44, 1.46, 1.45, 1.47, 1.46, 1.48],
          ["Velocity", 2.1, 2.3, 2.2, 2.4, 2.3, 2.5, 2.4, 2.6, 2.5, 2.7],
        ],
        type: spline(),
        colors: {
          Density: chartColors.primary,
          Velocity: chartColors.warning,
        },
      },
      point: {
        r: 3.5,
        focus: { expand: { r: 5.5 } },
      },
      axis: {
        x: {
          label: { text: "TIME (S)", position: "outer-center" },
          tick: { format: (x: number) => `${x * 10}` },
        },
        y: {
          label: { text: "VALUE", position: "outer-middle" },
        },
      },
      grid: {
        y: { show: true },
      },
      legend: { show: true },
      padding: chartConfig.padding,
      transition: chartConfig.transition,
      bindto: el,
    });
  }, []);

  const buildBarChart = useCallback((bb: typeof import("billboard.js").default, el: HTMLDivElement) => {
    const { bar } = bb;
    return bb.generate({
      data: {
        columns: [
          ["SDM ECO", 15],
          ["Nuclear", 85],
          ["Coriolis", 45],
          ["Ultrasonic", 25],
        ],
        type: bar(),
        colors: {
          "SDM ECO": chartColors.primary,
          Nuclear: chartColors.slate700,
          Coriolis: chartColors.slate500,
          Ultrasonic: chartColors.slate300,
        },
      },
      bar: {
        width: { ratio: 0.6 },
        radius: 2,
      },
      axis: {
        x: { type: "category", categories: ["ENERGY (W)"] },
        y: { max: 100, padding: { top: 10 } },
      },
      grid: {
        y: { show: true },
      },
      legend: { show: true },
      padding: chartConfig.padding,
      transition: chartConfig.transition,
      bindto: el,
    });
  }, []);

  const buildRadarChart = useCallback((bb: typeof import("billboard.js").default, el: HTMLDivElement) => {
    const { radar } = bb;
    return bb.generate({
      data: {
        columns: [
          ["SDM ECO", 95, 98, 95, 100, 100, 85],
          ["Nuclear", 20, 95, 40, 70, 30, 20],
          ["Coriolis", 60, 92, 60, 95, 75, 50],
        ],
        type: radar(),
        colors: {
          "SDM ECO": chartColors.primary,
          Nuclear: chartColors.slate700,
          Coriolis: chartColors.slate400,
        },
      },
      radar: {
        axis: {
          max: 100,
          text: { show: true },
        },
        level: { depth: 4 },
        direction: { clockwise: true },
      },
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
      transition: chartConfig.transition,
      bindto: el,
    });
  }, []);

  const buildGaugeChart = useCallback((bb: typeof import("billboard.js").default, el: HTMLDivElement) => {
    const { gauge } = bb;
    return bb.generate({
      data: {
        columns: [["Uptime", 99.7]],
        type: gauge(),
      },
      gauge: {
        label: {
          format: (value: number) => `${value}%`,
          extents: () => "",
        },
        width: 20,
        max: 100,
      },
      color: {
        pattern: [chartColors.error, chartColors.warning, chartColors.success],
        threshold: { values: [30, 70, 100] },
      },
      size: { height: 180 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      transition: chartConfig.transition,
      bindto: el,
    });
  }, []);

  // Safely render icon - prevent crashes if icon component fails to load
  const renderIcon = (IconComponent: typeof Zap, className: string) => {
    try {
      return <IconComponent className={className} />;
    } catch {
      return <div className={className} />;
    }
  };

  return (
    <section id="comparison" className="mb-32" ref={sectionRef}>
      {/* Highlight Stats - Responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border mb-16">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="py-6 md:py-8 px-4 md:px-6 border-r border-border last:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(1)]:border-b [&:nth-child(2)]:border-b md:[&:nth-child(1)]:border-b-0 md:[&:nth-child(2)]:border-b-0 text-center group hover:bg-muted/50 transition-colors"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 bg-muted rounded flex items-center justify-center mx-auto mb-3 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {Icon && renderIcon(Icon, "w-4 h-4 md:w-5 md:h-5")}
              </div>
              <div className="font-data text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground/70 mb-1">
                {item.label}
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground font-ui tabular-nums">
                {item.value}
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-1">{item.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid - 2x2 billboard.js visualizations, each animates in on scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        <LazyChartCard
          title="Line Chart"
          subtitle="Sensor data trends over time"
          buildChart={buildLineChart}
        />
        <LazyChartCard
          title="Bar Chart"
          subtitle="Technology energy consumption"
          buildChart={buildBarChart}
        />
        <LazyChartCard
          title="Radar Chart"
          subtitle="Multi-factor performance analysis"
          buildChart={buildRadarChart}
        />
        <LazyChartCard
          title="Gauge Chart"
          subtitle="System uptime indicator"
          buildChart={buildGaugeChart}
        />
      </div>

      {/* Comparison Table */}
      <h3 className="label-tech text-muted-foreground mb-4">DETAILED COMPARISON</h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="text-left p-4 font-data text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Technology
              </th>
              <th className="text-center p-4 font-data text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Energy (W)
              </th>
              <th className="text-center p-4 font-data text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Accuracy (%)
              </th>
              <th className="text-center p-4 font-data text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Maint. (h/yr)
              </th>
              <th className="text-center p-4 font-data text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Rel. Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <tr
                key={row.name}
                className={`border-b border-border last:border-b-0 ${idx === 0 ? "bg-primary/5" : ""}`}
              >
                <td className={`p-4 font-ui font-semibold ${idx === 0 ? "text-primary" : "text-foreground"}`}>
                  {row.name}
                  {idx === 0 && (
                    <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                      BEST
                    </span>
                  )}
                </td>
                <td className="text-center p-4 font-data uppercase text-muted-foreground">{row.energy}</td>
                <td className="text-center p-4 font-data uppercase text-muted-foreground">{row.accuracy}</td>
                <td className="text-center p-4 font-data uppercase text-muted-foreground hidden sm:table-cell">
                  {row.maintenance}
                </td>
                <td className="text-center p-4 font-data uppercase text-muted-foreground">{row.cost}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TechComparison;
