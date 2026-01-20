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
// DEVICE FRAME - Industrial tablet with light screen
// ============================================================================
const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Ambient glow */}
    <div className="absolute -inset-12 bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-[4rem] blur-3xl" />
    
    {/* Device shell */}
    <div className="relative rounded-3xl overflow-hidden" style={{
      background: 'linear-gradient(160deg, hsl(220 15% 22%) 0%, hsl(220 20% 12%) 100%)',
      boxShadow: `
        0 80px 150px -30px hsl(0 0% 0% / 0.5),
        0 40px 60px -20px hsl(0 0% 0% / 0.4),
        inset 0 1px 0 hsl(220 15% 30%),
        inset 0 -2px 0 hsl(220 20% 8%)
      `
    }}>
      {/* Top bezel with status */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
          <span className="font-data text-sm text-primary uppercase tracking-wider">ONLINE</span>
        </div>
        <div className="flex items-center gap-5 text-slate-400">
          <div className="flex items-center gap-2">
            <Usb className="w-4 h-4" />
            <span className="font-data text-sm uppercase tracking-wide">USB</span>
          </div>
          <span className="font-data text-base tabular-nums font-medium">14:32</span>
        </div>
      </div>
      
      {/* Screen - Light mode */}
      <div className="aspect-[5/3] bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {children}
      </div>
    </div>
    
    {/* Device label */}
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-muted/50 border border-border/50">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-data text-sm text-muted-foreground uppercase tracking-widest">SDM ECO · 800×480</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// LIVE METRIC - Bold data display for low PPI
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
  <div className={`relative p-6 rounded-2xl border-2 ${
    highlight 
      ? "bg-primary/5 border-primary/20" 
      : "bg-white border-slate-200"
  }`}>
    <span className="font-ui text-base text-slate-500 font-medium mb-2 block">{label}</span>
    
    <div className="flex items-baseline gap-3">
      <span className="font-data text-6xl lg:text-7xl text-slate-900 tabular-nums tracking-tight font-medium">
        {value}
      </span>
      <span className="font-data text-2xl text-slate-400 uppercase font-medium">{unit}</span>
    </div>
    
    {trend && (
      <div className="mt-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <span className="font-data text-sm text-primary uppercase tracking-wide font-medium">{trend}</span>
      </div>
    )}
  </div>
);

// ============================================================================
// SIDEBAR - Icon navigation for touch
// ============================================================================
const IconNav = ({ children }: { children: React.ReactNode }) => (
  <div className="w-24 bg-slate-100 border-r-2 border-slate-200 flex flex-col items-center py-6 gap-3">
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
    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/30" 
        : "text-slate-400 hover:text-slate-600 hover:bg-slate-200"
    }`}
  >
    <Icon className="w-6 h-6" />
  </button>
);

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

    <div className="flex-1 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-ui text-2xl text-slate-900 font-semibold">Measurements</h2>
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-100 border-2 border-slate-200">
          <Droplets className="w-5 h-5 text-primary" />
          <span className="font-ui text-base text-slate-700 font-medium">Super profile</span>
          <Zap className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-5 flex-1">
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

    <div className="flex-1 p-6">
      <h2 className="font-ui text-2xl text-slate-900 font-semibold mb-6">Liquid Profiles</h2>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Water", points: 3, active: false },
          { name: "Clay 10%", points: 2, active: true },
          { name: "Slurry A", points: 4, active: false },
          { name: "Custom", points: 1, active: false },
        ].map((profile) => (
          <div
            key={profile.name}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              profile.active
                ? "bg-primary/5 border-primary/30"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`font-ui text-xl font-semibold ${profile.active ? "text-slate-900" : "text-slate-700"}`}>
                  {profile.name}
                </h3>
                <span className="font-data text-sm text-slate-500 uppercase tracking-wide">
                  {profile.points} POINTS
                </span>
              </div>
              {profile.active && (
                <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
              )}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-ui text-base font-medium transition-colors">
                Edit
              </button>
              <button className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
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
      <IconNavItem icon={Gauge} active />
      <IconNavItem icon={Activity} />
    </IconNav>

    <div className="flex-1 p-6">
      <h2 className="font-ui text-2xl text-slate-900 font-semibold mb-6">Display Units</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Density */}
        <div>
          <h3 className="font-ui text-base text-slate-500 font-medium mb-4">Density</h3>
          <div className="space-y-2">
            {["SG", "kg/m³", "g/L", "lb/ft³"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-primary/5 border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-3 flex items-center justify-center ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`font-data text-lg uppercase font-medium ${i === 0 ? "text-slate-900" : "text-slate-500"}`}>
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <h3 className="font-ui text-base text-slate-500 font-medium mb-4">Temperature</h3>
          <div className="space-y-2">
            {["Celsius", "Fahrenheit"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  i === 0
                    ? "bg-primary/5 border-primary/30"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-3 flex items-center justify-center ${
                  i === 0 ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {i === 0 && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`font-ui text-lg font-medium ${i === 0 ? "text-slate-900" : "text-slate-500"}`}>
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
    {[
      { id: "measurements", icon: Gauge, label: "Measurements" },
      { id: "profiles", icon: Droplets, label: "Profiles" },
      { id: "settings", icon: Settings, label: "Settings" },
    ].map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        onClick={() => onScreenChange(id)}
        className={`flex items-center gap-3 px-6 py-3 rounded-xl font-ui text-base font-medium transition-all ${
          activeScreen === id
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        <Icon className="w-5 h-5" />
        {label}
      </button>
    ))}
  </div>
);

