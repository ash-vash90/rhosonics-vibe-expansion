import React, { useState } from "react";
import { GripVertical, Trash2, Copy, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EditableBlockProps {
  isSelected: boolean;
  isEditing: boolean;
  isDark: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onEndEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onAddBlockAfter: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}

export function EditableBlock({
  isSelected,
  isEditing,
  isDark,
  onSelect,
  onStartEdit,
  onEndEdit,
  onDelete,
  onDuplicate,
  onAddBlockAfter,
  onMoveUp,
  onMoveDown,
  children,
}: EditableBlockProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      onSelect();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isEditing) {
      onEndEdit();
    }
    if (e.key === "Delete" && isSelected && !isEditing) {
      onDelete();
    }
  };

  return (
    <div
      className={cn(
        "group relative transition-all duration-150",
        isSelected && "ring-2 ring-primary/50 rounded-lg",
        !isEditing && isHovered && !isSelected && "ring-1 ring-muted-foreground/20 rounded-lg"
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      {/* Drag handle - left side */}
      {(isHovered || isSelected) && !isEditing && (
        <div
          className={cn(
            "absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab",
            isDark ? "text-white/50" : "text-slate-400"
          )}
        >
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Block content */}
      <div className="relative">
        {children}
      </div>

      {/* Floating toolbar - appears on selection */}
      {isSelected && !isEditing && (
        <div
          className={cn(
            "absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-1 p-1 rounded-lg shadow-lg border z-20",
            isDark 
              ? "bg-slate-800 border-slate-700" 
              : "bg-white border-slate-200"
          )}
        >
          {onMoveUp && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Add block button - appears below on hover */}
      {(isHovered || isSelected) && !isEditing && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-10">
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
              isDark 
                ? "bg-slate-800 border-slate-600 hover:bg-slate-700" 
                : "bg-white border-slate-200 hover:bg-slate-50"
            )}
            onClick={(e) => { e.stopPropagation(); onAddBlockAfter(); }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
