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
  previously: string;
  meaning: string;
}

const StatementBlock = ({
  label,
  statement,
  previously,
  meaning,
}: StatementBlockProps) => (
  <section className="grid grid-cols-12 gap-y-10 gap-x-8">
    <header className="col-span-12 lg:col-span-3">
      <div className="lg:sticky lg:top-24">
        <span className="block font-data text-[11px] tracking-[0.28em] uppercase text-muted-foreground font-medium">
          Foundation
        </span>
        <h3
          className="font-ui font-semibold text-foreground tracking-[-0.04em] mt-6 leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 5.5vw, 5.25rem)" }}
        >
          {label}
        </h3>
      </div>
    </header>

    <div className="col-span-12 lg:col-start-5 lg:col-span-8">
      <p
        className="font-ui font-medium tracking-[-0.025em] text-foreground leading-[1.02]
                   [&_em]:not-italic [&_em]:text-primary"
        style={{ fontSize: "clamp(2.5rem, 4.8vw, 4.25rem)" }}
      >
        {statement}
      </p>

      <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        <div className="space-y-5">
          <span className="block font-data text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
            Replaces
          </span>
          <p className="font-ui text-lg md:text-xl text-muted-foreground italic leading-[1.45] max-w-[38ch]">
            &ldquo;{previously}&rdquo;
          </p>
        </div>
        <div className="space-y-5">
          <span className="block font-data text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
            Rationale
          </span>
          <p className="font-ui text-base md:text-[17px] text-foreground/80 leading-[1.65] max-w-[54ch]">
            {meaning}
          </p>
        </div>
      </div>
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
  <div className="px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto py-20 md:py-28 space-y-32 md:space-y-40">
    <StatementBlock
      label="Vision"
      statement={emphasize(BRAND_VISION, "measured")}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized."
    />
    <StatementBlock
      label="Mission"
      statement={emphasize(BRAND_MISSION, "automated")}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
    />
  </div>
);

export default Foundation;
