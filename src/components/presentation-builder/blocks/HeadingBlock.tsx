import React, { useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/presentation";
import { cn } from "@/lib/utils";

interface HeadingBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function HeadingBlock({
  content,
  style,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: HeadingBlockProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
      // Select all text
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
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
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      onEndEdit();
    }
  };

  const level = content.level || 1;
  const alignment = style?.alignment || "left";

  const baseStyles = cn(
    "font-logo font-semibold leading-tight transition-colors outline-none",
    alignment === "center" && "text-center",
    alignment === "right" && "text-right",
    isDark ? "text-white" : "text-slate-900",
    isEditing && "ring-2 ring-primary/30 rounded px-2 -mx-2"
  );

  const sizeStyles = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
  }[level] || "text-4xl md:text-5xl";

  return (
    <h1
      ref={ref}
      className={cn(baseStyles, sizeStyles)}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {content.text || "Heading"}
    </h1>
  );
}
