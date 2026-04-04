import { useEffect, useRef } from "react";

export const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, select, textarea, .card-base, .card-eco, .card-obsidian, .card-metal, .card-slate, .card-mineral, .swatch");
      isHovering.current = !!interactive;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      const scale = isHovering.current ? 2.5 : 1;
      const opacity = isHovering.current ? 0.6 : 0.4;

      dot.style.transform = `translate3d(${pos.current.x - 6}px, ${pos.current.y - 6}px, 0) scale(${scale})`;
      dot.style.opacity = String(opacity);

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-screen transition-[transform,opacity] duration-100 hidden xl:block"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
};

export default CursorFollower;
