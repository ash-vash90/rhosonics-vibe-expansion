import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Loader2, FileText, Check, ChevronRight, ChevronLeft, Save, Star, Trash2, History, Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { exportCaseStudyToPDF, exportCaseStudyToWord } from "@/lib/documentExport";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const INDUSTRIES = [
  { value: "mining", label: "Mining" },
  { value: "dredging", label: "Dredging" },
  { value: "wastewater", label: "Wastewater" },
  { value: "semiconductor", label: "Semiconductor" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "chemical", label: "Chemical Processing" },
  { value: "brewing", label: "Brewing" },
  { value: "paper_pulp", label: "Paper & Pulp" },
];

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  title: string;
  description: string;
  industry: string;
  stat: string;
  statLabel: string;
  metrics: Metric[];
}

interface SavedCaseStudy extends CaseStudy {
  id: string;
  is_favorite: boolean;
  created_at: string;
}

export const CaseStudyBuilder = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [primaryStat, setPrimaryStat] = useState("");
  const [primaryLabel, setPrimaryLabel] = useState("");
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ]);
  const [context, setContext] = useState("");
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedCaseStudies, setSavedCaseStudies] = useState<SavedCaseStudy[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchSavedCaseStudies = useCallback(async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("saved_case_studies" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setSavedCaseStudies((data || []).map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        industry: d.industry,
        stat: d.stat,
        statLabel: d.stat_label,
        metrics: d.metrics as Metric[],
        is_favorite: d.is_favorite,
        created_at: d.created_at,
      })));
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    if (showHistory && user) {
      fetchSavedCaseStudies();
    }
  }, [showHistory, user, fetchSavedCaseStudies]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setCaseStudy(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-case-study", {
        body: {
          industry,
          primaryStat,
          primaryLabel,
          metrics: metrics.filter(m => m.label && m.value),
          context,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setCaseStudy(data.caseStudy);
      toast.success("Case study generated successfully");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate case study");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!caseStudy || !user) {
      toast.error("Please log in to save case studies");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from("saved_case_studies" as any).insert({
        user_id: user.id,
        title: caseStudy.title,
        description: caseStudy.description,
        industry: caseStudy.industry,
        stat: caseStudy.stat,
        stat_label: caseStudy.statLabel,
        metrics: caseStudy.metrics,
      } as any);

      if (error) throw error;
      toast.success("Case study saved");
      fetchSavedCaseStudies();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save case study");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from("saved_case_studies" as any)
        .update({ is_favorite: !currentFavorite } as any)
        .eq("id", id);

      if (error) throw error;
      setSavedCaseStudies(prev =>
        prev.map(cs => cs.id === id ? { ...cs, is_favorite: !currentFavorite } : cs)
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_case_studies" as any)
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSavedCaseStudies(prev => prev.filter(cs => cs.id !== id));
      toast.success("Case study deleted");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleLoadCaseStudy = (saved: SavedCaseStudy) => {
    setCaseStudy({
      title: saved.title,
      description: saved.description,
      industry: saved.industry,
      stat: saved.stat,
      statLabel: saved.statLabel,
      metrics: saved.metrics,
    });
    setShowHistory(false);
  };

  const updateMetric = (index: number, field: "label" | "value", value: string) => {
    const updated = [...metrics];
    updated[index][field] = value;
    setMetrics(updated);
  };

  const handleCopy = () => {
    if (!caseStudy) return;
    const markdown = `# ${caseStudy.title}

**Industry:** ${caseStudy.industry}

## Key Result
**${caseStudy.stat}** ${caseStudy.statLabel}

## Description
${caseStudy.description}

## Metrics
${caseStudy.metrics.map(m => `- **${m.label}:** ${m.value}`).join("\n")}`;
    
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Copied as Markdown");
    setTimeout(() => setCopied(false), 2000);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!industry;
      case 2: return !!primaryStat && !!primaryLabel;
      case 3: return metrics.some(m => m.label && m.value);
      case 4: return !!context.trim();
      default: return false;
    }
  };

  // History Panel
  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-ui text-lg text-foreground">Saved Case Studies</h3>
          <Button variant="outline" size="sm" onClick={() => setShowHistory(false)}>
            Back to Builder
          </Button>
        </div>

        {loadingHistory ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : savedCaseStudies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-ui">No saved case studies yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedCaseStudies.map((saved) => (
              <div
                key={saved.id}
                className="p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => handleLoadCaseStudy(saved)}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-data text-xs text-primary uppercase">
                        {INDUSTRIES.find(i => i.value === saved.industry)?.label}
                      </span>
                      <span className="text-2xl font-bold text-foreground">{saved.stat}</span>
                    </div>
                    <h4 className="font-ui text-sm font-medium text-foreground">{saved.title}</h4>
                    <p className="font-ui text-xs text-muted-foreground mt-1 line-clamp-2">
                      {saved.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleToggleFavorite(saved.id, saved.is_favorite)}
                    >
                      <Star className={`w-4 h-4 ${saved.is_favorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(saved.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* History Button */}
      {user && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setShowHistory(true)}>
            <History className="w-4 h-4 mr-2" />
            Saved ({savedCaseStudies.length})
          </Button>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-data text-sm transition-all ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : step > s
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-2 transition-all ${
                step > s ? "bg-primary" : "bg-border"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[200px]">
        {step === 1 && (
          <div className="space-y-4">
            <label className="label-tech text-foreground/70">Select Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary">
                <SelectValue placeholder="Choose an industry..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind.value} value={ind.value} className="text-foreground focus:bg-primary/20">
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="font-ui text-xs text-muted-foreground">
              The industry context helps generate relevant technical terminology and applications.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="label-tech text-foreground/70">Primary Metric</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  value={primaryStat}
                  onChange={(e) => setPrimaryStat(e.target.value)}
                  placeholder="e.g., 42%"
                  className="bg-muted/50 border-border text-foreground text-2xl font-bold text-center h-16"
                />
                <span className="label-tech text-muted-foreground mt-1 block text-center">Value</span>
              </div>
              <div>
                <Input
                  value={primaryLabel}
                  onChange={(e) => setPrimaryLabel(e.target.value)}
                  placeholder="e.g., Efficiency increase"
                  className="bg-muted/50 border-border text-foreground h-16"
                />
                <span className="label-tech text-muted-foreground mt-1 block text-center">Label</span>
              </div>
            </div>
            <p className="font-ui text-xs text-muted-foreground">
              This will be the hero statistic featured prominently in the case study.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="label-tech text-foreground/70">Supporting Metrics</label>
            {metrics.map((metric, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-3">
                <Input
                  value={metric.label}
                  onChange={(e) => updateMetric(idx, "label", e.target.value)}
                  placeholder={`Label ${idx + 1} (e.g., Accuracy)`}
                  className="bg-muted/50 border-border text-foreground"
                />
                <Input
                  value={metric.value}
                  onChange={(e) => updateMetric(idx, "value", e.target.value)}
                  placeholder={`Value (e.g., ±0.5%)`}
                  className="bg-muted/50 border-border text-foreground"
                />
              </div>
            ))}
            <p className="font-ui text-xs text-muted-foreground">
              Add 1-3 supporting metrics to provide additional context.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <label className="label-tech text-foreground/70">Project Context</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Brief notes about the project, challenge, or application...&#10;&#10;e.g., Large-scale copper mine in Chile, struggling with water recovery in thickener operations. High variability in ore grade causing inconsistent underflow density."
              className="min-h-[160px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary resize-none"
            />
            <p className="font-ui text-xs text-muted-foreground">
              AI will expand this into a full case study narrative.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleGenerate} disabled={isLoading || !canProceed()}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Generate Case Study
              </>
            )}
          </Button>
        )}
      </div>

      {/* Generated Case Study Preview */}
      {caseStudy && (
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
            <label className="label-tech text-primary">Generated Case Study</label>
            <div className="flex items-center gap-2">
              {user && (
                <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => exportCaseStudyToPDF(caseStudy)}>
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportCaseStudyToWord(caseStudy)}>
                    Download Word
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Markdown
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Case Study Card Preview */}
          <div className="card-gradient chamfer-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-wave-pattern" />
            <div className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="font-data text-xs uppercase tracking-wider text-slate-400">
                  {INDUSTRIES.find(i => i.value === caseStudy.industry)?.label || caseStudy.industry}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-5xl font-bold font-ui tracking-tight mb-1 text-primary">
                  {caseStudy.stat}
                </div>
                <div className="text-sm font-medium text-slate-300">
                  {caseStudy.statLabel}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold font-ui mb-3 text-slate-100">
                {caseStudy.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6 text-slate-300">
                {caseStudy.description}
              </p>
              
              <div className="grid grid-cols-3 gap-2 p-4 rounded-lg bg-slate-800/50">
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="font-data text-xs uppercase tracking-wider mb-1 text-slate-500">
                      {metric.label}
                    </div>
                    <div className="text-sm font-semibold font-ui text-slate-100">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyBuilder;
