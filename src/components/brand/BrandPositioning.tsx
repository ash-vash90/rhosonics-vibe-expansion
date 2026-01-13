import { Target, Shield, Lightbulb, Users, Award, Zap, Heart, Leaf } from "lucide-react";

const BrandPositioning = () => {
  return (
    <section className="space-y-16">
      {/* Brand Promise - full width */}
      <div id="what-we-communicate">
        <p className="text-lg text-slate-600 mb-8">
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

      {/* Core Values */}
      <div id="audience">
        <h3 className="font-ui text-2xl font-semibold text-foreground mb-3">Core Values</h3>
        <p className="text-slate-600 mb-8 max-w-2xl">
          The principles that drive how we work, build relationships, and deliver solutions.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui text-lg font-semibold text-foreground mb-2">Connecting</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe in teamwork. Down-to-earth, transparent, and committed to building 
              sustainable, long-term relationships.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui text-lg font-semibold text-foreground mb-2">Expertise</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We deliver high-quality measurement technologies through leadership, knowledge, 
              and versatility — providing solutions our customers need.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui text-lg font-semibold text-foreground mb-2">Dynamic</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We take initiative with a no-nonsense approach. Our creative mindset, adaptability, 
              and all-round knowledge allows us to fix any problem.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui text-lg font-semibold text-foreground mb-2">Passionate</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              With enthusiasm and drive, we see challenges as adventures. This results in 
              long-term growth together with our customers and partners.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui text-lg font-semibold text-foreground mb-2">Sustainability</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We strive for a greener, smarter industry. Our reliable measuring technologies 
              help customers optimize production and become more sustainable.
            </p>
          </div>
        </div>
      </div>

      {/* Expression approach + Decision heuristic */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
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

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">The audience</h3>
          <p className="text-slate-600 mb-4">
            People who:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Work in operational or engineering roles</li>
            <li>• Evaluate claims critically</li>
            <li>• Look for evidence before persuasion</li>
            <li>• Spend time with data and interfaces</li>
          </ul>
        </div>
        
        {/* Decision heuristic */}
        <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg h-fit">
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
