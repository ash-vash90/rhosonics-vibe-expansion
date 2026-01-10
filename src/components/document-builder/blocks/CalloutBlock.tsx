import React, { useRef, useEffect, useState } from "react";
import { BlockContent, BlockStyle, CalloutContent } from "@/types/document";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface CalloutBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

const CALLOUT_ICONS = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
};

const CALLOUT_STYLES = {
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: "text-blue-500",
    title: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: "text-amber-500",
    title: "text-amber-600 dark:text-amber-400",
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    icon: "text-green-500",
    title: "text-green-600 dark:text-green-400",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: "text-red-500",
    title: "text-red-600 dark:text-red-400",
  },
};

export function CalloutBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: CalloutBlockProps) {
  const callout = content.callout || { type: "info", title: "Note", text: "Add your note here" };
  const [editingField, setEditingField] = useState<"title" | "text" | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("text");
    }
  }, [isEditing]);

  useEffect(() => {
    const ref = editingField === "title" ? titleRef : textRef;
    if (ref.current && editingField) {
      ref.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleBlur = (field: "title" | "text") => {
    const ref = field === "title" ? titleRef : textRef;
    if (ref.current) {
      const newCallout: CalloutContent = {
        ...callout,
        [field]: ref.current.textContent || "",
      };
      onUpdate({ callout: newCallout });
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "title" | "text") => {
    if (e.key === "Enter" && field === "title") {
      e.preventDefault();
      setEditingField("text");
    }
    if (e.key === "Escape") {
      setEditingField(null);
      onEndEdit();
    }
  };

  const handleTypeChange = (type: CalloutContent["type"]) => {
    onUpdate({ callout: { ...callout, type } });
  };

  const Icon = CALLOUT_ICONS[callout.type];
  const styles = CALLOUT_STYLES[callout.type];

  return (
    <div className={cn(
      "relative rounded-xl border p-4",
      styles.bg,
      styles.border,
      isEditing && "ring-2 ring-primary/30"
    )}>
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", styles.icon)} />
        
        <div className="flex-1">
          {(callout.title || isEditing) && (
            <h4
              ref={titleRef}
              className={cn(
                "font-ui font-semibold text-sm mb-1 outline-none",
                styles.title,
                editingField === "title" && "bg-primary/10 rounded px-1"
              )}
              contentEditable={editingField === "title"}
              suppressContentEditableWarning
              onBlur={() => handleBlur("title")}
              onKeyDown={(e) => handleKeyDown(e, "title")}
              onClick={() => isEditing && setEditingField("title")}
            >
              {callout.title || (isEditing ? "Add title" : "")}
            </h4>
          )}
          
          <p
            ref={textRef}
            className={cn(
              "font-ui text-sm outline-none",
              isDark ? "text-white/70" : "text-slate-600",
              editingField === "text" && "bg-primary/10 rounded px-1"
            )}
            contentEditable={editingField === "text"}
            suppressContentEditableWarning
            onBlur={() => handleBlur("text")}
            onKeyDown={(e) => handleKeyDown(e, "text")}
            onClick={() => isEditing && setEditingField("text")}
          >
            {callout.text}
          </p>
        </div>
      </div>

      {/* Type selector when editing */}
      {isEditing && (
        <div className={cn(
          "absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1 p-1 rounded-lg shadow-lg border",
          isDark 
            ? "bg-slate-800 border-slate-700" 
            : "bg-white border-slate-200"
        )}>
          {(["info", "warning", "success", "error"] as const).map((type) => {
            const TypeIcon = CALLOUT_ICONS[type];
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={cn(
                  "p-1.5 rounded",
                  callout.type === type
                    ? "bg-primary text-primary-foreground"
                    : isDark 
                      ? "hover:bg-slate-700" 
                      : "hover:bg-slate-100"
                )}
              >
                <TypeIcon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
