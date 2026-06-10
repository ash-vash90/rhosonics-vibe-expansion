interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "5", label: "Canonical values" },
  { value: "5", label: "Design principles" },
  { value: "5", label: "Industries served" },
  { value: "10", label: "ICP slots scaffolded" },
];

/**
 * FoundationStats — KPI strip borrowed from customer.io's
 * "99.98% / 100B+ / 24/5 / 99%" platform stat bar. Four tiles,
 * thin vertical rules, mono numerals. Anchors the Foundation
 * chapter in countable facts before the prose.
 */
export const FoundationStats = () => (
  <section
    aria-label="Brand foundation by the numbers"
    className="mt-12 md:mt-16 bg-card rounded-[4px] overflow-hidden"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="px-6 md:px-8 py-6 md:py-8 flex flex-col gap-2"
        >
          <dt className="order-2 font-data text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            {s.label}
          </dt>
          <dd className="order-1 font-data font-bold text-foreground text-4xl md:text-5xl lg:text-6xl leading-none tabular-nums">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default FoundationStats;
