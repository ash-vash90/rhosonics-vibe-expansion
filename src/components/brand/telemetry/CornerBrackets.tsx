import { cn } from "@/lib/utils";

/**
 * CornerBrackets — four bracket corners framing a chamfered panel.
 *
 * Place inside a `relative` element carrying `clip-chamfer-md/lg`.
 * The brackets restore the machined "edge" the clip-path strips
 * (chamfered elements cannot carry borders — see agents.md §4.5).
 * Only use on chamfered panels; never on rounded surfaces.
 */
interface CornerBracketsProps {
  tone?: "primary" | "muted";
  className?: string;
}

export const CornerBrackets = ({ tone = "primary", className }: CornerBracketsProps) => {
  const color = tone === "primary" ? "border-primary/40" : "border-border";
  const base = "pointer-events-none absolute w-3 h-3";

  return (
    <>
      <div aria-hidden="true" className={cn(base, "-top-px left-3 border-t border-l", color, className)} />
      <div aria-hidden="true" className={cn(base, "-top-px right-3 border-t border-r", color, className)} />
      <div aria-hidden="true" className={cn(base, "-bottom-px left-3 border-b border-l", color, className)} />
      <div aria-hidden="true" className={cn(base, "-bottom-px right-3 border-b border-r", color, className)} />
    </>
  );
};

export default CornerBrackets;
