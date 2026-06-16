import { BRAND_VALUES } from "@/data/brand-values";

/**
 * Heritage — where Rhosonics started and what carried forward.
 *
 * Same restrained pattern as Foundation.tsx: sticky label column
 * + single statement + hairline-divided milestone strip. No
 * decorative chrome, no invented metadata, no fake icons —
 * the facts carry the section.
 */

const milestones: { label: string; title: string; body: string }[] = [
  {
    label: "1992",
    title: "Origin",
    body: "A small workshop in the Netherlands. The first device built by hand.",
  },
  {
    label: "Model 8000",
    title: "Ultrasonic process analyzer",
    body: "The instrument the company was founded to build. Inline, non-radioactive, ultrasonic.",
  },
  {
    label: "Today",
    title: "SDM ECO and CCM portfolio",
    body: "Slurry density and chemical concentration, deployed across mineral processing, semiconductor, flat panel display and chemical plants worldwide.",
  },
];

const valueLinks: { name: string; heritage: string }[] = [
  { name: "Expertise", heritage: "The physics of the first instrument" },
  { name: "Collaboration", heritage: "Built to fit the plant" },
  { name: "Innovation", heritage: "Solving the next stream" },
  { name: "Quality", heritage: "Surviving the environment" },
  { name: "Sustainability", heritage: "Non-radioactive from day one" },
];

export const OriginStory = () => (
  <div className="space-y-14 md:space-y-20">
    {/* Statement */}
    <p
      className="font-ui font-medium tracking-[-0.02em] text-foreground leading-[1.12] max-w-[34ch]
                 [&_em]:not-italic [&_em]:text-primary"
      style={{ fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)" }}
    >
      Rhosonics began in 1992 in a small Netherlands workshop, with the{" "}
      <em>Model 8000</em> ultrasonic process analyzer. The portfolio has
      changed; the discipline has not — inline ultrasonic measurement on
      streams that other techniques struggle with.
    </p>

    {/* Milestone strip */}
    <section
      aria-label="Milestones"
      className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-border"
    >
      {milestones.map((m, idx) => (
        <div
          key={m.label}
          className={`p-8 md:p-10 ${
            idx < milestones.length - 1
              ? "border-b md:border-b-0 md:border-r border-border"
              : ""
          }`}
        >
          <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-4">
            {m.label}
          </span>
          <h4 className="font-ui font-semibold text-foreground tracking-[-0.01em] text-lg mb-2">
            {m.title}
          </h4>
          <p className="text-[14px] leading-relaxed text-foreground/75 max-w-[40ch]">
            {m.body}
          </p>
        </div>
      ))}
    </section>

    {/* Continuity panel — how heritage feeds the renewed foundation */}
    <section aria-label="Continuity" className="border border-border rounded-[4px] overflow-hidden">
      {/* Panel header */}
      <div className="px-8 md:px-10 lg:px-12 py-6 border-b border-border flex items-center gap-3">
        <span aria-hidden className="block h-2 w-2 rounded-full bg-primary" />
        <span className="font-data text-sm tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
          Continuity
        </span>
      </div>

      {/* Core statement */}
      <div className="px-8 md:px-10 lg:px-12 py-8 md:py-10 border-b border-border">
        <p
          className="font-ui font-medium tracking-[-0.02em] text-foreground leading-[1.12] max-w-[38ch]
                     [&_em]:not-italic [&_em]:text-primary"
          style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)" }}
        >
          The same impulse that produced the Model 8000 still drives the portfolio today:{" "}
          <em>make measurements that are hard to get, easy to trust</em>.
        </p>
      </div>

      {/* Vision / Mission row */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="px-8 md:px-10 lg:px-12 py-8 md:py-10 space-y-4">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-2 w-2 rounded-full bg-primary" />
            <span className="font-data text-sm tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
              Vision
            </span>
          </div>
          <p className="font-ui font-medium tracking-[-0.01em] text-foreground leading-[1.2] text-lg">
            {BRAND_VISION}
          </p>
          <p className="text-[14px] leading-relaxed text-foreground/70 max-w-[40ch]">
            A broader framing of the same problem the workshop set out to solve.
          </p>
        </div>

        <div className="px-8 md:px-10 lg:px-12 py-8 md:py-10 space-y-4">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-2 w-2 rounded-full bg-primary" />
            <span className="font-data text-sm tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
              Mission
            </span>
          </div>
          <p className="font-ui font-medium tracking-[-0.01em] text-foreground leading-[1.2] text-lg">
            {BRAND_MISSION}
          </p>
          <p className="text-[14px] leading-relaxed text-foreground/70 max-w-[40ch]">
            The same mechanism, now with broader operational outcomes.
          </p>
        </div>
      </div>

      {/* Values link strip */}
      <div className="border-t border-border">
        <div className="px-8 md:px-10 lg:px-12 py-6 border-b border-border flex items-center gap-3">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-primary" />
          <span className="font-data text-sm tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
            Values
          </span>
          <span className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground ml-auto">
            Heritage link
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {valueLinks.map((v, idx) => (
            <div
              key={v.name}
              className={`px-8 md:px-10 lg:px-12 py-6 ${
                idx < valueLinks.length - 1
                  ? "border-b sm:border-b lg:border-b-0 lg:border-r border-border"
                  : ""
              }`}
            >
              <span className="block font-ui font-semibold text-foreground text-sm mb-1">
                {v.name}
              </span>
              <span className="block text-[13px] leading-relaxed text-foreground/60">
                {v.heritage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="px-8 md:px-10 lg:px-12 py-6 border-t border-border">
        <p className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Heritage is not nostalgia. It is proof that the discipline works.
        </p>
      </div>
    </section>
  </div>
);

export default OriginStory;
