import { createFileRoute } from "@tanstack/react-router";

import {
  PAGE_ROUTES,
  REDIRECT_ROUTES,
  type CheckState,
  type HealthReport,
  type RouteReport,
} from "@/lib/route-manifest";

const TIMEOUT_MS = 12_000;

function titleOf(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m?.[1]?.trim() ?? null;
}

/** Strip tags so "contains" checks run against crawler-visible text. */
function textOf(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");
}

async function probe(url: string, redirect: RequestRedirect): Promise<{
  res: Response | null;
  body: string;
  durationMs: number;
  error?: string;
}> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: { "user-agent": "rhosonics-health-check" },
    });
    const body = redirect === "manual" ? "" : await res.text();
    return { res, body, durationMs: Date.now() - started };
  } catch (error) {
    return {
      res: null,
      body: "",
      durationMs: Date.now() - started,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function checkPage(origin: string, route: (typeof PAGE_ROUTES)[number]): Promise<RouteReport> {
  const { res, body, durationMs, error } = await probe(origin + route.path, "follow");
  const notes: string[] = [];
  let ssr: CheckState = "pass";
  let hydration: CheckState = "pass";

  if (!res) {
    return {
      path: route.path,
      kind: "page",
      status: null,
      durationMs,
      ssr: "fail",
      hydration: "fail",
      redirect: "n/a",
      notes: [`Request failed: ${error ?? "unknown error"}`],
    };
  }

  if (res.status !== 200) {
    ssr = "fail";
    notes.push(`Expected 200, got ${res.status}`);
  }

  const text = textOf(body);
  const missing = route.contains.length
    ? route.contains.every((needle) => !text.includes(needle))
    : false;
  if (missing) {
    ssr = ssr === "fail" ? "fail" : "warn";
    notes.push(`Server HTML missing expected copy: ${route.contains.join(" / ")}`);
  }
  if (!/<h1[\s>]/i.test(body)) {
    ssr = ssr === "fail" ? "fail" : "warn";
    notes.push("No <h1> in the server response");
  }
  if (body.includes("This page didn't load")) {
    ssr = "fail";
    notes.push("Server returned the SSR error fallback page");
  }

  const hasClientEntry = /<script[^>]+type="module"/i.test(body);
  const hasRouterState = body.includes("__TSR") || body.includes("tsr");
  if (!hasClientEntry) {
    hydration = "fail";
    notes.push("No client entry script — the page cannot hydrate");
  } else if (!hasRouterState) {
    hydration = "warn";
    notes.push("No serialised router state found in the response");
  }

  return {
    path: route.path,
    kind: "page",
    status: res.status,
    durationMs,
    ssr,
    hydration,
    redirect: "n/a",
    title: titleOf(body),
    bytes: body.length,
    notes,
  };
}

async function checkRedirect(
  origin: string,
  route: (typeof REDIRECT_ROUTES)[number],
): Promise<RouteReport> {
  const { res, durationMs, error } = await probe(origin + route.from, "manual");
  const notes: string[] = [];

  if (!res) {
    return {
      path: route.from,
      kind: "redirect",
      status: null,
      durationMs,
      ssr: "n/a" as unknown as CheckState,
      hydration: "n/a" as unknown as CheckState,
      redirect: "fail",
      expectedLocation: route.to,
      actualLocation: null,
      notes: [`Request failed: ${error ?? "unknown error"}`],
    };
  }

  const location = res.headers.get("location");
  const normalized = location ? new URL(location, origin).pathname : null;
  let redirect: CheckState = "pass";

  if (res.status < 300 || res.status >= 400) {
    redirect = "fail";
    notes.push(`Expected a 3xx redirect, got ${res.status}`);
  } else if (normalized !== route.to) {
    redirect = "fail";
    notes.push(`Expected redirect to ${route.to}, got ${normalized ?? "no Location header"}`);
  }

  return {
    path: route.from,
    kind: "redirect",
    status: res.status,
    durationMs,
    ssr: "pass",
    hydration: "pass",
    redirect,
    expectedLocation: route.to,
    actualLocation: normalized,
    notes,
  };
}

/**
 * Deep health check: probes every page and legacy redirect against this
 * deployment's own origin and reports SSR, hydration-readiness, and redirect
 * consistency. Read-only and public — it exposes nothing beyond what a
 * crawler already sees.
 */
export const Route = createFileRoute("/api/public/health/routes")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        const routes = [
          ...(await Promise.all(PAGE_ROUTES.map((r) => checkPage(origin, r)))),
          ...(await Promise.all(REDIRECT_ROUTES.map((r) => checkRedirect(origin, r)))),
        ];

        const worst = (r: RouteReport): CheckState => {
          const states = [r.ssr, r.hydration, r.redirect].filter(
            (s): s is CheckState => s === "pass" || s === "warn" || s === "fail",
          );
          if (states.includes("fail")) return "fail";
          if (states.includes("warn")) return "warn";
          return "pass";
        };

        const totals = routes.reduce(
          (acc, r) => {
            const s = worst(r);
            acc.total += 1;
            acc[s] += 1;
            return acc;
          },
          { total: 0, pass: 0, warn: 0, fail: 0 },
        );

        const report: HealthReport = {
          status: totals.fail > 0 ? "fail" : totals.warn > 0 ? "warn" : "pass",
          checkedAt: new Date().toISOString(),
          origin,
          totals,
          routes,
        };

        return Response.json(report, {
          status: report.status === "fail" ? 503 : 200,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
