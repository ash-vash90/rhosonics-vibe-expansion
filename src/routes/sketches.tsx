import { lazy } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";

// Dev-only sketches playground — mirrors the old `import.meta.env.DEV` route guard.
const SketchesPage = lazy(() => import("@/pages/SketchesPage"));

export const Route = createFileRoute("/sketches")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: SketchesPage,
});
