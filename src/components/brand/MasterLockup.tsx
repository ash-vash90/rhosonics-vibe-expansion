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
    <section id="lockup" className="mb-32">
      {/* Hero lockup display - Full width */}
      <div 
        ref={heroRef} 
        className="bg-rho-obsidian rounded-lg flex flex-col items-center justify-center py-20 md:py-32 relative overflow-hidden mb-16"
      >
        <div className="absolute inset-0 bg-wave-subtle opacity-40 pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10 px-4">
          <div 
            className="flex-shrink-0" 
            style={{ width: 'clamp(4rem, 12vw, 8rem)', height: 'clamp(4rem, 12vw, 8rem)' }}
          >
            <AnimatedLogo ref={logoRef} variant="gradient" autoPlay />
          </div>
          <h1 
            ref={titleRef}
            className="font-logo text-slate-100 tracking-wide leading-none opacity-0 uppercase"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            RHOSONICS
          </h1>
        </div>

        <button 
          onClick={replayAnimation}
          className="absolute bottom-6 right-6 flex items-center gap-2 label-tech text-slate-400 hover:text-primary transition-colors px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-primary"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">REPLAY</span>
        </button>

        <div className="absolute top-6 left-6 label-tech text-slate-500">
          LOCKUP.HORIZONTAL.V1
        </div>
      </div>

      {/* Sizing Ratio Rule */}
      <div className="bg-slate-50 border border-border rounded-lg p-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <div className="flex items-center gap-4 bg-white rounded-lg p-6 border border-border">
              <div className="relative">
                <div className="w-[55px] h-[55px]"><RhosonicsLogo variant="gradient" /></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-data text-[10px] text-primary whitespace-nowrap">137.5%</div>
              </div>
              <div className="relative">
                <span className="font-logo text-[40px] text-foreground tracking-wide uppercase leading-none">RHOSONICS</span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-data text-[10px] text-muted-foreground">100%</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="label-tech text-primary mb-3">ICON-TO-TEXT RATIO</h3>
            <p className="text-muted-foreground mb-4">
              The logo icon must always be <span className="font-data text-foreground">37.5%</span> larger than the text height. 
              This ratio ensures visual balance between the geometric mark and the wordmark.
            </p>
            <div className="font-data text-xs text-muted-foreground bg-slate-100 rounded px-3 py-2 inline-block">
              icon_size = text_size × 1.375
            </div>
          </div>
        </div>
      </div>

      {/* Usage Rules */}
      <div className="grid md:grid-cols-2 gap-px bg-border mb-16">
        <div className="bg-background p-8">
          <h3 className="label-tech text-muted-foreground mb-6">USAGE RULES</h3>
          <ul className="space-y-4">
            {[
              "Use as provided. No modifications.",
              "Icon must be 37.5% larger than text height.",
              "Maintain clear space equal to smallest arc height.",
              "Minimum size: 40px digital, 10mm print.",
              "Below minimum, use icon-only mark."
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="font-data text-primary">{String(idx + 1).padStart(2, '0')}</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-background p-8">
          <h3 className="label-tech text-destructive mb-6">NEVER</h3>
          <ul className="space-y-4">
            {[
              "Stretch or distort proportions",
              "Change the icon-to-text ratio",
              "Rotate or skew the lockup",
              "Add shadows, glows, or effects",
              "Place on busy or conflicting backgrounds"
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lockup Variations - Horizontal strip */}
      <h3 className="label-tech text-muted-foreground mb-6">LOCKUP VARIATIONS</h3>
      <div className="flex items-stretch border-t border-b border-border">
        {[
          {
            label: "HORIZONTAL",
            content: (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10"><RhosonicsLogo variant="gradient" /></div>
                <span className="font-logo text-xl text-foreground tracking-wide uppercase">RHOSONICS</span>
              </div>
            )
          },
          {
            label: "STACKED",
            content: (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12"><RhosonicsLogo variant="gradient" /></div>
                <span className="font-logo text-lg text-foreground tracking-wide uppercase">RHOSONICS</span>
              </div>
            )
          },
          {
            label: "ICON ONLY",
            content: (
              <div className="w-12 h-12"><RhosonicsLogo variant="gradient" /></div>
            )
          },
        ].map((variation, idx) => (
          <div key={idx} className="flex-1 py-10 px-6 border-r border-border last:border-r-0 flex flex-col items-center justify-center gap-6 group hover:bg-slate-50 transition-colors">
            {variation.content}
            <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">{variation.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MasterLockup;