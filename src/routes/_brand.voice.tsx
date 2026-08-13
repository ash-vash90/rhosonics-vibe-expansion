import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const VoicePage = lazy(() => import("@/pages/brand/VoicePage"));

export const Route = createFileRoute("/_brand/voice")({
  component: VoicePage,
});
