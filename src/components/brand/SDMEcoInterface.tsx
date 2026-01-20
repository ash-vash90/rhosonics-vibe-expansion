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
  Factory,
  Gauge,
  FlaskConical,
  Waves,
  Monitor,
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";

// ============================================================================
// DEVICE FRAME - Premium industrial tablet mockup
// ============================================================================
const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Ambient glow */}
    <div className="absolute -inset-8 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent rounded-[3rem] blur-3xl opacity-60" />
    
    {/* Device body */}
    <div className="relative">
      {/* Outer housing - industrial aluminum look */}
      <div 
        className="relative rounded-[1.5rem] p-1"
        style={{
          background: 'linear-gradient(145deg, hsl(220 15% 25%), hsl(220 15% 15%))',
          boxShadow: `
            0 50px 100px -20px hsl(0 0% 0% / 0.5),
            0 30px 60px -15px hsl(0 0% 0% / 0.4),
            inset 0 1px 0 hsl(220 15% 35%),
            inset 0 -1px 0 hsl(220 15% 10%)
          `
        }}
      >
        {/* Inner bezel */}
        <div 
          className="rounded-[1.25rem] p-3"
          style={{
            background: 'linear-gradient(180deg, hsl(220 15% 12%), hsl(220 15% 8%))',
          }}
        >
          {/* Screen bezel */}
          <div 
            className="rounded-xl overflow-hidden"
            style={{
              boxShadow: 'inset 0 2px 10px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(220 15% 20%)'
            }}
          >
            {/* Screen content */}
            <div className="bg-slate-950 aspect-[16/10] relative">
              {children}
              
              {/* Screen glare overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.03) 0%, transparent 50%)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Status LED */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_2px] shadow-primary/50 animate-pulse" />
        </div>
      </div>
      
      {/* Device label */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
          <Monitor className="w-4 h-4 text-muted-foreground" />
          <span className="font-data text-xs text-muted-foreground tracking-widest uppercase">
            SDM ECO · 7" Industrial Touchscreen
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// STATUS BAR - Top bar of the device screen
// ============================================================================
const StatusBar = ({ title }: { title: string }) => (
  <div 
    className="px-5 py-3.5 flex items-center justify-between"
    style={{
      background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)'
    }}
  >
    <h2 className="text-white font-ui font-semibold text-base tracking-wide uppercase drop-shadow-sm">
      {title}
    </h2>
    <div className="flex items-center gap-5 text-white/90">
      <div className="flex items-center gap-2 text-xs font-ui bg-white/10 px-2.5 py-1 rounded-full">
        <Usb className="w-3.5 h-3.5" />
        <span>USB</span>
      </div>
      <span className="font-data text-sm tabular-nums">14:32</span>
    </div>
  </div>
);

// ============================================================================
// SIDEBAR - Navigation sidebar
// ============================================================================
const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  hasBack = false,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  hasBack?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200 ${
      active
        ? "bg-primary/15 border-l-[3px] border-primary"
        : "hover:bg-white/5 border-l-[3px] border-transparent"
    }`}
  >
    {hasBack ? (
      <ChevronLeft className="w-5 h-5 text-primary" />
    ) : Icon ? (
      <Icon className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-slate-500"}`} />
    ) : null}
    <span className={`font-ui text-sm transition-colors ${active ? "text-primary font-medium" : "text-slate-400"}`}>
      {label}
    </span>
  </div>
);

const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <div className="w-52 bg-slate-900/80 border-r border-slate-800/50 flex flex-col backdrop-blur-sm">
    {children}
  </div>
);

// ============================================================================
// METRIC DISPLAY - Large data readouts
// ============================================================================
const MetricDisplay = ({
  value,
  unit,
  label,
  size = "large",
}: {
  value: string;
  unit: string;
  label: string;
  size?: "large" | "medium";
}) => (
  <div className="text-center group">
    <div className="text-slate-500 font-ui text-xs mb-3 uppercase tracking-widest">
      {label}
    </div>
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-baseline justify-center gap-2 relative">
        <span className={`font-data text-white tracking-tight tabular-nums ${size === "large" ? "text-6xl" : "text-4xl"}`}>
          {value}
        </span>
        <span className={`font-data text-slate-500 ${size === "large" ? "text-2xl" : "text-lg"}`}>
          {unit}
        </span>
      </div>
    </div>
  </div>
);

