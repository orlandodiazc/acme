import { queryClient } from "@/main";
import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  deleteInvoice,
  fetchCustomersFiltered,
  fetchCustomersSummary,
  fetchInvoice,
  fetchInvoicesFiltered,
  fetchOverview,
  postInvoice,
  putInvoice,
} from ".";

export const overviewQuery = () =>
  queryOptions({
    queryKey: ["overview"],
    queryFn: fetchOverview,
  });

export const invoicesQuery = (searchParams?: Record<string, unknown>) =>
  queryOptions({
    queryKey: ["invoices", searchParams],
    queryFn: () => fetchInvoicesFiltered(searchParams),
  });

export const invoiceQuery = (id: string) =>
  queryOptions({
    queryKey: ["invoices", id],
    queryFn: () => fetchInvoice(id),
  });

export const useCreateInvoiceMutation = () =>
  useMutation({
    mutationKey: ["invoices", "create"],
    mutationFn: postInvoice,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: invoicesQuery().queryKey });
    },
  });

export const usePutInvoiceMutation = (invoiceId: string) =>
  useMutation({
    mutationKey: ["invoices", "put", invoiceId],
    mutationFn: (formData: FormData) => putInvoice({ formData, invoiceId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: invoicesQuery().queryKey });
    },
  });

export const useDeleteInvoiceMutation = (
  searchParams: Record<string, unknown>,
) =>
  useMutation({
    mutationFn: deleteInvoice,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: invoicesQuery(searchParams).queryKey,
      });
    },
  });

export const customersQuery = (searchParams: Record<string, unknown>) =>
  queryOptions({
    queryKey: ["customers", searchParams],
    queryFn: () => fetchCustomersFiltered(searchParams),
  });

export const customersSummaryQuery = () =>
  queryOptions({
    queryKey: ["customers", "summary"],
    queryFn: fetchCustomersSummary,
  });
