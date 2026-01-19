import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCallout } from "./BrandCallout";
import { SDMEcoDevice } from "./SDMEcoDevice";
import { ChamferedTabs, ChamferedTabsList, ChamferedTabsTrigger } from "@/components/ui/chamfered-tabs";
import { MetricTile } from "@/components/ui/metric-tile";
import { LinearProgress } from "@/components/ui/chamfered-progress";

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

      {/* SDM ECO Device Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">00</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">SDM ECO Device</h3>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SDMEcoDevice />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              The SDM ECO hardware interface demonstrates our core design principles in physical form. 
              The display prioritizes <span className="text-foreground font-medium">data legibility</span> with 
              clear hierarchy between primary and secondary measurements.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="font-data text-xs text-primary">01</span>
                </div>
                <div>
                  <h4 className="font-ui font-semibold text-foreground mb-1">Status Bar</h4>
                  <p className="text-sm text-muted-foreground">Brand gradient with timestamp and menu access</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="font-data text-xs text-primary">02</span>
                </div>
                <div>
                  <h4 className="font-ui font-semibold text-foreground mb-1">Data Display</h4>
                  <p className="text-sm text-muted-foreground">Large numerals readable from distance, JetBrains Mono for precision</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="font-data text-xs text-primary">03</span>
                </div>
                <div>
                  <h4 className="font-ui font-semibold text-foreground mb-1">Physical Controls</h4>
                  <p className="text-sm text-muted-foreground">Tactile buttons with clear directional hierarchy and confirm action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Segmented Controls Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Segmented Controls</h3>
        </div>
        
        <div className="space-y-12">
          {/* Obsidian Variant */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Obsidian</span>
              <p className="text-xs text-muted-foreground mt-1">Dark industrial</p>
            </div>
            <ChamferedTabs variant="obsidian" defaultValue="live">
              <ChamferedTabsList>
                <ChamferedTabsTrigger value="live">Live</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="historical">Historical</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="settings">Settings</ChamferedTabsTrigger>
              </ChamferedTabsList>
            </ChamferedTabs>
          </div>

          {/* Primary Variant */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Primary</span>
              <p className="text-xs text-muted-foreground mt-1">Brand accent</p>
            </div>
            <ChamferedTabs variant="primary" defaultValue="density">
              <ChamferedTabsList>
                <ChamferedTabsTrigger value="density">Density</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="velocity">Velocity</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="temperature">Temp</ChamferedTabsTrigger>
              </ChamferedTabsList>
            </ChamferedTabs>
          </div>

          {/* Outline Variant */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Outline</span>
              <p className="text-xs text-muted-foreground mt-1">Minimal border</p>
            </div>
            <ChamferedTabs variant="outline" defaultValue="day">
              <ChamferedTabsList>
                <ChamferedTabsTrigger value="hour">1H</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="day">24H</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="week">7D</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="month">30D</ChamferedTabsTrigger>
              </ChamferedTabsList>
            </ChamferedTabs>
          </div>
        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Industrial segmented controls for mode switching. Uses JetBrains Mono uppercase 
          with chamfered edges matching the button system.
        </p>
      </div>


      {/* Metric Tiles Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">04</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Metric Tiles</h3>
        </div>
        
        <div className="space-y-12">
          {/* Obsidian Variant */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Obsidian</span>
              <p className="text-xs text-muted-foreground mt-1">Dark industrial for dashboards</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <MetricTile 
                variant="obsidian" 
                value="1.4502" 
                unit="g/L" 
                label="Density" 
                status="live" 
              />
              <MetricTile 
                variant="obsidian" 
                value="12.4" 
                unit="%" 
                label="Solids" 
                status="stable" 
              />
              <MetricTile 
                variant="obsidian" 
                value="23.8" 
                unit="°C" 
                label="Temp" 
              />
            </div>
          </div>

          {/* Primary Variant */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Primary</span>
              <p className="text-xs text-muted-foreground mt-1">Brand accent for highlights</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <MetricTile 
                variant="primary" 
                value="98.2" 
                unit="%" 
                label="Efficiency" 
                status="stable" 
              />
              <MetricTile 
                variant="primary" 
                value="847" 
                unit="m³/h" 
                label="Flow Rate" 
              />
            </div>
          </div>

          {/* Outline Variant */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Outline</span>
              <p className="text-xs text-muted-foreground mt-1">Subtle for dense layouts</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <MetricTile 
                variant="outline" 
                value="4.2" 
                unit="bar" 
                label="Pressure" 
                status="warning" 
              />
              <MetricTile 
                variant="outline" 
                value="1,247" 
                label="Cycles" 
              />
              <MetricTile 
                variant="outline" 
                value="0.02" 
                unit="%" 
                label="Variance" 
                status="error" 
              />
            </div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Compact chamfered tiles for dashboard grids. Large numerals ensure readability, 
          optional status indicators provide at-a-glance operational context.
        </p>
      </div>

      {/* Progress Indicators Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">05</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Progress Indicators</h3>
        </div>
        
        <div className="space-y-12">
          {/* Linear Progress */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Linear Bars</span>
              <p className="text-xs text-muted-foreground mt-1">Chamfered ends for industrial aesthetic</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <LinearProgress 
                variant="obsidian" 
                value={72} 
                label="Density" 
                showValue 
              />
              <LinearProgress 
                variant="primary" 
                value={45} 
                label="Capacity" 
                showValue 
              />
              <LinearProgress 
                variant="outline" 
                value={88} 
                label="Efficiency" 
                showValue 
              />
            </div>
          </div>

        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Linear progress bars for operational dashboards. 
          All variants support animated value transitions.
        </p>
      </div>

      {/* Badges Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">06</span>
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

      {/* Callouts Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">07</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Callouts</h3>
        </div>

        <div className="space-y-6">
          <BrandCallout variant="info" title="Guidance & Context">
            Use info callouts for general guidance, tips, best practices, or key insights that help users understand a concept or process.
          </BrandCallout>

          <BrandCallout variant="avoid" title="Avoid This Pattern">
            Warning callouts signal what not to do. Always pair with a clear rationale so users understand why it matters.
          </BrandCallout>

          <BrandCallout variant="best" title="Best Practice">
            Success callouts highlight recommended approaches and proven patterns that lead to optimal outcomes.
          </BrandCallout>

          <BrandCallout variant="error" title="Critical Error">
            Error callouts communicate system failures, critical issues, or blocking conditions that require immediate attention.
          </BrandCallout>
        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Four variants map to clear intent: neutral guidance (info), explicit warnings (avoid), recommendations (best), and critical errors (error).
        </p>
      </div>
    </section>
  );
};

export default InterfaceKit;
