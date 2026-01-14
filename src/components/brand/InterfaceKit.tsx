import { RhosonicsLogo } from "../RhosonicsLogo";
import { ArrowRight, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InterfaceKit = () => {
  return (
    <section id="components" className="space-y-16 pt-16">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-6">Interface Kit</h2>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Functional building blocks for decision-making and control. 
          Every component prioritizes clarity over decoration — the primary measurement 
          must be readable at a glance, from a distance.
        </p>
      </div>

      {/* Buttons Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Buttons</h3>
        </div>
        
        <div className="space-y-12">
          {/* Standard Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Standard</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Chamfered Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Chamfered</span>
              <p className="text-xs text-muted-foreground mt-1">Industrial aesthetic</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="chamfer" size="chamfer-default">
                <Zap className="w-4 h-4" />
                Primary
              </Button>
              <Button variant="chamfer-outline" size="chamfer-default">
                Outline
              </Button>
              <Button variant="chamfer-obsidian" size="chamfer-default">
                Obsidian
              </Button>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Hero CTA</span>
              <p className="text-xs text-muted-foreground mt-1">Large format</p>
            </div>
            <div>
              <Button variant="chamfer" size="chamfer-lg">
                Start Measurement
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Cards Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Data Cards</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Primary Measurement Card */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-4">
              Primary Measurement
            </span>
            <div className="bg-card border border-border rounded-lg p-8 shadow-elevated">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Reading</span>
                  <div className="font-ui font-bold text-xl text-foreground mt-1">Slurry Density</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-border rounded-full">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-data text-xs text-primary uppercase">Live</span>
                </div>
              </div>
              <div className="flex items-baseline gap-3 mt-2 mb-6">
                <span className="font-ui text-6xl font-medium text-foreground tracking-tight">1.4502</span>
                <span className="font-data text-lg text-muted-foreground">g/L</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-gradient h-full w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Branded Card */}
          <div>
            <span className="font-data text-xs text-muted-foreground uppercase tracking-wide block mb-4">
              Branded Interface
            </span>
            <div className="overflow-hidden rounded-lg shadow-elevated border border-border">
              <div className="bg-rho-obsidian text-slate-100 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5">
                    <RhosonicsLogo variant="white" />
                  </div>
                  <span className="font-logo text-lg tracking-wide uppercase pt-0.5">RHOSONICS</span>
                </div>
                <Menu className="w-5 h-5 text-slate-400" />
              </div>
              <div className="bg-card p-8 flex flex-col justify-center items-center text-center">
                <div className="flex items-baseline gap-1">
                  <span className="font-ui font-medium text-4xl text-foreground">12.4</span>
                  <span className="font-data text-xl text-muted-foreground">%</span>
                </div>
                <div className="font-data text-xs uppercase tracking-wide mt-2 mb-6 text-muted-foreground">
                  Solids Concentration
                </div>
                <Button variant="chamfer" size="chamfer-default">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Status Badges</h3>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <span className="px-3 py-1.5 bg-primary text-primary-foreground font-data text-xs uppercase tracking-wide rounded-full">
            Active
          </span>
          <span className="px-3 py-1.5 bg-eco-surface text-primary font-data text-xs uppercase tracking-wide rounded-full border border-eco-border">
            Eco Pack
          </span>
          <span className="px-3 py-1.5 bg-slate-100 text-muted-foreground font-data text-xs uppercase tracking-wide rounded-full border border-border">
            Standby
          </span>
          <span className="px-3 py-1.5 bg-warning-surface text-warning font-data text-xs uppercase tracking-wide rounded-full border border-warning-border">
            Calibrating
          </span>
          <span className="px-3 py-1.5 bg-error-surface text-error font-data text-xs uppercase tracking-wide rounded-full border border-error-border">
            Error
          </span>
        </div>

        <p className="text-muted-foreground max-w-xl">
          Badges use JetBrains Mono, uppercase, short labels. They communicate operational state, 
          never decoration. Color indicates function.
        </p>
      </div>
    </section>
  );
};

export default InterfaceKit;
