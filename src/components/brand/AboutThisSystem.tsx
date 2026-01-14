import { Palette, Code, Megaphone, Users } from "lucide-react";

const AboutThisSystem = () => {
  return (
    <section className="space-y-16">
      {/* Hero statement - full width, no boxes */}
      <div className="max-w-3xl">
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
          A system of decisions designed to ensure clarity, consistency, and credibility 
          wherever the Rhosonics brand appears.
        </p>
        
        {/* The tension - inline statement, no card */}
        <div className="border-l-4 border-primary pl-6">
          <p className="text-muted-foreground mb-4">The system resolves a fundamental tension:</p>
          <div className="space-y-2">
            <p className="text-foreground">
              <strong>Industrial environments</strong> — precision and reliability are non-negotiable
            </p>
            <p className="text-foreground">
              <strong>Technical communication</strong> — data and insight require clarity
            </p>
          </div>
        </div>
      </div>

      {/* How to use - simple numbered steps, no box */}
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h3 className="font-ui text-lg font-semibold text-foreground mb-6">How to use this</h3>
          <div className="space-y-4">
            {[
              "Each section explains what exists and why",
              "Usage guidelines clarify how elements should be applied",
              "Constraints define where elements should not be used",
              "The goal is shared understanding, so decisions can be made confidently"
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-data text-sm text-primary w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for - inline icon list, no boxes */}
        <div>
          <h3 className="font-ui text-lg font-semibold text-foreground mb-6">Who this is for</h3>
          <div className="space-y-6">
            {[
              { icon: Palette, title: "Designers", desc: "Interfaces, dashboards, tools" },
              { icon: Megaphone, title: "Marketers", desc: "Campaigns, presentations" },
              { icon: Code, title: "Engineers", desc: "Technical documentation" },
              { icon: Users, title: "Partners", desc: "External brand representation" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 group">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex items-baseline gap-3">
                  <span className="font-ui font-semibold text-foreground">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutThisSystem;
