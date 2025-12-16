import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, FileStack, Check, FileText, Mail, MessageSquare, Linkedin, Megaphone, ClipboardList, Save, Star, Trash2, History, Download } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { exportTemplateToPDF, exportTemplateToWord } from "@/lib/documentExport";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const TEMPLATE_TYPES = [
  { value: "datasheet", label: "Product Datasheet", icon: FileText, description: "Technical specs document" },
  { value: "specification", label: "Technical Specification", icon: ClipboardList, description: "Detailed engineering spec" },
  { value: "sales_email", label: "Sales Email", icon: Mail, description: "Outreach template" },
  { value: "support", label: "Support Response", icon: MessageSquare, description: "Customer support reply" },
  { value: "linkedin", label: "LinkedIn Post", icon: Linkedin, description: "Social media content" },
  { value: "press_release", label: "Press Release", icon: Megaphone, description: "Announcement format" },
];

interface TemplateFields {
  [key: string]: {
    label: string;
    placeholder: string;
    type: "input" | "textarea";
  }[];
}

const TEMPLATE_FIELDS: TemplateFields = {
  datasheet: [
    { label: "Product Name", placeholder: "e.g., SDM ECO Inline Density Meter", type: "input" },
    { label: "Key Specifications", placeholder: "e.g., Accuracy: ±0.1%, Range: 0-2500 kg/m³, Temperature: -20 to 85°C", type: "textarea" },
    { label: "Primary Applications", placeholder: "e.g., Slurry monitoring, thickener control, tailings management", type: "input" },
  ],
  specification: [
    { label: "Component/System Name", placeholder: "e.g., SDM ECO Sensor Head", type: "input" },
    { label: "Technical Requirements", placeholder: "e.g., IP68 rated, 316L stainless steel, 4-20mA output", type: "textarea" },
    { label: "Operating Conditions", placeholder: "e.g., -10 to 65°C ambient, up to 16 bar pressure", type: "input" },
  ],
  sales_email: [
    { label: "Recipient Industry", placeholder: "e.g., Mining, Wastewater treatment", type: "input" },
    { label: "Pain Point", placeholder: "e.g., Inconsistent thickener performance, high water usage", type: "input" },
    { label: "Solution Focus", placeholder: "e.g., Real-time density measurement for process optimization", type: "input" },
  ],
  support: [
    { label: "Issue Type", placeholder: "e.g., Calibration drift, Communication error", type: "input" },
    { label: "Product Model", placeholder: "e.g., SDM ECO-3000", type: "input" },
    { label: "Resolution", placeholder: "e.g., Factory reset procedure, firmware update required", type: "textarea" },
  ],
  linkedin: [
    { label: "Topic", placeholder: "e.g., Industry 4.0 adoption in mining", type: "input" },
    { label: "Key Message", placeholder: "e.g., How real-time density data transforms process control", type: "input" },
    { label: "Call to Action", placeholder: "e.g., Learn more at our upcoming webinar", type: "input" },
  ],
  press_release: [
    { label: "Announcement", placeholder: "e.g., New product launch, Partnership, Milestone", type: "input" },
    { label: "Key Details", placeholder: "e.g., Features, benefits, availability date", type: "textarea" },
    { label: "Quote Attribution", placeholder: "e.g., CEO Name, Title", type: "input" },
  ],
};

interface SavedTemplate {
  id: string;
  template_type: string;
  name: string;
  content: string;
  fields: Record<string, string>;
  is_favorite: boolean;
  created_at: string;
}

