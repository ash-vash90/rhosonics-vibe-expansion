import { INDUSTRY_VALUE_MAPPING, getValueById } from "@/data/brand-values";

/**
 * IndustriesICP — five industries × scaffolded ICPs. Light cards with
 * a green top bar (active) or muted top bar (pending), per the
 * selected v2 console-grid direction.
 */

interface IndustryCard {
  id: string;
  num: string;
  name: string;
  scope: string;
  icps: string[];
  status: "active" | "pending";
}

const INDUSTRIES: IndustryCard[] = [
  {
    id: "minerals",
    num: "01",
    name: "Minerals Processing",
    scope: "Concentrators, tailings, hydrocyclone feeds.",
    icps: ["Process metallurgist", "Plant control engineer"],
    status: "active",
  },
  {
    id: "semiconductor",
    num: "02",
    name: "Semiconductor",
    scope: "Slurry delivery, CMP, ultrapure chemistry.",
    icps: ["Fab process engineer", "Slurry supply lead"],
    status: "active",
  },
  {
    id: "dredging",
    num: "03",
    name: "Dredging & Marine",
    scope: "Hopper density, pipeline transport, beach reclamation.",
    icps: ["Dredge master", "Production engineer"],
    status: "active",
  },
  {
    id: "wastewater",
    num: "04",
    name: "Wastewater",
    scope: "Sludge dewatering, digester loading, return-activated lines.",
    icps: ["Plant operations manager", "Process control specialist"],
    status: "pending",
  },
  {
    id: "mining",
    num: "05",
    name: "Mining",
    scope: "Underground paste-fill, surface tailings, slurry pipelines.",
    icps: ["Backfill engineer", "Tailings supervisor"],
    status: "pending",
  },
];

export const IndustriesICP = () => (
  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {INDUSTRIES.map((ind) => {
        const valueId =
          INDUSTRY_VALUE_MAPPING[ind.id as keyof typeof INDUSTRY_VALUE_MAPPING];
        const value = getValueById(valueId);
        const accent = ind.status === "active" ? "bg-primary" : "bg-border";
        return (
          <article
            key={ind.id}
            className="bg-card rounded-[4px] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className={`h-1 ${accent}`} />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-data text-[10px] tracking-[0.25em] text-muted-foreground">
                  {ind.num}
                </span>
                {value && (
                  <span className="font-data text-[10px] tracking-[0.2em] uppercase text-primary">
                    {value.title}
                  </span>
                )}
              </div>
              <h3 className="font-ui font-semibold text-foreground tracking-tight text-base md:text-lg leading-tight mb-2">
                {ind.name}
              </h3>
              <p className="text-foreground/65 leading-relaxed text-xs md:text-sm mb-5">
                {ind.scope}
              </p>

              <div className="mt-auto pt-4 border-t border-border/70">
                <span className="block font-data text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                  Primary ICP
                </span>
                <ul className="space-y-1 list-none">
                  {ind.icps.map((role, i) => (
                    <li
                      key={i}
                      className="text-xs md:text-sm text-foreground/85 leading-snug"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
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
