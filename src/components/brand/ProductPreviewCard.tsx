import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eco-tinted card framing an HMI / product mock.
 * Sits inside a SectionDefault — provides its own coloured band so it
 * carries the eco-rhythm into otherwise plain sections.
 */
interface Props {
  children: ReactNode;
  caption?: string;
  meta?: string;
  surface?: "eco" | "slate";
  className?: string;
}

export const ProductPreviewCard = ({ children, caption, meta, surface = "eco", className }: Props) => {
  const bg = surface === "eco" ? "bg-[hsl(var(--eco-surface))]" : "bg-[hsl(var(--slate-100))]";
  return (
    <figure className={cn("relative rounded-md p-6 md:p-10 lg:p-14", bg, className)}>
      <div className="relative rounded bg-card shadow-[0_20px_50px_-20px_hsl(var(--rho-obsidian)/0.25)] overflow-hidden">
        {children}
      </div>
      {(caption || meta) && (
        <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
          {caption && <span className="text-sm text-foreground/80 max-w-xl leading-relaxed">{caption}</span>}
          {meta && (
            <span className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{meta}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default ProductPreviewCard;
