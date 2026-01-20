import { useEffect, useRef } from "react";
import { Zap, Leaf, Clock, DollarSign } from "@/lib/icons";
import bb, { line, bar, radar, gauge } from "billboard.js";
import "billboard.js/dist/billboard.css";

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
    duration: 500,
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

export const TechComparison = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
  const gaugeChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Line Chart - Sensor Trends
    if (lineChartRef.current) {
      bb.generate({
        data: {
          columns: [
            ["Density", 1.42, 1.44, 1.43, 1.45, 1.44, 1.46, 1.45, 1.47, 1.46, 1.48],
            ["Velocity", 2.1, 2.3, 2.2, 2.4, 2.3, 2.5, 2.4, 2.6, 2.5, 2.7],
          ],
          type: line(),
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
        bindto: lineChartRef.current,
      });
    }

    // Bar Chart - Energy Consumption
    if (barChartRef.current) {
      bb.generate({
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
        bindto: barChartRef.current,
      });
    }

    // Radar Chart - Multi-Factor Analysis
    if (radarChartRef.current) {
      bb.generate({
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
            text: {
              show: true,
            },
          },
          level: { depth: 4 },
          direction: { clockwise: true },
        },
        padding: { top: 10, right: 10, bottom: 10, left: 10 },
        transition: chartConfig.transition,
        bindto: radarChartRef.current,
      });
    }

    // Gauge Chart - System Uptime
    if (gaugeChartRef.current) {
      bb.generate({
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
        bindto: gaugeChartRef.current,
      });
    }
  }, []);

  return (
    <section id="comparison" className="mb-32" ref={sectionRef}>
      {/* Highlight Stats - Horizontal strip */}
      <div className="flex items-stretch border-t border-b border-border mb-16">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 py-8 px-6 border-r border-border last:border-r-0 text-center group hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mx-auto mb-3 text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="font-data text-xs uppercase tracking-wider text-muted-foreground mb-1">
              {item.label}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-ui">
              {item.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid - 2x2 billboard.js visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        {/* Line Chart - Sensor Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-1">Line Chart</span>
          <p className="text-sm text-muted-foreground mb-4">Sensor data trends over time</p>
          <div ref={lineChartRef} className="h-64" />
        </div>

        {/* Bar Chart - Energy Consumption */}
        <div className="bg-card border border-border rounded-lg p-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-1">Bar Chart</span>
          <p className="text-sm text-muted-foreground mb-4">Technology energy consumption</p>
          <div ref={barChartRef} className="h-64" />
        </div>

        {/* Radar Chart - Multi-Factor Analysis */}
        <div className="bg-card border border-border rounded-lg p-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-1">Radar Chart</span>
          <p className="text-sm text-muted-foreground mb-4">Multi-factor performance analysis</p>
          <div ref={radarChartRef} className="h-64" />
        </div>

        {/* Gauge Chart - System Uptime */}
        <div className="bg-card border border-border rounded-lg p-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-1">Gauge Chart</span>
          <p className="text-sm text-muted-foreground mb-4">System uptime indicator</p>
          <div ref={gaugeChartRef} className="h-64" />
        </div>
      </div>

      {/* Comparison Table */}
      <h3 className="label-tech text-muted-foreground mb-4">DETAILED COMPARISON</h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="text-left p-4 font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Technology
              </th>
              <th className="text-center p-4 font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Energy (W)
              </th>
              <th className="text-center p-4 font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Accuracy (%)
              </th>
              <th className="text-center p-4 font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Maint. (h/yr)
              </th>
              <th className="text-center p-4 font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                <td className="text-center p-4 font-data text-muted-foreground">{row.energy}</td>
                <td className="text-center p-4 font-data text-muted-foreground">{row.accuracy}</td>
                <td className="text-center p-4 font-data text-muted-foreground hidden sm:table-cell">
                  {row.maintenance}
                </td>
                <td className="text-center p-4 font-data text-muted-foreground">{row.cost}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TechComparison;
