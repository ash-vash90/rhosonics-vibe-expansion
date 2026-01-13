import { useEffect, useRef, useState } from "react";
import { Zap, Droplets, Gauge, Leaf, Clock, DollarSign } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bb, { bar, radar } from "billboard.js";
import "billboard.js/dist/billboard.css";

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  { name: "SDM ECO", energy: 15, accuracy: 98, maintenance: 5, lifespan: 20, cost: 35 },
  { name: "Nuclear", energy: 85, accuracy: 95, maintenance: 60, cost: 100 },
  { name: "Coriolis", energy: 45, accuracy: 92, maintenance: 40, cost: 75 },
  { name: "Ultrasonic", energy: 25, accuracy: 88, maintenance: 25, cost: 45 },
];

const highlights = [
  { icon: <Zap className="w-5 h-5" />, label: "Energy Use", value: "85%", desc: "less than nuclear" },
  { icon: <Leaf className="w-5 h-5" />, label: "Zero", value: "Radiation", desc: "No licensing required" },
  { icon: <Clock className="w-5 h-5" />, label: "Uptime", value: "99.7%", desc: "Measured across 120+ installations, 2022-2024" },
  { icon: <DollarSign className="w-5 h-5" />, label: "TCO", value: "65%", desc: "lower vs nuclear" },
];

const radarDataFinal = [
  { metric: "Energy Efficiency", sdm: 95, nuclear: 20, coriolis: 60 },
  { metric: "Accuracy", sdm: 98, nuclear: 95, coriolis: 92 },
  { metric: "Low Maintenance", sdm: 95, nuclear: 40, coriolis: 60 },
  { metric: "Safety", sdm: 100, nuclear: 70, coriolis: 95 },
  { metric: "Sustainability", sdm: 100, nuclear: 30, coriolis: 75 },
  { metric: "Cost Efficiency", sdm: 85, nuclear: 20, coriolis: 50 },
];

