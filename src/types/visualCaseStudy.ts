export interface VisualCaseStudy {
  id: string;
  
  // Identity
  company: string;
  location: string;
  industry: string;
  product: string;
  
  // Media
  heroImage: string | null;
  chartImage: string | null;
  chartData?: ChartBuilderData;
  
  // Content
  tagline: string;
  challenge: string;
  solution: string;
  
  // Results
  results: string[];
  primaryStat: {
    value: string;
    label: string;
  };
  
  // Specifications
  specs: Array<{
    label: string;
    value: string;
  }>;
  
  // Quote
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface ChartBuilderData {
  type: "bar" | "line" | "grouped-bar" | "pie" | "area" | "timeseries" | "timeseries-comparison";
  title: string;
  dataPoints: Array<{
    name: string;
    value: number;
    value2?: number;
    value3?: number;
    timestamp?: string;
  }>;
  colors: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  labels?: {
    series1?: string;
    series2?: string;
    series3?: string;
    xAxis?: string;
    yAxis?: string;
    yAxis2?: string;
  };
  background: "light" | "dark";
  // Advanced options for time-series
  timeFormat?: string;
  dualAxis?: boolean;
  showDataPoints?: boolean;
  lineSmoothing?: boolean;
}

export const createEmptyCaseStudy = (): VisualCaseStudy => ({
  id: crypto.randomUUID(),
  company: "",
  location: "",
  industry: "",
  product: "",
  heroImage: null,
  chartImage: null,
  tagline: "",
  challenge: "",
  solution: "",
  results: [""],
  primaryStat: {
    value: "",
    label: "",
  },
  specs: [{ label: "", value: "" }],
  quote: undefined,
});

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
