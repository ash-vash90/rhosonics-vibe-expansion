import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/logo-assets")({
  beforeLoad: () => {
    throw redirect({ to: "/logo", replace: true });
  },
});
