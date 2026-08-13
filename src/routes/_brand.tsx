import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const BrandLayout = lazy(() => import("@/components/brand/BrandLayout"));

export const Route = createFileRoute("/_brand")({
  component: BrandLayout,
});
