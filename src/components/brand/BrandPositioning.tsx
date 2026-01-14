import { Target, Shield, Lightbulb, Users, Award, Zap, Heart, Leaf } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
              className="pillar-item group flex items-baseline gap-6 py-8 border-b border-border/50 first:border-t hover:bg-muted/30 transition-colors -mx-6 px-6"
            >
              <span className="font-data text-sm text-muted-foreground w-8">0{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <pillar.icon className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  <h4 className="font-ui text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-lg text-muted-foreground ml-9">{pillar.desc}</p>
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
          The principles that drive how we work, build relationships, and deliver solutions.
        </p>
        
        {/* Staggered 5-card layout with varied sizing */}
        <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Connecting", desc: "We believe in teamwork. Down-to-earth, transparent, and committed to building sustainable, long-term relationships." },
            { icon: Award, title: "Expertise", desc: "We deliver high-quality measurement technologies through leadership, knowledge, and versatility — providing solutions our customers need." },
            { icon: Zap, title: "Dynamic", desc: "We take initiative with a no-nonsense approach. Our creative mindset, adaptability, and all-round knowledge allows us to fix any problem." },
            { icon: Heart, title: "Passionate", desc: "With enthusiasm and drive, we see challenges as adventures. This results in long-term growth together with our customers and partners." },
            { icon: Leaf, title: "Sustainability", desc: "We strive for a greener, smarter industry. Our reliable measuring technologies help customers optimize production and become more sustainable." },
          ].map((value) => (
            <div
              key={value.title}
              className="value-card group p-8 rounded-lg border border-transparent bg-muted/30 hover:bg-muted/50 hover:border-border transition-all duration-300"
            >
              <value.icon className="w-6 h-6 mb-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h4 className="font-ui text-xl font-semibold text-foreground mb-3">{value.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expression + Audience + Heuristic - SPLIT CANVAS */}
      <div ref={splitRef} className="grid lg:grid-cols-5 gap-12">
        {/* Expression & Audience - 3 cols */}
        <div className="lg:col-span-3 space-y-12">
          <div>
            <h3 className="font-ui text-lg font-semibold text-foreground mb-4">How this shapes expression</h3>
            <p className="text-muted-foreground mb-6">
              Expression is <strong className="text-foreground">purposeful rather than decorative</strong>.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Clear visual hierarchy
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Color signals meaning
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Typography prioritizes legibility
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-ui text-lg font-semibold text-foreground mb-4">The audience</h3>
            <p className="text-muted-foreground">People who work in operational or engineering roles, evaluate claims critically, 
            look for evidence before persuasion, and spend time with data and interfaces.</p>
          </div>
        </div>
        
        {/* Decision heuristic - 2 cols - HERO STATEMENT style */}
        <div className="lg:col-span-2 flex items-center">
          <div className="p-8 bg-foreground text-background rounded-lg">
            <span className="font-data text-xs text-primary-foreground/60 uppercase tracking-wider">Decision Heuristic</span>
            <p className="font-ui text-xl font-medium leading-relaxed mt-3">
              When choosing between two valid design options, prefer the one that improves clarity, 
              reinforces performance, or reveals insight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPositioning;
