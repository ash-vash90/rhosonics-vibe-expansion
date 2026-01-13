import { Download, FileImage, Palette, Type, Package } from "lucide-react";
import { RhosonicsLogo } from "../RhosonicsLogo";

const generateCSSVariables = () => `/* Rhosonics Brand Colors */
:root {
  --rho-green: #33993c;
  --rho-lime: #73B82E;
  --rho-obsidian: #111522;
  --mineral-neutral: #8B8F88;
  --mineral-surface: #E7E8E6;
}`;

const generateTailwindConfig = () => `// Rhosonics Tailwind Config
module.exports = {
  theme: {
    extend: {
      colors: {
        'rho-green': '#33993c',
        'rho-lime': '#73B82E',
        'rho-obsidian': '#111522',
      }
    }
  }
}`;

const generateFontCSS = () => `/* Rhosonics Typography */
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

.font-logo { font-family: 'Unbounded', sans-serif; }
.font-ui { font-family: 'Instrument Sans', sans-serif; }
.font-data { font-family: 'JetBrains Mono', monospace; }`;

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

const generateLogoSVG = (variant: 'gradient' | 'green' | 'white' | 'obsidian') => {
  const colors = {
    gradient: { arc1: '#73B82E', arc2: '#4DA832', arc3: '#33993c' },
    green: { arc1: '#33993c', arc2: '#33993c', arc3: '#33993c' },
    white: { arc1: '#ffffff', arc2: '#ffffff', arc3: '#ffffff' },
    obsidian: { arc1: '#111522', arc2: '#111522', arc3: '#111522' },
  };
  const c = colors[variant];
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <path d="M 85 85 A 55 55 0 0 0 30 30" fill="none" stroke="${c.arc1}" stroke-width="8" stroke-linecap="round"/>
  <path d="M 75 75 A 40 40 0 0 0 35 35" fill="none" stroke="${c.arc2}" stroke-width="8" stroke-linecap="round"/>
  <path d="M 65 65 A 25 25 0 0 0 40 40" fill="none" stroke="${c.arc3}" stroke-width="8" stroke-linecap="round"/>
</svg>`;
};

export const DownloadableAssets = () => {
  const handleDownloadAll = () => {
    downloadFile(generateLogoSVG('gradient'), 'rhosonics-logo-gradient.svg', 'image/svg+xml');
    downloadFile(generateLogoSVG('white'), 'rhosonics-logo-white.svg', 'image/svg+xml');
    downloadFile(generateCSSVariables(), 'rhosonics-colors.css', 'text/css');
    downloadFile(generateTailwindConfig(), 'rhosonics-tailwind.js', 'text/javascript');
    downloadFile(generateFontCSS(), 'rhosonics-fonts.css', 'text/css');
  };

  return (
    <section id="downloads" className="mb-16">
      {/* Two-column: Preview + Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Logo Preview */}
        <div className="card-base p-6 bg-slate-50">
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

        {/* Download Categories */}
        <div className="space-y-4">
          {/* Logo Files */}
          <div className="card-base p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FileImage className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-ui font-bold text-foreground">Logo Files</h3>
                <p className="text-xs text-muted-foreground">All approved variants</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['gradient', 'white'].map((variant) => (
                <button
                  key={variant}
                  onClick={() => downloadFile(generateLogoSVG(variant as any), `rhosonics-logo-${variant}.svg`, 'image/svg+xml')}
                  className="flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors text-sm"
                >
                  <span className="capitalize">{variant}</span>
                  <Download className="w-3 h-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Color + Typography */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-base p-4">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-primary" />
                <span className="font-ui font-medium text-sm">Colors</span>
              </div>
              <button
                onClick={() => downloadFile(generateCSSVariables(), 'rhosonics-colors.css', 'text/css')}
                className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded text-xs"
              >
                <span>CSS Variables</span>
                <Download className="w-3 h-3" />
              </button>
            </div>

            <div className="card-base p-4">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-primary" />
                <span className="font-ui font-medium text-sm">Typography</span>
              </div>
              <button
                onClick={() => downloadFile(generateFontCSS(), 'rhosonics-fonts.css', 'text/css')}
                className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded text-xs"
              >
                <span>Font Stack</span>
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All-in-one download - Full width */}
      <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-primary" />
          <div>
            <h4 className="font-ui font-bold text-foreground">Complete Brand Package</h4>
            <p className="text-sm text-muted-foreground">All assets, all formats, one download.</p>
          </div>
        </div>
        <button
          onClick={handleDownloadAll}
          className="chamfer-shape bg-brand-gradient text-primary-foreground px-5 py-2.5 font-data text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>
    </section>
  );
};

export default DownloadableAssets;
