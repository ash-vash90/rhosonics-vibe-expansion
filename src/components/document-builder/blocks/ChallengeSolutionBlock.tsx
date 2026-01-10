import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle, ChallengeSolutionContent } from "@/types/document";
import { cn } from "@/lib/utils";
import { AlertCircle, Lightbulb } from "lucide-react";

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
      // Place cursor at end
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
        "grid md:grid-cols-2 gap-6 transition-all",
        isEditing && "ring-2 ring-primary/30 rounded-xl p-2 -m-2"
      )}
    >
      {/* Challenge Section */}
      <div
        className={cn(
          "rounded-xl border p-5 transition-colors cursor-text",
          isDark 
            ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40" 
            : "bg-red-50/50 border-red-200/50 hover:border-red-300",
          editingField === "challenge" && (isDark ? "border-red-500/60" : "border-red-400")
        )}
        onClick={() => isEditing && setEditingField("challenge")}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={cn(
            "p-2 rounded-lg",
            isDark ? "bg-red-500/20" : "bg-red-100"
          )}>
            <AlertCircle className={cn(
              "w-4 h-4",
              isDark ? "text-red-400" : "text-red-500"
            )} />
          </div>
          <h3 className={cn(
            "font-ui font-semibold text-sm uppercase tracking-wider",
            isDark ? "text-red-400" : "text-red-600"
          )}>
            The Challenge
          </h3>
        </div>
        
        <p
          ref={challengeRef}
          className={cn(
            "font-ui text-sm leading-relaxed outline-none min-h-[60px]",
            isDark ? "text-white/80" : "text-slate-700",
            !challengeSolution.challenge && (isDark ? "text-white/30" : "text-slate-300"),
            editingField === "challenge" && "bg-primary/5 rounded px-2 py-1 -mx-2 -my-1"
          )}
          contentEditable={editingField === "challenge"}
          suppressContentEditableWarning
          onBlur={() => handleBlur("challenge")}
          onKeyDown={(e) => handleKeyDown(e, "challenge")}
        >
          {challengeSolution.challenge || "Describe the challenge the customer faced..."}
        </p>
      </div>

      {/* Solution Section */}
      <div
        className={cn(
          "rounded-xl border p-5 transition-colors cursor-text",
          isDark 
            ? "bg-rho-green/5 border-rho-green/20 hover:border-rho-green/40" 
            : "bg-green-50/50 border-green-200/50 hover:border-green-300",
          editingField === "solution" && (isDark ? "border-rho-green/60" : "border-green-400")
        )}
        onClick={() => isEditing && setEditingField("solution")}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={cn(
            "p-2 rounded-lg",
            isDark ? "bg-rho-green/20" : "bg-green-100"
          )}>
            <Lightbulb className={cn(
              "w-4 h-4",
              isDark ? "text-rho-green" : "text-green-600"
            )} />
          </div>
          <h3 className={cn(
            "font-ui font-semibold text-sm uppercase tracking-wider",
            isDark ? "text-rho-green" : "text-green-700"
          )}>
            The Solution
          </h3>
        </div>
        
        <p
          ref={solutionRef}
          className={cn(
            "font-ui text-sm leading-relaxed outline-none min-h-[60px]",
            isDark ? "text-white/80" : "text-slate-700",
            !challengeSolution.solution && (isDark ? "text-white/30" : "text-slate-300"),
            editingField === "solution" && "bg-primary/5 rounded px-2 py-1 -mx-2 -my-1"
          )}
          contentEditable={editingField === "solution"}
          suppressContentEditableWarning
          onBlur={() => handleBlur("solution")}
          onKeyDown={(e) => handleKeyDown(e, "solution")}
        >
          {challengeSolution.solution || "Describe how Rhosonics solved this challenge..."}
        </p>
      </div>
    </div>
  );
}
