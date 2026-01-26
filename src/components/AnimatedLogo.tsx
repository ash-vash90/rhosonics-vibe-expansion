import { useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { cleanReactId } from "@/lib/constants";

interface AnimatedLogoProps {
  variant?: "gradient" | "white" | "dark";
  className?: string;
  autoPlay?: boolean;
  /**
   * If true, the arcs are hidden before first paint.
   * Useful when you trigger play() manually and want to prevent any color/gradient flash.
   */
  startHidden?: boolean;
  /**
   * If true, adds an energy glow effect during animation that settles afterward.
   */
  withGlow?: boolean;
}

export interface AnimatedLogoPlayOptions {
  onComplete?: () => void;
}

export interface AnimatedLogoRef {
  play: (options?: AnimatedLogoPlayOptions) => void;
}

export const AnimatedLogo = forwardRef<AnimatedLogoRef, AnimatedLogoProps>(
  ({ variant = "gradient", className, autoPlay = false, startHidden = false, withGlow = false }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const wave1Ref = useRef<SVGPathElement>(null);
    const wave2Ref = useRef<SVGPathElement>(null);
    const wave3Ref = useRef<SVGPathElement>(null);
    
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Avoid global SVG id collisions when multiple logos are on the page.
    const rawId = useId();
    const uid = cleanReactId(rawId);
    const brandGradientId = `brandGradient-${uid}`;
    const whiteGradientId = `whiteGradient-${uid}`;
    const glowFilterId = `glowFilter-${uid}`;

    const getGradientId = () => {
      switch (variant) {
        case "white":
          return whiteGradientId;
        default:
          return brandGradientId;
      }
    };

    const setInitialState = () => {
      const waves = [wave1Ref.current, wave2Ref.current, wave3Ref.current];
      waves.forEach((wave) => {
        if (!wave) return;
        gsap.set(wave, {
          opacity: 0,
          scale: 0.3,
          transformOrigin: "100% 100%", // bottom-right origin
        });
      });
    };

    const playAnimation = (options?: AnimatedLogoPlayOptions) => {
      const waves = [wave1Ref.current, wave2Ref.current, wave3Ref.current].filter(Boolean) as SVGPathElement[];

      if (waves.length === 0) {
        options?.onComplete?.();
        return;
      }

      tlRef.current?.kill();
      tlRef.current = null;

      gsap.killTweensOf(waves);
      setInitialState();

      const tl = gsap.timeline({
        onComplete: () => options?.onComplete?.(),
      });

      // Wave propagation — innermost wave → middle → outer
      waves.forEach((wave, i) => {
        if (withGlow) {
          gsap.set(wave, { filter: `url(#${glowFilterId})` });
        }
        
        const isOutermost = i === waves.length - 1;
        
        tl.to(
          wave,
          {
            opacity: 1,
            scale: isOutermost && withGlow ? 1.08 : 1,
            duration: 0.35 + i * 0.03,
            ease: "sine.out",
          },
          i * 0.1
        );
        
        if (isOutermost && withGlow) {
          tl.to(
            wave,
            {
              scale: 1,
              duration: 0.25,
              ease: "back.out(2)",
            },
            0.45
          );
        }
      });

      if (withGlow) {
        tl.add(() => {
          waves.forEach((wave) => {
            gsap.to(wave, {
              filter: "none",
              duration: 0.5,
              ease: "power2.inOut",
            });
          });
        }, 0.55);
      }

      tlRef.current = tl;
    };

    useImperativeHandle(ref, () => ({
      play: playAnimation,
    }));

    useLayoutEffect(() => {
      if (autoPlay || startHidden) setInitialState();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, startHidden]);

    useEffect(() => {
      if (!autoPlay) return;
      const timer = setTimeout(() => playAnimation(), 150);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay]);

    return (
      <svg ref={svgRef} className={cn("w-full h-full", className)} viewBox="0 0 80 80">
        <defs>
          <linearGradient id={brandGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#73B82E" />
            <stop offset="55%" stopColor="#4da653" />
            <stop offset="100%" stopColor="#33993c" />
          </linearGradient>
          <linearGradient id={whiteGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          {withGlow && (
            <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Wave 1 — innermost (propagation point, fills corner) */}
        <path
          ref={wave1Ref}
          d="M 80 80 L 80 60 A 20 20 0 0 0 60 80 L 80 80 Z"
          fill={`url(#${getGradientId()})`}
        />

        {/* Wave 2 — middle */}
        <path
          ref={wave2Ref}
          d="M 80 49 L 80 31 A 49 49 0 0 0 31 80 L 49 80 A 31 31 0 0 1 80 49 Z"
          fill={`url(#${getGradientId()})`}
        />

        {/* Wave 3 — outermost */}
        <path
          ref={wave3Ref}
          d="M 80 20 L 80 0 A 80 80 0 0 0 0 80 L 20 80 A 60 60 0 0 1 80 20 Z"
          fill={`url(#${getGradientId()})`}
        />

      </svg>
    );
  }
);

AnimatedLogo.displayName = "AnimatedLogo";

export default AnimatedLogo;

