import { MetricTile } from "@/components/ui/metric-tile";
import { LinearProgress, RadialGauge } from "@/components/ui/chamfered-progress";
import { ChamferedTabs, ChamferedTabsList, ChamferedTabsTrigger, ChamferedTabsContent } from "@/components/ui/chamfered-tabs";
import { Button } from "@/components/ui/button";
import { Activity, Droplets, Gauge, Settings, TrendingUp, Waves } from "lucide-react";

const ChamferTest = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-ui text-2xl font-semibold text-foreground">SDM-ECO Dashboard</h1>
            <p className="text-muted-foreground font-data text-sm">Real-time slurry density monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="[clip-path:var(--chamfer-btn)]">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="[clip-path:var(--chamfer-btn)]">
              Export Data
            </Button>
          </div>
        </div>

        {/* Metric Tiles Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricTile 
            variant="obsidian" 
            value="1.42" 
            unit="g/cm³" 
            label="Density" 
            status="live" 
          />
          <MetricTile 
            variant="obsidian" 
            value="23.5" 
            unit="m/s" 
            label="Flow Rate" 
            status="stable" 
          />
          <MetricTile 
            variant="primary" 
            value="98.2" 
            unit="%" 
            label="Efficiency" 
            status="stable" 
          />
          <MetricTile 
            variant="outline" 
            value="4.2" 
            unit="bar" 
            label="Pressure" 
            status="warning" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Panel - Process Status */}
          <div className="md:col-span-2 space-y-6">
            {/* Tabs Section */}
            <div className="bg-card border border-border rounded-lg p-6 [clip-path:var(--chamfer-lg)]">
              <ChamferedTabs defaultValue="overview" variant="obsidian">
                <ChamferedTabsList>
                  <ChamferedTabsTrigger value="overview">Overview</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="analytics">Analytics</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="history">History</ChamferedTabsTrigger>
                </ChamferedTabsList>
                <ChamferedTabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <LinearProgress variant="obsidian" value={78} label="Inlet Density" />
                      <LinearProgress variant="obsidian" value={65} label="Outlet Density" />
                      <LinearProgress variant="primary" value={92} label="Accuracy" />
                    </div>
                    <div className="space-y-3">
                      <LinearProgress variant="outline" value={45} label="Buffer Level" />
                      <LinearProgress variant="outline" value={88} label="Signal Strength" />
                      <LinearProgress variant="outline" value={34} label="Calibration" />
                    </div>
                  </div>
                </ChamferedTabsContent>
                <ChamferedTabsContent value="analytics">
                  <p className="text-muted-foreground py-8 text-center">Analytics data visualization</p>
                </ChamferedTabsContent>
                <ChamferedTabsContent value="history">
                  <p className="text-muted-foreground py-8 text-center">Historical records</p>
                </ChamferedTabsContent>
              </ChamferedTabs>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <MetricTile 
                variant="outline" 
                size="compact"
                value="156" 
                unit="kHz" 
                label="Frequency" 
              />
              <MetricTile 
                variant="outline" 
                size="compact"
                value="24.8" 
                unit="°C" 
                label="Temperature" 
              />
              <MetricTile 
                variant="outline" 
                size="compact"
                value="1.02" 
                unit="mS" 
                label="Transit Time" 
              />
            </div>
          </div>

          {/* Right Panel - Gauges */}
          <div className="space-y-6">
            {/* Primary Gauge Card */}
            <div className="bg-rho-obsidian text-slate-100 p-6 [clip-path:var(--chamfer-lg)]">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="w-4 h-4 text-primary" />
                <span className="font-data text-xs uppercase tracking-wider opacity-70">Process Status</span>
              </div>
              <div className="flex justify-center gap-6 py-4">
                <RadialGauge variant="primary" size="lg" value={78} label="Inlet" />
                <RadialGauge variant="primary" size="lg" value={92} label="Outlet" />
              </div>
            </div>

            {/* Secondary Gauges */}
            <div className="bg-card border border-border p-6 [clip-path:var(--chamfer-lg)]">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">System Health</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <RadialGauge variant="obsidian" size="default" value={95} label="CPU" />
                <RadialGauge variant="obsidian" size="default" value={67} label="MEM" />
                <RadialGauge variant="obsidian" size="default" value={82} label="NET" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start [clip-path:var(--chamfer-btn)]">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Trends
              </Button>
              <Button variant="outline" className="w-full justify-start [clip-path:var(--chamfer-btn)]">
                <Droplets className="w-4 h-4 mr-2" />
                Calibrate Sensor
              </Button>
              <Button variant="outline" className="w-full justify-start [clip-path:var(--chamfer-btn)]">
                <Gauge className="w-4 h-4 mr-2" />
                Diagnostics
              </Button>
            </div>
          </div>
        </div>

        {/* Variant Comparison */}
        <div className="border-t border-border pt-8 mt-8">
          <h2 className="font-ui text-lg font-medium mb-4">Variant Comparison</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Obsidian */}
            <div className="space-y-4">
              <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Obsidian</span>
              <MetricTile variant="obsidian" value="1.42" unit="g/cm³" label="Density" status="live" />
              <ChamferedTabs defaultValue="a" variant="obsidian">
                <ChamferedTabsList>
                  <ChamferedTabsTrigger value="a">Tab A</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="b">Tab B</ChamferedTabsTrigger>
                </ChamferedTabsList>
              </ChamferedTabs>
              <LinearProgress variant="obsidian" value={75} label="Progress" />
            </div>
            
            {/* Primary */}
            <div className="space-y-4">
              <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Primary</span>
              <MetricTile variant="primary" value="98.2" unit="%" label="Efficiency" status="stable" />
              <ChamferedTabs defaultValue="a" variant="primary">
                <ChamferedTabsList>
                  <ChamferedTabsTrigger value="a">Tab A</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="b">Tab B</ChamferedTabsTrigger>
                </ChamferedTabsList>
              </ChamferedTabs>
              <LinearProgress variant="primary" value={75} label="Progress" />
            </div>
            
            {/* Outline */}
            <div className="space-y-4">
              <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Outline</span>
              <MetricTile variant="outline" value="4.2" unit="bar" label="Pressure" status="warning" />
              <ChamferedTabs defaultValue="a" variant="outline">
                <ChamferedTabsList>
                  <ChamferedTabsTrigger value="a">Tab A</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="b">Tab B</ChamferedTabsTrigger>
                </ChamferedTabsList>
              </ChamferedTabs>
              <LinearProgress variant="outline" value={75} label="Progress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChamferTest;
