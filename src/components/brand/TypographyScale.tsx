import { BrandCallout } from "./BrandCallout";

export const TypographyScale = () => {
  return (
    <section id="typography" className="space-y-20">
      <p className="text-muted-foreground text-lg max-w-2xl">
        Typography prioritizes clarity and measurement. Structure over flourish, consistency over novelty.
      </p>

      {/* ═══ TYPE SCALE - DRAMATIC VERTICAL DISPLAY ═══ */}
      <div>
        <div className="flex items-center gap-4 mb-12">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Type Scale</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="space-y-0">
          {/* Each scale level as a full-width dramatic line */}
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">48px</span>
            <span className="font-ui font-bold text-5xl text-foreground flex-1 tracking-tight">Display Hero</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Headlines, hero sections</span>
          </div>
          
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">36px</span>
            <span className="font-ui font-bold text-4xl text-foreground flex-1 tracking-tight">Section Title</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Major sections</span>
          </div>
          
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">24px</span>
            <span className="font-ui font-semibold text-2xl text-foreground flex-1">Card Title</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Cards, subsections</span>
          </div>
          
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">16px</span>
            <span className="font-ui text-base text-foreground flex-1">Body Copy — Optimized density measurement reduced fresh water intake by 40%.</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Paragraphs</span>
          </div>
          
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">14px</span>
            <span className="font-ui text-sm text-muted-foreground flex-1">Caption — Supporting information and metadata</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Captions, hints</span>
          </div>
          
          <div className="group flex items-baseline gap-8 py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-6 px-6">
            <span className="font-data text-xs text-muted-foreground w-16 flex-shrink-0">12px</span>
            <span className="font-data text-xs text-foreground uppercase tracking-wider flex-1">LABEL • STATUS • MEASUREMENT</span>
            <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Technical labels</span>
          </div>
        </div>
      </div>

      {/* ═══ FONT ROLES - CLEAN TABLE ═══ */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Font Roles</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="overflow-hidden border border-border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left font-data text-xs text-muted-foreground uppercase tracking-wider">Example</th>
                <th className="px-6 py-4 text-right font-data text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">Font</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border/50">
                <td className="px-6 py-5 font-data text-xs text-muted-foreground uppercase">Logo</td>
                <td className="px-6 py-5">
                  <span className="font-logo text-2xl text-foreground tracking-wide uppercase">RHOSONICS</span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-muted-foreground hidden md:table-cell">Unbounded</td>
              </tr>
              <tr className="border-t border-border/50">
                <td className="px-6 py-5 font-data text-xs text-muted-foreground uppercase">Heading</td>
                <td className="px-6 py-5">
                  <span className="font-ui font-bold text-2xl text-foreground">Slurry Density</span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-muted-foreground hidden md:table-cell">Instrument Sans</td>
              </tr>
              <tr className="border-t border-border/50">
                <td className="px-6 py-5 font-data text-xs text-muted-foreground uppercase">Body</td>
                <td className="px-6 py-5">
                  <span className="font-ui text-base text-foreground">Optimized density measurement reduced fresh water intake.</span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-muted-foreground hidden md:table-cell">Instrument Sans</td>
              </tr>
              <tr className="border-t border-border/50">
                <td className="px-6 py-5 font-data text-xs text-muted-foreground uppercase">Data</td>
                <td className="px-6 py-5">
                  <span className="font-data text-sm bg-muted px-3 py-1.5 rounded text-foreground">1.4502 G/L</span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-muted-foreground hidden md:table-cell">JetBrains Mono</td>
              </tr>
              <tr className="border-t border-border/50">
                <td className="px-6 py-5 font-data text-xs text-muted-foreground uppercase">Label</td>
                <td className="px-6 py-5">
                  <span className="font-data text-xs text-primary uppercase tracking-wider">PRIMARY MEASUREMENT</span>
                </td>
                <td className="px-6 py-5 text-right text-sm text-muted-foreground hidden md:table-cell">JetBrains Mono / Caps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ JETBRAINS MONO RULES - INLINE ═══ */}
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <h3 className="font-ui text-lg font-semibold text-foreground mb-4">JetBrains Mono Usage</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-3">Use for</span>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Data values and measurements
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Badges and status chips
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Labels and table headers
                </li>
              </ul>
            </div>
            <div>
              <span className="font-data text-xs text-destructive uppercase tracking-wider block mb-3">Never for</span>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  Body copy or paragraphs
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  Headings or titles
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <BrandCallout variant="avoid" title="The Paragraph Test">
            If text can be read as a paragraph, it must never be set in JetBrains Mono.
          </BrandCallout>
        </div>
      </div>

      {/* Why this matters - subtle */}
      <div className="border-l-2 border-border pl-6 max-w-2xl">
        <p className="text-muted-foreground">
          In data-dense environments, typographic consistency reduces cognitive load. 
          Engineers and operators scan faster when visual patterns are predictable.
        </p>
      </div>
    </section>
  );
};

export default TypographyScale;
