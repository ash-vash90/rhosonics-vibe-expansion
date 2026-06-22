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

    {/* Continuity — compact two-column strip */}
    <section aria-label="Continuity" className="border-t border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-10 md:border-r border-border">
          <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-4">
            Continuity
          </span>
          <p
            className="font-ui font-medium tracking-[-0.02em] text-foreground leading-[1.12] max-w-[32ch]
                       [&_em]:not-italic [&_em]:text-primary"
            style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
          >
            The same impulse that produced the Model 8000 still drives the
            portfolio today:{" "}
            <em>make measurements that are hard to get, easy to trust</em>.
          </p>
        </div>

        <div className="p-8 md:p-10 border-t md:border-t-0 border-border">
          <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-4">
            What carried forward
          </span>
          <div className="space-y-4 max-w-[50ch]">
            <p className="text-[15px] leading-relaxed text-foreground/80">
              The renewed foundation is not a rewrite. It is a broader framing
              of the same discipline that started in a 1992 workshop and still
              drives the portfolio today.
            </p>
            <p className="font-data text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Heritage is not nostalgia. It is proof the discipline works.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default OriginStory;

