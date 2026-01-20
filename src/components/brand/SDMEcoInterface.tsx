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
  Globe,
  Sun,
  ArrowUpDown,
  Users,
  ChevronDown,
  Delete,
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";

// ============================================================================
// DEVICE FRAME - Industrial tablet with status bar
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
      {/* Top bezel with status - matches reference */}
      <div className="flex items-center justify-end px-6 py-3 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-6 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-ui text-sm font-medium">USB detected</span>
            <Usb className="w-4 h-4 text-primary" />
          </div>
          <span className="font-data text-sm tabular-nums font-medium">09:00</span>
        </div>
      </div>
      
      {/* Screen - Light mode */}
      <div className="aspect-[5/3] bg-white">
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
// GREEN HEADER BAR - Matches reference
// ============================================================================
const GreenHeader = ({ 
  title, 
  onClose 
}: { 
  title: string;
  onClose?: () => void;
}) => (
  <div className="bg-primary px-5 py-4 flex items-center justify-between">
    <h2 className="font-ui text-xl text-white font-semibold">{title}</h2>
    {onClose && (
      <button 
        onClick={onClose}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    )}
  </div>
);

// ============================================================================
// LEFT SIDEBAR - Text menu with icons
// ============================================================================
const SidebarMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="w-52 border-r border-slate-200 flex flex-col">
    {children}
  </div>
);

const SidebarBack = ({ onClick }: { onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-4 text-primary font-ui font-medium hover:bg-slate-50 transition-colors border-b border-slate-200"
  >
    <ChevronLeft className="w-4 h-4" />
    Back
  </button>
);

const SidebarDivider = () => <div className="my-2 border-b border-slate-200" />;

const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  onClick,
  hasSubmenu = false,
  expanded = false,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
  hasSubmenu?: boolean;
  expanded?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-left font-ui font-medium transition-colors ${
      active 
        ? "text-primary bg-primary/5" 
        : "text-slate-700 hover:bg-slate-50"
    }`}
  >
    {Icon && <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-primary"}`} />}
    <span className="flex-1">{label}</span>
    {hasSubmenu && (
      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
    )}
  </button>
);

// ============================================================================
// MEASUREMENTS SCREEN - Main dashboard
// ============================================================================
const MeasurementsScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="MEASUREMENTS" />
    <div className="flex-1 flex">
      <SidebarMenu>
        <SidebarBack />
        <SidebarDivider />
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={Gauge} label="Calibration" />
        <SidebarItem icon={Activity} label="Diagnostics" />
        <SidebarItem icon={FlaskConical} label="Factory" />
      </SidebarMenu>
      
      <div className="flex-1 p-5 flex flex-col">
        {/* Metrics - right aligned like reference */}
        <div className="flex-1 flex flex-col items-end justify-center gap-2">
          <div>
            <span className="font-ui text-sm text-slate-500 font-medium block text-right">Density (SG)</span>
            <span className="font-data text-6xl text-slate-900 tabular-nums font-medium">1.00</span>
          </div>
          <div>
            <span className="font-ui text-sm text-slate-500 font-medium block text-right">Temperature (°C)</span>
            <span className="font-data text-5xl text-slate-900 tabular-nums font-medium">25.73</span>
          </div>
          <div className="mt-4">
            <span className="font-ui text-sm text-slate-500 font-medium block text-right">Active profile</span>
            <span className="font-data text-3xl text-slate-900 font-medium">Super profile</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// LIQUID PROFILES SCREEN
