import { Eye, Layers, Minimize2, Tag, ArrowRight, Gauge, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";

type TelemetryVariant = "best" | "info" | "avoid";

const variantConfig: Record<TelemetryVariant, {
  ref: string;
  tag: string;
  accent: string;
  surface: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  bracket: string;
  bar: string;
  titleColor: string;
  icon: React.ElementType;
}> = {
  best: {
    ref: "OK",
    tag: "best practice",
    accent: "text-success",
    surface: "bg-success-surface",
    iconBg: "bg-success",
    iconColor: "text-white",
    iconBorder: "ring-1 ring-success/30",
    bracket: "border-success",
    bar: "bg-success",
    titleColor: "text-success",
    icon: CheckCircle,
  },
  info: {
    ref: "INFO",
    tag: "guidance",
    accent: "text-info",
    surface: "bg-info-surface",
    iconBg: "bg-info",
    iconColor: "text-white",
    iconBorder: "ring-1 ring-info/30",
    bracket: "border-info",
    bar: "bg-info",
    titleColor: "text-info",
    icon: Lightbulb,
  },
  avoid: {
    ref: "AVOID",
    tag: "anti-pattern",
    accent: "text-warning",
    surface: "bg-warning-surface",
    iconBg: "bg-warning",
    iconColor: "text-white",
    iconBorder: "ring-1 ring-warning/30",
    bracket: "border-warning",
    bar: "bg-warning",
    titleColor: "text-warning",
    icon: AlertTriangle,
  },
};

const TelemetryCallout = ({
  variant,
  title,
  index,
  children,
}: {
  variant: TelemetryVariant;
  title: string;
  index: string;
  children: React.ReactNode;
}) => {
  const cfg = variantConfig[variant];
  const Icon = cfg.icon;
  return (
    <div className={`relative clip-chamfer-md p-5 md:p-6 ${cfg.surface}`}>
      <div aria-hidden="true" className={`absolute -top-px left-3 w-3 h-3 border-t border-l ${cfg.bracket}`} />
      <div aria-hidden="true" className={`absolute -top-px right-3 w-3 h-3 border-t border-r ${cfg.bracket}`} />
      <div aria-hidden="true" className={`absolute -bottom-px left-3 w-3 h-3 border-b border-l ${cfg.bracket}`} />
      <div aria-hidden="true" className={`absolute -bottom-px right-3 w-3 h-3 border-b border-r ${cfg.bracket}`} />
      <div aria-hidden="true" className={`absolute left-0 top-3 bottom-3 w-1 ${cfg.bar}`} />

      <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest mb-4">
        <span className={`${cfg.accent} font-semibold`}>{index}</span>
        <span className="text-border">·</span>
        <span className={`${cfg.accent} font-semibold`}>{cfg.ref}</span>
        <span className="text-border">·</span>
        <span className="text-muted-foreground/80">{cfg.tag}</span>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${cfg.iconBg} ${cfg.iconBorder}`}>
          <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
        </div>
        <h4 className={`font-ui text-base lg:text-lg font-semibold pt-1.5 ${cfg.titleColor}`}>
          {title}
        </h4>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
    </div>
  );
};

/**
 * Design Process Section — Precision Telemetry treatment
 */
export const DesignProcess = () => {
  const principles = [
    {
      icon: Layers,
      title: "Feature-First Development",
      description: "Start with the actual feature, not the layout. Design the specific functionality before deciding where it goes in the interface.",
      example: "Don't start with 'I need a sidebar'. Start with 'users need to filter by date range'.",
    },
    {
      icon: Eye,
      title: "Grayscale Validation",
      description: "Before shipping any design, convert to grayscale. If hierarchy is unclear without color, fix spacing and typography first.",
      example: "Color should enhance hierarchy, not create it. The structure must work in black and white.",
    },
    {
      icon: Minimize2,
      title: "Emphasize by De-emphasizing",
      description: "The primary way to make something stand out is to make other things stand back. Reduce competing elements rather than amplifying the focus.",
      example: "Instead of making the CTA bigger, make the surrounding text smaller and lighter.",
    },
    {
      icon: Tag,
      title: "Labels as a Last Resort",
      description: "Use formatting, context, and visual cues to communicate meaning before adding text labels. Every label is cognitive load.",
      example: "A green checkmark in a status column doesn't need 'Success' written next to it.",
    },
    {
      icon: Gauge,
      title: "Performance Before Polish",
      description: "Design with asset weight and load time in mind from the start. Every image, animation, and dependency has a cost — especially on field devices with limited bandwidth.",
      example: "A 2MB hero image on a HMI dashboard is a failure. Optimize assets before adding visual flourishes.",
    },
  ];

  const Brackets = () => (
    <>
      <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
      <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
      <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
      <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />
    </>
  );

  return (
    <section id="design-process" className="relative space-y-16 md:space-y-20">
      {/* Oversized background data mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 right-0 font-data font-black uppercase leading-none text-foreground/[0.025] text-[120px] md:text-[180px] lg:text-[220px]"
      >
        Process
      </div>

      {/* Telemetry intro */}
      <div className="relative max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-data text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Subsection</span>
          <span className="text-border hidden sm:inline">·</span>
          <span>00.1 / Process</span>
          <span className="text-border hidden sm:inline">·</span>
          <span>{String(principles.length).padStart(2, "0")} Principles</span>
        </div>
        <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
          How we approach design decisions. These principles guide the process from concept to implementation, ensuring every interface prioritizes clarity and function.
        </p>
      </div>

      {/* Principles — chamfered container with row entries */}
      <div>
        <header className="flex items-baseline gap-4 mb-5">
          <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_01</span>
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Core Principles</h3>
          <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {String(principles.length).padStart(2, "0")} entries
          </span>
          <div className="flex-1 h-px bg-border self-center" />
        </header>

        <div className="relative bg-card clip-chamfer-md p-3 md:p-4">
          <Brackets />
          <div className="grid md:grid-cols-2 gap-2 md:gap-3">
            {principles.map((principle, idx) => (
              <div
                key={principle.title}
                className="group p-5 lg:p-6 rounded-md bg-background hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
                  <span className="text-primary">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-border">·</span>
                  <span>principle</span>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <principle.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-ui text-base lg:text-lg font-semibold text-foreground pt-1.5 group-hover:text-primary transition-colors">
                    {principle.title}
                  </h4>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {principle.description}
                </p>

                <div className="flex items-start gap-2 pt-3 border-t border-border/50">
                  <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground italic">{principle.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow — telemetry steps */}
      <div>
        <header className="flex items-baseline gap-4 mb-5">
          <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_02</span>
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Design Workflow</h3>
          <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60">04 phases</span>
          <div className="flex-1 h-px bg-border self-center" />
        </header>

        <div className="relative bg-card clip-chamfer-md p-3 md:p-4">
          <Brackets />
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3">
            {[
              { step: "01", label: "Functionality", desc: "What does the user need to do?" },
              { step: "02", label: "Hierarchy", desc: "What's most important?" },
              { step: "03", label: "Grayscale", desc: "Does it work without color?" },
              { step: "04", label: "Polish", desc: "Add color, depth, motion" },
            ].map((phase, idx) => (
              <div key={phase.step} className="flex-1 relative">
                <div className="p-5 rounded-md bg-background h-full">
                  <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                    <span className="text-primary">{phase.step}</span>
                    <span className="text-border">·</span>
                    <span>step</span>
                  </div>
                  <h4 className="font-ui font-semibold text-foreground text-sm lg:text-base mb-1">{phase.label}</h4>
                  <p className="text-xs lg:text-[13px] text-muted-foreground leading-relaxed">{phase.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mindset Callouts */}
      <div>
        <header className="flex items-baseline gap-4 mb-5">
          <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_03</span>
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Mindset</h3>
          <div className="flex-1 h-px bg-border self-center" />
        </header>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <TelemetryCallout variant="best" index="01" title="Be a Pessimist When Building">
            Start simple. Don't add features, colors, or effects until you've proven the core functionality works.
            Every addition must justify itself.
          </TelemetryCallout>
          <TelemetryCallout variant="info" index="02" title="Be an Optimist When Polishing">
            Once the structure is solid, explore. Try bold colors, subtle animations, refined typography.
            Polish is where personality emerges.
          </TelemetryCallout>
...
          <TelemetryCallout variant="avoid" index="01" title="No Glassmorphism / Frosted Glass">
            Backdrop blur and translucent surfaces fail in industrial contexts: unreadable in direct sunlight,
            expensive to render on embedded HMI hardware, and visually ambiguous when layered over complex data.
            Use solid backgrounds with proper elevation instead.
          </TelemetryCallout>
          <TelemetryCallout variant="avoid" index="02" title="No Decorative Motion">
            Parallax scrolling, continuous background animations, and auto-playing videos consume bandwidth and
            CPU cycles on field devices. Every animation must serve understanding — if removing it doesn't
            reduce clarity, remove it.
          </TelemetryCallout>
        </div>
      </div>

      {/* Grayscale validation — chamfered demo */}
      <div>
        <header className="flex items-baseline gap-4 mb-5">
          <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">GRP_05</span>
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">Grayscale Validation</h3>
          <div className="flex-1 h-px bg-border self-center" />
        </header>

        <div className="relative bg-card clip-chamfer-md p-3 md:p-4">
          <Brackets />
          <div className="grid md:grid-cols-2 gap-2 md:gap-3">
            {[
              { id: "01", label: "With Color", grayscale: false },
              { id: "02", label: "Grayscale Test", grayscale: true },
            ].map((variant) => (
              <div key={variant.id} className="p-5 rounded-md bg-background">
                <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
                  <span className="text-primary">{variant.id}</span>
                  <span className="text-border">·</span>
                  <span>{variant.label}</span>
                </div>
                <div className={`p-5 rounded-md bg-card space-y-4 ${variant.grayscale ? "grayscale" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-ui font-semibold text-foreground">Density Reading</span>
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-data rounded">LIVE</span>
                  </div>
                  <div className="font-data text-4xl text-foreground">
                    1.4502 <span className="text-lg text-muted-foreground">g/L</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-1 bg-eco-surface text-primary text-xs font-data rounded border border-eco-border">
                      +2.3%
                    </span>
                    <span className="text-sm text-muted-foreground">from average</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground mt-6 max-w-2xl text-sm leading-relaxed">
          Both versions maintain clear hierarchy. The primary measurement (1.4502) dominates through size,
          the status badge is distinct through position and contrast, and the trend indicator is secondary
          through size reduction. Color enhances but doesn't create the hierarchy.
        </p>
      </div>

      {/* Footer telemetry strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-6">
        {[
          ["Subsection", "00.1 · Process"],
          ["Source", "Refactoring UI"],
          ["Phases", "04"],
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

export default DesignProcess;
