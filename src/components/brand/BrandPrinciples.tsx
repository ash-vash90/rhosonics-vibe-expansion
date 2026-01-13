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
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {principles.map((principle) => (
          <div key={principle.title} className="group">
            <div className="flex items-center gap-3 mb-3">
              <principle.icon className="w-5 h-5 text-primary" />
              <h4 className="font-ui text-lg font-semibold text-foreground">{principle.title}</h4>
            </div>
            
            <p className="text-foreground mb-2">{principle.meaning}</p>
            <p className="text-sm text-slate-500">{principle.practice}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandPrinciples;
