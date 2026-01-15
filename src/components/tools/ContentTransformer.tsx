import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, RefreshCw, Check, ArrowRight, Upload, FileText, X } from "@/lib/icons";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type TransformMode = "full" | "terminology" | "tone";

interface Change {
  original: string;
  transformed: string;
}

interface UploadedFile {
  name: string;
  size: number;
  text: string;
}

export const ContentTransformer = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<TransformMode>("full");
  const [changes, setChanges] = useState<Change[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/markdown",
    ];
    
    const allowedExtensions = [".pdf", ".docx", ".txt", ".md"];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!allowedTypes.includes(file.type) && !hasValidExtension) {
      toast.error("Please upload a PDF, DOCX, TXT, or MD file");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size must be under 20MB");
      return;
    }

    // For text files, read directly
    if (fileName.endsWith(".txt") || fileName.endsWith(".md")) {
      const text = await file.text();
      setUploadedFile({ name: file.name, size: file.size, text });
      setInput(text);
      toast.success(`Loaded ${file.name}`);
      return;
    }

    // For PDF/DOCX, use the edge function
    if (!user) {
      toast.error("Please log in to upload documents");
      return;
    }

    setIsParsing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/parse-document`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse document");
      }

      const data = await response.json();
      
      setUploadedFile({ name: file.name, size: file.size, text: data.text });
      setInput(data.text);
      toast.success(`Parsed ${file.name}`);
    } catch (error: any) {
      console.error("Parse error:", error);
      toast.error(error.message || "Failed to parse document");
    } finally {
      setIsParsing(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
                <span className="font-ui text-xs text-muted-foreground mt-1">
                  {modeDescriptions[m]}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* File Upload */}
      <div>
        <label className="label-tech mb-3 block text-foreground/70">Upload Document (Optional)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {uploadedFile ? (
          <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-lg">
            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm text-foreground truncate">{uploadedFile.name}</p>
              <p className="font-ui text-xs text-muted-foreground">
                {formatFileSize(uploadedFile.size)} • {uploadedFile.text.length.toLocaleString()} characters
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRemoveFile}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-20 border-dashed"
            onClick={() => fileInputRef.current?.click()}
            disabled={isParsing}
          >
            {isParsing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Parsing document...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-ui text-sm">Upload PDF, DOCX, TXT, or MD</div>
                  <div className="label-tech text-muted-foreground">Max 20MB</div>
                </div>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Two-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="label-tech text-foreground/70">Original Content</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your old content here or upload a document above... e.g., 'Our cutting-edge revolutionary product delivers amazing results instantly!'"
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
              <p className="text-muted-foreground font-ui text-sm italic">
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
                <span className="text-destructive line-through font-data">{change.original}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-primary font-data">{change.transformed}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTransformer;
