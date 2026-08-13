import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const DataVizPage = lazy(() => import("@/pages/brand/DataVizPage"));

export const Route = createFileRoute("/_brand/data-viz")({
  component: DataVizPage,
});
