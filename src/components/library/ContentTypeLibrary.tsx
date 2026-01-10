import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Plus,
  Search,
  LayoutGrid,
  List,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentCard } from "./DocumentCard";
import { TemplateGallery } from "./TemplateGallery";
import { DocumentTemplate } from "@/types/template";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type FilterType = "all" | "favorites" | "drafts" | "complete";

interface Document {
  id: string;
  name: string;
  updatedAt: string;
  isFavorite: boolean;
  isComplete: boolean;
  thumbnailUrl?: string;
}

interface ContentTypeLibraryProps {
  type: "case-study" | "presentation";
  title: string;
  description: string;
  tableName: "visual_case_studies" | "presentations";
  builderRoute: string;
  templates: DocumentTemplate[];
}

export const ContentTypeLibrary = ({
  type,
  title,
  description,
  tableName,
  builderRoute,
  templates,
}: ContentTypeLibraryProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"documents" | "templates">("documents");

  useEffect(() => {
    loadDocuments();
  }, [user]);

  const loadDocuments = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("id, name, updated_at, is_favorite, content, thumbnail_url")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      const docs: Document[] = (data || []).map((doc: any) => {
        // Determine if complete based on content
        let isComplete = true;
        if (doc.content) {
          const content = typeof doc.content === "string" ? JSON.parse(doc.content) : doc.content;
          // Simple heuristic: if has pages/slides with blocks, consider complete
          const pages = content.pages || content.slides || [];
          isComplete = pages.length > 0 && pages.some((p: any) => (p.blocks?.length || 0) > 1);
        }

        return {
          id: doc.id,
          name: doc.name,
          updatedAt: doc.updated_at,
          isFavorite: doc.is_favorite || false,
          isComplete,
          thumbnailUrl: doc.thumbnail_url,
        };
      });

      setDocuments(docs);
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    const newFavorite = !doc.isFavorite;
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: newFavorite } : d))
    );

    await supabase
      .from(tableName)
      .update({ is_favorite: newFavorite })
      .eq("id", id);
  };

  const handleDelete = async (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    await supabase.from(tableName).delete().eq("id", id);
  };

  const handleSelect = (id: string) => {
    navigate(`${builderRoute}/${id}`);
  };

  const handleDuplicate = async (id: string) => {
    if (!user) return;

    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    try {
      // Fetch the full document content
      const { data: original, error: fetchError } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // Create a copy with a new name
      const newName = `${doc.name} (Copy)`;
      const { data: newDoc, error: insertError } = await supabase
        .from(tableName)
        .insert({
          user_id: user.id,
          name: newName,
          content: original.content,
          is_favorite: false,
          thumbnail_url: original.thumbnail_url,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Add to local state
      setDocuments((prev) => [
        {
          id: newDoc.id,
          name: newDoc.name,
          updatedAt: newDoc.updated_at || new Date().toISOString(),
          isFavorite: false,
          isComplete: doc.isComplete,
          thumbnailUrl: newDoc.thumbnail_url || undefined,
        },
        ...prev,
      ]);

      toast.success(`Duplicated "${doc.name}"`);
    } catch (error) {
      console.error("Error duplicating document:", error);
      toast.error("Failed to duplicate document");
    }
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    // Navigate to builder with template - the builder will handle loading the template
    navigate(builderRoute, { state: { template } });
  };

  const filteredDocuments = documents.filter((doc) => {
    // Search filter
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Status filter
    switch (filter) {
      case "favorites":
        return doc.isFavorite;
      case "drafts":
        return !doc.isComplete;
      case "complete":
        return doc.isComplete;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Brand Guide
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/library" className="hover:text-primary transition-colors">
              Content Library
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{title}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <Button onClick={() => navigate(builderRoute)}>
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs: Documents / Templates */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="documents">My Documents</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            {activeTab === "documents" && (
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex border border-border rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      view === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={cn(
                      "p-1.5 rounded transition-colors",
                      view === "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <TabsContent value="documents" className="mt-0">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(["all", "favorites", "drafts", "complete"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap",
                    filter === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card/50 text-muted-foreground border-border/60 hover:bg-card hover:text-foreground"
                  )}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === "all" && ` (${documents.length})`}
                  {f === "favorites" &&
                    ` (${documents.filter((d) => d.isFavorite).length})`}
                  {f === "drafts" &&
                    ` (${documents.filter((d) => !d.isComplete).length})`}
                  {f === "complete" &&
                    ` (${documents.filter((d) => d.isComplete).length})`}
                </button>
              ))}
            </div>

            {/* Document Grid */}
            {loading ? (
              <div
                className={cn(
                  "grid gap-6",
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-border/60 overflow-hidden">
                    <Skeleton className={cn(
                      type === "case-study" ? "aspect-[3/4]" : "aspect-[16/10]"
                    )} />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-6 rounded-full bg-muted/50 mb-4">
                  <FolderOpen className="w-12 h-12 text-muted-foreground/40" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {search || filter !== "all"
                    ? "No documents found"
                    : `No ${title.toLowerCase()} yet`}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  {search || filter !== "all"
                    ? "Try adjusting your search or filters"
                    : `Create your first ${type === "case-study" ? "case study" : "presentation"} to get started.`}
                </p>
                {!search && filter === "all" && (
                  <Button onClick={() => navigate(builderRoute)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    name={doc.name}
                    type={type}
                    updatedAt={doc.updatedAt}
                    isFavorite={doc.isFavorite}
                    isComplete={doc.isComplete}
                    thumbnailUrl={doc.thumbnailUrl}
                    onSelect={handleSelect}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="mt-0">
            <TemplateGallery
              templates={templates}
              type={type}
              onSelectTemplate={handleSelectTemplate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
