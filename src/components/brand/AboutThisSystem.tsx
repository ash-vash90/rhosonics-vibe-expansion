import { Palette, Code, Megaphone, Users, ArrowRight } from "@/lib/icons";

const AboutThisSystem = () => {
  return (
    <section className="space-y-24 md:space-y-32">
      {/* Hero statement - elegant intro */}
      <div className="max-w-3xl">
        <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-12 font-light">
          A system of decisions designed to ensure{" "}
          <span className="font-semibold text-primary">clarity</span>,{" "}
          <span className="font-semibold text-primary">consistency</span>, and{" "}
          <span className="font-semibold text-primary">credibility</span>{" "}
          wherever the Rhosonics brand appears.
        </p>
        
        {/* The tension - refined callout */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full" />
          <div className="pl-8 py-4">
            <p className="text-sm font-data uppercase tracking-wider text-muted-foreground mb-6">
              The Core Tension
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                <p className="text-lg text-foreground">
                  <strong className="font-semibold">Industrial environments</strong>
                  <span className="text-muted-foreground ml-2">— precision and reliability are non-negotiable</span>
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                <p className="text-lg text-foreground">
                  <strong className="font-semibold">Technical communication</strong>
                  <span className="text-muted-foreground ml-2">— data and insight require clarity</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column content with refined styling */}
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* How to use - numbered with subtle lines */}
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent hidden lg:block" />
          
          <h3 className="font-data text-xs uppercase tracking-widest text-primary mb-10">
            How to use this
          </h3>
          
          <div className="space-y-8">
            {[
              { text: "Each section explains what exists and why", emphasis: "what exists" },
              { text: "Usage guidelines clarify how elements should be applied", emphasis: "how elements" },
              { text: "Constraints define where elements should not be used", emphasis: "should not" },
              { text: "The goal is shared understanding, so decisions can be made confidently", emphasis: "confidently" }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="relative">
                  <span className="font-data text-2xl font-light text-primary/30 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for - elegant cards */}
        <div>
          <h3 className="font-data text-xs uppercase tracking-widest text-primary mb-10">
            Who this is for
          </h3>
          
          <div className="grid gap-4">
            {[
              { icon: Palette, title: "Designers", desc: "Interfaces, dashboards, tools", color: "from-violet-500/10 to-transparent" },
              { icon: Megaphone, title: "Marketers", desc: "Campaigns, presentations", color: "from-amber-500/10 to-transparent" },
              { icon: Code, title: "Engineers", desc: "Technical documentation", color: "from-primary/10 to-transparent" },
              { icon: Users, title: "Partners", desc: "External brand representation", color: "from-sky-500/10 to-transparent" },
            ].map((item) => (
              <div 
                key={item.title} 
                className="group relative flex items-center gap-5 p-5 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-300 cursor-default"
              >
                {/* Subtle gradient background on hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10 w-11 h-11 rounded-lg bg-muted/50 group-hover:bg-background flex items-center justify-center transition-colors">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <div className="relative z-10 flex-1">
                  <span className="font-ui font-semibold text-foreground block">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
                
                <ArrowRight className="relative z-10 w-4 h-4 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutThisSystem;
