import { RhosonicsLogo } from "../RhosonicsLogo";
import { ArrowRight, Menu } from "lucide-react";

export const InterfaceKit = () => {
  return (
    <section id="components" className="mb-32">
      <h2 className="section-header">Interface Kit</h2>

      {/* Buttons */}
      <h3 className="label-tech text-slate-500 mb-4">BUTTONS</h3>
      <div className="card-base p-8 mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="chamfer-shape bg-primary text-primary-foreground px-5 py-2.5 font-data text-xs uppercase tracking-wider hover:brightness-110 transition-all hover:-translate-y-0.5">
            Primary Action
          </button>
          <button className="chamfer-shape bg-card text-muted-foreground px-5 py-2.5 font-data text-xs uppercase tracking-wider border border-border hover:border-slate-400 hover:text-foreground transition-all">
            Secondary
          </button>
          <button className="chamfer-shape bg-primary/10 text-primary px-5 py-2.5 font-data text-xs uppercase tracking-wider border border-eco-border hover:bg-primary hover:text-primary-foreground transition-all">
            Eco Action
          </button>
          <button className="chamfer-shape bg-rho-obsidian text-slate-100 px-5 py-2.5 font-data text-xs uppercase tracking-wider hover:brightness-125 transition-all">
            Dark Variant
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          All buttons use the chamfered clip-path for a distinctive industrial look. 
          The 6px corner cut mirrors the arc geometry of the logo.
        </p>
      </div>

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
              <span className="font-logo text-lg tracking-wide pt-0.5">Rhosonics</span>
            </div>
            <Menu className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-grow bg-card p-8 flex flex-col justify-center items-center text-center border-x border-b border-border rounded-b-md">
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl text-foreground">12.4</span>
              <span className="font-data text-lg text-muted-foreground">%</span>
            </div>
            <div className="label-tech mt-2 mb-6 text-muted-foreground">Solids Concentration</div>
            <button className="chamfer-shape bg-primary text-primary-foreground px-5 py-2.5 font-data text-xs uppercase tracking-wider hover:brightness-110 transition-all">
              View Details
            </button>
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
      <div className="card-base p-8">
        <div className="flex flex-wrap gap-3">
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
      </div>
    </section>
  );
};

export default InterfaceKit;
