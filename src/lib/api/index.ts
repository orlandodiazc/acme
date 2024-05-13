import { ApiSchema } from "./apiSchema";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }

async function fetcher(...args: Parameters<typeof fetch>) {
  const [url, opts] = args;
  const response = await fetch(
    `${BASE_URL}${url}`,

    opts,
  );
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error(response);
    throw response;
  }
  if (!response.ok) throw data;
  return data;
}

export function fetchOverview(): Promise<ApiSchema["OverviewResponse"]> {
  return fetcher("/overview");
}

export function fetchInvoicesFiltered(
  searchString?: string,
): Promise<ApiSchema["InvoiceFilteredResponse"]> {
  return fetcher("/invoices" + searchString);
}

export function fetchInvoice(id: string): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices/" + id);
}

export function postInvoice(formData: FormData): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices", {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/json" },
  });
}

interface PutInvoice {
  invoice: FormData;
  invoiceId: string;
}

export function putInvoice({
  invoice,
  invoiceId,
}: PutInvoice): Promise<ApiSchema["Invoice"]> {
  return fetcher("/invoices/" + invoiceId, {
    method: "PUT",
    body: invoice,
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteInvoice(id: string): Promise<Response> {
  return fetch("/invoices/" + id, { method: "DELETE" });
}

export function fetchCustomersFiltered(
  searchString?: string,
): Promise<ApiSchema["CustomerFilteredResponse"][]> {
  return fetcher("/customers" + searchString);
}

export function fetchCustomersSummary(): Promise<
  ApiSchema["CustomerSummaryResponse"][]
> {
  return fetcher("/customers/summary");
}
