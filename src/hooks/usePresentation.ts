import { useState, useCallback } from "react";
import { Presentation, Slide, Block, createEmptyPresentation, createEmptySlide, BlockContent, BlockStyle, SlideTransition } from "@/types/presentation";

interface UsePresentationReturn {
  presentation: Presentation;
  currentSlideIndex: number;
  currentSlide: Slide | null;
  selectedBlockId: string | null;
  
  // Presentation actions
  setPresentation: (presentation: Presentation) => void;
  updatePresentationName: (name: string) => void;
  
  // Slide actions
  setCurrentSlideIndex: (index: number) => void;
  addSlide: (afterIndex?: number) => void;
  deleteSlide: (slideId: string) => void;
  duplicateSlide: (slideId: string) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  updateSlideBackground: (slideId: string, background: Slide["background"]) => void;
  updateSlideTransition: (slideId: string, transition: SlideTransition) => void;
  updateSlideNotes: (slideId: string, notes: string) => void;
  
  selectBlock: (blockId: string | null) => void;
  addBlock: (slideId: string, block: Omit<Block, "id">, afterBlockId?: string) => void;
  updateBlock: (slideId: string, blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => void;
  deleteBlock: (slideId: string, blockId: string) => void;
  duplicateBlock: (slideId: string, blockId: string) => void;
  reorderBlocks: (slideId: string, fromIndex: number, toIndex: number) => void;
  
  // Undo/redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

const MAX_HISTORY = 50;

export function usePresentation(initialPresentation?: Presentation): UsePresentationReturn {
  const [presentation, setPresentation] = useState<Presentation>(
    initialPresentation || createEmptyPresentation()
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // History for undo/redo
  const [history, setHistory] = useState<Presentation[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Get current slide
  const currentSlide = presentation.slides[currentSlideIndex] || null;
  
  // Save to history
  const saveToHistory = useCallback((newPresentation: Presentation) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(presentation);
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
    setPresentation(newPresentation);
  }, [presentation, historyIndex]);
  
  // Update presentation name
  const updatePresentationName = useCallback((name: string) => {
    saveToHistory({ ...presentation, name });
  }, [presentation, saveToHistory]);
  
  // Slide actions
  const addSlide = useCallback((afterIndex?: number) => {
    const newSlide = createEmptySlide();
    const insertIndex = afterIndex !== undefined ? afterIndex + 1 : presentation.slides.length;
    const newSlides = [...presentation.slides];
    newSlides.splice(insertIndex, 0, newSlide);
    saveToHistory({ ...presentation, slides: newSlides });
    setCurrentSlideIndex(insertIndex);
  }, [presentation, saveToHistory]);
  
  const deleteSlide = useCallback((slideId: string) => {
    if (presentation.slides.length <= 1) return;
    const newSlides = presentation.slides.filter(s => s.id !== slideId);
    saveToHistory({ ...presentation, slides: newSlides });
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  }, [presentation, currentSlideIndex, saveToHistory]);
  
  const duplicateSlide = useCallback((slideId: string) => {
    const slideIndex = presentation.slides.findIndex(s => s.id === slideId);
    if (slideIndex === -1) return;
    const slide = presentation.slides[slideIndex];
    const newSlide: Slide = {
      ...slide,
      id: crypto.randomUUID(),
      blocks: slide.blocks.map(b => ({ ...b, id: crypto.randomUUID() })),
    };
    const newSlides = [...presentation.slides];
    newSlides.splice(slideIndex + 1, 0, newSlide);
    saveToHistory({ ...presentation, slides: newSlides });
    setCurrentSlideIndex(slideIndex + 1);
  }, [presentation, saveToHistory]);
  
  const reorderSlides = useCallback((fromIndex: number, toIndex: number) => {
    const newSlides = [...presentation.slides];
    const [removed] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, removed);
    saveToHistory({ ...presentation, slides: newSlides });
    setCurrentSlideIndex(toIndex);
  }, [presentation, saveToHistory]);
  
  const updateSlideBackground = useCallback((slideId: string, background: Slide["background"]) => {
    const newSlides = presentation.slides.map(s =>
      s.id === slideId ? { ...s, background } : s
    );
    saveToHistory({ ...presentation, slides: newSlides });
  }, [presentation, saveToHistory]);

  const updateSlideTransition = useCallback((slideId: string, transition: SlideTransition) => {
    const newSlides = presentation.slides.map(s =>
      s.id === slideId ? { ...s, transition } : s
    );
    saveToHistory({ ...presentation, slides: newSlides });
  }, [presentation, saveToHistory]);

  const updateSlideNotes = useCallback((slideId: string, notes: string) => {
    const newSlides = presentation.slides.map(s =>
      s.id === slideId ? { ...s, notes } : s
    );
    // Don't save to history for every keystroke - just update presentation
    setPresentation({ ...presentation, slides: newSlides });
  }, [presentation]);
  
  // Block actions
  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, []);
  
  const addBlock = useCallback((slideId: string, block: Omit<Block, "id">, afterBlockId?: string) => {
    const newBlock: Block = { ...block, id: crypto.randomUUID() };
    const newSlides = presentation.slides.map(slide => {
      if (slide.id !== slideId) return slide;
      const blocks = [...slide.blocks];
      if (afterBlockId) {
        const index = blocks.findIndex(b => b.id === afterBlockId);
        blocks.splice(index + 1, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { ...slide, blocks };
    });
    saveToHistory({ ...presentation, slides: newSlides });
    setSelectedBlockId(newBlock.id);
  }, [presentation, saveToHistory]);
  
  const updateBlock = useCallback((slideId: string, blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => {
    const newSlides = presentation.slides.map(slide => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        blocks: slide.blocks.map(block => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            content: { ...block.content, ...content },
            style: style ? { ...block.style, ...style } : block.style,
          };
        }),
      };
    });
    setPresentation({ ...presentation, slides: newSlides });
  }, [presentation]);
  
