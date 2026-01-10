import React, { useRef } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function ImageBlock({
  content,
  style,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: ImageBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpdate({ 
        imageUrl: event.target?.result as string,
        imageAlt: file.name 
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionBlur = () => {
    if (captionRef.current) {
      onUpdate({ caption: captionRef.current.textContent || "" });
    }
    onEndEdit();
  };

  const width = style?.width || "full";
  const widthClass = {
    full: "w-full",
    wide: "w-[90%] mx-auto",
    medium: "w-[70%] mx-auto",
    narrow: "w-[50%] mx-auto",
  }[width];

  if (!content.imageUrl) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer",
          isDark 
            ? "border-white/20 bg-white/5 hover:bg-white/10" 
            : "border-slate-300 bg-slate-50 hover:bg-slate-100",
          widthClass
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImagePlus className={cn(
          "w-12 h-12 mb-4",
          isDark ? "text-white/40" : "text-slate-400"
        )} />
        <p className={cn(
          "font-ui text-sm mb-2",
          isDark ? "text-white/60" : "text-slate-500"
        )}>
          Click to upload an image
        </p>
        <p className={cn(
          "font-ui text-xs",
          isDark ? "text-white/40" : "text-slate-400"
        )}>
          PNG, JPG, GIF up to 10MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div className={cn(
      "relative group",
      widthClass,
      isEditing && "ring-2 ring-primary/30 rounded-xl"
    )}>
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={content.imageUrl}
          alt={content.imageAlt || "Image"}
          className="w-full h-auto object-cover"
        />
        
        {/* Overlay with replace button on hover when editing */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Replace Image
            </Button>
          </div>
        )}
      </div>
      
      {/* Caption */}
      {(content.caption || isEditing) && (
        <p
          ref={captionRef}
          className={cn(
            "font-ui text-sm text-center mt-3 outline-none",
            isDark ? "text-white/50" : "text-slate-500",
            isEditing && "bg-primary/10 rounded px-2 py-1"
          )}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleCaptionBlur}
          onClick={(e) => e.stopPropagation()}
        >
          {content.caption || (isEditing ? "Add a caption..." : "")}
        </p>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
