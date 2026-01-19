import { 
  Activity, Droplets, Gauge, Waves, Leaf, Recycle, TreePine,
  Factory, Ship, Pickaxe, FlaskConical, CheckCircle, AlertTriangle,
  XCircle, Info, Mountain, Gem, HardHat, Anchor, Sailboat, Container,
  Cpu, Microchip, CircuitBoard, Plug, Cylinder, Filter, Wind, CloudRain,
  Thermometer, Scale, Pipette, Radar, Award, BadgeCheck, ShieldCheck,
  Fuel, BatteryCharging, Power, Earth
} from "@/lib/icons";
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
        { icon: Thermometer, label: "Temp" },
        { icon: Scale, label: "Weight" },
        { icon: Pipette, label: "Sample" },
        { icon: Radar, label: "Sensor" },
      ]
    },
    {
      name: "Mining",
      icons: [
        { icon: Pickaxe, label: "Mining" },
        { icon: Mountain, label: "Minerals" },
        { icon: Gem, label: "Ore" },
        { icon: HardHat, label: "Safety" },
      ]
    },
    {
      name: "Dredging",
      icons: [
        { icon: Ship, label: "Vessel" },
        { icon: Anchor, label: "Marine" },
        { icon: Sailboat, label: "Nautical" },
        { icon: Container, label: "Cargo" },
      ]
    },
    {
      name: "Semiconductor",
      icons: [
        { icon: Cpu, label: "Processor" },
        { icon: Microchip, label: "Chip" },
        { icon: CircuitBoard, label: "Circuit" },
        { icon: Plug, label: "Connect" },
      ]
    },
    {
      name: "Wastewater",
      icons: [
        { icon: Cylinder, label: "Tank" },
        { icon: Filter, label: "Filter" },
        { icon: Wind, label: "Aeration" },
        { icon: CloudRain, label: "Effluent" },
      ]
    },
    {
      name: "Energy",
      icons: [
        { icon: Fuel, label: "Fuel" },
        { icon: BatteryCharging, label: "Battery" },
        { icon: Power, label: "Power" },
        { icon: Factory, label: "Plant" },
      ]
    },
    {
      name: "Sustainability",
      icons: [
        { icon: Leaf, label: "Eco" },
        { icon: Recycle, label: "Recycle" },
        { icon: TreePine, label: "Nature" },
        { icon: Earth, label: "Planet" },
      ]
    },
    {
      name: "Badges",
      icons: [
        { icon: Award, label: "Award" },
        { icon: BadgeCheck, label: "Verified" },
        { icon: ShieldCheck, label: "Secure" },
        { icon: FlaskConical, label: "Lab" },
      ]
    },
  ];

  const iconStates = [
    { icon: CheckCircle, state: "Success", color: "text-success", bg: "bg-success" },
    { icon: AlertTriangle, state: "Warning", color: "text-warning", bg: "bg-warning" },
    { icon: XCircle, state: "Error", color: "text-error", bg: "bg-error" },
    { icon: Info, state: "Info", color: "text-slate-600", bg: "bg-slate-600" },
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
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon Sizes</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        {/* Responsive grid - 2x2 on mobile, 4 across on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 -mx-4 md:-mx-6 border-y border-border">
          {iconSizes.map((size, i) => (
            <div 
              key={size.name} 
              className={`py-6 md:py-8 flex flex-col items-center gap-3 md:gap-4 ${i % 2 !== 0 ? 'border-l border-border' : ''} ${i >= 2 ? 'md:border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
            >
              <Activity className="text-primary" style={{ width: size.size, height: size.size }} />
              <div className="text-center">
                <span className="font-data text-xs md:text-sm text-foreground block">{size.size}px</span>
                <span className="text-[10px] md:text-xs text-muted-foreground">{size.use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Categories - inline strips per category */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Categories</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {iconCategories.map((category) => (
            <div key={category.name} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-3 md:py-4 border-b border-border/50">
              <span className="font-data text-xs text-muted-foreground uppercase w-full sm:w-28 flex-shrink-0">{category.name}</span>
              <div className="flex flex-wrap gap-4 md:gap-8">
                {category.icons.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 group">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Indicators - horizontal strip */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">State Indicators</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* State colors strip - 2x2 grid on mobile */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-0 border border-border overflow-hidden rounded-lg">
            {iconStates.map((item, i) => (
              <div 
                key={item.state} 
                className={`py-4 md:py-6 flex flex-col items-center gap-2 md:gap-3 ${i % 2 !== 0 ? 'border-l border-border' : ''} ${i >= 2 ? 'border-t md:border-t-0 md:border-l' : ''}`}
              >
                <div className={`w-2.5 h-2.5 md:w-3 md:h-3 ${item.bg} rounded-full`} />
                <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.color}`} />
                <span className="text-[10px] md:text-xs text-muted-foreground">{item.state}</span>
              </div>
            ))}
          </div>
          
          {/* Explanation */}
          <div className="lg:col-span-2 border-l-2 border-border pl-4 md:pl-6">
            <p className="text-muted-foreground text-xs md:text-sm">
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
