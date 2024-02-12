import { apiService } from "./configurations/ApiService";

interface TaskProps {
  taskname: string | null;
  chainname: string | null;
}

async function FlowIdGetter({ taskname, chainname }: TaskProps) {
  try {
    const response = await apiService.get(
      `/getFlowId/${taskname}/${chainname}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default FlowIdGetter;
