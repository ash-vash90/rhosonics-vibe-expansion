// Central template registry
import { DocumentTemplate } from "@/types/template";
import { DocumentType } from "@/types/document";
import { presentationTemplates } from "./presentation";
import { caseStudyTemplates } from "./case-study";

// All templates
export const allTemplates: DocumentTemplate[] = [
  ...presentationTemplates,
  ...caseStudyTemplates,
];

// Get templates by document type
export const getTemplatesByType = (type: DocumentType): DocumentTemplate[] => {
  return allTemplates.filter(t => t.documentType === type);
};

// Get template by ID
export const getTemplateById = (templateId: string): DocumentTemplate | undefined => {
  return allTemplates.find(t => t.id === templateId);
};

// Get blank template for a document type
export const getBlankTemplate = (type: DocumentType): DocumentTemplate | undefined => {
  return allTemplates.find(t => t.documentType === type && t.id.includes("blank"));
};

// Get featured templates (non-blank) for a document type
export const getFeaturedTemplates = (type: DocumentType): DocumentTemplate[] => {
  return allTemplates.filter(t => t.documentType === type && !t.id.includes("blank"));
};

// Export individual template collections
export { presentationTemplates } from "./presentation";
export { caseStudyTemplates } from "./case-study";
