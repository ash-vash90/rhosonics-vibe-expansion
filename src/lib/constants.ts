/**
 * Shared Constants
 * 
 * Centralized location for magic numbers, repeated values, and hoisted patterns.
 * This improves performance by avoiding repeated allocations and enables
 * consistent values across the codebase.
 * 
 * @see https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
 */

// ═══════════════════════════════════════════════════════════════
// HOISTED REGULAR EXPRESSIONS
// RegExp patterns compiled once at module load for performance
// ═══════════════════════════════════════════════════════════════

/** Matches colons for ID cleanup (used in SVG gradient IDs) */
export const COLON_REGEX = /:/g;

/** Matches whitespace for slug generation */
export const WHITESPACE_REGEX = /\s+/g;

/** Email validation pattern */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Matches non-word characters except spaces */
export const NON_WORD_REGEX = /[^\w\s]/g;

// ═══════════════════════════════════════════════════════════════
// SET-BASED LOOKUPS (O(1) instead of O(n))
// ═══════════════════════════════════════════════════════════════

/** Multi-series chart types for O(1) lookup */
export const MULTI_SERIES_CHART_TYPES = new Set([
  "grouped-bar",
  "stacked-bar", 
  "multi-line",
  "stacked-area",
  "composed",
  "radar"
]);

/** Light background gradients for O(1) lookup */
export const LIGHT_BG_GRADIENTS = new Set([
  "metal-light",
  "field",
  "eco"
]);

/** Dark background indicators for O(1) lookup */
export const DARK_BG_INDICATORS = new Set([
  "225",
  "10%",
  "20%"
]);

/** Elements to skip during HTML export */
export const ELEMENTS_TO_SKIP_SET = new Set([
  "SCRIPT",
  "STYLE",
  "LINK",
  "META",
  "NOSCRIPT"
]);

/** Allowed MIME types for content transformer */
export const ALLOWED_CONTENT_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown"
]);

// ═══════════════════════════════════════════════════════════════
// ANIMATION TIMINGS
// Consistent animation durations across the application
// ═══════════════════════════════════════════════════════════════

export const ANIMATION_DURATIONS = {
  instant: 0,
  fast: 150,
  medium: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

export const ANIMATION_EASINGS = {
  default: "power3.out",
  bounce: "elastic.out(1, 0.3)",
  smooth: "power2.inOut",
  snap: "power4.out",
} as const;

// ═══════════════════════════════════════════════════════════════
// BREAKPOINTS
// Consistent responsive breakpoints matching Tailwind defaults
// ═══════════════════════════════════════════════════════════════

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// Commonly used transformation functions
// ═══════════════════════════════════════════════════════════════

/**
 * Creates a URL-safe slug from a string
 */
export const slugify = (text: string): string => 
  text.toLowerCase().replace(WHITESPACE_REGEX, "-");

/**
 * Cleans React useId() output for use in SVG IDs
 */
export const cleanReactId = (id: string): string => 
  id.replace(COLON_REGEX, "");

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => 
  EMAIL_REGEX.test(email);

/**
 * Checks if a background value indicates a dark theme
 */
export const isDarkBackground = (value: string): boolean => {
  for (const indicator of DARK_BG_INDICATORS) {
    if (value.includes(indicator)) return true;
  }
  return false;
};
