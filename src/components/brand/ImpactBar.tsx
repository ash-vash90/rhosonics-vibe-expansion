import { useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * ImpactBar — case-study header strip.
 *
 * 3–4 ROI stats in a single full-bleed horizontal band. JetBrains Mono
 * numerals, Instrument Sans labels. Two surfaces:
 *   - "obsidian" : dark band, for financial / operational outcomes
 *   - "eco"      : light green band, for sustainability outcomes only
 *
 * Source citation is strongly recommended per stat-callout-spec — dev-mode
 * warns when missing. Pure presentational. No business logic.
 */

export interface ImpactStat {
  value: string;
  label: string;
  source?: string;
}

interface ImpactBarProps {
  stats: ImpactStat[]; // 3 or 4
  surface?: "obsidian" | "eco";
  eyebrow?: string;
  className?: string;
  ariaLabel?: string;
}

const bleed =
  "-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20";

export const ImpactBar = ({
  stats,
  surface = "obsidian",
  eyebrow,
  className,
  ariaLabel = "Outcome impact bar",
}: ImpactBarProps) => {
  useEffect(() => {
    if (import.meta.env.PROD) return;
    if (stats.length < 3 || stats.length > 4) {
       
      console.warn("[ImpactBar] expects 3–4 stats, received", stats.length);
    }
    const missing = stats.filter((s) => !s.source).length;
    if (missing > 0) {
       
      console.warn(
        `[ImpactBar] ${missing} stat(s) missing source citation — evidence-over-claims requires sourcing.`,
      );
    }
  }, [stats]);

  const isDark = surface === "obsidian";
  const surfaceClass = isDark
    ? "bg-rho-obsidian text-slate-100"
    : "bg-[hsl(var(--eco-surface))] text-foreground";
  const eyebrowClass = isDark ? "text-slate-300" : "text-primary-700";
  const labelClass = isDark ? "text-slate-300" : "text-foreground/80";
  const sourceClass = isDark ? "text-slate-400" : "text-muted-foreground";
  const dividerClass = isDark ? "bg-slate-100/10" : "bg-foreground/10";

  return (
    <aside
      role="region"
      aria-label={ariaLabel}
      className={cn("relative py-10 md:py-14", bleed, surfaceClass, className)}
    >
      {eyebrow && (
        <div
          className={cn(
            "font-data text-[11px] uppercase tracking-[0.3em] mb-6 md:mb-8",
            eyebrowClass,
          )}
        >
          {eyebrow}
        </div>
      )}

      <dl
        className={cn(
          "grid gap-6 md:gap-0 grid-cols-2",
          stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {stats.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className={cn(
              "relative flex flex-col gap-2 min-w-0 md:px-6 lg:px-8 first:md:pl-0",
              i > 0 &&
                `md:before:absolute md:before:left-0 md:before:top-1 md:before:bottom-1 md:before:w-px md:before:content-[''] md:before:${dividerClass}`,
            )}
          >
            {/* Explicit divider element — avoids dynamic-class purge on the before pseudo */}
            {i > 0 && (
              <span
                aria-hidden
                className={cn(
                  "hidden md:block absolute left-0 top-1 bottom-1 w-px",
                  dividerClass,
                )}
              />
            )}
            <dd
              className={cn(
                "font-data font-bold uppercase leading-none whitespace-nowrap text-3xl md:text-4xl xl:text-5xl",
              )}
            >
              {s.value}
            </dd>
            <dt
              className={cn(
                "font-ui text-sm md:text-base leading-snug max-w-[26ch]",
                labelClass,
              )}
            >
              {s.label}
            </dt>
            {s.source && (
              <span
                className={cn(
                  "font-data text-[10px] uppercase tracking-[0.2em] mt-1",
                  sourceClass,
                )}
              >
                src · {s.source}
              </span>
            )}
          </div>
        ))}
      </dl>
    </aside>
  );
};

export default ImpactBar;
