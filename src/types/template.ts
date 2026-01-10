// ============= Universal Template System =============
// Templates can be applied to any document type (presentations, case studies, etc.)

import { BlockType, PageBackground, DocumentType, BlockContent, BlockStyle } from "./document";

// ============= Section Template =============
// Defines a section within a page template

export interface SectionTemplate {
  id: string;
  name: string;
  description?: string;
  
  // Block constraints
  allowedBlockTypes: BlockType[];
  requiredBlockTypes?: BlockType[]; // Blocks that must be present
  maxBlocks?: number;
  minBlocks?: number;
  
  // Default content when section is created
  defaultBlocks: {
    type: BlockType;
    content: BlockContent;
    style?: BlockStyle;
  }[];
  
  // Visual guidance
  placeholder?: string; // Shown when section is empty
  height?: "auto" | "fixed"; // Fixed height sections maintain size
  fixedHeight?: number; // Pixels if height is "fixed"
}

// ============= Page Template =============
// Defines the structure of a single page

export interface PageTemplate {
  id: string;
  name: string;
  description?: string;
  
  // Background preset for this page
  background: PageBackground;
  
  // Sections on this page (in order)
  sections: SectionTemplate[];
  
  // Layout configuration
  layout?: "single-column" | "two-column" | "sidebar-left" | "sidebar-right";
  padding?: "none" | "sm" | "md" | "lg";
}

// ============= Document Template =============
// The complete template for a document

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category?: string;
  
  // What type of document this template is for
  documentType: DocumentType;
  
  // Thumbnail/preview image URL
  thumbnailUrl?: string;
  
  // Page templates in order
  pages: PageTemplate[];
  
  // Template metadata
  metadata: {
    author?: string;
    version?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    industry?: string; // For filtering by industry
  };
  
  // Whether this template can be customized
  isCustomizable: boolean;
  
  // Minimum/maximum pages allowed when using this template
  minPages?: number;
  maxPages?: number;
}

// ============= Template Mode =============
// Tracks whether a document is in template mode or free-form

export type TemplateMode = "template" | "free-form";

// ============= Template Application Result =============
// Result of applying a template to a document

export interface TemplateApplicationResult {
  success: boolean;
  documentId: string;
  templateId: string;
  warnings?: string[]; // E.g., "Some content was moved to fit template structure"
}

// ============= Template Categories =============

export const TEMPLATE_CATEGORIES = {
  presentation: [
    { id: "general", name: "General", icon: "Presentation" },
    { id: "sales", name: "Sales & Pitch", icon: "TrendingUp" },
    { id: "technical", name: "Technical", icon: "Settings" },
    { id: "training", name: "Training", icon: "GraduationCap" },
  ],
  "case-study": [
    { id: "standard", name: "Standard", icon: "FileText" },
    { id: "technical", name: "Technical Deep-Dive", icon: "Settings" },
    { id: "quick", name: "Quick Win", icon: "Zap" },
    { id: "industry", name: "Industry-Specific", icon: "Building" },
  ],
  whitepaper: [
    { id: "research", name: "Research", icon: "BookOpen" },
    { id: "technical", name: "Technical", icon: "Settings" },
  ],
  proposal: [
    { id: "sales", name: "Sales Proposal", icon: "FileCheck" },
    { id: "project", name: "Project Proposal", icon: "Folder" },
  ],
} as const;

// ============= Helper Functions =============

export const isTemplateMode = (mode: TemplateMode): mode is "template" => mode === "template";

export const canUnlockTemplate = (templateId: string | undefined): boolean => {
  // All templates can be unlocked to free-form
  return templateId !== undefined;
};

export const getTemplateById = (
  templates: DocumentTemplate[],
  templateId: string
): DocumentTemplate | undefined => {
  return templates.find(t => t.id === templateId);
};
