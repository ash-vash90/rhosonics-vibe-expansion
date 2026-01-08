import { useEffect, useRef } from "react";
import { Wrench, Beaker, Globe, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const OriginStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyBlockRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const tributeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          }
        }
      );

      // Story block reveal with clip-path
      gsap.fromTo(storyBlockRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: storyBlockRef.current,
            start: "top 75%",
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(timelineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyBlockRef.current,
            start: "top 75%",
          }
        }
      );

      // Timeline connector line animation
      const timelineConnector = milestonesRef.current?.querySelector('.timeline-line');
      if (timelineConnector) {
        gsap.fromTo(timelineConnector,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Timeline dots animation
      const timelineDots = milestonesRef.current?.querySelectorAll('.timeline-dot');
      if (timelineDots) {
        gsap.fromTo(timelineDots,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Milestones stagger
      const milestones = milestonesRef.current?.querySelectorAll('.milestone-card');
      if (milestones) {
        gsap.fromTo(milestones,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Tribute line animation
      gsap.fromTo(tributeRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: tributeRef.current,
            start: "top 90%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="origin" className="mb-32">
      {/* Section Header */}
      <div ref={headerRef} className="mb-12">
        <div className="label-tech text-earth-ochre mb-4">HERITAGE</div>
        <h2 className="section-header-bold max-w-3xl">
          Born in a Garage.<br />
          <span className="text-earth-ochre">Built for the World.</span>
        </h2>
      </div>

      {/* Main Story Block - Workshop aesthetic */}
      <div ref={storyBlockRef} className="relative overflow-hidden rounded-lg border border-border/50 bg-card">
        {/* Workshop grid background */}
        <div className="absolute inset-0 bg-workshop-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-earth-ochre/5 via-transparent to-primary/5" />
        
        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Timeline marker */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-earth-ochre/60 flex items-center justify-center">
              <span className="font-data text-lg text-earth-ochre font-bold">84</span>
            </div>
            <div ref={timelineRef} className="h-px flex-1 bg-gradient-to-r from-earth-ochre/40 to-transparent" />
            <span className="font-data text-sm text-earth-ochre/80 uppercase tracking-wider">The Netherlands</span>
          </div>

          {/* Story narrative */}
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl font-ui leading-relaxed mb-6">
              <span className="text-slate-400">It started with a question in a Dutch garage:</span>
              <span className="text-earth-ochre font-semibold"> how do you measure beer density?</span>
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              The local brewer needed to know. Our founder happened to have a workbench. 
              What began as a single measurement device became an entirely new approach 
              to industrial process control.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              Four decades later, that same curiosity—the belief that better measurement 
              leads to better outcomes—drives every sensor we build.
            </p>
          </div>

          {/* Rivet accents */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-700 border border-earth-ochre/30" />
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-700 border border-earth-ochre/30" />
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-700 border border-earth-ochre/30" />
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-700 border border-earth-ochre/30" />
        </div>
      </div>

      {/* Journey milestones with visual timeline */}
      <div ref={milestonesRef} className="mt-12">
        {/* Horizontal timeline bar - desktop only */}
        <div className="hidden md:flex items-center mb-8">
          <div className="timeline-dot w-4 h-4 rounded-full bg-earth-ochre shadow-lg shadow-earth-ochre/40" />
          <div className="flex-1 h-0.5 bg-slate-700/50 relative overflow-hidden">
            <div className="timeline-line absolute inset-0 bg-gradient-to-r from-earth-ochre via-earth-amber to-eco-forest" />
          </div>
          <div className="timeline-dot w-4 h-4 rounded-full bg-earth-amber shadow-lg shadow-earth-amber/40" />
          <div className="flex-1 h-0.5 bg-slate-700/50 relative overflow-hidden">
            <div className="timeline-line absolute inset-0 bg-gradient-to-r from-earth-amber to-eco-forest" />
          </div>
          <div className="timeline-dot w-4 h-4 rounded-full bg-eco-forest shadow-lg shadow-eco-forest/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Milestone 1 - Garage */}
          <div className="milestone-card group">
            <div className="flex items-start gap-4">
              {/* Mobile dot indicator */}
              <div className="md:hidden timeline-dot w-3 h-3 mt-1.5 rounded-full bg-earth-ochre flex-shrink-0" />
              <div className="hidden md:flex w-12 h-12 flex-shrink-0 rounded-lg bg-slate-800 border border-border/50 items-center justify-center group-hover:border-earth-ochre/60 transition-colors">
                <Wrench className="w-5 h-5 text-earth-ochre" />
              </div>
              <div>
                <div className="font-data text-xs text-earth-ochre mb-1">1984</div>
                <h3 className="font-ui font-semibold text-foreground mb-2">The Garage</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  First prototype built on a workbench. One engineer, one problem, endless curiosity.
                </p>
              </div>
            </div>
          </div>

          {/* Milestone 2 - First Brew */}
          <div className="milestone-card group">
            <div className="flex items-start gap-4">
              <div className="md:hidden timeline-dot w-3 h-3 mt-1.5 rounded-full bg-earth-amber flex-shrink-0" />
              <div className="hidden md:flex w-12 h-12 flex-shrink-0 rounded-lg bg-slate-800 border border-border/50 items-center justify-center group-hover:border-earth-amber/60 transition-colors">
                <Beaker className="w-5 h-5 text-earth-amber" />
              </div>
              <div>
                <div className="font-data text-xs text-earth-ochre mb-1">FIRST APPLICATION</div>
                <h3 className="font-ui font-semibold text-foreground mb-2">Brewing Precision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Measuring beer density for a local brewery proved the technology worked in the real world.
                </p>
              </div>
            </div>
          </div>

          {/* Milestone 3 - Global */}
          <div className="milestone-card group">
            <div className="flex items-start gap-4">
              <div className="md:hidden timeline-dot w-3 h-3 mt-1.5 rounded-full bg-eco-forest flex-shrink-0" />
              <div className="hidden md:flex w-12 h-12 flex-shrink-0 rounded-lg bg-slate-800 border border-border/50 items-center justify-center group-hover:border-eco-forest/60 transition-colors">
                <Globe className="w-5 h-5 text-eco-forest" />
              </div>
              <div>
                <div className="font-data text-xs text-earth-ochre mb-1">TODAY</div>
                <h3 className="font-ui font-semibold text-foreground mb-2">Worldwide Impact</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From mining to semiconductors, our sensors optimize processes across six continents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder tribute - subtle */}
      <div ref={tributeRef} className="mt-16 flex items-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-earth-ochre/30 to-transparent" />
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-earth-ochre/60" />
          <span className="font-data text-xs uppercase tracking-widest text-earth-ochre/70">
            Continuing the founder's vision
          </span>
          <Sparkles className="w-4 h-4 text-earth-ochre/60" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-earth-ochre/30 to-transparent" />
      </div>
    </section>
  );
};

export default OriginStory;