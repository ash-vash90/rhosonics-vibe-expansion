import { BRAND_VALUES } from "@/data/brand-values";

/**
 * ValueOperatingRules — how each canonical value shows up in the work.
 * One row per value, 1:1 with src/data/brand-values.ts. No detached
 * "design principles" — every rule traces to a value.
 */

const RULES: Record<string, string> = {
  expertise:
    "Evidence over claims. Cite the measurement, name the engineer, show the method.",
  collaboration:
    "Speak with partners, not at customers. Co-authored language. Name who we built it with.",
  innovation:
    'Show the novel mechanism, not the marketing word "innovative". Explain what changed.',
  quality:
    "Every number is verifiable. Every spec traces to a test. No round-number marketing claims.",
  sustainability:
    "Quantify the saving — energy, chemicals, water, nuclear sources avoided. No vague green language.",
};

export const ValueOperatingRules = () => (
  <section aria-labelledby="value-rules-heading" className="space-y-10">
    <div className="max-w-3xl space-y-4">
      <div className="flex items-baseline gap-4">
        <span className="font-data text-xs text-primary">IN PRACTICE</span>
        <div className="h-px flex-1 bg-border max-w-16" />
      </div>
      <h2
        id="value-rules-heading"
        className="font-ui font-bold text-foreground tracking-tight text-3xl md:text-4xl leading-tight"
      >
        How the values show up in the work.
      </h2>
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
        Values are only as good as the behaviour they demand. Each row below is
        the operating rule we hold the work to.
      </p>
    </div>

    <dl className="divide-y divide-border border-t border-b border-border">
      {BRAND_VALUES.map((value) => (
        <div
          key={value.id}
          className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-2 md:gap-10 py-6 md:py-8"
        >
          <dt className="flex items-baseline gap-3">
            <span className="font-data text-xs text-muted-foreground">
              {value.num}
            </span>
            <span className="font-ui font-semibold text-foreground text-lg md:text-xl">
              {value.title}
            </span>
          </dt>
          <dd className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-3xl">
            {RULES[value.id]}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default ValueOperatingRules;
