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

    {/* Connection to renewed foundation */}
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
      <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Continuity
      </span>
      <div className="space-y-8">
        <p className="text-[15px] leading-[1.6] text-foreground/80 max-w-[65ch]">
          The same impulse that produced the Model 8000 in 1992 still drives the portfolio today: <em className="not-italic text-primary">make measurements that are hard to get, easy to trust</em>. Inline, non-radioactive, real-time — the constraints have not changed, only the range of applications.
        </p>

        <p className="text-[15px] leading-[1.6] text-foreground/80 max-w-[65ch]">
          That continuity is why the renewed foundation does not contradict the past. The vision — <em className="not-italic">Leading the way in what can be measured, controlled, and optimized</em> — is a broader framing of the same problem the workshop set out to solve.
        </p>

        <p className="text-[15px] leading-[1.6] text-foreground/80 max-w-[65ch]">
          The mission — <em className="not-italic">Advanced measurement solutions for more efficient, automated, and sustainable operations</em> — adds the operational outcomes that customers now expect, but the mechanism remains ultrasonic measurement on difficult streams.
        </p>

        <div className="space-y-4">
          <p className="text-[15px] leading-[1.6] text-foreground/80 max-w-[65ch]">
            The values describe the behaviour that made the first instrument reliable and the behaviour that keeps the current portfolio deployable:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {[
              { name: "Expertise", desc: "to know the physics" },
              { name: "Collaboration", desc: "to fit the plant" },
              { name: "Innovation", desc: "to solve the next stream" },
              { name: "Quality", desc: "to survive the environment" },
              { name: "Sustainability", desc: "non-radioactive was the original advantage and still is" },
            ].map((v) => (
              <li key={v.name} className="flex items-baseline gap-2">
                <span className="font-ui font-semibold text-foreground text-[14px]">{v.name}</span>
                <span className="text-foreground/60 text-[14px]">— {v.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[15px] leading-[1.6] text-foreground/80 max-w-[65ch]">
          Heritage is not nostalgia here. It is proof that the discipline works.
        </p>
      </div>
    </div>
  </div>
);

export default OriginStory;
