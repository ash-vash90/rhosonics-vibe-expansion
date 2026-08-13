import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const IconographyPage = lazy(() => import("@/pages/brand/IconographyPage"));

export const Route = createFileRoute("/_brand/iconography")({
  component: IconographyPage,
});
