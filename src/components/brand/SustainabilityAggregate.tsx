import { cn } from "@/lib/utils";

/**
 * SustainabilityAggregate — fleet-wide ESG roll-up panel.
 *
 * Metso-pattern: a single dark band that aggregates measured environmental
 * outcomes across the installed base, with mandatory sample-size and
 * methodology footnotes. Sits on the proof page, never on a product page
 * — fleet claims belong to the company, not the SKU.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  2.3 GWh/yr    18,400 m³/yr    14,200 t CO₂e   312 sites     │
 *   │  ENERGY SAVED  WATER RECLAIMED AVOIDED         IN SCOPE      │
 *   └──────────────────────────────────────────────────────────────┘
 *   Methodology: rolling 12-mo, plant-reported, third-party verified.
 */

export interface SustainabilityMetric {
  value: string;
  unit: string;
  label: string;
}

interface SustainabilityAggregateProps {
  metrics: SustainabilityMetric[]; // 3 or 4
  scope: string; // e.g. "312 plant sites · 18 countries"
  asOf: string; // e.g. "FY2024"
  methodology: string;
  verifier?: string;
  className?: string;
}

const bleed =
  "-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20";

export const SustainabilityAggregate = ({
  metrics,
  scope,
  asOf,
  methodology,
  verifier,
  className,
}: SustainabilityAggregateProps) => {
  return (
    <section
      aria-label="Fleet-wide sustainability outcomes"
      className={cn(
        "relative bg-rho-obsidian text-slate-100 py-12 md:py-16",
        bleed,
        className,
      )}
    >
      <header className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-10 md:mb-12">
        <span className="font-data text-[11px] uppercase tracking-[0.3em] text-primary">
          Fleet aggregate · {asOf}
        </span>
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-slate-300">
          Scope · {scope}
        </span>
      </header>

      <dl
        className={cn(
          "grid grid-cols-2 gap-y-8",
          metrics.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {metrics.map((m, i) => (
          <div
            key={`${m.label}-${i}`}
            className={cn(
              "relative flex flex-col gap-2 min-w-0 md:px-7 first:md:pl-0",
            )}
          >
            {i > 0 && (
              <span
                aria-hidden
                className="hidden md:block absolute left-0 top-1 bottom-1 w-px bg-slate-100/10"
              />
            )}
            <dd className="font-data font-bold uppercase leading-none text-4xl md:text-5xl xl:text-6xl tracking-tight whitespace-nowrap">
              {m.value}
              <span className="font-data text-base md:text-lg ml-2 text-slate-300">
                {m.unit}
              </span>
            </dd>
            <dt className="font-ui text-sm text-slate-300 leading-snug max-w-[22ch]">
              {m.label}
            </dt>
          </div>
        ))}
      </dl>

      <footer className="mt-10 md:mt-12 pt-5 border-t border-slate-100/10 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-slate-400">
          Method
        </span>
        <p className="font-ui text-sm text-slate-300 leading-relaxed max-w-[65ch]">
          {methodology}
        </p>
        {verifier && (
          <span className="font-data text-[10px] uppercase tracking-[0.25em] text-slate-400 md:ml-auto whitespace-nowrap">
            verified · {verifier}
          </span>
        )}
      </footer>
    </section>
  );
};

export default SustainabilityAggregate;
