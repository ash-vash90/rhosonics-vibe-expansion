import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const LogoAssetsPage = lazy(() => import("@/pages/brand/LogoAssetsPage"));

export const Route = createFileRoute("/_brand/logo")({
  component: LogoAssetsPage,
});
