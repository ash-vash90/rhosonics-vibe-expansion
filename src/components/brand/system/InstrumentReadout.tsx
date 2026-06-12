interface InstrumentReadoutProps {
  label: string;
  value: React.ReactNode;
  unit?: string;
  delta?: string;
}

/**
 * InstrumentReadout — single labelled value cell inside an
 * InstrumentPanel. Mono numerals, uppercase unit, optional delta
 * line. Matches the SDM ECO readout pattern.
 */
export const InstrumentReadout = ({
  label,
  value,
  unit,
  delta,
}: InstrumentReadoutProps) => (
  <div className="relative border border-[hsl(224_18%_18%)] bg-[hsl(224_22%_7%)] px-5 py-4">
    <div className="font-data text-[10px] font-medium uppercase tracking-[0.12em] text-[hsl(var(--slate-400))] mb-2.5">
      {label}
    </div>
    <div className="flex items-baseline gap-2">
      <span
        className="font-data font-medium text-[hsl(var(--slate-50))] tabular-nums leading-none"
        style={{ fontSize: "clamp(28px, 3.4vw, 40px)", letterSpacing: "-0.02em" }}
      >
        {value}
      </span>
      {unit && (
        <span className="font-data text-[12px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--slate-400))]">
          {unit}
        </span>
      )}
    </div>
    {delta && (
      <div className="mt-2 font-data text-[11px] text-primary">{delta}</div>
    )}
  </div>
);

export default InstrumentReadout;
