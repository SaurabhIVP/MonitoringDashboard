import { apiService } from "./configurations/ApiService";

interface TaskProps {
  chain_id: number | null;
}

async function Tasknames({ chain_id }: TaskProps) {
  try {
    if (chain_id == null) {
      const response = await apiService.get(`/tasksss/0`);
      return response;
    } else {
      const response = await apiService.get(`/tasksss/${chain_id}`);
      return response;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default Tasknames;
