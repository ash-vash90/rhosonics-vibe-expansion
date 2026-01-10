import { useState, useCallback, useEffect, useRef } from "react";
import { 
  DocumentBase, 
  DocumentType, 
  Page, 
  Block, 
  BlockContent, 
  BlockStyle, 
  PageBackground,
  PageTransition,
  createEmptyPage,
  createEmptyDocument,
} from "@/types/document";
import { DocumentTemplate, TemplateMode } from "@/types/template";

// ============= Hook Options =============

export interface UseDocumentBuilderOptions {
  /** Key for localStorage auto-save */
  autosaveKey?: string;
  /** Interval for auto-save in milliseconds (default: 5000) */
  autosaveInterval?: number;
  /** Maximum number of history states to keep (default: 50) */
  maxHistory?: number;
  /** Callback when document changes */
  onChange?: (document: DocumentBase) => void;
  /** Callback for saving to cloud */
  onSave?: (document: DocumentBase) => Promise<void>;
}

// ============= Return Type =============

export interface UseDocumentBuilderReturn<T extends DocumentBase> {
  // State
  document: T;
  currentPageIndex: number;
  currentPage: Page | null;
  selectedBlockId: string | null;
  isDirty: boolean;
  lastSavedAt: Date | null;
  
  // Template mode
  templateMode: TemplateMode;
  templateId: string | null;
  isTemplateMode: boolean;
  
  // Document actions
  setDocument: (document: T) => void;
  updateDocumentName: (name: string) => void;
  resetDocument: (type?: DocumentType) => void;
  
  // Template actions
  applyTemplate: (template: DocumentTemplate) => void;
  unlockTemplate: () => void;
  
  // Page actions
  setCurrentPageIndex: (index: number) => void;
  addPage: (afterIndex?: number, background?: PageBackground) => void;
  deletePage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  updatePageBackground: (pageId: string, background: PageBackground) => void;
  updatePageTransition: (pageId: string, transition: PageTransition) => void;
  updatePageNotes: (pageId: string, notes: string) => void;
  updatePageTargetDuration: (pageId: string, duration: number) => void;
  
