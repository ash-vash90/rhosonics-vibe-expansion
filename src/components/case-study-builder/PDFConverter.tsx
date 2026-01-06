import { useState, useRef } from "react";
import { Upload, FileText, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VisualCaseStudy } from "@/types/visualCaseStudy";
import { cn } from "@/lib/utils";

interface PDFConverterProps {
  onConvert: (caseStudy: VisualCaseStudy) => void;
  onClose: () => void;
}

export const PDFConverter = ({ onConvert, onClose }: PDFConverterProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [".pdf", ".docx", ".txt", ".md"];
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    if (!validTypes.includes(ext)) {
      setError("Please upload a PDF, DOCX, TXT, or MD file.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadedFile(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Please sign in to use the PDF converter.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await supabase.functions.invoke("parse-document", {
        body: formData,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to parse document");
      }

      const { text, fileName } = response.data;
      
      if (!text || text.length < 50) {
        throw new Error("Could not extract enough text from the document. Try copying and pasting the content manually.");
      }

      setUploadedFile({ name: fileName, text });
      toast({
        title: "Document Parsed",
        description: `Extracted ${text.length.toLocaleString()} characters from ${fileName}`,
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload file");
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = async () => {
    if (!uploadedFile) return;

    setIsConverting(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Please sign in to convert documents.");
      }

      const response = await supabase.functions.invoke("convert-case-study", {
        body: { text: uploadedFile.text, fileName: uploadedFile.name },
      });

      if (response.error) {
        throw new Error(response.error.message || "Conversion failed");
      }

      const { caseStudy } = response.data;
      
      toast({
        title: "Conversion Complete",
        description: "Case study has been converted. Review and edit as needed.",
      });

      onConvert(caseStudy);
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof Error ? err.message : "Failed to convert document");
    }

    setIsConverting(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isUploading ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md"
          onChange={handleFileSelect}
          className="sr-only"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Parsing document...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-10 h-10 text-muted-foreground" />
              <div>
                <p className="font-medium">Upload a case study document</p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOCX, TXT, or MD files supported
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      {/* Uploaded File */}
      {uploadedFile && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {uploadedFile.text.length.toLocaleString()} characters extracted
              </p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                {uploadedFile.text.substring(0, 300)}...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleConvert}
          disabled={!uploadedFile || isConverting}
          className="gap-2"
        >
          {isConverting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Convert with AI
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
