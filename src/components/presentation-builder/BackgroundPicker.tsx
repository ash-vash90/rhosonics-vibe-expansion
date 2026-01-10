import React from "react";
import { SlideBackground, BACKGROUND_PRESETS } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { Check, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BackgroundPickerProps {
  currentBackground: SlideBackground;
  onSelect: (background: SlideBackground) => void;
}

export function BackgroundPicker({ currentBackground, onSelect }: BackgroundPickerProps) {
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
          <span>Background</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="start">
        <div className="space-y-4">
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
