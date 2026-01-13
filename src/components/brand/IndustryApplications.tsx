import { Beaker, Cpu, Anchor, Recycle } from "lucide-react";

export const IndustryApplications = () => {
  return (
    <section id="industries" className="mb-32">
      <h2 className="section-header">Industry Applications</h2>
      
      {/* Intro */}
      <p className="text-muted-foreground text-lg mb-8">
        Each industry has its own visual language because context matters.
        The underlying measurement system remains the same — only the interface framing changes.
      </p>

      {/* Industry Cards - full width */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Mineral Processing */}
        <div className="relative overflow-hidden rounded-lg border border-mineral-neutral/30">
          <div className="absolute inset-0 bg-terrain-ore" />
          <div className="absolute inset-0 bg-terrain-strata opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mineral-neutral to-mineral-deep" />
          <div className="relative">
            <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
              <span className="font-data text-xs uppercase tracking-wider text-mineral-neutral">MINERALS</span>
              <Beaker className="w-5 h-5 text-slate-400" />
            </div>
            <div className="p-6 text-slate-100">
              <div className="font-ui text-sm text-slate-400 mb-1">Thickener Underflow</div>
              <div className="font-ui font-bold text-3xl mb-4">1.68 SG</div>
              <div className="bg-slate-800/80 rounded-lg p-3 border border-mineral-neutral/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-mineral-neutral"></div>
                  <span className="font-data text-xs text-mineral-neutral">FIELD DATA</span>
                </div>
                <div className="text-sm text-slate-300">
                  Maximized water recovery reduces tailings volume.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Semiconductor */}
        <div className="card-base bg-pattern-semicon border-primary/30 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center relative z-10">
            <span className="font-data text-xs uppercase tracking-wider text-foreground">SEMICONDUCTOR</span>
            <Cpu className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-6 relative z-10">
            <div className="font-ui text-sm text-muted-foreground mb-1">CMP Slurry Loop</div>
            <div className="font-ui font-bold text-3xl text-foreground mb-4">
              1.0425 <span className="text-sm font-normal text-muted-foreground">g/cm³</span>
            </div>
            <div className="bg-eco-surface/80 rounded-lg p-3 border border-eco-border">
              <div className="flex items-center gap-2 mb-1">
                <Recycle className="w-3 h-3 text-primary" />
                <span className="font-data text-xs text-primary">ECO IMPACT</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Precise dosing prevents chemical overuse.
              </div>
            </div>
          </div>
        </div>

        {/* Dredging */}
        <div className="card-base bg-pattern-dredging overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center relative z-10">
            <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">DREDGING</span>
            <Anchor className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-6 relative z-10">
            <div className="font-ui text-sm text-muted-foreground mb-1">Suction Density</div>
            <div className="font-ui font-bold text-3xl text-slate-700 mb-4">
              1.35 <span className="text-sm font-normal text-muted-foreground">t/m³</span>
            </div>
            <div className="bg-card/80 rounded-lg p-3 border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-data text-xs text-muted-foreground">EFFICIENCY</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Optimal solids concentration reduces fuel consumption per ton.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Examples - full width */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="label-tech text-slate-500 mb-4">INDUSTRY PATTERNS</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Patterns are contextual, not expressive. They help users orient themselves, not brand the interface.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-pattern-minerals rounded-lg border border-mineral-neutral/50"></div>
              <div>
                <div className="font-ui font-medium text-foreground">Minerals</div>
                <div className="text-sm text-muted-foreground">Crystal lattice / field ops</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-pattern-semicon rounded-lg border border-slate-200"></div>
              <div>
                <div className="font-ui font-medium text-foreground">Semiconductor</div>
                <div className="text-sm text-muted-foreground">Circuit / precision tech</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-pattern-dredging rounded-lg border border-slate-200"></div>
              <div>
                <div className="font-ui font-medium text-foreground">Dredging</div>
                <div className="text-sm text-muted-foreground">Fluid waves / flow</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg h-fit">
          <h4 className="font-ui font-semibold text-foreground mb-3">Why this matters</h4>
          <p className="text-muted-foreground text-sm mb-4">
            Industry-specific patterns create instant recognition and reduce cognitive load. 
            An operator should know they're looking at a minerals interface before reading any text.
          </p>
          <p className="text-muted-foreground text-sm">
            The underlying data model and measurement principles remain constant across all industries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryApplications;
