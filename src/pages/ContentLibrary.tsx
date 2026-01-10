import { Link } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Presentation,
  ScrollText,
  ChevronRight,
  Sparkles,
  FolderOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CreateNewDropdown } from "@/components/library/CreateNewDropdown";
import { cn } from "@/lib/utils";

interface ContentType {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  route: string | null;
  libraryRoute: string | null;
  available: boolean;
  tableName?: "visual_case_studies" | "presentations";
}

const CONTENT_TYPES: ContentType[] = [
  {
    id: "case-studies",
    label: "Case Studies",
    description: "Customer success stories with metrics and results",
    icon: FileText,
    route: "/case-studies/builder",
    libraryRoute: "/library/case-studies",
    available: true,
    tableName: "visual_case_studies",
  },
  {
    id: "presentations",
    label: "Presentations",
    description: "Slide decks for sales and marketing",
    icon: Presentation,
    route: "/presentations/builder",
    libraryRoute: "/library/presentations",
    available: true,
    tableName: "presentations",
  },
  {
    id: "whitepapers",
    label: "Whitepapers",
    description: "Technical deep-dives and research documents",
    icon: BookOpen,
    route: null,
    libraryRoute: null,
    available: false,
  },
  {
    id: "guides",
    label: "Guides",
    description: "How-to documents and best practices",
    icon: ScrollText,
    route: null,
    libraryRoute: null,
    available: false,
  },
];

const ContentLibrary = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recentDocs, setRecentDocs] = useState<Record<string, { id: string; name: string }[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setCounts({});
        setRecentDocs({});
        return;
      }

      // Fetch counts and recent docs for each available content type
      const countsData: Record<string, number> = {};
      const recentData: Record<string, { id: string; name: string }[]> = {};

      // Case Studies
      const { count: csCount, data: csRecent } = await supabase
        .from("visual_case_studies")
        .select("id, name", { count: "exact" })
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(3);

      countsData["case-studies"] = csCount || 0;
      recentData["case-studies"] = (csRecent || []).map((d) => ({
        id: d.id,
        name: d.name,
      }));

      // Presentations
      const { count: presCount, data: presRecent } = await supabase
        .from("presentations")
        .select("id, name", { count: "exact" })
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(3);

      countsData["presentations"] = presCount || 0;
      recentData["presentations"] = (presRecent || []).map((d) => ({
        id: d.id,
        name: d.name,
      }));

      setCounts(countsData);
      setRecentDocs(recentData);
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Brand Guide
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Content Library</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Content Library</h1>
              <p className="text-muted-foreground">
                Create and manage branded content across all formats
              </p>
            </div>
            <CreateNewDropdown />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENT_TYPES.map((type) => {
            const Icon = type.icon;
            const count = counts[type.id] || 0;
            const recent = recentDocs[type.id] || [];

            if (type.available && type.libraryRoute) {
              return (
                <Link
                  key={type.id}
                  to={type.libraryRoute}
                  className={cn(
                    "group relative p-6 rounded-lg border border-border/60 bg-card/50 transition-all duration-200",
                    "hover:bg-card hover:border-primary/40 hover:shadow-lg"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {type.label}
                        </h2>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {type.description}
                      </p>

                      {/* Count Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                          <FolderOpen className="w-3 h-3 inline mr-1" />
                          {count} {count === 1 ? "document" : "documents"}
                        </span>
                      </div>

                      {/* Recent Documents */}
                      {recent.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground font-medium">
                            Recent:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {recent.map((doc) => (
                              <span
                                key={doc.id}
                                className="text-xs px-2 py-0.5 rounded bg-background border border-border/60 text-muted-foreground truncate max-w-[120px]"
                              >
                                {doc.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={type.id}
                className="relative p-6 rounded-lg border border-border/40 bg-muted/20 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-lg font-semibold text-muted-foreground">
                        {type.label}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground/70">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
            >
              <Sparkles className="w-4 h-4" />
              AI Tools
            </Link>
            <Link
              to="/case-studies"
              className="text-sm px-4 py-2 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
            >
              View Published Case Studies →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibrary;
