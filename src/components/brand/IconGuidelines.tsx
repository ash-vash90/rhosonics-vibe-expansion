import { 
  Activity, Droplets, Gauge, Waves, Leaf, Recycle, TreeDeciduous,
  Factory, Ship, Pickaxe, FlaskConical, CheckCircle, AlertTriangle,
  XCircle, Info, Navigation, BarChart3, FileText
} from "lucide-react";
import { BrandCallout } from "./BrandCallout";

export const IconGuidelines = () => {
  const iconSizes = [
    { name: "xs", size: 12, use: "Inline indicators" },
    { name: "sm", size: 16, use: "Button icons, badges" },
    { name: "md", size: 20, use: "Navigation, lists" },
    { name: "lg", size: 24, use: "Feature icons, headers" },
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
        { icon: TreeDeciduous, label: "Nature" },
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
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Icons in the Rhosonics system exist to support recognition and scanning — not decoration. 
        They are functional symbols designed to communicate quickly and unambiguously.
      </p>

      {/* Icon Philosophy */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Icon Philosophy</h3>
        <p className="text-muted-foreground mb-4">
          Rhosonics icons are engineered, not illustrated. They are simple, geometric, and purposeful. 
          Every icon should feel like it belongs in a control room, not a marketing slide.
        </p>
        <p className="text-muted-foreground">
          Icons never compete with text. They reinforce it.
        </p>
      </div>

      {/* Icon Design Rules */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Icon Design Rules</h3>
        <ul className="space-y-2 text-muted-foreground mb-6 max-w-2xl">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use simple geometric forms</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Maintain consistent stroke weight</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Avoid unnecessary detail</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Design for clarity at small sizes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>No decorative or expressive styling</span>
          </li>
        </ul>

        <BrandCallout variant="avoid" title="Icon Failure Test">
          If an icon needs explanation, it has failed.
        </BrandCallout>
      </div>

      {/* Icon Usage Contexts */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">Icon Usage Contexts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mb-6">
          <div className="card-base p-4 flex flex-col items-center text-center">
            <Navigation className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">UI Navigation</span>
          </div>
          <div className="card-base p-4 flex flex-col items-center text-center">
            <CheckCircle className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Status Indicators</span>
          </div>
          <div className="card-base p-4 flex flex-col items-center text-center">
            <BarChart3 className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Feature Identification</span>
          </div>
          <div className="card-base p-4 flex flex-col items-center text-center">
            <FileText className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Supporting Labels</span>
          </div>
        </div>
      </div>

      {/* Avoid */}
      <div className="mb-12 max-w-2xl">
        <h4 className="label-tech text-slate-500 mb-3">AVOID</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Decorative use</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Illustrative metaphors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Mixed icon styles</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Using icons where text alone is clearer</span>
          </li>
        </ul>
      </div>

      {/* Icons and Color */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Icons and Color</h3>
        <p className="text-muted-foreground mb-4">
          Icons inherit meaning from context, not color. Use color only when it communicates 
          state, status, or hierarchy — never style.
        </p>
      </div>

      {/* Icon Sizes */}
      <div className="card-base p-6 mb-8">
        <h3 className="label-tech text-slate-500 mb-6">ICON SIZES</h3>
        <div className="flex flex-wrap items-end gap-8">
          {iconSizes.map((size) => (
            <div key={size.name} className="flex flex-col items-center gap-2">
              <Activity className="text-primary" style={{ width: size.size, height: size.size }} />
              <span className="font-data text-xs text-muted-foreground">{size.name}</span>
              <span className="text-xs text-slate-400">{size.size}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {iconCategories.map((category) => (
          <div key={category.name} className="card-base p-6">
            <h4 className="label-tech text-slate-500 mb-4">{category.name.toUpperCase()}</h4>
            <div className="flex flex-wrap gap-4">
              {category.icons.map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Icon States */}
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
        <p className="text-sm text-muted-foreground mt-4">
          State colors are reserved for communicating status. They should never be used decoratively.
        </p>
      </div>
    </section>
  );
};

export default IconGuidelines;
