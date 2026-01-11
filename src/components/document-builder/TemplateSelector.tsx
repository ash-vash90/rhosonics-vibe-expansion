import { useState } from "react";
import { FileText, Presentation, Check, Sparkles, Layout } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DocumentTemplate, TEMPLATE_CATEGORIES } from "@/types/template";
import { DocumentType } from "@/types/document";
import { getTemplatesByType, getBlankTemplate } from "@/data/templates";
import { TemplatePreview } from "./TemplatePreview";

interface TemplateSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: DocumentType;
  onSelectTemplate: (template: DocumentTemplate) => void;
  title?: string;
  description?: string;
}

const documentTypeIcons: Record<DocumentType, React.ElementType> = {
  presentation: Presentation,
  "case-study": FileText,
  whitepaper: FileText,
  proposal: FileText,
};

const documentTypeLabels: Record<DocumentType, string> = {
  presentation: "Presentation",
  "case-study": "Case Study",
  whitepaper: "Whitepaper",
  proposal: "Proposal",
};

export function TemplateSelector({
  open,
  onOpenChange,
  documentType,
  onSelectTemplate,
  title,
  description,
}: TemplateSelectorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const templates = getTemplatesByType(documentType);
  const blankTemplate = getBlankTemplate(documentType);
  const categories = TEMPLATE_CATEGORIES[documentType] || [];
  
  // Filter templates by category
  const filteredTemplates = activeCategory
    ? templates.filter((t) => t.category === activeCategory)
    : templates;
  
  // Separate blank from other templates
  const featuredTemplates = filteredTemplates.filter((t) => !t.id.includes("blank"));
  
  const handleSelect = () => {
    const template = templates.find((t) => t.id === selectedTemplateId);
    if (template) {
      onSelectTemplate(template);
      onOpenChange(false);
      setSelectedTemplateId(null);
    }
  };
  
  const handleQuickSelect = (template: DocumentTemplate) => {
    onSelectTemplate(template);
    onOpenChange(false);
    setSelectedTemplateId(null);
  };
  
  const Icon = documentTypeIcons[documentType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {title || `New ${documentTypeLabels[documentType]}`}
          </DialogTitle>
          <DialogDescription>
            {description || "Choose a template to get started or start from a blank canvas."}
          </DialogDescription>
        </DialogHeader>
        
        {/* Quick Start - Blank Template */}
        {blankTemplate && (
          <div className="border-b pb-4">
            <button
              onClick={() => handleQuickSelect(blankTemplate)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 border-dashed",
                "hover:border-primary hover:bg-primary/5 transition-all",
                "text-left group"
              )}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                <Layout className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Start from Scratch
                </h3>
                <p className="text-sm text-muted-foreground">
                  Begin with a blank canvas and build your {documentTypeLabels[documentType].toLowerCase()} freely
                </p>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                Blank
              </Badge>
            </button>
          </div>
        )}
        
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}
        
        {/* Template Grid */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
            {featuredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                onDoubleClick={() => handleQuickSelect(template)}
              />
            ))}
          </div>
          
          {featuredTemplates.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No templates found in this category</p>
            </div>
          )}
        </ScrollArea>
        
        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedTemplateId 
              ? "Double-click to quick start or click 'Use Template'"
              : "Select a template to preview"
            }
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSelect} 
              disabled={!selectedTemplateId}
            >
              Use Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface TemplateCardProps {
  template: DocumentTemplate;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}

function TemplateCard({ template, isSelected, onClick, onDoubleClick }: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={cn(
        "relative text-left rounded-lg border-2 overflow-hidden transition-all",
        "hover:border-primary/50 hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected 
          ? "border-primary ring-2 ring-primary ring-offset-2" 
          : "border-border"
      )}
    >
      {/* Thumbnail / Preview */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {template.thumbnailUrl ? (
          <img 
            src={template.thumbnailUrl} 
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <TemplatePreview template={template} />
        )}
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-3">
        <h4 className="font-medium text-sm text-foreground truncate">
          {template.name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {template.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            {template.pages.length} {template.pages.length === 1 ? "page" : "pages"}
          </Badge>
          {template.category && (
            <Badge variant="outline" className="text-xs">
              {template.category}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
