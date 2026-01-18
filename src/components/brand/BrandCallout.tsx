import { AlertTriangle, CheckCircle, Lightbulb } from "@/lib/icons";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "avoid" | "best";

interface BrandCalloutProps {
  variant?: CalloutVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CalloutVariant, {
  container: string;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  iconSymbol?: string;
}> = {
  info: {
    container: "bg-info-surface border-l-4 border-slate-500",
    iconBg: "bg-slate-600",
    iconColor: "text-white",
    icon: Lightbulb,
  },
  avoid: {
    container: "bg-warning-surface border-l-4 border-warning",
    iconBg: "bg-warning",
    iconColor: "text-white",
    icon: AlertTriangle,
    iconSymbol: "!",
  },
  best: {
    container: "bg-success-surface border-l-4 border-success",
    iconBg: "bg-success",
    iconColor: "text-white",
    icon: CheckCircle,
  },
};

export const BrandCallout = ({ 
  variant = "info", 
  title, 
  children, 
  className 
}: BrandCalloutProps) => {
  const styles = variantStyles[variant];
  const Icon = styles.icon;
  
  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-6 rounded-r-lg",
        styles.container,
        className
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded flex items-center justify-center flex-shrink-0",
        styles.iconBg,
        styles.iconColor
      )}>
        {styles.iconSymbol ? (
          <span className="font-data text-sm font-bold">{styles.iconSymbol}</span>
        ) : (
          <Icon className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-ui font-bold text-foreground mb-1">
          {title}
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};

export default BrandCallout;