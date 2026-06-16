import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission.
 *
 * Single dark chamfered hero panel containing both canonical statements,
 * separated by a hairline divider. This is the one chamfered surface
 * the chapter earns: the thesis surface for the whole brand position.
 * Everything else on /position stays at standard 4px corners.
 *
 * Industrial feel from disciplined hierarchy + restraint, not decoration.
 * Green reserved for the single emphasis word in each statement.
 */

interface StatementRowProps {
  label: string;
  /** The canonical statement, with one keyword wrapped in <em>…</em> for green emphasis. */
  statement: React.ReactNode;
}

const StatementRow = ({ label, statement }: StatementRowProps) => (
  <div className="grid grid-cols-12 gap-y-6 gap-x-8 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-14">
    <div className="col-span-12 lg:col-span-3">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="block h-2 w-2 rounded-full bg-primary" />
        <span className="font-data text-[11px] tracking-[0.28em] uppercase text-[hsl(var(--rho-green-accent))] font-medium">
          {label}
        </span>
      </div>
    </div>

    <div className="col-span-12 lg:col-span-9">
      <p
        className="font-ui font-medium tracking-[-0.025em] text-[hsl(var(--slate-50))] leading-[1.08]
                   [&_em]:not-italic [&_em]:text-[hsl(var(--rho-green-accent))]"
        style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
      >
        {statement}
      </p>
    </div>
  </div>
);

const emphasize = (sentence: string, keyword: string): React.ReactNode => {
  const idx = sentence.indexOf(keyword);
  if (idx === -1) return sentence;
  return (
    <>
      {sentence.slice(0, idx)}
      <em>{keyword}</em>
      {sentence.slice(idx + keyword.length)}
    </>
  );
};

export const Foundation = () => (
  <div className="py-12 md:py-16">
    <div
      className="relative clip-chamfer-lg overflow-hidden"
      style={{ background: "hsl(var(--rho-obsidian))" }}
    >
      {/* Signal glow — subtle, top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 88% 12%, hsl(var(--rho-green) / 0.16), transparent 55%)",
        }}
      />

      <div className="relative divide-y divide-[hsl(224_18%_18%)]">
        <StatementRow
          label="Vision"
          statement={emphasize(BRAND_VISION, "measured")}
        />
        <StatementRow
          label="Mission"
          statement={emphasize(BRAND_MISSION, "automated")}
        />
      </div>
    </div>
  </div>
);

export default Foundation;
