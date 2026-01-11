// ============= Unified Document Builder Type System =============
// Base types shared across all document builders (Presentations, Case Studies, etc.)

// Document Types
export type DocumentType = "presentation" | "case-study" | "whitepaper" | "proposal";

// ============= Block System (shared across all document types) =============

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
  | "cta"
  // Case study specific blocks
  | "identity-card"
  | "hero-image"
  | "results-grid"
  | "challenge-solution";

// Stat content for stat blocks
export interface StatContent {
  value: string;
  label: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
}

// Chart data for chart blocks
export interface ChartBlockData {
  type: "bar" | "line" | "area" | "donut" | "gauge" | "grouped-bar" | "pie" | "timeseries" | "timeseries-comparison";
  title: string;
  data: { label: string; value: number; value2?: number; value3?: number; color?: string; timestamp?: string }[];
  showLegend?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
  colors?: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  labels?: {
    series1?: string;
    series2?: string;
    series3?: string;
  };
  background?: "light" | "dark";
  backgroundImage?: string;
  dualAxis?: boolean;
  showDataPoints?: boolean;
  lineSmoothing?: boolean;
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

// Identity card content (for case studies)
export interface IdentityCardContent {
  company: string;
  location: string;
  industry: string;
  product: string;
}

// Challenge-Solution content (for case studies)
export interface ChallengeSolutionContent {
  challenge: string;
  solution: string;
}

// Results grid content
export interface ResultsGridContent {
  results: string[];
}

// Hero image content (for case studies)
export interface HeroImageContent {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  height?: string;
  gradientDirection?: "left" | "right" | "bottom" | "top";
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
  
  // Case study specific
  identity?: IdentityCardContent;
  challengeSolution?: ChallengeSolutionContent;
  resultsGrid?: ResultsGridContent;
  heroImage?: HeroImageContent;
  
