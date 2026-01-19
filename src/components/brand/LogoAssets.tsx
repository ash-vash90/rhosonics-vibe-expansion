import { RhosonicsLogo } from "../RhosonicsLogo";
import { BrandCallout } from "./BrandCallout";
import { LogoDownloadButtons } from "./LogoDownloadButtons";
import { Check, X } from "lucide-react";
import { 
  logoVariants, 
  generateLockupSVG, 
  generateVerticalLockupSVG,
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
    
    let svg: string;
    if (variant.layout === "vertical") {
      svg = generateVerticalLockupSVG(variant);
    } else if (variant.layout === "horizontal") {
      svg = generateLockupSVG(variant);
    } else {
      svg = generateIconOnlySVG(variant);
    }
    downloadSVG(svg, `rhosonics-${variantId}`);
  };

  const handleDownloadPNG = async (variantId: string, scale: number) => {
    const variant = logoVariants.find(v => v.id === variantId);
    if (!variant) return;
    
    setDownloading(`${variantId}-${scale}x`);
    try {
      let svg: string;
      if (variant.layout === "vertical") {
        svg = generateVerticalLockupSVG(variant);
      } else if (variant.layout === "horizontal") {
        svg = generateLockupSVG(variant);
      } else {
        svg = generateIconOnlySVG(variant);
      }
      await downloadPNG(svg, `rhosonics-${variantId}`, scale);
    } finally {
      setDownloading(null);
    }
  };

  // Render a preview of the logo variant
  const renderVariantPreview = (variant: typeof logoVariants[0]) => {
    // Handle background types properly
    let bgClass = "bg-white border border-border";
    
    if (variant.background) {
      if (variant.backgroundType === "primary") {
        bgClass = "bg-gradient-to-br from-[hsl(88_60%_45%)] to-[hsl(125_50%_40%)]";
      } else if (variant.backgroundType === "obsidian") {
        bgClass = "bg-gradient-to-br from-slate-800 to-slate-950";
      } else if (variant.backgroundType === "white") {
        bgClass = "bg-white border border-border";
      }
    } else if (variant.textColor === "#ffffff") {
      bgClass = "bg-slate-900";
    }

    // Optical sizing: 150% ratio - text-2xl(24px) → 36px icon
    // Vertical layout uses smaller text with icon stacked above
    const isVertical = variant.layout === "vertical";
    
    return (
      <div className={`${bgClass} rounded-lg p-8 flex items-center justify-center min-h-[120px] ${isVertical ? '' : 'aspect-square'}`}>
        {variant.layout === "horizontal" ? (
          <div className="flex items-center gap-3">
            <RhosonicsLogo 
              variant={variant.iconFill === "white" ? "white" : "gradient"} 
              className="w-9 h-9" 
            />
            <span 
              className="font-logo text-2xl font-semibold tracking-wide"
              style={{ color: variant.textColor }}
            >
              RHOSONICS
            </span>
          </div>
        ) : variant.layout === "vertical" ? (
          <div className="flex flex-col items-center gap-3">
            <RhosonicsLogo 
              variant={variant.iconFill === "white" ? "white" : "gradient"} 
              className="w-12 h-12" 
            />
            <span 
              className="font-logo text-lg font-semibold tracking-wide"
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

      {/* Horizontal Lockups */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Horizontal Lockups</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoVariants.filter(v => v.layout === "horizontal").map((variant) => (
            <div key={variant.id} className="group">
              {renderVariantPreview(variant)}
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-ui font-semibold text-sm text-foreground">{variant.name}</h4>
                  <p className="text-xs text-muted-foreground">{variant.description}</p>
                </div>
                <LogoDownloadButtons
                  variantId={variant.id}
                  downloading={downloading}
                  onDownloadSVG={handleDownloadSVG}
                  onDownloadPNG={handleDownloadPNG}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical/Stacked Lockups */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Vertical Lockups</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoVariants.filter(v => v.layout === "vertical").map((variant) => (
            <div key={variant.id} className="group">
              {renderVariantPreview(variant)}
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-ui font-semibold text-sm text-foreground">{variant.name}</h4>
                  <p className="text-xs text-muted-foreground">{variant.description}</p>
                </div>
                <LogoDownloadButtons
                  variantId={variant.id}
                  downloading={downloading}
                  onDownloadSVG={handleDownloadSVG}
                  onDownloadPNG={handleDownloadPNG}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon-Only Marks */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Icon Marks</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {logoVariants.filter(v => v.layout === "icon-only").map((variant) => (
            <div key={variant.id} className="group">
              {renderVariantPreview(variant)}
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="font-ui font-semibold text-sm text-foreground">{variant.name}</h4>
                  <p className="text-xs text-muted-foreground">{variant.description}</p>
                </div>
                <LogoDownloadButtons
                  variantId={variant.id}
                  downloading={downloading}
                  onDownloadSVG={handleDownloadSVG}
                  onDownloadPNG={handleDownloadPNG}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Usage Examples - Visual Do/Don't Grid */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Logo Usage</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-lg overflow-hidden">
          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border mb-3">
              <div className="border-2 border-dashed border-primary/30 p-3">
                <div className="w-10 h-10"><RhosonicsLogo variant="gradient" /></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-primary">✓</span>
              <span className="font-ui text-sm font-medium text-primary">Proper spacing</span>
            </div>
          </div>

          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-rho-obsidian rounded mb-3">
              <div className="w-10 h-10"><RhosonicsLogo variant="white" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-primary">✓</span>
              <span className="font-ui text-sm font-medium text-primary">Approved colors</span>
            </div>
          </div>

          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border mb-3">
              <div className="w-10 h-10 rotate-45"><RhosonicsLogo variant="gradient" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-ui text-sm font-medium text-destructive">Rotate</span>
            </div>
          </div>

          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border mb-3">
              <div className="w-16 h-8"><RhosonicsLogo variant="gradient" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-ui text-sm font-medium text-destructive">Distort</span>
            </div>
          </div>

          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border mb-3">
              <div className="w-10 h-10 drop-shadow-[0_0_10px_rgba(51,153,60,0.8)]"><RhosonicsLogo variant="gradient" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-ui text-sm font-medium text-destructive">Add effects</span>
            </div>
          </div>

          <div className="bg-background p-6">
            <div className="h-24 flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded mb-3">
              <div className="w-10 h-10"><RhosonicsLogo variant="white" /></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs bg-destructive">✕</span>
              <span className="font-ui text-sm font-medium text-destructive">Busy backgrounds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Rules - inline list, no cards */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Usage Rules</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4">
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

      {/* Dos & Don'ts */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Dos & Don'ts</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
          <div className="p-8 bg-eco-surface border-r border-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </span>
              <h4 className="font-ui font-bold text-xl text-foreground">Always</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Maintain minimum clear space around the logo",
                "Use high contrast for data displays",
                "Include units with all measurements",
                "Use chamfered button shape for CTAs",
                "Apply brand colors from approved palette",
                "Use semantic font roles consistently"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-error-surface">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </span>
              <h4 className="font-ui font-bold text-xl text-foreground">Never</h4>
            </div>
            <ul className="space-y-3">
              {[
                "Add drop shadows or glows to the logo",
                "Use decorative or script fonts",
                "Apply gradient to body text",
                "Use Lime Accent as a standalone color",
                "Rotate or distort the logo",
                "Use Unbounded for anything except the wordmark"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoAssets;
