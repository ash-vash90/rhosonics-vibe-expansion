export const TypographyScale = () => {
  return (
    <section id="typography" className="mb-32">
      <h2 className="section-header">Typography</h2>
      <p className="label-tech text-slate-500 mb-6">CLARITY, MEASUREMENT, AND TRUST</p>
      
      {/* Typography Philosophy */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg mb-8">
        <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Typography Philosophy</h4>
        <p className="text-sm text-muted-foreground">
          Rhosonics typography prioritizes clarity, measurement, and trust. The system favors legibility over personality, structure over flourish, and consistency over novelty.
        </p>
      </div>
      
      <p className="text-muted-foreground mb-8">
        We speak to engineers and operators who evaluate claims critically. Monospaced type is used where precision matters. Humanist sans is used where explanation matters. The logo typeface appears only as the logo.
      </p>

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
      
      {/* Data Trust Rule */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg mb-12">
        <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Data Typography Rule</h4>
        <p className="text-sm text-muted-foreground">
          Data should never be styled for excitement. Precision, spacing, and consistency matter more than visual impact.
        </p>
      </div>

      {/* Type Scale */}
      <h3 className="label-tech text-slate-500 mb-2">TYPE SCALE</h3>
      <p className="text-sm text-muted-foreground mb-6 italic">
        Type size in this system reflects authority, not emphasis.
      </p>
      
      {/* Role descriptions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <span className="label-tech text-slate-400 text-xs">DISPLAY</span>
          <p className="text-sm text-foreground mt-1">Brand statements, section anchors</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <span className="label-tech text-slate-400 text-xs">HEADINGS</span>
          <p className="text-sm text-foreground mt-1">Information structure</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <span className="label-tech text-slate-400 text-xs">BODY</span>
          <p className="text-sm text-foreground mt-1">Explanation and instruction</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <span className="label-tech text-slate-400 text-xs">DATA</span>
          <p className="text-sm text-foreground mt-1">Measurement and truth</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {[
          { size: "5xl", px: "48px", example: "Display Hero" },
          { size: "4xl", px: "36px", example: "Section Title" },
          { size: "3xl", px: "30px", example: "Page Heading" },
          { size: "2xl", px: "24px", example: "Card Title" },
          { size: "xl", px: "20px", example: "Subheading" },
          { size: "lg", px: "18px", example: "Large Body" },
          { size: "base", px: "16px", example: "Body Copy" },
          { size: "sm", px: "14px", example: "Caption" },
          { size: "xs", px: "12px", example: "Labels" },
        ].map((item) => (
          <div key={item.size} className="flex items-baseline gap-6 pb-4 border-b border-slate-100">
            <div className="w-16 label-tech text-slate-400">{item.px}</div>
            <div className={`font-ui font-medium text-${item.size} text-foreground flex-1`}>
              {item.example}
            </div>
            <div className="label-tech text-slate-400 hidden sm:block">{item.size.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Uppercase Labels Explanation */}
      <div className="mt-12 p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Uppercase Label Usage</h4>
        <p className="text-sm text-muted-foreground">
          Uppercase labels are used for categorization and scanning, not reading. They should remain short and functional.
        </p>
      </div>

      {/* Line Height & Letter Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-4">Line Height</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="label-tech text-muted-foreground">1.1 - 1.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Body</span>
              <span className="label-tech text-muted-foreground">1.5 - 1.6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Data</span>
              <span className="label-tech text-muted-foreground">1.2</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-4">Letter Spacing</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Logo</span>
              <span className="label-tech text-muted-foreground">-0.02EM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="label-tech text-muted-foreground">-0.01EM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Labels</span>
              <span className="label-tech text-muted-foreground">0.05EM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyScale;
