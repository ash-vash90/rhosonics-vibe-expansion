import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedWaveformProps {
  className?: string;
}

export const AnimatedWaveform = ({ className = "" }: AnimatedWaveformProps) => {
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const waves = [wave1Ref.current, wave2Ref.current, wave3Ref.current];
    
    waves.forEach((wave, index) => {
      if (!wave) return;
      
      // Continuous horizontal flow animation
      gsap.to(wave, {
        attr: { "stroke-dashoffset": -1000 },
        duration: 15 + index * 3,
        ease: "none",
        repeat: -1,
      });
      
      // Subtle vertical pulse
      gsap.to(wave, {
        scaleY: 1.1 + index * 0.05,
        duration: 3 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "center center",
      });
    });
  }, []);

  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
        </linearGradient>
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Wave 1 - Primary */}
      <path
        ref={wave1Ref}
        d="M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 T1500,300 T1800,300"
        fill="none"
        stroke="url(#waveGradient1)"
        strokeWidth="2"
        strokeDasharray="20 10"
        filter="url(#waveGlow)"
      />
      
      {/* Wave 2 - Offset */}
      <path
        ref={wave2Ref}
        d="M-100,320 Q100,270 250,320 T550,320 T850,320 T1150,320 T1450,320 T1750,320"
        fill="none"
        stroke="url(#waveGradient2)"
        strokeWidth="1.5"
        strokeDasharray="15 8"
        opacity="0.8"
      />
      
      {/* Wave 3 - Background */}
      <path
        ref={wave3Ref}
        d="M-200,280 Q50,230 200,280 T500,280 T800,280 T1100,280 T1400,280 T1700,280"
        fill="none"
        stroke="url(#waveGradient3)"
        strokeWidth="1"
        strokeDasharray="10 5"
        opacity="0.6"
      />
    </svg>
  );
};

export default AnimatedWaveform;
