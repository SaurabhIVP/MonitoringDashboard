import { apiService } from "./configurations/ApiService";

interface TaskProps {
  taskname: string | null;
  is_pm:boolean
}

async function ChainNames({ taskname,is_pm }: TaskProps) {
  try {
   
    const response = await apiService.get(`/chart/tasks/${taskname}/${is_pm}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainNames;
