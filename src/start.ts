import * as ReactStart from "@tanstack/react-start";
import { createStart, createMiddleware } from "@tanstack/react-start";


import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs CSRF protection automatically when src/start.ts is absent;
// defining the file opts out, so re-add it when the installed runtime exposes
// it. Some bundled runtime builds don't export it — calling it unconditionally
// crashes SSR with "createCsrfMiddleware is not a function". In that case we
// fall back to a minimal same-origin check so protection degrades gracefully
// instead of disappearing (or crashing the whole app).

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const fallbackCsrfMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const method = (request.method || "GET").toUpperCase();
    if (!SAFE_METHODS.has(method)) {
      const target = new URL(request.url);
      const originHeader = request.headers.get("origin") ?? request.headers.get("referer");
      if (originHeader) {
        let sourceHost: string | null = null;
        try {
          sourceHost = new URL(originHeader).host;
        } catch {
          sourceHost = null;
        }
        const expectedHost = request.headers.get("host") ?? target.host;
        if (sourceHost && sourceHost !== expectedHost) {
          return new Response("Cross-origin request blocked", { status: 403 });
        }
      }
    }
  } catch (error) {
    // Never let the CSRF guard itself take the request down.
    console.error("CSRF fallback check failed", error);
  }
  return next();
});

function resolveCsrfMiddleware(): unknown {
  const createCsrf = (ReactStart as Record<string, unknown>)["createCsrfMiddleware"];
  if (typeof createCsrf !== "function") return fallbackCsrfMiddleware;
  try {
    const built = (createCsrf as (opts: unknown) => unknown)({
      filter: (ctx: { handlerType?: string }) => ctx.handlerType === "serverFn",
    });
    return built ?? fallbackCsrfMiddleware;
  } catch (error) {
    console.error("createCsrfMiddleware unavailable, using same-origin fallback", error);
    return fallbackCsrfMiddleware;
  }
}

const csrfMiddleware = resolveCsrfMiddleware();

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware] as never,
}));