export const TemplateGenerator = () => {
  const { user } = useAuth();
  const [templateType, setTemplateType] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchSavedTemplates = useCallback(async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("saved_templates" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setSavedTemplates((data || []).map((d: any) => ({
        id: d.id,
        template_type: d.template_type,
        name: d.name,
        content: d.content,
        fields: d.fields as Record<string, string>,
        is_favorite: d.is_favorite,
        created_at: d.created_at,
      })));
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    if (showHistory && user) {
      fetchSavedTemplates();
    }
  }, [showHistory, user, fetchSavedTemplates]);

  const handleTemplateChange = (type: string) => {
    setTemplateType(type);
    setFields({});
    setOutput("");
  };

  const updateField = (index: number, value: string) => {
    setFields({ ...fields, [index]: value });
  };

  const handleGenerate = async () => {
    if (!templateType) {
      toast.error("Please select a template type");
      return;
    }

    const templateFields = TEMPLATE_FIELDS[templateType];
    const fieldData = templateFields.map((f, idx) => ({
      label: f.label,
      value: fields[idx] || "",
    }));

    setIsLoading(true);
    setOutput("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-template", {
        body: {
          templateType,
          fields: fieldData,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setOutput(data.content);
      toast.success("Template generated successfully");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate template");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!output || !user) {
      toast.error("Please log in to save templates");
      return;
    }

    const templateLabel = TEMPLATE_TYPES.find(t => t.value === templateType)?.label || templateType;
    const name = `${templateLabel} - ${new Date().toLocaleDateString()}`;

    setIsSaving(true);
    try {
      const { error } = await supabase.from("saved_templates" as any).insert({
        user_id: user.id,
        template_type: templateType,
        name,
        content: output,
        fields,
      } as any);

      if (error) throw error;
      toast.success("Template saved");
      fetchSavedTemplates();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save template");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from("saved_templates" as any)
        .update({ is_favorite: !currentFavorite } as any)
        .eq("id", id);

      if (error) throw error;
      setSavedTemplates(prev =>
        prev.map(t => t.id === id ? { ...t, is_favorite: !currentFavorite } : t)
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_templates" as any)
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSavedTemplates(prev => prev.filter(t => t.id !== id));
      toast.success("Template deleted");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleLoadTemplate = (saved: SavedTemplate) => {
    setTemplateType(saved.template_type);
    setFields(saved.fields);
    setOutput(saved.content);
    setShowHistory(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const currentFields = templateType ? TEMPLATE_FIELDS[templateType] : [];
  const canGenerate = templateType && currentFields.some((_, idx) => fields[idx]?.trim());

  // History Panel
  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-ui text-lg text-foreground">Saved Templates</h3>
          <Button variant="outline" size="sm" onClick={() => setShowHistory(false)}>
            Back to Generator
          </Button>
        </div>

        {loadingHistory ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : savedTemplates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-ui">No saved templates yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedTemplates.map((saved) => {
              const templateInfo = TEMPLATE_TYPES.find(t => t.value === saved.template_type);
              const Icon = templateInfo?.icon || FileText;
              return (
                <div
                  key={saved.id}
                  className="p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => handleLoadTemplate(saved)}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-data text-xs text-primary uppercase">
                          {templateInfo?.label}
                        </span>
                      </div>
                      <h4 className="font-ui text-sm font-medium text-foreground">{saved.name}</h4>
                      <p className="font-mono text-xs text-muted-foreground mt-1 line-clamp-2">
                        {saved.content.substring(0, 150)}...
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
              );
            })}
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
            Saved ({savedTemplates.length})
          </Button>
        </div>
      )}

      {/* Template Type Selection */}
      <div>
        <label className="label-tech mb-3 block text-foreground/70">Template Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEMPLATE_TYPES.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.value}
                onClick={() => handleTemplateChange(template.value)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  templateType === template.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30 hover:border-primary/50"
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${
                  templateType === template.value ? "text-primary" : "text-muted-foreground"
                }`} />
                <div className="font-ui text-sm font-medium text-foreground">
                  {template.label}
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-0.5">
                  {template.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Fields */}
      {templateType && (
        <div className="space-y-4 pt-4 border-t border-border">
          <label className="label-tech text-foreground/70">Template Details</label>
          {currentFields.map((field, idx) => (
            <div key={idx}>
              <label className="font-mono text-xs text-muted-foreground mb-1.5 block">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <Textarea
                  value={fields[idx] || ""}
                  onChange={(e) => updateField(idx, e.target.value)}
                  placeholder={field.placeholder}
                  className="min-h-[100px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary resize-none"
                />
              ) : (
                <Input
                  value={fields[idx] || ""}
                  onChange={(e) => updateField(idx, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isLoading || !canGenerate}
        className="w-full h-12 text-base font-ui"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileStack className="w-5 h-5 mr-2" />
            Generate Template
          </>
        )}
      </Button>

      {/* Output */}
      {output && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <label className="label-tech text-primary">Generated Content</label>
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
                  <DropdownMenuItem onClick={() => exportTemplateToPDF({ templateType, content: output })}>
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportTemplateToWord({ templateType, content: output })}>
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
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="p-5 bg-muted/50 border border-border rounded-lg max-h-[400px] overflow-y-auto">
            <pre className="text-foreground font-ui text-sm leading-relaxed whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGenerator;