  // Hero image direct properties (for HeroImageBlock compatibility)
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  height?: string;
  gradientDirection?: "left" | "right" | "bottom" | "top";
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

// ============= Page System =============

// Page background options
export interface PageBackground {
  type: "solid" | "gradient" | "image" | "pattern";
  value: string;
  overlay?: "none" | "dark" | "light";
}

// Page transition types
export type PageTransition = "none" | "fade" | "slide" | "zoom" | "flip";

// Individual page (called "slide" in presentations, "page" in documents)
export interface Page {
  id: string;
  blocks: Block[];
  background: PageBackground;
  transition?: PageTransition;
  notes?: string;
  targetDuration?: number; // seconds - for rehearsal mode
  templateId?: string; // Reference to page template if in template mode
}

// ============= Theme System =============

export interface DocumentTheme {
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
export const DEFAULT_THEME: DocumentTheme = {
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

// ============= Document Metadata =============

export interface DocumentMetadata {
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  version?: string;
  tags?: string[];
}

// ============= Base Document Interface =============

export interface DocumentBase {
  id: string;
  name: string;
  type: DocumentType;
  pages: Page[];
  theme: DocumentTheme;
  metadata?: DocumentMetadata;
  templateId?: string; // Reference to document template if using one
  templateMode?: "template" | "free-form"; // Current editing mode
}

// ============= Presets =============

export const TRANSITION_PRESETS: { value: PageTransition; label: string; description: string }[] = [
  { value: "none", label: "None", description: "Instant transition" },
  { value: "fade", label: "Fade", description: "Smooth fade in/out" },
  { value: "slide", label: "Slide", description: "Slide from right" },
  { value: "zoom", label: "Zoom", description: "Zoom in/out effect" },
  { value: "flip", label: "Flip", description: "3D flip effect" },
];

export const BACKGROUND_PRESETS: { name: string; background: PageBackground }[] = [
  { name: "White", background: { type: "solid", value: "hsl(0 0% 100%)" } },
  { name: "Obsidian", background: { type: "solid", value: "hsl(225 40% 10%)" } },
  { name: "Slate", background: { type: "solid", value: "hsl(220 15% 20%)" } },
  { name: "Brand Gradient", background: { type: "gradient", value: "linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(85 60% 45%) 100%)" } },
  { name: "Dark Gradient", background: { type: "gradient", value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" } },
  { name: "Earth Gradient", background: { type: "gradient", value: "linear-gradient(135deg, hsl(42 40% 35%) 0%, hsl(42 30% 50%) 100%)" } },
];

// ============= Block Templates =============

export const BLOCK_TEMPLATES: { type: BlockType; label: string; icon: string; defaultContent: BlockContent; category: "text" | "data" | "media" | "layout" | "case-study" }[] = [
  // Text blocks
  { type: "heading", label: "Heading", icon: "Type", defaultContent: { text: "Heading", level: 1 }, category: "text" },
  { type: "subheading", label: "Subheading", icon: "Type", defaultContent: { text: "Subheading", level: 2 }, category: "text" },
  { type: "paragraph", label: "Paragraph", icon: "AlignLeft", defaultContent: { text: "Add your text here..." }, category: "text" },
  { type: "bullet-list", label: "Bullet List", icon: "List", defaultContent: { items: ["First item", "Second item", "Third item"] }, category: "text" },
  
  // Data blocks
  { type: "stat-card", label: "Stat Card", icon: "TrendingUp", defaultContent: { stat: { value: "99%", label: "Accuracy" } }, category: "data" },
  { type: "stat-grid", label: "Stat Grid", icon: "LayoutGrid", defaultContent: { stats: [{ value: "50+", label: "Customers" }, { value: "99%", label: "Uptime" }, { value: "24/7", label: "Support" }] }, category: "data" },
  { type: "chart", label: "Chart", icon: "BarChart3", defaultContent: { chart: { type: "bar", title: "Chart Title", data: [{ label: "A", value: 30 }, { label: "B", value: 50 }, { label: "C", value: 20 }] } }, category: "data" },
  { type: "spec-table", label: "Spec Table", icon: "Table", defaultContent: { specs: [{ label: "Spec 1", value: "Value 1" }, { label: "Spec 2", value: "Value 2" }] }, category: "data" },
  
  // Media blocks
  { type: "image", label: "Image", icon: "Image", defaultContent: { imageUrl: "", imageAlt: "Image description" }, category: "media" },
  { type: "quote", label: "Quote", icon: "Quote", defaultContent: { quote: { text: "Quote text here", author: "Author Name", role: "Role" } }, category: "media" },
  
  // Layout blocks
  { type: "callout", label: "Callout", icon: "AlertCircle", defaultContent: { callout: { type: "info", title: "Note", text: "Important information here" } }, category: "layout" },
  { type: "divider", label: "Divider", icon: "Minus", defaultContent: { dividerStyle: "line" }, category: "layout" },
  { type: "cta", label: "Call to Action", icon: "MousePointer", defaultContent: { cta: { text: "Ready to get started?", buttonLabel: "Contact Us" } }, category: "layout" },
  
  // Case study specific
  { type: "hero-image", label: "Hero Image", icon: "ImagePlus", defaultContent: { imageUrl: "", title: "Hero Title", subtitle: "Hero subtitle", overlayOpacity: 0.6, height: "280px", gradientDirection: "right" }, category: "case-study" },
  { type: "identity-card", label: "Identity Card", icon: "Building2", defaultContent: { identity: { company: "", location: "", industry: "", product: "" } }, category: "case-study" },
  { type: "challenge-solution", label: "Challenge & Solution", icon: "Lightbulb", defaultContent: { challengeSolution: { challenge: "", solution: "" } }, category: "case-study" },
  { type: "results-grid", label: "Results Grid", icon: "CheckCircle", defaultContent: { resultsGrid: { results: ["Result 1", "Result 2", "Result 3"] } }, category: "case-study" },
];

// ============= Helper Functions =============

export const createEmptyPage = (background?: PageBackground): Page => ({
  id: crypto.randomUUID(),
  blocks: [
    {
      id: crypto.randomUUID(),
      type: "heading",
      content: { text: "New Page", level: 1 },
    },
  ],
  background: background || { type: "solid", value: "hsl(0 0% 100%)" },
});

export const createEmptyDocument = (type: DocumentType, name?: string): DocumentBase => ({
  id: crypto.randomUUID(),
  name: name || `Untitled ${type === "case-study" ? "Case Study" : type.charAt(0).toUpperCase() + type.slice(1)}`,
  type,
  pages: [createEmptyPage()],
  theme: DEFAULT_THEME,
  templateMode: "free-form",
});

// ============= Industry & Product Options (for case studies) =============

export const INDUSTRY_OPTIONS = [
  "Mining",
  "Minerals Processing", 
  "Food & Beverage",
  "Chemical",
  "Wastewater",
  "Oil & Gas",
  "Pharmaceutical",
  "Pulp & Paper",
] as const;

export const PRODUCT_OPTIONS = [
  "SDM ECO",
  "SDM PRO",
  "Model 9690",
  "Model 9670",
  "SDM Compact",
] as const;
