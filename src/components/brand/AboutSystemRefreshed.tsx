import { Palette, Code, Megaphone, Users, Target, Shield, AlertTriangle } from "@/lib/icons";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionDivider } from "@/components/brand/SectionUtils";
import { SolutionIcon } from "@/components/brand/icons/SolutionIcon";
import { StatCallout, StatCalloutRow } from "@/components/brand/StatCallout";
import { FactFile } from "@/components/brand/FactFile";
import { TelemetryEyebrow, CornerBrackets, TelemetryFooter } from "@/components/brand/telemetry";

/**
 * About — telemetry-first restructure.
 * Scannable fact structures over prose; compact rhythm; one Field moment;
 * the mission→texture mapping made visible. See agents.md §4.6.
 */
const AboutSystemRefreshed = () => {
  return (
    <>
      {/* 00.0 — Thesis + fact file + measurable outcomes */}
      <ScrollSection id="about">
        <header className="max-w-3xl mb-10 md:mb-12">
          <TelemetryEyebrow className="mb-4" pulse code="00" label="Overview" meta={["v2025"]} />
          <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl mb-4">
            A system of decisions, not a style guide.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Clarity, consistency, and credibility wherever the Rhosonics brand appears.
          </p>
        </header>

        <FactFile
          ariaLabel="System fact file"
          className="mb-10 md:mb-12"
          items={[
            { label: "Standard", value: "Brand OS" },
            { label: "Version", value: "2025 · Stable" },
            { label: "Owner", value: "MarComms" },
            { label: "Scope", value: "Product · Marketing · Docs · Partners" },
          ]}
        />

        <StatCalloutRow className="lg:grid-cols-3">
          <StatCallout value="01" label="Clarity — every signal earns its place on the line" emphasis="primary" />
          <StatCallout value="02" label="Consistency — same brand across teams and partners" emphasis="primary" />
          <StatCallout value="03" label="Credibility — evidence-led, never claim-led" emphasis="primary" />
        </StatCalloutRow>
      </ScrollSection>

      <SectionDivider label="00.1" />

      {/* 00.1 — Mission & vision mapped to the visual system */}
      <ScrollSection id="about-mission" variant="eco">
        <header className="max-w-3xl mb-10 md:mb-12">
          <TelemetryEyebrow className="mb-4" code="00.1" label="Mission · Vision" />
          <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl mb-4">
            Measured. Controlled. Optimized.
          </h2>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed max-w-prose">
            Leading the way in what can be measured, controlled, and optimized — advanced
            measurement that lets industries run more efficiently, automated, and sustainable.
            The visual system is that mission, drawn:
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              id: "01",
              word: "Measured",
              family: "Signal",
              swatch: "bg-card bg-wave-pattern",
              desc: "Ultrasonic wave textures on hero surfaces — the measurement itself.",
            },
            {
              id: "02",
              word: "Controlled",
              family: "Precision",
              swatch: "bg-card bg-grid-data",
              desc: "Engineering grids under data and evidence — the discipline.",
            },
            {
              id: "03",
              word: "Optimized",
              family: "Eco",
              swatch: "bg-[hsl(var(--eco-surface))]",
              desc: "Green-tinted surfaces for sustainability outcomes — the result.",
            },
            {
              id: "04",
              word: "The industries",
              family: "Field",
              swatch: "bg-mineral-surface bg-terrain-strata",
              desc: "Terrain and industry patterns on field-context sections — the world it serves.",
            },
          ].map((m) => (
            <article key={m.id} className="flex flex-col gap-3">
              <div className={`h-20 rounded-md ${m.swatch}`} aria-hidden="true" />
              <div className="flex items-baseline gap-2 font-data text-[10px] uppercase tracking-widest">
                <span className="text-primary">{m.id}</span>
                <span className="text-foreground">{m.word}</span>
                <span className="text-muted-foreground">→ {m.family}</span>
              </div>
              <p className="text-xs md:text-sm text-foreground/70 leading-relaxed">{m.desc}</p>
            </article>
          ))}
        </div>
      </ScrollSection>

      <SectionDivider label="00.2" />

      {/* 00.2 — Core tension: the page's one Field moment */}
      <ScrollSection id="about-tension">
        <div className="relative card-mineral clip-chamfer-lg drop-shadow-md p-8 md:p-12">
          <div aria-hidden="true" className="absolute inset-0 bg-terrain-strata opacity-40 pointer-events-none" />
          <CornerBrackets tone="muted" />

          <div className="relative">
            <TelemetryEyebrow className="mb-4" code="00.2" label="The core tension" />
            <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-2xl md:text-4xl mb-8 max-w-2xl">
              Built for two audiences that don't compromise.
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              <article className="flex flex-col gap-4">
                <SolutionIcon name="calibration" accent="green" surface="none" size={64} label="Industrial precision" />
                <h3 className="font-ui font-semibold text-foreground text-lg">Industrial environments</h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">
                  The brand behaves like the instrument — predictable, legible, restrained.
                </p>
              </article>
              <article className="flex flex-col gap-4">
                <SolutionIcon name="telemetry" accent="bronze" surface="none" size={64} label="Technical communication" />
                <h3 className="font-ui font-semibold text-foreground text-lg">Technical communication</h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">
                  Every label, chart, and signal is read at a glance and trusted on the floor.
                </p>
              </article>
            </div>
          </div>
        </div>
      </ScrollSection>

      <SectionDivider label="00.3" />

      {/* 00.3 — How to use + who it's for */}
      <ScrollSection id="about-usage" variant="tinted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* How to use */}
          <div>
            <TelemetryEyebrow className="mb-4" code="GRP_A" label="How to use this" />
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
            <TelemetryEyebrow className="mb-4" code="GRP_B" label="Who this is for" />
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
      </ScrollSection>

      <SectionDivider label="00.4" />

      {/* 00.4 — Governance, compressed to telemetry fact rows */}
      <ScrollSection id="about-governance" variant="dark">
        <header className="max-w-3xl mb-10 md:mb-12">
          <TelemetryEyebrow className="mb-4" tone="dark" code="00.4" label="Governance" />
          <h2 className="font-ui font-bold text-white tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl">
            Owned, maintained, and applied with intent.
          </h2>
        </header>

        <div className="divide-y divide-slate-800 border-y border-slate-800">
          {[
            {
              id: "01",
              icon: Target,
              title: "System goals",
              line: "Consistent output, faster decisions, fewer review cycles.",
            },
            {
              id: "02",
              icon: Shield,
              title: "Ownership",
              line: "MarComms maintains the system. Changes need a written brief serving clarity, consistency, or credibility — not taste.",
            },
            {
              id: "03",
              icon: AlertTriangle,
              title: "When guidelines don't cover it",
              line: "Apply the Decision Heuristic, document the call, flag it for the next update. Undocumented exceptions become inconsistencies.",
            },
          ].map((row) => (
            <div key={row.id} className="grid grid-cols-[auto_auto_1fr] md:grid-cols-[6rem_16rem_1fr] items-baseline gap-4 md:gap-6 py-5">
              <span className="font-data text-[10px] uppercase tracking-widest text-primary">{row.id}</span>
              <span className="flex items-center gap-2 font-ui font-semibold text-white text-sm md:text-base">
                <row.icon className="w-4 h-4 text-primary shrink-0" />
                {row.title}
              </span>
              <p className="col-span-3 md:col-span-1 text-sm text-slate-300 leading-relaxed">{row.line}</p>
            </div>
          ))}
        </div>

        <TelemetryFooter
          tone="dark"
          className="mt-12 md:mt-16"
          items={[
            { label: "Section", value: "00 · About" },
            { label: "Audience", value: "Internal + Partners" },
            { label: "Owner", value: "MarComms" },
            { label: "Status", value: "Active", emphasis: true },
          ]}
        />
      </ScrollSection>
    </>
  );
};

export default AboutSystemRefreshed;
