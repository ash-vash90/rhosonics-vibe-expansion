import { Target, Shield, Lightbulb } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND_VALUES } from "@/data/brand-values";

import audienceEngineer from "@/assets/brand/audience-engineer-control-room.jpg";
import audienceOperations from "@/assets/brand/audience-operations-manager.jpg";
import audienceTechnical from "@/assets/brand/audience-technical-specialist.jpg";

gsap.registerPlugin(ScrollTrigger);

const BrandPositioning = () => {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate pillars on scroll
      if (pillarsRef.current) {
        const pillars = pillarsRef.current.querySelectorAll('.pillar-item');
        gsap.fromTo(pillars, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" }
          }
        );
      }

      // Animate value cards
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" }
          }
        );
      }

      // Animate split section
      if (splitRef.current) {
        gsap.fromTo(splitRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: splitRef.current, start: "top 85%" }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="space-y-24">
      {/* Brand Promise - HERO DISPLAY: Full-width dramatic statement */}
      <div id="what-we-communicate">
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Rhosonics builds measurement systems for environments where conditions are rarely ideal 
          and accuracy is operationally critical. The brand must communicate:
        </p>
        
        {/* Hero pillars - dramatic large type, no cards */}
        <div ref={pillarsRef} className="space-y-0">
          {[
            { icon: Target, title: "Precision", desc: "Measurement you can trust" },
            { icon: Shield, title: "Resilience", desc: "Performance in harsh, real-world conditions" },
            { icon: Lightbulb, title: "Intelligence", desc: "Insight derived from data, not assumption" },
          ].map((pillar, i) => (
            <div 
              key={pillar.title} 
              className="pillar-item group flex items-start md:items-baseline gap-4 md:gap-6 py-6 md:py-8 border-b border-border/50 first:border-t hover:bg-muted/30 transition-colors -mx-4 md:-mx-6 px-4 md:px-6"
            >
              <span className="font-data text-xs md:text-sm text-muted-foreground w-6 md:w-8 flex-shrink-0 pt-1 md:pt-0">0{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 md:gap-4 mb-1 md:mb-2">
                  <pillar.icon className="w-4 h-4 md:w-5 md:h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  <h4 className="font-ui text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground ml-6 md:ml-9">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values - FEATURE CARDS: Premium cards with breathing room */}
      <div id="audience">
        <div className="flex items-baseline gap-4 mb-10">
          <h3 className="font-ui text-2xl font-semibold text-foreground">Core Values</h3>
          <div className="h-px flex-1 bg-border max-w-32" />
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          The principles that drive how we work, build relationships, and deliver lasting impact.
        </p>
        
        {/* 2x2 grid for 4 core values - using BRAND_VALUES from data file */}
        <div ref={valuesRef} className="grid md:grid-cols-2 gap-8">
          {BRAND_VALUES.map((value) => (
            <div
              key={value.id}
              className="value-card group p-8 rounded-xl border border-border/50 bg-gradient-to-br from-muted/40 to-transparent hover:from-muted/60 hover:border-border transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-data text-3xl text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors">{value.num}</span>
              </div>
              <h4 className="font-ui text-xl font-bold text-foreground mb-3">{value.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Audience - Full width section */}
      <div className="space-y-8">
        <div>
          <h3 className="font-ui text-2xl font-semibold text-foreground mb-4">The Audience</h3>
          <p className="text-lg text-muted-foreground max-w-3xl">
            People who work in operational or engineering roles, evaluate claims critically, 
            look for evidence before persuasion, and spend time with data and interfaces.
          </p>
        </div>
        
        {/* Audience imagery - full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-lg overflow-hidden aspect-[16/10]">
            <img src={audienceEngineer} alt="Process engineer in control room" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="font-data text-xs text-white/70 uppercase tracking-wider">Control Room</span>
              <p className="text-white font-ui text-sm mt-1">Process Engineers</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-[16/10]">
            <img src={audienceOperations} alt="Operations manager in the field" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="font-data text-xs text-white/70 uppercase tracking-wider">Field Operations</span>
              <p className="text-white font-ui text-sm mt-1">Operations Managers</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-[16/10]">
            <img src={audienceTechnical} alt="Technical specialist with instrumentation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="font-data text-xs text-white/70 uppercase tracking-wider">Technical Lab</span>
              <p className="text-white font-ui text-sm mt-1">Instrumentation Specialists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expression + Heuristic - SPLIT CANVAS */}
      <div ref={splitRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Expression - 3 cols */}
        <div className="lg:col-span-3">
          <h3 className="font-ui text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">How this shapes expression</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Expression is <strong className="text-foreground">purposeful rather than decorative</strong>.
          </p>
          <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 text-sm md:text-base text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              Clear visual hierarchy
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              Color signals meaning
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              Typography prioritizes legibility
            </span>
          </div>
        </div>
        
        {/* Decision heuristic - 2 cols - HERO STATEMENT style - Updated with value references */}
        <div className="lg:col-span-2 flex items-center">
          <div className="p-5 md:p-8 bg-foreground text-background rounded-lg w-full">
            <span className="font-data text-[10px] md:text-xs text-primary-foreground/60 uppercase tracking-wider">Decision Heuristic</span>
            <p className="font-ui text-base md:text-lg lg:text-xl font-medium leading-relaxed mt-2 md:mt-3">
              When choosing between two valid options, prefer the one that:
            </p>
            <ul className="mt-4 space-y-2 text-sm md:text-base text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Deepens understanding <span className="text-primary-foreground/50">(Expertise)</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Supports long-term partnerships <span className="text-primary-foreground/50">(Partnership)</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Demonstrates real-world capability <span className="text-primary-foreground/50">(Challenge)</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Delivers measurable impact <span className="text-primary-foreground/50">(Progress)</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPositioning;
