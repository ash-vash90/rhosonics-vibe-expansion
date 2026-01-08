import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const Tools = lazy(() => import("./pages/Tools"));
const Auth = lazy(() => import("./pages/Auth"));
const ContentLibrary = lazy(() => import("./pages/ContentLibrary"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyPrint = lazy(() => import("./pages/CaseStudyPrint"));
const CaseStudyBuilder = lazy(() => import("./pages/CaseStudyBuilder"));
const CaseStudyBuilderPrint = lazy(() => import("./pages/CaseStudyBuilderPrint"));
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
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/library" element={<ContentLibrary />} />
          <Route path="/case-studies/:id/print" element={<CaseStudyPrint />} />
          <Route path="/case-studies/builder/print" element={<CaseStudyBuilderPrint />} />
          <Route path="/case-studies/builder/:id?" element={<CaseStudyBuilder />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
