import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Copy, Loader2, FileStack, Check, FileText, Mail, MessageSquare, Linkedin, Megaphone, ClipboardList } from "lucide-react";
import { toast } from "sonner";

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

export const TemplateGenerator = () => {
  const [templateType, setTemplateType] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const currentFields = templateType ? TEMPLATE_FIELDS[templateType] : [];
  const canGenerate = templateType && currentFields.some((_, idx) => fields[idx]?.trim());

  return (
    <div className="space-y-6">
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
          <div className="flex items-center justify-between">
            <label className="label-tech text-primary">Generated Content</label>
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
          <div className="p-5 bg-muted/50 border border-border rounded-lg max-h-[400px] overflow-y-auto">
            <pre className="text-foreground font-ui text-sm leading-relaxed whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGenerator;
