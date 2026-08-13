/**
 * Test-side re-export of the shared route manifest so the smoke tests and the
 * production health endpoints can never drift apart.
 */
export { PAGE_ROUTES, REDIRECT_ROUTES, type PageRoute } from "../src/lib/route-manifest";

export const BASE_URL = (
  process.env["SMOKE_BASE_URL"] ?? "http://localhost:8080"
).replace(/\/$/, "");
