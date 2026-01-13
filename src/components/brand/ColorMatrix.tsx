import { BrandCallout } from "./BrandCallout";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

export const ColorMatrix = () => {
  return (
    <section id="colors" className="mb-32">
      <h2 className="section-header">Color System</h2>
      
      {/* Two-column: Intro + Callout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-8">
            Color communicates State, Structure, or Context. 
            Mood and decoration without meaning are not permitted. Every color choice must be justifiable by its functional role.
          </p>

          {/* Color Role Hierarchy */}
          <h3 className="label-tech text-slate-500 mb-4">COLOR WORLDS</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-100 border border-slate-300 rounded-lg">
              <span className="label-tech text-slate-500 mb-2 block">SLATE</span>
              <p className="font-ui font-semibold text-lg text-foreground mb-1">Software</p>
              <p className="text-sm text-muted-foreground">UI structure, text, forms, navigation, data containers</p>
            </div>
            <div className="p-5 bg-mineral-surface border border-mineral-neutral/30 rounded-lg">
              <span className="label-tech text-mineral-deep mb-2 block">MINERAL</span>
              <p className="font-ui font-semibold text-lg text-foreground mb-1">Environment</p>
              <p className="text-sm text-muted-foreground">Field modules, industry panels, outdoor contexts</p>
            </div>
            <div className="p-5 bg-rho-obsidian rounded-lg">
              <span className="label-tech text-slate-400 mb-2 block">OBSIDIAN</span>
              <p className="font-ui font-semibold text-lg text-slate-100 mb-1">Hardware</p>
              <p className="text-sm text-slate-400">Device surfaces, dark UI, physical products</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <BrandCallout variant="avoid" title="Critical Separation">
            Mineral colors are olive/stone environmental tones. 
            They must never substitute for Slate in UI elements.
          </BrandCallout>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-ui font-semibold text-sm text-foreground mb-2">Accessibility</h4>
            <p className="text-xs text-muted-foreground">
              All color combinations maintain WCAG AA contrast (4.5:1 minimum). 
              The Slate scale is calibrated for text readability across light and dark modes.
            </p>
          </div>
        </div>
      </div>

      {/* Signal Colors - Primary Brand */}
      <div className="mb-12">
        <h3 className="label-tech text-primary mb-6">PRIMARY SIGNAL COLORS</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card-base p-5">
            <div className="w-full h-14 bg-primary rounded-md mb-4"></div>
            <h4 className="font-ui font-bold text-foreground text-sm">Rhosonics Green</h4>
            <code className="font-data text-xs text-muted-foreground">#33993C</code>
            <p className="text-xs text-muted-foreground mt-2">Primary actions, active states, brand identity</p>
          </div>
          <div className="card-base p-5">
            <div className="w-full h-14 bg-rho-green-accent rounded-md mb-4"></div>
            <h4 className="font-ui font-bold text-foreground text-sm">Lime Accent</h4>
            <code className="font-data text-xs text-muted-foreground">#73B82E</code>
            <p className="text-xs text-muted-foreground mt-2">Gradient depth, eco indicators, highlights</p>
          </div>
          <div className="card-base p-5">
            <div className="w-full h-14 bg-rho-obsidian rounded-md mb-4"></div>
            <h4 className="font-ui font-bold text-foreground text-sm">Obsidian</h4>
            <code className="font-data text-xs text-muted-foreground">#111522</code>
            <p className="text-xs text-muted-foreground mt-2">Blue-tinted black. Never use pure #000</p>
          </div>
          <div className="card-base p-5">
            <div className="w-full h-14 bg-brand-gradient rounded-md mb-4"></div>
            <h4 className="font-ui font-bold text-foreground text-sm">Brand Gradient</h4>
            <code className="font-data text-xs text-muted-foreground">Lime → Green</code>
            <p className="text-xs text-muted-foreground mt-2">Hero elements, CTAs, featured content</p>
          </div>
        </div>
      </div>

      {/* State Colors */}
      <div className="mb-12">
        <h3 className="label-tech text-slate-500 mb-4">STATE COLORS</h3>
        <p className="text-sm text-muted-foreground mb-6">
          State colors communicate operational status. They must never be used decoratively.
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-ui font-semibold text-green-800">Success</span>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-green-600 rounded"></div>
              <div className="w-8 h-8 bg-green-700 rounded"></div>
            </div>
            <p className="text-xs text-green-700">Confirmations, completed actions, valid states</p>
          </div>
          <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="font-ui font-semibold text-amber-800">Warning</span>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-400 rounded"></div>
              <div className="w-8 h-8 bg-amber-500 rounded"></div>
              <div className="w-8 h-8 bg-amber-600 rounded"></div>
            </div>
            <p className="text-xs text-amber-700">Cautions, attention needed, pending states</p>
          </div>
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-ui font-semibold text-red-800">Error</span>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded"></div>
              <div className="w-8 h-8 bg-red-600 rounded"></div>
              <div className="w-8 h-8 bg-red-700 rounded"></div>
            </div>
            <p className="text-xs text-red-700">Failures, critical alerts, destructive actions</p>
          </div>
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-ui font-semibold text-blue-800">Info</span>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-400 rounded"></div>
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
            </div>
            <p className="text-xs text-blue-700">Neutral information, help text, guidance</p>
          </div>
        </div>
      </div>

      {/* Slate Scale */}
      <div className="mb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="label-tech text-slate-500 mb-4">SLATE SCALE — UI STRUCTURE</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Cool, blue-biased neutrals for all software interfaces. The primary palette for text, backgrounds, and UI chrome.
            </p>
            <div className="card-base p-6">
              <div className="grid grid-cols-10 gap-2 mb-6">
                {[
                  { name: "50", bg: "bg-slate-50", text: "text-slate-600" },
                  { name: "100", bg: "bg-slate-100", text: "text-slate-600" },
                  { name: "200", bg: "bg-slate-200", text: "text-slate-600" },
                  { name: "300", bg: "bg-slate-300", text: "text-slate-700" },
                  { name: "400", bg: "bg-slate-400", text: "text-slate-100" },
                  { name: "500", bg: "bg-slate-500", text: "text-slate-100" },
                  { name: "600", bg: "bg-slate-600", text: "text-slate-100" },
                  { name: "700", bg: "bg-slate-700", text: "text-slate-100" },
                  { name: "800", bg: "bg-slate-800", text: "text-slate-100" },
                  { name: "900", bg: "bg-slate-900", text: "text-slate-100" }
                ].map(shade => (
                  <div key={shade.name} className={`aspect-square ${shade.bg} ${shade.text} rounded flex items-center justify-center`}>
                    <span className="font-data text-[10px] font-bold">{shade.name}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                <div><span className="font-data text-foreground">50-100</span> — Page backgrounds</div>
                <div><span className="font-data text-foreground">200-300</span> — Borders, dividers</div>
                <div><span className="font-data text-foreground">400-600</span> — Secondary text, icons</div>
                <div><span className="font-data text-foreground">700-900</span> — Primary text, headers</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="label-tech text-mineral-deep mb-4">MINERAL SCALE — FIELD CONTEXTS</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Olive/stone tones for environmental and industrial contexts only.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mineral-surface border border-mineral-neutral/30 rounded"></div>
                <div>
                  <span className="font-data text-xs text-foreground">Surface</span>
                  <p className="text-xs text-muted-foreground">Backgrounds, panels</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mineral-neutral rounded"></div>
                <div>
                  <span className="font-data text-xs text-foreground">Neutral</span>
                  <p className="text-xs text-muted-foreground">Accents, borders</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mineral-deep rounded"></div>
                <div>
                  <span className="font-data text-xs text-foreground">Deep</span>
                  <p className="text-xs text-muted-foreground">Text, emphasis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mineral-bronze rounded"></div>
                <div>
                  <span className="font-data text-xs text-foreground">Bronze</span>
                  <p className="text-xs text-muted-foreground">Earthy accents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradients + Application */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="label-tech text-slate-500 mb-4">GRADIENTS</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Flat color is preferred. Gradients add depth or signal transition — never used for decoration.
          </p>
          <div className="space-y-4">
            <div className="h-16 bg-brand-gradient rounded-lg flex items-center justify-between px-4">
              <span className="font-ui font-bold text-primary-foreground">Primary</span>
              <span className="font-data text-xs text-white/80">Hero CTAs, featured content</span>
            </div>
            <div className="h-16 bg-obsidian-gradient rounded-lg flex items-center justify-between px-4">
              <span className="font-ui font-bold text-slate-100">Obsidian</span>
              <span className="font-data text-xs text-slate-400">Dark panels, hardware UI</span>
            </div>
            <div className="h-16 rounded-lg flex items-center justify-between px-4" style={{
              background: 'linear-gradient(145deg, hsl(60 12% 58%) 0%, hsl(60 12% 48%) 100%)'
            }}>
              <span className="font-ui font-bold text-white">Mineral</span>
              <span className="font-data text-xs text-white/80">Field contexts only</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="label-tech text-slate-500 mb-4">COLOR APPLICATION</h3>
          <p className="text-sm text-muted-foreground mb-6">
            When and where to apply each color world.
          </p>
          <div className="card-base p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-data text-xs text-slate-500">CONTEXT</th>
                  <th className="px-4 py-3 text-left font-data text-xs text-slate-500">USE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-muted-foreground">Web application UI</td>
                  <td className="px-4 py-3 font-medium text-foreground">Slate + Green</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-muted-foreground">Technical documentation</td>
                  <td className="px-4 py-3 font-medium text-foreground">Slate + Green</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-muted-foreground">Field/industry panels</td>
                  <td className="px-4 py-3 font-medium text-foreground">Mineral + Green</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-muted-foreground">Hardware device UI</td>
                  <td className="px-4 py-3 font-medium text-foreground">Obsidian + Green</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-muted-foreground">Marketing/brand moments</td>
                  <td className="px-4 py-3 font-medium text-foreground">Gradients allowed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorMatrix;
