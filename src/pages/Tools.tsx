import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { TextGenerator } from "@/components/tools/TextGenerator";
import { ImageGenerator } from "@/components/tools/ImageGenerator";
import { ChartGenerator } from "@/components/tools/ChartGenerator";
import { Type, Image, BarChart3, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Tools = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-800 bg-rho-obsidian/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-ui text-sm">Back to Guide</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <div>
              <span className="font-logo text-lg text-slate-100">Rhosonics</span>
              <span className="label-tech-sm text-slate-500 ml-2">AI TOOLS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-ui text-3xl text-slate-100 mb-2">Brand AI Tools</h1>
          <p className="font-ui text-slate-400">
            Generate on-brand text, images, and charts using AI trained on our design system.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700 p-1 w-full grid grid-cols-3">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Type className="w-4 h-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Image className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger
              value="chart"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Chart
            </TabsTrigger>
          </TabsList>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <TabsContent value="text" className="mt-0">
              <div className="mb-6">
                <h2 className="font-ui text-xl text-slate-100 mb-1">Text Generator</h2>
                <p className="font-mono text-xs text-slate-500">
                  Generate copy that follows our brand voice: Direct, Technical, Confident, Practical.
                </p>
              </div>
              <TextGenerator />
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div className="mb-6">
                <h2 className="font-ui text-xl text-slate-100 mb-1">Image Generator</h2>
                <p className="font-mono text-xs text-slate-500">
                  Create visuals using our brand colors, material aesthetic, and industrial style.
                </p>
              </div>
              <ImageGenerator />
            </TabsContent>

            <TabsContent value="chart" className="mt-0">
              <div className="mb-6">
                <h2 className="font-ui text-xl text-slate-100 mb-1">Chart Generator</h2>
                <p className="font-mono text-xs text-slate-500">
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
