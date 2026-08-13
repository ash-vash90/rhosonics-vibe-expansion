import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/positioning")({
  beforeLoad: () => {
    throw redirect({ to: "/position", replace: true });
  },
});
