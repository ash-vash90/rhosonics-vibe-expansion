import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Progress Indicators - Refactoring UI Principles Applied:
 * 
 * 1. EMPHASIZE BY DE-EMPHASIZING: The progress fill/value is the hero.
 *    Labels and secondary info are deliberately muted to create contrast.
 * 
 * 2. LABELS AS LAST RESORT: The visual progress bar itself communicates
 *    state. Labels are optional and styled to not compete with the fill.
 * 
 * 3. GRAYSCALE VALIDATION: The hierarchy works in grayscale - the fill
 *    is bold, the track is subtle, labels are light.
 * 
 * 4. SEPARATION WITHOUT BORDERS: Spacing and subtle background shifts
 *    separate elements rather than explicit borders.
 */

// Linear Progress Bar
const linearProgressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        obsidian: "bg-slate-700/50",
        primary: "bg-muted/50",
        outline: "bg-transparent border border-border/30",
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
    const isDark = variant === "obsidian";
    
    // Muted text classes - Emphasize by De-emphasizing
    const labelClass = isDark ? "text-slate-400" : "text-muted-foreground/60";
    const valueClass = isDark ? "text-slate-200" : "text-foreground";
    
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* 
          HEADER: Label + Value
          Both are intentionally small and muted - the progress bar itself
          is the primary visual indicator. Text provides context only.
        */}
        {(label || showValue) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <span className={cn(
                "font-data text-[10px] uppercase tracking-[0.12em]",
                labelClass
              )}>
                {label}
              </span>
            )}
            {showValue && (
              <span className={cn(
                "font-data text-sm font-medium tabular-nums",
                valueClass
              )}>
                {value}{max !== 100 ? `/${max}` : "%"}
              </span>
            )}
          </div>
        )}
        {/* 
          PROGRESS BAR: The Hero
          The fill communicates progress visually - the most important
          piece of information at a glance.
        */}
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
    const strokeWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;
    const radius = size === "sm" ? 28 : size === "lg" ? 52 : 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    /**
     * Color system - Grayscale Validation compliant
     * Track is subtle, fill is bold, text follows hierarchy
     */
    const colors = {
      obsidian: { 
        track: "stroke-slate-700/40", 
        fill: "stroke-slate-100", 
        value: "text-slate-100", 
        label: "text-slate-400",
        bg: "bg-rho-obsidian" 
      },
      primary: { 
        track: "stroke-muted/50", 
        fill: "stroke-primary", 
        value: "text-foreground", 
        label: "text-muted-foreground/60",
        bg: "bg-card" 
      },
      outline: { 
        track: "stroke-border/30", 
        fill: "stroke-primary", 
        value: "text-foreground", 
        label: "text-muted-foreground/60",
        bg: "bg-transparent" 
      },
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
          {/* Track - Deliberately subtle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={colors[variant].track}
          />
          {/* Fill - The Hero */}
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
        {/* 
          VALUE: Primary focus
          Large, bold, centered - this is what the user came to see.
          Label is muted and optional - context only.
        */}
        <div className="relative flex flex-col items-center justify-center">
          <span className={cn(
            "font-data font-semibold tabular-nums leading-none",
            size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg",
            colors[variant].value
          )}>
            {value}
          </span>
          {/* Label - Emphasize by De-emphasizing */}
          {label && (
            <span className={cn(
              "font-data uppercase tracking-[0.1em] mt-0.5",
              size === "sm" ? "text-[7px]" : "text-[9px]",
              colors[variant].label
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
