import { useState } from "react";
import { Sparkles, Loader2, Wand2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AIContentFillProps {
  onApplyContent: (content: GeneratedCaseStudyContent) => void;
}

export interface GeneratedCaseStudyContent {
  heroTitle: string;
  heroSubtitle: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  tagline: string;
  challenge: string;
  solution: string;
  primaryStat: { value: string; label: string };
  specs: Array<{ label: string; value: string }>;
  results: string[];
  quote: { text: string; author: string; role: string };
  ctaText: string;
}

const INDUSTRY_OPTIONS = [
  "Mining & Minerals",
  "Oil & Gas",
  "Chemical Processing",
  "Water & Wastewater",
  "Food & Beverage",
  "Pharmaceutical",
  "Pulp & Paper",
  "Power Generation",
  "Other",
];

const PRODUCT_OPTIONS = [
  "Model 9690 XP",
  "Model 9680",
  "Model 9670",
  "Slurry Density Meter",
  "Concentration Meter",
  "Custom Solution",
];

export function AIContentFill({ onApplyContent }: AIContentFillProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefDescription, setBriefDescription] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [product, setProduct] = useState("");
  const [keyResult, setKeyResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!briefDescription.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a brief description of the case study",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-case-study-content-fill", {
        body: {
          briefDescription,
          company: company || undefined,
          industry: industry || undefined,
          product: product || undefined,
          keyResult: keyResult || undefined,
        },
      });

      if (error) throw error;

      if (data?.content) {
        onApplyContent(data.content);
        toast({
          title: "Content generated",
          description: "AI-generated content has been applied to your case study",
        });
        setIsExpanded(false);
      }
    } catch (error) {
      console.error("AI content generation error:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between p-4 text-left transition-colors",
              "hover:bg-muted/50",
              isExpanded && "border-b border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">AI Content Fill</h4>
                <p className="text-xs text-muted-foreground">
                  Auto-populate blocks with AI-generated content
                </p>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {/* Main Description */}
            <div className="space-y-2">
              <Label htmlFor="brief-description" className="text-sm font-medium">
                Brief Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="brief-description"
                placeholder="Describe the case study in 2-3 sentences. E.g., 'A mining company in Australia needed real-time slurry density monitoring for their iron ore processing. They achieved 99% accuracy and reduced manual sampling by 90%.'"
                value={briefDescription}
                onChange={(e) => setBriefDescription(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                The more detail you provide, the better the generated content
              </p>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm">
                  Company Name
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., Rio Tinto"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm">
                  Industry
                </Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product" className="text-sm">
                  Rhosonics Product
                </Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="key-result" className="text-sm">
                  Key Result
                </Label>
                <Input
                  id="key-result"
                  placeholder="e.g., 40% cost reduction"
                  value={keyResult}
                  onChange={(e) => setKeyResult(e.target.value)}
                />
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !briefDescription.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Content will be applied to all empty blocks in your case study
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
