interface SectionEyebrowProps {
  children: React.ReactNode;
  /** Override color (defaults to primary green). On dark backgrounds
   *  pass "accent" to use the lime accent green. */
  tone?: "primary" | "accent";
  className?: string;
}

/**
 * SectionEyebrow — the signature 24px green hairline + uppercase mono
 * label that opens every section. Replaces the dot-eyebrow pattern.
 * Borrowed verbatim from the Claude-generated homepage:
 *
 *   .section-eyebrow::before {
 *     content: ""; width: 24px; height: 1px; background: green;
 *   }
 */
export const SectionEyebrow = ({
  children,
  tone = "primary",
  className = "",
}: SectionEyebrowProps) => {
  const color =
    tone === "accent"
      ? "text-[hsl(var(--rho-green-accent))]"
      : "text-primary";
  const bar =
    tone === "accent"
      ? "bg-[hsl(var(--rho-green-accent))]"
      : "bg-primary";
  return (
    <div
      className={`inline-flex items-center gap-3 font-data text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] ${color} ${className}`}
    >
      <span aria-hidden="true" className={`block h-px w-6 ${bar}`} />
      <span>{children}</span>
    </div>
  );
};

export default SectionEyebrow;
