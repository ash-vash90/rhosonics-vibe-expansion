import React, { useRef, useEffect, useState } from "react";
import { BlockContent, BlockStyle, CTAContent } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function CTABlock({
  content,
  style,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: CTABlockProps) {
  const cta = content.cta || { text: "Ready to get started?", buttonLabel: "Contact Us" };
  const [editingField, setEditingField] = useState<"text" | "button" | "secondaryButton" | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const secondaryRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("text");
    }
  }, [isEditing]);

  useEffect(() => {
    const refs = { text: textRef, button: buttonRef, secondaryButton: secondaryRef };
    const ref = refs[editingField as keyof typeof refs];
    if (ref?.current && editingField) {
      ref.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleBlur = (field: "text" | "button" | "secondaryButton") => {
    const refs = { text: textRef, button: buttonRef, secondaryButton: secondaryRef };
    const fieldMap = { text: "text", button: "buttonLabel", secondaryButton: "secondaryButtonLabel" };
    const ref = refs[field];
    
    if (ref?.current) {
      const newCta: CTAContent = {
        ...cta,
        [fieldMap[field]]: ref.current.textContent || "",
      };
      onUpdate({ cta: newCta });
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "text" | "button" | "secondaryButton") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "text") {
        setEditingField("button");
      } else if (field === "button" && cta.secondaryButtonLabel) {
        setEditingField("secondaryButton");
      } else {
        handleBlur(field);
        onEndEdit();
      }
    }
    if (e.key === "Escape") {
      setEditingField(null);
      onEndEdit();
    }
  };

  const alignment = style?.alignment || "center";

  return (
    <div className={cn(
      "py-8",
      alignment === "center" && "text-center",
      alignment === "right" && "text-right",
      isEditing && "ring-2 ring-primary/30 rounded-xl"
    )}>
      {/* CTA Text */}
      <p
        ref={textRef}
        className={cn(
          "font-logo text-2xl md:text-3xl font-semibold mb-6 outline-none",
          isDark ? "text-white" : "text-slate-800",
          editingField === "text" && "bg-primary/10 rounded px-2 inline-block"
        )}
        contentEditable={editingField === "text"}
        suppressContentEditableWarning
        onBlur={() => handleBlur("text")}
        onKeyDown={(e) => handleKeyDown(e, "text")}
        onClick={() => isEditing && setEditingField("text")}
      >
        {cta.text}
      </p>

      {/* Buttons */}
      <div className={cn(
        "flex gap-4",
        alignment === "center" && "justify-center",
        alignment === "right" && "justify-end"
      )}>
        {/* Primary button */}
        <Button
          size="lg"
          className="bg-rho-green hover:bg-rho-green/90 text-white px-8 py-6 text-lg"
          onClick={(e) => {
            if (isEditing) {
              e.preventDefault();
              setEditingField("button");
            }
          }}
        >
          <span
            ref={buttonRef}
            className={cn(
              "outline-none",
              editingField === "button" && "bg-white/20 rounded px-1"
            )}
            contentEditable={editingField === "button"}
            suppressContentEditableWarning
            onBlur={() => handleBlur("button")}
            onKeyDown={(e) => handleKeyDown(e, "button")}
          >
            {cta.buttonLabel}
          </span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        {/* Secondary button (optional) */}
        {(cta.secondaryButtonLabel || isEditing) && (
          <Button
            size="lg"
            variant="outline"
            className={cn(
              "px-8 py-6 text-lg",
              isDark 
                ? "border-white/20 text-white hover:bg-white/10" 
                : "border-slate-300 hover:bg-slate-50"
            )}
            onClick={(e) => {
              if (isEditing) {
                e.preventDefault();
                setEditingField("secondaryButton");
              }
            }}
          >
            <span
              ref={secondaryRef}
              className={cn(
                "outline-none",
                editingField === "secondaryButton" && "bg-primary/20 rounded px-1"
              )}
              contentEditable={editingField === "secondaryButton"}
              suppressContentEditableWarning
              onBlur={() => handleBlur("secondaryButton")}
              onKeyDown={(e) => handleKeyDown(e, "secondaryButton")}
            >
              {cta.secondaryButtonLabel || (isEditing ? "Learn More" : "")}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
