import { Link } from "react-router-dom";
import { FileText, BookOpen, Presentation, ScrollText, ChevronRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const CONTENT_TYPES = [
  {
    id: "case-studies",
    label: "Case Studies",
    description: "Customer success stories with metrics and results",
    icon: FileText,
    route: "/case-studies/builder",
    available: true,
  },
  {
    id: "whitepapers",
    label: "Whitepapers",
    description: "Technical deep-dives and research documents",
    icon: BookOpen,
    route: null,
    available: false,
  },
  {
    id: "presentations",
    label: "Presentations",
    description: "Slide decks for sales and marketing",
    icon: Presentation,
    route: null,
    available: false,
  },
  {
    id: "guides",
    label: "Guides",
    description: "How-to documents and best practices",
    icon: ScrollText,
    route: null,
    available: false,
  },
];

const ContentLibrary = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) {
        setCounts({});
        return;
      }

      const { count } = await supabase
        .from("saved_case_studies")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setCounts({ "case-studies": count || 0 });
    };

    fetchCounts();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Brand Guide</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Content Library</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Content Library</h1>
          <p className="text-muted-foreground">Create and manage branded content across all formats</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENT_TYPES.map((type) => {
            const Icon = type.icon;
            
            if (type.available && type.route) {
              return (
                <Link
                  key={type.id}
                  to={type.route}
                  className="group relative p-6 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-200"
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
                      <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                      <div className="flex items-center gap-2">
                        {counts[type.id] > 0 ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                            {counts[type.id]} saved
                          </span>
                        ) : null}
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          <Plus className="w-3 h-3 inline mr-1" />
                          Create New
                        </span>
                      </div>
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
                    <p className="text-sm text-muted-foreground/70">{type.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools"
              className="text-sm px-4 py-2 rounded-lg border border-border/60 bg-card/50 hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
            >
              AI Tools →
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
