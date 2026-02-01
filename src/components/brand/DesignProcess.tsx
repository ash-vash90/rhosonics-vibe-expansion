import { BrandCallout } from "./BrandCallout";
import { Eye, Layers, Minimize2, Tag, ArrowRight } from "lucide-react";

/**
 * Design Process Section
 * 
 * Documents the Refactoring UI-inspired design methodology:
 * - Feature-first development
 * - Grayscale validation
 * - Emphasize by de-emphasizing
 * - Labels as a last resort
 */
export const DesignProcess = () => {
  const principles = [
    {
      icon: Layers,
      title: "Feature-First Development",
      description: "Start with the actual feature, not the layout. Design the specific functionality before deciding where it goes in the interface.",
      example: "Don't start with 'I need a sidebar'. Start with 'users need to filter by date range'.",
    },
    {
      icon: Eye,
      title: "Grayscale Validation",
      description: "Before shipping any design, convert to grayscale. If hierarchy is unclear without color, fix spacing and typography first.",
      example: "Color should enhance hierarchy, not create it. The structure must work in black and white.",
    },
    {
      icon: Minimize2,
      title: "Emphasize by De-emphasizing",
      description: "The primary way to make something stand out is to make other things stand back. Reduce competing elements rather than amplifying the focus.",
      example: "Instead of making the CTA bigger, make the surrounding text smaller and lighter.",
    },
    {
      icon: Tag,
      title: "Labels as a Last Resort",
      description: "Use formatting, context, and visual cues to communicate meaning before adding text labels. Every label is cognitive load.",
      example: "A green checkmark in a status column doesn't need 'Success' written next to it.",
    },
  ];

  return (
    <section id="design-process" className="space-y-16">
      <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
        How we approach design decisions. These principles guide the process from concept to implementation, 
        ensuring every interface prioritizes clarity and function.
      </p>

      {/* Principles Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {principles.map((principle, idx) => (
          <div 
            key={principle.title}
            className="group relative p-8 bg-muted/30 border border-border rounded-lg hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/15 transition-colors">
                <principle.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-data text-xs text-primary uppercase tracking-wider block mb-1">
                  0{idx + 1}
                </span>
                <h3 className="font-ui text-xl font-semibold text-foreground">
                  {principle.title}
                </h3>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {principle.description}
            </p>
            
            <div className="flex items-start gap-2 pt-4 border-t border-border/50">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground italic">
                {principle.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Diagram */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Design Workflow</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {[
            { step: "01", label: "Functionality", desc: "What does the user need to do?" },
            { step: "02", label: "Hierarchy", desc: "What's most important?" },
            { step: "03", label: "Grayscale", desc: "Does it work without color?" },
            { step: "04", label: "Polish", desc: "Add color, depth, motion" },
          ].map((phase, idx) => (
            <div key={phase.step} className="flex-1 relative">
              <div className="p-6 bg-muted/20 border border-border rounded-lg h-full">
                <span className="font-data text-xs text-primary uppercase tracking-wider block mb-2">
                  Step {phase.step}
                </span>
                <h4 className="font-ui font-semibold text-foreground mb-2">{phase.label}</h4>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mindset Callouts */}
      <div className="grid md:grid-cols-2 gap-6">
        <BrandCallout variant="best" title="Be a Pessimist When Building">
          Start simple. Don't add features, colors, or effects until you've proven the core functionality works. 
          Every addition must justify itself.
        </BrandCallout>
        
        <BrandCallout variant="info" title="Be an Optimist When Polishing">
          Once the structure is solid, explore. Try bold colors, subtle animations, refined typography. 
          Polish is where personality emerges.
        </BrandCallout>
      </div>

      {/* Grayscale Test Visual */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Grayscale Validation</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Color Version */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wider block mb-4">With Color</span>
            <div className="p-6 bg-background border border-border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-ui font-semibold text-foreground">Density Reading</span>
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-data rounded">LIVE</span>
              </div>
              <div className="font-data text-4xl text-foreground">1.4502 <span className="text-lg text-muted-foreground">g/L</span></div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-eco-surface text-primary text-xs font-data rounded border border-eco-border">+2.3%</span>
                <span className="text-sm text-muted-foreground">from average</span>
              </div>
            </div>
          </div>

          {/* Grayscale Version */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wider block mb-4">Grayscale Test</span>
            <div className="p-6 bg-background border border-border rounded-lg space-y-4 grayscale">
              <div className="flex items-center justify-between">
                <span className="font-ui font-semibold text-foreground">Density Reading</span>
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-data rounded">LIVE</span>
              </div>
              <div className="font-data text-4xl text-foreground">1.4502 <span className="text-lg text-muted-foreground">g/L</span></div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-eco-surface text-primary text-xs font-data rounded border border-eco-border">+2.3%</span>
                <span className="text-sm text-muted-foreground">from average</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 max-w-2xl">
          Both versions maintain clear hierarchy. The primary measurement (1.4502) dominates through size, 
          the status badge is distinct through position and contrast, and the trend indicator is secondary 
          through size reduction. Color enhances but doesn't create the hierarchy.
        </p>
      </div>
    </section>
  );
};

export default DesignProcess;
