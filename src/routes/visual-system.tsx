import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/visual-system")({
  beforeLoad: () => {
    throw redirect({ to: "/iconography", replace: true });
  },
});
