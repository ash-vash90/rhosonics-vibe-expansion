import { getValueById } from "@/data/brand-values";

interface ValueBadgeProps {
  valueId: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * A consistent badge for displaying which core value a design element supports.
 * Used throughout the brand system to connect decisions back to values.
 */
export const ValueBadge = ({ valueId, className = "", showIcon = false }: ValueBadgeProps) => {
  const value = getValueById(valueId);
  if (!value) return null;

  const Icon = value.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-data text-[10px] text-primary/70 uppercase tracking-wider ${className}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      {value.shortTitle}
    </span>
  );
};

export default ValueBadge;
