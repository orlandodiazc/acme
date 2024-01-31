const BASE_URL = "http://localhost:8080/api"

export async function fetchOverview() {
    const response = await fetch(BASE_URL + "/overview");
    return await response.json();
}