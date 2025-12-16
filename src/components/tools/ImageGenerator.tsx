import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Loader2, Image as ImageIcon, Upload, X, History, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ASPECT_RATIOS = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Standard (4:3)" },
];

interface ImageHistoryItem {
  id: string;
  prompt: string;
  image_url: string;
  reference_images: string[];
  aspect_ratio: string;
  created_at: string;
}

export const ImageGenerator = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ImageHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await (supabase as any)
        .from("image_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching history:", error);
      } else {
        setHistory((data as ImageHistoryItem[]) || []);
      }
    } catch (e) {
      console.error("Failed to fetch history:", e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const saveToHistory = async (promptText: string, generatedImageUrl: string, refImages: string[], ratio: string) => {
    if (!user) return;
    try {
      const { error } = await (supabase as any).from("image_history").insert({
        user_id: user.id,
        prompt: promptText,
        image_url: generatedImageUrl,
        reference_images: refImages,
        aspect_ratio: ratio,
      });
      if (error) {
        console.error("Error saving to history:", error);
      } else {
        fetchHistory();
      }
    } catch (e) {
      console.error("Failed to save to history:", e);
    }
  };

  const deleteFromHistory = async (id: string) => {
    try {
      const { error } = await (supabase as any).from("image_history").delete().eq("id", id);
      if (error) throw error;
      setHistory(history.filter(item => item.id !== id));
      toast.success("Image removed from history");
    } catch (e) {
      console.error("Failed to delete:", e);
      toast.error("Failed to remove image");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxImages = 4;
    const remainingSlots = maxImages - referenceImages.length;
    
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} reference images allowed`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    
    for (const file of filesToProcess) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setReferenceImages(prev => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setImageUrl("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-brand-image", {
        body: { 
          prompt, 
          aspectRatio,
          referenceImages: referenceImages.length > 0 ? referenceImages : undefined,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setImageUrl(data.imageUrl);
      toast.success("Image generated successfully");
      
      // Save to history if logged in
      if (user) {
        await saveToHistory(prompt, data.imageUrl, referenceImages, aspectRatio);
      }
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

  const useHistoryItem = (item: ImageHistoryItem) => {
    setPrompt(item.prompt);
    setAspectRatio(item.aspect_ratio);
    setReferenceImages(item.reference_images || []);
    setShowHistory(false);
    toast.success("Loaded from history");
  };

  const useAsReference = (imageUrl: string) => {
    if (referenceImages.length >= 4) {
      toast.error("Maximum 4 reference images allowed");
      return;
    }
    setReferenceImages(prev => [...prev, imageUrl]);
    setShowHistory(false);
    toast.success("Added as reference image");
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Auth Banner */}
      {!user && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground/80">
            <button 
              onClick={() => navigate("/auth")} 
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
            {" "}to save your generated images and access your history.
          </p>
        </div>
      )}

      {/* History Toggle */}
      {user && (
        <div className="flex items-center justify-between">
          <Button
            variant={showHistory ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="w-4 h-4 mr-2" />
            {showHistory ? "Hide History" : "Show History"}
          </Button>
          {showHistory && (
            <span className="text-xs text-muted-foreground">
              {history.length} saved images
            </span>
          )}
        </div>
      )}

      {/* History Gallery */}
      {showHistory && user && (
        <div className="border border-border rounded-lg p-4 bg-muted/20">
          {loadingHistory ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              No images yet. Generate your first image!
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative border border-border rounded-lg overflow-hidden bg-background"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.prompt}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <p className="text-xs text-foreground/80 text-center line-clamp-2 mb-1">
                      {item.prompt}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => useHistoryItem(item)}
                        className="h-7 text-xs"
                      >
                        Reuse
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => useAsReference(item.image_url)}
                        className="h-7 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFromHistory(item.id)}
                        className="h-7 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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

        {/* Multiple Reference Images */}
        <div>
          <label className="label-tech mb-2 block text-foreground/70">
            Reference Images ({referenceImages.length}/4)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {referenceImages.map((img, index) => (
              <div 
                key={index} 
                className="relative border border-border rounded-lg overflow-hidden bg-muted/30 aspect-square"
              >
                <img 
                  src={img} 
                  alt={`Reference ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeReferenceImage(index)}
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
                <span className="absolute bottom-1 left-1 bg-background/80 text-xs px-1.5 py-0.5 rounded font-data">
                  #{index + 1}
                </span>
              </div>
            ))}
            
            {referenceImages.length < 4 && (
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square h-auto border-dashed flex flex-col gap-1 hover:bg-muted/50"
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add</span>
              </Button>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {referenceImages.length === 0 
              ? "Upload images to use as style references or to blend together"
              : referenceImages.length === 1
              ? "Single reference for style transfer"
              : `${referenceImages.length} images for style blending`
            }
          </p>
        </div>

        <div>
          <label className="label-tech mb-2 block text-foreground/70">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={referenceImages.length > 0 
              ? referenceImages.length === 1
                ? "Describe how to transform this image... e.g., 'Apply Rhosonics brand colors and add ultrasonic wave patterns'"
                : "Describe how to blend these images... e.g., 'Combine the composition of #1 with the color palette of #2'"
              : "Describe the image you want... e.g., 'Industrial facility with ultrasonic measurement equipment, minimalist composition'"
            }
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
              {referenceImages.length > 1 ? "Blending..." : referenceImages.length === 1 ? "Transforming..." : "Generating..."}
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 mr-2" />
              {referenceImages.length > 1 ? "Blend Images" : referenceImages.length === 1 ? "Transform Image" : "Generate Brand Image"}
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