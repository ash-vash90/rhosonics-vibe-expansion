import { BrandCallout } from "./BrandCallout";

interface ColorSwatchProps {
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
  description: string;
  dontUse: string;
  role: string;
}

const ColorSwatch = ({
  name,
  hex,
  bgClass,
  textClass,
  description,
  dontUse,
  role
}: ColorSwatchProps) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-lg shadow-card items-start">
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
  </div>
);

export const ColorMatrix = () => {
  const primaryColors: ColorSwatchProps[] = [
    {
      name: "Rhosonics Green",
      hex: "#33993c",
      bgClass: "bg-primary",
      textClass: "text-primary-foreground",
      role: "CORE SIGNAL",
      description: "The core identifier of the Rhosonics brand. It represents reliability and active measurement. Use this color to draw attention to the most important actions on the screen.",
      dontUse: "Large Backgrounds, Body Text"
    },
    {
      name: "Lime Accent",
      hex: "#73B82E",
      bgClass: "bg-rho-green-accent",
      textClass: "text-primary-foreground",
      role: "SUPPORTING SIGNAL",
      description: "A supporting tone used exclusively to add depth and vibrancy to the primary green. It creates the \"inner glow\" effect seen in our branding.",
      dontUse: "Solid Buttons, Text (Poor Contrast)"
    },
    {
      name: "Obsidian",
      hex: "#111522",
      bgClass: "bg-rho-obsidian",
      textClass: "text-slate-100",
      role: "FOUNDATIONAL SURFACE",
      description: "The foundation of our \"Hardware\" aesthetic. A rich, blue-tinted black that replaces standard black for a more premium, industrial feel. Used for the physical hardware housing.",
      dontUse: "Pure Black (#000000)"
    }
  ];

  const mineralColors: ColorSwatchProps[] = [
    {
      name: "Mineral Neutral",
      hex: "#8A836F",
      bgClass: "bg-mineral-neutral",
      textClass: "text-white",
      role: "ENVIRONMENT ACCENT",
      description: "A warm stone tone representing field sites, outdoor operations, and mineral processing environments. This is an environmental color — not a UI gray. It must never substitute for Slate.",
      dontUse: "UI Text, Buttons, Backgrounds, Forms"
    },
    {
      name: "Mineral Surface",
      hex: "#EDE9E2",
      bgClass: "bg-mineral-surface",
      textClass: "text-mineral-deep",
      role: "ENVIRONMENT SURFACE",
      description: "A warm cream surface for field-themed cards and containers. Provides earthy texture that clearly differs from cool Slate surfaces. Use only in environmental or industry context modules.",
      dontUse: "General UI Cards, Standard Backgrounds"
    },
    {
      name: "Mineral Deep",
      hex: "#5E5749",
      bgClass: "bg-mineral-deep",
      textClass: "text-white",
      role: "ENVIRONMENT ACCENT",
      description: "A deep olive-stone tone for grounding elements in field contexts. Provides weight and permanence with warm undertones that distinguish it from Slate.",
      dontUse: "UI Text, Tables, Navigation"
    }
  ];

  const ecoColors: ColorSwatchProps[] = [
    {
      name: "Eco Surface",
      hex: "#ecf8ed",
      bgClass: "bg-eco-surface",
      textClass: "text-muted-foreground",
      role: "CONTEXTUAL INDICATOR",
      description: "A very subtle green tint used to distinguish \"Eco Pack\" modules from standard operational data. It provides a subconscious cue of sustainability without being overwhelming.",
      dontUse: "Main Page Backgrounds, Text"
    },
    {
      name: "Eco Border",
      hex: "#d9f2db",
      bgClass: "bg-eco-border",
      textClass: "text-muted-foreground",
      role: "CONTEXTUAL INDICATOR",
      description: "Used for structure within Eco modules. It provides separation and definition for sustainable metrics.",
      dontUse: "Text, Primary Buttons, Solid Fills"
    }
  ];

  return (
    <section id="colors" className="mb-32">
      <h2 className="section-header">Color Roles</h2>
      <p className="label-tech text-slate-500 mb-6">FUNCTIONAL COLOR GOVERNANCE</p>
      
      {/* Core Philosophy - inline */}
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Color exists to communicate <strong className="text-foreground">State</strong>, <strong className="text-foreground">Structure</strong>, or <strong className="text-foreground">Context</strong>. 
        Mood, decoration, and expressive color without meaning are not permitted. Every color in this system serves a purpose — 
        precision demands clarity; clarity demands constraint.
      </p>

      {/* Color Role Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-5 bg-slate-100 border border-slate-300 rounded-lg">
          <span className="label-tech text-slate-500 mb-2 block">SLATE</span>
          <p className="font-ui font-semibold text-lg text-foreground mb-1">Software</p>
          <p className="text-sm text-muted-foreground">UI structure, text, forms, tables, navigation, data containers</p>
        </div>
        <div className="p-5 bg-mineral-surface border border-mineral-neutral/30 rounded-lg">
          <span className="label-tech text-mineral-deep mb-2 block">MINERAL</span>
          <p className="font-ui font-semibold text-lg text-foreground mb-1">Environment</p>
          <p className="text-sm text-muted-foreground">Field modules, industry panels, outdoor contexts, environmental surfaces</p>
        </div>
        <div className="p-5 bg-rho-obsidian rounded-lg">
          <span className="label-tech text-slate-400 mb-2 block">OBSIDIAN</span>
          <p className="font-ui font-semibold text-lg text-slate-100 mb-1">Hardware</p>
          <p className="text-sm text-slate-400">Device surfaces, enclosures, premium dark UI, physical products</p>
        </div>
      </div>


      {/* Primary Colors */}
      <h3 className="label-tech text-primary mb-4">SIGNAL COLORS</h3>
      <div className="flex flex-col gap-6 mb-12">
        {primaryColors.map(color => <ColorSwatch key={color.hex} {...color} />)}
      </div>

      {/* Mineral Colors */}
      <h3 className="label-tech text-mineral-neutral mb-4">FIELD AESTHETIC — MINERAL TONES</h3>
      <BrandCallout variant="avoid" title="Critical Separation" className="mb-6">
        Mineral colors are warm-neutral environmental tones. They are <strong>categorically different</strong> from Slate UI grays. 
        Mineral must never substitute for Slate in UI elements like text, forms, navigation, or data containers.
      </BrandCallout>
      <p className="text-sm text-muted-foreground mb-6">
        These colors evoke stone, earth, and mineral processing environments. They support industrial and field contexts 
        without encroaching on the cool, blue-biased Slate scale reserved for software interfaces.
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
      <h3 className="label-tech text-slate-500 mb-4">THE SLATE SCALE — UI STRUCTURE</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Cool, blue-biased, chromatically neutral. Used exclusively for UI structure and interface logic: 
        text, dividers, tables, forms, navigation, and data containers.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {[
          { name: "50", bg: "bg-slate-50", text: "text-slate-600" },
          { name: "100", bg: "bg-slate-100", text: "text-slate-600" },
          { name: "200", bg: "bg-slate-200", text: "text-slate-600" },
          { name: "300", bg: "bg-slate-300", text: "text-slate-700" },
          { name: "400", bg: "bg-slate-400", text: "text-slate-100" },
          { name: "500", bg: "bg-slate-500", text: "text-slate-100" },
          { name: "600", bg: "bg-slate-600", text: "text-slate-100" },
          { name: "700", bg: "bg-slate-700", text: "text-slate-100" },
          { name: "800", bg: "bg-slate-800", text: "text-slate-100" },
          { name: "900", bg: "bg-slate-900", text: "text-slate-100" }
        ].map(shade => (
          <div key={shade.name} className={`swatch-sm ${shade.bg} ${shade.text}`}>
            <span className="font-data text-xs font-bold">{shade.name}</span>
          </div>
        ))}
      </div>

      {/* Gradient Examples */}
      <div className="mt-12">
        <h3 className="label-tech text-slate-500 mb-4">BRAND GRADIENTS</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Flat color is preferred by default. Gradients add depth or signal transition — never decoration.
        </p>
        
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
            background: 'linear-gradient(145deg, hsl(45 10% 58%) 0%, hsl(45 8% 52%) 100%)'
          }}>
            <div className="absolute inset-0 bg-terrain-contour opacity-30" aria-hidden="true" />
            <div className="relative">
              <span className="font-ui font-bold text-white block">Mineral Gradient</span>
              <code className="label-tech text-white/70">145° | Warm stone tones</code>
            </div>
          </div>
        </div>
      </div>

      {/* Terrain Textures */}
      <div className="mt-12">
        <h3 className="label-tech text-mineral-neutral mb-4">TERRAIN TEXTURES</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Subtle background patterns that reinforce the field aesthetic. Use sparingly — textures must support content, not compete with it. 
          If a texture is noticeable before the content, it is being overused.
        </p>
        
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
    </section>
  );
};

export default ColorMatrix;