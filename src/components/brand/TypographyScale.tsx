import { Download, Copy, Check } from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";
import { useState } from "react";

const fontKitCSS = `/* Rhosonics Font Kit */
/* Google Fonts Import - Add to <head> or CSS */
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

/* Font Family Classes */
.font-logo {
  font-family: 'Unbounded', sans-serif;
  font-weight: 500;
}

.font-ui {
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 400;
}

.font-ui-medium {
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 500;
}

.font-ui-semibold {
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 600;
}

.font-ui-bold {
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 700;
}

.font-data {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
}`;

const fontKitHTML = `<!-- Rhosonics Font Kit -->
<!-- Add this to your HTML <head> section -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">`;

const fontKitTailwind = `// Rhosonics Tailwind Font Config
// Add to your tailwind.config.js theme.extend section

fontFamily: {
  logo: ['Unbounded', 'sans-serif'],
  ui: ['Instrument Sans', 'sans-serif'],
  data: ['JetBrains Mono', 'monospace'],
},`;

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const TypographyScale = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

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
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">48px</span>
            <span className="font-ui font-bold text-3xl md:text-4xl lg:text-5xl text-foreground flex-1 tracking-tight">Display Hero</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Headlines, hero sections</span>
          </div>
          
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">36px</span>
            <span className="font-ui font-bold text-2xl md:text-3xl lg:text-4xl text-foreground flex-1 tracking-tight">Section Title</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Major sections</span>
          </div>
          
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">24px</span>
            <span className="font-ui font-semibold text-xl md:text-2xl text-foreground flex-1">Card Title</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Cards, subsections</span>
          </div>
          
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">16px</span>
            <span className="font-ui text-sm md:text-base text-foreground flex-1">Body Copy — Optimized density measurement reduced fresh water intake by 40%.</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Paragraphs</span>
          </div>
          
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">14px</span>
            <span className="font-ui text-sm text-muted-foreground flex-1">Caption — Supporting information and metadata</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Captions, hints</span>
          </div>
          
          <div className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 lg:gap-8 py-4 md:py-6 border-b border-border/30 hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6">
            <span className="font-data text-xs text-muted-foreground w-12 md:w-16 flex-shrink-0">12px</span>
            <span className="font-data text-xs text-foreground uppercase tracking-wider flex-1">LABEL • STATUS • MEASUREMENT</span>
            <span className="text-xs md:text-sm text-muted-foreground md:opacity-0 md:group-hover:opacity-100 transition-opacity">Technical labels</span>
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

      {/* ═══ FONT USAGE GUIDELINES ═══ */}
      <div className="space-y-12">
        {/* Unbounded */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <h3 className="font-ui text-lg font-semibold text-foreground mb-4">Unbounded Usage</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <span className="font-data text-xs text-primary uppercase tracking-wider block mb-3">Use for</span>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Logo wordmark only
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-data text-xs text-destructive uppercase tracking-wider block mb-3">Never for</span>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    Headings or titles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    Body copy or UI text
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    Buttons or labels
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <BrandCallout variant="avoid" title="Logo Only">
              Unbounded is reserved exclusively for the RHOSONICS wordmark. Using it elsewhere dilutes brand recognition.
            </BrandCallout>
          </div>
        </div>

        {/* Instrument Sans */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <h3 className="font-ui text-lg font-semibold text-foreground mb-4">Instrument Sans Usage</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <span className="font-data text-xs text-primary uppercase tracking-wider block mb-3">Use for</span>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    All headings and titles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Body copy and paragraphs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Buttons and navigation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    UI elements and forms
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-data text-xs text-destructive uppercase tracking-wider block mb-3">Never for</span>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    Data values or measurements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                    Technical labels or codes
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <BrandCallout variant="best" title="The Workhorse">
              Instrument Sans handles 90% of all text. If you're unsure which font to use, it's almost always Instrument Sans.
            </BrandCallout>
          </div>
        </div>

        {/* JetBrains Mono */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
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
      </div>

      {/* Why this matters - subtle */}
      <div className="border-l-2 border-border pl-6 max-w-2xl">
        <p className="text-muted-foreground">
          In data-dense environments, typographic consistency reduces cognitive load. 
          Engineers and operators scan faster when visual patterns are predictable.
        </p>
      </div>

      {/* ═══ FONT KIT DOWNLOAD ═══ */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Font Kit</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CSS Snippet */}
          <div className="bg-muted/30 border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider">CSS</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(fontKitCSS, 'css')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedSnippet === 'css' ? (
                    <Check className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => downloadFile(fontKitCSS, 'rhosonics-fonts.css', 'text/css')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <pre className="p-4 text-xs font-data text-muted-foreground overflow-x-auto max-h-48">
              <code>{fontKitCSS}</code>
            </pre>
          </div>

          {/* HTML Snippet */}
          <div className="bg-muted/30 border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider">HTML</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(fontKitHTML, 'html')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedSnippet === 'html' ? (
                    <Check className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => downloadFile(fontKitHTML, 'rhosonics-fonts.html', 'text/html')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <pre className="p-4 text-xs font-data text-muted-foreground overflow-x-auto max-h-48">
              <code>{fontKitHTML}</code>
            </pre>
          </div>

          {/* Tailwind Snippet */}
          <div className="bg-muted/30 border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider">Tailwind</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(fontKitTailwind, 'tailwind')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedSnippet === 'tailwind' ? (
                    <Check className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => downloadFile(fontKitTailwind, 'rhosonics-tailwind-fonts.js', 'text/javascript')}
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  title="Download file"
                >
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <pre className="p-4 text-xs font-data text-muted-foreground overflow-x-auto max-h-48">
              <code>{fontKitTailwind}</code>
            </pre>
          </div>
        </div>

        {/* Font weights summary */}
        <div className="mt-8 p-6 bg-muted/30 border border-border rounded-lg">
          <h4 className="font-ui font-semibold text-foreground mb-4">Required Font Weights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="font-logo text-lg tracking-wide">Unbounded</span>
              <p className="font-data text-xs text-muted-foreground mt-1">500 only</p>
            </div>
            <div>
              <span className="font-ui text-lg">Instrument Sans</span>
              <p className="font-data text-xs text-muted-foreground mt-1">400, 500, 600, 700</p>
            </div>
            <div>
              <span className="font-data text-lg">JetBrains Mono</span>
              <p className="font-data text-xs text-muted-foreground mt-1">500 only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyScale;
