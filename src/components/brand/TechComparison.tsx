import { useEffect, useRef, useState } from "react";
import { Zap, Droplets, Gauge, Leaf, Clock, DollarSign } from "@/lib/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const barColors: Record<string, string> = {
  "SDM ECO": "hsl(125, 50%, 40%)",
  "Nuclear": "hsl(215, 19%, 35%)",
  "Coriolis": "hsl(215, 20%, 45%)",
  "Ultrasonic": "hsl(213, 27%, 70%)",
};

export const TechComparison = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const initScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          const obj = { progress: 0 };
          gsap.to(obj, {
            progress: 1,
            duration: 1.2,
            ease: "power3.out",
            onUpdate: () => setAnimProgress(obj.progress),
          });
        },
      });
    };

    const timeoutId = setTimeout(initScrollTrigger, 100);
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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

      {/* Charts Grid - CSS-based visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border mb-16">
        {/* Energy Consumption Bar Chart */}
        <div className="bg-rho-obsidian p-8">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="label-tech text-primary">ENERGY CONSUMPTION</span>
          </div>
          <p className="text-slate-400 text-sm mb-6">Watts per measurement cycle</p>
          <div className="space-y-4">
            {comparisonData.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-24 text-sm font-ui text-slate-300 shrink-0">
                  {item.name}
                </span>
                <div className="flex-1 h-8 bg-slate-800 rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.energy * animProgress}%`,
                      backgroundColor: barColors[item.name],
                    }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-data text-slate-400">
                  {Math.round(item.energy * animProgress)}W
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Factor Analysis - Grouped bars */}
        <div className="bg-background p-8">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-5 h-5 text-primary" />
            <span className="label-tech text-muted-foreground">MULTI-FACTOR ANALYSIS</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">Performance across key metrics</p>
          
          {/* Legend */}
          <div className="flex gap-6 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: barColors["SDM ECO"] }} />
              <span className="text-muted-foreground">SDM ECO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: barColors["Nuclear"] }} />
              <span className="text-muted-foreground">Nuclear</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: barColors["Coriolis"] }} />
              <span className="text-muted-foreground">Coriolis</span>
            </div>
          </div>

          <div className="space-y-3">
            {radarDataFinal.map((item) => (
              <div key={item.metric}>
                <div className="text-xs text-muted-foreground mb-1 font-ui">{item.metric}</div>
                <div className="flex gap-1 h-5">
                  <div
                    className="h-full rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.sdm * animProgress * 0.33}%`,
                      backgroundColor: barColors["SDM ECO"],
                    }}
                  />
                  <div
                    className="h-full rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.nuclear * animProgress * 0.33}%`,
                      backgroundColor: barColors["Nuclear"],
                    }}
                  />
                  <div
                    className="h-full rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.coriolis * animProgress * 0.33}%`,
                      backgroundColor: barColors["Coriolis"],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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
