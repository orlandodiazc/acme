import InvoicesTable from "@/components/dashboard/invoices/table";
import DashboardPagination from "@/components/dashboard/pagination";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchInvoicesFiltered } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";

export interface InvoiceSearch {
  page: number;
  query: string | undefined;
}

export const Route = createFileRoute("/_layout/dashboard/invoices/")({
  component: Invoices,

  validateSearch: (search: Record<string, unknown>): InvoiceSearch => {
    return {
      page: Number(search?.page ?? 1),
      query: search.query as string,
    };
  },
  loaderDeps: ({ search: { query, page } }) => ({
    query,
    page,
  }),
  loader: ({ location: { searchStr } }) => {
    return fetchInvoicesFiltered(searchStr);
  },
});

function Invoices() {
  const { invoices, totalPages } = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });
  const { page } = Route.useSearch();
  return (
    <>
      <h1 className="mb-4 text-2xl">Invoices</h1>
      <div className="flex flex-col gap-2 md:flex-row">
        <Label htmlFor="search-customers" className="sr-only">
          Search invoices
        </Label>
        <div className="relative grow">
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
        <Link
          to="/dashboard/invoices/create"
          className={cn(buttonVariants(), "order-first md:order-last")}
        >
          Create Invoice <Plus strokeWidth={1.5} className="ml-2" />
        </Link>
      </div>
      <div className="my-4 rounded-md border">
        <InvoicesTable invoices={invoices} />
      </div>
      <DashboardPagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
