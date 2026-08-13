import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const ProofPage = lazy(() => import("@/pages/brand/ProofPage"));

export const Route = createFileRoute("/_brand/proof")({
  component: ProofPage,
});
