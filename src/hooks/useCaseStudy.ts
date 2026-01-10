import { useMemo } from "react";
import { 
  useDocumentBuilder, 
  UseDocumentBuilderOptions, 
  UseDocumentBuilderReturn 
} from "./useDocumentBuilder";
import { 
  DocumentBase, 
  createEmptyDocument,
  INDUSTRY_OPTIONS,
  PRODUCT_OPTIONS,
} from "@/types/document";

// ============= Case Study Document Type =============

export interface CaseStudyDocument extends DocumentBase {
  type: "case-study";
  // Case study specific metadata
  caseStudyMeta?: {
    industry?: string;
    product?: string;
    company?: string;
    location?: string;
    headline?: string;
    stat?: string;
    statLabel?: string;
  };
}

// ============= Hook Options =============

export interface UseCaseStudyOptions extends UseDocumentBuilderOptions {
  /** Initial industry selection */
  defaultIndustry?: typeof INDUSTRY_OPTIONS[number];
  /** Initial product selection */
  defaultProduct?: typeof PRODUCT_OPTIONS[number];
}

// ============= Return Type =============

export interface UseCaseStudyReturn extends UseDocumentBuilderReturn<CaseStudyDocument> {
  // Case study specific getters
  industry: string | undefined;
  product: string | undefined;
  company: string | undefined;
  location: string | undefined;
  headline: string | undefined;
  stat: string | undefined;
  statLabel: string | undefined;
  
  // Case study specific actions
  updateCaseStudyMeta: (meta: Partial<CaseStudyDocument["caseStudyMeta"]>) => void;
  setIndustry: (industry: string) => void;
  setProduct: (product: string) => void;
}

// ============= Helper Functions =============

export const createEmptyCaseStudy = (name?: string): CaseStudyDocument => {
  const base = createEmptyDocument("case-study", name);
  return {
    ...base,
    type: "case-study",
    caseStudyMeta: {
      industry: undefined,
      product: undefined,
      company: undefined,
      location: undefined,
      headline: undefined,
      stat: undefined,
      statLabel: undefined,
    },
  };
};

// ============= Main Hook =============

export function useCaseStudy(
  initialDocument?: CaseStudyDocument,
  options: UseCaseStudyOptions = {}
): UseCaseStudyReturn {
  const { defaultIndustry, defaultProduct, ...builderOptions } = options;

  // Create initial document with defaults
  const initialDoc = useMemo(() => {
    if (initialDocument) return initialDocument;
    
    const doc = createEmptyCaseStudy();
    if (defaultIndustry || defaultProduct) {
      doc.caseStudyMeta = {
        ...doc.caseStudyMeta,
        industry: defaultIndustry,
        product: defaultProduct,
      };
    }
    return doc;
  }, [initialDocument, defaultIndustry, defaultProduct]);

  // Use the base document builder
  const builder = useDocumentBuilder<CaseStudyDocument>(initialDoc, {
    ...builderOptions,
    autosaveKey: builderOptions.autosaveKey || "rhosonics-case-study-autosave",
  });

  // Extract case study metadata
  const caseStudyMeta = builder.document.caseStudyMeta;

  // Case study specific actions
  const updateCaseStudyMeta = (meta: Partial<CaseStudyDocument["caseStudyMeta"]>) => {
    const newDoc: CaseStudyDocument = {
      ...builder.document,
      caseStudyMeta: {
        ...builder.document.caseStudyMeta,
        ...meta,
      },
    };
    builder.setDocument(newDoc);
  };

  const setIndustry = (industry: string) => {
    updateCaseStudyMeta({ industry });
  };

  const setProduct = (product: string) => {
    updateCaseStudyMeta({ product });
  };

  return {
    ...builder,
    
    // Case study specific getters
    industry: caseStudyMeta?.industry,
    product: caseStudyMeta?.product,
    company: caseStudyMeta?.company,
    location: caseStudyMeta?.location,
    headline: caseStudyMeta?.headline,
    stat: caseStudyMeta?.stat,
    statLabel: caseStudyMeta?.statLabel,
    
    // Case study specific actions
    updateCaseStudyMeta,
    setIndustry,
    setProduct,
  };
}
