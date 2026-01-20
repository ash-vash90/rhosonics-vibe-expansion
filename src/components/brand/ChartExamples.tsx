import { useEffect, useRef } from "react";
import bb, { line, bar, gauge } from "billboard.js";
import "billboard.js/dist/billboard.css";

export const ChartExamples = () => {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
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
            Density: "hsl(var(--primary))",
            Velocity: "hsl(var(--accent))",
          },
        },
        axis: {
          x: {
            label: "Time (s)",
            tick: {
              format: (x: number) => `${x * 10}s`,
            },
          },
          y: {
            label: "Value",
          },
        },
        legend: {
          show: true,
        },
        bindto: lineChartRef.current,
      });
    }

    // Bar Chart - Efficiency Comparison
    if (barChartRef.current) {
      bb.generate({
        data: {
          columns: [
            ["SDM ECO", 98.2],
            ["Nuclear", 72.4],
            ["Coriolis", 85.1],
            ["Ultrasonic", 78.9],
          ],
          type: bar(),
          colors: {
            "SDM ECO": "hsl(var(--primary))",
            Nuclear: "hsl(var(--muted-foreground))",
            Coriolis: "hsl(var(--muted-foreground))",
            Ultrasonic: "hsl(var(--muted-foreground))",
          },
        },
        axis: {
          x: {
            type: "category",
            categories: ["Efficiency %"],
          },
          y: {
            max: 100,
          },
        },
        legend: {
          show: true,
        },
        bindto: barChartRef.current,
      });
    }

    // Gauge Chart - System Status
    if (gaugeChartRef.current) {
      bb.generate({
        data: {
          columns: [["Uptime", 94.7]],
          type: gauge(),
        },
        gauge: {
          label: {
            format: (value: number) => `${value}%`,
          },
          max: 100,
        },
        color: {
          pattern: [
            "hsl(var(--error))",
            "hsl(var(--warning))",
            "hsl(var(--primary))",
          ],
          threshold: {
            values: [30, 70, 100],
          },
        },
        bindto: gaugeChartRef.current,
      });
    }
  }, []);

  return (
    <section className="space-y-12">
      {/* Line Chart */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Line Chart</span>
          <p className="text-sm text-muted-foreground">Sensor data trends over time</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div ref={lineChartRef} className="h-64" />
        </div>
      </div>

      {/* Bar Chart */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Bar Chart</span>
          <p className="text-sm text-muted-foreground">Technology efficiency comparison</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div ref={barChartRef} className="h-64" />
        </div>
      </div>

      {/* Gauge Chart */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Gauge Chart</span>
          <p className="text-sm text-muted-foreground">System uptime indicator</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div ref={gaugeChartRef} className="h-64" />
        </div>
      </div>

      <p className="text-muted-foreground max-w-xl">
        Charts use billboard.js for interactive data visualization. 
        Colors are mapped to semantic design tokens for theme consistency.
      </p>
    </section>
  );
};

export default ChartExamples;
