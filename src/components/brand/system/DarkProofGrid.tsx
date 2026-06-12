export interface ProofStat {
  value: React.ReactNode;
  /** Optional small suffix (e.g. "+", "yrs", "%") rendered in slate-400 unless suffixAccent. */
  suffix?: string;
  suffixAccent?: boolean;
  label: React.ReactNode;
}

interface DarkProofGridProps {
  stats: ProofStat[];
  /** Eyebrow rendered above the grid (optional). */
  eyebrow?: string;
  className?: string;
}

/**
 * DarkProofGrid — obsidian stat strip with vertical hairlines.
 * Borrowed from the homepage hero-proof: mono 32px numerals,
 * small uppercase label, slate-400 unit suffixes, optional accent.
 */
export const DarkProofGrid = ({ stats, eyebrow, className = "" }: DarkProofGridProps) => (
  <section
    aria-label={typeof eyebrow === "string" ? eyebrow : "Proof"}
    className={`relative bg-foreground text-background overflow-hidden ${className}`}
    style={{ boxShadow: "var(--shadow-elevated)" }}
  >
    {/* faint top accent line */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    <div className="px-6 md:px-10 py-8 md:py-10">
      {eyebrow && (
        <div className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--slate-500))] mb-6">
          {eyebrow}
        </div>
      )}
      <dl
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`px-6 first:pl-0 last:pr-0 ${
              i > 0 ? "border-l border-[hsl(224_18%_16%)]" : ""
            }`}
          >
            <dd
              className="font-data font-medium text-[hsl(var(--slate-50))] tabular-nums leading-none mb-2 flex items-baseline gap-1"
              style={{ fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.02em" }}
            >
              <span>{s.value}</span>
              {s.suffix && (
                <span
                  className={`text-[0.55em] ${
                    s.suffixAccent ? "text-primary" : "text-[hsl(var(--slate-400))]"
                  }`}
                >
                  {s.suffix}
                </span>
              )}
            </dd>
            <dt className="font-data text-[10px] font-medium uppercase tracking-[0.12em] text-[hsl(var(--slate-400))] leading-[1.4]">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default DarkProofGrid;
