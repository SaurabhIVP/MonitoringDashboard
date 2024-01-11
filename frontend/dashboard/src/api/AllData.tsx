import axios from "axios";
import { apiService } from "./ApiService";

async function AllData() {
  try {
    const response = await apiService.get("/chains");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default AllData;
