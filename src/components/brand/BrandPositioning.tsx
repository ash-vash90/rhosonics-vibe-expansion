import { Target, Shield, Lightbulb, Eye, BarChart3, Type, Palette, Layers } from "lucide-react";

const BrandPositioning = () => {
  return (
    <div className="space-y-16">
      {/* What the brand must communicate */}
      <div id="what-we-communicate" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          What the Rhosonics brand must communicate
        </h3>
        
        <p className="text-lg text-slate-600 max-w-3xl mb-10 leading-relaxed">
          Rhosonics builds measurement systems for environments where conditions are rarely ideal 
          and accuracy is operationally critical.
        </p>
        
        <p className="text-lg text-slate-600 max-w-3xl mb-8">
          As a result, the brand must consistently communicate:
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
        
        <p className="text-sm text-slate-500 mt-8 italic">
          These qualities guide every decision in this system.
        </p>
        
        {/* Decision-making heuristic - inline */}
        <p className="text-foreground font-medium mt-8 border-l-2 border-primary pl-4">
          When choosing between two valid design options, prefer the one that improves clarity, reinforces performance, or reveals insight.
        </p>
      </div>

      {/* How positioning shapes expression */}
      <div id="expression-approach" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          How this positioning shapes expression
        </h3>
        
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed mb-10">
          <p>
            Because the brand operates in technical and industrial contexts, 
            expression is <strong className="text-foreground">purposeful rather than decorative</strong>.
          </p>
          <p className="border-l-2 border-slate-200 pl-5 text-slate-500">
            This does not mean the brand is neutral or minimal.<br />
            It means expression is used deliberately, in service of understanding.
          </p>
        </div>
        
        <p className="text-lg text-slate-600 mb-6">In practice, this leads to:</p>
        
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
              <p className="text-sm text-slate-500">Not mood</p>
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
        
        <p className="text-lg text-foreground font-medium mt-8">
          Expression exists to support comprehension.
        </p>
      </div>

      {/* The audience reality */}
      <div id="audience" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">
          The audience reality
        </h3>
        
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>Much of the brand is experienced by people who:</p>
          
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
          
          <p>
            The brand therefore <strong className="text-foreground">earns trust through clarity and consistency</strong>, 
            not exaggeration.
          </p>
          
          <p className="text-foreground font-medium mt-6">
            This system is designed to meet that expectation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandPositioning;
