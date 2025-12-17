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
          <stop offset="50%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(125, 50%, 40%)" stopOpacity="0" />
        </linearGradient>
        {/* Standard glow filter */}
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Lime glow filter for peaks */}
        <filter id="limeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feFlood floodColor="hsl(90, 60%, 45%)" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Radial gradient for peak glow spots */}
        <radialGradient id="peakGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(90, 60%, 55%)" stopOpacity="0.8" />
          <stop offset="60%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(90, 60%, 45%)" stopOpacity="0" />
        </radialGradient>
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
      
      {/* Wave 2 - Offset with lime glow */}
      <path
        ref={wave2Ref}
        d="M-100,320 Q100,270 250,320 T550,320 T850,320 T1150,320 T1450,320 T1750,320"
        fill="none"
        stroke="url(#waveGradient2)"
        strokeWidth="2"
        strokeDasharray="15 8"
        filter="url(#limeGlow)"
        opacity="0.9"
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
      
      {/* Lime glow spots at wave peaks */}
      <circle cx="300" cy="250" r="20" fill="url(#peakGlow)" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="270" r="15" fill="url(#peakGlow)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="900" cy="250" r="18" fill="url(#peakGlow)" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.5;0.25" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default AnimatedWaveform;
