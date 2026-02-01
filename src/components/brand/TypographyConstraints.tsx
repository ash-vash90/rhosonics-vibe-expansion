import { BrandCallout } from "./BrandCallout";

/**
 * Typography Constraints Section
 * 
 * Documents line-height and line-length rules:
 * - Proportional line heights based on line length
 * - Maximum line lengths for readability
 * - Practical examples and Tailwind classes
 */
export const TypographyConstraints = () => {
  const lineHeightRules = [
    {
      context: "Short lines",
      examples: "Labels, headers, badges",
      lineHeight: "1.25",
      tailwind: "leading-tight",
      demo: "DENSITY READING",
      demoClass: "font-data text-xs uppercase tracking-wider leading-tight",
    },
    {
      context: "Medium lines",
      examples: "Cards, captions, buttons",
      lineHeight: "1.5",
      tailwind: "leading-normal",
      demo: "Real-time slurry measurement with ±0.1% accuracy",
      demoClass: "font-ui text-base leading-normal",
    },
    {
      context: "Long lines",
      examples: "Paragraphs, documentation",
      lineHeight: "1.75",
      tailwind: "leading-relaxed",
      demo: "The SDM Eco provides continuous, real-time density measurement for industrial slurry applications. Built for harsh environments, it delivers the precision operators need to optimize processes and reduce waste.",
      demoClass: "font-ui text-base leading-relaxed",
    },
  ];

  const lineLengthRules = [
    {
      context: "Ideal body text",
      characters: "65ch",
      tailwind: "max-w-prose",
      note: "Gold standard for readability",
    },
    {
      context: "Short paragraphs",
      characters: "45ch",
      tailwind: "max-w-md",
      note: "Card descriptions, tooltips",
    },
    {
      context: "Wide content",
      characters: "75ch",
      tailwind: "max-w-2xl",
      note: "Documentation, long-form",
    },
  ];

  return (
    <section id="typography-constraints" className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-6">Typography Constraints</h2>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Readability isn't just about font choice. Line height and line length work together 
          to create comfortable reading rhythms. Get these wrong, and even beautiful typography fails.
        </p>
      </div>

      {/* Line Height Rules */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Line Height</h3>
          <span className="text-sm text-muted-foreground ml-auto hidden md:block">Proportional to line length</span>
        </div>

        <div className="space-y-8">
          {lineHeightRules.map((rule) => (
            <div 
              key={rule.context}
              className="grid md:grid-cols-3 gap-6 p-6 bg-muted/20 border border-border/50 rounded-lg"
            >
              {/* Rule info */}
              <div>
                <h4 className="font-ui font-semibold text-foreground mb-2">{rule.context}</h4>
                <p className="text-sm text-muted-foreground mb-4">{rule.examples}</p>
                <div className="flex items-center gap-4">
                  <span className="font-data text-2xl text-primary">{rule.lineHeight}</span>
                  <code className="font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded">{rule.tailwind}</code>
                </div>
              </div>

              {/* Demo */}
              <div className="md:col-span-2 flex items-center">
                <div className="p-4 bg-background border border-border rounded-lg w-full">
                  <p className={rule.demoClass}>{rule.demo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BrandCallout variant="info" title="The Principle">
          Shorter lines need tighter leading because the eye travels less distance. 
          Longer lines need more space to help the eye find the next line.
        </BrandCallout>
      </div>

      {/* Line Length Rules */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Line Length</h3>
          <span className="text-sm text-muted-foreground ml-auto hidden md:block">45-75 characters optimal</span>
        </div>

        <div className="overflow-hidden border border-border rounded-lg mb-8">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider">Context</th>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider">Width</th>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider">Tailwind</th>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {lineLengthRules.map((rule) => (
                <tr key={rule.context} className="border-t border-border/50">
                  <td className="px-6 py-4 font-ui text-foreground">{rule.context}</td>
                  <td className="px-6 py-4 font-data text-foreground">{rule.characters}</td>
                  <td className="px-6 py-4">
                    <code className="font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded">{rule.tailwind}</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{rule.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visual Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Too Wide */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-data text-xs text-destructive uppercase tracking-wider">Too Wide (100+ characters)</span>
            </div>
            <div className="p-4 bg-error-surface border border-error-border rounded-lg">
              <p className="font-ui text-base text-foreground leading-relaxed">
                The SDM Eco provides continuous, real-time density measurement for industrial slurry applications. Built for harsh environments, it delivers precision operators need to optimize processes and reduce waste. The ultrasonic technology works non-invasively.
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Hard to track lines, causes re-reading</p>
          </div>

          {/* Optimal */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-primary">✓</span>
              <span className="font-data text-xs text-primary uppercase tracking-wider">Optimal (65 characters)</span>
            </div>
            <div className="p-4 bg-eco-surface border border-eco-border rounded-lg">
              <p className="font-ui text-base text-foreground leading-relaxed max-w-prose">
                The SDM Eco provides continuous, real-time density measurement for industrial slurry applications. Built for harsh environments, it delivers precision operators need.
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Comfortable reading rhythm</p>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="p-6 bg-rho-obsidian text-slate-100 rounded-lg">
        <h4 className="font-ui font-semibold text-white mb-4">Quick Reference</h4>
        <div className="grid md:grid-cols-2 gap-6 font-data text-sm">
          <div>
            <span className="text-slate-400 block mb-2">Line Height Formula</span>
            <code className="text-primary">Short → leading-tight (1.25)</code><br/>
            <code className="text-primary">Medium → leading-normal (1.5)</code><br/>
            <code className="text-primary">Long → leading-relaxed (1.75)</code>
          </div>
          <div>
            <span className="text-slate-400 block mb-2">Line Length Limits</span>
            <code className="text-primary">Body: max-w-prose (65ch)</code><br/>
            <code className="text-primary">Cards: max-w-md (45ch)</code><br/>
            <code className="text-primary">Wide: max-w-2xl (75ch)</code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyConstraints;
