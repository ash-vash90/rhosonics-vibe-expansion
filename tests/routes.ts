/**
 * Single source of truth for the SSR smoke tests.
 * Keep in sync with src/routes/*.
 */

export const BASE_URL = (
  process.env["SMOKE_BASE_URL"] ?? "http://localhost:8080"
).replace(/\/$/, "");

export type PageRoute = {
  /** URL path to fetch. */
  path: string;
  /** Substring that must appear in the server-rendered <title>. */
  title?: string;
  /** Text that must appear in the server-rendered HTML (crawler-visible). */
  contains: string[];
};

/** Routes that must render HTML on the server with status 200. */
export const PAGE_ROUTES: PageRoute[] = [
  { path: "/", contains: ["Brand"] },
  { path: "/position", contains: ["Brand Position"] },
  { path: "/logo", contains: ["Logo"] },
  { path: "/color", contains: ["Colour", "Color"] },
  { path: "/typography", contains: ["Typograph"] },
  { path: "/iconography", contains: ["Icon"] },
  { path: "/imagery", contains: ["Imagery"] },
  { path: "/data-viz", contains: ["Data"] },
  { path: "/voice", contains: ["Voice"] },
  { path: "/applications", contains: ["Application"] },
  { path: "/proof", contains: ["Proof"] },
  { path: "/resources", contains: ["Resource"] },
  { path: "/tools", contains: ["Tool"] },
  { path: "/newsletter", contains: ["Newsletter"] },
  { path: "/sketches", contains: ["Sketch"] },
];

/** Legacy paths that must issue a server-side redirect. */
export const REDIRECT_ROUTES: Array<{ from: string; to: string }> = [
  { from: "/about", to: "/position" },
  { from: "/positioning", to: "/position" },
  { from: "/principles", to: "/position" },
  { from: "/logo-assets", to: "/logo" },
  { from: "/visual-system", to: "/iconography" },
  { from: "/social-media", to: "/applications" },
  { from: "/review", to: "/" },
];
