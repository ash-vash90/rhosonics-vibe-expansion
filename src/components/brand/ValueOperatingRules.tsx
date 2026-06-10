import { BRAND_VALUES } from "@/data/brand-values";

/**
 * ValueOperatingRules — integrated values + operating rules.
 *
 * One row per canonical value. Left column (5/12): number, title,
 * description. Right column (6/12, offset by 1): tinted card with a
 * dark left rail (green on Sustainability) carrying the operating rule.
 *
 * Replaces the old separate "values list" + "in practice" sections —
 * the rule each value demands of the work lives next to the value itself.
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
  <section aria-labelledby="value-rules-heading">
    {/* Section header — mono label, hairline rule, section number */}
    <div className="flex items-baseline justify-between mb-12 md:mb-16 border-b border-border pb-4">
      <h2
        id="value-rules-heading"
        className="font-data text-xs tracking-[0.3em] uppercase text-foreground"
      >
        Core Values &amp; Operating Rules
      </h2>
      <span className="font-data text-[10px] text-muted-foreground">01.2</span>
    </div>

    <ol className="space-y-20 md:space-y-24 list-none">
      {BRAND_VALUES.map((value, i) => {
        const isLast = i === BRAND_VALUES.length - 1;
        return (
          <li key={value.id} className="grid grid-cols-12 gap-6 lg:gap-8 group">
            {/* Left: value definition */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-start gap-5 md:gap-6">
                <span className="font-data text-xs text-muted-foreground/60 mt-2 shrink-0">
                  {value.num}
                </span>
                <div>
                  <h3 className="font-ui font-semibold text-foreground tracking-tight text-2xl md:text-3xl mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed max-w-prose">
                    {value.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: operating rule — tinted card, dark rail (green on last) */}
            <div
              className={`col-span-12 lg:col-start-7 lg:col-span-6 bg-muted/40 p-7 md:p-8 rounded-[4px] border-l-4 ${
                isLast ? "border-primary" : "border-foreground"
              }`}
            >
              <span className="block font-data text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                In Practice
              </span>
              <p className="font-ui text-base md:text-lg font-medium text-foreground/90 leading-snug">
                {RULES[value.id]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);

export default ValueOperatingRules;
