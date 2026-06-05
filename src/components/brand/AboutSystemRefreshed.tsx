import { Palette, Code, Megaphone, Users, Target, Shield, AlertTriangle } from "@/lib/icons";
import {
  SectionDefault,
  SectionTinted,
  SectionEco,
  SectionDark,
} from "@/components/brand/sections/SectionVariants";
import { SolutionIcon } from "@/components/brand/icons/SolutionIcon";
import { StatCallout, StatCalloutRow } from "@/components/brand/StatCallout";

/**
 * About — recomposed with Customer.io-inspired rhythm primitives.
 * Same content as AboutThisSystem; reorganised across alternating section
 * variants with the brand-restricted icon family and stat callouts.
 */
const AboutSystemRefreshed = () => {
  return (
    <div className="-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20">
      {/* 1. DEFAULT — thesis + measurable outcomes */}
      <SectionDefault id="about" ariaLabel="About this system">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <header className="max-w-3xl mb-12 md:mb-16">
            <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              00 · Overview · v2025
            </div>
            <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl mb-6">
              A system of decisions, not a style guide.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Designed to ensure clarity, consistency, and credibility wherever the
              Rhosonics brand appears — across product, marketing, documentation, and
              partner channels.
            </p>
          </header>

          <StatCalloutRow className="lg:grid-cols-3">
            <StatCallout value="01" label="Clarity — every signal earns its place on the line" emphasis="primary" />
            <StatCallout value="02" label="Consistency — same brand across teams and partners" emphasis="primary" />
            <StatCallout value="03" label="Credibility — evidence-led, never claim-led" emphasis="primary" />
          </StatCalloutRow>
        </div>
      </SectionDefault>

      {/* 2. ECO — Core tension */}
      <SectionEco id="about-tension" ariaLabel="Core tension">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary-700 mb-4">
                The core tension
              </div>
              <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl">
                Built for two audiences that don't compromise.
              </h2>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <article className="flex flex-col gap-4">
                <SolutionIcon name="calibration" accent="green" surface="none" size={72} label="Industrial precision" />
                <h3 className="font-ui font-semibold text-foreground text-lg">Industrial environments</h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">
                  Precision and reliability are non-negotiable. The brand has to behave
                  like the instrument — predictable, legible, restrained.
                </p>
              </article>
              <article className="flex flex-col gap-4">
                <SolutionIcon name="telemetry" accent="bronze" surface="none" size={72} label="Technical communication" />
                <h3 className="font-ui font-semibold text-foreground text-lg">Technical communication</h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">
                  Data and insight require clarity. Every label, chart, and signal is
                  designed to be read at a glance and trusted on the floor.
                </p>
              </article>
            </div>
          </div>
        </div>
      </SectionEco>

      {/* 3. TINTED — How to use + Who it's for (split) */}
      <SectionTinted id="about-usage" ariaLabel="How to use this system">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* How to use */}
            <div>
              <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">GRP_A</div>
              <h3 className="font-ui font-bold text-foreground tracking-tight leading-[1.1] text-2xl md:text-3xl mb-8">
                How to use this
              </h3>
              <ol className="space-y-6">
                {[
                  "Each section explains what exists and why",
                  "Usage guidelines clarify how elements should be applied",
                  "Constraints define where elements should not be used",
                  "The goal is shared understanding so decisions can be made confidently",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-5 group">
                    <span className="font-data text-2xl font-light text-primary/50 leading-none mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-foreground/80 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Who this is for */}
            <div>
              <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">GRP_B</div>
              <h3 className="font-ui font-bold text-foreground tracking-tight leading-[1.1] text-2xl md:text-3xl mb-8">
                Who this is for
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "01", icon: Palette, title: "Designers", desc: "Interfaces, dashboards, tools" },
                  { id: "02", icon: Megaphone, title: "Marketers", desc: "Campaigns, presentations" },
                  { id: "03", icon: Code, title: "Engineers", desc: "Technical documentation" },
                  { id: "04", icon: Users, title: "Partners", desc: "External brand representation" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative flex items-start gap-4 p-4 rounded-md bg-background transition-colors hover:bg-card"
                  >
                    <div className="w-10 h-10 rounded-md bg-[hsl(var(--eco-surface))] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-data text-[10px] uppercase tracking-widest text-primary">
                          {item.id}
                        </span>
                        <span className="font-ui font-semibold text-foreground text-sm">{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionTinted>

      {/* 4. DARK — Governance */}
      <SectionDark id="about-governance" ariaLabel="Brand governance">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <header className="max-w-3xl mb-12 md:mb-16">
            <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              GRP_C · Governance
            </div>
            <h2 className="font-ui font-bold text-white tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
              Owned, maintained, and applied with intent.
            </h2>
          </header>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                id: "01",
                icon: Target,
                title: "System Goals",
                body: [
                  "Consistent output across teams and partners",
                  "Faster decisions — less back-and-forth on 'how should this look'",
                  "Reduced review cycles for brand-compliant work",
                ],
              },
              {
                id: "02",
                icon: Shield,
                title: "Ownership",
                body: [
                  "The Marketing & Communications team maintains this system.",
                  "Propose changes through a written brief explaining the rationale. Aesthetic preferences alone are not sufficient — changes must serve clarity, consistency, or credibility.",
                ],
              },
              {
                id: "03",
                icon: AlertTriangle,
                title: "When guidelines don't cover it",
                body: [
                  "Apply the Decision Heuristic: choose the option that deepens understanding and demonstrates real-world capability.",
                  "Document the decision and flag it for inclusion in the next system update. Undocumented exceptions become inconsistencies.",
                ],
              },
            ].map((card) => (
              <article key={card.id} className="rounded-md bg-white/[0.04] p-6 md:p-8">
                <div className="flex items-center gap-3 font-data text-[10px] uppercase tracking-widest text-slate-400 mb-6">
                  <span className="text-primary">{card.id}</span>
                  <span className="text-slate-700">·</span>
                  <span>governance</span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-primary/15 flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-ui font-semibold text-white text-base">{card.title}</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  {card.body.map((b, i) => (
                    <p key={i}>{b}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Telemetry footer strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800 mt-12 md:mt-16 pt-6">
            {[
              ["Section", "00 · About"],
              ["Audience", "Internal + Partners"],
              ["Owner", "MarComms"],
              ["Status", "Active"],
            ].map(([k, v], i) => (
              <div key={k} className="flex flex-col gap-1">
                <span className="font-data text-[10px] uppercase tracking-widest text-slate-500">{k}</span>
                <span className={`font-data text-xs uppercase tracking-wider ${i === 3 ? "text-primary" : "text-white"}`}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionDark>
    </div>
  );
};

export default AboutSystemRefreshed;
