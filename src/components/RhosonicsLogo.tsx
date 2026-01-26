import { useId } from "react";
import { cn } from "@/lib/utils";
import { cleanReactId } from "@/lib/constants";

interface RhosonicsLogoProps {
  variant?: "gradient" | "white" | "dark";
  className?: string;
  animated?: boolean;
}

export const RhosonicsLogo = ({ variant = "gradient", className, animated = false }: RhosonicsLogoProps) => {
  // Avoid global SVG id collisions when multiple logos are on the page.
  const rawId = useId();
  const uid = cleanReactId(rawId);
  const brandGradientId = `brandGradient-${uid}`;
  const whiteGradientId = `whiteGradient-${uid}`;

  const getFill = () => {
    switch (variant) {
      case "white":
        return `url(#${whiteGradientId})`;
      case "dark":
        return `url(#${brandGradientId})`;
      default:
        return `url(#${brandGradientId})`;
    }
  };

  return (
    <svg className={cn("w-full h-full", className)} viewBox="0 0 80 80">
      <defs>
        <linearGradient id={brandGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#73B82E" />
          <stop offset="100%" stopColor="#33993c" />
        </linearGradient>
        <linearGradient id={whiteGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>

      {/* Wave 1 - Propagation point (innermost, fills corner) */}
      <g className={cn(animated && "animate-boot opacity-0")} style={{ transformOrigin: "bottom right" }}>
        <path d="M 80 80 L 80 60 A 20 20 0 0 0 60 80 L 80 80 Z" fill={getFill()} />
      </g>

      {/* Wave 2 - Middle */}
      <g className={cn(animated && "animate-boot delay-100 opacity-0")} style={{ transformOrigin: "bottom right" }}>
        <path d="M 80 49 L 80 31 A 49 49 0 0 0 31 80 L 49 80 A 31 31 0 0 1 80 49 Z" fill={getFill()} />
      </g>

      {/* Wave 3 - Outermost */}
      <g className={cn(animated && "animate-boot delay-200 opacity-0")} style={{ transformOrigin: "bottom right" }}>
        <path d="M 80 20 L 80 0 A 80 80 0 0 0 0 80 L 20 80 A 60 60 0 0 1 80 20 Z" fill={getFill()} />
      </g>
    </svg>
  );
};

export default RhosonicsLogo;

