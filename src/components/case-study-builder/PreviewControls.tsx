import { ZoomIn, ZoomOut, FileDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PreviewControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  activePage: 1 | 2;
  onPageChange: (page: 1 | 2) => void;
  onExport: () => void;
  onFullscreen: () => void;
  isExporting?: boolean;
}

export const PreviewControls = ({
  zoom,
  onZoomChange,
  activePage,
  onPageChange,
  onExport,
  onFullscreen,
  isExporting = false,
}: PreviewControlsProps) => {
  return (
    <div className="flex items-center justify-between bg-muted/50 border-t border-border px-4 py-2">
      {/* Zoom Controls */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onZoomChange(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom out</TooltipContent>
        </Tooltip>
        
        <div className="w-24">
          <Slider
            value={[zoom]}
            onValueChange={([v]) => onZoomChange(v)}
            min={50}
            max={150}
            step={10}
          />
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onZoomChange(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom in</TooltipContent>
        </Tooltip>
        
        <span className="text-xs text-muted-foreground w-10 text-center">
          {zoom}%
        </span>
      </div>

      {/* Page Selector */}
      <div className="flex items-center gap-1 bg-background rounded-md p-1">
        <Button
          variant={activePage === 1 ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-3 text-xs"
          onClick={() => onPageChange(1)}
        >
          Page 1
        </Button>
        <Button
          variant={activePage === 2 ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-3 text-xs"
          onClick={() => onPageChange(2)}
        >
          Page 2
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onFullscreen}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Fullscreen preview</TooltipContent>
        </Tooltip>
        
        <Button
          size="sm"
          onClick={onExport}
          disabled={isExporting}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Download PDF"}
        </Button>
      </div>
    </div>
  );
};
