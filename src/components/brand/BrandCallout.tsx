import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "note" | "avoid" | "info";

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
  note: {
    container: "bg-muted/50 border-l-4 border-muted-foreground",
    iconBg: "bg-muted-foreground",
    iconColor: "text-background",
    icon: Info,
  },
  avoid: {
    container: "bg-warning-surface border-l-4 border-warning",
    iconBg: "bg-warning",
    iconColor: "text-white",
    icon: AlertTriangle,
    iconSymbol: "!",
  },
  info: {
    container: "bg-info-surface border-l-4 border-info",
    iconBg: "bg-info",
    iconColor: "text-white",
    icon: Lightbulb,
  },
};

export const BrandCallout = ({ 
  variant = "note", 
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