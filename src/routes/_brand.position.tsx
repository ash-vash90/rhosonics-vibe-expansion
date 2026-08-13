import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const PositioningPage = lazy(() => import("@/pages/brand/PositioningPage"));

export const Route = createFileRoute("/_brand/position")({
  component: PositioningPage,
});
