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

// Keep CSRF protection local rather than referencing the optional framework helper.
// Some production bundles expose an incompatible export under that name and
// can rewrite even a guarded dynamic lookup into a hard-crashing direct call.

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const csrfMiddleware = createMiddleware().server(async ({ next, request }) => {
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

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));

