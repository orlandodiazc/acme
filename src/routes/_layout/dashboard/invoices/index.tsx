import InvoicesTable from "@/components/dashboard/invoices/table";
import DashboardPagination from "@/components/dashboard/pagination";
import { SearchBar } from "@/components/dashboard/search-bar";
import { ErrorPageComponent } from "@/components/errors";
import Spinner from "@/components/spinner";
import { buttonVariants } from "@/components/ui/button";
import { invoicesQuery } from "@/lib/api/queryOptions";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/_layout/dashboard/invoices/")({
  component: InvoicesIndex,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
      searchQuery: search.searchQuery as string,
    } as {
      page: number;
      searchQuery?: string;
    };
  },
  loaderDeps: ({ search: { searchQuery, page } }) => ({ searchQuery, page }),
  loader: ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(invoicesQuery(deps));
  },
});

function InvoicesIndex() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  return (
    <div>
      <h1 className="mb-4 text-3xl">Invoices</h1>
      <div className="mb-6 flex flex-col gap-2 md:flex-row">
        <div className="grow">
          <SearchBar
            handleChange={(value?: string) =>
              navigate({
                to: "/dashboard/invoices",
                search: { page: 1, searchQuery: value },
              })
            }
            placeholder="Search invoices..."
            defaultValue={search.searchQuery}
          />
        </div>
        <Link
          to="/dashboard/invoices/new"
          className={cn(buttonVariants(), "order-first md:order-last")}
        >
          Create Invoice <Plus strokeWidth={1.5} className="ml-2" />
        </Link>
      </div>
      <ErrorBoundary FallbackComponent={ErrorPageComponent}>
        <Suspense
          fallback={
            <div className="flex justify-center text-primary">
              <Spinner />
            </div>
          }
        >
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
      {invoices.length > 0 ? (
        <>
          <div className="mb-6 rounded-md border">
            <InvoicesTable invoices={invoices} />
          </div>
          <DashboardPagination
            currentPage={search.page}
            totalPages={totalPages}
          />{" "}
        </>
      ) : (
        <p className="text-center text-muted-foreground">
          No invoices have been found.
        </p>
      )}
    </>
  );
}
