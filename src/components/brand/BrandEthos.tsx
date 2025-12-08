import { Crosshair, Fingerprint, Leaf } from "lucide-react";

export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-24">
      {/* Bold Hero */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-dot" />
          <span className="label-tech text-muted-foreground">DESIGN SYSTEM V.FINAL</span>
        </div>
        
        <h1 className="section-header-bold mb-6">
          Precision.
          <br />
          <span className="gradient-text">Resilience.</span>
          <br />
          Intelligence.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          Industrial measurement meets sustainable engineering. 
          Every element is purpose-built for extreme environments.
        </p>
      </div>

      {/* Two-column cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* The Persona - Gradient card for emphasis */}
        <div className="card-gradient p-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-primary" />
            </div>
            <h3 className="label-tech text-slate-400">THE PERSONA</h3>
          </div>
          <p className="text-slate-200 leading-relaxed text-lg">
            "Senior Engineer." Direct, knowledgeable, data-driven. We avoid marketing fluff 
            in favor of technical specifications and proven ROI.
          </p>
        </div>

        {/* The Aesthetic */}
        <div className="card-base p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Crosshair className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="label-tech text-muted-foreground">THE AESTHETIC</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            "Lab in the Field." Clean white space meets heavy industrial textures. 
            High contrast data displays. Precision paired with ruggedness.
          </p>
        </div>
      </div>

      {/* Core Values - Bold numbered list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-lg overflow-hidden">
        {[
          {
            num: "01",
            title: "Measure Everything",
            desc: "If you can't measure it, you can't improve it.",
            icon: <Crosshair className="w-5 h-5" />
          },
          {
            num: "02", 
            title: "Built to Last",
            desc: "Industrial-grade engineering for the harshest environments.",
            icon: <Fingerprint className="w-5 h-5" />
          },
          {
            num: "03",
            title: "Sustainable Impact",
            desc: "Precision measurement enables resource optimization.",
            icon: <Leaf className="w-5 h-5" />
          }
        ].map((item, idx) => (
          <div 
            key={item.num}
            className={`p-6 bg-card ${idx < 2 ? 'md:border-r border-b md:border-b-0' : ''} border-border group hover:bg-slate-50 transition-colors`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-logo text-4xl text-slate-200 group-hover:text-primary transition-colors">
                {item.num}
              </span>
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                {item.icon}
              </div>
            </div>
            <h4 className="font-ui font-semibold text-lg mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandEthos;
