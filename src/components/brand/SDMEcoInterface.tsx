import { useState, useEffect, useRef } from "react";
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
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";
import bb, { spline } from "billboard.js";
import "billboard.js/dist/billboard.css";

// ============================================================================
// DEVICE FRAME - Premium industrial tablet
// ============================================================================
const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Ambient glow */}
    <div className="absolute -inset-16 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-[5rem] blur-3xl" />
    
    {/* Device shell */}
    <div className="relative rounded-[2rem] overflow-hidden" style={{
      background: 'linear-gradient(165deg, hsl(220 12% 20%) 0%, hsl(220 15% 10%) 100%)',
      boxShadow: `
        0 100px 200px -40px hsl(0 0% 0% / 0.6),
        0 50px 80px -20px hsl(0 0% 0% / 0.5),
        inset 0 2px 0 hsl(220 12% 28%),
        inset 0 -3px 0 hsl(220 15% 6%)
      `
    }}>
      {/* Top bezel */}
      <div className="flex items-center justify-between px-8 py-5" style={{
        background: 'linear-gradient(180deg, hsl(220 12% 16%) 0%, hsl(220 12% 14%) 100%)'
      }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3.5 h-3.5 rounded-full bg-primary" />
            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-primary animate-ping opacity-40" />
          </div>
          <span className="font-data text-sm text-primary uppercase tracking-widest font-medium">ONLINE</span>
        </div>
        <div className="flex items-center gap-8 text-slate-400">
          <div className="flex items-center gap-3">
            <Usb className="w-4 h-4 text-primary" />
            <span className="font-data text-sm uppercase tracking-wide">USB</span>
          </div>
          <span className="font-data text-lg tabular-nums font-medium text-slate-300">14:32</span>
        </div>
      </div>
      
      {/* Screen */}
      <div className="aspect-[5/3] bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {children}
      </div>
      
      {/* Bottom bezel accent */}
      <div className="h-3" style={{
        background: 'linear-gradient(180deg, hsl(220 12% 12%) 0%, hsl(220 15% 8%) 100%)'
      }} />
    </div>
    
    {/* Device label */}
    <div className="mt-10 flex justify-center">
      <div className="flex items-center gap-5 px-8 py-4 rounded-2xl bg-gradient-to-r from-muted/60 to-muted/40 border border-border/50 backdrop-blur-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
        <span className="font-data text-sm text-muted-foreground uppercase tracking-[0.2em]">SDM ECO · 800×480</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// ICON SIDEBAR - Touch-optimized navigation
// ============================================================================
const IconNav = ({ children }: { children: React.ReactNode }) => (
  <div className="w-20 bg-gradient-to-b from-slate-100 to-slate-50 border-r border-slate-200/80 flex flex-col items-center py-5 gap-2">
    {children}
  </div>
);

const IconNavItem = ({
  icon: Icon,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
      active 
        ? "bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl shadow-primary/40 scale-105" 
        : "text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-md"
    }`}
  >
    <Icon className="w-6 h-6" />
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
}: {
  value: string;
  unit: string;
  label: string;
  trend?: string;
  highlight?: boolean;
}) => (
  <div className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
    highlight 
      ? "bg-gradient-to-br from-primary/8 to-primary/4 border-primary/25 shadow-lg shadow-primary/10" 
      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
  }`}>
    <span className="font-ui text-sm text-slate-500 font-medium mb-2 block">{label}</span>
    
    <div className="flex items-baseline gap-2">
      <span className="font-data text-5xl text-slate-900 tabular-nums tracking-tight font-medium">
        {value}
      </span>
      <span className="font-data text-xl text-slate-400 uppercase font-medium">{unit}</span>
    </div>
    
    {trend && (
      <div className="mt-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="font-data text-xs text-primary uppercase tracking-wide font-medium">{trend}</span>
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
        <span className="font-ui text-sm text-slate-500 font-medium">Signal waveform</span>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-data text-xs text-primary uppercase tracking-wide font-medium">LIVE</span>
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
// MEASUREMENTS SCREEN
// ============================================================================
const MeasurementsScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={Gauge} active />
      <IconNavItem icon={FlaskConical} />
      <IconNavItem icon={Activity} />
      <IconNavItem icon={Settings} />
    </IconNav>

    <div className="flex-1 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-ui text-xl text-slate-900 font-semibold">Measurements</h2>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 shadow-sm">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="font-ui text-sm text-slate-700 font-medium">Super profile</span>
          <Zap className="w-3.5 h-3.5 text-primary" />
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
      <IconNavItem icon={ChevronLeft} />
      <IconNavItem icon={Waves} />
      <IconNavItem icon={Droplets} active />
    </IconNav>

    <div className="flex-1 p-5">
      <h2 className="font-ui text-xl text-slate-900 font-semibold mb-5">Liquid profiles</h2>

      <div className="space-y-3">
        {[
          { name: "Water", desc: "Base calibration", active: false, locked: true },
          { name: "Super profile", desc: "Clay 5%, 10%, 20%, 30%", active: true, locked: false },
          { name: "Liquid #0", desc: "Clay 5%", active: false, locked: false },
          { name: "Liquid #1", desc: "Clay 10%", active: false, locked: false },
        ].map((profile) => (
          <div
            key={profile.name}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              profile.active
                ? "bg-gradient-to-r from-primary/8 to-transparent border-primary/30"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className={`w-1.5 h-12 rounded-full ${profile.active ? "bg-primary" : "bg-slate-300"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-ui text-base text-slate-900 font-semibold">{profile.name}</h3>
                {profile.locked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
              </div>
              <span className="font-ui text-sm text-slate-500">{profile.desc}</span>
            </div>
            {profile.active && (
              <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            )}
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
              <Pencil className="w-4 h-4 text-primary" />
            </button>
            {!profile.locked && (
              <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            )}
          </div>
        ))}
        
        <button className="w-full py-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 font-ui text-sm font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Create new profile
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// CALIBRATION SCREEN
// ============================================================================
const CalibrationScreen = () => (
  <div className="h-full flex">
    <IconNav>
      <IconNavItem icon={ChevronLeft} />
      <IconNavItem icon={Thermometer} active />
      <IconNavItem icon={Droplets} />
    </IconNav>

    <div className="flex-1 p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-ui text-xl text-slate-900 font-semibold">Calibration points</h2>
          <p className="font-ui text-sm text-slate-500 mt-1">Clay 10% profile</p>
        </div>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="space-y-3">
        {[
          { id: 0, status: "Done", temp: "26.03", density: "1035.00", done: true },
          { id: 1, status: "Ready to sample", temp: "38.02", density: null, done: false },
        ].map((point) => (
          <div
            key={point.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
              point.done 
                ? "bg-gradient-to-r from-primary/8 to-transparent border-primary/25" 
                : "bg-gradient-to-r from-amber-50 to-transparent border-amber-200"
            }`}
          >
            <div className={`w-1.5 h-12 rounded-full ${point.done ? "bg-primary" : "bg-amber-400"}`} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200">
              <span className="font-data text-lg text-slate-700 font-medium">#{point.id}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-ui text-base text-slate-900 font-semibold block">{point.status}</span>
              <div className="flex gap-4 mt-1">
                <span className="font-data text-sm text-slate-500 uppercase">T: {point.temp}°C</span>
                {point.density && (
                  <span className="font-data text-sm text-slate-500 uppercase">Ρ: {point.density} KG/M³</span>
                )}
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition-colors">
              <Pencil className="w-4 h-4 text-primary" />
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 hover:border-destructive hover:bg-destructive/5 transition-colors">
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        ))}
        
        <button className="w-full py-4 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 font-ui text-sm font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add calibration point
        </button>
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-center gap-6 text-slate-500">
        <span className="font-ui text-sm">Temperature range:</span>
        <span className="font-data text-sm uppercase">20.00°C – 50.00°C</span>
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
      <IconNavItem icon={ChevronLeft} />
      <IconNavItem icon={Globe} />
      <IconNavItem icon={Sun} />
      <IconNavItem icon={Gauge} active />
    </IconNav>

    <div className="flex-1 p-5">
      <h2 className="font-ui text-xl text-slate-900 font-semibold mb-5">Display units</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Density */}
        <div>
          <h3 className="font-ui text-sm text-slate-500 font-medium mb-3 uppercase tracking-wide">Density</h3>
          <div className="space-y-2">
            {["SG", "kg/m³", "g/L", "lb/ft³", "SGx1000", "Weight %"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-gradient-to-r from-primary/8 to-transparent border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-base font-medium ${i === 0 ? "text-slate-900" : "text-slate-600"}`}>
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-ui text-sm text-slate-500 font-medium mb-3 uppercase tracking-wide">Temperature</h3>
          <div className="space-y-2">
            {["Celsius (°C)", "Fahrenheit (°F)"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-gradient-to-r from-primary/8 to-transparent border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-base font-medium ${i === 0 ? "text-slate-900" : "text-slate-600"}`}>
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
      <IconNavItem icon={ChevronLeft} />
      <IconNavItem icon={Lock} active />
    </IconNav>

    <div className="flex-1 p-5 flex items-center justify-center">
      <div className="flex gap-10">
        {/* PIN Display */}
        <div className="flex flex-col items-center">
          <h2 className="font-ui text-lg text-slate-700 font-semibold mb-4">Enter access code</h2>
          <div className="px-8 py-4 rounded-xl bg-white border-2 border-primary shadow-lg shadow-primary/10 mb-6">
            <span className="font-data text-3xl text-slate-400 tracking-[0.4em]">••••</span>
            <span className="font-data text-3xl text-primary animate-pulse">_</span>
          </div>
          <button className="w-full py-3 px-8 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-ui font-semibold shadow-lg shadow-primary/30 transition-all">
            Continue
          </button>
        </div>
        
        {/* Numpad */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-4 border border-slate-200">
          <div className="grid grid-cols-3 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <button
                key={num}
                className="w-14 h-12 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 font-data text-xl text-slate-800 font-medium transition-all shadow-sm hover:shadow"
              >
                {num}
              </button>
            ))}
            <button className="w-14 h-12 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium transition-all shadow-sm">
              0
            </button>
            <button className="w-14 h-12 col-span-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-ui text-sm text-slate-600 font-medium transition-all shadow-sm flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
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
  <div className="flex justify-center gap-2 mb-10">
    {[
      { id: "measurements", icon: Gauge, label: "Dashboard" },
      { id: "profiles", icon: Droplets, label: "Profiles" },
      { id: "calibration", icon: Thermometer, label: "Calibration" },
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
        title: "Icon navigation", 
        desc: "Vertical sidebar, large icons",
        example: (
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30"><Gauge className="w-5 h-5 text-white" /></div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center"><Settings className="w-5 h-5 text-muted-foreground" /></div>
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
              <div className="font-ui font-semibold text-foreground mb-1">Generous spacing</div>
              <p className="font-ui text-sm text-muted-foreground">Extra padding between elements prevents accidental taps and improves scannability.</p>
            </div>
          </div>
        </BrandCallout>
      </div>
    </section>
  );
}
