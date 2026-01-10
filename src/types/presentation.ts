// Re-export shared types from the unified document system
import type {
  BlockType as _BlockType,
  StatContent as _StatContent,
  ChartBlockData as _ChartBlockData,
  SpecRow as _SpecRow,
  IconItem as _IconItem,
  QuoteContent as _QuoteContent,
  CalloutContent as _CalloutContent,
  CTAContent as _CTAContent,
  ComparisonContent as _ComparisonContent,
  BlockContent as _BlockContent,
  BlockStyle as _BlockStyle,
  Block as _Block,
} from "./document";

import { BLOCK_TEMPLATES as _BLOCK_TEMPLATES } from "./document";

// Re-export for use within this module and by consumers
export type BlockType = _BlockType;
export type StatContent = _StatContent;
export type ChartBlockData = _ChartBlockData;
export type SpecRow = _SpecRow;
export type IconItem = _IconItem;
export type QuoteContent = _QuoteContent;
export type CalloutContent = _CalloutContent;
export type CTAContent = _CTAContent;
export type ComparisonContent = _ComparisonContent;
export type BlockContent = _BlockContent;
export type BlockStyle = _BlockStyle;
export type Block = _Block;
export const BLOCK_TEMPLATES = _BLOCK_TEMPLATES;

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