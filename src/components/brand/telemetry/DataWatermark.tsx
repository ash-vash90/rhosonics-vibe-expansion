import { cn } from "@/lib/utils";

/**
 * DataWatermark — the giant faded data mark behind a section header.
 *
 *   Index    Brand_OS    Process
 *
 * Decorative only: pointer-events-none, aria-hidden, ~2.5% opacity.
 * One per page maximum, anchored to the page or hero header.
 */
interface DataWatermarkProps {
  text: string;
  align?: "left" | "right";
  tone?: "light" | "dark";
  /** Size/position overrides; defaults to text-[120px] → [220px] at -top-4 */
  className?: string;
}

export const DataWatermark = ({ text, align = "right", tone = "light", className }: DataWatermarkProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none select-none absolute -top-4 font-data font-black uppercase leading-none",
      align === "right" ? "right-0" : "left-0",
      tone === "dark" ? "text-white/[0.025]" : "text-foreground/[0.025]",
      "text-[120px] md:text-[180px] lg:text-[220px]",
      className,
    )}
  >
    {text}
  </div>
);

export default DataWatermark;
