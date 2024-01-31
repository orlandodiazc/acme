import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/customers")({
  component: () => <div>Hello /dashboard/customers!</div>,
});
