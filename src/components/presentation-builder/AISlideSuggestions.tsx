import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Presentation, Slide, Block, BLOCK_TEMPLATES } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { 
  Lightbulb, 
  Loader2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Type,
  BarChart3,
  Image,
  Quote,
  Table,
  List,
  TrendingUp
} from "lucide-react";

interface AISlideSuggestionsProps {
  presentation: Presentation;
  currentSlide: Slide | null;
  currentSlideIndex: number;
  onApplySuggestion: (block: Omit<Block, "id">) => void;
  onApplyTextSuggestion?: (blockId: string, text: string) => void;
}

interface Suggestion {
  type: "block" | "content" | "layout";
  title: string;
  description: string;
  action?: () => void;
  blockType?: string;
  content?: any;
}

// Static tips based on slide position and content
const getContextualTips = (slideIndex: number, slide: Slide | null, totalSlides: number): string[] => {
  const tips: string[] = [];
  
  if (slideIndex === 0) {
    tips.push("Title slides work best with a bold heading and minimal text");
    tips.push("Consider adding a subheading to provide context");
    tips.push("Dark backgrounds with large typography create visual impact");
  } else if (slideIndex === totalSlides - 1) {
    tips.push("End with a clear call-to-action");
    tips.push("Summarize key takeaways for the audience");
    tips.push("Include contact information or next steps");
  } else {
    tips.push("Focus on one key message per slide");
    tips.push("Use stat cards to highlight important metrics");
    tips.push("Break up text with visuals or data");
  }

  // Content-based tips
  if (slide) {
    const hasStats = slide.blocks.some(b => b.type === "stat-card" || b.type === "stat-grid");
    const hasImage = slide.blocks.some(b => b.type === "image");
    const hasQuote = slide.blocks.some(b => b.type === "quote");
    
    if (!hasStats && slideIndex > 0) {
      tips.push("Add a stat card to emphasize key numbers");
    }
    if (!hasImage && slideIndex > 0) {
      tips.push("Consider adding a relevant image or chart");
    }
    if (!hasQuote && slideIndex > 2) {
      tips.push("A customer quote can add credibility");
    }
  }

  return tips.slice(0, 4);
};

export function AISlideSuggestions({
  presentation,
  currentSlide,
  currentSlideIndex,
  onApplySuggestion,
}: AISlideSuggestionsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Suggestion[]>([]);

  // Fetch AI suggestions when slide changes
  useEffect(() => {
    const fetchAISuggestions = async () => {
      if (!currentSlide || currentSlide.blocks.length === 0) {
        setAiSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-slide-suggestions", {
          body: {
            slideIndex: currentSlideIndex,
            slideContent: currentSlide,
            presentationName: presentation.name,
            totalSlides: presentation.slides.length,
          },
        });

        if (!error && data?.suggestions) {
          setAiSuggestions(data.suggestions.map((s: any) => ({
            type: "content" as const,
            title: s.title,
            description: s.description,
            blockType: s.blockType,
            content: s.content,
          })));
        }
      } catch (err) {
        console.error("Failed to fetch AI suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce
    const timer = setTimeout(fetchAISuggestions, 1500);
    return () => clearTimeout(timer);
  }, [currentSlide, currentSlideIndex]);

  const contextualTips = getContextualTips(currentSlideIndex, currentSlide, presentation.slides.length);

  // Quick add suggestions based on context
  const quickAddSuggestions: Suggestion[] = [];
  
  if (currentSlide) {
    const blockTypes = currentSlide.blocks.map(b => b.type);
    
    if (!blockTypes.includes("stat-card") && !blockTypes.includes("stat-grid")) {
      quickAddSuggestions.push({
        type: "block",
        title: "Add Key Metric",
        description: "Highlight an important number",
        blockType: "stat-card",
        content: { stat: { value: "0%", label: "Key Metric" } },
      });
    }
    
    if (!blockTypes.includes("bullet-list")) {
      quickAddSuggestions.push({
        type: "block",
        title: "Add Bullet Points",
        description: "List key benefits or features",
        blockType: "bullet-list",
        content: { items: ["Key point one", "Key point two", "Key point three"] },
      });
    }
    
    if (!blockTypes.includes("quote")) {
      quickAddSuggestions.push({
        type: "block",
        title: "Add Quote",
        description: "Include a customer testimonial",
        blockType: "quote",
        content: { quote: { text: "Quote text here", author: "Author Name", role: "Role" } },
      });
    }
    
    if (!blockTypes.includes("spec-table")) {
      quickAddSuggestions.push({
        type: "block",
        title: "Add Spec Table",
        description: "Display product specifications",
        blockType: "spec-table",
        content: { specs: [{ label: "Spec", value: "Value" }] },
      });
    }
  }

  const getIconForBlockType = (blockType?: string) => {
    switch (blockType) {
      case "stat-card":
      case "stat-grid":
        return <TrendingUp className="w-4 h-4" />;
      case "bullet-list":
        return <List className="w-4 h-4" />;
      case "quote":
        return <Quote className="w-4 h-4" />;
      case "spec-table":
        return <Table className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "chart":
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const handleApplySuggestion = (suggestion: Suggestion) => {
    if (suggestion.blockType && suggestion.content) {
      const template = BLOCK_TEMPLATES.find(t => t.type === suggestion.blockType);
      if (template) {
        onApplySuggestion({
          type: template.type,
          content: suggestion.content || template.defaultContent,
        });
      }
    }
  };

  return (
    <div className="w-72 border-l border-border bg-muted/30 overflow-hidden flex flex-col">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-3 bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="font-ui text-sm font-medium">AI Guidance</span>
          {isLoading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Slide context */}
          <div className="pb-3 border-b border-border">
            <p className="label-tech text-muted-foreground">
              Slide {currentSlideIndex + 1} of {presentation.slides.length}
            </p>
            <p className="font-ui text-xs text-primary mt-1">
              {currentSlideIndex === 0 
                ? "Title Slide" 
                : currentSlideIndex === presentation.slides.length - 1 
                ? "Closing Slide"
                : "Content Slide"}
            </p>
          </div>

          {/* Quick Add Suggestions */}
          {quickAddSuggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                <p className="label-tech font-semibold text-foreground">Quick Add</p>
              </div>
              <div className="space-y-2">
                {quickAddSuggestions.slice(0, 3).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplySuggestion(suggestion)}
                    className={cn(
                      "w-full p-3 text-left rounded-lg border transition-all",
                      "bg-card hover:bg-primary/5 border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-primary/10 text-primary">
                        {getIconForBlockType(suggestion.blockType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-ui text-sm font-medium text-foreground">
                          {suggestion.title}
                        </p>
                        <p className="font-ui text-xs text-muted-foreground mt-0.5">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                <p className="label-tech font-semibold text-foreground">AI Suggestions</p>
              </div>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplySuggestion(suggestion)}
                    className={cn(
                      "w-full p-3 text-left rounded-lg border transition-all",
                      "bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/40"
                    )}
                  >
                    <p className="font-ui text-sm font-medium text-foreground">
                      {suggestion.title}
                    </p>
                    <p className="font-ui text-xs text-muted-foreground mt-1">
                      {suggestion.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Tips */}
          <div className="space-y-2">
            <p className="label-tech font-semibold text-foreground/70">Tips</p>
            <ul className="space-y-1.5">
              {contextualTips.map((tip, idx) => (
                <li key={idx} className="font-ui text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="label-tech text-muted-foreground">Progress</span>
              <span className="font-data text-xs text-primary">
                {currentSlideIndex + 1}/{presentation.slides.length}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentSlideIndex + 1) / presentation.slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}