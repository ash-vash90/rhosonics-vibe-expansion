import { useRef } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { BrandCallout } from "./BrandCallout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MotionDesign = () => {
  const logoRef = useRef<AnimatedLogoRef>(null);
  const textRevealRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} id="motion" className="mb-32">
      <h2 className="section-header">Motion Design</h2>
      
      {/* Two-column: Intro + Timing */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-8">
            Motion communicates cause and effect — mirroring physical processes like propagation and stabilization. Not decoration.
          </p>

          {/* Timing */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-base p-6">
              <div className="text-4xl font-data text-primary mb-4">200ms</div>
              <h3 className="font-ui font-bold text-lg mb-2">Immediate</h3>
              <p className="text-sm text-muted-foreground">
                Micro-interactions. Button hovers, state changes.
              </p>
            </div>
            <div className="card-base p-6">
              <div className="text-4xl font-data text-primary mb-4">300ms</div>
              <h3 className="font-ui font-bold text-lg mb-2">Transition</h3>
              <p className="text-sm text-muted-foreground">
                Page transitions, modals, accordions.
              </p>
            </div>
            <div className="card-base p-6">
              <div className="text-4xl font-data text-primary mb-4">500ms</div>
              <h3 className="font-ui font-bold text-lg mb-2">Emphasis</h3>
              <p className="text-sm text-muted-foreground">
                Brand reveals, loading sequences.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <BrandCallout variant="rule" title="Motion Principle">
            Linear easing for data (mechanical precision). Ease-out for UI (natural deceleration).
          </BrandCallout>
          
          <div className="card-base p-6">
            <h4 className="font-ui font-bold mb-4">Live Indicator</h4>
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-border w-fit">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot"></div>
              <span className="label-tech text-primary">LIVE</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              2s duration, infinite loop.
            </p>
          </div>
        </div>
      </div>

      {/* Animation Examples - full width */}
      <h3 className="label-tech text-slate-500 mb-4">SIGNATURE ANIMATIONS</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Signature animations are rare by design. If everything animates, nothing feels important.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Boot Sequence */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Boot Sequence</h4>
              <p className="text-sm text-muted-foreground">Logo arc reveal</p>
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
        </div>

        {/* Text Reveal */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Text Reveal</h4>
              <p className="text-sm text-muted-foreground">Blur to clear</p>
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
        </div>
      </div>
    </section>
  );
};

export default MotionDesign;
