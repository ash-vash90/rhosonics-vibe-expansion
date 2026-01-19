import { ArrowRight, Zap, Activity, Bell, ChevronRight, Gauge, Radio, Settings, Shield, Waves } from "lucide-react";
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
          <span className="font-data text-sm text-primary uppercase tracking-wider">03</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Metric Tiles</h3>
        </div>
        
        <div className="space-y-12">
          {/* Obsidian Variant */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Obsidian</span>
              <p className="text-xs text-muted-foreground mt-1">Premium dark variant for control room dashboards</p>
            </div>
            <div className="flex flex-wrap gap-5">
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
                trend="neutral"
                trendValue="Stable"
              />
            </div>
          </div>

          {/* Primary Variant */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Primary</span>
              <p className="text-xs text-muted-foreground mt-1">Brand accent for key performance indicators</p>
            </div>
            <div className="flex flex-wrap gap-5">
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
                variant="primary" 
                value="847" 
                unit="m³/h" 
                label="Flow Rate" 
              />
            </div>
          </div>

          {/* Outline Variant */}
          <div className="flex flex-col gap-6 pb-8 border-b border-border">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Outline</span>
              <p className="text-xs text-muted-foreground mt-1">Subtle variant for dense data layouts</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <MetricTile 
                variant="outline" 
                value="4.2" 
                unit="bar" 
                label="Pressure" 
                status="warning"
                trend="down"
                trendValue="-0.8 bar"
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

          {/* Glass Variant - Expanded Showcase */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-data text-xs text-muted-foreground uppercase tracking-wide">Glass</span>
              <p className="text-xs text-muted-foreground mt-1">Frosted glass for overlay contexts and immersive dashboards</p>
            </div>
            
            {/* Primary gradient background */}
            <div className="relative p-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-green-600 to-emerald-700" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <MetricTile 
                  variant="glass" 
                  value="94.7" 
                  unit="%" 
                  label="Uptime" 
                  status="live"
                  trend="up"
                  trendValue="+0.3% this week"
                />
                <MetricTile 
                  variant="glass" 
                  value="3.2" 
                  unit="ms" 
                  label="Latency"
                  trend="down"
                  trendValue="-12% improved"
                />
                <MetricTile 
                  variant="glass" 
                  value="1.4M" 
                  label="Samples" 
                  status="stable"
                />
                <MetricTile 
                  variant="glass" 
                  value="847" 
                  unit="m³/h" 
                  label="Throughput"
                  trend="neutral"
                  trendValue="Within range"
                />
              </div>
            </div>

            {/* Dark slate gradient background */}
            <div className="relative p-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff' fill-opacity='.08'/%3E%3C/svg%3E")`
              }} />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <MetricTile 
                  variant="glass" 
                  value="23.8" 
                  unit="°C" 
                  label="Process Temp"
                  status="stable"
                  trend="up"
                  trendValue="+1.2°C"
                />
                <MetricTile 
                  variant="glass" 
                  value="4.21" 
                  unit="bar" 
                  label="Pressure"
                  status="warning"
                  trend="down"
                  trendValue="-0.4 bar"
                />
                <MetricTile 
                  variant="glass" 
                  value="99.2" 
                  unit="%" 
                  label="Purity"
                  status="live"
                />
              </div>
            </div>

            {/* Mixed gradient with mesh effect */}
            <div className="relative p-10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-emerald-900/50 to-slate-800" />
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <MetricTile 
                  variant="glass" 
                  value="12.4" 
                  unit="%" 
                  label="Solids Content"
                  status="stable"
                />
                <MetricTile 
                  variant="glass" 
                  value="1.502" 
                  unit="g/L" 
                  label="Density"
                  status="live"
                  trend="up"
                  trendValue="+0.8%"
                />
                <MetricTile 
                  variant="glass" 
                  value="2,847" 
                  label="Active Sensors"
                  trend="up"
                  trendValue="+12 online"
                />
                <MetricTile 
                  variant="glass" 
                  value="0.02" 
                  unit="%" 
                  label="Error Rate"
                  status="stable"
                  trend="down"
                  trendValue="-0.01%"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Premium metric tiles with gradient depth, status glow effects, and optional trend indicators. 
          Designed for instant readability at any distance.
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

      {/* Glass & Gradient Elements */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-data text-sm text-primary uppercase tracking-wider">08</span>
          <h3 className="font-ui text-2xl font-semibold text-foreground">Glass & Gradient Elements</h3>
        </div>
        
        <p className="text-muted-foreground max-w-3xl mb-12">
          Premium glass-morphism and gradient components for immersive, modern interfaces. 
          These elements create depth and visual hierarchy through transparency and layered effects.
        </p>

        {/* Full showcase with gradient background */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Rich gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-emerald-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
          
          <div className="relative p-8 md:p-12 space-y-12">
            
            {/* Glass Cards Row */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Cards</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Card */}
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                      <Waves className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-ui text-lg font-semibold text-white mb-2">Ultrasonic Sensing</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Non-invasive measurement through pipe walls with zero process contact.</p>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-data text-xs text-white/50 uppercase tracking-wide">System Health</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-data text-xs text-primary uppercase">Online</span>
                      </div>
                    </div>
                    <div className="text-4xl font-ui font-bold text-white mb-1">98.7%</div>
                    <p className="text-sm text-white/50">Operational efficiency</p>
                    <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[98.7%] bg-gradient-to-r from-primary to-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Action Card */}
                <div className="group relative bg-gradient-to-br from-primary/20 to-emerald-600/20 backdrop-blur-xl border border-primary/30 rounded-xl p-6 hover:from-primary/30 hover:to-emerald-600/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-ui text-lg font-semibold text-white mb-2">Configure System</h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">Adjust sensor parameters and calibration settings.</p>
                    <div className="flex items-center gap-2 text-primary font-ui text-sm font-medium group-hover:gap-3 transition-all">
                      Open Settings <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Buttons & Inputs */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Buttons & Controls</span>
              <div className="flex flex-wrap gap-4">
                {/* Primary Glass Button */}
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white font-ui font-medium rounded-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                  Primary Action
                </button>
                
                {/* Glass Button */}
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-ui font-medium rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  Glass Button
                </button>
                
                {/* Outline Glass */}
                <button className="px-6 py-3 bg-transparent text-white font-ui font-medium rounded-lg border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  Outline
                </button>

                {/* Icon Button */}
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  <Bell className="w-5 h-5 text-white" />
                </button>
                
                {/* Icon Button with badge */}
                <button className="relative w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  <Activity className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="font-data text-[10px] text-white">3</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Glass Input Fields */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Inputs</span>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Text Input */}
                <div className="space-y-2">
                  <label className="font-data text-xs text-white/50 uppercase tracking-wide">Sensor ID</label>
                  <input 
                    type="text" 
                    placeholder="Enter sensor ID..."
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder:text-white/30 font-ui focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>
                
                {/* Select-like Input */}
                <div className="space-y-2">
                  <label className="font-data text-xs text-white/50 uppercase tracking-wide">Measurement Type</label>
                  <div className="relative">
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white font-ui flex items-center justify-between cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
                      <span>Density</span>
                      <ChevronRight className="w-4 h-4 text-white/50 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Search Input */}
                <div className="space-y-2">
                  <label className="font-data text-xs text-white/50 uppercase tracking-wide">Search</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search sensors..."
                      className="w-full pl-4 pr-12 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder:text-white/30 font-ui focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                      <Radio className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Tags & Badges */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Tags & Indicators</span>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full font-data text-xs text-white uppercase tracking-wide">
                  Ultrasonic
                </span>
                <span className="px-4 py-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full font-data text-xs text-primary uppercase tracking-wide">
                  Active
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-primary/20 to-emerald-500/20 backdrop-blur-md border border-primary/20 rounded-full font-data text-xs text-white uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Live Data
                </span>
                <span className="px-4 py-2 bg-warning/20 backdrop-blur-md border border-warning/30 rounded-full font-data text-xs text-warning uppercase tracking-wide">
                  Calibrating
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-full font-ui text-sm text-white flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  Verified
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-full font-ui text-sm text-white flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  847 m³/h
                </span>
              </div>
            </div>

            {/* Glass Navigation Pills */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Navigation</span>
              <div className="inline-flex bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-1.5">
                <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-emerald-600 text-white font-ui text-sm font-medium rounded-lg shadow-lg shadow-primary/20">
                  Overview
                </button>
                <button className="px-5 py-2.5 text-white/60 font-ui text-sm font-medium rounded-lg hover:text-white hover:bg-white/5 transition-all">
                  Analytics
                </button>
                <button className="px-5 py-2.5 text-white/60 font-ui text-sm font-medium rounded-lg hover:text-white hover:bg-white/5 transition-all">
                  Reports
                </button>
                <button className="px-5 py-2.5 text-white/60 font-ui text-sm font-medium rounded-lg hover:text-white hover:bg-white/5 transition-all">
                  Settings
                </button>
              </div>
            </div>

            {/* Glass Alert/Notification */}
            <div>
              <span className="font-data text-xs text-white/60 uppercase tracking-wide mb-6 block">Glass Notifications</span>
              <div className="space-y-4 max-w-2xl">
                {/* Success notification */}
                <div className="flex items-start gap-4 p-4 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-xl">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-ui font-semibold text-white mb-1">Calibration Complete</h4>
                    <p className="text-sm text-white/60">Sensor SDM-004 has been successfully calibrated. All readings are within tolerance.</p>
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors">×</button>
                </div>

                {/* Info notification */}
                <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-ui font-semibold text-white mb-1">System Update Available</h4>
                    <p className="text-sm text-white/60">Version 2.4.1 is ready to install. Includes performance improvements.</p>
                  </div>
                  <button className="px-4 py-1.5 bg-white/10 text-white font-ui text-sm rounded-lg hover:bg-white/20 transition-all">
                    Update
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <p className="text-muted-foreground max-w-xl mt-8">
          Glass elements work best on rich gradient or image backgrounds. Use backdrop blur and subtle borders 
          to create depth without competing with content.
        </p>
      </div>
    </section>
  );
};

export default InterfaceKit;
