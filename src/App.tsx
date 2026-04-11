import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontModeProvider } from "@/hooks/useFontMode";

const BrandLayout = lazy(() => import("./components/brand/BrandLayout"));
const HomePage = lazy(() => import("./pages/brand/HomePage"));
const AboutPage = lazy(() => import("./pages/brand/AboutPage"));
const PositioningPage = lazy(() => import("./pages/brand/PositioningPage"));
const PrinciplesPage = lazy(() => import("./pages/brand/PrinciplesPage"));
const VisualSystemPage = lazy(() => import("./pages/brand/VisualSystemPage"));
const ColorPage = lazy(() => import("./pages/brand/ColorPage"));
const TypographyPage = lazy(() => import("./pages/brand/TypographyPage"));
const LogoAssetsPage = lazy(() => import("./pages/brand/LogoAssetsPage"));
const VoicePage = lazy(() => import("./pages/brand/VoicePage"));
const ImageryPage = lazy(() => import("./pages/brand/ImageryPage"));
const ApplicationsPage = lazy(() => import("./pages/brand/ApplicationsPage"));
const ProofPage = lazy(() => import("./pages/brand/ProofPage"));
const SocialMediaPage = lazy(() => import("./pages/brand/SocialMediaPage"));
const ToolsPage = lazy(() => import("./pages/brand/ToolsPage"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground font-ui">Loading...</span>
    </div>
  </div>
);

const App = () => (
  <FontModeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<BrandLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="positioning" element={<PositioningPage />} />
              <Route path="principles" element={<PrinciplesPage />} />
              <Route path="visual-system" element={<VisualSystemPage />} />
              <Route path="color" element={<ColorPage />} />
              <Route path="typography" element={<TypographyPage />} />
              <Route path="logo-assets" element={<LogoAssetsPage />} />
              <Route path="voice" element={<VoicePage />} />
              <Route path="imagery" element={<ImageryPage />} />
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="proof" element={<ProofPage />} />
              <Route path="social-media" element={<SocialMediaPage />} />
              <Route path="tools" element={<ToolsPage />} />
            </Route>
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </FontModeProvider>
);

export default App;
