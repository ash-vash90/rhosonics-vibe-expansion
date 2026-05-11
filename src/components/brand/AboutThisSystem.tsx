import { Palette, Code, Megaphone, Users, ArrowRight, Target, Shield, AlertTriangle } from "@/lib/icons";

const AboutThisSystem = () => {
  return (
    <section className="relative space-y-20 md:space-y-28">
      {/* Oversized background data mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 right-0 font-data font-black uppercase leading-none text-foreground/[0.025] text-[120px] md:text-[180px] lg:text-[220px]"
      >
        About
      </div>

      {/* Hero statement — telemetry framed */}
      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Section</span>
          <span className="text-border">·</span>
          <span>00 / Overview</span>
          <span className="text-border">·</span>
          <span>v2025</span>
        </div>

        <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-10 font-light">
          A system of decisions designed to ensure{" "}
          <span className="font-semibold text-primary">clarity</span>,{" "}
          <span className="font-semibold text-primary">consistency</span>, and{" "}
          <span className="font-semibold text-primary">credibility</span>{" "}
          wherever the Rhosonics brand appears.
        </p>

        {/* Core Tension — chamfered telemetry card */}
        <div className="relative bg-card clip-chamfer-md p-6 md:p-8">
          <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />

          <div className="flex items-baseline gap-4 mb-5">
            <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">REF_01</span>
            <span className="font-ui text-sm font-semibold text-foreground">The Core Tension</span>
            <div className="flex-1 h-px bg-border self-center" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 group">
              <span className="font-data text-[10px] uppercase tracking-widest text-primary mt-1.5">01</span>
              <p className="text-base md:text-lg text-foreground">
                <strong className="font-semibold">Industrial environments</strong>
                <span className="text-muted-foreground ml-2">— precision and reliability are non-negotiable</span>
              </p>
            </div>
            <div className="flex items-start gap-4 group">
              <span className="font-data text-[10px] uppercase tracking-widest text-primary mt-1.5">02</span>
              <p className="text-base md:text-lg text-foreground">
                <strong className="font-semibold">Technical communication</strong>
                <span className="text-muted-foreground ml-2">— data and insight require clarity</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column: How / Who */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        {/* How to use — chamfered container */}
        <div className="relative bg-card clip-chamfer-md p-6 md:p-8">
          <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />

          <header className="flex items-baseline gap-4 mb-8">
            <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_A</span>
            <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">How to use this</h3>
            <div className="flex-1 h-px bg-border self-center" />
          </header>

          <div className="space-y-6">
            {[
              "Each section explains what exists and why",
              "Usage guidelines clarify how elements should be applied",
              "Constraints define where elements should not be used",
              "The goal is shared understanding, so decisions can be made confidently",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <span className="font-data text-2xl font-light text-primary/40 group-hover:text-primary transition-colors leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for — chamfered container */}
        <div className="relative bg-card clip-chamfer-md p-6 md:p-8">
          <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />

          <header className="flex items-baseline gap-4 mb-8">
            <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_B</span>
            <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Who this is for</h3>
            <div className="flex-1 h-px bg-border self-center" />
          </header>

          <div className="grid gap-2">
            {[
              { id: "01", icon: Palette, title: "Designers", desc: "Interfaces, dashboards, tools" },
              { id: "02", icon: Megaphone, title: "Marketers", desc: "Campaigns, presentations" },
              { id: "03", icon: Code, title: "Engineers", desc: "Technical documentation" },
              { id: "04", icon: Users, title: "Partners", desc: "External brand representation" },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative flex items-center gap-4 p-4 rounded-md bg-background hover:bg-primary/5 transition-colors"
              >
                <span className="font-data text-[10px] uppercase tracking-widest text-primary">{item.id}</span>
                <div className="w-9 h-9 rounded-md bg-muted/50 group-hover:bg-card flex items-center justify-center transition-colors">
                  <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-ui font-semibold text-foreground block text-sm">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Governance — telemetry group */}
      <div className="space-y-8">
        <header className="flex items-baseline gap-4">
          <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_C</span>
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Brand Governance</h3>
          <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60">03 entries</span>
          <div className="flex-1 h-px bg-border self-center" />
        </header>

        <div className="relative bg-card clip-chamfer-md p-3 md:p-4">
          <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
          <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />

          <div className="grid lg:grid-cols-3 gap-2 md:gap-3">
            {[
              {
                id: "01",
                icon: Target,
                title: "System Goals",
                body: (
                  <ul className="space-y-2">
                    {[
                      "Consistent output across teams and partners",
                      "Faster decisions — less back-and-forth on 'how should this look'",
                      "Reduced review cycles for brand-compliant work",
                    ].map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                id: "02",
                icon: Shield,
                title: "Ownership",
                body: (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>The <strong className="text-foreground">Marketing & Communications team</strong> maintains this system.</p>
                    <p>Propose changes through a written brief explaining the rationale. Aesthetic preferences alone are not sufficient — changes must serve clarity, consistency, or credibility.</p>
                  </div>
                ),
              },
              {
                id: "03",
                icon: AlertTriangle,
                title: "When Guidelines Don't Cover It",
                body: (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Apply the <strong className="text-foreground">Decision Heuristic</strong>: choose the option that deepens understanding and demonstrates real-world capability.</p>
                    <p>Document the decision and flag it for inclusion in the next system update. Undocumented exceptions become inconsistencies.</p>
                  </div>
                ),
              },
            ].map((card) => (
              <div key={card.id} className="p-5 rounded-md bg-background">
                <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
                  <span className="text-primary">{card.id}</span>
                  <span className="text-border">·</span>
                  <span>governance</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-ui font-semibold text-foreground text-sm">{card.title}</h4>
                </div>
                {card.body}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer telemetry strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-6">
        {[
          ["Section", "00 · About"],
          ["Audience", "Internal + Partners"],
          ["Owner", "MarComms"],
          ["Status", "Active"],
        ].map(([k, v], i) => (
          <div key={k} className="flex flex-col gap-1">
            <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/70">{k}</span>
            <span className={`font-data text-xs uppercase tracking-wider ${i === 3 ? "text-primary" : "text-foreground"}`}>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutThisSystem;
