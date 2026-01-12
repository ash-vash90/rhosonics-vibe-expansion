import { Focus, Sparkles, Wrench, Link2 } from "lucide-react";

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  meaning: string;
  why: string;
  practices: string[];
  id: string;
}

const PrincipleCard = ({ icon, title, meaning, why, practices, id }: PrincipleCardProps) => (
  <div id={id} className="scroll-mt-24 p-8 border border-border rounded-2xl hover:border-primary/30 transition-colors">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h4 className="font-ui text-xl md:text-2xl font-semibold text-foreground pt-2">{title}</h4>
    </div>
    
    <div className="space-y-6">
      <div>
        <span className="font-data text-xs text-primary tracking-widest">WHAT THIS MEANS</span>
        <p className="text-lg text-foreground mt-2 leading-relaxed">{meaning}</p>
      </div>
      
      <div>
        <span className="font-data text-xs text-slate-400 tracking-widest">WHY THIS EXISTS</span>
        <p className="text-slate-600 mt-2 leading-relaxed">{why}</p>
      </div>
      
      <div>
        <span className="font-data text-xs text-slate-400 tracking-widest">IN PRACTICE</span>
        <ul className="mt-3 space-y-2">
          {practices.map((practice, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600">
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const BrandPrinciples = () => {
  const principles: (Omit<PrincipleCardProps, 'icon'> & { iconName: string })[] = [
    {
      id: "precision-decoration",
      iconName: "focus",
      title: "Precision before decoration",
      meaning: "Information clarity always takes priority over visual flourish.",
      why: "Rhosonics communicates measurement, performance, and operational insight. Decoration that does not reinforce understanding introduces noise.",
      practices: [
        "Data and key messages are visually dominant",
        "Decorative elements are secondary and restrained",
        "Visual emphasis is earned, not applied everywhere"
      ]
    },
    {
      id: "expression-intent",
      iconName: "sparkles",
      title: "Expression with intent",
      meaning: "The system allows for expressive elements — color, contrast, texture — but only where they serve a clear role.",
      why: "Expression helps guide attention and reinforce meaning when used deliberately. Uncontrolled expression dilutes the system and weakens clarity.",
      practices: [
        "Color signals state, action, or context",
        "Gradients and textures add depth, not distraction",
        "Expressive elements are contextual, not universal"
      ]
    },
    {
      id: "engineered",
      iconName: "wrench",
      title: "Engineered, not styled",
      meaning: "The brand should feel designed with purpose, not styled for effect.",
      why: "Rhosonics products are evaluated on performance and reliability. The visual system should reflect the same discipline.",
      practices: [
        "Layouts follow consistent structural logic",
        "Spacing and alignment are systematic",
        "Motion, when used, communicates feedback or change"
      ]
    },
    {
      id: "consistency",
      iconName: "link",
      title: "Consistency enables flexibility",
      meaning: "A strong core system allows variation without fragmentation.",
      why: "The brand appears across industries, applications, and formats. Consistency at the foundation enables adaptation at the edges.",
      practices: [
        "Core elements remain stable",
        "Contextual variations are clearly defined",
        "Industry-specific adaptations do not create sub-brands"
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'focus': return <Focus className="w-6 h-6 text-primary" />;
      case 'sparkles': return <Sparkles className="w-6 h-6 text-primary" />;
      case 'wrench': return <Wrench className="w-6 h-6 text-primary" />;
      case 'link': return <Link2 className="w-6 h-6 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mb-12">
        <p className="text-lg text-slate-600 leading-relaxed">
          Brand principles are decision-making tools.
          They exist to resolve ambiguity when multiple design options are possible.
        </p>
        <p className="text-lg text-slate-500 mt-4">
          Each principle defines not only what to aim for, but what to avoid.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {principles.map((principle) => (
          <PrincipleCard
            key={principle.id}
            id={principle.id}
            icon={getIcon(principle.iconName)}
            title={principle.title}
            meaning={principle.meaning}
            why={principle.why}
            practices={principle.practices}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPrinciples;
