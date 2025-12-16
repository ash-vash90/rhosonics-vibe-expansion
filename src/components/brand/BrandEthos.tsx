import { Radar, Target, Leaf, Sparkles } from "lucide-react";

export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-24" aria-labelledby="brand-ethos-title">
      {/* Bold Hero with wave background */}
      <div className="mb-16 relative">
        <div className="absolute inset-0 bg-wave-hero opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-slate-100 border border-slate-200 rounded-md">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-600">DESIGN SYSTEM V.FINAL</span>
          </div>
          
          <h1 id="brand-ethos-title" className="section-header-bold mb-6">
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
          
          {/* Origin story - subtle nod to garage roots */}
          <div className="mt-8 flex items-center gap-4 text-sm text-slate-400">
            <div className="w-8 h-px bg-gradient-to-r from-earth-ochre to-transparent" />
            <span className="font-data tracking-wide">EST. 1984 — FROM GARAGE TO GLOBAL</span>
          </div>
        </div>
      </div>

      {/* Two-column cards - chamfer on hero card only */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {/* The Persona - Hero gradient card with chamfer */}
        <article className="card-gradient chamfer-lg p-6 sm:p-10 relative z-10">
          <div className="absolute inset-0 bg-wave-subtle opacity-20 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-lg" aria-hidden="true">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <span className="font-data text-xs uppercase tracking-wider text-slate-400">THE PERSONA</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-100 mb-3 font-ui">Senior Engineer</h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              Direct, knowledgeable, data-driven. We avoid marketing fluff 
              in favor of technical specifications and proven ROI.
            </p>
          </div>
        </article>

        {/* The Aesthetic - Metal card with subtle terrain */}
        <article className="card-metal p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-terrain-grain opacity-50" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-300 flex items-center justify-center rounded-lg" aria-hidden="true">
                <Radar className="w-6 h-6 text-slate-700" />
              </div>
              <span className="font-data text-xs uppercase tracking-wider text-slate-500">THE AESTHETIC</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3 font-ui">Lab in the Field</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Clean white space meets heavy industrial textures. 
              High contrast data displays. Precision paired with ruggedness.
            </p>
          </div>
        </article>
      </div>

      {/* Core Values - Open layout without cards */}
      <div className="border-t border-slate-200 pt-10 mt-8" role="list" aria-label="Core values">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              num: "01",
              title: "Garage Spirit",
              desc: "Innovation born from curiosity, not committees. We keep that startup hunger.",
              icon: <Sparkles className="w-5 h-5" aria-hidden="true" />
            },
            {
              num: "02", 
              title: "Built to Last",
              desc: "Industrial-grade engineering for the harshest environments.",
              icon: <Radar className="w-5 h-5" aria-hidden="true" />
            },
            {
              num: "03",
              title: "Legacy Forward",
              desc: "Honoring our roots while measuring the future.",
              icon: <Leaf className="w-5 h-5" aria-hidden="true" />
            }
          ].map((item) => (
            <article 
              key={item.num}
              className="group"
              role="listitem"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-data text-sm text-slate-400 group-hover:text-primary transition-colors">
                  {item.num}
                </span>
                <div className="h-px flex-1 bg-slate-200 group-hover:bg-primary/30 transition-colors" />
                <div className="w-8 h-8 bg-slate-100 flex items-center justify-center rounded text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
              </div>
              <h4 className="font-ui font-bold text-xl mb-2 text-foreground">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandEthos;
