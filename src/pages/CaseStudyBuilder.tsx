import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, FolderOpen, Cloud, CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { BuilderInputPanel } from "@/components/case-study-builder/BuilderInputPanel";
import { PreviewControls } from "@/components/case-study-builder/PreviewControls";
import { CaseStudyLibrary } from "@/components/case-study-builder/CaseStudyLibrary";
import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";
import { VisualCaseStudy, createEmptyCaseStudy } from "@/types/visualCaseStudy";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const STORAGE_KEY = "rhosonics-case-study-draft";

const CaseStudyBuilder = () => {
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id?: string }>();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  
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
  
  const [supabaseId, setSupabaseId] = useState<string | null>(paramId || null);
  const [zoom, setZoom] = useState(70);
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isLoadingFromDb, setIsLoadingFromDb] = useState(!!paramId);

  // Load from Supabase if paramId provided
  useEffect(() => {
    if (paramId && user) {
      loadFromSupabase(paramId);
    } else if (paramId && !authLoading && !user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to edit saved case studies.",
        variant: "destructive",
      });
      navigate("/case-studies/builder");
    }
  }, [paramId, user, authLoading]);

  const loadFromSupabase = async (id: string) => {
    setIsLoadingFromDb(true);
    const { data, error } = await supabase
      .from("visual_case_studies")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({
        title: "Not Found",
        description: "Could not find the requested case study.",
        variant: "destructive",
      });
      navigate("/case-studies/builder");
    } else {
      const content = typeof data.content === "string" 
        ? JSON.parse(data.content) 
        : data.content;
      setCaseStudy(content as VisualCaseStudy);
      setSupabaseId(data.id);
    }
    setIsLoadingFromDb(false);
  };

  // Auto-save to localStorage
  useEffect(() => {
    if (isLoadingFromDb) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudy));
    }, 500);
    return () => clearTimeout(timeout);
  }, [caseStudy, isLoadingFromDb]);

  const handleChange = useCallback((updates: Partial<VisualCaseStudy>) => {
    setCaseStudy((prev) => ({ ...prev, ...updates }));
  }, []);

  const handlePageChange = useCallback((page: 1 | 2) => {
    setActivePage(page);
    if (previewRef.current) {
      const pages = previewRef.current.querySelectorAll("article");
      pages[page - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleExport = useCallback(() => {
    if (!caseStudy.company || !caseStudy.tagline) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in at least the company name and tagline.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    sessionStorage.setItem("visual-case-study-print", JSON.stringify(caseStudy));
    
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
    setTimeout(() => setIsExporting(false), 2000);
  }, [caseStudy, toast]);

  const handleSaveToCloud = useCallback(async () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save case studies to the cloud.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!caseStudy.company) {
      toast({
        title: "Missing Company Name",
        description: "Please enter a company name before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (supabaseId) {
        // Update existing
        const { error } = await supabase
          .from("visual_case_studies")
          .update({
            name: caseStudy.company,
            content: JSON.parse(JSON.stringify(caseStudy)),
          })
          .eq("id", supabaseId);

        if (error) throw error;

        toast({
          title: "Saved",
          description: "Case study updated in your library.",
        });
      } else {
        // Create new
        const { data, error } = await supabase
          .from("visual_case_studies")
          .insert([{
            user_id: user.id,
            name: caseStudy.company,
            content: JSON.parse(JSON.stringify(caseStudy)),
          }])
          .select("id")
          .single();

        if (error) throw error;

        setSupabaseId(data.id);
        toast({
          title: "Saved",
          description: "Case study added to your library.",
        });
      }
    } catch (err) {
      console.error("Save error:", err);
      toast({
        title: "Save Failed",
        description: "Could not save case study. Please try again.",
        variant: "destructive",
      });
    }

    setIsSaving(false);
  }, [user, caseStudy, supabaseId, toast, navigate]);

  const handleSaveLocal = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caseStudy));
    toast({
      title: "Draft Saved",
      description: "Your case study has been saved locally.",
    });
  }, [caseStudy, toast]);

  const handleFullscreen = useCallback(() => {
    if (previewRef.current) {
      previewRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleClearDraft = useCallback(() => {
    if (confirm("Are you sure you want to clear this draft and start over?")) {
      localStorage.removeItem(STORAGE_KEY);
      setCaseStudy(createEmptyCaseStudy());
      setSupabaseId(null);
      navigate("/case-studies/builder", { replace: true });
      toast({
        title: "Draft Cleared",
        description: "Started a new case study.",
      });
    }
  }, [toast, navigate]);

  const handleSelectFromLibrary = useCallback((saved: { id: string; content: VisualCaseStudy }) => {
    setCaseStudy(saved.content);
    setSupabaseId(saved.id);
    setShowLibrary(false);
    navigate(`/case-studies/builder/${saved.id}`, { replace: true });
    toast({
      title: "Loaded",
      description: "Case study loaded for editing.",
    });
  }, [navigate, toast]);

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
    results: caseStudy.results.filter(r => r.trim()).length > 0 
      ? caseStudy.results.filter(r => r.trim()) 
      : ["[Key result 1]"],
    quote: caseStudy.quote?.text ? caseStudy.quote : undefined,
    specs: caseStudy.specs.filter(s => s.label.trim() || s.value.trim()),
    primaryStat: {
      value: caseStudy.primaryStat.value || "—",
      label: caseStudy.primaryStat.label || "[Metric]",
    },
  }), [caseStudy]);

  if (isLoadingFromDb) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading case study...</span>
        </div>
      </div>
    );
  }

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
          {supabaseId && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <Cloud className="w-3 h-3" />
              Synced
            </span>
          )}
          {!supabaseId && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CloudOff className="w-3 h-3" />
              Local draft
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLibrary(true)}
              className="gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Library
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearDraft}
          >
            New
          </Button>
          {user ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Cloud className="w-4 h-4" />
              )}
              Save
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveLocal}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
          )}
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

      {/* Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Your Case Studies</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <CaseStudyLibrary
              onSelect={handleSelectFromLibrary}
              onClose={() => setShowLibrary(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseStudyBuilder;
