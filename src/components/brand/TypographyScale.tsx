import { BrandCallout } from "./BrandCallout";

export const TypographyScale = () => {
  return (
    <section id="typography" className="mb-32">
      <h2 className="section-header">Typography</h2>
      
      {/* Two-column: Intro + Callout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-6">
            Typography prioritizes clarity and measurement. Structure over flourish, consistency over novelty.
          </p>
          
          {/* Font Families Table */}
          <div className="card-base p-0 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 label-tech text-slate-500">ROLE</th>
                  <th className="px-6 py-4 label-tech text-slate-500">EXAMPLE</th>
                  <th className="px-6 py-4 label-tech text-slate-500 text-right hidden md:table-cell">FONT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-5 label-tech text-slate-500">LOGO</td>
                  <td className="px-6 py-5">
                    <span className="font-logo text-2xl text-foreground tracking-wide uppercase">RHOSONICS</span>
                  </td>
                  <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">UNBOUNDED</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-5 label-tech text-slate-500">HEADING</td>
                  <td className="px-6 py-5">
                    <span className="font-ui font-bold text-2xl text-foreground">Slurry Density</span>
                  </td>
                  <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">INSTRUMENT SANS</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-5 label-tech text-slate-500">BODY</td>
                  <td className="px-6 py-5">
                    <span className="font-ui text-base text-foreground">Optimized density measurement reduced fresh water intake.</span>
                  </td>
                  <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">INSTRUMENT SANS</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-5 label-tech text-slate-500">DATA</td>
                  <td className="px-6 py-5">
                    <span className="font-data text-sm bg-slate-100 px-2 py-1 rounded text-foreground">1.4502 G/L</span>
                  </td>
                  <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">JETBRAINS MONO</td>
                </tr>
                <tr>
                  <td className="px-6 py-5 label-tech text-slate-500">LABEL</td>
                  <td className="px-6 py-5">
                    <span className="label-tech text-primary">PRIMARY MEASUREMENT</span>
                  </td>
                  <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">JETBRAINS MONO / CAPS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Rules + Callout */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-ui font-semibold text-lg text-foreground mb-4">JetBrains Mono</h4>
            <div className="space-y-4">
              <div>
                <span className="label-tech text-primary mb-2 block">USE FOR</span>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Data values and measurements</li>
                  <li>• Badges and status chips</li>
                  <li>• Labels and table headers</li>
                </ul>
              </div>
              <div>
                <span className="label-tech text-destructive mb-2 block">NEVER FOR</span>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Body copy or paragraphs</li>
                  <li>• Headings or titles</li>
                </ul>
              </div>
            </div>
          </div>
          
          <BrandCallout variant="avoid" title="The Paragraph Test">
            If text can be read as a paragraph, it must never be set in JetBrains Mono.
          </BrandCallout>
        </div>
      </div>

      {/* Type Scale - full width */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="label-tech text-slate-500 mb-6">TYPE SCALE</h3>
          <div className="space-y-4">
            {[
              { size: "5xl", px: "48px", example: "Display Hero" },
              { size: "2xl", px: "24px", example: "Card Title" },
              { size: "base", px: "16px", example: "Body Copy" },
              { size: "sm", px: "14px", example: "Caption" },
              { size: "xs", px: "12px", example: "Labels" }
            ].map(item => (
              <div key={item.size} className="flex items-baseline gap-6 pb-4 border-b border-slate-100">
                <div className="w-16 font-data text-xs text-slate-400">{item.px}</div>
                <div className={`font-ui font-medium text-${item.size} text-foreground flex-1`}>
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg h-fit">
          <h4 className="font-ui font-semibold text-foreground mb-3">Why this matters</h4>
          <p className="text-muted-foreground text-sm">
            In data-dense environments, typographic consistency reduces cognitive load. 
            Engineers and operators scan faster when visual patterns are predictable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TypographyScale;
