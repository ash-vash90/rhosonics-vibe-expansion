import React, { useState } from "react";
import { Slide, Block, BlockContent, BlockStyle, BLOCK_TEMPLATES } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { EditableBlock } from "./blocks/EditableBlock";
import { HeadingBlock } from "./blocks/HeadingBlock";
import { ParagraphBlock } from "./blocks/ParagraphBlock";
import { StatCardBlock } from "./blocks/StatCardBlock";
import { StatGridBlock } from "./blocks/StatGridBlock";
import { BulletListBlock } from "./blocks/BulletListBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { DividerBlock } from "./blocks/DividerBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { CTABlock } from "./blocks/CTABlock";
import { SpecTableBlock } from "./blocks/SpecTableBlock";
import { AddBlockMenu } from "./AddBlockMenu";
import { Plus } from "lucide-react";

interface SlideCanvasProps {
  slide: Slide;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
  onUpdateBlock: (blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  onAddBlock: (block: Omit<Block, "id">, afterBlockId?: string) => void;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
}

export function SlideCanvas({
  slide,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onAddBlock,
  onReorderBlocks,
}: SlideCanvasProps) {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState<string | null>(null); // afterBlockId or "start"

  // Determine if slide has dark background
  const isDark = slide.background.type === "solid" 
    ? slide.background.value.includes("10%") || slide.background.value.includes("20%") || slide.background.value.includes("225")
    : slide.background.type === "gradient" && slide.background.value.includes("225");

  const handleCanvasClick = () => {
    onSelectBlock(null);
    setEditingBlockId(null);
  };

  const handleAddBlock = (template: typeof BLOCK_TEMPLATES[0], afterBlockId?: string) => {
    onAddBlock({ type: template.type, content: template.defaultContent }, afterBlockId);
    setShowAddMenu(null);
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    if (slide.background.type === "solid") {
      return { backgroundColor: slide.background.value };
    }
    if (slide.background.type === "gradient") {
      return { background: slide.background.value };
    }
    if (slide.background.type === "image") {
      return { 
        backgroundImage: `url(${slide.background.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  };

  const renderBlock = (block: Block, index: number) => {
    const isSelected = selectedBlockId === block.id;
    const isEditing = editingBlockId === block.id;

    const blockProps = {
      content: block.content,
      style: block.style,
      isEditing,
      isDark,
      onUpdate: (content: Partial<BlockContent>) => onUpdateBlock(block.id, content),
      onEndEdit: () => setEditingBlockId(null),
    };

    const renderBlockContent = () => {
      switch (block.type) {
        case "heading":
        case "subheading":
          return <HeadingBlock {...blockProps} />;
        case "paragraph":
          return <ParagraphBlock {...blockProps} />;
        case "bullet-list":
        case "numbered-list":
          return <BulletListBlock {...blockProps} />;
        case "stat-card":
          return <StatCardBlock {...blockProps} />;
        case "stat-grid":
          return <StatGridBlock {...blockProps} />;
        case "image":
          return <ImageBlock {...blockProps} />;
        case "divider":
          return <DividerBlock {...blockProps} />;
        case "spec-table":
          return <SpecTableBlock {...blockProps} />;
        case "quote":
          return <QuoteBlock {...blockProps} />;
        case "callout":
          return <CalloutBlock {...blockProps} />;
        case "cta":
          return <CTABlock {...blockProps} />;
        default:
          return (
            <div className={cn(
              "p-4 border rounded-lg",
              isDark ? "border-white/20 text-white/60" : "border-slate-200 text-slate-500"
            )}>
              {block.type} block (coming soon)
            </div>
          );
      }
    };

    return (
      <div key={block.id} className="relative">
        <EditableBlock
          isSelected={isSelected}
          isEditing={isEditing}
          isDark={isDark}
          onSelect={() => onSelectBlock(block.id)}
          onStartEdit={() => setEditingBlockId(block.id)}
          onEndEdit={() => setEditingBlockId(null)}
          onDelete={() => onDeleteBlock(block.id)}
          onDuplicate={() => onDuplicateBlock(block.id)}
          onAddBlockAfter={() => setShowAddMenu(block.id)}
          onMoveUp={index > 0 ? () => onReorderBlocks(index, index - 1) : undefined}
          onMoveDown={index < slide.blocks.length - 1 ? () => onReorderBlocks(index, index + 1) : undefined}
        >
          {renderBlockContent()}
        </EditableBlock>

        {/* Add block menu after this block */}
        {showAddMenu === block.id && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50">
            <AddBlockMenu
              isDark={isDark}
              onSelect={(template) => handleAddBlock(template, block.id)}
              onClose={() => setShowAddMenu(null)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900">
      {/* Slide container - 16:9 aspect ratio */}
      <div
        className="relative w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden"
        style={{ 
          aspectRatio: "16/9",
          ...getBackgroundStyle(),
        }}
        onClick={handleCanvasClick}
      >
        {/* Overlay for dark backgrounds with images */}
        {slide.background.overlay && slide.background.overlay !== "none" && (
          <div className={cn(
            "absolute inset-0",
            slide.background.overlay === "dark" && "bg-black/50",
            slide.background.overlay === "light" && "bg-white/30"
          )} />
        )}

        {/* Content area */}
        <div className="relative z-10 h-full p-12 flex flex-col gap-6 overflow-y-auto">
          {/* Add block at start if empty or show plus */}
          {slide.blocks.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); setShowAddMenu("start"); }}
                className={cn(
                  "flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed transition-all hover:scale-105",
                  isDark 
                    ? "border-white/20 text-white/40 hover:border-white/40 hover:text-white/60" 
                    : "border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600"
                )}
              >
                <Plus className="w-12 h-12" />
                <span className="font-ui text-lg">Add your first block</span>
              </button>
            </div>
          ) : (
            <>
              {/* Show add button at top */}
              <div className="relative -mt-4 mb-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowAddMenu("start"); }}
                  className={cn(
                    "w-full flex items-center justify-center py-2 opacity-0 hover:opacity-100 transition-opacity",
                    isDark ? "text-white/40" : "text-slate-400"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-ui",
                    isDark ? "bg-white/10" : "bg-slate-200"
                  )}>
                    <Plus className="w-3 h-3" />
                    Add block
                  </div>
                </button>
                {showAddMenu === "start" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full z-50">
                    <AddBlockMenu
                      isDark={isDark}
                      onSelect={(template) => handleAddBlock(template)}
                      onClose={() => setShowAddMenu(null)}
                    />
                  </div>
                )}
              </div>

              {/* Blocks */}
              {slide.blocks.map((block, index) => renderBlock(block, index))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
