import { Users, Palette, Code, Megaphone, CheckCircle2, XCircle } from "lucide-react";

const AboutThisSystem = () => {
  return (
    <div className="space-y-16">
      {/* What this is */}
      <div id="what-this-is" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">What this is</h3>
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>
            This site defines how the Rhosonics brand is expressed across digital products, 
            marketing, documentation, and physical environments.
          </p>
          <p className="text-slate-500 border-l-2 border-slate-200 pl-5">
            It is not a collection of assets or a mood board.<br />
            It is a system of decisions designed to ensure clarity, consistency, and credibility 
            wherever the brand appears.
          </p>
          <p>The system is designed to resolve a fundamental tension:</p>
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Rhosonics operates in industrial environments</strong>, 
                where precision and reliability are non-negotiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Rhosonics also communicates ideas</strong> — data, 
                insight, innovation — which require clarity and expression.
              </span>
            </li>
          </ul>
          <p className="font-medium text-foreground">
            This system exists to make those two realities work together.
          </p>
        </div>
      </div>

      {/* Who this is for */}
      <div id="who-for" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">Who this is for</h3>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl">
          This system is used by:
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-border rounded-xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Designers</h4>
            <p className="text-sm text-slate-500">
              Working on interfaces, dashboards, and tools
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Megaphone className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Marketers</h4>
            <p className="text-sm text-slate-500">
              Producing campaigns, presentations, and materials
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Engineers</h4>
            <p className="text-sm text-slate-500">
              Communicating technical information
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-xl hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Partners</h4>
            <p className="text-sm text-slate-500">
              Representing the brand externally
            </p>
          </div>
        </div>
        
        <p className="text-lg text-slate-600 mt-8 border-l-2 border-primary/30 pl-5">
          If you are creating something that carries the Rhosonics name, this system applies.
        </p>
      </div>

      {/* How to use this system */}
      <div id="how-to-use" className="scroll-mt-24">
        <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-6">How to use this system</h3>
        <div className="max-w-3xl space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>Each section explains:</p>
          
          <div className="grid sm:grid-cols-2 gap-4 my-8">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>What exists in the system</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Why it exists</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>How it should be used</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <XCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-amber-800 font-medium">Where it should not be used</span>
                <p className="text-sm text-amber-700 mt-1">Often the most valuable guidance</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary rounded-r-lg">
            <p className="text-foreground font-medium mb-2">The goal is not creative restriction.</p>
            <p className="text-slate-600">
              The goal is shared understanding, so decisions can be made confidently and consistently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThisSystem;
