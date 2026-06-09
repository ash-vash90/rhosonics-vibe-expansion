import { cn } from "@/lib/utils";

/**
 * LogoWallProof — typographic customer reference grid.
 *
 * We do not display real customer logos without written permission, so
 * the wall is wordmark-style: customer name set in JetBrains Mono caps,
 * grouped by industry, with a transparent sample-size counter at the top.
 * The pattern borrows from FLSmidth's "selected references" strip while
 * staying inside the evidence-first voice rule (no claims, just counts).
 */

export interface LogoEntry {
  name: string;
  site?: string; // optional city/country line
}

export interface LogoGroup {
  industry: string;
  count: number; // total references in that industry (may exceed listed)
  shown: LogoEntry[];
}

interface LogoWallProofProps {
  groups: LogoGroup[];
  totalReferences: number;
  asOf: string; // e.g. "Q2 2025"
  className?: string;
}

export const LogoWallProof = ({
  groups,
  totalReferences,
  asOf,
  className,
}: LogoWallProofProps) => {
  return (
    <section
      aria-label="Customer reference wall"
      className={cn("space-y-8", className)}
    >
      {/* Counter strip — honest about sample size */}
      <header className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-border pb-4">
        <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">
          Selected references
        </span>
        <span className="font-data font-bold uppercase text-2xl md:text-3xl text-foreground tracking-tight">
          {totalReferences}
        </span>
        <span className="font-ui text-sm text-muted-foreground">
          installations in service
        </span>
        <span className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground ml-auto">
          as of {asOf}
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {groups.map((g) => (
          <div key={g.industry} className="bg-background p-6 md:p-7">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-data text-[11px] uppercase tracking-[0.3em] text-primary">
                {g.industry}
              </span>
              <span className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {g.shown.length} of {g.count} shown
              </span>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
              {g.shown.map((e) => (
                <li
                  key={e.name}
                  className="bg-[hsl(var(--slate-100))] px-3 py-4 flex flex-col gap-1 items-start"
                >
                  <span className="font-data text-xs md:text-sm uppercase tracking-wider text-foreground leading-tight">
                    {e.name}
                  </span>
                  {e.site && (
                    <span className="font-ui text-[11px] text-muted-foreground leading-tight">
                      {e.site}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="font-ui text-xs text-muted-foreground max-w-[60ch] leading-relaxed">
        Wordmark format reflects active reference-release status. Full client
        list and named case studies available under NDA on request.
      </p>
    </section>
  );
};

export default LogoWallProof;
