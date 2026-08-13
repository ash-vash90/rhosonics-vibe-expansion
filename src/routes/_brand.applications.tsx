import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ApplicationsPage = lazy(() => import("@/pages/brand/ApplicationsPage"));

export const Route = createFileRoute("/_brand/applications")({
  component: ApplicationsPage,
});
