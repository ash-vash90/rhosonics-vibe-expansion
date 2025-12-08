import { Radar, Target, Leaf, Sparkles } from "lucide-react";

export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-24">
      {/* Bold Hero */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-slate-100 border border-slate-200 chamfer-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="label-tech text-slate-600">DESIGN SYSTEM V.FINAL</span>
        </div>
        
        <h1 className="section-header-bold mb-6">
          Precision.
          <br />
          <span className="gradient-text">Resilience.</span>
          <br />
          Intelligence.
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
          Industrial measurement meets sustainable engineering. 
          Every element is purpose-built for extreme environments.
        </p>
      </div>

      {/* Two-column cards with chamfers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* The Persona - Gradient card for emphasis */}
        <div className="card-gradient p-10 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <span className="label-tech text-slate-400">THE PERSONA</span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-100 mb-3 font-ui">Senior Engineer</h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            Direct, knowledgeable, data-driven. We avoid marketing fluff 
            in favor of technical specifications and proven ROI.
          </p>
        </div>

        {/* The Aesthetic - Slate card */}
        <div className="card-slate p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-500/50 flex items-center justify-center rounded-lg">
              <Radar className="w-6 h-6 text-slate-100" />
            </div>
            <span className="label-tech text-slate-400">THE AESTHETIC</span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-100 mb-3 font-ui">Lab in the Field</h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            Clean white space meets heavy industrial textures. 
            High contrast data displays. Precision paired with ruggedness.
          </p>
        </div>
      </div>

      {/* Core Values - Bold numbered grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            num: "01",
            title: "Measure Everything",
            desc: "If you can't measure it, you can't improve it.",
            icon: <Target className="w-5 h-5" />
          },
          {
            num: "02", 
            title: "Built to Last",
            desc: "Industrial-grade engineering for the harshest environments.",
            icon: <Radar className="w-5 h-5" />
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
            className="card-metal p-8 group"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-data text-5xl font-bold text-slate-300 group-hover:text-primary transition-colors">
                {item.num}
              </span>
              <div className="w-10 h-10 bg-slate-200 flex items-center justify-center rounded-lg text-slate-600 group-hover:bg-primary group-hover:text-white transition-all">
                {item.icon}
              </div>
            </div>
            <h4 className="font-ui font-bold text-xl mb-2 text-foreground">{item.title}</h4>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandEthos;
