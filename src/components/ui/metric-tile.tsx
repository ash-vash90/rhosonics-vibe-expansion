import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * MetricTile - Refactoring UI Principles Applied:
 * 
 * 1. EMPHASIZE BY DE-EMPHASIZING: The value is the hero. Everything else
 *    (label, unit, status, trend) is deliberately muted to create contrast.
 *    Instead of making the value bigger, we make everything else smaller/lighter.
 * 
 * 2. LABELS AS LAST RESORT: Status is communicated via a subtle indicator dot
 *    rather than text. The label sits quietly above the value - only visible
 *    when context is needed.
 * 
 * 3. GRAYSCALE VALIDATION: The hierarchy works in grayscale - the value is
 *    bold and large, the label is small and light, the unit is medium and muted.
 *    Color is additive, not structural.
 * 
 * 4. SEPARATION WITHOUT BORDERS: Spacing and background shifts separate
 *    sections rather than explicit borders. The trend area uses subtle
 *    background differentiation instead of a border line.
 */

const metricTileVariants = cva(
  "relative flex flex-col rounded-xl overflow-hidden group cursor-default transition-all duration-300 ease-out hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        obsidian: "bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30",
        primary: "bg-gradient-to-br from-primary-600 to-primary-700 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
        outline: "bg-card text-foreground border border-border/50 shadow-sm hover:shadow-md hover:border-border",
        glass: "bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/8 hover:border-white/15",
      },
      size: {
        default: "min-w-[180px] p-5",
        compact: "min-w-[140px] p-4",
        wide: "min-w-[220px] p-6",
      },
    },
    defaultVariants: {
      variant: "obsidian",
      size: "default",
    },
  }
);

interface MetricTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricTileVariants> {
  value: string | number;
  unit?: string;
  label: string;
  status?: "live" | "stable" | "warning" | "error";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

// Status uses subtle color coding - the dot speaks for itself (Labels as Last Resort)
const statusColors: Record<NonNullable<MetricTileProps["status"]>, string> = {
  live: "bg-primary",
  stable: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const MetricTile = React.forwardRef<HTMLDivElement, MetricTileProps>(
  ({ className, variant, size, value, unit, label, status, trend, trendValue, ...props }, ref) => {
    const isDark = variant === "obsidian" || variant === "primary" || variant === "glass";
    
    // Muted text classes - Emphasize by De-emphasizing
    const mutedClass = isDark ? "text-current/40" : "text-muted-foreground/70";
    const secondaryClass = isDark ? "text-current/60" : "text-muted-foreground";
    
    return (
      <div
        ref={ref}
        className={cn(metricTileVariants({ variant, size }), className)}
        {...props}
      >
        {/* 
          HEADER: Label + Status
          Label is intentionally small and muted - it provides context but 
          should not compete with the value for attention.
        */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={cn(
            "font-data text-[10px] uppercase tracking-[0.12em]",
            mutedClass
          )}>
            {label}
          </span>
          
          {/* 
            Status indicator - Labels as Last Resort
            A simple colored dot communicates status without text.
            The pulse animation for "live" adds meaning through motion.
          */}
          {status && (
            <div className="relative">
              <div className={cn(
                "w-2 h-2 rounded-full",
                statusColors[status],
                status === "live" && "animate-pulse"
              )} />
              {/* Subtle glow ring for emphasis */}
              {status === "live" && (
                <div className={cn(
                  "absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-40",
                  statusColors[status]
                )} />
              )}
            </div>
          )}
        </div>
        
        {/* 
          VALUE: The Hero
          This is what the user came to see. Everything else exists to
          support this single piece of information.
        */}
        <div className="flex items-baseline gap-1.5">
          <span className={cn(
            "font-data text-4xl font-semibold tracking-tight leading-none",
            isDark ? "text-current" : "text-foreground"
          )}>
            {value}
          </span>
          
          {/* 
            Unit is deliberately smaller and lighter than the value.
            It clarifies meaning without competing for attention.
          */}
          {unit && (
            <span className={cn(
              "font-data text-sm tracking-wide",
              secondaryClass
            )}>
              {unit}
            </span>
          )}
        </div>
        
        {/* 
          TREND: Secondary Information
          Separation without borders - uses subtle background shift and
          spacing instead of a dividing line.
        */}
        {trend && trendValue && (
          <div className={cn(
            "flex items-center gap-1.5 mt-3 pt-2 -mx-1 px-1 rounded",
            isDark ? "bg-white/5" : "bg-muted/50"
          )}>
            {/* Trend arrow - small, functional, not decorative */}
            <span className={cn(
              "text-xs",
              trend === "up" && "text-success",
              trend === "down" && "text-error",
              trend === "neutral" && secondaryClass
            )}>
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"}
            </span>
            
            {/* Trend value - secondary to the main value */}
            <span className={cn(
              "font-ui text-xs",
              trend === "up" && "text-success",
              trend === "down" && "text-error",
              trend === "neutral" && secondaryClass
            )}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    );
  }
);
MetricTile.displayName = "MetricTile";

export { MetricTile, metricTileVariants };
