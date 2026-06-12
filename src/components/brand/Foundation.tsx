import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission as principles entries.
 * Hierarchy: chapter heading (Vision/Mission) is the dominant element,
 * the canonical statement sits beneath it marked by a green rule,
 * and the change record is a quiet two-column footer.
 * No display-wordmark, no marketing chrome.
 */

interface StatementBlockProps {
  num: string;
  title: string;
  context: string;
  statement: React.ReactNode;
  previously: string;
  meaning: string;
  last?: boolean;
}

const StatementBlock = ({
  num,
  title,
  context,
  statement,
  previously,
  meaning,
  last,
}: StatementBlockProps) => (
  <li className={`py-16 md:py-20 ${last ? "" : "border-b border-border"}`}>
    {/* Heading row — the dominant element */}
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <span className="font-data text-base md:text-lg font-medium text-primary tabular-nums">
        {num}
      </span>
      <h3
        className="font-ui font-semibold text-foreground tracking-[-0.03em] leading-none"
        style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}
      >
        {title}
      </h3>
      <span className="font-data text-[10px] font-medium tracking-[0.14em] uppercase text-muted-foreground md:ml-auto">
        {context}
      </span>
    </div>

    {/* Canonical statement — green rule marks the measured value */}
    <div className="mt-10 md:mt-12 border-l-2 border-primary pl-6 md:pl-10">
      <p
        className="font-ui font-medium text-foreground leading-[1.25] tracking-[-0.015em] max-w-[34ch]"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)" }}
      >
        {statement}
      </p>
    </div>

    {/* Change record */}
    <dl className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-border">
      <div>
        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-3">
          Previously
        </dt>
        <dd className="text-sm leading-[1.65] text-muted-foreground italic max-w-[58ch]">
          "{previously}"
        </dd>
      </div>
      <div>
        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-3">
          What changed
        </dt>
        <dd className="text-sm leading-[1.65] text-foreground/80 max-w-[58ch]">
          {meaning}
        </dd>
      </div>
    </dl>
  </li>
);

export const Foundation = () => (
  <ol className="list-none px-6 md:px-10 max-w-[1200px] mx-auto">
    <StatementBlock
      num="01"
      title="Vision"
      context="The horizon"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      num="02"
      title="Mission"
      context="The work"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
      last
    />
  </ol>
);

export default Foundation;
