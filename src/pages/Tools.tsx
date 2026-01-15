import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { TextGenerator } from "@/components/tools/TextGenerator";
import { ImageGenerator } from "@/components/tools/ImageGenerator";
import { ChartGenerator } from "@/components/tools/ChartGenerator";
import { ContentTransformer } from "@/components/tools/ContentTransformer";
import { ComprehensiveCaseStudyBuilder } from "@/components/tools/ComprehensiveCaseStudyBuilder";
import { TemplateGenerator } from "@/components/tools/TemplateGenerator";
import { Type, Image, BarChart3, ArrowLeft, Sparkles, Sun, Moon, RefreshCw, FileText, FileStack } from "@/lib/icons";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VALID_TABS = ["text", "image", "chart", "transform", "casestudy", "templates"];

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const initialTab = tabFromUrl && VALID_TABS.includes(tabFromUrl) ? tabFromUrl : "text";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isDark, setIsDark] = useState(true);
  const [prefilledImagePrompt, setPrefilledImagePrompt] = useState("");

  // Sync URL when tab changes
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value }, { replace: true });
  }, [setSearchParams]);

  // Sync tab when URL changes (e.g., browser back/forward)
  useEffect(() => {
    if (tabFromUrl && VALID_TABS.includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  const handleOpenImageGenerator = useCallback((prompt: string) => {
    setPrefilledImagePrompt(prompt);
    handleTabChange("image");
  }, [handleTabChange]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const tabs = [
    { value: "text", label: "Text", icon: Type },
    { value: "image", label: "Image", icon: Image },
    { value: "chart", label: "Chart", icon: BarChart3 },
    { value: "transform", label: "Transform", icon: RefreshCw },
    { value: "casestudy", label: "Case Study", icon: FileText },
    { value: "templates", label: "Templates", icon: FileStack },
  ];

  const tabDescriptions: Record<string, { title: string; description: string }> = {
    text: {
      title: "Text Generator",
      description: "Generate copy that follows our brand voice: Direct, Technical, Confident, Practical.",
    },
    image: {
      title: "Image Generator",
      description: "Create visuals using our brand colors, material aesthetic, and industrial style.",
    },
    chart: {
      title: "Chart Generator",
      description: "Build data visualizations with exact brand styling. Export as code or PNG.",
    },
    transform: {
      title: "Content Transformer",
      description: "Transform existing content to match Rhosonics brand voice and terminology.",
    },
    casestudy: {
      title: "Case Study Builder",
      description: "Create comprehensive 10-section case studies with AI guidance and branded exports.",
    },
    templates: {
      title: "Template Generator",
      description: "Create brand-compliant documents, emails, and marketing materials.",
    },
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-ui text-sm hidden sm:inline">Back to Guide</span>
            <span className="font-ui text-xs sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-border h-10 w-10 touch-manipulation"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            {/* Logo lockup: 32/23px (UI headers) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div style={{ width: 32, height: 32 }}>
                <RhosonicsLogo variant="gradient" />
              </div>
              <span className="font-logo text-foreground tracking-wide uppercase hidden sm:inline" style={{ fontSize: 23 }}>RHOSONICS</span>
              <span className="px-1.5 sm:px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-[10px] sm:text-xs font-mono text-primary">
                AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-4xl">
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="label-tech text-primary text-xs sm:text-sm">BRAND GENERATION</span>
          </div>
          <h1 className="font-ui text-2xl sm:text-4xl text-foreground mb-2 sm:mb-3">AI Tools</h1>
          <p className="font-ui text-sm sm:text-lg text-muted-foreground">
            Generate, transform, and create brand-compliant content using AI trained on our design system.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4 sm:space-y-6">
          <TabsList className="bg-muted border border-border p-1 sm:p-1.5 w-full grid grid-cols-6 rounded-lg h-auto overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md font-ui text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-medium transition-all min-h-[44px] text-xs sm:text-sm touch-manipulation px-1 sm:px-3"
                >
                  <Icon className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 md:p-8">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                  <h2 className="font-ui text-xl sm:text-2xl text-foreground mb-1 sm:mb-2">
                    {tabDescriptions[tab.value].title}
                  </h2>
                  <p className="font-ui text-xs sm:text-sm text-muted-foreground">
                    {tabDescriptions[tab.value].description}
                  </p>
                </div>
                {tab.value === "text" && <TextGenerator />}
                {tab.value === "image" && (
                  <ImageGenerator 
                    initialPrompt={prefilledImagePrompt} 
                    onPromptConsumed={() => setPrefilledImagePrompt("")}
                  />
                )}
                {tab.value === "chart" && <ChartGenerator />}
                {tab.value === "transform" && <ContentTransformer />}
                {tab.value === "casestudy" && (
                  <ComprehensiveCaseStudyBuilder 
                    onOpenImageGenerator={handleOpenImageGenerator}
                  />
                )}
                {tab.value === "templates" && <TemplateGenerator />}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Tools;
