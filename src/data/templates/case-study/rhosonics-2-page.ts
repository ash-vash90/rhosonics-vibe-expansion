import { DocumentTemplate } from "@/types/template";

export const rhosonics2PageTemplate: DocumentTemplate = {
  id: "case-study-rhosonics-2-page",
  name: "Rhosonics Standard",
  description: "The classic 2-page Rhosonics case study format with hero, challenge, solution, results, and testimonial",
  category: "standard",
  documentType: "case-study",
  pages: [
    {
      id: "page-1",
      name: "Cover & Challenge",
      description: "Hero image, company identity, and problem statement",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "header-section",
          name: "Header",
          description: "Rhosonics branding header",
          allowedBlockTypes: ["image"],
          defaultBlocks: [],
          height: "fixed",
          fixedHeight: 60,
          placeholder: "Header area",
        },
        {
          id: "hero-section",
          name: "Hero Image",
          description: "Large hero image showcasing the installation or application",
          allowedBlockTypes: ["image"],
          requiredBlockTypes: ["image"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "image",
              content: { imageUrl: "", imageAlt: "Hero image", caption: "" },
              style: { width: "full" },
            },
          ],
          height: "fixed",
          fixedHeight: 280,
          placeholder: "Add hero image",
        },
        {
          id: "identity-section",
          name: "Company Identity",
          description: "Customer company, location, industry, and product",
          allowedBlockTypes: ["identity-card"],
          requiredBlockTypes: ["identity-card"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "identity-card",
              content: { 
                identity: { 
                  company: "", 
                  location: "", 
                  industry: "", 
                  product: "" 
                } 
              },
            },
          ],
          placeholder: "Add company details",
        },
        {
          id: "tagline-section",
          name: "Tagline",
          description: "Compelling one-liner summarizing the success",
          allowedBlockTypes: ["heading", "subheading"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "subheading",
              content: { text: "A compelling tagline that captures the success story", level: 2 },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add tagline",
        },
        {
          id: "challenge-solution-section",
          name: "Challenge & Solution",
          description: "The problem faced and how Rhosonics solved it",
          allowedBlockTypes: ["challenge-solution", "paragraph", "heading"],
          requiredBlockTypes: ["challenge-solution"],
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
          placeholder: "Describe the challenge and solution",
        },
        {
          id: "primary-stat-section",
          name: "Primary Statistic",
          description: "The headline result that grabs attention",
          allowedBlockTypes: ["stat-card"],
          requiredBlockTypes: ["stat-card"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "stat-card",
              content: { stat: { value: "", label: "" } },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add primary statistic",
        },
        {
          id: "specs-section",
          name: "Technical Specifications",
          description: "Key technical details of the installation",
          allowedBlockTypes: ["spec-table"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "spec-table",
              content: { 
                specs: [
                  { label: "", value: "" },
                ] 
              },
            },
          ],
          placeholder: "Add specifications",
        },
      ],
    },
    {
      id: "page-2",
      name: "Results & Testimonial",
      description: "Key results, data visualization, and customer quote",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "header-section",
          name: "Header",
          description: "Rhosonics branding header",
          allowedBlockTypes: ["image"],
          defaultBlocks: [],
          height: "fixed",
          fixedHeight: 60,
          placeholder: "Header area",
        },
        {
          id: "results-section",
          name: "Key Results",
          description: "Bullet points of achieved outcomes",
          allowedBlockTypes: ["heading", "results-grid", "bullet-list"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Key Results", level: 2 },
            },
            {
              type: "results-grid",
              content: { 
                resultsGrid: { 
                  results: ["Result 1", "Result 2", "Result 3"] 
                } 
              },
            },
          ],
          placeholder: "Add key results",
        },
        {
          id: "chart-section",
          name: "Data Visualization",
          description: "Chart showing before/after or performance data",
          allowedBlockTypes: ["chart", "image"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "chart",
              content: { 
                chart: { 
                  type: "bar", 
                  title: "Performance Data",
                  data: [
                    { label: "Before", value: 70 },
                    { label: "After", value: 98 },
                  ],
                } 
              },
            },
          ],
          placeholder: "Add chart or data visualization",
        },
        {
          id: "quote-section",
          name: "Customer Testimonial",
          description: "Quote from the customer about their experience",
          allowedBlockTypes: ["quote"],
          maxBlocks: 1,
          defaultBlocks: [
            {
              type: "quote",
              content: { 
                quote: { 
                  text: "", 
                  author: "", 
                  role: "" 
                } 
              },
            },
          ],
          placeholder: "Add customer quote",
        },
        {
          id: "cta-section",
          name: "Call to Action",
          description: "Contact information and next steps",
          allowedBlockTypes: ["cta", "paragraph"],
          defaultBlocks: [
            {
              type: "cta",
              content: { 
                cta: { 
                  text: "Ready to achieve similar results?", 
                  buttonLabel: "Contact Us" 
                } 
              },
            },
          ],
          placeholder: "Add call to action",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "1.0",
    tags: ["standard", "2-page", "rhosonics"],
  },
  isCustomizable: true,
  minPages: 2,
  maxPages: 2,
};
