import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky-visual capability section.
 * Left column sticks while right column scrolls through 2–4 capability blocks.
 * Mirrors customer.io's "Meet your Agent" pattern, tuned for HMI mocks.
 */
export interface CapabilityBlock {
  title: string;
  body: string;
  meta?: string;
}

interface Props {
  eyebrow?: string;
  heading: string;
  intro?: string;
  visual: ReactNode;
  blocks: CapabilityBlock[];
  className?: string;
}

export const PinnedCapability = ({ eyebrow, heading, intro, visual, blocks, className }: Props) => (
  <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", className)}>
    {/* Sticky visual column */}
    <div className="lg:sticky lg:top-24">
      {eyebrow && (
        <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">{eyebrow}</div>
      )}
      <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl mb-4">
        {heading}
      </h2>
      {intro && <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-md">{intro}</p>}
      <div className="relative">{visual}</div>
    </div>

    {/* Scrolling blocks */}
    <div className="space-y-10 md:space-y-14">
      {blocks.map((b, i) => (
        <article key={b.title} className="relative pt-8 border-t border-border first:border-t-0 first:pt-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {b.meta && <span className="font-data text-[10px] uppercase tracking-[0.25em] text-primary">{b.meta}</span>}
          </div>
          <h3 className="font-ui font-semibold text-foreground text-xl md:text-2xl mb-3 tracking-tight">{b.title}</h3>
          <p className="text-foreground/75 text-base leading-relaxed max-w-prose">{b.body}</p>
        </article>
      ))}
    </div>
  </div>
);

export default PinnedCapability;
