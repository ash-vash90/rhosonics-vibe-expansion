import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * StickySubNav — page-level sub-navigation that pins to the top after the
 * page banner scrolls past, with scroll-spy on the registered section IDs.
 *
 * Industrial precision: hairline bottom separation via slate-200, no shadow,
 * no glassmorphism. Mono numerals, Instrument Sans labels (not all-caps).
 */

export interface SubNavItem {
  id: string; // DOM id to scroll to / observe
  num: string; // e.g. "09.1"
  label: string;
}

interface StickySubNavProps {
  items: SubNavItem[];
  ariaLabel?: string;
  /** px from top of viewport at which the bar becomes visible. Default 320. */
  showAfter?: number;
}

export const StickySubNav = ({
  items,
  ariaLabel = "Section navigation",
  showAfter = 320,
}: StickySubNavProps) => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [items, showAfter]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "sticky top-0 z-30 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 bg-background/95 backdrop-blur-[2px] transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="px-4 md:px-8 lg:px-12 xl:px-20">
        <ul className="flex items-stretch gap-px overflow-x-auto bg-[hsl(var(--slate-200))]">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id} className="bg-background">
                <button
                  type="button"
                  onClick={() => jump(it.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-rho-obsidian text-slate-100"
                      : "hover:bg-[hsl(var(--slate-100))] text-foreground/70 hover:text-foreground",
                  )}
                >
                  <span className="font-data text-[10px] uppercase tracking-[0.2em] opacity-70">
                    {it.num}
                  </span>
                  <span className="font-ui text-sm">{it.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default StickySubNav;
