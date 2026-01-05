import { useState } from "react";
import { FileCode, FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadHTML } from "@/lib/htmlExport";
import { exportAsPDF } from "@/lib/pdfExport";
import { toast } from "sonner";

const ExportSection = () => {
  const [isExportingHTML, setIsExportingHTML] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);

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
              <Button 
                onClick={handleExportPDF}
                disabled={isExportingHTML || isExportingPDF}
                size="sm"
                variant="outline"
                className="gap-2"
                data-export-exclude
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {pdfProgress > 0 ? `${pdfProgress}%` : 'Preparing...'}
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
    </section>
  );
};

export default ExportSection;
