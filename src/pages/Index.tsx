import { Suspense, lazy } from "react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { LazySection } from "@/components/LazySection";
import { ArrowDown, Zap } from "lucide-react";

// Lazy load heavier components for better initial load performance
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

const ChapterHeader = ({ number, title, subtitle }: { number: string; title: string; subtitle: string }) => (
  <div className="py-20 md:py-32 border-t-2 border-slate-200">
    <div className="max-w-4xl">
      <span className="font-data text-sm text-slate-400 tracking-widest">{number}</span>
      <h2 className="font-ui text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">{title}</h2>
      <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

const Index = () => {
  const scrollToContent = () => {
    document.getElementById('the-problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BOLD STATEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-wave-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Logo mark */}
            <div className="w-20 h-20 md:w-28 md:h-28 mb-12">
              <AnimatedLogo />
            </div>
            
            {/* Bold statement */}
            <h1 className="font-ui text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8">
              We measure<br />
              <span className="text-primary">what others can't.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-16 leading-relaxed">
              Ultrasonic precision for industries where measurement isn't optional—it's operational.
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 md:gap-16 text-sm">
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">ESTABLISHED</span>
                <p className="text-white font-ui text-2xl mt-1">1984</p>
              </div>
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">HEADQUARTERS</span>
                <p className="text-white font-ui text-2xl mt-1">Netherlands</p>
              </div>
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">SPECIALIZATION</span>
                <p className="text-white font-ui text-2xl mt-1">Ultrasonic Density</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-data text-xs tracking-widest">SCROLL</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════ */}
      <main className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 01: THE PROBLEM
        ───────────────────────────────────────────────────────────── */}
        <section id="the-problem" className="py-20 md:py-32">
          <ChapterHeader 
            number="01" 
            title="The Problem" 
            subtitle="Industries run on measurement. But traditional methods fail when conditions get real."
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 bg-slate-50 border border-slate-200">
              <span className="font-data text-4xl text-slate-300">01</span>
              <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Invasive sensors fail</h3>
              <p className="text-slate-600">Contact-based measurement degrades in corrosive, abrasive, or high-temperature slurries. Downtime follows.</p>
            </div>
            <div className="p-8 bg-slate-50 border border-slate-200">
              <span className="font-data text-4xl text-slate-300">02</span>
              <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Lab sampling lags</h3>
              <p className="text-slate-600">Grab samples can't capture real-time process dynamics. By the time results arrive, the process has moved on.</p>
            </div>
            <div className="p-8 bg-slate-50 border border-slate-200">
              <span className="font-data text-4xl text-slate-300">03</span>
              <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Nuclear is complex</h3>
              <p className="text-slate-600">Radioactive density gauges require licensing, safety protocols, and specialized handling. Overkill for most applications.</p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 02: THE SOLUTION
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="02" 
          title="The Solution" 
          subtitle="Non-invasive ultrasonic measurement. No contact. No radiation. No compromise."
        />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 pb-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <RhosonicsLogo variant="gradient" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-ui text-2xl font-bold text-foreground">SDM ECO Technology</h3>
                <span className="font-data text-sm text-slate-500">ULTRASONIC DENSITY MEASUREMENT</span>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-slate-600">
              <p>Sound waves travel through the pipe wall, measuring slurry density from the outside. The sensor never touches the process fluid.</p>
              <p>No process penetration means no wear, no clogging, no contamination risk. The measurement keeps running while competitors' sensors get replaced.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <span className="font-data text-3xl text-primary font-bold">±0.5%</span>
              <p className="text-sm text-slate-600 mt-2">Measurement precision across full density range</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <span className="font-data text-3xl text-primary font-bold">99.8%</span>
              <p className="text-sm text-slate-600 mt-2">Uptime—no process interruption required</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <span className="font-data text-3xl text-primary font-bold">40+</span>
              <p className="text-sm text-slate-600 mt-2">Years of field-proven technology</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <span className="font-data text-3xl text-primary font-bold">0</span>
              <p className="text-sm text-slate-600 mt-2">Radiation licensing requirements</p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 03: THE HERITAGE
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="03" 
          title="The Heritage" 
          subtitle="From a Dutch garage to global industrial operations. The origin shapes everything."
        />
        
        <Suspense fallback={<SectionLoader />}>
          <OriginStory />
          <MissionVision />
        </Suspense>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 04: THE VISUAL IDENTITY
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="04" 
          title="The Visual Identity" 
          subtitle="Every element reflects precision. Colors from the field. Typography for clarity. No decoration without purpose."
        />
        
        <Suspense fallback={<SectionLoader />}>
          <ColorMatrix />
          <TypographyScale />
          <SpacingSystem />
          <LogoAssets />
          <IconGuidelines />
        </Suspense>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 05: THE VOICE
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="05" 
          title="The Voice" 
          subtitle="Direct. Technical. Confident. We speak like the engineers we serve—no fluff, no hedging."
        />
        
        <Suspense fallback={<SectionLoader />}>
          <VoiceTone />
          <MotionDesign />
          <DosAndDonts />
        </Suspense>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 06: THE APPLICATION
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="06" 
          title="The Application" 
          subtitle="Where the brand meets the field. Mining. Dredging. Water treatment. The harshest environments."
        />
        
        <Suspense fallback={<SectionLoader />}>
          <IndustryApplications />
          <EcoComponents />
          <ImageryGuidelines />
          <InterfaceKit />
        </Suspense>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 07: THE PROOF
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="07" 
          title="The Proof" 
          subtitle="Results from the field. Measurement comparisons. Real installations, real data."
        />
        
        <LazySection fallback={<SectionLoader />} rootMargin="400px">
          <Suspense fallback={<SectionLoader />}>
            <TechComparison />
          </Suspense>
        </LazySection>
        <Suspense fallback={<SectionLoader />}>
          <CaseStudies />
        </Suspense>

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 08: THE RESOURCES
        ───────────────────────────────────────────────────────────── */}
        <ChapterHeader 
          number="08" 
          title="The Resources" 
          subtitle="Download assets. Export guidelines. Everything you need to deploy the brand."
        />
        
        <Suspense fallback={<SectionLoader />}>
          <DownloadableAssets />
          <ExportSection />
        </Suspense>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════ */}
        <footer className="mt-20 py-12 border-t-2 border-slate-200" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10" aria-hidden="true">
                <RhosonicsLogo variant="gradient" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-ui font-semibold text-foreground">Rhosonics</p>
                <span className="font-data text-xs text-slate-500 tracking-widest">BRAND GUIDELINES</span>
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
