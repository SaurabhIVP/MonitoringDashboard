import axios from "axios";

async function GanttData() {
  try {
    const response = await axios.get("https://localhost:7022/api/Data");
    
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default GanttData;