import { BrandCallout } from "./BrandCallout";
export const TypographyScale = () => {
  return <section id="typography" className="mb-32">
      
      
      
      {/* Typography Philosophy */}
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Rhosonics typography prioritizes clarity, measurement, and trust. The system favors legibility over personality, 
        structure over flourish, and consistency over novelty.
      </p>

      {/* Implementation Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="label-tech text-slate-400">BASE SIZE</span>
          <p className="font-ui font-semibold text-foreground mt-1">16px (1rem)</p>
          <p className="text-xs text-muted-foreground mt-1">Web default, all breakpoints</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="label-tech text-slate-400">LINE LENGTH</span>
          <p className="font-ui font-semibold text-foreground mt-1">65–75 characters</p>
          <p className="text-xs text-muted-foreground mt-1">Optimal for body copy</p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="label-tech text-slate-400">TOUCH TARGETS</span>
          <p className="font-ui font-semibold text-foreground mt-1">44px minimum</p>
          <p className="text-xs text-muted-foreground mt-1">WCAG 2.1 compliant</p>
        </div>
      </div>

      {/* Font Families Table */}
      <div className="card-base p-0 overflow-hidden mb-12">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 label-tech text-slate-500">ROLE</th>
              <th className="px-6 py-4 label-tech text-slate-500">EXAMPLE</th>
              <th className="px-6 py-4 label-tech text-slate-500 text-right hidden md:table-cell">SPECIFICATION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">LOGO</td>
              <td className="px-6 py-5">
                <span className="font-logo text-2xl text-foreground tracking-wide uppercase">RHOSONICS</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                UNBOUNDED 500
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">DISPLAY</td>
              <td className="px-6 py-5">
                <span className="font-ui font-bold text-4xl text-foreground">Precision</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                INSTRUMENT SANS 700
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">HEADING</td>
              <td className="px-6 py-5">
                <span className="font-ui font-bold text-2xl text-foreground">Slurry Density</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                INSTRUMENT SANS 700
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
                INSTRUMENT SANS 400
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
                JETBRAINS MONO 500
              </td>
            </tr>
            <tr>
              <td className="px-6 py-5 label-tech text-slate-500">LABEL</td>
              <td className="px-6 py-5">
                <span className="label-tech text-primary">PRIMARY MEASUREMENT</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                JETBRAINS MONO 500 / UPPERCASE
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Token Mapping */}
      <h3 className="label-tech text-slate-500 mb-4">TOKEN MAPPING</h3>
      <div className="card-base p-0 overflow-hidden mb-12">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 label-tech text-slate-500">SEMANTIC</th>
              <th className="px-6 py-3 label-tech text-slate-500">TOKEN</th>
              <th className="px-6 py-3 label-tech text-slate-500">SIZE</th>
              <th className="px-6 py-3 label-tech text-slate-500 hidden md:table-cell">WEIGHT</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-100">
              <td className="px-6 py-3 text-foreground">H1 / Display</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-5xl</td>
              <td className="px-6 py-3 text-muted-foreground">48px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">700</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-3 text-foreground">H2 / Section</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-4xl</td>
              <td className="px-6 py-3 text-muted-foreground">36px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">700</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-3 text-foreground">H3 / Subsection</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-2xl</td>
              <td className="px-6 py-3 text-muted-foreground">24px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">600</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-3 text-foreground">Body</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-base</td>
              <td className="px-6 py-3 text-muted-foreground">16px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">400</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-3 text-foreground">Caption</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-sm</td>
              <td className="px-6 py-3 text-muted-foreground">14px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">400</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-foreground">Label</td>
              <td className="px-6 py-3 font-data text-xs text-primary">text-xs + uppercase</td>
              <td className="px-6 py-3 text-muted-foreground">12px</td>
              <td className="px-6 py-3 text-muted-foreground hidden md:table-cell">500</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* JetBrains Mono Rules */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg mb-8">
        <h4 className="font-ui font-semibold text-lg text-foreground mb-4">JetBrains Mono Usage Rules</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="label-tech text-primary mb-3 block">ALWAYS USED FOR</span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Data values and measurements (1.4502 G/L)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Badges and status chips (ONLINE, ACTIVE)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Labels, table headers, chart axes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>IDs, codes, and system indicators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Always ALL CAPS when used as labels</span>
              </li>
            </ul>
          </div>
          <div>
            <span className="label-tech text-destructive mb-3 block">NEVER USED FOR</span>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Body copy or paragraphs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Headings or section titles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Marketing or explanatory text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Any readable sentence or phrase</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Label Casing Guardrail */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-8 max-w-2xl">
        <span className="label-tech text-amber-700 mb-2 block">LABEL CASING GUARDRAIL</span>
        <p className="text-sm text-amber-900">
          Labels must stay under <strong>12 characters</strong>. If longer, switch to sentence case in Instrument Sans.
        </p>
      </div>
      
      <BrandCallout variant="avoid" title="The Paragraph Test" className="mb-12">
        If text can be read as a paragraph, it must never be set in JetBrains Mono. 
        JetBrains Mono is a signal font for scanning and categorization — not a reading font.
      </BrandCallout>

      {/* Data Formatting Standard */}
      <h3 className="label-tech text-slate-500 mb-4">DATA FORMATTING STANDARD</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card-base p-6">
          <h4 className="font-ui font-semibold text-foreground mb-4">Numeric Formatting</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-muted-foreground">Decimal precision</span>
              <span className="font-data text-xs text-foreground">Max 4 significant digits</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-muted-foreground">Thousands separator</span>
              <span className="font-data text-xs text-foreground">Comma (1,000) or space by locale</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-muted-foreground">Unit spacing</span>
              <span className="font-data text-xs text-foreground">Space before unit (1.45 g/L)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Unit presence</span>
              <span className="font-data text-xs text-foreground">Always required</span>
            </div>
          </div>
        </div>
        <div className="card-base p-6">
          <h4 className="font-ui font-semibold text-foreground mb-4">Examples</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="w-6 text-primary">✓</span>
              <span className="font-data text-sm text-foreground">1.4502 g/L</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-6 text-primary">✓</span>
              <span className="font-data text-sm text-foreground">24.5 °C</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-6 text-primary">✓</span>
              <span className="font-data text-sm text-foreground">1,013 hPa</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-6 text-destructive">✕</span>
              <span className="font-data text-sm text-muted-foreground line-through">1.4502g/L</span>
              <span className="text-xs text-destructive">No space</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-6 text-destructive">✕</span>
              <span className="font-data text-sm text-muted-foreground line-through">1.45023456</span>
              <span className="text-xs text-destructive">Too many digits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instrument Sans & Unbounded Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="font-ui font-semibold text-lg text-foreground mb-3">Instrument Sans</h4>
          <span className="label-tech text-slate-400 mb-3 block">THE READING FONT</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All explanatory content, headings, and display typography. 
            Prioritizes legibility and calm authority.
          </p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="font-logo text-lg text-foreground mb-3 uppercase">Unbounded</h4>
          <span className="label-tech text-slate-400 mb-3 block">LOGO ONLY — NO EXCEPTIONS</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Reserved exclusively for the logo wordmark. Never in headings, 
            decorative text, or any other context.
          </p>
        </div>
      </div>

      {/* Type Scale */}
      <h3 className="label-tech text-slate-500 mb-2">TYPE SCALE</h3>
      <p className="text-sm text-muted-foreground mb-6 italic">
        Type size reflects authority, not emphasis.
      </p>
      
      <div className="space-y-6">
        {[{
        size: "5xl",
        px: "48px",
        example: "Display Hero"
      }, {
        size: "4xl",
        px: "36px",
        example: "Section Title"
      }, {
        size: "3xl",
        px: "30px",
        example: "Page Heading"
      }, {
        size: "2xl",
        px: "24px",
        example: "Card Title"
      }, {
        size: "xl",
        px: "20px",
        example: "Subheading"
      }, {
        size: "lg",
        px: "18px",
        example: "Large Body"
      }, {
        size: "base",
        px: "16px",
        example: "Body Copy"
      }, {
        size: "sm",
        px: "14px",
        example: "Caption"
      }, {
        size: "xs",
        px: "12px",
        example: "Labels"
      }].map(item => <div key={item.size} className="flex items-baseline gap-6 pb-4 border-b border-slate-100">
            <div className="w-16 font-data text-xs text-slate-400">{item.px}</div>
            <div className={`font-ui font-medium text-${item.size} text-foreground flex-1`}>
              {item.example}
            </div>
            <div className="font-data text-xs text-slate-400 hidden sm:block">{item.size.toUpperCase()}</div>
          </div>)}
      </div>

      {/* Line Height & Letter Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-4">Line Height</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="font-data text-xs text-muted-foreground">1.1 - 1.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Body</span>
              <span className="font-data text-xs text-muted-foreground">1.5 - 1.6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Data</span>
              <span className="font-data text-xs text-muted-foreground">1.2</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-4">Letter Spacing</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Logo</span>
              <span className="font-data text-xs text-muted-foreground">-0.02EM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="font-data text-xs text-muted-foreground">-0.01EM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Labels</span>
              <span className="font-data text-xs text-muted-foreground">0.05EM</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default TypographyScale;