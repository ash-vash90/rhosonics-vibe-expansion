import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const ASPECT_RATIOS = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
];

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setImageUrl("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-brand-image", {
        body: { prompt, aspectRatio },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setImageUrl(data.imageUrl);
      toast.success("Image generated successfully");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `rhosonics-brand-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <label className="label-tech mb-2 block text-foreground/70">Aspect Ratio</label>
          <Select value={aspectRatio} onValueChange={setAspectRatio}>
            <SelectTrigger className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ASPECT_RATIOS.map((opt) => (
                <SelectItem 
                  key={opt.value} 
                  value={opt.value}
                  className="text-foreground focus:bg-primary/20"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="label-tech mb-2 block text-foreground/70">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want... e.g., 'Industrial facility with ultrasonic measurement equipment, minimalist composition'"
            className="min-h-[140px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground font-ui focus:border-primary focus:ring-primary/20"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full h-12 text-base font-ui"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 mr-2" />
              Generate Brand Image
            </>
          )}
        </Button>
      </div>

      {imageUrl && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <label className="label-tech text-primary">Generated Image</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
            <img
              src={imageUrl}
              alt="Generated brand image"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
