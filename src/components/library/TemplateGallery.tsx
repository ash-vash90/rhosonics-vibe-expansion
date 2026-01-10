import { FileText, Presentation, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentTemplate } from "@/types/template";
import { cn } from "@/lib/utils";

interface TemplateGalleryProps {
  templates: DocumentTemplate[];
  type: "case-study" | "presentation";
  onSelectTemplate: (template: DocumentTemplate) => void;
}

export const TemplateGallery = ({
  templates,
  type,
  onSelectTemplate,
}: TemplateGalleryProps) => {
  const Icon = type === "case-study" ? FileText : Presentation;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={cn(
            "group relative flex flex-col rounded-lg border border-border/60 bg-card/50 overflow-hidden transition-all duration-200",
            "hover:bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
          )}
        >
          {/* Template Preview */}
          <div
            className={cn(
              "relative bg-muted/30 flex items-center justify-center",
              type === "case-study" ? "aspect-[3/4]" : "aspect-[16/10]"
            )}
          >
            <div className="p-6 rounded-full bg-muted/50">
              <Icon className="w-10 h-10 text-muted-foreground/40" />
            </div>

            {/* Page count badge */}
            {template.pages.length > 0 && (
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-background/80 text-muted-foreground border border-border/60">
                  <Layers className="w-3 h-3" />
                  {template.pages.length} {template.pages.length === 1 ? "page" : "pages"}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => onSelectTemplate(template)}
              >
                Use Template
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            {template.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {template.description}
              </p>
            )}
            {template.category && (
              <div className="mt-3">
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {template.category}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
