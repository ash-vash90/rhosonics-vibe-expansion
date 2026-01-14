import { Radar, Target } from "lucide-react";
import { BRAND_VALUES } from "@/data/brand-values";

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

      {/* Core Values - Four columns */}
      <div className="pt-8 border-t border-slate-200">
        <div className="flex items-baseline gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Core Values</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {BRAND_VALUES.map((value) => (
            <div key={value.id} className="group">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-data text-sm text-muted-foreground group-hover:text-foreground transition-colors">{value.num}</span>
                <div className="h-px flex-1 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
                <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded text-primary group-hover:bg-primary/20 transition-all">
                  <value.icon className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-ui font-bold text-lg mb-1 text-foreground">{value.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc.split('.')[0]}.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandEthos;
