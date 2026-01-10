import React, { useEffect, useRef } from "react";
import { BLOCK_TEMPLATES, BlockType } from "@/types/document";
import { cn } from "@/lib/utils";
import { 
  Type, AlignLeft, List, TrendingUp, LayoutGrid, Image, 
  BarChart3, Table, Quote, AlertCircle, Minus, MousePointer 
} from "lucide-react";

interface AddBlockMenuProps {
  isDark?: boolean;
  onSelect: (template: typeof BLOCK_TEMPLATES[0]) => void;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Type,
  AlignLeft,
  List,
  TrendingUp,
  LayoutGrid,
  Image,
  BarChart3,
  Table,
  Quote,
  AlertCircle,
  Minus,
  MousePointer,
};

const BLOCK_CATEGORIES = [
  {
    label: "Text",
    types: ["heading", "subheading", "paragraph", "bullet-list"] as BlockType[],
  },
  {
    label: "Data",
    types: ["stat-card", "stat-grid", "chart", "spec-table"] as BlockType[],
  },
  {
    label: "Media",
    types: ["image", "quote", "callout"] as BlockType[],
  },
  {
    label: "Layout",
    types: ["divider", "cta"] as BlockType[],
  },
];

export function AddBlockMenu({ isDark = false, onSelect, onClose }: AddBlockMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "w-80 max-h-96 overflow-y-auto rounded-xl shadow-2xl border p-3",
        isDark 
          ? "bg-slate-800 border-slate-700" 
          : "bg-white border-slate-200"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-4">
        {BLOCK_CATEGORIES.map((category) => (
          <div key={category.label}>
            <h4 className={cn(
              "text-xs font-ui font-semibold uppercase tracking-wider px-2 mb-2",
              isDark ? "text-white/40" : "text-slate-400"
            )}>
              {category.label}
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {category.types.map((type) => {
                const template = BLOCK_TEMPLATES.find((t) => t.type === type);
                if (!template) return null;
                
                const IconComponent = ICON_MAP[template.icon] || Type;
                
                return (
                  <button
                    key={type}
                    onClick={() => onSelect(template)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                      isDark 
                        ? "hover:bg-white/10 text-white/80" 
                        : "hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    <IconComponent className={cn(
                      "w-4 h-4 flex-shrink-0",
                      "text-rho-green"
                    )} />
                    <span className="font-ui text-sm truncate">{template.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
