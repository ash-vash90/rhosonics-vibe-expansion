import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "blur";
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerSelector?: string;
  staggerDelay?: number;
}

export const ScrollReveal = ({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.6,
  stagger = false,
  staggerSelector = "> *",
  staggerDelay = 0.1,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      fade: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
      },
      "slide-up": {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
      },
      "slide-left": {
        from: { opacity: 0, x: -40 },
        to: { opacity: 1, x: 0 },
      },
      "slide-right": {
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
      },
      blur: {
        from: { opacity: 0, filter: "blur(10px)", y: 20 },
        to: { opacity: 1, filter: "blur(0px)", y: 0 },
      },
    };

    const { from, to } = animations[animation];

    const ctx = gsap.context(() => {
      if (stagger) {
        const children = element.querySelectorAll(staggerSelector);
        gsap.set(children, from);
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 85%",
          onEnter: () => {
            gsap.to(children, {
              ...to,
              duration,
              delay,
              stagger: staggerDelay,
              ease: "power3.out",
            });
          },
        });
      } else {
        gsap.fromTo(element, from, {
          ...to,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, staggerSelector, staggerDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;