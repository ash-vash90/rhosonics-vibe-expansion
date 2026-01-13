import { TrendingUp, Droplets, Gauge, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "dredging",
    industry: "Dredging",
    title: "North Sea Sediment Monitoring",
    stat: "42%",
    statLabel: "Efficiency increase",
    description: "Real-time slurry density monitoring enabled precise dredging operations.",
    metrics: [
      { label: "Accuracy", value: "±0.5%" },
      { label: "Uptime", value: "99.8%" },
      { label: "ROI", value: "8 mo" },
    ],
    icon: Droplets,
    variant: "gradient" as const,
  },
  {
    id: "mining",
    industry: "Mining",
    title: "Copper Tailings Optimization",
    stat: "31%",
    statLabel: "Water savings",
    description: "Continuous density measurement improved water recovery.",
    metrics: [
      { label: "Flow Rate", value: "850 m³/h" },
      { label: "Temp Range", value: "-10 to 65°C" },
      { label: "Maintenance", value: "< 4h/yr" },
    ],
    icon: Gauge,
    variant: "mineral" as const,
  },
  {
    id: "wastewater",
    industry: "Wastewater",
    title: "Municipal Sludge Processing",
    stat: "28%",
    statLabel: "Cost reduction",
    description: "Automated density-based dosing optimized polymer usage.",
    metrics: [
      { label: "Throughput", value: "120 t/day" },
      { label: "Energy", value: "-15%" },
      { label: "Compliance", value: "100%" },
    ],
    icon: TrendingUp,
    variant: "metal" as const,
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="mb-16">
      {/* Case Study Cards - Full width grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {caseStudies.map((study) => (
          <article 
            key={study.id}
            className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              study.variant === 'gradient' ? 'card-gradient chamfer-lg' : 
              study.variant === 'mineral' ? 'card-mineral' : 'card-metal'
            }`}
          >
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`font-data text-xs uppercase tracking-wider ${
                  study.variant === 'gradient' ? 'text-slate-400' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-slate-500'
                }`}>
                  {study.industry}
                </span>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  study.variant === 'gradient' ? 'bg-primary/20 text-primary' : 
                  study.variant === 'mineral' ? 'bg-mineral-neutral/20 text-mineral-deep' : 'bg-slate-200 text-slate-600'
                }`}>
                  <study.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-4">
                <div className={`text-4xl font-bold font-ui tracking-tight mb-1 ${
                  study.variant === 'gradient' ? 'text-primary' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-foreground'
                }`}>
                  {study.stat}
                </div>
                <div className={`text-sm ${
                  study.variant === 'gradient' ? 'text-slate-300' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-slate-500'
                }`}>
                  {study.statLabel}
                </div>
              </div>

              <h3 className={`text-lg font-semibold font-ui mb-2 ${
                study.variant === 'gradient' ? 'text-slate-100' : 'text-foreground'
              }`}>
                {study.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                study.variant === 'gradient' ? 'text-slate-300' : 
                study.variant === 'mineral' ? 'text-mineral-deep' : 'text-slate-500'
              }`}>
                {study.description}
              </p>

              <div className={`grid grid-cols-3 gap-2 p-3 rounded-lg ${
                study.variant === 'gradient' ? 'bg-slate-800/50' : 
                study.variant === 'mineral' ? 'bg-mineral-neutral/10' : 'bg-slate-100'
              }`}>
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className={`font-data text-xs uppercase tracking-wider mb-0.5 ${
                      study.variant === 'gradient' ? 'text-slate-500' : 
                      study.variant === 'mineral' ? 'text-mineral-neutral' : 'text-slate-400'
                    }`}>
                      {metric.label}
                    </div>
                    <div className={`text-sm font-semibold font-ui ${
                      study.variant === 'gradient' ? 'text-slate-100' : 'text-foreground'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <button className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                study.variant === 'gradient' ? 'text-primary' : 
                study.variant === 'mineral' ? 'text-mineral-deep hover:text-mineral-neutral' : 'text-slate-600 hover:text-primary'
              }`}>
                <span className="font-ui">Read full study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Stats bar - Full width */}
      <div className="py-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Installations worldwide" },
            { value: "35+", label: "Years of expertise" },
            { value: "99.7%", label: "Average uptime" },
            { value: "< 2yr", label: "Typical payback" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-foreground font-ui mb-1">{stat.value}</div>
              <div className="font-data text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
