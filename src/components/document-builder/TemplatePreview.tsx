import { DocumentTemplate } from "@/types/template";
import { cn } from "@/lib/utils";
import { 
  Image, 
  FileText, 
  BarChart3, 
  Quote, 
  Table, 
  List, 
  Heading1, 
  MessageSquare 
} from "lucide-react";

interface TemplatePreviewProps {
  template: DocumentTemplate;
  className?: string;
}

// Map block types to icons for visual representation
const blockIcons: Record<string, React.ElementType> = {
  "hero-image": Image,
  image: Image,
  "identity-card": FileText,
  heading: Heading1,
  subheading: Heading1,
  paragraph: FileText,
  "bullet-list": List,
  "challenge-solution": MessageSquare,
  "results-grid": List,
  "stat-card": BarChart3,
  "stat-grid": BarChart3,
  "spec-table": Table,
  quote: Quote,
  chart: BarChart3,
  cta: MessageSquare,
  callout: MessageSquare,
  divider: FileText,
};

// Get color for block type
const blockColors: Record<string, string> = {
  "hero-image": "bg-primary/30",
  image: "bg-primary/20",
  "identity-card": "bg-accent/40",
  heading: "bg-foreground/10",
  subheading: "bg-foreground/8",
  paragraph: "bg-muted-foreground/10",
  "bullet-list": "bg-muted-foreground/10",
  "challenge-solution": "bg-secondary/40",
  "results-grid": "bg-accent/30",
  "stat-card": "bg-primary/25",
  "stat-grid": "bg-primary/20",
  "spec-table": "bg-muted/50",
  quote: "bg-secondary/30",
  chart: "bg-primary/20",
  cta: "bg-primary/40",
  callout: "bg-accent/25",
  divider: "bg-border",
};

export function TemplatePreview({ template, className }: TemplatePreviewProps) {
  const isPresentation = template.documentType === "presentation";
  const previewPages = template.pages.slice(0, 2); // Show first 2 pages max

  return (
    <div 
      className={cn(
        "w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-muted/50 to-muted",
        className
      )}
    >
      <div className={cn(
        "flex gap-2",
        isPresentation ? "flex-row" : "flex-row"
      )}>
        {previewPages.map((page, pageIndex) => (
          <div
            key={page.id}
            className={cn(
              "bg-background border border-border/60 shadow-sm rounded overflow-hidden flex flex-col",
              isPresentation ? "w-20 h-12" : "w-14 h-20",
              pageIndex > 0 && "opacity-70 scale-95"
            )}
            style={{
              backgroundColor: page.background?.type === "solid" 
                ? page.background.value 
                : undefined,
            }}
          >
            {/* Render mini blocks */}
            <div className="flex-1 p-1 space-y-0.5 overflow-hidden">
              {page.sections.slice(0, 6).map((section) => {
                const blockType = section.defaultBlocks[0]?.type || "paragraph";
                const bgColor = blockColors[blockType] || "bg-muted/30";
                const isHero = blockType === "hero-image";
                
                return (
                  <div
                    key={section.id}
                    className={cn(
                      "rounded-sm",
                      bgColor,
                      isHero ? "h-3" : "h-1.5"
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Show page count indicator if more pages */}
        {template.pages.length > 2 && (
          <div className="flex items-center justify-center w-8 h-8 self-center rounded-full bg-muted text-muted-foreground text-xs font-medium">
            +{template.pages.length - 2}
          </div>
        )}
      </div>
    </div>
  );
}

// Detailed preview for hover/modal
export function TemplatePreviewDetailed({ template }: TemplatePreviewProps) {
  const isPresentation = template.documentType === "presentation";

  return (
    <div className="space-y-4">
      {/* Template Info */}
      <div>
        <h4 className="font-medium text-foreground">{template.name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
      </div>

      {/* Page Previews */}
      <div className="grid gap-3">
        {template.pages.map((page, pageIndex) => (
          <div key={page.id} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Page {pageIndex + 1}: {page.name || `Page ${pageIndex + 1}`}
            </p>
            <div
              className={cn(
                "border border-border/60 rounded-lg bg-card p-3",
                isPresentation ? "aspect-video" : "aspect-[3/4]"
              )}
            >
              <div className="space-y-2">
                {page.sections.map((section) => {
                  const blockType = section.defaultBlocks[0]?.type || "paragraph";
                  const Icon = blockIcons[blockType] || FileText;
                  const bgColor = blockColors[blockType] || "bg-muted/30";
                  
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded",
                        bgColor
                      )}
                    >
                      <Icon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">
                        {section.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
