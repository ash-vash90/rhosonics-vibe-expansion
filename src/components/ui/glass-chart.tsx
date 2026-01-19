import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChamferedTabs, ChamferedTabsList, ChamferedTabsTrigger } from "./chamfered-tabs";

// Sample data for different time ranges
const generateData = (hours: number) => {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      density: 1.4 + Math.random() * 0.15 - 0.05,
      flow: 800 + Math.random() * 100 - 30,
      temperature: 22 + Math.random() * 4,
    });
  }
  return data;
};

const data24h = generateData(24);
const data7d = generateData(168);
const data30d = generateData(720);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
  isDark?: boolean;
}

const CustomTooltip = ({ active, payload, label, isDark }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl border ${isDark ? 'border-white/20' : 'border-slate-200'} rounded-lg p-3 shadow-xl`}>
        <p className={`font-data text-xs ${isDark ? 'text-white/60' : 'text-slate-500'} uppercase tracking-wide mb-2`}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className={`font-data text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {entry.name}: <span className="font-bold">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface GlassChartProps {
  title?: string;
  className?: string;
  isDark?: boolean;
}

export const GlassChart = ({ title = "Historical Trends", className = "", isDark = true }: GlassChartProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [activeMetric, setActiveMetric] = useState<"density" | "flow" | "temperature">("density");

  const getData = () => {
    switch (timeRange) {
      case "7d": return data7d.filter((_, i) => i % 7 === 0);
      case "30d": return data30d.filter((_, i) => i % 24 === 0);
      default: return data24h;
    }
  };

  const metricConfig = {
    density: { 
      name: "Density", 
      unit: "g/L", 
      color: "hsl(125, 50%, 45%)", 
      gradientId: "densityGradient" 
    },
    flow: { 
      name: "Flow Rate", 
      unit: "m³/h", 
      color: "hsl(170, 60%, 45%)", 
      gradientId: "flowGradient" 
    },
    temperature: { 
      name: "Temperature", 
      unit: "°C", 
      color: "hsl(45, 90%, 50%)", 
      gradientId: "tempGradient" 
    },
  };

  const currentMetric = metricConfig[activeMetric];
  const chartData = getData();

  // Calculate stats
  const values = chartData.map(d => d[activeMetric]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {/* Background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        </>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`font-ui font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'} mt-1`}>Sensor data over time</p>
          </div>
          
          <div className="flex items-center gap-3">
            <ChamferedTabs 
              variant={isDark ? "obsidian" : "outline"} 
              value={timeRange} 
              onValueChange={(v) => setTimeRange(v as "24h" | "7d" | "30d")}
            >
              <ChamferedTabsList>
                <ChamferedTabsTrigger value="24h">24H</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="7d">7D</ChamferedTabsTrigger>
                <ChamferedTabsTrigger value="30d">30D</ChamferedTabsTrigger>
              </ChamferedTabsList>
            </ChamferedTabs>
          </div>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(metricConfig) as Array<keyof typeof metricConfig>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`px-4 py-2 rounded-full font-data text-xs uppercase tracking-wide transition-all ${
                activeMetric === key
                  ? isDark 
                    ? "bg-white/15 backdrop-blur-md border border-white/30 text-white"
                    : "bg-primary/10 border border-primary/30 text-primary"
                  : isDark
                    ? "bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                    : "bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              }`}
            >
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: metricConfig[key].color }}
              />
              {metricConfig[key].name}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-xl border rounded-xl p-4`}>
            <span className={`font-data text-xs ${isDark ? 'text-white/50' : 'text-slate-500'} uppercase tracking-wide block mb-1`}>Average</span>
            <span className={`font-data text-xl ${isDark ? 'text-white' : 'text-slate-900'} font-bold`}>{avg.toFixed(2)}</span>
            <span className={`font-data text-xs ${isDark ? 'text-white/40' : 'text-slate-400'} ml-1`}>{currentMetric.unit}</span>
          </div>
          <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-xl border rounded-xl p-4`}>
            <span className={`font-data text-xs ${isDark ? 'text-white/50' : 'text-slate-500'} uppercase tracking-wide block mb-1`}>Min</span>
            <span className={`font-data text-xl ${isDark ? 'text-white' : 'text-slate-900'} font-bold`}>{min.toFixed(2)}</span>
            <span className={`font-data text-xs ${isDark ? 'text-white/40' : 'text-slate-400'} ml-1`}>{currentMetric.unit}</span>
          </div>
          <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-xl border rounded-xl p-4`}>
            <span className={`font-data text-xs ${isDark ? 'text-white/50' : 'text-slate-500'} uppercase tracking-wide block mb-1`}>Max</span>
            <span className={`font-data text-xl ${isDark ? 'text-white' : 'text-slate-900'} font-bold`}>{max.toFixed(2)}</span>
            <span className={`font-data text-xs ${isDark ? 'text-white/40' : 'text-slate-400'} ml-1`}>{currentMetric.unit}</span>
          </div>
        </div>

        {/* Chart */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-xl border rounded-xl p-4`}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(125, 50%, 45%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(125, 50%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45, 90%, 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(45, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', 
                  fontSize: 10, 
                  fontFamily: 'JetBrains Mono' 
                }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', 
                  fontSize: 10, 
                  fontFamily: 'JetBrains Mono' 
                }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              <Area
                type="monotone"
                dataKey={activeMetric}
                name={currentMetric.name}
                stroke={currentMetric.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${currentMetric.gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
