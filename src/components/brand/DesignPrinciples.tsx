import { BRAND_PRINCIPLES, getValueById } from "@/data/brand-values";

/**
 * DesignPrinciples — five decision tools derived from the canonical
 * values and the vision/mission. Modelled on Apple HIG: one-word name,
 * a bold imperative, an essence sentence, and 2–3 review-time tests.
 *
 * Lives on /position as the third act under Foundation and
 * ValueOperatingRules. Greyscale by default; green appears only on
 * the index numbers and the value-grounding tag, per the
 * colour-for-emphasis rule. No chamfers — these are content rows.
 */

export const DesignPrinciples = () => (
  <section aria-labelledby="design-principles-heading">
    {/* Section header — mono label, hairline rule, section number */}
    <div className="flex items-baseline justify-between mb-12 md:mb-16 border-b border-border pb-4">
      <h2
        id="design-principles-heading"
        className="font-data text-xs tracking-[0.3em] uppercase text-foreground"
      >
        Design Principles
      </h2>
      <span className="font-data text-[10px] text-muted-foreground">01.3</span>
    </div>

    {/* Chapter thesis — single sentence, sets the frame */}
    <p className="font-ui text-lg md:text-xl text-foreground/80 leading-snug max-w-[55ch] mb-16 md:mb-20">
      Five decision tools. One per value. When two options compete, these
      tell us which one ships.
    </p>

    <ol className="space-y-16 md:space-y-20 list-none">
      {BRAND_PRINCIPLES.map((p) => {
        const value = getValueById(p.valueId);
        const isFootprint = p.id === "footprint";
        return (
          <li
            key={p.id}
            className="grid grid-cols-12 gap-6 lg:gap-8 items-start"
          >
            {/* Left rail — index + value tag */}
            <div className="col-span-12 lg:col-span-3">
              <div className="flex lg:flex-col items-baseline lg:items-start gap-4 lg:gap-3">
                <span
                  className={`font-data text-2xl md:text-3xl tracking-tight ${
                    isFootprint ? "text-primary" : "text-foreground"
                  }`}
                >
                  {p.num}
                </span>
                {value && (
                  <span className="font-data text-[10px] tracking-[0.2em] uppercase text-primary">
                    → {value.title}
                  </span>
                )}
              </div>
            </div>

            {/* Right — name, imperative, essence, apply list */}
            <div className="col-span-12 lg:col-span-9">
              <h3 className="font-ui font-semibold text-foreground tracking-tight text-xl md:text-2xl mb-2">
                {p.name}
              </h3>
              <p className="font-ui font-semibold text-foreground text-2xl md:text-3xl lg:text-[2rem] leading-tight tracking-tight mb-5 md:mb-6 max-w-[28ch]">
                {p.imperative}
              </p>
              <p className="text-foreground/70 leading-relaxed max-w-[55ch] mb-7 md:mb-8">
                {p.essence}
              </p>

              <div className="border-t border-border pt-5 md:pt-6">
                <span className="block font-data text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Apply
                </span>
                <ul className="space-y-2.5 list-none">
                  {p.apply.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-foreground/85 leading-snug max-w-[58ch]"
                    >
                      <span
                        className="font-data text-[10px] text-muted-foreground/70 mt-2 shrink-0"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);

export default DesignPrinciples;
