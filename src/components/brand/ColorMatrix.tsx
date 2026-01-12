interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  bgClass: string;
  textClass: string;
  description: string;
  doUse: string;
  dontUse: string;
  role: string;
}
const ColorSwatch = ({
  name,
  hex,
  usage,
  bgClass,
  textClass,
  description,
  doUse,
  dontUse,
  role
}: ColorSwatchProps) => <div className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-lg shadow-card items-start">
    <div className={`swatch ${bgClass} ${textClass} border-none w-full md:w-48 shrink-0`}>
      <div>
        <span className="label-tech opacity-60 text-xs">{role}</span>
        <span className="font-bold text-sm block mt-1">{name}</span>
        <code className="label-tech opacity-70">{hex}</code>
      </div>
      
    </div>
    <div className="flex-1 py-1">
      <h3 className="font-ui font-bold text-lg text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-3">
        
        <span className="text-xs font-data font-medium text-destructive bg-red-50 px-3 py-1 rounded border border-red-100">
          AVOID: {dontUse}
        </span>
      </div>
    </div>
  </div>;
export const ColorMatrix = () => {
  const primaryColors: ColorSwatchProps[] = [{
    name: "Rhosonics Green",
    hex: "#33993c",
    usage: "SOLID UI",
    bgClass: "bg-primary",
    textClass: "text-primary-foreground",
    role: "CORE SIGNAL",
    description: "The core identifier of the Rhosonics brand. It represents reliability and active measurement. Use this color to draw attention to the most important actions on the screen.",
    doUse: "Primary Buttons, Active States, Success Icons, Logo",
    dontUse: "Large Backgrounds, Body Text"
  }, {
    name: "Lime Accent",
    hex: "#73B82E",
    usage: "GRADIENTS ONLY",
    bgClass: "bg-rho-green-accent",
    textClass: "text-primary-foreground",
    role: "SUPPORTING SIGNAL",
    description: "A supporting tone used exclusively to add depth and vibrancy to the primary green. It creates the \"inner glow\" effect seen in our branding.",
    doUse: "Gradients (0% stop), Illustrations, Highlights",
    dontUse: "Solid Buttons, Text (Poor Contrast)"
  }, {
    name: "Obsidian",
    hex: "#111522",
    usage: "SURFACE",
    bgClass: "bg-rho-obsidian",
    textClass: "text-slate-100",
    role: "FOUNDATIONAL SURFACE",
    description: "The foundation of our \"Field\" aesthetic. A rich, blue-tinted black that replaces standard black for a more premium, industrial feel. Used for the physical hardware housing.",
    doUse: "Headings, Dark Mode Backgrounds, Hardware UI",
    dontUse: "Pure Black (#000000)"
  }];
  const mineralColors: ColorSwatchProps[] = [{
    name: "Mineral Neutral",
    hex: "#8B8F88",
    usage: "FIELD ACCENT",
    bgClass: "bg-mineral-neutral",
    textClass: "text-white",
    role: "CONTEXTUAL ACCENT",
    description: "The primary field tone representing industrial hardware and mineral processing environments. Inspired by coated metals, control-room enclosures, and weathered equipment surfaces.",
    doUse: "Mining Cards, Field Data, Accent Borders, Industry Modules",
    dontUse: "Primary Buttons, Main Backgrounds"
  }, {
    name: "Mineral Surface",
    hex: "#E7E8E6",
    usage: "SURFACE",
    bgClass: "bg-mineral-surface",
    textClass: "text-mineral-deep",
    role: "CONTEXTUAL SURFACE",
    description: "A cool, neutral surface for field-themed cards and containers. Provides subtle industrial texture without fighting the core UI palette.",
    doUse: "Card Backgrounds, Field Module Surfaces, Neutral Containers",
    dontUse: "Text, Primary Actions"
  }, {
    name: "Mineral Deep",
    hex: "#5F6460",
    usage: "DEEP ACCENT",
    bgClass: "bg-mineral-deep",
    textClass: "text-white",
    role: "CONTEXTUAL ACCENT",
    description: "A rich, cool-toned gray for grounding elements. Provides weight and permanence in field applications without warm undertones.",
    doUse: "Borders, Text on Light Mineral, Icon Fills",
    dontUse: "Large Backgrounds, Primary UI"
  }];
  const ecoColors: ColorSwatchProps[] = [{
    name: "Eco Surface",
    hex: "#ecf8ed",
    usage: "CARD BG",
    bgClass: "bg-eco-surface",
    textClass: "text-muted-foreground",
    role: "CONTEXTUAL INDICATOR",
    description: "A very subtle green tint used to distinguish \"Eco Pack\" modules from standard operational data. It provides a subconscious cue of sustainability without being overwhelming.",
    doUse: "Eco Card Backgrounds, Success Messages, Alerts",
    dontUse: "Main Page Backgrounds, Text"
  }, {
    name: "Eco Border",
    hex: "#d9f2db",
    usage: "ELEMENTS",
    bgClass: "bg-eco-border",
    textClass: "text-muted-foreground",
    role: "CONTEXTUAL INDICATOR",
    description: "Used for structure within Eco modules. It provides separation and definition for sustainable metrics.",
    doUse: "Borders, Dividers, Secondary Icons (Eco Context)",
    dontUse: "Text, Primary Buttons, Solid Fills"
  }];
  return <section id="colors" className="mb-32">
      <h2 className="section-header">Color Roles</h2>
      <p className="label-tech text-slate-500 mb-6">HOW COLOR FUNCTIONS INSIDE THE SYSTEM</p>
      
      {/* Functional Framing Rule */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg mb-8">
        <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Functional Color Principle</h4>
        <p className="text-sm text-muted-foreground">
          Color in the Rhosonics system is functional, not atmospheric. Every color exists to communicate state, structure, or context — never mood.
        </p>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Our palette comes from the places we work: control room panels, active measurement indicators, field sites. Forty years of deployment informed these choices.
      </p>

      {/* Primary Colors */}
      <h3 className="label-tech text-primary mb-4">SIGNAL COLORS</h3>
      <div className="flex flex-col gap-6 mb-12">
        {primaryColors.map(color => <ColorSwatch key={color.hex} {...color} />)}
      </div>

      {/* Mineral Colors */}
      <h3 className="label-tech text-mineral-neutral mb-4">FIELD AESTHETIC — MINERAL NEUTRALS</h3>
      <p className="text-sm text-muted-foreground mb-6">
        These colors are inspired by coated metals, enclosures, control-room hardware, and mineral surfaces. They support industrial contexts without fighting the core UI palette.
      </p>
      <div className="flex flex-col gap-6 mb-12">
        {mineralColors.map(color => <ColorSwatch key={color.hex} {...color} />)}
      </div>

      {/* Eco Colors */}
      <h3 className="label-tech text-primary mb-4">SUSTAINABILITY TINTS</h3>
      <div className="flex flex-col gap-6 mb-12">
        {ecoColors.map(color => <ColorSwatch key={color.hex} {...color} />)}
      </div>

      {/* Slate Scale */}
      <h3 className="label-tech text-slate-500 mb-4">THE SLATE SCALE</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {[{
        name: "50",
        bg: "bg-slate-50",
        text: "text-slate-600"
      }, {
        name: "100",
        bg: "bg-slate-100",
        text: "text-slate-600"
      }, {
        name: "200",
        bg: "bg-slate-200",
        text: "text-slate-600"
      }, {
        name: "300",
        bg: "bg-slate-300",
        text: "text-slate-700"
      }, {
        name: "400",
        bg: "bg-slate-400",
        text: "text-slate-100"
      }, {
        name: "500",
        bg: "bg-slate-500",
        text: "text-slate-100"
      }, {
        name: "600",
        bg: "bg-slate-600",
        text: "text-slate-100"
      }, {
        name: "700",
        bg: "bg-slate-700",
        text: "text-slate-100"
      }, {
        name: "800",
        bg: "bg-slate-800",
        text: "text-slate-100"
      }, {
        name: "900",
        bg: "bg-slate-900",
        text: "text-slate-100"
      }].map(shade => <div key={shade.name} className={`swatch-sm ${shade.bg} ${shade.text}`}>
            <span className="font-data text-xs font-bold">{shade.name}</span>
          </div>)}
      </div>

      {/* Gradient Examples */}
      <div className="mt-12">
        <h3 className="label-tech text-slate-500 mb-4">BRAND GRADIENTS</h3>
        
        {/* Gradient constraint */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg mb-6">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Gradient Usage Rule</h4>
          <p className="text-sm text-muted-foreground">
            Gradients are used to create depth or transition — never as decoration. Flat color is preferred unless depth adds meaning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-brand-gradient rounded-lg flex items-end p-4">
            <div>
              <span className="font-ui font-bold text-primary-foreground block">Primary Gradient</span>
              <code className="label-tech text-primary-foreground/70">135° | #73B82E → #33993c</code>
            </div>
          </div>
          <div className="h-32 bg-obsidian-gradient rounded-lg flex items-end p-4">
            <div>
              <span className="font-ui font-bold text-slate-100 block">Obsidian Gradient</span>
              <code className="label-tech text-slate-400">135° | #1c2130 → #111522</code>
            </div>
          </div>
          <div className="h-32 rounded-lg flex items-end p-4 relative overflow-hidden" style={{
          background: 'linear-gradient(145deg, hsl(120 4% 64%) 0%, hsl(120 3% 55%) 100%)'
        }}>
            <div className="absolute inset-0 bg-terrain-contour opacity-50" aria-hidden="true" />
            <div className="relative">
              <span className="font-ui font-bold text-white block">Mineral Gradient</span>
              <code className="label-tech text-white/70">145° | #A3A6A0 → #8B8F88</code>
            </div>
          </div>
        </div>
      </div>

      {/* Terrain Textures */}
      <div className="mt-12">
        <h3 className="label-tech text-mineral-neutral mb-4">TERRAIN TEXTURES</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Subtle background patterns that reinforce the field aesthetic. Use sparingly on cards and sections related to mining, minerals, and outdoor operations.
        </p>
        
        {/* Terrain constraint */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg mb-6">
          <h4 className="font-ui font-semibold text-sm text-slate-600 mb-2">Texture Usage Rule</h4>
          <p className="text-sm text-muted-foreground">
            Terrain textures must never compete with data, controls, or primary messaging. If a texture is noticeable before the content, it is being overused.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 rounded-lg border border-mineral-neutral/30 bg-mineral-surface bg-terrain-contour flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-mineral-deep text-sm">Contour Lines</span>
            <span className="label-tech text-mineral-neutral/70 text-xs">TOPOGRAPHIC</span>
          </div>
          <div className="h-28 rounded-lg border border-mineral-neutral/30 bg-mineral-surface bg-terrain-strata flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-mineral-deep text-sm">Strata Layers</span>
            <span className="label-tech text-mineral-neutral/70 text-xs">GEOLOGICAL</span>
          </div>
          <div className="h-28 rounded-lg border border-mineral-neutral/30 bg-mineral-surface bg-terrain-grain flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-mineral-deep text-sm">Grain Particles</span>
            <span className="label-tech text-mineral-neutral/70 text-xs">MINERAL</span>
          </div>
          <div className="h-28 rounded-lg bg-terrain-ore flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-slate-300 text-sm">Ore Deposits</span>
            <span className="label-tech text-mineral-neutral/70 text-xs">DARK FIELD</span>
          </div>
        </div>
      </div>
    </section>;
};
export default ColorMatrix;