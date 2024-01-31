const BASE_URL = "http://localhost:8080/api"

export async function fetchOverview() {
    const response = await fetch(BASE_URL + "/overview/stats");
    return await response.json();
}