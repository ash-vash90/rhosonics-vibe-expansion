import React, { useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";

interface ParagraphBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function ParagraphBlock({
  content,
  style,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: ParagraphBlockProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      // Move cursor to end
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (ref.current) {
      onUpdate({ text: ref.current.textContent || "" });
    }
    onEndEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onEndEdit();
    }
  };

  const alignment = style?.alignment || "left";

  return (
    <p
      ref={ref}
      className={cn(
        "font-ui text-lg leading-relaxed transition-colors outline-none",
        alignment === "center" && "text-center",
        alignment === "right" && "text-right",
        isDark ? "text-white/80" : "text-slate-600",
        isEditing && "ring-2 ring-primary/30 rounded px-2 -mx-2 py-1"
      )}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {content.text || "Add your text here..."}
    </p>
  );
}
