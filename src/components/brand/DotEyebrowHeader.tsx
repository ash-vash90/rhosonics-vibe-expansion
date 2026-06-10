interface DotEyebrowHeaderProps {
  /** Eyebrow label, rendered uppercase in mono. */
  eyebrow: string;
  /** Chapter number tag, e.g. "01.1". */
  num: string;
  /** Display headline. */
  title: string;
  /** Supporting line. */
  subtitle: string;
}

/**
 * DotEyebrowHeader — page-local section header for 01 Brand Position.
 * Borrowed from customer.io's "● Platform philosophy" tag-above-headline
 * pattern. Quieter than the global SectionHeader: small green dot,
 * mono label, chapter number as a sibling tag, then the display H2.
 */
export const DotEyebrowHeader = ({
  eyebrow,
  num,
  title,
  subtitle,
}: DotEyebrowHeaderProps) => (
  <header className="mb-8 md:mb-12">
    <div className="flex items-center gap-3 mb-5 md:mb-6">
      <span
        aria-hidden="true"
        className="inline-block w-2 h-2 rounded-full bg-primary"
      />
      <span className="font-data text-[11px] md:text-xs tracking-[0.22em] uppercase text-foreground/70">
        {eyebrow}
      </span>
      <span className="h-px flex-1 max-w-16 bg-border" />
      <span className="font-data text-[11px] md:text-xs tracking-[0.22em] uppercase text-muted-foreground">
        {num}
      </span>
    </div>
    <h2 className="font-ui font-semibold tracking-tight text-foreground text-3xl md:text-5xl lg:text-6xl leading-[1.05] max-w-[18ch] mb-4 md:mb-5">
      {title}
    </h2>
    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
      {subtitle}
    </p>
  </header>
);

export default DotEyebrowHeader;
