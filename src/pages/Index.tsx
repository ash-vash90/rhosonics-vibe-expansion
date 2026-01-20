import { Suspense, lazy, useEffect, useRef } from "react";
import { AnimatedLogo, AnimatedLogoRef } from "@/components/AnimatedLogo";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { LazySection } from "@/components/LazySection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navigation } from "@/components/brand/Navigation";
import { ScrollSection } from "@/components/brand/ScrollSection";
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
const SectionDivider = () => (
  <div className="py-12 md:py-16 flex items-center justify-center">
    <div className="flex items-center gap-4 w-full max-w-md">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border" />
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-primary/20" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/40 animate-ping" style={{ animationDuration: '3s' }} />
      </div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div className="relative">
        <div className="w-3 h-3 rounded-full border border-primary/30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
        </div>
      </div>
      <div className="w-1 h-1 rounded-full bg-border" />
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-primary/20" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border" />
    </div>
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
  return <div ref={headerRef} id={id} className="mb-10 md:mb-16 lg:mb-20 scroll-mt-20 md:scroll-mt-24">
      <div className="flex items-baseline gap-4 md:gap-6 mb-4 md:mb-6">
        <span className="section-num font-data text-xs md:text-sm text-muted-foreground">{number}</span>
        <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
      </div>
      <h2 className="section-title font-ui text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">{title}</h2>
      <p className="section-subtitle text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">{subtitle}</p>
    </div>;
};
const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<AnimatedLogoRef>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Hero entrance animations
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);


  const scrollToContent = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BRAND SYSTEM INTRODUCTION (Full-width, centered)
       ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-rho-obsidian text-slate-100 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Floating particles */}
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
        
        {/* Subtle gradient overlay */}
        <div 
          className="hero-gradient-overlay absolute inset-0 opacity-[0.08]"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, transparent 60%, hsl(125 50% 40% / 0.4) 100%)'
          }}
        />
        
        {/* Background pattern - very subtle */}
        <div className="hero-pattern absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333993c' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        {/* Gradient orb - more subtle */}
        <div className="hero-orb absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px]" />
        
        <div ref={heroContentRef} className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo + Wordmark - Icon is 140% of text size */}
          <div className="hero-logo flex items-center justify-center gap-3 lg:gap-4 mb-10 lg:mb-12">
            {/* Icon sizes: 1.4 × font-size → text-xl(20px)→28px, text-2xl(24px)→34px, text-3xl(30px)→42px, text-4xl(36px)→50px */}
            <div className="w-7 h-7 md:w-[34px] md:h-[34px] lg:w-[42px] lg:h-[42px] xl:w-[50px] xl:h-[50px]">
              <AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden withGlow />
            </div>
            <span className="hero-wordmark font-logo text-white tracking-wide uppercase overflow-hidden text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {"RHOSONICS".split("").map((char, i) => (
                <span key={i} className="wordmark-char inline-block">
                  {char}
                </span>
              ))}
            </span>
          </div>
          
          <div className="hero-version label-tech text-primary mb-5 lg:mb-6">
            <span className="text-slate-400">2025</span>
            <span className="mx-2">/</span>
            BRAND SYSTEM
          </div>
          
          <h1 className="hero-title font-ui font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-6 lg:mb-8">
            Brand Guidelines
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto">
            A system of decisions designed to ensure clarity, consistency, and credibility wherever the brand appears.
          </p>
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
        
        {/* ─────────────────────────────────────────────────────────────
            SECTION 00: ABOUT THIS SYSTEM
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="about" number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <AboutThisSystem />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 01: BRAND POSITIONING
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="positioning" number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <BrandPositioning />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 02: BRAND PRINCIPLES
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="principles" number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <BrandPrinciples />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 03: THE VISUAL SYSTEM (OVERVIEW)
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="visual-system" number="03" title="The Visual System" subtitle="How the system is structured in layers." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <VisualSystemOverview />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 04: COLOR
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="colors" number="04" title="Color Roles" subtitle="How color functions inside the system." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ColorMatrix />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 05: TYPOGRAPHY
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="typography" number="05" title="Typography" subtitle="Clarity, measurement, and trust." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <TypographyScale />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <SpacingSystem />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 06: LOGO & ASSETS
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="logo-assets" number="06" title="Logo & Assets" subtitle="Logo system, icons, and brand marks." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <LogoAssets />
            </Suspense>
          </ErrorBoundary>

          <div id="icon-guidelines" className="scroll-mt-20 md:scroll-mt-24 mt-16 md:mt-24">
            <div className="mb-8 md:mb-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-data text-xs text-muted-foreground">06.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-2">Icon Guidelines</h3>
              <p className="text-base text-muted-foreground">Geometric symbols engineered for clarity.</p>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <IconGuidelines />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 07: VOICE & TONE
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="voice" number="07" title="Voice & Tone" subtitle="Direct. Technical. Confident. No fluff, no hedging." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <VoiceTone />
            </Suspense>
          </ErrorBoundary>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 08: IMAGERY & MOTION
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="imagery" number="08" title="Imagery & Motion" subtitle="Photography, illustration, and animation guidelines." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ImageryGuidelines />
            </Suspense>
          </ErrorBoundary>
          <div id="motion-design" className="scroll-mt-20 md:scroll-mt-24 mt-16 md:mt-24">
            <div className="mb-8 md:mb-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-data text-xs text-muted-foreground">08.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-2">Motion Design</h3>
              <p className="text-base text-muted-foreground">Animation that communicates cause and effect.</p>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <MotionDesign />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 09: APPLICATIONS
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24">
          <SectionHeader id="applications" number="09" title="Applications" subtitle="Industry use cases, components, and interface patterns." />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <IndustryApplications />
            </Suspense>
          </ErrorBoundary>
          
          {/* SDM Eco Interface Subsection */}
          <div id="sdm-interface" className="scroll-mt-20 md:scroll-mt-24 mt-16 md:mt-24">
            <div className="mb-8 md:mb-12">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-data text-xs text-muted-foreground">09.1</span>
                <div className="h-px flex-1 bg-border max-w-12" />
              </div>
              <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-2">SDM Eco Interface</h3>
              <p className="text-base text-muted-foreground">Embedded touchscreen interface design system.</p>
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
        </ScrollSection>

        <SectionDivider />

        {/* ─────────────────────────────────────────────────────────────
            SECTION 10: PROOF & EXAMPLES
         ───────────────────────────────────────────────────────────── */}
        <ScrollSection className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
          <div className="relative">
            <SectionHeader id="proof" number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />
            
            <ErrorBoundary>
              <LazySection fallback={<SectionLoader />} rootMargin="400px">
                <Suspense fallback={<SectionLoader />}>
                  <TechComparison />
                </Suspense>
              </LazySection>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <CaseStudies />
              </Suspense>
            </ErrorBoundary>
          </div>
        </ScrollSection>


        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
         ═══════════════════════════════════════════════════════════════ */}
        <footer className="mt-20 py-12 border-t-2 border-slate-200" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Logo lockup: 150% ratio - text-base(16px)→24px icon */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <RhosonicsLogo variant="dark" />
              </div>
              <div>
                <span className="font-logo tracking-wide text-foreground text-base">RHOSONICS</span>
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
    </div>
  );
};

export default Index;
