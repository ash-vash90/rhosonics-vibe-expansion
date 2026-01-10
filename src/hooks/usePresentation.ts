import { useCallback, useMemo } from "react";
import { Presentation, Slide, Block, BlockContent, BlockStyle, SlideTransition, createEmptyPresentation, createEmptySlide, DEFAULT_THEME } from "@/types/presentation";
import { useDocumentBuilder } from "./useDocumentBuilder";
import { Page, PageBackground, PageTransition } from "@/types/document";

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

/**
 * Hook for managing presentation state.
 * This is a wrapper around useDocumentBuilder that provides presentation-specific terminology.
 */
export function usePresentation(initialPresentation?: Presentation): UsePresentationReturn {
  // Convert Presentation to DocumentBase-compatible format
  const initialDoc = useMemo(() => {
    const pres = initialPresentation || createEmptyPresentation();
    return {
      ...pres,
      type: "presentation" as const,
      pages: pres.slides as unknown as Page[],
      theme: {
        colors: pres.theme?.colors || DEFAULT_THEME.colors,
        fonts: pres.theme?.fonts || DEFAULT_THEME.fonts,
      },
    };
  }, [initialPresentation]);

  const builder = useDocumentBuilder(initialDoc);

  // Map pages back to slides for backward compatibility
  const presentation: Presentation = useMemo(() => ({
    id: builder.document.id,
    name: builder.document.name,
    slides: builder.document.pages as unknown as Slide[],
    theme: {
      colors: builder.document.theme?.colors || DEFAULT_THEME.colors,
      fonts: builder.document.theme?.fonts || DEFAULT_THEME.fonts,
    },
    aspectRatio: "16:9" as const,
  }), [builder.document]);

  const currentSlide = useMemo(() => {
    return presentation.slides[builder.currentPageIndex] || null;
  }, [presentation.slides, builder.currentPageIndex]);

  // Wrapper functions that use slide terminology but call page functions
  const setPresentation = useCallback((newPresentation: Presentation) => {
    builder.setDocument({
      ...builder.document,
      id: newPresentation.id,
      name: newPresentation.name,
      pages: newPresentation.slides as unknown as Page[],
    });
  }, [builder]);

  const addSlide = useCallback((afterIndex?: number) => {
    const newSlide = createEmptySlide();
    builder.addPage(afterIndex, newSlide.background as PageBackground);
  }, [builder]);

  const deleteSlide = useCallback((slideId: string) => {
    builder.deletePage(slideId);
  }, [builder]);

  const duplicateSlide = useCallback((slideId: string) => {
    builder.duplicatePage(slideId);
  }, [builder]);

  const reorderSlides = useCallback((fromIndex: number, toIndex: number) => {
    builder.reorderPages(fromIndex, toIndex);
  }, [builder]);

  const updateSlideBackground = useCallback((slideId: string, background: Slide["background"]) => {
    builder.updatePageBackground(slideId, background as PageBackground);
  }, [builder]);

  const updateSlideTransition = useCallback((slideId: string, transition: SlideTransition) => {
    builder.updatePageTransition(slideId, transition as PageTransition);
  }, [builder]);

  const updateSlideNotes = useCallback((slideId: string, notes: string) => {
    builder.updatePageNotes(slideId, notes);
  }, [builder]);

  const addBlock = useCallback((slideId: string, block: Omit<Block, "id">, afterBlockId?: string) => {
    builder.addBlock(slideId, block, afterBlockId);
  }, [builder]);

  const updateBlock = useCallback((slideId: string, blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => {
    builder.updateBlock(slideId, blockId, content, style);
  }, [builder]);

  const deleteBlock = useCallback((slideId: string, blockId: string) => {
    builder.deleteBlock(slideId, blockId);
  }, [builder]);

  const duplicateBlock = useCallback((slideId: string, blockId: string) => {
    builder.duplicateBlock(slideId, blockId);
  }, [builder]);

  const reorderBlocks = useCallback((slideId: string, fromIndex: number, toIndex: number) => {
    builder.reorderBlocks(slideId, fromIndex, toIndex);
  }, [builder]);

  return {
    presentation,
    currentSlideIndex: builder.currentPageIndex,
    currentSlide,
    selectedBlockId: builder.selectedBlockId,
    setPresentation,
    updatePresentationName: builder.updateDocumentName,
    setCurrentSlideIndex: builder.setCurrentPageIndex,
    addSlide,
    deleteSlide,
    duplicateSlide,
    reorderSlides,
    updateSlideBackground,
    updateSlideTransition,
    updateSlideNotes,
    selectBlock: builder.selectBlock,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    reorderBlocks,
    canUndo: builder.canUndo,
    canRedo: builder.canRedo,
    undo: builder.undo,
    redo: builder.redo,
  };
}
