import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const metricTileVariants = cva(
  "flex flex-col p-4 transition-all duration-200 [clip-path:var(--chamfer-md)]",
  {
    variants: {
      variant: {
        obsidian: "bg-rho-obsidian text-slate-100",
        primary: "bg-primary text-primary-foreground",
        outline: "bg-card border-2 border-border text-foreground",
      },
      size: {
        default: "min-w-[140px]",
        compact: "min-w-[120px] p-3",
        wide: "min-w-[180px] p-5",
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
}

const statusIndicator: Record<NonNullable<MetricTileProps["status"]>, { bg: string; text: string }> = {
  live: { bg: "bg-primary", text: "text-primary" },
  stable: { bg: "bg-success", text: "text-success" },
  warning: { bg: "bg-warning", text: "text-warning" },
  error: { bg: "bg-error", text: "text-error" },
};

const MetricTile = React.forwardRef<HTMLDivElement, MetricTileProps>(
  ({ className, variant, size, value, unit, label, status, ...props }, ref) => {
    const isOutline = variant === "outline";
    
    return (
      <div
        ref={ref}
        className={cn(metricTileVariants({ variant, size }), className)}
        {...props}
      >
        {/* Label row with optional status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={cn(
            "font-data text-xs uppercase tracking-wider",
            isOutline ? "text-muted-foreground" : "text-current opacity-70"
          )}>
            {label}
          </span>
          {status && (
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                status === "live" && "animate-pulse",
                isOutline ? statusIndicator[status].bg : "bg-current opacity-70"
              )} />
              <span className={cn(
                "font-data text-[10px] uppercase tracking-wide",
                isOutline ? statusIndicator[status].text : "text-current opacity-70"
              )}>
                {status}
              </span>
            </div>
          )}
        </div>
        
        {/* Value display */}
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "font-ui font-medium text-3xl tracking-tight",
            isOutline ? "text-foreground" : "text-current"
          )}>
            {value}
          </span>
          {unit && (
            <span className={cn(
              "font-data text-sm",
              isOutline ? "text-muted-foreground" : "text-current opacity-70"
            )}>
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
);
MetricTile.displayName = "MetricTile";

export { MetricTile, metricTileVariants };
