import React, { useRef } from "react";
import { Upload, ImageIcon } from "lucide-react";

interface HeroImageBlockProps {
  content: {
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    overlayOpacity?: number;
    height?: string;
    gradientDirection?: "left" | "right" | "bottom" | "top";
  };
  style?: Record<string, any>;
  isEditing?: boolean;
  onUpdate?: (content: any) => void;
}

export const HeroImageBlock: React.FC<HeroImageBlockProps> = ({
  content,
  isEditing = false,
  onUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, title = "", subtitle = "", overlayOpacity = 0.6, height = "300px", gradientDirection = "right" } = content;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({
          ...content,
          imageUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (onUpdate) {
      onUpdate({ ...content, title: e.currentTarget.textContent || "" });
    }
  };

  const handleSubtitleChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    if (onUpdate) {
      onUpdate({ ...content, subtitle: e.currentTarget.textContent || "" });
    }
  };

  const getGradientStyle = () => {
    const gradients: Record<string, string> = {
      right: `linear-gradient(to right, rgba(17, 21, 34, ${overlayOpacity}) 0%, rgba(17, 21, 34, ${overlayOpacity * 0.8}) 40%, transparent 70%)`,
      left: `linear-gradient(to left, rgba(17, 21, 34, ${overlayOpacity}) 0%, rgba(17, 21, 34, ${overlayOpacity * 0.8}) 40%, transparent 70%)`,
      bottom: `linear-gradient(to bottom, transparent 0%, rgba(17, 21, 34, ${overlayOpacity * 0.5}) 50%, rgba(17, 21, 34, ${overlayOpacity}) 100%)`,
      top: `linear-gradient(to top, transparent 0%, rgba(17, 21, 34, ${overlayOpacity * 0.5}) 50%, rgba(17, 21, 34, ${overlayOpacity}) 100%)`,
    };
    return gradients[gradientDirection] || gradients.right;
  };

  const getTextPosition = () => {
    const positions: Record<string, string> = {
      right: "left-0 pl-8 pr-16 items-start text-left",
      left: "right-0 pr-8 pl-16 items-end text-right",
      bottom: "bottom-0 left-0 right-0 px-8 pb-8 items-start text-left",
      top: "top-0 left-0 right-0 px-8 pt-8 items-start text-left",
    };
    return positions[gradientDirection] || positions.right;
  };

  if (!imageUrl) {
    return (
      <div
        className="relative w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
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
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-medium">Upload Hero Image</p>
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
          className={`text-3xl font-bold text-white mb-2 outline-none ${
            isEditing ? "ring-1 ring-white/30 rounded px-2 py-1 -ml-2" : ""
          }`}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        >
          {title || (isEditing ? "Enter title..." : "")}
        </h2>
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleSubtitleChange}
          className={`text-lg text-white/90 outline-none ${
            isEditing ? "ring-1 ring-white/30 rounded px-2 py-1 -ml-2" : ""
          }`}
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
            className="flex items-center gap-2 px-4 py-2 bg-white/90 text-slate-900 rounded-lg font-medium hover:bg-white transition-colors"
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
};
