import { CircleDot, Zap, MapPin, ArrowRight } from "lucide-react";

const VisualSystemOverview = () => {
  return (
    <div className="space-y-16">
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
          {/* Foundations */}
          <div id="foundations" className="scroll-mt-24 relative">
            <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-slate-300 to-transparent hidden md:block" />
            
            <div className="p-8 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CircleDot className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-ui text-xl font-semibold text-foreground">Foundations</h4>
                    <span className="font-data text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded tracking-widest">
                      CONSTANT
                    </span>
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    These elements form the constant base of the brand:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg">Primary neutrals</span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg">Core typography</span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg">Structural spacing</span>
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg">Layout rules</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 font-data tracking-wide">
                    They appear everywhere and rarely change.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Signals */}
          <div id="signals" className="scroll-mt-24 relative">
            <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent hidden md:block" />
            
            <div className="p-8 bg-gradient-to-br from-primary/5 to-white border-2 border-primary/20 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
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
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">Primary action colors</span>
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">Status indicators</span>
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">Interactive highlights</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 font-data tracking-wide">
                    They are used sparingly and intentionally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual elements */}
          <div id="contextual" className="scroll-mt-24">
            <div className="p-8 bg-gradient-to-br from-mineral-surface/50 to-white border-2 border-mineral-neutral/30 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-mineral-neutral rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-ui text-xl font-semibold text-foreground">Contextual Elements</h4>
                    <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5 rounded tracking-widest">
                      SITUATIONAL
                    </span>
                  </div>
                  <p className="text-slate-600 mb-5 leading-relaxed">
                    These elements provide situational relevance:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-mineral-surface text-mineral-deep text-sm rounded-lg">Field neutrals</span>
                    <span className="px-3 py-1.5 bg-mineral-surface text-mineral-deep text-sm rounded-lg">Sustainability indicators</span>
                    <span className="px-3 py-1.5 bg-mineral-surface text-mineral-deep text-sm rounded-lg">Textures & patterns</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-4 font-data tracking-wide">
                    They support specific contexts and are deliberately constrained.
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> They are not brand identifiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary rounded-r-lg">
            <p className="text-foreground font-medium">
              This structure allows the brand to be both clear and characterful, without relying on excess.
            </p>
          </div>
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
          {[
            { label: "Color roles and usage", section: "04" },
            { label: "Typography hierarchy", section: "05" },
            { label: "Layout & spacing rules", section: "06" },
            { label: "Voice & tone", section: "07" },
            { label: "Imagery guidelines", section: "08" },
            { label: "Application examples", section: "09" }
          ].map((item) => (
            <div 
              key={item.section}
              className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group cursor-pointer"
            >
              <span className="font-data text-sm text-primary font-medium">{item.section}</span>
              <span className="text-slate-700 flex-1">{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
        
        <p className="text-slate-500 mt-8 text-lg">
          Each section explains not just what to use, but <strong className="text-slate-600">why it exists</strong>.
        </p>
      </div>
    </div>
  );
};

export default VisualSystemOverview;
