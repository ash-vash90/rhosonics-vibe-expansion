import { BRAND_VALUES } from "@/data/brand-values";

/**
 * ValueOperatingRules — five values × five operating rules.
 * Tight 5-up console grid (per selected v2 direction). Hover lifts
 * the card and shifts the title to primary green.
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border rounded-[4px] overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
    {BRAND_VALUES.map((value) => (
      <article
        key={value.id}
        className="group bg-card p-6 md:p-7 flex flex-col transition-colors duration-200 hover:bg-muted/40"
      >
        <span className="font-data text-xs tracking-[0.25em] text-primary mb-5">
          {value.num}
        </span>
        <h3 className="font-ui font-semibold text-foreground text-lg md:text-xl tracking-tight mb-3 transition-colors group-hover:text-primary">
          {value.title}
        </h3>
        <p className="text-foreground/65 leading-relaxed text-sm mb-5">
          {value.desc}
        </p>
        <div className="mt-auto pt-4 border-t border-border/70">
          <span className="block font-data text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
            Operating Rule
          </span>
          <p className="text-sm font-medium text-foreground leading-snug">
            {RULES[value.id]}
          </p>
        </div>
      </article>
    ))}
  </div>
);

export default ValueOperatingRules;
