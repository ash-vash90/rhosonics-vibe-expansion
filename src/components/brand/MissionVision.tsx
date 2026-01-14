import { Target, Eye } from "lucide-react";
import { BRAND_VALUES } from "@/data/brand-values";

export const MissionVision = () => {
  return (
    <section id="mission" className="mb-32">
      {/* Two-column: Mission + Vision */}
      <div className="grid md:grid-cols-2 gap-px bg-border mb-16">
        {/* Mission */}
        <div className="bg-card p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-topo opacity-30"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="label-tech text-primary">MISSION</span>
            </div>
            <h3 className="font-ui font-bold text-3xl md:text-4xl text-foreground mb-4">Measure What Matters</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              We build ultrasonic measurement systems in partnership with the industries that rely on them. Better measurement leads to better decisions.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-rho-obsidian p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-topo-dark opacity-30"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="label-tech text-primary">VISION</span>
            </div>
            <h3 className="font-ui font-bold text-3xl md:text-4xl text-slate-100 mb-4">Progress That Matters</h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Every process optimized, every industry more sustainable. Through partnership, expertise, and measurable impact.
            </p>
          </div>
        </div>
      </div>

      {/* Values Bridge - How values connect mission to vision */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">How We Deliver</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Our mission is delivered through four core values. Each value shapes how we work, build relationships, and create lasting impact.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BRAND_VALUES.map((value) => (
            <div key={value.id} className="group p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all">
              <value.icon className="w-5 h-5 text-primary mb-3" />
              <h4 className="font-ui font-semibold text-sm text-foreground mb-1">{value.shortTitle}</h4>
              <p className="text-xs text-muted-foreground">{value.keywords.slice(0, 2).join(', ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Value Stats - Horizontal strip */}
      <div className="flex items-stretch border-t border-b border-border">
        {[
          { value: "40+", label: "Years Experience" },
          { value: "98%", label: "Uptime Guarantee" },
          { value: "-35%", label: "Average Waste Reduction" },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className="flex-1 py-8 px-6 border-r border-border last:border-r-0 text-center group hover:bg-slate-50 transition-colors"
          >
            <div className="font-data text-4xl md:text-5xl text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
