import { Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useRef, useEffect } from "react";
import { Navigation } from "./Navigation";
import { FontSelector } from "./FontSelector";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { ErrorBoundary } from "../ErrorBoundary";
import { useFontMode } from "@/hooks/useFontMode";
import { cleanupAllGsap } from "@/hooks/useGsapCleanup";
import { loadGsap } from "./SectionUtils";
import { CursorFollower } from "./CursorFollower";

const HeroParticles = lazy(() => import("@/components/brand/HeroParticles"));

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



  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <FontSelector />

      {/* Hero */}
      {isHome && (
        <section className="relative bg-rho-obsidian text-slate-100 overflow-hidden min-h-screen flex items-center justify-center">
          {/* Gaussian blur orb */}
          <div className="hero-blur-orb -top-40 -right-40 lg:right-10 lg:top-20" />
          <div className="hero-blur-orb bottom-0 -left-60 lg:left-20 lg:bottom-10 opacity-50" style={{ width: 400, height: 400 }} />
          <Suspense fallback={null}><HeroParticles /></Suspense>
          <div ref={heroContentRef} className="hero-content relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
            {/* Oversized background data mark */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute -top-4 -left-2 lg:-top-6 lg:-left-4 font-data font-black uppercase leading-none text-white/[0.025] text-[120px] md:text-[180px] lg:text-[240px]">
              Brand_OS
            </div>

            <div className="relative grid grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
              {/* LEFT — editorial headline + intent */}
              <div className="col-span-12 lg:col-span-7 flex flex-col gap-8 lg:gap-10">
                {/* Eyebrow */}
                <div className="hero-logo flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span>Brand System</span>
                  <span className="text-slate-700">·</span>
                  <span>Version 2025</span>
                </div>

                {/* Headline */}
                <h1 className="hero-title font-ui font-bold text-white leading-[0.95] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Brand <span className="text-primary">Guidelines</span>.
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle max-w-xl text-slate-400 text-base lg:text-lg leading-relaxed">
                  A system of decisions ensuring clarity, consistency, and credibility wherever the Rhosonics brand appears — from instrument HMIs and datasheets to pitch decks, posters, and field reports.
                </p>

                {/* CTA row */}
                <div className="hero-version flex flex-wrap items-center gap-3">
                  <a href="#about" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-ui font-medium text-sm rounded-md hover:bg-primary/90 transition-colors">
                    Explore the system
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="/review" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-700 text-slate-200 font-ui font-medium text-sm rounded-md hover:border-slate-500 transition-colors">
                    Download assets
                  </a>
                </div>
              </div>

              {/* RIGHT — chamfered identity specimen card */}
              <div className="hero-version col-span-12 lg:col-span-5">
                <div className="relative bg-rho-obsidian-light p-8 lg:p-10 clip-chamfer-lg">
                  {/* Top: live system marker */}
                  <div className="flex items-center justify-between font-data text-[10px] uppercase tracking-widest text-slate-500 mb-10">
                    <span>Identity Specimen · 01</span>
                    <span className="flex items-center gap-1.5 text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> ACTIVE
                    </span>
                  </div>

                  {/* Logo lockup */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0">
                      <AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden withGlow />
                    </div>
                    <span className={`font-logo text-white text-3xl lg:text-4xl uppercase ${isPrimetime ? "tracking-normal" : "tracking-wide"}`}>
                      {isPrimetime ? (
                        <span className="wordmark-char inline-block">RHOSONICS</span>
                      ) : (
                        "RHOSONICS".split("").map((char, i) => (
                          <span key={i} className="wordmark-char inline-block">{char}</span>
                        ))
                      )}
                    </span>
                  </div>

                  {/* Color row */}
                  <div className="mb-10">
                    <div className="font-data text-[10px] uppercase tracking-widest text-slate-500 mb-3">Core Palette</div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        ["Green", "hsl(125 50% 40%)", "#33993C"],
                        ["Obsidian", "hsl(224 22% 10%)", "#14171F"],
                        ["Slate", "hsl(224 18% 24%)", "#333845"],
                        ["Paper", "hsl(220 18% 96%)", "#F2F4F7"],
                      ].map(([name, css, hex]) => (
                        <div key={name as string} className="flex flex-col gap-1.5">
                          <div className="aspect-square rounded-sm" style={{ background: css as string }} />
                          <div className="font-data text-[9px] uppercase tracking-widest text-slate-400 leading-tight">{name}</div>
                          <div className="font-data text-[9px] text-slate-600 leading-tight">{hex}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography specimen */}
                  <div>
                    <div className="font-data text-[10px] uppercase tracking-widest text-slate-500 mb-3">Type Stack</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-3 border-t border-slate-800 pt-2">
                        <span className="font-logo text-white text-lg">Rhosonics</span>
                        <span className="font-data text-[9px] uppercase tracking-widest text-slate-500">Logo · Primetime</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 border-t border-slate-800 pt-2">
                        <span className="font-ui text-white text-lg">Aa Bb Cc 123</span>
                        <span className="font-data text-[9px] uppercase tracking-widest text-slate-500">UI · Instrument Sans</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 border-t border-slate-800 pt-2">
                        <span className="font-data text-white text-base uppercase">DATA 0.42 SG</span>
                        <span className="font-data text-[9px] uppercase tracking-widest text-slate-500">Data · JetBrains Mono</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content with sidebar */}
      <div className="flex min-h-screen items-start">
        <Navigation />
        <main className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1400px] mx-auto overflow-x-hidden">
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
