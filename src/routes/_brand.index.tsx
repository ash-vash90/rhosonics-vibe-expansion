import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const HomePage = lazy(() => import("@/pages/brand/HomePage"));

export const Route = createFileRoute("/_brand/")({
  component: HomePage,
});
