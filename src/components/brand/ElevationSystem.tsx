import { BrandCallout } from "./BrandCallout";

/**
 * Elevation System Section
 * 
 * Documents the 5-level shadow scale and depth principles:
 * - Consistent light source (top-left)
 * - Shadows as alternatives to borders
 * - Elevation levels mapped to component types
 */
export const ElevationSystem = () => {
  const elevationLevels = [
    {
      level: 0,
      name: "None",
      usage: "Flat elements, text, inline content",
      shadow: "none",
      tailwind: "shadow-none",
      cssVar: "--shadow-none",
    },
    {
      level: 1,
      name: "Card",
      usage: "Cards, dropdowns, tooltips",
      shadow: "0 1px 3px 0 hsl(var(--foreground) / 0.08), 0 1px 2px -1px hsl(var(--foreground) / 0.08)",
      tailwind: "shadow-sm",
      cssVar: "--shadow-card",
    },
    {
      level: 2,
      name: "Elevated",
      usage: "Hover states, raised interactive elements",
      shadow: "0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -2px hsl(var(--foreground) / 0.1)",
      tailwind: "shadow-md",
      cssVar: "--shadow-elevated",
    },
    {
      level: 3,
      name: "Modal",
      usage: "Dialogs, overlays, popovers",
      shadow: "0 10px 15px -3px hsl(var(--foreground) / 0.12), 0 4px 6px -4px hsl(var(--foreground) / 0.12)",
      tailwind: "shadow-lg",
      cssVar: "--shadow-modal",
    },
    {
      level: 4,
      name: "Glow",
      usage: "Hero elements, premium focus states",
      shadow: "0 20px 25px -5px hsl(var(--primary) / 0.15), 0 8px 10px -6px hsl(var(--primary) / 0.15)",
      tailwind: "shadow-xl shadow-primary/15",
      cssVar: "--shadow-glow",
    },
  ];

  return (
    <section id="elevation" className="space-y-16">
      <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
        Elevation creates depth and hierarchy through shadows. A consistent light source 
        and restrained usage ensure clarity without visual noise.
      </p>

      {/* Light Source Principle */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
            <h3 className="font-ui text-2xl font-semibold text-foreground">Light Source</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            All shadows originate from a consistent top-left light source. This creates 
            realistic depth and prevents visual confusion from competing shadow directions.
          </p>
          <BrandCallout variant="info" title="Why Top-Left?">
            Western reading patterns move top-left to bottom-right. A top-left light source 
            feels natural and doesn't compete with content flow.
          </BrandCallout>
        </div>

        {/* Visual Demo */}
        <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg border border-border">
          <div className="relative">
            {/* Light source indicator */}
            <div className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-radial from-yellow-200/60 to-transparent rounded-full blur-sm" />
            <div className="absolute -top-6 -left-6 font-data text-xs text-muted-foreground">Light</div>
            
            {/* Demo card with shadow */}
            <div 
              className="w-48 h-32 bg-background rounded-lg flex items-center justify-center"
              style={{ 
                boxShadow: '6px 6px 12px hsl(var(--foreground) / 0.1), -2px -2px 8px hsl(var(--background) / 0.5)' 
              }}
            >
              <span className="text-muted-foreground text-sm">Element</span>
            </div>
            
            {/* Shadow direction arrow */}
            <svg className="absolute -bottom-4 -right-4 w-8 h-8 text-muted-foreground/40" viewBox="0 0 24 24" fill="none">
              <path d="M5 5L19 19M19 19L19 9M19 19L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Elevation Scale */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Elevation Scale</h3>
        </div>

        <div className="space-y-6">
          {elevationLevels.map((level) => (
            <div 
              key={level.level}
              className="group flex flex-col md:flex-row md:items-center gap-6 p-6 border-b border-border/50 hover:bg-muted/20 transition-colors"
            >
              {/* Level indicator */}
              <div className="w-20 flex-shrink-0">
                <span className="font-data text-2xl text-foreground">L{level.level}</span>
              </div>

              {/* Visual demo */}
              <div className="w-40 h-20 flex-shrink-0 flex items-center justify-center">
                <div 
                  className="w-28 h-14 bg-background rounded-lg flex items-center justify-center border border-border/30"
                  style={{ boxShadow: level.shadow }}
                >
                  <span className="font-data text-xs text-muted-foreground uppercase">{level.name}</span>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-ui font-semibold text-foreground mb-1">{level.name}</h4>
                <p className="text-sm text-muted-foreground">{level.usage}</p>
              </div>

              {/* Code */}
              <div className="flex-shrink-0">
                <code className="font-data text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                  {level.tailwind}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shadows vs Borders */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Shadows vs Borders</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* With Border */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wider block mb-4">With Border</span>
            <div className="p-6 bg-background border-2 border-border rounded-lg">
              <h4 className="font-ui font-semibold text-foreground mb-2">Card Title</h4>
              <p className="text-sm text-muted-foreground">Content inside a bordered card. Borders create explicit separation but can feel heavy.</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Best for: Data tables, form groups, explicit containers</p>
          </div>

          {/* With Shadow */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wider block mb-4">With Shadow</span>
            <div className="p-6 bg-background rounded-lg shadow-md">
              <h4 className="font-ui font-semibold text-foreground mb-2">Card Title</h4>
              <p className="text-sm text-muted-foreground">Content inside a shadowed card. Shadows create softer separation and feel more modern.</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Best for: Feature cards, callouts, floating elements</p>
          </div>
        </div>

        <BrandCallout variant="best" title="Less is More">
          Use shadows sparingly. If every element has a shadow, none of them feel elevated. 
          Reserve depth for elements that need to draw attention or indicate interactivity.
        </BrandCallout>
      </div>

      {/* Interactive States */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">04</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Interactive Elevation</h3>
        </div>

        <p className="text-muted-foreground mb-8 max-w-2xl">
          Interactive elements should increase elevation on hover to indicate they're clickable. 
          This creates a natural "lifting" effect that reinforces the interaction.
        </p>

        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <div className="w-32 h-20 bg-background border border-border rounded-lg flex items-center justify-center mb-3 shadow-sm">
              <span className="font-data text-xs text-muted-foreground">Resting</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">L1 → L1</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">→</div>
          
          <div className="text-center">
            <div className="w-32 h-20 bg-background border border-border rounded-lg flex items-center justify-center mb-3 shadow-md -translate-y-0.5">
              <span className="font-data text-xs text-muted-foreground">Hover</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">L1 → L2</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">→</div>
          
          <div className="text-center">
            <div className="w-32 h-20 bg-background border border-border rounded-lg flex items-center justify-center mb-3 shadow-sm translate-y-0.5">
              <span className="font-data text-xs text-muted-foreground">Pressed</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">L2 → L1</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevationSystem;
