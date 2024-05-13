import CustomersTable from "@/components/dashboard/customers/table";
import ErrorComponent from "@/components/error";
import Spinner from "@/components/spinner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { customersQuery } from "@/lib/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  defaultStringifySearch,
  useNavigate,
} from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/_layout/dashboard/customers")({
  component: CustomersIndex,
  validateSearch: (search) =>
    search as {
      query?: string;
    },
  loaderDeps: ({ search: { query } }) => ({
    query,
  }),
  loader: ({ context: { queryClient }, location: { searchStr } }) => {
    queryClient.ensureQueryData(customersQuery(searchStr));
  },
});

export default function CustomersIndex() {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-3xl">Customers</h1>
      <div className="relative mb-6">
        <Label htmlFor="search-customers" className="sr-only">
          Search Customers
        </Label>
        <Input
          onChange={(e) =>
            navigate({
              search: { query: e.target.value || undefined },
            })
          }
          id="search-customers"
          className="pl-10"
          placeholder="Search customers..."
          defaultValue={search.query}
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="flex flex-col">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Suspense fallback={<Spinner />}>
            <CustomersData />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

function CustomersData() {
  const searchString = defaultStringifySearch(Route.useSearch());
  const { data: customers } = useSuspenseQuery(customersQuery(searchString));
  return (
    <div className="rounded-md border">
      <CustomersTable customers={customers} />
    </div>
  );
}
