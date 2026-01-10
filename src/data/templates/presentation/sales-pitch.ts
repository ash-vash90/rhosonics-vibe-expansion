import { DocumentTemplate } from "@/types/template";

export const salesPitchTemplate: DocumentTemplate = {
  id: "presentation-sales-pitch",
  name: "Sales Pitch",
  description: "Persuasive deck for customer presentations with problem-solution structure",
  category: "sales",
  documentType: "presentation",
  pages: [
    {
      id: "title-slide",
      name: "Title Slide",
      description: "Hook your audience with a compelling opening",
      background: { 
        type: "gradient", 
        value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" 
      },
      sections: [
        {
          id: "title-section",
          name: "Title & Hook",
          allowedBlockTypes: ["heading", "subheading", "paragraph", "stat-card"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "The Problem We Solve", level: 1 },
              style: { alignment: "center" },
            },
            {
              type: "subheading",
              content: { text: "A compelling subtitle that speaks to your audience's pain", level: 2 },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add your hook here",
        },
      ],
    },
    {
      id: "problem-slide",
      name: "The Problem",
      description: "Articulate the customer's pain points",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "problem-section",
          name: "Problem Statement",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "stat-grid", "callout"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "The Challenge", level: 1 },
            },
            {
              type: "bullet-list",
              content: { items: ["Pain point 1", "Pain point 2", "Pain point 3"] },
            },
          ],
          placeholder: "Describe the problem",
        },
      ],
    },
    {
      id: "solution-slide",
      name: "Our Solution",
      description: "Present your solution",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "solution-section",
          name: "Solution",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "image", "stat-grid"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "How We Help", level: 1 },
            },
            {
              type: "paragraph",
              content: { text: "Explain your solution in clear, benefit-focused language..." },
            },
          ],
          placeholder: "Present your solution",
        },
      ],
    },
    {
      id: "demo-slide",
      name: "Product Demo",
      description: "Show the product in action",
      background: { type: "solid", value: "hsl(220 15% 20%)" },
      sections: [
        {
          id: "demo-section",
          name: "Demo",
          allowedBlockTypes: ["heading", "image", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "See It In Action", level: 1 },
            },
            {
              type: "image",
              content: { imageUrl: "", imageAlt: "Product screenshot or demo" },
            },
          ],
          placeholder: "Add demo screenshot or video",
        },
      ],
    },
    {
      id: "proof-slide",
      name: "Social Proof",
      description: "Customer testimonials and results",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "proof-section",
          name: "Results & Testimonials",
          allowedBlockTypes: ["heading", "stat-grid", "quote", "chart"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Proven Results", level: 1 },
            },
            {
              type: "stat-grid",
              content: { 
                stats: [
                  { value: "99%", label: "Accuracy" },
                  { value: "50%", label: "Cost Reduction" },
                  { value: "24/7", label: "Monitoring" },
                ] 
              },
            },
          ],
          placeholder: "Add proof points",
        },
      ],
    },
    {
      id: "cta-slide",
      name: "Call to Action",
      description: "Close with a clear next step",
      background: { 
        type: "gradient", 
        value: "linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(85 60% 45%) 100%)" 
      },
      sections: [
        {
          id: "cta-section",
          name: "Next Steps",
          allowedBlockTypes: ["heading", "paragraph", "cta"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Ready to Get Started?", level: 1 },
              style: { alignment: "center" },
            },
            {
              type: "cta",
              content: { 
                cta: { 
                  text: "Let's discuss how we can help you", 
                  buttonLabel: "Schedule a Call",
                  secondaryButtonLabel: "Learn More",
                } 
              },
            },
          ],
          placeholder: "Add your call to action",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "1.0",
    tags: ["sales", "pitch", "customer"],
  },
  isCustomizable: true,
  minPages: 3,
};
