import { useState } from "react";
import { FileCode, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadHTML } from "@/lib/htmlExport";
import { toast } from "sonner";

const ExportSection = () => {
  const [isExportingHTML, setIsExportingHTML] = useState(false);

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

  return (
    <section id="export" className="space-y-12 pt-16 border-t border-border">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui font-bold text-2xl md:text-3xl text-foreground mb-4">Export Guidelines</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Download the complete brand system for offline use.
        </p>
      </div>

      {/* Export option */}
      <div className="max-w-md">
        {/* HTML Export */}
        <div className="bg-background p-8 rounded-lg border border-border group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-border flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">HTML File</h3>
              <p className="text-muted-foreground">Self-contained, works offline</p>
            </div>
          </div>
          
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Single file with embedded styles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Interactive elements preserved
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              No internet connection required
            </li>
          </ul>
          
          <Button 
            onClick={handleExportHTML} 
            disabled={isExportingHTML} 
            className="gap-2 chamfer-shape" 
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
    </section>
  );
};

export default ExportSection;
