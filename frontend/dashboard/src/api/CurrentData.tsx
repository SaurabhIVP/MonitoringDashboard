import { apiService } from "./configurations/ApiService";

async function CurrentData() {
  try {
    const response = await apiService.get("/currentData");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default CurrentData;