// ============================================================================
// MODAL - Light theme matching device
// ============================================================================
const ModalCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/10 border-2 border-slate-200">
    <div className="px-5 py-4 bg-slate-100 border-b-2 border-slate-200 flex items-center justify-between">
      <h3 className="font-ui text-lg text-slate-900 font-semibold">{title}</h3>
      <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
        <X className="w-5 h-5" />
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
          className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
            point.done ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            point.done ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
          }`}>
            {point.done ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </div>
          <div className="flex-1">
            <div className="font-ui text-base text-slate-900 font-semibold">{point.status}</div>
            <div className="font-data text-sm text-slate-500 uppercase tracking-wide mt-0.5">
              T: {point.temp}°C · Ρ: {point.density} SG
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
              <Pencil className="w-5 h-5 text-slate-500" />
            </button>
            <button className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors">
              <Trash2 className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      ))}
      
      <button className="w-full py-4 rounded-xl border-2 border-dashed border-slate-300 text-primary font-ui text-base font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Add point
      </button>
    </div>
  </ModalCard>
);

const PinModal = () => (
  <ModalCard title="Enter access code">
    <div className="space-y-5">
      <div className="py-6 rounded-xl bg-slate-100 text-center border-2 border-slate-200">
        <span className="font-data text-4xl text-slate-900 tracking-[0.4em] font-medium">••••</span>
        <span className="font-data text-4xl text-slate-400 animate-pulse">_</span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "C"].map((key) => (
          <button
            key={key}
            className="py-5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 font-data text-2xl text-slate-800 font-medium transition-all"
          >
            {key}
          </button>
        ))}
      </div>
      
      <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-ui text-lg font-semibold transition-all shadow-lg shadow-primary/25">
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
          <label className="font-ui text-base text-slate-500 font-medium mb-2 block">Measured</label>
          <div className="py-4 px-5 rounded-xl bg-slate-100 border-2 border-slate-200">
            <span className="font-data text-3xl text-slate-900 font-medium">25.73</span>
            <span className="font-data text-lg text-slate-500 ml-2 uppercase">°C</span>
          </div>
        </div>
        <div>
          <label className="font-ui text-base text-slate-500 font-medium mb-2 block">Reference</label>
          <div className="py-4 px-5 rounded-xl bg-white border-2 border-primary">
            <span className="font-data text-3xl text-slate-900 font-medium">25.50</span>
            <span className="font-data text-lg text-slate-500 ml-2 uppercase">°C</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((key) => (
          <button
            key={key}
            className="py-4 rounded-xl bg-slate-100 hover:bg-slate-200 font-data text-xl text-slate-800 font-medium transition-all"
          >
            {key}
          </button>
        ))}
      </div>
      
      <div className="flex gap-3">
        <button className="flex-1 py-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-ui text-lg font-semibold transition-colors">
          Reset
        </button>
        <button className="flex-1 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-ui text-lg font-semibold transition-all shadow-lg shadow-primary/25">
          Apply
        </button>
      </div>
    </div>
  </ModalCard>
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
        title: "Status signals", 
        desc: "Color-coded for instant recognition",
        example: (
          <div className="flex gap-4">
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="w-4 h-4 rounded-full bg-warning shadow-lg shadow-warning/50" />
            <div className="w-4 h-4 rounded-full bg-destructive shadow-lg shadow-destructive/50" />
          </div>
        )
      },
      { 
        title: "Touch targets", 
        desc: "Minimum 48px for gloves",
        example: <div className="w-14 h-14 rounded-xl bg-primary/20 border-2 border-primary/30 border-dashed" />
      },
      { 
        title: "Icon navigation", 
        desc: "Vertical sidebar, large icons",
        example: (
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center"><Gauge className="w-5 h-5 text-white" /></div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center"><Settings className="w-5 h-5 text-muted-foreground" /></div>
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
            Optimized for a 
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

        {/* Dialogs */}
        <div className="space-y-8">
          <div>
            <h3 className="font-ui text-2xl font-semibold text-foreground mb-2">Modal dialogs</h3>
            <p className="font-ui text-muted-foreground max-w-2xl">
              Large buttons, bold text, and high contrast for reliable touch input.
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