  // Block actions
  selectBlock: (blockId: string | null) => void;
  addBlock: (pageId: string, block: Omit<Block, "id">, afterBlockId?: string) => void;
  updateBlock: (pageId: string, blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => void;
  deleteBlock: (pageId: string, blockId: string) => void;
  duplicateBlock: (pageId: string, blockId: string) => void;
  reorderBlocks: (pageId: string, fromIndex: number, toIndex: number) => void;
  
  // History
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  
  // Persistence
  saveToLocal: () => void;
  loadFromLocal: () => boolean;
  clearLocal: () => void;
  markAsSaved: () => void;
}

// ============= Constants =============

const DEFAULT_MAX_HISTORY = 50;
const DEFAULT_AUTOSAVE_INTERVAL = 5000;

// ============= Main Hook =============

export function useDocumentBuilder<T extends DocumentBase>(
  initialDocument: T,
  options: UseDocumentBuilderOptions = {}
): UseDocumentBuilderReturn<T> {
  const {
    autosaveKey,
    autosaveInterval = DEFAULT_AUTOSAVE_INTERVAL,
    maxHistory = DEFAULT_MAX_HISTORY,
    onChange,
  } = options;

  // Core state
  const [document, setDocumentState] = useState<T>(initialDocument);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  
  // History for undo/redo
  const [history, setHistory] = useState<T[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Ref to track if we should skip the onChange callback
  const skipOnChange = useRef(false);
  
  // Current page
  const currentPage = document.pages[currentPageIndex] || null;
  
  // Template mode derived state
  const templateMode: TemplateMode = document.templateMode || "free-form";
  const templateId = document.templateId || null;
  const isTemplateMode = templateMode === "template";

  // ============= History Management =============
  
  const saveToHistory = useCallback((newDocument: T, skipDirty = false) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(document);
      if (newHistory.length > maxHistory) {
        newHistory.shift();
      }
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, maxHistory - 1));
    setDocumentState(newDocument);
    if (!skipDirty) {
      setIsDirty(true);
    }
  }, [document, historyIndex, maxHistory]);

  // ============= Document Actions =============
  
  const setDocument = useCallback((newDocument: T) => {
    skipOnChange.current = true;
    setDocumentState(newDocument);
    setHistory([]);
    setHistoryIndex(-1);
    setIsDirty(false);
  }, []);
  
  const updateDocumentName = useCallback((name: string) => {
    saveToHistory({ ...document, name } as T);
  }, [document, saveToHistory]);
  
  const resetDocument = useCallback((type?: DocumentType) => {
    const newDoc = createEmptyDocument(type || document.type) as T;
    setDocument(newDoc);
  }, [document.type, setDocument]);

  // ============= Template Actions =============
  
  const applyTemplate = useCallback((template: DocumentTemplate) => {
    // Create pages from template
    const newPages: Page[] = template.pages.map(pageTemplate => {
      const blocks: Block[] = [];
      
      // Create blocks from each section's defaults
      pageTemplate.sections.forEach(section => {
        section.defaultBlocks.forEach(blockDef => {
          blocks.push({
            id: crypto.randomUUID(),
            type: blockDef.type,
            content: { ...blockDef.content },
            style: blockDef.style,
          });
        });
      });
      
      return {
        id: crypto.randomUUID(),
        blocks,
        background: pageTemplate.background,
        templateId: pageTemplate.id,
      };
    });
    
    const newDocument = {
      ...document,
      pages: newPages,
      templateId: template.id,
      templateMode: "template" as TemplateMode,
    } as T;
    
    saveToHistory(newDocument);
  }, [document, saveToHistory]);
  
  const unlockTemplate = useCallback(() => {
    const newDocument = {
      ...document,
      templateMode: "free-form" as TemplateMode,
    } as T;
    saveToHistory(newDocument);
  }, [document, saveToHistory]);

  // ============= Page Actions =============
  
  const addPage = useCallback((afterIndex?: number, background?: PageBackground) => {
    const newPage = createEmptyPage(background);
    const insertIndex = afterIndex !== undefined ? afterIndex + 1 : document.pages.length;
    const newPages = [...document.pages];
    newPages.splice(insertIndex, 0, newPage);
    saveToHistory({ ...document, pages: newPages } as T);
    setCurrentPageIndex(insertIndex);
  }, [document, saveToHistory]);
  
  const deletePage = useCallback((pageId: string) => {
    if (document.pages.length <= 1) return;
    const newPages = document.pages.filter(p => p.id !== pageId);
    saveToHistory({ ...document, pages: newPages } as T);
    if (currentPageIndex >= newPages.length) {
      setCurrentPageIndex(newPages.length - 1);
    }
  }, [document, currentPageIndex, saveToHistory]);
  
  const duplicatePage = useCallback((pageId: string) => {
    const pageIndex = document.pages.findIndex(p => p.id === pageId);
    if (pageIndex === -1) return;
    const page = document.pages[pageIndex];
    const newPage: Page = {
      ...page,
      id: crypto.randomUUID(),
      blocks: page.blocks.map(b => ({ ...b, id: crypto.randomUUID() })),
    };
    const newPages = [...document.pages];
    newPages.splice(pageIndex + 1, 0, newPage);
    saveToHistory({ ...document, pages: newPages } as T);
    setCurrentPageIndex(pageIndex + 1);
  }, [document, saveToHistory]);
  
  const reorderPages = useCallback((fromIndex: number, toIndex: number) => {
    const newPages = [...document.pages];
    const [removed] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, removed);
    saveToHistory({ ...document, pages: newPages } as T);
    setCurrentPageIndex(toIndex);
  }, [document, saveToHistory]);
  
  const updatePageBackground = useCallback((pageId: string, background: PageBackground) => {
    const newPages = document.pages.map(p =>
      p.id === pageId ? { ...p, background } : p
    );
    saveToHistory({ ...document, pages: newPages } as T);
  }, [document, saveToHistory]);

  const updatePageTransition = useCallback((pageId: string, transition: PageTransition) => {
    const newPages = document.pages.map(p =>
      p.id === pageId ? { ...p, transition } : p
    );
    saveToHistory({ ...document, pages: newPages } as T);
  }, [document, saveToHistory]);

  const updatePageNotes = useCallback((pageId: string, notes: string) => {
    const newPages = document.pages.map(p =>
      p.id === pageId ? { ...p, notes } : p
    );
    // Don't save to history for every keystroke - just update document
    setDocumentState({ ...document, pages: newPages } as T);
    setIsDirty(true);
  }, [document]);

  const updatePageTargetDuration = useCallback((pageId: string, duration: number) => {
    const newPages = document.pages.map(p =>
      p.id === pageId ? { ...p, targetDuration: duration } : p
    );
    saveToHistory({ ...document, pages: newPages } as T);
  }, [document, saveToHistory]);

  // ============= Block Actions =============
  
  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, []);
  
  const addBlock = useCallback((pageId: string, block: Omit<Block, "id">, afterBlockId?: string) => {
    const newBlock: Block = { ...block, id: crypto.randomUUID() };
    const newPages = document.pages.map(page => {
      if (page.id !== pageId) return page;
      const blocks = [...page.blocks];
      if (afterBlockId) {
        const index = blocks.findIndex(b => b.id === afterBlockId);
        blocks.splice(index + 1, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { ...page, blocks };
    });
    saveToHistory({ ...document, pages: newPages } as T);
    setSelectedBlockId(newBlock.id);
  }, [document, saveToHistory]);
  
  const updateBlock = useCallback((pageId: string, blockId: string, content: Partial<BlockContent>, style?: Partial<BlockStyle>) => {
    const newPages = document.pages.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        blocks: page.blocks.map(block => {
          if (block.id !== blockId) return block;
          return {
            ...block,
            content: { ...block.content, ...content },
            style: style ? { ...block.style, ...style } : block.style,
          };
        }),
      };
    });
    // Don't save to history for every content update (too frequent)
    setDocumentState({ ...document, pages: newPages } as T);
    setIsDirty(true);
  }, [document]);
  
  const deleteBlock = useCallback((pageId: string, blockId: string) => {
    const newPages = document.pages.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        blocks: page.blocks.filter(b => b.id !== blockId),
      };
    });
    saveToHistory({ ...document, pages: newPages } as T);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [document, selectedBlockId, saveToHistory]);
  
  const duplicateBlock = useCallback((pageId: string, blockId: string) => {
    const newPages = document.pages.map(page => {
      if (page.id !== pageId) return page;
      const blockIndex = page.blocks.findIndex(b => b.id === blockId);
      if (blockIndex === -1) return page;
      const block = page.blocks[blockIndex];
      const newBlock: Block = { 
        ...block, 
        id: crypto.randomUUID(),
        content: { ...block.content },
        style: block.style ? { ...block.style } : undefined,
      };
      const blocks = [...page.blocks];
      blocks.splice(blockIndex + 1, 0, newBlock);
      return { ...page, blocks };
    });
    saveToHistory({ ...document, pages: newPages } as T);
  }, [document, saveToHistory]);
  
  const reorderBlocks = useCallback((pageId: string, fromIndex: number, toIndex: number) => {
    const newPages = document.pages.map(page => {
      if (page.id !== pageId) return page;
      const blocks = [...page.blocks];
      const [removed] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, removed);
      return { ...page, blocks };
    });
    saveToHistory({ ...document, pages: newPages } as T);
  }, [document, saveToHistory]);

  // ============= Undo/Redo =============
  
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;
  
  const undo = useCallback(() => {
    if (!canUndo) return;
    const previousState = history[historyIndex];
    setHistoryIndex(prev => prev - 1);
    skipOnChange.current = true;
    setDocumentState(previousState);
    setIsDirty(true);
  }, [canUndo, history, historyIndex]);
  
  const redo = useCallback(() => {
    if (!canRedo) return;
    const nextState = history[historyIndex + 1];
    setHistoryIndex(prev => prev + 1);
    skipOnChange.current = true;
    setDocumentState(nextState);
    setIsDirty(true);
  }, [canRedo, history, historyIndex]);

  // ============= Persistence =============
  
  const saveToLocal = useCallback(() => {
    if (!autosaveKey) return;
    try {
      localStorage.setItem(autosaveKey, JSON.stringify(document));
      setLastSavedAt(new Date());
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [autosaveKey, document]);
  
  const loadFromLocal = useCallback((): boolean => {
    if (!autosaveKey) return false;
    try {
      const saved = localStorage.getItem(autosaveKey);
      if (saved) {
        const parsed = JSON.parse(saved) as T;
        setDocument(parsed);
        return true;
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
    return false;
  }, [autosaveKey, setDocument]);
  
  const clearLocal = useCallback(() => {
    if (!autosaveKey) return;
    try {
      localStorage.removeItem(autosaveKey);
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  }, [autosaveKey]);
  
  const markAsSaved = useCallback(() => {
    setIsDirty(false);
    setLastSavedAt(new Date());
  }, []);

  // ============= Effects =============
  
  // Auto-save effect
  useEffect(() => {
    if (!autosaveKey || !isDirty) return;
    
    const timer = setTimeout(() => {
      saveToLocal();
    }, autosaveInterval);
    
    return () => clearTimeout(timer);
  }, [autosaveKey, isDirty, autosaveInterval, saveToLocal]);
  
  // onChange callback
  useEffect(() => {
    if (skipOnChange.current) {
      skipOnChange.current = false;
      return;
    }
    onChange?.(document);
  }, [document, onChange]);

  // ============= Return =============
  
  return {
    // State
    document,
    currentPageIndex,
    currentPage,
    selectedBlockId,
    isDirty,
    lastSavedAt,
    
    // Template mode
    templateMode,
    templateId,
    isTemplateMode,
    
    // Document actions
    setDocument,
    updateDocumentName,
    resetDocument,
    
    // Template actions
    applyTemplate,
    unlockTemplate,
    
    // Page actions
    setCurrentPageIndex,
    addPage,
    deletePage,
    duplicatePage,
    reorderPages,
    updatePageBackground,
    updatePageTransition,
    updatePageNotes,
    updatePageTargetDuration,
    
    // Block actions
    selectBlock,
    addBlock,
    updateBlock,
    deleteBlock,
    duplicateBlock,
    reorderBlocks,
    
    // History
    canUndo,
    canRedo,
    undo,
    redo,
    
    // Persistence
    saveToLocal,
    loadFromLocal,
    clearLocal,
    markAsSaved,
  };
}
