import { AuthContext } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext | undefined;
}>()({
  component: () => <Outlet />,
});
