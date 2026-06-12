import { Link } from "react-router-dom";
import { ArrowRight } from "@/lib/icons";
import { InstrumentPanel } from "./system/InstrumentPanel";
import { InstrumentReadout } from "./system/InstrumentReadout";

/**
 * ApplyFoundationCTA — chapter closer. Left = headline + chip,
 * right = a small InstrumentPanel showing the next two chapters as
 * "queued" readouts, reinforcing the brand-as-instrument metaphor.
 */
export const ApplyFoundationCTA = () => (
  <section
    aria-label="Apply the foundation — next chapters"
    className="relative mt-16 md:mt-24 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 text-[hsl(var(--slate-50))] overflow-hidden"
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

    <div className="relative px-4 md:px-8 lg:px-12 xl:px-20 py-14 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
      <div>
        <div className="inline-flex items-center gap-3 mb-5">
          <span
            aria-hidden="true"
            className="block h-2 w-2 rounded-full bg-primary"
          />
          <span className="font-data text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] text-[hsl(var(--rho-green-accent))]">
            01.5 · Next
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

      <InstrumentPanel title="Next chapters · queue" live className="min-h-[260px]">
        <div className="grid grid-cols-1 gap-3">
          <InstrumentReadout
            label="02 · Voice & Tone"
            value="Queued"
            unit="ready"
            delta="→ how Rhosonics sounds"
          />
          <InstrumentReadout
            label="03 · Logo"
            value="Queued"
            unit="ready"
            delta="→ how Rhosonics looks"
          />
        </div>
        <div className="mt-4 font-data text-[10px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--slate-400))]">
          ● 11 chapters remaining in v2026
        </div>
      </InstrumentPanel>
    </div>
  </section>
);

export default ApplyFoundationCTA;
