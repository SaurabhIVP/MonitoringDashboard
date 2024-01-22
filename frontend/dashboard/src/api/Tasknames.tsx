import { apiService } from "./ApiService";

interface TaskProps {
  chain_id: number | null;
}

async function Tasknames({ chain_id }: TaskProps) {
  try {
    console.log(chain_id);
    if (chain_id == null) {
      const response = await apiService.get(`/tasksss/0`);
      // console.log(chainname);
      return response;
    } else {
      const response = await apiService.get(`/tasksss/${chain_id}`);
      // console.log(chainname);
      return response;
    }
    // Assuming you want to return the data property of the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default Tasknames;
