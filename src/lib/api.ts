import {
  CustomerFiltered,
  CustomerSimple,
  InvoiceFilteredPageable,
  Overview,
} from "./api.types";

const BASE_URL = "http://localhost:8080/api";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
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

export function fetchCustomersFiltered(
  searchString: string,
): Promise<CustomerFiltered[]> {
  return fetcher(BASE_URL + "/customers" + searchString);
}

export function fetchCustomersSimple(): Promise<CustomerSimple[]> {
  return fetcher(BASE_URL + "/customers/base");
}
