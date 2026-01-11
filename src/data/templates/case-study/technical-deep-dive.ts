import { DocumentTemplate } from "@/types/template";

export const technicalDeepDiveTemplate: DocumentTemplate = {
  id: "case-study-technical-deep-dive",
  name: "Technical Deep-Dive",
  description: "4-page detailed technical case study with comprehensive data and analysis",
  category: "technical",
  documentType: "case-study",
  pages: [
    {
      id: "page-1",
      name: "Executive Summary",
      description: "Overview for quick understanding",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "hero-section",
          name: "Hero",
          allowedBlockTypes: ["hero-image", "image"],
          defaultBlocks: [
            {
              type: "hero-image",
              content: { 
                imageUrl: "", 
                title: "Technical Case Study",
                subtitle: "In-depth analysis of a Rhosonics implementation",
                overlayOpacity: 0.6,
                height: "240px",
                gradientDirection: "right"
              },
              style: { width: "full" },
            },
          ],
          height: "fixed",
          fixedHeight: 240,
          placeholder: "Add hero image",
        },
        {
          id: "summary-section",
          name: "Executive Summary",
          allowedBlockTypes: ["heading", "paragraph", "stat-grid"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Executive Summary", level: 1 },
            },
            {
              type: "stat-grid",
              content: { 
                stats: [
                  { value: "", label: "Primary Result" },
                  { value: "", label: "Secondary Result" },
                  { value: "", label: "ROI" },
                ] 
              },
            },
            {
              type: "paragraph",
              content: { text: "Brief overview of the challenge, solution, and key outcomes..." },
            },
          ],
          placeholder: "Add executive summary",
        },
        {
          id: "identity-section",
          name: "Company Profile",
          allowedBlockTypes: ["identity-card", "spec-table"],
          defaultBlocks: [
            {
              type: "identity-card",
              content: { identity: { company: "", location: "", industry: "", product: "" } },
            },
          ],
          placeholder: "Add company details",
        },
      ],
    },
    {
      id: "page-2",
      name: "The Challenge",
      description: "Detailed problem analysis",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "challenge-section",
          name: "The Challenge",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "callout", "image", "challenge-solution"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "The Challenge", level: 1 },
            },
            {
              type: "paragraph",
              content: { text: "Detailed description of the operational challenges..." },
            },
            {
              type: "callout",
              content: { 
                callout: { 
                  type: "warning", 
                  title: "Key Pain Points", 
                  text: "List the specific issues that needed to be addressed" 
                } 
              },
            },
          ],
          placeholder: "Describe the challenge in detail",
        },
        {
          id: "previous-approach-section",
          name: "Previous Approach",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "spec-table"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Previous Approach", level: 2 },
            },
            {
              type: "paragraph",
              content: { text: "How the customer was handling this before..." },
            },
          ],
          placeholder: "Describe previous methods",
        },
      ],
    },
    {
      id: "page-3",
      name: "The Solution",
      description: "Technical implementation details",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "solution-section",
          name: "Solution Overview",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "image"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "The Solution", level: 1 },
            },
            {
              type: "paragraph",
              content: { text: "How Rhosonics technology was applied..." },
            },
          ],
          placeholder: "Describe the solution",
        },
        {
          id: "installation-section",
          name: "Installation Details",
          allowedBlockTypes: ["heading", "image", "spec-table", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Installation & Configuration", level: 2 },
            },
            {
              type: "image",
              content: { imageUrl: "", imageAlt: "Installation diagram" },
            },
            {
              type: "spec-table",
              content: { 
                specs: [
                  { label: "Pipe Diameter", value: "" },
                  { label: "Flow Rate", value: "" },
                  { label: "Mounting", value: "" },
                ] 
              },
            },
          ],
          placeholder: "Add installation details",
        },
        {
          id: "integration-section",
          name: "System Integration",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "callout"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "System Integration", level: 2 },
            },
            {
              type: "paragraph",
              content: { text: "How the solution integrates with existing systems..." },
            },
          ],
          placeholder: "Describe integration",
        },
      ],
    },
    {
      id: "page-4",
      name: "Results & Analysis",
      description: "Performance data and customer feedback",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "results-section",
          name: "Measured Results",
          allowedBlockTypes: ["heading", "stat-grid", "results-grid", "chart"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Measured Results", level: 1 },
            },
            {
              type: "results-grid",
              content: { 
                resultsGrid: { 
                  results: [
                    "Improved measurement accuracy",
                    "Reduced manual sampling requirements", 
                    "Optimized process control",
                  ] 
                } 
              },
            },
          ],
          placeholder: "Add results metrics",
        },
        {
          id: "data-section",
          name: "Performance Data",
          allowedBlockTypes: ["chart", "image", "paragraph"],
          defaultBlocks: [
            {
              type: "chart",
              content: { 
                chart: { 
                  type: "line", 
                  title: "Performance Over Time",
                  data: [
                    { label: "Month 1", value: 75 },
                    { label: "Month 2", value: 85 },
                    { label: "Month 3", value: 92 },
                    { label: "Month 4", value: 98 },
                  ],
                } 
              },
            },
          ],
          placeholder: "Add performance charts",
        },
        {
          id: "testimonial-section",
          name: "Customer Feedback",
          allowedBlockTypes: ["quote", "paragraph"],
          defaultBlocks: [
            {
              type: "quote",
              content: { quote: { text: "Add a testimonial from the customer...", author: "Customer Name", role: "Job Title" } },
            },
          ],
          placeholder: "Add customer testimonial",
        },
        {
          id: "conclusion-section",
          name: "Conclusion",
          allowedBlockTypes: ["heading", "paragraph", "cta"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Conclusion", level: 2 },
            },
            {
              type: "cta",
              content: { 
                cta: { 
                  text: "Ready to achieve similar results?", 
                  buttonLabel: "Contact Us",
                  buttonUrl: "https://rhosonics.com/contact"
                } 
              },
            },
          ],
          placeholder: "Add conclusion and CTA",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "2.0",
    tags: ["technical", "detailed", "4-page", "engineering"],
  },
  isCustomizable: true,
  minPages: 4,
  maxPages: 6,
};
