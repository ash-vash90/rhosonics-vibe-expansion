import { createFileRoute } from "@tanstack/react-router";

import { PAGE_ROUTES, REDIRECT_ROUTES } from "@/lib/route-manifest";

/**
 * Lightweight liveness probe. Cheap enough for uptime monitors to poll.
 * No PII, no privileged data.
 */
export const Route = createFileRoute("/api/public/health")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          {
            status: "ok",
            service: "rhosonics-brand-system",
            renderMode: "ssr",
            checkedAt: new Date().toISOString(),
            routes: { pages: PAGE_ROUTES.length, redirects: REDIRECT_ROUTES.length },
          },
          { headers: { "cache-control": "no-store" } },
        ),
    },
  },
});
