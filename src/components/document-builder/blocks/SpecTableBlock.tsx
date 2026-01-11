import { useState } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SpecTableBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function SpecTableBlock({
  content,
  style,
  isEditing,
  isDark,
  onUpdate,
}: SpecTableBlockProps) {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const specs = content.specs || [{ label: "Specification", value: "Value" }];

  const handleUpdateSpec = (index: number, field: "label" | "value", newValue: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], [field]: newValue };
    onUpdate({ specs: newSpecs });
  };

  const handleAddSpec = () => {
    onUpdate({ specs: [...specs, { label: "New Spec", value: "Value" }] });
    setEditingRowIndex(specs.length);
  };

  const handleRemoveSpec = (index: number) => {
    if (specs.length <= 1) return;
    const newSpecs = specs.filter((_, i) => i !== index);
    onUpdate({ specs: newSpecs });
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
    }
  };

  return (
    <div className={cn(
      "w-full",
      style?.alignment === "center" && "mx-auto max-w-xl",
      style?.alignment === "right" && "ml-auto max-w-xl"
    )}>
      {/* Header */}
      <h3 className={cn(
        "font-data text-xs uppercase tracking-widest mb-3",
        isDark ? "text-white/50" : "text-slate-400"
      )}>
        SPECIFICATIONS
      </h3>
      
      <div className={cn(
        "rounded-lg overflow-hidden",
        isDark ? "bg-white/5" : "bg-slate-50"
      )}>
        <table className="w-full">
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={index}
                className={cn(
                  "group transition-colors",
                  isDark 
                    ? "border-b border-white/5 last:border-0 hover:bg-white/5" 
                    : "border-b border-slate-100 last:border-0 hover:bg-slate-100",
                  editingRowIndex === index && (isDark ? "bg-white/10" : "bg-primary/5")
                )}
              >
                <td className="py-2.5 px-4 w-1/2">
                  {isEditing && editingRowIndex === index ? (
                    <Input
                      value={spec.label}
                      onChange={(e) => handleUpdateSpec(index, "label", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setEditingRowIndex(null)}
                      className={cn(
                        "h-7 font-ui text-sm",
                        isDark && "bg-white/10 border-white/20 text-white"
                      )}
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => isEditing && setEditingRowIndex(index)}
                      className={cn(
                        "font-ui text-sm cursor-text",
                        isDark ? "text-white/60" : "text-slate-500"
                      )}
                    >
                      {spec.label}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 w-1/2">
                  {isEditing && editingRowIndex === index ? (
                    <Input
                      value={spec.value}
                      onChange={(e) => handleUpdateSpec(index, "value", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setEditingRowIndex(null)}
                      className={cn(
                        "h-7 font-data text-sm",
                        isDark && "bg-white/10 border-white/20 text-white"
                      )}
                    />
                  ) : (
                    <span
                      onClick={() => isEditing && setEditingRowIndex(index)}
                      className={cn(
                        "font-data text-sm cursor-text font-medium",
                        isDark ? "text-white" : "text-slate-800"
                      )}
                    >
                      {spec.value}
                    </span>
                  )}
                </td>
                {isEditing && (
                  <td className="py-2.5 px-2 w-10">
                    <button
                      onClick={() => handleRemoveSpec(index)}
                      disabled={specs.length <= 1}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 p-1 rounded transition-all",
                        isDark 
                          ? "hover:bg-red-500/20 text-red-400/60 disabled:text-white/10" 
                          : "hover:bg-red-50 text-red-400 disabled:text-slate-200"
                      )}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Add row button */}
        {isEditing && (
          <button
            onClick={handleAddSpec}
            className={cn(
              "w-full py-2 flex items-center justify-center gap-2 transition-colors text-sm font-ui",
              isDark 
                ? "bg-white/5 hover:bg-white/10 text-white/40 border-t border-white/5" 
                : "bg-slate-100 hover:bg-slate-200 text-slate-400 border-t border-slate-100"
            )}
          >
            <Plus className="w-4 h-4" />
            Add specification
          </button>
        )}
      </div>
    </div>
  );
}
