import { useCountUp } from "@/hooks/useGsapAnimations";
import { Zap, Globe, Target, Clock } from "lucide-react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  decimals?: boolean;
  iconBg?: string;
}

const StatItem = ({ value, suffix, label, sublabel, icon, decimals = false, iconBg = "bg-primary/20" }: StatItemProps) => {
  const countRef = useCountUp(value, suffix, 2);
  
  return (
    <div className="flex flex-col items-center text-center group">
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:opacity-80 transition-opacity`}>
        {icon}
      </div>
      <span 
        ref={countRef} 
        className="font-data text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-2"
      >
        {decimals ? "0.0" : "0"}{suffix}
      </span>
      <span className="font-ui text-sm md:text-base text-slate-300 font-medium">{label}</span>
      {sublabel && (
        <span className="font-data text-xs text-slate-500 uppercase tracking-wider mt-1">{sublabel}</span>
      )}
    </div>
  );
};

export const StatsShowcase = () => {
  return (
    <section className="my-16 relative overflow-hidden" aria-label="Key statistics">
      {/* Background */}
      <div className="card-gradient chamfer-lg py-16 md:py-20 px-6 md:px-12 relative">
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 bg-wave-subtle opacity-30 pointer-events-none" aria-hidden="true" />
        
        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <StatItem 
            value={40}
            suffix="+"
            label="Years of Innovation"
            sublabel="EST. 1984"
            icon={<Zap className="w-6 h-6 text-primary" />}
            iconBg="bg-primary/20"
          />
          <StatItem 
            value={50}
            suffix="+"
            label="Countries Served"
            sublabel="WORLDWIDE"
            icon={<Globe className="w-6 h-6 text-earth-ochre" />}
            iconBg="bg-earth-ochre/20"
          />
          <StatItem 
            value={0.1}
            suffix="%"
            label="Measurement Accuracy"
            sublabel="PRECISION"
            icon={<Target className="w-6 h-6 text-earth-amber" />}
            iconBg="bg-earth-amber/20"
            decimals
          />
          <StatItem 
            value={24}
            suffix="/7"
            label="Operational Reliability"
            sublabel="CONTINUOUS"
            icon={<Clock className="w-6 h-6 text-rho-lime" />}
            iconBg="bg-rho-lime/20"
          />
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 font-data text-xs text-slate-600 uppercase tracking-wider">
          METRICS.GLOBAL
        </div>
        <div className="absolute bottom-4 right-4 font-data text-xs text-slate-600 uppercase tracking-wider">
          V.CURRENT
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;
