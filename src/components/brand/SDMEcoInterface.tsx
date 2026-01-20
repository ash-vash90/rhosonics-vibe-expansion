import { useState } from "react";
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
  Check,
  Gauge,
  FlaskConical,
  Waves,
  Zap,
  TrendingUp,
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";

// ============================================================================
// DEVICE FRAME - Bold industrial design
// ============================================================================
const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Dramatic glow */}
    <div className="absolute -inset-12 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-[4rem] blur-3xl" />
    
    {/* Device shell */}
    <div className="relative rounded-3xl overflow-hidden" style={{
      background: 'linear-gradient(160deg, hsl(220 20% 18%) 0%, hsl(220 25% 8%) 100%)',
      boxShadow: `
        0 80px 150px -30px hsl(0 0% 0% / 0.6),
        0 40px 60px -20px hsl(0 0% 0% / 0.5),
        inset 0 1px 0 hsl(220 20% 25%),
        inset 0 -2px 0 hsl(220 25% 5%)
      `
    }}>
      {/* Top bar with status */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
          <span className="font-data text-xs text-primary uppercase tracking-wider">SYSTEM ONLINE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <Usb className="w-4 h-4" />
            <span className="font-data text-xs uppercase tracking-wide">USB</span>
          </div>
          <span className="font-data text-sm tabular-nums">14:32</span>
        </div>
      </div>
      
      {/* Screen */}
      <div className="aspect-[16/9] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {children}
      </div>
    </div>
    
    {/* Device badge */}
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-data text-sm text-slate-400 uppercase tracking-widest">SDM ECO · 7" HMI</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// LIVE METRICS - Big bold data display
// ============================================================================
const LiveMetric = ({
  value,
  unit,
  label,
  trend,
  status = "normal",
}: {
  value: string;
  unit: string;
  label: string;
  trend?: string;
  status?: "normal" | "warning" | "success";
}) => {
  const statusColors = {
    normal: "from-slate-800 to-slate-900 border-slate-700/50",
    warning: "from-warning/10 to-warning/5 border-warning/30",
    success: "from-primary/10 to-primary/5 border-primary/30",
  };
  
  return (
    <div className={`relative p-6 rounded-2xl bg-gradient-to-br border ${statusColors[status]} overflow-hidden group`}>
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <span className="font-ui text-sm text-slate-500 mb-3 block">{label}</span>
        
        <div className="flex items-baseline gap-3">
          <span className="font-data text-6xl lg:text-7xl text-white tabular-nums tracking-tight">{value}</span>
          <span className="font-data text-2xl text-slate-500 uppercase">{unit}</span>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-data text-xs text-primary uppercase tracking-wide">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// NAV PILL - Modern navigation element
// ============================================================================
const NavPill = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
      active
        ? "bg-primary text-white shadow-lg shadow-primary/30"
        : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-ui text-sm font-medium">{label}</span>
  </button>
);

// ============================================================================
// MEASUREMENTS SCREEN - Hero data display
// ============================================================================
const MeasurementsScreen = () => (
  <div className="h-full flex">
    {/* Sidebar */}
    <div className="w-20 bg-slate-900/50 border-r border-white/5 flex flex-col items-center py-6 gap-4">
      {[
        { icon: Gauge, active: true },
        { icon: FlaskConical, active: false },
        { icon: Activity, active: false },
        { icon: Settings, active: false },
      ].map(({ icon: Icon, active }, i) => (
        <button
          key={i}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            active 
              ? "bg-primary text-white shadow-lg shadow-primary/30" 
              : "text-slate-500 hover:text-white hover:bg-white/5"
          }`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>

    {/* Main */}
    <div className="flex-1 p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-ui text-2xl text-white font-semibold">Live Measurements</h2>
          <p className="font-ui text-sm text-slate-500 mt-1">Real-time sensor data</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="font-ui text-sm text-white">Super profile</span>
          <Zap className="w-3 h-3 text-primary" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        <LiveMetric 
          value="1.00" 
          unit="SG" 
          label="Density"
          trend="+0.02 FROM AVG"
          status="success"
        />
        <LiveMetric 
          value="25.73" 
          unit="°C" 
          label="Temperature"
          trend="STABLE"
        />
      </div>
    </div>
  </div>
);

// ============================================================================
// PROFILES SCREEN - Profile management
// ============================================================================
const ProfilesScreen = () => (
  <div className="h-full flex">
    {/* Sidebar */}
    <div className="w-20 bg-slate-900/50 border-r border-white/5 flex flex-col items-center py-6 gap-4">
      <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
        <Waves className="w-5 h-5" />
      </button>
      <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/30">
        <Droplets className="w-5 h-5" />
      </button>
    </div>

    {/* Main */}
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h2 className="font-ui text-2xl text-white font-semibold">Liquid Profiles</h2>
        <p className="font-ui text-sm text-slate-500 mt-1">Manage calibration profiles</p>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Water", points: 3, active: false },
          { name: "Clay 10%", points: 2, active: true },
          { name: "Slurry A", points: 4, active: false },
          { name: "Custom Mix", points: 1, active: false },
        ].map((profile) => (
          <div
            key={profile.name}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              profile.active
                ? "bg-primary/10 border-primary/30"
                : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`font-ui text-lg font-medium ${profile.active ? "text-white" : "text-slate-300"}`}>
                  {profile.name}
                </h3>
                <span className="font-data text-xs text-slate-500 uppercase tracking-wide">
                  {profile.points} CAL POINTS
                </span>
              </div>
              {profile.active && (
                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              )}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 font-ui text-sm transition-colors">
                Edit
              </button>
              <button className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// SETTINGS SCREEN - Configuration
// ============================================================================
const SettingsScreen = () => (
  <div className="h-full flex">
    {/* Sidebar */}
    <div className="w-20 bg-slate-900/50 border-r border-white/5 flex flex-col items-center py-6 gap-4">
      <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/30">
        <Gauge className="w-5 h-5" />
      </button>
      <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
        <Activity className="w-5 h-5" />
      </button>
    </div>

    {/* Main */}
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h2 className="font-ui text-2xl text-white font-semibold">Display Units</h2>
        <p className="font-ui text-sm text-slate-500 mt-1">Configure measurement units</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Density */}
        <div>
          <h3 className="font-ui text-sm text-slate-400 mb-4">Density unit</h3>
          <div className="space-y-2">
            {["SG", "kg/m³", "g/L", "lb/ft³"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  i === 0
                    ? "bg-primary/10 border-primary/30"
                    : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-600"
                }`}>
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-data text-sm uppercase ${i === 0 ? "text-white" : "text-slate-400"}`}>{unit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-ui text-sm text-slate-400 mb-4">Temperature unit</h3>
          <div className="space-y-2">
            {["Celsius", "Fahrenheit"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  i === 0
                    ? "bg-primary/10 border-primary/30"
                    : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600/50"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-600"
                }`}>
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-sm ${i === 0 ? "text-white" : "text-slate-400"}`}>{unit}</span>
              </label>
            ))}
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
  <div className="flex justify-center gap-3 mb-10">
    <NavPill 
      icon={Gauge} 
      label="Measurements" 
      active={activeScreen === "measurements"}
      onClick={() => onScreenChange("measurements")}
    />
    <NavPill 
      icon={Droplets} 
      label="Profiles" 
      active={activeScreen === "profiles"}
      onClick={() => onScreenChange("profiles")}
    />
    <NavPill 
      icon={Settings} 
      label="Settings" 
      active={activeScreen === "settings"}
      onClick={() => onScreenChange("settings")}
    />
  </div>
);

// ============================================================================
// MODAL COMPONENTS - Clean, minimal dialogs
// ============================================================================
const ModalCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/10">
    <div className="px-5 py-4 bg-slate-900 flex items-center justify-between">
      <h3 className="font-ui text-base text-white font-medium">{title}</h3>
      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const CalibrationModal = () => (
  <ModalCard title="Calibration points">
    <div className="space-y-3">
      {[
        { id: 0, status: "Complete", temp: "24.5", density: "1.10", done: true },
        { id: 1, status: "Ready", temp: "—", density: "—", done: false },
      ].map((point) => (
        <div
          key={point.id}
          className={`flex items-center gap-4 p-4 rounded-xl border ${
            point.done ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100"
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            point.done ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
          }`}>
            {point.done ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="font-ui text-sm text-slate-900 font-medium">{point.status}</div>
            <div className="font-data text-xs text-slate-500 uppercase tracking-wide mt-0.5">
              T: {point.temp}°C · Ρ: {point.density} SG
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Pencil className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Trash2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      ))}
      
      <button className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-primary font-ui text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        Add calibration point
      </button>
    </div>
  </ModalCard>
);

const PinModal = () => (
  <ModalCard title="Enter access code">
    <div className="space-y-5">
      <div className="py-5 rounded-xl bg-slate-100 text-center">
        <span className="font-data text-4xl text-slate-900 tracking-[0.3em]">••••</span>
        <span className="font-data text-4xl text-slate-300 animate-pulse">_</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "C"].map((key) => (
          <button
            key={key}
            className="py-4 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 font-data text-xl text-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {key}
          </button>
        ))}
      </div>
      
      <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-ui font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
        Continue
      </button>
    </div>
  </ModalCard>
);

const TempCalModal = () => (
  <ModalCard title="Temperature calibration">
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-ui text-xs text-slate-500 mb-2 block">Measured</label>
          <div className="py-4 px-5 rounded-xl bg-slate-100">
            <span className="font-data text-2xl text-slate-900">25.73</span>
            <span className="font-data text-sm text-slate-500 ml-1 uppercase">°C</span>
          </div>
        </div>
        <div>
          <label className="font-ui text-xs text-slate-500 mb-2 block">Reference</label>
          <div className="py-4 px-5 rounded-xl bg-white border-2 border-primary">
            <span className="font-data text-2xl text-slate-900">25.50</span>
            <span className="font-data text-sm text-slate-500 ml-1 uppercase">°C</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((key) => (
          <button
            key={key}
            className="py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-data text-lg text-slate-800 transition-all"
          >
            {key}
          </button>
        ))}
      </div>
      
      <div className="flex gap-3">
        <button className="flex-1 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-ui font-medium transition-colors">
          Reset
        </button>
        <button className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-ui font-medium transition-all shadow-lg shadow-primary/25">
          Apply
        </button>
      </div>
    </div>
  </ModalCard>
);

// ============================================================================
// PATTERN SHOWCASE
// ============================================================================
const PatternShowcase = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { 
        title: "Data hierarchy", 
        desc: "Large monospace numbers dominate, units and labels recede",
        example: <span className="font-data text-3xl text-foreground">1.00 <span className="text-lg text-muted-foreground">SG</span></span>
      },
      { 
        title: "Status indicators", 
        desc: "Color-coded states for instant recognition",
        example: (
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="w-3 h-3 rounded-full bg-warning shadow-lg shadow-warning/50" />
            <div className="w-3 h-3 rounded-full bg-destructive shadow-lg shadow-destructive/50" />
          </div>
        )
      },
      { 
        title: "Touch targets", 
        desc: "Minimum 48px for industrial gloves",
        example: <div className="w-12 h-12 rounded-xl bg-primary/20 border-2 border-primary/30 border-dashed" />
      },
      { 
        title: "Navigation", 
        desc: "Icon-only sidebar, contextual pills",
        example: (
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"><Gauge className="w-4 h-4 text-white" /></div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Settings className="w-4 h-4 text-muted-foreground" /></div>
          </div>
        )
      },
    ].map((pattern) => (
      <div key={pattern.title} className="p-5 rounded-2xl bg-card border border-border">
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
      case "settings": return <SettingsScreen />;
      default: return <MeasurementsScreen />;
    }
  };

  return (
    <section className="scroll-mt-24">
      <div className="space-y-24">
        {/* Hero */}
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            The embedded interface prioritizes 
            <span className="text-foreground font-medium"> data legibility</span> above all. 
            Large monospace numbers, minimal chrome, and 
            <span className="text-primary font-medium"> color-coded status</span> for 
            instant comprehension in challenging environments.
          </p>
        </div>

        {/* Interactive Device */}
        <div>
          <ScreenSwitcher activeScreen={activeScreen} onScreenChange={setActiveScreen} />
          <DeviceFrame>
            {renderScreen()}
          </DeviceFrame>
        </div>

        {/* Dialogs */}
        <div className="space-y-8">
          <div>
            <h3 className="font-ui text-2xl font-semibold text-foreground mb-2">Modal dialogs</h3>
            <p className="font-ui text-muted-foreground max-w-2xl">
              Overlay dialogs for data entry and configuration. Dark headers, light content, 
              clear action hierarchy.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider mb-3 block">LIST MANAGEMENT</span>
              <CalibrationModal />
            </div>
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider mb-3 block">SECURE ENTRY</span>
              <PinModal />
            </div>
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wider mb-3 block">CALIBRATION</span>
              <TempCalModal />
            </div>
          </div>
        </div>

        {/* Patterns */}
        <div className="space-y-8">
          <h3 className="font-ui text-2xl font-semibold text-foreground">Interface patterns</h3>
          <PatternShowcase />
        </div>

        {/* Principles */}
        <BrandCallout variant="info" title="Embedded UI principles">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Data dominance</div>
              <p className="font-ui text-sm text-muted-foreground">Measurement values use JetBrains Mono at maximum size. Everything else recedes.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Glove-ready</div>
              <p className="font-ui text-sm text-muted-foreground">All touch targets exceed 48×48px. Generous spacing prevents mis-taps.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Status at a glance</div>
              <p className="font-ui text-sm text-muted-foreground">Color-coded indicators provide immediate feedback without reading.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Predictable navigation</div>
              <p className="font-ui text-sm text-muted-foreground">Icon sidebar persists across all screens. Location is always clear.</p>
            </div>
          </div>
        </BrandCallout>
      </div>
    </section>
  );
}
