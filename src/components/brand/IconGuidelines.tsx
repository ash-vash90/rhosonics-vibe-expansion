import { 
  Activity, Droplets, Gauge, Waves, Leaf, Recycle,
  Factory, Ship, Pickaxe, FlaskConical, CheckCircle, AlertTriangle,
  XCircle, Info
} from "lucide-react";
import { BrandCallout } from "./BrandCallout";

export const IconGuidelines = () => {
  const iconSizes = [
    { name: "sm", size: 16, use: "Button icons" },
    { name: "md", size: 20, use: "Navigation" },
    { name: "lg", size: 24, use: "Feature icons" },
    { name: "xl", size: 32, use: "Hero elements" },
  ];

  const iconCategories = [
    {
      name: "Measurement",
      icons: [
        { icon: Waves, label: "Density" },
        { icon: Activity, label: "Flow" },
        { icon: Gauge, label: "Pressure" },
        { icon: Droplets, label: "Liquid" },
      ]
    },
    {
      name: "Sustainability",
      icons: [
        { icon: Leaf, label: "Eco" },
        { icon: Recycle, label: "Recycle" },
      ]
    },
    {
      name: "Industries",
      icons: [
        { icon: Factory, label: "Industrial" },
        { icon: Ship, label: "Marine" },
        { icon: Pickaxe, label: "Mining" },
        { icon: FlaskConical, label: "Chemical" },
      ]
    },
  ];

  const iconStates = [
    { icon: CheckCircle, state: "Success", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: AlertTriangle, state: "Warning", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: XCircle, state: "Error", color: "text-red-500", bg: "bg-red-500/10" },
    { icon: Info, state: "Info", color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  return (
    <section id="icons" className="mb-32">
      <h2 className="section-header">Icon System</h2>
      
      {/* Two-column: Content + Callout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-6">
            Icons support recognition and scanning — not decoration. 
            Simple, geometric, purposeful. Every icon should feel like it belongs in a control room.
          </p>

          {/* Design Rules */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Simple geometric forms, consistent stroke weight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Design for clarity at small sizes</span>
              </li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>No decorative or expressive styling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Icons reinforce text — never compete with it</span>
              </li>
            </ul>
          </div>

          {/* Icon Sizes */}
          <div className="card-base p-6">
            <h3 className="label-tech text-slate-500 mb-6">ICON SIZES</h3>
            <div className="flex flex-wrap items-end gap-8">
              {iconSizes.map((size) => (
                <div key={size.name} className="flex flex-col items-center gap-2">
                  <Activity className="text-primary" style={{ width: size.size, height: size.size }} />
                  <span className="font-data text-xs text-muted-foreground">{size.size}px</span>
                  <span className="text-xs text-slate-400">{size.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <BrandCallout variant="avoid" title="Icon Failure Test">
            If an icon needs explanation, it has failed.
          </BrandCallout>
        </div>
      </div>

      {/* Icon Categories - full width */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {iconCategories.map((category) => (
          <div key={category.name} className="card-base p-6">
            <h4 className="label-tech text-slate-500 mb-4">{category.name.toUpperCase()}</h4>
            <div className="flex flex-wrap gap-4">
              {category.icons.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* State Indicators - full width */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-base p-6">
          <h3 className="label-tech text-slate-500 mb-6">STATE INDICATORS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {iconStates.map((item) => (
              <div key={item.state} className={`p-4 rounded-lg ${item.bg} flex items-center gap-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className={`text-sm font-medium ${item.color}`}>{item.state}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 className="font-ui font-semibold text-foreground mb-3">Color communicates state</h4>
          <p className="text-muted-foreground text-sm">
            State colors are functional, not decorative. Green = success, Amber = warning, 
            Red = error, Blue = informational. Never use these colors outside their semantic meaning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IconGuidelines;
