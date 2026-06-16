import { Link } from "react-router-dom";
import { ArrowRight } from "@/lib/icons";

/**
 * ApplyFoundationCTA — chapter closer. Headline + the two next-chapter
 * links. No instrument-panel queue (it was decorative, not informative).
 */
export const ApplyFoundationCTA = () => (
  <section
    aria-label="Apply the foundation — next chapters"
    className="relative text-[hsl(var(--slate-50))] overflow-hidden"
    style={{
      background: "hsl(var(--rho-obsidian))",
      borderTop: "1px solid hsl(224 18% 18%)",
    }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 85% 20%, hsl(var(--rho-green) / 0.18), transparent 55%)",
      }}
    />

    <div className="relative px-4 md:px-8 lg:px-12 xl:px-20 py-10 md:py-14 lg:py-16 max-w-[820px]">
      <div className="inline-flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block h-2 w-2 rounded-full bg-primary"
        />
        <span className="font-data text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] text-[hsl(var(--rho-green-accent))]">
          01.6 · Next
        </span>
      </div>
      <h2
        className="font-ui font-bold tracking-tight text-balance max-w-[16ch] mb-5 text-[hsl(var(--slate-50))]"
        style={{ fontSize: "clamp(32px, 4.4vw, 56px)", letterSpacing: "-0.025em" }}
      >
        Now apply the foundation.
      </h2>
      <p className="text-base md:text-lg text-[hsl(var(--slate-300))] leading-relaxed max-w-[55ch]">
        The position is set. The next two chapters turn it into voice and
        identity — how Rhosonics sounds, and how it looks.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
        <Link
          to="/voice"
          className="group inline-flex items-center justify-between gap-6 bg-primary text-primary-foreground px-5 py-3.5 rounded-[4px] hover:bg-primary/90 transition-colors sm:min-w-[260px]"
        >
          <span className="font-ui font-semibold text-sm md:text-base">
            02 · Voice &amp; Tone
          </span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/logo"
          className="group inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-[4px] border border-[hsl(224_18%_22%)] text-[hsl(var(--slate-50))] hover:border-primary transition-colors sm:min-w-[260px]"
        >
          <span className="font-ui font-semibold text-sm md:text-base">
            03 · Logo
          </span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </section>
);

export default ApplyFoundationCTA;

