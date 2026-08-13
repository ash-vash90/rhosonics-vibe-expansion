import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ImageryPage = lazy(() => import("@/pages/brand/ImageryPage"));

export const Route = createFileRoute("/_brand/imagery")({
  component: ImageryPage,
});
