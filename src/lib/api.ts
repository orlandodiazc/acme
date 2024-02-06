import {
  RequestInvoice,
  CustomerFiltered,
  Invoice,
  InvoiceFilteredPageable,
  Overview,
  CustomerSummary,
} from "./api.types";

const BASE_URL = "http://localhost:8080/api";

// function sleep(ms: number) {
//   return new Promise((r) => setTimeout(r, ms));
// }
async function fetcher(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args);
  return await response.json();
}

export function fetchOverview(): Promise<Overview> {
  return fetcher(BASE_URL + "/overview");
}

export function fetchInvoicesFiltered(
  searchString: string,
): Promise<InvoiceFilteredPageable> {
  return fetcher(BASE_URL + "/invoices" + searchString);
}

export function fetchInvoice(id: string): Promise<Invoice> {
  return fetcher(BASE_URL + "/invoices/" + id);
}

export function postInvoice(newInvoice: RequestInvoice): Promise<Invoice> {
  return fetcher(BASE_URL + "/invoices", {
    method: "POST",
    body: JSON.stringify(newInvoice),
    headers: { "Content-Type": "application/json" },
  });
}
export interface PutInvoice {
  putInvoice: RequestInvoice;
  id: string;
}
export function putInvoice({ putInvoice, id }: PutInvoice): Promise<Invoice> {
  return fetcher(BASE_URL + "/invoices/" + id, {
    method: "PUT",
    body: JSON.stringify(putInvoice),
    headers: { "Content-Type": "application/json" },
  });
}

export async function deleteInvoice(id: string): Promise<Response> {
  return fetch(BASE_URL + "/invoices/" + id, { method: "DELETE" });
}

export function fetchCustomersFiltered(
  searchString: string,
): Promise<CustomerFiltered[]> {
  return fetcher(BASE_URL + "/customers" + searchString);
}

export function fetchCustomersSummary(): Promise<CustomerSummary[]> {
  return fetcher(BASE_URL + "/customers/summary");
}
