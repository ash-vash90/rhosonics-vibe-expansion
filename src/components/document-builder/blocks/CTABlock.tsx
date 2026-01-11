import React, { useRef, useEffect, useState } from "react";
import { BlockContent, BlockStyle, CTAContent } from "@/types/document";
import { cn } from "@/lib/utils";
import { Phone, Mail, Globe } from "lucide-react";

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
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: CTABlockProps) {
  const cta = content.cta || { 
    text: "Ready to achieve similar results?", 
    buttonLabel: "+31 (0)10 262 8088" 
  };
  const [editingField, setEditingField] = useState<"text" | "phone" | "email" | "website" | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const websiteRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("text");
    }
  }, [isEditing]);

  useEffect(() => {
    const refs = { text: textRef, phone: phoneRef, email: emailRef, website: websiteRef };
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

  const handleBlur = (field: "text" | "phone" | "email" | "website") => {
    const refs = { text: textRef, phone: phoneRef, email: emailRef, website: websiteRef };
    const fieldMap = { text: "text", phone: "buttonLabel", email: "secondaryButtonLabel", website: "buttonUrl" };
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

  const handleKeyDown = (e: React.KeyboardEvent, field: "text" | "phone" | "email" | "website") => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const order = ["text", "phone", "email", "website"] as const;
      const currentIndex = order.indexOf(field);
      if (currentIndex < order.length - 1) {
        handleBlur(field);
        setEditingField(order[currentIndex + 1]);
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

  return (
    <div className={cn(
      "flex items-center justify-between gap-8 py-6",
      isEditing && "ring-2 ring-primary/30 rounded-xl px-4"
    )}>
      {/* Left side: Text */}
      <div className="flex-1">
        <p
          ref={textRef}
          className={cn(
            "font-logo text-xl font-semibold outline-none",
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
        <p className={cn(
          "font-ui text-sm mt-1",
          isDark ? "text-white/60" : "text-slate-500"
        )}>
          Get in touch with our team to learn more
        </p>
      </div>

      {/* Right side: Contact info with icons */}
      <div className="flex flex-col gap-2">
        {/* Phone */}
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isDark ? "text-white" : "text-slate-700"
        )}>
          <Phone className="w-4 h-4 text-rho-green flex-shrink-0" />
          <span
            ref={phoneRef}
            className={cn(
              "font-ui outline-none",
              editingField === "phone" && "bg-primary/10 rounded px-1"
            )}
            contentEditable={editingField === "phone"}
            suppressContentEditableWarning
            onBlur={() => handleBlur("phone")}
            onKeyDown={(e) => handleKeyDown(e, "phone")}
            onClick={() => isEditing && setEditingField("phone")}
          >
            {cta.buttonLabel || "+31 (0)10 262 8088"}
          </span>
        </div>
        
        {/* Email */}
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isDark ? "text-white" : "text-slate-700"
        )}>
          <Mail className="w-4 h-4 text-rho-green flex-shrink-0" />
          <span
            ref={emailRef}
            className={cn(
              "font-ui outline-none",
              editingField === "email" && "bg-primary/10 rounded px-1"
            )}
            contentEditable={editingField === "email"}
            suppressContentEditableWarning
            onBlur={() => handleBlur("email")}
            onKeyDown={(e) => handleKeyDown(e, "email")}
            onClick={() => isEditing && setEditingField("email")}
          >
            {cta.secondaryButtonLabel || "info@rhosonics.com"}
          </span>
        </div>
        
        {/* Website */}
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isDark ? "text-white" : "text-slate-700"
        )}>
          <Globe className="w-4 h-4 text-rho-green flex-shrink-0" />
          <span
            ref={websiteRef}
            className={cn(
              "font-ui outline-none",
              editingField === "website" && "bg-primary/10 rounded px-1"
            )}
            contentEditable={editingField === "website"}
            suppressContentEditableWarning
            onBlur={() => handleBlur("website")}
            onKeyDown={(e) => handleKeyDown(e, "website")}
            onClick={() => isEditing && setEditingField("website")}
          >
            {cta.buttonUrl || "rhosonics.com"}
          </span>
        </div>
      </div>
    </div>
  );
}
