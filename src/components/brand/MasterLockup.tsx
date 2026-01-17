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
        
        {/* Logo lockup: 150% ratio - text uses clamp, icon is 1.5× */}
        <div className="flex items-center gap-6 relative z-10 px-4">
          <div 
            className="flex-shrink-0" 
            style={{ width: 'clamp(72px, 9vw, 96px)', height: 'clamp(72px, 9vw, 96px)' }}
          >
            <AnimatedLogo ref={logoRef} variant="gradient" autoPlay />
          </div>
          <h1 
            ref={titleRef}
            className="font-logo text-slate-100 tracking-wide leading-none opacity-0 uppercase"
            style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}
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
          <h3 className="label-tech text-primary mb-4">THE 150% RULE</h3>
          <p className="text-slate-300 mb-6 max-w-2xl">
            The logo icon is always <span className="text-primary font-semibold">150%</span> of the accompanying text's font-size.
            This fixed ratio ensures consistent visual weight across all sizes while keeping the icon prominent but balanced.
          </p>
          <div className="flex flex-wrap gap-8 items-end">
            <div>
              <span className="font-data text-xs text-slate-500 block mb-1">FORMULA</span>
              <div className="font-data text-2xl text-slate-100">Icon = Text × 1.5</div>
              <div className="font-data text-lg text-slate-400">e.g., 24px text → 36px icon</div>
            </div>
            <div className="bg-slate-800 rounded px-4 py-3">
              <span className="font-data text-xs text-slate-500 block mb-1">WHY 150%</span>
              <p className="text-slate-300 text-sm">Bold enough to be symbolic, restrained enough to be typographic.</p>
            </div>
          </div>
        </div>

        {/* Size Bands Table */}
        <div className="bg-background border border-border rounded-lg overflow-hidden mb-8">
          <div className="bg-slate-50 px-6 py-4 border-b border-border">
            <h3 className="label-tech text-muted-foreground">SIZE REFERENCE (150% RATIO)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-slate-50/50">
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Text Size</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Icon Size</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Tailwind Class</th>
                  <th className="text-left px-6 py-3 font-data text-xs text-muted-foreground uppercase">Usage Context</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { text: 12, icon: 18, tw: "text-xs", context: "Navigation labels", highlight: false },
                  { text: 16, icon: 24, tw: "text-base", context: "Footer, small UI", highlight: false },
                  { text: 18, icon: 27, tw: "text-lg", context: "UI headers", highlight: false },
                  { text: 20, icon: 30, tw: "text-xl", context: "Default / base", highlight: true },
                  { text: 24, icon: 36, tw: "text-2xl", context: "Marketing UI", highlight: false },
                  { text: 30, icon: 45, tw: "text-3xl", context: "Page headers", highlight: false },
                  { text: 36, icon: 54, tw: "text-4xl", context: "Hero / signage", highlight: false },
                ].map((band, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-border last:border-b-0 ${band.highlight ? 'bg-primary/5' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 font-data text-foreground">{band.text}px</td>
                    <td className="px-6 py-4 font-data text-primary">{band.icon}px</td>
                    <td className="px-6 py-4 font-data text-muted-foreground">{band.tw}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {band.context}
                      {band.highlight && <span className="ml-2 font-data text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">BASE</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary/5 border-t border-primary/20 px-6 py-3">
            <p className="font-data text-xs text-primary">
              ✓ RULE: Icon size = Text size × 1.5 — always.
            </p>
          </div>
        </div>

        {/* Visual Comparison Strip */}
        <div className="bg-slate-900 rounded-lg p-8 mb-8">
          <h3 className="label-tech text-slate-500 mb-6">VISUAL COMPARISON (150% RATIO)</h3>
          <div className="flex items-end justify-around gap-4 flex-wrap">
            {[
              { label: "XS", text: 12, icon: 18 },
              { label: "SM", text: 16, icon: 24 },
              { label: "BASE", text: 20, icon: 30 },
              { label: "LG", text: 24, icon: 36 },
              { label: "XL", text: 36, icon: 54 },
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
                  <span className="font-data text-[10px] text-slate-500">{size.text}px → {size.icon}px</span>
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
                "Icon is always 150% of text font-size",
                "Icon aligns to text's vertical center",
                "Gap between icon and text: 0.5em of text size",
                "Minimum text size: 12px (icon: 18px)",
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="label-tech text-slate-500 mb-4">CSS IMPLEMENTATION</h3>
            <pre className="font-data text-xs text-slate-300 leading-relaxed">
{`/* 150% icon-to-text ratio */
.logo-lockup {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.logo-icon {
  width: 1.5em;  /* 150% of font-size */
  height: 1.5em;
}

/* Example: text-xl (20px) */
.logo-lockup.text-xl .logo-icon {
  /* 20px × 1.5 = 30px */
}`}
            </pre>
          </div>
        </div>

        {/* Guiding Principle */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-foreground font-medium">
            "One ratio. Every size. No exceptions."
          </p>
          <p className="text-muted-foreground text-sm mt-2">Icon = Text × 1.5</p>
        </div>
      </div>

      {/* Usage Rules */}
      <div className="grid md:grid-cols-2 gap-px bg-border mb-16">
        <div className="bg-background p-8">
          <h3 className="label-tech text-muted-foreground mb-6">USAGE RULES</h3>
          <ul className="space-y-4">
            {[
              "Always apply the 150% ratio (icon = text × 1.5)",
              "Use Tailwind text classes for sizing consistency",
              "Center-align icon to text vertically",
              "Use gap-2 or gap-3 between icon and text",
              "Minimum size: 12px text / 18px icon",
              "Below minimum, use icon-only mark"
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
              "Use a different ratio than 150%",
              "Stretch or distort proportions",
              "Adjust tracking to compensate for sizing",
              "Add shadows, glows, or effects to lockup",
              "Place on busy or low-contrast backgrounds"
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
        {/* All lockup variations use 150% ratio: text-xl(20px) → 30px icon */}
        {[
          {
            label: "HORIZONTAL",
            content: (
              <div className="flex items-center gap-3">
                <div style={{ width: 30, height: 30 }}><RhosonicsLogo variant="gradient" /></div>
                <span className="font-logo text-foreground tracking-wide uppercase text-xl">RHOSONICS</span>
              </div>
            )
          },
          {
            label: "STACKED",
            content: (
              <div className="flex flex-col items-center gap-2">
                <div style={{ width: 30, height: 30 }}><RhosonicsLogo variant="gradient" /></div>
                <span className="font-logo text-foreground tracking-wide uppercase text-xl">RHOSONICS</span>
              </div>
            )
          },
          {
            label: "ICON ONLY",
            content: (
              <div style={{ width: 30, height: 30 }}><RhosonicsLogo variant="gradient" /></div>
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