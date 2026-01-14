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

      {/* Optical Scaling System */}
      <div className="mb-16">
        {/* Core Insight */}
        <div className="bg-slate-900 text-slate-100 rounded-lg p-8 mb-8">
          <h3 className="label-tech text-primary mb-4">WHY LINEAR SCALING FAILS</h3>
          <p className="text-slate-300 mb-6 max-w-2xl">
            Text and symbols do not scale perceptually at the same rate. Icons feel heavier as they scale up, 
            while type feels lighter and more open. Linear ratios exaggerate this imbalance at larger sizes.
          </p>
          <div className="flex flex-wrap gap-8 items-end">
            <div>
              <span className="font-data text-xs text-slate-500 block mb-1">BASE REFERENCE</span>
              <div className="font-data text-2xl text-slate-100">Icon: 44 × 44 px</div>
              <div className="font-data text-lg text-slate-400">Text cap-height: 32 px</div>
            </div>
            <div className="bg-slate-800 rounded px-4 py-3">
              <span className="font-data text-xs text-slate-500 block mb-1">GOVERNING RULE</span>
              <p className="text-slate-300 text-sm">The icon scales <span className="text-primary font-medium">faster</span> than the text.</p>
            </div>
          </div>
        </div>

        {/* Size Bands Table */}
        <div className="bg-background border border-border rounded-lg overflow-hidden mb-8">
          <div className="bg-slate-50 px-6 py-4 border-b border-border">
            <h3 className="label-tech text-muted-foreground">OPTICAL SCALING BANDS</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-slate-50/50">
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Icon Size</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Text Size</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Ratio</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Usage Context</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { icon: 24, text: 18, ratio: 0.75, context: "Small UI, nav", highlight: false },
                  { icon: 32, text: 23, ratio: 0.72, context: "UI headers", highlight: false },
                  { icon: 44, text: 32, ratio: 0.73, context: "Base / default", highlight: true },
                  { icon: 64, text: 45, ratio: 0.70, context: "Marketing UI", highlight: false },
                  { icon: 80, text: 55, ratio: 0.69, context: "Page headers", highlight: false },
                  { icon: 96, text: 64, ratio: 0.67, context: "Large layouts", highlight: false },
                  { icon: 128, text: 84, ratio: 0.66, context: "Hero / signage", highlight: false },
                ].map((band, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-border last:border-b-0 ${band.highlight ? 'bg-primary/5' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 font-data text-foreground">{band.icon}px</td>
                    <td className="px-6 py-4 font-data text-foreground">{band.text}px</td>
                    <td className="px-6 py-4 font-data text-primary">{band.ratio.toFixed(2)}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {band.context}
                      {band.highlight && <span className="ml-2 font-data text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">ANCHOR</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border-t border-amber-200 px-6 py-3">
            <p className="font-data text-xs text-amber-800">
              ↓ NOTICE: The ratio intentionally decreases as size increases. That's the optical correction.
            </p>
          </div>
        </div>

        {/* Visual Comparison Strip */}
        <div className="bg-slate-900 rounded-lg p-8 mb-8">
          <h3 className="label-tech text-slate-500 mb-6">VISUAL COMPARISON</h3>
          <div className="flex items-end justify-around gap-4 flex-wrap">
            {[
              { label: "SM", icon: 32, text: 23 },
              { label: "BASE", icon: 44, text: 32 },
              { label: "LG", icon: 64, text: 45 },
              { label: "XL", icon: 96, text: 64 },
            ].map((size, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div style={{ width: size.icon, height: size.icon }}>
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <span 
                    className="font-logo text-slate-100 tracking-wide uppercase leading-none"
                    style={{ fontSize: size.text }}
                  >
                    RHOSONICS
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-data text-xs text-primary">{size.label}</span>
                  <span className="font-data text-[10px] text-slate-500">{size.icon}/{size.text}px</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hard Constraints */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="label-tech text-muted-foreground mb-4">HARD CONSTRAINTS</h3>
            <ul className="space-y-3">
              {[
                "Text is never taller than 75% of icon height",
                "Text is never smaller than 65% of icon height",
                "Icon aligns to text's cap-height center, not baseline",
                "Tracking is never adjusted to \"fix\" proportion issues",
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="label-tech text-slate-500 mb-4">DESIGN TOKENS</h3>
            <pre className="font-data text-xs text-slate-300 leading-relaxed">
{`logo.icon.size.sm = 32
logo.text.size.sm = 23

logo.icon.size.md = 44
logo.text.size.md = 32

logo.icon.size.lg = 64
logo.text.size.lg = 45

logo.icon.size.xl = 96
logo.text.size.xl = 64`}
            </pre>
          </div>
        </div>

        {/* Guiding Principle */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-foreground italic">
            "If the logo feels typographic, it's too big. If it feels symbolic, it's too small."
          </p>
        </div>
      </div>

      {/* Usage Rules */}
      <div className="grid md:grid-cols-2 gap-px bg-border mb-16">
        <div className="bg-background p-8">
          <h3 className="label-tech text-muted-foreground mb-6">USAGE RULES</h3>
          <ul className="space-y-4">
            {[
              "Use as provided. No modifications.",
              "Use the closest defined size band.",
              "Do not interpolate linearly between bands.",
              "Do not exceed ±2px from prescribed text size.",
              "Round down for text, up for icon between bands.",
              "Minimum size: 24px icon. Below, use icon-only mark."
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
              "Interpolate between size bands",
              "Adjust tracking to fix proportion issues",
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