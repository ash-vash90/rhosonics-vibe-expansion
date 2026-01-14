import { Focus, Sparkles, Wrench, Link2 } from "lucide-react";

const BrandPrinciples = () => {
  const principles = [
    {
      icon: Focus,
      title: "Precision before decoration",
      meaning: "Information clarity always takes priority over visual flourish.",
      practice: "Data and key messages are visually dominant. Decorative elements are secondary."
    },
    {
      icon: Sparkles,
      title: "Expression with intent",
      meaning: "The system allows for expressive elements — but only where they serve a clear role.",
      practice: "Color signals state. Gradients add depth, not distraction. Expressive elements are contextual."
    },
    {
      icon: Wrench,
      title: "Engineered, not styled",
      meaning: "The brand should feel designed with purpose, not styled for effect.",
      practice: "Layouts follow structural logic. Spacing is systematic. Motion communicates feedback."
    },
    {
      icon: Link2,
      title: "Consistency enables flexibility",
      meaning: "A strong core system allows variation without fragmentation.",
      practice: "Core elements remain stable. Contextual variations are defined. No sub-brands."
    }
  ];

  return (
    <section className="space-y-12">
      <p className="text-lg text-muted-foreground max-w-2xl">
        Positioning defines what the brand promises. Principles define how we deliver. 
        They resolve ambiguity when multiple design options are possible.
      </p>
      
      {/* Numbered list format - generous spacing, no cards */}
      <div className="space-y-0">
        {principles.map((principle, i) => (
          <div 
            key={principle.title} 
            className="group py-6 md:py-10 border-b border-border/50 first:border-t hover:bg-muted/20 transition-colors -mx-4 md:-mx-6 px-4 md:px-6"
          >
            {/* Mobile: Stack number/icon with content */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Number + Icon */}
              <div className="flex flex-col items-start gap-2 md:gap-3 flex-shrink-0">
                <span className="font-data text-xl md:text-2xl text-primary/40 group-hover:text-primary transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <principle.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-ui text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {principle.title}
                </h4>
                <p className="text-foreground mb-2 md:mb-4 text-base md:text-lg">{principle.meaning}</p>
                <p className="text-muted-foreground text-sm md:text-base">{principle.practice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandPrinciples;
