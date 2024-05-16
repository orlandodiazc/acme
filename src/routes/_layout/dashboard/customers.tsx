import CustomersTable from "@/components/dashboard/customers/table";
import { SearchBar } from "@/components/dashboard/search-bar";
import ErrorComponent from "@/components/error";
import Spinner from "@/components/spinner";

import { customersQuery } from "@/lib/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/_layout/dashboard/customers")({
  component: CustomersIndex,
  validateSearch: (search) => search as { searchQuery?: string },
  loaderDeps: ({ search: { searchQuery } }) => ({
    searchQuery,
  }),
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(customersQuery(deps));
  },
});
// TODO: update search bar
export default function CustomersIndex() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-3xl">Customers</h1>
      <div className="relative mb-6">
        <SearchBar
          handleChange={(value?: string) =>
            navigate({
              to: "/dashboard/customers",
              search: { searchQuery: value },
            })
          }
          defaultValue={search.searchQuery}
        />
      </div>
      <div className="flex h-full flex-col">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Suspense
            fallback={
              <div className="flex justify-center text-primary">
                <Spinner />
              </div>
            }
          >
            <CustomersData />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

function CustomersData() {
  const search = Route.useSearch();
  const { data: customers } = useSuspenseQuery(customersQuery(search));
  return (
    <div className="rounded-md border">
      {customers.length > 0 ? (
        <CustomersTable customers={customers} />
      ) : (
        <p className="text-center text-muted-foreground">
          No customers have been found.
        </p>
      )}
    </div>
  );
}
