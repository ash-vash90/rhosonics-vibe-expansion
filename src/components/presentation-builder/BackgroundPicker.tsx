import React from "react";
import { SlideBackground, SlideTransition, BACKGROUND_PRESETS, TRANSITION_PRESETS } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { Check, ImagePlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BackgroundPickerProps {
  currentBackground: SlideBackground;
  currentTransition?: SlideTransition;
  onSelect: (background: SlideBackground) => void;
  onTransitionChange?: (transition: SlideTransition) => void;
}

export function BackgroundPicker({ 
  currentBackground, 
  currentTransition = "fade",
  onSelect,
  onTransitionChange,
}: BackgroundPickerProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onSelect({
        type: "image",
        value: event.target?.result as string,
        overlay: "dark",
      });
    };
    reader.readAsDataURL(file);
  };

  const getPreviewStyle = (bg: SlideBackground): React.CSSProperties => {
    if (bg.type === "solid") {
      return { backgroundColor: bg.value };
    }
    if (bg.type === "gradient") {
      return { background: bg.value };
    }
    if (bg.type === "image") {
      return {
        backgroundImage: `url(${bg.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  };

  const isSelected = (bg: SlideBackground) => {
    return currentBackground.type === bg.type && currentBackground.value === bg.value;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div
            className="w-4 h-4 rounded border border-border"
            style={getPreviewStyle(currentBackground)}
          />
          <span>Slide Style</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <Tabs defaultValue="background" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="transition">Transition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="background" className="space-y-4 mt-4">
            <div>
              <h4 className="font-ui text-sm font-medium mb-2">Presets</h4>
              <div className="grid grid-cols-3 gap-2">
                {BACKGROUND_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onSelect(preset.background)}
                    className={cn(
                      "relative rounded-lg overflow-hidden border-2 transition-all",
                      isSelected(preset.background)
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <div
                      className="w-full aspect-video"
                      style={getPreviewStyle(preset.background)}
                    />
                    {isSelected(preset.background) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="block text-xs font-ui text-center py-1 truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-ui text-sm font-medium mb-2">Custom Image</h4>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {currentBackground.type === "image" && (
              <div>
                <h4 className="font-ui text-sm font-medium mb-2">Overlay</h4>
                <div className="flex gap-2">
                  {(["none", "dark", "light"] as const).map((overlay) => (
                    <button
                      key={overlay}
                      onClick={() => onSelect({ ...currentBackground, overlay })}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg border text-xs font-ui capitalize",
                        currentBackground.overlay === overlay
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {overlay}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="transition" className="space-y-3 mt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Animation when entering this slide</span>
            </div>
            {TRANSITION_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => onTransitionChange?.(preset.value)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                  currentTransition === preset.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <div>
                  <span className="font-ui text-sm font-medium">{preset.label}</span>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </div>
                {currentTransition === preset.value && (
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
