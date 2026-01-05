import { useState } from "react";
import { FileCode, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadHTML } from "@/lib/htmlExport";
import { toast } from "sonner";

const ExportSection = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await downloadHTML();
      toast.success("Brand guidelines exported successfully");
    } catch (error) {
      toast.error("Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
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
        Download the entire brand guidelines as a single HTML file. Works offline. 
        No dependencies. Print it, email it, put it on a USB stick if that's your thing.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
            <FileCode className="w-6 h-6 text-slate-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-900 mb-1">
              rhosonics-brand-guidelines.html
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Self-contained HTML with embedded CSS and fonts
            </p>
            <Button 
              onClick={handleExport}
              disabled={isExporting}
              className="gap-2"
              data-export-exclude
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download HTML
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
