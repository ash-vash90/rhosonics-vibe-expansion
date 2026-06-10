import { Link } from "react-router-dom";
import { ArrowRight } from "@/lib/icons";

/**
 * ApplyFoundationCTA — closer band for 01 Brand Position. Borrowed
 * from customer.io's "Supercharge your messaging" closing band:
 * big display headline, two pill CTAs, and a quiet progress chip.
 * Dark obsidian surface so it rhymes with the Principles panel
 * and the Vision panel — and signals the chapter ending.
 */
export const ApplyFoundationCTA = () => (
  <section
    aria-label="Apply the foundation — next chapters"
    className="relative mt-16 md:mt-24 bg-foreground text-background overflow-hidden"
    style={{
      boxShadow: "var(--shadow-elevated)",
      clipPath:
        "polygon(0 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%)",
    }}
  >
    {/* radial green wash */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 85% 20%, hsl(var(--primary) / 0.18), transparent 55%)",
      }}
    />

    <div className="relative px-6 md:px-12 lg:px-16 py-14 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-primary" />
          <span className="font-data text-[11px] md:text-xs tracking-[0.22em] uppercase text-background/70">
            01.5 · Next
          </span>
        </div>
        <h2 className="font-ui font-semibold tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.05] max-w-[16ch]">
          Now apply the foundation.
        </h2>
        <p className="mt-4 md:mt-6 text-sm md:text-base text-background/70 leading-relaxed max-w-[55ch]">
          The position is set. The next two chapters turn it into voice and
          identity — how Rhosonics sounds, and how it looks.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 lg:items-end">
        <Link
          to="/voice"
          className="group inline-flex items-center justify-between gap-6 bg-primary text-primary-foreground px-5 py-4 rounded-[4px] hover:bg-primary/90 transition-colors w-full lg:w-[320px]"
        >
          <span className="flex flex-col items-start">
            <span className="font-data text-[10px] tracking-[0.22em] uppercase opacity-80">
              02 · Voice &amp; Tone
            </span>
            <span className="font-ui font-semibold text-base md:text-lg">
              How Rhosonics sounds
            </span>
          </span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to="/logo"
          className="group inline-flex items-center justify-between gap-6 bg-background/[0.06] text-background px-5 py-4 rounded-[4px] hover:bg-background/[0.12] transition-colors w-full lg:w-[320px] border border-background/15"
        >
          <span className="flex flex-col items-start">
            <span className="font-data text-[10px] tracking-[0.22em] uppercase opacity-70">
              03 · Logo
            </span>
            <span className="font-ui font-semibold text-base md:text-lg">
              How Rhosonics looks
            </span>
          </span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>

        <span className="mt-2 font-data text-[10px] tracking-[0.22em] uppercase text-background/50">
          ● 11 chapters remaining
        </span>
      </div>
    </div>
  </section>
);

export default ApplyFoundationCTA;
