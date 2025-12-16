import { useEffect, useRef } from "react";
import { Radar, Target, Leaf, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BrandEthos = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge slide in with blur
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { opacity: 0, x: -40, filter: "blur(10px)" },
          { 
            opacity: 1, 
            x: 0, 
            filter: "blur(0px)",
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
          }
        );
      }

      // Hero text - word by word reveal with clip-path
      if (heroTextRef.current) {
        const words = heroTextRef.current.querySelectorAll('.hero-word');
        gsap.set(words, { 
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          opacity: 1 
        });
        
        gsap.to(words, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power4.out",
        });
      }

      // Persona/Aesthetic cards - 3D flip in
      const cards = cardsRef.current?.querySelectorAll('.persona-card');
      if (cards) {
        gsap.set(cards, { 
          rotateY: -45,
          opacity: 0,
          transformPerspective: 1200,
          transformOrigin: "left center"
        });
        
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(cards, {
              rotateY: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
            });
          }
        });
      }

      // Core values - sequential reveal
      const valueItems = valuesRef.current?.querySelectorAll('.value-item');
      if (valueItems) {
        valueItems.forEach((item) => {
          const line = item.querySelector('.value-line');
          const number = item.querySelector('.value-number');
          const icon = item.querySelector('.value-icon');
          const text = item.querySelector('.value-text');
          
          gsap.set([line, number, icon, text], { opacity: 0 });
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(icon, { scale: 0, rotate: -180 });
          gsap.set(text, { y: 20 });
          
          ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            onEnter: () => {
              const tl = gsap.timeline();
              tl.to(number, { opacity: 1, duration: 0.3 })
                .to(line, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.1")
                .to(icon, { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=0.3")
                .to(text, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.2");
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" className="mb-24" aria-labelledby="brand-ethos-title" ref={sectionRef}>
      {/* Bold Hero with wave background */}
      <div className="mb-16 relative">
        <div className="absolute inset-0 bg-wave-hero opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-slate-100 border border-slate-200 rounded-md"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-data text-xs uppercase tracking-wider text-slate-600">DESIGN SYSTEM V.FINAL</span>
          </div>
          
          <h1 id="brand-ethos-title" className="section-header-bold mb-6" ref={heroTextRef}>
            <span className="hero-word inline-block">Precision.</span>
            <br />
            <span className="hero-word inline-block gradient-text">Resilience.</span>
            <br />
            <span className="hero-word inline-block">Intelligence.</span>
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
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {/* The Persona - Hero gradient card with chamfer */}
        <article className="persona-card card-gradient chamfer-lg p-6 sm:p-10 relative z-10">
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
        <article className="persona-card card-metal p-6 sm:p-10 relative overflow-hidden">
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
      <div className="border-t border-slate-200 pt-10 mt-8" role="list" aria-label="Core values" ref={valuesRef}>
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
              className="value-item group"
              role="listitem"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="value-number font-data text-sm text-slate-400 group-hover:text-primary transition-colors">
                  {item.num}
                </span>
                <div className="value-line h-px flex-1 bg-slate-200 group-hover:bg-primary/30 transition-colors" />
                <div className="value-icon w-8 h-8 bg-slate-100 flex items-center justify-center rounded text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  {item.icon}
                </div>
              </div>
              <div className="value-text">
                <h4 className="font-ui font-bold text-xl mb-2 text-foreground">{item.title}</h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandEthos;
