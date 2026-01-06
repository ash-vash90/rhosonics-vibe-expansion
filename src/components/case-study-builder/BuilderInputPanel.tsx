import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "./ImageUploader";
import { ChartSection } from "./ChartSection";
import { VisualCaseStudy, INDUSTRY_OPTIONS, PRODUCT_OPTIONS } from "@/types/visualCaseStudy";

interface BuilderInputPanelProps {
  caseStudy: VisualCaseStudy;
  onChange: (updates: Partial<VisualCaseStudy>) => void;
}

export const BuilderInputPanel = ({ caseStudy, onChange }: BuilderInputPanelProps) => {
  const updateResult = (index: number, value: string) => {
    const newResults = [...caseStudy.results];
    newResults[index] = value;
    onChange({ results: newResults });
  };

  const addResult = () => {
    onChange({ results: [...caseStudy.results, ""] });
  };

  const removeResult = (index: number) => {
    if (caseStudy.results.length <= 1) return;
    onChange({ results: caseStudy.results.filter((_, i) => i !== index) });
  };

  const updateSpec = (index: number, field: "label" | "value", value: string) => {
    const newSpecs = [...caseStudy.specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    onChange({ specs: newSpecs });
  };

  const addSpec = () => {
    onChange({ specs: [...caseStudy.specs, { label: "", value: "" }] });
  };

  const removeSpec = (index: number) => {
    if (caseStudy.specs.length <= 1) return;
    onChange({ specs: caseStudy.specs.filter((_, i) => i !== index) });
  };

  return (
    <div className="h-full overflow-y-auto">
      <Accordion type="multiple" defaultValue={["identity", "content"]} className="px-4 pb-4">
        {/* Hero & Identity */}
        <AccordionItem value="identity">
          <AccordionTrigger className="text-sm font-semibold">
            Hero & Identity
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Hero Image */}
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <ImageUploader
                value={caseStudy.heroImage}
                onChange={(v) => onChange({ heroImage: v })}
                aspectRatio="16/9"
                label="Upload hero image"
                className="min-h-[120px]"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={caseStudy.company}
                onChange={(e) => onChange({ company: e.target.value })}
                placeholder="e.g., Rio Tinto"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={caseStudy.location}
                onChange={(e) => onChange({ location: e.target.value })}
                placeholder="e.g., Pilbara, Western Australia"
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select
                value={caseStudy.industry}
                onValueChange={(v) => onChange({ industry: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product */}
            <div className="space-y-2">
              <Label>Product</Label>
              <Select
                value={caseStudy.product}
                onValueChange={(v) => onChange({ product: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_OPTIONS.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Content */}
        <AccordionItem value="content">
          <AccordionTrigger className="text-sm font-semibold">
            Content
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Tagline */}
            <div className="space-y-2">
              <Label>Tagline / Headline</Label>
              <Textarea
                value={caseStudy.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
                placeholder="e.g., Achieving precision density measurement in extreme conditions"
                rows={2}
              />
            </div>

            {/* Challenge */}
            <div className="space-y-2">
              <Label>The Challenge</Label>
              <Textarea
                value={caseStudy.challenge}
                onChange={(e) => onChange({ challenge: e.target.value })}
                placeholder="Describe the problem the customer faced..."
                rows={4}
              />
            </div>

            {/* Solution */}
            <div className="space-y-2">
              <Label>The Solution</Label>
              <Textarea
                value={caseStudy.solution}
                onChange={(e) => onChange({ solution: e.target.value })}
                placeholder="Describe how Rhosonics solved the problem..."
                rows={4}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Results & Data */}
        <AccordionItem value="results">
          <AccordionTrigger className="text-sm font-semibold">
            Results & Data
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Primary Stat */}
            <div className="space-y-2">
              <Label>Primary Statistic</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={caseStudy.primaryStat.value}
                  onChange={(e) => onChange({ primaryStat: { ...caseStudy.primaryStat, value: e.target.value } })}
                  placeholder="e.g., ±0.5%"
                />
                <Input
                  value={caseStudy.primaryStat.label}
                  onChange={(e) => onChange({ primaryStat: { ...caseStudy.primaryStat, label: e.target.value } })}
                  placeholder="e.g., Accuracy"
                />
              </div>
            </div>

            {/* Key Results */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Key Results</Label>
                <Button variant="ghost" size="sm" onClick={addResult}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {caseStudy.results.map((result, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={result}
                      onChange={(e) => updateResult(i, e.target.value)}
                      placeholder={`Result ${i + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                      onClick={() => removeResult(i)}
                      disabled={caseStudy.results.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Specifications</Label>
                <Button variant="ghost" size="sm" onClick={addSpec}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {caseStudy.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={spec.label}
                      onChange={(e) => updateSpec(i, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) => updateSpec(i, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                      onClick={() => removeSpec(i)}
                      disabled={caseStudy.specs.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-2">
              <Label>Chart / Data Visualization</Label>
              <ChartSection
                chartImage={caseStudy.chartImage}
                chartData={caseStudy.chartData}
                onChartImageChange={(v) => onChange({ chartImage: v })}
                onChartDataChange={(v) => onChange({ chartData: v })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Quote */}
        <AccordionItem value="quote">
          <AccordionTrigger className="text-sm font-semibold">
            Quote & Testimonial
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label>Include Quote</Label>
              <Switch
                checked={!!caseStudy.quote}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange({ quote: { text: "", author: "", role: "" } });
                  } else {
                    onChange({ quote: undefined });
                  }
                }}
              />
            </div>

            {caseStudy.quote && (
              <>
                <div className="space-y-2">
                  <Label>Quote Text</Label>
                  <Textarea
                    value={caseStudy.quote.text}
                    onChange={(e) => onChange({ quote: { ...caseStudy.quote!, text: e.target.value } })}
                    placeholder="Enter the testimonial quote..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Author Name</Label>
                    <Input
                      value={caseStudy.quote.author}
                      onChange={(e) => onChange({ quote: { ...caseStudy.quote!, author: e.target.value } })}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Role</Label>
                    <Input
                      value={caseStudy.quote.role}
                      onChange={(e) => onChange({ quote: { ...caseStudy.quote!, role: e.target.value } })}
                      placeholder="e.g., Process Engineer"
                    />
                  </div>
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
