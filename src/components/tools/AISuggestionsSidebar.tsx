import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, Loader2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { WIZARD_STEPS } from "@/types/caseStudy";
import type { ComprehensiveCaseStudy } from "@/types/caseStudy";

interface AISuggestionsSidebarProps {
  currentStep: number;
  caseStudyData: ComprehensiveCaseStudy;
  onApplySuggestion?: (suggestion: string, field: string) => void;
}

// Static tips for each step when AI is loading or unavailable
const STATIC_TIPS: Record<number, string[]> = {
  1: [
    "Be specific with the site name - include location details",
    "Application should describe the measurement point, not the industry",
    "Keep the challenge to one clear sentence",
    "Include quantified outcomes where possible (%, time saved, etc.)",
  ],
  2: [
    "Explain WHERE in the process the measurement sits",
    "Focus on WHY this measurement matters at that specific point",
    "Describe consequences when density readings are wrong",
    "Rule: If you remove this section, readers should lose understanding",
  ],
  3: [
    "Avoid: 'Needed accurate measurement'",
    "Prefer: 'Operators lacked confidence, leading to conservative setpoints'",
    "Frame problems in business/operational terms, not just technical",
    "Include hidden costs (maintenance, downtime, regulatory burden)",
  ],
  4: [
    "This section is CRITICAL and often missing from case studies",
    "Explicitly state what 'success' meant to the customer",
    "Include what they were comparing against",
    "Define what would have caused failure",
  ],
  5: [
    "Include pipe size in both metric (DN) and imperial (inches)",
    "Specify pipe material - it affects installation approach",
    "List any supporting instruments (flow meters, temperature sensors)",
    "Note any special adaptations or custom solutions",
  ],
  6: [
    "This is where your credibility lives",
    "Specify comparison methods used (nuclear, Coriolis, lab samples)",
    "Include test duration - longer tests = more credibility",
    "List edge cases tested (startups, water flushes, temperature swings)",
  ],
  7: [
    "Split results into Technical AND Business Impact",
    "Technical: precision, stability, response time, repeatability",
    "Business: reduced sampling, improved stability, lower maintenance",
    "If you cannot quantify, describe what changed in daily operation",
  ],
  8: [
    "Customer quote is MANDATORY - it massively increases trust",
    "Best sources: Process engineer, Maintenance lead, Operations manager",
    "Ask: 'What was different after installation?'",
    "Ask: 'What would you miss if it was removed?'",
  ],
  9: [
    "Explain why this application was a good fit for SDM/SDM ECO",
    "Include conditions that made it successful",
    "Add cautions - where should customers be careful?",
    "This turns the case study into a buyer education tool",
  ],
  10: [
    "End with intent, not just contact details",
    "Examples: 'Following this trial, the site plans to...'",
    "Link to related applications they might explore",
    "Invite a feasibility discussion",
  ],
};

// Terminology checker warnings
const TERMINOLOGY_WARNINGS = [
  { wrong: "accuracy", correct: "precision", context: "Use 'precision' not 'accuracy'" },
  { wrong: "monitoring", correct: "measurement", context: "Use 'measurement' not 'monitoring'" },
  { wrong: "install", correct: "deploy", context: "Use 'deploy' not 'install'" },
  { wrong: "improve", correct: "optimize", context: "Use 'optimize' not 'improve'" },
  { wrong: "live", correct: "real-time", context: "Use 'real-time' not 'live'" },
];

export const AISuggestionsSidebar = ({ 
  currentStep, 
  caseStudyData,
  onApplySuggestion 
}: AISuggestionsSidebarProps) => {
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [terminologyWarnings, setTerminologyWarnings] = useState<string[]>([]);

  // Check for terminology issues
  useEffect(() => {
    const checkTerminology = () => {
      const warnings: string[] = [];
      const dataString = JSON.stringify(caseStudyData).toLowerCase();
      
      TERMINOLOGY_WARNINGS.forEach(({ wrong, context }) => {
        if (dataString.includes(wrong)) {
          warnings.push(context);
        }
      });
      
      setTerminologyWarnings(warnings);
    };
    
    checkTerminology();
  }, [caseStudyData]);

  // Fetch AI suggestions when step changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Only fetch AI suggestions after step 3 when we have enough context
      if (currentStep < 3) {
        setAiSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-case-study-suggestions", {
          body: {
            currentStep,
            caseStudyData,
            stepTitle: WIZARD_STEPS[currentStep - 1]?.title,
          },
        });

        if (!error && data?.suggestions) {
          setAiSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error("Failed to fetch AI suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the fetch
    const timer = setTimeout(fetchSuggestions, 1000);
    return () => clearTimeout(timer);
  }, [currentStep, caseStudyData]);

  const staticTips = STATIC_TIPS[currentStep] || [];
  const stepInfo = WIZARD_STEPS[currentStep - 1];

  return (
    <div className="border border-border rounded-lg bg-muted/30 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-3 bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="font-ui text-sm font-medium text-foreground">AI Guidance</span>
          {isLoading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Current Step Context */}
          <div className="pb-3 border-b border-border">
            <p className="font-mono text-xs text-muted-foreground">
              Step {currentStep}: {stepInfo?.title}
            </p>
            <p className="font-mono text-xs text-primary mt-1">
              {stepInfo?.description}
            </p>
          </div>

          {/* Terminology Warnings */}
          {terminologyWarnings.length > 0 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="font-mono text-xs font-semibold text-destructive mb-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                Terminology Check
              </p>
              <ul className="space-y-1">
                {terminologyWarnings.map((warning, idx) => (
                  <li key={idx} className="font-mono text-xs text-destructive/80">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                <p className="font-mono text-xs font-semibold text-foreground">AI Suggestions</p>
              </div>
              <ul className="space-y-2">
                {aiSuggestions.map((suggestion, idx) => (
                  <li 
                    key={idx} 
                    className="p-2 bg-primary/5 border border-primary/10 rounded text-xs text-foreground/80 font-mono cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => onApplySuggestion?.(suggestion, "")}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Static Tips */}
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold text-foreground/70">Writing Tips</p>
            <ul className="space-y-1.5">
              {staticTips.map((tip, idx) => (
                <li key={idx} className="font-mono text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress Indicator */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-muted-foreground">Progress</span>
              <span className="font-mono text-xs text-primary">{currentStep}/10</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
