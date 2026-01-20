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
} from "@/lib/icons";
import {
  ChamferedTabs,
  ChamferedTabsList,
  ChamferedTabsTrigger,
  ChamferedTabsContent,
} from "@/components/ui/chamfered-tabs";
import { BrandCallout } from "./BrandCallout";

// Device Frame Component
const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto max-w-4xl">
    {/* Outer bezel */}
    <div className="bg-rho-obsidian rounded-2xl p-3 shadow-2xl">
      {/* Inner screen area */}
      <div className="bg-slate-900 rounded-lg overflow-hidden aspect-[16/10] relative">
        {children}
      </div>
    </div>
    {/* Device label */}
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-data text-muted-foreground tracking-widest uppercase">
      SDM ECO · 7" Touchscreen
    </div>
  </div>
);

// Status Bar Component
const StatusBar = ({ title }: { title: string }) => (
  <div className="bg-gradient-to-r from-primary via-primary to-primary/90 px-4 py-3 flex items-center justify-between">
    <h2 className="text-white font-ui font-semibold text-lg tracking-wide uppercase">
      {title}
    </h2>
    <div className="flex items-center gap-4 text-white/80">
      <div className="flex items-center gap-1.5 text-xs font-ui">
        <Usb className="w-4 h-4" />
        <span>USB detected</span>
      </div>
      <span className="font-data text-sm">14:32</span>
    </div>
  </div>
);

// Sidebar Navigation Item
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
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
      active
        ? "bg-primary/10 border-l-2 border-primary"
        : "hover:bg-slate-800/50 border-l-2 border-transparent"
    }`}
  >
    {hasBack ? (
      <ChevronLeft className="w-5 h-5 text-primary" />
    ) : Icon ? (
      <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-slate-400"}`} />
    ) : null}
    <span className={`font-ui text-sm ${active ? "text-primary" : "text-slate-300"}`}>
      {label}
    </span>
  </div>
);

// Large Metric Display
const MetricDisplay = ({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) => (
  <div className="text-center">
    <div className="text-slate-400 font-ui text-sm mb-2 uppercase tracking-wide">
      {label}
    </div>
    <div className="flex items-baseline justify-center gap-2">
      <span className="text-5xl font-data text-white tracking-tight">{value}</span>
      <span className="text-xl font-data text-slate-400">{unit}</span>
    </div>
  </div>
);

// Measurements Screen
const MeasurementsScreen = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-48 bg-slate-900 border-r border-slate-800 flex flex-col">
      <SidebarItem icon={Settings} label="Settings" active />
      <SidebarItem icon={FlaskConical} label="Calibration" />
      <SidebarItem icon={Activity} label="Diagnostics" />
      <SidebarItem icon={Factory} label="Factory" />
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-12 mb-8">
        <MetricDisplay value="1.00" unit="SG" label="Density" />
        <MetricDisplay value="25.73" unit="°C" label="Temperature" />
      </div>

      <div className="text-center">
        <div className="text-slate-400 font-ui text-sm mb-2 uppercase tracking-wide">
          Active Profile
        </div>
        <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
          <Droplets className="w-4 h-4 text-primary" />
          <span className="font-ui text-white">Super profile</span>
        </div>
      </div>
    </div>
  </div>
);

// Liquid Profiles Screen
const LiquidProfilesScreen = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-48 bg-slate-900 border-r border-slate-800 flex flex-col">
      <SidebarItem hasBack label="Back" />
      <SidebarItem icon={Waves} label="Water calibration" />
      <SidebarItem icon={Droplets} label="Liquid profiles" active />
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <div className="text-slate-400 font-ui text-sm mb-4 uppercase tracking-wide">
        Active Profile
      </div>
      <div className="text-2xl font-ui text-white mb-8">Super profile</div>

      <div className="flex gap-4">
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-ui font-medium transition-colors">
          Select profile
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-ui font-medium transition-colors">
          Edit profiles
        </button>
      </div>
    </div>
  </div>
);

