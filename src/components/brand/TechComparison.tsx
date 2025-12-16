import { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";
import { Zap, Droplets, Gauge, Leaf, Clock, DollarSign } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  { icon: <Clock className="w-5 h-5" />, label: "Uptime", value: "99.7%", desc: "Industry leading" },
  { icon: <DollarSign className="w-5 h-5" />, label: "TCO", value: "65%", desc: "lower vs nuclear" },
];

const radarData = [
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
  const [animatedBarData, setAnimatedBarData] = useState([
    { name: "SDM ECO", value: 0, fill: "hsl(var(--rho-green))" },
    { name: "Nuclear", value: 0, fill: "hsl(var(--slate-500))" },
    { name: "Coriolis", value: 0, fill: "hsl(var(--slate-400))" },
    { name: "Ultrasonic", value: 0, fill: "hsl(var(--slate-300))" },
  ]);
  const [animatedRadarData, setAnimatedRadarData] = useState(
    radarData.map(d => ({ ...d, sdm: 0, nuclear: 0, coriolis: 0 }))
  );
  const hasAnimatedBars = useRef(false);
  const hasAnimatedRadar = useRef(false);

  const finalBarValues = [15, 85, 45, 25];

  useEffect(() => {
    // Bar chart animation - animate the actual bar values
    ScrollTrigger.create({
      trigger: barChartRef.current,
      start: "top 75%",
      onEnter: () => {
        if (hasAnimatedBars.current) return;
        hasAnimatedBars.current = true;

        // Animate each bar's value from 0 to final
        finalBarValues.forEach((finalValue, index) => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: finalValue,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power3.out",
            onUpdate: () => {
              setAnimatedBarData(prev => {
                const newData = [...prev];
                newData[index] = { ...newData[index], value: Math.round(obj.value) };
                return newData;
              });
            }
          });
        });
      }
    });

    // Radar chart animation - animate values from center outward
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
            setAnimatedRadarData(
              radarData.map(d => ({
                ...d,
                sdm: Math.round(d.sdm * obj.progress),
                nuclear: Math.round(d.nuclear * obj.progress),
                coriolis: Math.round(d.coriolis * obj.progress),
              }))
            );
          }
        });
      }
    });

    return () => {
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
      <p className="text-slate-500 text-lg max-w-2xl mb-12">
        How our Sonic Density Measurement technology compares to nuclear, Coriolis, and traditional ultrasonic solutions.
      </p>

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
        <div ref={barChartRef} className="card-gradient chamfer-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-400">ENERGY CONSUMPTION</span>
          </div>
          <p className="text-slate-300 mb-6">Watts per measurement cycle</p>
          <div className="h-64" role="img" aria-label="Bar chart comparing energy consumption across technologies">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={animatedBarData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--slate-400))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--slate-600))' }} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--slate-300))', fontSize: 13, fontFamily: 'Instrument Sans' }} axisLine={false} tickLine={false} width={80} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={0}>
                  {animatedBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Comparison */}
        <div ref={radarChartRef} className="card-metal p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Gauge className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-500">MULTI-FACTOR ANALYSIS</span>
          </div>
          <p className="text-slate-600 mb-6">Performance across key metrics</p>
          <div className="h-64" role="img" aria-label="Radar chart showing multi-factor performance comparison">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={animatedRadarData}>
                <PolarGrid stroke="hsl(var(--slate-300))" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--slate-600))', fontSize: 11 }} />
                <Radar name="SDM ECO" dataKey="sdm" stroke="hsl(var(--rho-green))" fill="hsl(var(--rho-green))" fillOpacity={0.3} strokeWidth={2} isAnimationActive={false} />
                <Radar name="Nuclear" dataKey="nuclear" stroke="hsl(var(--slate-400))" fill="hsl(var(--slate-400))" fillOpacity={0.1} strokeWidth={1} isAnimationActive={false} />
                <Radar name="Coriolis" dataKey="coriolis" stroke="hsl(var(--slate-300))" fill="hsl(var(--slate-300))" fillOpacity={0.1} strokeWidth={1} isAnimationActive={false} />
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Instrument Sans' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
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
      </div>
    </section>
  );
};

export default TechComparison;
