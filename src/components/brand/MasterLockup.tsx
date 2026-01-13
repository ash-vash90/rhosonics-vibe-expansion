import { useRef, useEffect, useCallback } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { RotateCcw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MasterLockup = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const replayAnimation = useCallback(() => {
    logoRef.current?.play();
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, x: -30, filter: "blur(8px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => replayAnimation(), 200);
    return () => clearTimeout(timer);
  }, [replayAnimation]);

  return (
    <section id="lockup" className="mb-16">
      {/* Two-column layout: Hero + Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hero lockup display - spans 2 columns */}
        <div ref={heroRef} className="lg:col-span-2 card-gradient chamfer-lg flex flex-col items-center justify-center py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-wave-subtle opacity-40 pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10 px-4">
            <div 
              className="flex-shrink-0" 
              style={{ width: 'clamp(3.5rem, 10vw, 6rem)', height: 'clamp(3.5rem, 10vw, 6rem)' }}
            >
              <AnimatedLogo ref={logoRef} variant="gradient" autoPlay />
            </div>
            <h1 
              ref={titleRef}
              className="font-logo text-slate-100 tracking-wide leading-none opacity-0 uppercase"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            >
              RHOSONICS
            </h1>
          </div>

          <button 
            onClick={replayAnimation}
            className="absolute bottom-4 right-4 flex items-center gap-2 label-ui text-slate-400 hover:text-primary transition-colors px-3 py-2 bg-slate-800/50 rounded-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">REPLAY</span>
          </button>

          <div className="absolute top-4 left-4 label-tech text-slate-500">
            LOCKUP.HORIZONTAL.V1
          </div>
        </div>

        {/* Rules sidebar */}
        <div className="space-y-6">
          <div className="card-base p-6">
            <h3 className="font-data text-xs uppercase tracking-wider text-slate-500 mb-4">USAGE RULES</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Use as provided. No modifications.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Maintain clear space equal to smallest arc height.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Minimum size: 24px digital, 10mm print.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Below minimum, use icon-only mark.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
            <p className="text-sm text-amber-800">
              <strong>Never:</strong> stretch, rotate, add effects, or place on busy backgrounds.
            </p>
          </div>
        </div>
      </div>

      {/* Lockup Variations - Full width row */}
      <div className="flex flex-wrap items-end justify-center gap-12 mt-12 py-8 border-y border-slate-200">
        <div className="flex flex-col items-center group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8"><RhosonicsLogo variant="gradient" /></div>
            <span className="font-logo text-xl text-foreground tracking-wide uppercase">RHOSONICS</span>
          </div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400">HORIZONTAL</span>
        </div>

        <div className="flex flex-col items-center group">
          <div className="flex flex-col items-center gap-2 mb-3">
            <div className="w-12 h-12"><RhosonicsLogo variant="gradient" /></div>
            <span className="font-logo text-lg text-foreground tracking-wide uppercase">RHOSONICS</span>
          </div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400">STACKED</span>
        </div>

        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 mb-3"><RhosonicsLogo variant="gradient" /></div>
          <span className="font-data text-xs uppercase tracking-wider text-slate-400">ICON ONLY</span>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
