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
    { icon: CheckCircle, state: "Success", color: "text-green-600", bg: "bg-green-600" },
    { icon: AlertTriangle, state: "Warning", color: "text-amber-500", bg: "bg-amber-500" },
    { icon: XCircle, state: "Error", color: "text-red-500", bg: "bg-red-500" },
    { icon: Info, state: "Info", color: "text-blue-500", bg: "bg-blue-500" },
  ];

  return (
    <section id="icons" className="space-y-20 pt-16">
      {/* Intro + Rules */}
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <p className="text-muted-foreground text-lg mb-8">
            Icons support recognition and scanning — not decoration. 
            Simple, geometric, purposeful. Every icon should feel like it belongs in a control room.
          </p>

          {/* Design Rules - inline */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              "Simple geometric forms, consistent stroke weight",
              "Design for clarity at small sizes",
              "No decorative or expressive styling",
              "Icons reinforce text — never compete"
            ].map((rule, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1 h-1 bg-primary rounded-full" />
                {rule}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <BrandCallout variant="avoid" title="Icon Failure Test">
            If an icon needs explanation, it has failed.
          </BrandCallout>
        </div>
      </div>

      {/* Icon Sizes - INLINE SPECIMENS */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon Sizes</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        {/* Horizontal inline specimen strip */}
        <div className="flex items-end gap-0 -mx-6 border-y border-border">
          {iconSizes.map((size, i) => (
            <div 
              key={size.name} 
              className={`flex-1 py-8 flex flex-col items-center gap-4 ${i > 0 ? 'border-l border-border' : ''}`}
            >
              <Activity className="text-primary" style={{ width: size.size, height: size.size }} />
              <div className="text-center">
                <span className="font-data text-sm text-foreground block">{size.size}px</span>
                <span className="text-xs text-muted-foreground">{size.use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Categories - inline strips per category */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Categories</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="space-y-6">
          {iconCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-6 py-4 border-b border-border/50">
              <span className="font-data text-xs text-muted-foreground uppercase w-28 flex-shrink-0">{category.name}</span>
              <div className="flex gap-8">
                {category.icons.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 group">
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Indicators - horizontal strip */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">State Indicators</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8">
          {/* State colors strip */}
          <div className="lg:col-span-3 flex gap-0 border border-border overflow-hidden rounded-lg">
            {iconStates.map((item, i) => (
              <div 
                key={item.state} 
                className={`flex-1 py-6 flex flex-col items-center gap-3 ${i > 0 ? 'border-l border-border' : ''}`}
              >
                <div className={`w-3 h-3 ${item.bg} rounded-full`} />
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-xs text-muted-foreground">{item.state}</span>
              </div>
            ))}
          </div>
          
          {/* Explanation */}
          <div className="lg:col-span-2 border-l-2 border-border pl-6">
            <p className="text-muted-foreground text-sm">
              State colors are functional, not decorative. Green = success, Amber = warning, 
              Red = error, Blue = informational. Never use these colors outside their semantic meaning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconGuidelines;
