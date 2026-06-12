import { ReactNode } from "react";

interface InstrumentPanelProps {
  title: string;
  live?: boolean;
  children: ReactNode;
  /** Apply the large chamfer clip (allowed on large surfaces only). */
  chamfered?: boolean;
  className?: string;
}

/**
 * InstrumentPanel — the signature dark "instrument" card. Title row
 * with LIVE indicator, hairline rule, slot for readouts/waveform.
 * Chamfered by default since this is always a large/hero surface.
 */
export const InstrumentPanel = ({
  title,
  live = true,
  children,
  chamfered = true,
  className = "",
}: InstrumentPanelProps) => (
  <div
    className={`relative flex flex-col bg-foreground text-background border border-[hsl(224_18%_20%)] p-6 md:p-7 ${className}`}
    style={{
      clipPath: chamfered ? "var(--chamfer-lg)" : undefined,
      background:
        "linear-gradient(180deg, hsl(215 25% 18%) 0%, hsl(var(--rho-obsidian)) 100%)",
    }}
  >
    <div className="flex items-center justify-between border-b border-[hsl(224_18%_18%)] pb-4 mb-5">
      <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--slate-400))]">
        {title}
      </span>
      {live && (
        <span className="inline-flex items-center gap-1.5 font-data text-[10px] font-medium uppercase tracking-[0.12em] text-primary">
          <span
            className="block h-1.5 w-1.5 rounded-full bg-primary"
            style={{ animation: "pulse 1.6s cubic-bezier(0.16,1,0.3,1) infinite" }}
          />
          Live
        </span>
      )}
    </div>
    <div className="relative flex-1">{children}</div>
  </div>
);

export default InstrumentPanel;
