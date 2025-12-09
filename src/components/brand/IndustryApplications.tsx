import { Beaker, Cpu, Anchor, Recycle } from "lucide-react";

export const IndustryApplications = () => {
  return (
    <section id="industries" className="mb-32">
      <h2 className="section-header">Industry Applications</h2>
      <p className="text-muted-foreground mb-8">
        Each industry vertical has a distinct visual treatment while maintaining brand consistency. 
        Pattern backgrounds communicate the industry context at a glance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Mineral Processing - Earth tones */}
        <div className="relative overflow-hidden rounded-lg border border-earth-ochre/30">
          <div className="absolute inset-0 bg-pattern-minerals" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-ochre to-earth-ochre-dark" />
          <div className="relative">
            <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
              <span className="label-tech text-earth-ochre">MINERALS</span>
              <Beaker className="w-5 h-5 text-earth-ochre-light" />
            </div>
            <div className="p-6 text-slate-100">
              <div className="font-ui text-sm text-slate-400 mb-1">Thickener Underflow</div>
              <div className="font-ui font-bold text-3xl mb-4">1.68 SG</div>

              <div className="bg-slate-800/80 rounded p-3 border border-earth-ochre/20">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-earth-ochre"></div>
                  <span className="font-data text-xs text-earth-ochre">FIELD DATA</span>
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
            <span className="label-tech text-foreground">SEMICONDUCTOR</span>
            <Cpu className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-6 relative z-10">
            <div className="font-ui text-sm text-muted-foreground mb-1">CMP Slurry Loop</div>
            <div className="font-ui font-bold text-3xl text-foreground mb-4">
              1.0425 <span className="text-sm font-normal text-muted-foreground">g/cm³</span>
            </div>

            <div className="bg-eco-surface/80 rounded p-3 border border-eco-border">
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
            <span className="label-tech text-muted-foreground">DREDGING</span>
            <Anchor className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-6 relative z-10">
            <div className="font-ui text-sm text-muted-foreground mb-1">Suction Density</div>
            <div className="font-ui font-bold text-3xl text-slate-700 mb-4">
              1.35 <span className="text-sm font-normal text-muted-foreground">t/m³</span>
            </div>

            <div className="bg-card/80 rounded p-3 border border-border shadow-sm">
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

      {/* Pattern Legend with earth accent */}
      <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 border-l-4 border-l-earth-ochre">
        <h4 className="font-ui font-bold text-lg mb-4">Industry Pattern Reference</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pattern-minerals rounded border border-earth-ochre/50"></div>
            <div>
              <div className="font-ui font-medium text-foreground">Minerals</div>
              <div className="text-sm text-earth-ochre-dark">Crystal lattice / field ops</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pattern-semicon rounded border border-slate-200"></div>
            <div>
              <div className="font-ui font-medium text-foreground">Semiconductor</div>
              <div className="text-sm text-muted-foreground">Circuit / precision tech</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pattern-dredging rounded border border-slate-200"></div>
            <div>
              <div className="font-ui font-medium text-foreground">Dredging</div>
              <div className="text-sm text-muted-foreground">Fluid waves / flow</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryApplications;
