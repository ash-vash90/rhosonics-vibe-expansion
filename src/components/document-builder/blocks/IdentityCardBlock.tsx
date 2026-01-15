import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle, IdentityCardContent, INDUSTRY_OPTIONS, PRODUCT_OPTIONS } from "@/types/document";
import { cn } from "@/lib/utils";
import { Building2, MapPin, Factory, Package } from "@/lib/icons";

interface IdentityCardBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

type IdentityField = "company" | "location" | "industry" | "product";

const FIELD_CONFIG: { key: IdentityField; icon: React.ComponentType<{ className?: string }>; label: string; placeholder: string }[] = [
  { key: "company", icon: Building2, label: "Company", placeholder: "Company Name" },
  { key: "location", icon: MapPin, label: "Location", placeholder: "City, Country" },
  { key: "industry", icon: Factory, label: "Industry", placeholder: "Select industry" },
  { key: "product", icon: Package, label: "Product", placeholder: "Select product" },
];

export function IdentityCardBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: IdentityCardBlockProps) {
  const identity = content.identity || { company: "", location: "", industry: "", product: "" };
  const [editingField, setEditingField] = useState<IdentityField | null>(null);
  const [showDropdown, setShowDropdown] = useState<"industry" | "product" | null>(null);
  const refs = {
    company: useRef<HTMLSpanElement>(null),
    location: useRef<HTMLSpanElement>(null),
    industry: useRef<HTMLSpanElement>(null),
    product: useRef<HTMLSpanElement>(null),
  };

  useEffect(() => {
    if (isEditing && !editingField) {
      setEditingField("company");
    }
  }, [isEditing]);

  useEffect(() => {
    if (editingField && refs[editingField]?.current) {
      refs[editingField].current?.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      if (refs[editingField].current) {
        range.selectNodeContents(refs[editingField].current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [editingField]);

  const handleFieldBlur = (field: IdentityField) => {
    if (refs[field]?.current) {
      const newIdentity: IdentityCardContent = {
        ...identity,
        [field]: refs[field].current?.textContent || "",
      };
      onUpdate({ identity: newIdentity });
    }
    setEditingField(null);
  };

  const handleSelectOption = (field: "industry" | "product", value: string) => {
    const newIdentity: IdentityCardContent = {
      ...identity,
      [field]: value,
    };
    onUpdate({ identity: newIdentity });
    setShowDropdown(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: IdentityField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const fieldIndex = FIELD_CONFIG.findIndex((f) => f.key === field);
      if (fieldIndex < FIELD_CONFIG.length - 1) {
        setEditingField(FIELD_CONFIG[fieldIndex + 1].key);
      } else {
        handleFieldBlur(field);
        onEndEdit();
      }
    }
    if (e.key === "Escape") {
      setEditingField(null);
      setShowDropdown(null);
      onEndEdit();
    }
  };

  const handleFieldClick = (field: IdentityField) => {
    if (!isEditing) return;
    
    if (field === "industry" || field === "product") {
      setShowDropdown(field);
      setEditingField(null);
    } else {
      setShowDropdown(null);
      setEditingField(field);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-6 transition-all",
        isDark 
          ? "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10" 
          : "bg-gradient-to-br from-slate-50 to-white border-slate-200",
        isEditing && "ring-2 ring-primary/30"
      )}
    >
      <div className="grid grid-cols-2 gap-4">
        {FIELD_CONFIG.map(({ key, icon: Icon, label, placeholder }) => (
          <div 
            key={key} 
            className={cn(
              "relative flex items-start gap-3 p-3 rounded-lg transition-colors",
              isDark ? "hover:bg-white/5" : "hover:bg-slate-50",
              (editingField === key || showDropdown === key) && (isDark ? "bg-white/5" : "bg-slate-50")
            )}
            onClick={() => handleFieldClick(key)}
          >
            <div className={cn(
              "p-2 rounded-lg",
              isDark ? "bg-rho-green/20" : "bg-rho-green/10"
            )}>
              <Icon className="w-4 h-4 text-rho-green" />
            </div>
            
            <div className="flex-1 min-w-0">
              <span className={cn(
                "font-data text-xs uppercase tracking-wider",
                isDark ? "text-white/40" : "text-slate-400"
              )}>
                {label}
              </span>
              
              <span
                ref={refs[key]}
                className={cn(
                  "block font-ui text-sm mt-0.5 outline-none truncate",
                  isDark ? "text-white" : "text-slate-900",
                  !identity[key] && (isDark ? "text-white/30" : "text-slate-300"),
                  editingField === key && "bg-primary/10 rounded px-1"
                )}
                contentEditable={editingField === key && key !== "industry" && key !== "product"}
                suppressContentEditableWarning
                onBlur={() => handleFieldBlur(key)}
                onKeyDown={(e) => handleKeyDown(e, key)}
              >
                {identity[key] || placeholder}
              </span>
              
              {/* Dropdown for industry/product */}
              {showDropdown === key && (key === "industry" || key === "product") && (
                <div 
                  className={cn(
                    "absolute z-20 left-0 right-0 mt-2 py-1 rounded-lg shadow-lg border max-h-40 overflow-y-auto",
                    isDark 
                      ? "bg-slate-800 border-slate-700" 
                      : "bg-white border-slate-200"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {(key === "industry" ? INDUSTRY_OPTIONS : PRODUCT_OPTIONS).map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "w-full px-3 py-1.5 text-left text-sm font-ui transition-colors",
                        identity[key] === option 
                          ? "bg-rho-green/20 text-rho-green" 
                          : isDark 
                            ? "text-white hover:bg-white/10" 
                            : "text-slate-700 hover:bg-slate-100"
                      )}
                      onClick={() => handleSelectOption(key, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
