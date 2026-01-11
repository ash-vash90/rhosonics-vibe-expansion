import React, { useRef } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroImageBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function HeroImageBlock({
  content,
  isEditing = false,
  isDark,
  onUpdate,
}: HeroImageBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    imageUrl = "", 
    title = "", 
    subtitle = "", 
    overlayOpacity = 0.6, 
    height = "280px", 
    gradientDirection = "right" 
  } = content;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (onUpdate) {
      onUpdate({ title: e.currentTarget.textContent || "" });
    }
  };

  const handleSubtitleChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    if (onUpdate) {
      onUpdate({ subtitle: e.currentTarget.textContent || "" });
    }
  };

  const getGradientStyle = () => {
    const opacity = overlayOpacity;
    const gradients: Record<string, string> = {
      right: `linear-gradient(to right, rgba(17, 21, 34, ${opacity}) 0%, rgba(17, 21, 34, ${opacity * 0.8}) 40%, transparent 70%)`,
      left: `linear-gradient(to left, rgba(17, 21, 34, ${opacity}) 0%, rgba(17, 21, 34, ${opacity * 0.8}) 40%, transparent 70%)`,
      bottom: `linear-gradient(to bottom, transparent 0%, rgba(17, 21, 34, ${opacity * 0.5}) 50%, rgba(17, 21, 34, ${opacity}) 100%)`,
      top: `linear-gradient(to top, transparent 0%, rgba(17, 21, 34, ${opacity * 0.5}) 50%, rgba(17, 21, 34, ${opacity}) 100%)`,
    };
    return gradients[gradientDirection || "right"];
  };

  const getTextPosition = () => {
    const positions: Record<string, string> = {
      right: "left-0 pl-8 pr-16 items-start text-left",
      left: "right-0 pr-8 pl-16 items-end text-right",
      bottom: "bottom-0 left-0 right-0 px-8 pb-8 items-start text-left",
      top: "top-0 left-0 right-0 px-8 pt-8 items-start text-left",
    };
    return positions[gradientDirection || "right"];
  };

  if (!imageUrl) {
    return (
      <div
        className={cn(
          "relative w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
          isDark 
            ? "border-white/20 bg-white/5 hover:border-rho-green/50 hover:bg-white/10" 
            : "border-muted-foreground/30 bg-muted/20 hover:border-primary/50 hover:bg-muted/30"
        )}
        style={{ height }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
        <div className={cn(
          "flex flex-col items-center gap-3",
          isDark ? "text-white/50" : "text-muted-foreground"
        )}>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isDark ? "bg-white/10" : "bg-muted/50"
          )}>
            <ImageIcon className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-medium font-ui">Upload Hero Image</p>
            <p className="text-sm opacity-70">Click or drag and drop</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden group"
      style={{ height }}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title || "Hero image"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: getGradientStyle() }}
      />

      {/* Brand Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rho-green via-rho-lime to-transparent" />

      {/* Text Content */}
      <div
        className={`absolute inset-y-0 flex flex-col justify-center max-w-[60%] ${getTextPosition()}`}
      >
        <h2
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleTitleChange}
          className={cn(
            "text-3xl font-bold text-white mb-2 outline-none font-logo",
            isEditing && "ring-1 ring-white/30 rounded px-2 py-1 -ml-2"
          )}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        >
          {title || (isEditing ? "Enter title..." : "")}
        </h2>
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleSubtitleChange}
          className={cn(
            "text-lg text-white/90 outline-none font-ui",
            isEditing && "ring-1 ring-white/30 rounded px-2 py-1 -ml-2"
          )}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          {subtitle || (isEditing ? "Enter subtitle..." : "")}
        </p>
      </div>

      {/* Replace Image Button (on hover when editing) */}
      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 text-slate-900 rounded-lg font-medium font-ui hover:bg-white transition-colors"
          >
            <Upload className="w-4 h-4" />
            Replace Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
      )}

      {/* Bottom Fade for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

// Also export as default for backward compatibility
export const HeroImageBlockLegacy = HeroImageBlock;
