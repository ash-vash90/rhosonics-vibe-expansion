import React, { useState, useRef, useEffect } from "react";
import { MapPin, CheckCircle2, Gauge, Quote, Phone, Mail, Globe, ImageIcon, BarChart3, Upload, Plus, X } from "lucide-react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { BrandChart } from "@/components/tools/BrandChart";
import { TimeSeriesChartPreview } from "@/components/case-study-builder/TimeSeriesChartPreview";
import { ImageCropper } from "@/components/ui/image-cropper";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Page, Block, BlockContent } from "@/types/document";
import { cn } from "@/lib/utils";

interface CaseStudyData {
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  specs: { label: string; value: string }[];
  primaryStat: {
    value: string;
    label: string;
  };
  chartData?: any;
  chartImage?: string;
}

interface CaseStudyCanvasProps {
  pages: Page[];
  currentPageIndex: number;
  onUpdateBlock: (pageIndex: number, blockId: string, content: Partial<BlockContent>) => void;
  printMode?: boolean;
}

// Helper to extract data from blocks
function extractCaseStudyData(pages: Page[]): CaseStudyData {
  const data: CaseStudyData = {
    company: "",
    location: "",
    industry: "",
    product: "",
    heroImage: "",
    tagline: "",
    challenge: "",
    solution: "",
    results: [],
    specs: [],
    primaryStat: { value: "—", label: "" },
  };

  pages.forEach((page) => {
    page.blocks.forEach((block) => {
      switch (block.type) {
        case "hero-image":
          data.heroImage = block.content.imageUrl || "";
          break;
        case "identity-card":
          data.company = block.content.identity?.company || "";
          data.location = block.content.identity?.location || "";
          data.industry = block.content.identity?.industry || "";
          data.product = block.content.identity?.product || "";
          break;
        case "subheading":
          if (!data.tagline) {
            data.tagline = block.content.text || "";
          }
          break;
        case "challenge-solution":
          data.challenge = block.content.challengeSolution?.challenge || "";
          data.solution = block.content.challengeSolution?.solution || "";
          break;
        case "stat-card":
          data.primaryStat = {
            value: block.content.stat?.value || "—",
            label: block.content.stat?.label || "",
          };
          break;
        case "spec-table":
          data.specs = block.content.specs || [];
          break;
        case "results-grid":
          data.results = block.content.resultsGrid?.results || [];
          break;
        case "quote":
          if (block.content.quote) {
            data.quote = {
              text: block.content.quote.text || "",
              author: block.content.quote.author || "",
              role: block.content.quote.role || "",
            };
          }
          break;
        case "chart":
          data.chartData = block.content.chart;
          break;
      }
    });
  });

  return data;
}

// Find block by type
function findBlock(pages: Page[], type: string): { pageIndex: number; block: Block } | null {
  for (let i = 0; i < pages.length; i++) {
    const block = pages[i].blocks.find((b) => b.type === type);
    if (block) return { pageIndex: i, block };
  }
  return null;
}

