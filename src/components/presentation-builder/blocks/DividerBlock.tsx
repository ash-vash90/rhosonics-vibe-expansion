
import { BlockContent, BlockStyle } from "@/types/presentation";
import { cn } from "@/lib/utils";

interface DividerBlockProps {
  content: BlockContent;
  style?: BlockStyle;
  isEditing: boolean;
  isDark: boolean;
  onUpdate: (content: Partial<BlockContent>) => void;
  onEndEdit: () => void;
}

export function DividerBlock({
  content,
  isEditing,
  isDark,
  onUpdate,
}: DividerBlockProps) {
  const dividerStyle = content.dividerStyle || "line";

  const handleStyleChange = (newStyle: BlockContent["dividerStyle"]) => {
    onUpdate({ dividerStyle: newStyle });
  };

  return (
    <div className={cn(
      "py-4 relative",
      isEditing && "ring-2 ring-primary/30 rounded-lg"
    )}>
      {/* Divider styles */}
      {dividerStyle === "line" && (
        <div className={cn(
          "h-px w-full",
          isDark ? "bg-white/20" : "bg-slate-200"
        )} />
      )}
      
      {dividerStyle === "gradient" && (
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-transparent via-rho-green to-transparent" />
      )}
      
      {dividerStyle === "dots" && (
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full",
                isDark ? "bg-white/30" : "bg-slate-300"
              )}
            />
          ))}
        </div>
      )}
      
      {dividerStyle === "wave" && (
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className={cn(
            "w-full h-4",
            isDark ? "text-white/20" : "text-slate-200"
          )}
        >
          <path
            d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      )}

      {/* Style selector when editing */}
      {isEditing && (
        <div className={cn(
          "absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1 p-1 rounded-lg shadow-lg border",
          isDark 
            ? "bg-slate-800 border-slate-700" 
            : "bg-white border-slate-200"
        )}>
          {(["line", "gradient", "dots", "wave"] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleStyleChange(s)}
              className={cn(
                "px-2 py-1 text-xs rounded font-ui capitalize",
                dividerStyle === s
                  ? "bg-primary text-primary-foreground"
                  : isDark 
                    ? "hover:bg-slate-700" 
                    : "hover:bg-slate-100"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
