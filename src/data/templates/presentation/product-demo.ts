import { DocumentTemplate } from "@/types/template";

export const productDemoTemplate: DocumentTemplate = {
  id: "presentation-product-demo",
  name: "Product Demo",
  description: "Walkthrough of product features with live demonstration structure",
  category: "sales",
  documentType: "presentation",
  pages: [
    {
      id: "hook-slide",
      name: "The Hook",
      description: "Capture attention with a compelling opening",
      background: { 
        type: "gradient", 
        value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" 
      },
      sections: [
        {
          id: "hook-section",
          name: "Hook",
          allowedBlockTypes: ["heading", "subheading", "stat-card"],
          defaultBlocks: [
            {
              type: "stat-card",
              content: { stat: { value: "99%", label: "of operators struggle with..." } },
              style: { alignment: "center" },
            },
            {
              type: "heading",
              content: { text: "What If There Was a Better Way?", level: 1 },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add your hook",
        },
      ],
    },
    {
      id: "intro-slide",
      name: "Product Introduction",
      description: "Introduce the product",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "intro-section",
          name: "Introduction",
          allowedBlockTypes: ["heading", "paragraph", "image", "bullet-list"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Introducing [Product Name]", level: 1 },
            },
            {
              type: "image",
              content: { imageUrl: "", imageAlt: "Product hero image" },
            },
          ],
          placeholder: "Add product introduction",
        },
      ],
    },
    {
      id: "features-slide",
      name: "Key Features",
      description: "Highlight main features",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "features-section",
          name: "Features",
          allowedBlockTypes: ["heading", "stat-grid", "bullet-list", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Key Features", level: 1 },
            },
            {
              type: "stat-grid",
              content: { 
                stats: [
                  { value: "Real-time", label: "Measurements" },
                  { value: "Non-invasive", label: "Installation" },
                  { value: "Zero", label: "Maintenance" },
                ] 
              },
            },
          ],
          placeholder: "Add key features",
        },
      ],
    },
    {
      id: "demo-slide",
      name: "Live Demo",
      description: "Show the product in action",
      background: { type: "solid", value: "hsl(220 15% 20%)" },
      sections: [
        {
          id: "demo-section",
          name: "Demo Area",
          allowedBlockTypes: ["heading", "image", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Live Demonstration", level: 1 },
            },
            {
              type: "paragraph",
              content: { text: "📍 Demo Point: [Describe what you'll show]" },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Demo instructions",
        },
      ],
    },
    {
      id: "comparison-slide",
      name: "Comparison",
      description: "Compare with alternatives",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "comparison-section",
          name: "Comparison",
          allowedBlockTypes: ["heading", "spec-table", "comparison", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Why Choose Us?", level: 1 },
            },
            {
              type: "spec-table",
              content: { 
                specs: [
                  { label: "Traditional Method", value: "Our Solution" },
                  { label: "Manual sampling", value: "Continuous monitoring" },
                  { label: "Delayed results", value: "Real-time data" },
                  { label: "Lab costs", value: "Zero lab fees" },
                ] 
              },
            },
          ],
          placeholder: "Add comparison",
        },
      ],
    },
    {
      id: "testimonial-slide",
      name: "Customer Success",
      description: "Social proof and testimonials",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "testimonial-section",
          name: "Testimonial",
          allowedBlockTypes: ["heading", "quote", "stat-grid"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "What Our Customers Say", level: 1 },
            },
            {
              type: "quote",
              content: { 
                quote: { 
                  text: "This solution transformed our process control...", 
                  author: "Process Engineer",
                  role: "Mining Company",
                } 
              },
            },
          ],
          placeholder: "Add testimonial",
        },
      ],
    },
    {
      id: "trial-slide",
      name: "Try It Now",
      description: "Encourage trial or next step",
      background: { 
        type: "gradient", 
        value: "linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(85 60% 45%) 100%)" 
      },
      sections: [
        {
          id: "trial-section",
          name: "Call to Action",
          allowedBlockTypes: ["heading", "paragraph", "cta"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Start Your Free Trial", level: 1 },
              style: { alignment: "center" },
            },
            {
              type: "cta",
              content: { 
                cta: { 
                  text: "Experience the difference for yourself", 
                  buttonLabel: "Request Trial",
                  secondaryButtonLabel: "Download Brochure",
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
    tags: ["demo", "product", "sales"],
  },
  isCustomizable: true,
  minPages: 4,
};