export function CaseStudyCanvas({
  pages,
  currentPageIndex: _currentPageIndex,
  onUpdateBlock,
  printMode = false,
}: CaseStudyCanvasProps) {
  // _currentPageIndex available for future page-specific rendering
  void _currentPageIndex;
  
  const { toast } = useToast();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const data = extractCaseStudyData(pages);
  const isPlaceholder = (value: string) => !value || (value.startsWith("[") && value.endsWith("]"));

  // Inline editable text component - mirrors exact styling from CaseStudyDocument
  const EditableText = ({
    value,
    field,
    blockType,
    contentKey,
    className,
    placeholder,
    multiline = false,
    as: Component = "span",
  }: {
    value: string;
    field: string;
    blockType: string;
    contentKey: string;
    className?: string;
    placeholder?: string;
    multiline?: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    const ref = useRef<HTMLElement>(null);
    const isEditing = editingField === field;

    useEffect(() => {
      if (isEditing && ref.current) {
        ref.current.focus();
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, [isEditing]);

    const handleBlur = () => {
      if (ref.current) {
        const newValue = ref.current.textContent || "";
        const found = findBlock(pages, blockType);
        if (found) {
          const updateContent: Partial<BlockContent> = {};
          
          if (blockType === "identity-card") {
            updateContent.identity = {
              company: found.block.content.identity?.company || "",
              location: found.block.content.identity?.location || "",
              industry: found.block.content.identity?.industry || "",
              product: found.block.content.identity?.product || "",
              [contentKey]: newValue,
            };
          } else if (blockType === "challenge-solution") {
            updateContent.challengeSolution = {
              challenge: found.block.content.challengeSolution?.challenge || "",
              solution: found.block.content.challengeSolution?.solution || "",
              [contentKey]: newValue,
            };
          } else if (blockType === "stat-card") {
            updateContent.stat = {
              value: found.block.content.stat?.value || "",
              label: found.block.content.stat?.label || "",
              [contentKey]: newValue,
            };
          } else if (blockType === "subheading") {
            updateContent.text = newValue;
          } else if (blockType === "quote") {
            updateContent.quote = {
              text: found.block.content.quote?.text || "",
              author: found.block.content.quote?.author || "",
              role: found.block.content.quote?.role || "",
              [contentKey]: newValue,
            };
          }
          
          onUpdateBlock(found.pageIndex, found.block.id, updateContent);
        }
      }
      setEditingField(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditingField(null);
      }
      if (e.key === "Enter" && !multiline) {
        e.preventDefault();
        handleBlur();
      }
    };

    const Elem = Component as any;

    return (
      <Elem
        ref={ref}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onClick={() => !printMode && setEditingField(field)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          className,
          !printMode && "cursor-pointer hover:ring-2 hover:ring-primary/30 rounded-sm transition-all",
          isEditing && "ring-2 ring-primary outline-none bg-white/10"
        )}
      >
        {value || placeholder}
      </Elem>
    );
  };

  // Hero image upload handlers
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPendingImage(event.target?.result as string);
      setShowImageCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setShowImageCropper(false);
    setIsUploading(true);

    try {
      const fileName = `hero-${Date.now()}.jpg`;
      const filePath = `case-study-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("case-study-assets")
        .upload(filePath, croppedBlob, { contentType: "image/jpeg" });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("case-study-assets")
        .getPublicUrl(filePath);

      const found = findBlock(pages, "hero-image");
      if (found) {
        onUpdateBlock(found.pageIndex, found.block.id, { imageUrl: urlData.publicUrl });
      }

      toast({ title: "Image uploaded", description: "Hero image updated successfully" });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ title: "Upload failed", description: "Could not upload image", variant: "destructive" });
    } finally {
      setIsUploading(false);
      setPendingImage(null);
    }
  };

  // Results handlers
  const updateResult = (index: number, newValue: string) => {
    const found = findBlock(pages, "results-grid");
    if (found) {
      const newResults = [...data.results];
      newResults[index] = newValue;
      onUpdateBlock(found.pageIndex, found.block.id, {
        resultsGrid: { results: newResults },
      });
    }
  };

  const addResult = () => {
    const found = findBlock(pages, "results-grid");
    if (found) {
      onUpdateBlock(found.pageIndex, found.block.id, {
        resultsGrid: { results: [...data.results, ""] },
      });
    }
  };

  const removeResult = (index: number) => {
    const found = findBlock(pages, "results-grid");
    if (found) {
      const newResults = data.results.filter((_, i) => i !== index);
      onUpdateBlock(found.pageIndex, found.block.id, {
        resultsGrid: { results: newResults },
      });
    }
  };

  // Spec handlers
  const updateSpec = (index: number, field: "label" | "value", newValue: string) => {
    const found = findBlock(pages, "spec-table");
    if (found) {
      const newSpecs = [...data.specs];
      newSpecs[index] = { ...newSpecs[index], [field]: newValue };
      onUpdateBlock(found.pageIndex, found.block.id, { specs: newSpecs });
    }
  };

  const addSpec = () => {
    const found = findBlock(pages, "spec-table");
    if (found) {
      onUpdateBlock(found.pageIndex, found.block.id, {
        specs: [...data.specs, { label: "", value: "" }],
      });
    }
  };

  const removeSpec = (index: number) => {
    const found = findBlock(pages, "spec-table");
    if (found) {
      const newSpecs = data.specs.filter((_, i) => i !== index);
      onUpdateBlock(found.pageIndex, found.block.id, { specs: newSpecs });
    }
  };

  // Build chart data for BrandChart
  const chartDataForBrand = data.chartData?.dataPoints?.map((dp: any) => ({
    name: dp.name,
    value: dp.value,
    value2: dp.value2,
    value3: dp.value3,
  })) || null;

  return (
    <div
      className="case-study-document w-full flex flex-col items-start gap-8 py-8 px-4"
      data-document-canvas
    >
      {/* Hidden file input for hero image */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Image Cropper Dialog */}
      {pendingImage && (
        <ImageCropper
          imageSrc={pendingImage}
          open={showImageCropper}
          onOpenChange={setShowImageCropper}
          onCropComplete={handleCropComplete}
          aspectRatio={16 / 9}
        />
      )}

      {/* Page 1 - Cover & Introduction */}
      <article
        className={cn(
          "mx-auto bg-white shadow-2xl relative overflow-hidden flex flex-col",
          "w-[210mm] h-[297mm]",
          "print:shadow-none print:w-[210mm] print:h-[297mm]",
          printMode && "print-page"
        )}
        style={{ minHeight: "297mm", maxHeight: "297mm" }}
      >
        {/* Header Bar - EXACT match to CaseStudyDocument */}
        <div className="bg-rho-obsidian px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <div>
              <span className="font-logo text-white text-lg tracking-wide uppercase">RHOSONICS</span>
              <span className="label-tech-sm text-slate-400 block">ULTRASONIC MEASUREMENT SOLUTIONS</span>
            </div>
          </div>
          <div className="label-tech text-primary">CASE STUDY</div>
        </div>

        {/* Hero Image - EXACT match */}
        <div 
          className="relative h-[280px] overflow-hidden flex-shrink-0 group"
          onClick={() => !printMode && fileInputRef.current?.click()}
        >
          {data.heroImage ? (
            <img 
              src={data.heroImage} 
              alt={`${data.company} installation`}
              className="w-full h-full object-cover"
              loading={printMode ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <span className="text-sm">{printMode ? "No image" : "Click to upload hero image"}</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian/90 via-rho-obsidian/40 to-transparent" />
          
          {/* Upload overlay on hover */}
          {!printMode && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <div className="text-white text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium">
                  {isUploading ? "Uploading..." : "Click to change image"}
                </span>
              </div>
            </div>
          )}
          
          {/* Overlay Content - EXACT match */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-2 mb-2">
              <EditableText
                value={data.industry}
                field="industry"
                blockType="identity-card"
                contentKey="industry"
                placeholder="[Industry]"
                className={cn(
                  "px-3 py-1 label-tech-sm rounded",
                  isPlaceholder(data.industry) ? "bg-slate-500/50 text-white/70" : "bg-primary text-white"
                )}
              />
              <EditableText
                value={data.product}
                field="product"
                blockType="identity-card"
                contentKey="product"
                placeholder="[Product]"
                className={cn(
                  "px-3 py-1 backdrop-blur label-tech-sm rounded",
                  isPlaceholder(data.product) ? "bg-slate-500/50 text-white/70" : "bg-white/20 text-white"
                )}
              />
            </div>
            <EditableText
              value={data.company}
              field="company"
              blockType="identity-card"
              contentKey="company"
              placeholder="[Company Name]"
              as="h1"
              className={cn(
                "font-ui font-bold text-4xl mb-2 block",
                isPlaceholder(data.company) ? "text-white/50" : "text-white"
              )}
            />
            <div className={cn(
              "flex items-center gap-2",
              isPlaceholder(data.location) ? "text-white/40" : "text-white/80"
            )}>
              <MapPin className="w-4 h-4" />
              <EditableText
                value={data.location}
                field="location"
                blockType="identity-card"
                contentKey="location"
                placeholder="[Location]"
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          {/* Tagline - EXACT match */}
          <EditableText
            value={data.tagline}
            field="tagline"
            blockType="subheading"
            contentKey="text"
            placeholder="[Enter compelling tagline here]"
            as="p"
            className={cn(
              "text-xl font-semibold mb-6 border-l-4 border-primary pl-4 block",
              isPlaceholder(data.tagline) ? "text-slate-400 italic" : "text-primary"
            )}
          />

          {/* Two Column Layout - EXACT match: grid-cols-2 gap-8 */}
          <div className="grid grid-cols-2 gap-8 flex-1">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="label-tech text-slate-500 mb-2">THE CHALLENGE</h2>
                <EditableText
                  value={data.challenge}
                  field="challenge"
                  blockType="challenge-solution"
                  contentKey="challenge"
                  placeholder="[Describe the challenge faced by the customer]"
                  multiline
                  as="p"
                  className={cn(
                    "text-sm leading-relaxed block",
                    isPlaceholder(data.challenge) ? "text-slate-400 italic" : "text-slate-700"
                  )}
                />
              </div>

              <div>
                <h2 className="label-tech text-slate-500 mb-2">OUR SOLUTION</h2>
                <EditableText
                  value={data.solution}
                  field="solution"
                  blockType="challenge-solution"
                  contentKey="solution"
                  placeholder="[Describe the solution provided]"
                  multiline
                  as="p"
                  className={cn(
                    "text-sm leading-relaxed block",
                    isPlaceholder(data.solution) ? "text-slate-400 italic" : "text-slate-700"
                  )}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Primary Stat Card - EXACT match */}
              <div className="bg-rho-obsidian p-6 rounded-lg text-center">
                <EditableText
                  value={data.primaryStat.value}
                  field="stat-value"
                  blockType="stat-card"
                  contentKey="value"
                  placeholder="—"
                  className={cn(
                    "font-data text-4xl mb-1 block",
                    data.primaryStat.value === "—" ? "text-slate-500" : "text-primary"
                  )}
                />
                <EditableText
                  value={data.primaryStat.label}
                  field="stat-label"
                  blockType="stat-card"
                  contentKey="label"
                  placeholder="[Stat label]"
                  className={cn(
                    "label-tech-sm block",
                    isPlaceholder(data.primaryStat.label) ? "text-slate-500" : "text-slate-400"
                  )}
                />
              </div>

              {/* Specifications - EXACT match */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="label-tech text-slate-500 mb-3 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  SPECIFICATIONS
                </h3>
                <div className="space-y-2">
                  {data.specs.length > 0 ? (
                    data.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-200 last:border-0 group/spec">
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => updateSpec(i, "label", e.target.value)}
                          placeholder="[Label]"
                          disabled={printMode}
                          className={cn(
                            "text-slate-500 bg-transparent border-none outline-none flex-1 min-w-0",
                            !printMode && "hover:bg-slate-100 focus:bg-slate-100 rounded px-1 -mx-1"
                          )}
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => updateSpec(i, "value", e.target.value)}
                            placeholder="[Value]"
                            disabled={printMode}
                            className={cn(
                              "font-data text-slate-800 bg-transparent border-none outline-none text-right w-24",
                              !printMode && "hover:bg-slate-100 focus:bg-slate-100 rounded px-1"
                            )}
                          />
                          {!printMode && (
                            <button
                              onClick={() => removeSpec(i)}
                              className="opacity-0 group-hover/spec:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 italic">[Add specifications]</p>
                  )}
                  {!printMode && (
                    <button
                      onClick={addSpec}
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2"
                    >
                      <Plus className="w-3 h-3" />
                      Add specification
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - EXACT match */}
        <div className="bg-slate-100 px-8 py-3 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <span>www.rhosonics.com</span>
          <span>Page 1 of 2</span>
        </div>
      </article>

      {/* Page 2 - Results & Data */}
      <article
        className={cn(
          "mx-auto bg-white shadow-2xl relative overflow-hidden flex flex-col",
          "w-[210mm] h-[297mm]",
          "print:shadow-none print:w-[210mm] print:h-[297mm]",
          printMode && "print-page"
        )}
        style={{ minHeight: "297mm", maxHeight: "297mm" }}
      >
        {/* Header Bar - EXACT match */}
        <div className="bg-rho-obsidian px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-white text-lg tracking-wide uppercase">RHOSONICS</span>
          </div>
          <div className="label-tech text-slate-400">
            {(isPlaceholder(data.company) ? "COMPANY" : data.company).toUpperCase()} — RESULTS
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          {/* Results Section - EXACT match */}
          <div className="mb-8">
            <h2 className="label-tech text-slate-500 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              KEY RESULTS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {data.results.length > 0 && data.results.some(r => r.trim()) ? (
                data.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3 bg-eco-surface p-3 rounded-lg group/result">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-data text-xs text-primary">{i + 1}</span>
                    </div>
                    {printMode ? (
                      <span className={cn(
                        "text-sm flex-1",
                        result.trim() ? "text-slate-700" : "text-slate-400 italic"
                      )}>
                        {result || "[Key result]"}
                      </span>
                    ) : (
                      <div className="flex-1 flex items-start gap-1">
                        <input
                          type="text"
                          value={result}
                          onChange={(e) => updateResult(i, e.target.value)}
                          placeholder="[Key result]"
                          className={cn(
                            "text-sm bg-transparent border-none outline-none flex-1 min-w-0",
                            "hover:bg-white/50 focus:bg-white/50 rounded px-1 -mx-1",
                            result.trim() ? "text-slate-700" : "text-slate-400 italic"
                          )}
                        />
                        <button
                          onClick={() => removeResult(i)}
                          className="opacity-0 group-hover/result:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-slate-400 italic p-3 bg-eco-surface rounded-lg">
                  [Add key results]
                </div>
              )}
            </div>
            {!printMode && (
              <button
                onClick={addResult}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-3"
              >
                <Plus className="w-3 h-3" />
                Add result
              </button>
            )}
          </div>

          {/* Chart Section */}
          {data.chartData && chartDataForBrand && !printMode && (
            <div className="mb-8">
              <h2 className="label-tech text-slate-500 mb-4">
                {data.chartData.title || "MEASUREMENT DATA"}
              </h2>
              {(data.chartData.type === "timeseries" || data.chartData.type === "timeseries-comparison") ? (
                <TimeSeriesChartPreview data={data.chartData} height={240} printMode={printMode} />
              ) : (
                <div className={cn(
                  "rounded-lg p-4 h-[240px] overflow-hidden",
                  data.chartData.background === "dark" ? "bg-rho-obsidian" : "bg-slate-50 border border-slate-200"
                )}>
                  <BrandChart
                    chartType={data.chartData.type}
                    data={chartDataForBrand}
                    colors={{
                      primary: data.chartData.colors.primary,
                      secondary: data.chartData.colors.secondary || "#73B82E",
                      tertiary: data.chartData.colors.tertiary || "#a69359",
                    }}
                    isLightBg={data.chartData.background === "light"}
                  />
                </div>
              )}
            </div>
          )}

          {/* Chart Placeholder */}
          {!data.chartData && !printMode && (
            <div className="mb-8">
              <h2 className="label-tech text-slate-500 mb-4">DATA VISUALIZATION</h2>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-slate-400 h-[200px]">
                <BarChart3 className="w-10 h-10 mb-2" />
                <span className="text-sm">Generate or upload a chart</span>
              </div>
            </div>
          )}

          {/* Quote Section - EXACT match */}
          {data.quote ? (
            <div className="bg-gradient-to-br from-slate-50 to-eco-surface border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <Quote className="w-6 h-6 text-primary/30 mb-2" />
              <blockquote className="text-base italic mb-3">
                "
                <EditableText
                  value={data.quote.text}
                  field="quote-text"
                  blockType="quote"
                  contentKey="text"
                  placeholder="[Enter quote text]"
                  multiline
                  className={data.quote.text ? "text-slate-700" : "text-slate-400"}
                />
                "
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-ui font-bold text-primary text-xs">
                    {data.quote.author ? data.quote.author.split(' ').map(n => n[0]).join('') : "?"}
                  </span>
                </div>
                <div>
                  <EditableText
                    value={data.quote.author}
                    field="quote-author"
                    blockType="quote"
                    contentKey="author"
                    placeholder="[Author name]"
                    className={cn(
                      "font-ui font-semibold text-sm block",
                      data.quote.author ? "text-slate-800" : "text-slate-400"
                    )}
                  />
                  <EditableText
                    value={data.quote.role}
                    field="quote-role"
                    blockType="quote"
                    contentKey="role"
                    placeholder="[Role]"
                    className={cn(
                      "text-xs block",
                      data.quote.role ? "text-slate-500" : "text-slate-400"
                    )}
                  />
                </div>
              </div>
            </div>
          ) : !printMode && (
            <div 
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 mb-8 text-center text-slate-400 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                const found = findBlock(pages, "quote");
                if (found) {
                  onUpdateBlock(found.pageIndex, found.block.id, {
                    quote: { text: "", author: "", role: "" },
                  });
                }
              }}
            >
              <Quote className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm">[Click to add customer quote]</span>
            </div>
          )}

          {/* Contact CTA - EXACT match */}
          <div className="mt-auto bg-rho-obsidian rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-ui font-semibold text-white mb-1">
                  Ready to optimize your process?
                </h3>
                <p className="text-sm text-slate-400">
                  Contact our team to discuss your measurement challenges.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:+31341370073" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +31 341 37 00 73
                </a>
                <a href="mailto:info@rhosonics.com" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  info@rhosonics.com
                </a>
                <a href="https://rhosonics.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" />
                  www.rhosonics.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - EXACT match */}
        <div className="bg-slate-100 px-8 py-3 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span>Hoge Eng West 30, 3882 TR Putten, Netherlands</span>
          </div>
          <span>Page 2 of 2</span>
        </div>
      </article>
    </div>
  );
}

export default CaseStudyCanvas;
