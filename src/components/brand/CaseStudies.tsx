import { ArrowRight } from "lucide-react";
import dredgingHero from "@/assets/case-studies/dredging-hero.jpg";
import miningHero from "@/assets/case-studies/mining-hero.jpg";
import wastewaterHero from "@/assets/case-studies/wastewater-hero.jpg";

const caseStudies = [
  {
    id: "dredging",
    industry: "DREDGING",
    title: "North Sea Sediment Monitoring",
    stat: "42%",
    statLabel: "Efficiency increase",
    description: "Real-time slurry density monitoring enabled precise dredging operations.",
    metrics: [
      { label: "ACCURACY", value: "±0.5%" },
      { label: "UPTIME", value: "99.8%" },
      { label: "ROI", value: "8 mo" },
    ],
    // Dark variant: Maritime/offshore environments with harsh conditions
    variant: "dark" as const,
    image: dredgingHero,
  },
  {
    id: "mining",
    industry: "MINING",
    title: "Copper Tailings Optimization",
    stat: "31%",
    statLabel: "Water savings",
    description: "Continuous density measurement improved water recovery.",
    metrics: [
      { label: "FLOW", value: "850 m³/h" },
      { label: "TEMP", value: "-10–65°C" },
      { label: "MAINT", value: "<4h/yr" },
    ],
    // Mineral variant: Arid/earth-tone environments
    variant: "mineral" as const,
    image: miningHero,
  },
  {
    id: "wastewater",
    industry: "WASTEWATER",
    title: "Municipal Sludge Processing",
    stat: "28%",
    statLabel: "Cost reduction",
    description: "Automated density-based dosing optimized polymer usage.",
    metrics: [
      { label: "OUTPUT", value: "120 t/d" },
      { label: "ENERGY", value: "-15%" },
      { label: "COMPLY", value: "100%" },
    ],
    // Light variant: Clean industrial/indoor facilities
    variant: "light" as const,
    image: wastewaterHero,
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="space-y-16">
      {/* Case Study Cards - Separated card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <article 
            key={study.id}
            className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border flex flex-col ${
              study.variant === 'dark' ? 'bg-rho-obsidian border-border/30' : 
              study.variant === 'mineral' ? 'bg-mineral-surface border-mineral-deep/20' : 'bg-card border-border hover:border-primary/40'
            }`}
          >
            {/* Hero Image */}
            <div className="relative h-40 overflow-hidden">
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 ${
                study.variant === 'dark' ? 'bg-gradient-to-t from-rho-obsidian via-rho-obsidian/60 to-transparent' : 
                study.variant === 'mineral' ? 'bg-gradient-to-t from-mineral-surface via-mineral-surface/60 to-transparent' : 
                'bg-gradient-to-t from-card via-card/60 to-transparent'
              }`} />
              
              {/* Industry badge - JetBrains Mono with transparency */}
              <div className="absolute top-3 left-3">
                <span className="font-data text-[11px] tracking-wider px-2.5 py-1 rounded bg-black/60 text-white backdrop-blur-sm">
                  {study.industry}
                </span>
              </div>
            </div>
            
            <div className="relative p-6 flex flex-col flex-1">
              {/* KPI - Always green */}
              <div className="mb-4">
                <div className="font-data text-4xl md:text-5xl mb-1 text-primary">
                  {study.stat}
                </div>
                <div className={`text-sm font-medium ${
                  study.variant === 'dark' ? 'text-slate-300' : 
                  study.variant === 'mineral' ? 'text-mineral-deep/80' : 'text-slate-600'
                }`}>
                  {study.statLabel}
                </div>
              </div>

              <h3 className={`text-lg font-semibold font-ui mb-2 ${
                study.variant === 'dark' ? 'text-white' : 
                study.variant === 'mineral' ? 'text-mineral-deep' : 'text-foreground'
              }`}>
                {study.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                study.variant === 'dark' ? 'text-slate-300' : 
                study.variant === 'mineral' ? 'text-mineral-deep/90' : 'text-slate-600'
              }`}>
                {study.description}
              </p>

              {/* Metrics - Clean grid layout */}
              <div className={`grid grid-cols-3 divide-x rounded-md overflow-hidden ${
                study.variant === 'dark' ? 'bg-slate-800/60 divide-slate-700' : 
                study.variant === 'mineral' ? 'bg-mineral-deep/10 divide-mineral-deep/20' : 'bg-muted divide-border'
              }`}>
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="py-2.5 px-2 text-center">
                    <div className={`font-data text-[9px] tracking-wider mb-0.5 ${
                      study.variant === 'dark' ? 'text-slate-400' : 
                      study.variant === 'mineral' ? 'text-mineral-deep/60' : 'text-slate-500'
                    }`}>
                      {metric.label}
                    </div>
                    <div className={`font-data text-xs ${
                      study.variant === 'dark' ? 'text-white' : 
                      study.variant === 'mineral' ? 'text-mineral-deep' : 'text-foreground'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA - Always green, pinned to bottom */}
              <button className="mt-auto pt-5 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <span className="font-ui">Read full study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Stats bar - Responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-lg overflow-hidden">
        {[
          { value: "500+", label: "Installations worldwide" },
          { value: "35+", label: "Years of expertise" },
          { value: "99.7%", label: "Average uptime" },
          { value: "< 2yr", label: "Typical payback" },
        ].map((stat, idx) => (
          <div key={idx} className={`py-5 md:py-8 px-3 md:px-4 text-center group hover:bg-muted/30 transition-colors ${idx % 2 !== 0 ? 'border-l border-border' : ''} ${idx >= 2 ? 'border-t md:border-t-0 md:border-l' : ''}`}>
            <div className="font-data text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="font-data text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;