import { DocumentTemplate } from "@/types/template";

export const blankPresentationTemplate: DocumentTemplate = {
  id: "presentation-blank",
  name: "Blank Presentation",
  description: "Start from scratch with a clean slate",
  category: "general",
  documentType: "presentation",
  pages: [
    {
      id: "title-slide",
      name: "Title Slide",
      description: "Opening slide with title and subtitle",
      background: { 
        type: "gradient", 
        value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" 
      },
      sections: [
        {
          id: "title-section",
          name: "Title",
          allowedBlockTypes: ["heading", "subheading", "paragraph", "image"],
          defaultBlocks: [
            {
              type: "heading",
              content: { text: "Presentation Title", level: 1 },
              style: { alignment: "center" },
            },
            {
              type: "subheading",
              content: { text: "Add your subtitle here", level: 2 },
              style: { alignment: "center" },
            },
          ],
          placeholder: "Click to add title",
        },
      ],
    },
  ],
  metadata: {
    author: "Rhosonics",
    version: "1.0",
    tags: ["blank", "starter"],
  },
  isCustomizable: true,
};
