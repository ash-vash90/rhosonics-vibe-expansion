import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Six section rhythm primitives. Pages compose by alternating variants —
 * never place two adjacent sections sharing the same variant.
 *
 * Variants:
 *   - default      : white surface, standard density
 *   - tinted       : slate-50 band
 *   - eco          : eco-surface (light green) band
 *   - dark         : obsidian band, light foreground
 *   - split        : 60/40 asymmetric two-column scaffold
 *   - fullBleedMock: tinted band built to frame a wide product mock
 *
 * All variants share the same vertical rhythm tokens; only surface differs.
 */

type Variant = "default" | "tinted" | "eco" | "dark" | "split" | "fullBleedMock";

type Density = "compact" | "standard" | "spacious";

const padY: Record<Density, string> = {
  compact: "py-10 md:py-14",
  standard: "py-16 md:py-24",
  spacious: "py-24 md:py-32",
};

const bleed = "-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20";

interface BaseProps {
  children: ReactNode;
  className?: string;
  density?: Density;
  id?: string;
  ariaLabel?: string;
}

const surface: Record<Exclude<Variant, "split">, string> = {
  default: "bg-background",
  tinted: `relative bg-[hsl(var(--slate-100))] ${bleed}`,
  eco: `relative bg-[hsl(var(--eco-surface))] ${bleed}`,
  dark: `relative bg-rho-obsidian text-slate-100 ${bleed}`,
  fullBleedMock: `relative bg-[hsl(var(--eco-surface))] ${bleed} overflow-hidden`,
};

export const SectionDefault = ({ children, className, density = "standard", id, ariaLabel }: BaseProps) => (
  <section id={id} aria-label={ariaLabel} data-section-variant="default" className={cn(surface.default, padY[density], className)}>
    {children}
  </section>
);

export const SectionTinted = ({ children, className, density = "standard", id, ariaLabel }: BaseProps) => (
  <section id={id} aria-label={ariaLabel} data-section-variant="tinted" className={cn(surface.tinted, padY[density], className)}>
    {children}
  </section>
);

export const SectionEco = ({ children, className, density = "standard", id, ariaLabel }: BaseProps) => (
  <section id={id} aria-label={ariaLabel} data-section-variant="eco" className={cn(surface.eco, padY[density], className)}>
    {children}
  </section>
);

export const SectionDark = ({ children, className, density = "standard", id, ariaLabel }: BaseProps) => (
  <section id={id} aria-label={ariaLabel} data-section-variant="dark" className={cn(surface.dark, padY[density], className)}>
    {children}
  </section>
);

interface SplitProps extends BaseProps {
  left: ReactNode;
  right: ReactNode;
  /** When true, the left column becomes position:sticky on lg+ */
  stickyLeft?: boolean;
  /** Reverse the ratio so the right column dominates */
  reverse?: boolean;
}

export const SectionSplit = ({
  left,
  right,
  className,
  density = "standard",
  id,
  ariaLabel,
  stickyLeft = false,
  reverse = false,
}: SplitProps) => (
  <section
    id={id}
    aria-label={ariaLabel}
    data-section-variant="split"
    className={cn(surface.default, padY[density], className)}
  >
    <div className={cn("grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start")}>
      <div className={cn(reverse ? "lg:col-span-2 lg:order-2" : "lg:col-span-3", stickyLeft && "lg:sticky lg:top-24")}>
        {left}
      </div>
      <div className={cn(reverse ? "lg:col-span-3 lg:order-1" : "lg:col-span-2")}>{right}</div>
    </div>
  </section>
);

interface FullBleedProps extends BaseProps {
  eyebrow?: string;
  title: string;
  caption?: string;
  mock: ReactNode;
}

export const SectionFullBleedMock = ({
  eyebrow,
  title,
  caption,
  mock,
  className,
  density = "spacious",
  id,
  ariaLabel,
}: FullBleedProps) => (
  <section
    id={id}
    aria-label={ariaLabel}
    data-section-variant="fullBleedMock"
    className={cn(surface.fullBleedMock, padY[density], className)}
  >
    <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 px-2">
      {eyebrow && (
        <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary-700 mb-4">{eyebrow}</div>
      )}
      <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl mb-4">
        {title}
      </h2>
      {caption && <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{caption}</p>}
    </div>
    <div className="relative max-w-6xl mx-auto">{mock}</div>
  </section>
);

/**
 * Dev-only helper — warns when two adjacent sections share the same variant.
 * Run from a page-level useEffect during development.
 */
export const assertSectionRhythm = (root: HTMLElement | null) => {
  if (!root || import.meta.env.PROD) return;
  const sections = root.querySelectorAll<HTMLElement>("[data-section-variant]");
  let prev: string | null = null;
  sections.forEach((el) => {
    const v = el.dataset.sectionVariant ?? null;
    if (v && v === prev) {
       
      console.warn("[section-rhythm] Adjacent sections share variant:", v, el);
    }
    prev = v;
  });
};
