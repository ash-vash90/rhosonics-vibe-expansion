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
  <div className="py-16 md:py-24 space-y-20 md:space-y-24">
    {/* Statement */}
    <section className="grid grid-cols-12 gap-y-10 gap-x-8">
      <header className="col-span-12 lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <span className="block font-data text-[11px] tracking-[0.28em] uppercase text-muted-foreground font-medium">
            Heritage
          </span>
          <h3
            className="font-ui font-semibold text-foreground tracking-[-0.03em] mt-5 leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 2.6vw, 2.75rem)" }}
          >
            1992 — today
          </h3>
        </div>
      </header>

      <div className="col-span-12 lg:col-start-4 lg:col-span-9">
        <p
          className="font-ui font-medium tracking-[-0.02em] text-foreground leading-[1.12]
                     [&_em]:not-italic [&_em]:text-primary"
          style={{ fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)" }}
        >
          Rhosonics began in 1992 in a small Netherlands workshop, with the{" "}
          <em>Model 8000</em> ultrasonic process analyzer. The portfolio has
          changed; the discipline has not — inline ultrasonic measurement on
          streams that other techniques struggle with.
        </p>
      </div>
    </section>

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
          <span className="block font-data text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
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
  </div>
);

export default OriginStory;
