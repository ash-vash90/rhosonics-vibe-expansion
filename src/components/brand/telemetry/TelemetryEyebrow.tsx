import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * TelemetryEyebrow — the brand's signature mono metadata row.
 *
 *   ● DIRECTORY · 12 SECTIONS · V2025
 *   GRP_01  STORY  04 ENTRIES ────────
 *
 * Replaces every hand-rolled `font-data text-[11px] uppercase
 * tracking-[0.3em]` row. One eyebrow per section header.
 */
interface TelemetryEyebrowProps {
  /** Main label, e.g. "Directory", "Field outcome" */
  label: string;
  /** Optional leading code rendered in primary, e.g. "GRP_01", "10.3" */
  code?: string;
  /** Trailing items joined by middots, e.g. ["12 Sections", "v2025"] */
  meta?: string[];
  /** Live-system pulse dot before the label */
  pulse?: boolean;
  tone?: "light" | "dark";
  className?: string;
}

export const TelemetryEyebrow = ({
  label,
  code,
  meta = [],
  pulse = false,
  tone = "light",
  className,
}: TelemetryEyebrowProps) => {
  const isDark = tone === "dark";
  const separator = isDark ? "text-slate-700" : "text-border";

  return (
    <div
      className={cn(
        "flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em]",
        isDark ? "text-slate-400" : "text-muted-foreground",
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      )}
      {code && <span className="text-primary">{code}</span>}
      <span>{label}</span>
      {meta.map((item, i) => (
        <Fragment key={i}>
          <span className={separator}>·</span>
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
};

export default TelemetryEyebrow;
