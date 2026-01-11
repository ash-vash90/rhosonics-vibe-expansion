import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, RotateCw, Maximize2 } from "lucide-react";

interface ImageCropperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  aspectRatio?: number;
  title?: string;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ImageCropper({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  aspectRatio: initialAspect,
  title = "Crop Image",
}: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);
  const [isProcessing, setIsProcessing] = useState(false);

  const aspectOptions = [
    { value: "free", label: "Free" },
    { value: "16:9", label: "16:9 (Landscape)" },
    { value: "4:3", label: "4:3 (Standard)" },
    { value: "1:1", label: "1:1 (Square)" },
    { value: "3:4", label: "3:4 (Portrait)" },
    { value: "9:16", label: "9:16 (Tall)" },
  ];

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = aspect
      ? centerAspectCrop(width, height, aspect)
      : {
          unit: "%" as const,
          x: 5,
          y: 5,
          width: 90,
          height: 90,
        };
    setCrop(newCrop);
  }, [aspect]);

  const handleAspectChange = (value: string) => {
    if (value === "free") {
      setAspect(undefined);
    } else {
      const [w, h] = value.split(":").map(Number);
      const newAspect = w / h;
      setAspect(newAspect);
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        setCrop(centerAspectCrop(width, height, newAspect));
      }
    }
  };

  const getCroppedImage = useCallback(async (): Promise<Blob | null> => {
    if (!imgRef.current || !completedCrop) return null;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const pixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;

    const rotateRads = rotate * (Math.PI / 180);
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // Move origin to center of image for rotation
    ctx.translate(centerX, centerY);
    // Rotate
    ctx.rotate(rotateRads);
    // Scale
    ctx.scale(scale, scale);
    // Move origin back
    ctx.translate(-centerX, -centerY);
    // Draw the image
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.92
      );
    });
  }, [completedCrop, rotate, scale]);

  const handleApplyCrop = async () => {
    setIsProcessing(true);
    try {
      const blob = await getCroppedImage();
      if (blob) {
        onCropComplete(blob);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Crop error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setScale(1);
    setRotate(0);
    setAspect(initialAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      if (initialAspect) {
        setCrop(centerAspectCrop(width, height, initialAspect));
      } else {
        setCrop({ unit: "%", x: 5, y: 5, width: 90, height: 90 });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-logo">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto py-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div className="space-y-1">
              <label className="text-xs font-ui text-muted-foreground">Aspect Ratio</label>
              <Select
                value={aspect ? `${Math.round(aspect * 100) / 100}` : "free"}
                onValueChange={handleAspectChange}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Free" />
                </SelectTrigger>
                <SelectContent>
                  {aspectOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 flex-1 min-w-[150px] max-w-[200px]">
              <label className="text-xs font-ui text-muted-foreground">
                Scale: {Math.round(scale * 100)}%
              </label>
              <Slider
                value={[scale]}
                onValueChange={([v]) => setScale(v)}
                min={0.5}
                max={2}
                step={0.05}
                className="w-full"
              />
            </div>

            <div className="space-y-1 flex-1 min-w-[150px] max-w-[200px]">
              <label className="text-xs font-ui text-muted-foreground">
                Rotate: {rotate}°
              </label>
              <Slider
                value={[rotate]}
                onValueChange={([v]) => setRotate(v)}
                min={-180}
                max={180}
                step={1}
                className="w-full"
              />
            </div>

            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Crop Area */}
          <div className="flex justify-center bg-slate-100 rounded-lg p-4 min-h-[300px]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="max-h-[50vh]"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                className="max-h-[50vh] object-contain"
                style={{
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApplyCrop} disabled={isProcessing || !completedCrop}>
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Apply Crop
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
