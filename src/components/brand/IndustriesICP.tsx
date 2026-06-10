import { BRAND_VALUES, INDUSTRY_VALUE_MAPPING, getValueById } from "@/data/brand-values";

/**
 * IndustriesICP — the audiences this brand actually serves.
 *
 * Five industries, each grounded in one canonical value via
 * INDUSTRY_VALUE_MAPPING. ICP slots are deliberately placeholder —
 * leadership has not approved the operator profiles yet, but the
 * page reserves the structure so they slot in without redesign.
 */

interface IndustryCard {
  id: string;
  num: string;
  name: string;
  scope: string;
  /** Placeholder until ICPs are approved. */
  icps: string[];
}

const INDUSTRIES: IndustryCard[] = [
  {
    id: "minerals",
    num: "01",
    name: "Minerals Processing",
    scope: "Concentrators, tailings, hydrocyclone feeds.",
    icps: ["Process metallurgist", "Plant control engineer"],
  },
  {
    id: "semiconductor",
    num: "02",
    name: "Semiconductor",
    scope: "Slurry delivery, CMP, ultrapure chemistry.",
    icps: ["Fab process engineer", "Slurry supply lead"],
  },
  {
    id: "dredging",
    num: "03",
    name: "Dredging & Marine",
    scope: "Hopper density, pipeline transport, beach reclamation.",
    icps: ["Dredge master", "Production engineer"],
  },
  {
    id: "wastewater",
    num: "04",
    name: "Wastewater",
    scope: "Sludge dewatering, digester loading, return-activated lines.",
    icps: ["Plant operations manager", "Process control specialist"],
  },
  {
    id: "mining",
    num: "05",
    name: "Mining",
    scope: "Underground paste-fill, surface tailings, slurry pipelines.",
    icps: ["Backfill engineer", "Tailings supervisor"],
  },
];

export const IndustriesICP = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {INDUSTRIES.map((ind) => {
        const valueId = INDUSTRY_VALUE_MAPPING[ind.id as keyof typeof INDUSTRY_VALUE_MAPPING];
        const value = getValueById(valueId);
        return (
          <article
            key={ind.id}
            className="relative flex flex-col bg-card p-6 md:p-7 rounded-[6px] border border-border/60 transition-transform duration-300 hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Top meta row */}
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-data text-xs tracking-[0.25em] text-muted-foreground">
                {ind.num}
              </span>
              {value && (
                <span className="font-data text-[10px] tracking-[0.2em] uppercase text-primary">
                  → {value.title}
                </span>
              )}
            </div>

            <h3 className="font-ui font-semibold text-foreground tracking-tight text-xl md:text-2xl leading-tight mb-2">
              {ind.name}
            </h3>
            <p className="text-foreground/70 leading-relaxed text-sm mb-6">
              {ind.scope}
            </p>

            <div className="mt-auto pt-5 border-t border-border">
              <span className="block font-data text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Ideal Customer Profiles
              </span>
              <ul className="space-y-1.5 list-none">
                {ind.icps.map((role, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <span
                      className="font-data text-[10px] text-muted-foreground/60 mt-1.5 shrink-0"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{role}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground/70 italic">
                  <span
                    className="font-data text-[10px] text-muted-foreground/40 mt-1.5 shrink-0 not-italic"
                    aria-hidden="true"
                  >
                    ··
                  </span>
                  <span>Additional profiles pending approval.</span>
                </li>
              </ul>
            </div>
          </article>
        );
      })}
    </div>

    <p className="mt-10 md:mt-12 max-w-[60ch] text-xs md:text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
      <span className="font-data uppercase tracking-[0.2em] text-foreground/70 mr-2">
        Note ·
      </span>
      ICP roles are scaffolding. Final operator profiles, named field
      partners and decision-criteria will be co-authored with the
      commercial team before this section ships externally.
    </p>
  </div>
);

export default IndustriesICP;
