import { Download, FileCode, ChevronDown } from "@/lib/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LogoDownloadButtonsProps {
  variantId: string;
  downloading: string | null;
  onDownloadSVG: (variantId: string) => void;
  onDownloadPNG: (variantId: string, scale: number) => void;
}

export const LogoDownloadButtons = ({
  variantId,
  downloading,
  onDownloadSVG,
  onDownloadPNG,
}: LogoDownloadButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onDownloadSVG(variantId)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors"
      >
        <FileCode className="w-3.5 h-3.5" />
        SVG
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-data bg-muted hover:bg-muted/80 rounded transition-colors">
            <Download className="w-3.5 h-3.5" />
            PNG
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[120px]">
          {[2, 4, 8].map((scale) => (
            <DropdownMenuItem
              key={scale}
              onClick={() => onDownloadPNG(variantId, scale)}
              disabled={downloading === `${variantId}-${scale}x`}
              className="font-data text-xs"
            >
              {downloading === `${variantId}-${scale}x` ? "Downloading..." : `@${scale}x PNG`}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
