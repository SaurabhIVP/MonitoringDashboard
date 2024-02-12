import { apiService } from "./configurations/ApiService";

interface TaskProps {
  taskname: string | null;
}

async function ChainNames({ taskname }: TaskProps) {
  try {
    const response = await apiService.get(`/chart/tasks/${taskname}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainNames;
