import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import type { CheckState, HealthReport, RouteReport } from "@/lib/route-manifest";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "System Health | Rhosonics Brand System" },
      {
        name: "description",
        content:
          "Live SSR, hydration, and redirect health for every route of the Rhosonics Brand System.",
      },
      { property: "og:title", content: "System Health | Rhosonics Brand System" },
      {
        property: "og:description",
        content: "Live SSR, hydration, and redirect health for every Brand System route.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: HealthPage,
});

const STATE_STYLES: Record<CheckState, string> = {
  pass: "bg-primary/10 text-primary",
  warn: "bg-amber-500/15 text-amber-700",
  fail: "bg-destructive/10 text-destructive",
};

const STATE_LABEL: Record<CheckState, string> = {
  pass: "PASS",
  warn: "WARN",
  fail: "FAIL",
};

function StateChip({ state }: { state: CheckState | "n/a" }) {
  if (state === "n/a") {
    return <span className="font-data text-[11px] text-muted-foreground">—</span>;
  }
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-data text-[11px] tracking-wide ${STATE_STYLES[state]}`}
    >
      {STATE_LABEL[state]}
    </span>
  );
}

function Summary({ report }: { report: HealthReport }) {
  const items: Array<[string, string]> = [
    ["ROUTES", String(report.totals.total)],
    ["PASS", String(report.totals.pass)],
    ["WARN", String(report.totals.warn)],
    ["FAIL", String(report.totals.fail)],
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded overflow-hidden">
      {items.map(([label, value]) => (
        <div key={label} className="bg-card px-4 py-5">
          <div className="font-data text-[11px] tracking-wide text-muted-foreground">{label}</div>
          <div className="font-ui text-3xl font-semibold text-foreground tabular-nums">{value}</div>
        </div>
      ))}
    </div>
  );
}

function Row({ route }: { route: RouteReport }) {
  return (
    <tr className="border-t border-border align-top">
      <td className="py-3 pr-4">
        <div className="font-data text-xs text-foreground">{route.path}</div>
        <div className="font-data text-[11px] text-muted-foreground">
          {route.kind.toUpperCase()} · {route.status ?? "ERR"} · {route.durationMs}ms
        </div>
      </td>
      <td className="py-3 pr-4"><StateChip state={route.ssr} /></td>
      <td className="py-3 pr-4"><StateChip state={route.hydration} /></td>
      <td className="py-3 pr-4">
        <StateChip state={route.redirect} />
        {route.expectedLocation && (
          <div className="font-data text-[11px] text-muted-foreground mt-1">
            {route.actualLocation ?? "none"} → {route.expectedLocation}
          </div>
        )}
      </td>
      <td className="py-3 text-sm text-muted-foreground">
        {route.notes.length ? (
          <ul className="space-y-1">
            {route.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : (
          <span className="font-data text-[11px] text-muted-foreground">NO ISSUES</span>
        )}
      </td>
    </tr>
  );
}

function HealthPage() {
  const { data, isFetching, error, refetch } = useQuery<HealthReport>({
    queryKey: ["health", "routes"],
    queryFn: async () => {
      const res = await fetch("/api/public/health/routes", { cache: "no-store" });
      return (await res.json()) as HealthReport;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-10">
          <div className="font-data text-[11px] tracking-wide text-muted-foreground mb-3">
            OPERATIONS · HEALTH CHECK
          </div>
          <h1 className="font-ui text-4xl font-bold tracking-tight text-foreground mb-3">
            System health
          </h1>
          <p className="max-w-[65ch] text-muted-foreground">
            Probes every published route from this deployment and reports server rendering,
            hydration readiness, and redirect consistency.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="rounded bg-primary px-4 py-2 font-ui text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600 disabled:opacity-60"
            >
              {isFetching ? "Running checks…" : "Run checks"}
            </button>
            {data && (
              <span className="font-data text-[11px] text-muted-foreground">
                LAST RUN {new Date(data.checkedAt).toISOString().replace("T", " ").slice(0, 19)} UTC
              </span>
            )}
          </div>
        </header>

        {error && (
          <p className="rounded border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            Health check request failed: {(error as Error).message}
          </p>
        )}

        {isFetching && !data && (
          <p className="font-data text-xs text-muted-foreground">RUNNING ROUTE PROBES…</p>
        )}

        {data && (
          <>
            <div className="mb-8 flex items-center gap-3">
              <StateChip state={data.status} />
              <span className="font-data text-[11px] text-muted-foreground">{data.origin}</span>
            </div>

            <Summary report={data} />

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="font-data text-[11px] tracking-wide text-muted-foreground">
                    <th className="pb-3 pr-4 font-normal">ROUTE</th>
                    <th className="pb-3 pr-4 font-normal">SSR</th>
                    <th className="pb-3 pr-4 font-normal">HYDRATION</th>
                    <th className="pb-3 pr-4 font-normal">REDIRECT</th>
                    <th className="pb-3 font-normal">NOTES</th>
                  </tr>
                </thead>
                <tbody>
                  {data.routes.map((r) => (
                    <Row key={`${r.kind}-${r.path}`} route={r} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
