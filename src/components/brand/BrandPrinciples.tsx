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
            className="group grid grid-cols-12 gap-6 py-10 border-b border-border/50 first:border-t hover:bg-muted/20 transition-colors -mx-6 px-6"
          >
            {/* Number + Icon */}
            <div className="col-span-1 flex flex-col items-start gap-3">
              <span className="font-data text-2xl text-primary/40 group-hover:text-primary transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <principle.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            {/* Content */}
            <div className="col-span-11 lg:col-span-8">
              <h4 className="font-ui text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {principle.title}
              </h4>
              <p className="text-foreground mb-4 text-lg">{principle.meaning}</p>
              <p className="text-muted-foreground">{principle.practice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandPrinciples;
