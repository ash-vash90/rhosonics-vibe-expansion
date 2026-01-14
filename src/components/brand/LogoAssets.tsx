import { RhosonicsLogo } from "../RhosonicsLogo";
import { BrandCallout } from "./BrandCallout";
import { Download, FileImage, FileCode } from "lucide-react";
import { 
  logoVariants, 
  generateLockupSVG, 
  generateIconOnlySVG,
  downloadSVG, 
  downloadPNG 
} from "@/lib/logoExport";
import { useState } from "react";

export const LogoAssets = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownloadSVG = (variantId: string) => {
    const variant = logoVariants.find(v => v.id === variantId);
    if (!variant) return;
    
    const svg = variant.hasText ? generateLockupSVG(variant) : generateIconOnlySVG(variant);
    downloadSVG(svg, `rhosonics-${variantId}`);
  };

  const handleDownloadPNG = async (variantId: string) => {
    const variant = logoVariants.find(v => v.id === variantId);
    if (!variant) return;
    
    setDownloading(variantId);
    try {
      const svg = variant.hasText ? generateLockupSVG(variant) : generateIconOnlySVG(variant);
      await downloadPNG(svg, `rhosonics-${variantId}`, 2);
    } finally {
      setDownloading(null);
    }
  };

  // Render a preview of the logo variant
  const renderVariantPreview = (variant: typeof logoVariants[0]) => {
    // Handle background types properly
    let bgClass = "bg-white border border-border";
    
    if (variant.background) {
      if (variant.backgroundType === "lime") {
        bgClass = "bg-gradient-to-br from-lime-400 to-lime-600";
      } else if (variant.backgroundType === "obsidian") {
        bgClass = "bg-gradient-to-br from-slate-800 to-slate-950";
      }
    } else if (variant.textColor === "#ffffff") {
      bgClass = "bg-slate-900";
    }

    // Optical sizing: 44px icon = 32px text (0.73 ratio for base/default preview)
    return (
      <div className={`${bgClass} rounded-lg p-8 flex items-center justify-center min-h-[120px] aspect-square`}>
        {variant.hasText ? (
          <div className="flex items-center gap-3">
            <RhosonicsLogo 
              variant={variant.iconFill === "white" ? "white" : "gradient"} 
              className="w-11 h-11" 
            />
            <span 
              className="font-logo text-2xl font-semibold tracking-wide"
              style={{ color: variant.textColor }}
            >
              RHOSONICS
            </span>
          </div>
        ) : (
          <RhosonicsLogo 
            variant={variant.iconFill === "white" ? "white" : "gradient"} 
            className="w-16 h-16"
          />
        )}
      </div>
    );
  };

  return (
    <section id="logo-assets" className="space-y-20">
      {/* Intro */}
      <div className="max-w-2xl">
        <p className="text-muted-foreground text-lg mb-8">
          The logo represents precision, reliability, and technical credibility. 
          It is not decorative — it should always appear deliberate and consistent.
        </p>
        
        <BrandCallout variant="avoid" title="Misuse Warning">
          If the logo draws attention to itself, it is being misused.
        </BrandCallout>
      </div>

      {/* Logo Lockups - MAIN DOWNLOAD SECTION */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Logo Lockups</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoVariants.map((variant) => (
            <div key={variant.id} className="group">
              {/* Preview */}
              {renderVariantPreview(variant)}
              
              {/* Info & Downloads */}
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-ui font-semibold text-sm text-foreground">{variant.name}</h4>
                  <p className="text-xs text-muted-foreground">{variant.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadSVG(variant.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    SVG
                  </button>
                  <button
                    onClick={() => handleDownloadPNG(variant.id)}
                    disabled={downloading === variant.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors disabled:opacity-50"
                  >
                    <FileImage className="w-3.5 h-3.5" />
                    {downloading === variant.id ? "..." : "PNG @2x"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Rules - inline list, no cards */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Usage Rules</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4">
          {[
            "Use the logo as provided — no modifications",
            "Maintain clear space (height of 'R' on all sides)",
            "Minimum size: 40px digital, 10mm print",
            "Use approved color variants only"
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-data text-xs text-primary mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-muted-foreground text-sm">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Variants - HORIZONTAL STRIP */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Quick Reference</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        {/* Full-width horizontal strip */}
        <div className="flex -mx-6">
          <div className="flex-1 p-8 bg-white border-y border-l border-border flex flex-col items-center justify-center gap-4">
            <RhosonicsLogo variant="gradient" className="w-14 h-14" />
            <span className="font-data text-xs text-muted-foreground">Gradient on Light</span>
          </div>
          <div className="flex-1 p-8 bg-slate-900 border-y border-slate-800 flex flex-col items-center justify-center gap-4">
            <RhosonicsLogo variant="white" className="w-14 h-14" />
            <span className="font-data text-xs text-slate-500">White on Dark</span>
          </div>
          <div className="flex-1 p-8 bg-primary border-y flex flex-col items-center justify-center gap-4">
            <RhosonicsLogo variant="white" className="w-14 h-14" />
            <span className="font-data text-xs text-white/70">White on Brand</span>
          </div>
          <div className="flex-1 p-8 bg-white border-y border-r border-border flex flex-col items-center justify-center gap-4">
            <RhosonicsLogo variant="dark" className="w-14 h-14" />
            <span className="font-data text-xs text-muted-foreground">Dark on Light</span>
          </div>
        </div>
      </div>

      {/* Logo Contexts - inline badges */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Usage Contexts</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="flex flex-wrap gap-6">
          {[
            { label: "UI", desc: "Minimal, restrained, secondary" },
            { label: "BRAND", desc: "Confident, clear, well-spaced" },
            { label: "HARDWARE", desc: "High contrast, durable, legible" },
          ].map(ctx => (
            <div key={ctx.label} className="flex items-center gap-3">
              <span className="font-data text-xs bg-primary text-white px-2 py-1">{ctx.label}</span>
              <span className="text-sm text-muted-foreground">{ctx.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Formats - horizontal table style */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Available Formats</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border overflow-hidden rounded-lg">
          {[
            { format: "SVG", use: "Web, UI, scalable" },
            { format: "PNG", use: "Digital, presentations" },
            { format: "PDF", use: "Print, documents" },
            { format: "EPS", use: "Professional print" },
          ].map((file, i) => (
            <div 
              key={file.format} 
              className={`p-6 flex items-center gap-4 hover:bg-muted/30 transition-colors ${i > 0 ? 'border-l border-border' : ''}`}
            >
              <Download className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <span className="font-data text-sm text-foreground block">{file.format}</span>
                <span className="text-xs text-muted-foreground">{file.use}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoAssets;
