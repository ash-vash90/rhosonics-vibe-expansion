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
    <section className="space-y-8">
      <p className="text-lg text-slate-600 max-w-2xl">
        Positioning defines what the brand promises. Principles define how we deliver. 
        They resolve ambiguity when multiple design options are possible.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {principles.map((principle) => (
          <div 
            key={principle.title} 
            className="p-6 border border-border rounded-lg hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <principle.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-ui text-lg font-semibold text-foreground pt-1">{principle.title}</h4>
            </div>
            
            <p className="text-foreground mb-3">{principle.meaning}</p>
            <p className="text-sm text-slate-500">{principle.practice}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandPrinciples;
