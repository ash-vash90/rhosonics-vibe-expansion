import { Zap, MapPin, ArrowRight, Layers } from "lucide-react";
import { BrandCallout } from "./BrandCallout";
const VisualSystemOverview = () => {
  return <div className="space-y-16">
      {/* How the system is structured */}
      <div id="system-structure" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          How the system is structured
        </h3>
        
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed mb-12">
          <p>
            The Rhosonics visual system is built from clearly defined layers, 
            each with a specific role.
          </p>
          <p className="text-slate-500 border-l-2 border-slate-200 pl-5">
            Not every element carries the same weight or authority.<br />
            Understanding these layers is essential to using the system correctly.
          </p>
        </div>
      </div>

      {/* System layers */}
      <div id="system-layers" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-8">
          System layers
        </h3>
        
        <div className="space-y-6">
          {/* Foundations - Strongest visual weight */}
          <div id="foundations" className="scroll-mt-24 relative">
            
            
            <div className="p-8 bg-slate-50 border-2 border-slate-300 rounded-lg">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-ui text-xl font-bold text-foreground">Foundations</h4>
                    <span className="font-data text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded tracking-widest">
                      CONSTANT
                    </span>
                  </div>
                  <p className="text-slate-700 mb-5 leading-relaxed">
                    These elements form the constant base of the brand:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-800 text-sm rounded-lg font-medium">Primary neutrals</span>
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-800 text-sm rounded-lg font-medium">Core typography</span>
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-800 text-sm rounded-lg font-medium">Structural spacing</span>
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-800 text-sm rounded-lg font-medium">Layout rules</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 italic">
                    They appear everywhere and rarely change.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Signals - Energetic treatment */}
          <div id="signals" className="scroll-mt-24 relative">
            <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent hidden md:block" />
            
            <div className="p-8 bg-slate-50 border-2 border-primary/30 rounded-lg">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-ui text-xl font-semibold text-foreground">Signals</h4>
                    <span className="font-data text-[10px] bg-primary text-white px-2 py-0.5 rounded tracking-widest">
                      INTENTIONAL
                    </span>
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    These elements communicate action, state, or emphasis:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-primary/15 text-primary text-sm rounded-lg font-medium">Primary action colors</span>
                    <span className="px-3 py-1.5 bg-primary/15 text-primary text-sm rounded-lg font-medium">Status indicators</span>
                    <span className="px-3 py-1.5 bg-primary/15 text-primary text-sm rounded-lg font-medium">Interactive highlights</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 italic">
                    They are used sparingly and intentionally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual elements - Softer treatment */}
          <div id="contextual" className="scroll-mt-24">
            <div className="p-8 bg-mineral-surface border border-mineral-neutral/40 rounded-lg">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-mineral-neutral rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white/90" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-ui text-xl font-semibold text-foreground/90">Contextual Elements</h4>
                    <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5 rounded tracking-widest">
                      SITUATIONAL
                    </span>
                  </div>
                  <p className="text-slate-500 mb-5 leading-relaxed">
                    These elements provide situational relevance:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-white/60 text-mineral-deep text-sm rounded-lg">Field neutrals (Mineral)</span>
                    <span className="px-3 py-1.5 bg-white/60 text-mineral-deep text-sm rounded-lg">Sustainability indicators</span>
                    <span className="px-3 py-1.5 bg-white/60 text-mineral-deep text-sm rounded-lg">Textures & patterns</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-4 italic">
                    They support specific contexts and are deliberately constrained.
                  </p>
                </div>
              </div>
            </div>
            
            <BrandCallout variant="avoid" title="Critical Separation: Slate vs Mineral" className="mt-6">
              <strong>Slate</strong> is for software: UI structure, text, forms, navigation, data containers. Cool, blue-biased, chromatically neutral.<br /><br />
              <strong>Mineral</strong> is for environment: field modules, industry panels, outdoor contexts. Warm-neutral, olive, stone-like tones.<br /><br />
              These are categorically different systems. Mineral colors must <strong>never</strong> substitute for Slate UI neutrals.
            </BrandCallout>
          </div>
        </div>
      </div>

      {/* What this enables */}
      <div id="what-enables" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          What this enables
        </h3>
        
        <div className="max-w-3xl">
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            By separating foundations, signals, and context, the system:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-data text-sm text-primary font-medium">1</span>
              </div>
              <p className="text-slate-600 pt-1">
                <strong className="text-foreground">Remains expressive</strong> without becoming inconsistent
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-data text-sm text-primary font-medium">2</span>
              </div>
              <p className="text-slate-600 pt-1">
                <strong className="text-foreground">Supports multiple environments</strong> without visual drift
              </p>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-data text-sm text-primary font-medium">3</span>
              </div>
              <p className="text-slate-600 pt-1">
                <strong className="text-foreground">Makes design decisions</strong> repeatable and explainable
              </p>
            </li>
          </ul>
          
          <BrandCallout variant="rule" title="System Benefit" className="mt-8">
            This structure allows the brand to be both clear and characterful, without relying on excess.
          </BrandCallout>
        </div>
      </div>

      {/* What comes next */}
      <div id="whats-next" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          What comes next
        </h3>
        
        <p className="text-lg text-slate-600 mb-8 max-w-3xl">
          The following sections break down each part of the system in detail:
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{
          label: "Color roles and usage",
          section: "04"
        }, {
          label: "Typography hierarchy",
          section: "05"
        }, {
          label: "Layout & spacing rules",
          section: "06"
        }, {
          label: "Voice & tone",
          section: "07"
        }, {
          label: "Imagery guidelines",
          section: "08"
        }, {
          label: "Application examples",
          section: "09"
        }].map(item => <div key={item.section} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors group cursor-pointer">
              <span className="font-data text-sm text-primary font-medium">{item.section}</span>
              <span className="text-slate-700 flex-1">{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </div>)}
        </div>
        
        <p className="text-slate-500 mt-8 text-lg">
          Each section explains not just what to use, but <strong className="text-slate-600">why it exists</strong>.
        </p>
      </div>
    </div>;
};
export default VisualSystemOverview;