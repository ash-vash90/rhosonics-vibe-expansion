import { Download, FileImage, Palette, Type, Package } from "lucide-react";
import { RhosonicsLogo } from "../RhosonicsLogo";

interface AssetCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: { name: string; format: string; onClick: () => void }[];
  note?: string;
}

const AssetCategory = ({ title, description, icon, items, note }: AssetCategoryProps) => (
  <div className="card-base p-6">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-ui font-bold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors group"
        >
          <span className="font-ui text-sm text-foreground">{item.name}</span>
          <div className="flex items-center gap-2">
            <span className="label-tech text-muted-foreground">{item.format}</span>
            <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </button>
      ))}
    </div>
    {note && (
      <p className="text-xs text-muted-foreground mt-4 italic">{note}</p>
    )}
  </div>
);

// Generate CSS variables file content
const generateCSSVariables = () => {
  return `/* Rhosonics Brand Colors - CSS Variables */
:root {
  /* Primary Colors */
  --rho-green: #33993c;
  --rho-lime: #73B82E;
  --rho-obsidian: #111522;
  
  /* Earth Tones */
  --earth-ochre: #a69359;
  --earth-sand: #d9d0b8;
  --earth-clay: #7a6b4e;
  --earth-amber: #c9a227;
  
  /* Eco Tints */
  --eco-surface: #ecf8ed;
  --eco-border: #d9f2db;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--rho-lime) 0%, var(--rho-green) 100%);
  --gradient-obsidian: linear-gradient(135deg, #1c2130 0%, var(--rho-obsidian) 100%);
}`;
};

// Generate Tailwind config snippet
const generateTailwindConfig = () => {
  return `// Rhosonics Brand Colors - Tailwind Config
module.exports = {
  theme: {
    extend: {
      colors: {
        'rho-green': '#33993c',
        'rho-lime': '#73B82E',
        'rho-obsidian': '#111522',
        'earth-ochre': '#a69359',
        'earth-sand': '#d9d0b8',
        'earth-clay': '#7a6b4e',
        'earth-amber': '#c9a227',
        'eco-surface': '#ecf8ed',
        'eco-border': '#d9f2db',
      }
    }
  }
}`;
};

// Generate font CSS
const generateFontCSS = () => {
  return `/* Rhosonics Typography - Font Stack */
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Font Usage */
.font-logo { font-family: 'Unbounded', sans-serif; }
.font-ui { font-family: 'Instrument Sans', sans-serif; }
.font-data { font-family: 'JetBrains Mono', monospace; }

/* Role Application */
/* Logo: Unbounded 500 */
/* Display/Headings: Instrument Sans 700 */
/* Body: Instrument Sans 400 */
/* Data/Labels: JetBrains Mono 500, uppercase for labels */`;
};

