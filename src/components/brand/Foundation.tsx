import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision and Mission.
 * Two-column structure: small label column, statement + commentary column.
 * No spec-sheet chrome. Industrial feel comes from tight typographic
 * hierarchy and disciplined alignment, not decoration.
 */

interface StatementBlockProps {
  label: string;
  statement: React.ReactNode;
  previously: string;
  meaning: string;
  last?: boolean;
}

const StatementBlock = ({
  label,
  statement,
  previously,
  meaning,
  last,
}: StatementBlockProps) => (
  <li
    className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 gap-y-8 py-20 md:py-24 ${
      last ? "" : "border-b border-foreground/10"
    }`}
  >
    {/* Label column */}
    <div>
      <h3
        className="font-ui font-semibold text-foreground tracking-[-0.03em] leading-none"
        style={{ fontSize: "clamp(2.25rem, 3.4vw, 3rem)" }}
      >
        {label}
      </h3>
    </div>

    {/* Statement + commentary column */}
    <div>
      <p
        className="font-ui font-medium text-foreground leading-[1.2] tracking-[-0.02em] max-w-[28ch]"
        style={{ fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)" }}
      >
        {statement}
      </p>

      <div className="mt-12 md:mt-14 max-w-[62ch] space-y-5">
        <p className="font-ui text-base leading-[1.65] text-foreground/80">
          <span className="text-muted-foreground">Replaces </span>
          <span className="text-foreground">&ldquo;{previously}&rdquo;</span>
        </p>
        <p className="font-ui text-base leading-[1.65] text-foreground/80">
          {meaning}
        </p>
      </div>
    </div>
  </li>
);

export const Foundation = () => (
  <ol className="list-none px-6 md:px-10 max-w-[1200px] mx-auto">
    <StatementBlock
      label="Vision"
      statement={BRAND_VISION}
      previously="For a greener and smarter industry."
      meaning="The old vision named an outcome for our customers' world. The new one names our position in it. We are no longer adjacent to industrial progress — we lead the category of what can be measured, controlled, and optimized. Greener and smarter is implied; leadership is stated."
    />
    <StatementBlock
      label="Mission"
      statement={BRAND_MISSION}
      previously="We create ultrasonic measuring technologies to help our customers have more efficient and sustainable processes."
      meaning="The old mission described what we build (ultrasonic technologies). The new one describes what we deliver (measurement solutions) and adds automation as a first-class outcome. The work is no longer scoped to one sensing principle — it is scoped to the operation."
      last
    />
  </ol>
);

export default Foundation;
