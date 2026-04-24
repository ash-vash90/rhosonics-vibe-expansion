interface VerifierBylineProps {
  name: string;
  role: string;
  initials: string;
  variant?: "light" | "dark";
}

export const VerifierByline = ({ name, role, initials, variant = "light" }: VerifierBylineProps) => {
  const isDark = variant === "dark";
  return (
    <div className={`mt-4 flex items-center gap-2.5 pt-4 border-t ${
      isDark ? "border-slate-700/50" : "border-border/50"
    }`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
        isDark ? "bg-slate-700" : "bg-rho-obsidian"
      }`}>
        <span className="font-data text-[9px] uppercase tracking-wider text-primary-foreground">
          {initials}
        </span>
      </div>
      <div className="flex-1 min-w-0 flex items-baseline gap-2 flex-wrap">
        <span className={`font-ui text-xs ${isDark ? "text-white" : "text-foreground"}`}>
          Verified by {name}
        </span>
        <span className={`font-data text-[10px] uppercase tracking-wider ${
          isDark ? "text-slate-400" : "text-muted-foreground"
        }`}>
          {role}
        </span>
      </div>
    </div>
  );
};

export default VerifierByline;
