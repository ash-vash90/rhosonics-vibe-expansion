import React, { useState, useRef, useEffect } from "react";
import { BlockContent, BlockStyle } from "@/types/document";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface BulletListBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function BulletListBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
  onEndEdit,
}: BulletListBlockProps) {
  const items = content.items || ["First item", "Second item", "Third item"];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isEditing && editingIndex === null && items.length > 0) {
      setEditingIndex(0);
    }
  }, [isEditing]);

  useEffect(() => {
    if (inputRef.current && editingIndex !== null) {
      inputRef.current.focus();
      // Move cursor to end
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(inputRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingIndex]);

  const handleBlur = (index: number) => {
    if (inputRef.current) {
      const newItems = [...items];
      const newText = inputRef.current.textContent || "";
      if (newText.trim() === "" && items.length > 1) {
        newItems.splice(index, 1);
      } else {
        newItems[index] = newText;
      }
      onUpdate({ items: newItems });
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Save current and create new item
      if (inputRef.current) {
        const newItems = [...items];
        newItems[index] = inputRef.current.textContent || "";
        newItems.splice(index + 1, 0, "");
        onUpdate({ items: newItems });
        setEditingIndex(index + 1);
      }
    }
    if (e.key === "Backspace" && inputRef.current?.textContent === "" && items.length > 1) {
      e.preventDefault();
      const newItems = items.filter((_, i) => i !== index);
      onUpdate({ items: newItems });
      setEditingIndex(Math.max(0, index - 1));
    }
    if (e.key === "Escape") {
      handleBlur(index);
      onEndEdit();
    }
    if (e.key === "ArrowDown" && index < items.length - 1) {
      handleBlur(index);
      setEditingIndex(index + 1);
    }
    if (e.key === "ArrowUp" && index > 0) {
      handleBlur(index);
      setEditingIndex(index - 1);
    }
  };

  const handleItemClick = (index: number) => {
    if (isEditing) {
      setEditingIndex(index);
    }
  };

  const handleAddItem = () => {
    const newItems = [...items, "New item"];
    onUpdate({ items: newItems });
    setEditingIndex(newItems.length - 1);
  };

  return (
    <div className={cn(
      "w-full",
      isEditing && "ring-2 ring-primary/30 rounded-lg p-2 -m-2"
    )}>
      <ul className="space-y-2 list-none">
        {items.map((item, index) => {
          const isEditingThis = editingIndex === index;
          
          return (
            <li
              key={index}
              ref={isEditingThis ? inputRef : undefined}
              className={cn(
                "flex items-start gap-3 font-ui text-lg outline-none pl-6 relative",
                isDark ? "text-white/80" : "text-slate-600",
                isEditingThis && "bg-primary/10 rounded px-2 -mx-2"
              )}
              contentEditable={isEditingThis}
              suppressContentEditableWarning
              onBlur={() => handleBlur(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleItemClick(index)}
            >
              {/* Custom bullet */}
              <span 
                className={cn(
                  "absolute left-0 top-2 w-2 h-2 rounded-full flex-shrink-0",
                  isDark ? "bg-rho-green" : "bg-rho-green"
                )}
                contentEditable={false}
              />
              {item}
            </li>
          );
        })}
      </ul>
      
      {isEditing && (
        <button
          onClick={handleAddItem}
          className={cn(
            "flex items-center gap-2 mt-3 text-sm font-ui opacity-60 hover:opacity-100 transition-opacity",
            isDark ? "text-white" : "text-slate-600"
          )}
        >
          <Plus className="w-4 h-4" />
          Add item
        </button>
      )}
    </div>
  );
}
