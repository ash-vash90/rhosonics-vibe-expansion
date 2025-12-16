import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Loader2, Sparkles, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="label-tech mb-2 block text-slate-300">Context</label>
          <Select value={context} onValueChange={setContext}>
            <SelectTrigger className="bg-slate-900/60 border-slate-600 text-slate-200 focus:border-primary focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {CONTEXT_OPTIONS.map((opt) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="text-slate-200 focus:bg-primary/20 focus:text-slate-100"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="label-tech mb-2 block text-slate-300">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to write... e.g., 'Write a product description for the SDM ECO inline density meter'"
            className="min-h-[140px] bg-slate-900/60 border-slate-600 text-slate-100 placeholder:text-slate-500 font-ui focus:border-primary focus:ring-primary/20"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full h-12 text-base font-ui bg-primary hover:bg-primary/90 text-slate-950"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Brand Text
            </>
          )}
        </Button>
      </div>

      {output && (
        <div className="space-y-3 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <label className="label-tech text-primary">Output</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
            >
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
          <div className="p-5 bg-slate-900/80 border border-slate-600 rounded-lg">
            <p className="text-slate-100 font-ui leading-relaxed whitespace-pre-wrap">{output}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
