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
    const arc1Ref = useRef<SVGPathElement>(null);
    const arc2Ref = useRef<SVGPathElement>(null);
    const arc3Ref = useRef<SVGPathElement>(null);
    
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

    const setInitialArcState = () => {
      const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current];
      arcs.forEach((arc) => {
        if (!arc) return;
        gsap.set(arc, {
          opacity: 0,
          scale: 0.3,
          transformOrigin: "100% 100%", // bottom-right origin
        });
      });
    };

    const playAnimation = (options?: AnimatedLogoPlayOptions) => {
      const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current].filter(Boolean) as SVGPathElement[];

      if (arcs.length === 0) {
        options?.onComplete?.();
        return;
      }

      tlRef.current?.kill();
      tlRef.current = null;

      gsap.killTweensOf(arcs);
      setInitialArcState();

      const tl = gsap.timeline({
        onComplete: () => options?.onComplete?.(),
      });

      // Wave propagation — inner arc → middle → outer
      // With glow: arcs animate in with filter, then filter fades out
      arcs.forEach((arc, i) => {
        if (withGlow) {
          // Apply glow filter at start of arc animation
          gsap.set(arc, { filter: `url(#${glowFilterId})` });
        }
        
        const isOutermost = i === arcs.length - 1;
        
        tl.to(
          arc,
          {
            opacity: 1,
            scale: isOutermost && withGlow ? 1.08 : 1, // Overshoot on final wave
            duration: 0.35 + i * 0.03,
            ease: "sine.out",
          },
          i * 0.1
        );
        
        // Final wave energy burst - scale back and remove glow with punch
        if (isOutermost && withGlow) {
          tl.to(
            arc,
            {
              scale: 1,
              duration: 0.25,
              ease: "back.out(2)",
            },
            0.45
          );
        }
      });

      // After wave animation completes, fade out the glow effect
      if (withGlow) {
        tl.add(() => {
          arcs.forEach((arc) => {
            gsap.to(arc, {
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
      if (autoPlay || startHidden) setInitialArcState();
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
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.2
                        0 1 0 0 0.4
                        0 0 1 0 0
                        0 0 0 1.5 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Arc 1 — innermost */}
        <path
          ref={arc1Ref}
          d="M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z"
          fill={`url(#${getGradientId()})`}
        />

        {/* Arc 2 — middle */}
        <path
          ref={arc2Ref}
          d="M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z"
          fill={`url(#${getGradientId()})`}
        />

        {/* Arc 3 — outermost */}
        <path
          ref={arc3Ref}
          d="M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z"
          fill={`url(#${getGradientId()})`}
        />

      </svg>
    );
  }
);

AnimatedLogo.displayName = "AnimatedLogo";

export default AnimatedLogo;

