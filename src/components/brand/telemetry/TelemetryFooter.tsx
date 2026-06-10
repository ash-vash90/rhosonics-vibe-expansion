import { cn } from "@/lib/utils";

/**
 * TelemetryFooter — the page-closing metadata strip.
 *
 *   STANDARD     BUILD          ORIGIN      STATUS
 *   Brand OS     Stable · 2025  Delft, NL   Active
 *
 * Every page ends with one. Convention: Section ("NN · Title"),
 * Owner ("MarComms"), Status ("Active", emphasized).
 */
export interface TelemetryFooterItem {
  label: string;
  value: string;
  /** Renders the value in primary — typically the Status item */
  emphasis?: boolean;
}

interface TelemetryFooterProps {
  items: TelemetryFooterItem[];
  tone?: "light" | "dark";
  className?: string;
}

export const TelemetryFooter = ({ items, tone = "light", className }: TelemetryFooterProps) => {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-6 border-t pt-6",
        isDark ? "border-slate-800" : "border-border",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span
            className={cn(
              "font-data text-[10px] uppercase tracking-widest",
              isDark ? "text-slate-500" : "text-muted-foreground/70",
            )}
          >
            {item.label}
          </span>
          <span
            className={cn(
              "font-data text-xs uppercase tracking-wider",
              item.emphasis ? "text-primary" : isDark ? "text-white" : "text-foreground",
            )}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TelemetryFooter;
