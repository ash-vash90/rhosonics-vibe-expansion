import { Suspense, lazy, useEffect, useRef } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "@/components/AnimatedLogo";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navigation } from "@/components/brand/Navigation";
import { FontSelector } from "@/components/brand/FontSelector";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { cleanupAllGsap } from "@/hooks/useGsapCleanup";
import { useFontMode } from "@/hooks/useFontMode";

// Defer GSAP import and registration to reduce initial main thread blocking
let gsapInstance: typeof import("gsap").default | null = null;
let scrollTriggerRegistered = false;

const loadGsap = async () => {
  if (!gsapInstance) {
    const [gsap, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]);
    gsapInstance = gsap.default;
    if (!scrollTriggerRegistered) {
      gsapInstance.registerPlugin(ScrollTrigger);
      scrollTriggerRegistered = true;
    }
  }
  return gsapInstance;
};

// Lazy load section components
const AboutThisSystem = lazy(() => import("@/components/brand/AboutThisSystem"));
const DesignProcess = lazy(() => import("@/components/brand/DesignProcess"));
const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));
const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));
const VisualSystemOverview = lazy(() => import("@/components/brand/VisualSystemOverview"));
const ElevationSystem = lazy(() => import("@/components/brand/ElevationSystem"));
const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));
const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const TypographyConstraints = lazy(() => import("@/components/brand/TypographyConstraints"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));
const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const EmptyStates = lazy(() => import("@/components/brand/EmptyStates"));
const SDMEcoInterface = lazy(() => import("@/components/brand/SDMEcoInterface"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));

const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));
const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));
const HeroParticles = lazy(() => import("@/components/brand/HeroParticles"));


