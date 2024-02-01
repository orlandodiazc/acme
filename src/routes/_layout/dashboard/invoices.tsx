import InvoicesTable from "@/components/dashboard/invoices/table";
import DashboardPagination from "@/components/dashboard/pagination";
import { Input } from "@/components/ui/input";

import { fetchFilteredInvoices } from "@/lib/api";
import { InvoiceFilteredPageable } from "@/lib/api.types";
import { Label } from "@radix-ui/react-label";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Search } from "lucide-react";

export interface InvoiceSearch {
  page: number;
  query: string | undefined;
}

export const Route = createFileRoute("/_layout/dashboard/invoices")({
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
    return fetchFilteredInvoices(searchStr);
  },
});

function Invoices() {
  const { invoices, totalPages } = useLoaderData({
    from: "/_layout/dashboard/invoices",
  }) as InvoiceFilteredPageable;
  const navigate = useNavigate({ from: Route.fullPath });
  const search = useSearch({ from: "/_layout/dashboard/invoices" });
  return (
    <>
      <h1 className="mb-4 text-xl md:text-2xl">Invoices</h1>
      <div className="relative flex flex-1 flex-shrink-0">
        <Label htmlFor="search-customers" className="sr-only">
          Search invoices
        </Label>
        <Input
          onChange={(e) =>
            navigate({
              search: { ...search, query: e.target.value || undefined },
            })
          }
          id="search-customers"
          className="pl-10"
          placeholder="Search customers..."
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="my-6 rounded-md border">
        <InvoicesTable invoices={invoices} />
      </div>
      <DashboardPagination currentPage={search.page} totalPages={totalPages} />
    </>
  );
}
