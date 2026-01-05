import { Suspense, lazy } from "react";
import { Navigation } from "@/components/brand/Navigation";
import { BrandEthos } from "@/components/brand/BrandEthos";
import { SectionBridge } from "@/components/brand/SectionBridge";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { LazySection } from "@/components/LazySection";
import { Zap } from "lucide-react";

// Lazy load heavier components for better initial load performance
const MasterLockup = lazy(() => import("@/components/brand/MasterLockup"));
const OriginStory = lazy(() => import("@/components/brand/OriginStory"));
const MissionVision = lazy(() => import("@/components/brand/MissionVision"));
const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));
const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));
const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const DownloadableAssets = lazy(() => import("@/components/brand/DownloadableAssets"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));
const DosAndDonts = lazy(() => import("@/components/brand/DosAndDonts"));
const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));

const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-[1400px] mx-auto w-full">
        {/* 01 / FOUNDATION */}
        <BrandEthos />
        <Suspense fallback={<SectionLoader />}>
          <MasterLockup />
          <OriginStory />
          <MissionVision />
          
          {/* 02 / SYSTEM */}
          <SectionBridge number="02" label="SYSTEM" bridge="The visual toolkit." />
          <ColorMatrix />
          <TypographyScale />
          <SpacingSystem />
          
          {/* 03 / ASSETS */}
          <SectionBridge number="03" label="ASSETS" bridge="What you download." />
          <LogoAssets />
          <IconGuidelines />
          <InterfaceKit />
          <DownloadableAssets />
          
          {/* 04 / SUSTAINABILITY */}
          <SectionBridge number="04" label="SUSTAINABILITY" bridge="The mission, applied." />
          <EcoComponents />
          <IndustryApplications />
          <ImageryGuidelines />
          
          {/* 05 / PRINCIPLES */}
          <SectionBridge number="05" label="PRINCIPLES" bridge="How not to misuse them." />
          <VoiceTone />
          <MotionDesign />
          <DosAndDonts />
        </Suspense>
        
        {/* 06 / ANALYSIS */}
        <SectionBridge number="06" label="ANALYSIS" bridge="Proof." />
        <LazySection fallback={<SectionLoader />} rootMargin="400px">
          <Suspense fallback={<SectionLoader />}>
            <TechComparison />
          </Suspense>
        </LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CaseStudies />
        </Suspense>
        
        {/* 07 / EXPORT */}
        <SectionBridge number="07" label="EXPORT" bridge="Take it offline." />
        <Suspense fallback={<SectionLoader />}>
          <ExportSection />
        </Suspense>
        
        {/* Footer */}
        <footer className="mt-20 pt-8 border-t-2 border-slate-200" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8" aria-hidden="true">
                <RhosonicsLogo variant="gradient" className="w-8 h-8" />
              </div>
              <div>
                <span className="label-ui text-slate-600">
                  RHOSONICS DESIGN SYSTEM
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>© {new Date().getFullYear()} Rhosonics. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
