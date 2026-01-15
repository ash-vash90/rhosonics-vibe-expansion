import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Plus } from "@/lib/icons";
import { Button } from "@/components/ui/button";

interface StatGridBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function StatGridBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: StatGridBlockProps) {
  const stats = content.stats || [
    { value: "50+", label: "Customers" },
    { value: "99%", label: "Accuracy" },
    { value: "24/7", label: "Support" },
  ];

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<"value" | "label" | null>(null);
  const inputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && editingField) {
      inputRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(inputRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingIndex, editingField]);

  const handleFieldClick = (index: number, field: "value" | "label") => {
    if (!isEditing) return;
    setEditingIndex(index);
    setEditingField(field);
  };

  const handleBlur = (index: number, field: "value" | "label") => {
    if (inputRef.current) {
      const newStats = [...stats];
      newStats[index] = {
        ...newStats[index],
        [field]: inputRef.current.textContent || "",
      };
      onUpdate({ stats: newStats });
    }
    setEditingIndex(null);
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, field: "value" | "label") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "value") {
        setEditingField("label");
      } else {
        handleBlur(index, field);
      }
    }
    if (e.key === "Escape") {
      setEditingIndex(null);
      setEditingField(null);
      onEndEdit();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (field === "value") {
        setEditingField("label");
      } else if (index < stats.length - 1) {
        setEditingIndex(index + 1);
        setEditingField("value");
      } else {
        handleBlur(index, field);
        onEndEdit();
      }
    }
  };

  const handleAddStat = () => {
    const newStats = [...stats, { value: "0", label: "New Metric" }];
    onUpdate({ stats: newStats });
  };

  const handleRemoveStat = (index: number) => {
    const newStats = stats.filter((_, i) => i !== index);
    onUpdate({ stats: newStats });
  };

  const TrendIcon = (trend?: "up" | "down" | "neutral") => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return Minus;
  };

  return (
    <div className={cn(
      "w-full",
      isEditing && "ring-2 ring-primary/30 rounded-xl p-2"
    )}>
      <div className={cn(
        "grid gap-4",
        stats.length <= 2 && "grid-cols-2",
        stats.length === 3 && "grid-cols-3",
        stats.length >= 4 && "grid-cols-2 md:grid-cols-4"
      )}>
        {stats.map((stat, index) => {
          const isEditingThisValue = editingIndex === index && editingField === "value";
          const isEditingThisLabel = editingIndex === index && editingField === "label";
          const Icon = TrendIcon(stat.trend);

          return (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg transition-all relative group",
                isDark 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-slate-50 border border-slate-100"
              )}
            >
              {isEditing && stats.length > 1 && (
                <button
                  onClick={() => handleRemoveStat(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
              
              <div className="flex items-center gap-1">
                <span
                  ref={isEditingThisValue ? inputRef : undefined}
                  className={cn(
                    "font-data text-2xl md:text-3xl font-bold outline-none",
                    isDark ? "text-rho-green" : "text-rho-green",
                    isEditingThisValue && "bg-primary/10 rounded px-1"
                  )}
                  contentEditable={isEditingThisValue}
                  suppressContentEditableWarning
                  onBlur={() => handleBlur(index, "value")}
                  onKeyDown={(e) => handleKeyDown(e, index, "value")}
                  onClick={() => handleFieldClick(index, "value")}
                >
                  {stat.value}
                </span>
                {stat.trend && (
                  <Icon className={cn(
                    "w-4 h-4",
                    stat.trend === "up" && "text-success",
                    stat.trend === "down" && "text-error"
                  )} />
                )}
              </div>
              
              <span
                ref={isEditingThisLabel ? inputRef : undefined}
                className={cn(
                  "font-ui text-xs uppercase tracking-wider mt-1 outline-none",
                  isDark ? "text-white/60" : "text-slate-500",
                  isEditingThisLabel && "bg-primary/10 rounded px-1"
                )}
                contentEditable={isEditingThisLabel}
                suppressContentEditableWarning
                onBlur={() => handleBlur(index, "label")}
                onKeyDown={(e) => handleKeyDown(e, index, "label")}
                onClick={() => handleFieldClick(index, "label")}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
        
        {isEditing && stats.length < 6 && (
          <Button
            variant="outline"
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border-dashed h-full min-h-[100px]",
              isDark 
                ? "border-white/20 hover:bg-white/5" 
                : "border-slate-300 hover:bg-slate-50"
            )}
            onClick={handleAddStat}
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Add Stat</span>
          </Button>
        )}
      </div>
    </div>
  );
}
