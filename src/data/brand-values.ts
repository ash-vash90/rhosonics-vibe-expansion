import { BookOpen, Users, Lightbulb, ShieldCheck, Leaf } from "@/lib/icons";
import type { LucideIcon } from "@/lib/icons";

/**
 * CANONICAL BRAND FOUNDATION
 * ---------------------------------------------------------------
 * Single source of truth. Approved by leadership, June 2026.
 * Supersedes every prior value list (Partnership / Challenge /
 * Expertise / Progress) and every prior mission/vision draft.
 *
 * Anything that references brand values, mission, or vision in
 * this codebase MUST read from this file. No copies, no drift.
 */

export const BRAND_VISION =
  "Leading the way in what can be measured, controlled, and optimized.";

export const BRAND_MISSION =
  "Advanced measurement solutions for more efficient, automated, and sustainable operations.";

// ---------------------------------------------------------------
// External values — used on every public surface
// ---------------------------------------------------------------

export interface BrandValue {
  id: string;
  icon: LucideIcon;
  num: string;
  title: string;
  shortTitle: string;
  /** Public statement, lifted verbatim from the approved draft. */
  desc: string;
  keywords: string[];
}

export const BRAND_VALUES: BrandValue[] = [
  {
    id: "expertise",
    icon: BookOpen,
    num: "01",
    title: "Expertise",
    shortTitle: "Expertise",
    desc:
      "We combine deep scientific knowledge with hands-on field experience to solve complex problems, translating real-world insights into effective, accessible solutions.",
    keywords: ["science", "field experience", "accessible", "translate", "solve"],
  },
  {
    id: "collaboration",
    icon: Users,
    num: "02",
    title: "Collaboration",
    shortTitle: "Collaboration",
    desc:
      "We work together to understand and resolve unique measurement, process and control challenges.",
    keywords: ["partnership", "together", "understand", "resolve", "unique"],
  },
  {
    id: "innovation",
    icon: Lightbulb,
    num: "03",
    title: "Innovation",
    shortTitle: "Innovation",
    desc:
      "We create novel solutions and continuously improve our products and processes.",
    keywords: ["novel", "improve", "continuous", "products", "processes"],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    num: "04",
    title: "Quality",
    shortTitle: "Quality",
    desc:
      "We deliver products that meet and exceed industrial standards. We verify our quality at every stage of our process, from design to on-site measurement.",
    keywords: ["verified", "standards", "every stage", "design", "on-site"],
  },
  {
    id: "sustainability",
    icon: Leaf,
    num: "05",
    title: "Sustainability",
    shortTitle: "Sustainability",
    desc:
      "We help reduce the environmental impact of industrial processes. Our solutions increase efficiency, lower energy demand, minimize the use of hazardous chemicals, and reduce reliance on harmful technologies.",
    keywords: ["environment", "efficiency", "energy", "non-nuclear", "impact"],
  },
];

// ---------------------------------------------------------------
// Internal values — never rendered on public pages.
// Kept here so internal tooling can read them, but flagged.
// ---------------------------------------------------------------

export interface InternalValue {
  id: string;
  title: string;
  statement: string;
  internal: true;
}

export const INTERNAL_VALUES: InternalValue[] = [
  {
    id: "collaboration",
    title: "Collaboration",
    statement:
      "We work as one team and elevate one another. We grow together, because progress happens through shared efforts.",
    internal: true,
  },
  {
    id: "quality",
    title: "Quality",
    statement:
      "We take pride in our work and uphold quality together, ensuring everything we deliver meets our standards.",
    internal: true,
  },
  {
    id: "expertise",
    title: "Expertise",
    statement:
      "We learn continuously and share insights and challenges openly. Every experience strengthens our collective expertise.",
    internal: true,
  },
  {
    id: "innovation",
    title: "Innovation",
    statement:
      "We explore new ideas, move ideas into action, and learn by doing, to continuously improve our products and processes.",
    internal: true,
  },
];

// ---------------------------------------------------------------
// Mappings — every downstream subsystem grounds itself in a value.
// IDs only. Update here, never inline.
// ---------------------------------------------------------------

export const VOICE_VALUE_MAPPING = {
  direct: "expertise",
  educational: "expertise",
  evidenceBased: "quality",
  partnershipFirst: "collaboration",
} as const;

export const PRINCIPLE_VALUE_MAPPING = {
  precisionBeforeDecoration: "quality",
  expressionWithIntent: "expertise",
  engineeredNotStyled: "innovation",
  consistencyEnablesFlexibility: "collaboration",
} as const;

export const VISUAL_LAYER_VALUE_MAPPING = {
  foundations: "quality",
  signals: "expertise",
  contextual: "collaboration",
} as const;

export const COLOR_VALUE_MAPPING = {
  primary: "sustainability", // green carries the eco signal
  slate: "expertise",
  mineral: "innovation",
  obsidian: "quality",
} as const;

export const IMAGERY_VALUE_MAPPING = {
  fieldContext: "collaboration",
  engineeringContext: "expertise",
  verification: "quality",
  ecoContext: "sustainability",
  rAndD: "innovation",
} as const;

export const INDUSTRY_VALUE_MAPPING = {
  minerals: "expertise",
  semiconductor: "quality",
  dredging: "innovation",
  wastewater: "sustainability",
  mining: "collaboration",
} as const;

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

export const getValueById = (id: string): BrandValue | undefined =>
  BRAND_VALUES.find((v) => v.id === id);

export const getValueIcon = (id: string): LucideIcon | undefined =>
  getValueById(id)?.icon;

export default BRAND_VALUES;
