import { BRAND_VALUES } from "@/data/brand-values";

/**
 * ValueOperatingRules — five values × five operating rules.
 * Re-skinned with the ICP-tab chrome from the Claude-generated
 * homepage: full-width bordered cells, mono numerals, hover row
 * gets a green underline (no state-switch — every cell is "active").
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-border bg-card">
    {BRAND_VALUES.map((value, i) => (
      <article
        key={value.id}
        className={`group relative flex flex-col p-6 md:p-7 transition-colors duration-200 hover:bg-[hsl(var(--slate-100))] ${
          i < BRAND_VALUES.length - 1 ? "lg:border-r border-border" : ""
        } ${i < BRAND_VALUES.length - 2 ? "sm:max-lg:border-b border-border" : ""}`}
      >
        <div className="flex items-baseline justify-between mb-5">
          <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {value.num} / Value
          </span>
        </div>
        <h3 className="font-ui font-semibold text-foreground text-lg md:text-xl tracking-tight mb-3 transition-colors group-hover:text-primary">
          {value.title}
        </h3>
        <p className="text-[hsl(var(--slate-600))] leading-[1.6] text-sm mb-6 max-w-[36ch]">
          {value.desc}
        </p>
        <div className="mt-auto pt-5 border-t border-border">
          <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-primary mb-2">
            Operating Rule
          </span>
          <p className="text-sm font-medium text-foreground leading-[1.5]">
            {RULES[value.id]}
          </p>
        </div>
        {/* hover underline — matches the ICP active-tab signature */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        />
      </article>
    ))}
  </div>
);

export default ValueOperatingRules;
