import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import Spinner from "./components/spinner";
import ErrorComponent from "./components/error";
import { Toaster } from "./components/ui/sonner";

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="grid h-full place-content-center">
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
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
      <Toaster richColors closeButton />
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
