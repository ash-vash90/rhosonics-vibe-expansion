import { 
  Activity, Factory, CheckCircle, AlertTriangle, XCircle, Info,
  Download, Upload, Settings, Search, Plus, Trash2, Save,
  Play, Pause, RefreshCw, Filter, ChevronRight,
  Waves, Gauge, Droplets, Zap
} from "@/lib/icons";
import { BrandCallout } from "./BrandCallout";
import { IconPicker } from "./IconPicker";

export const IconGuidelines = () => {
  const iconSizes = [
    { name: "sm", size: 16, use: "Button icons" },
    { name: "md", size: 20, use: "Navigation" },
    { name: "lg", size: 24, use: "Feature icons" },
    { name: "xl", size: 32, use: "Hero elements" },
  ];

  const iconStates = [
    { icon: CheckCircle, state: "Success", color: "text-success", bg: "bg-success" },
    { icon: AlertTriangle, state: "Warning", color: "text-warning", bg: "bg-warning" },
    { icon: XCircle, state: "Error", color: "text-error", bg: "bg-error" },
    { icon: Info, state: "Info", color: "text-slate-600", bg: "bg-slate-600" },
  ];

  const iconPairings = [
    { 
      category: "Actions",
      pairs: [
        { icon: Download, label: "Export Data", context: "Primary buttons" },
        { icon: Upload, label: "Import File", context: "Primary buttons" },
        { icon: Save, label: "Save Changes", context: "Form actions" },
        { icon: Trash2, label: "Delete", context: "Destructive actions" },
      ]
    },
    {
      category: "Navigation",
      pairs: [
        { icon: Settings, label: "Settings", context: "Menu items" },
        { icon: Search, label: "Search", context: "Input fields" },
        { icon: Filter, label: "Filters", context: "Data controls" },
        { icon: ChevronRight, label: "View Details", context: "List items" },
      ]
    },
    {
      category: "Controls",
      pairs: [
        { icon: Play, label: "Start Process", context: "System controls" },
        { icon: Pause, label: "Pause", context: "System controls" },
        { icon: RefreshCw, label: "Refresh", context: "Data refresh" },
        { icon: Plus, label: "Add New", context: "Creation actions" },
      ]
    },
    {
      category: "Measurements",
      pairs: [
        { icon: Waves, label: "Density", context: "Sensor data" },
        { icon: Gauge, label: "Pressure", context: "Sensor data" },
        { icon: Droplets, label: "Flow Rate", context: "Sensor data" },
        { icon: Zap, label: "Power", context: "Sensor data" },
      ]
    },
  ];

  return (
    <section id="icons" className="space-y-20 pt-16">
      {/* Intro + Core Principles */}
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

      {/* When to Use Icons */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">When to Use</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: CheckCircle, 
              title: "Navigation & Actions", 
              desc: "Guide users through interface flows and indicate clickable elements",
              color: "text-success"
            },
            { 
              icon: Activity, 
              title: "Data Visualization", 
              desc: "Represent measurement types, units, and sensor categories in dashboards",
              color: "text-primary"
            },
            { 
              icon: AlertTriangle, 
              title: "Status & Alerts", 
              desc: "Communicate system states, warnings, and operational status at a glance",
              color: "text-warning"
            },
            { 
              icon: Factory, 
              title: "Industry Context", 
              desc: "Identify application sectors: mining, dredging, wastewater, semiconductor",
              color: "text-muted-foreground"
            },
          ].map((item) => (
            <div key={item.title} className="border border-border rounded-lg p-5">
              <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
              <h4 className="font-medium text-sm mb-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Sizes */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon Sizes</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
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

      {/* Do's and Don'ts */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Usage Guidelines</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="border border-success/30 bg-success/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium text-success">Do</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                Use icons to support and clarify text labels, not replace them
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                Maintain consistent sizing within the same UI context
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                Use semantic colors for status icons (green=success, amber=warning, red=error)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                Keep stroke weight at 2px for visual consistency
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                Use muted colors for secondary/decorative icon usage
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="border border-error/30 bg-error/5 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-error" />
              <span className="font-medium text-error">Don't</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0" />
                Use icons as decoration without functional purpose
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0" />
                Mix different icon styles or stroke weights
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0" />
                Use status colors for non-status purposes
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0" />
                Scale icons beyond intended size ranges (distorts stroke)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0" />
                Rely on icons alone for critical actions or information
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Icon + Text Pairings */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon + Text Pairings</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <p className="text-muted-foreground text-sm mb-6">
          Icons accelerate recognition; text ensures clarity. Always pair icons with descriptive labels.
        </p>

        {/* Inline horizontal pairings strip */}
        <div className="border border-border rounded-lg overflow-hidden">
          {iconPairings.map((category, catIdx) => (
            <div 
              key={category.category} 
              className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 ${catIdx > 0 ? 'border-t border-border' : ''}`}
            >
              <span className="font-data text-xs text-muted-foreground uppercase w-24 flex-shrink-0">{category.category}</span>
              <div className="flex flex-wrap gap-6">
                {category.pairs.map((pair) => (
                  <div key={pair.label} className="flex items-center gap-2 text-sm">
                    <pair.icon className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{pair.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Correct vs Incorrect - compact inline */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-4 p-4 border border-success/30 bg-success/5 rounded-lg">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-border">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Export Report</span>
            </div>
            <span className="text-xs text-muted-foreground">Proportional sizing</span>
          </div>
          <div className="flex items-center gap-4 p-4 border border-error/30 bg-error/5 rounded-lg">
            <XCircle className="w-4 h-4 text-error flex-shrink-0" />
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-border">
              <Download className="w-7 h-7 text-primary" />
              <span className="text-xs">Export</span>
            </div>
            <span className="text-xs text-muted-foreground">Icon dominates</span>
          </div>
        </div>
      </div>

      {/* State Indicators */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">State Indicators</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
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
          
          <div className="lg:col-span-2 border-l-2 border-border pl-4 md:pl-6">
            <p className="text-muted-foreground text-xs md:text-sm">
              State colors are functional, not decorative. Green = success, Amber = warning, 
              Red = error, Blue = informational. Never use these colors outside their semantic meaning.
            </p>
          </div>
        </div>
      </div>

      {/* Icon Picker - Full Library */}
      <div>
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon Library</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <IconPicker />
      </div>
    </section>
  );
};

export default IconGuidelines;
