import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission as a brand-principles document.
 * Editorial layout: large label above, statement and change-notes below.
 * Stacked rather than columned so the typography can breathe without
 * colliding into the body copy.
 */

interface StatementBlockProps {
  kind: "Vision" | "Mission";
  index: string;
  statement: React.ReactNode;
  previously: string;
  meaning: string;
}

const StatementBlock = ({ kind, index, statement, previously, meaning }: StatementBlockProps) => (
  <article className="py-20 md:py-28 border-t border-border first:border-t-0">
    <div className="max-w-[1100px] mx-auto px-6 md:px-10">
      {/* Index marker */}
      <div className="font-data text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-6">
        {index} · {kind === "Vision" ? "The horizon" : "The work"}
      </div>

      {/* Display label */}
      <h2
        className="font-ui font-bold uppercase tracking-[-0.045em] leading-[0.85] mb-10 md:mb-14"
        style={{
          fontSize: "clamp(4.5rem, 12vw, 10rem)",
          color: "hsl(var(--rho-green))",
        }}
      >
        {kind}
      </h2>

      {/* The statement itself — the principle */}
      <p
        className="font-ui font-semibold leading-[1.2] tracking-[-0.02em] text-foreground max-w-[22ch]"
        style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
      >
        {statement}
      </p>

      {/* Change record */}
      <dl className="mt-16 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-4 gap-x-12 max-w-[68ch] pt-8 border-t border-border">
        <dt className="font-data text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          Previously
        </dt>
        <dd className="text-[15px] leading-[1.7] text-muted-foreground italic">
          "{previously}"
        </dd>

        <dt className="font-data text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground pt-1">
          What changed
        </dt>
        <dd className="text-[15px] leading-[1.7] text-foreground/85">
          {meaning}
        </dd>
      </dl>
    </div>
  </article>
);

export const Foundation = () => (
  <div className="border-y border-border">
    <StatementBlock
      kind="Vision"
      index="01.1.a"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      kind="Mission"
      index="01.1.b"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
    />
  </div>
);

export default Foundation;
