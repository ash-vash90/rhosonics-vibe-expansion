import { useRef, useEffect, useCallback } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { RotateCcw, Scan, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MasterLockup = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const replayAnimation = useCallback(() => {
    logoRef.current?.play();
    
    // Animate title
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, x: -30, filter: "blur(8px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Initial animation on mount
    const timer = setTimeout(() => {
      replayAnimation();
    }, 200);

    // Parallax effect on hero card
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.bg-wave-subtle'), {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => clearTimeout(timer);
  }, [replayAnimation]);

  return (
    <section ref={sectionRef} id="lockup" className="mb-24">
      <div className="border-t-2 border-slate-200 pt-16 mb-8" />
      <div className="flex items-center gap-3 mb-2">
        <Scan className="w-5 h-5 text-primary" />
        <span className="label-tech text-primary">02 / IDENTITY</span>
      </div>
      <h2 className="section-header">Master Lockup</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        The logo. Used correctly, it represents 40 years of precision engineering. Used incorrectly, it represents a conversation with the brand team.
      </p>

      {/* Main lockup display - hero gradient card with chamfer */}
      <div ref={heroRef} className="card-gradient chamfer-lg flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 relative overflow-hidden">
        {/* Wave pattern background */}
        <div className="absolute inset-0 bg-wave-subtle opacity-40 pointer-events-none" aria-hidden="true" />
        
        {/* Main Lockup */}
        <div className="flex items-center gap-4 relative z-10 px-4">
          <div 
            className="flex-shrink-0 magnetic-hover" 
            style={{ width: 'clamp(3.5rem, 10vw, 6rem)', height: 'clamp(3.5rem, 10vw, 6rem)' }}
            aria-hidden="true"
          >
            <AnimatedLogo ref={logoRef} variant="gradient" autoPlay />
          </div>
          <h1 
            ref={titleRef}
            className="font-logo text-slate-100 tracking-tight leading-none opacity-0"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Rhosonics
          </h1>
        </div>

        {/* Replay Button */}
        <button 
          onClick={replayAnimation}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 label-ui text-slate-400 hover:text-primary transition-colors px-3 py-2 bg-slate-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Replay logo animation"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">REPLAY</span>
        </button>

        {/* Spec label */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 label-tech text-slate-500" aria-hidden="true">
          LOCKUP.HORIZONTAL.V1
        </div>
      </div>

      {/* Lockup Variations - Simple inline display */}
      <div className="flex flex-wrap items-end justify-center gap-12 mt-12 py-8 border-y border-slate-200">
        <div className="flex flex-col items-center group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">HORIZONTAL</span>
        </div>

        <div className="flex flex-col items-center group">
          <div className="flex flex-col items-center gap-2 mb-3">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-lg text-foreground">Rhosonics</span>
          </div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">STACKED</span>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 mb-3">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">ICON ONLY</span>
        </div>
      </div>

      {/* Clear Space Rules - Inline text blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0 rounded">
            <Scan className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <div className="font-data text-xs uppercase tracking-wider text-slate-500 mb-1">CLEAR SPACE</div>
            <p className="text-slate-600 text-sm">
              Maintain clear space equal to the height of the smallest arc around all sides.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0 rounded">
            <Layers className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <div className="font-data text-xs uppercase tracking-wider text-slate-500 mb-1">MINIMUM SIZE</div>
            <p className="text-slate-600 text-sm">
              Digital: 24px min. Print: 10mm min. Below this, use icon-only mark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
