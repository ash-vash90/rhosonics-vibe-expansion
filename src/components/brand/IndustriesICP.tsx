import { INDUSTRY_VALUE_MAPPING, getValueById } from "@/data/brand-values";
import { IndustryThumb } from "./IndustryThumb";
import { OperatorQuoteCard } from "./OperatorQuoteCard";
import { TabbedSwitcher, type SwitcherTab } from "./system/TabbedSwitcher";
import { OutcomeChip } from "./system/OutcomeChip";

/**
 * IndustriesICP — five industries inside a TabbedSwitcher. Active
 * tab reveals a two-column body: left = industry thumb + headline +
 * ICP roles, right = stacked outcome chips (scaffolded). Mirrors
 * the homepage ICP-switcher pattern.
 */

interface Industry {
  id: string;
  num: string;
  name: string;
  scope: string;
  headline: string;
  icps: string[];
  outcomes: { value: string; label: string }[];
  status: "active" | "pending";
}

const INDUSTRIES: Industry[] = [
  {
    id: "minerals",
    num: "01",
    name: "Minerals",
    scope: "Concentrators · tailings",
    headline: "Density on the pipe that feeds the concentrator.",
    icps: ["Process metallurgist", "Plant control engineer"],
    outcomes: [
      { value: "±0.1%", label: "Density accuracy, drift-free" },
      { value: "0", label: "Radioactive sources required" },
    ],
    status: "active",
  },
  {
    id: "dredging",
    num: "02",
    name: "Dredging",
    scope: "Hopper · pipeline",
    headline: "Cycle-time math on the hopper, not in the spreadsheet.",
    icps: ["Dredge master", "Production engineer"],
    outcomes: [
      { value: "+18%", label: "Payload per cycle (pending citation)" },
      { value: "<8 min", label: "Closed-loop loading interval" },
    ],
    status: "active",
  },
  {
    id: "wastewater",
    num: "03",
    name: "Wastewater",
    scope: "Sludge · digesters",
    headline: "Solids concentration that polymer dose can follow.",
    icps: ["Plant operations manager", "Process control specialist"],
    outcomes: [
      { value: "−32%", label: "Polymer consumption (pending)" },
      { value: "Live", label: "Solids %, no daily lab sample" },
    ],
    status: "pending",
  },
  {
    id: "mining",
    num: "05",
    name: "Mining",
    scope: "Paste-fill · tailings",
    headline: "Paste density at the bore, before it sets.",
    icps: ["Backfill engineer", "Tailings supervisor"],
    outcomes: [
      { value: "—", label: "Headline metric pending" },
      { value: "—", label: "Co-author with site partner" },
    ],
    status: "pending",
  },
];

const tabs: SwitcherTab[] = INDUSTRIES.map((ind) => {
  const valueId =
    INDUSTRY_VALUE_MAPPING[ind.id as keyof typeof INDUSTRY_VALUE_MAPPING];
  const value = getValueById(valueId);
  return {
    id: ind.id,
    num: ind.num,
    name: ind.name,
    sub: ind.scope,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* left: thumb + headline + ICPs */}
        <div className="p-8 md:p-10 lg:p-12 lg:border-r border-border">
          <IndustryThumb id={ind.id} />
          <div className="mt-7 flex items-center gap-3">
            <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {ind.num} · {ind.name}
            </span>
            {value && (
              <>
                <span aria-hidden="true" className="h-px w-6 bg-primary" />
                <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                  {value.title}
                </span>
              </>
            )}
          </div>
          <h3
            className="font-ui font-bold text-foreground tracking-tight mt-4 mb-5 text-balance max-w-[20ch]"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)", letterSpacing: "-0.02em" }}
          >
            {ind.headline}
          </h3>
          <div>
            <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
              Primary ICP
            </span>
            <ul className="list-none space-y-1">
              {ind.icps.map((role, i) => (
                <li key={i} className="text-sm text-foreground/85 leading-snug">
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right: outcome chips + status */}
        <div className="p-8 md:p-10 lg:p-12 bg-[hsl(var(--slate-50))] flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Outcome shape
            </span>
            <span
              className={`font-data text-[10px] font-medium uppercase tracking-[0.14em] px-2 py-1 rounded-sm ${
                ind.status === "active"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground bg-muted"
              }`}
            >
              {ind.status}
            </span>
          </div>
          <div className="space-y-6">
            {ind.outcomes.map((o, i) => (
              <OutcomeChip key={i} value={o.value} label={o.label} />
            ))}
          </div>
          <p className="mt-auto text-xs text-muted-foreground leading-relaxed max-w-[40ch]">
            Outcome numbers above are scaffolds. Final figures, sources and
            named site partners co-author with the commercial team before this
            tab ships externally.
          </p>
        </div>
      </div>
    ),
  };
});

export const IndustriesICP = () => (
  <div>
    <TabbedSwitcher tabs={tabs} ariaLabel="Industries and ICP slots" />
    <OperatorQuoteCard />
  </div>
);

export default IndustriesICP;