// Units Screen
const UnitsScreen = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-48 bg-slate-900 border-r border-slate-800 flex flex-col">
      <SidebarItem hasBack label="Back" />
      <SidebarItem icon={Gauge} label="Units" active />
      <SidebarItem icon={Activity} label="Output signals" />
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-2 gap-8">
        {/* Density Units */}
        <div>
          <h3 className="text-slate-400 font-ui text-sm mb-4 uppercase tracking-wide">
            Density Unit
          </h3>
          <div className="space-y-2">
            {["SG", "SG×1000", "kg/m³", "g/L", "lb/ft³", "Weight %"].map((unit, i) => (
              <label
                key={unit}
                className="flex items-center gap-3 bg-slate-800/50 px-4 py-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    i === 0 ? "border-primary bg-primary" : "border-slate-600"
                  }`}
                >
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-data text-white">{unit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature Units */}
        <div>
          <h3 className="text-slate-400 font-ui text-sm mb-4 uppercase tracking-wide">
            Temperature Unit
          </h3>
          <div className="space-y-2">
            {["Celsius", "Fahrenheit"].map((unit, i) => (
              <label
                key={unit}
                className="flex items-center gap-3 bg-slate-800/50 px-4 py-2.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    i === 0 ? "border-primary bg-primary" : "border-slate-600"
                  }`}
                >
                  {i === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-data text-white">{unit}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Modal Component
const Modal = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-slate-100 rounded-lg shadow-2xl overflow-hidden ${className}`}>
    <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
      <h3 className="text-white font-ui font-medium">{title}</h3>
      <button className="text-slate-400 hover:text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Calibration Points Modal
const CalibrationPointsModal = () => (
  <Modal title="Liquid profile: Clay 10% - Calibration points" className="w-full max-w-md">
    <div className="space-y-2">
      {[
        { id: 0, status: "Done", temp: "24.5", density: "1.10" },
        { id: 1, status: "Ready to sample", temp: "—", density: "—" },
      ].map((point) => (
        <div
          key={point.id}
          className="flex items-center gap-3 bg-white rounded-lg px-3 py-3 border border-slate-200"
        >
          <div
            className={`w-1 h-10 rounded-full ${
              point.status === "Done" ? "bg-success" : "bg-warning"
            }`}
          />
          <div className="flex-1">
            <div className="font-ui text-sm text-slate-900">
              #{point.id} · {point.status}
            </div>
            <div className="font-data text-xs text-slate-500">
              T: {point.temp}°C · ρ: {point.density} SG
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors">
            <Pencil className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors">
            <Trash2 className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      ))}

      <button className="w-full flex items-center justify-center gap-2 py-3 text-primary font-ui text-sm hover:bg-primary/5 rounded-lg transition-colors">
        <Plus className="w-4 h-4" />
        Add a calibration point
      </button>
    </div>
  </Modal>
);

// PIN Entry Modal
const PINEntryModal = () => (
  <Modal title="Enter PIN" className="w-full max-w-xs">
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-center">
        <span className="font-data text-2xl text-slate-900 tracking-[0.5em]">••••</span>
        <span className="font-data text-2xl text-slate-300 animate-pulse">_</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "←", 0, "C"].map((key) => (
          <button
            key={key}
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-3 font-data text-lg text-slate-900 transition-colors active:bg-slate-100"
          >
            {key}
          </button>
        ))}
      </div>

      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-ui font-medium transition-colors">
        Continue
      </button>
    </div>
  </Modal>
);

// Temperature Calibration Modal
const TemperatureCalibrationModal = () => (
  <Modal title="Temperature Calibration" className="w-full max-w-sm">
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-slate-600 font-ui text-xs uppercase tracking-wide mb-1 block">
            Measured
          </label>
          <div className="bg-slate-200 rounded-lg px-3 py-2">
            <span className="font-data text-lg text-slate-900">25.73</span>
            <span className="font-data text-sm text-slate-500 ml-1">°C</span>
          </div>
        </div>
        <div>
          <label className="text-slate-600 font-ui text-xs uppercase tracking-wide mb-1 block">
            Verified
          </label>
          <div className="bg-white border-2 border-primary rounded-lg px-3 py-2">
            <span className="font-data text-lg text-slate-900">25.50</span>
            <span className="font-data text-sm text-slate-500 ml-1">°C</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((key) => (
          <button
            key={key}
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg py-2.5 font-data text-lg text-slate-900 transition-colors"
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-lg font-ui font-medium transition-colors">
          Default
        </button>
        <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-lg font-ui font-medium transition-colors">
          Apply
        </button>
      </div>
    </div>
  </Modal>
);

// Edit Profiles Modal
const EditProfilesModal = () => (
  <Modal title="Edit Profiles" className="w-full max-w-sm">
    <div className="space-y-2">
      {["Water", "Clay 10%", "Slurry A", "Custom Mix"].map((profile, i) => (
        <div
          key={profile}
          className="flex items-center gap-3 bg-white rounded-lg px-3 py-3 border border-slate-200"
        >
          <div className={`w-1 h-8 rounded-full ${i === 0 ? "bg-primary" : "bg-slate-300"}`} />
          <span className="flex-1 font-ui text-slate-900">{profile}</span>
          <button className="p-2 hover:bg-slate-100 rounded transition-colors">
            <Pencil className="w-4 h-4 text-slate-400" />
          </button>
          {i > 0 && (
            <button className="p-2 hover:bg-slate-100 rounded transition-colors">
              <Trash2 className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      ))}
    </div>
  </Modal>
);

// Super Profile Modal
const SuperProfileModal = () => (
  <Modal title="Edit Super Profile" className="w-full max-w-sm">
    <div className="space-y-3">
      {["Water", "Clay 10%", "Slurry A", "Custom Mix"].map((profile, i) => (
        <label
          key={profile}
          className="flex items-center gap-3 bg-white rounded-lg px-3 py-3 border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              i < 2 ? "border-primary bg-primary" : "border-slate-300"
            }`}
          >
            {i < 2 && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="font-ui text-slate-900">{profile}</span>
        </label>
      ))}

      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-ui font-medium transition-colors mt-4">
        Save Changes
      </button>
    </div>
  </Modal>
);

