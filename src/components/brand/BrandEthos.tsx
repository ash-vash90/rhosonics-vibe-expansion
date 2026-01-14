import { Radar, Target, Leaf, Sparkles } from "lucide-react";

export const BrandEthos = () => {
  return (
    <section id="brand-ethos" className="mb-16">
      {/* Two-column: Persona + Aesthetic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="card-gradient chamfer-lg p-8 relative">
          <div className="absolute inset-0 bg-wave-subtle opacity-20 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-slate-600 flex items-center justify-center rounded-lg">
                <Target className="w-5 h-5 text-slate-200" />
              </div>
              <span className="font-data text-xs uppercase tracking-wider text-slate-400">THE PERSONA</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-100 mb-2 font-ui">Senior Engineer</h3>
            <p className="text-slate-300 leading-relaxed">
              Direct. Knowledgeable. Skeptical of marketing claims. They skip to the specifications.
            </p>
          </div>
        </div>

        <div className="card-metal p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-terrain-grain opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-slate-300 flex items-center justify-center rounded-lg">
                <Radar className="w-5 h-5 text-slate-700" />
              </div>
              <span className="font-data text-xs uppercase tracking-wider text-slate-500">THE AESTHETIC</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-ui">Lab in the Field</h3>
            <p className="text-slate-600 leading-relaxed">
              Clean white space meets heavy industrial textures. High contrast data displays.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values - Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
        {[
          { num: "01", title: "Garage Spirit", desc: "Innovation born from curiosity, not committees.", icon: Sparkles },
          { num: "02", title: "Built to Last", desc: "Designed for environments that break lesser equipment.", icon: Radar },
          { num: "03", title: "Legacy Forward", desc: "Forty years of measurement. Still learning.", icon: Leaf },
        ].map((item) => (
          <div key={item.num} className="group">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-data text-sm text-slate-400 group-hover:text-foreground transition-colors">{item.num}</span>
              <div className="h-px flex-1 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
              <div className="w-8 h-8 bg-slate-100 flex items-center justify-center rounded text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all">
                <item.icon className="w-4 h-4" />
              </div>
            </div>
            <h4 className="font-ui font-bold text-lg mb-1 text-foreground">{item.title}</h4>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandEthos;
