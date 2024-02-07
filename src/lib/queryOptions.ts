import { queryOptions } from "@tanstack/react-query";
import {
  fetchCustomersFiltered,
  fetchCustomersSummary,
  fetchInvoice,
  fetchInvoicesFiltered,
  fetchOverview,
} from "./api";

export const overviewQuery = queryOptions({
  queryKey: ["overview"],
  queryFn: () => fetchOverview(),
});

export const invoicesQuery = (searchString: string) =>
  queryOptions({
    queryKey: ["invoices", searchString],
    queryFn: () => fetchInvoicesFiltered(searchString),
  });

export const invoiceQuery = (id: string) =>
  queryOptions({
    queryKey: ["invoices", id],
    queryFn: () => fetchInvoice(id),
  });

export const customersQuery = (searchString: string) =>
  queryOptions({
    queryKey: ["customers", searchString],
    queryFn: () => fetchCustomersFiltered(searchString),
  });

export const customersSummaryQuery = queryOptions({
  queryKey: ["customers", "summary"],
  queryFn: () => fetchCustomersSummary(),
});
