import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const TypographyPage = lazy(() => import("@/pages/brand/TypographyPage"));

export const Route = createFileRoute("/_brand/typography")({
  component: TypographyPage,
});
