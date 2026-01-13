import { Suspense, lazy, useEffect, useRef } from "react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { LazySection } from "@/components/LazySection";
import { Navigation } from "@/components/brand/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Lazy load section components
const AboutThisSystem = lazy(() => import("@/components/brand/AboutThisSystem"));
const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));
const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));
const VisualSystemOverview = lazy(() => import("@/components/brand/VisualSystemOverview"));
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
const BrandGallery = lazy(() => import("@/components/brand/BrandGallery"));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));
const SectionLoader = () => <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>;
const SectionDivider = () => <div className="py-12 md:py-16">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  </div>;
interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  id?: string;
}
const SectionHeader = ({
  number,
  title,
  subtitle,
  id
}: SectionHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const numEl = header.querySelector('.section-num');
    const titleEl = header.querySelector('.section-title');
    const subtitleEl = header.querySelector('.section-subtitle');
    if (!numEl || !titleEl || !subtitleEl) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(numEl, {
        opacity: 0,
        x: -30,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      gsap.fromTo(titleEl, {
        opacity: 0,
        scale: 0.95
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.15,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      gsap.fromTo(subtitleEl, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, header);
    return () => ctx.revert();
  }, []);
  return <div ref={headerRef} id={id} className="mb-12 md:mb-16 scroll-mt-24">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="section-num font-data text-sm text-primary font-medium">{number}</span>
          </div>
          <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>
        <h2 className="section-title font-ui text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h2>
        <p className="section-subtitle text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">{subtitle}</p>
      </div>
    </div>;
};
const Index = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Hero entrance animations
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.hero-logo', {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)'
      });
      gsap.set('.hero-version', {
        opacity: 0,
        y: -10
      });
      gsap.set('.hero-title', {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)'
      });
      gsap.set('.hero-subtitle', {
        opacity: 0,
        y: 30
      });
      gsap.set('.hero-scroll', {
        opacity: 0
      });

      // Create timeline
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });
      tl.to('.hero-logo', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8
      }).to('.hero-version', {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4').to('.hero-title', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      }, '-=0.3').to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4').to('.hero-scroll', {
        opacity: 1,
        duration: 0.8
      }, '-=0.2');
    }, hero);
    return () => ctx.revert();
  }, []);
  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background flex">
      {/* Left Navigation Sidebar */}
      <Navigation />
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
      
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BRAND SYSTEM INTRODUCTION
       ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-[70vh] flex flex-col justify-center relative bg-slate-950 overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsl(125_50%_40%/0.06),transparent)]" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(125 50% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(125 50% 40%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Content */}
        <div ref={heroContentRef} className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="hero-logo flex items-center justify-center mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20">
                <RhosonicsLogo variant="gradient" />
              </div>
            </div>
            
            {/* Version badge */}
            <span className="hero-version font-data text-xs text-slate-500 tracking-widest mb-6 block">
              VERSION 2025
            </span>
            
            {/* Main title */}
            <h1 className="hero-title font-ui text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Brand System
            </h1>
            
            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A system of decisions designed to ensure clarity, consistency, 
              and credibility wherever the brand appears.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button onClick={scrollToContent} className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer group" aria-label="Scroll to content">
          <div className="flex flex-col items-center gap-2">
            <span className="font-data text-[10px] tracking-widest opacity-60">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
          </div>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT
       ═══════════════════════════════════════════════════════════════ */}
      <main className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            SECTION 00: ABOUT THIS SYSTEM
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="about" number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />
          
          <Suspense fallback={<SectionLoader />}>
            <AboutThisSystem />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 01: BRAND POSITIONING
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="positioning" number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." />
          
          <Suspense fallback={<SectionLoader />}>
            <BrandPositioning />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 02: BRAND PRINCIPLES
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="principles" number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." />
          
          <Suspense fallback={<SectionLoader />}>
            <BrandPrinciples />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 03: THE VISUAL SYSTEM (OVERVIEW)
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="visual-system" number="03" title="The Visual System" subtitle="How the system is structured in layers." />
          
          <Suspense fallback={<SectionLoader />}>
            <VisualSystemOverview />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 04: COLOR
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="colors" number="04" title="Color Roles" subtitle="How color functions inside the system." />
          
          <Suspense fallback={<SectionLoader />}>
            <ColorMatrix />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 05: TYPOGRAPHY
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="typography" number="05" title="Typography" subtitle="Clarity, measurement, and trust." />
          
          <Suspense fallback={<SectionLoader />}>
            <TypographyScale />
            <SpacingSystem />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 06: LOGO & ASSETS
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="logo-assets" number="06" title="Logo & Assets" subtitle="Logo system, icons, and brand marks." />
          
          <Suspense fallback={<SectionLoader />}>
            <LogoAssets />
            <IconGuidelines />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 07: VOICE & TONE
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="voice" number="07" title="Voice & Tone" subtitle="Direct. Technical. Confident. No fluff, no hedging." />
          
          <Suspense fallback={<SectionLoader />}>
            <VoiceTone />
            <DosAndDonts />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 08: IMAGERY & MOTION
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="imagery" number="08" title="Imagery & Motion" subtitle="Photography, illustration, and animation guidelines." />
          
          <Suspense fallback={<SectionLoader />}>
            <ImageryGuidelines />
            <MotionDesign />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 09: APPLICATIONS
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="applications" number="09" title="Applications" subtitle="Industry use cases, components, and interface patterns." />
          
          <Suspense fallback={<SectionLoader />}>
            <IndustryApplications />
            <EcoComponents />
            <InterfaceKit />
          </Suspense>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 10: PROOF & EXAMPLES
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
          <div className="relative">
            <SectionHeader id="proof" number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />
            
            <LazySection fallback={<SectionLoader />} rootMargin="400px">
              <Suspense fallback={<SectionLoader />}>
                <TechComparison />
              </Suspense>
            </LazySection>
            <Suspense fallback={<SectionLoader />}>
              <CaseStudies />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <BrandGallery />
            </Suspense>
          </div>
        </section>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 11: RESOURCES
         ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <SectionHeader id="resources" number="11" title="Resources" subtitle="Download assets. Export guidelines. Deploy the brand." />
          
          <Suspense fallback={<SectionLoader />}>
            <DownloadableAssets />
            <ExportSection />
          </Suspense>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
         ═══════════════════════════════════════════════════════════════ */}
        <footer className="mt-20 py-12 border-t-2 border-slate-200" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <RhosonicsLogo variant="dark" />
              </div>
              <div>
                <span className="font-logo text-sm tracking-wide text-foreground">RHOSONICS</span>
                <span className="font-data text-xs text-slate-400 ml-2">BRAND SYSTEM</span>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              <span className="font-data text-xs">© {new Date().getFullYear()} RHOSONICS B.V.</span>
              <span className="mx-2 text-slate-300">|</span>
              <span className="font-data text-xs">VERSION 2025</span>
            </div>
          </div>
        </footer>

      </main>
      </div>
    </div>;
};
export default Index;