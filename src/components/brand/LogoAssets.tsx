import { RhosonicsLogo } from "../RhosonicsLogo";
import { BrandCallout } from "./BrandCallout";
import { Download, Monitor, Smartphone, Globe } from "lucide-react";

export const LogoAssets = () => {
  return (
    <section id="logo-assets" className="mb-32">
      <h2 className="section-header">Logo & Identity</h2>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        The logo represents precision, reliability, and technical credibility. 
        It is not decorative — it should always appear deliberate and consistent.
      </p>

      {/* Usage Rules */}
      <div className="mb-8 max-w-2xl">
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use the logo as provided — no modifications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Maintain clear space (height of "R" on all sides)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Minimum size: 40px digital, 10mm print</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use approved color variants only</span>
          </li>
        </ul>
      </div>

      <BrandCallout variant="avoid" title="Misuse Warning" className="mb-12">
        If the logo draws attention to itself, it is being misused.
      </BrandCallout>

      {/* Logo Contexts */}
      <h3 className="label-tech text-slate-500 mb-4">CONTEXT GUIDANCE</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl">
        <div className="card-base p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-primary" />
            <span className="label-tech text-primary">UI</span>
          </div>
          <p className="text-sm text-muted-foreground">Minimal, restrained, secondary</p>
        </div>
        <div className="card-base p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="label-tech text-primary">BRAND</span>
          </div>
          <p className="text-sm text-muted-foreground">Confident, clear, well-spaced</p>
        </div>
        <div className="card-base p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="label-tech text-primary">HARDWARE</span>
          </div>
          <p className="text-sm text-muted-foreground">High contrast, durable, legible</p>
        </div>
      </div>

      {/* Color Variations */}
      <h3 className="label-tech text-slate-500 mb-4">APPROVED VARIANTS</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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

      {/* File Formats */}
      <div className="card-base p-6 max-w-xl">
        <h3 className="label-tech text-slate-500 mb-4">AVAILABLE FORMATS</h3>
        <div className="grid grid-cols-2 gap-4">
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
