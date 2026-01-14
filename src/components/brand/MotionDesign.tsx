import { useRef } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { BrandCallout } from "./BrandCallout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MotionDesign = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const textRevealRef = useRef<HTMLSpanElement>(null);

  const playBootAnimation = () => {
    logoRef.current?.play();
  };

  const playTextReveal = () => {
    const el = textRevealRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, filter: "blur(8px)", y: 10 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power3.out" }
    );
  };

  return (
    <section id="motion" className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Motion communicates cause and effect
          <span className="text-muted-foreground"> — mirroring physical processes like propagation and stabilization. Not decoration.</span>
        </p>
      </div>

      {/* Timing Scale - Horizontal ruler style */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-8">TIMING SCALE</h3>
        <div className="flex items-stretch border-t border-b border-border">
          {[
            { ms: "200", label: "Immediate", desc: "Micro-interactions, button hovers, state changes" },
            { ms: "300", label: "Transition", desc: "Page transitions, modals, accordions" },
            { ms: "500", label: "Emphasis", desc: "Brand reveals, loading sequences" },
          ].map((timing, idx) => (
            <div 
              key={idx} 
              className="flex-1 py-8 px-6 border-r border-border last:border-r-0 group hover:bg-muted/30 transition-colors"
            >
              <div className="font-data text-4xl md:text-5xl text-primary mb-3">{timing.ms}<span className="text-lg text-muted-foreground">ms</span></div>
              <div className="font-ui font-bold text-foreground mb-2">{timing.label}</div>
              <div className="text-sm text-muted-foreground">{timing.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Motion Principle */}
      <BrandCallout variant="info" title="Easing Principle">
        Linear easing for data (mechanical precision). Ease-out for UI (natural deceleration).
      </BrandCallout>

      {/* Signature Animations */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-2">SIGNATURE ANIMATIONS</h3>
        <p className="text-muted-foreground mb-8">
          Signature animations are rare by design. If everything animates, nothing feels important.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Boot Sequence */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">01</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Boot Sequence</h4>
              <p className="text-sm text-muted-foreground">Logo arc reveal animation</p>
            </div>
            <button 
              onClick={playBootAnimation}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
            <div className="w-20 h-20">
              <AnimatedLogo ref={logoRef} variant="gradient" />
            </div>
          </div>
        </div>

        {/* Text Reveal */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">02</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Text Reveal</h4>
              <p className="text-sm text-muted-foreground">Blur to clear transition</p>
            </div>
            <button 
              onClick={playTextReveal}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
            <span 
              ref={textRevealRef}
              className="font-logo text-4xl text-foreground"
            >
              Rhosonics
            </span>
          </div>
        </div>
      </div>

      {/* Live Indicator - inline specimen */}
      <div className="flex items-center gap-8 py-6 border-t border-border">
        <div>
          <span className="label-tech text-muted-foreground block mb-2">LIVE INDICATOR</span>
          <p className="text-sm text-muted-foreground">2s duration, infinite loop</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-full border border-border">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot"></div>
          <span className="label-tech text-primary">LIVE</span>
        </div>
      </div>
    </section>
  );
};

export default MotionDesign;