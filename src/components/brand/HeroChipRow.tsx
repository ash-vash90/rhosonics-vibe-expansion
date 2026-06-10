import { Check } from "@/lib/icons";

interface HeroChipRowProps {
  chips: string[];
}

/**
 * HeroChipRow — borrowed from customer.io's hero confirmation row
 * ("✓ 14-day free trial · ✓ No credit card …"). Used under the
 * PageBanner subtitle to surface the chapter scope as scannable facts.
 */
export const HeroChipRow = ({ chips }: HeroChipRowProps) => (
  <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none">
    {chips.map((chip) => (
      <li
        key={chip}
        className="inline-flex items-center gap-2 text-xs md:text-sm text-foreground/80"
      >
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary"
        >
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
        <span className="font-data tracking-[0.05em] uppercase text-[11px] md:text-xs">
          {chip}
        </span>
      </li>
    ))}
  </ul>
);

export default HeroChipRow;
