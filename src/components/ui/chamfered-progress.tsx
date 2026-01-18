import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Linear Progress Bar
const linearProgressVariants = cva(
  "relative h-3 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        obsidian: "bg-slate-700",
        primary: "bg-muted",
        outline: "bg-transparent border-2 border-border",
      },
    },
    defaultVariants: {
      variant: "obsidian",
    },
  }
);

const linearProgressFillVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full",
  {
    variants: {
      variant: {
        obsidian: "bg-slate-100",
        primary: "bg-primary",
        outline: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "obsidian",
    },
  }
);

interface LinearProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof linearProgressVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ className, variant, value, max = 100, label, showValue = false, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const isOutline = variant === "outline";
    
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className={cn(
                "font-data text-sm",
                isOutline ? "text-foreground" : "text-muted-foreground"
              )}>
                {value}{max !== 100 ? `/${max}` : "%"}
              </span>
            )}
          </div>
        )}
        <div className={linearProgressVariants({ variant })}>
          <div 
            className={linearProgressFillVariants({ variant })}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
LinearProgress.displayName = "LinearProgress";

// Radial Gauge
const radialGaugeVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-16 h-16",
        default: "w-20 h-20",
        lg: "w-28 h-28",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface RadialGaugeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radialGaugeVariants> {
  value: number;
  max?: number;
  label?: string;
  variant?: "obsidian" | "primary" | "outline";
}

const RadialGauge = React.forwardRef<HTMLDivElement, RadialGaugeProps>(
  ({ className, size, variant = "obsidian", value, max = 100, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const strokeWidth = size === "sm" ? 4 : size === "lg" ? 6 : 5;
    const radius = size === "sm" ? 28 : size === "lg" ? 52 : 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const colors = {
      obsidian: { track: "stroke-slate-700", fill: "stroke-slate-100", text: "text-slate-100", bg: "bg-rho-obsidian" },
      primary: { track: "stroke-muted", fill: "stroke-primary", text: "text-foreground", bg: "bg-card" },
      outline: { track: "stroke-border", fill: "stroke-primary", text: "text-foreground", bg: "bg-transparent" },
    };
    
    const viewBoxSize = (radius + strokeWidth) * 2;
    const center = radius + strokeWidth;
    
    return (
      <div 
        ref={ref} 
        className={cn(radialGaugeVariants({ size }), colors[variant].bg, "rounded-full", className)} 
        {...props}
      >
        <svg 
          className="absolute inset-0 -rotate-90" 
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={colors[variant].track}
          />
          {/* Fill */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(colors[variant].fill, "transition-all duration-500 ease-out")}
          />
        </svg>
        <div className="relative flex flex-col items-center justify-center">
          <span className={cn(
            "font-ui font-medium",
            size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg",
            colors[variant].text
          )}>
            {value}
          </span>
          {label && (
            <span className={cn(
              "font-data uppercase tracking-wider",
              size === "sm" ? "text-[8px]" : "text-[10px]",
              variant === "obsidian" ? "text-slate-400" : "text-muted-foreground"
            )}>
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }
);
RadialGauge.displayName = "RadialGauge";

export { LinearProgress, RadialGauge };
