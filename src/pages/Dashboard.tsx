import { useState } from "react";
import { 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  Bell, 
  ChevronRight, 
  Droplets, 
  Gauge, 
  History, 
  LayoutDashboard, 
  Radio, 
  Settings, 
  TrendingUp,
  Waves, 
  Zap 
} from "lucide-react";
import { Link } from "react-router-dom";
import { MetricTile } from "@/components/ui/metric-tile";
import { Button } from "@/components/ui/button";
import { ChamferedTabs, ChamferedTabsList, ChamferedTabsTrigger } from "@/components/ui/chamfered-tabs";
import { GlassChart } from "@/components/ui/glass-chart";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* Gradient Background Layer */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-500">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          </>
        )}
        {/* Industrial grid pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0V0zm1 1v58h58V1H1z' fill='${isDark ? '%23ffffff' : '%23000000'}' fill-opacity='1'/%3E%3C/svg%3E")`
          }} 
        />
      </div>

      {/* Header */}
      <header className={`relative z-10 border-b transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <span className={`font-logo text-lg tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>RHOSONICS</span>
              </Link>
              <div className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                <LayoutDashboard className="w-4 h-4 text-primary" />
                <span className={`font-data text-xs uppercase tracking-wide ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Control Center</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
              
              <ChamferedTabs variant={isDark ? "obsidian" : "outline"} defaultValue="live" className="hidden lg:block">
                <ChamferedTabsList>
                  <ChamferedTabsTrigger value="live">Live</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="historical">Historical</ChamferedTabsTrigger>
                  <ChamferedTabsTrigger value="reports">Reports</ChamferedTabsTrigger>
                </ChamferedTabsList>
              </ChamferedTabs>

              <button className={`relative w-10 h-10 backdrop-blur-md rounded-lg border flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                <Bell className={`w-5 h-5 ${isDark ? 'text-white/70' : 'text-slate-600'}`} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-data text-[10px] text-white">2</span>
                </span>
              </button>
              
              <button className={`w-10 h-10 backdrop-blur-md rounded-lg border flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                <Settings className={`w-5 h-5 ${isDark ? 'text-white/70' : 'text-slate-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-6 py-8">
        
        {/* Status Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-ui text-2xl md:text-3xl font-bold text-white mb-2">Process Overview</h1>
            <p className="text-white/50 text-sm">Real-time monitoring across all connected sensors</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-data text-xs text-primary uppercase tracking-wide">System Online</span>
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="font-data text-xs text-white/60 uppercase tracking-wide">Last sync: 2s ago</span>
            </div>
          </div>
        </div>

        {/* Primary Metrics - Glass on gradient */}
        <section className="mb-8">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Rich gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-green-700 to-emerald-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-black/20" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px]" />
            
            <div className="relative p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-ui text-lg font-semibold text-white">Primary Measurements</h2>
                <button className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-ui transition-colors">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricTile 
                  variant="glass" 
                  value="1.4502" 
                  unit="g/L" 
                  label="Density" 
                  status="live"
                  trend="up"
                  trendValue="+0.8% from target"
                />
                <MetricTile 
                  variant="glass" 
                  value="847" 
                  unit="m³/h" 
                  label="Flow Rate" 
                  status="stable"
                />
                <MetricTile 
                  variant="glass" 
                  value="12.4" 
                  unit="%" 
                  label="Solids Content"
                  trend="neutral"
                  trendValue="Within range"
                />
                <MetricTile 
                  variant="glass" 
                  value="23.8" 
                  unit="°C" 
                  label="Temperature"
                  status="stable"
                  trend="up"
                  trendValue="+1.2°C"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left Column - Sensor Cards (Solid Industrial) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Solid Industrial Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-ui font-semibold text-white">Active Sensors</h3>
                </div>
                <span className="font-data text-xs text-white/50 uppercase tracking-wide">12 Connected</span>
              </div>
              
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Sensor Item - Solid */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-data text-xs text-white/50 uppercase tracking-wide">SDM ECO #01</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="font-data text-[10px] text-primary uppercase">Online</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-data text-2xl text-white font-bold">1.4502</span>
                      <span className="font-data text-sm text-white/50">g/L</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-primary rounded-full" />
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-data text-xs text-white/50 uppercase tracking-wide">SDM ECO #02</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="font-data text-[10px] text-primary uppercase">Online</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-data text-2xl text-white font-bold">1.3847</span>
                      <span className="font-data text-sm text-white/50">g/L</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-primary rounded-full" />
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-data text-xs text-white/50 uppercase tracking-wide">SDM ECO #03</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                        <span className="font-data text-[10px] text-warning uppercase">Calibrating</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-data text-2xl text-white/50 font-bold">--</span>
                      <span className="font-data text-sm text-white/30">g/L</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-slate-500 rounded-full" />
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-data text-xs text-white/50 uppercase tracking-wide">SDM ECO #04</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="font-data text-[10px] text-primary uppercase">Online</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-data text-2xl text-white font-bold">1.5021</span>
                      <span className="font-data text-sm text-white/50">g/L</span>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[88%] bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Flow - Mixed Glass + Solid */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-ui font-semibold text-white">Process Pipeline</h3>
                  <ChamferedTabs variant="outline" defaultValue="main">
                    <ChamferedTabsList>
                      <ChamferedTabsTrigger value="main">Main</ChamferedTabsTrigger>
                      <ChamferedTabsTrigger value="bypass">Bypass</ChamferedTabsTrigger>
                    </ChamferedTabsList>
                  </ChamferedTabs>
                </div>

                {/* Pipeline visualization */}
                <div className="flex items-center gap-4 overflow-x-auto pb-4">
                  {/* Intake */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[140px] shrink-0">
                    <Droplets className="w-5 h-5 text-primary mb-2" />
                    <span className="font-data text-xs text-white/50 uppercase block mb-1">Intake</span>
                    <span className="font-data text-lg text-white font-bold">847</span>
                    <span className="font-data text-xs text-white/50 ml-1">m³/h</span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-white/30 shrink-0" />
                  
                  {/* Measurement */}
                  <div className="bg-gradient-to-br from-primary/20 to-emerald-600/20 backdrop-blur-xl border border-primary/30 rounded-xl p-4 min-w-[140px] shrink-0">
                    <Gauge className="w-5 h-5 text-primary mb-2" />
                    <span className="font-data text-xs text-white/50 uppercase block mb-1">Density</span>
                    <span className="font-data text-lg text-white font-bold">1.45</span>
                    <span className="font-data text-xs text-white/50 ml-1">g/L</span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-white/30 shrink-0" />
                  
                  {/* Processing */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[140px] shrink-0">
                    <Activity className="w-5 h-5 text-emerald-400 mb-2" />
                    <span className="font-data text-xs text-white/50 uppercase block mb-1">Process</span>
                    <span className="font-data text-lg text-white font-bold">98.7</span>
                    <span className="font-data text-xs text-white/50 ml-1">%</span>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-white/30 shrink-0" />
                  
                  {/* Output */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[140px] shrink-0">
                    <TrendingUp className="w-5 h-5 text-white/70 mb-2" />
                    <span className="font-data text-xs text-white/50 uppercase block mb-1">Output</span>
                    <span className="font-data text-lg text-white font-bold">832</span>
                    <span className="font-data text-xs text-white/50 ml-1">m³/h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Trends Chart */}
            <GlassChart title="Historical Sensor Data" isDark={isDark} />
          </div>

          {/* Right Column - System Status */}
          <div className="space-y-6">
            
            {/* System Health - Glass Card */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
              
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-white">System Health</h3>
                    <p className="text-xs text-white/50">All systems operational</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">CPU Load</span>
                    <span className="font-data text-sm text-white">23%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[23%] bg-primary rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Memory</span>
                    <span className="font-data text-sm text-white">67%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[67%] bg-slate-300 rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Storage</span>
                    <span className="font-data text-sm text-white">41%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[41%] bg-white/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts - Solid Industrial */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-ui font-semibold text-white">Alerts</h3>
                <span className="px-2 py-1 bg-warning/20 rounded text-warning font-data text-xs">2 Active</span>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white font-medium">Sensor #03 Calibrating</p>
                    <p className="text-xs text-white/50 mt-1">Estimated: 4 min remaining</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <History className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white/70">Scheduled maintenance</p>
                    <p className="text-xs text-white/50 mt-1">Tomorrow at 02:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button variant="chamfer" size="chamfer-default" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Configure Sensors
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <Button variant="chamfer-outline" size="chamfer-default" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  View History
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Secondary Metrics */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-ui text-lg font-semibold text-white">Secondary Measurements</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="4.2" 
              unit="bar" 
              label="Pressure" 
            />
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="1,247" 
              label="Cycles" 
            />
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="0.02" 
              unit="%" 
              label="Variance" 
            />
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="99.2" 
              unit="%" 
              label="Uptime"
              status="stable"
            />
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="3.2" 
              unit="ms" 
              label="Latency" 
            />
            <MetricTile 
              variant="obsidian" 
              size="compact"
              value="47.2" 
              unit="kW" 
              label="Power"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span className="font-data uppercase tracking-wide">Rhosonics Control Center v2.4.1</span>
            <Link to="/" className="hover:text-white transition-colors">← Back to Brand Guidelines</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
