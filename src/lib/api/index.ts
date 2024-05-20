import { recordToURLSearchParams } from "../utils";
import { ApiSchema } from "./apiSchema";
import Cookies from "js-cookie";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }

function getCsrfHeader():
  | Record<"X-XSRF-TOKEN", string>
  | Record<string, never> {
  const token = Cookies.get("XSRF-TOKEN");
  if (!token) return {};
  return { "X-XSRF-TOKEN": token };
}

async function fetcher(...args: Parameters<typeof fetch>) {
  const [url, opts] = args;
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...opts,
    credentials: "include",
  });
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error(response);
    if (!response.ok) throw response;
  }
  if (!response.ok) throw data;
  return data;
}

export function fetchOverview(): Promise<ApiSchema["OverviewResponse"]> {
  return fetcher("/overview");
}

export function fetchInvoicesFiltered(
  searchParams?: Record<string, unknown>,
): Promise<ApiSchema["InvoiceFilteredResponse"]> {
  return fetcher("/invoices?" + recordToURLSearchParams(searchParams));
}

export function fetchInvoice(id: string): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices/" + id);
}

export function postInvoice(formData: FormData): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices", {
    method: "POST",
    body: formData,
  });
}

export function putInvoice({
  formData,
  invoiceId,
}: {
  formData: FormData;
  invoiceId: string;
}): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices/" + invoiceId, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteInvoice(id: string): Promise<Response> {
  return fetch(API_BASE_URL + "/invoices/" + id, { method: "DELETE" });
}

export function fetchCustomersFiltered(
  searchParams?: Record<string, unknown>,
): Promise<ApiSchema["CustomerFilteredResponse"][]> {
  return fetcher("/customers?" + recordToURLSearchParams(searchParams));
}

export function fetchCustomersSummary(): Promise<
  ApiSchema["CustomerSummaryResponse"][]
> {
  return fetcher("/customers/summary");
}

export function login(formData: FormData) {
  return fetcher("/auth/login", { body: formData, method: "POST" });
}

export function postLogin(
  formData: FormData,
): Promise<ApiSchema["AuthUserResponse"]> {
  return fetcher("/auth/login", {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: getCsrfHeader(),
  });
}

export async function postLogout() {
  const response = await fetch(API_BASE_URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: getCsrfHeader(),
  });
  if (!response.ok) throw response;
}

export function fetchAuthUser(): Promise<ApiSchema["AuthUserResponse"]> {
  return fetcher("/auth/user");
}
