import { useEffect, useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerContext, unregisterContext } from "@/hooks/useGsapCleanup";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
}

export const ScrollSection = ({ children, className = "" }: ScrollSectionProps) => {
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

  return (
    <section ref={sectionRef} className={className} style={{ opacity: isInView ? undefined : 0 }}>
      {children}
    </section>
  );
};

export default ScrollSection;
