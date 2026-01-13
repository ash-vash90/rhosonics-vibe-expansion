import { BrandCallout } from "./BrandCallout";

export const SpacingSystem = () => {
  const spacingScale = [
    { name: "1", px: "4px", use: "Tight inline spacing" },
    { name: "2", px: "8px", use: "Icon gaps, button padding" },
    { name: "3", px: "12px", use: "Small component gaps" },
    { name: "4", px: "16px", use: "Standard padding" },
    { name: "6", px: "24px", use: "Card padding, section gaps" },
    { name: "8", px: "32px", use: "Large component spacing" },
    { name: "12", px: "48px", use: "Section margins" },
    { name: "16", px: "64px", use: "Major section breaks" },
    { name: "20", px: "80px", use: "Page-level spacing" },
    { name: "32", px: "128px", use: "Hero sections" },
  ];

  return (
    <section id="spacing" className="mb-32">
      <h2 className="section-header">Spacing System</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Spacing in the Rhosonics system is functional, not expressive. It creates clarity, 
        hierarchy, and rhythm — not personality. Consistent spacing allows users to understand 
        structure at a glance, especially in data-dense and operational contexts.
      </p>

      {/* Core Principle */}
      <p className="text-lg font-medium text-foreground mb-12 max-w-2xl">
        Consistency over creativity. Structure before expression.
      </p>

      {/* Spacing Philosophy */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Philosophy</h3>
        <p className="text-muted-foreground mb-4">
          Rhosonics uses a strict, predictable spacing system because predictability builds trust. 
          When spacing behaves consistently, users can focus on the information rather than the interface.
        </p>
        <p className="text-muted-foreground">
          Spacing is not used to decorate or dramatize content. It is used to separate, group, 
          and prioritize information clearly.
        </p>
      </div>

      {/* Spacing Scale Rules */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Scale Rules</h3>
        <ul className="space-y-2 text-muted-foreground mb-6 max-w-2xl">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>All spacing is based on <strong className="text-foreground">4px increments</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>No arbitrary spacing values are allowed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Larger spacing communicates structural breaks, not importance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Smaller spacing communicates related information, not compression</span>
          </li>
        </ul>

        <BrandCallout variant="rule" title="Relationship Rule">
          If two elements feel related, spacing should reinforce that relationship. 
          If they feel separate, spacing should make that obvious.
        </BrandCallout>
      </div>

      {/* Spacing Usage Guidance */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Usage Guidance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div className="card-base p-4">
            <span className="label-tech text-primary">TIGHT</span>
            <p className="text-sm text-muted-foreground mt-1">Within components</p>
          </div>
          <div className="card-base p-4">
            <span className="label-tech text-primary">MEDIUM</span>
            <p className="text-sm text-muted-foreground mt-1">Between related components</p>
          </div>
          <div className="card-base p-4">
            <span className="label-tech text-primary">LARGE</span>
            <p className="text-sm text-muted-foreground mt-1">Between sections and concepts</p>
          </div>
          <div className="card-base p-4">
            <span className="label-tech text-primary">VERY LARGE</span>
            <p className="text-sm text-muted-foreground mt-1">Page-level or conceptual breaks only</p>
          </div>
        </div>
      </div>

      {/* Spacing Scale Visual */}
      <div className="card-base p-8 mb-8">
        <h3 className="label-tech text-slate-500 mb-6">SPACING SCALE</h3>
        <div className="space-y-4">
          {spacingScale.map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <div className="w-16 label-tech text-muted-foreground">{space.name}</div>
              <div 
                className="h-4 bg-primary rounded-sm transition-all"
                style={{ width: space.px }}
              />
              <div className="font-data text-sm text-slate-500 w-16">{space.px}</div>
              <div className="text-sm text-muted-foreground hidden md:block">{space.use}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-base p-6">
          <h4 className="label-tech text-slate-500 mb-4">GRID COLUMNS</h4>
          <div className="grid grid-cols-12 gap-1 h-20 mb-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-primary/20 rounded-sm flex items-center justify-center">
                <span className="font-data text-xs text-primary">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            12-column grid with 24px gutters. Content areas span 8-10 columns on desktop.
          </p>
        </div>

        <div className="card-base p-6">
          <h4 className="label-tech text-slate-500 mb-4">CONTAINER WIDTHS</h4>
          <div className="space-y-3">
            {[
              { name: "sm", width: "640px", use: "Mobile max" },
              { name: "md", width: "768px", use: "Tablet" },
              { name: "lg", width: "1024px", use: "Desktop" },
              { name: "xl", width: "1280px", use: "Wide desktop" },
              { name: "2xl", width: "1400px", use: "Max content" },
            ].map((container) => (
              <div key={container.name} className="flex justify-between items-center">
                <span className="font-data text-sm text-primary">{container.name}</span>
                <span className="text-sm text-foreground">{container.width}</span>
                <span className="text-sm text-muted-foreground hidden sm:block">{container.use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className="mt-8 card-base p-6">
        <h4 className="label-tech text-slate-500 mb-4">BORDER RADIUS</h4>
        <div className="flex flex-wrap gap-6">
          {[
            { name: "none", value: "0", class: "rounded-none" },
            { name: "sm", value: "2px", class: "rounded-sm" },
            { name: "default", value: "6px", class: "rounded-md" },
            { name: "lg", value: "8px", class: "rounded-lg" },
            { name: "full", value: "50%", class: "rounded-full" },
          ].map((radius) => (
            <div key={radius.name} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary ${radius.class}`}></div>
              <span className="font-data text-xs text-muted-foreground">{radius.name}</span>
              <span className="text-xs text-slate-400">{radius.value}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Default card radius is 6px. The chamfered button uses a clip-path instead of border-radius.
        </p>
      </div>
    </section>
  );
};

export default SpacingSystem;
