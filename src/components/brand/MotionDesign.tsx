import { useRef } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { BrandCallout } from "./BrandCallout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MotionDesign = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const lockupLogoRef = useRef<AnimatedLogoRef>(null);
  const lockupWordmarkRef = useRef<HTMLSpanElement>(null);
  const waveBarsRef = useRef<HTMLDivElement>(null);
  const dataPulseRef = useRef<HTMLDivElement>(null);
  const staggerCardsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  const playBootAnimation = () => {
    logoRef.current?.play();
  };

  const playLockupAnimation = () => {
    const wordmark = lockupWordmarkRef.current;
    if (!wordmark) return;
    
    const chars = wordmark.querySelectorAll(".lockup-char");
    
    // Reset states
    gsap.set(chars, { opacity: 0, x: -20, filter: "blur(8px)" });
    
    // Play logo first, then wordmark on complete
    lockupLogoRef.current?.play({
      onComplete: () => {
        gsap.to(chars, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
        });
      },
    });
  };

  const playWavePropagation = () => {
    const container = waveBarsRef.current;
    if (!container) return;
    const bars = container.querySelectorAll(".wave-bar");
    gsap.fromTo(bars,
      { scaleY: 0.2, opacity: 0.3 },
      { 
        scaleY: 1, 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out",
        stagger: 0.05,
        transformOrigin: "bottom"
      }
    );
  };

  const playDataPulse = () => {
    const el = dataPulseRef.current;
    if (!el) return;
    const ring = el.querySelector(".pulse-ring");
    const core = el.querySelector(".pulse-core");
    
    gsap.timeline()
      .fromTo(core, 
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      .fromTo(ring,
        { scale: 0.5, opacity: 1 },
        { scale: 2, opacity: 0, duration: 0.8, ease: "power2.out" },
        0
      );
  };

  const playStaggerCascade = () => {
    const container = staggerCardsRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".stagger-card");
    gsap.fromTo(cards,
      { y: 30, opacity: 0, rotateX: -15 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.5, 
        ease: "power3.out",
        stagger: 0.08
      }
    );
  };

  const playCounterAnimation = () => {
    const el = counterRef.current;
    if (!el) return;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 98.7,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = obj.value.toFixed(1);
      }
    });
  };

  const playProgressBar = () => {
    const el = progressBarRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" }
    );
  };

  const playRippleEffect = () => {
    const container = rippleContainerRef.current;
    if (!container) return;
    const rings = container.querySelectorAll(".ripple-ring");
    
    gsap.fromTo(rings,
      { scale: 0.3, opacity: 1 },
      { 
        scale: 1, 
        opacity: 0, 
        duration: 1, 
        ease: "power1.out",
        stagger: 0.15
      }
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
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Purposeful motion reflects <strong className="text-foreground">Expertise in Practice</strong> — every animation clarifies understanding. 
          Responsive, feedback-oriented animation builds trust through <strong className="text-foreground">Partnership</strong>.
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
      
      {/* Primary Animations Row */}
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
              <AnimatedLogo ref={logoRef} variant="gradient" withGlow />
            </div>
          </div>
        </div>

        {/* Lockup Sequence */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">02</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Lockup Sequence</h4>
              <p className="text-sm text-muted-foreground">Logo + wordmark cascade</p>
            </div>
            <button 
              onClick={playLockupAnimation}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          {/* 150% ratio: text-2xl (24px) → 36px icon */}
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center gap-3 border border-border">
            <div className="w-9 h-9">
              <AnimatedLogo ref={lockupLogoRef} variant="gradient" startHidden withGlow />
            </div>
            <span 
              ref={lockupWordmarkRef}
              className="font-logo text-2xl text-foreground tracking-wide uppercase overflow-hidden"
            >
              {"RHOSONICS".split("").map((char, i) => (
                <span key={i} className="lockup-char inline-block" style={{ opacity: 0 }}>
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Animations Row */}
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Wave Propagation */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">03</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Wave Propagation</h4>
              <p className="text-sm text-muted-foreground">Ultrasonic wave visualization</p>
            </div>
            <button 
              onClick={playWavePropagation}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-end justify-center gap-1.5 pb-8 border border-border" ref={waveBarsRef}>
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="wave-bar w-3 bg-gradient-to-t from-primary to-primary/60 rounded-t"
                style={{ 
                  height: `${Math.sin((i / 11) * Math.PI) * 80 + 20}%`,
                  opacity: 0.3,
                  transform: 'scaleY(0.2)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Data Pulse */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">04</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Data Pulse</h4>
              <p className="text-sm text-muted-foreground">Measurement confirmation</p>
            </div>
            <button 
              onClick={playDataPulse}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border" ref={dataPulseRef}>
            <div className="relative">
              <div className="pulse-ring absolute inset-0 w-16 h-16 rounded-full border-2 border-primary" />
              <div className="pulse-core w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tertiary Animations Row */}
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Stagger Cascade */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">05</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Stagger Cascade</h4>
              <p className="text-sm text-muted-foreground">List and card entry</p>
            </div>
            <button 
              onClick={playStaggerCascade}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center gap-3 border border-border px-4" ref={staggerCardsRef}>
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="stagger-card w-14 h-20 bg-background rounded border border-border shadow-sm flex items-center justify-center"
                style={{ opacity: 0 }}
              >
                <div className="w-6 h-1 bg-primary/40 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Value Counter */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">06</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Value Counter</h4>
              <p className="text-sm text-muted-foreground">Numeric data animation</p>
            </div>
            <button 
              onClick={playCounterAnimation}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <span 
                ref={counterRef}
                className="font-data text-5xl text-foreground"
              >
                0.0
              </span>
              <span className="font-data text-2xl text-muted-foreground ml-1">%</span>
              <div className="label-tech text-muted-foreground mt-2">DENSITY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quaternary Animations Row */}
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">07</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Progress Fill</h4>
              <p className="text-sm text-muted-foreground">Linear loading states</p>
            </div>
            <button 
              onClick={playProgressBar}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border px-8">
            <div className="w-full">
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="label-tech text-muted-foreground">CALIBRATING</span>
                <span className="label-tech text-primary">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ripple Effect */}
        <div className="bg-background p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="label-tech text-primary mb-2 block">08</span>
              <h4 className="font-ui font-bold text-xl text-foreground">Ripple Propagation</h4>
              <p className="text-sm text-muted-foreground">Touch/click feedback</p>
            </div>
            <button 
              onClick={playRippleEffect}
              className="label-tech text-primary hover:underline border border-primary/30 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
            >
              PLAY
            </button>
          </div>
          <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center border border-border" ref={rippleContainerRef}>
            <div className="relative w-24 h-24 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="ripple-ring absolute inset-0 rounded-full border border-primary"
                  style={{ opacity: 0 }}
                />
              ))}
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
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

      {/* Motion Guidelines */}
      <div className="border-t border-border pt-12">
        <h3 className="label-tech text-muted-foreground mb-8">MOTION GUIDELINES</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <div className="w-5 h-0.5 bg-primary rounded" />
            </div>
            <h4 className="font-ui font-bold text-foreground mb-2">Purpose First</h4>
            <p className="text-sm text-muted-foreground">
              Every animation must serve understanding. If removing it doesn't reduce clarity, remove it.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <div className="w-5 h-5 border-2 border-primary rounded-full" />
            </div>
            <h4 className="font-ui font-bold text-foreground mb-2">Physical Metaphor</h4>
            <p className="text-sm text-muted-foreground">
              Motion should feel like real-world physics: propagation, momentum, settling.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-primary rounded-sm" />
            </div>
            <h4 className="font-ui font-bold text-foreground mb-2">Restrained Impact</h4>
            <p className="text-sm text-muted-foreground">
              Signature animations are rare. Overuse dilutes their importance and distracts from data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotionDesign;
