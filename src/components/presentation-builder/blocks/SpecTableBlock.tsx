import { useState } from "react";
import { BlockContent, BlockStyle } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { Plus, Trash2, GripVertical } from "lucide-react";
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

  const handleMoveSpec = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= specs.length) return;
    const newSpecs = [...specs];
    const [moved] = newSpecs.splice(fromIndex, 1);
    newSpecs.splice(toIndex, 0, moved);
    onUpdate({ specs: newSpecs });
  };

  return (
    <div className={cn(
      "w-full",
      style?.alignment === "center" && "mx-auto max-w-xl",
      style?.alignment === "right" && "ml-auto max-w-xl"
    )}>
      <div className={cn(
        "rounded-lg overflow-hidden border",
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
      )}>
        <table className="w-full">
          <thead>
            <tr className={cn(
              isDark ? "bg-white/5" : "bg-slate-50"
            )}>
              <th className={cn(
                "text-left py-3 px-4 font-ui font-semibold text-sm",
                isDark ? "text-white/60" : "text-slate-500"
              )}>
                Specification
              </th>
              <th className={cn(
                "text-right py-3 px-4 font-ui font-semibold text-sm",
                isDark ? "text-white/60" : "text-slate-500"
              )}>
                Value
              </th>
              {isEditing && (
                <th className="w-20" />
              )}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={index}
                className={cn(
                  "group transition-colors",
                  isDark ? "border-t border-white/10 hover:bg-white/5" : "border-t border-slate-100 hover:bg-slate-50",
                  editingRowIndex === index && (isDark ? "bg-white/10" : "bg-primary/5")
                )}
              >
                <td className="py-3 px-4">
                  {isEditing && editingRowIndex === index ? (
                    <Input
                      value={spec.label}
                      onChange={(e) => handleUpdateSpec(index, "label", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setEditingRowIndex(null)}
                      className={cn(
                        "h-8 font-ui",
                        isDark && "bg-white/10 border-white/20 text-white"
                      )}
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => isEditing && setEditingRowIndex(index)}
                      className={cn(
                        "font-ui cursor-text",
                        isDark ? "text-white/80" : "text-slate-700"
                      )}
                    >
                      {spec.label}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {isEditing && editingRowIndex === index ? (
                    <Input
                      value={spec.value}
                      onChange={(e) => handleUpdateSpec(index, "value", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && setEditingRowIndex(null)}
                      className={cn(
                        "h-8 font-data text-right",
                        isDark && "bg-white/10 border-white/20 text-white"
                      )}
                    />
                  ) : (
                    <span
                      onClick={() => isEditing && setEditingRowIndex(index)}
                      className={cn(
                        "font-data cursor-text",
                        isDark ? "text-white" : "text-slate-900"
                      )}
                    >
                      {spec.value}
                    </span>
                  )}
                </td>
                {isEditing && (
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleMoveSpec(index, index - 1)}
                        disabled={index === 0}
                        className={cn(
                          "p-1 rounded transition-colors",
                          isDark 
                            ? "hover:bg-white/10 text-white/40 disabled:text-white/10" 
                            : "hover:bg-slate-200 text-slate-400 disabled:text-slate-200"
                        )}
                      >
                        <GripVertical className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveSpec(index)}
                        disabled={specs.length <= 1}
                        className={cn(
                          "p-1 rounded transition-colors",
                          isDark 
                            ? "hover:bg-error/20 text-error/60 disabled:text-white/10" 
                            : "hover:bg-error-surface text-error/60 disabled:text-slate-200"
                        )}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
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
                ? "bg-white/5 hover:bg-white/10 text-white/40 border-t border-white/10" 
                : "bg-slate-50 hover:bg-slate-100 text-slate-400 border-t border-slate-100"
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