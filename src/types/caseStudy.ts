// Comprehensive Case Study Types for 10-Section Structure

export interface ExecutiveSnapshot {
  customerName: string;
  site: string;
  country: string;
  application: string;
  measurementChallenge: string;
  solutionDeployed: string;
  keyOutcomes: string[];
  status: "trial" | "installed" | "standardized" | "rollout_planned";
}

export interface ProcessContext {
  measurementLocation: string;
  whyItMatters: string;
  consequencesOfError: string;
}

export interface RealProblem {
  operationalRisk: string;
  processInstability: string;
  maintenanceBurden: string;
  statusQuoIssue: string;
}

export interface SuccessCriteria {
  definition: string;
  comparisonBasis: string;
  failureConditions: string;
  targets: string[];
}

export interface SolutionArchitecture {
  product: "SDM" | "SDM_ECO" | "SDM_4";
  installationType: "wafer" | "spool" | "clamp_in";
  pipeSize: string;
  pipeMaterial: string;
  measurementRange: string;
  supportingInstruments: string[];
}

export interface Commissioning {
  comparisonMethods: string[];
  calibrationApproach: string;
  testDuration: string;
  edgeCasesTested: string[];
}

export interface TechnicalResults {
  accuracy: string;
  stability: string;
  responseTime: string;
  repeatability: string;
}

export interface BusinessImpact {
  impacts: string[];
}

export interface CustomerVoice {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface WhyThisWorked {
  fitExplanation: string;
  successConditions: string[];
  cautions: string[];
}

export interface WhatsNext {
  futureIntent: string;
  relatedApplications: string[];
  callToAction: string;
}

export interface SuggestedAssets {
  imageryStyle: "field" | "lab" | "mixed";
  imageryPrompts: string[];
  recommendedGraphs: Array<{
    type: "comparison_bar" | "timeline" | "before_after" | "accuracy_scatter";
    description: string;
    dataPoints: string;
  }>;
  iconRecommendations: string[];
}

export interface ComprehensiveCaseStudy {
  // Section 1: Executive Snapshot
  executiveSnapshot: ExecutiveSnapshot;
  
  // Section 2: Process Context
  processContext: ProcessContext;
  
  // Section 3: The Real Problem
  realProblem: RealProblem;
  
  // Section 4: Success Criteria
  successCriteria: SuccessCriteria;
  
  // Section 5: Solution Architecture
  solutionArchitecture: SolutionArchitecture;
  
  // Section 6: Commissioning & Validation
  commissioning: Commissioning;
  
  // Section 7a: Technical Results
  technicalResults: TechnicalResults;
  
  // Section 7b: Operational & Business Impact
  businessImpact: BusinessImpact;
  
  // Section 8: Customer Voice
  customerVoice: CustomerVoice;
  
  // Section 9: Why This Worked
  whyThisWorked: WhyThisWorked;
  
  // Section 10: What's Next
  whatsNext: WhatsNext;
  
  // AI-suggested assets
  suggestedAssets?: SuggestedAssets;
}

// Step configuration for wizard
export const WIZARD_STEPS = [
  { id: 1, title: "Executive Snapshot", description: "The 'Why should I care?'" },
  { id: 2, title: "Process Context", description: "What's actually happening" },
  { id: 3, title: "The Real Problem", description: "Not just 'accuracy'" },
  { id: 4, title: "Success Criteria", description: "How customer judged you" },
  { id: 5, title: "Solution Architecture", description: "What was implemented" },
  { id: 6, title: "Commissioning", description: "Proof, not claims" },
  { id: 7, title: "Results", description: "Technical & business impact" },
  { id: 8, title: "Customer Voice", description: "Mandatory quote" },
  { id: 9, title: "Why This Worked", description: "Transferable insight" },
  { id: 10, title: "What's Next", description: "Call to action" },
] as const;

// Industry options
export const INDUSTRIES = [
  { value: "mining", label: "Mining" },
  { value: "dredging", label: "Dredging" },
  { value: "wastewater", label: "Wastewater" },
  { value: "semiconductor", label: "Semiconductor" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "chemical", label: "Chemical Processing" },
  { value: "brewing", label: "Brewing" },
  { value: "paper_pulp", label: "Paper & Pulp" },
  { value: "alumina", label: "Alumina Refining" },
  { value: "power", label: "Power Generation" },
  { value: "separation", label: "Separation Technology" },
] as const;

// Application types based on industry
export const APPLICATIONS = [
  "Thickener underflow",
  "Slurry transfer",
  "Tailings management",
  "Centrifuge feed",
  "Mud density measurement",
  "Process water monitoring",
  "Chemical dosing control",
  "Product quality measurement",
  "Waste stream management",
  "Feed density control",
] as const;

// Common challenges
export const COMMON_CHALLENGES = [
  { id: "nuclear_safety", label: "Safety/radiation concerns (nuclear replacement)" },
  { id: "regulatory", label: "Regulatory/permit issues" },
  { id: "scaling", label: "Scaling/fouling problems" },
  { id: "inaccuracy", label: "Inaccurate readings from existing equipment" },
  { id: "manual_sampling", label: "Manual sampling inefficiency" },
  { id: "temperature", label: "Temperature fluctuations affecting measurement" },
  { id: "process_blind", label: "Process blind spots / lack of visibility" },
  { id: "maintenance", label: "High maintenance burden" },
  { id: "downtime", label: "Unplanned downtime" },
] as const;

// Comparison methods
export const COMPARISON_METHODS = [
  "Nuclear density gauge",
  "Coriolis meter",
  "Lab samples",
  "Manual sampling",
  "Weigh scale",
] as const;

// Edge cases
export const EDGE_CASES = [
  "Startup conditions",
  "Water flush cycles",
  "Temperature swings",
  "High solids concentration",
  "Low flow conditions",
  "Air entrainment",
  "Process upsets",
] as const;

// Status options
export const STATUS_OPTIONS = [
  { value: "trial", label: "Trial Phase" },
  { value: "installed", label: "Installed & Operational" },
  { value: "standardized", label: "Standardized Across Site" },
  { value: "rollout_planned", label: "Rollout Planned" },
] as const;

// Initial empty case study
export const EMPTY_CASE_STUDY: ComprehensiveCaseStudy = {
  executiveSnapshot: {
    customerName: "",
    site: "",
    country: "",
    application: "",
    measurementChallenge: "",
    solutionDeployed: "",
    keyOutcomes: [""],
    status: "trial",
  },
  processContext: {
    measurementLocation: "",
    whyItMatters: "",
    consequencesOfError: "",
  },
  realProblem: {
    operationalRisk: "",
    processInstability: "",
    maintenanceBurden: "",
    statusQuoIssue: "",
  },
  successCriteria: {
    definition: "",
    comparisonBasis: "",
    failureConditions: "",
    targets: [""],
  },
  solutionArchitecture: {
    product: "SDM_ECO",
    installationType: "spool",
    pipeSize: "",
    pipeMaterial: "",
    measurementRange: "",
    supportingInstruments: [],
  },
  commissioning: {
    comparisonMethods: [],
    calibrationApproach: "",
    testDuration: "",
    edgeCasesTested: [],
  },
  technicalResults: {
    accuracy: "",
    stability: "",
    responseTime: "",
    repeatability: "",
  },
  businessImpact: {
    impacts: [""],
  },
  customerVoice: {
    quote: "",
    name: "",
    role: "",
    company: "",
  },
  whyThisWorked: {
    fitExplanation: "",
    successConditions: [""],
    cautions: [""],
  },
  whatsNext: {
    futureIntent: "",
    relatedApplications: [],
    callToAction: "",
  },
};
