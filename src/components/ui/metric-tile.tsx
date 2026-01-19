import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const metricTileVariants = cva(
  "relative flex flex-col p-5 rounded-xl overflow-hidden group cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]",
  {
    variants: {
      variant: {
        obsidian: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 shadow-lg shadow-black/20 border border-slate-700/50 hover:shadow-xl hover:shadow-black/30 hover:border-slate-600/70",
        primary: "bg-gradient-to-br from-primary via-primary to-green-700 text-primary-foreground shadow-lg shadow-primary/20 border border-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:border-primary/50",
        outline: "bg-gradient-to-br from-card via-card to-muted/30 border border-border text-foreground shadow-sm hover:shadow-lg hover:border-primary/40 hover:bg-gradient-to-br hover:from-card hover:via-card hover:to-primary/5",
        glass: "bg-white/5 backdrop-blur-md text-white border border-white/10 shadow-lg hover:shadow-xl hover:bg-white/10 hover:border-white/20 hover:shadow-white/10",
      },
      size: {
        default: "min-w-[160px]",
        compact: "min-w-[130px] p-4",
        wide: "min-w-[200px] p-6",
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

const statusConfig: Record<NonNullable<MetricTileProps["status"]>, { 
  bg: string; 
  text: string; 
  glow: string;
  ringColor: string;
}> = {
  live: { 
    bg: "bg-primary", 
    text: "text-primary", 
    glow: "shadow-primary/50",
    ringColor: "ring-primary/30"
  },
  stable: { 
    bg: "bg-success", 
    text: "text-success", 
    glow: "shadow-success/50",
    ringColor: "ring-success/30"
  },
  warning: { 
    bg: "bg-warning", 
    text: "text-warning", 
    glow: "shadow-warning/50",
    ringColor: "ring-warning/30"
  },
  error: { 
    bg: "bg-error", 
    text: "text-error", 
    glow: "shadow-error/50",
    ringColor: "ring-error/30"
  },
};

const MetricTile = React.forwardRef<HTMLDivElement, MetricTileProps>(
  ({ className, variant, size, value, unit, label, status, trend, trendValue, ...props }, ref) => {
    const isOutline = variant === "outline";
    const isGlass = variant === "glass";
    const isDark = variant === "obsidian" || variant === "primary" || variant === "glass";
    
    return (
      <div
        ref={ref}
        className={cn(metricTileVariants({ variant, size }), className)}
        {...props}
      >
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        
        {/* Corner accent line */}
        {isDark && (
          <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-white/20 to-transparent" />
        )}
        
        {/* Status glow effect */}
        {status && isDark && (
          <div className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full blur-xl opacity-30",
            statusConfig[status].bg
          )} />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {/* Label row with optional status */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className={cn(
              "font-data text-[11px] uppercase tracking-[0.15em] font-medium",
              isDark ? "text-current/60" : "text-muted-foreground"
            )}>
              {label}
            </span>
            {status && (
              <div className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-full",
                isDark ? "bg-white/10" : "bg-muted"
              )}>
                <div className={cn(
                  "relative w-2 h-2 rounded-full",
                  status === "live" && "animate-pulse",
                  isOutline || isGlass ? statusConfig[status].bg : "bg-current"
                )}>
                  {/* Inner glow ring */}
                  <div className={cn(
                    "absolute inset-0 rounded-full ring-2 ring-offset-0",
                    status === "live" && "animate-ping opacity-75",
                    isOutline ? statusConfig[status].ringColor : "ring-current/30"
                  )} />
                </div>
                <span className={cn(
                  "font-data text-[10px] uppercase tracking-wide font-medium",
                  isOutline ? statusConfig[status].text : "text-current/80"
                )}>
                  {status}
                </span>
              </div>
            )}
          </div>
          
          {/* Value display */}
          <div className="flex items-baseline gap-1.5">
            <span className={cn(
              "font-ui font-semibold text-4xl tracking-tight leading-none",
              isDark ? "text-current" : "text-foreground"
            )}>
              {value}
            </span>
            {unit && (
              <span className={cn(
                "font-data text-base font-medium",
                isDark ? "text-current/50" : "text-muted-foreground"
              )}>
                {unit}
              </span>
            )}
          </div>
          
          {/* Optional trend indicator */}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1.5 mt-3 pt-3 border-t",
              isDark ? "border-white/10" : "border-border"
            )}>
              <div className={cn(
                "flex items-center justify-center w-5 h-5 rounded",
                trend === "up" && "bg-success/20 text-success",
                trend === "down" && "bg-error/20 text-error",
                trend === "neutral" && (isDark ? "bg-white/10 text-current/60" : "bg-muted text-muted-foreground")
              )}>
                {trend === "up" && (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor" />
                  </svg>
                )}
                {trend === "down" && (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 10L2 6H5V2H7V6H10L6 10Z" fill="currentColor" />
                  </svg>
                )}
                {trend === "neutral" && (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 5H10V7H2V5Z" fill="currentColor" />
                  </svg>
                )}
              </div>
              <span className={cn(
                "font-data text-xs",
                trend === "up" && "text-success",
                trend === "down" && "text-error",
                trend === "neutral" && (isDark ? "text-current/60" : "text-muted-foreground")
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
MetricTile.displayName = "MetricTile";

export { MetricTile, metricTileVariants };
