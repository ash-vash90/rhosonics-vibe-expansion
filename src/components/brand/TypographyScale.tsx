import { BrandCallout } from "./BrandCallout";

export const TypographyScale = () => {
  return (
    <section id="typography" className="mb-32">
      <h2 className="section-header">Typography</h2>
      
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Typography prioritizes clarity and measurement. Structure over flourish, consistency over novelty.
      </p>

      {/* Font Families Table */}
      <div className="card-base p-0 overflow-hidden mb-12">
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
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                UNBOUNDED
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">HEADING</td>
              <td className="px-6 py-5">
                <span className="font-ui font-bold text-2xl text-foreground">Slurry Density</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                INSTRUMENT SANS
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">BODY</td>
              <td className="px-6 py-5">
                <span className="font-ui text-base text-foreground">
                  Optimized density measurement reduced fresh water intake.
                </span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                INSTRUMENT SANS
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">DATA</td>
              <td className="px-6 py-5">
                <span className="font-data text-sm bg-slate-100 px-2 py-1 rounded text-foreground">
                  1.4502 G/L
                </span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                JETBRAINS MONO
              </td>
            </tr>
            <tr>
              <td className="px-6 py-5 label-tech text-slate-500">LABEL</td>
              <td className="px-6 py-5">
                <span className="label-tech text-primary">PRIMARY MEASUREMENT</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                JETBRAINS MONO / CAPS
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* JetBrains Mono Rules */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg mb-8 max-w-2xl">
        <h4 className="font-ui font-semibold text-lg text-foreground mb-4">JetBrains Mono</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="label-tech text-primary mb-3 block">USE FOR</span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Data values and measurements</li>
              <li>• Badges and status chips</li>
              <li>• Labels and table headers</li>
              <li>• IDs and system indicators</li>
            </ul>
          </div>
          <div>
            <span className="label-tech text-destructive mb-3 block">NEVER FOR</span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Body copy or paragraphs</li>
              <li>• Headings or titles</li>
              <li>• Any readable sentence</li>
            </ul>
          </div>
        </div>
      </div>
      
      <BrandCallout variant="avoid" title="The Paragraph Test" className="mb-12">
        If text can be read as a paragraph, it must never be set in JetBrains Mono.
      </BrandCallout>

      {/* Type Scale */}
      <h3 className="label-tech text-slate-500 mb-6">TYPE SCALE</h3>
      <div className="space-y-6 max-w-2xl">
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
    </section>
  );
};

export default TypographyScale;
