import { TelemetryEyebrow } from "@/components/brand/telemetry";
import { X } from "@/lib/icons";

/**
 * Additional Don'ts — Herman Miller's catch-all rule block at the end of
 * every chapter. Short, numbered, testable. Lives alongside DecisionQuestions.
 */

interface AdditionalDontsProps {
  code: string;
  items: string[];
  className?: string;
}

export const AdditionalDonts = ({ code, items, className = "" }: AdditionalDontsProps) => (
  <section aria-labelledby={`ad-${code}`} className={className}>
    <TelemetryEyebrow className="mb-3" code={code} label="Additional Don'ts" />
    <h3 id={`ad-${code}`} className="font-ui text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
      The catch-all rules.
    </h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-3 text-foreground/85 leading-relaxed"
        >
          <span
            className="shrink-0 w-5 h-5 mt-0.5 rounded-sm bg-[hsl(var(--slate-100))] flex items-center justify-center"
            aria-hidden
          >
            <X className="w-3 h-3 text-foreground/70" />
          </span>
          <span className="font-ui text-sm md:text-base">
            <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mr-2">
              D{String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default AdditionalDonts;
