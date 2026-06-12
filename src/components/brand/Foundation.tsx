import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission.
 *
 * Layout: sticky small label column (left, 3/12) + large statement +
 * two-column footer comparing "Replaces" vs "Rationale" (right, 8/12).
 * Industrial feel from disciplined hierarchy and restraint, not decoration.
 * No fake counter brackets, no dashed dividers, no terminal markers.
 * Green is reserved for the emphasis word in each statement.
 */

interface StatementBlockProps {
  label: string;
  /** The canonical statement, with one keyword wrapped in <em>…</em> for green emphasis. */
  statement: React.ReactNode;
}

const StatementBlock = ({ label, statement }: StatementBlockProps) => (
  <section className="grid grid-cols-12 gap-y-10 gap-x-8">
    <header className="col-span-12 lg:col-span-2">
      <div className="lg:sticky lg:top-24">
        <span className="block font-data text-[11px] tracking-[0.28em] uppercase text-muted-foreground font-medium">
          Foundation
        </span>
        <h3
          className="font-ui font-semibold text-foreground tracking-[-0.03em] mt-5 leading-[0.95]"
          style={{ fontSize: "clamp(2rem, 2.6vw, 2.75rem)" }}
        >
          {label}
        </h3>
      </div>
    </header>

    <div className="col-span-12 lg:col-start-4 lg:col-span-9">
      <p
        className="font-ui font-medium tracking-[-0.02em] text-foreground leading-[1.08]
                   [&_em]:not-italic [&_em]:text-primary"
        style={{ fontSize: "clamp(1.875rem, 3.4vw, 3rem)" }}
      >
        {statement}
      </p>
    </div>
  </section>
);

/**
 * Wrap a single keyword in the canonical statement with green emphasis,
 * without altering the source-of-truth string in brand-values.ts.
 */
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
  <div className="py-16 md:py-24 space-y-32 md:space-y-40">
    <StatementBlock
      label="Vision"
      statement={emphasize(BRAND_VISION, "measured")}
    />
    <StatementBlock
      label="Mission"
      statement={emphasize(BRAND_MISSION, "automated")}
    />
  </div>
);

export default Foundation;
