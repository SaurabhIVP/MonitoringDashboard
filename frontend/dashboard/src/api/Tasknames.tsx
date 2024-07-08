import { apiService } from "./configurations/ApiService";

interface TaskProps {
  chain_id: number | null;
  is_pm:boolean
}

async function Tasknames({ chain_id,is_pm }: TaskProps) {
  try {
    
    if (chain_id == null) {
      const response = await apiService.get(`/tasknames/0/${is_pm}`);
      return response;
    } else {
      const response = await apiService.get(`/tasknames/${chain_id}/${is_pm}`);
      return response;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default Tasknames;
