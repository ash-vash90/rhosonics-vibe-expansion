import { useRef, useEffect } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MotionDesign = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const textRevealRef = useRef<HTMLSpanElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger principles cards on scroll
      const cards = principlesRef.current?.querySelectorAll('.principle-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: principlesRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const playFadeInUp = () => {
    const el = fadeRef.current;
    if (!el) return;
    
    gsap.fromTo(el,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  return (
    <section ref={sectionRef} id="motion" className="mb-32">
      <h2 className="section-header">Motion Design</h2>
      <p className="text-muted-foreground mb-4">
        Motion in the Rhosonics system communicates cause and effect.
      </p>
      <p className="text-muted-foreground mb-8">
        It mirrors physical processes — propagation, response, stabilization — not decoration.
      </p>

      {/* Motion Principles */}
      <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="principle-card card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">200ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">Immediate Response</h3>
          <p className="text-sm text-muted-foreground">
            Micro-interactions like button hovers and state changes. Fast, snappy, immediate.
          </p>
        </div>

        <div className="principle-card card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">300ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">System Transition</h3>
          <p className="text-sm text-muted-foreground">
            Page transitions, modal appearances, accordion expansions. Smooth but not sluggish.
          </p>
        </div>

        <div className="principle-card card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">500ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">Deliberate Emphasis</h3>
          <p className="text-sm text-muted-foreground">
            Brand reveal animations, loading sequences. Reserved for important moments.
          </p>
        </div>
      </div>

      {/* Animation Examples */}
      <h3 className="label-tech text-slate-500 mb-2">SIGNATURE ANIMATIONS</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Signature animations are rare by design. If everything animates, nothing feels important.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Boot Sequence */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Boot Sequence</h4>
              <p className="text-sm text-muted-foreground">Logo arc reveal animation</p>
            </div>
            <button 
              onClick={playBootAnimation}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16">
              <AnimatedLogo ref={logoRef} variant="gradient" />
            </div>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            elastic.out | 700ms | stagger 150ms per arc
          </div>
        </div>

        {/* Text Reveal */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Text Reveal</h4>
              <p className="text-sm text-muted-foreground">Blur to clear fade-in</p>
            </div>
            <button 
              onClick={playTextReveal}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center">
            <span 
              ref={textRevealRef}
              className="font-logo text-3xl text-foreground"
            >
              Rhosonics
            </span>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            power3.out | 800ms | blur(8px) to blur(0)
          </div>
        </div>

        {/* Fade In Up */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Fade In Up</h4>
              <p className="text-sm text-muted-foreground">Content entrance animation</p>
            </div>
            <button 
              onClick={playFadeInUp}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
            <div 
              ref={fadeRef}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md"
            >
              New Content
            </div>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            back.out | 600ms | translateY(30px) to translateY(0)
          </div>
        </div>

        {/* Pulse Dot */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Live Indicator</h4>
              <p className="text-sm text-muted-foreground">Active state pulse</p>
            </div>
            <span className="label-tech text-muted-foreground">[CONTINUOUS]</span>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-full border border-border">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot"></div>
              <span className="label-tech text-primary">LIVE</span>
            </div>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            ease-in-out | 2000ms | infinite | opacity 1 → 0.5 → 1
          </div>
        </div>
      </div>

      {/* Easing Reference */}
      <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-ui font-bold text-lg mb-4">Easing Functions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <div className="font-data text-sm text-primary mb-2">ease-out</div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-primary rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Default for entrances. Fast start, gentle finish.
            </p>
          </div>
          <div>
            <div className="font-data text-sm text-primary mb-2">ease-in-out</div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full mx-auto"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              For continuous loops. Smooth both ends.
            </p>
          </div>
          <div>
            <div className="font-data text-sm text-primary mb-2">linear</div>
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-full bg-primary rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              For data updates. Mechanical precision.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground border-t border-slate-200 pt-4">
          Linear easing is preferred for data because it reflects mechanical consistency, not human gesture.
        </p>
      </div>
    </section>
  );
};

export default MotionDesign;