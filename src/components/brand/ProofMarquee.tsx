import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Continuous marquee strip for proof / logos / specs.
 * Pure CSS animation — no GSAP, keeps main thread idle.
 * Honours prefers-reduced-motion (pause).
 */
interface Props {
  items: ReactNode[];
  speedSec?: number;
  className?: string;
  ariaLabel?: string;
}

export const ProofMarquee = ({ items, speedSec = 40, className, ariaLabel = "Trusted by" }: Props) => {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("relative overflow-hidden group", className)}
      aria-label={ariaLabel}
      role="region"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
      <div
        className="flex gap-12 md:gap-16 w-max marquee-track"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {doubled.map((node, i) => (
          <div key={i} className="flex items-center text-foreground/60 hover:text-primary transition-colors shrink-0">
            {node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProofMarquee;