const SectionLoader = () => <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>;
const SectionDivider = ({ label }: { label?: string }) => (
  <div className="py-6 md:py-8 flex items-center gap-3">
    <div className="flex-1 h-px bg-border" />
    {label && (
      <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    )}
    <div className="flex-1 h-px bg-border" />
  </div>
);
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
    
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    
    const setupAnimations = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;
      
      ctx = gsap.context(() => {
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
            once: true // Prevent race conditions with React unmounting
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
            once: true
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
            once: true
          }
        });
      }, header);
    };
    
    setupAnimations();
    
    return () => {
      cancelled = true;
      // Kill tweens on all animated elements
      if (gsapInstance && header) {
        gsapInstance.killTweensOf(header.querySelectorAll("*"));
      }
      ctx?.revert();
    };
  }, []);
  return <div ref={headerRef} id={id} className="mb-8 md:mb-12 lg:mb-16 scroll-mt-20 md:scroll-mt-24">
      <div className="flex items-baseline gap-4 md:gap-6 mb-3 md:mb-4">
        <span className="section-num font-data text-sm md:text-base font-bold text-primary">{number}</span>
        <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
      </div>
      <h2 className="section-title font-ui text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 md:mb-4 tracking-tighter leading-[0.95]">{title}</h2>
      <p className="section-subtitle text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">{subtitle}</p>
    </div>;
};
const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<AnimatedLogoRef>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { logoFont } = useFontMode();
  const isPrimetime = logoFont === "primetime";

  // Hero entrance animations - deferred to reduce FID
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    // Use requestIdleCallback to defer animation setup and reduce main thread blocking
    const setupAnimations = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        // Set initial states
        gsap.set(".hero-logo", {
          autoAlpha: 0,
        });
        gsap.set(".wordmark-char", {
          opacity: 0,
          x: -20,
          filter: "blur(8px)",
        });
        gsap.set(".hero-version", {
          opacity: 0,
          y: -10,
        });
        gsap.set(".hero-title", {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        });
        gsap.set(".hero-subtitle", {
          opacity: 0,
          y: 30,
        });
        gsap.set(".hero-scroll", {
          opacity: 0,
        });

        // Text timeline (starts only when the wave animation reports completion)
        const textTl = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        });

        textTl
          .to(".wordmark-char", {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.3,
            stagger: 0.03,
            ease: "power2.out",
          })
          .to(
            ".hero-version",
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
            },
            "-=0.15"
          )
          .to(
            ".hero-title",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
            },
            "-=0.2"
          )
          .to(
            ".hero-subtitle",
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
            },
            "-=0.25"
          )
          .to(
            ".hero-scroll",
            {
              opacity: 1,
              duration: 0.4,
            },
            "-=0.15"
          );

        const startText = () => textTl.play(0);

        // Show logo container, trigger wave; then start text AFTER wave completes
        gsap.to(".hero-logo", {
          autoAlpha: 1,
          duration: 0.12,
          delay: 0.1,
          onStart: () => {
            const logo = heroLogoRef.current;
            if (!logo) {
              // Fallback: if the ref isn't ready, don't block the hero.
              gsap.delayedCall(1, startText);
              return;
            }
            logo.play({
              onComplete: startText,
            });
          },
        });
      }, hero);
    };

    // Defer to idle time to reduce FID
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setupAnimations(), { timeout: 150 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
        ctx?.revert();
      };
    } else {
      const timeoutId = setTimeout(() => setupAnimations(), 50);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
        ctx?.revert();
      };
    }
  }, []);

  // Global cleanup on unmount to prevent GSAP/React race conditions
  useEffect(() => {
    return () => {
      cleanupAllGsap();
    };
  }, []);
  const scrollToContent = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <FontSelector />
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BRAND SYSTEM INTRODUCTION (Full-width, centered)
       ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-rho-obsidian text-slate-100 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Floating particles */}
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
        
        
        <div ref={heroContentRef} className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Logo + Wordmark */}
          <div className="hero-logo flex items-center justify-center gap-3 lg:gap-4 mb-8 lg:mb-10">
            <div className="w-7 h-7 md:w-[34px] md:h-[34px] lg:w-[42px] lg:h-[42px] xl:w-[50px] xl:h-[50px]">
              <AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden withGlow />
            </div>
            <span className={`hero-wordmark font-logo text-white uppercase overflow-hidden text-xl md:text-2xl lg:text-3xl ${isPrimetime ? "xl:text-[2.35rem] tracking-normal" : "xl:text-4xl tracking-wide"}`}>
              {isPrimetime ? (
                <span className="wordmark-char inline-block">RHOSONICS</span>
              ) : (
                "RHOSONICS".split("").map((char, i) => (
                  <span key={i} className="wordmark-char inline-block">
                    {char}
                  </span>
                ))
              )}
            </span>
          </div>
          
          <h1 className="hero-title font-ui font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight mb-6 lg:mb-8">
            Brand Guidelines
          </h1>

          <div className="hero-subtitle">
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
              A system of decisions ensuring clarity, consistency, and credibility wherever the brand appears.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-data text-[10px] tracking-widest opacity-60">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
          </div>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT WITH SIDEBAR
       ═══════════════════════════════════════════════════════════════ */}
      <div ref={mainContentRef} className="flex min-h-screen items-start">
        {/* Left Navigation Sidebar */}
        <Navigation />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1400px] mx-auto overflow-x-hidden">
        
        {/* ─── SECTION 00: ABOUT THIS SYSTEM ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="about" number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <AboutThisSystem />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="00.1" />

        {/* ─── SECTION 00.1: DESIGN PROCESS ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="design-process" number="00.1" title="Design Process" subtitle="How we approach design decisions, from concept to implementation." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <DesignProcess />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="01" />

        {/* ─── SECTION 01: BRAND POSITIONING ─── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="positioning" number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <BrandPositioning />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="02" />

        {/* ─── SECTION 02: BRAND PRINCIPLES ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="principles" number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <BrandPrinciples />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="03" />

        {/* ─── SECTION 03: THE VISUAL SYSTEM ─── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="visual-system" number="03" title="The Visual System" subtitle="How the system is structured in layers." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <VisualSystemOverview />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="03.1" />

        {/* ─── SECTION 03.1: ELEVATION SYSTEM ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="elevation" number="03.1" title="Elevation & Depth" subtitle="Shadows and layering that create visual hierarchy." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ElevationSystem />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="04" />

        {/* ─── SECTION 04: COLOR ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="colors" number="04" title="Color Roles" subtitle="How color functions inside the system." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ColorMatrix />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="05" />

        {/* ─── SECTION 05: TYPOGRAPHY ─── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="typography" number="05" title="Typography" subtitle="Clarity, measurement, and trust." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <TypographyScale />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <TypographyConstraints />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <SpacingSystem />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="06" />

        {/* ─── SECTION 06: LOGO & ASSETS ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="logo-assets" number="06" title="Logo & Assets" subtitle="Logo system, icons, and brand marks." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <LogoAssets />
            </Suspense>
          </ErrorBoundary>

          <div id="icon-guidelines" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
            <div className="mb-6 md:mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data text-sm font-bold text-primary">06.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">Icon Guidelines</h3>
              <p className="text-sm text-muted-foreground">Geometric symbols engineered for clarity.</p>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <IconGuidelines />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>

        <SectionDivider label="07" />

        {/* ─── SECTION 07: VOICE & TONE ─── */}
        <ScrollSection className="py-12 md:py-16">
          <SectionHeader id="voice" number="07" title="Voice & Tone" subtitle="Direct. Technical. Confident. No fluff, no hedging." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <VoiceTone />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="08" />

        {/* ─── SECTION 08: IMAGERY & MOTION ─── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="imagery" number="08" title="Imagery & Motion" subtitle="Photography, illustration, and animation guidelines." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ImageryGuidelines />
            </Suspense>
          </ErrorBoundary>
          <div id="motion-design" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
            <div className="mb-6 md:mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data text-sm font-bold text-primary">08.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">Motion Design</h3>
              <p className="text-sm text-muted-foreground">Animation that communicates cause and effect.</p>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <MotionDesign />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>

        <SectionDivider label="09" />

        {/* ─── SECTION 09: APPLICATIONS ─── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="applications" number="09" title="Applications" subtitle="Industry use cases, components, and interface patterns." />
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <IndustryApplications />
            </Suspense>
          </ErrorBoundary>
          
          <div id="sdm-interface" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
            <div className="mb-6 md:mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data text-sm font-bold text-primary">09.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">SDM Eco Interface</h3>
              <p className="text-sm text-muted-foreground">Embedded touchscreen interface design system.</p>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <SDMEcoInterface />
              </Suspense>
            </ErrorBoundary>
          </div>
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <EcoComponents />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <InterfaceKit />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <EmptyStates />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider label="10" />

        {/* ─── SECTION 10: PROOF & EXAMPLES ─── */}
        <ScrollSection className="py-12 md:py-16 relative">
          <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
          <div className="relative">
            <SectionHeader id="proof" number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <TechComparison />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <CaseStudies />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>

        {/* ═══ FOOTER ═══ */}
        <footer className="mt-12 py-10 border-t border-border" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-[22px] h-[22px]">
                <RhosonicsLogo variant="dark" />
              </div>
              <div>
                <span className={`font-logo ${isPrimetime ? 'tracking-normal' : 'tracking-wide'} text-foreground text-base`}>RHOSONICS</span>
                <span className="font-data text-xs text-muted-foreground ml-2">BRAND SYSTEM</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-data text-xs">© {new Date().getFullYear()} RHOSONICS B.V.</span>
              <span className="mx-2 text-border">|</span>
              <span className="font-data text-xs">VERSION 2025</span>
            </div>
          </div>
        </footer>

        </main>
      </div>
    </div>
  );
};

export default Index;
