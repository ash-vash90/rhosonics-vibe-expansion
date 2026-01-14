import { Users, Wrench, BookOpen, TrendingUp, LucideIcon } from "lucide-react";

/**
 * Core Brand Values - Single Source of Truth
 * 
 * These four values anchor everything Rhosonics does: 
 * how we design, write, build partnerships, and deliver impact.
 */

export interface BrandValue {
  id: string;
  icon: LucideIcon;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  keywords: string[];
}

export const BRAND_VALUES: BrandValue[] = [
  {
    id: "partnership",
    icon: Users,
    num: "01",
    title: "Built on Partnership",
    shortTitle: "Partnership",
    desc: "We build lasting relationships through openness, trust, and shared responsibility. By working closely with our customers and partners, we create solutions that perform in the long term — not just at delivery.",
    keywords: ["trust", "collaboration", "long-term", "shared responsibility", "openness"],
  },
  {
    id: "challenge",
    icon: Wrench,
    num: "02",
    title: "Engineered for Challenge",
    shortTitle: "Challenge",
    desc: "We thrive in complex, demanding environments. New applications and harsh conditions drive us to adapt, innovate, and engineer practical solutions without compromising rigor.",
    keywords: ["resilience", "innovation", "harsh environments", "adapt", "practical"],
  },
  {
    id: "expertise",
    icon: BookOpen,
    num: "03",
    title: "Expertise in Practice",
    shortTitle: "Expertise",
    desc: "We use our knowledge to improve understanding and advance the conversation. By explaining how and why, not just what, we help customers make better decisions and move their industries forward.",
    keywords: ["knowledge", "understanding", "education", "clarity", "decisions"],
  },
  {
    id: "progress",
    icon: TrendingUp,
    num: "04",
    title: "Progress That Matters",
    shortTitle: "Progress",
    desc: "We focus on progress that delivers real, measurable impact. Through better measurement and insight, we help customers operate more efficiently, responsibly and sustainably — for their business and the world around it.",
    keywords: ["measurable", "impact", "sustainability", "efficiency", "insight"],
  },
];

/**
 * Mapping: Voice Pillars → Core Values
 */
export const VOICE_VALUE_MAPPING = {
  direct: "expertise",      // Expertise enables direct communication
  educational: "expertise", // Expertise drives education
  evidenceBased: "progress", // Progress requires evidence
  partnershipFirst: "partnership", // Direct connection
} as const;

/**
 * Mapping: Design Principles → Core Values
 */
export const PRINCIPLE_VALUE_MAPPING = {
  precisionBeforeDecoration: "expertise",  // Clarity enables understanding
  expressionWithIntent: "progress",        // Every element serves impact
  engineeredNotStyled: "challenge",        // Built for real conditions
  consistencyEnablesFlexibility: "partnership", // Stable system for collaboration
} as const;

/**
 * Mapping: Visual Layers → Core Values
 */
export const VISUAL_LAYER_VALUE_MAPPING = {
  foundations: "partnership", // Stable base enables long-term collaboration
  signals: "progress",        // Highlighting what drives impact
  contextual: "challenge",    // Adapting to real environments
} as const;

/**
 * Mapping: Color Categories → Core Values
 */
export const COLOR_VALUE_MAPPING = {
  primary: "progress",      // Growth, measurable outcomes
  slate: "expertise",       // Clarity, precision
  mineral: "challenge",     // Field conditions, real environments
  obsidian: "partnership",  // Professional trust, enduring quality
} as const;

/**
 * Mapping: Imagery Categories → Core Values
 */
export const IMAGERY_VALUE_MAPPING = {
  fieldContext: "challenge",      // Real-world durability
  engineeringContext: "expertise", // Precision and clarity
} as const;

/**
 * Mapping: Industry Applications → Core Values
 */
export const INDUSTRY_VALUE_MAPPING = {
  minerals: "challenge",     // Harsh conditions
  semiconductor: "expertise", // Precision required
  dredging: "progress",      // Efficiency and impact
  wastewater: "progress",    // Sustainability
  mining: "challenge",       // Demanding environments
} as const;

/**
 * Get a value by its ID
 */
export const getValueById = (id: string): BrandValue | undefined => {
  return BRAND_VALUES.find(v => v.id === id);
};

/**
 * Get value icon component by ID
 */
export const getValueIcon = (id: string): LucideIcon | undefined => {
  return getValueById(id)?.icon;
};

export default BRAND_VALUES;