export const TechComparison = () => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
  const barChartInstance = useRef<any>(null);
  const radarChartInstance = useRef<any>(null);
  const [barAnimProgress, setBarAnimProgress] = useState(0);
  const [radarAnimProgress, setRadarAnimProgress] = useState(0);
  const hasAnimatedBars = useRef(false);
  const hasAnimatedRadar = useRef(false);

  const finalBarValues = [15, 85, 45, 25];
  const barCategories = ["SDM ECO", "Nuclear", "Coriolis", "Ultrasonic"];
  const barColors: Record<string, string> = {
    "SDM ECO": "hsl(125, 50%, 40%)",
    "Nuclear": "hsl(215, 19%, 35%)",
    "Coriolis": "hsl(215, 20%, 45%)",
    "Ultrasonic": "hsl(213, 27%, 70%)",
  };

  // Initialize bar chart
  useEffect(() => {
    if (!barChartRef.current || barChartInstance.current) return;

    const currentValues = finalBarValues.map(v => Math.round(v * barAnimProgress));

    barChartInstance.current = bb.generate({
      bindto: barChartRef.current,
      data: {
        type: bar(),
        columns: [["Energy", ...currentValues]],
        colors: {
          Energy: "hsl(125, 50%, 40%)",
        },
        color: function(_color: string, d: any) {
          if (d.index !== undefined) {
            return barColors[barCategories[d.index]] || _color;
          }
          return _color;
        },
      },
      axis: {
        rotated: true,
        x: {
          type: "category",
          categories: barCategories,
          tick: {
            outer: false,
          },
        },
        y: {
          max: 100,
          tick: {
            outer: false,
          },
        },
      },
      grid: {
        y: { show: true },
      },
      legend: {
        show: false,
      },
      bar: {
        radius: { ratio: 0.15 },
        width: { ratio: 0.6 },
      },
      transition: {
        duration: 0,
      },
      size: {
        height: 280,
      },
      padding: {
        top: 10,
        right: 20,
        bottom: 30,
        left: 80,
      },
      onrendered: function() {
        applyBarChartStyles();
      },
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
        barChartInstance.current = null;
      }
    };
  }, []);

  // Update bar chart when animation progress changes
  useEffect(() => {
    if (!barChartInstance.current) return;
    const currentValues = finalBarValues.map(v => Math.round(v * barAnimProgress));
    barChartInstance.current.load({
      columns: [["Energy", ...currentValues]],
    });
  }, [barAnimProgress]);

  // Initialize radar chart
  useEffect(() => {
    if (!radarChartRef.current || radarChartInstance.current) return;

    const sdmValues = radarDataFinal.map(d => Math.round(d.sdm * radarAnimProgress));
    const nuclearValues = radarDataFinal.map(d => Math.round(d.nuclear * radarAnimProgress));
    const coriolisValues = radarDataFinal.map(d => Math.round(d.coriolis * radarAnimProgress));

    radarChartInstance.current = bb.generate({
      bindto: radarChartRef.current,
      data: {
        type: radar(),
        columns: [
          ["SDM ECO", ...sdmValues],
          ["Nuclear", ...nuclearValues],
          ["Coriolis", ...coriolisValues],
        ],
        colors: {
          "SDM ECO": "hsl(125, 50%, 40%)",
          "Nuclear": "hsl(215, 20%, 45%)",
          "Coriolis": "hsl(213, 27%, 70%)",
        },
      },
      radar: {
        axis: {
          max: 100,
          text: {
            show: true,
          },
        },
        level: {
          depth: 4,
        },
        direction: {
          clockwise: true,
        },
      },
      legend: {
        show: true,
      },
      transition: {
        duration: 0,
      },
      size: {
        height: 256,
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      onrendered: function() {
        applyRadarChartStyles();
      },
    });

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
        radarChartInstance.current = null;
      }
    };
  }, []);

  // Update radar chart when animation progress changes
  useEffect(() => {
    if (!radarChartInstance.current) return;
    const sdmValues = radarDataFinal.map(d => Math.round(d.sdm * radarAnimProgress));
    const nuclearValues = radarDataFinal.map(d => Math.round(d.nuclear * radarAnimProgress));
    const coriolisValues = radarDataFinal.map(d => Math.round(d.coriolis * radarAnimProgress));
    
    radarChartInstance.current.load({
      columns: [
        ["SDM ECO", ...sdmValues],
        ["Nuclear", ...nuclearValues],
        ["Coriolis", ...coriolisValues],
      ],
    });
  }, [radarAnimProgress]);

  const applyBarChartStyles = () => {
    if (!barChartRef.current) return;
    const svg = barChartRef.current.querySelector("svg");
    if (!svg) return;

    svg.querySelectorAll(".bb-axis text, .bb-axis-x text, .bb-axis-y text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "12px";
      (el as SVGTextElement).style.fill = "hsl(215, 19%, 55%)";
    });

    svg.querySelectorAll(".bb-axis-x text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'Instrument Sans', sans-serif";
      (el as SVGTextElement).style.fontSize = "13px";
      (el as SVGTextElement).style.fill = "hsl(210, 40%, 90%)";
    });

    svg.querySelectorAll(".bb-grid line").forEach((el) => {
      (el as SVGLineElement).style.stroke = "hsl(215, 19%, 30%)";
      (el as SVGLineElement).style.strokeDasharray = "3 3";
    });

    svg.querySelectorAll(".bb-axis path.domain").forEach((el) => {
      (el as SVGPathElement).style.stroke = "hsl(215, 19%, 40%)";
    });
  };

  const applyRadarChartStyles = () => {
    if (!radarChartRef.current) return;
    const svg = radarChartRef.current.querySelector("svg");
    if (!svg) return;

    svg.querySelectorAll(".bb-axis text, .bb-text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'JetBrains Mono', monospace";
      (el as SVGTextElement).style.fontSize = "11px";
      (el as SVGTextElement).style.fill = "hsl(215, 19%, 35%)";
    });

    svg.querySelectorAll(".bb-legend-item text").forEach((el) => {
      (el as SVGTextElement).style.fontFamily = "'Instrument Sans', sans-serif";
      (el as SVGTextElement).style.fontSize = "12px";
    });

    svg.querySelectorAll(".bb-levels polygon, .bb-levels line").forEach((el) => {
      (el as SVGElement).style.stroke = "hsl(213, 27%, 84%)";
    });
  };

  // Scroll trigger animations
  useEffect(() => {
    const initScrollTriggers = () => {
      ScrollTrigger.create({
        trigger: barChartRef.current,
        start: "top 75%",
        onEnter: () => {
          if (hasAnimatedBars.current) return;
          hasAnimatedBars.current = true;

          const obj = { progress: 0 };
          gsap.to(obj, {
            progress: 1,
            duration: 1.2,
            ease: "power3.out",
            onUpdate: () => {
              setBarAnimProgress(obj.progress);
            },
          });
        },
      });

      ScrollTrigger.create({
        trigger: radarChartRef.current,
        start: "top 75%",
        onEnter: () => {
          if (hasAnimatedRadar.current) return;
          hasAnimatedRadar.current = true;

          const obj = { progress: 0 };
          gsap.to(obj, {
            progress: 1,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              setRadarAnimProgress(obj.progress);
            },
          });
        },
      });
    };

    const timeoutId = setTimeout(initScrollTriggers, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="comparison" className="mb-24">
      <div className="border-t-2 border-slate-200 pt-16 mb-8" />
      <div className="flex items-center gap-3 mb-2">
        <Gauge className="w-5 h-5 text-primary" />
        <span className="font-data text-xs uppercase tracking-wider text-primary">TECHNOLOGY</span>
      </div>
      <h2 className="section-header">SDM ECO vs Competition</h2>
      <p className="text-slate-500 text-lg max-w-2xl mb-8">
        Performance comparison across measurement technologies. Values represent typical operating conditions in slurry applications at 20-40% solids concentration.
      </p>

      {/* Data Context Block */}
      <div className="mb-12 p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">Test Basis</span>
            <p className="text-slate-700 mt-1">Standardized protocol, 2019-2024</p>
          </div>
          <div>
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">Metrics</span>
            <p className="text-slate-700 mt-1">Energy, accuracy, maintenance hours</p>
          </div>
          <div>
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">Source</span>
            <p className="text-slate-700 mt-1">Published specs and field observations</p>
          </div>
        </div>
      </div>

      {/* Highlight Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 py-8 border-y border-slate-200" role="list" aria-label="Key performance metrics">
        {highlights.map((item, idx) => (
          <article key={idx} className="text-center group" role="listitem">
            <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mx-auto mb-3 text-slate-500 group-hover:bg-primary group-hover:text-white transition-all" aria-hidden="true">
              {item.icon}
            </div>
            <div className="font-data text-xs uppercase tracking-wider text-slate-500 mb-1">{item.label}</div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-ui">{item.value}</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">{item.desc}</div>
          </article>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {/* Energy Consumption Bar Chart */}
        <div className="card-gradient chamfer-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-400">ENERGY CONSUMPTION</span>
          </div>
          <p className="text-slate-300 mb-6">Watts per measurement cycle</p>
          <div 
            ref={barChartRef} 
            className="h-64 bb-chart-dark" 
            role="img" 
            aria-label="Bar chart comparing energy consumption across technologies"
          />
        </div>

        {/* Radar Comparison */}
        <div className="card-metal p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Gauge className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">MULTI-FACTOR ANALYSIS</span>
          </div>
          <p className="text-slate-600 mb-6">Performance across key metrics</p>
          <div 
            ref={radarChartRef} 
            className="h-64 bb-chart-light" 
            role="img" 
            aria-label="Radar chart showing multi-factor performance comparison"
          />
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50">
          <span className="font-data text-xs uppercase tracking-wider text-slate-600">DETAILED SPECIFICATIONS</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Technology comparison specifications">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th scope="col" className="text-left p-3 sm:p-4 font-ui text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Technology</th>
                <th scope="col" className="text-center p-3 sm:p-4 font-ui text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Energy (W)</th>
                <th scope="col" className="text-center p-3 sm:p-4 font-ui text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Accuracy (%)</th>
                <th scope="col" className="text-center p-3 sm:p-4 font-ui text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Maint. (h/yr)</th>
                <th scope="col" className="text-center p-3 sm:p-4 font-ui text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Rel. Cost</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr 
                  key={row.name} 
                  className={`border-b border-slate-100 ${idx === 0 ? 'bg-primary/5' : ''}`}
                >
                  <td className={`p-3 sm:p-4 font-ui font-semibold ${idx === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {row.name}
                    {idx === 0 && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium">BEST</span>}
                  </td>
                  <td className="text-center p-3 sm:p-4 font-data text-slate-600">{row.energy}</td>
                  <td className="text-center p-3 sm:p-4 font-data text-slate-600">{row.accuracy}</td>
                  <td className="text-center p-3 sm:p-4 font-data text-slate-600 hidden sm:table-cell">{row.maintenance}</td>
                  <td className="text-center p-3 sm:p-4 font-data text-slate-600">{row.cost}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footnote */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <p className="text-xs text-slate-500 font-data">
            Values are representative. Actual performance varies by application, media properties, and installation conditions. Contact engineering for site-specific assessment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechComparison;
