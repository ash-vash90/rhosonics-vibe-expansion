import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle, ChallengeSolutionContent } from "@/types/document";
import { cn } from "@/lib/utils";

interface ChallengeSolutionBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function ChallengeSolutionBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: ChallengeSolutionBlockProps) {
  const challengeSolution = content.challengeSolution || { challenge: "", solution: "" };
  const [editingField, setEditingField] = useState<"challenge" | "solution" | null>(null);
  const challengeRef = useRef<HTMLParagraphElement>(null);
  const solutionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("challenge");
    }
  }, [isEditing]);

  useEffect(() => {
    const ref = editingField === "challenge" ? challengeRef : solutionRef;
    if (ref.current && editingField) {
      ref.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleBlur = (field: "challenge" | "solution") => {
    const ref = field === "challenge" ? challengeRef : solutionRef;
    if (ref.current) {
      const newContent: ChallengeSolutionContent = {
        ...challengeSolution,
        [field]: ref.current.textContent || "",
      };
      onUpdate({ challengeSolution: newContent });
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: "challenge" | "solution") => {
    if (e.key === "Tab" && !e.shiftKey && field === "challenge") {
      e.preventDefault();
      setEditingField("solution");
    }
    if (e.key === "Tab" && e.shiftKey && field === "solution") {
      e.preventDefault();
      setEditingField("challenge");
    }
    if (e.key === "Escape") {
      setEditingField(null);
      onEndEdit();
    }
  };

  return (
    <div
      className={cn(
        "space-y-6 transition-all",
        isEditing && "ring-2 ring-primary/30 rounded-xl p-3 -m-3"
      )}
    >
      {/* Challenge Section - Stacked paragraph style */}
      <div className="space-y-2">
        <h3 className={cn(
          "font-data text-xs uppercase tracking-widest",
          isDark ? "text-white/50" : "text-slate-400"
        )}>
          THE CHALLENGE
        </h3>
        
        <p
          ref={challengeRef}
          className={cn(
            "font-ui text-sm leading-relaxed outline-none",
            isDark ? "text-white/80" : "text-slate-700",
            !challengeSolution.challenge && (isDark ? "text-white/30" : "text-slate-300"),
            editingField === "challenge" && "bg-primary/5 rounded px-2 py-1 -mx-2 -my-1"
          )}
          contentEditable={editingField === "challenge"}
          suppressContentEditableWarning
          onBlur={() => handleBlur("challenge")}
          onKeyDown={(e) => handleKeyDown(e, "challenge")}
          onClick={() => isEditing && setEditingField("challenge")}
        >
          {challengeSolution.challenge || "Describe the challenge the customer faced..."}
        </p>
      </div>

      {/* Solution Section - Stacked paragraph style */}
      <div className="space-y-2">
        <h3 className={cn(
          "font-data text-xs uppercase tracking-widest",
          isDark ? "text-rho-green/80" : "text-rho-green"
        )}>
          OUR SOLUTION
        </h3>
        
        <p
          ref={solutionRef}
          className={cn(
            "font-ui text-sm leading-relaxed outline-none",
            isDark ? "text-white/80" : "text-slate-700",
            !challengeSolution.solution && (isDark ? "text-white/30" : "text-slate-300"),
            editingField === "solution" && "bg-primary/5 rounded px-2 py-1 -mx-2 -my-1"
          )}
          contentEditable={editingField === "solution"}
          suppressContentEditableWarning
          onBlur={() => handleBlur("solution")}
          onKeyDown={(e) => handleKeyDown(e, "solution")}
          onClick={() => isEditing && setEditingField("solution")}
        >
          {challengeSolution.solution || "Describe how Rhosonics solved this challenge..."}
        </p>
      </div>
    </div>
  );
}
