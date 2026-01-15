import { useState } from "react";
import { Heart, Trash2, MoreVertical, FileText, Presentation, Clock, Copy, Pencil } from "@/lib/icons";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface DocumentCardProps {
  id: string;
  name: string;
  type: "case-study" | "presentation";
  updatedAt: string;
  isFavorite: boolean;
  isComplete?: boolean;
  thumbnailUrl?: string;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onRename?: (id: string, newName: string) => void;
}

export const DocumentCard = ({
  id,
  name,
  type,
  updatedAt,
  isFavorite,
  isComplete = true,
  thumbnailUrl,
  onSelect,
  onToggleFavorite,
  onDelete,
  onDuplicate,
  onRename,
}: DocumentCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newName, setNewName] = useState(name);

  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const Icon = type === "case-study" ? FileText : Presentation;

  return (
    <>
      <div
        onClick={() => onSelect(id)}
        className={cn(
          "group relative flex flex-col rounded-lg border border-border/60 bg-card/50 overflow-hidden cursor-pointer transition-all duration-200",
          "hover:bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
        )}
      >
        {/* Thumbnail / Preview */}
        <div
          className={cn(
            "relative bg-muted/30",
            type === "case-study" ? "aspect-[3/4]" : "aspect-[16/10]"
          )}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 rounded-full bg-muted/50">
                <Icon className="w-12 h-12 text-muted-foreground/40" />
              </div>
            </div>
          )}

          {/* Status Badge */}
          {!isComplete && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-600 border border-amber-500/30">
                Draft
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(id);
                }}
              >
                Open
              </Button>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(id);
                  }}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isFavorite && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(id);
                }}
              >
                <Heart className={cn("w-4 h-4 mr-2", isFavorite && "fill-current")} />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </DropdownMenuItem>
              {onDuplicate && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(id);
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
              )}
              {onRename && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewName(name);
                    setShowRenameDialog(true);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteDialog(true);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {type === "case-study" ? "case study" : "presentation"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(id);
                setShowDeleteDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && newName.trim()) {
                onRename?.(id, newName.trim());
                setShowRenameDialog(false);
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newName.trim()) {
                  onRename?.(id, newName.trim());
                  setShowRenameDialog(false);
                }
              }}
              disabled={!newName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