// ============================================================================
const LiquidProfilesScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="LIQUID PROFILES" />
    <div className="flex-1 flex">
      <SidebarMenu>
        <SidebarBack />
        <SidebarDivider />
        <SidebarItem icon={Waves} label="Water calibration" />
        <SidebarItem icon={Droplets} label="Liquid profiles" active />
      </SidebarMenu>
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <span className="font-ui text-sm text-slate-500 mb-1">Active profile:</span>
        <span className="font-data text-4xl text-slate-900 font-medium mb-8">Super profile</span>
        
        <div className="flex flex-col gap-3 w-48">
          <button className="py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-ui font-semibold transition-colors">
            Select profile
          </button>
          <button className="py-3 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-ui font-semibold transition-colors">
            Edit profiles
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// UNITS SCREEN
// ============================================================================
const UnitsScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="UNITS" />
    <div className="flex-1 flex">
      <SidebarMenu>
        <SidebarBack />
        <SidebarDivider />
        <SidebarItem icon={Globe} label="Language" />
        <SidebarItem icon={Sun} label="Backlight" />
        <SidebarItem icon={ArrowUpDown} label="Ranging" />
        <SidebarItem icon={Gauge} label="Units" active />
        <SidebarItem icon={Users} label="About Us" />
        <SidebarItem hasSubmenu expanded={false} label="Down" />
      </SidebarMenu>
      
      <div className="flex-1 p-6">
        {/* Density units */}
        <div className="mb-6">
          <h3 className="font-ui text-lg text-slate-900 font-semibold mb-4">Density</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {[
              { label: "SG", active: true },
              { label: "SGx1000", active: false },
              { label: "kg/m³", active: false },
              { label: "g/L", active: false },
              { label: "lb/ft³", active: false },
              { label: "Weight %", active: false },
            ].map((unit) => (
              <label key={unit.label} className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  unit.active ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {unit.active && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-ui text-base text-slate-700">{unit.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Temperature units */}
        <div>
          <h3 className="font-ui text-lg text-slate-900 font-semibold mb-4">Temperature</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {[
              { label: "Celsius(°C)", active: true },
              { label: "Fahrenheit (°F)", active: false },
            ].map((unit) => (
              <label key={unit.label} className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  unit.active ? "border-primary bg-primary" : "border-slate-300"
                }`}>
                  {unit.active && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-ui text-base text-slate-700">{unit.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// ENTER PIN SCREEN - Modal as full screen
// ============================================================================
const EnterPinScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="Enter PIN" onClose={() => {}} />
    <div className="flex-1 flex items-center justify-center gap-12 p-6">
      {/* Left side - PIN display */}
      <div className="flex flex-col items-center">
        <span className="font-ui text-lg text-slate-700 font-medium mb-4">Enter PIN</span>
        <div className="px-6 py-3 rounded-lg border-2 border-primary bg-white mb-6">
          <span className="font-data text-2xl text-slate-400 tracking-[0.3em]">_</span>
        </div>
        <button className="py-3 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-ui font-semibold transition-colors">
          Continue
        </button>
      </div>
      
      {/* Right side - Numpad */}
      <div className="bg-slate-100 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button
              key={num}
              className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium transition-colors"
            >
              {num}
            </button>
          ))}
          <button className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium transition-colors">
            0
          </button>
          <button className="w-14 h-12 col-span-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-ui text-slate-600 font-medium transition-colors flex items-center justify-center">
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// CALIBRATION POINTS SCREEN
// ============================================================================
const CalibrationPointsScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="Liquid profile: Clay 10%  -  Calibration points" onClose={() => {}} />
    <div className="flex-1 p-5 flex flex-col">
      {/* Points list */}
      <div className="flex-1 space-y-3">
        {[
          { id: 0, status: "Done", sampled: "26.03°C", density: "1035.00kg/m³", done: true },
          { id: 1, status: "Ready to sample", recommended: "38.02°C", done: false },
        ].map((point) => (
          <div
            key={point.id}
            className="flex items-center gap-4 py-3 border-b border-slate-200"
          >
            <div className={`w-1.5 h-12 rounded-full ${point.done ? "bg-primary" : "bg-yellow-400"}`} />
            <span className="font-data text-base text-slate-900 font-medium w-8">#{point.id}:</span>
            <span className="font-ui text-base text-slate-700 w-32">{point.status}</span>
            <span className="font-ui text-base text-slate-500">
              | {point.sampled ? `Sampled: ${point.sampled}` : `Recommended: ${point.recommended}`}
            </span>
            {point.density && (
              <span className="font-ui text-base text-slate-500">| Density: {point.density}</span>
            )}
            <div className="flex-1" />
            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Pencil className="w-5 h-5 text-primary" />
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Trash2 className="w-5 h-5 text-destructive" />
            </button>
          </div>
        ))}
        
        <button className="flex items-center gap-2 py-3 text-slate-700 font-ui font-medium hover:text-primary transition-colors">
          <Plus className="w-5 h-5" />
          Add a calibration point
        </button>
      </div>
      
      {/* Footer info */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-center gap-4 text-slate-500 font-ui text-sm">
        <span>Included in the Super Profile</span>
        <span>|</span>
        <span>Temperature range: 20.00°C - 50.00°C</span>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPERATURE CALIBRATION SCREEN
// ============================================================================
const TemperatureCalibrationScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="Temperature Calibration" onClose={() => {}} />
    <div className="flex-1 flex items-center justify-center gap-10 p-6">
      {/* Left side - Input */}
      <div className="flex flex-col">
        <div className="mb-6 text-center">
          <span className="font-ui text-base text-slate-600">Measured temperature:</span>
          <span className="font-data text-lg text-slate-900 ml-3">26.14 °C</span>
        </div>
        
        <span className="font-ui text-lg text-slate-800 font-semibold mb-4 text-center">Insert verified temperature</span>
        
        <div className="mb-4">
          <label className="font-ui text-sm text-slate-500 mb-1 block">Temperature °C</label>
          <div className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200">
            <span className="font-data text-2xl text-slate-900">26.13</span>
            <span className="font-data text-2xl text-slate-400 animate-pulse">_</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button className="py-3 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-ui font-semibold transition-colors">
            Apply
          </button>
          <button className="py-3 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-ui font-semibold transition-colors">
            Default
          </button>
        </div>
      </div>
      
      {/* Right side - Numpad */}
      <div className="bg-slate-100 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-2">
          <button className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium">.</button>
          <button className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium">+/-</button>
          <button className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Delete className="w-5 h-5 text-slate-600" />
          </button>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button
              key={num}
              className="w-14 h-12 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium"
            >
              {num}
            </button>
          ))}
          <button className="w-14 h-12 col-span-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-data text-xl text-slate-800 font-medium">
            0
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// EDIT PROFILES SCREEN
// ============================================================================
const EditProfilesScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="Edit Profiles" onClose={() => {}} />
    <div className="flex-1 p-5 flex flex-col">
      <div className="flex-1 space-y-0">
        {[
          { name: "Water", desc: "Water", canDelete: false },
          { name: "Super profile", desc: "Clay 5%, Clay 10%, Clay 20%, Clay 30%", canDelete: false },
          { name: "Liquid #0", desc: "Clay 5%", canDelete: true },
          { name: "Liquid #1", desc: "Clay 10%", canDelete: true },
          { name: "Liquid #2", desc: "Clay 20%", canDelete: true },
          { name: "Liquid #3", desc: "Clay 30%", canDelete: true },
        ].map((profile, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-200">
            <div className="w-1.5 h-10 rounded-full bg-primary" />
            <div className="flex-1">
              <span className="font-ui text-base text-slate-900 font-medium">{profile.name}</span>
              <span className="font-ui text-base text-slate-500 ml-4">| {profile.desc}</span>
            </div>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Pencil className="w-5 h-5 text-primary" />
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Trash2 className={`w-5 h-5 ${profile.canDelete ? "text-destructive" : "text-slate-300"}`} />
            </button>
          </div>
        ))}
        
        <button className="flex items-center gap-2 py-4 text-slate-700 font-ui font-medium hover:text-primary transition-colors">
          <Plus className="w-5 h-5" />
          Create a liquid profile
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// EDIT SUPER PROFILE SCREEN
// ============================================================================
const EditSuperProfileScreen = () => (
  <div className="h-full flex flex-col">
    <GreenHeader title="Edit Super Profile" onClose={() => {}} />
    <div className="flex-1 p-5 flex flex-col">
      <div className="flex justify-end mb-4">
        <div className="text-right">
          <span className="font-ui text-sm text-slate-500 block">Temperature range</span>
          <span className="font-data text-base text-slate-900">10.00°C - 50.00°C</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-0">
        {[
          { name: "Water:", desc: "Water" },
          { name: "Liquid #0:", desc: "Clay 5%" },
          { name: "Liquid #1:", desc: "Clay 10%" },
          { name: "Liquid #2:", desc: "Clay 20%" },
          { name: "Liquid #3:", desc: "Clay 30%" },
        ].map((profile, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-200">
            <div className="w-1.5 h-10 rounded-full bg-primary" />
            <span className="font-ui text-base text-slate-900 font-medium w-24">{profile.name}</span>
            <span className="font-ui text-base text-slate-500 flex-1">{profile.desc}</span>
            <div className="w-8 h-8 rounded border-2 border-primary bg-white flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// SCREEN SWITCHER
// ============================================================================
const screens = [
  { id: "measurements", label: "Dashboard" },
  { id: "profiles", label: "Profiles" },
  { id: "units", label: "Units" },
  { id: "pin", label: "Enter PIN" },
  { id: "calibration", label: "Calibration" },
  { id: "temp-cal", label: "Temp Cal" },
  { id: "edit-profiles", label: "Edit Profiles" },
  { id: "edit-super", label: "Edit Super" },
];

const ScreenSwitcher = ({
  activeScreen,
  onScreenChange,
}: {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {screens.map(({ id, label }) => (
      <button
        key={id}
        onClick={() => onScreenChange(id)}
        className={`px-4 py-2 rounded-lg font-ui text-sm font-medium transition-all ${
          activeScreen === id
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
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
        title: "Green header", 
        desc: "Consistent navigation bar with title",
        example: <div className="w-full h-8 rounded bg-primary flex items-center px-3"><span className="text-white text-xs font-semibold">TITLE</span></div>
      },
      { 
        title: "Text sidebar", 
        desc: "Icon + label for clear navigation",
        example: (
          <div className="flex items-center gap-2 text-primary">
            <Settings className="w-4 h-4" />
            <span className="font-ui text-sm font-medium">Settings</span>
          </div>
        )
      },
      { 
        title: "List rows", 
        desc: "Status indicator + content + actions",
        example: (
          <div className="flex items-center gap-2 w-full">
            <div className="w-1 h-6 rounded-full bg-primary" />
            <span className="text-xs flex-1">Item name</span>
            <Pencil className="w-3 h-3 text-primary" />
            <Trash2 className="w-3 h-3 text-destructive" />
          </div>
        )
      },
      { 
        title: "Numpad", 
        desc: "Large touch targets with grid layout",
        example: (
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center font-data text-xs">{n}</div>
            ))}
          </div>
        )
      },
    ].map((pattern) => (
      <div key={pattern.title} className="p-5 rounded-2xl bg-card border border-border">
        <div className="h-12 flex items-center justify-center mb-4">
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
      case "profiles": return <LiquidProfilesScreen />;
      case "units": return <UnitsScreen />;
      case "pin": return <EnterPinScreen />;
      case "calibration": return <CalibrationPointsScreen />;
      case "temp-cal": return <TemperatureCalibrationScreen />;
      case "edit-profiles": return <EditProfilesScreen />;
      case "edit-super": return <EditSuperProfileScreen />;
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
            Green header bars, text-based sidebar menus, and 
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
              <div className="font-ui font-semibold text-foreground mb-1">Consistent structure</div>
              <p className="font-ui text-sm text-muted-foreground">Green header + left sidebar + right content area for predictable navigation.</p>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground mb-1">Touch-friendly lists</div>
              <p className="font-ui text-sm text-muted-foreground">Status indicators, action buttons, and generous row heights for reliable interaction.</p>
            </div>
          </div>
        </BrandCallout>
      </div>
    </section>
  );
}
