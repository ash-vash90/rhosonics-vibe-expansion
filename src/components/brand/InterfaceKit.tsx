import { RhosonicsLogo } from "../RhosonicsLogo";
import { ArrowRight, Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCallout } from "./BrandCallout";

export const InterfaceKit = () => {
  return (
    <section id="components" className="mb-32">
      <h2 className="section-header">Interface Kit</h2>
      <p className="text-muted-foreground mb-8">
        Functional building blocks for decision-making and control — not visual expression.
      </p>

      {/* Buttons */}
      <h3 className="label-tech text-slate-500 mb-4">BUTTONS</h3>
      <div className="card-base p-8 mb-8">
        <div className="mb-6">
          <span className="label-tech text-xs text-muted-foreground block mb-3">STANDARD</span>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="mb-6">
          <span className="label-tech text-xs text-muted-foreground block mb-3">CHAMFERED — INDUSTRIAL AESTHETIC</span>
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

        <div>
          <span className="label-tech text-xs text-muted-foreground block mb-3">LARGE — HERO CTAs</span>
          <div className="flex flex-wrap gap-4">
            <Button variant="chamfer" size="chamfer-lg">
              Start Measurement
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <BrandCallout variant="rule" title="Data Priority Rule" className="mb-8">
        The primary measurement must be readable at a glance, from a distance.
      </BrandCallout>

      {/* Data Card Example */}
      <h3 className="label-tech text-slate-500 mb-4">DATA CARDS</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
        </div>

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

      {/* Badges */}
      <h3 className="label-tech text-slate-500 mb-4">BADGES & STATUS</h3>
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
        <p className="text-sm text-muted-foreground border-t border-border pt-4 mt-4">
          Badges use JetBrains Mono, uppercase, short labels. They communicate state, not emotion.
        </p>
      </div>
    </section>
  );
};

export default InterfaceKit;
