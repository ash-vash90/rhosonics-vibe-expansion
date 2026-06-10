import { BRAND_PRINCIPLES, getValueById } from "@/data/brand-values";

/**
 * DesignPrinciples — obsidian panel with green-glow wash, hosting the
 * five decision tools as horizontal rows (per selected v2 direction).
 */

export const DesignPrinciples = () => (
  <div
    className="relative bg-foreground text-background p-8 md:p-12 lg:p-14 rounded-[4px] overflow-hidden"
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* Green glow, top-right */}
    <div
      aria-hidden="true"
      className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    {/* Faint grid texture */}
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--background)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--background)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />

    <div className="relative z-10">
      <ol className="list-none space-y-0">
        {BRAND_PRINCIPLES.map((p, i) => {
          const value = getValueById(p.valueId);
          const last = i === BRAND_PRINCIPLES.length - 1;
          return (
            <li
              key={p.id}
              className={`grid grid-cols-12 gap-6 md:gap-8 items-start py-7 md:py-8 ${
                last ? "" : "border-b border-background/10"
              }`}
            >
              {/* Index */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-data text-2xl md:text-3xl font-bold text-background/25">
                  {p.num}
                </span>
              </div>

              {/* Name + value tag */}
              <div className="col-span-10 md:col-span-3">
                <span className="block font-data text-[10px] tracking-[0.25em] uppercase text-primary mb-2">
                  {value?.title ?? "—"}
                </span>
                <h3 className="font-ui font-semibold text-background text-xl md:text-2xl tracking-tight">
                  {p.name}
                </h3>
              </div>

              {/* Imperative + essence + apply */}
              <div className="col-span-12 md:col-span-8 space-y-4">
                <p className="font-ui font-semibold text-background text-lg md:text-xl leading-snug tracking-tight">
                  {p.imperative}
                </p>
                <p className="text-background/60 leading-relaxed text-sm md:text-base max-w-[58ch]">
                  {p.essence}
                </p>
                <ul className="list-none space-y-1.5 pt-1">
                  {p.apply.map((rule, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-background/80 text-sm leading-snug max-w-[60ch]"
                    >
                      <span
                        className="font-data text-[10px] text-primary/80 mt-1.5 shrink-0"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </div>
);

export default DesignPrinciples;
