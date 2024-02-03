import CustomersTable from "@/components/dashboard/customers/table";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCustomersFiltered } from "@/lib/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboard/customers")({
  component: Customers,
  pendingComponent: () => (
    <>
      <h1 className="mb-4 text-xl md:text-2xl">Customers</h1>
      <Spinner />
    </>
  ),
  validateSearch: (search) =>
    search as {
      query: string | undefined;
    },
  loaderDeps: ({ search: { query } }) => ({
    query,
  }),
  loader: ({ location: { searchStr } }) => fetchCustomersFiltered(searchStr),
});

export default function Customers() {
  const customers = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });
  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl">Customers</h1>
      <div className="relative flex flex-1 flex-shrink-0">
        <Label htmlFor="search-customers" className="sr-only">
          Search Customers
        </Label>
        <Input
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                query: e.target.value || undefined,
              }),
            })
          }
          id="search-customers"
          className="pl-10"
          placeholder="Search customers..."
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="mt-6 rounded-md border">
        <CustomersTable customers={customers} />
      </div>
    </div>
  );
}
