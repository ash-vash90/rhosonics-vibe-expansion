import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ColorPage = lazy(() => import("@/pages/brand/ColorPage"));

export const Route = createFileRoute("/_brand/color")({
  component: ColorPage,
});
