// Block Types for inline editing
export type BlockType =
  | "heading"
  | "subheading"
  | "paragraph"
  | "bullet-list"
  | "numbered-list"
  | "stat-card"
  | "stat-grid"
  | "image"
  | "chart"
  | "spec-table"
  | "quote"
  | "logo-strip"
  | "divider"
  | "callout"
  | "comparison"
  | "icon-grid"
  | "cta";

// Stat content for stat blocks
export interface StatContent {
  value: string;
  label: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}

// Chart data for chart blocks
export interface ChartBlockData {
  type: "bar" | "line" | "area" | "donut" | "gauge";
  title: string;
  data: { label: string; value: number; color?: string }[];
  showLegend?: boolean;
  yAxisLabel?: string;
}

// Spec table row
export interface SpecRow {
  label: string;
  value: string;
}

// Icon item for icon grid
export interface IconItem {
  icon: string;
  title: string;
  description?: string;
}

// Quote content
export interface QuoteContent {
  text: string;
  author: string;
  role?: string;
  company?: string;
}

// Callout content
export interface CalloutContent {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  text: string;
}

// CTA content
export interface CTAContent {
  text: string;
  buttonLabel: string;
  buttonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
}

// Comparison content
export interface ComparisonContent {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}

// Block content union type
export interface BlockContent {
  // Text blocks
  text?: string;
  items?: string[];
  level?: 1 | 2 | 3;
  
  // Stat blocks
  stat?: StatContent;
  stats?: StatContent[];
  
  // Chart block
  chart?: ChartBlockData;
  
  // Image block
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  
  // Spec table
  specs?: SpecRow[];
  
  // Quote
  quote?: QuoteContent;
  
  // Logo strip
  logos?: { url: string; alt: string }[];
  
  // Callout
  callout?: CalloutContent;
  
  // Icon grid
  icons?: IconItem[];
  
  // CTA
  cta?: CTAContent;
  
  // Comparison
  comparison?: ComparisonContent;
  
  // Divider
  dividerStyle?: "line" | "wave" | "dots" | "gradient";
}

// Block style overrides
export interface BlockStyle {
  alignment?: "left" | "center" | "right";
  color?: string;
  backgroundColor?: string;
  padding?: "none" | "sm" | "md" | "lg";
  width?: "full" | "wide" | "medium" | "narrow";
}

// Individual block
export interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
  style?: BlockStyle;
}

// Slide background options
export interface SlideBackground {
  type: "solid" | "gradient" | "image" | "pattern";
  value: string;
  overlay?: "none" | "dark" | "light";
}

// Slide transition types
export type SlideTransition = "none" | "fade" | "slide" | "zoom" | "flip";

export const TRANSITION_PRESETS: { value: SlideTransition; label: string; description: string }[] = [
  { value: "none", label: "None", description: "Instant transition" },
  { value: "fade", label: "Fade", description: "Smooth fade in/out" },
  { value: "slide", label: "Slide", description: "Slide from right" },
  { value: "zoom", label: "Zoom", description: "Zoom in/out effect" },
  { value: "flip", label: "Flip", description: "3D flip effect" },
];

