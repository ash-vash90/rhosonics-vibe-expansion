import { Download, FileImage, FileText, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { toast } from "sonner";

const AssetCard = ({
  title,
  description,
  icon: Icon,
  formats,
  preview,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  formats: string[];
  preview?: React.ReactNode;
}) => {
  const handleDownload = (format: string) => {
    toast.info(`${title} (${format}) download would start here.`, {
      description: "In production, this would download the actual asset file.",
    });
  };

  return (
    <div className="card-base p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-ui font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {preview && (
        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          {preview}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <Button
            key={format}
            variant="outline"
            size="sm"
            onClick={() => handleDownload(format)}
            className="gap-2"
          >
            <Download className="w-3 h-3" />
            {format}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ColorPalettePreview = () => (
  <div className="flex gap-2">
    <div className="w-8 h-8 rounded bg-primary" title="Rhosonics Green" />
    <div className="w-8 h-8 rounded bg-rho-green-accent" title="Lime Accent" />
    <div className="w-8 h-8 rounded bg-rho-obsidian" title="Obsidian" />
    <div className="w-8 h-8 rounded bg-earth-ochre" title="Earth Ochre" />
    <div className="w-8 h-8 rounded bg-earth-sand" title="Earth Sand" />
    <div className="w-8 h-8 rounded bg-eco-surface border border-eco-border" title="Eco Surface" />
  </div>
);

const CSSVariablesPreview = () => (
  <pre className="text-xs font-data text-muted-foreground overflow-x-auto">
{`:root {
  --rho-green: #33993c;
  --rho-green-accent: #73B82E;
  --rho-obsidian: #111522;
  --earth-ochre: #a69359;
  /* ... more variables */
}`}
  </pre>
);

export const BrandAssets = () => {
  return (
    <section id="downloads" className="mb-32">
      <h2 className="section-header">Brand Assets</h2>
      <p className="text-muted-foreground mb-8 prose-optimal">
        Download official Rhosonics brand assets for use in your projects. All assets are provided in multiple formats for maximum flexibility.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Package */}
        <AssetCard
          title="Logo Package"
          description="Primary logo in various formats and color variants"
          icon={FileImage}
          formats={["SVG", "PNG", "PDF", "EPS"]}
          preview={
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-16">
                <RhosonicsLogo variant="gradient" />
              </div>
              <div className="w-16 h-16 bg-rho-obsidian rounded-lg p-2">
                <RhosonicsLogo variant="white" />
              </div>
            </div>
          }
        />

        {/* Color Palette */}
        <AssetCard
          title="Color Palette"
          description="Complete color system with primary, earth, and eco tones"
          icon={Palette}
          formats={["ASE", "CSS", "JSON", "SCSS"]}
          preview={<ColorPalettePreview />}
        />

        {/* Typography Kit */}
        <AssetCard
          title="Typography Kit"
          description="Font files and usage guidelines"
          icon={Type}
          formats={["WOFF2", "TTF", "PDF Guide"]}
          preview={
            <div className="space-y-2">
              <p className="font-logo text-lg">Unbounded — Logo Font</p>
              <p className="font-ui text-base">Instrument Sans — UI Font</p>
              <p className="font-data text-sm">JetBrains Mono — Data Font</p>
            </div>
          }
        />

        {/* CSS Variables */}
        <AssetCard
          title="CSS Variables"
          description="Complete design token system for web projects"
          icon={FileText}
          formats={["CSS", "SCSS", "Tailwind Config"]}
          preview={<CSSVariablesPreview />}
        />
      </div>

      {/* Quick Copy Section */}
      <div className="mt-12">
        <h3 className="label-tech text-slate-500 mb-4">QUICK REFERENCE</h3>
        <div className="card-earth p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-terrain-contour opacity-30" aria-hidden="true" />
          <div className="relative">
            <h4 className="font-ui font-bold text-earth-clay mb-4">Brand Colors (Copy-Ready)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-data text-sm">
              <div>
                <p className="text-earth-ochre mb-2">Primary Palette</p>
                <code className="block text-earth-clay bg-white/50 p-2 rounded">
                  --primary: #33993c;<br />
                  --accent: #73B82E;<br />
                  --obsidian: #111522;
                </code>
              </div>
              <div>
                <p className="text-earth-ochre mb-2">Earth Tones</p>
                <code className="block text-earth-clay bg-white/50 p-2 rounded">
                  --ochre: #a69359;<br />
                  --sand: #d9d0b8;<br />
                  --clay: #7a6b4e;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="mt-8 p-6 bg-eco-surface border border-eco-border rounded-lg">
        <h4 className="font-ui font-bold text-foreground mb-2">Usage Guidelines</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Always maintain clear space around the logo equal to the height of the inner arc</li>
          <li>• Never alter the logo colors outside of approved variants</li>
          <li>• Use gradient logo on light backgrounds, white logo on dark backgrounds</li>
          <li>• Minimum logo size: 24px height for digital, 10mm for print</li>
        </ul>
      </div>
    </section>
  );
};

export default BrandAssets;
