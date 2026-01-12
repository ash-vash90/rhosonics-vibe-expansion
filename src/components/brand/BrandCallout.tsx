import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "rule" | "note" | "avoid";

interface BrandCalloutProps {
  variant?: CalloutVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CalloutVariant, {
  container: string;
  icon: React.ElementType;
  iconColor: string;
}> = {
  rule: {
    container: "bg-primary/5 border-primary/20 border-l-primary",
    icon: CheckCircle2,
    iconColor: "text-primary",
  },
  note: {
    container: "bg-slate-100 border-slate-200 border-l-slate-400",
    icon: Info,
    iconColor: "text-slate-500",
  },
  avoid: {
    container: "bg-amber-50 border-amber-200 border-l-amber-500",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
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
        "p-5 border border-l-4 rounded-lg",
        styles.container,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", styles.iconColor)} />
        <div className="flex-1 min-w-0">
          <h4 className="font-ui font-semibold text-sm text-slate-700 mb-1">
            {title}
          </h4>
          <div className="text-sm text-slate-600 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCallout;
