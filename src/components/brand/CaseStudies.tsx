import { BarChart2, TrendingUp, Droplets, Gauge, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "dredging",
    industry: "Dredging",
    title: "North Sea Sediment Monitoring",
    stat: "42%",
    statLabel: "Efficiency increase",
    description: "Real-time slurry density monitoring enabled precise dredging operations, reducing fuel consumption and environmental impact.",
    metrics: [
      { label: "Accuracy", value: "±0.5%" },
      { label: "Uptime", value: "99.8%" },
      { label: "ROI Period", value: "8 mo" },
    ],
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    id: "mining",
    industry: "Mining",
    title: "Copper Tailings Optimization",
    stat: "31%",
    statLabel: "Water savings",
    description: "Continuous density measurement in thickener underflow improved water recovery and reduced tailings dam footprint.",
    metrics: [
      { label: "Flow Rate", value: "850 m³/h" },
      { label: "Temp Range", value: "-10 to 65°C" },
      { label: "Maintenance", value: "< 4h/yr" },
    ],
    icon: <Gauge className="w-6 h-6" />,
  },
  {
    id: "wastewater",
    industry: "Wastewater",
    title: "Municipal Sludge Processing",
    stat: "28%",
    statLabel: "Cost reduction",
    description: "Automated density-based dosing control optimized polymer usage and dewatering performance in centrifuge systems.",
    metrics: [
      { label: "Throughput", value: "120 t/day" },
      { label: "Energy", value: "-15%" },
      { label: "Compliance", value: "100%" },
    ],
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="mb-24">
      <div className="border-t-2 border-slate-200 pt-16 mb-8" />
      <div className="flex items-center gap-3 mb-2">
        <BarChart2 className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="label-tech text-primary">ANALYSIS</span>
      </div>
      <h2 className="section-header">Case Studies</h2>
      <p className="text-slate-500 text-lg max-w-2xl mb-12">
        Real-world applications demonstrating measurable impact across industries.
      </p>

      {/* Case Study Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {caseStudies.map((study, idx) => (
          <article 
            key={study.id}
            className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              idx === 0 ? 'card-gradient chamfer-lg' : idx === 1 ? 'card-earth' : 'card-metal'
            }`}
          >
            {/* Wave pattern background */}
            <div className="absolute inset-0 opacity-10 bg-wave-pattern" aria-hidden="true" />
            
            <div className="relative p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs uppercase tracking-wider font-ui font-medium ${
                  idx === 0 ? 'text-slate-400' : idx === 1 ? 'text-earth-ochre-dark' : 'text-slate-500'
                }`}>
                  {study.industry}
                </span>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  idx === 0 
                    ? 'bg-primary/20 text-primary' 
                    : idx === 1 
                      ? 'bg-earth-ochre/20 text-earth-ochre-dark group-hover:bg-earth-ochre group-hover:text-white'
                      : 'bg-slate-200 text-slate-600 group-hover:bg-primary group-hover:text-white'
                }`}>
                  {study.icon}
                </div>
              </div>

              {/* Main stat */}
              <div className="mb-6">
                <div className={`text-5xl font-bold font-ui tracking-tight mb-1 transition-colors ${
                  idx === 0 ? 'text-primary' : idx === 1 ? 'text-earth-ochre-dark group-hover:text-earth-ochre' : 'text-foreground group-hover:text-primary'
                }`}>
                  {study.stat}
                </div>
                <div className={`text-sm font-medium ${
                  idx === 0 ? 'text-slate-300' : idx === 1 ? 'text-earth-clay' : 'text-slate-500'
                }`}>
                  {study.statLabel}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className={`text-xl font-semibold font-ui mb-3 ${
                idx === 0 ? 'text-slate-100' : 'text-foreground'
              }`}>
                {study.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${
                idx === 0 ? 'text-slate-300' : idx === 1 ? 'text-earth-clay' : 'text-slate-500'
              }`}>
                {study.description}
              </p>

              {/* Metrics */}
              <div className={`grid grid-cols-3 gap-2 p-4 rounded-lg ${
                idx === 0 ? 'bg-slate-800/50' : idx === 1 ? 'bg-earth-ochre/10' : 'bg-slate-100'
              }`}>
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className={`text-xs uppercase tracking-wider mb-1 font-ui ${
                      idx === 0 ? 'text-slate-500' : idx === 1 ? 'text-earth-ochre' : 'text-slate-400'
                    }`}>
                      {metric.label}
                    </div>
                    <div className={`text-sm font-semibold font-ui ${
                      idx === 0 ? 'text-slate-100' : 'text-foreground'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all ${
                  idx === 0 
                    ? 'text-primary hover:text-primary/80' 
                    : idx === 1 
                      ? 'text-earth-ochre-dark hover:text-earth-ochre'
                      : 'text-slate-600 hover:text-primary'
                }`}
                aria-label={`Read full ${study.industry} case study`}
              >
                <span className="font-ui">Read full study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Stats bar with earth accent */}
      <div className="card-obsidian p-6 relative overflow-hidden border-l-4 border-earth-ochre">
        <div className="absolute inset-0 bg-wave-subtle opacity-30" aria-hidden="true" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Installations worldwide" },
            { value: "35+", label: "Years of expertise" },
            { value: "99.7%", label: "Average uptime" },
            { value: "< 2yr", label: "Typical payback" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-slate-100 font-ui mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-ui">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
