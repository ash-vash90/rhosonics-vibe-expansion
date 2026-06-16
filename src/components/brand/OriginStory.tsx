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
    <section
      aria-label="Continuity"
      className="border border-border rounded-[4px] overflow-hidden"
    >
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
          The same impulse that produced the Model 8000 still drives the
          portfolio today:{" "}
          <em>make measurements that are hard to get, easy to trust</em>.
        </p>
      </div>

      {/* Heritage — renewed foundation connection */}
      <div className="px-8 md:px-10 lg:px-12 py-8 md:py-10 border-b border-border space-y-8">
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-2 w-2 rounded-full bg-primary" />
          <span className="font-data text-sm tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
            What carried forward
          </span>
        </div>

        <div className="space-y-6 max-w-[70ch]">
          <p className="font-ui font-medium tracking-[-0.01em] text-foreground leading-[1.3] text-[17px]">
            The renewed foundation is not a rewrite. It is a broader framing
            of the same discipline that started in a 1992 workshop and still
            drives the portfolio today.
          </p>

          <p className="text-[15px] leading-relaxed text-foreground/80">
            The vision — leading the way in what can be measured, controlled,
            and optimized — is a wider statement of the same problem the
            workshop set out to solve: industrial processes that lack reliable
            inline measurement. The mission — advanced measurement solutions
            for more efficient, automated, and sustainable operations — keeps
            the same mechanism (ultrasonic, inline, non-nuclear) but broadens
            the outcomes from a single instrument to a portfolio that serves
            multiple industries and process types.
          </p>

          <p className="text-[15px] leading-relaxed text-foreground/80">
            The five values are not new ideals. They are the behaviours that
            made the first instrument possible, named so they can be
            maintained as the company scales. Each one has a direct line back
            to the heritage.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="px-8 md:px-10 lg:px-12 py-6">
        <p className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Heritage is not nostalgia. It is proof that the discipline works.
        </p>
      </div>
    </section>
  </div>
);

export default OriginStory;

