import { Target, Shield, Lightbulb } from "lucide-react";

const BrandPositioning = () => {
  return (
    <section className="space-y-12">
      {/* Brand Promise */}
      <div>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl">
          Rhosonics builds measurement systems for environments where conditions are rarely ideal 
          and accuracy is operationally critical. The brand must communicate:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border-l-4 border-primary bg-slate-50 rounded-r-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-ui text-xl font-semibold text-foreground mb-2">Precision</h4>
            <p className="text-slate-600">Measurement you can trust</p>
          </div>
          
          <div className="p-6 border-l-4 border-primary bg-slate-50 rounded-r-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-ui text-xl font-semibold text-foreground mb-2">Resilience</h4>
            <p className="text-slate-600">Performance in harsh, real-world conditions</p>
          </div>
          
          <div className="p-6 border-l-4 border-primary bg-slate-50 rounded-r-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-ui text-xl font-semibold text-foreground mb-2">Intelligence</h4>
            <p className="text-slate-600">Insight derived from data, not assumption</p>
          </div>
        </div>
      </div>

      {/* Expression approach + Audience */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">How this shapes expression</h3>
          <p className="text-slate-600 mb-4">
            Expression is <strong className="text-foreground">purposeful rather than decorative</strong>.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Clear visual hierarchy — information layers are immediately apparent</li>
            <li>• Color signals meaning — state, action, or context — not mood</li>
            <li>• Typography prioritizes legibility and data clarity</li>
            <li>• Visual elements reinforce credibility, not distract from it</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">The audience</h3>
          <p className="text-slate-600 mb-4">
            The brand is experienced by people who:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Work in operational or engineering roles</li>
            <li>• Evaluate claims critically</li>
            <li>• Look for evidence before persuasion</li>
            <li>• Spend time with data, interfaces, and documentation</li>
          </ul>
        </div>
      </div>

      {/* Decision heuristic */}
      <div className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg">
        <p className="text-foreground font-medium">
          When choosing between two valid design options, prefer the one that improves clarity, 
          reinforces performance, or reveals insight.
        </p>
      </div>
    </section>
  );
};

export default BrandPositioning;
