import { useState } from "react";
import { FileCode, Download, Loader2, Palette, Type, Package, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadHTML } from "@/lib/htmlExport";
import {
  downloadTokensStudioJSON,
  downloadStyleDictionaryJSON,
  downloadColorSwatchSVG,
  downloadTypographySpecimenSVG,
  downloadFigmaAssetPack,
} from "@/lib/designTokenExport";
import { toast } from "sonner";

const ExportSection = () => {
  const [isExportingHTML, setIsExportingHTML] = useState(false);
  const [isExportingPack, setIsExportingPack] = useState(false);

  const handleExportHTML = async () => {
    setIsExportingHTML(true);
    try {
      await downloadHTML();
      toast.success("HTML exported successfully");
    } catch {
      toast.error("Failed to export HTML");
    } finally {
      setIsExportingHTML(false);
    }
  };

  const handleExportPack = async () => {
    setIsExportingPack(true);
    try {
      await downloadFigmaAssetPack();
      toast.success("Asset pack downloaded (5 files)");
    } catch {
      toast.error("Failed to export asset pack");
    } finally {
      setIsExportingPack(false);
    }
  };

  return (
    <section id="export" className="space-y-12 pt-16 border-t border-border">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui font-bold text-2xl md:text-3xl text-foreground mb-4">Export Guidelines</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Download the brand system for offline use, or sync tokens directly into Figma.
        </p>
      </div>

      {/* Export options grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        
        {/* Figma / Tokens Studio */}
        <div className="bg-background p-8 rounded-lg border border-border group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent border border-border flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">Tokens Studio</h3>
              <p className="text-muted-foreground text-sm">Figma plugin sync</p>
            </div>
          </div>
          
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Colors, typography, spacing tokens
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Import via Tokens Studio plugin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Semantic aliases included
            </li>
          </ul>
          
          <Button
            onClick={() => { downloadTokensStudioJSON(); toast.success("Tokens Studio JSON downloaded"); }}
            className="gap-2 chamfer-shape w-full"
            data-export-exclude
          >
            <Download className="w-4 h-4" />
            Download Tokens JSON
          </Button>
        </div>

        {/* Style Dictionary */}
        <div className="bg-background p-8 rounded-lg border border-border group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent border border-border flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">Style Dictionary</h3>
              <p className="text-muted-foreground text-sm">Multi-platform pipeline</p>
            </div>
          </div>

          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              CSS, iOS, Android output
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              CI/CD compatible format
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Auto-generates Figma variables
            </li>
          </ul>

          <Button
            onClick={() => { downloadStyleDictionaryJSON(); toast.success("Style Dictionary JSON downloaded"); }}
            className="gap-2 chamfer-shape w-full"
            variant="outline"
            data-export-exclude
          >
            <Download className="w-4 h-4" />
            Download Style Dictionary
          </Button>
        </div>

        {/* SVG Assets */}
        <div className="bg-background p-8 rounded-lg border border-border group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent border border-border flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">SVG Reference Sheets</h3>
              <p className="text-muted-foreground text-sm">Drag into Figma frames</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { downloadColorSwatchSVG(); toast.success("Color swatches downloaded"); }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors"
              data-export-exclude
            >
              <Palette className="w-3.5 h-3.5" />
              Colors
            </button>
            <button
              onClick={() => { downloadTypographySpecimenSVG(); toast.success("Type specimen downloaded"); }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors"
              data-export-exclude
            >
              <Type className="w-3.5 h-3.5" />
              Typography
            </button>
          </div>

          <p className="text-xs text-muted-foreground">Individual SVG files for quick Figma import</p>
        </div>

        {/* HTML Export */}
        <div className="bg-background p-8 rounded-lg border border-border group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent border border-border flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">HTML File</h3>
              <p className="text-muted-foreground text-sm">Self-contained, works offline</p>
            </div>
          </div>

          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Single file with embedded styles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Interactive elements preserved
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              No internet connection required
            </li>
          </ul>

          <Button 
            onClick={handleExportHTML} 
            disabled={isExportingHTML} 
            className="gap-2 chamfer-shape w-full" 
            variant="outline"
            data-export-exclude
          >
            {isExportingHTML ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Generating...</>
            ) : (
              <><Download className="w-4 h-4" />Download HTML</>
            )}
          </Button>
        </div>
      </div>

      {/* Full asset pack */}
      <div className="max-w-3xl p-6 rounded-lg border border-primary/20 bg-primary/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-ui font-bold text-foreground mb-1">Complete Figma Starter Pack</h3>
            <p className="text-sm text-muted-foreground">Tokens JSON + Style Dictionary + SVG sheets + setup README</p>
          </div>
          <Button
            onClick={handleExportPack}
            disabled={isExportingPack}
            className="gap-2 chamfer-shape"
            data-export-exclude
          >
            {isExportingPack ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Downloading...</>
            ) : (
              <><Download className="w-4 h-4" />Download All (5 files)</>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
