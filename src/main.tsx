import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import Spinner from "./components/spinner";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="grid h-full place-content-center">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingMs: 500,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
