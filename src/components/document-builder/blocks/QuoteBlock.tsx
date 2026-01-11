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

  // Generate initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn(
      "relative p-6 rounded-xl",
      isDark 
        ? "bg-gradient-to-br from-rho-green/10 to-rho-lime/5" 
        : "bg-gradient-to-br from-rho-green/10 to-rho-lime/5",
      isEditing && "ring-2 ring-primary/30"
    )}>
      {/* Quote icon */}
      <QuoteIcon className={cn(
        "absolute top-4 left-4 w-8 h-8",
        isDark ? "text-rho-green/30" : "text-rho-green/20"
      )} />
      
      {/* Quote text */}
      <p
        ref={textRef}
        className={cn(
          "font-ui text-base italic leading-relaxed outline-none mb-6 pl-8 pt-4",
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
      
      {/* Attribution with avatar */}
      <div className="flex items-center gap-3 pl-8">
        {/* Initials Avatar */}
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
          isDark 
            ? "bg-rho-green/30 text-rho-green" 
            : "bg-rho-green text-white"
        )}>
          {getInitials(quote.author || "AU")}
        </div>
        
        <div className="flex flex-col">
          <span
            ref={authorRef}
            className={cn(
              "font-ui font-semibold text-sm outline-none",
              isDark ? "text-white" : "text-slate-800",
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
            <span
              ref={roleRef}
              className={cn(
                "font-ui text-xs outline-none",
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
          )}
        </div>
      </div>
    </div>
  );
}
