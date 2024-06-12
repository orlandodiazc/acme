import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./auth";
import { ErrorPageComponent, NotFound } from "./components/errors";
import { Toaster } from "./components/ui/sonner";
import { routeTree } from "./routeTree.gen";
import Spinner from "./components/spinner";

export const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined,
  },
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => <ErrorPageComponent error={error} />,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: () => (
    <div className="grid h-full w-full place-content-center">
      <Spinner />
    </div>
  ),

  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthRouter() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthRouter />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster richColors closeButton />
    </StrictMode>,
  );
}
