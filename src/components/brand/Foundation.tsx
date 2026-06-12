import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission as principles entries.
 * Matches the DesignPrinciples grid aesthetic: mono index, small-caps
 * data label, statement as the principle, change-record as paired
 * key/value rows. No display-wordmark, no marketing chrome.
 */

interface StatementBlockProps {
  num: string;
  kind: "VISION" | "MISSION";
  statement: React.ReactNode;
  previously: string;
  meaning: string;
  last?: boolean;
}

const StatementBlock = ({
  num,
  kind,
  statement,
  previously,
  meaning,
  last,
}: StatementBlockProps) => (
  <li
    className={`grid grid-cols-12 gap-6 md:gap-8 items-start py-10 md:py-14 ${
      last ? "" : "border-b border-border"
    }`}
  >
    {/* Mono index */}
    <div className="col-span-2 md:col-span-1">
      <span className="font-data text-2xl md:text-3xl font-medium text-foreground/25 tabular-nums">
        {num}
      </span>
    </div>

    {/* Data label */}
    <div className="col-span-10 md:col-span-3">
      <span className="block font-data text-[10px] font-medium tracking-[0.14em] uppercase text-primary mb-2">
        {kind}
      </span>
      <span className="block font-data text-[10px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
        {kind === "VISION" ? "The horizon" : "The work"}
      </span>
    </div>

    {/* Statement + change record */}
    <div className="col-span-12 md:col-span-8 space-y-8">
      <p className="font-ui font-semibold text-foreground leading-[1.25] tracking-[-0.02em] text-2xl md:text-[2rem] max-w-[28ch]">
        {statement}
      </p>

      <dl className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-8 pt-6 border-t border-border max-w-[64ch]">
        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          Previously
        </dt>
        <dd className="text-[14px] leading-[1.65] text-muted-foreground italic">
          "{previously}"
        </dd>

        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          What changed
        </dt>
        <dd className="text-[14px] leading-[1.65] text-foreground/80">
          {meaning}
        </dd>
      </dl>
    </div>
  </li>
);

export const Foundation = () => (
  <ol className="list-none px-6 md:px-10 max-w-[1200px] mx-auto">
    <StatementBlock
      num="01"
      kind="VISION"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      num="02"
      kind="MISSION"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
      last
    />
  </ol>
);

export default Foundation;
