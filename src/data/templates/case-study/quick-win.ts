import { DocumentTemplate } from "@/types/template";

export const quickWinTemplate: DocumentTemplate = {
  id: "case-study-quick-win",
  name: "Quick Win",
  description: "1-page summary format for rapid success stories",
  category: "quick",
  documentType: "case-study",
  pages: [
    {
      id: "page-1",
      name: "Quick Win Summary",
      description: "All key information on a single page",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "hero-section",
          name: "Hero",
          description: "Compact hero with key stat overlay",
          allowedBlockTypes: ["hero-image", "image", "stat-card"],
          defaultBlocks: [
            {
              type: "hero-image",
              content: { 
                imageUrl: "", 
                title: "Quick Win Success",
                subtitle: "Rapid results with Rhosonics technology",
                overlayOpacity: 0.6,
                height: "180px",
                gradientDirection: "right"
              },
              style: { width: "full" },
            },
          ],
          height: "fixed",
          fixedHeight: 180,
          placeholder: "Add hero image",
        },
        {
          id: "identity-section",
          name: "Quick Identity",
          allowedBlockTypes: ["identity-card"],
          defaultBlocks: [
            {
              type: "identity-card",
              content: { identity: { company: "", location: "", industry: "", product: "" } },
            },
          ],
          placeholder: "Add company details",
        },
        {
          id: "headline-section",
          name: "Headline Result",
          description: "The big number that tells the story",
          allowedBlockTypes: ["stat-card", "heading"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "stat-card",
              content: { stat: { value: "", label: "Key Result" } },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add headline stat",
        },
        {
          id: "story-section",
          name: "The Story",
          description: "Brief challenge and solution",
          allowedBlockTypes: ["challenge-solution", "paragraph", "heading"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "challenge-solution",
              content: { 
                challengeSolution: { 
                  challenge: "", 
                  solution: "" 
                } 
              },
            },
          ],
          placeholder: "Add brief story",
        },
        {
          id: "results-section",
          name: "Quick Results",
          description: "3 key outcomes",
          allowedBlockTypes: ["stat-grid", "results-grid", "bullet-list"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "stat-grid",
              content: { 
                stats: [
                  { value: "", label: "Result 1" },
                  { value: "", label: "Result 2" },
                  { value: "", label: "Result 3" },
                ] 
              },
            },
          ],
          placeholder: "Add key results",
        },
        {
          id: "quote-section",
          name: "Quick Quote",
          description: "One-liner testimonial",
          allowedBlockTypes: ["quote"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "quote",
              content: { quote: { text: "Add a brief testimonial...", author: "Customer Name", role: "Job Title" } },
            },
          ],
          placeholder: "Add short testimonial",
        },
        {
          id: "cta-section",
          name: "Call to Action",
          allowedBlockTypes: ["cta"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "cta",
              content: { 
                cta: { 
                  text: "Learn more", 
                  buttonLabel: "Contact Us",
                  buttonUrl: "https://rhosonics.com/contact"
                } 
              },
            },
          ],
          placeholder: "Add CTA",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "2.0",
    tags: ["quick", "1-page", "summary", "snapshot"],
  },
  isCustomizable: true,
  minPages: 1,
  maxPages: 1,
};
