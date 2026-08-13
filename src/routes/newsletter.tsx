import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const Newsletter = lazy(() => import("@/pages/Newsletter"));

export const Route = createFileRoute("/newsletter")({
  component: Newsletter,
});
