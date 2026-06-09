import { cn } from "@/lib/utils";

/**
 * CaseStudyTriad — three-panel case study composition.
 *
 * Synthesises the Phase 1/2 primitives (ImpactBar · FieldNote · macro
 * photography) into a single repeatable case-summary block. Used at the
 * bottom of long product/industry pages and as a grid item on the proof
 * index.
 *
 *   ┌──────────────┬───────────────┬──────────────┐
 *   │  MACRO PHOTO │  IMPACT STAT  │  FIELD QUOTE │
 *   │  (medium)    │  (number+src) │  (one line)  │
 *   │              │               │              │
 *   └──────────────┴───────────────┴──────────────┘
 *
 * No CTA. No marketing line. Three pieces of evidence, side-by-side.
 */

export interface CaseStudyTriadProps {
  industry: string;
  site: string;
  year: string;
  image: string;
  imageAlt: string;
  metric: string;
  metricLabel: string;
  metricSource: string;
  quote: string;
  attribution: string;
  className?: string;
}

export const CaseStudyTriad = ({
  industry,
  site,
  year,
  image,
  imageAlt,
  metric,
  metricLabel,
  metricSource,
  quote,
  attribution,
  className,
}: CaseStudyTriadProps) => {
  return (
    <article
      aria-label={`${industry} case study at ${site}`}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-px rounded overflow-hidden bg-[hsl(var(--slate-200))]",
        className,
      )}
    >
      {/* Header strip across all three (visually unified) */}
      <header className="md:col-span-3 bg-rho-obsidian text-slate-100 px-5 md:px-7 py-3 flex items-center gap-4">
        <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">
          {industry}
        </span>
        <span className="text-slate-100/30">·</span>
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-slate-300">
          {site}
        </span>
        <span className="text-slate-100/30">·</span>
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-slate-400 ml-auto">
          {year}
        </span>
      </header>

      {/* Panel 1 — macro photo of the medium */}
      <div className="relative aspect-[4/3] md:aspect-auto bg-[hsl(var(--slate-100))] overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-rho-obsidian/30 via-transparent to-transparent"
        />
        <span className="absolute bottom-3 left-3 font-data text-[10px] uppercase tracking-[0.25em] text-slate-100 bg-rho-obsidian/70 px-2 py-1 rounded-sm">
          Medium · field capture
        </span>
      </div>

      {/* Panel 2 — impact stat */}
      <div className="bg-background p-6 md:p-7 flex flex-col gap-3 justify-center">
        <span className="font-data font-bold uppercase leading-none text-5xl md:text-6xl text-foreground">
          {metric}
        </span>
        <span className="font-ui text-sm md:text-base text-foreground/80 leading-snug max-w-[24ch]">
          {metricLabel}
        </span>
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
          src · {metricSource}
        </span>
      </div>

      {/* Panel 3 — field quote */}
      <figure className="relative bg-[hsl(var(--slate-100))] p-6 md:p-7 flex flex-col gap-4 justify-center">
        <span
          aria-hidden
          className="absolute left-0 top-6 bottom-6 w-0.5 bg-primary"
        />
        <blockquote className="font-ui italic text-base md:text-lg leading-relaxed text-foreground max-w-[34ch]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {attribution}
        </figcaption>
      </figure>
    </article>
  );
};

export default CaseStudyTriad;