// Download helper
const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Generate SVG logo
const generateLogoSVG = (variant: 'gradient' | 'green' | 'white' | 'obsidian') => {
  const colors = {
    gradient: { arc1: '#73B82E', arc2: '#4DA832', arc3: '#33993c' },
    green: { arc1: '#33993c', arc2: '#33993c', arc3: '#33993c' },
    white: { arc1: '#ffffff', arc2: '#ffffff', arc3: '#ffffff' },
    obsidian: { arc1: '#111522', arc2: '#111522', arc3: '#111522' },
  };
  const c = colors[variant];
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <title>Rhosonics Logo - ${variant}</title>
  <!-- Arc 1 (outermost) -->
  <path d="M 85 85 A 55 55 0 0 0 30 30" fill="none" stroke="${c.arc1}" stroke-width="8" stroke-linecap="round"/>
  <!-- Arc 2 (middle) -->
  <path d="M 75 75 A 40 40 0 0 0 35 35" fill="none" stroke="${c.arc2}" stroke-width="8" stroke-linecap="round"/>
  <!-- Arc 3 (innermost) -->
  <path d="M 65 65 A 25 25 0 0 0 40 40" fill="none" stroke="${c.arc3}" stroke-width="8" stroke-linecap="round"/>
</svg>`;
};

export const DownloadableAssets = () => {
  const logoCategories = [
    { name: "Logo (Gradient)", format: "SVG", onClick: () => downloadFile(generateLogoSVG('gradient'), 'rhosonics-logo-gradient.svg', 'image/svg+xml') },
    { name: "Logo (Green)", format: "SVG", onClick: () => downloadFile(generateLogoSVG('green'), 'rhosonics-logo-green.svg', 'image/svg+xml') },
    { name: "Logo (White)", format: "SVG", onClick: () => downloadFile(generateLogoSVG('white'), 'rhosonics-logo-white.svg', 'image/svg+xml') },
    { name: "Logo (Obsidian)", format: "SVG", onClick: () => downloadFile(generateLogoSVG('obsidian'), 'rhosonics-logo-obsidian.svg', 'image/svg+xml') },
  ];

  const colorResources = [
    { name: "CSS Variables", format: "CSS", onClick: () => downloadFile(generateCSSVariables(), 'rhosonics-colors.css', 'text/css') },
    { name: "Tailwind Config", format: "JS", onClick: () => downloadFile(generateTailwindConfig(), 'rhosonics-tailwind.js', 'text/javascript') },
  ];

  const typographyResources = [
    { name: "Font Declarations", format: "CSS", onClick: () => downloadFile(generateFontCSS(), 'rhosonics-fonts.css', 'text/css') },
  ];

  return (
    <section id="downloads" className="mb-32">
      <h2 className="section-header">Downloadable Assets</h2>
      <p className="text-muted-foreground mb-8">
        All assets in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Logo Preview */}
        <div className="card-base p-8 bg-slate-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center p-6 border border-slate-200">
              <RhosonicsLogo variant="gradient" className="w-full h-full" />
            </div>
            <div className="aspect-square bg-rho-obsidian rounded-lg flex items-center justify-center p-6">
              <RhosonicsLogo variant="white" className="w-full h-full" />
            </div>
            <div className="aspect-square bg-white rounded-lg flex items-center justify-center p-6 border border-slate-200">
              <RhosonicsLogo variant="gradient" className="w-full h-full" />
            </div>
            <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center p-6">
              <RhosonicsLogo variant="dark" className="w-full h-full" />
            </div>
          </div>
        </div>

        <AssetCategory
          title="Logo Files"
          description="All approved logo variants."
          icon={<FileImage className="w-5 h-5" />}
          items={logoCategories}
          note="Please don't put these on gradient backgrounds."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AssetCategory
          title="Color Resources"
          description="Brand palette in various formats."
          icon={<Palette className="w-5 h-5" />}
          items={colorResources}
          note="More greens than strictly necessary."
        />

        <AssetCategory
          title="Typography Kit"
          description="Font stack and declarations."
          icon={<Type className="w-5 h-5" />}
          items={typographyResources}
        />
      </div>

      {/* All-in-one download */}
      <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <h4 className="font-ui font-bold text-foreground">Complete Brand Package</h4>
              <p className="text-sm text-muted-foreground">All assets, all formats, one download.</p>
            </div>
          </div>
          <button
            onClick={() => {
              // Download all files
              downloadFile(generateLogoSVG('gradient'), 'rhosonics-logo-gradient.svg', 'image/svg+xml');
              downloadFile(generateLogoSVG('green'), 'rhosonics-logo-green.svg', 'image/svg+xml');
              downloadFile(generateLogoSVG('white'), 'rhosonics-logo-white.svg', 'image/svg+xml');
              downloadFile(generateLogoSVG('obsidian'), 'rhosonics-logo-obsidian.svg', 'image/svg+xml');
              downloadFile(generateCSSVariables(), 'rhosonics-colors.css', 'text/css');
              downloadFile(generateTailwindConfig(), 'rhosonics-tailwind.js', 'text/javascript');
              downloadFile(generateFontCSS(), 'rhosonics-fonts.css', 'text/css');
            }}
            className="chamfer-shape bg-brand-gradient text-primary-foreground px-6 py-3 font-data text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>
      </div>
    </section>
  );
};

export default DownloadableAssets;
