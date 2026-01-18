import { Activity, Droplets, Gauge, Settings, TrendingUp, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              Export Data
            </Button>
          </div>
        </div>

        {/* Metric Tiles Row - Standard rounded, no chamfer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-rho-obsidian text-slate-100 p-4 rounded-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-data text-xs uppercase tracking-wider opacity-70">Density</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-data text-[10px] uppercase tracking-wide opacity-70">live</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl tracking-tight">1.42</span>
              <span className="font-data text-sm opacity-70">g/cm³</span>
            </div>
          </div>
          <div className="bg-rho-obsidian text-slate-100 p-4 rounded-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-data text-xs uppercase tracking-wider opacity-70">Flow Rate</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="font-data text-[10px] uppercase tracking-wide opacity-70">stable</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl tracking-tight">23.5</span>
              <span className="font-data text-sm opacity-70">m/s</span>
            </div>
          </div>
          <div className="bg-primary text-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-data text-xs uppercase tracking-wider opacity-70">Efficiency</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                <span className="font-data text-[10px] uppercase tracking-wide opacity-70">stable</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl tracking-tight">98.2</span>
              <span className="font-data text-sm opacity-70">%</span>
            </div>
          </div>
          <div className="bg-card border-2 border-border p-4 rounded-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Pressure</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-warning" />
                <span className="font-data text-[10px] uppercase tracking-wide text-warning">warning</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-ui font-medium text-3xl tracking-tight text-foreground">4.2</span>
              <span className="font-data text-sm text-muted-foreground">bar</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Panel - Process Status - CHAMFERED CONTAINER */}
          <div className="md:col-span-2 space-y-6">
            {/* Tabs Section - Large container gets chamfer */}
            <div className="bg-card border border-border p-6 [clip-path:var(--chamfer-lg)]">
              <Tabs defaultValue="overview">
                <TabsList className="bg-muted">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Inlet Density</span>
                          <span className="font-data text-xs">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Outlet Density</span>
                          <span className="font-data text-xs">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Accuracy</span>
                          <span className="font-data text-xs">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Buffer Level</span>
                          <span className="font-data text-xs">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Signal Strength</span>
                          <span className="font-data text-xs">88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Calibration</span>
                          <span className="font-data text-xs">34%</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <p className="text-muted-foreground py-8 text-center">Analytics data visualization</p>
                </TabsContent>
                <TabsContent value="history">
                  <p className="text-muted-foreground py-8 text-center">Historical records</p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Secondary Metrics - Standard rounded */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border p-3 rounded-lg">
                <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Frequency</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-ui font-medium text-xl tracking-tight">156</span>
                  <span className="font-data text-xs text-muted-foreground">kHz</span>
                </div>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg">
                <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Temperature</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-ui font-medium text-xl tracking-tight">24.8</span>
                  <span className="font-data text-xs text-muted-foreground">°C</span>
                </div>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg">
                <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">Transit Time</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-ui font-medium text-xl tracking-tight">1.02</span>
                  <span className="font-data text-xs text-muted-foreground">mS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Gauges */}
          <div className="space-y-6">
            {/* Primary Gauge Card - CHAMFERED */}
            <div className="bg-rho-obsidian text-slate-100 p-6 [clip-path:var(--chamfer-lg)]">
              <div className="flex items-center gap-2 mb-4">
                <Waves className="w-4 h-4 text-primary" />
                <span className="font-data text-xs uppercase tracking-wider opacity-70">Process Status</span>
              </div>
              <div className="flex justify-center gap-8 py-4">
                {/* Simple circular gauges with rounded styling */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" 
                        strokeDasharray={`${78 * 0.942} 94.2`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-ui font-medium text-lg">78%</span>
                    </div>
                  </div>
                  <span className="font-data text-xs uppercase tracking-wider opacity-70">Inlet</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" 
                        strokeDasharray={`${92 * 0.942} 94.2`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-ui font-medium text-lg">92%</span>
                    </div>
                  </div>
                  <span className="font-data text-xs uppercase tracking-wider opacity-70">Outlet</span>
                </div>
              </div>
            </div>

            {/* Secondary Gauges - CHAMFERED */}
            <div className="bg-card border border-border p-6 [clip-path:var(--chamfer-lg)]">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="font-data text-xs uppercase tracking-wider text-muted-foreground">System Health</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "CPU", value: 95 },
                  { label: "MEM", value: 67 },
                  { label: "NET", value: 82 },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div className="relative w-14 h-14">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--rho-obsidian))" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" 
                          strokeDasharray={`${item.value * 0.942} 94.2`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-data text-xs font-medium">{item.value}%</span>
                      </div>
                    </div>
                    <span className="font-data text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Standard buttons */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Trends
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Droplets className="w-4 h-4 mr-2" />
                Calibrate Sensor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Gauge className="w-4 h-4 mr-2" />
                Diagnostics
              </Button>
            </div>
          </div>
        </div>

        {/* Design Note */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="bg-muted/50 border border-border rounded-lg p-6">
            <h2 className="font-ui text-lg font-medium mb-2">Option A: Selective Chamfers</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Chamfers are applied only to <strong>large container panels</strong> (the main content cards). 
              Smaller elements like buttons, tabs, progress bars, and compact metric tiles use standard rounded corners. 
              This creates signature moments without visual noise.
            </p>
            <div className="mt-4 flex gap-4 text-xs font-data uppercase tracking-wider">
              <span className="text-primary">✓ Chamfered: Main panels, hero cards</span>
              <span className="text-muted-foreground">○ Rounded: Buttons, tabs, badges, inputs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChamferTest;
