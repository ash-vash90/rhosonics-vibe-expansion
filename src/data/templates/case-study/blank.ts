import { DocumentTemplate } from "@/types/template";

export const blankCaseStudyTemplate: DocumentTemplate = {
  id: "case-study-blank",
  name: "Blank Case Study",
  description: "Start from scratch with complete creative freedom",
  category: "standard",
  documentType: "case-study",
  pages: [
    {
      id: "page-1",
      name: "Page 1",
      description: "First page of your case study",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "content-section",
          name: "Content",
          allowedBlockTypes: [
            "heading", "subheading", "paragraph", "bullet-list", "image",
            "stat-card", "stat-grid", "chart", "spec-table", "quote",
            "callout", "divider", "cta", "identity-card", "challenge-solution", "results-grid"
          ],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Case Study Title", level: 1 },
            },
          ],
          placeholder: "Add your content",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "1.0",
    tags: ["blank", "starter", "free-form"],
  },
  isCustomizable: true,
};
