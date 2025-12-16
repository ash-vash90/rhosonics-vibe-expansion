import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, RefreshCw, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type TransformMode = "full" | "terminology" | "tone";

interface Change {
  original: string;
  transformed: string;
}

export const ContentTransformer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<TransformMode>("full");
  const [changes, setChanges] = useState<Change[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTransform = async () => {
    if (!input.trim()) {
      toast.error("Please enter content to transform");
      return;
    }

    setIsLoading(true);
    setOutput("");
    setChanges([]);

    try {
      const { data, error } = await supabase.functions.invoke("transform-content", {
        body: { content: input, mode },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setOutput(data.transformed);
      setChanges(data.changes || []);
      toast.success("Content transformed successfully");
    } catch (error: any) {
      console.error("Transform error:", error);
      toast.error(error.message || "Failed to transform content");
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

  const modeDescriptions = {
    full: "Complete brand voice transformation with terminology and tone adjustments",
    terminology: "Only swap terms per the Rhosonics terminology guide",
    tone: "Keep content structure, adjust voice to be direct, technical, confident",
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div>
        <label className="label-tech mb-3 block text-foreground/70">Transformation Mode</label>
        <RadioGroup
          value={mode}
          onValueChange={(v) => setMode(v as TransformMode)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {(["full", "terminology", "tone"] as const).map((m) => (
            <div key={m} className="relative">
              <RadioGroupItem value={m} id={m} className="peer sr-only" />
              <Label
                htmlFor={m}
                className="flex flex-col p-4 rounded-lg border border-border bg-muted/30 cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
              >
                <span className="font-ui text-sm font-medium text-foreground capitalize">
                  {m === "full" ? "Full Rewrite" : m === "terminology" ? "Terminology Only" : "Tone Adjustment"}
                </span>
                <span className="font-mono text-xs text-muted-foreground mt-1">
                  {modeDescriptions[m]}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Two-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="label-tech text-foreground/70">Original Content</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your old content here... e.g., 'Our cutting-edge revolutionary product delivers amazing results instantly!'"
            className="min-h-[200px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="label-tech text-primary">Transformed Content</label>
            {output && (
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
            )}
          </div>
          <div className="min-h-[200px] p-4 bg-muted/50 border border-border rounded-lg">
            {output ? (
              <p className="text-foreground font-ui leading-relaxed whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-muted-foreground font-mono text-sm italic">
                Transformed content will appear here...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Transform Button */}
      <Button
        onClick={handleTransform}
        disabled={isLoading || !input.trim()}
        className="w-full h-12 text-base font-ui"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Transforming...
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5 mr-2" />
            Transform Content
          </>
        )}
      </Button>

      {/* Changes Summary */}
      {changes.length > 0 && (
        <div className="pt-4 border-t border-border">
          <label className="label-tech text-foreground/70 mb-3 block">Changes Made</label>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {changes.map((change, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm p-2 bg-muted/30 rounded-lg">
                <span className="text-destructive line-through font-mono">{change.original}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-primary font-mono">{change.transformed}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTransformer;
