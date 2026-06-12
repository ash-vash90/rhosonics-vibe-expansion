import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission as principles entries.
 * Industrial spec-sheet treatment: metadata strip on top, dominant chapter
 * heading anchored by a green rule bar, canonical statement beneath,
 * and a changelog-style change record at the foot.
 */

interface StatementBlockProps {
  num: string;
  total: string;
  title: string;
  context: string;
  statement: React.ReactNode;
  previously: string;
  meaning: string;
  rev: string;
  status: string;
  scope: string;
  last?: boolean;
}

const SpecCell = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline gap-2">
    <span className="font-data text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </span>
    <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-foreground tabular-nums">
      {value}
    </span>
  </div>
);

const StatementBlock = ({
  num,
  total,
  title,
  context,
  statement,
  previously,
  meaning,
  rev,
  status,
  scope,
  last,
}: StatementBlockProps) => (
  <li className={`py-16 md:py-20 ${last ? "" : "border-b border-foreground/15"}`}>
    {/* Spec strip — industrial metadata header */}
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-6 mb-10 md:mb-12 border-b border-dashed border-foreground/15">
      <span className="font-data text-[10px] font-medium uppercase tracking-[0.18em] text-primary tabular-nums">
        [ {num} / {total} ]
      </span>
      <SpecCell label="Rev" value={rev} />
      <SpecCell label="Status" value={status} />
      <SpecCell label="Scope" value={scope} />
      <span className="font-data text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground md:ml-auto">
        {context}
      </span>
    </div>

    {/* Heading row — the dominant element, anchored by a green rule */}
    <div className="flex items-stretch gap-5">
      <span aria-hidden className="w-[3px] bg-primary shrink-0" />
      <h3
        className="font-ui font-semibold text-foreground tracking-[-0.03em] leading-none"
        style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}
      >
        {title}
      </h3>
    </div>

    {/* Canonical statement */}
    <div className="mt-10 md:mt-12 pl-8">
      <p
        className="font-ui font-medium text-foreground leading-[1.25] tracking-[-0.015em] max-w-[34ch]"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.125rem)" }}
      >
        {statement}
      </p>
    </div>

    {/* Change record — engineering changelog tone */}
    <dl className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-[14ch_1fr] gap-x-10 gap-y-6 pt-8 border-t border-foreground/15">
      <dt className="font-data text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground pt-1">
        Previously
      </dt>
      <dd className="font-data text-[13px] leading-[1.6] text-muted-foreground tabular-nums">
        <span className="text-primary">{"> "}</span>
        {previously}
      </dd>
      <dt className="font-data text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground pt-1">
        Change note
      </dt>
      <dd className="text-sm leading-[1.65] text-foreground/85 max-w-[68ch]">
        {meaning}
      </dd>
    </dl>
  </li>
);

export const Foundation = () => (
  <ol className="list-none px-6 md:px-10 max-w-[1200px] mx-auto">
    <StatementBlock
      num="01"
      total="02"
      title="Vision"
      context="The horizon"
      rev="2026.1"
      status="Active"
      scope="Company-wide"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      num="02"
      total="02"
      title="Mission"
      context="The work"
      rev="2026.1"
      status="Active"
      scope="Company-wide"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
      last
    />
  </ol>
);

export default Foundation;
