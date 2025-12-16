import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Image,
  BarChart3,
  Copy,
  Check,
  Sparkles,
  Camera,
  LineChart,
  PieChart,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import type { SuggestedAssets } from "@/types/caseStudy";

interface AssetSuggestionsPanelProps {
  suggestedAssets?: SuggestedAssets;
  customerName: string;
  application: string;
  onOpenImageGenerator?: (prompt: string) => void;
}

const GRAPH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  comparison_bar: BarChart3,
  timeline: TrendingUp,
  before_after: LineChart,
  accuracy_scatter: PieChart,
};

const IMAGERY_STYLE_LABELS: Record<string, { label: string; description: string }> = {
  field: { 
    label: "Field / Industrial", 
    description: "Harsh environment, durability focus, rugged equipment" 
  },
  lab: { 
    label: "Laboratory / Clean", 
    description: "Precision focus, clean processes, technical accuracy" 
  },
  mixed: { 
    label: "Mixed Environment", 
    description: "Combination of field conditions and technical precision" 
  },
};

export const AssetSuggestionsPanel = ({
  suggestedAssets,
  customerName,
  application,
  onOpenImageGenerator,
}: AssetSuggestionsPanelProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<"imagery" | "graphs" | null>("imagery");

  if (!suggestedAssets) {
    return null;
  }

  const handleCopyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      toast.success("Prompt copied to clipboard");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const styleInfo = IMAGERY_STYLE_LABELS[suggestedAssets.imageryStyle] || IMAGERY_STYLE_LABELS.mixed;

  return (
    <div className="space-y-4 border border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
      {/* Header */}
      <div className="p-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-ui font-semibold text-foreground">AI-Recommended Assets</h3>
        </div>
        <p className="font-ui text-xs text-muted-foreground mt-1">
          Visual assets tailored for {customerName} - {application}
        </p>
      </div>

      {/* Imagery Style Badge */}
      <div className="px-4">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-muted-foreground" />
          <span className="label-tech text-muted-foreground">Recommended Style:</span>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-ui">
            {styleInfo.label}
          </Badge>
        </div>
        <p className="font-ui text-xs text-muted-foreground mt-1 ml-6">
          {styleInfo.description}
        </p>
      </div>

      <div className="px-4">
        <button
          onClick={() => setExpandedSection(expandedSection === "imagery" ? null : "imagery")}
          className="w-full flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-primary" />
            <span className="font-ui text-sm font-medium text-foreground">
              Image Generation Prompts
            </span>
            <Badge variant="secondary" className="text-xs font-ui">
              {suggestedAssets.imageryPrompts?.length || 0}
            </Badge>
          </div>
          {expandedSection === "imagery" ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {expandedSection === "imagery" && suggestedAssets.imageryPrompts && (
          <div className="space-y-3 pb-4">
            {suggestedAssets.imageryPrompts.map((prompt, idx) => (
              <div
                key={idx}
                className="p-3 bg-muted/50 border border-border rounded-lg group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-ui text-xs text-foreground/80 flex-1">{prompt}</p>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleCopyPrompt(prompt, idx)}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3 h-3 text-primary" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                    {onOpenImageGenerator && (
                      <Button
                        variant="default"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => onOpenImageGenerator(prompt)}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generate
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-ui">
                    {styleInfo.label}
                  </Badge>
                  <span className="label-tech text-muted-foreground">
                    Prompt {idx + 1}
                  </span>
                </div>
              </div>
            ))}
            <p className="font-ui text-xs text-muted-foreground">
              Use these prompts in the Image Generator tool to create brand-compliant visuals.
            </p>
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => setExpandedSection(expandedSection === "graphs" ? null : "graphs")}
          className="w-full flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-lime-500" />
            <span className="font-ui text-sm font-medium text-foreground">
              Recommended Charts
            </span>
            <Badge variant="secondary" className="text-xs font-ui">
              {suggestedAssets.recommendedGraphs?.length || 0}
            </Badge>
          </div>
          {expandedSection === "graphs" ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {expandedSection === "graphs" && suggestedAssets.recommendedGraphs && (
          <div className="space-y-3">
            {suggestedAssets.recommendedGraphs.map((graph, idx) => {
              const GraphIcon = GRAPH_ICONS[graph.type] || BarChart3;
              return (
                <div
                  key={idx}
                  className="p-3 bg-lime-500/5 border border-lime-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GraphIcon className="w-4 h-4 text-lime-500" />
                    <span className="font-ui text-xs font-medium text-foreground capitalize">
                      {graph.type.replace(/_/g, " ")} Chart
                    </span>
                  </div>
                  <p className="font-ui text-xs text-foreground/80 mb-2">
                    {graph.description}
                  </p>
                  {graph.dataPoints && (
                    <div className="p-2 bg-muted/50 rounded text-xs font-data text-muted-foreground">
                      <span className="label-tech text-foreground/70">Data: </span>
                      {graph.dataPoints}
                    </div>
                  )}
                </div>
              );
            })}
            <p className="font-ui text-xs text-muted-foreground">
              Create these charts using the Chart Generator tool with brand colors.
            </p>
          </div>
        )}
      </div>

      {suggestedAssets.iconRecommendations && suggestedAssets.iconRecommendations.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="label-tech text-muted-foreground">
              Suggested Icons
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedAssets.iconRecommendations.map((icon, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-ui">
                {icon}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
