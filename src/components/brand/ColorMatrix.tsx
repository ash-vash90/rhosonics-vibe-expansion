import { BrandCallout } from "./BrandCallout";

export const ColorMatrix = () => {
  return (
    <section id="colors" className="mb-32">
      <h2 className="section-header">Color System</h2>
      
      <p className="text-muted-foreground text-lg mb-16 max-w-3xl">
        Color follows the same layer philosophy as the visual system: Foundations establish structure, 
        Signals communicate action and state, Contextual elements provide situational relevance.
      </p>

      {/* FOUNDATIONS */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-slate-900 rounded-sm"></div>
          <h3 className="font-ui text-xl font-semibold text-foreground">Foundations</h3>
          <span className="font-data text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded">CONSTANT</span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Slate Scale */}
          <div>
            <h4 className="label-tech text-slate-500 mb-6">SLATE — SOFTWARE UI</h4>
            <div className="space-y-4">
              {[
                { name: "Slate 50", hex: "#F8FAFC", rgb: "248, 250, 252", hsl: "210 40% 98%", bg: "bg-slate-50", text: "text-slate-700", use: "Page backgrounds" },
                { name: "Slate 200", hex: "#E2E8F0", rgb: "226, 232, 240", hsl: "214 32% 91%", bg: "bg-slate-200", text: "text-slate-700", use: "Borders, dividers" },
                { name: "Slate 500", hex: "#64748B", rgb: "100, 116, 139", hsl: "215 19% 35%", bg: "bg-slate-500", text: "text-white", use: "Secondary text" },
                { name: "Slate 900", hex: "#0F172A", rgb: "15, 23, 42", hsl: "222 47% 11%", bg: "bg-slate-900", text: "text-white", use: "Primary text" },
              ].map(color => (
                <div key={color.name} className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${color.bg} rounded-lg border border-slate-200 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-ui font-semibold text-foreground">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground space-x-3">
                      <span>{color.hex}</span>
                      <span className="text-slate-300">|</span>
                      <span>rgb({color.rgb})</span>
                      <span className="text-slate-300">|</span>
                      <span>hsl({color.hsl})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Obsidian */}
          <div>
            <h4 className="label-tech text-slate-500 mb-6">OBSIDIAN — HARDWARE & DARK UI</h4>
            <div className="space-y-4">
              {[
                { name: "Obsidian", hex: "#111522", rgb: "17, 21, 34", hsl: "226 33% 10%", bg: "bg-rho-obsidian", text: "text-white", use: "Dark surfaces, devices" },
                { name: "Obsidian Light", hex: "#1E2433", rgb: "30, 36, 51", hsl: "226 25% 15%", bg: "bg-[#1E2433]", text: "text-white", use: "Dark panels, cards" },
              ].map(color => (
                <div key={color.name} className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${color.bg} rounded-lg border border-slate-700 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-ui font-semibold text-foreground">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground space-x-3">
                      <span>{color.hex}</span>
                      <span className="text-slate-300">|</span>
                      <span>rgb({color.rgb})</span>
                      <span className="text-slate-300">|</span>
                      <span>hsl({color.hsl})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Never use pure black (#000).</strong> Obsidian's blue tint creates visual cohesion with the Slate scale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNALS */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-primary rounded-sm"></div>
          <h3 className="font-ui text-xl font-semibold text-foreground">Signals</h3>
          <span className="font-data text-[10px] bg-primary text-white px-2 py-0.5 rounded">INTENTIONAL</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Primary Brand */}
          <div>
            <h4 className="label-tech text-primary mb-6">BRAND</h4>
            <div className="space-y-4">
              {[
                { name: "Rhosonics Green", hex: "#33993C", rgb: "51, 153, 60", hsl: "125 50% 40%", bg: "bg-primary", use: "Primary actions, identity" },
                { name: "Lime Accent", hex: "#73B82E", rgb: "115, 184, 46", hsl: "90 60% 45%", bg: "bg-rho-green-accent", use: "Gradients, highlights" },
              ].map(color => (
                <div key={color.name} className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${color.bg} rounded-lg flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="font-ui font-semibold text-foreground block">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground">
                      <div>{color.hex}</div>
                      <div>rgb({color.rgb})</div>
                      <div>hsl({color.hsl})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* State: Positive */}
          <div>
            <h4 className="label-tech text-green-600 mb-6">STATE — POSITIVE</h4>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <span className="font-ui font-semibold text-foreground block">Success Green</span>
                  <span className="text-xs text-muted-foreground">Confirmations, valid states</span>
                </div>
                <div className="font-data text-xs text-muted-foreground">
                  <div>#16A34A</div>
                  <div>rgb(22, 163, 74)</div>
                  <div>hsl(142 72% 36%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* State: Negative */}
          <div>
            <h4 className="label-tech text-red-600 mb-6">STATE — NEGATIVE</h4>
            <div className="space-y-4">
              {[
                { name: "Warning Amber", hex: "#D97706", rgb: "217, 119, 6", hsl: "32 95% 44%", bg: "bg-amber-600", use: "Cautions, attention" },
                { name: "Error Red", hex: "#DC2626", rgb: "220, 38, 38", hsl: "0 84% 51%", bg: "bg-red-600", use: "Failures, critical" },
              ].map(color => (
                <div key={color.name} className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${color.bg} rounded-lg flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="font-ui font-semibold text-foreground block">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground">
                      <div>{color.hex}</div>
                      <div>rgb({color.rgb})</div>
                      <div>hsl({color.hsl})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BrandCallout variant="rule" title="State Color Rule">
          State colors communicate operational status only. They must never be used decoratively or to "add visual interest."
        </BrandCallout>
      </div>

      {/* CONTEXTUAL */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-mineral-neutral rounded-sm"></div>
          <h3 className="font-ui text-xl font-semibold text-foreground">Contextual</h3>
          <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5 rounded">SITUATIONAL</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mineral Scale */}
          <div>
            <h4 className="label-tech text-mineral-deep mb-6">MINERAL — FIELD ENVIRONMENTS</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Olive/stone tones for industrial and outdoor contexts. Never substitute for Slate in software UI.
            </p>
            <div className="space-y-4">
              {[
                { name: "Mineral Surface", hex: "#EBEADF", rgb: "235, 234, 223", hsl: "55 15% 91%", bg: "bg-mineral-surface", border: "border-mineral-neutral/30", use: "Backgrounds" },
                { name: "Mineral Neutral", hex: "#848058", rgb: "132, 128, 88", hsl: "60 12% 48%", bg: "bg-mineral-neutral", border: "border-transparent", use: "Accents, borders" },
                { name: "Mineral Deep", hex: "#565443", rgb: "86, 84, 67", hsl: "65 14% 32%", bg: "bg-mineral-deep", border: "border-transparent", use: "Text, emphasis" },
                { name: "Mineral Bronze", hex: "#746C4D", rgb: "116, 108, 77", hsl: "55 20% 38%", bg: "bg-mineral-bronze", border: "border-transparent", use: "Earthy accents" },
              ].map(color => (
                <div key={color.name} className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${color.bg} ${color.border} border rounded-lg flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="font-ui font-semibold text-foreground block">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground">
                      <div>{color.hex}</div>
                      <div>rgb({color.rgb})</div>
                      <div>hsl({color.hsl})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eco Tints */}
          <div>
            <h4 className="label-tech text-primary mb-6">ECO — SUSTAINABILITY</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Subtle green tints for environmental metrics. Used sparingly and always tied to measurable data.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { name: "Eco Surface", hex: "#ECFDF0", rgb: "236, 253, 240", hsl: "125 43% 95%", bg: "bg-eco-surface", border: "border-eco-border", use: "Eco card backgrounds" },
                { name: "Eco Border", hex: "#C6F7D0", rgb: "198, 247, 208", hsl: "125 50% 90%", bg: "bg-[#C6F7D0]", border: "border-transparent", use: "Eco component borders" },
              ].map(color => (
                <div key={color.name} className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${color.bg} ${color.border} border rounded-lg flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="font-ui font-semibold text-foreground block">{color.name}</span>
                      <span className="text-xs text-muted-foreground">{color.use}</span>
                    </div>
                    <div className="font-data text-xs text-muted-foreground">
                      <div>{color.hex}</div>
                      <div>rgb({color.rgb})</div>
                      <div>hsl({color.hsl})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <BrandCallout variant="avoid" title="Contextual Constraint">
              Contextual colors are not brand identifiers. They help users orient to a specific environment or domain — nothing more.
            </BrandCallout>
          </div>
        </div>
      </div>

      {/* GRADIENTS */}
      <div>
        <h3 className="label-tech text-slate-500 mb-6">GRADIENTS</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Flat color is preferred. Gradients add depth or signal transition — never used for decoration. 
          Reserved for hero elements and primary CTAs.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="h-20 bg-brand-gradient rounded-lg mb-4"></div>
            <h4 className="font-ui font-semibold text-foreground mb-1">Primary Gradient</h4>
            <p className="font-data text-xs text-muted-foreground">
              linear-gradient(135deg, #73B82E 0%, #33993C 100%)
            </p>
            <p className="text-xs text-muted-foreground mt-2">Hero CTAs, featured content</p>
          </div>
          <div>
            <div className="h-20 bg-obsidian-gradient rounded-lg mb-4"></div>
            <h4 className="font-ui font-semibold text-foreground mb-1">Obsidian Gradient</h4>
            <p className="font-data text-xs text-muted-foreground">
              linear-gradient(180deg, #1E2433 0%, #111522 100%)
            </p>
            <p className="text-xs text-muted-foreground mt-2">Dark panels, hardware UI</p>
          </div>
          <div>
            <div className="h-20 rounded-lg mb-4" style={{
              background: 'linear-gradient(145deg, #9A9573 0%, #848058 100%)'
            }}></div>
            <h4 className="font-ui font-semibold text-foreground mb-1">Mineral Gradient</h4>
            <p className="font-data text-xs text-muted-foreground">
              linear-gradient(145deg, #9A9573 0%, #848058 100%)
            </p>
            <p className="text-xs text-muted-foreground mt-2">Field contexts only</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorMatrix;
