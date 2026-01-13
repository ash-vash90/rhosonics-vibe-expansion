import { Target, Shield, Lightbulb, Eye, BarChart3, Type, Palette, Layers } from "lucide-react";

const BrandPositioning = () => {
  return (
    <div className="space-y-16">
      {/* What the brand must communicate */}
      <div id="what-we-communicate" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          What the brand promises externally
        </h3>
        
        <p className="text-lg text-slate-600 max-w-3xl mb-8 leading-relaxed">
          Rhosonics builds measurement systems for environments where conditions are rarely ideal 
          and accuracy is operationally critical. The brand must communicate:
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
            <div className="pl-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-ui text-xl font-semibold text-foreground mb-3">Precision</h4>
              <p className="text-slate-600 leading-relaxed">
                Measurement you can trust
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
            <div className="pl-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-ui text-xl font-semibold text-foreground mb-3">Resilience</h4>
              <p className="text-slate-600 leading-relaxed">
                Performance in harsh, real-world conditions
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full" />
            <div className="pl-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-ui text-xl font-semibold text-foreground mb-3">Intelligence</h4>
              <p className="text-slate-600 leading-relaxed">
                Insight derived from data, not assumption
              </p>
            </div>
          </div>
        </div>
        
        {/* Decision-making heuristic */}
        <p className="text-foreground font-medium mt-10 border-l-2 border-primary pl-4">
          When choosing between two valid design options, prefer the one that improves clarity, reinforces performance, or reveals insight.
        </p>
      </div>

      {/* How positioning shapes expression */}
      <div id="expression-approach" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          How positioning shapes expression
        </h3>
        
        <p className="max-w-3xl text-lg text-slate-600 leading-relaxed mb-8">
          Expression is <strong className="text-foreground">purposeful rather than decorative</strong>. 
          It is used deliberately, in service of understanding.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="font-ui font-medium text-foreground mb-1">Clear visual hierarchy</h5>
              <p className="text-sm text-slate-500">Information layers are immediately apparent</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="font-ui font-medium text-foreground mb-1">Strong contrast</h5>
              <p className="text-sm text-slate-500">Between information layers</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
              <Palette className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="font-ui font-medium text-foreground mb-1">Color signals meaning</h5>
              <p className="text-sm text-slate-500">State, action, or context — not mood</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
              <Type className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="font-ui font-medium text-foreground mb-1">Typography prioritizes legibility</h5>
              <p className="text-sm text-slate-500">And data clarity</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-lg sm:col-span-2 sm:max-w-md">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h5 className="font-ui font-medium text-foreground mb-1">Visual elements reinforce credibility</h5>
              <p className="text-sm text-slate-500">Rather than distract from it</p>
            </div>
          </div>
        </div>
      </div>

      {/* The audience reality */}
      <div id="audience" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          The audience reality
        </h3>
        
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>The brand is experienced by people who:</p>
          
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
              <span>Work in operational or engineering roles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
              <span>Evaluate claims critically</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
              <span>Look for evidence before persuasion</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2.5 flex-shrink-0" />
              <span>Spend time with data, interfaces, and documentation</span>
            </li>
          </ul>
          
          <p className="text-foreground font-medium pt-4">
            The brand earns trust through clarity and consistency, not exaggeration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandPositioning;