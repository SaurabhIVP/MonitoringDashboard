import axios from "axios";
import { apiService } from "./ApiService";

async function CurrentData() {
  try {
    const response = await apiService.get("/chains1");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default CurrentData;
