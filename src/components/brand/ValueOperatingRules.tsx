import { BRAND_VALUES } from "@/data/brand-values";

/**
 * ValueOperatingRules — five values, each paired with the operating
 * rule it enforces on the work. Card-based grid with elevation for
 * depth. Section heading is supplied by the page via SectionHeader.
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
    {BRAND_VALUES.map((value, i) => {
      const Icon = value.icon;
      const isEco = value.id === "sustainability";
      return (
        <article
          key={value.id}
          className={`group relative flex flex-col bg-card p-7 md:p-8 rounded-[6px] border-t-2 transition-transform duration-300 hover:-translate-y-1 ${
            isEco ? "border-primary" : "border-foreground"
          }`}
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Header row: number + icon */}
          <div className="flex items-start justify-between mb-6">
            <span
              className={`font-data text-xs tracking-[0.25em] ${
                isEco ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {value.num}
            </span>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-[4px] ${
                isEco
                  ? "bg-[hsl(var(--eco-surface))] text-primary"
                  : "bg-muted text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-ui font-semibold text-foreground tracking-tight text-2xl md:text-[1.75rem] leading-tight mb-3">
            {value.title}
          </h3>

          {/* Public statement */}
          <p className="text-foreground/70 leading-relaxed text-sm md:text-base mb-6 grow">
            {value.desc}
          </p>

          {/* Operating rule — inset block */}
          <div className="mt-auto pt-5 border-t border-border">
            <span className="block font-data text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
              Operating Rule
            </span>
            <p className="font-ui text-sm md:text-base font-medium text-foreground leading-snug">
              {RULES[value.id]}
            </p>
          </div>
        </article>
      );
    })}
  </div>
);

export default ValueOperatingRules;
