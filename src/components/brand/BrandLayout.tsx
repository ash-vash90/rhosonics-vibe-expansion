import { Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { Navigation } from "./Navigation";

import { RhosonicsLogo } from "../RhosonicsLogo";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { ErrorBoundary } from "../ErrorBoundary";
import { useFontMode } from "@/hooks/useFontMode";
import { cleanupAllGsap } from "@/hooks/useGsapCleanup";
import { loadGsap } from "./SectionUtils";
import { CommandPalette } from "./CommandPalette";
import { assertSectionRhythm } from "./ScrollSection";
import { TelemetryEyebrow, DataWatermark } from "./telemetry";

const BrandLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<AnimatedLogoRef>(null);
  const { logoFont } = useFontMode();
  const isPrimetime = logoFont === "primetime";

  // Hero entrance animations (only on home)
  useEffect(() => {
    if (!isHome) return;
    const hero = heroContentRef.current;
    if (!hero) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const setupAnimations = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.set(".hero-logo", { autoAlpha: 0 });
        gsap.set(".wordmark-char", { opacity: 0, x: -20, filter: "blur(8px)" });
        gsap.set(".hero-version", { opacity: 0, y: -10 });
        gsap.set(".hero-title", { opacity: 0, y: 40, filter: "blur(8px)" });
        gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
        gsap.set(".hero-scroll", { opacity: 0 });

        const textTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        textTl
          .to(".wordmark-char", { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.3, stagger: 0.03, ease: "power2.out" })
          .to(".hero-version", { opacity: 1, y: 0, duration: 0.35 }, "-=0.15")
          .to(".hero-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, "-=0.2")
          .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.35 }, "-=0.25")
          .to(".hero-scroll", { opacity: 1, duration: 0.4 }, "-=0.15");

        const startText = () => textTl.play(0);

        gsap.to(".hero-logo", {
          autoAlpha: 1, duration: 0.12, delay: 0.1,
          onStart: () => {
            const logo = heroLogoRef.current;
            if (!logo) { gsap.delayedCall(1, startText); return; }
            logo.play({ onComplete: startText });
          },
        });
      }, hero);
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setupAnimations(), { timeout: 150 });
      return () => { cancelled = true; cancelIdleCallback(id); ctx?.revert(); };
    } else {
      const tid = setTimeout(() => setupAnimations(), 50);
      return () => { cancelled = true; clearTimeout(tid); ctx?.revert(); };
    }
  }, [isHome]);

  useEffect(() => () => { cleanupAllGsap(); }, []);

  // Dev-only section-rhythm check: warns when adjacent sections share a variant
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (import.meta.env.PROD) return;
    const t = setTimeout(() => assertSectionRhythm(mainRef.current), 1200);
    return () => clearTimeout(t);
  }, [location.pathname]);



  return (
    <div className="min-h-screen bg-background">
      <CommandPalette />


      {/* Hero */}
      {isHome && (
        <section className="relative bg-rho-obsidian text-slate-100 overflow-hidden min-h-screen flex items-center justify-center">
          {/* Gaussian blur orb */}
          <div className="hero-blur-orb -top-40 -right-40 lg:right-10 lg:top-20" />
          <div className="hero-blur-orb bottom-0 -left-60 lg:left-20 lg:bottom-10 opacity-50" style={{ width: 400, height: 400 }} />
          <div ref={heroContentRef} className="hero-content relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
            {/* Oversized background data mark */}
            <DataWatermark text="Brand_OS" align="left" tone="dark" className="lg:-top-6 lg:text-[240px]" />

            <div className="relative flex flex-col items-center text-center gap-8 lg:gap-10 max-w-4xl mx-auto">
              {/* Logo lockup */}
              <div className="hero-logo flex items-center justify-center gap-3 lg:gap-4">
                <div className="w-7 h-7 md:w-[34px] md:h-[34px] lg:w-[42px] lg:h-[42px] xl:w-[50px] xl:h-[50px]">
                  <AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden withGlow />
                </div>
                <span className={`font-logo text-white uppercase overflow-hidden text-xl md:text-2xl lg:text-3xl ${isPrimetime ? "xl:text-[2.35rem] tracking-normal" : "xl:text-4xl tracking-wide"}`}>
                  {isPrimetime ? (
                    <span className="wordmark-char inline-block">RHOSONICS</span>
                  ) : (
                    "RHOSONICS".split("").map((char, i) => (
                      <span key={i} className="wordmark-char inline-block">{char}</span>
                    ))
                  )}
                </span>
              </div>

              {/* Eyebrow */}
              <TelemetryEyebrow className="hero-version" pulse tone="dark" label="Brand System" meta={["Version 2025"]} />

              {/* Headline */}
              <h1 className="hero-title font-ui font-bold text-white leading-[0.95] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Brand <span className="text-primary">Guidelines</span>.
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle max-w-xl text-slate-400 text-base lg:text-lg leading-relaxed">
                A system of decisions ensuring clarity, consistency, and credibility wherever the Rhosonics brand appears.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Main content with sidebar */}
      <div className="flex min-h-screen items-start">
        <Navigation />
        <main ref={mainRef} className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1400px] mx-auto overflow-x-hidden">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>

          {/* Footer */}
          <footer className="mt-12 py-10 border-t border-border" role="contentinfo">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-[22px] h-[22px]"><RhosonicsLogo variant="dark" /></div>
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

export default BrandLayout;
