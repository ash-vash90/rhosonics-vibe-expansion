import { Users, Palette, Code, Megaphone, CheckCircle2 } from "lucide-react";
import { BrandCallout } from "./BrandCallout";

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
          <div className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Designers</h4>
            <p className="text-sm text-slate-500">
              Working on interfaces, dashboards, and tools
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Megaphone className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Marketers</h4>
            <p className="text-sm text-slate-500">
              Producing campaigns, presentations, and materials
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Engineers</h4>
            <p className="text-sm text-slate-500">
              Communicating technical information
            </p>
          </div>
          
          <div className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors">
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
          
          <ul className="space-y-3 my-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base">What exists in the system</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base">Why it exists</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base">How it should be used</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-base"><strong>Where it should not be used</strong> — often the most valuable guidance</span>
            </li>
          </ul>
          
          <BrandCallout variant="rule" title="System Purpose">
            The goal is not creative restriction. The goal is shared understanding, so decisions can be made confidently and consistently.
          </BrandCallout>
        </div>
      </div>
    </div>
  );
};

export default AboutThisSystem;
