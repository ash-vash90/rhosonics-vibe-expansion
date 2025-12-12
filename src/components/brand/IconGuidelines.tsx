import { 
  Waves, 
  Droplets, 
  Gauge, 
  Thermometer, 
  Activity, 
  Leaf, 
  Recycle, 
  Factory,
  Cpu,
  Anchor,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";

export const IconGuidelines = () => {
  return (
    <section id="icons" className="mb-32">
      <h2 className="section-header">Icon Guidelines</h2>
      <p className="text-muted-foreground mb-8">
        Icons should be clear, functional, and consistent with our industrial-precision aesthetic. 
        We use Lucide icons as our primary icon library.
      </p>

      {/* Icon Sizes */}
      <div className="card-base p-6 mb-8">
        <h3 className="label-tech text-slate-500 mb-4">ICON SIZES</h3>
        <div className="flex flex-wrap items-end gap-8">
          {[
            { size: 12, label: "xs", use: "Inline, dense UI" },
            { size: 16, label: "sm", use: "Labels, buttons" },
            { size: 20, label: "md", use: "Navigation, cards" },
            { size: 24, label: "lg", use: "Headers, emphasis" },
            { size: 32, label: "xl", use: "Features, heroes" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <Activity className="text-primary" style={{ width: item.size, height: item.size }} />
              <span className="font-data text-xs text-muted-foreground">{item.size}px</span>
              <span className="text-xs text-slate-400">{item.use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Measurement Icons */}
        <div className="card-base p-6">
          <h4 className="label-tech text-primary mb-4">MEASUREMENT</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Waves className="w-6 h-6 text-foreground" />
              <span className="text-xs text-muted-foreground">Density</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Droplets className="w-6 h-6 text-foreground" />
              <span className="text-xs text-muted-foreground">Flow</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Gauge className="w-6 h-6 text-foreground" />
              <span className="text-xs text-muted-foreground">Level</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Thermometer className="w-6 h-6 text-foreground" />
              <span className="text-xs text-muted-foreground">Temp</span>
            </div>
          </div>
        </div>

        {/* Sustainability Icons */}
        <div className="card-eco p-6">
          <h4 className="label-tech text-primary mb-4">SUSTAINABILITY</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground">Eco</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Recycle className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground">Recycle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Droplets className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground">Water</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground">Impact</span>
            </div>
          </div>
        </div>

        {/* Industry Icons */}
        <div className="card-obsidian p-6">
          <h4 className="label-tech text-primary mb-4">INDUSTRIES</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Factory className="w-6 h-6 text-slate-100" />
              <span className="text-xs text-slate-400">Minerals</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Cpu className="w-6 h-6 text-slate-100" />
              <span className="text-xs text-slate-400">Semi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Anchor className="w-6 h-6 text-slate-100" />
              <span className="text-xs text-slate-400">Dredge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Waves className="w-6 h-6 text-slate-100" />
              <span className="text-xs text-slate-400">Process</span>
            </div>
          </div>
        </div>
      </div>

      {/* Icon States */}
      <h3 className="label-tech text-slate-500 mb-4">ICON STATES</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Success</span>
          </div>
          <span className="text-xs text-muted-foreground">Green / Primary</span>
        </div>
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-600">Warning</span>
          </div>
          <span className="text-xs text-muted-foreground">Amber</span>
        </div>
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">Error</span>
          </div>
          <span className="text-xs text-muted-foreground">Red / Destructive</span>
        </div>
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">Info</span>
          </div>
          <span className="text-xs text-muted-foreground">Blue</span>
        </div>
      </div>

      {/* Icon Usage Rules */}
      <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-ui font-bold text-lg mb-4">Icon Usage Rules</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="font-ui font-medium">Do</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Use consistent stroke width (2px default)</li>
              <li>• Maintain optical alignment with text</li>
              <li>• Use icons to reinforce meaning, not replace text</li>
              <li>• Keep icons simple and recognizable at small sizes</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="font-ui font-medium">Don't</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Mix icon styles or libraries</li>
              <li>• Distort proportions</li>
              <li>• Use icons without accessible labels</li>
              <li>• Overload interfaces with too many icons</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconGuidelines;
