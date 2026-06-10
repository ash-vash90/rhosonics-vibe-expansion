import { Check, X } from "@/lib/icons";

/**
 * 02.1 Lexicon — enforceable use/avoid table.
 *
 * Pattern stolen from B&O + Klarna: a flat list of approved words and their
 * banned synonyms. The "why" column makes refusal defensible — vocabulary
 * choices map to evidence, precision, and respect for the engineer-reader.
 */

interface LexiconRow {
  use: string;
  avoid: string[];
  why: string;
}

const ROWS: LexiconRow[] = [
  {
    use: "Measure",
    avoid: ["Capture", "Deliver insights"],
    why: "We take a number from the world. Anything softer overclaims the action.",
  },
  {
    use: "±0.001 g/cm³",
    avoid: ["Industry-leading accuracy", "Exceptional precision"],
    why: "Adjectives are not specs. State the tolerance.",
  },
  {
    use: "Inline",
    avoid: ["Smart", "Intelligent", "Advanced"],
    why: "Position the sensor in the process, not in the brochure.",
  },
  {
    use: "Reduce",
    avoid: ["Optimize", "Enhance", "Improve"],
    why: "If the number went down, say it went down.",
  },
  {
    use: "Replace",
    avoid: ["Disrupt", "Reimagine", "Revolutionize"],
    why: "Replacement is auditable. Disruption is not.",
  },
  {
    use: "Operator",
    avoid: ["End user", "Stakeholder", "Customer"],
    why: "Name the person whose hands the instrument lands in.",
  },
  {
    use: "Site",
    avoid: ["Deployment", "Implementation"],
    why: "Plants and concentrators are sites. Software has deployments.",
  },
  {
    use: "Calibrated",
    avoid: ["Tuned", "Dialed-in", "Optimized"],
    why: "Calibration is traceable. The others are vibes.",
  },
  {
    use: "Field result",
    avoid: ["Success story", "Win", "Case study"],
    why: "We report outcomes from the field. We do not curate stories.",
  },
  {
    use: "Source: plant operations · 18 mo",
    avoid: ["Up to 14% reduction*", "Significant savings"],
    why: "Every number gets a citation in the same sentence — or it doesn't ship.",
  },
];

export const LexiconTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full border-separate border-spacing-0 text-left">
      <thead>
        <tr className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <th className="py-3 pr-4 w-[28%] align-bottom">Use</th>
          <th className="py-3 pr-4 w-[32%] align-bottom">Avoid</th>
          <th className="py-3 pr-0 align-bottom">Why</th>
        </tr>
      </thead>
      <tbody className="font-ui text-sm md:text-base">
        {ROWS.map((row, i) => (
          <tr key={row.use} className={i % 2 === 0 ? "bg-background" : "bg-[hsl(var(--slate-100))]/60"}>
            <td className="py-3 pr-4 align-top">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden />
                <span className="font-medium text-foreground">{row.use}</span>
              </div>
            </td>
            <td className="py-3 pr-4 align-top">
              <ul className="space-y-1">
                {row.avoid.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-foreground/65 line-through decoration-foreground/30">
                    <X className="w-4 h-4 mt-0.5 text-foreground/40 shrink-0 no-underline" aria-hidden />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </td>
            <td className="py-3 align-top text-foreground/75 text-sm leading-relaxed">{row.why}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LexiconTable;
