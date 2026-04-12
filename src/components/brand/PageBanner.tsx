import { useEffect, useRef } from "react";
import { loadGsap } from "./SectionUtils";

interface PageBannerProps {
  number: string;
  title: string;
  subtitle: string;
}

export const PageBanner = ({ number, title, subtitle }: PageBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    const setup = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(".banner-accent-line", { scaleX: 0 }, { scaleX: 1, duration: 0.6 })
          .fromTo(".banner-watermark", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.1)
          .fromTo(".banner-title", { opacity: 0, y: 20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.25)
          .fromTo(".banner-subtitle", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
      }, banner);
    };

    setup();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <div ref={bannerRef} className="relative overflow-visible md:overflow-hidden -mb-6 md:mb-4 lg:mb-6 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20 pt-16 pb-2 md:pt-14 md:pb-8 lg:pt-16 lg:pb-10 bg-gradient-to-b from-[hsl(var(--slate-50))] to-background">
      {/* Accent line at the very top */}
      <div className="banner-accent-line absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-[hsl(var(--rho-green-accent))] to-transparent origin-left" />
      
      {/* Watermark number */}
      <span className="banner-watermark absolute top-12 right-2 font-data text-[3.75rem] sm:text-[4.25rem] md:absolute md:top-1/2 md:bottom-auto md:right-8 md:-translate-y-1/2 md:text-[12rem] lg:right-12 lg:text-[16rem] xl:right-20 font-bold leading-none text-[hsl(var(--slate-200))] select-none pointer-events-none opacity-60">
        {number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-data text-sm md:text-base font-bold text-primary">{number}</span>
          <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
        </div>
        <h1 className="banner-title font-ui text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tighter leading-[0.95] mb-2 md:mb-4">
          {title}
        </h1>
        <p className="banner-subtitle text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
