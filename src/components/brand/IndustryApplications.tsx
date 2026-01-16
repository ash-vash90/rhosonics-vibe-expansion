import { Beaker, Cpu, Anchor, Recycle } from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";

export const IndustryApplications = () => {

  return (
    <section id="industries" className="space-y-16">
      {/* Hero Statement */}
      <div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Each industry has its own visual language
          <span className="text-muted-foreground"> because context matters. The underlying measurement system remains the same — only the interface framing changes.</span>
        </p>
      </div>

      {/* Industry Cards - Full width specimens */}
      <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
        {/* Mineral Processing */}
        <div className="relative overflow-hidden bg-rho-obsidian">
          <div className="absolute inset-0 bg-terrain-ore" />
          <div className="absolute inset-0 bg-terrain-strata opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mineral-neutral to-mineral-deep" />
          <div className="relative p-8 min-h-[320px] flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <span className="label-tech text-mineral-neutral">MINERALS</span>
              <Beaker className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-slate-100 mt-8">
              <div className="font-ui text-sm text-slate-400 mb-1">Thickener Underflow</div>
              <div className="font-ui font-bold text-4xl mb-4">1.68 <span className="text-lg font-normal text-slate-400">SG</span></div>
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
        <div className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
          <div className="relative p-8 min-h-[320px] flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <span className="label-tech text-foreground">SEMICONDUCTOR</span>
              <Cpu className="w-5 h-5 text-slate-400" />
            </div>
            <div className="mt-8">
              <div className="font-ui text-sm text-muted-foreground mb-1">CMP Slurry Loop</div>
              <div className="font-ui font-bold text-4xl text-foreground mb-4">
                1.0425 <span className="text-lg font-normal text-muted-foreground">g/cm³</span>
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
        </div>

        {/* Dredging */}
        <div className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-pattern-dredging opacity-50"></div>
          <div className="relative p-8 min-h-[320px] flex flex-col">
            <div className="flex justify-between items-center mb-auto">
              <span className="label-tech text-muted-foreground">DREDGING</span>
              <Anchor className="w-5 h-5 text-slate-400" />
            </div>
            <div className="mt-8">
              <div className="font-ui text-sm text-muted-foreground mb-1">Suction Density</div>
              <div className="font-ui font-bold text-4xl text-foreground mb-4">
                1.35 <span className="text-lg font-normal text-muted-foreground">t/m³</span>
              </div>
              <div className="bg-card/80 rounded-lg p-3 border border-border">
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
      </div>

      {/* Callout */}
      <BrandCallout variant="info" title="Why This Matters">
        Industry-specific patterns create instant recognition and reduce cognitive load. 
        An operator should know they're looking at a minerals interface before reading any text.
        The underlying data model and measurement principles remain constant across all industries.
      </BrandCallout>
    </section>
  );
};

export default IndustryApplications;
