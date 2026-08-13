import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/social-media")({
  beforeLoad: () => {
    throw redirect({ to: "/applications", replace: true });
  },
});
