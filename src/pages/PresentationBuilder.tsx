import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePresentation } from "@/hooks/usePresentation";
import { SlideCanvas } from "@/components/presentation-builder/SlideCanvas";
import { SlideNavigator } from "@/components/presentation-builder/SlideNavigator";
import { BackgroundPicker } from "@/components/presentation-builder/BackgroundPicker";
import { PresentationConverter } from "@/components/presentation-builder/PresentationConverter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Presentation, createEmptyPresentation } from "@/types/presentation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Download,
  Undo2,
  Redo2,
  Play,
  FolderOpen,
  Plus,
  FileUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AUTOSAVE_KEY = "presentation-builder-draft";

export default function PresentationBuilder() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [supabaseId, setSupabaseId] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [savedPresentations, setSavedPresentations] = useState<any[]>([]);

  // Load initial presentation
  const getInitialPresentation = (): Presentation => {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved presentation:", e);
      }
    }
    return createEmptyPresentation();
  };

  const {
    presentation,
    currentSlideIndex,
    currentSlide,
    selectedBlockId,
    setPresentation,
    updatePresentationName,
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    duplicateSlide,
    updateSlideBackground,
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
  } = usePresentation(getInitialPresentation());

  // Load from Supabase if ID provided
  useEffect(() => {
    if (paramId && user) {
      loadFromSupabase(paramId);
    }
  }, [paramId, user]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(presentation));
    }, 1000);
    return () => clearTimeout(timer);
  }, [presentation]);

  // Load saved presentations for library
  useEffect(() => {
    if (user && showLibrary) {
      loadSavedPresentations();
    }
  }, [user, showLibrary]);

  const loadFromSupabase = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("presentations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        const contentData = data.content as unknown as Presentation;
        setPresentation(contentData);
        setSupabaseId(data.id);
      }
    } catch (error) {
      console.error("Failed to load presentation:", error);
      toast({
        title: "Error",
        description: "Failed to load presentation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedPresentations = async () => {
    try {
      const { data, error } = await supabase
        .from("presentations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setSavedPresentations(data || []);
    } catch (error) {
      console.error("Failed to load presentations:", error);
    }
  };

  const handleSaveToCloud = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your presentation",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      if (supabaseId) {
        const { error } = await supabase
          .from("presentations")
          .update({
            name: presentation.name,
            content: JSON.parse(JSON.stringify(presentation)),
            updated_at: new Date().toISOString(),
          })
          .eq("id", supabaseId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("presentations")
          .insert([{
            user_id: user.id,
            name: presentation.name,
            content: JSON.parse(JSON.stringify(presentation)),
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setSupabaseId(data.id);
          navigate(`/presentations/builder/${data.id}`, { replace: true });
        }
      }

      toast({
        title: "Saved",
        description: "Presentation saved to cloud",
      });
    } catch (error) {
      console.error("Failed to save:", error);
      toast({
        title: "Error",
        description: "Failed to save presentation",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    // Store presentation data for print route
    sessionStorage.setItem("presentation-print-data", JSON.stringify(presentation));
    window.open("/presentations/builder/print", "_blank");
  };

  const handleLoadFromLibrary = (saved: any) => {
    setPresentation(saved.content as Presentation);
    setSupabaseId(saved.id);
    setShowLibrary(false);
    navigate(`/presentations/builder/${saved.id}`, { replace: true });
  };

  const handleNewPresentation = () => {
    setPresentation(createEmptyPresentation());
    setSupabaseId(null);
    localStorage.removeItem(AUTOSAVE_KEY);
    navigate("/presentations/builder", { replace: true });
  };

  const handleImportedPresentation = (imported: Presentation) => {
    setPresentation(imported);
    setSupabaseId(null);
    setShowImport(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground font-ui">Loading presentation...</span>
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
              value={presentation.name}
              onChange={(e) => updatePresentationName(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
              className="w-64 h-8 font-ui"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="font-ui font-medium text-foreground hover:text-primary transition-colors"
            >
              {presentation.name}
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
          {currentSlide && (
            <BackgroundPicker
              currentBackground={currentSlide.background}
              onSelect={(bg) => updateSlideBackground(currentSlide.id, bg)}
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
                <DialogTitle>Presentation Library</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Button onClick={handleNewPresentation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Presentation
                </Button>
                
                {savedPresentations.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {savedPresentations.map((saved) => (
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
                          {new Date(saved.updated_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(saved.content as Presentation)?.slides?.length || 0} slides
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No saved presentations yet
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Import */}
          <Button variant="outline" size="sm" onClick={() => setShowImport(true)}>
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>

          {/* Preview */}
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Preview
          </Button>

          {/* Export */}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
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
        {/* Slide navigator */}
        <SlideNavigator
          presentation={presentation}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={setCurrentSlideIndex}
          onAddSlide={addSlide}
          onDeleteSlide={deleteSlide}
          onDuplicateSlide={duplicateSlide}
        />

        {/* Canvas */}
        {currentSlide && (
          <div className="flex-1 overflow-hidden">
            <SlideCanvas
              slide={currentSlide}
              selectedBlockId={selectedBlockId}
              onSelectBlock={selectBlock}
              onUpdateBlock={(blockId, content, style) =>
                updateBlock(currentSlide.id, blockId, content, style)
              }
              onDeleteBlock={(blockId) => deleteBlock(currentSlide.id, blockId)}
              onDuplicateBlock={(blockId) => duplicateBlock(currentSlide.id, blockId)}
              onAddBlock={(block, afterBlockId) =>
                addBlock(currentSlide.id, block, afterBlockId)
              }
              onReorderBlocks={(from, to) => reorderBlocks(currentSlide.id, from, to)}
            />
          </div>
        )}
      </div>

      {/* Import Dialog */}
      <PresentationConverter
        open={showImport}
        onOpenChange={setShowImport}
        onConvert={handleImportedPresentation}
      />
    </div>
  );
}
