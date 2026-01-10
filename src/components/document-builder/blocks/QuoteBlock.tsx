import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle, QuoteContent } from "@/types/document";
import { cn } from "@/lib/utils";
import { Quote as QuoteIcon } from "lucide-react";

interface QuoteBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function QuoteBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: QuoteBlockProps) {
  const quote = content.quote || { text: "Quote text", author: "Author", role: "Role" };
  const [editingField, setEditingField] = useState<"text" | "author" | "role" | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("text");
    }
  }, [isEditing]);

  useEffect(() => {
    const ref = editingField === "text" ? textRef : editingField === "author" ? authorRef : roleRef;
    if (ref.current && editingField) {
      ref.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleBlur = (field: "text" | "author" | "role") => {
    const ref = field === "text" ? textRef : field === "author" ? authorRef : roleRef;
    if (ref.current) {
      const newQuote: QuoteContent = { 
        ...quote, 
        [field]: ref.current.textContent || "" 
      };
      onUpdate({ quote: newQuote });
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "text" | "author" | "role") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "text") {
        setEditingField("author");
      } else if (field === "author") {
        setEditingField("role");
      } else {
        handleBlur(field);
        onEndEdit();
      }
    }
    if (e.key === "Escape") {
      setEditingField(null);
      onEndEdit();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (field === "text") {
        setEditingField("author");
      } else if (field === "author") {
        setEditingField("role");
      } else {
        handleBlur(field);
        onEndEdit();
      }
    }
  };

  return (
    <div className={cn(
      "relative pl-8 py-4",
      isEditing && "ring-2 ring-primary/30 rounded-xl"
    )}>
      {/* Quote mark */}
      <QuoteIcon className={cn(
        "absolute left-0 top-4 w-6 h-6",
        isDark ? "text-rho-green/50" : "text-rho-green/30"
      )} />
      
      {/* Quote text */}
      <p
        ref={textRef}
        className={cn(
          "font-logo text-xl md:text-2xl italic leading-relaxed outline-none mb-4",
          isDark ? "text-white" : "text-slate-700",
          editingField === "text" && "bg-primary/10 rounded px-2 -mx-2"
        )}
        contentEditable={editingField === "text"}
        suppressContentEditableWarning
        onBlur={() => handleBlur("text")}
        onKeyDown={(e) => handleKeyDown(e, "text")}
        onClick={() => isEditing && setEditingField("text")}
      >
        "{quote.text}"
      </p>
      
      {/* Attribution */}
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-8 h-px",
          isDark ? "bg-white/30" : "bg-slate-300"
        )} />
        <span
          ref={authorRef}
          className={cn(
            "font-ui font-medium outline-none",
            isDark ? "text-white" : "text-slate-700",
            editingField === "author" && "bg-primary/10 rounded px-1"
          )}
          contentEditable={editingField === "author"}
          suppressContentEditableWarning
          onBlur={() => handleBlur("author")}
          onKeyDown={(e) => handleKeyDown(e, "author")}
          onClick={() => isEditing && setEditingField("author")}
        >
          {quote.author}
        </span>
        {(quote.role || isEditing) && (
          <>
            <span className={isDark ? "text-white/40" : "text-slate-400"}>•</span>
            <span
              ref={roleRef}
              className={cn(
                "font-ui text-sm outline-none",
                isDark ? "text-white/60" : "text-slate-500",
                editingField === "role" && "bg-primary/10 rounded px-1"
              )}
              contentEditable={editingField === "role"}
              suppressContentEditableWarning
              onBlur={() => handleBlur("role")}
              onKeyDown={(e) => handleKeyDown(e, "role")}
              onClick={() => isEditing && setEditingField("role")}
            >
              {quote.role || (isEditing ? "Role/Company" : "")}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
