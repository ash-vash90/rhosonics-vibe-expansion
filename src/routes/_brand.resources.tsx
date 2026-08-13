import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ResourcesPage = lazy(() => import("@/pages/brand/ResourcesPage"));

export const Route = createFileRoute("/_brand/resources")({
  component: ResourcesPage,
});
