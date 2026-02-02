import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Settings,
  Droplets,
  Activity,
  ChevronLeft,
  X,
  Pencil,
  Trash2,
  Plus,
  Usb,
  Gauge,
  FlaskConical,
  Waves,
  Zap,
  TrendingUp,
  Globe,
  Sun,
  Thermometer,
  Lock,
  Play,
  Pause,
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";
import bb, { spline } from "billboard.js";
import "billboard.js/dist/billboard.css";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DEVICE FRAME - Premium industrial tablet with boot animation
// ============================================================================
const DeviceFrame = ({ children }: { children: React.ReactNode }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const hasBooted = useRef(false);

  useEffect(() => {
    const frame = frameRef.current;
    const screen = screenRef.current;
    const reflection = reflectionRef.current;
    if (!frame || !screen || !reflection) return;

    // If already booted, ensure screen is visible
    if (hasBooted.current) {
      gsap.set(frame, { scale: 1, opacity: 1, y: 0 });
      gsap.set(screen, { opacity: 1, filter: "brightness(1)" });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(screen, { opacity: 0, filter: "brightness(0)" });
      gsap.set(reflection, { opacity: 0 });

      ScrollTrigger.create({
        trigger: frame,
        start: "top 80%",
        once: true, // Only trigger once
        onEnter: () => {
          if (hasBooted.current) return;
          hasBooted.current = true;
          
          // Boot sequence
          const tl = gsap.timeline();
          
          // Frame scales in
          tl.fromTo(frame, 
            { scale: 0.95, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
          
          // Screen flickers on
          tl.to(screen, {
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.1,
            ease: "steps(1)"
          }, "-=0.3");
          
          tl.to(screen, { filter: "brightness(1.5)", duration: 0.05 }, "+=0.05");
          tl.to(screen, { filter: "brightness(1)", duration: 0.1 });
          
          // Reflection sweeps across
          tl.fromTo(reflection,
            { opacity: 0.6, x: "-100%" },
            { opacity: 0, x: "200%", duration: 1.5, ease: "power2.inOut" },
            "-=0.3"
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={frameRef} className="relative w-full max-w-4xl mx-auto px-2 sm:px-0" style={{ opacity: 0 }}>
      {/* Ambient glow - reduced on mobile */}
      <div className="absolute -inset-8 sm:-inset-20 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-2xl sm:rounded-[4rem] blur-2xl sm:blur-3xl" />
      
      {/* Device shell - sharper corners */}
      <div className="relative rounded-lg sm:rounded-xl overflow-hidden" style={{
        background: 'linear-gradient(165deg, hsl(220 12% 22%) 0%, hsl(220 15% 8%) 100%)',
        boxShadow: `
          0 60px 120px -30px hsl(0 0% 0% / 0.6),
          0 30px 60px -20px hsl(0 0% 0% / 0.4),
          0 15px 30px -10px hsl(0 0% 0% / 0.3),
          inset 0 1px 0 hsl(220 12% 30%),
          inset 0 -2px 0 hsl(220 15% 5%)
        `
      }}>
        {/* Glass highlight on bezel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-lg sm:rounded-xl" />
        
        {/* Top bezel - compact */}
        <div className="relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3" style={{
          background: 'linear-gradient(180deg, hsl(220 12% 18%) 0%, hsl(220 12% 14%) 100%)'
        }}>
          {/* Subtle bezel texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(220 10% 25%) 1px, transparent 0)',
            backgroundSize: '4px 4px'
          }} />
          
          <div className="relative flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shadow-lg shadow-primary/60" />
              <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary animate-ping opacity-30" />
            </div>
            <span className="font-data text-[10px] sm:text-xs text-primary uppercase tracking-widest font-medium">ONLINE</span>
          </div>
          <div className="relative flex items-center gap-3 sm:gap-6 text-slate-400">
            <div className="hidden sm:flex items-center gap-2">
              <Usb className="w-3.5 h-3.5 text-primary" />
              <span className="font-data text-xs uppercase tracking-wide">USB</span>
            </div>
            <span className="font-data text-xs sm:text-sm tabular-nums font-medium text-slate-300">14:32</span>
          </div>
        </div>
        
        {/* Screen container */}
        <div className="relative">
          {/* Screen */}
          <div 
            ref={screenRef}
            className="aspect-[5/3] bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
          >
            {children}
            
            {/* Screen edge shadow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.06)] sm:shadow-[inset_0_0_30px_rgba(0,0,0,0.08)]" />
          </div>
          
          {/* Reflection sweep overlay */}
          <div 
            ref={reflectionRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
              transform: 'translateX(-100%)'
            }}
          />
          
          {/* Screen glass reflection (static) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            background: 'linear-gradient(135deg, white 0%, transparent 50%)'
          }} />
        </div>
        
        {/* Bottom bezel - thinner on mobile */}
        <div className="h-2 sm:h-4 relative" style={{
          background: 'linear-gradient(180deg, hsl(220 12% 12%) 0%, hsl(220 15% 6%) 100%)'
        }}>
          {/* Center indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-16 h-0.5 sm:h-1 rounded-full bg-slate-700/50" />
        </div>
      </div>
      
      {/* Device label - smaller on mobile */}
      <div className="mt-6 sm:mt-12 flex justify-center">
        <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-2xl bg-gradient-to-r from-muted/70 to-muted/40 border border-border/50 backdrop-blur-sm shadow-lg">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
          <span className="font-data text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">SDM ECO · 800×480</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ICON SIDEBAR - Touch-optimized navigation with labels
// ============================================================================
const IconNav = ({ children }: { children: React.ReactNode }) => (
  <div className="w-40 bg-gradient-to-b from-slate-100 via-slate-50 to-white border-r border-slate-200/80 flex flex-col items-stretch py-3 gap-1 shadow-inner">
    {children}
  </div>
);

const IconNavItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`mx-2 px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-200 ${
      active 
        ? "bg-gradient-to-br from-primary to-primary/85 text-white shadow-lg shadow-primary/40" 
        : "text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-md"
    }`}
  >
    <Icon className="w-5 h-5 shrink-0" />
    {label && (
      <span className={`font-ui text-sm font-medium whitespace-nowrap ${active ? "text-white" : "text-slate-600"}`}>
        {label}
      </span>
    )}
  </button>
);

// ============================================================================
// LIVE METRIC - Bold data display
// ============================================================================
const LiveMetric = ({
  value,
  unit,
  label,
  trend,
  highlight = false,
  size = "normal",
}: {
  value: string;
  unit: string;
  label: string;
  trend?: string;
  highlight?: boolean;
  size?: "normal" | "large";
}) => (
  <div className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
    highlight 
      ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 shadow-lg shadow-primary/10" 
      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
  }`}>
    <span className="font-ui text-base text-slate-500 font-medium mb-2 block">{label}</span>
    
    <div className="flex items-baseline gap-2">
      <span className={`font-data text-slate-900 tabular-nums tracking-tight font-medium ${
        size === "large" ? "text-7xl" : "text-6xl"
      }`}>
        {value}
      </span>
      <span className={`font-data text-slate-400 uppercase font-medium ${
        size === "large" ? "text-3xl" : "text-2xl"
      }`}>{unit}</span>
    </div>
    
    {trend && (
      <div className="mt-3 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <span className="font-data text-sm text-primary uppercase tracking-wide font-medium">{trend}</span>
      </div>
    )}
  </div>
);

// ============================================================================
// LIVE WAVEFORM - Animated sensor data
// ============================================================================
const LiveWaveform = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ReturnType<typeof bb.generate> | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const generateWaveData = (offset: number) => {
      const points = 50;
      return Array.from({ length: points }, (_, i) => {
        const x = (i / points) * Math.PI * 4;
        const wave1 = Math.sin(x + offset) * 0.3;
        const wave2 = Math.sin(x * 2.5 + offset * 1.3) * 0.15;
        const noise = (Math.random() - 0.5) * 0.05;
        return 1.0 + wave1 + wave2 + noise;
      });
    };
    
    let offset = 0;
    const densityData = generateWaveData(offset);
    
    chartInstance.current = bb.generate({
      bindto: chartRef.current,
      data: {
        columns: [["DENSITY", ...densityData]],
        type: spline(),
        colors: { DENSITY: "hsl(88 60% 45%)" },
      },
      spline: { interpolation: { type: "cardinal" } },
      point: { show: false },
      axis: {
        x: { show: false },
        y: {
          show: true,
          min: 0.5,
          max: 1.5,
          tick: {
            values: [0.6, 0.8, 1.0, 1.2, 1.4],
            format: (d: number) => d.toFixed(1),
          },
        },
      },
      grid: { y: { lines: [{ value: 1.0, class: "reference-line" }] } },
      legend: { show: false },
      tooltip: { show: false },
      transition: { duration: 100 },
      padding: { left: 45, right: 15, top: 15, bottom: 10 },
      size: { height: 90 },
    });
    
    const interval = setInterval(() => {
      offset += 0.15;
      chartInstance.current?.load({ columns: [["DENSITY", ...generateWaveData(offset)]] });
    }, 100);
    
    return () => {
      clearInterval(interval);
      chartInstance.current?.destroy();
    };
  }, []);
  
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-ui text-base text-slate-500 font-medium">Signal waveform</span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-data text-sm text-primary uppercase tracking-wide font-medium">LIVE</span>
        </div>
      </div>
      <div ref={chartRef} className="sdm-waveform" />
      <style>{`
        .sdm-waveform .bb-axis-y .tick text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          fill: hsl(215 16% 47%);
          text-transform: uppercase;
        }
        .sdm-waveform .bb-axis-y .domain,
        .sdm-waveform .bb-axis-y .tick line {
          stroke: hsl(214 32% 91%);
        }
        .sdm-waveform .bb-grid .reference-line line {
          stroke: hsl(88 60% 45%);
          stroke-width: 2;
          stroke-dasharray: 6 4;
        }
        .sdm-waveform .bb-line {
          stroke-width: 3;
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ANIMATED TEMPERATURE VALUE
// ============================================================================
const AnimatedTemp = ({ 
  baseValue, 
  variance = 0.05,
  label 
}: { 
  baseValue: number; 
  variance?: number;
  label: string;
}) => {
  const [value, setValue] = useState(baseValue);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(baseValue + (Math.random() - 0.5) * variance);
    }, 200);
    return () => clearInterval(interval);
  }, [baseValue, variance]);
  
  return (
    <div className="text-center">
      <span className="font-ui text-base text-slate-500 font-medium block mb-2">{label}</span>
      <span className="font-data text-5xl text-slate-900 tabular-nums font-medium">
        {value.toFixed(2)}
      </span>
      <span className="font-data text-2xl text-slate-400 uppercase ml-1">°C</span>
    </div>
  );
};

// ============================================================================
// SAMPLING PROGRESS INDICATOR
// ============================================================================
const SamplingProgress = ({ progress, status }: { progress: number; status: string }) => (
  <div className="flex-1">
    <div className="flex items-center justify-between mb-2">
      <span className="font-ui text-base text-slate-600 font-medium">{status}</span>
      <span className="font-data text-base text-primary uppercase">{Math.round(progress)}%</span>
    </div>
    <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

// ============================================================================
// TEMPERATURE SAMPLING SCREEN - Live calibration process
// ============================================================================
const SamplingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isSampling, setIsSampling] = useState(true);
  
  useEffect(() => {
    if (!isSampling) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsSampling(false);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isSampling]);
  
  return (
    <div className="h-full flex">
      <IconNav>
        <IconNavItem icon={ChevronLeft} label="Back" />
        <IconNavItem icon={Thermometer} label="Temp" active />
        <IconNavItem icon={Droplets} label="Profiles" />
      </IconNav>

      <div className="flex-1 p-5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-ui text-xl text-slate-900 font-semibold">Calibration point #0</h2>
            <p className="font-ui text-base text-slate-500">Clay 10% profile</p>
          </div>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        
        {/* Instruction */}
        <div className="bg-gradient-to-r from-primary/8 to-transparent rounded-xl p-4 mb-5 border border-primary/20">
          <p className="font-ui text-base text-slate-700 leading-relaxed">
            Please bring your liquid temperature to the recommended temperature, 
            and gather your sample while clicking on the 'Sample' button.
          </p>
        </div>
        
        {/* Temperature readings */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            <AnimatedTemp baseValue={26.02} variance={0.08} label="Liquid temperature" />
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/25 p-4 shadow-lg shadow-primary/10">
            {isSampling ? (
              <div className="text-center">
                <span className="font-ui text-base text-slate-500 font-medium block mb-2">Sampled temperature</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-ui text-xl text-primary font-medium animate-pulse">Sampling...</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <span className="font-ui text-base text-slate-500 font-medium block mb-2">Sampled temperature</span>
                <span className="font-data text-5xl text-primary tabular-nums font-medium">25.98</span>
                <span className="font-data text-2xl text-primary/60 uppercase ml-1">°C</span>
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl border-2 border-slate-200 p-4 shadow-sm">
            <div className="text-center">
              <span className="font-ui text-base text-slate-500 font-medium block mb-2">Recommended</span>
              <span className="font-data text-5xl text-slate-900 tabular-nums font-medium">25.00</span>
              <span className="font-data text-2xl text-slate-400 uppercase ml-1">°C</span>
            </div>
          </div>
        </div>
        
        {/* Progress and controls */}
        <div className="flex items-center gap-5">
          <SamplingProgress 
            progress={progress} 
            status={isSampling ? "Sampling liquid..." : "Sample complete"} 
          />
          
          <button 
            onClick={() => {
              setIsSampling(!isSampling);
              if (!isSampling) setProgress(0);
            }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
              isSampling 
                ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30" 
                : "bg-gradient-to-br from-primary to-primary/85 hover:from-primary/90 hover:to-primary/75 shadow-primary/30"
            }`}
          >
            {isSampling ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MEASUREMENTS SCREEN
// ============================================================================
const MeasurementsScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={Gauge} label="Live" active />
      <IconNavItem icon={FlaskConical} label="Calibrate" />
      <IconNavItem icon={Activity} label="Logs" />
      <IconNavItem icon={Settings} label="Settings" />
    </IconNav>

    <div className="flex-1 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-ui text-2xl text-slate-900 font-semibold">Measurements</h2>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 shadow-sm">
          <Droplets className="w-5 h-5 text-primary" />
          <span className="font-ui text-base text-slate-700 font-medium">Super profile</span>
          <Zap className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <LiveMetric 
          value="1.00" 
          unit="SG" 
          label="Density"
          trend="+0.02 AVG"
          highlight
        />
        <LiveMetric 
          value="25.73" 
          unit="°C" 
          label="Temperature"
          trend="STABLE"
        />
      </div>
      
      {/* Waveform */}
      <LiveWaveform />
    </div>
  </div>
);

// ============================================================================
// PROFILES SCREEN
// ============================================================================
const ProfilesScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={ChevronLeft} label="Back" />
      <IconNavItem icon={Waves} label="Signal" />
      <IconNavItem icon={Droplets} label="Profiles" active />
    </IconNav>

    <div className="flex-1 p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-ui text-2xl text-slate-900 font-semibold">Liquid profiles</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100">
          <span className="font-data text-sm text-slate-500 uppercase">4 profiles</span>
        </div>
      </div>

      {/* Profile List */}
      <div className="flex-1 space-y-2 overflow-auto">
        {[
          { name: "Water", desc: "Base calibration", active: false, locked: true, points: 1 },
          { name: "Super profile", desc: "Clay 5%, 10%, 20%, 30%", active: true, locked: false, points: 4 },
          { name: "Liquid #0", desc: "Clay 5%", active: false, locked: false, points: 2 },
          { name: "Liquid #1", desc: "Clay 10%", active: false, locked: false, points: 3 },
        ].map((profile) => (
          <div
            key={profile.name}
            className={`group flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
              profile.active
                ? "bg-gradient-to-r from-primary/12 via-primary/6 to-transparent border-primary/40 shadow-sm shadow-primary/10"
                : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            {/* Status indicator */}
            <div className={`w-1 h-14 rounded-full transition-all ${
              profile.active ? "bg-primary shadow-lg shadow-primary/50" : "bg-slate-200 group-hover:bg-slate-300"
            }`} />
            
            {/* Profile icon */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              profile.active 
                ? "bg-primary/15 border border-primary/25" 
                : "bg-slate-50 border border-slate-200"
            }`}>
              {profile.locked ? (
                <Lock className={`w-5 h-5 ${profile.active ? "text-primary" : "text-slate-400"}`} />
              ) : (
                <Droplets className={`w-5 h-5 ${profile.active ? "text-primary" : "text-slate-400"}`} />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-ui text-lg font-semibold truncate ${
                  profile.active ? "text-primary" : "text-slate-900"
                }`}>{profile.name}</h3>
                {profile.active && (
                  <span className="px-2.5 py-0.5 rounded-md bg-primary/20 text-primary font-data text-xs uppercase tracking-wide">
                    Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="font-ui text-base text-slate-500 truncate">{profile.desc}</span>
                <span className="font-data text-sm text-slate-400 uppercase shrink-0">{profile.points} pts</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-primary/10 hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              {!profile.locked && (
                <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add button */}
      <button className="mt-3 w-full py-3.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 font-ui text-base font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
        <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
        Create new profile
      </button>
    </div>
  </div>
);

// ============================================================================
// CALIBRATION SCREEN
// ============================================================================
const CalibrationScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={ChevronLeft} label="Back" />
      <IconNavItem icon={Thermometer} label="Points" active />
      <IconNavItem icon={Droplets} label="Profiles" />
    </IconNav>

    <div className="flex-1 p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-ui text-2xl text-slate-900 font-semibold">Calibration points</h2>
          <div className="flex items-center gap-2 mt-1">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="font-ui text-base text-slate-500">Clay 10% profile</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-ui text-sm text-slate-500 font-medium">Calibration progress</span>
          <span className="font-data text-sm text-primary uppercase">1/2 complete</span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-primary to-primary/80 rounded-full" />
        </div>
      </div>

      {/* Calibration Points */}
      <div className="flex-1 space-y-2 overflow-auto">
        {[
          { id: 0, status: "Done", temp: "26.03", density: "1035.00", done: true },
          { id: 1, status: "Ready to sample", temp: "38.02", density: null, done: false },
        ].map((point) => (
          <div
            key={point.id}
            className={`group flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
              point.done 
                ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30" 
                : "bg-gradient-to-r from-amber-50 via-amber-25 to-transparent border-amber-300 animate-pulse"
            }`}
          >
            {/* Status bar */}
            <div className={`w-1 h-16 rounded-full ${point.done ? "bg-primary" : "bg-amber-400"}`} />
            
            {/* Point number */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-data text-lg font-medium ${
              point.done 
                ? "bg-primary/15 border border-primary/25 text-primary" 
                : "bg-amber-100 border border-amber-300 text-amber-700"
            }`}>
              #{point.id}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-ui text-lg font-semibold ${point.done ? "text-slate-900" : "text-amber-700"}`}>
                  {point.status}
                </span>
                {point.done && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-slate-400" />
                  <span className="font-data text-base text-slate-600 uppercase">{point.temp}°C</span>
                </div>
                {point.density && (
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-slate-400" />
                    <span className="font-data text-base text-slate-600 uppercase">{point.density} KG/M³</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              <button className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                point.done 
                  ? "bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 text-primary"
                  : "bg-amber-100 border border-amber-200 hover:bg-amber-200 text-amber-700"
              }`}>
                <Pencil className="w-4 h-4" />
              </button>
              <button className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                point.done 
                  ? "bg-white border border-slate-200 hover:border-destructive hover:bg-destructive/5 text-destructive"
                  : "bg-amber-100 border border-amber-200 hover:bg-destructive/10 text-destructive"
              }`}>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add button */}
      <button className="mt-3 w-full py-3.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 font-ui text-base font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group">
        <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
        Add calibration point
      </button>
      
      {/* Footer info */}
      <div className="mt-3 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <span className="font-ui text-sm text-slate-500 font-medium">Temperature range</span>
        <span className="font-data text-sm text-slate-700 uppercase">20.00°C – 50.00°C</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// SETTINGS SCREEN
// ============================================================================
const SettingsScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={ChevronLeft} label="Back" />
      <IconNavItem icon={Globe} label="Language" />
      <IconNavItem icon={Sun} label="Display" />
      <IconNavItem icon={Gauge} label="Units" active />
    </IconNav>

    <div className="flex-1 p-5">
      <h2 className="font-ui text-2xl text-slate-900 font-semibold mb-5">Display units</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Density */}
        <div>
          <h3 className="font-ui text-base text-slate-500 font-medium mb-3 uppercase tracking-wide">Density</h3>
          <div className="space-y-2">
            {["SG", "kg/m³", "g/L", "lb/ft³", "SGx1000", "Weight %"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-gradient-to-r from-primary/10 to-transparent border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-lg font-medium ${i === 0 ? "text-slate-900" : "text-slate-600"}`}>
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-ui text-base text-slate-500 font-medium mb-3 uppercase tracking-wide">Temperature</h3>
          <div className="space-y-2">
            {["Celsius (°C)", "Fahrenheit (°F)"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-gradient-to-r from-primary/10 to-transparent border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-lg font-medium ${i === 0 ? "text-slate-900" : "text-slate-600"}`}>
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// PIN ENTRY SCREEN
// ============================================================================
const PinScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={ChevronLeft} label="Back" />
      <IconNavItem icon={Lock} label="Access" active />
    </IconNav>

    <div className="flex-1 p-5 flex items-center justify-center">
      <div className="flex gap-10">
        {/* PIN Display */}
        <div className="flex flex-col items-center">
          <h2 className="font-ui text-xl text-slate-700 font-semibold mb-4">Enter access code</h2>
          <div className="px-8 py-5 rounded-xl bg-white border-2 border-primary shadow-lg shadow-primary/10 mb-6">
            <span className="font-data text-4xl text-slate-400 tracking-[0.4em]">••••</span>
            <span className="font-data text-4xl text-primary animate-pulse">_</span>
          </div>
          <button className="w-full py-3.5 px-8 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-ui text-lg font-semibold shadow-lg shadow-primary/30 transition-all">
            Continue
          </button>
        </div>
        
        {/* Numpad */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200">
          <div className="grid grid-cols-3 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <button
                key={num}
                className="w-16 h-14 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 font-data text-2xl text-slate-800 font-medium transition-all shadow-sm hover:shadow"
              >
                {num}
              </button>
            ))}
            <button className="w-16 h-14 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-data text-2xl text-slate-800 font-medium transition-all shadow-sm">
              0
            </button>
            <button className="w-16 h-14 col-span-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-ui text-base text-slate-600 font-medium transition-all shadow-sm flex items-center justify-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// SCREEN SWITCHER
// ============================================================================
const ScreenSwitcher = ({
  activeScreen,
  onScreenChange,
}: {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10 relative z-10">
    {[
      { id: "measurements", icon: Gauge, label: "Dashboard" },
      { id: "profiles", icon: Droplets, label: "Profiles" },
      { id: "calibration", icon: Thermometer, label: "Calibration" },
      { id: "sampling", icon: Activity, label: "Sampling" },
      { id: "settings", icon: Settings, label: "Units" },
      { id: "pin", icon: Lock, label: "Access" },
    ].map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        onClick={() => onScreenChange(id)}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-ui text-sm font-medium transition-all duration-200 ${
          activeScreen === id
            ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    ))}
  </div>
);

// ============================================================================
// PATTERN CARDS
// ============================================================================
const PatternShowcase = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { 
        title: "Data hierarchy", 
        desc: "Large bold numbers, receding units",
        example: <span className="font-data text-4xl text-foreground font-medium">1.00 <span className="text-xl text-muted-foreground">SG</span></span>
      },
      { 
        title: "Status indicators", 
        desc: "Color-coded for instant recognition",
        example: (
          <div className="flex gap-4">
            <div className="w-1.5 h-10 rounded-full bg-primary" />
            <div className="w-1.5 h-10 rounded-full bg-amber-400" />
            <div className="w-1.5 h-10 rounded-full bg-destructive" />
          </div>
        )
      },
      { 
        title: "Touch targets", 
        desc: "Minimum 48px for gloves",
        example: <div className="w-14 h-14 rounded-2xl bg-primary/20 border-2 border-primary/30 border-dashed" />
      },
      { 
        title: "Live feedback", 
        desc: "Animated progress and states",
        example: (
          <div className="w-24 h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse" />
          </div>
        )
      },
    ].map((pattern) => (
      <div key={pattern.title} className="p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
        <div className="h-16 flex items-center justify-center mb-4">
          {pattern.example}
        </div>
        <h4 className="font-ui font-semibold text-foreground mb-1">{pattern.title}</h4>
        <p className="font-ui text-sm text-muted-foreground">{pattern.desc}</p>
      </div>
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SDMEcoInterface() {
  const [activeScreen, setActiveScreen] = useState("measurements");

  const renderScreen = () => {
    switch (activeScreen) {
      case "measurements": return <MeasurementsScreen />;
      case "profiles": return <ProfilesScreen />;
      case "calibration": return <CalibrationScreen />;
      case "sampling": return <SamplingScreen />;
      case "settings": return <SettingsScreen />;
      case "pin": return <PinScreen />;
      default: return <MeasurementsScreen />;
    }
  };

  return (
    <section className="scroll-mt-24">
      <div className="space-y-24">
        {/* Hero */}
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Optimized for an 
            <span className="text-foreground font-medium"> 800×480 industrial touchscreen</span>. 
            Bold typography, generous touch targets, and 
            <span className="text-primary font-medium"> maximum data legibility</span> for 
            challenging field conditions.
          </p>
        </div>

        {/* Interactive Device */}
        <div>
          <ScreenSwitcher activeScreen={activeScreen} onScreenChange={setActiveScreen} />
          <DeviceFrame>
            {renderScreen()}
          </DeviceFrame>
        </div>

        {/* Patterns */}
        <div className="space-y-8">
          <h3 className="font-ui text-2xl font-semibold text-foreground">Interface patterns</h3>
          <PatternShowcase />
        </div>

        {/* Principles */}
        <BrandCallout variant="info" title="Low-PPI display principles">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">No thin text</div>
              <p className="font-ui text-sm text-muted-foreground">All text uses medium or semibold weights. Light weights blur on low-resolution displays.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">High contrast</div>
              <p className="font-ui text-sm text-muted-foreground">Light backgrounds with dark text. Avoid subtle grays that wash out in bright environments.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Oversized touch</div>
              <p className="font-ui text-sm text-muted-foreground">All interactive elements exceed 48×48px for reliable gloved operation.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Live feedback</div>
              <p className="font-ui text-sm text-muted-foreground">Animated progress indicators and real-time updates confirm system responsiveness.</p>
            </div>
          </div>
        </BrandCallout>
      </div>
    </section>
  );
}
