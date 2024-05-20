import { queryClient } from "@/main";
import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  deleteInvoice,
  fetchAuthUser,
  fetchCustomersFiltered,
  fetchCustomersSummary,
  fetchInvoice,
  fetchInvoicesFiltered,
  fetchOverview,
  postInvoice,
  postLogin,
  postLogout,
  putInvoice,
} from ".";
import { useNavigate, useRouter } from "@tanstack/react-router";

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

export const authUserQuery = () =>
  queryOptions({
    queryFn: fetchAuthUser,
    queryKey: ["auth", "user"],
  });

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: postLogout,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: authUserQuery().queryKey });
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: postLogin,
    onError(error: Response) {
      return error;
    },
    onSuccess(data) {
      queryClient.setQueryData(authUserQuery().queryKey, data);
    },
    throwOnError: false,
  });
};
