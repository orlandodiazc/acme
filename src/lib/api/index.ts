import { ApiSchema } from "./apiSchema";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }

async function fetcher(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args);
  return await response.json();
}

export function fetchOverview(): Promise<ApiSchema["OverviewResponse"]> {
  return fetcher(BASE_URL + "/overview");
}

export function fetchInvoicesFiltered(
  searchString: string,
): Promise<ApiSchema["InvoiceFilteredResponse"]> {
  return fetcher(BASE_URL + "/customers" + "/invoices" + searchString);
}

export function fetchInvoice(id: string): Promise<ApiSchema["Invoice"]> {
  return fetcher(BASE_URL + "/invoices/" + id);
}

export function postInvoice({
  invoice,
  customerId,
}: {
  invoice: ApiSchema["InvoiceRequest"];
  customerId: string;
}): Promise<ApiSchema["Invoice"]> {
  return fetcher(BASE_URL + "/customers/" + customerId + "/invoices", {
    method: "POST",
    body: JSON.stringify(invoice),
    headers: { "Content-Type": "application/json" },
  });
}

interface PutInvoice {
  invoice: ApiSchema["InvoiceRequest"];
  customerId: string;
  invoiceId: string;
}

export function putInvoice({
  invoice,
  customerId,
  invoiceId,
}: PutInvoice): Promise<ApiSchema["Invoice"]> {
  return fetcher(
    BASE_URL + "/customers/" + customerId + "/invoices/" + invoiceId,
    {
      method: "PUT",
      body: JSON.stringify(invoice),
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function deleteInvoice(id: string): Promise<Response> {
  return fetch(BASE_URL + "/invoices/" + id, { method: "DELETE" });
}

export function fetchCustomersFiltered(
  searchString: string,
): Promise<ApiSchema["CustomerFilteredResponse"][]> {
  return fetcher(BASE_URL + "/customers" + searchString);
}

export function fetchCustomersSummary(): Promise<
  ApiSchema["CustomerSummaryResponse"][]
> {
  return fetcher(BASE_URL + "/customers/summary");
}
