import { useState } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";

export const MotionDesign = () => {
  const [playStates, setPlayStates] = useState({
    boot: false,
    fade: false,
    reveal: false,
    pulse: false,
  });

  const triggerAnimation = (key: keyof typeof playStates) => {
    setPlayStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setPlayStates(prev => ({ ...prev, [key]: false }));
    }, 1500);
  };

  return (
    <section id="motion" className="mb-32">
      <h2 className="section-header">Motion Design</h2>
      <p className="text-muted-foreground mb-8">
        Motion in Rhosonics interfaces is purposeful and restrained. Animations should feel 
        precise and mechanical—mirroring the precision of our measurement technology.
      </p>

      {/* Motion Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">200ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">Quick Feedback</h3>
          <p className="text-sm text-muted-foreground">
            Micro-interactions like button hovers and state changes. Fast, snappy, immediate.
          </p>
        </div>

        <div className="card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">300ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">Standard Transitions</h3>
          <p className="text-sm text-muted-foreground">
            Page transitions, modal appearances, accordion expansions. Smooth but not sluggish.
          </p>
        </div>

        <div className="card-base p-6">
          <div className="text-4xl font-data text-primary mb-4">500ms</div>
          <h3 className="font-ui font-bold text-lg mb-2">Emphasis</h3>
          <p className="text-sm text-muted-foreground">
            Brand reveal animations, loading sequences. Reserved for important moments.
          </p>
        </div>
      </div>

      {/* Animation Examples */}
      <h3 className="label-tech text-slate-500 mb-4">SIGNATURE ANIMATIONS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Boot Sequence */}
        <div className="card-base p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-ui font-bold text-lg">Boot Sequence</h4>
              <p className="text-sm text-muted-foreground">Logo arc reveal animation</p>
            </div>
            <button 
              onClick={() => triggerAnimation('boot')}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center">
            <div 
              key={playStates.boot ? 'playing' : 'idle'} 
              className="w-16 h-16"
            >
              <RhosonicsLogo variant="gradient" animated={playStates.boot} />
            </div>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            ease-out | 500ms | stagger 100ms per arc
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
              onClick={() => triggerAnimation('reveal')}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center">
            <span 
              key={playStates.reveal ? 'playing' : 'idle'}
              className={`font-logo text-3xl text-foreground ${playStates.reveal ? 'animate-text-reveal opacity-0' : ''}`}
            >
              Rhosonics
            </span>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            ease-out | 800ms | blur(4px) to blur(0)
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
              onClick={() => triggerAnimation('fade')}
              className="label-tech text-primary hover:underline"
            >
              [PLAY]
            </button>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
            <div 
              key={playStates.fade ? 'playing' : 'idle'}
              className={`px-6 py-3 bg-primary text-primary-foreground rounded-md ${playStates.fade ? 'animate-fade-in-up opacity-0' : ''}`}
            >
              New Content
            </div>
          </div>
          <div className="mt-4 font-data text-xs text-muted-foreground">
            ease-out | 600ms | translateY(20px) to translateY(0)
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
};

export default MotionDesign;