// Pre-defined background presets
export const BACKGROUND_PRESETS: { name: string; background: SlideBackground }[] = [
  { name: "White", background: { type: "solid", value: "hsl(0 0% 100%)" } },
  { name: "Obsidian", background: { type: "solid", value: "hsl(225 40% 10%)" } },
  { name: "Slate", background: { type: "solid", value: "hsl(220 15% 20%)" } },
  { name: "Brand Gradient", background: { type: "gradient", value: "linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(85 60% 45%) 100%)" } },
  { name: "Dark Gradient", background: { type: "gradient", value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" } },
  { name: "Earth Gradient", background: { type: "gradient", value: "linear-gradient(135deg, hsl(42 40% 35%) 0%, hsl(42 30% 50%) 100%)" } },
];

// Slide timing data for rehearsal mode
export interface SlideTimingData {
  slideId: string;
  duration: number; // seconds spent on this slide
}

// Rehearsal session data
export interface RehearsalSession {
  id: string;
  startedAt: string;
  endedAt?: string;
  totalDuration: number;
  slideTimings: SlideTimingData[];
}

// Individual slide
export interface Slide {
  id: string;
  blocks: Block[];
  background: SlideBackground;
  transition?: SlideTransition;
  notes?: string;
  targetDuration?: number; // seconds - target time for this slide
}

// Presentation theme
export interface PresentationTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fonts: {
    heading: string;
    body: string;
    data: string;
  };
}

// Default Rhosonics theme
export const DEFAULT_THEME: PresentationTheme = {
  colors: {
    primary: "hsl(125 50% 40%)",      // Rhosonics Green
    secondary: "hsl(225 40% 10%)",    // Obsidian
    accent: "hsl(42 40% 40%)",        // Earth tone
    background: "hsl(0 0% 100%)",
    foreground: "hsl(225 40% 10%)",
  },
  fonts: {
    heading: "font-logo",
    body: "font-ui",
    data: "font-data",
  },
};

// Full presentation
export interface Presentation {
  id: string;
  name: string;
  slides: Slide[];
  theme: PresentationTheme;
  aspectRatio: "16:9" | "4:3";
  metadata?: {
    author?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

// Helper to create empty slide
export const createEmptySlide = (): Slide => ({
  id: crypto.randomUUID(),
  blocks: [
    {
      id: crypto.randomUUID(),
      type: "heading",
      content: { text: "New Slide", level: 1 },
    },
  ],
  background: { type: "solid", value: "hsl(0 0% 100%)" },
});

// Helper to create empty presentation
export const createEmptyPresentation = (): Presentation => ({
  id: crypto.randomUUID(),
  name: "Untitled Presentation",
  slides: [
    {
      id: crypto.randomUUID(),
      blocks: [
        {
          id: crypto.randomUUID(),
          type: "heading",
          content: { text: "Presentation Title", level: 1 },
          style: { alignment: "center" },
        },
        {
          id: crypto.randomUUID(),
          type: "subheading",
          content: { text: "Add your subtitle here" },
          style: { alignment: "center" },
        },
      ],
      background: { type: "gradient", value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" },
    },
  ],
  theme: DEFAULT_THEME,
  aspectRatio: "16:9",
});

// Block templates for adding new blocks
export const BLOCK_TEMPLATES: { type: BlockType; label: string; icon: string; defaultContent: BlockContent }[] = [
  { type: "heading", label: "Heading", icon: "Type", defaultContent: { text: "Heading", level: 1 } },
  { type: "subheading", label: "Subheading", icon: "Type", defaultContent: { text: "Subheading", level: 2 } },
  { type: "paragraph", label: "Paragraph", icon: "AlignLeft", defaultContent: { text: "Add your text here..." } },
  { type: "bullet-list", label: "Bullet List", icon: "List", defaultContent: { items: ["First item", "Second item", "Third item"] } },
  { type: "stat-card", label: "Stat Card", icon: "TrendingUp", defaultContent: { stat: { value: "99%", label: "Accuracy" } } },
  { type: "stat-grid", label: "Stat Grid", icon: "LayoutGrid", defaultContent: { stats: [{ value: "50+", label: "Customers" }, { value: "99%", label: "Uptime" }, { value: "24/7", label: "Support" }] } },
  { type: "image", label: "Image", icon: "Image", defaultContent: { imageUrl: "", imageAlt: "Image description" } },
  { type: "chart", label: "Chart", icon: "BarChart3", defaultContent: { chart: { type: "bar", title: "Chart Title", data: [{ label: "A", value: 30 }, { label: "B", value: 50 }, { label: "C", value: 20 }] } } },
  { type: "spec-table", label: "Spec Table", icon: "Table", defaultContent: { specs: [{ label: "Spec 1", value: "Value 1" }, { label: "Spec 2", value: "Value 2" }] } },
  { type: "quote", label: "Quote", icon: "Quote", defaultContent: { quote: { text: "Quote text here", author: "Author Name", role: "Role" } } },
  { type: "callout", label: "Callout", icon: "AlertCircle", defaultContent: { callout: { type: "info", title: "Note", text: "Important information here" } } },
  { type: "divider", label: "Divider", icon: "Minus", defaultContent: { dividerStyle: "line" } },
  { type: "cta", label: "Call to Action", icon: "MousePointer", defaultContent: { cta: { text: "Ready to get started?", buttonLabel: "Contact Us" } } },
];