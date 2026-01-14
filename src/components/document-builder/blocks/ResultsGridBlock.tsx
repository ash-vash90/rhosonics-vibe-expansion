import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";

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

  return (
    <div
      className={cn(
        "space-y-3 transition-all",
        isEditing && "ring-2 ring-primary/30 rounded-xl p-3 -m-3"
      )}
    >
      {/* Header */}
      <h3 className={cn(
        "font-data text-xs uppercase tracking-widest mb-4",
        isDark ? "text-white/50" : "text-slate-400"
      )}>
        KEY RESULTS
      </h3>

      {/* Numbered Results Grid - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {resultsGrid.results.map((result, index) => (
          <div
            key={index}
            className={cn(
              "group flex items-start gap-3 p-3 rounded-lg transition-colors",
              isDark 
                ? "bg-white/5 hover:bg-white/10" 
                : "bg-slate-50 hover:bg-slate-100",
              editingIndex === index && (isDark ? "bg-white/10" : "bg-slate-100")
            )}
            onClick={() => isEditing && setEditingIndex(index)}
          >
            {/* Numbered Circle */}
            <div className={cn(
              "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              isDark 
                ? "bg-rho-green/30 text-rho-green" 
                : "bg-rho-green text-white"
            )}>
              {index + 1}
            </div>

            {/* Result Text */}
            <span
              ref={(el) => { itemRefs.current[index] = el; }}
              className={cn(
                "flex-1 font-ui text-sm outline-none leading-snug",
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
                  "opacity-0 group-hover:opacity-100 p-1 rounded-full transition-all flex-shrink-0",
                  isDark 
                    ? "hover:bg-error/20 text-white/40 hover:text-error" 
                    : "hover:bg-error-surface text-slate-300 hover:text-error"
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
              ? "border-white/10 text-white/40 hover:border-primary/40 hover:text-primary" 
              : "border-slate-200 text-slate-400 hover:border-success-border hover:text-success"
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
