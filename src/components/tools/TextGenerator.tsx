import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const CONTEXT_OPTIONS = [
  { value: "product", label: "Product Description" },
  { value: "marketing", label: "Marketing Copy" },
  { value: "technical", label: "Technical Documentation" },
  { value: "support", label: "Customer Support" },
  { value: "internal", label: "Internal Communications" },
];

export const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("product");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setOutput("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-brand-text", {
        body: { prompt, context },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setOutput(data.text);
      toast.success("Text generated successfully");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="label-tech mb-2 block text-slate-400">Context</label>
          <Select value={context} onValueChange={setContext}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONTEXT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="label-tech mb-2 block text-slate-400">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write... e.g., 'Write a product description for the SDM ECO inline density meter'"
            className="min-h-[120px] bg-slate-800/50 border-slate-700 font-ui"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Brand Text
            </>
          )}
        </Button>
      </div>

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label-tech text-slate-400">Output</label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-slate-200 font-ui whitespace-pre-wrap">{output}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
