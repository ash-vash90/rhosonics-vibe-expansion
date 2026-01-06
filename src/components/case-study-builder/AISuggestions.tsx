import { useState, useCallback } from "react";
import { Sparkles, Lightbulb, BarChart3, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { VisualCaseStudy, ChartBuilderData } from "@/types/visualCaseStudy";

interface AISuggestionsProps {
  caseStudy: VisualCaseStudy;
  onApplyChallenge: (text: string) => void;
  onApplySolution: (text: string) => void;
  onApplyChartType: (chartData: ChartBuilderData) => void;
}

interface Suggestions {
  challenge?: string;
  solution?: string;
  chartRecommendation?: {
    type: ChartBuilderData["type"];
    reason: string;
  };
}

export const AISuggestions = ({
  caseStudy,
  onApplyChallenge,
  onApplySolution,
  onApplyChartType,
}: AISuggestionsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions>({});
  const [lastGenerated, setLastGenerated] = useState<string>("");

  const hasEnoughContext = caseStudy.company && caseStudy.industry && caseStudy.product;

  const generateSuggestions = useCallback(async () => {
    if (!hasEnoughContext) return;

    const contextKey = `${caseStudy.company}-${caseStudy.industry}-${caseStudy.product}-${caseStudy.tagline}`;
    if (contextKey === lastGenerated) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-case-study-content", {
        body: {
          company: caseStudy.company,
          industry: caseStudy.industry,
          product: caseStudy.product,
          tagline: caseStudy.tagline,
          existingChallenge: caseStudy.challenge,
          existingSolution: caseStudy.solution,
          results: caseStudy.results.filter(r => r),
          primaryStat: caseStudy.primaryStat,
        },
      });

      if (error) throw error;
      setSuggestions(data || {});
      setLastGenerated(contextKey);
    } catch (err) {
      console.error("Failed to generate suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [caseStudy, hasEnoughContext, lastGenerated]);

  const applyChartRecommendation = () => {
    if (!suggestions.chartRecommendation) return;
    
    const defaultChartData: ChartBuilderData = {
      type: suggestions.chartRecommendation.type,
      title: `${caseStudy.company} Performance Data`,
      dataPoints: [
        { name: "Before", value: 70 },
        { name: "After", value: 95 },
      ],
      colors: {
        primary: "#00A651",
        secondary: "#005F9E",
      },
      background: "dark",
    };
    onApplyChartType(defaultChartData);
  };

  if (!hasEnoughContext) {
    return (
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Fill in company, industry & product to get AI suggestions</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border bg-muted/30">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI Suggestions</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={generateSuggestions}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Suggestions
              </>
            )}
          </Button>

          {suggestions.challenge && (
            <SuggestionCard
              icon={<Lightbulb className="w-4 h-4" />}
              title="Challenge Suggestion"
              content={suggestions.challenge}
              onApply={() => onApplyChallenge(suggestions.challenge!)}
            />
          )}

          {suggestions.solution && (
            <SuggestionCard
              icon={<Lightbulb className="w-4 h-4" />}
              title="Solution Suggestion"
              content={suggestions.solution}
              onApply={() => onApplySolution(suggestions.solution!)}
            />
          )}

          {suggestions.chartRecommendation && (
            <SuggestionCard
              icon={<BarChart3 className="w-4 h-4" />}
              title="Recommended Chart"
              content={`${suggestions.chartRecommendation.type.replace("-", " ")} chart — ${suggestions.chartRecommendation.reason}`}
              onApply={applyChartRecommendation}
              applyLabel="Use This Chart Type"
            />
          )}
        </div>
      )}
    </div>
  );
};

interface SuggestionCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  onApply: () => void;
  applyLabel?: string;
}

const SuggestionCard = ({ icon, title, content, onApply, applyLabel = "Apply" }: SuggestionCardProps) => (
  <div className="p-3 bg-background rounded-lg border border-border space-y-2">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      {icon}
      {title}
    </div>
    <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
    <Button variant="secondary" size="sm" onClick={onApply} className="w-full">
      {applyLabel}
    </Button>
  </div>
);
