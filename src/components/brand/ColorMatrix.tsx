import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface ColorSwatchProps {
  name: string;
  hex: string;
  hsl?: string;
  usage: string;
  bgClass: string;
  textClass: string;
  description: string;
  doUse: string;
  dontUse: string;
}

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`Copied ${label}: ${value}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-data bg-white/20 hover:bg-white/30 rounded transition-all"
      title={`Copy ${label}`}
    >
      {copied ? (
        <Check className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {value}
    </button>
  );
};

const ColorSwatch = ({ name, hex, hsl, usage, bgClass, textClass, description, doUse, dontUse }: ColorSwatchProps) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-lg shadow-card items-start group">
    <div className={`swatch ${bgClass} ${textClass} border-none w-full md:w-56 shrink-0 relative overflow-hidden`}>
      <div>
        <span className="font-bold text-sm block mb-2">{name}</span>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={hex} label="HEX" />
          {hsl && <CopyButton value={hsl} label="HSL" />}
        </div>
      </div>
      <span className="label-tech opacity-50">{usage}</span>
    </div>
    <div className="flex-1 py-1">
      <h3 className="font-ui font-bold text-lg text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed prose-optimal">{description}</p>
      <div className="flex flex-wrap gap-3">
        <span className="text-xs font-data font-medium text-primary bg-eco-surface px-3 py-1 rounded border border-eco-border">
          USE FOR: {doUse}
        </span>
        <span className="text-xs font-data font-medium text-destructive bg-red-50 px-3 py-1 rounded border border-red-100">
          AVOID: {dontUse}
        </span>
      </div>
    </div>
  </div>
);

// WCAG Contrast Ratio Calculator
const getContrastRatio = (hex1: string, hex2: string): number => {
  const getLuminance = (hex: string): number => {
    const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
    const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

const ContrastChecker = () => {
  const [fg, setFg] = useState("#33993c");
  const [bg, setBg] = useState("#ffffff");

  const ratio = getContrastRatio(fg, bg);
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7;

  return (
    <div className="card-base p-6">
      <h4 className="font-ui font-bold text-foreground mb-4">Contrast Checker</h4>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label-tech text-muted-foreground block mb-2">Foreground</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="flex-1 px-3 py-2 font-data text-sm border border-border rounded bg-background"
            />
          </div>
        </div>
        <div>
          <label className="label-tech text-muted-foreground block mb-2">Background</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="flex-1 px-3 py-2 font-data text-sm border border-border rounded bg-background"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div
        className="p-6 rounded-lg mb-4 text-center"
        style={{ backgroundColor: bg, color: fg }}
      >
        <span className="font-ui font-bold text-2xl">Sample Text</span>
        <p className="text-sm mt-1">The quick brown fox jumps over the lazy dog.</p>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-data text-3xl font-bold text-foreground">{ratio.toFixed(2)}:1</span>
          <span className="text-muted-foreground text-sm ml-2">contrast ratio</span>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded font-data text-xs ${passAA ? 'bg-primary text-primary-foreground' : 'bg-red-100 text-destructive'}`}>
            AA {passAA ? '✓' : '✗'}
          </span>
          <span className={`px-3 py-1 rounded font-data text-xs ${passAAA ? 'bg-primary text-primary-foreground' : 'bg-red-100 text-destructive'}`}>
            AAA {passAAA ? '✓' : '✗'}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ColorMatrix = () => {
  const primaryColors: ColorSwatchProps[] = [
    {
      name: "Rhosonics Green",
      hex: "#33993c",
      hsl: "hsl(138, 53%, 40%)",
      usage: "SOLID UI",
      bgClass: "bg-primary",
      textClass: "text-primary-foreground",
      description: "The core identifier of the Rhosonics brand. It represents reliability and active measurement. Use this color to draw attention to the most important actions on the screen.",
      doUse: "Primary Buttons, Active States, Success Icons, Logo",
      dontUse: "Large Backgrounds, Body Text"
    },
    {
      name: "Lime Accent",
      hex: "#73B82E",
      hsl: "hsl(88, 61%, 45%)",
      usage: "GRADIENTS ONLY",
      bgClass: "bg-rho-green-accent",
      textClass: "text-primary-foreground",
      description: "A supporting tone used exclusively to add depth and vibrancy to the primary green. It creates the \"inner glow\" effect seen in our branding.",
      doUse: "Gradients (0% stop), Illustrations, Highlights",
      dontUse: "Solid Buttons, Text (Poor Contrast)"
    },
    {
      name: "Obsidian",
      hex: "#111522",
      hsl: "hsl(225, 33%, 10%)",
      usage: "SURFACE",
      bgClass: "bg-rho-obsidian",
      textClass: "text-slate-100",
      description: "The foundation of our \"Field\" aesthetic. A rich, blue-tinted black that replaces standard black for a more premium, industrial feel. Used for the physical hardware housing.",
      doUse: "Headings, Dark Mode Backgrounds, Hardware UI",
      dontUse: "Pure Black (#000000)"
    },
  ];

  const earthColors: ColorSwatchProps[] = [
    {
      name: "Earth Ochre",
      hex: "#a69359",
      hsl: "hsl(45, 30%, 50%)",
      usage: "FIELD ACCENT",
      bgClass: "bg-earth-ochre",
      textClass: "text-white",
      description: "The primary earth tone representing field operations and mineral processing. Evokes soil, ore, and natural materials found in industrial environments.",
      doUse: "Mining Cards, Field Data, Accent Borders",
      dontUse: "Primary Buttons, Main Backgrounds"
    },
    {
      name: "Earth Sand",
      hex: "#d9d0b8",
      hsl: "hsl(40, 30%, 85%)",
      usage: "SURFACE",
      bgClass: "bg-earth-sand",
      textClass: "text-earth-clay",
      description: "A warm, sandy neutral for field-themed surfaces. Provides subtle warmth without overwhelming the industrial aesthetic.",
      doUse: "Card Backgrounds, Field Module Surfaces",
      dontUse: "Text, Primary Actions"
    },
    {
      name: "Earth Clay",
      hex: "#7a6b4e",
      hsl: "hsl(30, 25%, 45%)",
      usage: "DEEP ACCENT",
      bgClass: "bg-earth-clay",
      textClass: "text-white",
      description: "A rich, deep earth tone for grounding elements. Represents depth and permanence in field applications.",
      doUse: "Borders, Text on Light Earth, Icon Fills",
      dontUse: "Large Backgrounds, Primary UI"
    },
  ];

  const ecoColors: ColorSwatchProps[] = [
    {
      name: "Eco Surface",
      hex: "#ecf8ed",
      hsl: "hsl(126, 43%, 95%)",
      usage: "CARD BG",
      bgClass: "bg-eco-surface",
      textClass: "text-muted-foreground",
      description: "A very subtle green tint used to distinguish \"Eco Pack\" modules from standard operational data. It provides a subconscious cue of sustainability without being overwhelming.",
      doUse: "Eco Card Backgrounds, Success Messages, Alerts",
      dontUse: "Main Page Backgrounds, Text"
    },
    {
      name: "Eco Border",
      hex: "#d9f2db",
      hsl: "hsl(126, 50%, 90%)",
      usage: "ELEMENTS",
      bgClass: "bg-eco-border",
      textClass: "text-muted-foreground",
      description: "Used for structure within Eco modules. It provides separation and definition for sustainable metrics.",
      doUse: "Borders, Dividers, Secondary Icons (Eco Context)",
      dontUse: "Text, Primary Buttons, Solid Fills"
    },
  ];

  const slateColors = [
    { name: "50", hex: "#f8fafc", bg: "bg-slate-50", text: "text-slate-600" },
    { name: "100", hex: "#f1f5f9", bg: "bg-slate-100", text: "text-slate-600" },
    { name: "200", hex: "#e2e8f0", bg: "bg-slate-200", text: "text-slate-600" },
    { name: "300", hex: "#cbd5e1", bg: "bg-slate-300", text: "text-slate-700" },
    { name: "400", hex: "#94a3b8", bg: "bg-slate-400", text: "text-slate-100" },
    { name: "500", hex: "#64748b", bg: "bg-slate-500", text: "text-slate-100" },
    { name: "600", hex: "#475569", bg: "bg-slate-600", text: "text-slate-100" },
    { name: "700", hex: "#334155", bg: "bg-slate-700", text: "text-slate-100" },
    { name: "800", hex: "#1e293b", bg: "bg-slate-800", text: "text-slate-100" },
    { name: "900", hex: "#0f172a", bg: "bg-slate-900", text: "text-slate-100" },
  ];

  const handleCopySlate = async (hex: string, name: string) => {
    await navigator.clipboard.writeText(hex);
    toast.success(`Copied Slate ${name}: ${hex}`);
  };

  return (
    <section id="colors" className="mb-32">
      <h2 className="section-header">Color Matrix</h2>
      <p className="text-muted-foreground mb-8 prose-optimal">
        Click any color value to copy it to your clipboard. All colors include HEX and HSL values for flexibility.
      </p>

      {/* Primary Colors */}
      <div className="flex flex-col gap-6 mb-12">
        {primaryColors.map((color) => (
          <ColorSwatch key={color.hex} {...color} />
        ))}
      </div>

      {/* Earth Colors */}
      <h3 className="label-tech text-earth-ochre mb-4">FIELD AESTHETIC — EARTH TONES</h3>
      <div className="flex flex-col gap-6 mb-12">
        {earthColors.map((color) => (
          <ColorSwatch key={color.hex} {...color} />
        ))}
      </div>

      {/* Eco Colors */}
      <h3 className="label-tech text-primary mb-4">SUSTAINABILITY TINTS</h3>
      <div className="flex flex-col gap-6 mb-12">
        {ecoColors.map((color) => (
          <ColorSwatch key={color.hex} {...color} />
        ))}
      </div>

      {/* Slate Scale */}
      <h3 className="label-tech text-slate-500 mb-4">THE SLATE SCALE</h3>
      <p className="text-muted-foreground text-sm mb-4">Click to copy hex values</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {slateColors.map((shade) => (
          <button
            key={shade.name}
            onClick={() => handleCopySlate(shade.hex, shade.name)}
            className={`swatch-sm ${shade.bg} ${shade.text} cursor-pointer hover:scale-105 transition-transform`}
            title={`Copy ${shade.hex}`}
          >
            <span className="font-data text-xs font-bold">{shade.name}</span>
          </button>
        ))}
      </div>

      {/* Contrast Checker */}
      <div className="mt-12">
        <h3 className="label-tech text-slate-500 mb-4">ACCESSIBILITY</h3>
        <ContrastChecker />
      </div>

      {/* Gradient Examples */}
      <div className="mt-12">
        <h3 className="label-tech text-slate-500 mb-4">BRAND GRADIENTS</h3>
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
          <div className="h-32 rounded-lg flex items-end p-4 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, hsl(45 35% 65%) 0%, hsl(45 30% 50%) 100%)' }}>
            <div className="absolute inset-0 bg-terrain-contour opacity-50" aria-hidden="true" />
            <div className="relative">
              <span className="font-ui font-bold text-white block">Earth Gradient</span>
              <code className="label-tech text-white/70">145° | #c4b88a → #a69359</code>
            </div>
          </div>
        </div>
      </div>

      {/* Terrain Textures */}
      <div className="mt-12">
        <h3 className="label-tech text-earth-ochre mb-4">TERRAIN TEXTURES</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Subtle background patterns that reinforce the field aesthetic. Use sparingly on cards and sections related to mining, minerals, and outdoor operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 rounded-lg border border-earth-ochre/30 bg-earth-sand bg-terrain-contour flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-earth-clay text-sm">Contour Lines</span>
            <span className="label-tech text-earth-ochre/70 text-xs">TOPOGRAPHIC</span>
          </div>
          <div className="h-28 rounded-lg border border-earth-ochre/30 bg-earth-sand bg-terrain-strata flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-earth-clay text-sm">Strata Layers</span>
            <span className="label-tech text-earth-ochre/70 text-xs">GEOLOGICAL</span>
          </div>
          <div className="h-28 rounded-lg border border-earth-ochre/30 bg-earth-sand bg-terrain-grain flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-earth-clay text-sm">Grain Particles</span>
            <span className="label-tech text-earth-ochre/70 text-xs">MINERAL</span>
          </div>
          <div className="h-28 rounded-lg bg-terrain-ore flex flex-col justify-end p-4">
            <span className="font-ui font-medium text-earth-ochre-light text-sm">Ore Deposits</span>
            <span className="label-tech text-earth-ochre/70 text-xs">DARK FIELD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorMatrix;
