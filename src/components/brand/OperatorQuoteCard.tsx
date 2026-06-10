/**
 * OperatorQuoteCard — scaffolded case-study quote card borrowed
 * from customer.io's big quote layout (portrait + logo + two
 * metric callouts + pull quote + named role). Explicitly marked
 * "pending" so it isn't mistaken for shipped content.
 */
export const OperatorQuoteCard = () => (
  <article
    className="mt-12 md:mt-16 bg-card rounded-[4px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]"
    style={{ boxShadow: "var(--shadow-card)" }}
    aria-label="Voice of operator — pending"
  >
    {/* Left rail: portrait placeholder + logo placeholder */}
    <div className="relative bg-foreground p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
      <div className="flex items-center justify-between">
        <span className="font-data text-[10px] tracking-[0.25em] uppercase text-background/60">
          Voice of operator
        </span>
        <span className="font-data text-[10px] tracking-[0.2em] uppercase text-primary bg-primary/15 px-2 py-1 rounded-sm">
          Pending
        </span>
      </div>

      {/* Portrait silhouette placeholder — abstract */}
      <div className="relative my-8 self-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-background/5 border border-background/10 flex items-center justify-center">
        <svg viewBox="0 0 64 64" className="w-16 h-16 text-background/30" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="32" cy="22" r="10" />
          <path d="M12 56c2-12 12-18 20-18s18 6 20 18" />
        </svg>
      </div>

      <div>
        <div className="font-data text-[11px] tracking-[0.2em] uppercase text-background/50 mb-1">
          Partner logo
        </div>
        <div className="h-6 w-32 bg-background/10 rounded-sm" />
      </div>
    </div>

    {/* Right: metrics + quote */}
    <div className="p-8 md:p-12 flex flex-col gap-8">
      <dl className="grid grid-cols-2 divide-x divide-border">
        <div className="pr-6">
          <dd className="font-data font-bold text-foreground text-4xl md:text-5xl leading-none tabular-nums mb-2">
            —
          </dd>
          <dt className="text-xs md:text-sm text-muted-foreground leading-snug">
            Headline metric pending — site, method, date
          </dt>
        </div>
        <div className="pl-6">
          <dd className="font-data font-bold text-foreground text-4xl md:text-5xl leading-none tabular-nums mb-2">
            —
          </dd>
          <dt className="text-xs md:text-sm text-muted-foreground leading-snug">
            Secondary metric pending — same baseline cited
          </dt>
        </div>
      </dl>

      <blockquote className="border-l-2 border-primary pl-5 md:pl-6">
        <span aria-hidden="true" className="block font-data text-primary text-3xl leading-none mb-3">
          &ldquo;
        </span>
        <p className="font-ui text-foreground text-lg md:text-xl leading-snug max-w-[55ch] italic">
          Operator quote co-authored with a named field partner will land here.
          Until the commercial team approves the pairing, this slot stays empty
          rather than filled with marketing language.
        </p>
        <footer className="mt-5 flex items-baseline gap-3 not-italic">
          <span className="font-ui font-semibold text-foreground text-sm">
            Name pending
          </span>
          <span className="font-data text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
            · Role · Plant
          </span>
        </footer>
      </blockquote>
    </div>
  </article>
);

export default OperatorQuoteCard;
