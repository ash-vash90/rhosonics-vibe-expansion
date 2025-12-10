import { useState, useEffect } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimationDemoProps {
  title: string;
  description: string;
  timing: string;
  children: React.ReactNode;
  onPlay: () => void;
  onReset: () => void;
  isPlaying: boolean;
  continuous?: boolean;
}

const AnimationDemo = ({
  title,
  description,
  timing,
  children,
  onPlay,
  onReset,
  isPlaying,
  continuous = false,
}: AnimationDemoProps) => (
  <div className="card-base p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-ui font-bold text-lg text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {!continuous && (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlay}
            disabled={isPlaying}
            className="h-8 w-8"
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="h-8 w-8"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>

    <div className="h-36 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
      {children}
    </div>

    <div className="mt-3 flex items-center justify-between">
      <code className="font-data text-xs text-muted-foreground">{timing}</code>
      {continuous && (
        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-data rounded">CONTINUOUS</span>
      )}
    </div>
  </div>
);

// Easing curve visualization
const EasingCurve = ({
  name,
  description,
  curve,
  recommended,
}: {
  name: string;
  description: string;
  curve: string;
  recommended?: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="font-data text-sm text-primary">{name}</span>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      {/* Animated demo bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-primary rounded-full transition-all duration-1000`}
          style={{
            width: isAnimating ? "100%" : "0%",
            transitionTimingFunction: curve,
          }}
        />
      </div>

      {recommended && (
        <span className="text-xs text-muted-foreground">Use for: {recommended}</span>
      )}
    </div>
  );
};

export const MotionDesign = () => {
  const [animations, setAnimations] = useState({
    boot: { playing: false, key: 0 },
    reveal: { playing: false, key: 0 },
    fade: { playing: false, key: 0 },
    glow: { playing: false, key: 0 },
    float: { playing: false, key: 0 },
  });

  const playAnimation = (name: keyof typeof animations, duration: number = 1500) => {
    setAnimations((prev) => ({
      ...prev,
      [name]: { playing: true, key: prev[name].key + 1 },
    }));
    setTimeout(() => {
      setAnimations((prev) => ({
        ...prev,
        [name]: { ...prev[name], playing: false },
      }));
    }, duration);
  };

  const resetAnimation = (name: keyof typeof animations) => {
    setAnimations((prev) => ({
      ...prev,
      [name]: { playing: false, key: prev[name].key + 1 },
    }));
  };

  return (
    <section id="motion" className="mb-32">
      <h2 className="section-header">Motion Design</h2>
      <p className="text-muted-foreground mb-8 prose-optimal">
        Motion in Rhosonics interfaces is purposeful and restrained. Animations should feel
        precise and mechanical—mirroring the precision of our measurement technology.
      </p>

      {/* Motion Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            duration: "200ms",
            title: "Quick Feedback",
            description: "Micro-interactions like button hovers and state changes. Fast, snappy, immediate.",
            examples: "hover, focus, active",
          },
          {
            duration: "300ms",
            title: "Standard Transitions",
            description: "Page transitions, modal appearances, accordion expansions. Smooth but not sluggish.",
            examples: "modals, dropdowns, tabs",
          },
          {
            duration: "500ms",
            title: "Emphasis",
            description: "Brand reveal animations, loading sequences. Reserved for important moments.",
            examples: "logo, hero, onboarding",
          },
        ].map((item) => (
          <div key={item.duration} className="card-base p-6">
            <div className="text-4xl font-data text-primary mb-4">{item.duration}</div>
            <h3 className="font-ui font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
            <span className="text-xs font-data text-slate-400">{item.examples}</span>
          </div>
        ))}
      </div>

      {/* Animation Examples */}
      <h3 className="label-tech text-slate-500 mb-4">SIGNATURE ANIMATIONS — CLICK TO PLAY</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Boot Sequence */}
        <AnimationDemo
          title="Boot Sequence"
          description="Logo arc reveal animation"
          timing="cubic-bezier(0.34, 1.56, 0.64, 1) | 600ms | stagger 100ms"
          onPlay={() => playAnimation("boot", 1200)}
          onReset={() => resetAnimation("boot")}
          isPlaying={animations.boot.playing}
        >
          <div key={animations.boot.key} className="w-20 h-20">
            <RhosonicsLogo variant="gradient" animated={animations.boot.playing} />
          </div>
        </AnimationDemo>

        {/* Text Reveal */}
        <AnimationDemo
          title="Text Reveal"
          description="Blur to clear fade-in"
          timing="cubic-bezier(0.16, 1, 0.3, 1) | 800ms | blur(8px) → blur(0)"
          onPlay={() => playAnimation("reveal", 1000)}
          onReset={() => resetAnimation("reveal")}
          isPlaying={animations.reveal.playing}
        >
          <span
            key={animations.reveal.key}
            className={`font-logo text-3xl text-foreground ${
              animations.reveal.playing ? "animate-text-reveal opacity-0" : ""
            }`}
          >
            Rhosonics
          </span>
        </AnimationDemo>

        {/* Fade In Up */}
        <AnimationDemo
          title="Fade In Up"
          description="Content entrance animation"
          timing="cubic-bezier(0.16, 1, 0.3, 1) | 700ms | translateY(30px)"
          onPlay={() => playAnimation("fade", 1000)}
          onReset={() => resetAnimation("fade")}
          isPlaying={animations.fade.playing}
        >
          <div
            key={animations.fade.key}
            className={`px-6 py-3 bg-primary text-primary-foreground rounded-md font-ui font-medium ${
              animations.fade.playing ? "animate-fade-in-up opacity-0" : ""
            }`}
          >
            New Content
          </div>
        </AnimationDemo>

        {/* Glow Pulse */}
        <AnimationDemo
          title="Glow Pulse"
          description="Attention-drawing highlight"
          timing="ease-in-out | 3000ms | infinite"
          onPlay={() => {}}
          onReset={() => {}}
          isPlaying={false}
          continuous
        >
          <div className="w-20 h-20 animate-glow-pulse">
            <RhosonicsLogo variant="gradient" />
          </div>
        </AnimationDemo>

        {/* Live Indicator */}
        <AnimationDemo
          title="Live Indicator"
          description="Active state pulse"
          timing="ease-in-out | 2000ms | infinite"
          onPlay={() => {}}
          onReset={() => {}}
          isPlaying={false}
          continuous
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-full border border-border">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
            <span className="label-tech text-primary">LIVE</span>
          </div>
        </AnimationDemo>

        {/* Float */}
        <AnimationDemo
          title="Float"
          description="Subtle hover animation"
          timing="ease-in-out | 4000ms | infinite | translateY(10px)"
          onPlay={() => {}}
          onReset={() => {}}
          isPlaying={false}
          continuous
        >
          <div className="w-16 h-16 animate-float">
            <RhosonicsLogo variant="gradient" />
          </div>
        </AnimationDemo>
      </div>

      {/* Easing Functions */}
      <h3 className="label-tech text-slate-500 mb-4">EASING FUNCTIONS</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Watch the animated bars to see each easing function in action. The animation repeats every 2 seconds.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <EasingCurve
          name="ease-out"
          curve="ease-out"
          description="Fast start, gentle finish"
          recommended="entrances, reveals"
        />
        <EasingCurve
          name="ease-in-out"
          curve="ease-in-out"
          description="Smooth acceleration and deceleration"
          recommended="loops, transforms"
        />
        <EasingCurve
          name="cubic-bezier(0.34, 1.56, 0.64, 1)"
          curve="cubic-bezier(0.34, 1.56, 0.64, 1)"
          description="Overshoot with spring-like bounce"
          recommended="boot sequence, emphasis"
        />
      </div>

      {/* Guidelines */}
      <div className="card-earth p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-terrain-contour opacity-30" aria-hidden="true" />
        <div className="relative">
          <h4 className="font-ui font-bold text-lg text-earth-clay mb-4">Motion Guidelines</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-data text-earth-ochre block mb-2">DO</span>
              <ul className="space-y-1 text-earth-clay">
                <li>• Use consistent timing across similar interactions</li>
                <li>• Respect reduced motion preferences</li>
                <li>• Keep animations under 500ms for UI feedback</li>
                <li>• Use easing functions that feel natural</li>
              </ul>
            </div>
            <div>
              <span className="font-data text-earth-ochre block mb-2">DON'T</span>
              <ul className="space-y-1 text-earth-clay">
                <li>• Animate everything—reserve for meaningful moments</li>
                <li>• Use bouncy animations for data displays</li>
                <li>• Make users wait for animations to complete</li>
                <li>• Override system accessibility settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotionDesign;
