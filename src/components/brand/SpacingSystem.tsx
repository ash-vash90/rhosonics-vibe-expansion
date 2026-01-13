import { BrandCallout } from "./BrandCallout";

export const SpacingSystem = () => {
  const spacingScale = [
    { name: "1", px: "4px", use: "Tight inline spacing" },
    { name: "2", px: "8px", use: "Icon gaps, button padding" },
    { name: "4", px: "16px", use: "Standard padding" },
    { name: "6", px: "24px", use: "Card padding" },
    { name: "8", px: "32px", use: "Large component spacing" },
    { name: "16", px: "64px", use: "Section breaks" },
  ];

  return (
    <section id="spacing" className="mb-32">
      <h2 className="section-header">Spacing System</h2>
      
      {/* Two-column: Content + Callout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-8">
            Spacing creates clarity and hierarchy. Consistent spacing allows users to understand 
            structure at a glance, especially in data-dense contexts.
          </p>

          {/* Spacing Scale Visual */}
          <div className="card-base p-8">
            <h3 className="label-tech text-slate-500 mb-6">SPACING SCALE</h3>
            <div className="space-y-4">
              {spacingScale.map((space) => (
                <div key={space.name} className="flex items-center gap-4">
                  <div className="w-12 label-tech text-muted-foreground">{space.name}</div>
                  <div 
                    className="h-4 bg-primary rounded-sm transition-all"
                    style={{ width: space.px }}
                  />
                  <div className="font-data text-sm text-slate-500 w-12">{space.px}</div>
                  <div className="text-sm text-muted-foreground hidden md:block flex-1">{space.use}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-slate-100">
              All spacing is based on 4px increments. No arbitrary values.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <BrandCallout variant="rule" title="Relationship Rule">
            If two elements feel related, spacing should reinforce that relationship. 
            If they feel separate, spacing should make that obvious.
          </BrandCallout>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-ui font-semibold text-foreground mb-3">Why this matters</h4>
            <p className="text-muted-foreground text-sm">
              Industrial interfaces require instant comprehension. 
              Consistent spacing builds visual rhythm that operators learn to trust.
            </p>
          </div>
        </div>
      </div>

      {/* Grid & Radius - full width */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-base p-6">
          <h4 className="label-tech text-slate-500 mb-4">GRID</h4>
          <div className="grid grid-cols-12 gap-1 h-16 mb-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-primary/20 rounded-sm flex items-center justify-center">
                <span className="font-data text-xs text-primary">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            12-column grid with 24px gutters. Flexible for dashboards to documentation.
          </p>
        </div>

        <div className="card-base p-6">
          <h4 className="label-tech text-slate-500 mb-4">BORDER RADIUS</h4>
          <div className="flex flex-wrap gap-6">
            {[
              { name: "sm", value: "2px", class: "rounded-sm" },
              { name: "md", value: "6px", class: "rounded-md" },
              { name: "lg", value: "8px", class: "rounded-lg" },
              { name: "full", value: "50%", class: "rounded-full" },
            ].map((radius) => (
              <div key={radius.name} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 bg-primary ${radius.class}`}></div>
                <span className="font-data text-xs text-muted-foreground">{radius.name}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Consistent radii reinforce the engineered aesthetic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpacingSystem;
