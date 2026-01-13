import { Leaf, Recycle, Droplets } from "lucide-react";

export const EcoComponents = () => {
  return (
    <section id="eco" className="mb-32">
      <h2 className="section-header flex items-center gap-3">
        Sustainability Modules{" "}
        <span className="text-xs font-data text-primary bg-eco-surface px-2 py-1 rounded border border-eco-border">
          ECO_PACK
        </span>
      </h2>
      <p className="text-muted-foreground mb-4">
        Sustainability metrics are operational outcomes, not marketing claims.
      </p>
      <p className="text-muted-foreground mb-8">
        Every 0.1% accuracy improvement is waste prevented. We track this because customers asked.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Resource Recovery Card */}
        <div className="card-eco p-8 bg-pattern-topo relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="label-tech text-primary">RESOURCE RECOVERY</span>
              <div className="w-8 h-8 rounded-full bg-card border border-eco-border flex items-center justify-center text-primary">
                <Leaf className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-end gap-2 mb-2">
              <span className="font-ui font-bold text-5xl text-primary">85%</span>
              <span className="font-data text-sm text-muted-foreground mb-2">Water Recycled</span>
            </div>

            <p className="font-ui text-sm text-muted-foreground mb-6">
              Optimized density measurement reduced fresh water intake by 15,000L today.
            </p>

            <button className="chamfer-shape bg-primary/10 text-primary px-5 py-2.5 font-data text-xs uppercase tracking-wider border border-eco-border hover:bg-primary hover:text-primary-foreground transition-all">
              View Eco Report
            </button>
          </div>
        </div>

        {/* Carbon Reduction Card */}
        <div className="card-eco p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="label-tech text-primary">CARBON IMPACT</span>
              <h3 className="font-ui font-bold text-2xl text-foreground mt-1">CO2 Reduction</h3>
            </div>
          </div>

          <div className="flex items-center justify-center py-4">
            {/* Circular Metric */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-slate-200" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="none" />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full text-primary"
                viewBox="0 0 80 80"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="220"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center">
                <div className="font-ui font-bold text-2xl text-foreground">-42%</div>
                <div className="font-data text-xs text-muted-foreground">YTD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eco Metrics Grid */}
      <h3 className="label-tech text-slate-500 mb-4">ECO METRIC PATTERNS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-eco p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-card border border-eco-border flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="label-tech text-muted-foreground">WATER SAVED</div>
              <div className="font-ui font-bold text-foreground">Today</div>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-ui text-4xl font-bold text-primary">12.4K</span>
            <span className="font-data text-sm text-muted-foreground">Liters</span>
          </div>
        </div>

        <div className="card-eco p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-card border border-eco-border flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="label-tech text-muted-foreground">WASTE REDUCED</div>
              <div className="font-ui font-bold text-foreground">This Week</div>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-ui text-4xl font-bold text-primary">-28%</span>
            <span className="font-data text-sm text-muted-foreground">vs Baseline</span>
          </div>
        </div>

        <div className="card-eco p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-card border border-eco-border flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="label-tech text-muted-foreground">CARBON OFFSET</div>
              <div className="font-ui font-bold text-foreground">YTD</div>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-ui text-4xl font-bold text-primary">847</span>
            <span className="font-data text-sm text-muted-foreground">Tons CO2e</span>
          </div>
        </div>
      </div>

      {/* Eco Contrast Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-xl">
        <div className="flex items-start gap-2">
          <span className="text-amber-600 font-bold">⚠</span>
          <div>
            <div className="font-ui font-medium text-amber-800 mb-1">Contrast Verification Required</div>
            <p className="text-sm text-amber-700">
              Eco surfaces lean green intentionally. Verify text on eco-surface backgrounds meets 
              <strong> WCAG AA 4.5:1 contrast ratio</strong>. Reserve heavy green fills for status/CTA regions, 
              not entire modules. Let numbers do the work.
            </p>
          </div>
        </div>
      </div>

      {/* Eco Design Principles */}
      <div className="p-6 bg-eco-surface rounded-lg border border-eco-border">
        <h4 className="font-ui font-bold text-lg mb-4 text-foreground">Eco Design Principles</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="label-tech text-primary mb-2">SUBTLE BY DEFAULT</div>
            <p className="text-sm text-muted-foreground">
              Sustainability messaging is integrated naturally. Avoid "greenwashing" with over-the-top eco imagery.
            </p>
          </div>
          <div>
            <div className="label-tech text-primary mb-2">DATA FIRST</div>
            <p className="text-sm text-muted-foreground">
              Every eco claim must be tied to measurable data. Show the numbers, not just the sentiment.
            </p>
          </div>
          <div>
            <div className="label-tech text-primary mb-2">CONTEXTUAL PATTERN</div>
            <p className="text-sm text-muted-foreground">
              The topographic line pattern represents natural terrain and is used exclusively on eco components.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoComponents;