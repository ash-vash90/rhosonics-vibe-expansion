import { Radar, Target, Leaf, Sparkles, Circle, Hexagon } from "lucide-react";
import { AnimatedWaveform } from "./AnimatedWaveform";
import { useSplitTextReveal, useMagneticHover, use3DCardReveal, useParallax } from "@/hooks/useGsapAnimations";

export const BrandEthos = () => {
  const headlineRef = useSplitTextReveal();
  const badgeRef = useMagneticHover();
  const personaCardRef = use3DCardReveal();
  const aestheticCardRef = use3DCardReveal();
  const parallaxFast = useParallax(0.8);
  const parallaxMedium = useParallax(0.5);
  const parallaxSlow = useParallax(0.3);

  return (
    <section id="intro" className="mb-24 relative" aria-labelledby="brand-ethos-title">
      {/* Parallax floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div 
          ref={parallaxFast}
          className="absolute top-20 right-[10%] w-16 h-16 opacity-10"
        >
          <Hexagon className="w-full h-full text-primary" strokeWidth={1} />
        </div>
        <div 
          ref={parallaxMedium}
          className="absolute top-40 left-[5%] w-8 h-8 opacity-15"
        >
          <Circle className="w-full h-full text-rho-lime" strokeWidth={1.5} />
        </div>
        <div 
          ref={parallaxSlow}
          className="absolute top-[60%] right-[15%] w-12 h-12 opacity-10"
        >
          <Target className="w-full h-full text-primary" strokeWidth={1} />
        </div>
      </div>

      {/* Bold Hero with animated wave background */}
      <div className="mb-12 md:mb-16 relative">
        {/* Animated waveform background */}
        <AnimatedWaveform className="opacity-40 pointer-events-none" />
        
        <div className="relative">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-4 py-2 bg-slate-100 border border-slate-200 rounded-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-data text-[10px] sm:text-xs uppercase tracking-wider text-slate-600">DESIGN SYSTEM V.FINAL</span>
          </div>
          
          <h1 
            id="brand-ethos-title" 
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-ui font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 bg-gradient-to-r from-primary via-rho-lime to-primary bg-clip-text text-transparent"
          >
            Precision. Resilience. Intelligence.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Industrial measurement meets sustainable engineering. 
            Every element is purpose-built for extreme environments.
          </p>
          
          {/* Origin story - subtle nod to garage roots */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-earth-ochre to-transparent" />
            <span className="font-data tracking-wide">EST. 1984 — FROM GARAGE TO GLOBAL</span>
          </div>
        </div>
      </div>

      {/* Two-column cards with 3D reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {/* The Persona - Hero gradient card with chamfer */}
        <article 
          ref={personaCardRef}
          className="card-gradient chamfer-lg p-5 sm:p-8 md:p-10 relative z-10"
        >
          <div className="absolute inset-0 bg-wave-subtle opacity-20 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 flex items-center justify-center rounded-lg" aria-hidden="true">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <span className="font-data text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">THE PERSONA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-2 sm:mb-3 font-ui">Senior Engineer</h3>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              Direct, knowledgeable, data-driven. We avoid marketing fluff 
              in favor of technical specifications and proven ROI.
            </p>
          </div>
        </article>

        {/* The Aesthetic - Metal card with subtle terrain */}
        <article 
          ref={aestheticCardRef}
          className="card-metal p-5 sm:p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-terrain-grain opacity-50" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-300 flex items-center justify-center rounded-lg" aria-hidden="true">
                <Radar className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
              </div>
              <span className="font-data text-[10px] sm:text-xs uppercase tracking-wider text-slate-500">THE AESTHETIC</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 font-ui">Lab in the Field</h3>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Clean white space meets heavy industrial textures. 
              High contrast data displays. Precision paired with ruggedness.
            </p>
          </div>
        </article>
      </div>

      {/* Core Values - Open layout without cards */}
      <div className="border-t border-slate-200 pt-8 sm:pt-10 mt-8" role="list" aria-label="Core values">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
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
              className="group pl-4 border-l-2 border-transparent hover:border-earth-ochre transition-all"
              role="listitem"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-data text-sm text-slate-400 group-hover:text-earth-ochre transition-colors">
                  {item.num}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-earth-ochre/50 to-slate-200 group-hover:from-earth-ochre group-hover:to-slate-300 transition-colors" />
                <div className="w-8 h-8 bg-slate-100 flex items-center justify-center rounded text-slate-500 group-hover:bg-earth-ochre group-hover:text-white transition-all">
                  {item.icon}
                </div>
              </div>
              <h4 className="font-ui font-bold text-lg sm:text-xl mb-2 text-foreground">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandEthos;