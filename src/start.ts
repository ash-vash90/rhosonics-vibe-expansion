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
// crashes SSR with "createCsrfMiddleware is not a function".
const createCsrf = (ReactStart as Record<string, unknown>)["createCsrfMiddleware"];
const csrfMiddleware =
  typeof createCsrf === "function"
    ? (createCsrf as (opts: unknown) => unknown)({
        filter: (ctx: { handlerType?: string }) => ctx.handlerType === "serverFn",
      })
    : undefined;

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, ...(csrfMiddleware ? [csrfMiddleware] : [])] as never,

}));
