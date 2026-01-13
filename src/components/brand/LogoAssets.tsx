import { RhosonicsLogo } from "../RhosonicsLogo";
import { BrandCallout } from "./BrandCallout";
import { Download, Monitor, Smartphone, Globe } from "lucide-react";

export const LogoAssets = () => {
  return (
    <section id="logo-assets" className="mb-32">
      <h2 className="section-header">Logo & Identity</h2>
      <p className="text-muted-foreground mb-4 max-w-2xl">
        The Rhosonics logo represents precision, reliability, and technical credibility. 
        It is not a decorative element. It should always appear deliberate, controlled, and consistent.
      </p>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        The logo does not adapt to contexts — contexts adapt to the logo.
      </p>

      {/* Logo Philosophy */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logo Philosophy</h3>
        <p className="text-muted-foreground mb-4">
          The Rhosonics logo is treated as an engineered mark, not a graphic motif. 
          Its strength comes from consistency, restraint, and correct application.
        </p>
        <p className="text-muted-foreground">
          Overuse, effects, or reinterpretation reduce trust.
        </p>
      </div>

      {/* Logo Usage Rules */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logo Usage Rules</h3>
        <ul className="space-y-2 text-muted-foreground mb-6 max-w-2xl">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use the logo <strong className="text-foreground">as provided</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Maintain clear space at all times</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use approved color variants only</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Place the logo where it can breathe — never crowded</span>
          </li>
        </ul>
      </div>

      {/* Minimum Size & Clear Space */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Size & Clear Space Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Minimum Size */}
          <div className="card-base p-6">
            <div className="label-tech text-primary mb-3">MINIMUM SIZE</div>
            <div className="flex items-end gap-6 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-2 border-dashed border-primary/50 flex items-center justify-center">
                  <RhosonicsLogo variant="gradient" className="w-10 h-10" />
                </div>
                <span className="text-xs text-muted-foreground mt-2">40px</span>
                <span className="text-xs text-primary font-medium">Digital min</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 border-2 border-dashed border-destructive/50 flex items-center justify-center opacity-50">
                  <RhosonicsLogo variant="gradient" className="w-6 h-6" />
                </div>
                <span className="text-xs text-destructive mt-2">24px</span>
                <span className="text-xs text-destructive font-medium">Too small</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Digital:</strong> 40px minimum width<br />
              <strong>Print:</strong> 10mm minimum width
            </p>
          </div>

          {/* Clear Space */}
          <div className="card-base p-6">
            <div className="label-tech text-primary mb-3">CLEAR SPACE</div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                {/* Clear space indicator */}
                <div className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded"></div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-1">
                  <span className="text-[10px] text-primary bg-card px-1">R</span>
                </div>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-1">
                  <span className="text-[10px] text-primary bg-card px-1">R</span>
                </div>
                <div className="w-12 h-12">
                  <RhosonicsLogo variant="gradient" />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Clear space equals the height of the "R" character on all sides. 
              Nothing may enter this zone.
            </p>
          </div>
        </div>
      </div>

      {/* Avoid */}
      <div className="mb-8 max-w-2xl">
        <h4 className="label-tech text-slate-500 mb-3">AVOID</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Stretching or compressing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Recoloring outside approved variants</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Adding effects, gradients, or shadows</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Using the logo as a background pattern</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-1">✗</span>
            <span>Displaying below minimum size (40px digital, 10mm print)</span>
          </li>
        </ul>
      </div>

      <BrandCallout variant="avoid" title="Misuse Warning">
        If the logo draws attention to itself, it is being misused.
      </BrandCallout>
      {/* Logo Context Guidance */}
      <div className="mt-12 mb-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logo in Context</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-primary" />
              <span className="label-tech text-primary">UI CONTEXTS</span>
            </div>
            <p className="text-sm text-muted-foreground">Minimal, restrained, secondary</p>
          </div>
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="label-tech text-primary">BRAND CONTEXTS</span>
            </div>
            <p className="text-sm text-muted-foreground">Confident, clear, properly spaced</p>
          </div>
          <div className="card-base p-4">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="label-tech text-primary">HARDWARE CONTEXTS</span>
            </div>
            <p className="text-sm text-muted-foreground">High contrast, durable, legible</p>
          </div>
        </div>
      </div>

      {/* Logo Contexts */}
      <div className="mb-12">
        <h3 className="label-tech text-slate-500 mb-6">LOGO APPLICATIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* App Icon */}
          <div className="card-base p-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <RhosonicsLogo variant="white" className="w-12 h-12" />
            </div>
            <span className="label-tech text-muted-foreground">APP ICON</span>
          </div>

          {/* Light Background */}
          <div className="card-base p-6 flex flex-col items-center bg-white">
            <div className="h-20 flex items-center justify-center mb-4">
              <RhosonicsLogo variant="gradient" className="w-16 h-16" />
            </div>
            <span className="label-tech text-slate-500">LIGHT BACKGROUND</span>
          </div>

          {/* Dark Background */}
          <div className="card-base p-6 flex flex-col items-center bg-slate-900">
            <div className="h-20 flex items-center justify-center mb-4">
              <RhosonicsLogo variant="white" className="w-16 h-16" />
            </div>
            <span className="label-tech text-slate-400">DARK BACKGROUND</span>
          </div>
        </div>
      </div>

      {/* Color Variations */}
      <div className="mb-12">
        <h3 className="label-tech text-slate-500 mb-6">APPROVED COLOR VARIANTS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-base p-4 bg-white flex flex-col items-center">
            <RhosonicsLogo variant="gradient" className="w-12 h-12 mb-3" />
            <span className="text-xs text-slate-600">Gradient on Light</span>
          </div>
          <div className="card-base p-4 bg-slate-900 flex flex-col items-center">
            <RhosonicsLogo variant="white" className="w-12 h-12 mb-3" />
            <span className="text-xs text-slate-400">White on Dark</span>
          </div>
          <div className="card-base p-4 bg-primary flex flex-col items-center">
            <RhosonicsLogo variant="white" className="w-12 h-12 mb-3" />
            <span className="text-xs text-white/80">White on Brand</span>
          </div>
          <div className="card-base p-4 bg-white flex flex-col items-center">
            <RhosonicsLogo variant="dark" className="w-12 h-12 mb-3" />
            <span className="text-xs text-slate-600">Dark on Light</span>
          </div>
        </div>
      </div>

      {/* File Formats */}
      <div className="card-base p-6">
        <h3 className="label-tech text-slate-500 mb-4">AVAILABLE FORMATS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { format: "SVG", use: "Web, UI, scalable" },
            { format: "PNG", use: "Digital, presentations" },
            { format: "PDF", use: "Print, documents" },
            { format: "EPS", use: "Professional print" },
          ].map((file) => (
            <div key={file.format} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Download className="w-4 h-4 text-primary" />
              <div>
                <span className="font-data text-sm text-foreground">{file.format}</span>
                <p className="text-xs text-muted-foreground">{file.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoAssets;
