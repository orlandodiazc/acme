const BASE_URL = "http://localhost:8080/api";

export async function fetchOverview() {
  const response = await fetch(BASE_URL + "/overview");
  return await response.json();
}

export async function fetchCustomersFiltered(searchString: string) {
  const response = await fetch(BASE_URL + "/customers" + searchString);
  return await response.json();
}

export async function fetchInvoicesFiltered(searchString: string) {
  const response = await fetch(BASE_URL + "/invoices" + searchString);
  return await response.json();
}

export async function fetchCustomersSimple() {
  const response = await fetch(BASE_URL + "/customers/base");
  return await response.json();
}
