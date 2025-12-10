import { cn } from "@/lib/utils";

interface RhosonicsLogoProps {
  variant?: 'gradient' | 'white' | 'dark';
  className?: string;
  animated?: boolean;
  pulse?: boolean;
}

export const RhosonicsLogo = ({
  variant = 'gradient',
  className,
  animated = false,
  pulse = false,
}: RhosonicsLogoProps) => {
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

  return (
    <svg
      className={cn("w-full h-full", pulse && "animate-logo-pulse", className)}
      viewBox="0 0 80 80"
    >
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

      {/* Arc 1 - Innermost - positioned to fill bottom-right */}
      <g
        className={cn(
          animated && "animate-boot delay-100 opacity-0",
          pulse && "animate-arc-pulse"
        )}
        style={{
          transformOrigin: 'bottom right',
          animationDelay: pulse ? '0s' : undefined,
        }}
      >
        <path
          d="M 80 55 L 80 42 A 38 38 0 0 0 42 80 L 55 80 A 25 25 0 0 1 80 55 Z"
          fill={getFill()}
        />
      </g>

      {/* Arc 2 - Middle */}
      <g
        className={cn(
          animated && "animate-boot delay-200 opacity-0",
          pulse && "animate-arc-pulse"
        )}
        style={{
          transformOrigin: 'bottom right',
          animationDelay: pulse ? '0.2s' : undefined,
        }}
      >
        <path
          d="M 80 34 L 80 21 A 59 59 0 0 0 21 80 L 34 80 A 46 46 0 0 1 80 34 Z"
          fill={getFill()}
        />
      </g>

      {/* Arc 3 - Outermost */}
      <g
        className={cn(
          animated && "animate-boot delay-300 opacity-0",
          pulse && "animate-arc-pulse"
        )}
        style={{
          transformOrigin: 'bottom right',
          animationDelay: pulse ? '0.4s' : undefined,
        }}
      >
        <path
          d="M 80 13 L 80 0 A 80 80 0 0 0 0 80 L 13 80 A 67 67 0 0 1 80 13 Z"
          fill={getFill()}
        />
      </g>
    </svg>
  );
};

export default RhosonicsLogo;
