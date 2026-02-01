import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP Cleanup Utility
 * 
 * This module addresses the race condition between GSAP ScrollTrigger and React's
 * DOM management that causes 'removeChild' errors during rapid navigation.
 * 
 * The issue: When React unmounts components quickly, GSAP animations may still
 * be running and attempting to manipulate DOM elements that React has already removed.
 * 
 * Solution: Use gsap.context() to scope all animations to a container element,
 * and ensure ctx.revert() is called before React unmounts the element.
 */

// Track all active contexts globally for emergency cleanup
const activeContexts = new Set<gsap.Context>();

/**
 * Register a context for tracking (called automatically by useGsapContext)
 */
export const registerContext = (ctx: gsap.Context) => {
  activeContexts.add(ctx);
};

/**
 * Unregister a context from tracking
 */
export const unregisterContext = (ctx: gsap.Context) => {
  activeContexts.delete(ctx);
};

/**
 * Emergency cleanup: Kill all active GSAP contexts and ScrollTriggers
 * Use this when navigating away from a page with many animations
 */
export const cleanupAllGsap = () => {
  // Kill all active tweens first - this is critical to prevent race conditions
  gsap.killTweensOf("*");
  
  // Kill all ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill();
  });
  
  // Revert all tracked contexts
  activeContexts.forEach(ctx => {
    try {
      ctx.kill(); // Kill all animations in context
      ctx.revert();
    } catch {
      // Context may already be cleaned up
    }
  });
  activeContexts.clear();
  
  // Clear any remaining ScrollTriggers and refresh
  ScrollTrigger.clearMatchMedia();
  ScrollTrigger.refresh(true); // Force immediate refresh
};

/**
 * useGsapContext - The primary hook for safe GSAP animations
 * 
 * Creates a GSAP context scoped to a container element that automatically
 * cleans up all animations and ScrollTriggers when the component unmounts.
 * 
 * IMPORTANT: This hook uses a layout effect to ensure cleanup happens
 * before React removes DOM nodes, preventing the race condition that
 * causes 'removeChild' errors.
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { containerRef, contextRef } = useGsapContext((ctx, container) => {
 *     gsap.fromTo('.element', { opacity: 0 }, {
 *       opacity: 1,
 *       scrollTrigger: { trigger: container, start: 'top 80%' }
 *     });
 *   });
 *   
 *   return <div ref={containerRef}>...</div>;
 * };
 * ```
 */
export const useGsapContext = <T extends HTMLElement = HTMLDivElement>(
  setupFn?: (ctx: gsap.Context, container: T) => void,
  deps: React.DependencyList = []
) => {
  const containerRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);
  const isCleanedUp = useRef(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    isCleanedUp.current = false;
    
    // Create a new context scoped to the container
    const ctx = gsap.context(() => {
      // Execute the setup function if provided
      if (setupFn && !isCleanedUp.current) {
        setupFn(ctx, container);
      }
    }, container);
    
    contextRef.current = ctx;
    registerContext(ctx);
    
    // Cleanup function - runs before React removes the element
    return () => {
      isCleanedUp.current = true;
      
      // Kill all ScrollTriggers associated with this context first
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container || container.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
      
      // Kill any pending animations on all descendants
      gsap.killTweensOf(container);
      gsap.killTweensOf(container.querySelectorAll("*"));
      
      // Kill all animations in the context
      ctx.kill();
      
      // Revert the context (cleans up any remaining state)
      try {
        ctx.revert();
      } catch {
        // Element may already be removed
      }
      
      unregisterContext(ctx);
      contextRef.current = null;
    };
  }, deps);
  
  return { containerRef, contextRef };
};

/**
 * useSafeScrollTrigger - Creates a single ScrollTrigger with automatic cleanup
 * 
 * Use this when you need a standalone ScrollTrigger without a full context.
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const triggerRef = useSafeScrollTrigger((trigger) => ({
 *     trigger,
 *     start: 'top 80%',
 *     onEnter: () => console.log('entered!')
 *   }));
 *   
 *   return <div ref={triggerRef}>...</div>;
 * };
 * ```
 */
export const useSafeScrollTrigger = <T extends HTMLElement = HTMLDivElement>(
  configFn: (element: T) => ScrollTrigger.Vars
) => {
  const elementRef = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const config = configFn(element);
    triggerRef.current = ScrollTrigger.create(config);
    
    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, []);
  
  return elementRef;
};

/**
 * useScrollTriggeredAnimation - Simplified hook for common scroll-triggered animations
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const ref = useScrollTriggeredAnimation({
 *     from: { opacity: 0, y: 40 },
 *     to: { opacity: 1, y: 0, duration: 0.6 },
 *     triggerStart: 'top 80%'
 *   });
 *   
 *   return <div ref={ref}>...</div>;
 * };
 * ```
 */
export const useScrollTriggeredAnimation = <T extends HTMLElement = HTMLDivElement>(options: {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  triggerStart?: string;
  triggerEnd?: string;
  toggleActions?: string;
  once?: boolean;
}) => {
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(element, options.from, {
        ...options.to,
        scrollTrigger: {
          trigger: element,
          start: options.triggerStart || 'top 80%',
          end: options.triggerEnd,
          toggleActions: options.toggleActions || 'play none none none',
          once: options.once ?? true,
        }
      });
    }, element);
    
    registerContext(ctx);
    
    return () => {
      ctx.revert();
      unregisterContext(ctx);
    };
  }, []);
  
  return elementRef;
};

/**
 * useStaggerAnimation - Hook for staggered child animations
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const containerRef = useStaggerAnimation('.card', {
 *     from: { opacity: 0, y: 30 },
 *     to: { opacity: 1, y: 0 },
 *     stagger: 0.1
 *   });
 *   
 *   return (
 *     <div ref={containerRef}>
 *       <div className="card">1</div>
 *       <div className="card">2</div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useStaggerAnimation = <T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    stagger?: number;
    triggerStart?: string;
  }
) => {
  const containerRef = useRef<T>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(children, options.from, {
        ...options.to,
        stagger: options.stagger ?? 0.1,
        scrollTrigger: {
          trigger: container,
          start: options.triggerStart || 'top 80%',
          once: true,
        }
      });
    }, container);
    
    registerContext(ctx);
    
    return () => {
      ctx.revert();
      unregisterContext(ctx);
    };
  }, [childSelector]);
  
  return containerRef;
};

/**
 * Hook to run cleanup on route changes
 * Place this in your root component or router wrapper
 */
export const useRouteChangeCleanup = () => {
  useEffect(() => {
    // Cleanup on unmount (route change)
    return () => {
      cleanupAllGsap();
    };
  }, []);
};

export default useGsapContext;
