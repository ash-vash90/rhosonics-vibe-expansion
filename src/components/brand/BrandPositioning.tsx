import { Target, Shield, Lightbulb, Users, Award, Zap, Heart, Leaf } from "lucide-react";

const BrandPositioning = () => {
  return (
    <section className="space-y-16">
      {/* Brand Promise - simple text hierarchy */}
      <div id="what-we-communicate">
        <p className="text-lg text-slate-600 mb-10 max-w-3xl">
          Rhosonics builds measurement systems for environments where conditions are rarely ideal 
          and accuracy is operationally critical. The brand must communicate:
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-primary" />
              <h4 className="font-ui text-xl font-semibold text-foreground">Precision</h4>
            </div>
            <p className="text-slate-600">Measurement you can trust</p>
          </div>
          
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-primary" />
              <h4 className="font-ui text-xl font-semibold text-foreground">Resilience</h4>
            </div>
            <p className="text-slate-600">Performance in harsh, real-world conditions</p>
          </div>
          
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h4 className="font-ui text-xl font-semibold text-foreground">Intelligence</h4>
            </div>
            <p className="text-slate-600">Insight derived from data, not assumption</p>
          </div>
        </div>
      </div>

      {/* Core Values - cleaner layout */}
      <div id="audience">
        <h3 className="font-ui text-2xl font-semibold text-foreground mb-3">Core Values</h3>
        <p className="text-slate-600 mb-10 max-w-2xl">
          The principles that drive how we work, build relationships, and deliver solutions.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {[
            { icon: Users, title: "Connecting", desc: "We believe in teamwork. Down-to-earth, transparent, and committed to building sustainable, long-term relationships." },
            { icon: Award, title: "Expertise", desc: "We deliver high-quality measurement technologies through leadership, knowledge, and versatility — providing solutions our customers need." },
            { icon: Zap, title: "Dynamic", desc: "We take initiative with a no-nonsense approach. Our creative mindset, adaptability, and all-round knowledge allows us to fix any problem." },
            { icon: Heart, title: "Passionate", desc: "With enthusiasm and drive, we see challenges as adventures. This results in long-term growth together with our customers and partners." },
            { icon: Leaf, title: "Sustainability", desc: "We strive for a greener, smarter industry. Our reliable measuring technologies help customers optimize production and become more sustainable." },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="w-5 h-5 text-primary" />
                <h4 className="font-ui text-lg font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expression + Audience + Decision heuristic - simpler layout */}
      <div className="grid lg:grid-cols-3 gap-8 pt-8 border-t border-border">
        <div>
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">How this shapes expression</h3>
          <p className="text-slate-600 mb-4">
            Expression is <strong className="text-foreground">purposeful rather than decorative</strong>.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Clear visual hierarchy</li>
            <li>• Color signals meaning — not mood</li>
            <li>• Typography prioritizes legibility</li>
          </ul>
        </div>

        <div>
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">The audience</h3>
          <p className="text-slate-600 mb-4">People who:</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Work in operational or engineering roles</li>
            <li>• Evaluate claims critically</li>
            <li>• Look for evidence before persuasion</li>
            <li>• Spend time with data and interfaces</li>
          </ul>
        </div>
        
        {/* Decision heuristic - keep the accent, it's important */}
        <div className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg h-fit">
          <h3 className="font-ui text-lg font-semibold text-foreground mb-3">Decision heuristic</h3>
          <p className="text-foreground">
            When choosing between two valid design options, prefer the one that improves clarity, 
            reinforces performance, or reveals insight.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandPositioning;
