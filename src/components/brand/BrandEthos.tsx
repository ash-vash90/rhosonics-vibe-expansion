import { Activity, Shield, Leaf } from "lucide-react";

export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-32 relative">
      {/* Hero glow background */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none -z-10" />
      
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rho-obsidian/5 rounded-full mb-6 border border-border">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
          <span className="label-tech text-muted-foreground">SYSTEM V.FINAL</span>
        </div>
        
        <h1 className="font-logo font-bold text-5xl md:text-7xl lg:text-[6rem] text-foreground leading-[1.05] tracking-tight mb-8">
          Precision.
          <br />
          <span className="gradient-text">Resilience.</span>
          <br />
          Intelligence.
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: 'forwards' }}>
          The Rhosonics design system captures the essence of industrial precision 
          meeting environmental responsibility. Every element is crafted with purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* The Persona */}
        <div className="card-obsidian p-8 opacity-0 animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
          <h3 className="label-tech mb-3 text-slate-400 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            THE PERSONA
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            "Senior Engineer." Direct, knowledgeable, data-driven. We avoid marketing fluff 
            in favor of technical specifications and proven ROI. Every claim is backed by 
            measurement. Every solution is validated in the field.
          </p>
        </div>

        {/* The Aesthetic */}
        <div className="card-glow p-8 opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
          <h3 className="label-tech mb-3 text-primary flex items-center gap-2">
            <Activity className="w-4 h-4" />
            THE AESTHETIC
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            "Lab in the Field." Clean white space (Lab) meets heavy industrial textures (Field). 
            High contrast data displays. Precision typography paired with rugged materials. 
            Sustainability integrated, never superficial.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            num: "01",
            title: "Measure Everything",
            desc: "If you can't measure it, you can't improve it. Every decision backed by data.",
            active: true
          },
          {
            num: "02", 
            title: "Built to Last",
            desc: "Industrial-grade engineering. Our equipment outlasts the harshest environments."
          },
          {
            num: "03",
            title: "Sustainable Impact",
            desc: "Every measurement optimizes resource usage. Precision enables sustainability.",
            icon: <Leaf className="w-4 h-4 text-primary" />
          }
        ].map((item, idx) => (
          <div 
            key={item.num}
            className={`group p-6 border-l-2 transition-all duration-300 hover:pl-8 opacity-0 animate-fade-in-up ${
              item.active ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'
            }`}
            style={{ animationDelay: `${500 + idx * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="label-tech text-slate-500">{item.num}</div>
              {item.icon}
            </div>
            <h4 className="font-logo font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-sm text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandEthos;
