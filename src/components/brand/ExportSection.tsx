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
      <div className="bg-[#1c1f1e] px-3 py-2">
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
          <div className="w-3 h-3 rounded bg-[#1c1f1e]" />
          <div className="w-3 h-3 rounded bg-[#00e676]" />
          <div className="w-3 h-3 rounded bg-[#a69359]" />
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-500 text-center mt-2">A4 • Branded • Print-ready</p>
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
    <section id="export" className="py-12 border-t-2 border-slate-200">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {/* HTML Export */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FileCode className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-0.5">HTML File</h3>
              <p className="text-sm text-muted-foreground mb-3">Self-contained, works offline</p>
              <Button onClick={handleExportHTML} disabled={isExportingHTML || isExportingPDF} size="sm" className="gap-2" data-export-exclude>
                {isExportingHTML ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Download className="w-4 h-4" />Download</>}
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Export */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-0.5">PDF Document</h3>
              <p className="text-sm text-muted-foreground mb-3">Paginated, print-ready</p>
              <div className="flex gap-2" data-export-exclude>
                <Button onClick={() => setShowPreview(true)} disabled={isExportingHTML || isExportingPDF} size="sm" variant="outline" className="gap-1.5">
                  <Eye className="w-4 h-4" />Preview
                </Button>
                <Button onClick={handleExportPDF} disabled={isExportingHTML || isExportingPDF} size="sm" variant="outline" className="gap-1.5">
                  {isExportingPDF ? <><Loader2 className="w-4 h-4 animate-spin" />{pdfProgress > 0 ? `${pdfProgress}%` : '...'}</> : <><Download className="w-4 h-4" />Download</>}
                </Button>
              </div>
            </div>
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
            <Button onClick={handleExportPDF} className="gap-2"><Download className="w-4 h-4" />Download PDF</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExportSection;
