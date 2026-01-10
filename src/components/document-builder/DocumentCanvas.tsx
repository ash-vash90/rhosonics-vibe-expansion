import React, { useState } from "react";
import { Page, Block, BlockContent, BlockStyle, BLOCK_TEMPLATES } from "@/types/document";
import { cn } from "@/lib/utils";
import {
  EditableBlock,
  HeadingBlock,
  ParagraphBlock,
  StatCardBlock,
  StatGridBlock,
  BulletListBlock,
  ImageBlock,
  DividerBlock,
  QuoteBlock,
  CalloutBlock,
  CTABlock,
  SpecTableBlock,
  ChartBlock,
  IdentityCardBlock,
  ChallengeSolutionBlock,
  ResultsGridBlock,
} from "./blocks";
import { AddBlockMenu } from "./AddBlockMenu";
import { Plus } from "lucide-react";

export type DocumentLayout = "presentation" | "document";

interface DocumentCanvasProps {
  page: Page;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
  onUpdateBlock: (blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  onAddBlock: (block: Omit<Block, "id">, afterBlockId?: string) => void;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
  layout?: DocumentLayout;
  className?: string;
}

export function DocumentCanvas({
  page,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onAddBlock,
  onReorderBlocks,
  layout = "presentation",
  className,
}: DocumentCanvasProps) {
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState<string | null>(null);

  // Determine if page has dark background
  const isDark = page.background?.type === "solid" 
    ? page.background.value.includes("10%") || page.background.value.includes("20%") || page.background.value.includes("225")
    : page.background?.type === "gradient" && page.background.value.includes("225");

  const handleCanvasClick = () => {
    onSelectBlock(null);
    setEditingBlockId(null);
  };

  const handleAddBlock = (template: typeof BLOCK_TEMPLATES[0], afterBlockId?: string) => {
    onAddBlock({ type: template.type, content: template.defaultContent }, afterBlockId);
    setShowAddMenu(null);
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    if (!page.background) return { backgroundColor: "hsl(var(--background))" };
    
    if (page.background.type === "solid") {
      return { backgroundColor: page.background.value };
    }
    if (page.background.type === "gradient") {
      return { background: page.background.value };
    }
    if (page.background.type === "image") {
      return { 
        backgroundImage: `url(${page.background.value})`,
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
        case "chart":
          return <ChartBlock {...blockProps} />;
        case "spec-table":
          return <SpecTableBlock {...blockProps} />;
        case "quote":
          return <QuoteBlock {...blockProps} />;
        case "callout":
          return <CalloutBlock {...blockProps} />;
        case "cta":
          return <CTABlock {...blockProps} />;
        case "identity-card":
          return <IdentityCardBlock {...blockProps} />;
        case "challenge-solution":
          return <ChallengeSolutionBlock {...blockProps} />;
        case "results-grid":
          return <ResultsGridBlock {...blockProps} />;
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
          onMoveDown={index < page.blocks.length - 1 ? () => onReorderBlocks(index, index + 1) : undefined}
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

  const containerStyles = layout === "presentation" 
    ? "w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden"
    : "w-full max-w-[210mm] min-h-[297mm] shadow-2xl bg-white";

  const aspectStyles = layout === "presentation" 
    ? { aspectRatio: "16/9" }
    : {};

  const contentPadding = layout === "presentation" ? "p-12" : "p-16";

  return (
    <div className={cn(
      "w-full h-full flex items-start justify-center p-8 bg-slate-100 dark:bg-slate-900 overflow-auto",
      className
    )}>
      <div
        className={cn("relative", containerStyles)}
        style={{ 
          ...aspectStyles,
          ...getBackgroundStyle(),
        }}
        onClick={handleCanvasClick}
      >
        {/* Overlay for dark backgrounds with images */}
        {page.background?.overlay && page.background.overlay !== "none" && (
          <div className={cn(
            "absolute inset-0",
            page.background.overlay === "dark" && "bg-black/50",
            page.background.overlay === "light" && "bg-white/30"
          )} />
        )}

        {/* Content area */}
        <div className={cn(
          "relative z-10 h-full flex flex-col gap-6 overflow-y-auto",
          contentPadding
        )}>
          {/* Add block at start if empty or show plus */}
          {page.blocks.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
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
              {page.blocks.map((block, index) => renderBlock(block, index))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
