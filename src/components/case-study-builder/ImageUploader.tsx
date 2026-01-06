import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value: string | null;
  onChange: (value: string | null) => void;
  aspectRatio?: string;
  label?: string;
  className?: string;
}

export const ImageUploader = ({
  value,
  onChange,
  aspectRatio = "16/9",
  label = "Upload Image",
  className,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (value) {
    return (
      <div className={cn("relative group rounded-lg overflow-hidden", className)}>
        <img
          src={value}
          alt="Uploaded"
          className="w-full h-full object-cover"
          style={{ aspectRatio }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(null)}
            className="text-white border-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    );
  }

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-colors flex flex-col items-center justify-center p-6 cursor-pointer",
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        className
      )}
      style={{ aspectRatio }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="sr-only"
      />
      <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
        {isDragging ? (
          <Upload className="w-8 h-8 text-primary" />
        ) : (
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {isDragging ? "Drop image here" : label}
        </p>
        <p className="text-xs text-muted-foreground/60">
          Drag & drop or click to browse
        </p>
      </div>
    </label>
  );
};
