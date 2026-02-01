import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

export const useScrollReveal = (options?: gsap.TweenVars) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { 
          opacity: 0, 
          y: 60,
          ...options?.from 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true, // Prevent race conditions with React unmounting
          },
          ...options,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useStaggerReveal = (childSelector: string, stagger = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(childSelector);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [childSelector, stagger]);

  return ref;
};

// ============================================
// CLIP PATH REVEAL ANIMATIONS
// ============================================

export const useClipReveal = (direction: 'left' | 'right' | 'up' | 'down' | 'center' = 'left') => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const clipPaths = {
      left: {
        from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      right: {
        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      up: {
        from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      down: {
        from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      },
      center: {
        from: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      }
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { clipPath: clipPaths[direction].from },
        {
          clipPath: clipPaths[direction].to,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction]);

  return ref;
};

// ============================================
// COUNT UP ANIMATION
// ============================================

export const useCountUp = (endValue: number, suffix = '', duration = 1.5) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          
          const obj = { value: 0 };
          gsap.to(obj, {
            value: endValue,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              if (element) {
                const displayValue = Number.isInteger(endValue) 
                  ? Math.round(obj.value)
                  : obj.value.toFixed(1);
                element.textContent = displayValue + suffix;
              }
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, [endValue, suffix, duration]);

  return ref;
};

// ============================================
// CHART REVEAL ANIMATION
// ============================================

export const useChartReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Find bar chart elements (support both Recharts and Billboard.js)
      const bars = element.querySelectorAll('.recharts-bar-rectangle, .bb-bar');
      const radarPaths = element.querySelectorAll('.recharts-radar-polygon, .bb-radar-chart path');
      
      if (bars.length > 0) {
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(bars, {
              scaleX: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
            });
          }
        });
      }
      
      if (radarPaths.length > 0) {
        gsap.set(radarPaths, { scale: 0, transformOrigin: "center center", opacity: 0 });
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(radarPaths, {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              stagger: 0.2,
              ease: "elastic.out(1, 0.5)",
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// ============================================
// 3D CARD REVEAL
// ============================================

export const use3DCardReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.set(element, {
        rotateX: 15,
        rotateY: -10,
        opacity: 0,
        y: 60,
        transformPerspective: 1000,
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// ============================================
// TEXT SPLIT ANIMATION
// ============================================

export const useSplitTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into words
    const text = element.textContent || '';
    const words = text.split(' ');
    element.innerHTML = words.map(word => 
      `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
    ).join(' ');

    const innerSpans = element.querySelectorAll('span > span');

    const ctx = gsap.context(() => {
      gsap.set(innerSpans, { y: '100%' });

      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(innerSpans, {
            y: '0%',
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// ============================================
// PARALLAX
// ============================================

export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -30 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

// ============================================
// MAGNETIC HOVER
// ============================================

export const useMagneticHover = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
};

// ============================================
// SCALE IN WITH ROTATION
// ============================================

export const useScaleRotateReveal = (rotation = 5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { 
          scale: 0.8, 
          rotate: rotation, 
          opacity: 0,
          transformOrigin: "center center"
        },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [rotation]);

  return ref;
};

// ============================================
// DRAW LINE ANIMATION
// ============================================

export const useDrawLine = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// ============================================
// BLUR FADE IN
// ============================================

export const useBlurFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { 
          opacity: 0, 
          filter: "blur(20px)",
          y: 30 
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// ============================================
// LEGACY LOGO ANIMATION (for backwards compatibility)
// ============================================

export const useLogoAnimation = () => {
  const logoRef = useRef<SVGSVGElement>(null);

  const playAnimation = () => {
    const logo = logoRef.current;
    if (!logo) return;

    const arcs = logo.querySelectorAll("path");
    
    gsap.killTweensOf(arcs);
    
    gsap.set(arcs, { 
      opacity: 0, 
      scale: 0.3, 
      transformOrigin: "100% 100%",
      rotate: -15
    });

    gsap.to(arcs, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return { logoRef, playAnimation };
};
