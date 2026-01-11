import { useRef, useState, useCallback } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload, Crop, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageCropper } from "@/components/ui/image-cropper";

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
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File | Blob, fileName?: string) => {
    setIsUploading(true);
    try {
      const fileExt = fileName?.split(".").pop()?.toLowerCase() || "jpg";
      const finalName = `image-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `case-studies/${finalName}`;

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
        onUpdate({ imageUrl: urlData.publicUrl });
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }, [onUpdate]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB");
      return;
    }

    // Show cropper for the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      setPendingImage(e.target?.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    e.target.value = "";
  }, [handleFileSelect]);

  const handleCropComplete = useCallback(async (blob: Blob) => {
    await uploadImage(blob, "cropped.jpg");
    setPendingImage(null);
  }, [uploadImage]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

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

  // Empty state
  if (!content.imageUrl) {
    return (
      <>
        <div
          className={cn(
            "flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer",
            isDragOver
              ? "border-rho-green bg-rho-green/10 scale-[1.01]"
              : isDark 
                ? "border-white/20 bg-white/5 hover:bg-white/10" 
                : "border-slate-300 bg-slate-50 hover:bg-slate-100",
            isUploading && "pointer-events-none",
            widthClass
          )}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className={cn(
              "flex flex-col items-center gap-3",
              isDark ? "text-white/70" : "text-muted-foreground"
            )}>
              <Loader2 className="w-10 h-10 animate-spin text-rho-green" />
              <p className="font-medium font-ui">Uploading...</p>
            </div>
          ) : (
            <>
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                isDragOver 
                  ? "bg-rho-green/20 text-rho-green" 
                  : isDark ? "bg-white/10" : "bg-slate-200"
              )}>
                {isDragOver ? (
                  <Upload className="w-8 h-8" />
                ) : (
                  <ImagePlus className={cn(
                    "w-8 h-8",
                    isDark ? "text-white/40" : "text-slate-400"
                  )} />
                )}
              </div>
              <p className={cn(
                "font-ui text-sm mb-2",
                isDark ? "text-white/60" : "text-slate-500"
              )}>
                {isDragOver ? "Drop to upload" : "Click to upload an image"}
              </p>
              <p className={cn(
                "font-ui text-xs",
                isDark ? "text-white/40" : "text-slate-400"
              )}>
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {pendingImage && (
          <ImageCropper
            open={cropperOpen}
            onOpenChange={(open) => {
              setCropperOpen(open);
              if (!open) setPendingImage(null);
            }}
            imageSrc={pendingImage}
            onCropComplete={handleCropComplete}
            title="Crop Image"
          />
        )}
      </>
    );
  }

  return (
    <>
      <div 
        className={cn(
          "relative group",
          widthClass,
          isEditing && "ring-2 ring-primary/30 rounded-xl",
          isDragOver && "ring-2 ring-rho-green"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={content.imageUrl}
            alt={content.imageAlt || "Image"}
            className="w-full h-auto object-cover"
          />
          
          {/* Drag overlay */}
          {isDragOver && (
            <div className="absolute inset-0 bg-rho-green/30 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload className="w-8 h-8" />
                <p className="font-medium font-ui">Drop to replace</p>
              </div>
            </div>
          )}

          {/* Uploading overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          )}
          
          {/* Overlay with buttons on hover when editing */}
          {isEditing && !isDragOver && !isUploading && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Replace
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setPendingImage(content.imageUrl!);
                  setCropperOpen(true);
                }}
              >
                <Crop className="w-4 h-4 mr-2" />
                Crop
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

      {pendingImage && (
        <ImageCropper
          open={cropperOpen}
          onOpenChange={(open) => {
            setCropperOpen(open);
            if (!open) setPendingImage(null);
          }}
          imageSrc={pendingImage}
          onCropComplete={handleCropComplete}
          title="Crop Image"
        />
      )}
    </>
  );
}
