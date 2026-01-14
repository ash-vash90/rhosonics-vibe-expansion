import { useState } from "react";
import { FileCode, FileText, Download, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { downloadHTML } from "@/lib/htmlExport";
import { exportAsPDF } from "@/lib/pdfExport";
import { toast } from "sonner";

const PDFPreview = () => (
  <div className="w-full max-w-[240px] mx-auto">
    <div className="bg-white rounded shadow-lg overflow-hidden border border-slate-200 aspect-[210/297]">
      <div className="bg-rho-obsidian px-3 py-2">
        <p className="text-[8px] font-bold text-white tracking-wide">RHOSONICS</p>
      </div>
      <div className="p-3 space-y-2">
        <div className="h-1.5 w-12 bg-slate-200 rounded" />
        <div className="h-3 w-32 bg-slate-300 rounded" />
        <div className="space-y-0.5 pt-1">
          <div className="h-1 w-full bg-slate-100 rounded" />
          <div className="h-1 w-full bg-slate-100 rounded" />
          <div className="h-1 w-3/4 bg-slate-100 rounded" />
        </div>
        <div className="flex gap-1 pt-2">
          <div className="w-3 h-3 rounded bg-rho-obsidian" />
          <div className="w-3 h-3 rounded bg-primary" />
          <div className="w-3 h-3 rounded bg-mineral-neutral" />
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-2">A4 • Branded • Print-ready</p>
  </div>
);

const ExportSection = () => {
  const [isExportingHTML, setIsExportingHTML] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleExportPDF = async () => {
    setShowPreview(false);
    setIsExportingPDF(true);
    setPdfProgress(0);
    try {
      await exportAsPDF((progress) => setPdfProgress(progress));
      toast.success("PDF exported successfully");
    } catch {
      toast.error("Failed to export PDF");
    } finally {
      setIsExportingPDF(false);
      setPdfProgress(0);
    }
  };

  return (
    <section id="export" className="space-y-12 pt-16 border-t border-border">
      {/* Hero Statement */}
      <div>
        <h2 className="font-ui font-bold text-2xl md:text-3xl text-foreground mb-4">Export Guidelines</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Download the complete brand system for offline use or print distribution.
        </p>
      </div>

      {/* Export options - Side by side */}
      <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* HTML Export */}
        <div className="bg-background p-8 group hover:bg-muted/30 transition-colors">
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
            disabled={isExportingHTML || isExportingPDF} 
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

        {/* PDF Export */}
        <div className="bg-background p-8 group hover:bg-muted/30 transition-colors">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-slate-100 border border-border flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui font-bold text-xl text-foreground mb-1">PDF Document</h3>
              <p className="text-muted-foreground">Paginated, print-ready</p>
            </div>
          </div>
          
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              A4 formatted pages
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              High-resolution graphics
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Ready for professional print
            </li>
          </ul>
          
          <div className="flex gap-3" data-export-exclude>
            <Button 
              onClick={() => setShowPreview(true)} 
              disabled={isExportingHTML || isExportingPDF} 
              variant="outline" 
              className="gap-2"
            >
              <Eye className="w-4 h-4" />Preview
            </Button>
            <Button 
              onClick={handleExportPDF} 
              disabled={isExportingHTML || isExportingPDF} 
              className="gap-2 chamfer-shape"
            >
              {isExportingPDF ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{pdfProgress > 0 ? `${pdfProgress}%` : '...'}</>
              ) : (
                <><Download className="w-4 h-4" />Download PDF</>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>PDF Preview</DialogTitle>
            <DialogDescription>Sample page layout</DialogDescription>
          </DialogHeader>
          <div className="py-4"><PDFPreview /></div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>Cancel</Button>
            <Button onClick={handleExportPDF} className="gap-2 chamfer-shape"><Download className="w-4 h-4" />Download PDF</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExportSection;