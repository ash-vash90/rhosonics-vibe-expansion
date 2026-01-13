import { RhosonicsLogo } from "../RhosonicsLogo";
import { ArrowRight, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCallout } from "./BrandCallout";

export const InterfaceKit = () => {
  return (
    <section id="components" className="mb-32">
      <h2 className="section-header">Interface Kit</h2>
      <p className="text-muted-foreground mb-4">
        These components are functional building blocks.
      </p>
      <p className="text-muted-foreground mb-8">
        They exist to support decision-making, data entry, and system control — not visual expression.
      </p>

      {/* Buttons */}
      <h3 className="label-tech text-slate-500 mb-2">BUTTONS</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Primary actions should be obvious without being aggressive.
      </p>
      <div className="card-base p-8 mb-8">
        {/* Standard Buttons */}
        <div className="mb-8">
          <span className="label-tech text-xs text-muted-foreground block mb-3">STANDARD VARIANTS</span>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        {/* Chamfered Buttons - Industrial Style */}
        <div className="mb-8">
          <span className="label-tech text-xs text-muted-foreground block mb-3">CHAMFERED VARIANTS — INDUSTRIAL AESTHETIC</span>
          <div className="flex flex-wrap gap-4">
            <Button variant="chamfer" size="chamfer-default">
              <Zap className="w-4 h-4" />
              Primary Chamfer
            </Button>
            <Button variant="chamfer-outline" size="chamfer-default">
              Outline Chamfer
            </Button>
            <Button variant="chamfer-obsidian" size="chamfer-default">
              Obsidian Chamfer
            </Button>
            <Button variant="chamfer-earth" size="chamfer-default">
              Earth Chamfer
            </Button>
          </div>
        </div>

        {/* Large Chamfered Buttons */}
        <div className="mb-6">
          <span className="label-tech text-xs text-muted-foreground block mb-3">LARGE CHAMFERED — HERO CTAs</span>
          <div className="flex flex-wrap gap-4">
            <Button variant="chamfer" size="chamfer-lg">
              Start Measurement
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="chamfer-obsidian" size="chamfer-lg">
              Configure System
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground border-t border-border pt-4 mt-6">
          Chamfered buttons use <code className="font-data text-primary">clip-path</code> for a distinctive industrial look.
          The angled corners mirror the arc geometry of the Rhosonics logo and reinforce the field equipment aesthetic.
        </p>
      </div>

      {/* Data Priority Rule Callout */}
      <BrandCallout variant="rule" title="Data Priority Rule" className="mb-8">
        The primary measurement must be readable at a glance, from a distance.
      </BrandCallout>

      {/* Cards */}
      <h3 className="label-tech text-slate-500 mb-4">DATA CARDS</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Primary Measurement Card */}
        <div className="card-base p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="label-tech mb-1 text-muted-foreground">PRIMARY MEASUREMENT</span>
              <div className="font-ui font-bold text-xl text-foreground">Slurry Density</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-border rounded-full">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot"></div>
              <span className="label-tech text-primary">LIVE</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3 mt-2 mb-6">
            <span className="font-ui text-5xl font-medium text-foreground tracking-tight">1.4502</span>
            <span className="font-data text-sm text-muted-foreground">g/L</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-brand-gradient h-full w-[65%] rounded-full"></div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="label-tech text-muted-foreground">Temp</div>
              <span className="font-ui font-medium text-sm text-foreground">24.5°C</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="label-tech text-muted-foreground">Pressure</div>
              <span className="font-ui font-medium text-sm text-foreground">1013 hPa</span>
            </div>
          </div>
        </div>

        {/* Mobile Interface Card */}
        <div className="card-base flex flex-col h-full p-0 border-0 overflow-hidden shadow-elevated">
          <div className="bg-rho-obsidian text-slate-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5">
                <RhosonicsLogo variant="white" />
              </div>
              <span className="font-logo text-lg tracking-wide uppercase pt-0.5">RHOSONICS</span>
            </div>
            <Menu className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-grow bg-card p-8 flex flex-col justify-center items-center text-center border-x border-b border-border rounded-b-md">
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl text-foreground">12.4</span>
              <span className="font-data text-lg text-muted-foreground">%</span>
            </div>
            <div className="label-tech mt-2 mb-6 text-muted-foreground">Solids Concentration</div>
            <Button variant="chamfer" size="chamfer-default">
              View Details
            </Button>
          </div>
        </div>
      </div>

      {/* Input Elements */}
      <h3 className="label-tech text-slate-500 mb-4">FORM ELEMENTS</h3>
      <div className="card-base p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-tech text-muted-foreground block mb-2">Text Input</label>
            <input 
              type="text" 
              placeholder="Enter value..." 
              className="w-full px-4 py-2.5 bg-card border border-border rounded-md font-ui text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="label-tech text-muted-foreground block mb-2">Data Input</label>
            <input 
              type="text" 
              placeholder="0.0000" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-border rounded-md font-data text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-right"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="label-tech text-muted-foreground block mb-2">Select</label>
          <select className="w-full md:w-64 px-4 py-2.5 bg-card border border-border rounded-md font-ui text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer">
            <option>Density Mode</option>
            <option>Concentration Mode</option>
            <option>Solids Mode</option>
          </select>
        </div>
      </div>

      {/* Badges & Tags */}
      <h3 className="label-tech text-slate-500 mb-4">BADGES & TAGS</h3>
      <div className="card-base p-8 mb-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground font-data text-xs uppercase rounded-full">
            Active
          </span>
          <span className="px-3 py-1 bg-eco-surface text-primary font-data text-xs uppercase rounded-full border border-eco-border">
            Eco Pack
          </span>
          <span className="px-3 py-1 bg-slate-100 text-muted-foreground font-data text-xs uppercase rounded-full border border-border">
            Standby
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 font-data text-xs uppercase rounded-full border border-amber-200">
            Calibrating
          </span>
          <span className="px-3 py-1 bg-red-50 text-destructive font-data text-xs uppercase rounded-full border border-red-200">
            Error
          </span>
        </div>
        <p className="text-sm text-muted-foreground border-t border-border pt-4">
          All badges use JetBrains Mono, uppercase, and short labels. Badges communicate state, not emotion.
        </p>
      </div>

      {/* Component States */}
      <h3 className="label-tech text-slate-500 mb-4">COMPONENT STATES</h3>
      <div className="card-base p-8 mb-8">
        <p className="text-sm text-muted-foreground mb-6">
          All interactive components must define these states. Consistency prevents cognitive load.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="h-12 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-ui text-sm mb-2">
              Default
            </div>
            <span className="text-xs text-muted-foreground">Resting state</span>
          </div>
          <div className="text-center">
            <div className="h-12 bg-primary/80 text-primary-foreground rounded-md flex items-center justify-center font-ui text-sm mb-2 ring-2 ring-primary/30 ring-offset-2">
              Hover
            </div>
            <span className="text-xs text-muted-foreground">Cursor over</span>
          </div>
          <div className="text-center">
            <div className="h-12 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-ui text-sm mb-2 ring-2 ring-primary ring-offset-2">
              Focus
            </div>
            <span className="text-xs text-muted-foreground">Keyboard nav</span>
          </div>
          <div className="text-center">
            <div className="h-12 bg-primary/90 text-primary-foreground rounded-md flex items-center justify-center font-ui text-sm mb-2 scale-[0.98] transform">
              Active
            </div>
            <span className="text-xs text-muted-foreground">Pressed</span>
          </div>
          <div className="text-center">
            <div className="h-12 bg-muted text-muted-foreground rounded-md flex items-center justify-center font-ui text-sm mb-2 opacity-50 cursor-not-allowed">
              Disabled
            </div>
            <span className="text-xs text-muted-foreground">Unavailable</span>
          </div>
        </div>

        {/* Focus Ring Spec */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
          <div className="label-tech text-slate-600 mb-2">FOCUS RING SPECIFICATION</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-data text-primary">ring-2</span>
              <span className="text-muted-foreground"> — 2px solid</span>
            </div>
            <div>
              <span className="font-data text-primary">ring-primary</span>
              <span className="text-muted-foreground"> — Brand color</span>
            </div>
            <div>
              <span className="font-data text-primary">ring-offset-2</span>
              <span className="text-muted-foreground"> — 2px gap</span>
            </div>
          </div>
        </div>

        {/* Form Validation */}
        <div className="label-tech text-slate-600 mb-3">FORM VALIDATION STATES</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-tech text-muted-foreground block mb-2">Valid Input</label>
            <input 
              type="text" 
              value="1.4502" 
              readOnly
              className="w-full px-4 py-2.5 bg-card border-2 border-primary rounded-md font-data text-foreground focus:outline-none"
            />
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <span>✓</span> Value within range
            </p>
          </div>
          <div>
            <label className="label-tech text-muted-foreground block mb-2">Error Input</label>
            <input 
              type="text" 
              value="999.999" 
              readOnly
              className="w-full px-4 py-2.5 bg-card border-2 border-destructive rounded-md font-data text-foreground focus:outline-none"
            />
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <span>✕</span> Value exceeds maximum (10.000)
            </p>
          </div>
        </div>
      </div>

      {/* Loading States */}
      <h3 className="label-tech text-slate-500 mb-4">LOADING STATES</h3>
      <div className="card-base p-8">
        <div className="flex flex-wrap gap-4 items-center">
          <button className="chamfer-shape bg-primary text-primary-foreground px-6 py-2.5 font-data text-xs uppercase flex items-center gap-2 opacity-70 cursor-wait">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </button>
          <div className="h-10 w-32 bg-slate-200 rounded-md animate-pulse"></div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-data">Syncing data...</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground border-t border-border pt-4 mt-6">
          Loading states must be obvious and non-blocking when possible. Use skeleton loaders for content, spinners for actions.
        </p>
      </div>
    </section>
  );
};

export default InterfaceKit;