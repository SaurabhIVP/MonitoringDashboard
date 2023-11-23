import axios from "axios";

async function AllData() {
  try {
    const response = await axios.get("https://localhost:7022/api/Data/chains");
    
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default AllData;