  const deleteBlock = useCallback((slideId: string, blockId: string) => {
    const newSlides = presentation.slides.map(slide => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        blocks: slide.blocks.filter(b => b.id !== blockId),
      };
    });
    saveToHistory({ ...presentation, slides: newSlides });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [presentation, selectedBlockId, saveToHistory]);
  
  const duplicateBlock = useCallback((slideId: string, blockId: string) => {
    const newSlides = presentation.slides.map(slide => {
      if (slide.id !== slideId) return slide;
      const blockIndex = slide.blocks.findIndex(b => b.id === blockId);
      if (blockIndex === -1) return slide;
      const block = slide.blocks[blockIndex];
      const newBlock: Block = { ...block, id: crypto.randomUUID() };
      const blocks = [...slide.blocks];
      blocks.splice(blockIndex + 1, 0, newBlock);
      return { ...slide, blocks };
    });
    saveToHistory({ ...presentation, slides: newSlides });
  }, [presentation, saveToHistory]);
  
  const reorderBlocks = useCallback((slideId: string, fromIndex: number, toIndex: number) => {
    const newSlides = presentation.slides.map(slide => {
      if (slide.id !== slideId) return slide;
      const blocks = [...slide.blocks];
      const [removed] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, removed);
      return { ...slide, blocks };
    });
    saveToHistory({ ...presentation, slides: newSlides });
  }, [presentation, saveToHistory]);
  
  // Undo/redo
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;
  
  const undo = useCallback(() => {
    if (!canUndo) return;
    const previousState = history[historyIndex];
    setHistoryIndex(prev => prev - 1);
    setPresentation(previousState);
  }, [canUndo, history, historyIndex]);
  
  const redo = useCallback(() => {
    if (!canRedo) return;
    const nextState = history[historyIndex + 1];
    setHistoryIndex(prev => prev + 1);
    setPresentation(nextState);
  }, [canRedo, history, historyIndex]);
  
  return {
    presentation,
    currentSlideIndex,
    currentSlide,
    selectedBlockId,
    setPresentation,
    updatePresentationName,
    setCurrentSlideIndex,
    addSlide,
    deleteSlide,
    duplicateSlide,
    reorderSlides,
    updateSlideBackground,
    updateSlideTransition,
    updateSlideNotes,
    selectBlock,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    reorderBlocks,
    canUndo,
    canRedo,
    undo,
    redo,
  };
}
