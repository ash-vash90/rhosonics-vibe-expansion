import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ToolsPage = lazy(() => import("@/pages/brand/ToolsPage"));

export const Route = createFileRoute("/_brand/tools")({
  component: ToolsPage,
});
