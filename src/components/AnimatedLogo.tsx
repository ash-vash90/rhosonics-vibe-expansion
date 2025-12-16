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

  const getFill = () => {
    switch (variant) {
      case 'white':
        return 'url(#whiteGradient)';
      case 'dark':
        return 'url(#brandGradient)';
      default:
        return 'url(#brandGradient)';
    }
  };

  const playAnimation = () => {
    const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current];
    
    gsap.killTweensOf(arcs);
    
    // Set initial state
    gsap.set(arcs, { 
      opacity: 0, 
      scale: 0.2, 
      transformOrigin: "100% 100%",
      rotate: -25
    });

    // Create staggered elastic animation
    arcs.forEach((arc, index) => {
      gsap.to(arc, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.9,
        delay: index * 0.15,
        ease: "elastic.out(1.2, 0.4)",
      });
    });

    // Add a subtle pulse after the reveal
    gsap.to(arcs, {
      filter: "brightness(1.2)",
      duration: 0.3,
      delay: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  useImperativeHandle(ref, () => ({
    play: playAnimation
  }));

  useEffect(() => {
    if (autoPlay) {
      // Small delay for component mount
      const timer = setTimeout(playAnimation, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <svg ref={svgRef} className={cn("w-full h-full", className)} viewBox="0 0 80 80">
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#73B82E" />
          <stop offset="100%" stopColor="#33993c" />
        </linearGradient>
        <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>
      
      {/* Arc 1 - Innermost */}
      <path 
        ref={arc1Ref}
        d="M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z" 
        fill={getFill()} 
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      
      {/* Arc 2 - Middle */}
      <path 
        ref={arc2Ref}
        d="M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z" 
        fill={getFill()} 
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      
      {/* Arc 3 - Outermost */}
      <path 
        ref={arc3Ref}
        d="M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z" 
        fill={getFill()} 
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
    </svg>
  );
});

AnimatedLogo.displayName = "AnimatedLogo";

export default AnimatedLogo;
