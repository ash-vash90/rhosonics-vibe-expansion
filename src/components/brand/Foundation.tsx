import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission as a brand-principles document.
 * Each statement carries: the current wording, what it replaced, and
 * what that change means for the company. No marketing chrome.
 */

interface StatementBlockProps {
  kind: "Vision" | "Mission";
  statement: React.ReactNode;
  previously: string;
  meaning: string;
}

const StatementBlock = ({ kind, statement, previously, meaning }: StatementBlockProps) => (
  <article className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-10 py-10 md:py-12 border-t border-border first:border-t-0">
    <span className="font-data text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {kind}
    </span>
    <div className="space-y-6 max-w-[62ch]">
      <p className="font-ui font-semibold leading-[1.2] tracking-tight text-2xl md:text-[1.75rem] text-foreground">
        {statement}
      </p>

      <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-3 gap-x-6 text-[15px] leading-[1.6]">
        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          Previously
        </dt>
        <dd className="text-muted-foreground italic">"{previously}"</dd>

        <dt className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          What changed
        </dt>
        <dd className="text-foreground/85">{meaning}</dd>
      </dl>
    </div>
  </article>
);

export const Foundation = () => (
  <div className="border-y border-border">
    <StatementBlock
      kind="Vision"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      kind="Mission"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
    />
  </div>
);

export default Foundation;
