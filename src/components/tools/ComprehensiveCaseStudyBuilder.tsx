import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, FileText, Check, ChevronRight, ChevronLeft, 
  Save, Star, Trash2, History, Download, Lightbulb, AlertCircle,
  Building2, MapPin, Target, Settings, Beaker, Trophy, Quote,
  Zap, ArrowRight, Plus, X
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { exportComprehensiveCaseStudyToPDF, exportComprehensiveCaseStudyToWord } from "@/lib/comprehensiveCaseStudyExport";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AISuggestionsSidebar } from "./AISuggestionsSidebar";
import {
  ComprehensiveCaseStudy,
  WIZARD_STEPS,
  APPLICATIONS,
  COMMON_CHALLENGES,
  COMPARISON_METHODS,
  EDGE_CASES,
  STATUS_OPTIONS,
  EMPTY_CASE_STUDY,
} from "@/types/caseStudy";

interface SavedCaseStudy {
  id: string;
  title: string;
  is_favorite: boolean;
  is_draft: boolean;
  draft_step: number;
  created_at: string;
  full_content: ComprehensiveCaseStudy;
}

// Step icons mapping
const STEP_ICONS = [
  Building2, MapPin, AlertCircle, Target, Settings, Beaker, Trophy, Quote, Lightbulb, ArrowRight
];

