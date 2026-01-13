import { Palette, Code, Megaphone, Users } from "lucide-react";

const AboutThisSystem = () => {
  return (
    <section className="space-y-12">
      {/* Hero statement */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="font-ui text-xl font-semibold text-foreground mb-4">What this is</h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A system of decisions designed to ensure clarity, consistency, and credibility 
            wherever the Rhosonics brand appears.
          </p>
          
          {/* How to use - keep accent, it's important guidance */}
          <div className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg max-w-xl">
            <h4 className="font-ui font-semibold text-foreground mb-2">How to use this</h4>
            <p className="text-slate-600">
              Each section explains what exists, why it exists, how it should be used, 
              and where it should <em>not</em> be used. The goal is shared understanding, 
              so decisions can be made confidently and consistently.
            </p>
          </div>
        </div>
        
        {/* Sidebar: The tension */}
        <div>
          <p className="text-sm text-slate-500 mb-4 font-medium">The system resolves a fundamental tension:</p>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span><strong className="text-foreground">Industrial environments</strong> — precision and reliability are non-negotiable</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span><strong className="text-foreground">Technical communication</strong> — data and insight require clarity</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Who this is for - simpler layout */}
      <div className="pt-8 border-t border-border">
        <h3 className="font-ui text-xl font-semibold text-foreground mb-6">Who this is for</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Palette, title: "Designers", desc: "Interfaces, dashboards, tools" },
            { icon: Megaphone, title: "Marketers", desc: "Campaigns, presentations" },
            { icon: Code, title: "Engineers", desc: "Technical documentation" },
            { icon: Users, title: "Partners", desc: "External brand representation" },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="w-5 h-5 text-primary" />
                <h4 className="font-ui font-semibold text-foreground">{item.title}</h4>
              </div>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutThisSystem;
