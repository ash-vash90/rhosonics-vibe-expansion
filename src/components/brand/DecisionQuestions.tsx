/**
 * Decision Questions — the Socratic governance block (IBM model).
 *
 * Every chapter ends with one. Questions must be testable, not aspirational.
 * Plain label, no telemetry eyebrow — eyebrows are reserved for the
 * Homepage directory and the Tools appendix.
 */

interface DecisionQuestionsProps {
  code: string;
  questions: string[];
  className?: string;
}

export const DecisionQuestions = ({ code, questions, className = "" }: DecisionQuestionsProps) => (
  <section aria-labelledby={`dq-${code}`} className={className}>
    <span className="font-data text-xs text-primary block mb-3">{code}</span>
    <h3 id={`dq-${code}`} className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">
      Before it ships, can the work answer:
    </h3>
    <ol className="space-y-3 list-none">
      {questions.map((q, i) => (
        <li
          key={q}
          className="flex items-start gap-4 text-foreground/85 leading-relaxed border-l-2 border-primary/40 pl-4 py-1"
        >
          <span className="font-data text-xs text-primary shrink-0 mt-1">
            Q{String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-ui text-sm md:text-base">{q}</span>
        </li>
      ))}
    </ol>
  </section>
);

export default DecisionQuestions;
