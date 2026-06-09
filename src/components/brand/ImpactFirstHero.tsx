import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ImpactFirstHero — case-study / page hero where the outcome leads.
 *
 * Pattern borrowed from FLSmidth and Metso case pages: the very first
 * thing the reader sees is the measured outcome (a single oversized
 * number), framed by the problem it solved. Headline is supporting, not
 * leading. Source citation is mandatory.
 *
 *   ┌────────────────────────────────────────────────────────────┐
 *   │ EYEBROW · INDUSTRY · YEAR                                  │
 *   │                                                            │
 *   │   −14%               Tailings water loss, after            │
 *   │                      18 months of SDM Eco operation        │
 *   │   src · plant ops    at a Chilean copper concentrator.     │
 *   │                                                            │
 *   │   Problem framing line sits underneath, one sentence,      │
 *   │   evidence-led, never marketing.                           │
 *   └────────────────────────────────────────────────────────────┘
 */

interface ImpactFirstHeroProps {
  eyebrow: string;
  metric: string; // e.g. "−14%"
  metricSource: string; // e.g. "plant ops · 18 mo"
  outcome: string; // sentence that completes the metric
  problem: string; // one-line problem framing under the metric
  aside?: ReactNode; // optional supplemental block (image, mini stat)
  surface?: "default" | "obsidian";
  className?: string;
}

export const ImpactFirstHero = ({
  eyebrow,
  metric,
  metricSource,
  outcome,
  problem,
  aside,
  surface = "default",
  className,
}: ImpactFirstHeroProps) => {
  const isDark = surface === "obsidian";
  return (
    <section
      aria-label="Impact-first case hero"
      className={cn(
        "relative py-14 md:py-20",
        isDark ? "bg-rho-obsidian text-slate-100" : "bg-background text-foreground",
        className,
      )}
    >
      <div
        className={cn(
          "font-data text-[11px] uppercase tracking-[0.3em] mb-10 md:mb-14",
          isDark ? "text-slate-300" : "text-primary",
        )}
      >
        {eyebrow}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Metric column — front and center */}
        <div className="lg:col-span-7">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div
              className={cn(
                "font-data font-bold uppercase leading-[0.85] tracking-tight",
                "text-7xl md:text-8xl lg:text-9xl",
                isDark ? "text-slate-100" : "text-foreground",
              )}
            >
              {metric}
            </div>
            <p
              className={cn(
                "font-ui text-lg md:text-xl leading-snug max-w-[28ch]",
                isDark ? "text-slate-200" : "text-foreground/85",
              )}
            >
              {outcome}
            </p>
          </div>

          <div
            className={cn(
              "font-data text-[10px] uppercase tracking-[0.25em] mt-5",
              isDark ? "text-slate-400" : "text-muted-foreground",
            )}
          >
            src · {metricSource}
          </div>

          <div
            className={cn(
              "mt-10 pt-6 max-w-[55ch] border-t",
              isDark ? "border-slate-100/10" : "border-border",
            )}
          >
            <p
              className={cn(
                "font-ui text-base md:text-lg leading-relaxed",
                isDark ? "text-slate-300" : "text-muted-foreground",
              )}
            >
              {problem}
            </p>
          </div>
        </div>

        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
};

export default ImpactFirstHero;