// Pattern Documentation Table
const PatternTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-border">
          <th className="py-3 px-4 font-ui font-semibold text-foreground">Pattern</th>
          <th className="py-3 px-4 font-ui font-semibold text-foreground">Description</th>
          <th className="py-3 px-4 font-ui font-semibold text-foreground">Brand Tokens</th>
        </tr>
      </thead>
      <tbody className="font-ui text-sm">
        <tr className="border-b border-border/50">
          <td className="py-3 px-4 font-medium">Header Bar</td>
          <td className="py-3 px-4 text-muted-foreground">Brand gradient background with white title</td>
          <td className="py-3 px-4">
            <code className="font-data text-xs bg-muted px-2 py-1 rounded">bg-brand-gradient</code>
          </td>
        </tr>
        <tr className="border-b border-border/50">
          <td className="py-3 px-4 font-medium">Data Display</td>
          <td className="py-3 px-4 text-muted-foreground">Large measurement values with units</td>
          <td className="py-3 px-4">
            <code className="font-data text-xs bg-muted px-2 py-1 rounded">font-data text-5xl</code>
          </td>
        </tr>
        <tr className="border-b border-border/50">
          <td className="py-3 px-4 font-medium">Sidebar Navigation</td>
          <td className="py-3 px-4 text-muted-foreground">Icon + label navigation items</td>
          <td className="py-3 px-4">
            <code className="font-data text-xs bg-muted px-2 py-1 rounded">text-primary font-ui</code>
          </td>
        </tr>
        <tr className="border-b border-border/50">
          <td className="py-3 px-4 font-medium">Status Indicators</td>
          <td className="py-3 px-4 text-muted-foreground">Color-coded vertical bars</td>
          <td className="py-3 px-4">
            <code className="font-data text-xs bg-muted px-2 py-1 rounded">bg-success / bg-warning</code>
          </td>
        </tr>
        <tr>
          <td className="py-3 px-4 font-medium">Numeric Keypad</td>
          <td className="py-3 px-4 text-muted-foreground">Touch-optimized input grid</td>
          <td className="py-3 px-4">
            <code className="font-data text-xs bg-muted px-2 py-1 rounded">font-data text-lg</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function SDMEcoInterface() {
  const [activeTab, setActiveTab] = useState("measurements");

  return (
    <section id="sdm-interface" className="scroll-mt-24">
      <div className="space-y-16">
        {/* Section Intro */}
        <div className="max-w-3xl">
          <span className="label-tech text-primary mb-4 block">EMBEDDED_INTERFACE</span>
          <h2 className="text-3xl md:text-4xl font-ui font-semibold text-foreground mb-6">
            SDM Eco Device Interface
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The embedded touchscreen interface translates our brand language into a robust, 
            industrial HMI. Every screen prioritizes clarity of data and operational efficiency, 
            using our typography system to distinguish between UI labels and measurement values.
          </p>
        </div>

        {/* Device Frame with Tabbed Screens */}
        <div className="space-y-6">
          <ChamferedTabs value={activeTab} onValueChange={setActiveTab} variant="obsidian">
            <ChamferedTabsList className="mx-auto">
              <ChamferedTabsTrigger value="measurements">Measurements</ChamferedTabsTrigger>
              <ChamferedTabsTrigger value="profiles">Liquid Profiles</ChamferedTabsTrigger>
              <ChamferedTabsTrigger value="units">Units</ChamferedTabsTrigger>
            </ChamferedTabsList>

            <div className="mt-8">
              <DeviceFrame>
                <ChamferedTabsContent value="measurements" className="m-0 h-full">
                  <StatusBar title="Measurements" />
                  <div className="h-[calc(100%-52px)]">
                    <MeasurementsScreen />
                  </div>
                </ChamferedTabsContent>

                <ChamferedTabsContent value="profiles" className="m-0 h-full">
                  <StatusBar title="Liquid Profiles" />
                  <div className="h-[calc(100%-52px)]">
                    <LiquidProfilesScreen />
                  </div>
                </ChamferedTabsContent>

                <ChamferedTabsContent value="units" className="m-0 h-full">
                  <StatusBar title="Units" />
                  <div className="h-[calc(100%-52px)]">
                    <UnitsScreen />
                  </div>
                </ChamferedTabsContent>
              </DeviceFrame>
            </div>
          </ChamferedTabs>
        </div>

        {/* Modal Examples */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-ui font-semibold text-foreground mb-2">
              Modal Dialogs
            </h3>
            <p className="text-muted-foreground mb-8">
              Overlay dialogs for data entry, configuration, and list management follow a consistent 
              structure: dark header with close action, light content area, and clear action hierarchy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-ui font-medium text-muted-foreground uppercase tracking-wide">
                Calibration Points
              </h4>
              <CalibrationPointsModal />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-ui font-medium text-muted-foreground uppercase tracking-wide">
                PIN Entry
              </h4>
              <PINEntryModal />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-ui font-medium text-muted-foreground uppercase tracking-wide">
                Temperature Calibration
              </h4>
              <TemperatureCalibrationModal />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-ui font-medium text-muted-foreground uppercase tracking-wide">
                Profile List
              </h4>
              <EditProfilesModal />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-ui font-medium text-muted-foreground uppercase tracking-wide">
                Super Profile Selection
              </h4>
              <SuperProfileModal />
            </div>
          </div>
        </div>

        {/* Pattern Documentation */}
        <div className="space-y-6">
          <h3 className="text-xl font-ui font-semibold text-foreground">
            Interface Patterns
          </h3>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <PatternTable />
          </div>
        </div>

        {/* Design Principles Callout */}
        <BrandCallout variant="info" title="Embedded UI Principles">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>
                <strong>Data First:</strong> Measurement values use JetBrains Mono at large sizes 
                for instant readability in industrial environments.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>
                <strong>Touch Targets:</strong> All interactive elements are sized for gloved 
                operation (minimum 44×44px touch zones).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>
                <strong>Status Clarity:</strong> Color-coded indicators provide immediate 
                operational feedback without requiring text comprehension.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>
                <strong>Consistent Navigation:</strong> Sidebar pattern persists across all 
                screens, providing predictable wayfinding.
              </span>
            </li>
          </ul>
        </BrandCallout>
      </div>
    </section>
  );
}
