import { Slide, Block, BlockContent, BlockStyle } from "@/types/presentation";
import { DocumentCanvas } from "@/components/document-builder";

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
  return (
    <DocumentCanvas
      page={slide}
      selectedBlockId={selectedBlockId}
      onSelectBlock={onSelectBlock}
      onUpdateBlock={onUpdateBlock}
      onDeleteBlock={onDeleteBlock}
      onDuplicateBlock={onDuplicateBlock}
      onAddBlock={onAddBlock}
      onReorderBlocks={onReorderBlocks}
      layout="presentation"
    />
  );
}
