import React from "react";
import { Slide, Presentation } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SlideNavigatorProps {
  presentation: Presentation;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: (afterIndex?: number) => void;
  onDeleteSlide: (slideId: string) => void;
  onDuplicateSlide: (slideId: string) => void;
}

export function SlideNavigator({
  presentation,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
}: SlideNavigatorProps) {
  const getSlidePreviewStyle = (slide: Slide): React.CSSProperties => {
    if (slide.background.type === "solid") {
      return { backgroundColor: slide.background.value };
    }
    if (slide.background.type === "gradient") {
      return { background: slide.background.value };
    }
    if (slide.background.type === "image") {
      return {
        backgroundImage: `url(${slide.background.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { backgroundColor: "white" };
  };

  const getSlideTitle = (slide: Slide): string => {
    const headingBlock = slide.blocks.find(
      (b) => b.type === "heading" || b.type === "subheading"
    );
    return headingBlock?.content.text?.slice(0, 30) || "Untitled Slide";
  };

  return (
    <div className="w-48 h-full bg-muted/30 border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="font-ui text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Slides
        </span>
        <span className="font-data text-xs text-muted-foreground">
          {presentation.slides.length}
        </span>
      </div>

      {/* Slide list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {presentation.slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "group relative rounded-lg cursor-pointer transition-all",
              currentSlideIndex === index
                ? "ring-2 ring-primary shadow-md"
                : "hover:ring-1 hover:ring-muted-foreground/30"
            )}
            onClick={() => onSelectSlide(index)}
          >
            {/* Slide number badge */}
            <div className={cn(
              "absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-data z-10",
              currentSlideIndex === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {index + 1}
            </div>

            {/* Slide thumbnail */}
            <div
              className="w-full rounded-lg overflow-hidden border border-border"
              style={{ aspectRatio: "16/9", ...getSlidePreviewStyle(slide) }}
            >
              {/* Mini preview of content */}
              <div className="w-full h-full p-2 flex flex-col gap-1 overflow-hidden">
                {slide.blocks.slice(0, 3).map((block) => {
                  const isDark = slide.background.value?.includes("225") || slide.background.value?.includes("10%");
                  
                  if (block.type === "heading" || block.type === "subheading") {
                    return (
                      <div
                        key={block.id}
                        className={cn(
                          "h-2 rounded-full",
                          isDark ? "bg-white/60" : "bg-slate-400/60"
                        )}
                        style={{ width: `${Math.min(90, (block.content.text?.length || 10) * 3)}%` }}
                      />
                    );
                  }
                  if (block.type === "paragraph") {
                    return (
                      <div key={block.id} className="space-y-0.5">
                        <div className={cn("h-1 rounded-full w-full", isDark ? "bg-white/30" : "bg-slate-300/60")} />
                        <div className={cn("h-1 rounded-full w-3/4", isDark ? "bg-white/30" : "bg-slate-300/60")} />
                      </div>
                    );
                  }
                  if (block.type === "stat-card" || block.type === "stat-grid") {
                    return (
                      <div key={block.id} className="flex gap-1">
                        <div className={cn("w-4 h-4 rounded", isDark ? "bg-rho-green/60" : "bg-rho-green/40")} />
                        <div className={cn("w-4 h-4 rounded", isDark ? "bg-rho-green/60" : "bg-rho-green/40")} />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Slide title */}
            <p className="mt-1 px-1 text-xs font-ui text-muted-foreground truncate">
              {getSlideTitle(slide)}
            </p>

            {/* Actions dropdown */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-5 w-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicateSlide(slide.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAddSlide(index)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add slide after
                  </DropdownMenuItem>
                  {presentation.slides.length > 1 && (
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDeleteSlide(slide.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Add slide button */}
      <div className="p-2 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onAddSlide()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
      </div>
    </div>
  );
}
