import { Leaf, Recycle, Droplets } from "@/lib/icons";

export const EcoComponents = () => {
  return (
    <section id="eco" className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="label-tech text-primary bg-eco-surface px-3 py-1.5 rounded border border-eco-border">
            ECO_PACK
          </span>
        </div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Sustainability metrics are operational outcomes
          <span className="text-muted-foreground">, not marketing claims. Every 0.1% accuracy improvement is waste prevented.</span>
        </p>
      </div>

      {/* Main Metrics - Full width split */}
      <div className="grid lg:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Resource Recovery */}
        <div className="bg-eco-surface p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-topo opacity-30"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <span className="label-tech text-primary">RESOURCE RECOVERY</span>
              <div className="w-10 h-10 rounded-full bg-eco-surface border border-eco-border flex items-center justify-center text-primary">
                <Leaf className="w-5 h-5" />
              </div>
            </div>

            <div className="mb-6">
              <div className="font-data text-6xl md:text-7xl text-primary mb-2">85%</div>
              <div className="font-ui text-lg text-muted-foreground">Water Recycled</div>
            </div>

            <p className="text-muted-foreground mb-8 max-w-md">
              Optimized density measurement reduced fresh water intake by 15,000L today.
            </p>

            <button className="chamfer-shape bg-primary/10 text-primary px-5 py-2.5 font-data text-xs uppercase tracking-wider border border-eco-border hover:bg-primary hover:text-primary-foreground transition-all">
              View Eco Report
            </button>
          </div>
        </div>

        {/* Carbon Reduction */}
        <div className="bg-eco-surface/50 p-10 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary block mb-2">CARBON IMPACT</span>
              <h3 className="font-ui font-bold text-2xl text-foreground">CO2 Reduction</h3>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-border" viewBox="0 0 80 80">
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
                <div className="font-data text-3xl font-bold text-foreground">-42%</div>
                <div className="font-data text-xs text-muted-foreground">YTD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eco Metrics - Horizontal strip */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-6">ECO METRIC PATTERNS</h3>
        <div className="flex items-stretch border-t border-b border-border">
          {[
            { icon: Droplets, label: "WATER SAVED", period: "Today", value: "12.4K", unit: "Liters" },
            { icon: Recycle, label: "WASTE REDUCED", period: "This Week", value: "-28%", unit: "vs Baseline" },
            { icon: Leaf, label: "CARBON OFFSET", period: "YTD", value: "847", unit: "Tons CO2e" },
          ].map((metric, idx) => (
            <div key={idx} className="flex-1 py-8 px-6 border-r border-border last:border-r-0 group hover:bg-eco-surface/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-eco-surface border border-eco-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <metric.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="label-tech text-muted-foreground">{metric.label}</div>
                  <div className="font-ui text-sm font-medium text-foreground">{metric.period}</div>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-data text-4xl md:text-5xl text-primary">{metric.value}</span>
                <span className="font-data text-sm text-muted-foreground">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Design Principles - Numbered list */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-6">DESIGN PRINCIPLES</h3>
        <div className="space-y-0 border-t border-border">
          {[
            { num: "01", title: "Subtle by Default", desc: "Integrated naturally. No 'greenwashing' with over-the-top eco imagery." },
            { num: "02", title: "Data First", desc: "Every claim tied to measurable data. Show numbers, not sentiment." },
            { num: "03", title: "Contextual", desc: "Topographic patterns used exclusively on eco components." },
          ].map((principle, idx) => (
            <div key={idx} className="flex items-start gap-6 py-6 border-b border-border group hover:bg-muted/30 transition-colors px-4 -mx-4">
              <span className="font-data text-2xl text-primary">{principle.num}</span>
              <div>
                <h4 className="font-ui font-bold text-lg text-foreground mb-1">{principle.title}</h4>
                <p className="text-muted-foreground">{principle.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoComponents;
