import { ReactNode } from "react";

interface DatasheetSpec {
  label: string;
  value: string;
}

interface DatasheetCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  specs: DatasheetSpec[];
  diagram?: ReactNode;
  className?: string;
}

export const DatasheetCard = ({
  title,
  subtitle,
  icon,
  specs,
  diagram,
  className = "",
}: DatasheetCardProps) => {
  return (
    <article className={`relative overflow-hidden ${className}`}>
      {/* Main card container */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
        {/* Header with title */}
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-ui font-semibold text-slate-100 text-sm">{title}</h3>
            {subtitle && (
              <p className="font-data text-xs text-slate-400 uppercase tracking-wider">{subtitle}</p>
            )}
          </div>
          {/* Tech line decoration */}
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="w-8 h-px bg-slate-600" />
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Specs table */}
          <div className="space-y-1">
            {specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex justify-between items-center py-2 px-3 ${
                  index % 2 === 0 ? "bg-slate-100" : "bg-transparent"
                }`}
              >
                <span className="font-data text-xs uppercase tracking-wider text-slate-500">
                  {spec.label}
                </span>
                <span className="font-data text-sm font-medium text-foreground">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Diagram area */}
          {diagram && (
            <div className="relative bg-slate-100 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
              {/* Corner callout lines */}
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Top-left corner */}
                <path
                  d="M0 20 L0 0 L20 0"
                  fill="none"
                  stroke="hsl(var(--slate-400))"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                {/* Bottom-right corner */}
                <path
                  d="M200 100 L200 120 L180 120"
                  fill="none"
                  stroke="hsl(var(--slate-400))"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                {/* Callout line */}
                <path
                  d="M180 30 L195 30 L200 25"
                  fill="none"
                  stroke="hsl(var(--rho-green))"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle cx="180" cy="30" r="2" fill="hsl(var(--rho-green))" opacity="0.6" />
              </svg>
              {diagram}
            </div>
          )}
        </div>

        {/* Bottom tech strip */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      </div>

      {/* Side callout decoration */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block">
        <svg width="40" height="60" viewBox="0 0 40 60" aria-hidden="true">
          <line
            x1="0"
            y1="30"
            x2="25"
            y2="30"
            stroke="hsl(var(--slate-300))"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <circle cx="30" cy="30" r="4" fill="none" stroke="hsl(var(--slate-300))" strokeWidth="1" />
          <circle cx="30" cy="30" r="2" fill="hsl(var(--rho-green))" opacity="0.5" />
        </svg>
      </div>
    </article>
  );
};

export default DatasheetCard;
