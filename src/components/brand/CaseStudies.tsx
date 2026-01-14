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
    variant: "dark" as const,
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
    variant: "light" as const,
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="mb-32">
      {/* Case Study Cards - Full width grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border mb-16">
        {caseStudies.map((study) => (
          <article 
            key={study.id}
            className={`group relative overflow-hidden transition-all duration-300 ${
              study.variant === 'dark' ? 'bg-rho-obsidian' : 
              study.variant === 'mineral' ? 'bg-mineral-surface' : 'bg-background'
            }`}
          >
            {/* Background patterns */}
            {study.variant === 'dark' && (
              <div className="absolute inset-0 bg-pattern-dredging opacity-30"></div>
            )}
            {study.variant === 'mineral' && (
              <div className="absolute inset-0 bg-pattern-minerals opacity-20"></div>
            )}
            
            <div className="relative p-8 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className={`label-tech ${
                  study.variant === 'dark' ? 'text-slate-400' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-muted-foreground'
                }`}>
                  {study.industry}
                </span>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  study.variant === 'dark' ? 'bg-primary/20 text-primary' : 
                  study.variant === 'mineral' ? 'bg-mineral-neutral/20 text-mineral-deep' : 'bg-slate-100 text-slate-600'
                }`}>
                  <study.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-6">
                <div className={`font-data text-5xl md:text-6xl mb-2 ${
                  study.variant === 'dark' ? 'text-primary' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-primary'
                }`}>
                  {study.stat}
                </div>
                <div className={`text-sm ${
                  study.variant === 'dark' ? 'text-slate-400' : 
                  study.variant === 'mineral' ? 'text-mineral-deep' : 'text-muted-foreground'
                }`}>
                  {study.statLabel}
                </div>
              </div>

              <h3 className={`text-xl font-semibold font-ui mb-3 ${
                study.variant === 'dark' ? 'text-slate-100' : 'text-foreground'
              }`}>
                {study.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-auto ${
                study.variant === 'dark' ? 'text-slate-400' : 
                study.variant === 'mineral' ? 'text-mineral-deep' : 'text-muted-foreground'
              }`}>
                {study.description}
              </p>

              <div className={`grid grid-cols-3 gap-2 p-4 rounded-lg mt-6 ${
                study.variant === 'dark' ? 'bg-slate-800/50' : 
                study.variant === 'mineral' ? 'bg-mineral-neutral/10' : 'bg-slate-50'
              }`}>
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className={`font-data text-xs uppercase tracking-wider mb-1 ${
                      study.variant === 'dark' ? 'text-slate-500' : 
                      study.variant === 'mineral' ? 'text-mineral-neutral' : 'text-muted-foreground'
                    }`}>
                      {metric.label}
                    </div>
                    <div className={`text-sm font-semibold font-ui ${
                      study.variant === 'dark' ? 'text-slate-100' : 'text-foreground'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              <button className={`mt-6 flex items-center gap-2 text-sm font-medium ${
                study.variant === 'dark' ? 'text-primary hover:text-lime-400' : 
                study.variant === 'mineral' ? 'text-mineral-deep hover:text-mineral-neutral' : 'text-primary hover:text-primary/80'
              } transition-colors`}>
                <span className="font-ui">Read full study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Stats bar - Horizontal strip */}
      <div className="flex items-stretch border-t border-b border-border">
        {[
          { value: "500+", label: "Installations worldwide" },
          { value: "35+", label: "Years of expertise" },
          { value: "99.7%", label: "Average uptime" },
          { value: "< 2yr", label: "Typical payback" },
        ].map((stat, idx) => (
          <div key={idx} className="flex-1 py-8 px-4 border-r border-border last:border-r-0 text-center group hover:bg-slate-50 transition-colors">
            <div className="font-data text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="font-data text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;