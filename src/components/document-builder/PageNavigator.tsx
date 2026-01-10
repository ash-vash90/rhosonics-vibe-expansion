import { useState } from "react";
import { Page, PageBackground } from "@/types/document";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Copy, MoreHorizontal, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageNavigatorProps {
  pages: Page[];
  currentPageIndex: number;
  onSelectPage: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (pageId: string) => void;
  onDuplicatePage: (pageId: string) => void;
  onReorderPages: (fromIndex: number, toIndex: number) => void;
}

export function PageNavigator({
  pages,
  currentPageIndex,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onDuplicatePage,
  onReorderPages,
}: PageNavigatorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorderPages(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const getBackgroundStyle = (bg: PageBackground): React.CSSProperties => {
    if (bg.type === "solid") return { backgroundColor: bg.value };
    if (bg.type === "gradient") return { background: bg.value };
    if (bg.type === "image") return { 
      backgroundImage: `url(${bg.value})`,
      backgroundSize: "cover",
    };
    return { backgroundColor: "hsl(var(--background))" };
  };

  return (
    <div className="w-48 border-r border-border bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-ui font-medium text-foreground">Pages</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onAddPage}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Page List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {pages.map((page, index) => (
          <div
            key={page.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "relative group cursor-pointer rounded-lg border-2 transition-all",
              currentPageIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-muted-foreground/30",
              draggedIndex === index && "opacity-50"
            )}
          >
            {/* Page Thumbnail (A4 portrait aspect ratio) */}
            <button
              onClick={() => onSelectPage(index)}
              className="w-full focus:outline-none"
            >
              <div
                className="aspect-[210/297] rounded overflow-hidden relative"
                style={getBackgroundStyle(page.background)}
              >
                {/* Mini preview of blocks */}
                <div className="absolute inset-0 p-2 flex flex-col gap-1">
                  {page.blocks.slice(0, 4).map((block) => (
                    <div
                      key={block.id}
                      className={cn(
                        "rounded-sm",
                        page.background.value.includes("225") || page.background.value.includes("10%")
                          ? "bg-white/20"
                          : "bg-slate-900/10",
                        block.type === "heading" ? "h-2 w-3/4" : "h-1.5 w-full"
                      )}
                    />
                  ))}
                </div>
                
                {/* Page number overlay */}
                <div className={cn(
                  "absolute bottom-1 right-1 text-[10px] font-ui font-medium px-1.5 rounded",
                  page.background.value.includes("225") || page.background.value.includes("10%")
                    ? "bg-white/20 text-white"
                    : "bg-slate-900/10 text-slate-700"
                )}>
                  {index + 1}
                </div>
              </div>
            </button>

            {/* Drag handle */}
            <div className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "cursor-grab active:cursor-grabbing"
            )}>
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Actions menu */}
            <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                  <DropdownMenuItem onClick={() => onDuplicatePage(page.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeletePage(page.id)}
                    disabled={pages.length <= 1}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Footer - Page count */}
      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground font-ui text-center">
          {pages.length} {pages.length === 1 ? "page" : "pages"}
        </p>
      </div>
    </div>
  );
}