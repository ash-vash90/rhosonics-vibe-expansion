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
  dredging: "innovation",
  wastewater: "sustainability",
  mining: "collaboration",
} as const;

// ---------------------------------------------------------------
// Design principles — derived from values + vision/mission.
// One principle per canonical value. Decision tools, not style rules.
// Modelled on Apple HIG: one-word name, bold imperative, essence,
// 2–3 applicable rules. Approved June 2026.
// ---------------------------------------------------------------

export interface BrandPrinciple {
  id: string;
  num: string;
  name: string;
  imperative: string;
  essence: string;
  apply: string[];
  valueId: string;
}

export const BRAND_PRINCIPLES: BrandPrinciple[] = [
  {
    id: "purpose",
    num: "01",
    name: "Purpose",
    imperative: "Measure what matters.",
    essence:
      "Every element exists to make something measurable, controllable, or optimizable. If it doesn't, cut it.",
    apply: [
      "Lead with the measurement, not the marketing.",
      "Name the quantity (g/cm³, kg/h, %solids) before the brand.",
      "If a section can't answer \"what does this help measure?\", it doesn't ship.",
    ],
    valueId: "expertise",
  },
  {
    id: "evidence",
    num: "02",
    name: "Evidence",
    imperative: "Show the number, name the method.",
    essence:
      "Claims are cheap. Verified numbers, cited methods, and named engineers are not.",
    apply: [
      "Every metric carries a source line — method, site, date.",
      "No round-number marketing claims. No \"10× better\". No \"best-in-class\".",
      "Prefer a graph with axes over an adjective.",
    ],
    valueId: "quality",
  },
  {
    id: "partnership",
    num: "03",
    name: "Partnership",
    imperative: "Solve it with them, not at them.",
    essence:
      "Our work is co-authored with operators in the field. The brand should sound and look like that — never one-sided.",
    apply: [
      "Speak with partners by name; quote them verbatim where possible.",
      "Case studies are joint stories, not testimonials.",
      "Replace \"we deliver\" with \"we built this with…\".",
    ],
    valueId: "collaboration",
  },
  {
    id: "mechanism",
    num: "04",
    name: "Mechanism",
    imperative: "Show what's novel. Don't claim it.",
    essence:
      "\"Innovative\" is the word people use when they can't explain the mechanism. Explain the mechanism.",
    apply: [
      "Diagram the physics or the data path before naming the product.",
      "Banned words: innovative, revolutionary, next-gen, cutting-edge.",
      "If a feature is new, say what changed and why it matters.",
    ],
    valueId: "innovation",
  },
  {
    id: "footprint",
    num: "05",
    name: "Footprint",
    imperative: "Quantify the saving.",
    essence:
      "Sustainability is a number — kWh saved, m³ water avoided, kg of hazardous chemicals removed, nuclear sources retired. If we can't quantify it, we don't claim it.",
    apply: [
      "Green saturation is reserved for measured savings.",
      "Every eco claim cites the baseline it improves on.",
      "No vague green language (\"eco-friendly\", \"greener future\"). Numbers or silence.",
    ],
    valueId: "sustainability",
  },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------

export const getValueById = (id: string): BrandValue | undefined =>
  BRAND_VALUES.find((v) => v.id === id);

export const getValueIcon = (id: string): LucideIcon | undefined =>
  getValueById(id)?.icon;

export const getPrincipleById = (id: string): BrandPrinciple | undefined =>
  BRAND_PRINCIPLES.find((p) => p.id === id);

export default BRAND_VALUES;
