import { useEffect, useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerContext, unregisterContext } from "@/hooks/useGsapCleanup";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "tinted" | "eco" | "dark";
  /** Vertical rhythm. Compact (py-12 md:py-16) is the sitewide default;
   *  standard is reserved for statement bands. Explicit p*-/py- classes in
   *  className always win. */
  density?: "compact" | "standard";
  /** Anchor id; applies scroll-mt-20 so in-page nav lands cleanly. */
  id?: string;
}

const bleed = "-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 px-4 md:px-8 lg:px-12 xl:px-20";

const variantClasses = {
  default: "",
  tinted: `relative bg-[hsl(var(--slate-100))] noise-overlay ${bleed}`,
  eco: `relative bg-[hsl(var(--eco-surface))] ${bleed}`,
  dark: `relative bg-rho-obsidian text-slate-100 ${bleed}`,
};

const densityClasses = {
  compact: "py-12 md:py-16",
  standard: "py-16 md:py-24",
};

/**
 * Dev-only rhythm check — warns when two adjacent sections share a variant.
 * Mounted once in BrandLayout on route change.
 */
export const assertSectionRhythm = (root: HTMLElement | null) => {
  if (!root || import.meta.env.PROD) return;
  const sections = root.querySelectorAll<HTMLElement>("[data-section-variant]");
  let prev: string | null = null;
  sections.forEach((el) => {
    const v = el.dataset.sectionVariant ?? null;
    if (v && v !== "default" && v === prev) {
      console.warn("[section-rhythm] Adjacent sections share variant:", v, el);
    }
    prev = v;
  });
};

export const ScrollSection = ({
  children,
  className = "",
  variant = "default",
  density = "compact",
  id,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Use IntersectionObserver to detect when section enters viewport
  // This defers GSAP animation setup until needed, reducing initial main-thread work
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Only set up GSAP animation after section is in view
  useEffect(() => {
    if (!isInView) return;
    
    const section = sectionRef.current;
    if (!section) return;

    // Use requestIdleCallback to defer animation setup to idle time
    const setupAnimation = () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true, // Critical: only trigger once to prevent race conditions
            },
          }
        );
      }, section);

      // Register for global cleanup tracking
      registerContext(ctx);

      return ctx;
    };

    let ctx: gsap.Context | undefined;
    
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => {
        ctx = setupAnimation();
      }, { timeout: 100 });
      
      return () => {
        cancelIdleCallback(id);
        if (ctx) {
          ctx.kill(); // Kill animations immediately
          ctx.revert();
          unregisterContext(ctx);
        }
      };
    } else {
      // Fallback for Safari
      const timeoutId = setTimeout(() => {
        ctx = setupAnimation();
      }, 16);
      
      return () => {
        clearTimeout(timeoutId);
        if (ctx) {
          ctx.kill(); // Kill animations immediately
          ctx.revert();
          unregisterContext(ctx);
        }
      };
    }
  }, [isInView]);

  // Explicit padding in className suppresses the density default so
  // overrides like py-0 keep working without Tailwind ordering conflicts.
  const hasOwnPadding = /(^|\s)(p|py|pt|pb)-/.test(className);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section-variant={variant}
      className={`${variantClasses[variant]} ${hasOwnPadding ? "" : densityClasses[density]} ${id ? "scroll-mt-20" : ""} ${className}`}
      style={{ opacity: isInView ? undefined : 0 }}
    >
      {children}
    </section>
  );
};

export default ScrollSection;
