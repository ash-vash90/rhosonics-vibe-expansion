import { cn } from "@/lib/utils";

/**
 * FactFile — standardized metadata strip for case / application pages.
 *
 * 4-cell horizontal strip (Industry · Medium · Technology · Site by
 * convention). JetBrains Mono caps labels, Instrument Sans values.
 * Separation by background (slate-200 grid gap → slate-100 cells), never
 * borders — see design-principle-separation-spec.
 *
 * Responsive: 4 cols desktop, 2 cols tablet/mobile. Never collapses to 1
 * column — preserves the "fact file" density.
 */

export interface FactFileItem {
  label: string;
  value: string;
}

interface FactFileProps {
  items: FactFileItem[]; // typically 4
  className?: string;
  ariaLabel?: string;
}

export const FactFile = ({
  items,
  className,
  ariaLabel = "Project fact file",
}: FactFileProps) => {
  return (
    <dl
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-px rounded bg-[hsl(var(--slate-200))] overflow-hidden",
        className,
      )}
    >
      {items.map((it, i) => (
        <div
          key={`${it.label}-${i}`}
          className="flex flex-col gap-2 bg-[hsl(var(--slate-100))] px-5 py-4 md:px-6 md:py-5"
        >
          <dt className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {it.label}
          </dt>
          <dd className="font-ui text-sm md:text-base text-foreground leading-snug">
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default FactFile;