export const ComprehensiveCaseStudyBuilder = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [caseStudy, setCaseStudy] = useState<ComprehensiveCaseStudy>(EMPTY_CASE_STUDY);
  const [generatedContent, setGeneratedContent] = useState<ComprehensiveCaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedCaseStudies, setSavedCaseStudies] = useState<SavedCaseStudy[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch saved case studies
  const fetchSavedCaseStudies = useCallback(async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("saved_case_studies")
        .select("id, title, is_favorite, is_draft, draft_step, created_at, full_content")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setSavedCaseStudies((data || []).map((d: any) => ({
        id: d.id,
        title: d.title || d.full_content?.executiveSnapshot?.customerName || "Untitled",
        is_favorite: d.is_favorite,
        is_draft: d.is_draft,
        draft_step: d.draft_step,
        created_at: d.created_at,
        full_content: d.full_content || EMPTY_CASE_STUDY,
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

  // Auto-save draft
  const handleSaveDraft = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const title = caseStudy.executiveSnapshot.customerName 
        ? `${caseStudy.executiveSnapshot.customerName} - ${caseStudy.executiveSnapshot.site}`
        : "Draft Case Study";
      
      const { error } = await supabase.from("saved_case_studies").insert({
        user_id: user.id,
        title,
        description: caseStudy.executiveSnapshot.measurementChallenge || "",
        industry: caseStudy.executiveSnapshot.application || "general",
        stat: "",
        stat_label: "",
        metrics: [],
        full_content: caseStudy,
        is_draft: true,
        draft_step: step,
      } as any);

      if (error) throw error;
      toast.success("Draft saved");
      fetchSavedCaseStudies();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error("Failed to save draft");
    } finally {
      setIsSaving(false);
    }
  };

  // Generate case study with AI
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-case-study", {
        body: {
          mode: "comprehensive",
          caseStudyData: caseStudy,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setGeneratedContent(data.caseStudy);
      setShowPreview(true);
      toast.success("Case study generated successfully");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate case study");
    } finally {
      setIsLoading(false);
    }
  };

  // Save final case study
  const handleSaveFinal = async () => {
    if (!generatedContent || !user) {
      toast.error("Please log in to save case studies");
      return;
    }
    setIsSaving(true);
    try {
      const title = `${generatedContent.executiveSnapshot.customerName} - ${generatedContent.executiveSnapshot.site}`;
      
      const { error } = await supabase.from("saved_case_studies").insert({
        user_id: user.id,
        title,
        description: generatedContent.processContext.whyItMatters || "",
        industry: generatedContent.executiveSnapshot.application || "general",
        stat: generatedContent.technicalResults.accuracy || "",
        stat_label: "Precision achieved",
        metrics: generatedContent.businessImpact.impacts.map(i => ({ label: "Impact", value: i })),
        full_content: generatedContent,
        is_draft: false,
        draft_step: 10,
      } as any);

      if (error) throw error;
      toast.success("Case study saved");
      fetchSavedCaseStudies();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error("Failed to save case study");
    } finally {
      setIsSaving(false);
    }
  };

  // Load saved case study
  const handleLoadCaseStudy = (saved: SavedCaseStudy) => {
    setCaseStudy(saved.full_content);
    setStep(saved.is_draft ? saved.draft_step : 1);
    setShowHistory(false);
    if (!saved.is_draft) {
      setGeneratedContent(saved.full_content);
      setShowPreview(true);
    }
  };

  // Delete case study
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_case_studies")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setSavedCaseStudies(prev => prev.filter(cs => cs.id !== id));
      toast.success("Deleted");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from("saved_case_studies")
        .update({ is_favorite: !current } as any)
        .eq("id", id);
      if (error) throw error;
      setSavedCaseStudies(prev =>
        prev.map(cs => cs.id === id ? { ...cs, is_favorite: !current } : cs)
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // Update nested state helper
  const updateSection = (
    section: keyof ComprehensiveCaseStudy,
    field: string,
    value: any
  ) => {
    setCaseStudy(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  // Add/remove from array fields
  const addToArray = (
    section: keyof ComprehensiveCaseStudy,
    field: string
  ) => {
    setCaseStudy(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: [...((prev[section] as any)[field] as string[]), ""],
      },
    }));
  };

  const updateArrayItem = (
    section: keyof ComprehensiveCaseStudy,
    field: string,
    index: number,
    value: string
  ) => {
    setCaseStudy(prev => {
      const arr = [...((prev[section] as any)[field] as string[])];
      arr[index] = value;
      return {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field]: arr,
        },
      };
    });
  };

  const removeArrayItem = (
    section: keyof ComprehensiveCaseStudy,
    field: string,
    index: number
  ) => {
    setCaseStudy(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: ((prev[section] as any)[field] as string[]).filter((_: any, i: number) => i !== index),
      },
    }));
  };

  // Check if current step is valid
  const canProceed = () => {
    switch (step) {
      case 1:
        return caseStudy.executiveSnapshot.customerName && 
               caseStudy.executiveSnapshot.site && 
               caseStudy.executiveSnapshot.application;
      case 2:
        return caseStudy.processContext.measurementLocation && 
               caseStudy.processContext.whyItMatters;
      case 3:
        return caseStudy.realProblem.statusQuoIssue;
      case 4:
        return caseStudy.successCriteria.definition;
      case 5:
        return caseStudy.solutionArchitecture.product && 
               caseStudy.solutionArchitecture.pipeSize;
      case 6:
        return caseStudy.commissioning.testDuration;
      case 7:
        return caseStudy.technicalResults.accuracy || 
               caseStudy.businessImpact.impacts.some(i => i.trim());
      case 8:
        return caseStudy.customerVoice.quote;
      case 9:
        return caseStudy.whyThisWorked.fitExplanation;
      case 10:
        return caseStudy.whatsNext.futureIntent;
      default:
        return true;
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Customer Name *</label>
                <Input
                  value={caseStudy.executiveSnapshot.customerName}
                  onChange={(e) => updateSection("executiveSnapshot", "customerName", e.target.value)}
                  placeholder="e.g., Rio Tinto"
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Site/Facility *</label>
                <Input
                  value={caseStudy.executiveSnapshot.site}
                  onChange={(e) => updateSection("executiveSnapshot", "site", e.target.value)}
                  placeholder="e.g., Gove Operations"
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Country/Region</label>
                <Input
                  value={caseStudy.executiveSnapshot.country}
                  onChange={(e) => updateSection("executiveSnapshot", "country", e.target.value)}
                  placeholder="e.g., Australia"
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Application *</label>
                <Select 
                  value={caseStudy.executiveSnapshot.application} 
                  onValueChange={(v) => updateSection("executiveSnapshot", "application", v)}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select application..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {APPLICATIONS.map((app) => (
                      <SelectItem key={app} value={app}>{app}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Measurement Challenge (1 line)</label>
              <Input
                value={caseStudy.executiveSnapshot.measurementChallenge}
                onChange={(e) => updateSection("executiveSnapshot", "measurementChallenge", e.target.value)}
                placeholder="e.g., Unsafe radioactive density meters and slow manual sampling"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Solution Deployed</label>
              <Input
                value={caseStudy.executiveSnapshot.solutionDeployed}
                onChange={(e) => updateSection("executiveSnapshot", "solutionDeployed", e.target.value)}
                placeholder="e.g., Rhosonics SDM ECO (non-nuclear, inline)"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Status</label>
              <Select 
                value={caseStudy.executiveSnapshot.status} 
                onValueChange={(v) => updateSection("executiveSnapshot", "status", v as any)}
              >
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Key Outcomes</label>
              {caseStudy.executiveSnapshot.keyOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={outcome}
                    onChange={(e) => updateArrayItem("executiveSnapshot", "keyOutcomes", idx, e.target.value)}
                    placeholder="e.g., Improved process stability"
                    className="bg-muted/50 border-border"
                  />
                  {caseStudy.executiveSnapshot.keyOutcomes.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("executiveSnapshot", "keyOutcomes", idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addToArray("executiveSnapshot", "keyOutcomes")}>
                <Plus className="w-4 h-4 mr-2" /> Add Outcome
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <Lightbulb className="w-4 h-4 inline mr-2 text-primary" />
                Rule: If you remove this section, the reader should lose understanding — not just details.
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Where does the measurement sit in the process? *</label>
              <Textarea
                value={caseStudy.processContext.measurementLocation}
                onChange={(e) => updateSection("processContext", "measurementLocation", e.target.value)}
                placeholder="e.g., The SDM ECO is installed on the thickener underflow line, measuring density of the slurry being pumped to the tailings storage facility..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Why does this measurement matter at that point? *</label>
              <Textarea
                value={caseStudy.processContext.whyItMatters}
                onChange={(e) => updateSection("processContext", "whyItMatters", e.target.value)}
                placeholder="e.g., Accurate density measurement at this point is critical for optimizing flocculant dosage and ensuring consistent thickener performance..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What happens when density is wrong?</label>
              <Textarea
                value={caseStudy.processContext.consequencesOfError}
                onChange={(e) => updateSection("processContext", "consequencesOfError", e.target.value)}
                placeholder="e.g., Incorrect density readings lead to over-dosing of flocculant (increased costs) or under-dosing (poor separation, overflow events)..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <AlertCircle className="w-4 h-4 inline mr-2 text-destructive" />
                Avoid: "Needed accurate measurement"<br />
                Prefer: "Operators lacked confidence in density readings, leading to conservative setpoints and reduced throughput."
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Common Challenges</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COMMON_CHALLENGES.map((challenge) => (
                  <div key={challenge.id} className="flex items-start gap-2">
                    <Checkbox
                      id={challenge.id}
                      checked={caseStudy.realProblem.operationalRisk.includes(challenge.id)}
                      onCheckedChange={(checked) => {
                        const current = caseStudy.realProblem.operationalRisk;
                        const updated = checked
                          ? current ? `${current}, ${challenge.id}` : challenge.id
                          : current.split(", ").filter(c => c !== challenge.id).join(", ");
                        updateSection("realProblem", "operationalRisk", updated);
                      }}
                    />
                    <label htmlFor={challenge.id} className="text-sm text-foreground/80 cursor-pointer">
                      {challenge.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Process Instability / Blind Spots</label>
              <Textarea
                value={caseStudy.realProblem.processInstability}
                onChange={(e) => updateSection("realProblem", "processInstability", e.target.value)}
                placeholder="e.g., Without real-time density data, operators were essentially 'flying blind' during process upsets..."
                className="min-h-[80px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Maintenance Burden / Hidden Cost</label>
              <Textarea
                value={caseStudy.realProblem.maintenanceBurden}
                onChange={(e) => updateSection("realProblem", "maintenanceBurden", e.target.value)}
                placeholder="e.g., Annual source re-certification for nuclear gauges cost $15,000+ and required 3-day shutdowns..."
                className="min-h-[80px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Why was the status quo no longer acceptable? *</label>
              <Textarea
                value={caseStudy.realProblem.statusQuoIssue}
                onChange={(e) => updateSection("realProblem", "statusQuoIssue", e.target.value)}
                placeholder="e.g., New safety regulations and operator concerns about radioactive exposure forced the site to seek non-nuclear alternatives..."
                className="min-h-[80px] bg-muted/50 border-border"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <Target className="w-4 h-4 inline mr-2 text-primary" />
                This is critical and often missing. Explicitly state what "success" meant to the customer.
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What did "success" mean to the customer? *</label>
              <Textarea
                value={caseStudy.successCriteria.definition}
                onChange={(e) => updateSection("successCriteria", "definition", e.target.value)}
                placeholder="e.g., Success was defined as achieving ±0.01 S.G. precision against lab samples over a 30-day trial, with no maintenance interventions required..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What were they comparing against?</label>
              <Input
                value={caseStudy.successCriteria.comparisonBasis}
                onChange={(e) => updateSection("successCriteria", "comparisonBasis", e.target.value)}
                placeholder="e.g., Existing nuclear density gauge and daily lab samples"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What would have caused failure?</label>
              <Input
                value={caseStudy.successCriteria.failureConditions}
                onChange={(e) => updateSection("successCriteria", "failureConditions", e.target.value)}
                placeholder="e.g., Drift greater than ±0.02 S.G., fouling requiring manual cleaning, or inability to handle water flushes"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Specific Targets</label>
              {caseStudy.successCriteria.targets.map((target, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={target}
                    onChange={(e) => updateArrayItem("successCriteria", "targets", idx, e.target.value)}
                    placeholder="e.g., ±0.01 S.G. precision vs reference"
                    className="bg-muted/50 border-border"
                  />
                  {caseStudy.successCriteria.targets.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("successCriteria", "targets", idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addToArray("successCriteria", "targets")}>
                <Plus className="w-4 h-4 mr-2" /> Add Target
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Product *</label>
                <Select 
                  value={caseStudy.solutionArchitecture.product} 
                  onValueChange={(v) => updateSection("solutionArchitecture", "product", v as any)}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="SDM">SDM</SelectItem>
                    <SelectItem value="SDM_ECO">SDM ECO</SelectItem>
                    <SelectItem value="SDM_4">SDM-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Installation Type</label>
                <Select 
                  value={caseStudy.solutionArchitecture.installationType} 
                  onValueChange={(v) => updateSection("solutionArchitecture", "installationType", v as any)}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="wafer">Wafer</SelectItem>
                    <SelectItem value="spool">Spool Piece</SelectItem>
                    <SelectItem value="clamp_in">Clamp-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Pipe Size *</label>
                <Input
                  value={caseStudy.solutionArchitecture.pipeSize}
                  onChange={(e) => updateSection("solutionArchitecture", "pipeSize", e.target.value)}
                  placeholder="e.g., DN150 (6 inch)"
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Pipe Material</label>
                <Select 
                  value={caseStudy.solutionArchitecture.pipeMaterial} 
                  onValueChange={(v) => updateSection("solutionArchitecture", "pipeMaterial", v)}
                >
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select material..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="HDPE">HDPE</SelectItem>
                    <SelectItem value="Steel">Steel</SelectItem>
                    <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                    <SelectItem value="Carbon Steel">Carbon Steel</SelectItem>
                    <SelectItem value="PVC">PVC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Measurement Range</label>
              <Input
                value={caseStudy.solutionArchitecture.measurementRange}
                onChange={(e) => updateSection("solutionArchitecture", "measurementRange", e.target.value)}
                placeholder="e.g., 1.0 - 1.8 kg/L (S.G.)"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Supporting Instruments</label>
              <div className="flex flex-wrap gap-2">
                {["Flow meter", "Pt100 temperature sensor", "Pressure transmitter", "PLC integration"].map((inst) => (
                  <Badge
                    key={inst}
                    variant={caseStudy.solutionArchitecture.supportingInstruments.includes(inst) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = caseStudy.solutionArchitecture.supportingInstruments;
                      const updated = current.includes(inst)
                        ? current.filter(i => i !== inst)
                        : [...current, inst];
                      updateSection("solutionArchitecture", "supportingInstruments", updated);
                    }}
                  >
                    {inst}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <Beaker className="w-4 h-4 inline mr-2 text-primary" />
                This is where your credibility lives. Explain how confidence was built.
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Comparison Methods</label>
              <div className="flex flex-wrap gap-2">
                {COMPARISON_METHODS.map((method) => (
                  <Badge
                    key={method}
                    variant={caseStudy.commissioning.comparisonMethods.includes(method) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = caseStudy.commissioning.comparisonMethods;
                      const updated = current.includes(method)
                        ? current.filter(m => m !== method)
                        : [...current, method];
                      updateSection("commissioning", "comparisonMethods", updated);
                    }}
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Calibration Approach</label>
              <Input
                value={caseStudy.commissioning.calibrationApproach}
                onChange={(e) => updateSection("commissioning", "calibrationApproach", e.target.value)}
                placeholder="e.g., Multi-point calibration (MPC) using 5 lab samples across operating range"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Test Duration *</label>
              <Input
                value={caseStudy.commissioning.testDuration}
                onChange={(e) => updateSection("commissioning", "testDuration", e.target.value)}
                placeholder="e.g., 30-day continuous trial"
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Edge Cases Tested</label>
              <div className="flex flex-wrap gap-2">
                {EDGE_CASES.map((edgeCase) => (
                  <Badge
                    key={edgeCase}
                    variant={caseStudy.commissioning.edgeCasesTested.includes(edgeCase) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = caseStudy.commissioning.edgeCasesTested;
                      const updated = current.includes(edgeCase)
                        ? current.filter(e => e !== edgeCase)
                        : [...current, edgeCase];
                      updateSection("commissioning", "edgeCasesTested", updated);
                    }}
                  >
                    {edgeCase}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-ui text-sm font-semibold text-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Technical Results
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label-tech text-foreground/70">Precision vs Reference</label>
                  <Input
                    value={caseStudy.technicalResults.accuracy}
                    onChange={(e) => updateSection("technicalResults", "accuracy", e.target.value)}
                    placeholder="e.g., ±0.01 S.G."
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-tech text-foreground/70">Stability Over Time</label>
                  <Input
                    value={caseStudy.technicalResults.stability}
                    onChange={(e) => updateSection("technicalResults", "stability", e.target.value)}
                    placeholder="e.g., No drift over 6 months"
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-tech text-foreground/70">Response Time</label>
                  <Input
                    value={caseStudy.technicalResults.responseTime}
                    onChange={(e) => updateSection("technicalResults", "responseTime", e.target.value)}
                    placeholder="e.g., < 1 second"
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-tech text-foreground/70">Repeatability</label>
                  <Input
                    value={caseStudy.technicalResults.repeatability}
                    onChange={(e) => updateSection("technicalResults", "repeatability", e.target.value)}
                    placeholder="e.g., ±0.005 S.G."
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-ui text-sm font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-lime-500" />
                Operational & Business Impact
              </h4>
              <div className="p-4 bg-lime-500/5 border border-lime-500/20 rounded-lg">
                <p className="font-mono text-xs text-muted-foreground">
                  This is the upgrade your current case studies lack. If you cannot quantify, say what changed in daily operation.
                </p>
              </div>
              {caseStudy.businessImpact.impacts.map((impact, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={impact}
                    onChange={(e) => updateArrayItem("businessImpact", "impacts", idx, e.target.value)}
                    placeholder="e.g., Reduced manual sampling from 4x to 1x daily"
                    className="bg-muted/50 border-border"
                  />
                  {caseStudy.businessImpact.impacts.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("businessImpact", "impacts", idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addToArray("businessImpact", "impacts")}>
                <Plus className="w-4 h-4 mr-2" /> Add Impact
              </Button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <Quote className="w-4 h-4 inline mr-2 text-primary" />
                Mandatory. Best sources: Process engineer, Maintenance lead, Operations manager
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Customer Quote *</label>
              <Textarea
                value={caseStudy.customerVoice.quote}
                onChange={(e) => updateSection("customerVoice", "quote", e.target.value)}
                placeholder="e.g., 'The SDM ECO has been running continuously for six months with zero maintenance. We finally have confidence in our density readings.'"
                className="min-h-[120px] bg-muted/50 border-border"
              />
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground mb-2">Quote prompts to ask customers:</p>
              <ul className="font-mono text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>"What was different after installation?"</li>
                <li>"What would you miss if it was removed?"</li>
                <li>"Would you specify it again?"</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Name</label>
                <Input
                  value={caseStudy.customerVoice.name}
                  onChange={(e) => updateSection("customerVoice", "name", e.target.value)}
                  placeholder="e.g., John Smith"
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Role</label>
                <Input
                  value={caseStudy.customerVoice.role}
                  onChange={(e) => updateSection("customerVoice", "role", e.target.value)}
                  placeholder="e.g., Process Engineer"
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="label-tech text-foreground/70">Company</label>
                <Input
                  value={caseStudy.customerVoice.company}
                  onChange={(e) => updateSection("customerVoice", "company", e.target.value)}
                  placeholder="e.g., Rio Tinto"
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="font-mono text-xs text-muted-foreground">
                <Lightbulb className="w-4 h-4 inline mr-2 text-primary" />
                This turns the case study into a buyer education tool, not just a trophy.
              </p>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Why was this application a good fit? *</label>
              <Textarea
                value={caseStudy.whyThisWorked.fitExplanation}
                onChange={(e) => updateSection("whyThisWorked", "fitExplanation", e.target.value)}
                placeholder="e.g., SDM ECO technology is ideally suited for high-solids slurry applications where traditional Coriolis meters experience rapid wear..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What conditions made it successful?</label>
              {caseStudy.whyThisWorked.successConditions.map((condition, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={condition}
                    onChange={(e) => updateArrayItem("whyThisWorked", "successConditions", idx, e.target.value)}
                    placeholder="e.g., Full pipe conditions maintained"
                    className="bg-muted/50 border-border"
                  />
                  {caseStudy.whyThisWorked.successConditions.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("whyThisWorked", "successConditions", idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addToArray("whyThisWorked", "successConditions")}>
                <Plus className="w-4 h-4 mr-2" /> Add Condition
              </Button>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Where should customers be cautious?</label>
              {caseStudy.whyThisWorked.cautions.map((caution, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={caution}
                    onChange={(e) => updateArrayItem("whyThisWorked", "cautions", idx, e.target.value)}
                    placeholder="e.g., Applications with frequent air entrainment may require additional consideration"
                    className="bg-muted/50 border-border"
                  />
                  {caseStudy.whyThisWorked.cautions.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("whyThisWorked", "cautions", idx)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addToArray("whyThisWorked", "cautions")}>
                <Plus className="w-4 h-4 mr-2" /> Add Caution
              </Button>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">What's next for this installation? *</label>
              <Textarea
                value={caseStudy.whatsNext.futureIntent}
                onChange={(e) => updateSection("whatsNext", "futureIntent", e.target.value)}
                placeholder="e.g., Following this successful trial, the site plans to deploy SDM ECO units across all five thickener underflow lines in Q2 2024..."
                className="min-h-[100px] bg-muted/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Related Applications</label>
              <div className="flex flex-wrap gap-2">
                {APPLICATIONS.map((app) => (
                  <Badge
                    key={app}
                    variant={caseStudy.whatsNext.relatedApplications.includes(app) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = caseStudy.whatsNext.relatedApplications;
                      const updated = current.includes(app)
                        ? current.filter(a => a !== app)
                        : [...current, app];
                      updateSection("whatsNext", "relatedApplications", updated);
                    }}
                  >
                    {app}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="label-tech text-foreground/70">Call to Action</label>
              <Input
                value={caseStudy.whatsNext.callToAction}
                onChange={(e) => updateSection("whatsNext", "callToAction", e.target.value)}
                placeholder="e.g., Contact us for a feasibility assessment at your site"
                className="bg-muted/50 border-border"
              />
            </div>
          </div>
        );

      default:
        return null;
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
                      {saved.is_draft && <Badge variant="secondary" className="text-xs">Draft - Step {saved.draft_step}</Badge>}
                      {!saved.is_draft && <Badge variant="default" className="text-xs">Complete</Badge>}
                    </div>
                    <h4 className="font-ui text-sm font-medium text-foreground">{saved.title}</h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      {new Date(saved.created_at).toLocaleDateString()}
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

  // Preview Panel
  if (showPreview && generatedContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-ui text-lg text-foreground">Generated Case Study</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Edit
            </Button>
            {user && (
              <Button variant="outline" size="sm" onClick={handleSaveFinal} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem onClick={() => exportComprehensiveCaseStudyToPDF(generatedContent)}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportComprehensiveCaseStudyToWord(generatedContent)}>
                  Export as Word
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Executive Snapshot */}
        <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg">
          <h4 className="label-tech text-primary mb-4">Executive Snapshot</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-muted-foreground">Customer:</span> <span className="text-foreground font-medium">{generatedContent.executiveSnapshot.customerName}</span></div>
            <div><span className="text-muted-foreground">Site:</span> <span className="text-foreground font-medium">{generatedContent.executiveSnapshot.site}, {generatedContent.executiveSnapshot.country}</span></div>
            <div><span className="text-muted-foreground">Application:</span> <span className="text-foreground font-medium">{generatedContent.executiveSnapshot.application}</span></div>
            <div className="col-span-2 md:col-span-3"><span className="text-muted-foreground">Challenge:</span> <span className="text-foreground">{generatedContent.executiveSnapshot.measurementChallenge}</span></div>
            <div className="col-span-2 md:col-span-3"><span className="text-muted-foreground">Solution:</span> <span className="text-foreground">{generatedContent.executiveSnapshot.solutionDeployed}</span></div>
          </div>
          {generatedContent.executiveSnapshot.keyOutcomes.length > 0 && (
            <div className="mt-4">
              <span className="text-muted-foreground text-sm">Key Outcomes:</span>
              <ul className="list-disc list-inside mt-1">
                {generatedContent.executiveSnapshot.keyOutcomes.filter(o => o).map((outcome, i) => (
                  <li key={i} className="text-sm text-foreground">{outcome}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Process Context */}
        <div className="space-y-2">
          <h4 className="label-tech text-foreground/70">Process Context</h4>
          <p className="text-sm text-foreground">{generatedContent.processContext.measurementLocation}</p>
          <p className="text-sm text-foreground">{generatedContent.processContext.whyItMatters}</p>
        </div>

        {/* The Real Problem */}
        <div className="space-y-2">
          <h4 className="label-tech text-foreground/70">The Real Problem</h4>
          <p className="text-sm text-foreground">{generatedContent.realProblem.statusQuoIssue}</p>
          {generatedContent.realProblem.processInstability && <p className="text-sm text-foreground">{generatedContent.realProblem.processInstability}</p>}
        </div>

        {/* Success Criteria */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="label-tech text-foreground/70 mb-2">Success Criteria</h4>
          <p className="text-sm text-foreground">{generatedContent.successCriteria.definition}</p>
          {generatedContent.successCriteria.targets.filter(t => t).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {generatedContent.successCriteria.targets.filter(t => t).map((target, i) => (
                <Badge key={i} variant="outline">{target}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Solution Architecture */}
        <div className="space-y-2">
          <h4 className="label-tech text-foreground/70">Solution Architecture</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="p-3 bg-muted/30 rounded"><span className="text-muted-foreground block text-xs">Product</span><span className="font-medium">{generatedContent.solutionArchitecture.product.replace("_", " ")}</span></div>
            <div className="p-3 bg-muted/30 rounded"><span className="text-muted-foreground block text-xs">Installation</span><span className="font-medium capitalize">{generatedContent.solutionArchitecture.installationType.replace("_", " ")}</span></div>
            <div className="p-3 bg-muted/30 rounded"><span className="text-muted-foreground block text-xs">Pipe Size</span><span className="font-medium">{generatedContent.solutionArchitecture.pipeSize}</span></div>
            <div className="p-3 bg-muted/30 rounded"><span className="text-muted-foreground block text-xs">Range</span><span className="font-medium">{generatedContent.solutionArchitecture.measurementRange}</span></div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="label-tech text-primary mb-3">Technical Results</h4>
            <div className="space-y-2 text-sm">
              {generatedContent.technicalResults.accuracy && <div><span className="text-muted-foreground">Precision:</span> <span className="font-medium text-foreground">{generatedContent.technicalResults.accuracy}</span></div>}
              {generatedContent.technicalResults.stability && <div><span className="text-muted-foreground">Stability:</span> <span className="font-medium text-foreground">{generatedContent.technicalResults.stability}</span></div>}
              {generatedContent.technicalResults.responseTime && <div><span className="text-muted-foreground">Response:</span> <span className="font-medium text-foreground">{generatedContent.technicalResults.responseTime}</span></div>}
            </div>
          </div>
          <div className="p-4 bg-lime-500/5 border border-lime-500/20 rounded-lg">
            <h4 className="label-tech text-lime-600 dark:text-lime-400 mb-3">Business Impact</h4>
            <ul className="space-y-1 text-sm">
              {generatedContent.businessImpact.impacts.filter(i => i).map((impact, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-lime-500 mt-0.5 shrink-0" />
                  <span className="text-foreground">{impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Customer Voice */}
        {generatedContent.customerVoice.quote && (
          <div className="p-6 bg-muted/30 border-l-4 border-primary rounded-r-lg">
            <Quote className="w-8 h-8 text-primary/30 mb-2" />
            <p className="text-foreground italic text-lg">"{generatedContent.customerVoice.quote}"</p>
            {generatedContent.customerVoice.name && (
              <p className="mt-3 text-sm text-muted-foreground">
                — {generatedContent.customerVoice.name}, {generatedContent.customerVoice.role}, {generatedContent.customerVoice.company}
              </p>
            )}
          </div>
        )}

        {/* Why This Worked */}
        <div className="space-y-2">
          <h4 className="label-tech text-foreground/70">Why This Worked</h4>
          <p className="text-sm text-foreground">{generatedContent.whyThisWorked.fitExplanation}</p>
        </div>

        {/* What's Next */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-lime-500/10 rounded-lg">
          <h4 className="label-tech text-foreground/70 mb-2">What's Next</h4>
          <p className="text-sm text-foreground">{generatedContent.whatsNext.futureIntent}</p>
          {generatedContent.whatsNext.callToAction && (
            <Button className="mt-4" size="sm">
              {generatedContent.whatsNext.callToAction}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Main Builder
  return (
    <div className="space-y-6">
      {/* Header with History */}
      {user && (
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={handleSaveDraft} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowHistory(true)}>
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>
      )}

      {/* Progress Steps */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-1 min-w-max">
          {WIZARD_STEPS.map((s, idx) => {
            const Icon = STEP_ICONS[idx];
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => setStep(s.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    isActive ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {s.id}
                  </span>
                </button>
                {idx < WIZARD_STEPS.length - 1 && (
                  <div className={`w-4 h-0.5 ${step > s.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step Title */}
          <div className="border-b border-border pb-4">
            <h3 className="font-ui text-lg font-semibold text-foreground">
              {WIZARD_STEPS[step - 1].title}
            </h3>
            <p className="font-mono text-sm text-muted-foreground">
              {WIZARD_STEPS[step - 1].description}
            </p>
          </div>

          {/* Step Form */}
          <div className="min-h-[300px]">
            {renderStepContent()}
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
            
            {step < 10 ? (
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
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <AISuggestionsSidebar 
              currentStep={step}
              caseStudyData={caseStudy}
            />
          </div>
        </div>
      </div>

      {/* Mobile AI Guidance - Collapsible at bottom */}
      <div className="lg:hidden">
        <AISuggestionsSidebar 
          currentStep={step}
          caseStudyData={caseStudy}
        />
      </div>
    </div>
  );
};