// ============================================================================
// SCREENS - Different device screen states
// ============================================================================
const MeasurementsScreen = () => (
  <div className="flex h-full">
    <Sidebar>
      <SidebarItem icon={Settings} label="Settings" active />
      <SidebarItem icon={FlaskConical} label="Calibration" />
      <SidebarItem icon={Activity} label="Diagnostics" />
      <SidebarItem icon={Factory} label="Factory" />
    </Sidebar>

    <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="grid grid-cols-2 gap-16 mb-10">
        <MetricDisplay value="1.00" unit="SG" label="Density" />
        <MetricDisplay value="25.73" unit="°C" label="Temperature" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-slate-500 font-ui text-xs mb-3 uppercase tracking-widest">
          Active Profile
        </div>
        <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 px-5 py-2.5 rounded-xl backdrop-blur-sm">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="font-ui text-white/90">Super profile</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const LiquidProfilesScreen = () => (
  <div className="flex h-full">
    <Sidebar>
      <SidebarItem hasBack label="Back" />
      <SidebarItem icon={Waves} label="Water calibration" />
      <SidebarItem icon={Droplets} label="Liquid profiles" active />
    </Sidebar>

    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="text-slate-500 font-ui text-xs mb-4 uppercase tracking-widest">
        Active Profile
      </div>
      <div className="text-3xl font-ui text-white/90 mb-10 font-medium">Super profile</div>

      <div className="flex gap-4">
        <button 
          className="px-7 py-3.5 rounded-xl font-ui font-medium transition-all duration-200 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)'
          }}
        >
          Select profile
        </button>
        <button className="bg-slate-800/80 hover:bg-slate-700/80 text-white/80 hover:text-white px-7 py-3.5 rounded-xl font-ui font-medium transition-all duration-200 border border-slate-700/50">
          Edit profiles
        </button>
      </div>
    </div>
  </div>
);

