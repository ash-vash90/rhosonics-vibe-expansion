import { useEffect, useRef, useState } from "react";
import { Zap, Droplets, Gauge, Leaf, Clock, DollarSign } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bb, { bar, radar } from "billboard.js";
import "billboard.js/dist/billboard.css";

gsap.registerPlugin(ScrollTrigger);

const comparisonData = [
  { name: "SDM ECO", energy: 15, accuracy: 98, maintenance: 5, cost: 35 },
  { name: "Nuclear", energy: 85, accuracy: 95, maintenance: 60, cost: 100 },
  { name: "Coriolis", energy: 45, accuracy: 92, maintenance: 40, cost: 75 },
  { name: "Ultrasonic", energy: 25, accuracy: 88, maintenance: 25, cost: 45 },
];

const highlights = [
  { icon: Zap, label: "Energy Use", value: "85%", desc: "less than nuclear" },
  { icon: Leaf, label: "Zero", value: "Radiation", desc: "No licensing required" },
  { icon: Clock, label: "Uptime", value: "99.7%", desc: "Across 120+ installations" },
  { icon: DollarSign, label: "TCO", value: "65%", desc: "lower vs nuclear" },
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

  useEffect(() => {
    if (!barChartRef.current || barChartInstance.current) return;
    const currentValues = finalBarValues.map(v => Math.round(v * barAnimProgress));

    barChartInstance.current = bb.generate({
      bindto: barChartRef.current,
      data: {
        type: bar(),
        columns: [["Energy", ...currentValues]],
        colors: { Energy: "hsl(125, 50%, 40%)" },
        color: function(_color: string, d: any) {
          if (d.index !== undefined) return barColors[barCategories[d.index]] || _color;
          return _color;
        },
      },
      axis: {
        rotated: true,
        x: { type: "category", categories: barCategories, tick: { outer: false } },
        y: { max: 100, tick: { outer: false } },
      },
      grid: { y: { show: true } },
      legend: { show: false },
      bar: { radius: { ratio: 0.15 }, width: { ratio: 0.6 } },
      transition: { duration: 0 },
      size: { height: 240 },
      padding: { top: 10, right: 20, bottom: 20, left: 80 },
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
        barChartInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!barChartInstance.current) return;
    const currentValues = finalBarValues.map(v => Math.round(v * barAnimProgress));
    barChartInstance.current.load({ columns: [["Energy", ...currentValues]] });
  }, [barAnimProgress]);

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
      radar: { axis: { max: 100, text: { show: true } }, level: { depth: 4 }, direction: { clockwise: true } },
      legend: { show: true },
      transition: { duration: 0 },
      size: { height: 220 },
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    return () => {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
        radarChartInstance.current = null;
      }
    };
  }, []);

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

  useEffect(() => {
    const initScrollTriggers = () => {
      ScrollTrigger.create({
        trigger: barChartRef.current,
        start: "top 75%",
        onEnter: () => {
          if (hasAnimatedBars.current) return;
          hasAnimatedBars.current = true;
          const obj = { progress: 0 };
          gsap.to(obj, { progress: 1, duration: 1.2, ease: "power3.out", onUpdate: () => setBarAnimProgress(obj.progress) });
        },
      });

      ScrollTrigger.create({
        trigger: radarChartRef.current,
        start: "top 75%",
        onEnter: () => {
          if (hasAnimatedRadar.current) return;
          hasAnimatedRadar.current = true;
          const obj = { progress: 0 };
          gsap.to(obj, { progress: 1, duration: 1.5, ease: "power2.out", onUpdate: () => setRadarAnimProgress(obj.progress) });
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
    <section id="comparison" className="mb-16">
      {/* Highlight Stats - Full width */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 py-6 border-y border-slate-200">
        {highlights.map((item, idx) => (
          <article key={idx} className="text-center group">
            <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mx-auto mb-2 text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="font-data text-xs uppercase tracking-wider text-slate-500 mb-1">{item.label}</div>
            <div className="text-2xl font-bold text-foreground font-ui">{item.value}</div>
            <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
          </article>
        ))}
      </div>

      {/* Charts Grid - Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card-gradient chamfer-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-400">ENERGY CONSUMPTION</span>
          </div>
          <p className="text-slate-300 text-sm mb-4">Watts per measurement cycle</p>
          <div ref={barChartRef} className="h-56 bb-chart-dark" />
        </div>

        <div className="card-metal p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="w-5 h-5 text-primary" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">MULTI-FACTOR ANALYSIS</span>
          </div>
          <p className="text-slate-600 text-sm mb-4">Performance across key metrics</p>
          <div ref={radarChartRef} className="h-56 bb-chart-light" />
        </div>
      </div>

      {/* Comparison Table - Full width */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="text-left p-3 font-ui text-xs font-semibold text-slate-600 uppercase tracking-wider">Technology</th>
                <th className="text-center p-3 font-ui text-xs font-semibold text-slate-600 uppercase tracking-wider">Energy (W)</th>
                <th className="text-center p-3 font-ui text-xs font-semibold text-slate-600 uppercase tracking-wider">Accuracy (%)</th>
                <th className="text-center p-3 font-ui text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Maint. (h/yr)</th>
                <th className="text-center p-3 font-ui text-xs font-semibold text-slate-600 uppercase tracking-wider">Rel. Cost</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={row.name} className={`border-b border-slate-100 ${idx === 0 ? 'bg-primary/5' : ''}`}>
                  <td className={`p-3 font-ui font-semibold ${idx === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {row.name}
                    {idx === 0 && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">BEST</span>}
                  </td>
                  <td className="text-center p-3 font-data text-slate-600">{row.energy}</td>
                  <td className="text-center p-3 font-data text-slate-600">{row.accuracy}</td>
                  <td className="text-center p-3 font-data text-slate-600 hidden sm:table-cell">{row.maintenance}</td>
                  <td className="text-center p-3 font-data text-slate-600">{row.cost}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TechComparison;
