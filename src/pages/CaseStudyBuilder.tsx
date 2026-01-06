import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BuilderInputPanel } from "@/components/case-study-builder/BuilderInputPanel";
import { PreviewControls } from "@/components/case-study-builder/PreviewControls";
import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";
import { VisualCaseStudy, createEmptyCaseStudy } from "@/types/visualCaseStudy";


const STORAGE_KEY = "rhosonics-case-study-draft";

const CaseStudyBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Load from localStorage or create empty
  const [caseStudy, setCaseStudy] = useState<VisualCaseStudy>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createEmptyCaseStudy();
      }
    }
    return createEmptyCaseStudy();
  });
  
  const [zoom, setZoom] = useState(70);
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudy));
    }, 500);
    return () => clearTimeout(timeout);
  }, [caseStudy]);

  const handleChange = useCallback((updates: Partial<VisualCaseStudy>) => {
    setCaseStudy((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePageChange = useCallback((page: 1 | 2) => {
    setActivePage(page);
    // Scroll to page in preview
    if (previewRef.current) {
      const pages = previewRef.current.querySelectorAll("article");
      pages[page - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleExport = useCallback(() => {
    // Validate required fields
    if (!caseStudy.company || !caseStudy.tagline) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in at least the company name and tagline.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    // Store case study data in sessionStorage for the print route
    sessionStorage.setItem("visual-case-study-print", JSON.stringify(caseStudy));
    
    // Open print route (popup-safe)
    const w = window.open("", "_blank");
    if (!w) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to download the PDF.",
        variant: "destructive",
      });
      setIsExporting(false);
      return;
    }
    
    w.location.href = `/case-studies/builder/print?autoprint=1`;
    
    // Reset exporting state after a delay
    setTimeout(() => setIsExporting(false), 2000);
  }, [caseStudy, toast]);

  const handleSaveDraft = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudy));
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Draft Saved",
        description: "Your case study has been saved to this browser.",
      });
    }, 300);
  }, [caseStudy, toast]);

  const handleFullscreen = useCallback(() => {
    // Simple fullscreen: scroll preview to top and focus
    if (previewRef.current) {
      previewRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleClearDraft = useCallback(() => {
    if (confirm("Are you sure you want to clear this draft and start over?")) {
      localStorage.removeItem(STORAGE_KEY);
      setCaseStudy(createEmptyCaseStudy());
      toast({
        title: "Draft Cleared",
        description: "Started a new case study.",
      });
    }
  }, [toast]);

  // Convert VisualCaseStudy to document format
  const documentStudy = useMemo(() => ({
    id: caseStudy.id,
    company: caseStudy.company || "[Company Name]",
    location: caseStudy.location || "[Location]",
    industry: caseStudy.industry || "[Industry]",
    product: caseStudy.product || "[Product]",
    heroImage: caseStudy.heroImage || "",
    chartImage: caseStudy.chartImage || undefined,
    tagline: caseStudy.tagline || "[Enter tagline or headline]",
    challenge: caseStudy.challenge || "[Describe the challenge...]",
    solution: caseStudy.solution || "[Describe the solution...]",
    results: caseStudy.results.filter(r => r.trim()) || ["[Key result 1]"],
    quote: caseStudy.quote?.text ? caseStudy.quote : undefined,
    specs: caseStudy.specs.filter(s => s.label.trim() || s.value.trim()),
    primaryStat: {
      value: caseStudy.primaryStat.value || "—",
      label: caseStudy.primaryStat.label || "[Metric]",
    },
  }), [caseStudy]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/case-studies")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="font-ui font-semibold text-lg">Case Study Builder</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearDraft}
          >
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Draft
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Input */}
        <div className="w-[400px] border-r border-border bg-card flex flex-col flex-shrink-0">
          <div className="flex-1 overflow-hidden">
            <BuilderInputPanel
              caseStudy={caseStudy}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
          {/* Preview Area */}
          <div
            ref={previewRef}
            className="flex-1 overflow-auto p-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
              }}
              className="transition-transform duration-200"
            >
              <CaseStudyDocument
                study={documentStudy}
                editMode
                chartData={caseStudy.chartData}
              />
            </div>
          </div>

          {/* Preview Controls */}
          <PreviewControls
            zoom={zoom}
            onZoomChange={setZoom}
            activePage={activePage}
            onPageChange={handlePageChange}
            onExport={handleExport}
            onFullscreen={handleFullscreen}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyBuilder;
