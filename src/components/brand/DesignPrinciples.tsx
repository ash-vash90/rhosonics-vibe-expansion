import { BRAND_PRINCIPLES, getValueById } from "@/data/brand-values";
import { InstrumentPanel } from "./system/InstrumentPanel";

/**
 * DesignPrinciples — five decision tools, wrapped in an
 * InstrumentPanel so the chapter's analytical core reads as a piece
 * of instrument output.
 */
export const DesignPrinciples = () => (
  <InstrumentPanel title="Decision tools" live className="min-h-[480px]">
    <ol className="relative list-none space-y-0">
      {BRAND_PRINCIPLES.map((p, i) => {
        const value = getValueById(p.valueId);
        const last = i === BRAND_PRINCIPLES.length - 1;
        return (
          <li
            key={p.id}
            className={`grid grid-cols-12 gap-4 md:gap-8 items-start py-6 md:py-7 ${
              last ? "" : "border-b border-[hsl(224_18%_18%)]"
            }`}
          >
            <div className="col-span-3 md:col-span-1">
              <span className="font-data text-xl md:text-3xl font-medium text-[hsl(var(--slate-50))]/25 tabular-nums">
                {p.num}
              </span>
            </div>

            <div className="col-span-9 md:col-span-3">
              <span className="block font-data text-[10px] font-medium tracking-[0.14em] uppercase text-primary mb-2">
                {value?.title ?? "—"}
              </span>
              <h3 className="font-ui font-semibold text-[hsl(var(--slate-50))] text-lg md:text-2xl tracking-tight">
                {p.name}
              </h3>
            </div>

            <div className="col-span-12 md:col-span-8 space-y-3.5">
              <p className="font-ui font-semibold text-[hsl(var(--slate-50))] text-lg md:text-xl leading-snug tracking-tight">
                {p.imperative}
              </p>
              <p className="text-[hsl(var(--slate-300))]/80 leading-relaxed text-sm md:text-base max-w-[58ch]">
                {p.essence}
              </p>
              <ul className="list-none space-y-1.5 pt-1">
                {p.apply.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[hsl(var(--slate-300))] text-sm leading-snug max-w-[60ch]"
                  >
                    <span
                      className="font-data text-[10px] text-primary mt-1.5 shrink-0"
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
  </InstrumentPanel>
);

export default DesignPrinciples;
