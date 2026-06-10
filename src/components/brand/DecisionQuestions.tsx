import { TelemetryEyebrow } from "@/components/brand/telemetry";

/**
 * Decision Questions — the Socratic governance block (IBM model).
 *
 * Every chapter ends with one. Questions must be testable, not aspirational.
 * Stem: "Before this ships, can it answer:".
 */

interface DecisionQuestionsProps {
  code: string;
  questions: string[];
  className?: string;
}

export const DecisionQuestions = ({ code, questions, className = "" }: DecisionQuestionsProps) => (
  <section aria-labelledby={`dq-${code}`} className={className}>
    <TelemetryEyebrow className="mb-3" code={code} label="Decision Questions" />
    <h3 id={`dq-${code}`} className="font-ui text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
      Before it ships, can the work answer:
    </h3>
    <ol className="space-y-3 list-none counter-reset-dq">
      {questions.map((q, i) => (
        <li
          key={q}
          className="flex items-start gap-4 pl-0 text-foreground/85 leading-relaxed border-l-2 border-primary/40 pl-4 py-1"
        >
          <span className="font-data text-[11px] uppercase tracking-[0.2em] text-primary shrink-0 mt-1">
            Q{String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-ui text-sm md:text-base">{q}</span>
        </li>
      ))}
    </ol>
  </section>
);

export default DecisionQuestions;
