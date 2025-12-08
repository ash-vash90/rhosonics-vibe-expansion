import { cn } from "@/lib/utils";

interface RhosonicsLogoProps {
  variant?: 'gradient' | 'white' | 'dark';
  className?: string;
  animated?: boolean;
}

export const RhosonicsLogo = ({ 
  variant = 'gradient', 
  className,
  animated = false 
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
    <svg className={cn("w-full h-full", className)} viewBox="0 0 80 80">
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
      <g className={cn(animated && "animate-boot delay-100 opacity-0")} style={{ transformOrigin: 'bottom right' }}>
        <path 
          d="M 80 60 L 80 49 A 31 31 0 0 0 49 80 L 60 80 A 20 20 0 0 1 80 60 Z" 
          fill={getFill()} 
        />
      </g>
      
      {/* Arc 2 - Middle */}
      <g className={cn(animated && "animate-boot delay-200 opacity-0")} style={{ transformOrigin: 'bottom right' }} opacity="0.93">
        <path 
          d="M 80 41 L 80 30 A 50 50 0 0 0 30 80 L 41 80 A 39 39 0 0 1 80 41 Z" 
          fill={getFill()} 
        />
      </g>
      
      {/* Arc 3 - Outermost */}
      <g className={cn(animated && "animate-boot delay-300 opacity-0")} style={{ transformOrigin: 'bottom right' }} opacity="0.86">
        <path 
          d="M 80 22 L 80 11 A 69 69 0 0 0 11 80 L 22 80 A 58 58 0 0 1 80 22 Z" 
          fill={getFill()} 
        />
      </g>
    </svg>
  );
};

export default RhosonicsLogo;
