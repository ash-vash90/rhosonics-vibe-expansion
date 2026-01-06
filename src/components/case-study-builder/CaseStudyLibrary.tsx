import { useState, useEffect } from "react";
import { FileText, Star, Trash2, Edit2, Plus, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VisualCaseStudy } from "@/types/visualCaseStudy";
import { cn } from "@/lib/utils";

interface SavedCaseStudy {
  id: string;
  name: string;
  content: VisualCaseStudy;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface CaseStudyLibraryProps {
  onSelect: (caseStudy: SavedCaseStudy) => void;
  onClose: () => void;
}

export const CaseStudyLibrary = ({ onSelect, onClose }: CaseStudyLibraryProps) => {
  const { toast } = useToast();
  const [caseStudies, setCaseStudies] = useState<SavedCaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("visual_case_studies")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Failed to load case studies:", error);
      toast({
        title: "Error",
        description: "Failed to load saved case studies.",
        variant: "destructive",
      });
    } else {
      // Parse content JSON
      const parsed = (data || []).map((item) => ({
        ...item,
        content: typeof item.content === "string" ? JSON.parse(item.content) : item.content,
      })) as SavedCaseStudy[];
      setCaseStudies(parsed);
    }
    setIsLoading(false);
  };

  const handleToggleFavorite = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from("visual_case_studies")
      .update({ is_favorite: !currentValue })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status.",
        variant: "destructive",
      });
    } else {
      setCaseStudies((prev) =>
        prev.map((cs) => (cs.id === id ? { ...cs, is_favorite: !currentValue } : cs))
      );
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("visual_case_studies").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study.",
        variant: "destructive",
      });
    } else {
      setCaseStudies((prev) => prev.filter((cs) => cs.id !== id));
      toast({
        title: "Deleted",
        description: "Case study removed from library.",
      });
    }
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold mb-2">No saved case studies</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Create your first case study to start building your library.
        </p>
        <Button onClick={onClose} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <h4 className="font-semibold truncate">
                    {cs.content.company || cs.name || "Untitled"}
                  </h4>
                  {cs.is_favorite && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {cs.content.industry || "No industry"} • {cs.content.product || "No product"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Updated {formatDate(cs.updated_at)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleToggleFavorite(cs.id, cs.is_favorite)}
                >
                  <Star
                    className={cn(
                      "w-4 h-4",
                      cs.is_favorite ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                    )}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSelect(cs)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Case Study?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{cs.content.company || cs.name}". This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(cs.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deletingId === cs.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
