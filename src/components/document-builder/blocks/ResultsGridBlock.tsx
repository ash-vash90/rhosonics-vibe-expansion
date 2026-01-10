import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { CheckCircle, Plus, X, GripVertical } from "lucide-react";

interface ResultsGridBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function ResultsGridBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: ResultsGridBlockProps) {
  const resultsGrid = content.resultsGrid || { results: [""] };
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isEditing && editingIndex === null && resultsGrid.results.length > 0) {
      setEditingIndex(0);
    }
  }, [isEditing]);

  useEffect(() => {
    if (editingIndex !== null && itemRefs.current[editingIndex]) {
      itemRefs.current[editingIndex]?.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      if (itemRefs.current[editingIndex]) {
        range.selectNodeContents(itemRefs.current[editingIndex]!);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [editingIndex]);

  const updateResult = (index: number, value: string) => {
    const newResults = [...resultsGrid.results];
    newResults[index] = value;
    onUpdate({ resultsGrid: { results: newResults } });
  };

  const addResult = () => {
    const newResults = [...resultsGrid.results, ""];
    onUpdate({ resultsGrid: { results: newResults } });
    setTimeout(() => setEditingIndex(newResults.length - 1), 50);
  };

  const removeResult = (index: number) => {
    if (resultsGrid.results.length <= 1) return;
    const newResults = resultsGrid.results.filter((_, i) => i !== index);
    onUpdate({ resultsGrid: { results: newResults } });
    setEditingIndex(null);
  };

  const handleBlur = (index: number) => {
    if (itemRefs.current[index]) {
      updateResult(index, itemRefs.current[index]?.textContent || "");
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur(index);
      if (index < resultsGrid.results.length - 1) {
        setEditingIndex(index + 1);
      } else {
        addResult();
      }
    }
    if (e.key === "ArrowDown" && index < resultsGrid.results.length - 1) {
      e.preventDefault();
      handleBlur(index);
      setEditingIndex(index + 1);
    }
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      handleBlur(index);
      setEditingIndex(index - 1);
    }
    if (e.key === "Backspace" && !itemRefs.current[index]?.textContent && resultsGrid.results.length > 1) {
      e.preventDefault();
      removeResult(index);
      if (index > 0) {
        setEditingIndex(index - 1);
      }
    }
    if (e.key === "Escape") {
      setEditingIndex(null);
      onEndEdit();
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newResults = [...resultsGrid.results];
    const draggedItem = newResults[draggedIndex];
    newResults.splice(draggedIndex, 1);
    newResults.splice(index, 0, draggedItem);
    
    onUpdate({ resultsGrid: { results: newResults } });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all",
        isDark 
          ? "bg-gradient-to-br from-rho-green/5 to-transparent border-rho-green/20" 
          : "bg-gradient-to-br from-green-50/50 to-transparent border-green-200/50",
        isEditing && "ring-2 ring-primary/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          isDark ? "bg-rho-green/20" : "bg-green-100"
        )}>
          <CheckCircle className="w-4 h-4 text-rho-green" />
        </div>
        <h3 className={cn(
          "font-ui font-semibold text-sm uppercase tracking-wider",
          isDark ? "text-rho-green" : "text-green-700"
        )}>
          Key Results
        </h3>
      </div>

      {/* Results List */}
      <div className="space-y-2">
        {resultsGrid.results.map((result, index) => (
          <div
            key={index}
            className={cn(
              "group flex items-start gap-3 p-2 rounded-lg transition-colors",
              isDark ? "hover:bg-white/5" : "hover:bg-slate-50",
              editingIndex === index && (isDark ? "bg-white/5" : "bg-slate-50"),
              draggedIndex === index && "opacity-50"
            )}
            draggable={isEditing}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => isEditing && setEditingIndex(index)}
          >
            {/* Drag handle */}
            {isEditing && (
              <div className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity cursor-grab",
                isDark ? "text-white/30" : "text-slate-300"
              )}>
                <GripVertical className="w-4 h-4" />
              </div>
            )}
            
            {/* Checkmark */}
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
              isDark ? "bg-rho-green/30" : "bg-green-100"
            )}>
              <CheckCircle className="w-3 h-3 text-rho-green" />
            </div>

            {/* Result Text */}
            <span
              ref={(el) => { itemRefs.current[index] = el; }}
              className={cn(
                "flex-1 font-ui text-sm outline-none",
                isDark ? "text-white/80" : "text-slate-700",
                !result && (isDark ? "text-white/30" : "text-slate-300"),
                editingIndex === index && "bg-primary/5 rounded px-1"
              )}
              contentEditable={editingIndex === index}
              suppressContentEditableWarning
              onBlur={() => handleBlur(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {result || "Add a result..."}
            </span>

            {/* Remove button */}
            {isEditing && resultsGrid.results.length > 1 && (
              <button
                className={cn(
                  "opacity-0 group-hover:opacity-100 p-1 rounded-full transition-all",
                  isDark 
                    ? "hover:bg-red-500/20 text-white/40 hover:text-red-400" 
                    : "hover:bg-red-100 text-slate-300 hover:text-red-500"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  removeResult(index);
                }}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Result Button */}
      {isEditing && (
        <button
          className={cn(
            "w-full mt-3 py-2 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors",
            isDark 
              ? "border-white/10 text-white/40 hover:border-rho-green/40 hover:text-rho-green" 
              : "border-slate-200 text-slate-400 hover:border-green-300 hover:text-green-600"
          )}
          onClick={addResult}
        >
          <Plus className="w-4 h-4" />
          <span className="font-ui text-xs uppercase tracking-wider">Add Result</span>
        </button>
      )}
    </div>
  );
}
