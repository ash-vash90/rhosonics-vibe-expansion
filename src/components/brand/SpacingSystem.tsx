export const SpacingSystem = () => {
  const spacingScale = [
    { name: "1", px: 4, use: "Tight inline spacing" },
    { name: "2", px: 8, use: "Icon gaps, button padding" },
    { name: "4", px: 16, use: "Standard padding" },
    { name: "6", px: 24, use: "Card padding" },
    { name: "8", px: 32, use: "Large component spacing" },
    { name: "16", px: 64, use: "Section breaks" },
  ];

  const maxPx = 64;

  return (
    <section id="spacing" className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-6">Spacing System</h2>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Spacing communicates meaning. If two elements feel related, spacing reinforces 
          that relationship. If they feel separate, spacing makes that obvious.
        </p>
      </div>

      {/* Visual Ruler Scale */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Scale</h3>
          <span className="text-sm text-muted-foreground ml-auto">All spacing based on 4px increments</span>
        </div>

        <div className="space-y-0">
          {spacingScale.map((space) => (
            <div 
              key={space.name} 
              className="group flex items-stretch border-b border-border hover:bg-muted/30 transition-colors"
            >
              {/* Token Name */}
              <div className="w-20 py-6 flex items-center">
                <span className="font-data text-sm text-foreground">{space.name}</span>
              </div>
              
              {/* Visual Bar */}
              <div className="flex-1 py-6 flex items-center">
                <div className="relative w-full h-6">
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 bg-primary rounded-sm transition-all group-hover:h-5"
                    style={{ width: `${(space.px / maxPx) * 100}%` }}
                  />
                  {/* Ruler marks */}
                  <div className="absolute top-0 left-0 w-full h-1 flex">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 border-l border-slate-200 first:border-l-0"
                        style={{ opacity: i % 4 === 0 ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pixel Value */}
              <div className="w-20 py-6 flex items-center justify-end">
                <span className="font-data text-sm text-muted-foreground">{space.px}px</span>
              </div>

              {/* Usage */}
              <div className="w-48 py-6 pl-8 hidden md:flex items-center">
                <span className="text-sm text-muted-foreground">{space.use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid & Radius */}
      <div className="grid md:grid-cols-2 gap-16">
        {/* Grid */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
            <h3 className="font-ui text-2xl font-semibold text-foreground">Grid</h3>
          </div>
          
          <div className="grid grid-cols-12 gap-1 h-20 mb-6">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="bg-primary/15 hover:bg-primary/25 transition-colors flex items-center justify-center"
              >
                <span className="font-data text-xs text-primary/60">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            12-column grid with 24px gutters. Flexible for dashboards to documentation.
          </p>
        </div>

        {/* Border Radius */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
            <h3 className="font-ui text-2xl font-semibold text-foreground">Border Radius</h3>
          </div>
          
          <div className="flex gap-8 mb-6">
            {[
              { name: "sm", value: "2px", class: "rounded-sm" },
              { name: "md", value: "6px", class: "rounded-md" },
              { name: "lg", value: "8px", class: "rounded-lg" },
              { name: "full", value: "50%", class: "rounded-full" },
            ].map((radius) => (
              <div key={radius.name} className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 bg-primary ${radius.class}`} />
                <div className="text-center">
                  <span className="font-data text-xs text-foreground block">{radius.name}</span>
                  <span className="font-data text-xs text-muted-foreground">{radius.value}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            Consistent radii reinforce the engineered aesthetic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpacingSystem;
