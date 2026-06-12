interface OutcomeChipProps {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}

/**
 * OutcomeChip — small evidence block, large mono value over uppercase
 * label. Matches the case-card outcome pattern on the homepage.
 */
export const OutcomeChip = ({ value, label, className = "" }: OutcomeChipProps) => (
  <div className={`border-l-2 border-primary pl-4 ${className}`}>
    <div
      className="font-data font-medium text-foreground tabular-nums leading-none mb-2"
      style={{ fontSize: "clamp(24px, 2.4vw, 32px)", letterSpacing: "-0.02em" }}
    >
      {value}
    </div>
    <div className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground leading-snug max-w-[28ch]">
      {label}
    </div>
  </div>
);

export default OutcomeChip;
