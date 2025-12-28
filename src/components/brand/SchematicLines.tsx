import { useEffect, useRef } from "react";

interface SchematicLinesProps {
  className?: string;
  variant?: "hero" | "section" | "corner";
}

export const SchematicLines = ({ className = "", variant = "hero" }: SchematicLinesProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path, line");
    paths.forEach((path, index) => {
      const el = path as SVGPathElement | SVGLineElement;
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  if (variant === "corner") {
    return (
      <svg
        ref={svgRef}
        className={`absolute pointer-events-none ${className}`}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Corner bracket lines */}
        <path
          d="M0 40 L0 0 L40 0"
          stroke="hsl(var(--rho-green))"
          strokeWidth="2"
          strokeDasharray="8 4"
          className="animate-schematic-dash"
          opacity="0.4"
        />
        <circle cx="0" cy="0" r="4" fill="hsl(var(--rho-green))" opacity="0.6" />
        <path
          d="M10 60 L10 10 L60 10"
          stroke="hsl(var(--slate-400))"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-schematic-dash"
          opacity="0.3"
        />
        {/* Connection nodes */}
        <circle cx="40" cy="0" r="3" fill="hsl(var(--rho-green))" opacity="0.4" />
        <circle cx="0" cy="40" r="3" fill="hsl(var(--rho-green))" opacity="0.4" />
      </svg>
    );
  }

  if (variant === "section") {
    return (
      <svg
        ref={svgRef}
        className={`absolute pointer-events-none ${className}`}
        width="100%"
        height="60"
        viewBox="0 0 800 60"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Horizontal flow lines */}
        <line
          x1="0"
          y1="30"
          x2="200"
          y2="30"
          stroke="hsl(var(--rho-green))"
          strokeWidth="1"
          strokeDasharray="12 8"
          className="animate-schematic-dash"
          opacity="0.3"
        />
        <line
          x1="600"
          y1="30"
          x2="800"
          y2="30"
          stroke="hsl(var(--rho-green))"
          strokeWidth="1"
          strokeDasharray="12 8"
          className="animate-schematic-dash"
          opacity="0.3"
        />
        {/* Center connector */}
        <path
          d="M200 30 L250 15 L550 15 L600 30"
          stroke="hsl(var(--slate-400))"
          strokeWidth="1"
          strokeDasharray="6 4"
          className="animate-schematic-dash"
          opacity="0.25"
        />
        <path
          d="M200 30 L250 45 L550 45 L600 30"
          stroke="hsl(var(--slate-400))"
          strokeWidth="1"
          strokeDasharray="6 4"
          className="animate-schematic-dash"
          opacity="0.25"
        />
        {/* Nodes */}
        <circle cx="200" cy="30" r="4" fill="hsl(var(--rho-green))" opacity="0.5" />
        <circle cx="400" cy="15" r="3" fill="hsl(var(--slate-400))" opacity="0.4" />
        <circle cx="400" cy="45" r="3" fill="hsl(var(--slate-400))" opacity="0.4" />
        <circle cx="600" cy="30" r="4" fill="hsl(var(--rho-green))" opacity="0.5" />
      </svg>
    );
  }

  // Hero variant - larger, more prominent
  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main circuit paths */}
      <path
        d="M0 100 L100 100 L150 50 L300 50"
        stroke="hsl(var(--rho-green))"
        strokeWidth="1.5"
        strokeDasharray="10 6"
        className="animate-schematic-dash"
        opacity="0.25"
      />
      <path
        d="M300 50 L350 100 L500 100 L550 50 L700 50 L750 100 L800 100"
        stroke="hsl(var(--rho-green))"
        strokeWidth="1.5"
        strokeDasharray="10 6"
        className="animate-schematic-dash"
        opacity="0.25"
      />
      <path
        d="M0 300 L80 300 L120 350 L250 350"
        stroke="hsl(var(--slate-400))"
        strokeWidth="1"
        strokeDasharray="8 4"
        className="animate-schematic-dash"
        opacity="0.15"
      />
      <path
        d="M550 350 L680 350 L720 300 L800 300"
        stroke="hsl(var(--slate-400))"
        strokeWidth="1"
        strokeDasharray="8 4"
        className="animate-schematic-dash"
        opacity="0.15"
      />
      
      {/* Connection nodes */}
      <circle cx="300" cy="50" r="5" fill="hsl(var(--rho-green))" opacity="0.4" />
      <circle cx="550" cy="50" r="4" fill="hsl(var(--rho-green))" opacity="0.3" />
      <circle cx="700" cy="50" r="5" fill="hsl(var(--rho-green))" opacity="0.4" />
      <circle cx="250" cy="350" r="4" fill="hsl(var(--slate-400))" opacity="0.2" />
      <circle cx="550" cy="350" r="4" fill="hsl(var(--slate-400))" opacity="0.2" />
      
      {/* Vertical connectors */}
      <line
        x1="300"
        y1="50"
        x2="300"
        y2="150"
        stroke="hsl(var(--rho-green))"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="animate-schematic-dash"
        opacity="0.2"
      />
      <line
        x1="550"
        y1="50"
        x2="550"
        y2="180"
        stroke="hsl(var(--rho-green))"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="animate-schematic-dash"
        opacity="0.2"
      />
      
      {/* Small detail circles */}
      <circle cx="150" cy="50" r="3" stroke="hsl(var(--rho-green))" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="350" cy="100" r="3" stroke="hsl(var(--rho-green))" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="500" cy="100" r="3" stroke="hsl(var(--rho-green))" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="750" cy="100" r="3" stroke="hsl(var(--rho-green))" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
};

export default SchematicLines;
