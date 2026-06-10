import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FontModeProvider } from "@/hooks/useFontMode";

const BrandLayout = lazy(() => import("./components/brand/BrandLayout"));
const HomePage = lazy(() => import("./pages/brand/HomePage"));
const PositioningPage = lazy(() => import("./pages/brand/PositioningPage"));
const VoicePage = lazy(() => import("./pages/brand/VoicePage"));
const LogoAssetsPage = lazy(() => import("./pages/brand/LogoAssetsPage"));
const ColorPage = lazy(() => import("./pages/brand/ColorPage"));
const TypographyPage = lazy(() => import("./pages/brand/TypographyPage"));
const IconographyPage = lazy(() => import("./pages/brand/IconographyPage"));
const ImageryPage = lazy(() => import("./pages/brand/ImageryPage"));
const DataVizPage = lazy(() => import("./pages/brand/DataVizPage"));
const ApplicationsPage = lazy(() => import("./pages/brand/ApplicationsPage"));
const ProofPage = lazy(() => import("./pages/brand/ProofPage"));
const ResourcesPage = lazy(() => import("./pages/brand/ResourcesPage"));
const ToolsPage = lazy(() => import("./pages/brand/ToolsPage"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const SketchesPage = import.meta.env.DEV
  ? lazy(() => import("./pages/SketchesPage"))
  : null;
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
              {/* 00 Introduction */}
              <Route index element={<HomePage />} />

              {/* 01 Brand Position */}
              <Route path="position" element={<PositioningPage />} />

              {/* 02 Voice & Tone */}
              <Route path="voice" element={<VoicePage />} />

              {/* 03 Logo */}
              <Route path="logo" element={<LogoAssetsPage />} />

              {/* 04 Color */}
              <Route path="color" element={<ColorPage />} />

              {/* 05 Typography */}
              <Route path="typography" element={<TypographyPage />} />

              {/* 06 Iconography */}
              <Route path="iconography" element={<IconographyPage />} />

              {/* 07 Imagery */}
              <Route path="imagery" element={<ImageryPage />} />

              {/* 08 Data Visualization */}
              <Route path="data-viz" element={<DataVizPage />} />

              {/* 09 Applications & Proof */}
              <Route path="applications" element={<ApplicationsPage />} />
              <Route path="proof" element={<ProofPage />} />

              {/* 10 Resources */}
              <Route path="resources" element={<ResourcesPage />} />

              {/* Appendix Tools */}
              <Route path="tools" element={<ToolsPage />} />

              {/* Legacy redirects */}
              <Route path="about" element={<Navigate to="/position" replace />} />
              <Route path="positioning" element={<Navigate to="/position" replace />} />
              <Route path="principles" element={<Navigate to="/position" replace />} />
              <Route path="visual-system" element={<Navigate to="/iconography" replace />} />
              <Route path="logo-assets" element={<Navigate to="/logo" replace />} />
              <Route path="social-media" element={<Navigate to="/applications" replace />} />
              <Route path="review" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/newsletter" element={<Newsletter />} />
            {SketchesPage && <Route path="/sketches" element={<SketchesPage />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </FontModeProvider>
);

export default App;
