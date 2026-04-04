import { useRef, useEffect } from "react";

let gsapInstance: typeof import("gsap").default | null = null;
let scrollTriggerRegistered = false;

export const loadGsap = async () => {
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

export const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const SectionDivider = ({ label }: { label?: string }) => (
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

export const SectionHeader = ({ number, title, subtitle, id }: SectionHeaderProps) => {
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
        gsap.fromTo(numEl, { opacity: 0, x: -30, filter: 'blur(10px)' }, {
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6,
          scrollTrigger: { trigger: header, start: 'top 80%', once: true }
        });
        gsap.fromTo(titleEl, { opacity: 0, scale: 0.95 }, {
          opacity: 1, scale: 1, duration: 0.6, delay: 0.15,
          scrollTrigger: { trigger: header, start: 'top 80%', once: true }
        });
        gsap.fromTo(subtitleEl, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: header, start: 'top 80%', once: true }
        });
      }, header);
    };

    setupAnimations();

    return () => {
      cancelled = true;
      if (gsapInstance && header) {
        gsapInstance.killTweensOf(header.querySelectorAll("*"));
      }
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={headerRef} id={id} className="mb-8 md:mb-12 lg:mb-16 scroll-mt-20 md:scroll-mt-24">
      <div className="flex items-baseline gap-4 md:gap-6 mb-3 md:mb-4">
        <span className="section-num font-data text-sm md:text-base font-bold text-primary">{number}</span>
        <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
      </div>
      <h2 className="section-title font-ui text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 md:mb-4 tracking-tighter leading-[0.95]">{title}</h2>
      <p className="section-subtitle text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">{subtitle}</p>
    </div>
  );
};
