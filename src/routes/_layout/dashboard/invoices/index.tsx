import InvoicesTable from "@/components/dashboard/invoices/table";
import DashboardPagination from "@/components/dashboard/pagination";
import ErrorComponent from "@/components/error";
import Spinner from "@/components/spinner";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { invoicesQuery } from "@/lib/api/queryOptions";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  defaultStringifySearch,
  useNavigate,
} from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export interface InvoiceSearch {
  page: number;
  query?: string;
}

export const Route = createFileRoute("/_layout/dashboard/invoices/")({
  component: InvoicesIndex,
  validateSearch: (search: Record<string, unknown>): InvoiceSearch => {
    return { page: Number(search?.page ?? 1), query: search.query as string };
  },
  loaderDeps: ({ search: { query, page } }) => ({ query, page }),
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(invoicesQuery(deps));
  },
});

function InvoicesIndex() {
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();
  return (
    <div>
      <h1 className="mb-4 text-2xl">Invoices</h1>
      <div className="mb-6 flex flex-col gap-2 md:flex-row">
        <Label htmlFor="search-customers" className="sr-only">
          Search invoices
        </Label>
        <div className="relative grow">
          <Input
            onChange={(e) =>
              navigate({
                search: {
                  page: 1,
                  query: e.target.value || undefined,
                },
              })
            }
            id="search-customers"
            className="pl-10"
            placeholder="Search customers..."
            defaultValue={search.query}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Link
          to="/dashboard/invoices/new"
          className={cn(buttonVariants(), "order-first md:order-last")}
        >
          Create Invoice <Plus strokeWidth={1.5} className="ml-2" />
        </Link>
      </div>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <Suspense fallback={<Spinner />}>
          <InvoicesData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function InvoicesData() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(invoicesQuery(search));
  const { invoices, totalPages } = data;
  return (
    <>
      <div className="mb-6 rounded-md border">
        <InvoicesTable invoices={invoices} />
      </div>
      <DashboardPagination currentPage={search.page} totalPages={totalPages} />
    </>
  );
}
