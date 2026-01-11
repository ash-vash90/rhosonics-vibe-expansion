import { useRef, useState, useCallback } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { Upload, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const { 
    imageUrl = "", 
    title = "", 
    subtitle = "", 
    overlayOpacity = 0.6, 
    height = "280px", 
    gradientDirection = "right" 
  } = content;

  const uploadImage = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `hero-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `case-studies/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Failed to upload image");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        onUpdate({ heroImage: { ...content.heroImage, imageUrl: urlData.publicUrl } });
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }, [content.heroImage, onUpdate]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  }, [uploadImage]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set false if leaving the container (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImage(file);
    }
  }, [uploadImage]);

  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (onUpdate) {
      onUpdate({ heroImage: { ...content.heroImage, title: e.currentTarget.textContent || "" } });
    }
  };

  const handleSubtitleChange = (e: React.FocusEvent<HTMLParagraphElement>) => {
    if (onUpdate) {
      onUpdate({ heroImage: { ...content.heroImage, subtitle: e.currentTarget.textContent || "" } });
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

  // Empty state - show upload placeholder
  if (!imageUrl && !content.heroImage?.imageUrl) {
    return (
      <div
        className={cn(
          "relative w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
          isDragOver
            ? "border-rho-green bg-rho-green/10 scale-[1.01]"
            : isDark 
              ? "border-white/20 bg-white/5 hover:border-rho-green/50 hover:bg-white/10" 
              : "border-muted-foreground/30 bg-muted/20 hover:border-primary/50 hover:bg-muted/30",
          isUploading && "pointer-events-none"
        )}
        style={{ height }}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
        
        {isUploading ? (
          <div className={cn(
            "flex flex-col items-center gap-3",
            isDark ? "text-white/70" : "text-muted-foreground"
          )}>
            <Loader2 className="w-10 h-10 animate-spin text-rho-green" />
            <p className="font-medium font-ui">Uploading...</p>
          </div>
        ) : (
          <div className={cn(
            "flex flex-col items-center gap-3 transition-transform",
            isDragOver ? "scale-105" : "",
            isDark ? "text-white/50" : "text-muted-foreground"
          )}>
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
              isDragOver 
                ? "bg-rho-green/20 text-rho-green" 
                : isDark ? "bg-white/10" : "bg-muted/50"
            )}>
              {isDragOver ? <Upload className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
            </div>
            <div className="text-center">
              <p className="font-medium font-ui">
                {isDragOver ? "Drop to upload" : "Upload Hero Image"}
              </p>
              <p className="text-sm opacity-70">Click or drag and drop</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const displayImageUrl = content.heroImage?.imageUrl || imageUrl;
  const displayTitle = content.heroImage?.title || title;
  const displaySubtitle = content.heroImage?.subtitle || subtitle;

  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden group",
        isDragOver && "ring-2 ring-rho-green ring-offset-2"
      )}
      style={{ height }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Background Image */}
      <img
        src={displayImageUrl}
        alt={displayTitle || "Hero image"}
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
          {displayTitle || (isEditing ? "Enter title..." : "")}
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
          {displaySubtitle || (isEditing ? "Enter subtitle..." : "")}
        </p>
      </div>

      {/* Upload overlay on drag */}
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-rho-green/30 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-2 text-white">
            <Upload className="w-10 h-10" />
            <p className="font-medium font-ui">Drop to replace image</p>
          </div>
        </div>
      )}

      {/* Uploading overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="flex flex-col items-center gap-2 text-white">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="font-medium font-ui">Uploading...</p>
          </div>
        </div>
      )}

      {/* Replace Image Button (on hover when editing) */}
      {isEditing && !isDragOver && !isUploading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-10">
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
