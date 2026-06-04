import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Large stat callout — JetBrains Mono number, Instrument Sans label.
 * Evidence-first: always pair with a source citation when available.
 */
interface StatProps {
  value: string;
  label: string;
  source?: string;
  emphasis?: "default" | "primary";
  className?: string;
}

export const StatCallout = ({ value, label, source, emphasis = "default", className }: StatProps) => {
  const colour = emphasis === "primary" ? "text-primary" : "text-foreground";
  return (
    <div className={cn("flex flex-col gap-2 min-w-0 overflow-hidden", className)}>
      <span className={cn("font-data font-bold uppercase leading-none text-3xl md:text-4xl xl:text-5xl whitespace-nowrap", colour)}>
        {value}
      </span>
      <span className="text-sm md:text-base text-foreground/80 leading-snug max-w-[26ch]">{label}</span>
      {source && (
        <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
          src · {source}
        </span>
      )}
    </div>
  );
};

interface RowProps {
  children: ReactNode;
  className?: string;
}

export const StatCalloutRow = ({ children, className }: RowProps) => (
  <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12", className)}>{children}</div>
);

export default StatCallout;
