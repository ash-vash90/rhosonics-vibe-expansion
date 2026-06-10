import { BRAND_PRINCIPLES, getValueById } from "@/data/brand-values";

/**
 * DesignPrinciples — five decision tools derived from the canonical
 * values. Section heading is supplied by the page via SectionHeader.
 * Greyscale by default; green only on index numbers and value tags.
 */

export const DesignPrinciples = () => (
  <ol className="space-y-12 md:space-y-14 list-none">
    {BRAND_PRINCIPLES.map((p) => {
      const value = getValueById(p.valueId);
      const isFootprint = p.id === "footprint";
      return (
        <li
          key={p.id}
          className="grid grid-cols-12 gap-6 lg:gap-8 items-start bg-card p-6 md:p-8 lg:p-10 rounded-[6px]"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Left rail — index + value tag */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex lg:flex-col items-baseline lg:items-start gap-4 lg:gap-3">
              <span
                className={`font-data text-3xl md:text-4xl tracking-tight ${
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
);

export default DesignPrinciples;
