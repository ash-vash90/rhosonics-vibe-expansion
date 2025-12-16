import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  variant?: 'gradient' | 'white' | 'dark';
  className?: string;
  autoPlay?: boolean;
}

export interface AnimatedLogoRef {
  play: () => void;
}

export const AnimatedLogo = forwardRef<AnimatedLogoRef, AnimatedLogoProps>(({ 
  variant = 'gradient', 
  className,
  autoPlay = false
}, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const arc1Ref = useRef<SVGPathElement>(null);
  const arc2Ref = useRef<SVGPathElement>(null);
  const arc3Ref = useRef<SVGPathElement>(null);

  const getGradientId = () => {
    switch (variant) {
      case 'white':
        return 'whiteGradient';
      default:
        return 'brandGradient';
    }
  };

  const playAnimation = () => {
    const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current];
    
    gsap.killTweensOf(arcs);
    
    // Initial state - each arc starts scaled down and faded at origin point
    arcs.forEach((arc) => {
      if (!arc) return;
      gsap.set(arc, {
        opacity: 0,
        scale: 0.3,
        transformOrigin: "100% 100%", // Bottom-right origin for wave effect
      });
    });

    // Wave propagation - inner arc first, then middle, then outer
    // Each arc scales up from the origin point like expanding sound waves
    arcs.forEach((arc, i) => {
      if (!arc) return;
      
      gsap.to(arc, {
        opacity: 1,
        scale: 1,
        duration: 0.6 + (i * 0.05), // Slightly longer for outer arcs
        delay: i * 0.15, // 150ms stagger between waves
        ease: "sine.out",
      });
    });

    // Subtle brightness pulse after reveal
    gsap.to(arcs, {
      filter: "brightness(1.15)",
      duration: 0.2,
      delay: 0.7,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(arcs, {
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  useImperativeHandle(ref, () => ({
    play: playAnimation
  }));

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(playAnimation, 150);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <svg ref={svgRef} className={cn("w-full h-full", className)} viewBox="0 0 80 80">
      <defs>
        <linearGradient id="brandGradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#33993c" />
          <stop offset="50%" stopColor="#4da653" />
          <stop offset="100%" stopColor="#73B82E" />
        </linearGradient>
        <linearGradient id="whiteGradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8f0e8" />
        </linearGradient>
      </defs>
      
      {/* Arc 1 - Innermost */}
      <path 
        ref={arc1Ref}
        d="M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z" 
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      
      {/* Arc 2 - Middle */}
      <path 
        ref={arc2Ref}
        d="M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z" 
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      
      {/* Arc 3 - Outermost */}
      <path 
        ref={arc3Ref}
        d="M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z" 
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
    </svg>
  );
});

AnimatedLogo.displayName = "AnimatedLogo";

export default AnimatedLogo;
