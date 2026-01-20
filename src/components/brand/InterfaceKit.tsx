import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCallout } from "./BrandCallout";
import { ChartExamples } from "./ChartExamples";
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

      {/* Chart Examples */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">00</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Data Visualization</h3>
        </div>
        <ChartExamples />
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

          {/* Industrial Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
            <div className="md:w-40 shrink-0">
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Industrial</span>
              <p className="text-xs text-muted-foreground mt-1">Solid aesthetic</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="obsidian">
                <Zap className="w-4 h-4" />
                Obsidian
              </Button>
              <Button variant="obsidian-outline">
                Obsidian Outline
              </Button>
              <Button variant="gradient">
                Gradient
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
              <Button variant="gradient" size="lg">
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
        
        <div className="flex flex-col md:flex-row md:items-center gap-6">
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

        <p className="text-muted-foreground max-w-xl mt-8">
          Segmented controls for mode switching. Uses Instrument Sans with standard 
          rounded corners for improved usability.
        </p>
      </div>

      {/* Metric Tiles Showcase - One of each variant */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Metric Tiles</h3>
        </div>
        
        <div className="flex flex-wrap gap-5 mb-8">
          <MetricTile 
            variant="obsidian" 
            value="1.4502" 
            unit="g/L" 
            label="Density" 
            status="live"
            trend="up"
            trendValue="+2.3% from avg"
          />
          <MetricTile 
            variant="primary" 
            value="98.2" 
            unit="%" 
            label="Efficiency" 
            status="stable"
            trend="up"
            trendValue="+5.1%"
          />
          <MetricTile 
            variant="outline" 
            value="4.2" 
            unit="bar" 
            label="Pressure" 
            status="warning"
            trend="down"
            trendValue="-0.8 bar"
          />
          {/* Glass variant on gradient background */}
          <div className="relative rounded-xl overflow-hidden min-w-[200px]">
            <div className="absolute inset-0 bg-brand-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/10 via-transparent to-transparent" />
            <div className="relative p-0">
              <MetricTile 
                variant="glass" 
                value="94.7" 
                unit="%" 
                label="Uptime" 
                status="live"
                trend="up"
                trendValue="+0.3% this week"
              />
            </div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-xl">
          Four metric tile variants: obsidian (dark premium), primary (brand accent), 
          outline (subtle), and glass (for gradient backgrounds).
        </p>
      </div>

      {/* Progress Indicators Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">04</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Progress Indicators</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
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

        <p className="text-muted-foreground max-w-xl">
          Linear progress bars for operational dashboards. 
          All variants support animated value transitions.
        </p>
      </div>

      {/* Badges Showcase */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">05</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Status Badges</h3>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <span className="px-3 py-1.5 bg-primary text-primary-foreground font-data text-xs uppercase tracking-wide rounded-full">
            Active
          </span>
          <span className="px-3 py-1.5 bg-eco-surface text-primary font-data text-xs uppercase tracking-wide rounded-full border border-eco-border">
            Eco Pack
          </span>
          <span className="px-3 py-1.5 bg-muted text-muted-foreground font-data text-xs uppercase tracking-wide rounded-full border border-border">
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
          <span className="font-data text-sm text-primary uppercase tracking-wider">06</span>
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