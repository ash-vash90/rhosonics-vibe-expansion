import { useState } from "react";
import { FileCode, FileText, Download, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { downloadHTML } from "@/lib/htmlExport";
import { exportAsPDF } from "@/lib/pdfExport";
import { toast } from "sonner";

const PDFPreview = () => (
  <div className="w-full max-w-[280px] mx-auto">
    {/* PDF Page Preview */}
    <div className="bg-white rounded shadow-lg overflow-hidden border border-slate-200 aspect-[210/297]">
      {/* Header */}
      <div className="bg-[#1c1f1e] px-3 py-2">
        <p className="text-[8px] font-bold text-white tracking-wide">RHOSONICS</p>
        <p className="text-[5px] text-white/70">ULTRASONIC MEASUREMENT SOLUTIONS</p>
      </div>
      
      {/* Content Preview */}
      <div className="p-3 space-y-2">
        {/* Title block */}
        <div className="space-y-1">
          <div className="h-1.5 w-12 bg-slate-200 rounded" />
          <div className="h-3 w-32 bg-slate-300 rounded" />
        </div>
        
        {/* Paragraph blocks */}
        <div className="space-y-0.5 pt-1">
          <div className="h-1 w-full bg-slate-100 rounded" />
          <div className="h-1 w-full bg-slate-100 rounded" />
          <div className="h-1 w-3/4 bg-slate-100 rounded" />
        </div>
        
        {/* Color swatches preview */}
        <div className="flex gap-1 pt-2">
          <div className="w-4 h-4 rounded bg-[#1c1f1e]" />
          <div className="w-4 h-4 rounded bg-[#00e676]" />
          <div className="w-4 h-4 rounded bg-[#a69359]" />
          <div className="w-4 h-4 rounded bg-slate-300" />
        </div>
        
        {/* More content blocks */}
        <div className="space-y-0.5 pt-2">
          <div className="h-1 w-full bg-slate-100 rounded" />
          <div className="h-1 w-5/6 bg-slate-100 rounded" />
        </div>
        
        {/* Grid preview */}
        <div className="grid grid-cols-2 gap-1 pt-2">
          <div className="h-8 bg-slate-50 rounded border border-slate-100" />
          <div className="h-8 bg-slate-50 rounded border border-slate-100" />
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1c1f1e] px-3 py-1 flex justify-between">
        <p className="text-[5px] text-white/70">www.rhosonics.com</p>
        <p className="text-[5px] text-white/70">1 / 12</p>
      </div>
    </div>
    
    <p className="text-xs text-slate-500 text-center mt-3">
      A4 format • Branded headers & footers • Print-ready
    </p>
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
    } catch (error) {
      toast.error("Failed to export HTML. Please try again.");
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
    } catch (error) {
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExportingPDF(false);
      setPdfProgress(0);
    }
  };

  return (
    <section id="export" className="py-16 border-t-2 border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileCode className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="label-ui text-slate-500">EXPORT</p>
          <h2 className="text-2xl font-heading font-semibold text-slate-900">
            Take It With You
          </h2>
        </div>
      </div>
      
      <p className="text-slate-600 mb-8 max-w-2xl">
        Download the entire brand guidelines. HTML works offline with no dependencies. 
        PDF is paginated and print-ready. Choose your format.
      </p>

      <div className="grid gap-4 max-w-2xl sm:grid-cols-2">
        {/* HTML Export */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FileCode className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-slate-900 mb-0.5 truncate">
                HTML File
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                Self-contained, works offline
              </p>
              <Button 
                onClick={handleExportHTML}
                disabled={isExportingHTML || isExportingPDF}
                size="sm"
                className="gap-2"
                data-export-exclude
              >
                {isExportingHTML ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Export */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-slate-900 mb-0.5 truncate">
                PDF Document
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                Paginated, print-ready
              </p>
              <div className="flex gap-2" data-export-exclude>
                <Button 
                  onClick={() => setShowPreview(true)}
                  disabled={isExportingHTML || isExportingPDF}
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button 
                  onClick={handleExportPDF}
                  disabled={isExportingHTML || isExportingPDF}
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  {isExportingPDF ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {pdfProgress > 0 ? `${pdfProgress}%` : '...'}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>PDF Preview</DialogTitle>
            <DialogDescription>
              Sample page layout for the exported document
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 relative">
            <PDFPreview />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportPDF} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExportSection;
