import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle, StatContent } from "@/types/document";
import { cn } from "@/lib/utils";

interface StatCardBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function StatCardBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: StatCardBlockProps) {
  const stat = content.stat || { value: "0", label: "Label" };
  const [editingField, setEditingField] = useState<"value" | "label" | null>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("value");
    }
  }, [isEditing]);

  useEffect(() => {
    if (editingField === "value" && valueRef.current) {
      valueRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(valueRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else if (editingField === "label" && labelRef.current) {
      labelRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(labelRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleValueBlur = () => {
    if (valueRef.current) {
      const newStat: StatContent = { ...stat, value: valueRef.current.textContent || "" };
      onUpdate({ stat: newStat });
    }
    setEditingField(null);
  };

  const handleLabelBlur = () => {
    if (labelRef.current) {
      const newStat: StatContent = { ...stat, label: labelRef.current.textContent || "" };
      onUpdate({ stat: newStat });
    }
    setEditingField(null);
    onEndEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "value" | "label") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "value") {
        setEditingField("label");
      } else {
        handleLabelBlur();
      }
    }
    if (e.key === "Escape") {
      setEditingField(null);
      onEndEdit();
    }
    if (e.key === "Tab" && field === "value") {
      e.preventDefault();
      setEditingField("label");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-xl transition-all",
        isDark 
          ? "bg-rho-green/10 border border-rho-green/30" 
          : "bg-gradient-to-br from-rho-green/10 to-rho-lime/5 border border-rho-green/20",
        isEditing && "ring-2 ring-primary/30"
      )}
    >
      <span
        ref={valueRef}
        className={cn(
          "font-data text-4xl md:text-5xl font-bold outline-none text-center",
          isDark ? "text-rho-green" : "text-rho-green",
          editingField === "value" && "bg-primary/10 rounded px-2"
        )}
        contentEditable={editingField === "value"}
        suppressContentEditableWarning
        onBlur={handleValueBlur}
        onKeyDown={(e) => handleKeyDown(e, "value")}
        onClick={() => isEditing && setEditingField("value")}
      >
        {stat.value}
      </span>
      
      {stat.unit && (
        <span className={cn(
          "font-data text-xl mt-1",
          isDark ? "text-white/60" : "text-slate-500"
        )}>
          {stat.unit}
        </span>
      )}
      
      <span
        ref={labelRef}
        className={cn(
          "font-data text-xs uppercase tracking-widest mt-2 outline-none text-center",
          isDark ? "text-white/50" : "text-slate-500",
          editingField === "label" && "bg-primary/10 rounded px-2"
        )}
        contentEditable={editingField === "label"}
        suppressContentEditableWarning
        onBlur={handleLabelBlur}
        onKeyDown={(e) => handleKeyDown(e, "label")}
        onClick={() => isEditing && setEditingField("label")}
      >
        {stat.label}
      </span>
    </div>
  );
}
