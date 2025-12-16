import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { TextGenerator } from "@/components/tools/TextGenerator";
import { ImageGenerator } from "@/components/tools/ImageGenerator";
import { ChartGenerator } from "@/components/tools/ChartGenerator";
import { Type, Image, BarChart3, ArrowLeft, Sparkles, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Tools = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
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
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8">
                <RhosonicsLogo variant="gradient" />
              </div>
              <span className="font-logo text-base sm:text-lg text-foreground hidden sm:inline">Rhosonics</span>
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
            Generate on-brand text, images, and charts using AI trained on our design system.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="bg-muted border border-border p-1 sm:p-1.5 w-full grid grid-cols-3 rounded-lg h-auto">
            <TabsTrigger
              value="text"
              className="rounded-md font-ui text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-medium transition-all min-h-[44px] text-xs sm:text-sm touch-manipulation"
            >
              <Type className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="rounded-md font-ui text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-medium transition-all min-h-[44px] text-xs sm:text-sm touch-manipulation"
            >
              <Image className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger
              value="chart"
              className="rounded-md font-ui text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-medium transition-all min-h-[44px] text-xs sm:text-sm touch-manipulation"
            >
              <BarChart3 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Chart</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 md:p-8">
            <TabsContent value="text" className="mt-0">
              <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                <h2 className="font-ui text-xl sm:text-2xl text-foreground mb-1 sm:mb-2">Text Generator</h2>
                <p className="font-mono text-xs sm:text-sm text-muted-foreground">
                  Generate copy that follows our brand voice: Direct, Technical, Confident, Practical.
                </p>
              </div>
              <TextGenerator />
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                <h2 className="font-ui text-xl sm:text-2xl text-foreground mb-1 sm:mb-2">Image Generator</h2>
                <p className="font-mono text-xs sm:text-sm text-muted-foreground">
                  Create visuals using our brand colors, material aesthetic, and industrial style.
                </p>
              </div>
              <ImageGenerator />
            </TabsContent>

            <TabsContent value="chart" className="mt-0">
              <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                <h2 className="font-ui text-xl sm:text-2xl text-foreground mb-1 sm:mb-2">Chart Generator</h2>
                <p className="font-mono text-xs sm:text-sm text-muted-foreground">
                  Build data visualizations with exact brand styling. Export as code or PNG.
                </p>
              </div>
              <ChartGenerator />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Tools;