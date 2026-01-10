import { DocumentTemplate } from "@/types/template";

export const technicalOverviewTemplate: DocumentTemplate = {
  id: "presentation-technical-overview",
  name: "Technical Overview",
  description: "Deep-dive into product specifications and technical capabilities",
  category: "technical",
  documentType: "presentation",
  pages: [
    {
      id: "title-slide",
      name: "Title Slide",
      description: "Technical presentation title",
      background: { 
        type: "solid", 
        value: "hsl(225 40% 10%)" 
      },
      sections: [
        {
          id: "title-section",
          name: "Title",
          allowedBlockTypes: ["heading", "subheading", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Technical Overview", level: 1 },
              style: { alignment: "center" },
            },
            {
              type: "subheading",
              content: { text: "Product Name / Model Number", level: 2 },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Add technical title",
        },
      ],
    },
    {
      id: "overview-slide",
      name: "System Overview",
      description: "High-level system architecture",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "overview-section",
          name: "Architecture",
          allowedBlockTypes: ["heading", "paragraph", "image", "bullet-list"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "System Architecture", level: 1 },
            },
            {
              type: "image",
              content: { imageUrl: "", imageAlt: "System diagram" },
            },
          ],
          placeholder: "Add system overview diagram",
        },
      ],
    },
    {
      id: "specs-slide",
      name: "Specifications",
      description: "Detailed technical specifications",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "specs-section",
          name: "Technical Specs",
          allowedBlockTypes: ["heading", "spec-table", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Technical Specifications", level: 1 },
            },
            {
              type: "spec-table",
              content: { 
                specs: [
                  { label: "Measurement Range", value: "0-70% solids" },
                  { label: "Accuracy", value: "±0.5%" },
                  { label: "Response Time", value: "<1 second" },
                  { label: "Operating Temperature", value: "-20°C to +60°C" },
                  { label: "Protection Class", value: "IP68" },
                ] 
              },
            },
          ],
          placeholder: "Add specifications table",
        },
      ],
    },
    {
      id: "performance-slide",
      name: "Performance Data",
      description: "Charts and performance metrics",
      background: { type: "solid", value: "hsl(220 15% 20%)" },
      sections: [
        {
          id: "performance-section",
          name: "Performance",
          allowedBlockTypes: ["heading", "chart", "stat-grid", "paragraph"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Performance Characteristics", level: 1 },
            },
            {
              type: "chart",
              content: { 
                chart: { 
                  type: "line", 
                  title: "Accuracy vs. Concentration",
                  data: [
                    { label: "10%", value: 99.2 },
                    { label: "20%", value: 99.1 },
                    { label: "30%", value: 98.9 },
                    { label: "40%", value: 98.7 },
                    { label: "50%", value: 98.5 },
                  ],
                  yAxisLabel: "Accuracy (%)",
                } 
              },
            },
          ],
          placeholder: "Add performance charts",
        },
      ],
    },
    {
      id: "installation-slide",
      name: "Installation",
      description: "Installation requirements and guidelines",
      background: { type: "solid", value: "hsl(0 0% 100%)" },
      sections: [
        {
          id: "installation-section",
          name: "Installation Guide",
          allowedBlockTypes: ["heading", "paragraph", "bullet-list", "image", "callout"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Installation Requirements", level: 1 },
            },
            {
              type: "bullet-list",
              content: { 
                items: [
                  "Pipe diameter: 2\" - 48\"",
                  "Flow velocity: 0.3 - 10 m/s",
                  "Straight run: 5D upstream, 3D downstream",
                ] 
              },
            },
          ],
          placeholder: "Add installation details",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "1.0",
    tags: ["technical", "specifications", "engineering"],
  },
  isCustomizable: true,
  minPages: 3,
};