const UnitsScreen = () => (
  <div className="flex h-full">
    <Sidebar>
      <SidebarItem hasBack label="Back" />
      <SidebarItem icon={Gauge} label="Units" active />
      <SidebarItem icon={Activity} label="Output signals" />
    </Sidebar>

    <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="grid grid-cols-2 gap-10">
        {/* Density Units */}
        <div>
          <h3 className="text-slate-500 font-ui text-xs mb-4 uppercase tracking-widest">
            Density Unit
          </h3>
          <div className="space-y-2">
            {["SG", "SG×1000", "kg/m³", "g/L", "lb/ft³", "Weight %"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  i === 0 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-700/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    i === 0 ? "border-primary bg-primary" : "border-slate-600"
                  }`}
                >
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-data ${i === 0 ? "text-white" : "text-slate-400"}`}>{unit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature Units */}
        <div>
          <h3 className="text-slate-500 font-ui text-xs mb-4 uppercase tracking-widest">
            Temperature Unit
          </h3>
          <div className="space-y-2">
            {["Celsius", "Fahrenheit"].map((unit, i) => (
              <label
                key={unit}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  i === 0 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-700/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    i === 0 ? "border-primary bg-primary" : "border-slate-600"
                  }`}
                >
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-data ${i === 0 ? "text-white" : "text-slate-400"}`}>{unit}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// SCREEN SWITCHER - Tab-like switcher for demo
// ============================================================================
const ScreenSwitcher = ({
  activeScreen,
  onScreenChange,
}: {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}) => {
  const screens = [
    { id: "measurements", label: "Measurements", icon: Gauge },
    { id: "profiles", label: "Liquid Profiles", icon: Droplets },
    { id: "units", label: "Units", icon: Settings },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-rho-obsidian border border-slate-800">
        {screens.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm font-medium transition-all duration-300 ${
              activeScreen === id
                ? "bg-white text-rho-obsidian shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MODAL COMPONENTS - Dialog examples
// ============================================================================
const ModalFrame = ({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) => (
  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-slate-200/50 bg-white">
    <div 
      className="px-4 py-3 flex items-center justify-between"
      style={{
        background: 'linear-gradient(180deg, hsl(220 15% 20%), hsl(220 15% 15%))'
      }}
    >
      <h3 className="text-white font-ui font-medium text-sm">{title}</h3>
      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className={compact ? "p-4" : "p-5"}>{children}</div>
  </div>
);

const CalibrationPointsModal = () => (
  <ModalFrame title="Liquid profile: Clay 10% - Calibration points">
    <div className="space-y-2.5">
      {[
        { id: 0, status: "Done", temp: "24.5", density: "1.10", statusColor: "bg-success" },
        { id: 1, status: "Ready to sample", temp: "—", density: "—", statusColor: "bg-warning" },
      ].map((point) => (
        <div
          key={point.id}
          className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100 hover:border-slate-200 transition-colors"
        >
          <div className={`w-1 h-12 rounded-full ${point.statusColor}`} />
          <div className="flex-1 min-w-0">
            <div className="font-ui text-sm text-slate-900 font-medium">
              #{point.id} · {point.status}
            </div>
            <div className="font-data text-xs text-slate-500 mt-0.5">
              T: {point.temp}°C · ρ: {point.density} SG
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Pencil className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Trash2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      ))}

      <button className="w-full flex items-center justify-center gap-2 py-3.5 text-primary font-ui text-sm font-medium hover:bg-primary/5 rounded-xl transition-colors border-2 border-dashed border-slate-200 hover:border-primary/30">
        <Plus className="w-4 h-4" />
        Add a calibration point
      </button>
    </div>
  </ModalFrame>
);

const PINEntryModal = () => (
  <ModalFrame title="Enter PIN" compact>
    <div className="space-y-4">
      <div className="bg-slate-100 rounded-xl px-4 py-4 text-center border border-slate-200">
        <span className="font-data text-3xl text-slate-900 tracking-[0.5em]">••••</span>
        <span className="font-data text-3xl text-slate-300 animate-pulse">_</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "C"].map((key) => (
          <button
            key={key}
            className="bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-xl py-3.5 font-data text-xl text-slate-800 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            {key}
          </button>
        ))}
      </div>

      <button 
        className="w-full py-3.5 rounded-xl font-ui font-medium text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25"
        style={{
          background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)'
        }}
      >
        Continue
      </button>
    </div>
  </ModalFrame>
);

const TemperatureCalibrationModal = () => (
  <ModalFrame title="Temperature Calibration" compact>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-slate-500 font-ui text-xs uppercase tracking-wide mb-2 block">
            Measured
          </label>
          <div className="bg-slate-100 rounded-xl px-4 py-3 border border-slate-200">
            <span className="font-data text-xl text-slate-900">25.73</span>
            <span className="font-data text-sm text-slate-500 ml-1">°C</span>
          </div>
        </div>
        <div>
          <label className="text-slate-500 font-ui text-xs uppercase tracking-wide mb-2 block">
            Verified
          </label>
          <div className="bg-white rounded-xl px-4 py-3 border-2 border-primary shadow-sm shadow-primary/10">
            <span className="font-data text-xl text-slate-900">25.50</span>
            <span className="font-data text-sm text-slate-500 ml-1">°C</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((key) => (
          <button
            key={key}
            className="bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-xl py-3 font-data text-lg text-slate-800 transition-all duration-150"
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-ui font-medium transition-colors">
          Default
        </button>
        <button 
          className="flex-1 py-3 rounded-xl font-ui font-medium text-white shadow-lg shadow-primary/25"
          style={{
            background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)'
          }}
        >
          Apply
        </button>
      </div>
    </div>
  </ModalFrame>
);

const EditProfilesModal = () => (
  <ModalFrame title="Edit Profiles" compact>
    <div className="space-y-2">
      {["Water", "Clay 10%", "Slurry A", "Custom Mix"].map((profile, i) => (
        <div
          key={profile}
          className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100 hover:border-slate-200 transition-colors group"
        >
          <div className={`w-1 h-10 rounded-full ${i === 0 ? "bg-primary" : "bg-slate-300"}`} />
          <span className="flex-1 font-ui text-slate-900">{profile}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Pencil className="w-4 h-4 text-slate-400" />
            </button>
            {i > 0 && (
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Trash2 className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </ModalFrame>
);

const SuperProfileModal = () => (
  <ModalFrame title="Edit Super Profile" compact>
    <div className="space-y-2.5">
      {["Water", "Clay 10%", "Slurry A", "Custom Mix"].map((profile, i) => (
        <label
          key={profile}
          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 cursor-pointer transition-all border ${
            i < 2 
              ? "bg-primary/5 border-primary/20" 
              : "bg-slate-50 border-slate-100 hover:border-slate-200"
          }`}
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
              i < 2 ? "bg-primary border-2 border-primary" : "bg-white border-2 border-slate-300"
            }`}
          >
            {i < 2 && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
          <span className={`font-ui ${i < 2 ? "text-slate-900 font-medium" : "text-slate-600"}`}>{profile}</span>
        </label>
      ))}

      <button 
        className="w-full py-3.5 rounded-xl font-ui font-medium text-white mt-2 shadow-lg shadow-primary/25"
        style={{
          background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)'
        }}
      >
        Save Changes
      </button>
    </div>
  </ModalFrame>
);

// ============================================================================
// PATTERN CARDS - Design pattern documentation
// ============================================================================
const PatternCard = ({
  title,
  description,
  token,
}: {
  title: string;
  description: string;
  token: string;
}) => (
  <div className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
    <h4 className="font-ui font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {title}
    </h4>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <code className="inline-flex px-2.5 py-1 rounded-lg bg-muted font-data text-xs text-muted-foreground">
      {token}
    </code>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SDMEcoInterface() {
  const [activeScreen, setActiveScreen] = useState("measurements");

  const renderScreen = () => {
    switch (activeScreen) {
      case "measurements":
        return <MeasurementsScreen />;
      case "profiles":
        return <LiquidProfilesScreen />;
      case "units":
        return <UnitsScreen />;
      default:
        return <MeasurementsScreen />;
    }
  };

  return (
    <section className="scroll-mt-24">
      <div className="space-y-20">
        {/* Hero Statement */}
        <div className="max-w-3xl">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            The embedded touchscreen translates our brand into a 
            <span className="text-foreground font-medium"> robust industrial HMI</span>. 
            Every screen prioritizes <span className="text-primary font-medium">data clarity</span> and 
            <span className="text-foreground font-medium"> operational efficiency</span>.
          </p>
        </div>

        {/* Interactive Device Demo */}
        <div className="py-8">
          <ScreenSwitcher activeScreen={activeScreen} onScreenChange={setActiveScreen} />
          
          <DeviceFrame>
            <StatusBar 
              title={
                activeScreen === "measurements" ? "Measurements" : 
                activeScreen === "profiles" ? "Liquid Profiles" : 
                "Units"
              } 
            />
            <div className="h-[calc(100%-52px)]">
              {renderScreen()}
            </div>
          </DeviceFrame>
        </div>

        {/* Modal Dialogs Section */}
        <div className="space-y-10">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-ui font-semibold text-foreground mb-3">
              Modal Dialogs
            </h3>
            <p className="text-muted-foreground">
              Overlay dialogs for data entry, configuration, and list management follow a consistent 
              structure: dark header with close action, light content area, and clear action hierarchy.
            </p>
          </div>

          {/* Modal Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider">
                List Management
              </span>
              <CalibrationPointsModal />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider">
                Secure Entry
              </span>
              <PINEntryModal />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider">
                Calibration
              </span>
              <TemperatureCalibrationModal />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider">
                Profile Management
              </span>
              <EditProfilesModal />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider">
                Multi-Select
              </span>
              <SuperProfileModal />
            </div>
          </div>
        </div>

        {/* Interface Patterns */}
        <div className="space-y-8">
          <h3 className="text-2xl font-ui font-semibold text-foreground">
            Interface Patterns
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PatternCard 
              title="Header Bar" 
              description="Brand gradient background with white title text"
              token="bg-brand-gradient"
            />
            <PatternCard 
              title="Data Display" 
              description="Large measurement values using monospace"
              token="font-data text-6xl"
            />
            <PatternCard 
              title="Sidebar Navigation" 
              description="Icon + label with active state indicator"
              token="text-primary font-ui"
            />
            <PatternCard 
              title="Status Indicators" 
              description="Color-coded vertical bars for state"
              token="bg-success / bg-warning"
            />
            <PatternCard 
              title="Touch Targets" 
              description="Minimum 44px for gloved operation"
              token="min-h-[44px] min-w-[44px]"
            />
            <PatternCard 
              title="Numeric Keypad" 
              description="Touch-optimized input grid layout"
              token="grid-cols-3 gap-2"
            />
          </div>
        </div>

        {/* Design Principles */}
        <BrandCallout variant="info" title="Embedded UI Principles">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-ui font-bold text-xs">1</span>
              <div>
                <strong className="text-foreground">Data First</strong>
                <p className="text-muted-foreground mt-0.5">Measurement values use JetBrains Mono at large sizes for instant readability.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-ui font-bold text-xs">2</span>
              <div>
                <strong className="text-foreground">Touch Targets</strong>
                <p className="text-muted-foreground mt-0.5">All interactive elements are sized for gloved operation (min 44×44px).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-ui font-bold text-xs">3</span>
              <div>
                <strong className="text-foreground">Status Clarity</strong>
                <p className="text-muted-foreground mt-0.5">Color-coded indicators provide immediate feedback without text.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-ui font-bold text-xs">4</span>
              <div>
                <strong className="text-foreground">Consistent Navigation</strong>
                <p className="text-muted-foreground mt-0.5">Sidebar pattern persists across all screens for predictable wayfinding.</p>
              </div>
            </div>
          </div>
        </BrandCallout>
      </div>
    </section>
  );
}
