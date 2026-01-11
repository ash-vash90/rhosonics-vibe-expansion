import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCaseStudy, createEmptyCaseStudy, CaseStudyDocument } from "@/hooks/useCaseStudy";
import { DocumentCanvas, PageNavigator, TemplateSelector } from "@/components/document-builder";
import { BackgroundPicker } from "@/components/presentation-builder/BackgroundPicker";
import { AIContentFill, type GeneratedCaseStudyContent } from "@/components/case-study-builder/AIContentFill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DocumentTemplate } from "@/types/template";
import { cn } from "@/lib/utils";
import { captureFirstPageThumbnail } from "@/lib/thumbnailGenerator";
import {
  ArrowLeft,
  Save,
  Download,
  Undo2,
  Redo2,
  FolderOpen,
  Plus,
  PanelRight,
  PanelRightClose,
  FileText,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AUTOSAVE_KEY = "case-study-builder-draft";

export default function CaseStudyBuilder() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [supabaseId, setSupabaseId] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showAISidebar, setShowAISidebar] = useState(true);
  const [savedCaseStudies, setSavedCaseStudies] = useState<any[]>([]);

  // Load initial document
  const getInitialDocument = (): CaseStudyDocument => {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved case study:", e);
      }
    }
    return createEmptyCaseStudy("Untitled Case Study");
  };

  const {
    document: caseStudy,
    currentPageIndex,
    currentPage,
    selectedBlockId,
    setDocument,
    setCurrentPageIndex,
    addPage,
    deletePage,
    duplicatePage,
    reorderPages,
    updatePageBackground,
    updatePageTransition,
    selectBlock,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    reorderBlocks,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useCaseStudy(getInitialDocument());

  // Load from Supabase if ID provided, or show template selector for new
  useEffect(() => {
    if (paramId && user) {
      loadFromSupabase(paramId);
    } else if (!paramId) {
      // No ID means new case study - show template selector
      setShowTemplateSelector(true);
    }
  }, [paramId, user]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(caseStudy));
    }, 1000);
    return () => clearTimeout(timer);
  }, [caseStudy]);

  // Load saved case studies for library
  useEffect(() => {
    if (user && showLibrary) {
      loadSavedCaseStudies();
    }
  }, [user, showLibrary]);

  const loadFromSupabase = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("visual_case_studies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        const contentData = data.content as unknown as CaseStudyDocument;
        setDocument(contentData);
        setSupabaseId(data.id);
      }
    } catch (error) {
      console.error("Failed to load case study:", error);
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("visual_case_studies")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setSavedCaseStudies(data || []);
    } catch (error) {
      console.error("Failed to load case studies:", error);
    }
  };

  const handleSaveToCloud = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your case study",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Generate thumbnail from first page
      let thumbnailUrl: string | null = null;
      if (currentPageIndex === 0) {
        // If on first page, capture it
        thumbnailUrl = await captureFirstPageThumbnail(
          "[data-document-canvas]",
          supabaseId || crypto.randomUUID(),
          "case-study"
        );
      }

      if (supabaseId) {
        const updateData: Record<string, unknown> = {
          name: caseStudy.name,
          content: JSON.parse(JSON.stringify(caseStudy)),
          updated_at: new Date().toISOString(),
        };
        if (thumbnailUrl) {
          updateData.thumbnail_url = thumbnailUrl;
        }

        const { error } = await supabase
          .from("visual_case_studies")
          .update(updateData)
          .eq("id", supabaseId);

        if (error) throw error;
      } else {
        const newId = crypto.randomUUID();
        // Generate thumbnail with the new ID
        if (!thumbnailUrl && currentPageIndex === 0) {
          thumbnailUrl = await captureFirstPageThumbnail(
            "[data-document-canvas]",
            newId,
            "case-study"
          );
        }

        const { data, error } = await supabase
          .from("visual_case_studies")
          .insert([{
            id: newId,
            user_id: user.id,
            name: caseStudy.name,
            content: JSON.parse(JSON.stringify(caseStudy)),
            thumbnail_url: thumbnailUrl,
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setSupabaseId(data.id);
          navigate(`/case-studies/builder/${data.id}`, { replace: true });
        }
      }

      toast({
        title: "Saved",
        description: "Case study saved to cloud",
      });
    } catch (error) {
      console.error("Failed to save:", error);
      toast({
        title: "Error",
        description: "Failed to save case study",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    sessionStorage.setItem("case-study-print-data", JSON.stringify(caseStudy));
    window.open("/case-studies/builder/print", "_blank");
  };

  const handleLoadFromLibrary = (saved: any) => {
    setDocument(saved.content as CaseStudyDocument);
    setSupabaseId(saved.id);
    setShowLibrary(false);
    navigate(`/case-studies/builder/${saved.id}`, { replace: true });
  };

  const handleNewCaseStudy = () => {
    setShowTemplateSelector(true);
    setShowLibrary(false);
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    // Create new document from template
    const newDoc = createEmptyCaseStudy(template.name);
    
    // Apply template pages
    if (template.pages.length > 0) {
      newDoc.pages = template.pages.map((pageTemplate) => ({
        id: crypto.randomUUID(),
        blocks: pageTemplate.sections.flatMap((section) =>
          section.defaultBlocks.map((block) => ({
            id: crypto.randomUUID(),
            type: block.type,
            content: block.content,
            style: block.style,
          }))
        ),
        background: pageTemplate.background,
      }));
    }

    newDoc.templateId = template.id;
    newDoc.templateMode = "template";
    
    setDocument(newDoc);
    setSupabaseId(null);
    localStorage.removeItem(AUTOSAVE_KEY);
    navigate("/case-studies/builder", { replace: true });
    setShowTemplateSelector(false);
  };

  const updateDocumentName = (name: string) => {
    setDocument({ ...caseStudy, name });
  };

  // Handle AI-generated content
  const handleApplyAIContent = (content: GeneratedCaseStudyContent) => {
    // Map AI content to block types and update matching blocks
    const updatedPages = caseStudy.pages.map((page) => ({
      ...page,
      blocks: page.blocks.map((block) => {
        switch (block.type) {
          case "hero-image":
            return {
              ...block,
              content: {
                ...block.content,
                title: content.heroTitle,
                subtitle: content.heroSubtitle,
              },
            };
          case "identity-card":
            return {
              ...block,
              content: {
                ...block.content,
                identity: {
                  company: content.company,
                  location: content.location,
                  industry: content.industry,
                  product: content.product,
                },
              },
            };
          case "subheading":
            // Tagline
            if (!block.content.text || block.content.text.includes("compelling tagline")) {
              return {
                ...block,
                content: { ...block.content, text: content.tagline },
              };
            }
            return block;
          case "challenge-solution":
            return {
              ...block,
              content: {
                ...block.content,
                challengeSolution: {
                  challenge: content.challenge,
                  solution: content.solution,
                },
              },
            };
          case "stat-card":
            return {
              ...block,
              content: {
                ...block.content,
                stat: content.primaryStat,
              },
            };
          case "spec-table":
            return {
              ...block,
              content: {
                ...block.content,
                specs: content.specs,
              },
            };
          case "results-grid":
            return {
              ...block,
              content: {
                ...block.content,
                resultsGrid: { results: content.results },
              },
            };
          case "quote":
            return {
              ...block,
              content: {
                ...block.content,
                quote: content.quote,
              },
            };
          case "cta":
            return {
              ...block,
              content: {
                ...block.content,
                cta: {
                  text: content.ctaText,
                  buttonLabel: block.content.cta?.buttonLabel || "Contact Us",
                  buttonUrl: block.content.cta?.buttonUrl || "https://rhosonics.com/contact",
                },
              },
            };
          default:
            return block;
        }
      }),
    }));

    setDocument({
      ...caseStudy,
      pages: updatedPages,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground font-ui">Loading case study...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/library")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Title */}
          {isEditingTitle ? (
            <Input
              value={caseStudy.name}
              onChange={(e) => updateDocumentName(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              className="w-64 h-8 font-ui"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="font-ui font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              {caseStudy.name}
            </button>
          )}

          {/* Undo/Redo */}
          <div className="flex items-center gap-1 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={redo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Background picker */}
          {currentPage && (
            <BackgroundPicker
              currentBackground={currentPage.background}
              currentTransition={currentPage.transition}
              onSelect={(bg) => updatePageBackground(currentPage.id, bg)}
              onTransitionChange={(t) => updatePageTransition(currentPage.id, t)}
            />
          )}

          {/* Library */}
          <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderOpen className="h-4 w-4 mr-2" />
                Library
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Case Study Library</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Button onClick={handleNewCaseStudy} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Case Study
                </Button>
                
                {savedCaseStudies.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {savedCaseStudies.map((saved) => (
                      <button
                        key={saved.id}
                        onClick={() => handleLoadFromLibrary(saved)}
                        className={cn(
                          "text-left p-4 rounded-lg border transition-all hover:border-primary",
                          supabaseId === saved.id ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <h4 className="font-ui font-medium truncate">{saved.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(saved.updated_at || saved.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(saved.content as CaseStudyDocument)?.pages?.length || 0} pages
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No saved case studies yet
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* AI Sidebar toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAISidebar(!showAISidebar)}
            className="hidden md:flex"
          >
            {showAISidebar ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRight className="h-4 w-4" />
            )}
          </Button>

          {/* Export PDF */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>

          {/* Save */}
          <Button size="sm" onClick={handleSaveToCloud} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Page navigator */}
        <PageNavigator
          pages={caseStudy.pages}
          currentPageIndex={currentPageIndex}
          onSelectPage={setCurrentPageIndex}
          onAddPage={addPage}
          onDeletePage={deletePage}
          onDuplicatePage={duplicatePage}
          onReorderPages={reorderPages}
        />

        {/* Canvas */}
        {currentPage && (
          <div className="flex-1 overflow-hidden">
            <DocumentCanvas
              page={currentPage}
              selectedBlockId={selectedBlockId}
              onSelectBlock={selectBlock}
              onUpdateBlock={(blockId, content, style) =>
                updateBlock(currentPage.id, blockId, content, style)
              }
              onDeleteBlock={(blockId) => deleteBlock(currentPage.id, blockId)}
              onDuplicateBlock={(blockId) => duplicateBlock(currentPage.id, blockId)}
              onAddBlock={(block, afterBlockId) =>
                addBlock(currentPage.id, block, afterBlockId)
              }
              onReorderBlocks={(from, to) => reorderBlocks(currentPage.id, from, to)}
              layout="case-study"
              pageIndex={currentPageIndex}
              totalPages={caseStudy.pages.length}
              companyName={caseStudy.pages[0]?.blocks.find(b => b.type === "identity-card")?.content.identity?.company}
            />
          </div>
        )}

        {/* AI Sidebar */}
        {showAISidebar && (
          <div className="w-80 border-l border-border bg-card flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-ui font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Get AI-powered content suggestions
              </p>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <AIContentFill onApplyContent={handleApplyAIContent} />
              
              <div className="text-xs text-muted-foreground text-center p-4 border border-dashed border-border rounded-lg">
                <p>More AI features coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Template Selector */}
      <TemplateSelector
        open={showTemplateSelector}
        onOpenChange={setShowTemplateSelector}
        documentType="case-study"
        onSelectTemplate={handleSelectTemplate}
        title="New Case Study"
        description="Choose a template to get started with your case study."
      />
    </div>
  );
}