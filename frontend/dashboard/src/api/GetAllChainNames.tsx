import { apiService } from "./configurations/ApiService";

async function GetAllChainNames() {
  try {
    const response = await apiService.get("/chains");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default GetAllChainNames;
