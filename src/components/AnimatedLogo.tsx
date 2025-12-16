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

// Arc path data - designed for stroke animation from bottom-right origin
const ARC_PATHS = {
  inner: {
    d: "M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z",
    length: 95,
  },
  middle: {
    d: "M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z",
    length: 145,
  },
  outer: {
    d: "M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z",
    length: 195,
  },
};

export const AnimatedLogo = forwardRef<AnimatedLogoRef, AnimatedLogoProps>(({ 
  variant = 'gradient', 
  className,
  autoPlay = false
}, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const arc1Ref = useRef<SVGPathElement>(null);
  const arc2Ref = useRef<SVGPathElement>(null);
  const arc3Ref = useRef<SVGPathElement>(null);
  const glow1Ref = useRef<SVGPathElement>(null);
  const glow2Ref = useRef<SVGPathElement>(null);
  const glow3Ref = useRef<SVGPathElement>(null);

  const getGradientId = () => {
    switch (variant) {
      case 'white':
        return 'whiteGradient';
      case 'dark':
        return 'brandGradient';
      default:
        return 'brandGradient';
    }
  };

  const playAnimation = () => {
    const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current];
    const glows = [glow1Ref.current, glow2Ref.current, glow3Ref.current];
    
    gsap.killTweensOf([...arcs, ...glows]);
    
    // Create master timeline for precise sequencing
    const tl = gsap.timeline();
    
    // Initial state - arcs hidden via clip-path, positioned at origin
    arcs.forEach((arc) => {
      if (!arc) return;
      gsap.set(arc, {
        clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
        opacity: 1,
        scale: 0.92,
        transformOrigin: "100% 100%",
      });
    });
    
    // Hide glows initially
    glows.forEach(glow => {
      if (!glow) return;
      gsap.set(glow, { opacity: 0 });
    });

    // Phase 1: Wave propagation - each arc reveals with clip-path wipe
    // Inner arc (fastest, closest to origin)
    arcs.forEach((arc, i) => {
      if (!arc) return;
      
      const delay = i * 0.18; // Stagger: 180ms between each wave
      const duration = 0.7 + (i * 0.1); // Outer arcs take slightly longer
      
      // Wave reveal using clip-path animation
      tl.to(arc, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1,
        duration: duration,
        ease: "sine.inOut",
      }, delay);
    });
    
    // Phase 2: Glow pulse ripples through after reveal
    glows.forEach((glow, i) => {
      if (!glow) return;
      
      const glowDelay = 0.6 + (i * 0.12);
      
      tl.to(glow, {
        opacity: 0.6,
        duration: 0.25,
        ease: "power2.in",
      }, glowDelay)
      .to(glow, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      }, glowDelay + 0.25);
    });
    
    // Phase 3: Final settle - subtle scale pulse
    tl.to(arcs, {
      scale: 1.02,
      duration: 0.15,
      ease: "power2.out",
    }, 1.1)
    .to(arcs, {
      scale: 1,
      duration: 0.25,
      ease: "power2.inOut",
    }, 1.25);
  };

  useImperativeHandle(ref, () => ({
    play: playAnimation
  }));

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(playAnimation, 150);
      return () => clearTimeout(timer);
    } else {
      // If not autoPlay, show arcs immediately
      const arcs = [arc1Ref.current, arc2Ref.current, arc3Ref.current];
      arcs.forEach(arc => {
        if (arc) {
          gsap.set(arc, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            scale: 1,
          });
        }
      });
    }
  }, [autoPlay]);

  return (
    <svg ref={svgRef} className={cn("w-full h-full", className)} viewBox="0 0 80 80">
      <defs>
        {/* Brand gradient */}
        <linearGradient id="brandGradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#33993c" />
          <stop offset="50%" stopColor="#4da653" />
          <stop offset="100%" stopColor="#73B82E" />
        </linearGradient>
        
        {/* White gradient for dark backgrounds */}
        <linearGradient id="whiteGradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8f0e8" />
        </linearGradient>
        
        {/* Glow filter for pulse effect */}
        <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Stronger glow for the pulse */}
        <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Glow layers (behind main arcs) */}
      <path 
        ref={glow1Ref}
        d={ARC_PATHS.inner.d}
        fill={`url(#${getGradientId()})`}
        filter="url(#pulseGlow)"
        opacity="0"
      />
      <path 
        ref={glow2Ref}
        d={ARC_PATHS.middle.d}
        fill={`url(#${getGradientId()})`}
        filter="url(#pulseGlow)"
        opacity="0"
      />
      <path 
        ref={glow3Ref}
        d={ARC_PATHS.outer.d}
        fill={`url(#${getGradientId()})`}
        filter="url(#pulseGlow)"
        opacity="0"
      />
      
      {/* Main arcs */}
      <path 
        ref={arc1Ref}
        d={ARC_PATHS.inner.d}
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      <path 
        ref={arc2Ref}
        d={ARC_PATHS.middle.d}
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
      <path 
        ref={arc3Ref}
        d={ARC_PATHS.outer.d}
        fill={`url(#${getGradientId()})`}
        style={{ opacity: autoPlay ? 0 : 1 }}
      />
    </svg>
  );
});

AnimatedLogo.displayName = "AnimatedLogo";

export default AnimatedLogo;
