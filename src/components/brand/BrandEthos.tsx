import { Radar, Target, Leaf, Sparkles } from "lucide-react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { UltrasonicWaves } from "./UltrasonicWaves";

export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-24" aria-labelledby="brand-ethos-title">
      {/* Animated Hero with ultrasonic waves */}
      <div className="mb-16 relative overflow-hidden">
        {/* Background wave pattern */}
        <div className="absolute inset-0 bg-wave-hero opacity-50 pointer-events-none" aria-hidden="true" />

        {/* Animated ultrasonic wave visualization */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-20 pointer-events-none hidden lg:block" aria-hidden="true">
          <UltrasonicWaves color="hsl(138 53% 40%)" waveCount={7} />
        </div>

        {/* Animated logo backdrop */}
        <div className="absolute right-8 top-8 w-32 h-32 opacity-10 pointer-events-none hidden md:block animate-logo-pulse" aria-hidden="true">
          <RhosonicsLogo variant="gradient" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-slate-100 border border-slate-200 rounded-md animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-600">DESIGN SYSTEM V1.0</span>
          </div>

          <h1 id="brand-ethos-title" className="text-fluid-hero font-ui font-bold mb-6 text-foreground tracking-tight leading-[1.1]">
            <span className="block animate-text-reveal" style={{ animationDelay: "0.1s" }}>Precision.</span>
            <span className="block gradient-text animate-text-reveal" style={{ animationDelay: "0.3s" }}>Resilience.</span>
            <span className="block animate-text-reveal" style={{ animationDelay: "0.5s" }}>Intelligence.</span>
          </h1>

          <p className="text-fluid-lg text-slate-500 max-w-xl leading-relaxed font-medium prose-optimal animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            Industrial measurement meets sustainable engineering.
            Every element is purpose-built for extreme environments.
          </p>
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
              title: "Measure Everything",
              desc: "If you can't measure it, you can't improve it.",
              icon: <Target className="w-5 h-5" aria-hidden="true" />
            },
            {
              num: "02", 
              title: "Built to Last",
              desc: "Industrial-grade engineering for the harshest environments.",
              icon: <Radar className="w-5 h-5" aria-hidden="true" />
            },
            {
              num: "03",
              title: "Sustainable Impact",
              desc: "Precision measurement enables resource optimization.",
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
